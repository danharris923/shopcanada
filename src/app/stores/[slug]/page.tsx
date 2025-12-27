import { Metadata } from 'next'
import Link from 'next/link'

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
} from '@/lib/store-logos'
import { getBrandBySlug } from '@/lib/brands-data'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { StatsBar } from '@/components/StatsBar'
import { ExternalLink } from 'lucide-react'

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
    return []
  }
}

// Allow dynamic params (new stores added by scraper)
export const dynamicParams = true

// Generate metadata
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const storeName = formatStoreName(params.slug)
  const storeInfo = getStoreLogo(params.slug)
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
  const brand = getBrandBySlug(storeSlug)
  const pageH1 = storeInfo ? getStorePageH1(storeInfo) : `${storeName} deals in Canada`

  // Get deals
  let deals: Deal[] = []
  try {
    deals = await getDealsByStore(storeSlug)
  } catch (error) {
    deals = []
  }

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

          {/* DEALS SECTION - FIRST */}
          {deals.length > 0 ? (
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
                    store={deal.store || 'Unknown'}
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
          ) : (
            <div className="bg-amber-50 border border-amber-400 rounded-card p-8 text-center mb-10">
              <div className="text-4xl mb-4">🔍</div>
              <h2 className="text-xl font-bold text-charcoal mb-2">
                No Active Deals Right Now
              </h2>
              <p className="text-slate mb-4">
                We are constantly scanning for new {storeName} deals. Check back soon!
              </p>
              <Link href="/deals" className="btn-primary inline-block">
                Browse All Deals
              </Link>
            </div>
          )}

          {/* ABOUT SECTION - BELOW DEALS */}
          {brand && (
            <section className="mb-10">
              {/* Visit Store Button */}
              <div className="mb-6">
                <a
                  href={brand.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 btn-primary"
                >
                  <ExternalLink size={18} />
                  Visit {brand.name}
                </a>
              </div>

              {/* About */}
              <div className="bg-white border border-silver-light rounded-card p-6 md:p-8">
                <h2 className="text-xl font-bold text-charcoal mb-4">About {brand.name}</h2>
                <p className="text-base md:text-lg text-charcoal leading-relaxed mb-6">
                  {brand.description}
                </p>

                {/* Website Screenshot */}
                {brand.screenshot && (
                  <div className="mb-6 relative group">
                    <a
                      href={brand.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block relative overflow-hidden rounded-lg border border-silver-light hover:border-maple-red transition-all"
                    >
                      <img
                        src={brand.screenshot}
                        alt={`${brand.name} website preview`}
                        className="w-full h-auto"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform">
                        <span className="btn-primary inline-block text-sm">
                          Visit {brand.name} →
                        </span>
                      </div>
                    </a>
                  </div>
                )}

                {/* Brand Story */}
                {brand.brandStory && (
                  <div className="p-6 bg-ivory rounded-lg border border-maple-red/30">
                    <h3 className="text-lg font-bold text-burgundy mb-4">The {brand.name} Story</h3>
                    <div
                      className="text-charcoal leading-relaxed text-sm prose max-w-none"
                      dangerouslySetInnerHTML={{ __html: brand.brandStory }}
                    />
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Store Link for stores without brand data */}
          {!brand && storeInfo && (
            <section className="mb-10">
              <a
                href={`https://${storeInfo.domain}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 btn-primary"
              >
                <ExternalLink size={18} />
                Visit {storeName}
              </a>
            </section>
          )}
        </div>
      </main>

      <Footer />
    </>
  )
}
