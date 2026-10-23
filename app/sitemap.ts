import type { MetadataRoute } from 'next';
import { canonicalUrl, isIndexable, seoPages } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  // No build timestamps: the supplied content has no reliable modification dates.
  return seoPages
    .filter((page) => isIndexable(page.path))
    .map((page) => ({ url: canonicalUrl(page.path) }));
}
