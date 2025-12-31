#!/usr/bin/env npx tsx
/**
 * Add missing fashion brand stores to the database
 */

import * as dotenv from 'dotenv'
import * as path from 'path'

// Load environment variables
dotenv.config({ path: path.join(__dirname, '..', '.env.local') })

import { Pool } from 'pg'

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: { rejectUnauthorized: false }
})

async function addMissingStores() {
  const stores = [
    {
      slug: 'abercrombie-fitch',
      name: 'Abercrombie & Fitch',
      type: 'brand',
      is_canadian: false,
      top_categories: ['fashion', 'casual wear', 'denim'],
      website_url: 'https://www.abercrombie.com',
    },
    {
      slug: 'crate-barrel',
      name: 'Crate & Barrel',
      type: 'brand',
      is_canadian: false,
      top_categories: ['home', 'furniture', 'kitchen'],
      website_url: 'https://www.crateandbarrel.ca',
    },
    {
      slug: 'elf-cosmetics',
      name: 'e.l.f. Cosmetics',
      type: 'brand',
      is_canadian: false,
      top_categories: ['beauty', 'makeup', 'skincare'],
      website_url: 'https://www.elfcosmetics.com',
    },
    {
      slug: 'merit-beauty',
      name: 'Merit Beauty',
      type: 'brand',
      is_canadian: false,
      top_categories: ['beauty', 'clean makeup', 'skincare'],
      website_url: 'https://meritbeauty.com',
    },
    {
      slug: 'tarte-cosmetics',
      name: 'Tarte Cosmetics',
      type: 'brand',
      is_canadian: false,
      top_categories: ['beauty', 'makeup', 'skincare'],
      website_url: 'https://tartecosmetics.com',
    },
    {
      slug: 'tula-skincare',
      name: 'Tula Skincare',
      type: 'brand',
      is_canadian: false,
      top_categories: ['beauty', 'skincare', 'probiotic skincare'],
      website_url: 'https://www.tula.com',
    },
  ]

  console.log('Adding missing stores to database...\n')

  for (const store of stores) {
    try {
      const result = await pool.query(
        `INSERT INTO stores (slug, name, type, is_canadian, top_categories, website_url)
         VALUES ($1, $2, $3, $4, $5::jsonb, $6)
         ON CONFLICT (slug) DO NOTHING
         RETURNING slug`,
        [store.slug, store.name, store.type, store.is_canadian, JSON.stringify(store.top_categories), store.website_url]
      )

      if (result.rows.length > 0) {
        console.log(`✓ Added: ${store.name}`)
      } else {
        console.log(`- Already exists: ${store.name}`)
      }
    } catch (error) {
      console.error(`✗ Error adding ${store.name}:`, error)
    }
  }

  console.log('\nDone!')
  await pool.end()
}

addMissingStores().catch(console.error)
