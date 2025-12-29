/**
 * Comprehensive Store Data Migration Script
 *
 * Consolidates data from multiple source files into the stores database table:
 * - src/lib/store-logos.ts (storeLogos)
 * - src/lib/brands-data.ts (brands)
 * - src/lib/store-info.ts (storeInfo)
 * - src/lib/affiliates.ts (RAKUTEN_MERCHANTS)
 * - src/lib/flipp.ts (STORE_SLUGS)
 *
 * Run with: npx tsx scripts/migrate-store-data.ts
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

// =============================================================================
// TYPE DEFINITIONS
// =============================================================================

interface ParsedStoreLogos {
  slug: string
  name: string
  domain: string
  logo: string
  color: string
  tagline: string
  badges?: string[]
  topCategories?: string[]
  isCanadian?: boolean
  province?: string
}

interface ParsedBrand {
  slug: string
  name: string
  type: string
  category: string
  url: string
  logo?: string
  screenshot?: string
  description: string
  brandStory?: string
}

interface ParsedStoreInfo {
  name: string
  returnPolicy: string
  loyaltyProgram?: {
    name: string
    description: string
  }
  shippingInfo: string
  priceMatch?: string
}

interface ConsolidatedStore {
  slug: string
  name: string
  type: 'store' | 'brand'
  website_url: string | null
  logo_url: string | null
  color: string | null
  tagline: string | null
  description: string | null
  badges: string[]
  top_categories: string[]
  flipp_aliases: string[]
  is_canadian: boolean
  province: string | null
  return_policy: string | null
  loyalty_program_name: string | null
  loyalty_program_desc: string | null
  shipping_info: string | null
  price_match_policy: string | null
  rakuten_merchant_id: string | null
  screenshot_url: string | null
  brand_story: string | null
}

// =============================================================================
// FILE PARSING FUNCTIONS
// =============================================================================

function readFileContent(relativePath: string): string {
  const fullPath = path.join(process.cwd(), relativePath)
  if (!fs.existsSync(fullPath)) {
    console.log(`   Warning: File not found: ${relativePath}`)
    return ''
  }
  return fs.readFileSync(fullPath, 'utf-8')
}

/**
 * Parse store-logos.ts to extract storeLogos object
 */
