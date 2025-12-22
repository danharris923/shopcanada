/**
 * Brand Scraper - REVERSE (starts from end of list)
 * Runs in parallel with main scraper for speed
 */

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const brandsFilePath = path.join(__dirname, '../src/lib/brands-data.ts');
const brandsFileContent = fs.readFileSync(brandsFilePath, 'utf-8');

function extractBrands(content) {
  // Find the brands array more robustly
  const match = content.match(/export const brands[^=]*=\s*(\[[\s\S]*\])\s*;?\s*(?:export|$)/);
  if (match) {
    try {
      return JSON.parse(match[1]);
    } catch (e) {
      // Try alternate parsing
    }
  }

  // Fallback: manual bracket matching
  const arrayStart = content.indexOf('export const brands');
  if (arrayStart === -1) throw new Error('Could not find brands array');
  const brackStart = content.indexOf('[', arrayStart);
  let depth = 0;
  let brackEnd = brackStart;
  for (let i = brackStart; i < content.length; i++) {
    if (content[i] === '[') depth++;
    if (content[i] === ']') depth--;
    if (depth === 0) { brackEnd = i + 1; break; }
  }
  const jsonStr = content.slice(brackStart, brackEnd);
  console.log('Attempting to parse', jsonStr.length, 'chars');
  return JSON.parse(jsonStr);
}

const ABOUT_PAGE_PATTERNS = [
  '/about', '/about-us', '/our-story', '/company',
  '/about/our-story', '/pages/about', '/pages/about-us',
  '/en/about', '/en-ca/about', '/en-ca/about-us',
];

const CONFIG = {
  screenshotDir: path.join(__dirname, '../public/brand-screenshots'),
  resultsFile: path.join(__dirname, 'scrape-results-reverse.json'),
  progressFile: path.join(__dirname, 'scrape-progress-reverse.json'),
  delayBetweenBrands: 2000,
  pageTimeout: 15000,
  screenshotWidth: 1280,
  screenshotHeight: 800,
  startFromEnd: true, // Process in reverse
};

const log = {
  info: (msg) => console.log(`\x1b[36m[REVERSE] ${msg}\x1b[0m`),
  success: (msg) => console.log(`\x1b[32m[REVERSE] ✓ ${msg}\x1b[0m`),
  warn: (msg) => console.log(`\x1b[33m[REVERSE] ⚠ ${msg}\x1b[0m`),
  error: (msg) => console.log(`\x1b[31m[REVERSE] ✗ ${msg}\x1b[0m`),
};

function loadProgress() {
  try {
    if (fs.existsSync(CONFIG.progressFile)) {
      return JSON.parse(fs.readFileSync(CONFIG.progressFile, 'utf-8'));
    }
  } catch (e) {}
  return { completed: [], failed: [], results: [] };
}

function saveProgress(progress) {
  fs.writeFileSync(CONFIG.progressFile, JSON.stringify(progress, null, 2));
}

// Check if main scraper already did this brand
function isAlreadyDone(slug) {
  try {
    const mainProgress = JSON.parse(fs.readFileSync(path.join(__dirname, 'scrape-progress.json'), 'utf-8'));
    return mainProgress.completed.includes(slug) || mainProgress.failed.includes(slug);
  } catch (e) {
    return false;
  }
}

async function extractAboutContent(page) {
  return await page.evaluate(() => {
    const unwanted = document.querySelectorAll(`
      nav, header, footer, script, style, iframe, noscript,
      .cookie-banner, [class*="cookie"], [class*="Cookie"],
      [class*="popup"], [class*="modal"], [class*="consent"],
      [class*="banner"], [class*="overlay"], [class*="chat"],
      [role="dialog"], [role="banner"], [role="navigation"],
      button, form, input, select
    `);
    unwanted.forEach(el => el.remove());

    const selectors = ['main', 'article', '[class*="about"]', '[class*="story"]', '[class*="content"]', '.container'];
    let content = '';
    for (const selector of selectors) {
      const el = document.querySelector(selector);
      if (el && el.textContent.trim().length > 200) {
        content = el.textContent.trim();
        break;
      }
    }
    if (!content || content.length < 200) content = document.body.textContent.trim();
    content = content.replace(/\s+/g, ' ').replace(/\n\s*\n/g, '\n\n').trim();
    const words = content.split(/\s+/);
    if (words.length > 1500) content = words.slice(0, 1500).join(' ') + '...';
    return content;
  });
}

