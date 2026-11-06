import { randomUUID } from 'node:crypto';
import { mkdir, rename, unlink, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { getProgramme } from '@/content/programmes';

const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export async function POST(request: Request) {
  if (!/^application\/json(?:\s*;|$)/i.test(request.headers.get('content-type') ?? '')) {
    return new Response(null, { status: 415 });
  }

  const content = await request.text().catch(() => '');
  if (Buffer.byteLength(content) > 2048) return new Response(null, { status: 413 });
  let payload;
  try {
    payload = JSON.parse(content);
  } catch {
    return new Response(null, { status: 400 });
  }
  const { id, programme, name, phone } = payload ?? {};
  const selected = typeof programme === 'string' ? getProgramme(programme) : undefined;
  const cleanName = typeof name === 'string' ? name.trim() : '';
  const cleanPhone = typeof phone === 'string' ? phone.trim() : '';
  const digits = cleanPhone.replace(/\D/g, '');
  if (
    typeof id !== 'string' ||
    !uuid.test(id) ||
    !selected ||
    !cleanName ||
    cleanName.length > 120 ||
    /[\x00-\x1f\x7f]/.test(cleanName) ||
    cleanPhone.length > 32 ||
    !/^\+?[0-9 ().-]+$/.test(cleanPhone) ||
    digits.length < 7 ||
    digits.length > 15
  ) {
    return new Response(null, { status: 400 });
  }

  const requestId = id.toLowerCase();
  const body = JSON.stringify({
    id: requestId,
    programme: selected.id,
    programmeName: selected.title,
    name: cleanName,
    phone: cleanPhone,
    submittedAt: new Date().toISOString(),
  });

  try {
    if (process.env.NODE_ENV === 'development') {
      const directory = join(process.cwd(), '.cache', 'donation-requests');
      await mkdir(directory, { recursive: true, mode: 0o700 });
      const temporary = join(directory, `${randomUUID()}.tmp`);
      try {
        await writeFile(temporary, body, { flag: 'wx', mode: 0o600 });
        await rename(temporary, join(directory, `${requestId}.json`));
      } finally {
        await unlink(temporary).catch(() => {});
      }
      return Response.json({ preview: true }, { status: 201 });
    }

    const destination = process.env.DONATION_REQUEST_WEBHOOK_URL;
    const token = process.env.DONATION_REQUEST_WEBHOOK_TOKEN;
    if (!destination || new URL(destination).protocol !== 'https:' || !token) {
      return new Response(null, { status: 503 });
    }
    const result = await fetch(destination, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Idempotency-Key': requestId,
        Authorization: `Bearer ${token}`,
      },
      body,
      redirect: 'error',
      signal: AbortSignal.timeout(8000),
    });
    if (result.ok) return Response.json({ preview: false }, { status: 201 });
  } catch {
    return new Response(null, { status: 503 });
  }
  return new Response(null, { status: 503 });
}
