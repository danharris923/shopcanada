const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const PUBLIC_DIR = path.join(__dirname, '..', 'public');

const HERO_IMAGES = [
  { input: 'hero-desktop.png', output: 'hero-desktop.webp', width: 1920, quality: 80 },
  { input: 'hero-mobile.png', output: 'hero-mobile.webp', width: 768, quality: 80 },
];

async function compressImages() {
  console.log('Compressing hero images...\n');

  for (const img of HERO_IMAGES) {
    const inputPath = path.join(PUBLIC_DIR, img.input);
    const outputPath = path.join(PUBLIC_DIR, img.output);

    if (!fs.existsSync(inputPath)) {
      console.log(`Skipping ${img.input} - file not found`);
      continue;
    }

    const inputStats = fs.statSync(inputPath);
    const inputSizeKB = (inputStats.size / 1024).toFixed(1);

    await sharp(inputPath)
      .resize(img.width, null, { withoutEnlargement: true })
      .webp({ quality: img.quality })
      .toFile(outputPath);

    const outputStats = fs.statSync(outputPath);
    const outputSizeKB = (outputStats.size / 1024).toFixed(1);
    const savings = ((1 - outputStats.size / inputStats.size) * 100).toFixed(0);

    console.log(`${img.input} (${inputSizeKB}KB) -> ${img.output} (${outputSizeKB}KB) [${savings}% smaller]`);
  }

  console.log('\nDone! Update page.tsx to use .webp files.');
}

compressImages().catch(console.error);
