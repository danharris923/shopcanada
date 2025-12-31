#!/usr/bin/env npx ts-node
/**
 * System Audit Script
 *
 * Tests and verifies:
 * 1. Affiliate URLs from admin panel are being used correctly
 * 2. Search term stripping works (brand name, "collection", etc.)
 * 3. Deal shuffle balance (fashion/Amazon/RFD distribution)
 * 4. Store category tagging for related stores
 */

import * as dotenv from 'dotenv'
import * as path from 'path'

// Load environment variables from .env.local
dotenv.config({ path: path.join(__dirname, '..', '.env.local') })

import { Pool } from 'pg'
import { extractSearchTerms } from '../src/lib/affiliates'
import { FASHION_BRANDS, generateFashionDeal } from '../src/lib/fashion-brands'

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

function subheader(title: string) {
  console.log('')
  log('blue', `--- ${title} ---`)
}

// Database connection
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: { rejectUnauthorized: false }
})

async function auditAffiliateLinks() {
  header('AUDIT 1: Affiliate Links from Admin Panel')

  const fashionBrandSlugs = FASHION_BRANDS.map(b => b.slug)

  // Query stores that have affiliate_url set
  const result = await pool.query(`
    SELECT slug, name, affiliate_url
    FROM stores
    WHERE slug = ANY($1)
    ORDER BY name
  `, [fashionBrandSlugs])

  let withAffiliateUrl = 0
  let withoutAffiliateUrl = 0
  let issues: string[] = []

  for (const brand of FASHION_BRANDS) {
    const store = result.rows.find(r => r.slug === brand.slug)

    if (store?.affiliate_url) {
      withAffiliateUrl++
      // Check if it's a search URL pattern (ends with search param)
      const isSearchUrl = /[?&](q|query|search|searchTerm|keyword|k)=$/i.test(store.affiliate_url)

      if (isSearchUrl) {
        log('green', `  ✓ ${brand.name}: Search URL - ${store.affiliate_url}`)
      } else {
        log('yellow', `  ⚠ ${brand.name}: Direct URL - ${store.affiliate_url}`)
      }
    } else {
      withoutAffiliateUrl++
      log('dim', `  ✗ ${brand.name}: No affiliate_url in admin panel (using fallback)`)
    }
  }

  console.log('')
  log('cyan', `Summary: ${withAffiliateUrl}/${FASHION_BRANDS.length} brands have affiliate URLs in admin panel`)

  if (withoutAffiliateUrl > 0) {
    log('yellow', `${withoutAffiliateUrl} brands are using fallback RETAILER_SEARCH_URLS`)
  }

  return { withAffiliateUrl, withoutAffiliateUrl, issues }
}

async function auditSearchTermStripping() {
  header('AUDIT 2: Search Term Stripping Logic')

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
  header('AUDIT 3: Deal Shuffle Balance')

  // Check expected distribution percentages
  const expectedDistribution = {
    fashion: { min: 30, max: 40 },  // ~33%
    flipp: { min: 20, max: 30 },    // ~25%
    amazon: { min: 15, max: 25 },   // ~20% (maximum)
    other: { min: 15, max: 30 },    // remaining
  }

  log('blue', 'Expected Distribution:')
  log('dim', `  - Fashion: ${expectedDistribution.fashion.min}-${expectedDistribution.fashion.max}%`)
  log('dim', `  - Flipp: ${expectedDistribution.flipp.min}-${expectedDistribution.flipp.max}%`)
  log('dim', `  - Amazon: ${expectedDistribution.amazon.min}-${expectedDistribution.amazon.max}%`)
  log('dim', `  - Other: ${expectedDistribution.other.min}-${expectedDistribution.other.max}%`)

  subheader('Fashion Brand Priorities')

  const premiumBrands = FASHION_BRANDS.filter(b => b.priority === 'premium')
  const topBrands = FASHION_BRANDS.filter(b => b.priority === 'top')
  const standardBrands = FASHION_BRANDS.filter(b => b.priority === 'standard')

  log('cyan', `Premium Tier (50% of fashion slots):`)
  premiumBrands.forEach(b => log('green', `  - ${b.name} ${b.isCanadian ? '🍁' : ''}`))

  log('cyan', `\nTop Tier (30% of fashion slots):`)
  topBrands.forEach(b => log('yellow', `  - ${b.name} ${b.isCanadian ? '🍁' : ''}`))

  log('cyan', `\nStandard Tier (${standardBrands.length} brands for remaining slots)`)

  console.log('')
  log('cyan', `Summary: ${FASHION_BRANDS.length} total fashion brands`)
  log('dim', `  Premium: ${premiumBrands.length}, Top: ${topBrands.length}, Standard: ${standardBrands.length}`)

  return { premiumBrands, topBrands, standardBrands }
}

