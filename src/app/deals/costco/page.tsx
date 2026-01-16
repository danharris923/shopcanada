import { Metadata } from 'next'
import Link from 'next/link'

import {
  getCostcoProducts,
  getCostcoCategories,
  getCostcoProductCount,
} from '@/lib/db'
import { SITE_URL, REVALIDATE_INTERVAL } from '@/lib/config'

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { StatsBar } from '@/components/StatsBar'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { CostcoDealCard, CostcoDealGrid } from '@/components/costco/CostcoDealCard'

// ISR - revalidate every 15 minutes
export const revalidate = REVALIDATE_INTERVAL

interface PageProps {
  searchParams: { category?: string; page?: string }
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const category = searchParams.category

  const title = category
    ? `${category} at Costco Canada | Shop Canada Price Tracker`
    : 'Costco Canada Deals & Price Tracker | Shop Canada'

  const description = category
    ? `Track Costco prices for ${category} products across Canada. See price history, compare warehouse prices, and find the best deals.`
    : 'Track Costco prices across Canada. See price history, compare warehouse prices, find the best deals on groceries, electronics, and more.'

  return {
    title,
    description,
    alternates: {
      canonical: category
        ? `${SITE_URL}/deals/costco?category=${encodeURIComponent(category)}`
        : `${SITE_URL}/deals/costco`,
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/deals/costco`,
      type: 'website',
    },
  }
}

export default async function CostcoLandingPage({ searchParams }: PageProps) {
  const category = searchParams.category
  const page = parseInt(searchParams.page || '1', 10)
  const perPage = 24
  const offset = (page - 1) * perPage

  // Fetch data
  const [products, categories, totalCount] = await Promise.all([
    getCostcoProducts({ limit: perPage, offset, category }),
    getCostcoCategories(),
    getCostcoProductCount(),
  ])

  const totalPages = Math.ceil(totalCount / perPage)

  // Breadcrumbs
  const breadcrumbs: Array<{ label: string; href?: string }> = [
    { label: 'Home', href: '/' },
    { label: 'Costco', href: '/deals/costco' },
  ]

  if (category) {
    breadcrumbs.push({ label: category })
  }

  return (
    <>
      <Header />

      <div className="min-h-screen bg-page-bg">
        {/* Hero */}
        <section className="bg-[#e31837] py-12">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold text-white mb-4">
              {category ? `${category} at Costco` : 'Costco Canada Price Tracker'}
            </h1>
            <p className="text-white/90 text-lg max-w-2xl mx-auto">
              {category
                ? `Browse ${products.length} ${category.toLowerCase()} products with price tracking across Canadian Costco locations.`
                : `Track prices on ${totalCount.toLocaleString()} products across Canadian Costco warehouse locations. See price history and find the best deals.`}
            </p>
          </div>
        </section>

        {/* Stats Bar */}
        <StatsBar />

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 py-8">
          {/* Breadcrumbs */}
          <div className="mb-6">
            <Breadcrumbs items={breadcrumbs} />
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar - Categories */}
            <aside className="lg:col-span-1">
              <div className="bg-white border border-silver-light rounded-card p-4 sticky top-4">
                <h2 className="font-bold text-charcoal mb-4">Categories</h2>
                <nav className="space-y-1">
                  <Link
                    href="/deals/costco"
                    className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                      !category
                        ? 'bg-[#e31837] text-white font-medium'
                        : 'text-charcoal hover:bg-cream'
                    }`}
                  >
                    All Products
                    <span className="float-right text-muted">
                      {totalCount.toLocaleString()}
                    </span>
                  </Link>
                  {categories.map(cat => (
                    <Link
                      key={cat.category}
                      href={`/deals/costco?category=${encodeURIComponent(cat.category)}`}
                      className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                        category === cat.category
                          ? 'bg-[#e31837] text-white font-medium'
                          : 'text-charcoal hover:bg-cream'
                      }`}
                    >
                      {cat.category}
                      <span className="float-right text-muted">
                        {cat.count}
                      </span>
                    </Link>
                  ))}
                </nav>
              </div>
            </aside>

            {/* Main - Product Grid */}
            <div className="lg:col-span-3">
              {/* Results count */}
              <div className="flex items-center justify-between mb-6">
                <p className="text-muted">
                  Showing {products.length} of {totalCount.toLocaleString()} products
                  {category && ` in ${category}`}
                </p>
              </div>

              {/* Products Grid */}
              {products.length > 0 ? (
                <CostcoDealGrid>
                  {products.map(product => (
                    <CostcoDealCard key={product.id} product={product} />
                  ))}
                </CostcoDealGrid>
              ) : (
                <div className="text-center py-16">
                  <p className="text-body text-lg mb-4">
                    No products found{category && ` in ${category}`}
                  </p>
                  <Link href="/deals/costco" className="text-maple-red hover:underline">
                    View all Costco products
                  </Link>
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-8">
                  {page > 1 && (
                    <Link
                      href={`/deals/costco?${category ? `category=${encodeURIComponent(category)}&` : ''}page=${page - 1}`}
                      className="px-4 py-2 border border-silver-light rounded-lg hover:bg-cream transition-colors"
                    >
                      Previous
                    </Link>
                  )}

                  <span className="px-4 py-2 text-muted">
                    Page {page} of {totalPages}
                  </span>

                  {page < totalPages && (
                    <Link
                      href={`/deals/costco?${category ? `category=${encodeURIComponent(category)}&` : ''}page=${page + 1}`}
                      className="px-4 py-2 border border-silver-light rounded-lg hover:bg-cream transition-colors"
                    >
                      Next
                    </Link>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* SEO Content */}
          <section className="mt-12 bg-white border border-silver-light rounded-card p-6">
            <h2 className="text-xl font-bold text-charcoal mb-4">
              About Costco Price Tracking
            </h2>
            <div className="prose max-w-none text-slate">
              <p>
                Shop Canada tracks prices across Costco warehouse locations in Canada to help you
                find the best deals. We monitor price changes over time, so you can see historical
                trends and identify when products are at their lowest prices.
              </p>
              <h3 className="text-lg font-semibold mt-4 mb-2">Why Prices Vary</h3>
              <p>
                Costco prices can vary between warehouse locations based on regional costs,
                promotions, and inventory. Our tracking shows you the price range across locations,
                so you know what to expect at your local warehouse.
              </p>
              <h3 className="text-lg font-semibold mt-4 mb-2">Price History</h3>
              <p>
                Each product page includes a price history chart showing how the price has changed
                over time. Use this to identify price drops and the best times to buy.
              </p>
            </div>
          </section>
        </main>
      </div>

      <Footer />
    </>
  )
}
