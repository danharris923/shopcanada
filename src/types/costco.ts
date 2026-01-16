/**
 * Costco product types - matches costco_products and costco_price_history tables
 */

/**
 * Costco product from costco_products table
 */
export interface CostcoProduct {
  id: number
  item_id: string
  name: string
  slug: string
  category: string | null
  image_url: string | null
  source: string
  current_price: number | null
  current_price_min: number | null
  current_price_max: number | null
  warehouses_reporting: number | null
  first_seen_at: string
  last_updated_at: string
  is_active: boolean
}

/**
 * Costco price history from costco_price_history table
 */
export interface CostcoPriceHistory {
  id: number
  product_id: number
  price: number | null
  price_min: number | null
  price_max: number | null
  warehouses_reporting: number | null
  recorded_at: string
}

/**
 * Costco category with count for listing pages
 */
export interface CostcoCategory {
  category: string
  count: number
}

/**
 * Props for Costco deal card component
 */
export interface CostcoDealCardProps {
  product: CostcoProduct
  variant?: 'default' | 'compact'
}

/**
 * Props for price history chart component
 */
export interface PriceHistoryChartProps {
  history: CostcoPriceHistory[]
  currentPrice: number | null
}

/**
 * Props for warehouse badge component
 */
export interface WarehouseBadgeProps {
  warehouseCount: number | null
  size?: 'sm' | 'md' | 'lg'
}

/**
 * Props for price range display component
 */
export interface PriceRangeDisplayProps {
  priceMin: number | null
  priceMax: number | null
  currentPrice: number | null
  size?: 'sm' | 'md' | 'lg' | 'xl'
}
