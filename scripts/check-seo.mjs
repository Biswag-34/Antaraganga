import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { request as httpRequest } from 'node:http';
import { request as httpsRequest } from 'node:https';
import { canonicalSiteUrl } from '../lib/seo-config.mjs';

const base = process.env.TEST_BASE_URL || 'http://localhost:3000';
const origin = process.env.SEO_EXPECT_ORIGIN || canonicalSiteUrl;
const indexable = (process.env.SEO_EXPECT_INDEXABLE_PATHS || '').split(',').filter(Boolean);
const host = process.env.SEO_TEST_REQUEST_HOST;
const pages = JSON.parse(await readFile(new URL('../content/seo-pages.json', import.meta.url)));
const mapping = JSON.parse(
  await readFile(new URL('../content/programme-map.json', import.meta.url))
);
const failures = [];
const htmlByPath = new Map();
// Use HTTP's actual Host header for local canonical-host tests. Fetch can ignore Host overrides.
const request = (path, options = {}) =>
  new Promise((resolve, reject) => {
    const target = new URL(path, base);
    const send = target.protocol === 'https:' ? httpsRequest : httpRequest;
    const req = send(
      target,
      {
        method: options.method || 'GET',
        headers: { ...(host ? { host } : {}), 'user-agent': 'Googlebot', ...options.headers },
      },
      (response) => {
        const chunks = [];
        response.on('data', (chunk) => chunks.push(chunk));
        response.on('error', reject);
        response.on('end', () => {
          const body = Buffer.concat(chunks);
          const headers = new Headers();
          for (const [name, value] of Object.entries(response.headers)) {
            if (value !== undefined)
              headers.set(name, Array.isArray(value) ? value.join(', ') : value);
          }
          resolve({
            status: response.statusCode,
            headers,
            text: async () => body.toString('utf8'),
            arrayBuffer: async () => body,
          });
        });
      }
    );
    req.on('error', reject);
    req.setTimeout(30000, () => req.destroy(new Error(`Request timed out: ${path}`)));
    req.end();
  });
const decode = (s) =>
  s
    .replaceAll('&amp;', '&')
    .replaceAll('&quot;', '"')
    .replaceAll('&#x27;', "'")
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>');
const attributes = (tag) =>
  Object.fromEntries([...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map((m) => [m[1], decode(m[2])]));
const tags = (html, kind) =>
  [...html.matchAll(new RegExp(`<${kind}\\b[^>]*>`, 'gi'))].map((m) => attributes(m[0]));
function oneMeta(html, key, value) {
  const matches = tags(html, 'meta').filter((m) => m[key] === value);
  assert.equal(matches.length, 1, `Expected one ${value} tag`);
  return matches[0].content;
}
async function check(label, action) {
  try {
    await action();
    console.log(`PASS ${label}`);
  } catch (error) {
    failures.push(`${label}: ${error.message}`);
  }
}

for (const page of pages)
  await check(page.path, async () => {
    const response = await request(page.path);
    assert.equal(response.status, 200);
    const html = await response.text();
    htmlByPath.set(page.path, html);
    const titles = [...html.matchAll(/<title>(.*?)<\/title>/g)];
    assert.equal(titles.length, 1);
    assert.equal(decode(titles[0][1]), page.title);
    assert.equal([...html.matchAll(/<h1(?:\s|>)/g)].length, 1);
    assert.equal(oneMeta(html, 'name', 'description'), page.description);
    const canonicals = tags(html, 'link').filter((t) => t.rel === 'canonical');
    const canonical = page.path === '/' ? origin : new URL(page.path, origin).href;
    assert.equal(canonicals.length, 1);
    assert.equal(canonicals[0].href, canonical);
    for (const [key, value] of [
      ['og:title', page.title],
      ['og:description', page.description],
      ['og:url', canonical],
    ]) {
      assert.equal(oneMeta(html, 'property', key), value);
    }
    assert.equal(oneMeta(html, 'name', 'twitter:card'), 'summary_large_image');
    assert.equal(oneMeta(html, 'name', 'twitter:title'), page.title);
    assert.equal(oneMeta(html, 'name', 'twitter:description'), page.description);
    assert.equal(oneMeta(html, 'property', 'og:image:width'), '1200');
    assert.equal(oneMeta(html, 'property', 'og:image:height'), '630');
    assert(oneMeta(html, 'property', 'og:image:alt'));
    assert(oneMeta(html, 'name', 'twitter:image:alt'));
    const shouldIndex = indexable.includes(page.path);
    const robots = oneMeta(html, 'name', 'robots').split(/,\s*/);
    assert(robots.includes(shouldIndex ? 'index' : 'noindex'));
    assert.equal(robots.includes('noindex'), !shouldIndex);
    const botRobots = tags(html, 'meta').filter((t) => /^(googlebot|bingbot)$/i.test(t.name || ''));
    if (shouldIndex) {
      assert(!/noindex|none/i.test(response.headers.get('x-robots-tag') || ''));
      assert(botRobots.every((t) => !/noindex|none/.test(t.content)));
    } else assert(/noindex/.test(response.headers.get('x-robots-tag') || ''));
    const graphs = [
      ...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>(.*?)<\/script>/gs),
    ].flatMap((m) => JSON.parse(m[1])['@graph'] || []);
    const entityIds = graphs.map((entry) => entry['@id']);
    assert.equal(new Set(entityIds).size, entityIds.length, 'Duplicate structured-data entity IDs');
    assert(graphs.some((g) => g['@type'] === 'Organization'));
    const organization = graphs.find((g) => g['@type'] === 'Organization');
    assert(html.includes(`href="mailto:${organization.email}"`));
    assert(html.includes(`href="tel:${organization.telephone.replace(/[^\d+]/g, '')}"`));
    assert(graphs.some((g) => g['@type'] === 'WebSite'));
    assert(graphs.some((g) => g['@id'] === `${canonical}#webpage`));
    assert(
      !graphs.some((g) =>
        ['Hospital', 'Physician', 'Product', 'Offer', 'AggregateRating'].includes(g['@type'])
      )
    );
    if (page.path.startsWith('/funding/')) {
      assert(html.includes('Proposed funding project'));
      const breadcrumb = graphs.find((g) => g['@type'] === 'BreadcrumbList');
      assert.equal(breadcrumb.itemListElement.at(-1).item, canonical);
    }
  });

