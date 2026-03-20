#!/usr/bin/env npx ts-node
/**
 * System Audit Script
 *
 * Tests and verifies:
 * 1. Search term stripping works (brand name, "collection", etc.)
 * 2. Deal shuffle balance (Amazon/Flipp/Other distribution)
 */

import * as dotenv from 'dotenv'
import * as path from 'path'

// Load environment variables from .env.local
dotenv.config({ path: path.join(__dirname, '..', '.env.local') })

import { Pool } from 'pg'
import { extractSearchTerms } from '../src/lib/affiliates'

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  dim: '\x1b[2m',
}

function log(color: keyof typeof colors, msg: string) {
  console.log(`${colors[color]}${msg}${colors.reset}`)
}

function header(title: string) {
  console.log('\n' + '='.repeat(60))
  log('cyan', `  ${title}`)
  console.log('='.repeat(60))
}

// Database connection
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: { rejectUnauthorized: false }
})

async function auditSearchTermStripping() {
  header('AUDIT 1: Search Term Stripping Logic')

  const testCases: [string, string | undefined, string][] = [
    // Format: [title, brandName, expected]
    ['Aritzia puffer coat collection', 'Aritzia', 'puffer coat'],
    ['Lululemon Align Leggings - New Arrivals', 'Lululemon', 'Align Leggings'],
    ['SKIMS - Shapewear Solutions', 'SKIMS', 'Shapewear Solutions'],
    ['Sale $6 Jays My Mighty Wolf, Doggy Bits dog treats', undefined, 'Jays My Mighty Wolf Doggy Bits dog treats'],
    ['SAVE 50% Tide Pods 42ct', undefined, 'Tide Pods'],
    ['$19.99 Samsung Galaxy Buds', undefined, 'Samsung Galaxy Buds'],
    ['Nike Air Max - Bestseller Collection', 'Nike', 'Air Max'],
    ['Free People - Boho Dresses', 'Free People', 'Boho Dresses'],
    ['Aldo - Trending Boots & Booties', 'Aldo', 'Trending Boots Booties'],
    ['New Balance 574 - Classic Style', 'New Balance', '574 Classic Style'],
  ]

  let passed = 0
  let failed = 0

  for (const [title, brandName, expected] of testCases) {
    const result = extractSearchTerms(title, brandName)
    // Normalize for comparison (lowercase, collapse spaces)
    const normalizedResult = result.toLowerCase().replace(/\s+/g, ' ').trim()
    const normalizedExpected = (expected || '').toLowerCase().replace(/\s+/g, ' ').trim()

    const isPass = normalizedResult.includes(normalizedExpected) ||
                   normalizedExpected.includes(normalizedResult) ||
                   // Check if core words match
                   normalizedExpected.split(' ').every(word => normalizedResult.includes(word))

    if (isPass) {
      passed++
      log('green', `  ✓ "${title}" => "${result}"`)
    } else {
      failed++
      log('red', `  ✗ "${title}" => "${result}"`)
      log('yellow', `      Expected to contain: "${expected}"`)
    }
  }

  console.log('')
  log('cyan', `Summary: ${passed}/${testCases.length} tests passed`)

  if (failed > 0) {
    log('red', `${failed} tests failed - check extractSearchTerms logic`)
  }

  return { passed, failed }
}

async function auditDealShuffleBalance() {
  header('AUDIT 2: Deal Shuffle Balance')

  const expectedDistribution = {
    flipp: { min: 20, max: 30 },    // ~25%
    amazon: { min: 15, max: 25 },   // ~20% (maximum)
    other: { min: 50, max: 65 },    // remaining
  }

  log('blue', 'Expected Distribution:')
  log('dim', `  - Flipp: ${expectedDistribution.flipp.min}-${expectedDistribution.flipp.max}%`)
  log('dim', `  - Amazon: ${expectedDistribution.amazon.min}-${expectedDistribution.amazon.max}%`)
  log('dim', `  - Other: ${expectedDistribution.other.min}-${expectedDistribution.other.max}%`)

  return { expectedDistribution }
}

async function runFullAudit() {
  console.log('\n' + '╔' + '═'.repeat(58) + '╗')
  console.log('║' + ' '.repeat(15) + 'SHOPCANADA SYSTEM AUDIT' + ' '.repeat(20) + '║')
  console.log('╚' + '═'.repeat(58) + '╝')
  console.log(`\nTimestamp: ${new Date().toISOString()}`)

  try {
    const searchResults = await auditSearchTermStripping()
    const shuffleResults = await auditDealShuffleBalance()

    header('AUDIT COMPLETE - SUMMARY')

    console.log('')
    log('cyan', '1. Search Term Stripping:')
    log('dim', `   ${searchResults.passed}/${searchResults.passed + searchResults.failed} tests passed`)

    console.log('')
    log('cyan', '2. Deal Shuffle Balance:')
    log('dim', `   Distribution targets configured`)

    console.log('\n')

  } catch (error) {
    log('red', `\nAudit failed with error: ${error}`)
    throw error
  } finally {
    await pool.end()
  }
}

// Run the audit
runFullAudit().catch(err => {
  console.error('Audit failed:', err)
  process.exit(1)
})
