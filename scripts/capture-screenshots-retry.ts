/**
 * Retry capturing screenshots with more aggressive settings
 * Uses domcontentloaded instead of networkidle to avoid timeouts
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

// Failed brands to retry
const FAILED_BRANDS = [
  { slug: 'eastside-marios', url: 'https://www.eastsidemarios.com/' },
  { slug: 'harveys', url: 'https://www.harveys.ca' },
  { slug: 'the-bay', url: 'https://www.thebay.com' },
  { slug: 'indigo', url: 'https://www.indigo.ca' },
  { slug: 'joe-fresh', url: 'https://www.joefresh.com/ca' },
  { slug: 'kelseys', url: 'https://www.kelseys.ca' },
  { slug: 'lowes-canada', url: 'https://www.lowes.ca' },
  { slug: 'lululemon', url: 'https://shop.lululemon.com' },
  { slug: 'mastermind-toys', url: 'https://www.mastermindtoys.com' },
  { slug: 'montanas', url: 'https://www.montanas.ca' },
  { slug: 'roots', url: 'https://www.roots.com' },
  { slug: 'shoppers', url: 'https://www.shoppersdrugmart.ca' },
  { slug: 'smythe', url: 'https://smythe.ca' },
  { slug: 'state-main', url: 'https://www.stateandmain.ca' },
  { slug: 'swiss-chalet', url: 'https://www.swisschalet.com' },
]

async function dismissPopups(page: Page): Promise<void> {
  await page.waitForTimeout(3000)

  const selectors = [
    '#onetrust-accept-btn-handler',
    '[id*="cookie"] button',
    '[class*="cookie"] button',
    '[aria-label="Close"]',
    '[class*="modal"] [class*="close"]',
    '[class*="popup"] [class*="close"]',
    'button[class*="close"]',
  ]

  for (const selector of selectors) {
    try {
      const el = await page.$(selector)
      if (el && await el.isVisible()) {
        await el.click()
        await page.waitForTimeout(500)
      }
    } catch {}
  }

  await page.keyboard.press('Escape')
}

async function captureScreenshot(browser: Browser, slug: string, url: string): Promise<string | null> {
  console.log(`   ${slug}: ${url}`)

  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    locale: 'en-CA',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
    extraHTTPHeaders: {
      'Accept-Language': 'en-CA,en;q=0.9',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    }
  })

  // Block unnecessary resources for faster loading
  await context.route('**/*.{mp4,webm,ogg,mp3,wav}', route => route.abort())

  const page = await context.newPage()

  try {
    // Use domcontentloaded - faster, less strict
    await page.goto(url, {
      waitUntil: 'domcontentloaded',
      timeout: 45000
    })

    // Wait for page to settle
    await page.waitForTimeout(5000)
    await dismissPopups(page)

    // Scroll to trigger lazy loading
    await page.evaluate(() => window.scrollTo(0, 200))
    await page.waitForTimeout(1500)
    await page.evaluate(() => window.scrollTo(0, 0))
    await page.waitForTimeout(1000)

    await dismissPopups(page)

    const filepath = path.join(SCREENSHOT_DIR, `${slug}.png`)
    await page.screenshot({
      path: filepath,
      type: 'png',
      clip: { x: 0, y: 0, width: 1280, height: 800 }
    })

    console.log(`      ✓ Captured`)
    return filepath

  } catch (error: any) {
    console.log(`      ✗ ${error.message.split('\n')[0]}`)
    return null
  } finally {
    await context.close()
  }
}

async function uploadToSupabase(filepath: string, slug: string): Promise<string | null> {
  const fileBuffer = fs.readFileSync(filepath)
  const { error } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(`${slug}.png`, fileBuffer, { contentType: 'image/png', upsert: true })

  if (error) return null
  return `${SUPABASE_URL}/storage/v1/object/public/${BUCKET_NAME}/${slug}.png`
}

async function main() {
  console.log('='.repeat(50))
  console.log('Retry Failed Screenshots')
  console.log('='.repeat(50) + '\n')

  if (!fs.existsSync(SCREENSHOT_DIR)) {
    fs.mkdirSync(SCREENSHOT_DIR, { recursive: true })
  }

  const browser = await chromium.launch({ headless: true })

  let success = 0, failed = 0

  for (const brand of FAILED_BRANDS) {
    const filepath = await captureScreenshot(browser, brand.slug, brand.url)
    if (filepath) {
      const url = await uploadToSupabase(filepath, brand.slug)
      if (url) {
        await pool.query('UPDATE stores SET screenshot_url = $1 WHERE slug = $2', [url, brand.slug])
        console.log(`      ✓ Uploaded & saved`)
        success++
      } else failed++
    } else failed++
    console.log('')
  }

  await browser.close()
  fs.rmSync(SCREENSHOT_DIR, { recursive: true, force: true })
  await pool.end()

  console.log('='.repeat(50))
  console.log(`Done: ${success} success, ${failed} failed`)
  console.log('='.repeat(50))
}

main()