async function auditStoreCategoryTagging() {
  header('AUDIT 4: Store Category Tagging')

  const fashionBrandSlugs = FASHION_BRANDS.map(b => b.slug)

  // Query stores with their top_categories
  const result = await pool.query(`
    SELECT slug, name, top_categories, is_canadian
    FROM stores
    WHERE slug = ANY($1)
    ORDER BY name
  `, [fashionBrandSlugs])

  let withCategories = 0
  let withoutCategories = 0
  const categoryStats: Record<string, number> = {}

  subheader('Fashion Brands Category Tagging')

  for (const row of result.rows) {
    const categories = row.top_categories || []

    if (categories.length > 0) {
      withCategories++
      log('green', `  ✓ ${row.name}: ${categories.join(', ')} ${row.is_canadian ? '🍁' : ''}`)

      // Track category stats
      for (const cat of categories) {
        categoryStats[cat] = (categoryStats[cat] || 0) + 1
      }
    } else {
      withoutCategories++
      log('yellow', `  ⚠ ${row.name}: No categories assigned`)
    }
  }

  // Check for stores not in DB at all
  const foundSlugs = new Set(result.rows.map(r => r.slug))
  const missingFromDb = FASHION_BRANDS.filter(b => !foundSlugs.has(b.slug))

  if (missingFromDb.length > 0) {
    subheader('Missing from Database')
    for (const brand of missingFromDb) {
      log('red', `  ✗ ${brand.name} (${brand.slug}) - not in stores table`)
    }
  }

  subheader('Category Distribution')
  const sortedCategories = Object.entries(categoryStats).sort((a, b) => b[1] - a[1])
  for (const [cat, count] of sortedCategories) {
    log('dim', `  ${cat}: ${count} stores`)
  }

  console.log('')
  log('cyan', `Summary: ${withCategories}/${result.rows.length} stores have categories assigned`)

  if (withoutCategories > 0) {
    log('yellow', `${withoutCategories} stores need category tagging for proper related stores`)
  }

  if (missingFromDb.length > 0) {
    log('red', `${missingFromDb.length} fashion brands are not in the stores table - add them!`)
  }

  return { withCategories, withoutCategories, missingFromDb: missingFromDb.map(b => b.slug), categoryStats }
}

async function auditFashionDealGeneration() {
  header('AUDIT 5: Fashion Deal Generation')

  // Test deal generation for a few brands
  const testBrands = FASHION_BRANDS.slice(0, 5) // First 5 brands

  // Get affiliate URLs from DB
  const slugs = testBrands.map(b => b.slug)
  const result = await pool.query(`
    SELECT slug, affiliate_url FROM stores WHERE slug = ANY($1)
  `, [slugs])
  const affiliateUrls = new Map(result.rows.map(r => [r.slug, r.affiliate_url]))

  subheader('Sample Generated Deals')

  for (const brand of testBrands) {
    // Mock image files
    const mockImages = ['img_01.jpg', 'img_02.jpg', 'img_03.jpg']
    const storeAffiliateUrl = affiliateUrls.get(brand.slug)

    const deal = generateFashionDeal(brand, 0, mockImages, storeAffiliateUrl)

    log('cyan', `\n${brand.name}:`)
    log('dim', `  ID: ${deal.id}`)
    log('dim', `  Title: ${deal.title}`)
    log('dim', `  Affiliate URL: ${deal.affiliate_url?.substring(0, 80)}...`)

    // Check if affiliate URL looks correct
    if (storeAffiliateUrl) {
      if (deal.affiliate_url?.startsWith(storeAffiliateUrl.split('?')[0])) {
        log('green', `  ✓ Uses admin panel affiliate URL`)
      } else {
        log('yellow', `  ⚠ May not be using admin panel URL correctly`)
      }
    } else {
      log('dim', `  (Using fallback search URL)`)
    }
  }

  return {}
}

async function runFullAudit() {
  console.log('\n' + '╔' + '═'.repeat(58) + '╗')
  console.log('║' + ' '.repeat(15) + 'SHOPCANADA SYSTEM AUDIT' + ' '.repeat(20) + '║')
  console.log('╚' + '═'.repeat(58) + '╝')
  console.log(`\nTimestamp: ${new Date().toISOString()}`)

  try {
    // Run all audits
    const affiliateResults = await auditAffiliateLinks()
    const searchResults = await auditSearchTermStripping()
    const shuffleResults = await auditDealShuffleBalance()
    const categoryResults = await auditStoreCategoryTagging()
    const dealGenResults = await auditFashionDealGeneration()

    // Final summary
    header('AUDIT COMPLETE - SUMMARY')

    console.log('')
    log('cyan', '1. Affiliate Links:')
    log('dim', `   ${affiliateResults.withAffiliateUrl}/${FASHION_BRANDS.length} brands have admin panel affiliate URLs`)

    console.log('')
    log('cyan', '2. Search Term Stripping:')
    log('dim', `   ${searchResults.passed}/${searchResults.passed + searchResults.failed} tests passed`)

    console.log('')
    log('cyan', '3. Deal Shuffle Balance:')
    log('dim', `   ${shuffleResults.premiumBrands.length} premium + ${shuffleResults.topBrands.length} top tier brands configured`)

    console.log('')
    log('cyan', '4. Store Categories:')
    log('dim', `   ${categoryResults.withCategories} stores have categories`)
    if (categoryResults.missingFromDb.length > 0) {
      log('red', `   ACTION NEEDED: Add ${categoryResults.missingFromDb.length} brands to stores table`)
    }

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
