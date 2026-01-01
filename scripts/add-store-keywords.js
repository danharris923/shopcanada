/**
 * Add keywords column to stores and populate for LTK stores
 * Run with: node scripts/add-store-keywords.js
 */

require('dotenv').config({ path: '.env.local' })
const { Pool } = require('pg')

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: { rejectUnauthorized: false }
})

// LTK stores with their product keywords
const LTK_STORE_KEYWORDS = {
  // Fashion - Athletic/Yoga
  'lululemon': ['leggings', 'yoga', 'athletic', 'sports bra', 'joggers', 'activewear', 'workout', 'running'],
  'alo-yoga': ['leggings', 'yoga', 'athletic', 'sports bra', 'activewear', 'workout', 'loungewear'],
  'vuori': ['athletic', 'joggers', 'activewear', 'workout', 'loungewear', 'shorts'],

  // Fashion - Women's Clothing
  'aritzia': ['dresses', 'pants', 'tops', 'blazers', 'jackets', 'skirts', 'loungewear', 'basics'],
  'anthropologie': ['dresses', 'home decor', 'tops', 'accessories', 'gifts', 'boho', 'furniture'],
  'free-people': ['dresses', 'boho', 'tops', 'jeans', 'jackets', 'intimates', 'accessories'],
  'urban-outfitters': ['dresses', 'jeans', 'tops', 'home decor', 'vintage', 'accessories', 'shoes'],
  'madewell': ['jeans', 'denim', 'tops', 'dresses', 'bags', 'shoes', 'basics'],
  'lulus': ['dresses', 'wedding guest', 'formal', 'tops', 'shoes', 'prom', 'bridesmaid'],
  'revolve': ['dresses', 'designer', 'tops', 'jeans', 'shoes', 'bags', 'swimwear'],
  'princess-polly': ['dresses', 'tops', 'jeans', 'going out', 'trendy', 'accessories'],
  'nasty-gal': ['dresses', 'tops', 'jeans', 'shoes', 'going out', 'trendy', 'accessories'],
  'prettylittlething': ['dresses', 'tops', 'jeans', 'going out', 'trendy', 'bodycon', 'party'],
  'shopbop': ['designer', 'dresses', 'bags', 'shoes', 'accessories', 'jeans', 'tops'],
  'skims': ['shapewear', 'loungewear', 'bras', 'underwear', 'bodysuits', 'basics', 'sleepwear'],

  // Fashion - Canadian
  'ardene': ['jewelry', 'accessories', 'tops', 'leggings', 'loungewear', 'shoes', 'bags', 'basics'],
  'simons': ['dresses', 'designer', 'home decor', 'coats', 'shoes', 'accessories', 'canadian'],

  // Fashion - Casual/Basics
  'american-eagle': ['jeans', 'denim', 'tops', 'hoodies', 'shorts', 'basics', 'casual'],
  'aerie': ['bras', 'underwear', 'leggings', 'loungewear', 'swimwear', 'pajamas', 'activewear'],
  'abercrombie-fitch': ['jeans', 'dresses', 'tops', 'jackets', 'basics', 'casual', 'preppy'],
  'cotton-on': ['basics', 'tops', 'jeans', 'activewear', 'loungewear', 'casual', 'affordable'],
  'guess': ['jeans', 'dresses', 'bags', 'watches', 'accessories', 'tops', 'jackets'],

  // Shoes
  'steve-madden': ['shoes', 'heels', 'boots', 'sandals', 'sneakers', 'bags', 'accessories'],
  'aldo': ['shoes', 'heels', 'boots', 'sandals', 'bags', 'accessories', 'sneakers'],
  'foot-locker': ['sneakers', 'shoes', 'athletic', 'nike', 'adidas', 'jordan', 'running'],
  'new-balance': ['sneakers', 'running', 'athletic', 'shoes', 'activewear', 'workout'],
  'birkenstock': ['sandals', 'shoes', 'slides', 'clogs', 'comfort', 'casual'],
  'ugg': ['boots', 'slippers', 'sandals', 'shoes', 'cozy', 'winter', 'loungewear'],

  // Beauty
  'charlotte-tilbury': ['makeup', 'lipstick', 'foundation', 'skincare', 'beauty', 'eyeshadow'],
  'tarte-cosmetics': ['makeup', 'concealer', 'foundation', 'mascara', 'beauty', 'vegan'],
  'elf-cosmetics': ['makeup', 'affordable', 'skincare', 'brushes', 'beauty', 'drugstore'],
  'tula-skincare': ['skincare', 'cleanser', 'moisturizer', 'serum', 'probiotic', 'beauty'],
  'merit-beauty': ['makeup', 'clean beauty', 'minimalist', 'lipstick', 'blush', 'skincare'],
  'colleen-rothschild': ['skincare', 'anti-aging', 'serum', 'moisturizer', 'luxury', 'beauty'],
  'supergoop': ['sunscreen', 'spf', 'skincare', 'sun protection', 'beauty', 'moisturizer'],

  // Home
  'pottery-barn': ['furniture', 'bedding', 'home decor', 'rugs', 'lighting', 'curtains'],
  'west-elm': ['furniture', 'modern', 'home decor', 'bedding', 'rugs', 'lighting'],
  'brooklinen': ['bedding', 'sheets', 'towels', 'loungewear', 'home', 'luxury'],
  'dyson': ['vacuum', 'hair dryer', 'air purifier', 'fan', 'appliances', 'technology'],
}

async function main() {
  console.log('\n=== Adding keywords to stores ===\n')

  try {
    // Step 1: Check if keywords column exists, add if not
    console.log('1. Checking/adding keywords column...')
    await pool.query(`
      ALTER TABLE stores
      ADD COLUMN IF NOT EXISTS keywords text[] DEFAULT '{}'
    `)
    console.log('   ✓ Keywords column ready')

    // Step 2: Update each LTK store with keywords
    console.log('\n2. Populating keywords for LTK stores...')

    let updated = 0
    let notFound = []

    for (const [slug, keywords] of Object.entries(LTK_STORE_KEYWORDS)) {
      const result = await pool.query(
        `UPDATE stores SET keywords = $1 WHERE slug = $2 RETURNING slug`,
        [keywords, slug]
      )

      if (result.rowCount > 0) {
        console.log(`   ✓ ${slug}: ${keywords.slice(0, 4).join(', ')}...`)
        updated++
      } else {
        notFound.push(slug)
      }
    }

    console.log(`\n=== Summary ===`)
    console.log(`Updated: ${updated} stores`)
    if (notFound.length > 0) {
      console.log(`Not found: ${notFound.join(', ')}`)
    }

    // Step 3: Show sample
    console.log('\n3. Sample of stores with keywords:')
    const { rows } = await pool.query(`
      SELECT slug, keywords
      FROM stores
      WHERE keywords IS NOT NULL AND array_length(keywords, 1) > 0
      LIMIT 5
    `)
    for (const row of rows) {
      console.log(`   ${row.slug}: [${row.keywords.join(', ')}]`)
    }

  } catch (error) {
    console.error('Error:', error.message)
  } finally {
    await pool.end()
  }
}

main()
