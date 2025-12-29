'use client'

import { useState, useMemo, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { StoreLogo } from '@/components/StoreLogo'
import { Leaf, Store, Globe, Search } from 'lucide-react'
import { StatsBar } from '@/components/StatsBar'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { EXTENDED_CATEGORIES } from '@/lib/categories'
import { Store as StoreType } from '@/types/deal'

// Product categories for deals - use centralized configuration
const productCategories = EXTENDED_CATEGORIES

// Badge display configuration - priority order (highest first)
const BADGE_CONFIG: Record<string, { emoji: string; label: string; priority: number }> = {
  'canadian-owned': { emoji: '🇨🇦', label: 'Canadian-Owned', priority: 1 },
  'made-in-canada': { emoji: '🏭', label: 'Made in Canada', priority: 2 },
  'canadian-retailer': { emoji: '🏬', label: 'Canadian Retailer', priority: 3 },
  'international': { emoji: '🌍', label: 'International', priority: 4 },
  'ships-from-canada': { emoji: '🚚', label: 'Ships from Canada', priority: 5 },
}

/**
 * Get top N badges for a store, sorted by priority
 * Returns badges with emoji and label for display
 */
function getTopBadges(badges: string[], maxBadges: number = 2): { emoji: string; label: string }[] {
  if (!badges || badges.length === 0) return []

  return badges
    .filter(badge => BADGE_CONFIG[badge])
    .map(badge => ({ ...BADGE_CONFIG[badge], badge }))
    .sort((a, b) => a.priority - b.priority)
    .slice(0, maxBadges)
    .map(({ emoji, label }) => ({ emoji, label }))
}

// Map brand categories to display categories
const categoryMapping: Record<string, string> = {
  // Fashion & Apparel
  'Clothing': 'Fashion & Apparel',
  'Intimates': 'Fashion & Apparel',
  'Shoes': 'Fashion & Apparel',
  'Accessories': 'Fashion & Apparel',
  // Electronics & Tech
  'Electronics': 'Electronics & Tech',
  'Tech': 'Electronics & Tech',
  'Telecom': 'Electronics & Tech',
  // Home & Hardware
  'Home': 'Home & Hardware',
  // Beauty
  'Beauty': 'Beauty & Personal Care',
  'Haircare': 'Beauty & Personal Care',
  // Sports & Outdoors
  'Fitness': 'Sports & Outdoors',
  'Sports': 'Sports & Outdoors',
  // Grocery & Pharmacy
  'Grocery': 'Grocery & Pharmacy',
  'Pharmacy': 'Grocery & Pharmacy',
  'Food': 'Grocery & Pharmacy',
  'Snacks': 'Grocery & Pharmacy',
  'Beverages': 'Grocery & Pharmacy',
  'Coffee': 'Grocery & Pharmacy',
  'Keto': 'Grocery & Pharmacy',
  'Meal Delivery': 'Grocery & Pharmacy',
  // Specialty
  'Retail': 'Specialty',
  'Pets': 'Specialty',
  'Jewellery': 'Specialty',
  'Baby': 'Specialty',
  'Wedding': 'Specialty',
  'Eyewear': 'Specialty',
  'Office': 'Specialty',
  'Books': 'Specialty',
  'Entertainment': 'Specialty',
  'Health': 'Specialty',
  'Cleaning': 'Specialty',
  'Loyalty': 'Specialty',
  'Indigenous': 'Specialty',
  'Department Store': 'Specialty',
  'Services': 'Specialty',
}

type FilterType = 'all' | 'canadian' | 'international'

// Helper to extract domain from website URL
function getDomainFromUrl(url: string | null): string {
  if (!url) return ''
  try {
    const urlObj = new URL(url)
    return urlObj.hostname.replace('www.', '')
  } catch {
    return url.replace(/^https?:\/\//, '').replace('www.', '').split('/')[0]
  }
}

function StoresContent({ stores }: { stores: StoreType[] }) {
  const searchParams = useSearchParams()
  const [activeFilter, setActiveFilter] = useState<FilterType>('all')
  const [searchQuery, setSearchQuery] = useState('')

  // Set initial filter from URL params
  useEffect(() => {
    const filterParam = searchParams.get('filter')
    if (filterParam === 'canadian' || filterParam === 'international') {
      setActiveFilter(filterParam as FilterType)
    }
  }, [searchParams])

  // Build dynamic category groups from stores data
  const storeCategories = useMemo(() => {
    const categories: Record<string, string[]> = {
      'Fashion & Apparel': [],
      'Electronics & Tech': [],
      'Home & Hardware': [],
      'Beauty & Personal Care': [],
      'Sports & Outdoors': [],
      'Grocery & Pharmacy': [],
      'Specialty': [],
    }

    stores.forEach(store => {
      // Use top_categories to determine which display category
      if (store.top_categories && store.top_categories.length > 0) {
        const firstCategory = store.top_categories[0]
        const displayCategory = categoryMapping[firstCategory]
        if (displayCategory && categories[displayCategory]) {
          if (!categories[displayCategory].includes(store.slug)) {
            categories[displayCategory].push(store.slug)
          }
        }
      }
    })

    return categories
  }, [stores])

  // Filter retailers based on active filter and search
  const filteredRetailers = useMemo(() => {
    let filtered = stores

    // Apply filter
    if (activeFilter === 'canadian') {
      filtered = filtered.filter(store =>
        store.is_canadian ||
        store.badges?.includes('canadian-owned') ||
        store.badges?.includes('canadian-retailer') ||
        store.badges?.includes('made-in-canada')
      )
    } else if (activeFilter === 'international') {
      filtered = filtered.filter(store =>
        !store.is_canadian &&
        !store.badges?.includes('canadian-owned') &&
        !store.badges?.includes('canadian-retailer')
      )
    }

    // Apply search
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(store =>
        store.name.toLowerCase().includes(query) ||
        store.tagline?.toLowerCase().includes(query)
      )
    }

    return filtered
  }, [stores, activeFilter, searchQuery])

  const filters = [
    { id: 'all' as FilterType, label: 'All Stores', icon: Store, count: stores.length },
    { id: 'canadian' as FilterType, label: 'Canadian', icon: Leaf, count: stores.filter(s => s.is_canadian || s.badges?.includes('canadian-owned')).length },
    { id: 'international' as FilterType, label: 'International', icon: Globe, count: stores.filter(s => !s.is_canadian && !s.badges?.includes('canadian-owned')).length },
  ]

  return (
    <>
      <Header />
      <main className="min-h-screen bg-cream">
        {/* Breadcrumbs */}
        <div className="max-w-7xl mx-auto px-4 pt-4">
          <Breadcrumbs items={[
            { label: 'Home', href: '/' },
            { label: 'Stores', href: '/stores' },
          ]} />
        </div>

        {/* Hero */}
        <section className="bg-soft-black py-12 mt-4">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold text-white mb-4">
              Browse All Stores
            </h1>
            <p className="text-silver-light text-lg max-w-2xl mx-auto">
              Discover {filteredRetailers.length}+ retailers serving Canada, from homegrown brands to international favorites
            </p>
          </div>
        </section>

        {/* Stats Bar */}
        <StatsBar storeCount={filteredRetailers.length} />

        {/* Product Categories */}
        <section className="py-6 bg-white border-b border-silver-light">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-lg font-bold text-charcoal mb-4">Shop by Category</h2>
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {productCategories.map(cat => {
                const Icon = cat.icon
                return (
                  <Link
                    key={cat.slug}
                    href={`/category/${cat.slug}`}
                    className="flex flex-col items-center min-w-[80px] p-3 bg-cream rounded-lg hover:bg-maple-red/10 transition-colors group"
                  >
                    <Icon size={24} className="text-maple-red mb-1" />
                    <span className="text-xs font-medium text-charcoal group-hover:text-maple-red whitespace-nowrap">
                      {cat.name}
                    </span>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>

        {/* Filters and Search */}
        <section className="bg-white border-b border-silver-light sticky top-16 z-20 py-4">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              {/* Filter Tabs */}
              <div className="flex gap-2 flex-wrap justify-center md:justify-start">
                {filters.map(filter => {
                  const Icon = filter.icon
                  return (
                    <button
                      key={filter.id}
                      onClick={() => setActiveFilter(filter.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all ${
                        activeFilter === filter.id
                          ? 'bg-maple-red text-white'
                          : 'bg-ivory hover:bg-cream text-charcoal'
                      }`}
                    >
                      <Icon size={16} />
                      <span>{filter.label}</span>
                      <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                        activeFilter === filter.id
                          ? 'bg-white/20'
                          : 'bg-charcoal/10'
                      }`}>
                        {filter.count}
                      </span>
                    </button>
                  )
                })}
              </div>

              {/* Search */}
              <div className="relative w-full md:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate" />
                <input
                  type="text"
                  placeholder="Search stores..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-silver-light rounded-full focus:outline-none focus:ring-2 focus:ring-maple-red/20 focus:border-maple-red"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Featured Canadian Brands (only show when Canadian filter is active or no filter) */}
        {activeFilter !== 'international' && !searchQuery && (
          <section className="py-8 px-4 bg-white">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center gap-2 mb-6">
                <Leaf className="text-maple-red" size={24} />
                <h2 className="text-2xl font-bold text-charcoal">Featured Canadian Brands</h2>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {['lululemon', 'roots', 'aritzia', 'canadian-tire', 'tim-hortons', 'mec']
                  .map(slug => {
                    const store = stores.find(s => s.slug === slug)
                    if (!store) return null
                    const domain = getDomainFromUrl(store.website_url)

                    return (
                      <Link
                        key={store.slug}
                        href={`/stores/${store.slug}`}
                        className="store-card group"
                      >
                        <div className="flex justify-center mb-3">
                          <StoreLogo src={store.logo_url || ''} alt={store.name} domain={domain} size={56} />
                        </div>
                        <h3 className="text-sm font-semibold text-charcoal group-hover:text-maple-red transition-colors text-center">
                          {store.name}
                        </h3>
                      </Link>
                    )
                  })
                  .filter(Boolean)}
              </div>
            </div>
          </section>
        )}

        {/* Stores Grid */}
        <section className="py-8 px-4">
          <div className="max-w-7xl mx-auto">
            {searchQuery && (
              <p className="text-sm text-slate mb-4">
                Found {filteredRetailers.length} stores matching "{searchQuery}"
              </p>
            )}

            {/* Stores by Category */}
            {!searchQuery ? (
              <div className="space-y-12">
                {Object.entries(storeCategories).map(([category, slugs]) => {
                  const categoryStores = filteredRetailers.filter(store =>
                    slugs.includes(store.slug)
                  )

                  if (categoryStores.length === 0) return null

                  return (
                    <div key={category}>
                      <h2 className="text-2xl font-bold text-charcoal mb-6 flex items-center gap-2">
                        {category}
                        <span className="text-sm font-normal text-silver">
                          ({categoryStores.length} stores)
                        </span>
                      </h2>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {categoryStores.map((store) => {
                          const badges = getTopBadges(store.badges || [], 2)
                          const domain = getDomainFromUrl(store.website_url)
                          return (
                            <Link
                              key={store.slug}
                              href={`/stores/${store.slug}`}
                              className="store-card group"
                            >
                              <div className="flex justify-center mb-3">
                                <StoreLogo src={store.logo_url || ''} alt={store.name} domain={domain} size={56} />
                              </div>
                              <h3 className="text-sm font-semibold text-charcoal group-hover:text-maple-red transition-colors line-clamp-1">
                                {store.name}
                              </h3>
                              <p className="text-xs text-slate mt-1 line-clamp-2">
                                {store.tagline}
                              </p>
                              {badges.length > 0 && (
                                <div className="flex flex-wrap justify-center gap-1 mt-2">
                                  {badges.map((badge) => (
                                    <span
                                      key={badge.label}
                                      className="inline-flex items-center gap-0.5 text-[10px] text-slate bg-cream px-1.5 py-0.5 rounded-full"
                                      title={badge.label}
                                    >
                                      <span>{badge.emoji}</span>
                                      <span className="hidden sm:inline">{badge.label}</span>
                                    </span>
                                  ))}
                                </div>
                              )}
                            </Link>
                          )
                        })}
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              // Search results - simple grid
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {filteredRetailers
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((store) => {
                    const badges = getTopBadges(store.badges || [], 2)
                    const domain = getDomainFromUrl(store.website_url)
                    return (
                      <Link
                        key={store.slug}
                        href={`/stores/${store.slug}`}
                        className="store-card group"
                      >
                        <div className="flex justify-center mb-3">
                          <StoreLogo src={store.logo_url || ''} alt={store.name} domain={domain} size={56} />
                        </div>
                        <h3 className="text-sm font-semibold text-charcoal group-hover:text-maple-red transition-colors line-clamp-1">
                          {store.name}
                        </h3>
                        <p className="text-xs text-slate mt-1 line-clamp-2">
                          {store.tagline}
                        </p>
                        {badges.length > 0 && (
                          <div className="flex flex-wrap justify-center gap-1 mt-2">
                            {badges.map((badge) => (
                              <span
                                key={badge.label}
                                className="inline-flex items-center gap-0.5 text-[10px] text-slate bg-cream px-1.5 py-0.5 rounded-full"
                                title={badge.label}
                              >
                                <span>{badge.emoji}</span>
                                <span className="hidden sm:inline">{badge.label}</span>
                              </span>
                            ))}
                          </div>
                        )}
                      </Link>
                    )
                  })}
              </div>
            )}
          </div>
        </section>

        {/* All Stores A-Z */}
        <section className="py-12 px-4 bg-white border-t border-silver-light">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold text-charcoal mb-6">All Stores A-Z</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
              {filteredRetailers
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((store) => {
                  const domain = getDomainFromUrl(store.website_url)
                  return (
                    <Link
                      key={store.slug}
                      href={`/stores/${store.slug}`}
                      className="group flex items-center gap-2 bg-card-bg rounded-lg border border-card-border shadow-card hover:border-maple-red hover:shadow-card-hover transition-all px-3 py-2"
                    >
                      <StoreLogo src={store.logo_url || ''} alt={store.name} domain={domain} size={24} />
                      <span className="text-sm font-medium text-slate group-hover:text-maple-red transition-colors truncate">
                        {store.name}
                      </span>
                    </Link>
                  )
                })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export function StoresClient({ stores }: { stores: StoreType[] }) {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-maple-red mx-auto mb-4"></div>
          <p className="text-charcoal">Loading stores...</p>
        </div>
      </div>
    }>
      <StoresContent stores={stores} />
    </Suspense>
  )
}
