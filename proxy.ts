import { NextResponse, type NextRequest } from 'next/server';
import { getSeoConfig } from './lib/seo-config.mjs';
import pages from './content/seo-pages.json';

export function proxy(request: NextRequest) {
  const seo = getSeoConfig();
  const host = (request.headers.get('host') || request.nextUrl.host).split(':')[0].toLowerCase();
  if (seo.redirectHosts.includes(host)) {
    const destination = new URL(seo.siteUrl);
    destination.pathname = request.nextUrl.pathname;
    destination.search = request.nextUrl.search;
    return NextResponse.redirect(destination, 308);
  }
  const response = NextResponse.next();
  const path = request.nextUrl.pathname;
  const document = path.startsWith('/media/support/documents/');
  const asset = path.startsWith('/_next/') || path.startsWith('/media/');
  const canonicalProduction = seo.indexingEnabled && host === seo.canonicalHost;
  const approved = pages.some((page) => page.path === path) && seo.approvedPaths.includes(path);
  if (
    document
      ? !canonicalProduction || !seo.indexDocuments
      : !asset && (!canonicalProduction || !approved)
  ) {
    response.headers.set('X-Robots-Tag', 'noindex, nofollow');
  }
  return response;
}

export const config = { matcher: ['/((?!_next/static|_next/image).*)'] };
