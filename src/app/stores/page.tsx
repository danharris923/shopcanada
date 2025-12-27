'use client'

import { useState, useMemo, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { StoreLogo } from '@/components/StoreLogo'
import { storeLogos, getAllStores, getTopBadges } from '@/lib/store-logos'
import { brands } from '@/lib/brands-data'
import { Leaf, Store, Globe, Package, Search } from 'lucide-react'

// Group stores by category
const storeCategories = {
  'Major Retailers': ['amazon', 'walmart', 'costco', 'canadian-tire', 'best-buy', 'shoppers'],
  'Home & Hardware': ['home-depot', 'lowes', 'rona', 'ikea', 'wayfair', 'structube', 'article'],
  'Fashion & Apparel': ['the-bay', 'winners', 'marshalls', 'old-navy', 'gap', 'h-m', 'zara', 'uniqlo', 'lululemon', 'aritzia', 'roots'],
  'Electronics & Tech': ['the-source', 'newegg', 'canada-computers', 'memory-express', 'apple', 'microsoft', 'dell', 'lenovo'],
  'Sports & Outdoors': ['sport-chek', 'atmosphere', 'mec', 'sail', 'nike', 'adidas', 'foot-locker'],
  'Grocery & Pharmacy': ['loblaws', 'real-canadian-superstore', 'no-frills', 'sobeys', 'metro', 'food-basics', 'freshco', 'well-ca', 'london-drugs'],
  'Specialty': ['indigo', 'sephora', 'bath-body-works', 'petsmart', 'pet-valu', 'michaels', 'staples', 'dollarama', 'giant-tiger'],
  'Kids & Toys': ['toys-r-us', 'mastermind-toys', 'eb-games'],
}

type FilterType = 'all' | 'canadian' | 'international'

function StoresContent() {
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

  const allStores = getAllStores()

  // Merge stores and brands data
  const allRetailers = useMemo(() => {
    const retailers = [...allStores]

    // Add Canadian brands that aren't already in stores
    brands.forEach(brand => {
      if (!retailers.find(r => r.slug === brand.slug || r.name === brand.name)) {
        retailers.push({
          slug: brand.slug,
          name: brand.name,
          logo: brand.logo || '',
          domain: brand.url,
          color: '#C8102E', // maple red for Canadian brands
          tagline: brand.description,
          isCanadian: true,
          badges: ['canadian-owned']
        })
      }
    })

    return retailers
  }, [allStores])

  // Filter retailers based on active filter and search
  const filteredRetailers = useMemo(() => {
    let filtered = allRetailers

    // Apply filter
    if (activeFilter === 'canadian') {
      filtered = filtered.filter(store =>
        store.isCanadian ||
        store.badges?.includes('canadian-owned') ||
        store.badges?.includes('canadian-retailer') ||
        store.badges?.includes('made-in-canada')
      )
    } else if (activeFilter === 'international') {
      filtered = filtered.filter(store =>
        !store.isCanadian &&
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
  }, [allRetailers, activeFilter, searchQuery])

  const filters = [
    { id: 'all' as FilterType, label: 'All Stores', icon: Store, count: allRetailers.length },
    { id: 'canadian' as FilterType, label: 'Canadian', icon: Leaf, count: allRetailers.filter(s => s.isCanadian || s.badges?.includes('canadian-owned')).length },
    { id: 'international' as FilterType, label: 'International', icon: Globe, count: allRetailers.filter(s => !s.isCanadian && !s.badges?.includes('canadian-owned')).length },
  ]

  return (
    <>
      <Header />
      <main className="min-h-screen bg-cream">
        {/* Hero */}
        <section className="bg-soft-black py-12">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold text-white mb-4">
              Browse All Stores
            </h1>
            <p className="text-silver-light text-lg max-w-2xl mx-auto">
              Discover {filteredRetailers.length}+ retailers serving Canada, from homegrown brands to international favorites
            </p>
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
                    const store = allRetailers.find(s => s.slug === slug)
                    if (!store) return null

                    return (
                      <Link
                        key={store.slug}
                        href={`/stores/${store.slug}`}
                        className="store-card group"
                      >
                        <div className="flex justify-center mb-3">
                          <StoreLogo src={store.logo} alt={store.name} domain={store.domain} size={56} />
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
                          const badges = store.badges ? getTopBadges(store, 2) : []
                          return (
                            <Link
                              key={store.slug}
                              href={`/stores/${store.slug}`}
                              className="store-card group"
                            >
                              <div className="flex justify-center mb-3">
                                <StoreLogo src={store.logo} alt={store.name} domain={store.domain} size={56} />
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
                    const badges = store.badges ? getTopBadges(store, 2) : []
                    return (
                      <Link
                        key={store.slug}
                        href={`/stores/${store.slug}`}
                        className="store-card group"
                      >
                        <div className="flex justify-center mb-3">
                          <StoreLogo src={store.logo} alt={store.name} domain={store.domain} size={56} />
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
                .map((store) => (
                  <Link
                    key={store.slug}
                    href={`/stores/${store.slug}`}
                    className="group flex items-center gap-2 bg-card-bg rounded-lg border border-card-border shadow-card hover:border-maple-red hover:shadow-card-hover transition-all px-3 py-2"
                  >
                    <StoreLogo src={store.logo} alt={store.name} domain={store.domain} size={24} />
                    <span className="text-sm font-medium text-slate group-hover:text-maple-red transition-colors truncate">
                      {store.name}
                    </span>
                  </Link>
                ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default function StoresPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-maple-red mx-auto mb-4"></div>
          <p className="text-charcoal">Loading stores...</p>
        </div>
      </div>
    }>
      <StoresContent />
    </Suspense>
  )
}