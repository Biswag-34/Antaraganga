# SEO implementation and release verification

Updated 23 October 2026. The supplied SEO report was used as an audit reference. The owner's later confirmation selects `https://www.antharagangaruralhospital.com` as the canonical origin, approves production indexing, and supplies the public phone, email and regional address. Those confirmations supersede the report's proposed .org origin and its lack of contact details.

## Implemented

| Report finding                             | Implementation                                                                                                                                                                                                                                                                                                                           |
| ------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Global noindex/nofollow                    | Production approval is explicit in `content/seo-release.mjs`. The 23 listed public routes emit index/follow on trusted production; development and Vercel previews remain noindex. A request to a noncanonical deployment hostname also receives an HTTP noindex header.                                                                 |
| Reused descriptions and missing canonicals | `content/seo-pages.json` contains distinct titles and descriptions for all 25 existing HTML routes. Server-side metadata emits exactly one canonical, with query-prefilled contact URLs canonicalized to `/contact`.                                                                                                                     |
| Missing robots and sitemap                 | `/robots.txt` allows crawling so that noindex directives remain readable. It advertises the sitemap only when pages are approved for indexing. `/sitemap.xml` contains only approved canonical HTML URLs, without speculative modification dates, query variants, fragments or downloads.                                                |
| Duplicate hosts                            | The .com apex permanently redirects to www with paths and queries preserved. Application trailing-slash normalization is explicit. .org redirects require confirmation of domain control and hosting configuration. No blanket legacy-path-to-home redirects were added.                                                                 |
| Missing social metadata and icons          | Route-specific Open Graph and Twitter metadata; an inspected 1200×630 PNG share image; 180×180 Apple touch icon; existing SVG favicon; 512×512 organization logo.                                                                                                                                                                        |
| Missing structured data                    | Stable Organization and WebSite entities, route-specific WebPage/AboutPage/ContactPage entities and proposal BreadcrumbList data that matches visible breadcrumbs. Contact facts come from the same source as the page/footer. No unverified Hospital, physician, opening-hours, ratings, treatment-price or operational-service claims. |
| Care content requires clicking             | `/care` retains its selector and adds seven visible, server-rendered summaries, status wording and links to existing related funding proposals. No thin service-detail pages were invented.                                                                                                                                              |
| Proposals resemble operating services      | All 15 proposal heroes explicitly say “Proposed funding project” and explain that scope/costs are planning estimates and availability/commissioning require confirmation. Existing budget discrepancies and overlapping allocations remain intact.                                                                                       |
| Contact access                             | Owner-provided `+91 98765 43210`, `antaraganga2019@gmail.com` and `Antharagange, Kolar District, Karnataka` appear in the contact page/footer and Organization data. Phone and email links provide direct alternatives to the form. No messages were sent during testing.                                                                |
| Architectural imagery disclosure           | Images using the hospital architectural asset have a visible “Architectural visualisation” caption, in addition to the existing image alternatives and website-information disclosure.                                                                                                                                                   |
| Source document indexing                   | All 15 original DOCX files remain downloadable and receive HTTP noindex headers. Their HTML proposal pages are the search landing pages. Document indexing requires a separate explicit override.                                                                                                                                        |
| Draft policy content                       | `/privacy` and `/terms` retain honest existing preview notices and remain noindex, outside the sitemap. Their descriptions summarize the actual current content rather than pretending final policies exist.                                                                                                                             |

## Production deployment

On Vercel, `VERCEL_ENV=production` together with `NODE_ENV=production` activates the shipped owner-approved release settings. `VERCEL_ENV=preview` or `development` prevents activation even if a production flag is copied into that environment. The production build must be deployed to the confirmed .com domain. Existing hosting environment overrides can still disable indexing: inspect and remove unintended `SEO_INDEXING_ENABLED=false`, an empty `SEO_APPROVED_PATHS`, or an old `SITE_URL` before building.

