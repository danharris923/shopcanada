import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { getDealsByStore, getStores, getStoreBySlug } from '@/lib/db'
import { Deal, Store } from '@/types/deal'
import { formatStoreName } from '@/lib/content-generator'
import { generateItemListSchema } from '@/lib/schema'
import { DealCard, DealGrid } from '@/components/DealCard'
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

  // Get deals
  let deals: Deal[] = []
  try {
    deals = await getDealsByStore(storeSlug)
  } catch (error) {
    deals = []
  }

  // Get YouTube videos for this store
  const videos = await getVideosForStore(storeSlug, 3)

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
              <h1 className="text-2xl md:text-3xl font-bold text-charcoal mb-1">
                {pageH1}
              </h1>
              {deals.length > 0 && (
                <p className="text-slate text-sm">
                  {deals.length} active deal{deals.length !== 1 ? 's' : ''}
                </p>
              )}
            </div>
          </div>

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

          {/* YOUTUBE VIDEOS SECTION */}
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
            {store.description && (
              <div className="bg-white border border-silver-light rounded-card p-6 md:p-8 mb-6">
                <h2 className="text-xl font-bold text-charcoal mb-4">About {storeName}</h2>
                <p className="text-base md:text-lg text-charcoal leading-relaxed">
                  {store.description}
                </p>
              </div>
            )}

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
        </div>
      </main>

      <Footer />
    </>
  )
}
