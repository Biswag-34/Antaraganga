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
```

`TEST_BASE_URL` changes the route check destination. The dependency lockfile records the installed versions.

## Included

- Eight main routes and 15 individually generated programme routes, plus preview privacy/website information pages.
- Desktop and mobile compositions, supplied local fonts, responsive `<picture>` sources, SVG icons, cutouts and chapter edges.
- Mobile navigation; commitment, service, journey, work and funding selectors; health-card flip/process; programme hotspots and accountability selector.
- All 15 original programme DOCX downloads. PDFs were not supplied and are not simulated.
- Programme-aware contact flow with required fields, native email validation, review/edit, and local draft download.

## Content and launch status

This is a local preview. It has not been deployed. The manual specifies a separate deployment step. Search indexing is disabled until the hospital approves launch.

The form does not send email, register patients or store submissions. It explicitly offers a local draft. Before connecting delivery, provide the recipient/service, approve privacy and retention rules, add server-side validation/rate limiting, and show success only after confirmed delivery.

Current service availability, exact address, telephone, email, leadership profiles and final health-card terms were not supplied. The website avoids invented details. The original proposals supply planning budgets, not live funding balances. Clinical imagery is illustrative and branding remains a concept awaiting approval.

See [assumptions](docs/assumptions.md), [reference index](docs/reference-index.md), [page plan](docs/page-plan.md), [interactions](docs/interactions.md) and [visual review](docs/visual-review.md).
