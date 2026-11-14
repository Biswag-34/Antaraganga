// Deterministic icon/export sizes from the owner's supplied logo artwork.
// Run from the repository root: node scripts/prepare-brand-assets.cjs
const fs = require('node:fs/promises');
const path = require('node:path');
const sharp = require('sharp');

const brand = path.join(__dirname, '../public/media/support/brand');

function ico(images) {
  const header = Buffer.alloc(6 + 16 * images.length);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(images.length, 4);
  let offset = header.length;
  images.forEach(({ size, data }, index) => {
    const entry = 6 + index * 16;
    header[entry] = size === 256 ? 0 : size;
    header[entry + 1] = size === 256 ? 0 : size;
    header.writeUInt16LE(1, entry + 4);
    header.writeUInt16LE(32, entry + 6);
    header.writeUInt32LE(data.length, entry + 8);
    header.writeUInt32LE(offset, entry + 12);
    offset += data.length;
  });
  return Buffer.concat([header, ...images.map((image) => image.data)]);
}

(async () => {
  const source = await fs.readFile(path.join(brand, 'arhri-logo-green-r.png'));
  await sharp(source)
    .webp({ quality: 95, effort: 6 })
    .toFile(path.join(brand, 'arhri-logo-green-r.webp'));
  const dataUrl = `data:image/png;base64,${source.toString('base64')}`;
  // SVG viewports frame the supplied pixels; no mark, lettering or colours are redrawn.
  const emblem = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="158 244 460 460"><image width="1536" height="1024" href="${dataUrl}"/></svg>`
  );
  const iconSizes = [16, 32, 48, 256];
  const images = [];
  for (const size of iconSizes) {
    const data = await sharp(emblem).resize(size, size).png().toBuffer();
    images.push({ size, data });
    if (size === 32 || size === 48)
      await fs.writeFile(path.join(brand, `favicon-${size}.png`), data);
  }
  await fs.writeFile(path.join(__dirname, '../app/favicon.ico'), ico(images));
  for (const [name, size] of [
    ['favicon.png', 96],
    ['apple-touch-icon.png', 180],
    ['logo.png', 512],
  ]) {
    await sharp(emblem).resize(size, size).png().toFile(path.join(brand, name));
  }
  // Keep the existing SVG URL working for bookmarks and previously cached pages.
  const small = await fs.readFile(path.join(brand, 'logo.png'));
  await fs.writeFile(
    path.join(brand, 'favicon.svg'),
    `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><image width="512" height="512" href="data:image/png;base64,${small.toString('base64')}"/></svg>\n`
  );
  const lockup = await sharp(
    Buffer.from(
      `<svg xmlns="http://www.w3.org/2000/svg" width="660" height="242" viewBox="160 250 1220 448"><image width="1536" height="1024" href="${dataUrl}"/></svg>`
    )
  )
    .png()
    .toBuffer();
  for (const face of ['front', 'back']) {
    const cardPath = path.join(brand, `../cards/health-card-${face}.svg`);
    let card = await fs.readFile(cardPath, 'utf8');
    const colour = face === 'front' ? '#12344a' : '#ffffff';
    const cardBrand = `<g id="card-brand"><rect x="40" y="24" width="350" height="133" rx="10" fill="#ffffff"/><image x="50" y="30" width="330" height="121" href="data:image/png;base64,${lockup.toString('base64')}"/><text x="420" y="88" font-family="Arial,sans-serif" font-size="18" font-weight="600" fill="${colour}">HEALTH-CARD INITIATIVE</text></g>`;
    const existingBrand = /<g id="card-brand">[\s\S]*?<\/g>/;
    const originalBrand =
      /<g transform="translate\((?:44 32|48 38)\)[^"]*">[\s\S]*?<\/g><text[^>]*>ANTHARAGANGE<\/text><text[^>]*>HEALTH-CARD INITIATIVE<\/text>/;
    if (!existingBrand.test(card) && !originalBrand.test(card))
      throw new Error(`Missing brand area: ${face}`);
    card = card.replace(existingBrand.test(card) ? existingBrand : originalBrand, cardBrand);
    card = card.replace(
      /<text[^>]*>(?:DESIGN SAMPLE|No real patient data|Illustrative barcode only|DEMO CARD · NOT VALID FOR PATIENT USE|DEMO ONLY · No actual enrolment or benefit entitlement)<\/text>/g,
      ''
    );
    await fs.writeFile(cardPath, card);
  }
  const share =
    Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
    <rect width="1200" height="630" fill="#ffffff"/>
    <svg x="64" y="48" width="560" height="206" viewBox="160 250 1220 448"><image width="1536" height="1024" href="${dataUrl}"/></svg>
    <path d="M64 294H144" stroke="#6cb535" stroke-width="5"/>
    <text x="64" y="380" font-family="Georgia,serif" font-size="59" fill="#12344a">Healthcare for rural Kolar.</text>
    <text x="66" y="435" font-family="Arial,sans-serif" font-size="29" fill="#516674">Rural families. Disability inclusion.</text>
    <text x="66" y="518" font-family="Arial,sans-serif" font-size="23" fill="#087f8c">Purpose · Community programmes · Proposed facilities</text>
    <path d="M0 586Q300 534 600 586T1200 586V630H0Z" fill="#eaf5f7"/>
    <path d="M0 615Q300 564 600 615T1200 615V630H0Z" fill="#087f8c"/>
  </svg>`);
  await sharp(share).png().toFile(path.join(brand, 'social-share.png'));
  console.log(
    'Prepared ICO (16/32/48/256), PNG favicons, Apple icon, organization emblem, health cards and social share.'
  );
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
