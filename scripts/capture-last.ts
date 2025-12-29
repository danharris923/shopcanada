import { firefox } from 'playwright'
import { createClient } from '@supabase/supabase-js'
import { Pool } from 'pg'
import * as fs from 'fs'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)
const pool = new Pool({ connectionString: process.env.POSTGRES_URL!, ssl: { rejectUnauthorized: false } })

async function run() {
  console.log('Last batch...\n')

  const browser = await firefox.launch({ headless: true })

  // Try rona.ca for lowes-canada (Lowe's merged with RONA)
  const brands = [
    { slug: 'lowes-canada', url: 'https://www.rona.ca', newUrl: 'https://www.rona.ca' },
    { slug: 'smythe', url: 'https://smytheles.com', newUrl: 'https://smytheles.com' },
  ]

  for (const { slug, url, newUrl } of brands) {
    console.log(`${slug}: ${url}`)
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } })
    const page = await ctx.newPage()

    try {
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 })
      await page.waitForTimeout(4000)
      await page.keyboard.press('Escape')

      const filepath = `${slug}.png`
      await page.screenshot({ path: filepath, clip: { x: 0, y: 0, width: 1280, height: 800 } })

      const buf = fs.readFileSync(filepath)
      await supabase.storage.from('brand-screenshots').upload(`${slug}.png`, buf, { contentType: 'image/png', upsert: true })

      const pubUrl = `${process.env.SUPABASE_URL}/storage/v1/object/public/brand-screenshots/${slug}.png`
      await pool.query('UPDATE stores SET screenshot_url = $1, website_url = $2 WHERE slug = $3', [pubUrl, newUrl, slug])

      console.log('   ✓ Done\n')
      fs.unlinkSync(filepath)
    } catch (e: any) {
      console.log(`   ✗ ${e.message.split('\n')[0]}\n`)
    }

    await ctx.close()
  }

  await browser.close()
  await pool.end()
}

run()
