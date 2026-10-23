import { readFile, stat } from 'node:fs/promises';
import assert from 'node:assert/strict';

const base = process.env.TEST_BASE_URL || 'http://localhost:3000';
const mapping = JSON.parse(
  await readFile(new URL('../content/programme-map.json', import.meta.url), 'utf8')
);
const manifest = JSON.parse(
  await readFile(new URL('../content/media-manifest.json', import.meta.url), 'utf8')
);
const routes = [
  '/',
  '/hospital',
  '/care',
  '/work',
  '/network',
  '/health-card',
  '/funding',
  '/contact',
  '/privacy',
  '/terms',
  ...mapping.map((p) => `/funding/${p.id}`),
];
const failures = [];
const htmlByRoute = new Map();
for (const route of routes) {
  try {
    const res = await fetch(`${base}${route}`);
    assert.equal(res.status, 200, `${route}: HTTP ${res.status}`);
    const html = await res.text();
    assert.match(html, /<h1[\s>]/, `${route}: missing h1`);
    assert.match(html, /id="main"/, `${route}: missing main landmark`);
    assert(!html.includes('NEXT_HTTP_ERROR_FALLBACK;500'), `${route}: server render failed`);
    htmlByRoute.set(route, html);
    console.log(`PASS ${route}`);
  } catch (error) {
    failures.push(error.message);
  }
}
for (const route of ['/funding/not-a-programme', '/not-a-page']) {
  try {
    const res = await fetch(`${base}${route}`);
    assert.equal(res.status, 404, `${route}: should return 404`);
  } catch (error) {
    failures.push(error.message);
  }
}
for (const p of mapping) {
  try {
    const document = await fetch(`${base}/media/support/${p.source_document}`);
    assert.equal(document.status, 200);
    const bytes = new Uint8Array(await document.arrayBuffer());
    assert(bytes.length > 1000 && bytes[0] === 80 && bytes[1] === 75, `${p.id}: invalid DOCX`);
    const html = htmlByRoute.get(`/funding/${p.id}`);
    assert(html?.includes(p.source_document), `${p.id}: missing proposal download`);
    assert(html?.includes('interest='), `${p.id}: missing enquiry context`);
    const enquiry = await fetch(
      `${base}/contact?type=partnership&interest=${encodeURIComponent(p.title)}`
    );
    assert.equal(enquiry.status, 200);
    const enquiryHtml = await enquiry.text();
    const selectedInterest = enquiryHtml
      .match(/<option[^>]*selected=""[^>]*>(.*?)<\/option>/)?.[1]
      .replaceAll('&amp;', '&');
    assert.equal(selectedInterest, p.title, `${p.id}: incorrect enquiry selection`);
  } catch (error) {
    failures.push(`${p.id}: ${error.message}`);
  }
}
const assetPaths = new Set();
for (const a of manifest.images) {
  for (const variant of Object.values(a.variants)) assetPaths.add(`/media/${variant.webp}`);
}
for (const html of htmlByRoute.values()) {
  for (const m of html.matchAll(/(?:src|href)="(\/media\/[^"?#]+)"/g)) assetPaths.add(m[1]);
}
const css = await readFile(new URL('../app/globals.css', import.meta.url), 'utf8');
for (const m of css.matchAll(/url\(['"]?(\/media\/[^)'"\s]+)['"]?\)/g)) assetPaths.add(m[1]);
assetPaths.add('/media/support/fonts/DM-Sans-Variable.ttf');
assetPaths.add('/media/support/fonts/Source-Serif-4-Variable.ttf');
for (const asset of assetPaths) {
  try {
    await stat(new URL(`../public${asset}`, import.meta.url));
  } catch {
    failures.push(`Missing asset: ${asset}`);
  }
}
for (const [route, html] of htmlByRoute) {
  for (const m of html.matchAll(/href="(\/[^"#]*)"/g)) {
    const target = new URL(m[1].replaceAll('&amp;', '&'), base).pathname;
    if (!target.startsWith('/media/') && !target.startsWith('/_next/') && !routes.includes(target))
      failures.push(`Unknown internal link: ${route} → ${target}`);
  }
  for (const m of html.matchAll(/href="(\/[^"?]*)?(?:\?[^"#]*)?#([^"\s]+)"/g)) {
    const target = m[1] || route;
    const targetHtml = htmlByRoute.get(target);
    if (targetHtml && !targetHtml.includes(`id="${m[2]}"`))
      failures.push(`Broken anchor: ${route} → ${target}#${m[2]}`);
  }
}
if (failures.length) {
  console.error(failures.join('\n'));
  process.exitCode = 1;
} else
  console.log(
    `Verified ${routes.length} routes, 2 missing routes, 15 DOCX downloads and ${assetPaths.size} media assets.`
  );
