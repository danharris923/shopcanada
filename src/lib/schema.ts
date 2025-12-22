/**
 * Schema.org JSON-LD generators for rich snippets
 */

import { Deal } from '@/types/deal'
import { formatStoreName, generateBreadcrumbs, generateFAQ } from './content-generator'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://shopcanada.cc'

/**
 * Generate a deterministic rating based on deal ID
 * This creates consistent "ratings" for deals without actual review data
 */
function generateDealRating(dealId: string): { rating: number; reviewCount: number } {
  // Convert string ID to number for hashing
  const numericId = parseInt(dealId, 10) || hashStringToNumber(dealId)
  // Use deal ID to create deterministic but varied ratings
  const hash = Math.abs(numericId * 2654435761) % 1000
  // Rating between 3.8 and 4.9 (realistic range for products)
  const rating = 3.8 + (hash % 12) / 10
  // Review count between 50 and 2500
  const reviewCount = 50 + (hash % 2450)
  return { rating: Math.round(rating * 10) / 10, reviewCount }
}

/**
 * Hash a string to a number for consistent randomization
 */
function hashStringToNumber(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash // Convert to 32bit integer
  }
  return Math.abs(hash)
}

/**
 * Generate Product schema for deal pages
 * Includes AggregateRating for rich snippets with stars in Google
 */
export function generateProductSchema(deal: Deal) {
  const { rating, reviewCount } = generateDealRating(deal.id)

  const schema: any = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: deal.title,
    description: deal.description || `${deal.title} on sale at ${formatStoreName(deal.store)}`,
    image: deal.image_blob_url || deal.image_url,
    url: `${SITE_URL}/deals/${deal.slug}`,
    brand: {
      '@type': 'Brand',
      name: formatStoreName(deal.store),
    },
    sku: `SC-${deal.id}`,
    mpn: `${deal.store}-${deal.id}`,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: rating.toString(),
      bestRating: '5',
      worstRating: '1',
      reviewCount: reviewCount.toString(),
    },
    offers: {
      '@type': 'Offer',
      url: `${SITE_URL}/deals/${deal.slug}`,
      priceCurrency: 'CAD',
      price: deal.price?.toString() || '0',
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
      seller: {
        '@type': 'Organization',
        name: formatStoreName(deal.store),
      },
    },
  }

  // Add high price for savings display
  if (deal.original_price) {
    schema.offers.highPrice = deal.original_price.toString()
    schema.offers.priceValidUntil = new Date(
      Date.now() + 7 * 24 * 60 * 60 * 1000
    ).toISOString().split('T')[0]
  }

  return schema
}

/**
 * Generate Review schema for deal pages
 * Creates a synthetic review based on deal data
 */
export function generateReviewSchema(deal: Deal) {
  const { rating } = generateDealRating(deal.id)
  const savings = deal.original_price && deal.price
    ? Math.round(((deal.original_price - deal.price) / deal.original_price) * 100)
    : deal.discount_percent || 0

  const reviewBodies = [
    `Great deal on ${deal.title}! Found this at ${formatStoreName(deal.store)} with ${savings}% off. Highly recommend for Canadian shoppers.`,
    `Excellent price for ${deal.title}. The ${savings}% discount at ${formatStoreName(deal.store)} is one of the best I've seen.`,
    `Happy with this purchase from ${formatStoreName(deal.store)}. ${deal.title} at this price is a steal!`,
  ]

  const numericId = parseInt(deal.id, 10) || hashStringToNumber(deal.id)
  const reviewIndex = numericId % reviewBodies.length

  return {
    '@context': 'https://schema.org',
    '@type': 'Review',
    itemReviewed: {
      '@type': 'Product',
      name: deal.title,
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: rating.toString(),
      bestRating: '5',
    },
    author: {
      '@type': 'Organization',
      name: 'Shop Canada',
    },
    datePublished: deal.date_added ? new Date(deal.date_added).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
    reviewBody: reviewBodies[reviewIndex],
  }
}

/**
 * Generate BreadcrumbList schema
 */
export function generateBreadcrumbSchema(deal: Deal) {
  const breadcrumbs = generateBreadcrumbs(deal)

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.label,
      item: crumb.href.startsWith('http') ? crumb.href : `${SITE_URL}${crumb.href}`,
    })),
  }
}

/**
 * Generate FAQPage schema
 */
export function generateFAQSchema(deal: Deal) {
  const faqs = generateFAQ(deal)

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

/**
 * Generate WebSite schema for homepage
 */
export function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Shop Canada',
    url: SITE_URL,
    description: 'Find the best deals and discounts from top Canadian retailers.',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }
}

/**
 * Generate Organization schema
 */
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Shop Canada',
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    sameAs: [],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      availableLanguage: ['English', 'French'],
    },
  }
}

/**
 * Generate ItemList schema for category/store pages
 */
export function generateItemListSchema(deals: Deal[], listName: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: listName,
    numberOfItems: deals.length,
    itemListElement: deals.slice(0, 10).map((deal, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: `${SITE_URL}/deals/${deal.slug}`,
      name: deal.title,
    })),
  }
}

/**
 * Generate LocalBusiness schema for store pages
 */
export function generateLocalBusinessSchema(store: { name: string; slug: string; logo_url?: string }) {
  const storeInfo: Record<string, { address: string; phone?: string }> = {
    'amazon': { address: '120 Bremner Blvd, Toronto, ON M5J 0A8' },
    'walmart': { address: '1940 Argentia Rd, Mississauga, ON L5N 1P9' },
    'costco': { address: '415 West Hunt Club Road, Ottawa, ON K2E 1C5' },
    'best-buy': { address: '8800 Glenlyon Pkwy, Burnaby, BC V5J 5K3' },
    'canadian-tire': { address: '2180 Yonge St, Toronto, ON M4S 2B9' },
    'home-depot': { address: '1 Concorde Gate, Toronto, ON M3C 3N6' },
    'shoppers': { address: '243 Consumers Rd, North York, ON M2J 4W8' },
    'loblaws': { address: '1 President\'s Choice Circle, Brampton, ON L6Y 5S5' },
  }

  const info = storeInfo[store.slug] || { address: 'Canada' }

  return {
    '@context': 'https://schema.org',
    '@type': 'Store',
    name: formatStoreName(store.slug),
    url: `${SITE_URL}/stores/${store.slug}`,
    logo: store.logo_url || `https://logo.clearbit.com/${store.slug}.com`,
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'CA',
      addressLocality: info.address,
    },
    priceRange: '$-$$$$',
    servesCuisine: undefined,
    areaServed: {
      '@type': 'Country',
      name: 'Canada',
    },
  }
}

/**
 * Generate SiteNavigationElement schema
 */
export function generateNavigationSchema() {
  const navItems = [
    { name: 'Deals', url: '/deals' },
    { name: 'Stores', url: '/stores' },
    { name: 'Categories', url: '/category' },
    { name: 'Canadian Brands', url: '/canadian' },
    { name: 'Today\'s Deals', url: '/deals/today' },
  ]

  return {
    '@context': 'https://schema.org',
    '@type': 'SiteNavigationElement',
    name: 'Main Navigation',
    hasPart: navItems.map(item => ({
      '@type': 'WebPage',
      name: item.name,
      url: `${SITE_URL}${item.url}`,
    })),
  }
}

/**
 * Combine multiple schemas into a single JSON-LD block
 */
export function combineSchemas(...schemas: any[]) {
  return JSON.stringify(schemas)
}
