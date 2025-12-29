/**
 * Centralized category configuration for Shop Canada
 *
 * This file contains all category definitions used throughout the site,
 * including icons, descriptions, and SEO keywords.
 */

import {
  Smartphone,
  Shirt,
  Home,
  ShoppingCart,
  Sparkles,
  Dumbbell,
  BookOpen,
  Baby,
  Gamepad2,
  Wrench,
  Heart,
  type LucideIcon,
} from 'lucide-react'

/**
 * Category interface defining the shape of each category
 */
export interface Category {
  slug: string
  name: string
  icon: LucideIcon
  description: string
  keywords: string
}

/**
 * Main categories array - single source of truth for all category data
 *
 * Core categories (electronics, fashion, home, grocery, beauty, sports)
 * are used across the site for navigation and deal filtering.
 *
 * Extended categories (books, baby, toys, tools, health) are used
 * primarily on the stores page for additional browsing options.
 */
export const CATEGORIES: Category[] = [
  {
    slug: 'electronics',
    name: 'Electronics',
    icon: Smartphone,
    description: 'Find the latest electronics, computers, phones, tablets, gaming gear, and tech accessories from top Canadian retailers.',
    keywords: 'electronics, computers, phones, tablets, gaming',
  },
  {
    slug: 'fashion',
    name: 'Fashion & Apparel',
    icon: Shirt,
    description: 'Discover fashion deals on clothing, shoes, and accessories for men, women, and kids from Canadian fashion retailers.',
    keywords: 'fashion, clothing, shoes, accessories',
  },
  {
    slug: 'home',
    name: 'Home & Garden',
    icon: Home,
    description: 'Shop home improvement, furniture, decor, appliances, tools, and outdoor living products from Canadian home retailers.',
    keywords: 'home, garden, furniture, decor, appliances',
  },
  {
    slug: 'grocery',
    name: 'Grocery & Food',
    icon: ShoppingCart,
    description: 'Save on fresh food, pantry staples, snacks, and beverages from Canadian grocery stores and food retailers.',
    keywords: 'grocery, food, fresh, pantry, snacks',
  },
  {
    slug: 'beauty',
    name: 'Beauty & Personal Care',
    icon: Sparkles,
    description: 'Browse beauty deals on skincare, makeup, haircare, and wellness products from Canadian beauty retailers.',
    keywords: 'beauty, skincare, makeup, haircare, wellness',
  },
  {
    slug: 'sports',
    name: 'Sports & Outdoors',
    icon: Dumbbell,
    description: 'Find deals on fitness equipment, outdoor gear, sportswear, and recreational products from Canadian sports retailers.',
    keywords: 'sports, outdoors, fitness, gear, recreation',
  },
  {
    slug: 'books',
    name: 'Books',
    icon: BookOpen,
    description: 'Discover deals on books, e-readers, and reading accessories from Canadian booksellers.',
    keywords: 'books, reading, ebooks, literature',
  },
  {
    slug: 'baby',
    name: 'Baby & Kids',
    icon: Baby,
    description: 'Shop deals on baby gear, kids clothing, toys, and family essentials from Canadian retailers.',
    keywords: 'baby, kids, children, family, parenting',
  },
  {
    slug: 'toys',
    name: 'Toys & Games',
    icon: Gamepad2,
    description: 'Find deals on toys, board games, video games, and entertainment for all ages.',
    keywords: 'toys, games, gaming, entertainment, play',
  },
  {
    slug: 'tools',
    name: 'Tools',
    icon: Wrench,
    description: 'Shop deals on power tools, hand tools, and equipment from Canadian hardware retailers.',
    keywords: 'tools, hardware, power tools, DIY, workshop',
  },
  {
    slug: 'health',
    name: 'Health',
    icon: Heart,
    description: 'Browse deals on health products, vitamins, supplements, and wellness essentials.',
    keywords: 'health, vitamins, supplements, wellness, pharmacy',
  },
]

/**
 * Core categories used for main navigation (homepage, category pages)
 * These are the primary 6 categories shown site-wide
 */
export const CORE_CATEGORIES = CATEGORIES.slice(0, 6)

/**
 * Extended categories used on the stores page
 * Includes all categories for comprehensive store browsing
 */
export const EXTENDED_CATEGORIES = CATEGORIES

/**
 * Get a category by its slug
 * @param slug - The category slug to find
 * @returns The category object or undefined if not found
 */
export function getCategoryBySlug(slug: string): Category | undefined {
  return CATEGORIES.find(cat => cat.slug === slug)
}

/**
 * Get all categories
 * @returns Array of all category objects
 */
export function getAllCategories(): Category[] {
  return CATEGORIES
}

/**
 * Get core categories (main 6 categories)
 * @returns Array of core category objects
 */
export function getCoreCategories(): Category[] {
  return CORE_CATEGORIES
}

/**
 * Get all category slugs (useful for static path generation)
 * @returns Array of category slug strings
 */
export function getAllCategorySlugs(): string[] {
  return CATEGORIES.map(cat => cat.slug)
}

// Re-export icon types for convenience
export type { LucideIcon }
