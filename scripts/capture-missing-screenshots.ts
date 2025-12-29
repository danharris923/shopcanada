/**
 * Capture missing brand screenshots using Playwright
 * Handles cookie banners, popups, and location prompts
 *
 * Run with: npx tsx scripts/capture-missing-screenshots.ts
 */

import { chromium, Browser, Page } from 'playwright'
import { createClient } from '@supabase/supabase-js'
import { Pool } from 'pg'
import * as fs from 'fs'
import * as path from 'path'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const SUPABASE_URL = process.env.SUPABASE_URL!
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!
const POSTGRES_URL = process.env.POSTGRES_URL!
const BUCKET_NAME = 'brand-screenshots'
const SCREENSHOT_DIR = './temp-screenshots'

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY)
const pool = new Pool({
  connectionString: POSTGRES_URL,
  ssl: { rejectUnauthorized: false }
})

// Brands missing screenshots
const MISSING_BRANDS = [
  { slug: 'article', url: 'https://www.article.com' },
  { slug: 'atmosphere', url: 'https://www.atmosphere.ca' },
  { slug: 'canada-computers', url: 'https://www.canadacomputers.com' },
  { slug: 'eastside-marios', url: 'https://www.eastsidemarios.com/en.html' },
  { slug: 'eb-games', url: 'https://www.ebgames.ca' },
  { slug: 'harveys', url: 'https://www.harveys.ca/' },
  { slug: 'homesense', url: 'https://www.homesense.ca' },
  { slug: 'the-bay', url: 'https://www.thebay.com' },
  { slug: 'indigo', url: 'https://www.indigo.ca' },
  { slug: 'joe-fresh', url: 'https://www.joefresh.com/ca' },
  { slug: 'kelseys', url: 'https://www.kelseys.ca/' },
  { slug: 'kinkd-beauty', url: 'https://kinkdbeauty.shop/' },
  { slug: 'lowes-canada', url: 'https://www.lowes.ca/' },
  { slug: 'lululemon', url: 'https://www.lululemon.com' },
  { slug: 'mastermind-toys', url: 'https://www.mastermindtoys.com' },
  { slug: 'memory-express', url: 'https://www.memoryexpress.com' },
  { slug: 'montanas', url: 'https://www.montanas.ca/' },
  { slug: 'roots', url: 'https://www.roots.com' },
  { slug: 'sail', url: 'https://www.sail.ca' },
  { slug: 'shoppers', url: 'https://www.shoppersdrugmart.ca' },
  { slug: 'smythe', url: 'https://smythe.com/' },
  { slug: 'sportium', url: 'https://www.sportium.ca' },
  { slug: 'state-main', url: 'https://www.stateandmain.ca/' },
  { slug: 'swiss-chalet', url: 'https://www.swisschalet.com/' },
]

// Common selectors for cookie/popup dismissal
const POPUP_SELECTORS = [
  // Cookie banners
  '[id*="cookie"] button[class*="accept"]',
  '[id*="cookie"] button[class*="close"]',
  '[class*="cookie"] button[class*="accept"]',
  '[class*="cookie"] button[class*="close"]',
  '[class*="cookie-banner"] button',
  '[id*="onetrust"] button[id*="accept"]',
  '#onetrust-accept-btn-handler',
  '.onetrust-close-btn-handler',
  '[class*="consent"] button[class*="accept"]',
  '[class*="gdpr"] button[class*="accept"]',
  // Generic popups
  '[class*="popup"] [class*="close"]',
  '[class*="modal"] [class*="close"]',
  '[class*="overlay"] [class*="close"]',
  '[aria-label="Close"]',
  '[aria-label="close"]',
  'button[class*="close-button"]',
  '.close-modal',
  '.modal-close',
  // Newsletter popups
  '[class*="newsletter"] [class*="close"]',
  '[class*="subscribe"] [class*="close"]',
  '[class*="email-signup"] [class*="close"]',
  // Location selectors
  '[class*="location"] [class*="close"]',
  '[class*="country"] [class*="close"]',
  '[class*="store-selector"] [class*="close"]',
]

