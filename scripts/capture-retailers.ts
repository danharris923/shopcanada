import { firefox } from 'playwright'
import { createClient } from '@supabase/supabase-js'
import { Pool } from 'pg'
import * as fs from 'fs'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)
const pool = new Pool({ connectionString: process.env.POSTGRES_URL!, ssl: { rejectUnauthorized: false } })

const STORES = [
  { slug: 'adidas', url: 'https://www.adidas.ca' },
  { slug: 'banana-republic', url: 'https://bananarepublic.gapcanada.ca' },
  { slug: 'bed-bath-beyond', url: 'https://www.bedbathandbeyond.ca' },
  { slug: 'costco', url: 'https://www.costco.ca' },
  { slug: 'dell', url: 'https://www.dell.com/en-ca' },
  { slug: 'home-depot', url: 'https://www.homedepot.ca' },
  { slug: 'lenovo', url: 'https://www.lenovo.com/ca/en' },
  { slug: 'lowes', url: 'https://www.lowes.ca' },
  { slug: 'michaels', url: 'https://canada.michaels.com' },
  { slug: 'petsmart', url: 'https://www.petsmart.ca' },
  { slug: 'wayfair', url: 'https://www.wayfair.ca' },
]

async function main() {
  console.log('Capturing retailer screenshots...\n')

  const browser = await firefox.launch({ headless: true })
  let success = 0

  for (const { slug, url } of STORES) {
    console.log(`${slug}: ${url}`)
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 }, locale: 'en-CA' })
    const page = await ctx.newPage()

    try {
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 })
      await page.waitForTimeout(4000)

      // Dismiss popups
      await page.keyboard.press('Escape')
      for (const sel of ['#onetrust-accept-btn-handler', '[aria-label="Close"]', 'button[class*="close"]', '[class*="cookie"] button']) {
        try { const el = await page.$(sel); if (el && await el.isVisible()) await el.click() } catch {}
      }
      await page.waitForTimeout(1000)

      await page.screenshot({ path: `${slug}.png`, clip: { x: 0, y: 0, width: 1280, height: 800 } })

      const buf = fs.readFileSync(`${slug}.png`)
      await supabase.storage.from('brand-screenshots').upload(`${slug}.png`, buf, { contentType: 'image/png', upsert: true })
      const pubUrl = `${process.env.SUPABASE_URL}/storage/v1/object/public/brand-screenshots/${slug}.png`
      await pool.query('UPDATE stores SET screenshot_url = $1, website_url = $2 WHERE slug = $3', [pubUrl, url, slug])

      console.log('   ✓ Done')
      fs.unlinkSync(`${slug}.png`)
      success++
    } catch (e: any) {
      console.log(`   ✗ ${e.message.split('\n')[0]}`)
    }
    await ctx.close()
  }

  await browser.close()
  await pool.end()
  console.log(`\nCaptured: ${success}/${STORES.length}`)
}

main()
