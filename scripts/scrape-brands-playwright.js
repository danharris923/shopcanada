/**
 * Brand Scraper using Playwright
 *
 * This script:
 * 1. Visits each brand's website
 * 2. Takes a screenshot for preview on our site
 * 3. Finds and scrapes "About Us" content
 * 4. Saves results to JSON for integration
 *
 * Run: npx playwright install chromium && node scripts/scrape-brands-playwright.js
 */

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

// Import brands from the data file (we'll read it as text and parse)
const brandsFilePath = path.join(__dirname, '../src/lib/brands-data.ts');
const brandsFileContent = fs.readFileSync(brandsFilePath, 'utf-8');

// Extract brands array from TypeScript file
function extractBrands(content) {
  const match = content.match(/export const brands: Brand\[\] = (\[[\s\S]*?\]);?\s*$/m);
  if (!match) {
    // Try alternate pattern
    const arrayStart = content.indexOf('export const brands');
    if (arrayStart === -1) throw new Error('Could not find brands array');

    const brackStart = content.indexOf('[', arrayStart);
    let depth = 0;
    let brackEnd = brackStart;

    for (let i = brackStart; i < content.length; i++) {
      if (content[i] === '[') depth++;
      if (content[i] === ']') depth--;
      if (depth === 0) {
        brackEnd = i + 1;
        break;
      }
    }

    const arrayStr = content.slice(brackStart, brackEnd);
    return JSON.parse(arrayStr);
  }
  return JSON.parse(match[1]);
}

// About page URL patterns to try
const ABOUT_PAGE_PATTERNS = [
  '/about',
  '/about-us',
  '/our-story',
  '/company',
  '/about/our-story',
  '/pages/about',
  '/pages/about-us',
  '/en/about',
  '/en-ca/about',
  '/en-ca/about-us',
];

// Configuration
const CONFIG = {
  screenshotDir: path.join(__dirname, '../public/brand-screenshots'),
  resultsFile: path.join(__dirname, 'scrape-results.json'),
  progressFile: path.join(__dirname, 'scrape-progress.json'),
  delayBetweenBrands: 2000, // 2 seconds
  pageTimeout: 15000, // 15 seconds
  screenshotWidth: 1280,
  screenshotHeight: 800,
  maxBrands: null, // null = all brands
};

// Color logging
const log = {
  info: (msg) => console.log(`\x1b[36m[${new Date().toISOString()}] ${msg}\x1b[0m`),
  success: (msg) => console.log(`\x1b[32m[${new Date().toISOString()}] ✓ ${msg}\x1b[0m`),
  warn: (msg) => console.log(`\x1b[33m[${new Date().toISOString()}] ⚠ ${msg}\x1b[0m`),
  error: (msg) => console.log(`\x1b[31m[${new Date().toISOString()}] ✗ ${msg}\x1b[0m`),
};

// Load progress if exists
function loadProgress() {
  try {
    if (fs.existsSync(CONFIG.progressFile)) {
      return JSON.parse(fs.readFileSync(CONFIG.progressFile, 'utf-8'));
    }
  } catch (e) {
    log.warn('Could not load progress file, starting fresh');
  }
  return { completed: [], failed: [], results: [] };
}

// Save progress
function saveProgress(progress) {
  fs.writeFileSync(CONFIG.progressFile, JSON.stringify(progress, null, 2));
}

