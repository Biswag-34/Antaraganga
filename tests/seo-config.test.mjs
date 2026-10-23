import assert from 'node:assert/strict';
import test from 'node:test';
import { readFile } from 'node:fs/promises';
import { getSeoConfig, canonicalSiteUrl } from '../lib/seo-config.mjs';

const launch = {
  NODE_ENV: 'production',
  VERCEL_ENV: 'production',
  SITE_URL: canonicalSiteUrl,
  SEO_INDEXING_ENABLED: 'true',
  SEO_APPROVED_PATHS: '/,/care,/funding/dialysis',
};

test('missing launch settings and ordinary production builds remain non-indexable', () => {
  assert.equal(getSeoConfig({}).indexingEnabled, false);
  assert.equal(getSeoConfig({ NODE_ENV: 'production' }).indexingEnabled, false);
  for (const missing of ['SITE_URL', 'SEO_INDEXING_ENABLED']) {
    assert.equal(getSeoConfig({ ...launch, [missing]: undefined }, {}).indexingEnabled, false);
  }
});

test('owner-approved release enables the 23 public pages on trusted production without extra environment overrides', () => {
  const seo = getSeoConfig({ NODE_ENV: 'production', VERCEL_ENV: 'production' });
  assert.equal(seo.indexingEnabled, true);
  assert.equal(seo.siteUrl, 'https://www.antharagangaruralhospital.com');
  assert.equal(seo.approvedPaths.length, 23);
  assert(!seo.approvedPaths.includes('/privacy'));
  assert(!seo.approvedPaths.includes('/terms'));
});

test('preview and development cannot inherit production indexing', () => {
  for (const VERCEL_ENV of ['preview', 'development']) {
    assert.equal(
      getSeoConfig({ ...launch, VERCEL_ENV, DEPLOYMENT_ENVIRONMENT: 'production' }).indexingEnabled,
      false
    );
  }
  assert.equal(getSeoConfig({ ...launch, NODE_ENV: 'development' }).indexingEnabled, false);
  assert.equal(
    getSeoConfig({
      ...launch,
      VERCEL_ENV: undefined,
      VERCEL: '1',
      DEPLOYMENT_ENVIRONMENT: 'production',
    }).indexingEnabled,
    false
  );
});

test('an explicitly enabled production deployment keeps an exact approval list', () => {
  assert.equal(getSeoConfig(launch).indexingEnabled, true);
  assert.deepEqual(getSeoConfig(launch).approvedPaths, ['/', '/care', '/funding/dialysis']);
  assert.equal(
    getSeoConfig({ ...launch, VERCEL_ENV: undefined, DEPLOYMENT_ENVIRONMENT: 'production' })
      .indexingEnabled,
    true
  );
  assert.equal(getSeoConfig({ ...launch, SEO_INDEXING_ENABLED: 'false' }).indexingEnabled, false);
  assert.equal(getSeoConfig({ ...launch, SEO_INDEXING_ENABLED: 'TRUE' }).indexingEnabled, false);
  assert.deepEqual(getSeoConfig({ ...launch, SEO_APPROVED_PATHS: '' }).approvedPaths, []);
});

test('canonical URLs and approvals cannot accept malformed origins or URL variants', () => {
  for (const SITE_URL of [
    'http://example.org',
    'https://localhost',
    'https://127.0.0.1',
    'https://name:secret@example.org',
    'https://example.org/path',
    'https://example.org?x=1',
    'https://example.org/#fragment',
  ]) {
    assert.throws(() => getSeoConfig({ ...launch, SITE_URL }));
  }
  for (const SEO_APPROVED_PATHS of [
    '*',
    '/care/',
    '/contact?type=hospital',
    '/hospital#people',
    '//example.org',
  ]) {
    assert.throws(() => getSeoConfig({ ...launch, SEO_APPROVED_PATHS }));
  }
});

test('redirects are explicit, production-only, and cannot redirect the canonical host to itself', () => {
  const SEO_REDIRECT_HOSTS = 'antharagangaruralhospital.org,www.antharagangaruralhospital.org';
  assert.equal(getSeoConfig({ ...launch, SEO_REDIRECT_HOSTS }).redirectHosts.length, 2);
  assert.deepEqual(
    getSeoConfig({ ...launch, SEO_REDIRECT_HOSTS, VERCEL_ENV: 'preview' }).redirectHosts,
    []
  );
  assert.throws(() =>
    getSeoConfig({ ...launch, SEO_REDIRECT_HOSTS: 'www.antharagangaruralhospital.com' })
  );
  assert.throws(() => getSeoConfig({ ...launch, SEO_REDIRECT_HOSTS: '*.example.org' }));
});

test('original documents need their own explicit indexing decision', () => {
  assert.equal(getSeoConfig(launch).indexDocuments, false);
  assert.equal(getSeoConfig({ ...launch, SEO_INDEX_DOCUMENTS: 'true' }).indexDocuments, true);
  assert.equal(
    getSeoConfig({ ...launch, SEO_INDEX_DOCUMENTS: 'true', VERCEL_ENV: 'preview' }).indexDocuments,
    false
  );
});

test('all 25 current pages have distinct titles and descriptions, with no invented routes', async () => {
  const pages = JSON.parse(await readFile(new URL('../content/seo-pages.json', import.meta.url)));
  const programmes = JSON.parse(
    await readFile(new URL('../content/programme-map.json', import.meta.url))
  );
  assert.equal(pages.length, 25);
  for (const field of ['path', 'title', 'description'])
    assert.equal(new Set(pages.map((p) => p[field])).size, 25);
  for (const programme of programmes) {
    const entry = pages.find((p) => p.path === `/funding/${programme.id}`);
    assert(entry && /proposal/i.test(entry.title));
    assert(/propos|planned/i.test(entry.description));
  }
});
