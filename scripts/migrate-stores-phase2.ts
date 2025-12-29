/**
 * Phase 2 Migration: Expand stores table and consolidate all store data
 *
 * Run with: npx tsx scripts/migrate-stores-phase2.ts
 */

import { Pool } from 'pg'
import * as dotenv from 'dotenv'
import * as fs from 'fs'
import * as path from 'path'

dotenv.config({ path: '.env.local' })

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: { rejectUnauthorized: false }
})

async function addColumns() {
  console.log('1. Adding new columns to stores table...\n')

  const columns = [
    "type VARCHAR(20) DEFAULT 'store'",
    "logo_url TEXT",
    "color VARCHAR(100)",
    "tagline TEXT",
    "description TEXT",
    "badges JSONB DEFAULT '[]'",
    "top_categories JSONB DEFAULT '[]'",
    "flipp_aliases JSONB DEFAULT '[]'",
    "is_canadian BOOLEAN DEFAULT FALSE",
    "province VARCHAR(50)",
    "return_policy TEXT",
    "loyalty_program_name VARCHAR(200)",
    "loyalty_program_desc TEXT",
    "shipping_info TEXT",
    "price_match_policy TEXT",
    "affiliate_network VARCHAR(50)",
    "rakuten_merchant_id VARCHAR(100)",
    "screenshot_url TEXT",
    "created_at TIMESTAMP DEFAULT NOW()",
    "updated_at TIMESTAMP DEFAULT NOW()"
  ]

  for (const col of columns) {
    const colName = col.split(' ')[0]
    try {
      await pool.query(`ALTER TABLE stores ADD COLUMN IF NOT EXISTS ${col}`)
      console.log(`   Added: ${colName}`)
    } catch (err: any) {
      if (err.code === '42701') {
        console.log(`   Exists: ${colName}`)
      } else {
        console.error(`   Error adding ${colName}:`, err.message)
      }
    }
  }
  console.log('')
}

async function migrate() {
  console.log('='.repeat(60))
  console.log('Phase 2 Migration: Consolidate Store Data')
  console.log('='.repeat(60) + '\n')

  try {
    // Step 1: Add columns
    await addColumns()

    console.log('2. Migration script ready.')
    console.log('   Run migrate-store-data.ts next to populate data.\n')

    // Show current state
    const result = await pool.query(`
      SELECT
        COUNT(*) as total,
        COUNT(logo_url) as with_logo,
        COUNT(tagline) as with_tagline,
        COUNT(return_policy) as with_policy
      FROM stores
    `)

    console.log('3. Current stores table state:')
    console.log(`   Total stores: ${result.rows[0].total}`)
    console.log(`   With logo_url: ${result.rows[0].with_logo}`)
    console.log(`   With tagline: ${result.rows[0].with_tagline}`)
    console.log(`   With return_policy: ${result.rows[0].with_policy}`)

    console.log('\n' + '='.repeat(60))
    console.log('Schema expansion complete!')
    console.log('='.repeat(60))

  } catch (error) {
    console.error('Migration failed:', error)
    process.exit(1)
  } finally {
    await pool.end()
  }
}

migrate()
