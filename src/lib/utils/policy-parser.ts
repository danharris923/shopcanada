/**
 * Policy Parser Utilities
 *
 * Extracts structured information from store policy text strings.
 * Used by DealCard (with variant='default' or variant='flipp') to display store info badges.
 */

/**
 * Extracts the number of days from a return policy text string.
 *
 * @param policy - The return policy text (e.g., "30 day return policy")
 * @returns Formatted string like "30-day returns" or null if no days found
 *
 * @example
 * getReturnDays("30 day return policy") // "30-day returns"
 * getReturnDays("Returns within 60 days") // "60-day returns"
 * getReturnDays("No returns") // null
 */
export function getReturnDays(policy: string): string | null {
  const match = policy.match(/(\d+)\s*day/i)
  return match ? `${match[1]}-day returns` : null
}

/**
 * Extracts the free shipping threshold from shipping info text.
 *
 * @param shipping - The shipping info text (e.g., "Free shipping on orders $50+")
 * @returns Formatted string like "Free ship $50+" or null if no threshold found
 *
 * @example
 * getShipThreshold("Free shipping on orders $50+") // "Free ship $50+"
 * getShipThreshold("Free delivery over $100") // "Free ship $100+"
 * getShipThreshold("Flat rate $5.99") // null
 */
export function getShipThreshold(shipping: string): string | null {
  const match = shipping.match(/\$(\d+)/i)
  if (shipping.toLowerCase().includes('free') && match) {
    return `Free ship $${match[1]}+`
  }
  return null
}
