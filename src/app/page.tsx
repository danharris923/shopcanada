import Link from 'next/link'
import { getFeaturedDeals, getLatestDeals, getStores, getStoreStats } from '@/lib/db'
import { generateWebsiteSchema, generateOrganizationSchema } from '@/lib/schema'
import { DealCard, DealGrid } from '@/components/DealCard'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { StoreLogo } from '@/components/StoreLogo'
import { featuredStores } from '@/lib/store-logos'

// Revalidate every 15 minutes
export const revalidate = 900

export default async function HomePage() {
  const [featuredDeals, latestDeals, storeStats] = await Promise.all([
    getFeaturedDeals(8),
    getLatestDeals(16),
    getStoreStats(),
  ])

  const websiteSchema = generateWebsiteSchema()
  const orgSchema = generateOrganizationSchema()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([websiteSchema, orgSchema]),
        }}
      />

      <Header />

      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 text-white">
          <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-6xl font-black mb-4">
                Best Canadian Deals
                <span className="block text-yellow-300">Save Money Today 🇨🇦</span>
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-8">
                Find the hottest deals from Amazon.ca, Walmart, Costco, Best Buy
                and more. Updated every 4 hours.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/deals/today"
                  className="
                    px-8 py-4 rounded-xl
                    bg-white text-orange-600
                    font-bold text-lg
                    hover:bg-yellow-100
                    transition-colors
                    shadow-lg
                  "
                >
                  🔥 Today's Hot Deals
                </Link>
                <Link
                  href="/stores"
                  className="
                    px-8 py-4 rounded-xl
                    bg-white/20 text-white
                    font-bold text-lg
                    hover:bg-white/30
                    transition-colors
                    border border-white/30
                  "
                >
                  Browse Stores
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Bar */}
        <section className="bg-gray-900 text-white py-4">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-center gap-8 md:gap-16 text-center">
              <div>
                <div className="text-2xl md:text-3xl font-bold text-orange-400">
                  {latestDeals.length + featuredDeals.length}+
                </div>
                <div className="text-sm text-gray-400">Active Deals</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-bold text-green-400">
                  {storeStats.length}+
                </div>
                <div className="text-sm text-gray-400">Stores</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-bold text-yellow-400">
                  4hrs
                </div>
                <div className="text-sm text-gray-400">Update Frequency</div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Deals */}
        {featuredDeals.length > 0 && (
          <section className="py-12 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                  🔥 Featured Deals
                </h2>
                <Link
                  href="/deals"
                  className="text-orange-600 hover:text-orange-700 font-semibold"
                >
                  View All →
                </Link>
              </div>
              <DealGrid>
                {featuredDeals.map(deal => (
                  <DealCard
                    key={deal.id}
                    id={deal.id}
                    title={deal.title}
                    slug={deal.slug}
                    imageUrl={deal.image_blob_url || deal.image_url || '/placeholder-deal.jpg'}
                    price={deal.price}
                    originalPrice={deal.original_price}
                    discountPercent={deal.discount_percent}
                    store={deal.store || 'Unknown'}
                    affiliateUrl={deal.affiliate_url}
                    featured={true}
                  />
                ))}
              </DealGrid>
            </div>
          </section>
        )}

        {/* Store Shortcuts */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Shop by Store
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
              {featuredStores.map(store => (
                <Link
                  key={store.slug}
                  href={`/stores/${store.slug}`}
                  className="
                    flex flex-col items-center justify-center
                    p-4 rounded-xl
                    bg-white border border-gray-200
                    hover:border-orange-300 hover:shadow-md
                    transition-all
                    group
                  "
                >
                  <div className="w-12 h-12 mb-2 rounded-lg overflow-hidden bg-gray-50 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <StoreLogo
                      src={store.logo}
                      alt={`${store.name} logo`}
                      domain={store.domain}
                      size={40}
                    />
                  </div>
                  <span className="font-semibold text-gray-900 text-sm text-center">
                    {store.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Latest Deals */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                ⚡ Latest Deals
              </h2>
              <Link
                href="/deals"
                className="text-orange-600 hover:text-orange-700 font-semibold"
              >
                View All →
              </Link>
            </div>
            <DealGrid>
              {latestDeals.map(deal => (
                <DealCard
                  key={deal.id}
                  id={deal.id}
                  title={deal.title}
                  slug={deal.slug}
                  imageUrl={deal.image_blob_url || deal.image_url || '/placeholder-deal.jpg'}
                  price={deal.price}
                  originalPrice={deal.original_price}
                  discountPercent={deal.discount_percent}
                  store={deal.store || 'Unknown'}
                  affiliateUrl={deal.affiliate_url}
                  featured={deal.featured}
                />
              ))}
            </DealGrid>
          </div>
        </section>

        {/* Categories */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              📂 Browse Categories
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {[
                { slug: 'electronics', name: 'Electronics', emoji: '📱' },
                { slug: 'fashion', name: 'Fashion', emoji: '👕' },
                { slug: 'home', name: 'Home', emoji: '🏠' },
                { slug: 'grocery', name: 'Grocery', emoji: '🛒' },
                { slug: 'beauty', name: 'Beauty', emoji: '💄' },
                { slug: 'sports', name: 'Sports', emoji: '⚽' },
              ].map(cat => (
                <Link
                  key={cat.slug}
                  href={`/category/${cat.slug}`}
                  className="
                    flex items-center gap-3
                    p-4 rounded-xl
                    bg-white border border-gray-200
                    hover:border-orange-300 hover:shadow-md
                    transition-all
                  "
                >
                  <span className="text-2xl">{cat.emoji}</span>
                  <span className="font-semibold text-gray-900">{cat.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Canadian Brands CTA */}
        <section className="py-12 bg-gray-900">
          <div className="max-w-4xl mx-auto text-center px-4">
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

        {/* SEO Content */}
        <section className="py-12 bg-white">
          <div className="max-w-4xl mx-auto px-4 prose">
            <h2>About Shop Canada - Your Canadian Deals Destination</h2>
            <p>
              Shop Canada is your go-to destination for finding the best deals, sales,
              and discounts from top Canadian retailers. We scour the web to bring you
              verified deals from Amazon.ca, Walmart Canada, Costco, Best Buy, Canadian
              Tire, and dozens more stores.
            </p>

            <h3>How We Find Deals</h3>
            <p>
              Our automated deal-finding system monitors major Canadian retailers and
              deal aggregators around the clock. We update our listings every 4 hours
              to ensure you always have access to the latest savings opportunities.
            </p>

            <h3>Why Canadian Shoppers Trust Us</h3>
            <ul>
              <li>Real-time price tracking from major Canadian retailers</li>
              <li>Verified deals - we only list active promotions</li>
              <li>600+ Canadian brands directory</li>
              <li>Easy-to-use interface designed for quick deal hunting</li>
            </ul>

            <h3>Start Saving Today</h3>
            <p>
              Browse our latest deals, explore your favorite stores, or search by
              category to find exactly what you're looking for. Whether you're
              shopping for electronics, fashion, home goods, or groceries, we've
              got deals for every Canadian shopper.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
