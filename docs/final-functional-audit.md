# Final functional and responsive audit

Checked 23 October 2026 against the local Next.js development site on port 3000 and the optimized production build on port 3001. No deployment was made. The normal development command remains fixed to port 3000.

## Result

The tested routes and interactions pass after the fixes below. This is a Chromium-based responsive browser audit, not certification on every physical device or browser engine.

## Defects corrected

1. **Image gestures:** the commitment gallery and work stories now share pointer-based horizontal gesture handling. A horizontal movement of at least 50px advances one image; vertical/diagonal scrolling and short movements do not select another image. Native image dragging and the click following a completed swipe are suppressed. Arrows, dots, captions, selected states and story enquiry links remain synchronized.
2. **Adjacent image:** the desktop homepage's next-story picture is now a labelled button that advances the carousel.
3. **Story filters:** arrow and swipe navigation reset the featured work filter to All programmes, so the active filter cannot disagree with the displayed story.
4. **Programme hotspots:** the floating caption previously covered the first image hotspot, blocking taps on all 15 programme pages. The caption now sits beneath the hotspots, allows pointer input through it, and the targets are 44px. Both image-to-legend and legend-to-image updates were retested across every programme.
5. **Phone category controls:** work and funding category labels were cramped at 360–390px. They now use two columns with 48px targets and wrapping labels.
6. **Enquiry validation:** changing type after review returns to details and clears saved status. Switching a hospital enquiry to CSR/outreach can no longer bypass the required organisation field. Hospital email placeholder is appropriate for patients.
7. **Mobile navigation:** height-only viewport changes preserve the open menu; width changes reset it. This avoids unexpected closing when browser chrome or the keyboard changes the available height.
8. **Desktop chevrons:** pointer entry on the chevron no longer races its own click. Each of the four buttons passes first-click open and second-click close. Menu labels retain hover opening; pointer leave retains the 140ms closing grace period.

## Browser coverage

| Area | Verified behavior |
| --- | --- |
| Responsive routes | All 25 routes at widths 360, 390, 768, 1024, 1280 and 1440px: 150 layout checks; no horizontal document overflow, one H1, no failed completed main-content image loads. The final mobile category spacing changes were separately retested on the rebuilt site. |
| Header | All four desktop chevrons, ArrowDown opening/focus, Escape dismissal, outside click; mobile opening, Escape, route/hash dismissal, same-page anchor navigation, height preservation and width reset. |
| Homepage | Three commitments, matching imagery/captions, arrows/dots, native left/right gallery drags, work story next/previous/wraparound, adjacent-preview click. |
| Hospital | All three mission selectors and four approach states. |
| Care | All seven services with matching images/headings/enquiry interests, care journey controls/wraparound, FAQ expansion/collapse. |
| Work | All four filters, matching story imagery/enquiry links, arrow wraparound, native left/right drags on phone and desktop viewports. |
| Locations | Both campus/outreach views and CTAs; all three care-connection selected states. |
| Health card | Image click and keyboard/button flipping; four workflow states; both printing accordions. |
| Funding | Four featured categories and matching programme URLs; all five directory filters with counts 15/6/4/2/3; four partnership steps; three document views. |
| Programme pages | All 15 pages and all 45 scope items, image hotspot reverse synchronization; three accountability states and matching enquiry interests. |
| Contact | Required fields, invalid email, required organisation, review/edit/value retention, type changes on desktop and phone, real text-draft download with the explicit Not sent notice. Synthetic QA data only. |
| Redirection | Actual service-to-enquiry and programme-to-enquiry navigation; programme query prefill; browser back/forward retains enquiry context; internal links/anchors and trailing-slash query preservation checked by route/SEO scripts. |
| Downloads | All 15 original DOCX files checked; a real browser download was opened as bytes and confirmed to be the expected DOCX ZIP container. |
| Console | No application warnings/errors in the final production browser inspection. |

The test browser does not provide a reliable hover-only mouse movement primitive. A drag-to-menu attempt was excluded as an invalid hover test. Pointer-leave timing was inspected in the source; desktop clicks, keyboard focus/dismissal and outside dismissal were exercised in the browser. Physical mouse hover-out, iOS Safari, Android Chrome and Firefox still merit a short device smoke test before release.

## Automated validation

- `npm run build`: passes, including TypeScript and static generation.
- `npm run typecheck`: passes.
- `npm run test:gestures`: 3 tests pass (direction, threshold/taps, vertical/diagonal rejection).
- `npm run test:seo`: 8 tests pass.
- `npm run check:routes`: 25 valid routes, two genuine missing-route 404s, 15 original DOCX downloads and 130 media assets pass.
- `npm run check:seo`: 25 routes, robots/sitemap, canonical metadata, query-preserving redirects, server-rendered care summaries, original-document noindex and share assets pass. Local hosts remain non-indexable as intended; approved production-host behavior is covered by the SEO configuration tests.
- Clickable inventory: 1,560 link checks, 360 rendered controls and 15 documents pass; component-source inventory covers conditional controls separately from initial server HTML.

## Remaining delivery boundaries

- The enquiry form deliberately downloads a draft. It does not send email or submit to a server; phone and email links provide the current contact path. A delivery provider is still needed for online enquiry submission.
- Telephone and email destinations were inspected; no calls or emails were sent.
- Production domain/DNS/TLS, hosting redirects and Google indexing cannot be certified from localhost. The approved production SEO settings are implemented, but deployment and search-engine discovery are separate steps.
- The address, phone and email are the values supplied by the owner; hospital service availability and visiting hours still require confirmation.

Browser layout evidence and final screenshots are saved in the chat's visualization folder as `responsive-audit.json`, `functional-checks.json`, `final-mobile-controls.jpg` and `final-mobile-hotspots.jpg`. The JSON functional checks contain the final regression subset; the wider coverage above was also verified interactively during the audit.
