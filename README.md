# Antharagange Rural Hospital website

A responsive Next.js App Router website, built from the supplied desktop/mobile reference boards and local media collection. All assets required to run the site are included in `public/media/`.

Original input packs in `Media/`, design boards in `Visualization/`, and the original creation manual are preserved locally and excluded from Git. Generated audit reports, caches, dependencies and build output are also ignored. Keep `package-lock.json` committed so `npm ci` restores the recorded dependencies. The clickable inventory can be regenerated with `node scripts/inventory-clickables.cjs`; add `--verify` with the site running to validate it.

## Run

Requires Node.js 20.9 or newer and npm.

```sh
npm ci
npm run dev
```

Open http://localhost:3000. For a production build:

```sh
npm run build
npm start
```

Checks:

```sh
npm run typecheck
# With the site running on port 3000:
npm run check:routes
npm run test:seo
# Preview/development SEO checks, with the site running:
npm run check:seo
```

`TEST_BASE_URL` changes the route check destination. The dependency lockfile records the installed versions.

## Included

- Eight main routes and 15 individually generated programme routes, plus preview privacy/website information pages.
- Desktop and mobile compositions, supplied local fonts, responsive `<picture>` sources, SVG icons, cutouts and chapter edges.
- Mobile navigation; commitment, service, journey, work and funding selectors; health-card flip/process; programme hotspots and accountability selector.
- All 15 original programme DOCX downloads. PDFs were not supplied and are not simulated.
- Programme-aware contact flow with required fields, native email validation, review/edit, and local draft download.

## Content and launch status

The owner approved production indexing on `https://www.antharagangaruralhospital.com`. The tracked release settings in `content/seo-release.mjs` enable 23 reviewed public routes only on a trusted production deployment. Vercel production and preview environments are detected separately. Other hosts require `DEPLOYMENT_ENVIRONMENT=production` at both build and runtime. Local development and previews remain non-indexable. This code change does not itself deploy the website or submit it to search engines.

The form does not send email, register patients or store submissions. It explicitly offers a local draft. Before connecting delivery, provide the recipient/service, approve privacy and retention rules, add server-side validation/rate limiting, and show success only after confirmed delivery.

The owner supplied the public phone, email and regional address; these are maintained in `content/hospital.ts`. Current service availability, hours, street-level directions, leadership profiles and final health-card terms remain unconfirmed. The original proposals supply planning budgets, not live funding balances. Clinical imagery is illustrative. The existing draft privacy and website-information pages remain noindex and are excluded from the sitemap.

See [SEO implementation and launch checks](docs/seo-implementation.md) for the audit mapping, production verification commands, optional overrides and remaining deployment/account actions.

See [assumptions](docs/assumptions.md), [reference index](docs/reference-index.md), [page plan](docs/page-plan.md), [interactions](docs/interactions.md) and [visual review](docs/visual-review.md).
