#!/usr/bin/env npx tsx
/**
 * Fix store slugs to match FASHION_BRANDS
 */

import * as dotenv from 'dotenv'
import * as path from 'path'

dotenv.config({ path: path.join(__dirname, '..', '.env.local') })

import { Pool } from 'pg'

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: { rejectUnauthorized: false }
})

async function fixStoreSlugs() {
  // Map of name -> correct slug (matching FASHION_BRANDS)
  const slugFixes = [
    { name: 'Abercrombie & Fitch', oldSlug: 'abercrombie', newSlug: 'abercrombie-fitch' },
    { name: 'Crate & Barrel', oldSlug: 'crate-and-barrel', newSlug: 'crate-barrel' },
    { name: 'e.l.f. Cosmetics', oldSlug: 'elf', newSlug: 'elf-cosmetics' },
    { name: 'Merit Beauty', oldSlug: 'merit', newSlug: 'merit-beauty' },
    { name: 'Tarte Cosmetics', oldSlug: 'tarte', newSlug: 'tarte-cosmetics' },
    { name: 'Tula Skincare', oldSlug: 'tula', newSlug: 'tula-skincare' },
  ]

  console.log('Updating store slugs to match FASHION_BRANDS...\n')

  for (const fix of slugFixes) {
    try {
      const result = await pool.query(
        `UPDATE stores SET slug = $1 WHERE slug = $2 RETURNING name, slug`,
        [fix.newSlug, fix.oldSlug]
      )

      if (result.rows.length > 0) {
        console.log(`✓ Updated: ${fix.name} => ${fix.newSlug}`)
      } else {
        console.log(`- No change (already correct or not found): ${fix.name}`)
      }
    } catch (error) {
      console.error(`✗ Error updating ${fix.name}:`, error)
    }
  }

  console.log('\nDone!')
  await pool.end()
}

fixStoreSlugs().catch(console.error)
