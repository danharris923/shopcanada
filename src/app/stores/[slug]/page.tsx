import { Metadata } from 'next'

import { getDealsByStore, getStores } from '@/lib/db'
import { Deal } from '@/types/deal'
import { formatStoreName } from '@/lib/content-generator'
import { generateItemListSchema } from '@/lib/schema'
import { DealCard, DealGrid } from '@/components/DealCard'
import { Breadcrumbs } from '@/components/deal/Breadcrumbs'
import { StoreLogo } from '@/components/StoreLogo'
import {
  getStoreLogo,
  generateLogoUrl,
  getStorePageH1,
  generateCategoryH2,
  formatCategoryName,
} from '@/lib/store-logos'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

// Max H2 categories per store page (SEO best practice)
const MAX_H2_CATEGORIES = 5

interface PageProps {
  params: { slug: string }
}

// Revalidate every 15 minutes for fresh data
export const revalidate = 900

// Generate static pages for all stores
export async function generateStaticParams() {
  try {
    const stores = await getStores()
    return stores.map(store => ({ slug: store.slug }))
  } catch (error) {
    // No database available for stores static generation
    return []
  }
}

// Allow dynamic params (new stores added by scraper)
export const dynamicParams = true

// Generate metadata - uses store tagline for SEO consistency
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const storeName = formatStoreName(params.slug)
  const storeInfo = getStoreLogo(params.slug)

  // H1/title uses the store tagline verbatim for SEO
  const seoTitle = storeInfo ? getStorePageH1(storeInfo) : `${storeName} Deals in Canada`

  return {
    title: seoTitle,
    description: `${seoTitle}. Find verified deals, sales, and discounts. Updated daily.`,
    openGraph: {
      title: seoTitle,
      description: `${seoTitle}. Find verified deals and discounts.`,
    },
  }
}

export default async function StorePage({ params }: PageProps) {
  const storeSlug = params.slug
  const storeName = formatStoreName(storeSlug)
  const storeInfo = getStoreLogo(storeSlug)
  const logoUrl = storeInfo?.logo || generateLogoUrl(storeSlug.replace(/-/g, '') + '.ca')

  // H1 = store card microcopy verbatim (SEO requirement)
  const pageH1 = storeInfo ? getStorePageH1(storeInfo) : `${storeName} deals in Canada`

  // Get deals with error handling for build time
  let deals: Deal[] = []
  try {
    deals = await getDealsByStore(storeSlug)
  } catch (error) {
    // Database error for store during build, using empty deals
    deals = []
  }

  // Schema markup (only if we have deals)
  const itemListSchema = deals.length > 0
    ? generateItemListSchema(deals, pageH1)
    : null

  // Breadcrumbs
  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Stores', href: '/stores' },
    { label: storeName, href: `/stores/${storeSlug}` },
  ]

  // Group deals by category for SEO H2 sections
  const dealsByCategory = deals.reduce((acc, deal) => {
    const cat = deal.category || 'general'
    if (!acc[cat]) acc[cat] = []
    acc[cat].push(deal)
    return acc
  }, {} as Record<string, typeof deals>)

  // Sort categories by deal count (most deals first)
  const sortedCategories = Object.entries(dealsByCategory)
    .sort((a, b) => b[1].length - a[1].length)

  // Split into H2 categories (top 5) and overflow (rest)
  const h2Categories = sortedCategories.slice(0, MAX_H2_CATEGORIES)
  const overflowCategories = sortedCategories.slice(MAX_H2_CATEGORIES)

  return (
    <>
      {itemListSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
        />
      )}

      <Header />

      <main className="min-h-screen bg-cream">
        <div className="max-w-7xl mx-auto px-4 py-6">
          {/* Breadcrumbs */}
          <div className="mb-4">
            <Breadcrumbs items={breadcrumbs} />
          </div>

          {/* Header with Logo + SEO H1 (matches store card microcopy verbatim) */}
          <div className="mb-8 flex items-center gap-4">
            <div className="w-16 h-16 rounded-card bg-ivory border border-silver-light flex items-center justify-center overflow-hidden">
              <StoreLogo
                src={logoUrl}
                alt={`${storeName} logo`}
                domain={storeInfo?.domain || storeSlug.replace(/-/g, '') + '.ca'}
                size={56}
              />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-charcoal mb-1">
                {pageH1}
              </h1>
              <p className="text-slate text-sm">
                {deals.length} active deals
              </p>
            </div>
          </div>

          {/* Quick Stats */}
          {deals.length > 0 && (
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-white border border-silver-light rounded-card p-4 text-center">
                <div className="text-3xl font-bold text-charcoal">{deals.length}</div>
                <div className="text-sm text-silver">Active Deals</div>
              </div>
              <div className="bg-white border border-silver-light rounded-card p-4 text-center">
                <div className="text-3xl font-bold text-maple-red">
                  {Math.max(...deals.map(d => d.discount_percent || 0))}%
                </div>
                <div className="text-sm text-silver">Max Discount</div>
              </div>
              <div className="bg-white border border-silver-light rounded-card p-4 text-center">
                <div className="text-3xl font-bold text-burgundy">
                  {Object.keys(dealsByCategory).length}
                </div>
                <div className="text-sm text-silver">Categories</div>
              </div>
            </div>
          )}

          {/* No Deals Message */}
          {deals.length === 0 && (
            <div className="bg-amber-50 border border-amber-400 rounded-card p-8 text-center mb-8">
              <div className="text-4xl mb-4">🔍</div>
              <h2 className="text-xl font-bold text-charcoal mb-2">
                No Active Deals Right Now
              </h2>
              <p className="text-slate mb-4">
                We are constantly scanning for new {storeName} deals. Check back soon!
              </p>
              <a href="/" className="btn-primary">
                Browse All Deals
              </a>
            </div>
          )}

          {/* Deals by Category with SEO H2 Headings (max 5 H2s) */}
          {deals.length > 0 && storeInfo && (
            <div className="space-y-10">
              {h2Categories.map(([categorySlug, categoryDeals]) => (
                <section key={categorySlug} id={categorySlug}>
                  <h2 className="text-xl md:text-2xl font-bold text-charcoal mb-4">
                    {generateCategoryH2(categorySlug, storeInfo)}
                  </h2>
                  <DealGrid>
                    {categoryDeals.map(deal => (
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
                </section>
              ))}

              {/* Overflow categories use H3 (not H2) */}
              {overflowCategories.length > 0 && (
                <section>
                  <h3 className="text-lg font-bold text-charcoal mb-4">
                    More {storeName} Deals
                  </h3>
                  {overflowCategories.map(([categorySlug, categoryDeals]) => (
                    <div key={categorySlug} className="mb-8" id={categorySlug}>
                      <h4 className="text-base font-semibold text-slate mb-3">
                        {formatCategoryName(categorySlug)}
                      </h4>
                      <DealGrid>
                        {categoryDeals.map(deal => (
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
                  ))}
                </section>
              )}
            </div>
          )}

          {/* Fallback: All deals if no storeInfo */}
          {deals.length > 0 && !storeInfo && (
            <DealGrid>
              {deals.map(deal => (
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
          )}
        </div>
      </main>

      <Footer />
    </>
  )
}
