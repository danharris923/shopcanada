import { Pool } from 'pg'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: { rejectUnauthorized: false }
})

async function run() {
  console.log('='.repeat(50))
  console.log('Add LTK Stores & Cleanup')
  console.log('='.repeat(50) + '\n')

  // Remove broken entries
  console.log('1. Removing broken entries...')
  const del = await pool.query("DELETE FROM stores WHERE slug IN ('kinkd-beauty', 'smythe')")
  console.log(`   Deleted ${del.rowCount} entries\n`)

  // LTK stores to add
  const stores = [
    { name: 'Abercrombie & Fitch', slug: 'abercrombie', url: 'https://www.abercrombie.com/shop/ca' },
    { name: 'American Eagle', slug: 'american-eagle', url: 'https://www.ae.com/ca/en' },
    { name: 'Aerie', slug: 'aerie', url: 'https://www.ae.com/ca/en/c/aerie' },
    { name: 'GUESS', slug: 'guess', url: 'https://www.guess.com/ca/en' },
    { name: 'SKIMS', slug: 'skims', url: 'https://skims.com/en-ca' },
    { name: 'Revolve', slug: 'revolve', url: 'https://www.revolve.com' },
    { name: 'Princess Polly', slug: 'princess-polly', url: 'https://us.princesspolly.com' },
    { name: 'Shopbop', slug: 'shopbop', url: 'https://www.shopbop.com' },
    { name: 'Vuori', slug: 'vuori', url: 'https://vuoriclothing.com' },
    { name: 'Madewell', slug: 'madewell', url: 'https://www.madewell.com' },
    { name: 'Anthropologie', slug: 'anthropologie', url: 'https://www.anthropologie.com' },
    { name: 'Free People', slug: 'free-people', url: 'https://www.freepeople.com' },
    { name: 'Cotton On', slug: 'cotton-on', url: 'https://cottonon.com/CA' },
    { name: 'PrettyLittleThing', slug: 'prettylittlething', url: 'https://www.prettylittlething.ca' },
    { name: 'Urban Outfitters', slug: 'urban-outfitters', url: 'https://www.urbanoutfitters.com/en-ca' },
    { name: 'Steve Madden', slug: 'steve-madden', url: 'https://www.stevemadden.ca' },
    { name: 'New Balance', slug: 'new-balance', url: 'https://www.newbalance.ca' },
    { name: 'Birkenstock', slug: 'birkenstock', url: 'https://www.birkenstock.com/ca-en' },
    { name: 'Simons', slug: 'simons', url: 'https://www.simons.ca', isCanadian: true },
  ]

  console.log('2. Adding LTK stores...\n')
  let added = 0, updated = 0

  for (const s of stores) {
    const result = await pool.query(
      `INSERT INTO stores (name, slug, website_url, type, is_canadian, affiliate_network)
       VALUES ($1, $2, $3, 'store', $4, 'ltk')
       ON CONFLICT (slug) DO UPDATE SET
         website_url = EXCLUDED.website_url,
         affiliate_network = 'ltk'
       RETURNING (xmax = 0) as inserted`,
      [s.name, s.slug, s.url, s.isCanadian || false]
    )

    if (result.rows[0]?.inserted) {
      console.log(`   + ${s.name}`)
      added++
    } else {
      console.log(`   ~ ${s.name} (updated)`)
      updated++
    }
  }

  console.log(`\n   Added: ${added}, Updated: ${updated}`)

  // Get total count
  const count = await pool.query('SELECT COUNT(*) FROM stores')
  console.log(`\n3. Total stores in database: ${count.rows[0].count}`)

  await pool.end()
  console.log('\n' + '='.repeat(50))
}

run()