await check('robots and sitemap', async () => {
  const robots = await request('/robots.txt');
  assert.equal(robots.status, 200);
  assert.match(robots.headers.get('content-type'), /text\/plain/);
  const text = await robots.text();
  assert.match(text, /Allow: \/(?:\r?\n|$)/);
  assert(!/Disallow: \/(?:\r?\n|$)/.test(text));
  assert.equal(text.includes(`Sitemap: ${origin}/sitemap.xml`), indexable.length > 0);
  const sitemap = await request('/sitemap.xml');
  assert.equal(sitemap.status, 200);
  assert.match(sitemap.headers.get('content-type'), /xml/);
  const xml = await sitemap.text();
  assert.match(xml, /<urlset\s/);
  assert(!/<lastmod>|<priority>|<changefreq>/.test(xml));
  const urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => decode(m[1])).sort();
  assert.deepEqual(
    urls,
    indexable.map((p) => (p === '/' ? origin : new URL(p, origin).href)).sort()
  );
});
await check('contact prefill canonical', async () => {
  const response = await request('/contact?type=hospital&interest=Kidney%20care&utm_source=test');
  assert.equal(response.status, 200);
  const links = tags(await response.text(), 'link').filter((t) => t.rel === 'canonical');
  assert.deepEqual(
    links.map((l) => l.href),
    [`${origin}/contact`]
  );
});
await check('trailing-slash redirects preserve query parameters', async () => {
  const response = await request('/care/?utm_source=check');
  assert.equal(response.status, 308);
  const destination = new URL(response.headers.get('location'), origin);
  assert.equal(destination.pathname, '/care');
  assert.equal(destination.search, '?utm_source=check');
});
await check('all care summaries are in server HTML', async () => {
  const html = htmlByPath.get('/care');
  for (const id of ['rural', 'rehabilitation', 'mental', 'wound', 'kidney', 'eye', 'telemedicine'])
    assert(html.includes(`id="care-${id}"`));
  assert(htmlByPath.get('/').includes('Architectural visualisation'));
});
await check('unknown pages stay genuine 404s', async () => {
  for (const path of ['/not-a-page', '/funding/not-a-programme']) {
    const response = await request(path);
    assert.equal(response.status, 404);
    assert(/noindex/.test(response.headers.get('x-robots-tag') || ''));
    const html = await response.text();
    assert.equal(tags(html, 'link').filter((l) => l.rel === 'canonical').length, 0);
  }
});
await check('share image and icons have correct media types and dimensions', async () => {
  for (const [file, width, height] of [
    ['social-share.png', 1200, 630],
    ['apple-touch-icon.png', 180, 180],
    ['logo.png', 512, 512],
  ]) {
    const response = await request(`/media/support/brand/${file}`);
    assert.equal(response.status, 200);
    assert.match(response.headers.get('content-type'), /image\/png/);
    const png = Buffer.from(await response.arrayBuffer());
    assert.equal(png.subarray(1, 4).toString(), 'PNG');
    assert.equal(png.readUInt32BE(16), width);
    assert.equal(png.readUInt32BE(20), height);
  }
  const icon = await request('/media/support/brand/favicon.svg');
  assert.equal(icon.status, 200);
  assert.match(icon.headers.get('content-type'), /image\/svg\+xml/);
});
await check('15 original proposals remain downloadable with noindex headers', async () => {
  for (const programme of mapping) {
    const response = await request(`/media/support/${programme.source_document}`);
    assert.equal(response.status, 200);
    assert.match(response.headers.get('x-robots-tag') || '', /noindex/);
    const bytes = new Uint8Array(await response.arrayBuffer());
    assert(bytes.length > 1000 && bytes[0] === 80 && bytes[1] === 75);
  }
});
if (process.env.SEO_TEST_REDIRECT_HOST)
  await check('alternate host redirects preserve the full path and query', async () => {
    const response = await request('/contact?type=hospital&interest=Kidney%20care', {
      redirect: 'manual',
      headers: { host: process.env.SEO_TEST_REDIRECT_HOST },
    });
    assert.equal(response.status, 308);
    const target = new URL(response.headers.get('location'));
    assert.equal(target.origin, origin);
    assert.equal(target.pathname, '/contact');
    assert.deepEqual(
      [...target.searchParams],
      [
        ['type', 'hospital'],
        ['interest', 'Kidney care'],
      ]
    );
  });
if (process.env.SEO_TEST_REQUEST_HOST)
  await check('unrecognized preview hosts retain noindex even on a production build', async () => {
    const response = await request('/', { headers: { host: 'preview.example.org' } });
    assert.match(response.headers.get('x-robots-tag') || '', /noindex/);
  });
if (failures.length) {
  console.error(failures.join('\n'));
  process.exitCode = 1;
} else
  console.log(
    `Verified SEO for ${pages.length} routes; ${indexable.length} expected indexable routes.`
  );