On another host, set `DEPLOYMENT_ENVIRONMENT=production` during **both build and runtime**, then run `npm run build` and `npm start`. Setting only `NODE_ENV=production` does not opt a preview into indexing. Metadata and sitemap content are prerendered, so changing release configuration or environment values requires a fresh build and deployment, not just a server restart. Keep build and runtime settings identical.

`.env.example` documents optional overrides; none are required for a normal Vercel deployment. `SEO_INDEXING_ENABLED=false` is an explicit kill switch and must be followed by a rebuild/redeploy. Private information still requires hosting access controls; robots directives are not authentication.

Enforce HTTPS and configure canonical-domain routing at the hosting provider. The repository cannot provision a domain, DNS record or TLS certificate. Confirm .org ownership before adding its apex and www hostnames to `SEO_REDIRECT_HOSTS`. Audit legacy routes individually before mapping them to equivalent destinations. Do not send every missing URL to the homepage.

## Repeatable verification

```sh
npm run test:seo
npm run typecheck
npm run build
# With the appropriate build/server running:
npm run check:routes
npm run check:seo
```

`check:seo` defaults to a noindex preview at `http://localhost:3000`. For the approved production release, run the following in PowerShell, with a production build running on port 3001 and matching build/runtime settings:

```powershell
$env:TEST_BASE_URL = 'http://localhost:3001'
$env:SEO_TEST_REQUEST_HOST = 'www.antharagangaruralhospital.com'
$env:SEO_EXPECT_INDEXABLE_PATHS = (node --input-type=module -e "import {productionSeo} from './content/seo-release.mjs'; process.stdout.write(productionSeo.approvedPaths.join(','));")
$env:SEO_TEST_REDIRECT_HOST = 'antharagangaruralhospital.com'
npm run check:seo
```

The local Host override tests application responses without publishing or changing DNS. To verify a real deployment, use its HTTPS canonical base URL and remove `SEO_TEST_REQUEST_HOST`; keep the expected approved-path list. The verifier checks real rendered HTML, all metadata counts and values, robots meta and HTTP headers, JSON-LD parsing, sitemap membership, contact query canonicals, trailing-slash redirects, original downloads, image dimensions/types, crawlable care content and genuine 404 responses. It does not certify Search Console coverage, email delivery, Lighthouse scores or Google rich-result eligibility.

## Remaining owner and hosting actions

Deploy this build and verify the public HTTPS responses; no deployment credentials or hosting project is connected to this checkout. If the .org domain is controlled, redirect its equivalent paths to the chosen .com origin and test for loops. Verify the .com Domain property in Search Console, submit `https://www.antharagangaruralhospital.com/sitemap.xml`, inspect representative public URLs, and request indexing for a few priority pages. Existing DNS/account access is required for those steps. No indexing API, ping endpoint or bulk-submission automation was added.

Approve final privacy/website notices before adding those two pages to the release list. Confirm hours, exact directions/PIN, service availability, operator relationships and leadership credentials before publishing them. The online form still reviews and saves a draft; actual form delivery needs a chosen provider and tested server-side implementation. Direct phone/email links are available now, but delivery and response times were not tested. A regional address alone is insufficient for a verified map pin or precise directions.

Detailed service/programme pages, Kannada translations, real outcomes, clinical reviewers and fresh activity dates require substantive approved source material. Preserve existing routes until a documented migration is justified. Measure mobile/desktop performance and accessibility on the deployed site before making claims about Core Web Vitals, field data, Google Business Profile eligibility or indexing coverage.

## Primary implementation references

- [Google noindex guidance](https://developers.google.com/search/docs/crawling-indexing/block-indexing)
- [Google canonical URL guidance](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)
- [Google sitemap guidance](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
- [Google structured-data policies](https://developers.google.com/search/docs/appearance/structured-data/sd-policies)
- [Google recrawl requests](https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl)

The installed Next.js 16.4.2 documentation was consulted for metadata, robots, sitemap, redirects and the `proxy.ts` convention. Use the installed version's documentation when changing these integrations.
