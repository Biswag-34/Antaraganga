# Page and section plan

| Route | Sections, in order | Principal media |
| --- | --- | --- |
| `/` | Hospital hero → commitment/purpose → our work → care continuum → partnership invitation | 01, 02, 03, 04, 06, 07, 08 |
| `/hospital` | Purpose hero → section rail → mission → approach → vision → foundation → people → paired CTA | 09, 02/03/04, 10, 08 |
| `/care` | Short care hero → group/service explorer → care journey → caregiver FAQ → inclusive care CTA | 10, 02, 11, 12, 13, 04, 21, 07 |
| `/work` | Programme mosaic → filter/filmstrip → health camps → first aid → programme focus → landscape CTA | 04, 05, 06, 08 |
| `/network` | Landscape hero → campus/outreach switch → campus information → reach model → conversation paths | 08, 01, 05, 03, 07 |
| `/health-card` | Registration hero/sample card → identification note → process/printing → responsibilities → FAQ | 23, card SVGs, 21, 24, 02 |
| `/funding` | Partnership hero → pillars → need explorer → proposal rows → support-to-service path → documents → CTA | 09, 14, 19, 10, 21, covers, 08 |
| `/funding/[programme]` | Programme hero → local section rail → need → service scope/hotspots → source allocation → accountability → enquiry | Programme mapping; 07 need cutout; original DOCX |
| `/contact` | Contact hero → enquiry type → details/review and context → Kolar connections → questions | 07, 24, 08 |

Content models: `content/site.ts` contains navigation, services, commitment, care-step and programme-story records; `content/programmes.ts` augments all 15 exact source mappings. `lib/media.ts` resolves variants and alt text from the original manifest.

Programmes: it, mobility, reception, ambulance, emergency, dialysis, rehab, wound, ct, carm, xray, lab, ot, icu, opd. Every record has a matching original DOCX and supplied cover. Budget `null` means unconfirmed; no remaining balance field is inferred. Availability and funding readiness are deliberately not inferred from pictures.

Server rendering handles route composition and programme content. Client state is limited to interactive components and the enquiry form. The site uses HTML text, buttons and controls throughout; no reference board is used as a page background or flattened interface.
