#!/usr/bin/env npx tsx
/**
 * Check store slugs for fashion brands
 */

import * as dotenv from 'dotenv'
import * as path from 'path'

dotenv.config({ path: path.join(__dirname, '..', '.env.local') })

import { Pool } from 'pg'

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: { rejectUnauthorized: false }
})

async function checkStoreSlugs() {
  const names = [
    'Abercrombie & Fitch',
    'Crate & Barrel',
    'e.l.f. Cosmetics',
    'Merit Beauty',
    'Tarte Cosmetics',
    'Tula Skincare',
  ]

  console.log('Checking store slugs in database...\n')

  for (const name of names) {
    const result = await pool.query(
      `SELECT slug, name FROM stores WHERE name = $1`,
      [name]
    )

    if (result.rows.length > 0) {
      console.log(`${name} => slug: "${result.rows[0].slug}"`)
    } else {
      console.log(`${name} => NOT FOUND`)
    }
  }

  await pool.end()
}

checkStoreSlugs().catch(console.error)
