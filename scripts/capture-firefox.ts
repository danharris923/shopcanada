/**
 * Try Firefox for blocked sites - often bypasses bot detection
 */

import { firefox } from 'playwright'
import { createClient } from '@supabase/supabase-js'
import { Pool } from 'pg'
import * as fs from 'fs'
import * as path from 'path'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)
const pool = new Pool({ connectionString: process.env.POSTGRES_URL!, ssl: { rejectUnauthorized: false } })
const BUCKET = 'brand-screenshots'
const DIR = './temp-screenshots'

const BRANDS = [
  { slug: 'lululemon', url: 'https://www.lululemon.com' },
  { slug: 'roots', url: 'https://www.roots.com' },
  { slug: 'indigo', url: 'https://www.indigo.ca' },
  { slug: 'the-bay', url: 'https://www.thebay.com' },
  { slug: 'shoppers', url: 'https://www.shoppersdrugmart.ca' },
  { slug: 'joe-fresh', url: 'https://www.joefresh.com/ca' },
  { slug: 'swiss-chalet', url: 'https://www.swisschalet.com' },
  { slug: 'harveys', url: 'https://www.harveys.ca' },
]

async function main() {
  console.log('Firefox Screenshot Capture\n' + '='.repeat(40) + '\n')

  if (!fs.existsSync(DIR)) fs.mkdirSync(DIR, { recursive: true })

  const browser = await firefox.launch({ headless: true })
  let success = 0

  for (const { slug, url } of BRANDS) {
    console.log(`${slug}: ${url}`)

    const context = await browser.newContext({
      viewport: { width: 1280, height: 800 },
      locale: 'en-CA',
    })
    const page = await context.newPage()

    try {
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 40000 })
      await page.waitForTimeout(4000)

      // Dismiss popups
      for (const sel of ['#onetrust-accept-btn-handler', '[aria-label="Close"]', 'button[class*="close"]']) {
        try {
          const el = await page.$(sel)
          if (el && await el.isVisible()) await el.click()
        } catch {}
      }
      await page.keyboard.press('Escape')
      await page.waitForTimeout(1000)

      const filepath = path.join(DIR, `${slug}.png`)
      await page.screenshot({ path: filepath, clip: { x: 0, y: 0, width: 1280, height: 800 } })

      const buf = fs.readFileSync(filepath)
      await supabase.storage.from(BUCKET).upload(`${slug}.png`, buf, { contentType: 'image/png', upsert: true })
      const pubUrl = `${process.env.SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${slug}.png`
      await pool.query('UPDATE stores SET screenshot_url = $1 WHERE slug = $2', [pubUrl, slug])

      console.log(`   ✓ Done\n`)
      success++
    } catch (e: any) {
      console.log(`   ✗ ${e.message.split('\n')[0]}\n`)
    }
    await context.close()
  }

  await browser.close()
  fs.rmSync(DIR, { recursive: true, force: true })
  await pool.end()

  console.log('='.repeat(40))
  console.log(`Results: ${success}/${BRANDS.length} captured`)
}

main()
