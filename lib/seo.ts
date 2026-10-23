import type { Metadata } from 'next';
import pages from '@/content/seo-pages.json';
import { getSeoConfig } from './seo-config.mjs';

export const seoConfig = getSeoConfig();
export const seoPages = pages;
export const siteName = 'Antharagange Rural Hospital';
export const shareImage = '/media/support/brand/social-share.png';
export const shareImageAlt =
  'Antharagange Rural Hospital in Kolar, Karnataka — rural healthcare and community programmes';

for (const path of seoConfig.approvedPaths) {
  if (!pages.some((page) => page.path === path))
    throw new Error(`Unknown approved SEO path: ${path}`);
}

export function canonicalUrl(path: string) {
  // Callers use registry paths, never visitor-supplied hostnames or prefill parameters.
  return path === '/' ? seoConfig.siteUrl : new URL(path, seoConfig.siteUrl).href;
}

export function isIndexable(path: string) {
  return (
    seoConfig.indexingEnabled &&
    seoConfig.approvedPaths.includes(path) &&
    pages.some((page) => page.path === path)
  );
}

export function pageMetadata(path: string): Metadata {
  const page = pages.find((page) => page.path === path);
  if (!page) throw new Error(`Missing SEO entry for ${path}`);
  const url = canonicalUrl(page.path);
  const index = isIndexable(page.path);
  return {
    title: { absolute: page.title },
    description: page.description,
    alternates: { canonical: url },
    robots: { index, follow: index },
    openGraph: {
      type: 'website',
      locale: 'en_IN',
      siteName,
      title: page.title,
      description: page.description,
      url,
      images: [
        {
          url: canonicalUrl(shareImage),
          width: 1200,
          height: 630,
          type: 'image/png',
          alt: shareImageAlt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: page.title,
      description: page.description,
      images: [{ url: canonicalUrl(shareImage), alt: shareImageAlt }],
    },
  };
}