async function findAboutPage(page, baseUrl) {
  const aboutLink = await page.evaluate(() => {
    const links = Array.from(document.querySelectorAll('a'));
    for (const link of links) {
      const text = link.textContent.toLowerCase().trim();
      const href = link.getAttribute('href') || '';
      if ((text.includes('about') || text.includes('our story')) && href && !href.includes('javascript:')) {
        return link.href;
      }
    }
    return null;
  });
  if (aboutLink) return aboutLink;
  for (const pattern of ABOUT_PAGE_PATTERNS) {
    try { return new URL(pattern, baseUrl).toString(); } catch (e) { continue; }
  }
  return null;
}

async function scrapeBrand(browser, brand, index, total) {
  log.info(`[${index + 1}/${total}] ${brand.name}`);

  const result = {
    slug: brand.slug, name: brand.name, url: brand.url,
    screenshot: null, aboutContent: null, aboutUrl: null, error: null,
    timestamp: new Date().toISOString(),
  };

  const context = await browser.newContext({
    viewport: { width: CONFIG.screenshotWidth, height: CONFIG.screenshotHeight },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
  });
  const page = await context.newPage();

  try {
    await page.goto(brand.url, { timeout: CONFIG.pageTimeout, waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(2000);

    try {
      const cookieButtons = await page.$$('button:has-text("Accept"), button:has-text("Got it")');
      for (const btn of cookieButtons.slice(0, 2)) {
        await btn.click().catch(() => {});
        await page.waitForTimeout(300);
      }
    } catch (e) {}

    const screenshotFilename = `${brand.slug}.png`;
    const screenshotPath = path.join(CONFIG.screenshotDir, screenshotFilename);

    // Skip if screenshot already exists
    if (!fs.existsSync(screenshotPath)) {
      await page.screenshot({ path: screenshotPath, fullPage: false });
      result.screenshot = `/brand-screenshots/${screenshotFilename}`;
      log.success(`Screenshot: ${screenshotFilename}`);
    } else {
      result.screenshot = `/brand-screenshots/${screenshotFilename}`;
      log.info(`Screenshot exists: ${screenshotFilename}`);
    }

    const aboutUrl = await findAboutPage(page, brand.url);
    if (aboutUrl) {
      try {
        await page.goto(aboutUrl, { timeout: CONFIG.pageTimeout, waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(1500);
        result.aboutUrl = aboutUrl;
        result.aboutContent = await extractAboutContent(page);
        if (result.aboutContent && result.aboutContent.length > 100) {
          log.success(`About: ${result.aboutContent.length} chars`);
        }
      } catch (e) {}
    }
  } catch (e) {
    result.error = e.message;
    log.error(`Failed: ${e.message.slice(0, 50)}`);
  } finally {
    await context.close();
  }
  return result;
}

async function main() {
  log.info('Starting REVERSE scraper (from end of list)');

  if (!fs.existsSync(CONFIG.screenshotDir)) {
    fs.mkdirSync(CONFIG.screenshotDir, { recursive: true });
  }

  let brands = extractBrands(brandsFileContent);
  log.info(`Loaded ${brands.length} brands`);

  // Reverse the list to start from end
  brands = brands.reverse();

  const progress = loadProgress();

  // Filter out already done by main scraper or this scraper
  const remainingBrands = brands.filter(b =>
    !progress.completed.includes(b.slug) &&
    !progress.failed.includes(b.slug) &&
    !isAlreadyDone(b.slug)
  );

  log.info(`Remaining: ${remainingBrands.length}`);

  if (remainingBrands.length === 0) {
    log.success('All done!');
    return;
  }

  const browser = await chromium.launch({ headless: true });

  for (let i = 0; i < remainingBrands.length; i++) {
    const brand = remainingBrands[i];

    // Double-check main scraper hasn't done it
    if (isAlreadyDone(brand.slug)) {
      log.info(`Skipping ${brand.name} (done by main)`);
      continue;
    }

    try {
      const result = await scrapeBrand(browser, brand, i, remainingBrands.length);
      if (result.error) {
        progress.failed.push(brand.slug);
      } else {
        progress.completed.push(brand.slug);
      }
      progress.results.push(result);

      if ((i + 1) % 10 === 0) {
        saveProgress(progress);
        log.info(`Saved (${progress.completed.length} done, ${progress.failed.length} failed)`);
      }

      if (i < remainingBrands.length - 1) {
        await new Promise(r => setTimeout(r, CONFIG.delayBetweenBrands));
      }
    } catch (e) {
      progress.failed.push(brand.slug);
    }
  }

  saveProgress(progress);
  await browser.close();
  fs.writeFileSync(CONFIG.resultsFile, JSON.stringify(progress.results, null, 2));
  log.success(`Done! ${progress.completed.length} completed, ${progress.failed.length} failed`);
}

main().catch(e => { log.error(`Fatal: ${e.message}`); process.exit(1); });
