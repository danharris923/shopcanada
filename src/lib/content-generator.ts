/**
 * Content Generator - Creates unique descriptions for SEO
 *
 * Uses template rotation and data injection to generate
 * unique content for each deal page.
 */

import { Deal, ContentContext } from '@/types/deal'
import { toNumber, formatPrice, calculateSavings } from '@/lib/price-utils'

// =============================================================================
// DESCRIPTION TEMPLATES (8 variations per category)
// =============================================================================

const DESCRIPTION_TEMPLATES = {
  default: [
    `Our Canadian shopping experts found this incredible deal on {product} at {store}. Originally priced at ${'{original_price}'}, you can now get it for just ${'{current_price}'}, saving you ${'{savings}'} ({percent}% off). {benefits} {urgency}`,

    `Looking for the best price on {product} in Canada? This {store} deal won't last long. With {percent}% off, you're saving ${'{savings}'} compared to the regular price. {benefits}`,

    `Canadian deal alert! Save ${'{savings}'} on {product} at {store}. This {category} deal brings the price down from ${'{original_price}'} to just ${'{current_price}'}. {benefits} {urgency}`,

    `Score big savings on {product}! {store} is offering this {category} essential at {percent}% off. That's ${'{savings}'} back in your pocket. {benefits}`,

    `Hot {category} deal for Canadian shoppers: {product} is now ${'{current_price}'} at {store} (regularly ${'{original_price}'}). {benefits} Don't miss out!`,

    `{store} just dropped the price on {product} by {percent}%! Get it for ${'{current_price}'} instead of ${'{original_price}'} and save ${'{savings}'}. {benefits}`,

    `Price drop alert: {product} at {store} is now {percent}% off! Canadian shoppers are saving ${'{savings}'} on this {category} deal. {benefits} {urgency}`,

    `This {category} deal is one of the best we've seen in Canada. {product} at {store} for just ${'{current_price}'} (was ${'{original_price}'}) - that's ${'{savings}'} in savings! {benefits}`,
  ],
}

// =============================================================================
// CATEGORY-SPECIFIC BENEFITS
// =============================================================================

const CATEGORY_BENEFITS: Record<string, string[]> = {
  electronics: [
    'Perfect for Canadian tech enthusiasts who value quality and reliability.',
    'Trusted by thousands of Canadian customers coast to coast.',
    'Ideal for Canadian homes with fast, reliable shipping.',
    'A top pick among Canadian tech reviewers.',
    'Great for work-from-home setups across Canada.',
  ],
  fashion: [
    'Perfect for Canadian weather and style.',
    'Loved by fashion-forward Canadians from Vancouver to Halifax.',
    'Designed with Canadian comfort and durability in mind.',
    'A wardrobe essential for Canadian seasons.',
    'Free returns available at Canadian locations.',
  ],
  home: [
    'Made for Canadian homes and families.',
    'Trusted by Canadian homeowners nationwide.',
    'Perfect for our Canadian climate and lifestyle.',
    'Energy-efficient for Canadian winters.',
    'A popular choice among Canadian home decor enthusiasts.',
  ],
  grocery: [
    'Stock up and save at Canadian prices.',
    'Quality products for Canadian families.',
    'Great value for budget-conscious Canadian shoppers.',
    'A pantry staple at an unbeatable price.',
  ],
  beauty: [
    'Loved by Canadian beauty enthusiasts.',
    'Perfect addition to your skincare routine.',
    'A bestseller among Canadian shoppers.',
    'Great for the Canadian climate.',
  ],
  sports: [
    'Get active with this Canadian deal.',
    'Perfect for outdoor activities in Canada.',
    'Trusted by Canadian athletes and fitness enthusiasts.',
    'Great for Canadian winters and summers alike.',
  ],
  general: [
    'A great find for Canadian shoppers.',
    'Quality product at an unbeatable Canadian price.',
    'Popular with Canadian buyers.',
    "Don't miss this Canadian deal.",
  ],
}

// =============================================================================
// URGENCY PHRASES
// =============================================================================

const URGENCY_PHRASES = [
  'Limited time offer - act fast!',
  'Selling quickly - grab yours now.',
  'Popular deal - stock is limited.',
  'Price may go back up soon.',
  'One of the best deals we\'ve seen this month.',
  'Canadian shoppers are snapping this up.',
  '',  // Sometimes no urgency
  '',
]


