# Interaction specification

| Area | Trigger and result | Keyboard / mobile |
| --- | --- | --- |
| Header | Navigation links resolve to real routes; hover/focus opens desktop subnavigation | Native links; current route indicated; mobile toggle announces expanded state; Escape closes and returns focus; menu cycles focus |
| Commitment | Choose rural/disability/community to expand the matching purpose image and caption | Native buttons; pressed state; mobile arrows/dots and swipe |
| Shared selectors | Choose category to update content | Left/right/Home/End move and select; visible focus; mobile stacked or horizontal layouts |
| Work | Programme filters and previous/next controls update still image, heading, steps and enquiry context | Buttons and swipe; never a fake video player |
| Hospital mission | Select commitment to update photo and supporting line | Pressed state; mobile vertical selectors |
| Approach | Select treat/rehabilitate/prevent/support to update the preview | Buttons; mobile vertical navigation with care page link |
| Services | Category selects the first matching service; service list changes photo, description, features and enquiry target | Native buttons; mobile scrollable service chooser beneath content |
| Care journey | Select one of four steps | Buttons, previous/next; mobile vertical stepper |
| FAQ | Expand/collapse an answer | Native accessible details/summary |
| Network | Switch campus/outreach, choose connection in the care journey | Pressed state; mobile stacked journey |
| Health card | Turn card to swap the supplied front/back demo artwork | Button; descriptive accessible name; reduced-motion disables rotation transition |
| Card process | Select a step; print step reveals two printing modes | Native buttons and details |
| Funding | Choose a need; view corresponding mapped programme | Pressed state and previous/next; direct programme links |
| Proposal discovery | Header utility link and mobile menu lead directly to the proposal directory; homepage features three programme cards and a link to all proposals | Native links, visible at mobile and desktop widths |
| Proposal directory | All 15 programmes appear initially; category filters show matching proposals; original DOCX downloads stay available in each row | Native selector buttons with arrow/Home/End support; native download anchors |
| Documents | Change proposals/institutional/reporting view | Selector; missing documents offer enquiry instead of fake downloads |
| Programme scope | Select numbered hotspot or corresponding legend | Button announces the scope and pressed state; HTML explanation; mobile stacked legend |
| Accountability | Switch proposed record/reporting category | Selector; enquiry for real records, no invented sample evidence |
| Enquiry context | Programme CTA opens `/contact?type=partnership&interest=...` | Query values seed and remount the client form; any interest has a visible option |
| Enquiry form | Required fields, email and minimum message validation → review → edit or save text draft | Labels/autocomplete/native validity; heading focus on step changes; no transmission or fake sent state |

No personal data is stored in local storage. Form values exist in page memory, and an explicit download saves a draft to the visitor's device. Public delivery requires a chosen endpoint/provider, server validation, abuse prevention, approved privacy text and a real success/error response.

All transitions and inferred animations are implementation choices rather than behavior proven by still screenshots. Reduced-motion is respected globally.
