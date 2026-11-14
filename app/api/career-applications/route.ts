import { randomUUID } from 'node:crypto';
import { link, mkdir, unlink, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { careerRoles, maxCvBytes } from '@/content/careers';

const maxRequestBytes = maxCvBytes + 32 * 1024;
const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const invalidDetails = 'Enter your name, email and phone number and select an open position.';
const invalidCv = 'Choose a PDF CV up to 4 MB.';
const unavailable = 'Applications cannot be received right now. Please try again later.';

function errorResponse(message: string, status: number) {
  return Response.json({ message }, { status });
}

async function savePreview(id: string, record: string) {
  const directory = join(process.cwd(), '.cache', 'career-applications');
  await mkdir(directory, { recursive: true, mode: 0o700 });
  const temporary = join(directory, randomUUID() + '.tmp');
  await writeFile(temporary, record, { flag: 'wx', mode: 0o600 });
  try {
    await link(temporary, join(directory, id + '.json')).catch((error: NodeJS.ErrnoException) => {
      if (error.code !== 'EEXIST') throw error;
    });
  } finally {
    await unlink(temporary).catch(() => {});
  }
}

export async function POST(request: Request) {
  const contentType = request.headers.get('content-type') ?? '';
  if (!/^multipart\/form-data\s*;/i.test(contentType) || !request.body) {
    return errorResponse('Submit the application with an attached CV.', 415);
  }

  if (Number(request.headers.get('content-length')) > maxRequestBytes) {
    return errorResponse(invalidCv, 413);
  }

  let data: FormData;
  try {
    const reader = request.body.getReader();
    const chunks: Uint8Array[] = [];
    let size = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > maxRequestBytes) {
        void reader.cancel().catch(() => {});
        return errorResponse(invalidCv, 413);
      }
      chunks.push(value);
    }
    const body = new Uint8Array(Buffer.concat(chunks, size));
    data = await new Response(body, { headers: { 'Content-Type': contentType } }).formData();
  } catch {
    return errorResponse('The application could not be read. Please try again.', 400);
  }

  const field = (key: string) => {
    const value = data.get(key);
    return typeof value === 'string' ? value.trim() : '';
  };
  const name = field('name');
  const email = field('email');
  const phone = field('phone');
  const role = field('role');
  const digits = phone.replace(/\D/g, '');
  if (
    !name ||
    name.length > 120 ||
    /[\x00-\x1f\x7f]/.test(name) ||
    email.length > 254 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    phone.length > 32 ||
    !/^\+?[0-9 ().-]+$/.test(phone) ||
    digits.length < 7 ||
    digits.length > 15 ||
    !careerRoles.includes(role)
  ) {
    return errorResponse(invalidDetails, 400);
  }

  const cv = data.get('cv');
  if (!(cv instanceof File) || !cv.name.toLowerCase().endsWith('.pdf') || cv.size < 8) {
    return errorResponse(invalidCv, 400);
  }
  if (cv.size > maxCvBytes) return errorResponse(invalidCv, 413);
  if (!(await cv.slice(0, 8).text()).match(/^%PDF-\d\.\d$/)) {
    return errorResponse(invalidCv, 400);
  }

  const suppliedId = field('id');
  const id = uuid.test(suppliedId) ? suppliedId.toLowerCase() : randomUUID();
  const details = { id, name, email, phone, role, submittedAt: new Date().toISOString() };
  const preview = process.env.NODE_ENV === 'development';

  try {
    if (preview) {
      const cvBase64 = Buffer.from(await cv.arrayBuffer()).toString('base64');
      await savePreview(id, JSON.stringify({ ...details, cvBase64 }));
    } else {
      const destination = process.env.CAREER_APPLICATION_WEBHOOK_URL;
      const token = process.env.CAREER_APPLICATION_WEBHOOK_TOKEN;
      if (!destination || new URL(destination).protocol !== 'https:' || !token) {
        return errorResponse(unavailable, 503);
      }
      const body = new FormData();
      for (const [key, value] of Object.entries(details)) body.set(key, value);
      body.set('cv', new Blob([cv], { type: 'application/pdf' }), 'cv.pdf');
      const response = await fetch(destination, {
        method: 'POST',
        headers: { Authorization: 'Bearer ' + token, 'Idempotency-Key': id },
        body,
        redirect: 'error',
        signal: AbortSignal.timeout(10000),
      });
      if (!response.ok) return errorResponse(unavailable, 503);
    }
    return Response.json({ preview }, { status: 201 });
  } catch {
    return errorResponse(unavailable, 503);
  }
}
