# Validation results

Updated 23 October 2026 after the requested design changes.

| Check | Result |
| --- | --- |
| Production build | Passed on finalized application source: Next.js 16.4.2 / React 19.3.1 / TypeScript 7.0.2 |
| Type checking | `npm run typecheck` passed; final production build's TypeScript step also passed |
| Formatting | Prettier check passed for application and components after final formatting |
| Routes | All 25 URLs returned HTTP 200 from the development server on port 3000: eight main pages, 15 programme briefs and two supporting information pages |
| Invalid routes | Invalid programme slug and unknown page returned HTTP 404 |
| Source downloads | All 15 original DOCX URLs returned HTTP 200 with valid ZIP/DOCX signatures |
| Programme enquiries | All 15 programme-specific query URLs returned the correct preselected interest in the server-rendered contact form |
| Media | All 129 referenced/mapped images, SVGs, CSS artwork, fonts and proposal files exist |
| Navigation | Inventory verification checked 1,088 rendered links and 259 controls; no unmapped links or broken anchors |
| Requested removals | Home, care, funding and contact render without small section labels or the footer caution strip |
| Proposal visibility | Funding renders all 15 proposal rows initially; the directory precedes the need explorer |
| Source inventory | Refreshed to 672 entries, including conditional variants; all 141 JSX interaction sites map to inventoried components |
| Visual screenshots | Not executed: trusted browser bridge unavailable; Windows Chrome automation then stopped because it could not reliably determine the current URL |
| Browser interactions | Not executed: menu, touch, keyboard, card flip, form review/download and responsive overflow still require a real-browser review |

The restricted initial build compiled successfully but its compiler worker was blocked with `spawn EPERM`. Running the normal build with permission to start compiler workers succeeded. No build errors remain.

The development server remains available at http://localhost:3000. A production build also passed, including TypeScript and generation of 27 pages. No further browser input was issued after Chrome automation stopped. Mobile spacing, typography, responsive grids and footer variants were checked in source; measured browser visual confirmation remains outstanding.

`npm run check:routes` is repeatable with the site running. It checks routes, 404 behavior, source document bytes, programme enquiry context, media existence and internal links/anchors. This is HTTP/source verification and is not a substitute for browser visual or interaction testing.

Production integrations intentionally remain unconfigured: no form delivery, payments, patient registration, CMS or third-party analytics. Missing institutional content and deliberate reference differences are listed in `assumptions.md` and `visual-review.md`.