// Extract About content from page
async function extractAboutContent(page) {
  return await page.evaluate(() => {
    // Remove unwanted elements more aggressively
    const unwanted = document.querySelectorAll(`
      nav, header, footer, script, style, iframe, noscript,
      .cookie-banner, [class*="cookie"], [class*="Cookie"],
      [class*="popup"], [class*="Popup"], [class*="modal"], [class*="Modal"],
      [class*="consent"], [class*="Consent"], [class*="privacy"],
      [class*="banner"], [class*="Banner"], [class*="overlay"],
      [class*="chat"], [class*="Chat"], [class*="widget"],
      [id*="cookie"], [id*="consent"], [id*="popup"], [id*="modal"],
      [role="dialog"], [role="banner"], [role="navigation"],
      .nav, .menu, .header, .footer, .sidebar,
      button, form, input, select
    `);
    unwanted.forEach(el => el.remove());

    // Try to find main content area
    const selectors = [
      'main',
      'article',
      '[class*="about"]',
      '[class*="story"]',
      '[class*="content"]',
      '.container',
      '#content',
    ];

    let content = '';
    for (const selector of selectors) {
      const el = document.querySelector(selector);
      if (el && el.textContent.trim().length > 200) {
        content = el.textContent.trim();
        break;
      }
    }

    // Fallback to body
    if (!content || content.length < 200) {
      content = document.body.textContent.trim();
    }

    // Clean up whitespace
    content = content
      .replace(/\s+/g, ' ')
      .replace(/\n\s*\n/g, '\n\n')
      .trim();

    // Limit to ~1500 words
    const words = content.split(/\s+/);
    if (words.length > 1500) {
      content = words.slice(0, 1500).join(' ') + '...';
    }

    return content;
  });
}

// Find About page URL
async function findAboutPage(page, baseUrl) {
  // First try to find About link on the current page
  const aboutLink = await page.evaluate(() => {
    const links = Array.from(document.querySelectorAll('a'));
    for (const link of links) {
      const text = link.textContent.toLowerCase().trim();
      const href = link.getAttribute('href') || '';
      if (
        (text.includes('about') || text.includes('our story') || text.includes('company')) &&
        href &&
        !href.includes('javascript:') &&
        !href.startsWith('#')
      ) {
        return link.href;
      }
    }
    return null;
  });

  if (aboutLink) return aboutLink;

  // Try common patterns
  for (const pattern of ABOUT_PAGE_PATTERNS) {
    try {
      const url = new URL(pattern, baseUrl).toString();
      return url;
    } catch (e) {
      continue;
    }
  }

  return null;
}

// Scrape a single brand
async function scrapeBrand(browser, brand, index, total) {
  log.info(`[${index + 1}/${total}] Scraping ${brand.name} (${brand.url})`);

  const result = {
    slug: brand.slug,
    name: brand.name,
    url: brand.url,
    screenshot: null,
    aboutContent: null,
    aboutUrl: null,
    error: null,
    timestamp: new Date().toISOString(),
  };

  const context = await browser.newContext({
    viewport: { width: CONFIG.screenshotWidth, height: CONFIG.screenshotHeight },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  });

  const page = await context.newPage();

  try {
    // Navigate to homepage
    await page.goto(brand.url, {
      timeout: CONFIG.pageTimeout,
      waitUntil: 'domcontentloaded'
    });

    // Wait a bit for page to render
    await page.waitForTimeout(2000);

    // Dismiss cookie banners if present
    try {
      const cookieButtons = await page.$$('button:has-text("Accept"), button:has-text("Got it"), button:has-text("OK"), [class*="cookie"] button');
      for (const btn of cookieButtons.slice(0, 2)) {
        await btn.click().catch(() => {});
        await page.waitForTimeout(300);
      }
    } catch (e) {
      // Ignore cookie banner errors
    }

    // Take screenshot
    const screenshotFilename = `${brand.slug}.png`;
    const screenshotPath = path.join(CONFIG.screenshotDir, screenshotFilename);

    await page.screenshot({
      path: screenshotPath,
      fullPage: false,
    });

    result.screenshot = `/brand-screenshots/${screenshotFilename}`;
    log.success(`Screenshot saved: ${screenshotFilename}`);

    // Find and visit About page
    const aboutUrl = await findAboutPage(page, brand.url);

    if (aboutUrl) {
      try {
        await page.goto(aboutUrl, {
          timeout: CONFIG.pageTimeout,
          waitUntil: 'domcontentloaded'
        });
        await page.waitForTimeout(1500);

        result.aboutUrl = aboutUrl;
        result.aboutContent = await extractAboutContent(page);

        if (result.aboutContent && result.aboutContent.length > 100) {
          log.success(`Scraped about content: ${result.aboutContent.length} chars`);
        } else {
          log.warn(`About content too short or empty`);
        }
      } catch (e) {
        log.warn(`Could not load about page: ${e.message}`);
      }
    } else {
      log.warn(`No about page found for ${brand.name}`);
    }

  } catch (e) {
    result.error = e.message;
    log.error(`Failed to scrape ${brand.name}: ${e.message}`);
  } finally {
    await context.close();
  }

  return result;
}

