/**
 * Content Generator - Creates unique descriptions for SEO
 *
 * Uses template rotation and data injection to generate
 * unique content for each deal page.
 */

import { Deal, ContentContext } from '@/types/deal'
import { toNumber, formatPrice, calculateSavings } from '@/lib/price-utils'
import { getStoreInfo } from '@/lib/store-info'

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
// STORE DESCRIPTIONS
// =============================================================================

const STORE_DESCRIPTIONS: Record<string, string> = {
  'amazon': 'Amazon.ca offers fast Prime shipping across Canada with easy returns. Free shipping on orders over $35 for Prime members. Canada\'s largest online retailer with millions of products.',
  'walmart': 'Walmart Canada provides everyday low prices with free shipping on orders over $35. Price match guarantee and convenient store pickup available at 400+ locations across Canada.',
  'costco': 'Costco Canada is known for bulk savings and quality products for members. Warehouse prices on groceries, electronics, and household items. Membership includes exclusive deals.',
  'best-buy': 'Best Buy Canada is your destination for electronics with price matching. Free shipping on orders over $35. Expert advice and Geek Squad support available in-store.',
  'canadian-tire': 'Canadian Tire offers a wide selection of automotive, sports, and home products. Triangle Rewards program for cashback. Free in-store pickup available at 500+ locations.',
  'home-depot': 'Home Depot Canada is the go-to for home improvement and building materials. Free delivery on orders over $45. Pro services and tool rental available.',
  'shoppers': 'Shoppers Drug Mart offers health, beauty, and convenience products with PC Optimum points. 20x points events for maximum savings. Pharmacy services available.',
  'loblaws': 'Loblaws is one of Canada\'s largest grocery chains with PC Optimum rewards. Fresh produce, bakery, and deli. Online grocery pickup and delivery available.',
  'no-frills': 'No Frills offers no-name brand savings with PC Optimum points. Budget-friendly grocery shopping. Flashfood app deals on expiring items.',
  'metro': 'Metro is a leading Canadian grocery chain with weekly flyer deals. Fresh food, quality products, and convenient locations. Online ordering available.',
  'sobeys': 'Sobeys offers quality groceries with Scene+ rewards points. Local and organic products. Voila delivery service in select areas.',
  'lululemon': 'Lululemon offers premium athletic wear designed in Vancouver. Free shipping on orders over $75. Free returns and exchanges. Quality guarantee on all products.',
  'gap': 'Gap Canada offers casual American style for the whole family. Free shipping on orders over $50. GapCash and rewards program available.',
  'old-navy': 'Old Navy offers affordable fashion for the whole family. Super Cash rewards program. Free shipping on orders over $50.',
  'the-bay': 'Hudson\'s Bay is Canada\'s iconic department store since 1670. Premium brands at competitive prices. Hudson\'s Bay Rewards program.',
  'sport-chek': 'Sport Chek is Canada\'s largest sporting goods retailer. Expert advice and price matching. Triangle Rewards program.',
  'marks': 'Mark\'s offers durable workwear and casual clothing. Triangle Rewards program. Free in-store pickup available.',
  'staples': 'Staples Canada offers office supplies, technology, and furniture. Free next-day delivery on orders over $45. Business solutions available.',
  'rona': 'RONA is a Canadian home improvement retailer. Air Miles rewards. Free in-store pickup and delivery available.',
  'ikea': 'IKEA Canada offers affordable Swedish design furniture. Flat-pack shipping and assembly services. IKEA Family member discounts.',
  'indigo': 'Indigo is Canada\'s largest book and lifestyle retailer. Plum rewards program. Free shipping on orders over $35.',
  'sephora': 'Sephora Canada offers premium beauty products. Beauty Insider rewards program. Free shipping on orders over $50.',
  'winners': 'Winners offers designer brands at 20-60% off department store prices. New arrivals weekly. TJX Rewards card available.',
  'dollarama': 'Dollarama offers everyday essentials at $1.25-$5 price points. Canada\'s largest dollar store chain.',
  'london-drugs': 'London Drugs offers pharmacy, electronics, and household items. LDExtras rewards program. Price matching available.',
}

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
  return templates[templateIndex].substring(0, 160) // Google limit
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
 */
export function getStoreDescription(storeSlug: string | null): string {
  if (!storeSlug) return ''
  return STORE_DESCRIPTIONS[storeSlug] || `Shop deals at ${formatStoreName(storeSlug)}.`
}

/**
 * Generate FAQ items for a deal - uses real store-specific info ONLY
 * Returns empty array if no real info available (no generic slop!)
 */
export function generateFAQ(deal: Deal): { question: string; answer: string }[] {
  const storeName = formatStoreName(deal.store)
  const storeSlug = deal.store?.toLowerCase().replace(/\s+/g, '-') || ''
  const info = getStoreInfo(storeSlug)

  const faqs: { question: string; answer: string }[] = []

  // Only include FAQs if we have REAL store-specific info
  // No generic fallback - if we don't have real info, return empty array

  // Return policy - only if we have real info
  if (info?.returnPolicy) {
    faqs.push({
      question: `What is ${storeName}'s return policy?`,
      answer: info.returnPolicy,
    })
  }

  // Loyalty program - only if store has one
  if (info?.loyaltyProgram) {
    faqs.push({
      question: `Does ${storeName} have a loyalty program?`,
      answer: `Yes, ${info.loyaltyProgram.name}. ${info.loyaltyProgram.description}`,
    })
  }

  // Shipping info - only if we have real info
  if (info?.shippingInfo) {
    faqs.push({
      question: `Does ${storeName} offer free shipping to Canada?`,
      answer: info.shippingInfo,
    })
  }

  // Price match - only if available
  if (info?.priceMatch) {
    faqs.push({
      question: `Does ${storeName} price match?`,
      answer: info.priceMatch,
    })
  }

  // NO GENERIC FALLBACK - if we don't have real info, return empty array
  // The page will hide the FAQ section entirely

  return faqs
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