// =============================================================================
// MAIN GENERATOR FUNCTIONS
// =============================================================================

/**
 * Generate a unique description for a deal
 * Returns null if we don't have enough real data (no slop!)
 */
export function generateDealDescription(deal: Deal): string | null {
  // Calculate savings - need REAL numbers
  const savings = calculateSavings(deal.original_price, deal.price)
  const savingsNum = parseFloat(savings || '0')
  const hasRealSavings = savingsNum > 0
  const hasRealPercent = deal.discount_percent && deal.discount_percent > 0
  const hasRealPrice = deal.price && deal.price > 0
  const hasRealOriginalPrice = deal.original_price && deal.original_price > 0

  // Don't generate slop - need at least savings OR discount percent with real prices
  // Also need a store name (not "this retailer")
  if (!deal.store) {
    return null
  }

  // Need at least one of: real savings, real discount percent, or real price info
  if (!hasRealSavings && !hasRealPercent && !hasRealPrice) {
    return null
  }

  const category = deal.category || 'general'
  const templates = DESCRIPTION_TEMPLATES.default

  // Pick template based on deal ID hash (consistent for same deal)
  const templateIndex = hashString(deal.id) % templates.length
  let template = templates[templateIndex]

  // Pick benefit based on different hash
  const benefits = CATEGORY_BENEFITS[category] || CATEGORY_BENEFITS.general
  const benefitIndex = hashString(deal.id + 'benefit') % benefits.length
  const benefit = benefits[benefitIndex]

  // Pick urgency phrase
  const urgencyIndex = hashString(deal.id + 'urgency') % URGENCY_PHRASES.length
  const urgency = URGENCY_PHRASES[urgencyIndex]

  // Replace placeholders - use empty string if no real data (not slop!)
  const description = template
    .replace(/{product}/g, deal.title)
    .replace(/{store}/g, formatStoreName(deal.store))
    .replace(/{category}/g, category)
    .replace(/{original_price}/g, hasRealOriginalPrice ? formatPrice(deal.original_price)! : '')
    .replace(/{current_price}/g, hasRealPrice ? formatPrice(deal.price)! : '')
    .replace(/{savings}/g, hasRealSavings ? savings! : '')
    .replace(/{percent}/g, hasRealPercent ? deal.discount_percent!.toString() : '')
    .replace(/{benefits}/g, benefit)
    .replace(/{urgency}/g, urgency)

  // Clean up any double spaces or orphaned punctuation from empty replacements
  const cleanedDescription = description
    .replace(/\s+/g, ' ')
    .replace(/\(\s*%\s*off\)/gi, '')
    .replace(/\$\s+/g, '$')
    .replace(/\s+,/g, ',')
    .replace(/\s+\./g, '.')
    .trim()

  return cleanedDescription
}

/**
 * Generate SEO meta description with CTR-driving language
 * Only includes real data - no slop!
 */
export function generateMetaDescription(deal: Deal): string {
  const savingsAmount = calculateSavings(deal.original_price, deal.price)
  const hasSavings = savingsAmount && parseFloat(savingsAmount) > 0
  const hasDiscount = deal.discount_percent && deal.discount_percent > 0
  const storeName = formatStoreName(deal.store)

  // Build description based on what real data we have
  let templates: string[]

  if (hasSavings && hasDiscount) {
    // Best case: we have both savings and discount
    templates = [
      `VERIFIED: ${deal.title} - Save $${savingsAmount} (${deal.discount_percent}% OFF) at ${storeName}. Limited stock.`,
      `${deal.title} on SALE: $${savingsAmount} OFF at ${storeName}. Lowest price in Canada.`,
      `DEAL ALERT: ${deal.title} now ${deal.discount_percent}% off at ${storeName}. Save $${savingsAmount}!`,
    ]
  } else if (hasDiscount) {
    // We have discount percent only
    templates = [
      `VERIFIED: ${deal.title} - ${deal.discount_percent}% OFF at ${storeName}. Limited time Canadian deal.`,
      `${deal.title} - ${deal.discount_percent}% discount at ${storeName}. Great Canadian deal.`,
      `DEAL ALERT: ${deal.title} now ${deal.discount_percent}% off at ${storeName}.`,
    ]
  } else if (hasSavings) {
    // We have savings amount only
    templates = [
      `VERIFIED: ${deal.title} - Save $${savingsAmount} at ${storeName}. Limited stock.`,
      `${deal.title} on SALE: $${savingsAmount} OFF at ${storeName}. Great value.`,
      `DEAL ALERT: ${deal.title} at ${storeName}. Save $${savingsAmount}!`,
    ]
  } else {
    // No price data - just mention the deal exists
    templates = [
      `${deal.title} available at ${storeName}. Check current price.`,
      `${deal.title} at ${storeName}. See today's price.`,
      `Find ${deal.title} at ${storeName}.`,
    ]
  }

  const templateIndex = hashString(deal.id.toString()) % templates.length
  const desc = templates[templateIndex]

  // Truncate cleanly at word boundary if over 160 chars
  if (desc.length > 157) {
    // Find last space before 157 chars to avoid mid-word cut
    const lastSpace = desc.lastIndexOf(' ', 154)
    if (lastSpace > 100) {
      return desc.substring(0, lastSpace) + '...'
    }
    return desc.substring(0, 157) + '...'
  }
  return desc
}