function parseStoreLogos(): Map<string, ParsedStoreLogos> {
  console.log('   Parsing store-logos.ts...')
  const content = readFileContent('src/lib/store-logos.ts')
  const stores = new Map<string, ParsedStoreLogos>()

  if (!content) return stores

  // Match each store entry in the storeLogos object
  // Format: 'slug': { slug: '...', name: '...', ... }
  const storeRegex = /'([a-z0-9-]+)':\s*\{([^}]+(?:\{[^}]*\}[^}]*)*)\}/g
  let match

  while ((match = storeRegex.exec(content)) !== null) {
    const slug = match[1]
    const block = match[2]

    // Extract fields
    const nameMatch = block.match(/name:\s*['"]([^'"]+)['"]/)
    const domainMatch = block.match(/domain:\s*['"]([^'"]+)['"]/)
    const colorMatch = block.match(/color:\s*['"]([^'"]+)['"]/)
    const taglineMatch = block.match(/tagline:\s*['"]([^'"]+)['"]/)
    const isCanadianMatch = block.match(/isCanadian:\s*(true|false)/)
    const provinceMatch = block.match(/province:\s*['"]([^'"]+)['"]/)

    // Extract badges array
    const badgesMatch = block.match(/badges:\s*\[([^\]]*)\]/)
    const badges: string[] = []
    if (badgesMatch) {
      const badgeItems = badgesMatch[1].match(/'([^']+)'/g)
      if (badgeItems) {
        badgeItems.forEach(b => badges.push(b.replace(/'/g, '')))
      }
    }

    // Extract topCategories array
    const categoriesMatch = block.match(/topCategories:\s*\[([^\]]*)\]/)
    const topCategories: string[] = []
    if (categoriesMatch) {
      const catItems = categoriesMatch[1].match(/'([^']+)'/g)
      if (catItems) {
        catItems.forEach(c => topCategories.push(c.replace(/'/g, '')))
      }
    }

    if (nameMatch && domainMatch) {
      stores.set(slug, {
        slug,
        name: nameMatch[1],
        domain: domainMatch[1],
        logo: `https://www.google.com/s2/favicons?domain=${domainMatch[1]}&sz=128`,
        color: colorMatch?.[1] || '',
        tagline: taglineMatch?.[1] || '',
        badges,
        topCategories,
        isCanadian: isCanadianMatch?.[1] === 'true',
        province: provinceMatch?.[1]
      })
    }
  }

  console.log(`   Found ${stores.size} stores in store-logos.ts`)
  return stores
}

/**
 * Parse brands-data.ts to extract brands array
 */
function parseBrandsData(): Map<string, ParsedBrand> {
  console.log('   Parsing brands-data.ts...')
  const content = readFileContent('src/lib/brands-data.ts')
  const brands = new Map<string, ParsedBrand>()

  if (!content) return brands

  // Parse brands array by finding each object block
  // Split by the pattern that starts each brand entry
  const brandBlocks = content.split(/\n\s*\{\s*\n?\s*"slug":\s*"/)

  for (let i = 1; i < brandBlocks.length; i++) {
    // Reconstruct the block with the slug prefix
    const rawBlock = '{"slug": "' + brandBlocks[i]

    // Find the end of this object (matching closing brace)
    let braceCount = 0
    let endIdx = 0
    for (let j = 0; j < rawBlock.length; j++) {
      if (rawBlock[j] === '{') braceCount++
      if (rawBlock[j] === '}') braceCount--
      if (braceCount === 0 && j > 0) {
        endIdx = j + 1
        break
      }
    }

    const block = rawBlock.substring(0, endIdx)

    // Extract slug from the reconstructed block
    const slugMatch = block.match(/"slug":\s*"([^"]+)"/)
    if (!slugMatch) continue
    const slug = slugMatch[1]

    // Extract fields using JSON-style parsing
    const nameMatch = block.match(/"name":\s*"([^"]+)"/)
    const typeMatch = block.match(/"type":\s*"([^"]+)"/)
    const categoryMatch = block.match(/"category":\s*"([^"]+)"/)
    const urlMatch = block.match(/"url":\s*"([^"]+)"/)
    const logoMatch = block.match(/"logo":\s*"([^"]+)"/)
    const screenshotMatch = block.match(/"screenshot":\s*"([^"]+)"/)
    const descriptionMatch = block.match(/"description":\s*"([^"]+)"/)
    const brandStoryMatch = block.match(/"brandStory":\s*"((?:[^"\\]|\\.)*)"/)

    if (nameMatch) {
      brands.set(slug, {
        slug,
        name: nameMatch[1],
        type: typeMatch?.[1] || 'Brand',
        category: categoryMatch?.[1] || '',
        url: urlMatch?.[1] || '',
        logo: logoMatch?.[1],
        screenshot: screenshotMatch?.[1],
        description: descriptionMatch?.[1] || '',
        brandStory: brandStoryMatch?.[1]?.replace(/\\"/g, '"').replace(/\\n/g, '\n')
      })
    }
  }

  console.log(`   Found ${brands.size} brands in brands-data.ts`)
  return brands
}

/**
 * Parse store-info.ts to extract storeInfo object
 */
function parseStoreInfo(): Map<string, ParsedStoreInfo> {
  console.log('   Parsing store-info.ts...')
  const content = readFileContent('src/lib/store-info.ts')
  const storeInfoMap = new Map<string, ParsedStoreInfo>()

  if (!content) return storeInfoMap

  // Match each store entry in the storeInfo object
  const storeRegex = /'([a-z0-9-]+)':\s*\{([^}]+(?:\{[^}]*\}[^}]*)*)\}/g
  let match

  while ((match = storeRegex.exec(content)) !== null) {
    const slug = match[1]
    const block = match[2]

    const nameMatch = block.match(/name:\s*['"]([^'"]+)['"]/)
    const returnPolicyMatch = block.match(/returnPolicy:\s*['"]([^'"]+)['"]/)
    const shippingInfoMatch = block.match(/shippingInfo:\s*['"]([^'"]+)['"]/)
    const priceMatchMatch = block.match(/priceMatch:\s*['"]([^'"]+)['"]/)

    // Extract loyalty program (handle multi-line)
    const loyaltyMatch = block.replace(/\n/g, ' ').match(/loyaltyProgram:\s*\{\s*name:\s*['"]([^'"]+)['"],\s*description:\s*['"]([^'"]+)['"]/)

    if (nameMatch) {
      storeInfoMap.set(slug, {
        name: nameMatch[1],
        returnPolicy: returnPolicyMatch?.[1] || '',
        shippingInfo: shippingInfoMatch?.[1] || '',
        priceMatch: priceMatchMatch?.[1],
        loyaltyProgram: loyaltyMatch ? {
          name: loyaltyMatch[1],
          description: loyaltyMatch[2]
        } : undefined
      })
    }
  }

  console.log(`   Found ${storeInfoMap.size} store info entries`)
  return storeInfoMap
}