async function dismissPopups(page: Page): Promise<void> {
  // Wait a moment for popups to appear
  await page.waitForTimeout(2000)

  for (const selector of POPUP_SELECTORS) {
    try {
      const elements = await page.$$(selector)
      for (const element of elements) {
        if (await element.isVisible()) {
          await element.click()
          console.log(`      Dismissed: ${selector}`)
          await page.waitForTimeout(500)
        }
      }
    } catch {
      // Ignore errors - selector might not exist
    }
  }

  // Also try pressing Escape key to close any modal
  await page.keyboard.press('Escape')
  await page.waitForTimeout(500)
}

async function captureScreenshot(browser: Browser, slug: string, url: string): Promise<string | null> {
  console.log(`   Capturing: ${slug}`)
  console.log(`      URL: ${url}`)

  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    locale: 'en-CA',
    geolocation: { latitude: 43.6532, longitude: -79.3832 }, // Toronto
    permissions: ['geolocation'],
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  })

  const page = await context.newPage()

  try {
    // Navigate with timeout
    await page.goto(url, {
      waitUntil: 'networkidle',
      timeout: 30000
    })

    // Dismiss any popups/cookie banners
    await dismissPopups(page)

    // Scroll down slightly and back up to trigger lazy loading
    await page.evaluate(() => {
      window.scrollTo(0, 300)
    })
    await page.waitForTimeout(1000)
    await page.evaluate(() => {
      window.scrollTo(0, 0)
    })
    await page.waitForTimeout(500)

    // Final popup dismissal
    await dismissPopups(page)

    // Take screenshot
    const filename = `${slug}.png`
    const filepath = path.join(SCREENSHOT_DIR, filename)

    await page.screenshot({
      path: filepath,
      type: 'png',
      clip: { x: 0, y: 0, width: 1280, height: 800 }
    })

    console.log(`      ✓ Saved: ${filename}`)
    return filepath

  } catch (error: any) {
    console.log(`      ✗ Failed: ${error.message}`)
    return null
  } finally {
    await context.close()
  }
}

async function uploadToSupabase(filepath: string, slug: string): Promise<string | null> {
  const filename = `${slug}.png`
  const fileBuffer = fs.readFileSync(filepath)

  const { error } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(filename, fileBuffer, {
      contentType: 'image/png',
      upsert: true
    })

  if (error) {
    console.log(`      ✗ Upload failed: ${error.message}`)
    return null
  }

  const publicUrl = `${SUPABASE_URL}/storage/v1/object/public/${BUCKET_NAME}/${filename}`
  console.log(`      ✓ Uploaded to Supabase`)
  return publicUrl
}

async function updateDatabase(slug: string, screenshotUrl: string): Promise<void> {
  await pool.query(
    'UPDATE stores SET screenshot_url = $1 WHERE slug = $2',
    [screenshotUrl, slug]
  )
  console.log(`      ✓ Database updated`)
}

async function main() {
  console.log('='.repeat(60))
  console.log('Capture Missing Brand Screenshots')
  console.log('='.repeat(60) + '\n')

  // Create temp directory
  if (!fs.existsSync(SCREENSHOT_DIR)) {
    fs.mkdirSync(SCREENSHOT_DIR, { recursive: true })
  }

  console.log(`1. Launching browser...\n`)
  const browser = await chromium.launch({
    headless: true
  })

  console.log(`2. Capturing ${MISSING_BRANDS.length} screenshots...\n`)

  let captured = 0
  let failed = 0

  for (const brand of MISSING_BRANDS) {
    const filepath = await captureScreenshot(browser, brand.slug, brand.url)

    if (filepath) {
      const url = await uploadToSupabase(filepath, brand.slug)
      if (url) {
        await updateDatabase(brand.slug, url)
        captured++
      } else {
        failed++
      }
    } else {
      failed++
    }

    console.log('')
  }

  await browser.close()

  // Cleanup temp directory
  fs.rmSync(SCREENSHOT_DIR, { recursive: true, force: true })

  console.log('='.repeat(60))
  console.log(`Results: ${captured} captured, ${failed} failed`)
  console.log('='.repeat(60))

  await pool.end()
}

main().catch(console.error)
