# Complete website media guide

The collection supports Home, Our Hospital, Care & Services, Our Work, Locations & Outreach, Health Card, CSR Partnerships, Individual Programme Brief and Contact.

## Contents

There are 25 image subjects and 50 distinct desktop/mobile compositions. All 50 have PNG originals and WebP encodings. The tablet directory contains 25 explicit selections from those existing compositions; it does not pretend to contain 25 independently generated scenes. The manifest records each selection's origin. Home imagery is included, so this collection supersedes the need to combine separate media folders manually.

The Complete archive includes PNG masters. The Web archive contains production WebP selections and the same vector artwork, fonts, documents and guides. Its image browser downloads WebP files. Use the PNG originals from Complete for further editing.

## Choosing device media

Use mobile files below 768px, tablet selections at 768–1023px, and desktop files at 1024px or above. These are implementation defaults, not device detection. For very narrow split panels on tablets, use the mobile composition and preserve its ratio. For full-width tablet panoramas, use desktop composition if it keeps the subject readable. Never squash a portrait into a wide slot.

People-led mobile images are generally portrait. Room/equipment mobile images retain a 4:3 service view, so the photograph still explains care rather than presenting a cropped product. Cutout images must preserve their alpha boundary with object-fit:contain; their empty space is intentional. Do not crop cutouts as though they were ordinary photographs.

## Page and programme mapping

`page-map.json` maps every page to the needed photographs and vector groups. `programme-map.json` maps all fifteen unique funding proposals to an image, cover and original DOCX. `asset-map.csv` is the developer-friendly device matrix. Every meaningful photograph has alt text and provenance in `manifest.json`.

Repeated imagery across pages is deliberate. For example, the rural-family consultation can support the OPD brief; adult rehabilitation supports physiotherapy and mobility-equipment causes; outreach imagery is reused in Work and Locations. This keeps the website visually coherent and avoids unnecessary page weight.

## Native artwork

`cards/` contains front/back demo health-card SVGs and PNG renders when available. The same physical-card ratio applies on desktop and mobile; the surrounding layout changes. No real patient data, benefits entitlement or scannable patient identity is supplied.

`covers/` contains fifteen programme-cover artworks. These are visual download covers, not replacements for the source documents. Actual DOCX files from the supplied proposals are in `documents/`. No fake PDF conversion or certification has been inserted.

`masks/` contains arch, circle, clinical-room and hands-window masks for live CSS shaping. `dividers/` retains the responsive homepage chapter edges. `motion/` provides restrained decorative connection cues in horizontal desktop and vertical mobile form, with reduced-motion support. `icons/` contains the consistent Lucide line-icon system and licence. `brand/` contains proposed marks, wordmark and favicon; these are concept identity assets awaiting hospital approval. `placeholders/` contains monogram artwork for real leadership portraits that must be supplied.

## Source distinction

The hospital hero adapts the architectural visual from the current website; the original source is retained. All other clinical scenes, people, rooms, vehicles and landscapes are AI-generated representative imagery. They do not prove actual hospital facilities, staff employment, treatment outcomes, acquired equipment, working branch locations or service readiness. Identify them as illustrative when used publicly and replace with approved authentic photography where available.

Specific medical room layouts and device models must not be treated as architectural, procurement, clinical or regulatory specifications. Interactive room hotspots should describe general source-supported categories and should not imply that the depicted room is the final installed layout. This is especially relevant to bed counts, medical-gas engineering, radiation protection and equipment placement.

No generated faces are offered as portraits of named leaders or actual patients. No donor/partner logos, award badges, tax documents, audited impact records or institution approvals have been fabricated. Use the supplied monograms until genuine approved portraits are provided.

Real programme videos were not supplied. The first-aid image can be a slideshow poster; do not attach a play control that implies documentary footage exists. SVG motion is decorative and does not substitute for training video. Verified maps, exact campus photographs, programme footage and official partner assets remain source-dependent.

## Text and behaviour

Headings, paragraphs, budgets, buttons, tabs, card flip, carousels, forms, hotspot labels and section navigation must remain HTML/CSS/React. The assets do not embed those interfaces into photographs. This supports responsive layouts, accessible text, translation, focus states and future editing.

The proposed font pairing is Source Serif 4 for short hero titles and DM Sans for all interface/body content. Font downloads and licence files, if available, are in `fonts/`. Use font-display:swap. Keep the included licence notices when redistributing.

The generated prompt set is included under `guide/generation-prompts.json`, recording use of the built-in image-generation tool. This media collection does not alter the previously deployed site.