/**
 * Parse affiliates.ts to extract RAKUTEN_MERCHANTS
 */
function parseRakutenMerchants(): Map<string, string> {
  console.log('   Parsing affiliates.ts...')
  const content = readFileContent('src/lib/affiliates.ts')
  const merchants = new Map<string, string>()

  if (!content) return merchants

  // Match RAKUTEN_MERCHANTS object entries
  const merchantRegex = /'([a-z0-9-]+)':\s*\{\s*mid:\s*'([^']+)'/g
  let match

  while ((match = merchantRegex.exec(content)) !== null) {
    merchants.set(match[1], match[2])
  }

  console.log(`   Found ${merchants.size} Rakuten merchants`)
  return merchants
}

/**
 * Parse flipp.ts to extract STORE_SLUGS and build reverse mapping
 */
function parseFlippAliases(): Map<string, string[]> {
  console.log('   Parsing flipp.ts...')
  const content = readFileContent('src/lib/flipp.ts')
  const aliasMap = new Map<string, string[]>()

  if (!content) return aliasMap

  // Match STORE_SLUGS entries: 'Store Name': 'slug'
  const aliasRegex = /'([^']+)':\s*'([a-z0-9-]+)'/g
  let match

  while ((match = aliasRegex.exec(content)) !== null) {
    const storeName = match[1]
    const slug = match[2]

    const existing = aliasMap.get(slug) || []
    if (!existing.includes(storeName)) {
      existing.push(storeName)
    }
    aliasMap.set(slug, existing)
  }

  console.log(`   Found aliases for ${aliasMap.size} store slugs`)
  return aliasMap
}

// =============================================================================
// DATA CONSOLIDATION
// =============================================================================

function consolidateStoreData(): Map<string, ConsolidatedStore> {
  console.log('\n2. Parsing source files...')

  const storeLogos = parseStoreLogos()
  const brands = parseBrandsData()
  const storeInfo = parseStoreInfo()
  const rakutenMerchants = parseRakutenMerchants()
  const flippAliases = parseFlippAliases()

  console.log('\n3. Consolidating data...')

  const consolidated = new Map<string, ConsolidatedStore>()

  // Process store-logos.ts entries (primary source)
  for (const [slug, store] of storeLogos) {
    const info = storeInfo.get(slug)
    const brand = brands.get(slug)
    const rakutenId = rakutenMerchants.get(slug)
    const aliases = flippAliases.get(slug) || []

    consolidated.set(slug, {
      slug,
      name: store.name,
      type: 'store',
      website_url: `https://www.${store.domain}`,
      logo_url: store.logo,
      color: store.color || null,
      tagline: store.tagline || null,
      description: brand?.description || null,
      badges: store.badges || [],
      top_categories: store.topCategories || [],
      flipp_aliases: aliases,
      is_canadian: store.isCanadian || false,
      province: store.province || null,
      return_policy: info?.returnPolicy || null,
      loyalty_program_name: info?.loyaltyProgram?.name || null,
      loyalty_program_desc: info?.loyaltyProgram?.description || null,
      shipping_info: info?.shippingInfo || null,
      price_match_policy: info?.priceMatch || null,
      rakuten_merchant_id: rakutenId || null,
      screenshot_url: brand?.screenshot || null,
      brand_story: brand?.brandStory || null
    })
  }

  // Process brands-data.ts entries not in store-logos
  for (const [slug, brand] of brands) {
    if (!consolidated.has(slug)) {
      const info = storeInfo.get(slug)
      const rakutenId = rakutenMerchants.get(slug)
      const aliases = flippAliases.get(slug) || []

      // Extract domain from URL
      let domain = ''
      try {
        const urlObj = new URL(brand.url)
        domain = urlObj.hostname.replace('www.', '')
      } catch {
        domain = brand.url
      }

      consolidated.set(slug, {
        slug,
        name: brand.name,
        type: 'brand',
        website_url: brand.url || null,
        logo_url: brand.logo || `https://www.google.com/s2/favicons?domain=${domain}&sz=128`,
        color: null,
        tagline: null,
        description: brand.description,
        badges: [],
        top_categories: brand.category ? [brand.category] : [],
        flipp_aliases: aliases,
        is_canadian: true, // brands-data.ts contains Canadian brands
        province: null,
        return_policy: info?.returnPolicy || null,
        loyalty_program_name: info?.loyaltyProgram?.name || null,
        loyalty_program_desc: info?.loyaltyProgram?.description || null,
        shipping_info: info?.shippingInfo || null,
        price_match_policy: info?.priceMatch || null,
        rakuten_merchant_id: rakutenId || null,
        screenshot_url: brand.screenshot || null,
        brand_story: brand.brandStory || null
      })
    }
  }

  console.log(`   Consolidated ${consolidated.size} total stores/brands`)
  return consolidated
}

