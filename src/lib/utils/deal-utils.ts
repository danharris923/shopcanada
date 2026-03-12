/**
 * Deal Utilities
 *
 * Shared utilities for deal cards including highlight tags, tag selection,
 * and MixedDeal to DealCardProps normalization.
 */

import { hashString } from './hash'
import type { MixedDeal, DealCardProps } from '@/types/deal'

/**
 * Highlight tag configuration with text and Tailwind color class
 */
export interface HighlightTag {
  text: string
  color: string
}

/**
 * Array of 8 highlight tags used for affiliated deals.
 * Each tag has a distinctive color to create visual variety.
 */
export const highlightTags: HighlightTag[] = [
  { text: 'HOT DEAL', color: 'bg-red-600' },
  { text: 'BEST PRICE', color: 'bg-orange-600' },
  { text: 'LIMITED TIME', color: 'bg-purple-600' },
  { text: 'TRENDING', color: 'bg-pink-600' },
  { text: 'POPULAR', color: 'bg-blue-600' },
  { text: 'FLASH SALE', color: 'bg-green-600' },
  { text: 'EXCLUSIVE', color: 'bg-indigo-600' },
  { text: 'TOP PICK', color: 'bg-yellow-600' },
]

/**
 * Generates a consistent random tag based on input string.
 * Uses a simple hash function to ensure the same input always returns the same tag.
 *
 * @param input - Any string (deal ID, title, etc.) used to determine which tag to return
 * @returns A HighlightTag object with text and color properties
 *
 * @example
 * getRandomTag("deal-123") // { text: 'HOT DEAL', color: 'bg-red-600' }
 * getRandomTag("deal-123") // Same result every time for same input
 */
export function getRandomTag(input: string): HighlightTag {
  return highlightTags[hashString(input) % highlightTags.length]
}


/**
 * Normalize a MixedDeal (from any source) into clean DealCardProps.
 * Eliminates the snake_case/camelCase fallback chains at the page level.
 */
export function toDealCardProps(deal: MixedDeal, overrides?: Partial<DealCardProps>): DealCardProps {
  const isFlipp = deal.source === 'flipp'
  return {
    id: deal.id,
    title: deal.title,
    slug: deal.slug,
    imageUrl: deal.image_blob_url || deal.image_url || deal.imageUrl || undefined,
    price: deal.price,
    originalPrice: deal.original_price ?? deal.originalPrice ?? null,
    discountPercent: deal.discount_percent ?? deal.discountPercent ?? null,
    store: deal.store || null,
    affiliateUrl: deal.affiliate_url || '',
    featured: deal.featured,
    ...(isFlipp && {
      variant: 'flipp' as const,
      storeSlug: deal.storeSlug || deal.store?.toLowerCase().replace(/\s+/g, '-') || 'general',
      storeLogo: deal.storeLogo || '',
      validTo: deal.validTo || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      saleStory: deal.saleStory ?? null,
    }),
    ...overrides,
  }
}
