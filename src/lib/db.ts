import { Pool } from 'pg'
import { Deal, Store, Category } from '@/types/deal'

/**
 * Database queries for deals, stores, and categories.
 * Uses pg driver for Prisma Postgres compatibility.
 */

// Create a connection pool
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: { rejectUnauthorized: false }
})

// Helper to run queries
async function query<T>(queryText: string, values?: unknown[]): Promise<T[]> {
  try {
    const result = await pool.query(queryText, values)
    return result.rows as T[]
  } catch (error) {
    console.error('Query error:', error)
    throw error
  }
}

// Helper for single row queries
async function queryOne<T>(queryText: string, values?: unknown[]): Promise<T | null> {
  const rows = await query<T>(queryText, values)
  return rows[0] || null
}

// =============================================================================
// DEALS
// =============================================================================

export async function getDealBySlug(slug: string): Promise<Deal | null> {
  return await queryOne<Deal>(
    'SELECT * FROM deals WHERE slug = $1 AND is_active = TRUE LIMIT 1',
    [slug]
  )
}

export async function getDealById(id: string): Promise<Deal | null> {
  return await queryOne<Deal>(
    'SELECT * FROM deals WHERE id = $1 AND is_active = TRUE LIMIT 1',
    [id]
  )
}

export async function getDeals(options: {
  limit?: number
  offset?: number
  store?: string
  category?: string
  featured?: boolean
  orderBy?: 'date_added' | 'discount_percent' | 'price'
  orderDir?: 'ASC' | 'DESC'
} = {}): Promise<Deal[]> {
  const {
    limit = 20,
    offset = 0,
    store,
    category,
    featured,
    orderBy = 'date_added',
    orderDir = 'DESC'
  } = options

  const values: unknown[] = []
  let paramIndex = 1

  let queryText = 'SELECT * FROM deals WHERE is_active = TRUE'

  if (store) {
    queryText += ` AND store = $${paramIndex++}`
    values.push(store)
  }
  if (category) {
    queryText += ` AND category = $${paramIndex++}`
    values.push(category)
  }
  if (featured !== undefined) {
    queryText += ` AND featured = $${paramIndex++}`
    values.push(featured)
  }

  queryText += ` ORDER BY ${orderBy} ${orderDir}`
  queryText += ` LIMIT $${paramIndex++} OFFSET $${paramIndex++}`
  values.push(limit, offset)

  return await query<Deal>(queryText, values)
}

export async function getFeaturedDeals(limit: number = 12): Promise<Deal[]> {
  return await query<Deal>(
    'SELECT * FROM deals WHERE is_active = TRUE AND featured = TRUE ORDER BY date_added DESC LIMIT $1',
    [limit]
  )
}

export async function getLatestDeals(limit: number = 20): Promise<Deal[]> {
  return await query<Deal>(
    'SELECT * FROM deals WHERE is_active = TRUE ORDER BY date_added DESC LIMIT $1',
    [limit]
  )
}

export async function getDealsByStore(store: string, limit: number = 50): Promise<Deal[]> {
  return await query<Deal>(
    'SELECT * FROM deals WHERE store = $1 AND is_active = TRUE ORDER BY date_added DESC LIMIT $2',
    [store, limit]
  )
}

export async function getDealsByCategory(category: string, limit: number = 50): Promise<Deal[]> {
  return await query<Deal>(
    'SELECT * FROM deals WHERE category = $1 AND is_active = TRUE ORDER BY date_added DESC LIMIT $2',
    [category, limit]
  )
}

export async function getRelatedDeals(deal: Deal, limit: number = 6): Promise<Deal[]> {
  return await query<Deal>(
    `SELECT * FROM deals
     WHERE is_active = TRUE
       AND id != $1
       AND (store = $2 OR category = $3)
     ORDER BY
       CASE WHEN store = $2 THEN 0 ELSE 1 END,
       date_added DESC
     LIMIT $4`,
    [deal.id, deal.store, deal.category, limit]
  )
}

export async function getAllDealSlugs(): Promise<string[]> {
  const rows = await query<{ slug: string }>(
    'SELECT slug FROM deals WHERE is_active = TRUE'
  )
  return rows.map(row => row.slug)
}

// =============================================================================
// STORES
// =============================================================================

export async function getStores(): Promise<Store[]> {
  return await query<Store>('SELECT * FROM stores ORDER BY deal_count DESC')
}

export async function getStoreBySlug(slug: string): Promise<Store | null> {
  return await queryOne<Store>(
    'SELECT * FROM stores WHERE slug = $1 LIMIT 1',
    [slug]
  )
}

// =============================================================================
// CATEGORIES
// =============================================================================

export async function getCategories(): Promise<Category[]> {
  return await query<Category>('SELECT * FROM categories ORDER BY deal_count DESC')
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  return await queryOne<Category>(
    'SELECT * FROM categories WHERE slug = $1 LIMIT 1',
    [slug]
  )
}

// =============================================================================
// STATS
// =============================================================================

export async function getDealCount(): Promise<number> {
  const rows = await query<{ count: string }>(
    'SELECT COUNT(*) as count FROM deals WHERE is_active = TRUE'
  )
  return parseInt(rows[0]?.count || '0', 10)
}

export async function getStoreStats(): Promise<{ store: string; count: number }[]> {
  const rows = await query<{ store: string; count: string }>(
    `SELECT store, COUNT(*) as count
     FROM deals
     WHERE is_active = TRUE AND store IS NOT NULL
     GROUP BY store
     ORDER BY count DESC`
  )
  return rows.map(row => ({ store: row.store, count: parseInt(row.count, 10) }))
}

// =============================================================================
// SEARCH
// =============================================================================

export async function searchDeals(searchQuery: string, limit: number = 50): Promise<Deal[]> {
  if (!searchQuery || searchQuery.trim().length < 2) return []

  const searchTerm = `%${searchQuery.trim().toLowerCase()}%`
  const rows = await query<Deal>(
    `SELECT * FROM deals
     WHERE is_active = TRUE
     AND (LOWER(title) LIKE $1 OR LOWER(store) LIKE $1 OR LOWER(category) LIKE $1)
     ORDER BY featured DESC, date_added DESC
     LIMIT $2`,
    [searchTerm, limit]
  )
  return rows
}

// =============================================================================
// ADMIN FUNCTIONS
// =============================================================================

export async function getAllStoresAdmin(): Promise<Store[]> {
  return await query<Store>(
    'SELECT id, name, slug, affiliate_url, deal_count FROM stores ORDER BY name ASC'
  )
}

export async function updateStoreAffiliateUrl(id: number, affiliateUrl: string | null): Promise<boolean> {
  await query(
    'UPDATE stores SET affiliate_url = $1 WHERE id = $2',
    [affiliateUrl, id]
  )
  return true
}

export async function addStore(name: string, slug: string, affiliateUrl: string | null): Promise<boolean> {
  await query(
    'INSERT INTO stores (name, slug, affiliate_url, deal_count) VALUES ($1, $2, $3, 0)',
    [name, slug, affiliateUrl]
  )
  return true
}

export async function checkStoreSlugExists(slug: string): Promise<boolean> {
  const rows = await query<{ id: number }>(
    'SELECT id FROM stores WHERE slug = $1',
    [slug]
  )
  return rows.length > 0
}
