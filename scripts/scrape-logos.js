/**
 * Logo Scraper for Canadian Brands
 * =================================
 * Fetches high-quality logos using multiple sources:
 * 1. Clearbit Logo API (primary - high quality)
 * 2. Google Favicon API (fallback)
 * 3. DuckDuckGo Icons (fallback)
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  dim: '\x1b[2m'
};

const log = (color, msg) => console.log(`${color}[${new Date().toISOString()}] ${msg}${colors.reset}`);

// Extract domain from URL
function extractDomain(url) {
  try {
    const parsed = new URL(url);
    return parsed.hostname.replace('www.', '');
  } catch (e) {
    return null;
  }
}

// Check if URL returns a valid image (not 404)
function checkUrl(url) {
  return new Promise((resolve) => {
    const protocol = url.startsWith('https') ? https : http;
    const req = protocol.get(url, { timeout: 5000 }, (res) => {
      // Follow redirects
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        checkUrl(res.headers.location).then(resolve);
        return;
      }
      resolve(res.statusCode === 200);
    });
    req.on('error', () => resolve(false));
    req.on('timeout', () => {
      req.destroy();
      resolve(false);
    });
  });
}

// Get logo URL for a domain
async function getLogoUrl(domain) {
  // Try Clearbit first (highest quality)
  const clearbitUrl = `https://logo.clearbit.com/${domain}`;
  if (await checkUrl(clearbitUrl)) {
    return clearbitUrl;
  }

  // Try Google Favicon (128px)
  const googleUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
  if (await checkUrl(googleUrl)) {
    return googleUrl;
  }

  // Try DuckDuckGo
  const ddgUrl = `https://icons.duckduckgo.com/ip3/${domain}.ico`;
  if (await checkUrl(ddgUrl)) {
    return ddgUrl;
  }

  return null;
}

// Read the brands data file
function readBrandsFile() {
  const filePath = path.join(__dirname, '..', 'src', 'lib', 'brands-data.ts');
  return fs.readFileSync(filePath, 'utf-8');
}

// Write the brands data file
function writeBrandsFile(content) {
  const filePath = path.join(__dirname, '..', 'src', 'lib', 'brands-data.ts');
  fs.writeFileSync(filePath, content, 'utf-8');
}

// Parse brands from the TypeScript file
function parseBrands(content) {
  // Find the brands array - it ends with ] before the categoryIcons
  // Handle both Unix (\n) and Windows (\r\n) line endings
  const brandsMatch = content.match(/export const brands: Brand\[\] = \[([\s\S]*?)\]\s*\r?\n\r?\n\/\/ Generate categories with actual counts/);
  if (!brandsMatch) {
    throw new Error('Could not find brands array in file');
  }

  const brandsStr = brandsMatch[1];
  const brands = [];

  // Match individual brand objects - non-greedy to get each one
  const brandRegex = /\{\s*"slug":\s*"([^"]+)"[\s\S]*?"url":\s*"([^"]+)"[\s\S]*?\}/g;
  let match;

  while ((match = brandRegex.exec(brandsStr)) !== null) {
    const fullMatch = match[0];
    const slug = match[1];
    const url = match[2];

    // Check if already has logo
    const hasLogo = fullMatch.includes('"logo":');

    brands.push({
      slug,
      url,
      hasLogo,
      fullMatch
    });
  }

  return brands;
}

// Update brand with logo in the file content
function updateBrandWithLogo(content, slug, logoUrl) {
  // Find the brand object and add logo after url
  const brandPattern = new RegExp(
    `("slug":\\s*"${slug.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"[\\s\\S]*?"url":\\s*"[^"]+")`,
    'g'
  );

  return content.replace(brandPattern, `$1,\n    "logo": "${logoUrl}"`);
}

async function main() {
  log(colors.cyan, '🚀 Starting logo scraper for Canadian brands...');

  let content = readBrandsFile();
  const brands = parseBrands(content);

  log(colors.cyan, `📊 Found ${brands.length} brands to process`);

  let success = 0;
  let failed = 0;
  let skipped = 0;

  for (let i = 0; i < brands.length; i++) {
    const brand = brands[i];
    const progress = `[${i + 1}/${brands.length}]`;

    if (brand.hasLogo) {
      log(colors.dim, `${progress} ⏭️  ${brand.slug} - already has logo`);
      skipped++;
      continue;
    }

    const domain = extractDomain(brand.url);
    if (!domain) {
      log(colors.yellow, `${progress} ⚠️  ${brand.slug} - invalid URL: ${brand.url}`);
      failed++;
      continue;
    }

    log(colors.dim, `${progress} 🔍 ${brand.slug} - checking ${domain}...`);

    const logoUrl = await getLogoUrl(domain);

    if (logoUrl) {
      content = updateBrandWithLogo(content, brand.slug, logoUrl);
      log(colors.green, `${progress} ✅ ${brand.slug} - found logo: ${logoUrl}`);
      success++;
    } else {
      log(colors.yellow, `${progress} ⚠️  ${brand.slug} - no logo found for ${domain}`);
      failed++;
    }

    // Small delay to avoid rate limiting
    await new Promise(r => setTimeout(r, 100));
  }

  // Write updated content
  writeBrandsFile(content);

  log(colors.cyan, '');
  log(colors.cyan, '📊 Summary:');
  log(colors.green, `   ✅ Logos found: ${success}`);
  log(colors.yellow, `   ⚠️  No logo found: ${failed}`);
  log(colors.dim, `   ⏭️  Already had logo: ${skipped}`);
  log(colors.cyan, '');
  log(colors.green, '✨ Logo scraping complete! brands-data.ts updated.');
}

main().catch(err => {
  log(colors.red, `❌ Error: ${err.message}`);
  process.exit(1);
});