// =============================================================================
// BRAND STORY EXTRACTION
// =============================================================================

function extractBrandStories(consolidated: Map<string, ConsolidatedStore>) {
  console.log('\n4. Extracting brand stories to markdown files...')

  const contentDir = path.join(process.cwd(), 'src', 'content', 'brands', 'stories')

  // Create directory if it doesn't exist
  if (!fs.existsSync(contentDir)) {
    fs.mkdirSync(contentDir, { recursive: true })
    console.log(`   Created directory: ${contentDir}`)
  }

  let extracted = 0
  for (const [slug, store] of consolidated) {
    if (store.brand_story && store.brand_story.length > 100) {
      const filePath = path.join(contentDir, `${slug}.md`)

      // Create markdown content with frontmatter
      const content = `---
slug: ${slug}
name: ${store.name}
type: ${store.type}
---

# ${store.name}

${store.brand_story}
`
      fs.writeFileSync(filePath, content, 'utf-8')
      extracted++
    }
  }

  console.log(`   Extracted ${extracted} brand stories to ${contentDir}`)
}

// =============================================================================
// DATABASE OPERATIONS
// =============================================================================

async function upsertStores(consolidated: Map<string, ConsolidatedStore>) {
  console.log('\n5. Upserting stores to database...')

  let inserted = 0
  let updated = 0
  let errors = 0

  for (const [slug, store] of consolidated) {
    try {
      // Check if store exists
      const existing = await pool.query(
        'SELECT id FROM stores WHERE slug = $1',
        [slug]
      )

      if (existing.rows.length > 0) {
        // UPDATE existing store
        await pool.query(`
          UPDATE stores SET
            name = $1,
            type = $2,
            website_url = COALESCE($3, website_url),
            logo_url = COALESCE($4, logo_url),
            color = COALESCE($5, color),
            tagline = COALESCE($6, tagline),
            description = COALESCE($7, description),
            badges = COALESCE($8, badges),
            top_categories = COALESCE($9, top_categories),
            flipp_aliases = COALESCE($10, flipp_aliases),
            is_canadian = $11,
            province = COALESCE($12, province),
            return_policy = COALESCE($13, return_policy),
            loyalty_program_name = COALESCE($14, loyalty_program_name),
            loyalty_program_desc = COALESCE($15, loyalty_program_desc),
            shipping_info = COALESCE($16, shipping_info),
            price_match_policy = COALESCE($17, price_match_policy),
            rakuten_merchant_id = COALESCE($18, rakuten_merchant_id),
            screenshot_url = COALESCE($19, screenshot_url),
            updated_at = NOW()
          WHERE slug = $20
        `, [
          store.name,
          store.type,
          store.website_url,
          store.logo_url,
          store.color,
          store.tagline,
          store.description,
          JSON.stringify(store.badges),
          JSON.stringify(store.top_categories),
          JSON.stringify(store.flipp_aliases),
          store.is_canadian,
          store.province,
          store.return_policy,
          store.loyalty_program_name,
          store.loyalty_program_desc,
          store.shipping_info,
          store.price_match_policy,
          store.rakuten_merchant_id,
          store.screenshot_url,
          slug
        ])
        updated++
      } else {
        // INSERT new store
        await pool.query(`
          INSERT INTO stores (
            name, slug, type, website_url, logo_url, color, tagline, description,
            badges, top_categories, flipp_aliases, is_canadian, province,
            return_policy, loyalty_program_name, loyalty_program_desc,
            shipping_info, price_match_policy, rakuten_merchant_id, screenshot_url,
            deal_count, created_at, updated_at
          ) VALUES (
            $1, $2, $3, $4, $5, $6, $7, $8,
            $9, $10, $11, $12, $13,
            $14, $15, $16, $17, $18, $19, $20,
            0, NOW(), NOW()
          )
        `, [
          store.name,
          slug,
          store.type,
          store.website_url,
          store.logo_url,
          store.color,
          store.tagline,
          store.description,
          JSON.stringify(store.badges),
          JSON.stringify(store.top_categories),
          JSON.stringify(store.flipp_aliases),
          store.is_canadian,
          store.province,
          store.return_policy,
          store.loyalty_program_name,
          store.loyalty_program_desc,
          store.shipping_info,
          store.price_match_policy,
          store.rakuten_merchant_id,
          store.screenshot_url
        ])
        inserted++
      }
    } catch (err: any) {
      console.error(`   Error processing ${slug}: ${err.message}`)
      errors++
    }
  }

  console.log(`   Inserted: ${inserted}`)
  console.log(`   Updated: ${updated}`)
  if (errors > 0) {
    console.log(`   Errors: ${errors}`)
  }
}

