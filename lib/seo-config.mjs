import { productionSeo } from '../content/seo-release.mjs';
export const canonicalSiteUrl = productionSeo.canonicalOrigin;

export function getSeoConfig(env = process.env, release = productionSeo) {
  const configuredOrigin = env.SITE_URL || release.canonicalOrigin;
  const url = new URL(configuredOrigin || canonicalSiteUrl);
  if (
    url.protocol !== 'https:' ||
    url.username ||
    url.password ||
    url.port ||
    url.pathname !== '/' ||
    url.search ||
    url.hash ||
    !url.hostname.includes('.') ||
    url.hostname.endsWith('.localhost') ||
    /^\d+\.\d+\.\d+\.\d+$/.test(url.hostname)
  )
    throw new Error(
      'SITE_URL must be an HTTPS public origin without a path, query or credentials.'
    );

  // NODE_ENV alone also matches preview builds. Vercel's deployment context takes precedence.
  const production =
    env.NODE_ENV === 'production' &&
    (env.VERCEL_ENV
      ? env.VERCEL_ENV === 'production'
      : env.VERCEL
        ? false
        : env.DEPLOYMENT_ENVIRONMENT === 'production');
  const indexingApproved =
    env.SEO_INDEXING_ENABLED === undefined
      ? release.productionIndexingApproved === true
      : env.SEO_INDEXING_ENABLED === 'true';
  const indexingEnabled = production && Boolean(configuredOrigin) && indexingApproved;
  const approvedPaths = (env.SEO_APPROVED_PATHS ?? (release.approvedPaths || []).join(','))
    .split(',')
    .map((p) => p.trim())
    .filter(Boolean);
  if (approvedPaths.some((p) => !/^\/(?:[a-z0-9-]+(?:\/[a-z0-9-]+)*)?$/.test(p))) {
    throw new Error(
      'SEO_APPROVED_PATHS must contain exact route paths separated by commas; no wildcards, queries or fragments.'
    );
  }
  const redirectHosts = (env.SEO_REDIRECT_HOSTS ?? (release.redirectHosts || []).join(','))
    .split(',')
    .map((h) => h.trim().toLowerCase())
    .filter(Boolean);
  if (
    redirectHosts.some(
      (h) => !/^(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z]{2,}$/.test(h) || h === url.hostname
    )
  ) {
    throw new Error(
      'SEO_REDIRECT_HOSTS must contain owned alternate hostnames, excluding the canonical hostname.'
    );
  }
  return {
    siteUrl: url.origin,
    canonicalHost: url.hostname,
    production,
    indexingEnabled,
    approvedPaths: [...new Set(approvedPaths)],
    redirectHosts: production && configuredOrigin ? [...new Set(redirectHosts)] : [],
    indexDocuments: indexingEnabled && env.SEO_INDEX_DOCUMENTS === 'true',
  };
}
