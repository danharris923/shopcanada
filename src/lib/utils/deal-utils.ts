/**
 * Deal Utilities
 *
 * Shared utilities for deal cards including highlight tags and tag selection.
 * Used by DealCard (with variant='default' or variant='flipp') for consistent tag display.
 */

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
  // Simple hash function: djb2-style string hashing
  const hash = input.split('').reduce((a, b) => {
    a = ((a << 5) - a) + b.charCodeAt(0)
    return a & a
  }, 0)

  return highlightTags[Math.abs(hash) % highlightTags.length]
}
