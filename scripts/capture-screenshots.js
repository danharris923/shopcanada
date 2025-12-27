const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

// Brands to capture screenshots for
const brands = [
  { slug: 'amazon', url: 'https://www.amazon.ca/' },
  { slug: 'walmart', url: 'https://www.walmart.ca/' },
  { slug: 'costco', url: 'https://www.costco.ca/' },
  { slug: 'best-buy', url: 'https://www.bestbuy.ca/' },
  { slug: 'home-depot', url: 'https://www.homedepot.ca/' },
  { slug: 'ikea', url: 'https://www.ikea.com/ca/en/' },
  { slug: 'sephora', url: 'https://www.sephora.com/ca/en/' },
  { slug: 'h-m', url: 'https://www2.hm.com/en_ca/' },
  { slug: 'zara', url: 'https://www.zara.com/ca/' },
  { slug: 'uniqlo', url: 'https://www.uniqlo.com/ca/en/' },
  { slug: 'nike', url: 'https://www.nike.com/ca/' },
  { slug: 'adidas', url: 'https://www.adidas.ca/' },
  { slug: 'apple', url: 'https://www.apple.com/ca/' },
  { slug: 'lowes', url: 'https://www.lowes.ca/' },
  { slug: 'old-navy', url: 'https://oldnavy.gapcanada.ca/' },
  { slug: 'gap', url: 'https://www.gapcanada.ca/' },
  { slug: 'microsoft', url: 'https://www.microsoft.com/en-ca/' },
  { slug: 'staples', url: 'https://www.staples.ca/' },
  { slug: 'winners', url: 'https://www.winners.ca/' },
  { slug: 'marshalls', url: 'https://www.marshalls.ca/' },
  { slug: 'bath-body-works', url: 'https://www.bathandbodyworks.ca/' },
  { slug: 'foot-locker', url: 'https://www.footlocker.ca/' },
  { slug: 'indigo', url: 'https://www.indigo.ca/' },
  { slug: 'the-bay', url: 'https://www.thebay.com/' },
  { slug: 'sport-chek', url: 'https://www.sportchek.ca/' },
  { slug: 'well-ca', url: 'https://well.ca/' },
  { slug: 'london-drugs', url: 'https://www.londondrugs.com/' },
  { slug: 'newegg', url: 'https://www.newegg.ca/' },
  { slug: 'the-source', url: 'https://www.thesource.ca/' },
];

// Common cookie/popup selectors to dismiss
const dismissSelectors = [
  // Cookie banners
  '[id*="cookie"] button[class*="accept"]',
  '[id*="cookie"] button[class*="close"]',
  '[class*="cookie"] button[class*="accept"]',
  '[class*="cookie"] button[class*="close"]',
  'button[id*="accept-cookie"]',
  'button[id*="acceptCookie"]',
  '[data-testid*="cookie"] button',
  '#onetrust-accept-btn-handler',
  '.onetrust-close-btn-handler',
  '#truste-consent-button',
  '[class*="consent"] button[class*="accept"]',
  '[class*="gdpr"] button',
  // Location/country selectors
  '[class*="country"] button[class*="close"]',
  '[class*="location"] button[class*="close"]',
  '[class*="modal"] button[class*="close"]',
  '[class*="popup"] button[class*="close"]',
  'button[aria-label="Close"]',
  'button[aria-label="close"]',
  '[class*="dismiss"]',
  // Generic close buttons
  '.modal-close',
  '.close-btn',
  '.btn-close',
  '[data-dismiss="modal"]',
];

async function dismissPopups(page) {
  for (const selector of dismissSelectors) {
    try {
      const elements = await page.$$(selector);
      for (const el of elements) {
        if (await el.isVisible()) {
          await el.click();
          await page.waitForTimeout(500);
        }
      }
    } catch (e) {
      // Ignore errors
    }
  }
}

async function captureScreenshot(browser, brand, outputDir) {
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    locale: 'en-CA',
    geolocation: { latitude: 43.65, longitude: -79.38 }, // Toronto
    permissions: ['geolocation'],
  });

  const page = await context.newPage();

  try {
    console.log(`[${brand.slug}] Navigating to ${brand.url}...`);

    await page.goto(brand.url, {
      waitUntil: 'domcontentloaded',
      timeout: 30000
    });

    // Wait for page to settle
    await page.waitForTimeout(2000);

    // Try to dismiss popups multiple times
    await dismissPopups(page);
    await page.waitForTimeout(1000);
    await dismissPopups(page);

    // Scroll down slightly to trigger lazy loading, then back up
    await page.evaluate(() => window.scrollTo(0, 300));
    await page.waitForTimeout(500);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(500);

    // Final popup check
    await dismissPopups(page);

    // Take screenshot
    const screenshotPath = path.join(outputDir, `${brand.slug}.png`);
    await page.screenshot({
      path: screenshotPath,
      fullPage: false
    });

    console.log(`[${brand.slug}] Screenshot saved to ${screenshotPath}`);
    return true;
  } catch (error) {
    console.error(`[${brand.slug}] Error: ${error.message}`);
    return false;
  } finally {
    await context.close();
  }
}

async function main() {
  const outputDir = path.join(__dirname, '..', 'public', 'brand-screenshots');

  // Create output directory if it doesn't exist
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  console.log(`\nCapturing screenshots for ${brands.length} brands...\n`);
  console.log(`Output directory: ${outputDir}\n`);

  const browser = await chromium.launch({
    headless: true,
  });

  let success = 0;
  let failed = 0;

  for (const brand of brands) {
    const result = await captureScreenshot(browser, brand, outputDir);
    if (result) {
      success++;
    } else {
      failed++;
    }
  }

  await browser.close();

  console.log(`\n========================================`);
  console.log(`Screenshots captured: ${success}/${brands.length}`);
  console.log(`Failed: ${failed}`);
  console.log(`========================================\n`);
}

main().catch(console.error);
