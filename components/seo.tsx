import { hospital } from '@/content/hospital';
import { canonicalUrl, seoPages, siteName } from '@/lib/seo';

function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  );
}

export function SiteStructuredData() {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Organization',
            '@id': canonicalUrl('/#organization'),
            name: hospital.name,
            url: canonicalUrl('/'),
            telephone: hospital.phone,
            email: hospital.email,
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Antharagange, Kolar District',
              addressRegion: 'Karnataka',
              addressCountry: 'IN',
            },
            logo: {
              '@type': 'ImageObject',
              url: canonicalUrl('/media/support/brand/logo.png'),
              width: 512,
              height: 512,
            },
          },
          {
            '@type': 'WebSite',
            '@id': canonicalUrl('/#website'),
            name: siteName,
            url: canonicalUrl('/'),
            inLanguage: 'en',
            publisher: { '@id': canonicalUrl('/#organization') },
          },
        ],
      }}
    />
  );
}

export function PageStructuredData({ path }: { path: string }) {
  const page = seoPages.find((entry) => entry.path === path);
  if (!page) return null;
  const url = canonicalUrl(page.path);
  const isProposal = path.startsWith('/funding/');
  const breadcrumbs = isProposal
    ? {
        '@type': 'BreadcrumbList',
        '@id': `${url}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: canonicalUrl('/') },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Funding proposals',
            item: canonicalUrl('/funding'),
          },
          { '@type': 'ListItem', position: 3, name: page.label, item: url },
        ],
      }
    : null;
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type':
              path === '/contact' ? 'ContactPage' : path === '/hospital' ? 'AboutPage' : 'WebPage',
            '@id': `${url}#webpage`,
            url,
            name: page.title,
            description: page.description,
            inLanguage: 'en',
            isPartOf: { '@id': canonicalUrl('/#website') },
            about: { '@id': canonicalUrl('/#organization') },
            ...(breadcrumbs ? { breadcrumb: { '@id': `${url}#breadcrumb` } } : {}),
          },
          ...(breadcrumbs ? [breadcrumbs] : []),
        ],
      }}
    />
  );
}
