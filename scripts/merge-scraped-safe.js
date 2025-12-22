/**
 * Safe merge of scraped data into brands-data.ts
 * Parses the TS file properly instead of string manipulation
 */

const fs = require('fs');
const path = require('path');

const log = {
  info: (msg) => console.log(`\x1b[36m${msg}\x1b[0m`),
  success: (msg) => console.log(`\x1b[32m✓ ${msg}\x1b[0m`),
  warn: (msg) => console.log(`\x1b[33m⚠ ${msg}\x1b[0m`),
};

// Load scraped results
const resultsPath = path.join(__dirname, 'scrape-results.json');
const results = JSON.parse(fs.readFileSync(resultsPath, 'utf-8'));
log.info(`Loaded ${results.length} scraped results`);

// Build map of slug -> scraped data
const scrapedMap = {};
for (const r of results) {
  if (r.slug) {
    // Clean up the about content
    let content = r.aboutContent || '';
    content = content
      .replace(/\s+/g, ' ')
      .replace(/Verifying you are human[^.]+/gi, '')
      .replace(/Enable JavaScript[^.]+/gi, '')
      .replace(/Access to this page has been denied[^.]+/gi, '')
      .replace(/404: Not Found[^.]+/gi, '')
      .trim();

    // Skip junk content
    const isJunk = content.length < 150 ||
      content.includes('Verifying you are human') ||
      content.includes('Access to this page has been denied') ||
      content.includes('404: Not Found') ||
      content.includes('cookies are enabled');

    scrapedMap[r.slug] = {
      screenshot: r.screenshot || null,
      brandStory: isJunk ? null : (content.length > 2000 ? content.slice(0, 2000) + '...' : content)
    };
  }
}
log.info(`Mapped ${Object.keys(scrapedMap).length} brands`);

// Read brands-data.ts
const brandsPath = path.join(__dirname, '../src/lib/brands-data.ts');
let fileContent = fs.readFileSync(brandsPath, 'utf-8');

// Backup
fs.writeFileSync(brandsPath + '.merge-backup', fileContent);
log.info('Created backup at brands-data.ts.merge-backup');

// Find where brands array starts and ends
const searchStr = 'export const brands: Brand[] = [';
const brandsStart = fileContent.indexOf(searchStr);
if (brandsStart === -1) {
  console.error('Could not find brands array start!');
  process.exit(1);
}

// arrayStart is the position of the [ at the end of the match
const arrayStart = brandsStart + searchStr.length - 1;
let bracketCount = 0;
let brandsEnd = -1;
let inString = false;

for (let i = arrayStart; i < fileContent.length; i++) {
  const c = fileContent[i];
  const prev = fileContent[i-1];

  // Track string boundaries (skip escaped quotes)
  if (c === '"' && prev !== '\\') {
    inString = !inString;
  }

  // Only count brackets outside strings
  if (!inString) {
    if (c === '[') bracketCount++;
    if (c === ']') {
      bracketCount--;
      if (bracketCount === 0) {
        brandsEnd = i + 1;
        break;
      }
    }
  }
}

if (brandsEnd === -1) {
  console.error('Could not find brands array end!');
  process.exit(1);
}

const brandsArrayStr = fileContent.slice(arrayStart, brandsEnd);
let brandsArray;
try {
  brandsArray = JSON.parse(brandsArrayStr);
} catch (e) {
  console.error('Failed to parse brands array:', e.message);
  console.error('First 200 chars:', brandsArrayStr.slice(0, 200));
  process.exit(1);
}
log.info(`Parsed ${brandsArray.length} brands from file`);

// Merge scraped data
let addedStories = 0;
let addedScreenshots = 0;

for (const brand of brandsArray) {
  const scraped = scrapedMap[brand.slug];
  if (!scraped) continue;

  // Add screenshot if not already present
  if (scraped.screenshot && !brand.screenshot) {
    brand.screenshot = scraped.screenshot;
    addedScreenshots++;
  }

  // Add brandStory if not already present and content is good
  if (scraped.brandStory && !brand.brandStory) {
    brand.brandStory = scraped.brandStory;
    addedStories++;
  }
}

log.info(`Added ${addedStories} brand stories`);
log.info(`Added ${addedScreenshots} screenshots`);

// Rebuild the file
const beforeBrands = fileContent.slice(0, arrayStart);
const afterBrands = fileContent.slice(brandsEnd);

// Pretty print the brands array
const brandsJson = JSON.stringify(brandsArray, null, 2);

const newContent = beforeBrands + brandsJson + afterBrands;

fs.writeFileSync(brandsPath, newContent);
log.success(`Saved brands-data.ts with ${addedStories} stories and ${addedScreenshots} screenshots`);
