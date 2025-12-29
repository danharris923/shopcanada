/**
 * Migration script to add website_url column and populate stores
 *
 * Run with: npx tsx scripts/migrate-stores.ts
 */

import { Pool } from 'pg'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: { rejectUnauthorized: false }
})

// Store data from store-logos.ts (name, slug, domain)
const LTK_STORES = [
  // Fashion (23)
  { name: 'Abercrombie & Fitch', slug: 'abercrombie', domain: 'abercrombie.com' },
  { name: 'American Eagle', slug: 'american-eagle', domain: 'ae.com' },
  { name: 'Aerie', slug: 'aerie', domain: 'ae.com/ca/en/c/aerie/cat10004' },
  { name: 'Alo Yoga', slug: 'alo-yoga', domain: 'aloyoga.com' },
  { name: 'GUESS', slug: 'guess', domain: 'guess.com' },
  { name: 'SKIMS', slug: 'skims', domain: 'skims.com' },
  { name: 'Revolve', slug: 'revolve', domain: 'revolve.com' },
  { name: 'Princess Polly', slug: 'princess-polly', domain: 'us.princesspolly.com' },
  { name: 'Shopbop', slug: 'shopbop', domain: 'shopbop.com' },
  { name: 'Vuori', slug: 'vuori', domain: 'vuoriclothing.com' },
  { name: 'Lulus', slug: 'lulus', domain: 'lulus.com' },
  { name: 'Madewell', slug: 'madewell', domain: 'madewell.com' },
  { name: 'Anthropologie', slug: 'anthropologie', domain: 'anthropologie.com' },
  { name: 'Free People', slug: 'free-people', domain: 'freepeople.com' },
  { name: 'Cotton On', slug: 'cotton-on', domain: 'cottonon.com' },
  { name: 'Nasty Gal', slug: 'nasty-gal', domain: 'nastygal.com' },
  { name: 'PrettyLittleThing', slug: 'prettylittlething', domain: 'prettylittlething.ca' },
  { name: 'Urban Outfitters', slug: 'urban-outfitters', domain: 'urbanoutfitters.com' },
  { name: 'Steve Madden', slug: 'steve-madden', domain: 'stevemadden.ca' },
  { name: 'New Balance', slug: 'new-balance', domain: 'newbalance.ca' },
  { name: 'Birkenstock', slug: 'birkenstock', domain: 'birkenstock.com' },
  { name: 'UGG', slug: 'ugg', domain: 'ugg.com' },
  { name: 'Simons', slug: 'simons', domain: 'simons.ca' },
  // Beauty (8)
  { name: 'Charlotte Tilbury', slug: 'charlotte-tilbury', domain: 'charlottetilbury.com' },
  { name: 'Tarte Cosmetics', slug: 'tarte', domain: 'tartecosmetics.com' },
  { name: 'e.l.f. Cosmetics', slug: 'elf', domain: 'elfcosmetics.com' },
  { name: 'Tula Skincare', slug: 'tula', domain: 'tula.com' },
  { name: 'Colleen Rothschild', slug: 'colleen-rothschild', domain: 'colleenrothschild.com' },
  { name: 'Dime Beauty', slug: 'dime-beauty', domain: 'dimebeauty.co' },
  { name: 'Merit Beauty', slug: 'merit', domain: 'meritbeauty.com' },
  { name: 'Supergoop', slug: 'supergoop', domain: 'supergoop.com' },
  // Home (6)
  { name: 'Crate & Barrel', slug: 'crate-and-barrel', domain: 'crateandbarrel.ca' },
  { name: 'Pottery Barn', slug: 'pottery-barn', domain: 'potterybarn.ca' },
  { name: 'West Elm', slug: 'west-elm', domain: 'westelm.ca' },
  { name: 'CB2', slug: 'cb2', domain: 'cb2.ca' },
  { name: 'Dyson', slug: 'dyson', domain: 'dyson.com' },
  { name: 'Brooklinen', slug: 'brooklinen', domain: 'brooklinen.com' },
]

// Existing stores to update with website_url
const EXISTING_STORES: Record<string, string> = {
  'amazon': 'amazon.ca',
  'best-buy': 'bestbuy.ca',
  'canadian-tire': 'canadiantire.ca',
  'costco': 'costco.ca',
  'indigo': 'indigo.ca',
  'lululemon': 'lululemon.com',
  'sephora': 'sephora.com',
  'walmart': 'walmart.ca',
}

async function migrate() {
  console.log('Starting migration...\n')

  try {
    // Step 1: Add website_url column if it doesn't exist
    console.log('1. Adding website_url column...')
    await pool.query(`
      ALTER TABLE stores
      ADD COLUMN IF NOT EXISTS website_url TEXT
    `)
    console.log('   Done!\n')

    // Step 2: Update existing stores with website URLs
    console.log('2. Updating existing stores with website URLs...')
    for (const [slug, domain] of Object.entries(EXISTING_STORES)) {
      const url = `https://www.${domain}`
      const result = await pool.query(
        'UPDATE stores SET website_url = $1 WHERE slug = $2 AND website_url IS NULL',
        [url, slug]
      )
      if (result.rowCount && result.rowCount > 0) {
        console.log(`   Updated: ${slug} -> ${url}`)
      }
    }
    console.log('   Done!\n')

    // Step 3: Insert new LTK stores
    console.log('3. Inserting LTK stores...')
    let inserted = 0
    let skipped = 0

    for (const store of LTK_STORES) {
      const websiteUrl = `https://www.${store.domain}`

      // Check if already exists
      const existing = await pool.query(
        'SELECT id FROM stores WHERE slug = $1',
        [store.slug]
      )

      if (existing.rows.length > 0) {
        // Update website_url if missing
        await pool.query(
          'UPDATE stores SET website_url = $1 WHERE slug = $2 AND website_url IS NULL',
          [websiteUrl, store.slug]
        )
        console.log(`   Skipped (exists): ${store.name}`)
        skipped++
      } else {
        // Insert new store
        await pool.query(
          'INSERT INTO stores (name, slug, website_url, affiliate_url, deal_count) VALUES ($1, $2, $3, NULL, 0)',
          [store.name, store.slug, websiteUrl]
        )
        console.log(`   Inserted: ${store.name}`)
        inserted++
      }
    }
    console.log(`   Done! (${inserted} inserted, ${skipped} skipped)\n`)

    // Step 4: Show summary
    console.log('4. Summary:')
    const countResult = await pool.query('SELECT COUNT(*) as count FROM stores')
    console.log(`   Total stores in database: ${countResult.rows[0].count}`)

    const withUrlResult = await pool.query('SELECT COUNT(*) as count FROM stores WHERE website_url IS NOT NULL')
    console.log(`   Stores with website_url: ${withUrlResult.rows[0].count}`)

    const withAffResult = await pool.query('SELECT COUNT(*) as count FROM stores WHERE affiliate_url IS NOT NULL')
    console.log(`   Stores with affiliate_url: ${withAffResult.rows[0].count}`)

    console.log('\nMigration complete!')

  } catch (error) {
    console.error('Migration failed:', error)
    process.exit(1)
  } finally {
    await pool.end()
  }
}

migrate()
