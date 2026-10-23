import type { MetadataRoute } from 'next';
import { canonicalUrl, isIndexable, seoPages } from '@/lib/seo';

export default function robots(): MetadataRoute.Robots {
  return {
    // Crawlers must be able to fetch HTML and documents to see their noindex directives.
    rules: { userAgent: '*', allow: '/' },
    ...(seoPages.some((page) => isIndexable(page.path))
      ? { sitemap: canonicalUrl('/sitemap.xml') }
      : {}),
  };
}
