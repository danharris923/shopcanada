/**
 * Merge scraped About content into brands-data.ts
 * More careful JSON escaping
 */

const fs = require('fs');
const path = require('path');

const log = {
  info: (msg) => console.log(`\x1b[36m${msg}\x1b[0m`),
  success: (msg) => console.log(`\x1b[32m✓ ${msg}\x1b[0m`),
};

// Properly escape string for JSON
function escapeForJson(str) {
  return str
    .replace(/\\/g, '\\\\')     // Backslashes first
    .replace(/"/g, '\\"')        // Double quotes
    .replace(/\n/g, ' ')         // Newlines to space
    .replace(/\r/g, '')          // Remove carriage returns
    .replace(/\t/g, ' ')         // Tabs to space
    .replace(/[\x00-\x1F]/g, '') // Remove control characters
    .replace(/\$/g, '$$$$');     // Escape $ for regex replacement
}

// Load scraped results
const resultsPath = path.join(__dirname, 'scrape-results.json');
const results = JSON.parse(fs.readFileSync(resultsPath, 'utf-8'));
log.info(`Loaded ${results.length} scraped results`);

// Create a map of slug -> aboutContent (cleaned)
const contentMap = {};
for (const result of results) {
  if (result.aboutContent && result.aboutContent.length > 150) {
    let content = result.aboutContent
      .replace(/\s+/g, ' ')
      .replace(/Current Time \d+:\d+.*?Remaining Time[^.]+/g, '')
      .replace(/Video Player is loading[^.]+/g, '')
      .replace(/Verifying you are human[^.]+/g, '') // Remove captcha text
      .replace(/Enable JavaScript[^.]+/g, '')
      .trim();

    // Skip if too short after cleanup or contains junk
    if (content.length > 150 && !content.includes('Verifying you are human')) {
      if (content.length > 1500) content = content.slice(0, 1500) + '...';
      contentMap[result.slug] = escapeForJson(content);
    }
  }
}
log.info(`${Object.keys(contentMap).length} brands have usable content`);

// Read brands-data.ts
const brandsPath = path.join(__dirname, '../src/lib/brands-data.ts');
let fileContent = fs.readFileSync(brandsPath, 'utf-8');

// Backup
fs.writeFileSync(brandsPath + '.bak', fileContent);

let updated = 0;

// Process each brand
for (const [slug, story] of Object.entries(contentMap)) {
  // Find: "slug": "the-slug" ... "description": "..." }
  // We need to find the closing } of each brand object

  const slugIndex = fileContent.indexOf(`"slug": "${slug}"`);
  if (slugIndex === -1) continue;

  // Find the closing brace for this brand object
  // Start from slug and find the next },{ or }] pattern
  let braceIndex = slugIndex;
  let foundEnd = false;

  for (let i = slugIndex; i < fileContent.length - 1; i++) {
    // Look for },\n  { or }\n] which marks end of brand object
    if (fileContent[i] === '}') {
      const nextChars = fileContent.slice(i, i + 10);
      if (nextChars.match(/^\}\s*,?\s*[\[\{]/) || nextChars.match(/^\}\s*\]/)) {
        braceIndex = i;
        foundEnd = true;
        break;
      }
    }
  }

  if (!foundEnd) continue;

  // Check if brandStory already exists between slugIndex and braceIndex
  const brandBlock = fileContent.slice(slugIndex, braceIndex);
  if (brandBlock.includes('brandStory')) continue;

  // Find the last property before the closing brace
  // Look backwards from braceIndex to find the last "
  let insertPoint = braceIndex;
  for (let i = braceIndex - 1; i > slugIndex; i--) {
    if (fileContent[i] === '"' && fileContent[i-1] !== '\\') {
      // Find the end of this string value
      insertPoint = braceIndex;
      break;
    }
  }

  // Insert brandStory before the closing brace
  const before = fileContent.slice(0, braceIndex);
  const after = fileContent.slice(braceIndex);

  // Check if we need a comma (if the previous char before } isn't already a comma)
  const lastContent = before.trimEnd();
  const needsComma = !lastContent.endsWith(',');

  const insertion = (needsComma ? ',' : '') + `\n    "brandStory": "${story}"\n  `;

  fileContent = before + insertion + after;
  updated++;
}

log.info(`Updated ${updated} brands`);

// Write file
fs.writeFileSync(brandsPath, fileContent);
log.success(`Saved brands-data.ts with ${updated} brand stories`);

// Verify JSON syntax by checking for common issues
const issues = [];
if (fileContent.includes('""slug"')) issues.push('Double quote issue');
if (fileContent.includes('},}')) issues.push('Double brace issue');

if (issues.length > 0) {
  log.info(`Potential issues found: ${issues.join(', ')}`);
} else {
  log.success('No obvious syntax issues detected');
}
