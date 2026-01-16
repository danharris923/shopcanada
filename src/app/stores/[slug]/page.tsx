import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { getDealsByStore, getStores, getStoreBySlug, getRelatedCanadianBrands, getCostcoProducts } from '@/lib/db'
import { Deal, Store } from '@/types/deal'
import { formatStoreName } from '@/lib/content-generator'
import { generateItemListSchema } from '@/lib/schema'
import { DealCard, DealGrid } from '@/components/DealCard'
import { CostcoDealCard, CostcoDealGrid } from '@/components/costco/CostcoDealCard'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { StoreLogo } from '@/components/StoreLogo'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { StatsBar } from '@/components/StatsBar'
import { ExternalLink, Truck, RotateCcw, Award, CreditCard } from 'lucide-react'
import { getVideosForStore } from '@/lib/youtube'
import { StoreVideos } from '@/components/YouTubeEmbed'

interface PageProps {
  params: Promise<{ slug: string }>
}

// Revalidate every 15 minutes for fresh data
export const revalidate = 900

// Generate static pages for all stores
export async function generateStaticParams() {
  try {
    const stores = await getStores()
    return stores.map(store => ({ slug: store.slug }))
  } catch (error) {
    return []
  }
}

// Allow dynamic params (new stores added by scraper)
export const dynamicParams = true

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

// Fallback descriptions for major international retailers that highlight their Canadian presence
const INTERNATIONAL_STORE_DESCRIPTIONS: Record<string, string> = {
  'costco': `Costco Wholesale has been serving Canadian members since 1985, with over 100 warehouse locations across every province. As one of Canada's largest employers, Costco provides jobs for over 40,000 Canadians and sources products from thousands of Canadian suppliers. The company is known for paying above-average wages and providing comprehensive benefits to Canadian employees. Costco's Canadian operations include a significant focus on local products, with dedicated "Canadian sourced" labeling on many items.`,

  'amazon': `Amazon.ca has grown to become one of Canada's largest online retailers since launching in 2002. The company operates multiple fulfillment centers across Canada, employing thousands of Canadians and enabling fast delivery nationwide. Amazon has invested billions in Canadian infrastructure and technology, including its AWS cloud computing facilities. The platform provides a marketplace for thousands of Canadian small businesses to reach customers across the country.`,

  'walmart': `Walmart Canada operates over 400 stores across the country and employs more than 100,000 Canadians, making it one of Canada's largest private-sector employers. Since acquiring the Woolco chain in 1994, Walmart has invested heavily in Canadian communities through local hiring, charitable giving, and partnerships with Canadian suppliers. The company sources billions of dollars worth of products from Canadian manufacturers and farmers each year.`,

  'best-buy': `Best Buy Canada operates over 160 stores nationwide and employs thousands of Canadians. As one of the country's leading electronics retailers, Best Buy provides Canadians with access to the latest technology while supporting local communities through its Best Buy Foundation. The company's Geek Squad services employ local technicians across the country, providing tech support and repair services to Canadian customers.`,

  'home-depot': `The Home Depot Canada operates over 180 stores across the country and employs approximately 30,000 Canadians. Since entering the Canadian market in 1994, Home Depot has supported Canadian communities through the Home Depot Canada Foundation, which has contributed over $80 million to affordable housing initiatives. The company partners with Canadian manufacturers and sources local products, including lumber from Canadian forestry operations.`,

  'ikea': `IKEA Canada operates 14 stores across the country along with distribution centers that employ thousands of Canadians. The Swedish furniture retailer has been in Canada since 1976 and has invested significantly in sustainable operations, including renewable energy at Canadian locations. IKEA Canada partners with local charities and provides affordable home furnishing options that have become staples in Canadian households.`,
}

// Get store description - use database description if available, otherwise fallback
function getStoreDescriptionWithFallback(store: Store): string | null {
  if (store.description) return store.description
  return INTERNATIONAL_STORE_DESCRIPTIONS[store.slug] || null
}

// Generate page H1 from store data
function getStorePageH1(store: Store): string {
  // Use tagline if available, otherwise generate from name
  if (store.tagline) {
    return store.tagline
  }
  return `${store.name} deals in Canada`
}

