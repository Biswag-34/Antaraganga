# Team2 portrait preparation

Source: `C:/Users/User/Desktop/Team2.pdf`, page 1. Updated 15 November 2026.

Names, board membership and portrait assignments follow the PDF. It supplies board membership, but no individual job titles or biographies. Dr. K S Shankar is the fifth trustee; Dr. Sundareshan M N appears on the Advisory Board.

Final assets are in `public/media/support/board/team2/`. Previous board assets are preserved locally in the ignored `Media/Archived-Support-Handoff/board/` folder. Portraits are displayed in equal 4:5 white frames without stretching; cards have equal name-panel heights at each responsive layout.

| PDF image | Person | Final WebP filename | Preparation |
| --- | --- | --- | --- |
| Image10 | Jagadish Gokavarapu | jagadish-gokavarapu.webp | Original white background retained |
| Image12 | Muralidharan Govindarajan | muralidharan-govindarajan.webp | White background edit |
| Image14 | Dr Pradeep Kumar N | pradeep-kumar-n.webp | White background edit |
| Image16 | Anupama Chandra | anupama-chandra.webp | Original white background retained |
| Image18 | Dr. K S Shankar | k-s-shankar.webp | White background edit |
| Image20 | Dr. Sundareshan M N | sundareshan-m-n.webp | White background edit |
| Image22 | Dr Seemanthini Desai | seemanthini-desai.webp | Original white background retained |
| Image24 | Dr Y V Venkatachala | y-v-venkatachala.webp | White background edit |
| Image26 | K S Chitrita | k-s-chitrita.webp | White background; proportions matched to PDF rendering |
| Image28 | Dr. Chirag P Gowda | chirag-p-gowda.webp | White background edit |

## Image preparation method and prompts

Used the built-in ImageGen tool for seven background edits, with each extracted portrait as its edit target. No CLI generation was used. Encoded final files as WebP; the three original portraits retain their source resolution, and edited portraits are 640 × 800 pixels. The original documents were not modified.

The six ordinary white-background edits used this prompt:

> Edit this exact supplied portrait for a hospital board directory. Replace only the background with clean pure white (#ffffff). Preserve the same person's exact identity, facial proportions, skin tone, age, hair, expression, gaze, clothing, jewellery and pose. Preserve the existing photo, do not beautify, restyle, reconstruct the person or add details. Keep a centred head-and-shoulders portrait with the whole hair visible and the same original crop. Make the subject and facial size consistent with the supplied portrait. No text, frame, watermark or added shadow. Deliver a single 4:5 portrait image with a pure white background.

K S Chitrita's extracted image had different proportions from its displayed PDF portrait. Her edit additionally used the rendered PDF page as a reference, instructing ImageGen to restore the natural proportions shown in the fourth portrait of the lower row, retain her identity and clothing, and output only her portrait on a pure white 4:5 background.

## Verification

- Compared all ten names and portrait assignments to the rendered PDF.
- Verified identical rendered card and image-frame dimensions at 360, 390, 768, 1024 and 1440 pixels.
- Checked name wrapping, portrait loading, page overflow and desktop/mobile Careers navigation.
- Checked the hospital's Our people gallery, doctor-directory link and doctor-availability enquiry.
