# Assumptions and missing inputs

SEO release update, 23 October 2026: the owner selected `https://www.antharagangaruralhospital.com`, approved production indexing and supplied the public regional address, phone and email now maintained in `content/hospital.ts`. These replace the original missing-contact assumptions below. Service availability, hours, precise directions, leadership, health-card rollout and final policies remain unconfirmed. See `seo-implementation.md` for the current release configuration and remaining actions.

Build date: 23 October 2026. Scope: the complete site requested by the user. The manual's example “Phase 1 only” prompt was not treated as the current request.

- The workspace initially contained only handoff assets. The Next.js project is at the workspace root so `npm run dev` is the main entry point.
- The manual specifies App Router and TypeScript and a separate deployment step. This build remains local.
- Nine page types map to eight main routes plus 15 programme routes. Privacy and website-information preview pages additionally support working footer links.
- Most PNGs are presentation boards combining a desktop page, phone page and alternate interaction states. They are not direct browser screenshots. Desktop 1440px and mobile 375px are explicitly labelled on programme/contact references; those sizes are inferred targets for the other boards. Exact original viewport heights are unknown.
- Copy is transcribed or closely adapted from references and supported by the supplied manual/media guidance. No standalone hospital-approved copy file was present.
- The approved hospital spelling must be confirmed: the manual, mockups and proposals contain Antharagange/Antaragange variants. The website uses “Antharagange” from the visual identity and manual; supplied proposal files remain unchanged.
- Exact address, phone number, email, hours, current operating services, working branches and outreach dates are not supplied. No contact details, map coordinates or branch list are invented.
- Foundation names appear in the reference; named leadership, roles and portraits remain unverified. A team enquiry replaces named profile cards.
- Source budgets are planning allocations. Current funding status, remaining balances, prices and procurement records are unconfirmed. No progress bars or fabricated impact numbers appear.
- The ambulance proposal states ₹25 lakh while item costs total ₹27 lakh. CT and X-ray allocations have source ranges; C-Arm overlaps the operation theatre proposal. These disclosures remain visible. Other overlapping allocations are disclosed globally and in originals.
- Wound-care funding has no source capital allocation and displays “To be confirmed”.
- Health-card artwork is a demo, not real patient data, insurance or entitlement. Process roles are proposed; no patient-registration backend is implied.
- All clinical photographs are illustrative. Hospital hero derives from an architectural rendering. A footer notice and contextual captions identify the distinction.
- Original source documents are DOCX only; download labels reflect the actual format instead of the reference's PDF labels.
- Real footage, institutional documents and audited records were not supplied. Still images do not have fake video controls. Document enquiries replace invented record downloads.
- Contact delivery has no destination or provider. The two-step form validates, reviews and downloads a local draft; it never claims submission or delivery.
- No donation/payment system, bank details, tax claims, CMS or patient data service is added.
- Local fonts are loaded with `next/font/local` and kept with their original licences. Device compositions are selected using the manifest's mobile/tablet/desktop variants.