// Generate metadata
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const store = await getStoreBySlug(slug)

  if (!store) {
    const storeName = formatStoreName(slug)
    return {
      title: `${storeName} Deals in Canada`,
      description: `Find ${storeName} deals, sales, and discounts in Canada. Updated daily.`,
    }
  }

  const seoTitle = getStorePageH1(store)

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
  const { slug: storeSlug } = await params

  // Fetch store from database
  const store = await getStoreBySlug(storeSlug)

  // If store not found, show 404
  if (!store) {
    notFound()
  }

  const storeName = store.name
  const logoUrl = store.logo_url || ''
  const domain = getDomainFromUrl(store.website_url)
  const pageH1 = getStorePageH1(store)

  // Get primary category for related stores
  const primaryCategory = store.top_categories?.[0] || 'Retail'

  // Check if this is the Costco store page
  const isCostco = storeSlug === 'costco'

  // Fetch deals, videos (skip for Costco), Costco products, and related stores in parallel
  const [deals, videos, costcoProducts, relatedStores] = await Promise.all([
    getDealsByStore(storeSlug).catch(() => []),
    isCostco ? Promise.resolve([]) : getVideosForStore(storeSlug, 3), // No YouTube for Costco
    isCostco ? getCostcoProducts({ limit: 12 }).catch(() => []) : Promise.resolve([]),
    getRelatedCanadianBrands(store, 6).catch(() => [])
  ])

  // Schema markup
  const itemListSchema = deals.length > 0
    ? generateItemListSchema(deals, pageH1)
    : null

  // Breadcrumbs
  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Stores', href: '/stores' },
    { label: storeName, href: `/stores/${storeSlug}` },
  ]

  // Show first 8 deals, with "Show More" if there are more
  const previewDeals = deals.slice(0, 8)
  const hasMoreDeals = deals.length > 8

  // Determine if we have store policies to show
  const hasStorePolicies = store.return_policy || store.shipping_info || store.loyalty_program_name || store.price_match_policy

  return (
    <>
      {itemListSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
        />
      )}

      <Header />
      <StatsBar dealCount={deals.length} />

      <main className="min-h-screen bg-cream">
        <div className="max-w-7xl mx-auto px-4 py-6">
          {/* Breadcrumbs */}
          <div className="mb-4">
            <Breadcrumbs items={breadcrumbs} />
          </div>

          {/* Header with Logo */}
          <div className="mb-6 flex items-center gap-4">
            <div className="w-16 h-16 rounded-card bg-ivory border border-silver-light flex items-center justify-center overflow-hidden">
              <StoreLogo
                src={logoUrl}
                alt={`${storeName} logo`}
                domain={domain}
                size={56}
              />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-2xl md:text-3xl font-bold text-charcoal">
                  {pageH1}
                </h1>
                {store.is_canadian && (
                  <span className="px-2 py-0.5 bg-maple-red text-white text-xs font-medium rounded">
                    Canadian
                  </span>
                )}
              </div>
              {deals.length > 0 && (
                <p className="text-slate text-sm">
                  {deals.length} active deal{deals.length !== 1 ? 's' : ''}
                </p>
              )}
            </div>
          </div>

          {/* Store Screenshot */}
          {store.screenshot_url && (
            <div className="mb-8">
              <div className="relative rounded-card overflow-hidden border border-silver-light shadow-lg">
                <img
                  src={store.screenshot_url}
                  alt={`${storeName} website screenshot`}
                  className="w-full h-auto"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                  <p className="text-white text-sm">
                    Preview of {storeName} website
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* DEALS SECTION - Only show if deals exist */}
          {deals.length > 0 && (
            <section className="mb-10">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-charcoal">
                  Latest {storeName} Deals
                </h2>
                {hasMoreDeals && (
                  <Link
                    href={`/deals?store=${storeSlug}`}
                    className="text-maple-red hover:text-burgundy font-semibold transition-colors"
                  >
                    View All {deals.length} Deals →
                  </Link>
                )}
              </div>
              <DealGrid>
                {previewDeals.map(deal => (
                  <DealCard
                    key={deal.id}
                    id={deal.id}
                    title={deal.title}
                    slug={deal.slug}
                    imageUrl={deal.image_blob_url || deal.image_url || '/placeholder-deal.jpg'}
                    price={deal.price}
                    originalPrice={deal.original_price}
                    discountPercent={deal.discount_percent}
                    store={deal.store || null}
                    affiliateUrl={deal.affiliate_url}
                    featured={deal.featured}
                  />
                ))}
              </DealGrid>
              {hasMoreDeals && (
                <div className="mt-6 text-center">
                  <Link
                    href={`/deals?store=${storeSlug}`}
                    className="btn-primary inline-block"
                  >
                    Show All {deals.length} Deals
                  </Link>
                </div>
              )}
            </section>
          )}

          {/* COSTCO PRODUCTS SECTION - Only for Costco store page */}
          {isCostco && costcoProducts.length > 0 && (
            <section className="mb-10">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-charcoal">
                  Costco Price Tracker
                </h2>
                <Link
                  href="/deals/costco"
                  className="text-maple-red hover:text-burgundy font-semibold transition-colors"
                >
                  View All Products →
                </Link>
              </div>
              <p className="text-slate mb-4">
                Track prices on {costcoProducts.length > 1000 ? '1,000+' : costcoProducts.length} Costco products across Canadian warehouse locations.
              </p>
              <CostcoDealGrid>
                {costcoProducts.slice(0, 8).map(product => (
                  <CostcoDealCard key={product.id} product={product} />
                ))}
              </CostcoDealGrid>
              <div className="mt-6 text-center">
                <Link
                  href="/deals/costco"
                  className="btn-primary inline-block"
                >
                  Browse All Costco Products
                </Link>
              </div>
            </section>
          )}

          {/* YOUTUBE VIDEOS SECTION - Skip for Costco */}
          {videos.length > 0 && (
            <StoreVideos
              storeSlug={storeSlug}
              storeName={storeName}
              videos={videos}
            />
          )}

          {/* ABOUT SECTION */}
          <section className="mb-10">
            {/* Visit Store Button */}
            {store.website_url && (
              <div className="mb-6">
                <a
                  href={store.affiliate_url || store.website_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 btn-primary"
                >
                  <ExternalLink size={18} />
                  Visit {storeName}
                </a>
              </div>
            )}

            {/* About / Description */}
            {(() => {
              const description = getStoreDescriptionWithFallback(store)
              return description ? (
                <div className="bg-white border border-silver-light rounded-card p-6 md:p-8 mb-6">
                  <h2 className="text-xl font-bold text-charcoal mb-4">About {storeName}</h2>
                  <p className="text-base md:text-lg text-charcoal leading-relaxed">
                    {description}
                  </p>
                </div>
              ) : null
            })()}

            {/* Store Policies Section */}
            {hasStorePolicies && (
              <div className="bg-white border border-silver-light rounded-card p-6 md:p-8">
                <h2 className="text-xl font-bold text-charcoal mb-6">Store Policies</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Return Policy */}
                  {store.return_policy && (
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-10 h-10 bg-maple-red/10 rounded-full flex items-center justify-center">
                        <RotateCcw className="w-5 h-5 text-maple-red" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-charcoal mb-1">Return Policy</h3>
                        <p className="text-sm text-slate">{store.return_policy}</p>
                      </div>
                    </div>
                  )}

                  {/* Shipping Info */}
                  {store.shipping_info && (
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-10 h-10 bg-maple-red/10 rounded-full flex items-center justify-center">
                        <Truck className="w-5 h-5 text-maple-red" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-charcoal mb-1">Shipping</h3>
                        <p className="text-sm text-slate">{store.shipping_info}</p>
                      </div>
                    </div>
                  )}

                  {/* Loyalty Program */}
                  {store.loyalty_program_name && (
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-10 h-10 bg-maple-red/10 rounded-full flex items-center justify-center">
                        <Award className="w-5 h-5 text-maple-red" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-charcoal mb-1">{store.loyalty_program_name}</h3>
                        {store.loyalty_program_desc && (
                          <p className="text-sm text-slate">{store.loyalty_program_desc}</p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Price Match Policy */}
                  {store.price_match_policy && (
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-10 h-10 bg-maple-red/10 rounded-full flex items-center justify-center">
                        <CreditCard className="w-5 h-5 text-maple-red" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-charcoal mb-1">Price Match</h3>
                        <p className="text-sm text-slate">{store.price_match_policy}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </section>

          {/* Related Stores */}
          {relatedStores.length > 0 && (
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-charcoal mb-6">
                More {primaryCategory} Stores
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedStores.map((relatedStore) => (
                  <Link
                    key={relatedStore.slug}
                    href={`/stores/${relatedStore.slug}`}
                    className="group bg-white border border-silver-light rounded-card p-6 hover:border-maple-red transition-all hover:-translate-y-1"
                  >
                    <div className="mb-4 h-16 flex items-center justify-center">
                      {relatedStore.logo_url ? (
                        <img
                          src={relatedStore.logo_url}
                          alt={`${relatedStore.name} logo`}
                          className="max-h-full max-w-full object-contain"
                        />
                      ) : (
                        <StoreLogo
                          src=""
                          alt={`${relatedStore.name} logo`}
                          domain={relatedStore.slug + '.ca'}
                          size={48}
                        />
                      )}
                    </div>
                    <h3 className="text-lg font-bold text-charcoal mb-2 group-hover:text-maple-red">
                      {relatedStore.name}
                    </h3>
                    <p className="text-sm text-slate line-clamp-2">
                      {relatedStore.tagline || relatedStore.description || `Shop ${relatedStore.name}`}
                    </p>
                    {relatedStore.is_canadian && (
                      <span className="inline-block mt-2 px-2 py-0.5 bg-maple-red/10 text-maple-red text-xs rounded">
                        Canadian
                      </span>
                    )}
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      <Footer />
    </>
  )
}
