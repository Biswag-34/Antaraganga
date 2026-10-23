# Design tokens

Confirmed from supplied visual system/manual:

- Navy `#12344A`; teal `#087F8C`; white `#FFFFFF`; ice `#EAF5F7`; gold `#D6A53A`; slate `#516674`.
- Source Serif 4 variable: display/headings at 600; DM Sans variable: interface/body at 400–650.
- Reference visual-system scale: display 64, section 44, subheading 28, body 18/16/14. Actual responsive values are inferred from the page boards and implemented using clamps.

Inferred layout values:

- Desktop container max 1328px; responsive gutter `clamp(24px,4vw,76px)`; mobile gutter 20px (16px under 375px).
- Header desktop: 32px utility strip and 94px primary row; mobile: 27px and 65px.
- Desktop main hero 535px; desktop page-specific heroes 365–600px; mobile composition changes per page.
- Section spacing typically 50px desktop and 32px mobile, refined per chapter.
- Small button radius 5px, image windows 6–15px, selected rails 8–12px; selected card and care circles follow their own shape rules.
- Controls use clear teal selections and visible keyboard outlines; reduced-motion removes transitions and smooth scrolling.

These are implementation measurements, not claims of original design-file specifications.
