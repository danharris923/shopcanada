import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { StoreLogo } from '@/components/StoreLogo'
import { storeLogos, getAllStores, featuredStores } from '@/lib/store-logos'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'All Stores - Shop Canada',
  description: 'Browse deals from all major Canadian retailers. Find the best prices from Amazon.ca, Walmart, Costco, Best Buy, Canadian Tire and more.',
}

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

export default function StoresPage() {
  const allStores = getAllStores()

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        {/* Hero */}
        <section className="bg-gradient-to-r from-red-600 to-orange-500 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-4">
              All Stores
            </h1>
            <p className="text-white/90 text-lg max-w-2xl mx-auto">
              Browse deals from {allStores.length}+ major Canadian retailers. We track prices from
              Amazon, Walmart, Costco, Best Buy, and many more.
            </p>
          </div>
        </section>

        {/* Featured Stores */}
        <section className="py-8 px-4 bg-white border-b">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Featured Stores</h2>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              {featuredStores.map((store) => (
                <Link
                  key={store.slug}
                  href={`/stores/${store.slug}`}
                  className="group flex items-center gap-3 bg-gray-50 hover:bg-white rounded-xl border border-gray-200 hover:border-red-500 hover:shadow-lg transition-all px-4 py-3"
                >
                  <StoreLogo src={store.logo} alt={store.name} domain={store.domain} size={40} />
                  <span className="font-semibold text-gray-900 group-hover:text-red-600 transition-colors">
                    {store.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Stores by Category */}
        <section className="py-12 px-4">
          <div className="max-w-7xl mx-auto space-y-12">
            {Object.entries(storeCategories).map(([category, slugs]) => {
              const categoryStores = slugs
                .map(slug => storeLogos[slug])
                .filter(Boolean)

              if (categoryStores.length === 0) return null

              return (
                <div key={category}>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    {category}
                    <span className="text-sm font-normal text-gray-500">
                      ({categoryStores.length} stores)
                    </span>
                  </h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {categoryStores.map((store) => (
                      <Link
                        key={store.slug}
                        href={`/stores/${store.slug}`}
                        className="group bg-white rounded-xl border border-gray-200 p-4 hover:border-red-500 hover:shadow-lg transition-all text-center"
                      >
                        <div className="flex justify-center mb-3">
                          <StoreLogo src={store.logo} alt={store.name} domain={store.domain} size={56} />
                        </div>
                        <h3 className="text-sm font-semibold text-gray-900 group-hover:text-red-600 transition-colors line-clamp-1">
                          {store.name}
                        </h3>
                      </Link>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* All Stores A-Z */}
        <section className="py-12 px-4 bg-white border-t">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">All Stores A-Z</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
              {allStores
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((store) => (
                  <Link
                    key={store.slug}
                    href={`/stores/${store.slug}`}
                    className="group flex items-center gap-2 bg-gray-50 hover:bg-white rounded-lg border border-gray-200 hover:border-red-400 transition-all px-3 py-2"
                  >
                    <StoreLogo src={store.logo} alt={store.name} domain={store.domain} size={24} />
                    <span className="text-sm font-medium text-gray-700 group-hover:text-red-600 transition-colors truncate">
                      {store.name}
                    </span>
                  </Link>
                ))}
            </div>
          </div>
        </section>

        {/* Canadian Brands CTA */}
        <section className="py-12 px-4 bg-gray-900">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-white mb-4">
              Support Canadian Brands
            </h2>
            <p className="text-gray-400 mb-6">
              Discover 600+ Canadian brands and shop local
            </p>
            <Link
              href="/canadian"
              className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg transition-colors"
            >
              Explore Canadian Brands
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