// =============================================================================
// MAIN MIGRATION
// =============================================================================

async function migrate() {
  console.log('='.repeat(70))
  console.log('Store Data Migration')
  console.log('Consolidating data from all source files into database')
  console.log('='.repeat(70))

  try {
    // Step 1: Ensure columns exist (run phase 2 migration first if needed)
    console.log('\n1. Checking database schema...')

    // Try to add columns if they don't exist
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
      } catch (err: any) {
        if (err.code !== '42701') { // Ignore "column already exists" errors
          console.error(`   Warning: Could not add column ${colName}: ${err.message}`)
        }
      }
    }
    console.log('   Schema ready.')

    // Step 2-4: Parse and consolidate
    const consolidated = consolidateStoreData()

    // Step 4: Extract brand stories
    extractBrandStories(consolidated)

    // Step 5: Upsert to database
    await upsertStores(consolidated)

    // Step 6: Show summary
    console.log('\n6. Migration Summary:')

    const stats = await pool.query(`
      SELECT
        COUNT(*) as total,
        COUNT(CASE WHEN type = 'store' THEN 1 END) as stores,
        COUNT(CASE WHEN type = 'brand' THEN 1 END) as brands,
        COUNT(CASE WHEN is_canadian = true THEN 1 END) as canadian,
        COUNT(logo_url) as with_logo,
        COUNT(tagline) as with_tagline,
        COUNT(description) as with_description,
        COUNT(return_policy) as with_policy,
        COUNT(rakuten_merchant_id) as with_rakuten
      FROM stores
    `)

    const s = stats.rows[0]
    console.log(`   Total entries: ${s.total}`)
    console.log(`   - Stores: ${s.stores}`)
    console.log(`   - Brands: ${s.brands}`)
    console.log(`   - Canadian: ${s.canadian}`)
    console.log(`   With logo: ${s.with_logo}`)
    console.log(`   With tagline: ${s.with_tagline}`)
    console.log(`   With description: ${s.with_description}`)
    console.log(`   With return policy: ${s.with_policy}`)
    console.log(`   With Rakuten ID: ${s.with_rakuten}`)

    console.log('\n' + '='.repeat(70))
    console.log('Migration complete!')
    console.log('='.repeat(70))

  } catch (error) {
    console.error('\nMigration failed:', error)
    process.exit(1)
  } finally {
    await pool.end()
  }
}

// Run migration
migrate()
