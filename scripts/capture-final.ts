/**
 * Final batch - remaining brands
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

// Copy existing screenshots for aliases
async function copyAliases() {
  console.log('Copying screenshots for alias brands...\n')

  // hudson-s-bay uses same site as the-bay
  const bayUrl = `${process.env.SUPABASE_URL}/storage/v1/object/public/${BUCKET}/the-bay.png`
  await pool.query('UPDATE stores SET screenshot_url = $1 WHERE slug = $2', [bayUrl, 'hudson-s-bay'])
  console.log('   hudson-s-bay -> the-bay.png ✓')

  // indigo-books uses same site as indigo
  const indigoUrl = `${process.env.SUPABASE_URL}/storage/v1/object/public/${BUCKET}/indigo.png`
  await pool.query('UPDATE stores SET screenshot_url = $1 WHERE slug = $2', [indigoUrl, 'indigo-books'])
  console.log('   indigo-books -> indigo.png ✓\n')
}

const BRANDS = [
  { slug: 'eastside-marios', url: 'https://www.eastsidemarios.com' },
  { slug: 'kelseys', url: 'https://www.kelseys.ca' },
  { slug: 'montanas', url: 'https://www.montanas.ca' },
  { slug: 'state-main', url: 'https://www.stateandmain.ca' },
  { slug: 'smythe', url: 'https://smythe.ca' },
]

async function main() {
  console.log('Final Screenshot Batch\n' + '='.repeat(40) + '\n')

  await copyAliases()

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
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 })
      await page.waitForTimeout(5000)

      // Dismiss popups
      await page.keyboard.press('Escape')
      for (const sel of ['#onetrust-accept-btn-handler', '[aria-label="Close"]', 'button[class*="close"]']) {
        try {
          const el = await page.$(sel)
          if (el && await el.isVisible()) await el.click()
        } catch {}
      }
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
  console.log(`Captured: ${success}/${BRANDS.length}`)

  // Note about invalid domains
  console.log('\nNote: kinkd-beauty and lowes-canada have invalid domains')
}

main()