// Main scraping function
async function main() {
  log.info('='.repeat(60));
  log.info('Starting Brand Scraper with Playwright');
  log.info('='.repeat(60));

  // Ensure screenshot directory exists
  if (!fs.existsSync(CONFIG.screenshotDir)) {
    fs.mkdirSync(CONFIG.screenshotDir, { recursive: true });
    log.info(`Created screenshot directory: ${CONFIG.screenshotDir}`);
  }

  // Load brands
  let brands;
  try {
    brands = extractBrands(brandsFileContent);
    log.info(`Loaded ${brands.length} brands from data file`);
  } catch (e) {
    log.error(`Failed to load brands: ${e.message}`);
    process.exit(1);
  }

  // Apply limit if set
  if (CONFIG.maxBrands) {
    brands = brands.slice(0, CONFIG.maxBrands);
    log.info(`Limited to ${CONFIG.maxBrands} brands for testing`);
  }

  // Load progress
  const progress = loadProgress();
  log.info(`Previously completed: ${progress.completed.length}, Failed: ${progress.failed.length}`);

  // Filter out already completed brands
  const remainingBrands = brands.filter(b =>
    !progress.completed.includes(b.slug) && !progress.failed.includes(b.slug)
  );
  log.info(`Remaining brands to scrape: ${remainingBrands.length}`);

  if (remainingBrands.length === 0) {
    log.success('All brands already scraped!');
    return;
  }

  // Launch browser
  const browser = await chromium.launch({
    headless: true,
  });

  log.info('Browser launched');

  // Scrape each brand
  for (let i = 0; i < remainingBrands.length; i++) {
    const brand = remainingBrands[i];

    try {
      const result = await scrapeBrand(browser, brand, i, remainingBrands.length);

      if (result.error) {
        progress.failed.push(brand.slug);
      } else {
        progress.completed.push(brand.slug);
      }

      progress.results.push(result);

      // Save progress every 10 brands
      if ((i + 1) % 10 === 0) {
        saveProgress(progress);
        log.info(`Progress saved (${progress.completed.length} completed, ${progress.failed.length} failed)`);
      }

      // Delay between brands
      if (i < remainingBrands.length - 1) {
        await new Promise(r => setTimeout(r, CONFIG.delayBetweenBrands));
      }

    } catch (e) {
      log.error(`Unexpected error for ${brand.name}: ${e.message}`);
      progress.failed.push(brand.slug);
    }
  }

  // Save final progress
  saveProgress(progress);

  // Close browser
  await browser.close();

  // Write final results
  fs.writeFileSync(CONFIG.resultsFile, JSON.stringify(progress.results, null, 2));

  // Summary
  log.info('='.repeat(60));
  log.success('Scraping Complete!');
  log.info(`Total brands: ${brands.length}`);
  log.success(`Completed: ${progress.completed.length}`);
  log.warn(`Failed: ${progress.failed.length}`);
  log.info(`Results saved to: ${CONFIG.resultsFile}`);
  log.info(`Screenshots saved to: ${CONFIG.screenshotDir}`);
  log.info('='.repeat(60));
}

// Run
main().catch(e => {
  log.error(`Fatal error: ${e.message}`);
  process.exit(1);
});