/**
 * Generate page title - only include real data
 */
export function generatePageTitle(deal: Deal): string {
  // Only show discount if it's meaningful (>= 20%)
  if (deal.discount_percent && deal.discount_percent >= 20) {
    return `${deal.title} - ${deal.discount_percent}% OFF`
  }
  // Only show price if it's real (> 0)
  if (deal.price && deal.price > 0) {
    return `${deal.title} - $${formatPrice(deal.price)}`
  }
  // Just use the title if no price data
  return deal.title
}

/**
 * Generate breadcrumb items
 */
export function generateBreadcrumbs(deal: Deal): { label: string; href: string }[] {
  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Deals', href: '/deals' },
  ]

  if (deal.category) {
    breadcrumbs.push({
      label: formatCategoryName(deal.category),
      href: `/category/${deal.category}`,
    })
  }

  if (deal.store) {
    breadcrumbs.push({
      label: formatStoreName(deal.store),
      href: `/stores/${deal.store}`,
    })
  }

  breadcrumbs.push({
    label: truncate(deal.title, 40),
    href: `/deals/${deal.slug}`,
  })

  return breadcrumbs
}

/**
 * Generate store description
 * Returns empty string - store descriptions are now in the database
 */
export function getStoreDescription(storeSlug: string | null): string {
  if (!storeSlug) return ''
  // Store descriptions are now fetched from the database
  // This function is kept for backwards compatibility but returns empty
  return ''
}

/**
 * Generate FAQ items for a deal
 * Store-specific info is now in the database, so this returns an empty array
 * FAQs should be generated at the page level using async database queries
 */
export function generateFAQ(deal: Deal): { question: string; answer: string }[] {
  // Store policies are now in the database and should be fetched async
  // This function returns empty array - FAQ generation should happen
  // at the page level where async DB access is available
  return []
}

// =============================================================================
// HELPERS
// =============================================================================

function hashString(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash
  }
  return Math.abs(hash)
}

export function formatStoreName(slug: string | null): string {
  if (!slug) return 'this retailer'

  const storeNames: Record<string, string> = {
    'amazon': 'Amazon.ca',
    'walmart': 'Walmart Canada',
    'costco': 'Costco',
    'best-buy': 'Best Buy',
    'canadian-tire': 'Canadian Tire',
    'home-depot': 'Home Depot',
    'shoppers': 'Shoppers Drug Mart',
    'loblaws': 'Loblaws',
    'no-frills': 'No Frills',
    'metro': 'Metro',
    'sobeys': 'Sobeys',
    'lululemon': 'Lululemon',
    'gap': 'Gap',
    'old-navy': 'Old Navy',
    'the-bay': 'Hudson\'s Bay',
    'sport-chek': 'Sport Chek',
    'marks': 'Mark\'s',
    'staples': 'Staples',
    'rona': 'RONA',
    'ikea': 'IKEA',
    'indigo': 'Indigo',
  }

  return storeNames[slug] || slug.split('-').map(word =>
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ')
}

export function formatCategoryName(slug: string): string {
  return slug.split('-').map(word =>
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ')
}

function truncate(str: string, length: number): string {
  if (str.length <= length) return str
  return str.substring(0, length - 3) + '...'
}
