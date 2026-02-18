import { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'

import { getDealBySlug, getRelatedDeals } from '@/lib/db'
import { Deal } from '@/types/deal'
import {
  generateDealDescription,
  generateMetaDescription,
  generatePageTitle,
  generateBreadcrumbs,
  formatStoreName,
  generateFAQ,
  getStoreDescription,
} from '@/lib/content-generator'
import {
  generateProductSchema,
  generateBreadcrumbSchema,
  generateFAQSchema,
  generateReviewSchema,
} from '@/lib/schema'
import { getStockWarning, generateUrgencyData } from '@/lib/urgency'
import { toNumber, formatPrice, calculateSavings } from '@/lib/price-utils'
import { cleanAffiliateUrl, cleanAmazonUrl } from '@/lib/affiliates'

import { StatsBar } from '@/components/StatsBar'
import { PriceDisplay } from '@/components/deal/PriceDisplay'
import { CTAButton } from '@/components/deal/CTAButton'
import { StockWarning } from '@/components/deal/StockWarning'
import { TrustBadges, StoreBadge } from '@/components/deal/TrustBadges'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { StickyMobileCTA } from '@/components/deal/StickyMobileCTA'
import { SafeImg } from '@/components/SafeImg'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { DealCard, DealGrid } from '@/components/DealCard'
import Link from 'next/link'

interface PageProps {
  params: { slug: string }
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://shopcanada.cc'

// Generate metadata with enhanced SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const deal = await getDealBySlug(params.slug)

  if (!deal) {
    return { title: 'Deal Not Found' }
  }

  const title = generatePageTitle(deal)
  const description = generateMetaDescription(deal)
  const ogImageUrl = deal.image_blob_url || deal.image_url || '/hero-desktop.png'
  const canonicalUrl = `${SITE_URL}/deals/${deal.slug}`
  const publishedTime = deal.date_added ? new Date(deal.date_added).toISOString() : new Date().toISOString()
  const modifiedTime = deal.date_updated ? new Date(deal.date_updated).toISOString() : publishedTime

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      images: [{ url: ogImageUrl, width: 800, height: 600, alt: deal.title }],
      type: 'article',
      publishedTime,
      modifiedTime,
      authors: ['Shop Canada'],
      tags: [deal.category || 'deals', deal.store || 'canada', 'canadian deals', 'savings'],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImageUrl],
    },
  }
}

export default async function DealPage({ params }: PageProps) {
  let deal = null
  try {
    deal = await getDealBySlug(params.slug)
  } catch (error) {
    // Database error for deal during build
    notFound()
  }

  if (!deal) {
    notFound()
  }

  // Clean affiliate URL (fix double-wrapped URLs, strip competitor tags, set Amazon tag)
  if (deal.affiliate_url) {
    let cleaned = cleanAffiliateUrl(deal.affiliate_url)
    cleaned = cleanAmazonUrl(cleaned)
    deal = { ...deal, affiliate_url: cleaned }
  }

  // Generate urgency data for stock warning only
  const urgencyData = generateUrgencyData(deal.id)
  const stockWarning = getStockWarning(urgencyData)
  const breadcrumbs = generateBreadcrumbs(deal)
  const description = generateDealDescription(deal)
  const faqs = generateFAQ(deal)
  const storeDescription = getStoreDescription(deal.store)

  let relatedDeals: Deal[] = []
  try {
    relatedDeals = await getRelatedDeals(deal)
  } catch (error) {
    // Database error for related deals during build
    relatedDeals = []
  }

  // Clean affiliate URLs on related deals and filter to affiliated only
  const affiliatedRelatedDeals = relatedDeals
    .filter(d => d.affiliate_url)
    .map(d => ({
      ...d,
      affiliate_url: cleanAmazonUrl(cleanAffiliateUrl(d.affiliate_url)),
    }))

  // Schema markup - enhanced with Review for rich snippets
  const productSchema = generateProductSchema(deal)
  const breadcrumbSchema = generateBreadcrumbSchema(deal)
  const faqSchema = generateFAQSchema(deal) // Returns null if no real FAQs
  const reviewSchema = generateReviewSchema(deal)

  // Filter out null schemas
  const schemas = [productSchema, breadcrumbSchema, faqSchema, reviewSchema].filter(Boolean)

  const imageUrl = deal.image_blob_url || deal.image_url || null
  const storeName = formatStoreName(deal.store)
  const storeSlug = deal.store?.toLowerCase().replace(/\s+/g, '-') || ''

  return (
    <>
      {/* Schema.org JSON-LD - Product, Breadcrumb, FAQ (if real), Review for rich snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemas),
        }}
      />

      <Header />

      {/* ABOVE THE FOLD - Maximum CTR Zone */}
      <div className="min-h-screen bg-cream">
        {/* Stats Bar */}
        <StatsBar />

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 py-4">
          {/* Breadcrumbs */}
          <div className="mb-4">
            <Breadcrumbs items={breadcrumbs} />
          </div>

          {/* Hero Section - Above Fold */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Left: Product Image */}
            <div className="relative">
              {/* Discount Badge */}
              {deal.discount_percent && deal.discount_percent > 0 && (
                <div className="discount-badge text-2xl px-4 py-2">
                  -{deal.discount_percent}%
                </div>
              )}

              {/* Image */}
              <div className="relative aspect-square bg-ivory rounded-card overflow-hidden">
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt={deal.title}
                    fill
                    className="object-contain"
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-8 gap-4">
                    {storeSlug && (
                      <SafeImg
                        src={`/images/stores/${storeSlug}.png`}
                        alt={storeName}
                        className="w-24 h-24 object-contain opacity-50"
                      />
                    )}
                    <p className="text-sm text-slate text-center line-clamp-4 leading-relaxed max-w-xs">
                      {deal.title}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Right: Deal Info + CTA */}
            <div className="flex flex-col">
              {/* Store Badge with Link */}
              <div className="mb-3 flex items-center gap-2">
                <StoreBadge store={deal.store} />
                {storeSlug ? (
                  <Link
                    href={`/stores/${storeSlug}`}
                    className="text-silver text-sm hover:text-maple-red transition-colors"
                  >
                    at {storeName} →
                  </Link>
                ) : (
                  <span className="text-silver text-sm">
                    at {storeName}
                  </span>
                )}
              </div>

              {/* Title */}
              <h1 className="text-2xl md:text-3xl font-bold text-charcoal mb-4">
                {deal.title}
              </h1>

              {/* Price Display */}
              <div className="mb-6">
                <PriceDisplay
                  currentPrice={deal.price}
                  originalPrice={deal.original_price}
                  discountPercent={deal.discount_percent}
                  size="xl"
                />
              </div>

              {/* Stock Warning */}
              {stockWarning && (
                <div className="mb-4">
                  <StockWarning
                    variant={stockWarning.variant}
                    message={stockWarning.message}
                  />
                </div>
              )}

              {/* Primary CTA */}
              <div className="mb-4">
                <CTAButton
                  href={deal.affiliate_url}
                  price={deal.price}
                  storeName={storeName}
                  size="xl"
                />
              </div>

              {/* Trust Badges */}
              <div className="mb-6">
                <TrustBadges storeName={storeName} />
              </div>

              {/* Quick Stats - only show if we have real data */}
              {(deal.discount_percent && deal.discount_percent > 0) || (calculateSavings(deal.original_price, deal.price) && parseFloat(calculateSavings(deal.original_price, deal.price) || '0') > 0) ? (
                <div className="grid grid-cols-2 gap-4 text-center bg-ivory rounded-card p-4">
                  {deal.discount_percent && deal.discount_percent > 0 && (
                    <div>
                      <div className="text-2xl font-bold text-maple-red">
                        {deal.discount_percent}%
                      </div>
                      <div className="text-xs text-silver">Discount</div>
                    </div>
                  )}
                  {calculateSavings(deal.original_price, deal.price) && parseFloat(calculateSavings(deal.original_price, deal.price) || '0') > 0 && (
                    <div>
                      <div className="text-2xl font-bold text-charcoal">
                        ${calculateSavings(deal.original_price, deal.price)?.split('.')[0]}
                      </div>
                      <div className="text-xs text-silver">You Save</div>
                    </div>
                  )}
                </div>
              ) : null}
            </div>
          </div>

          {/* BELOW THE FOLD - SEO Content */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* Main Content (2 cols) */}
            <div className="md:col-span-2 space-y-8">
              {/* Generated Description - only show if we have real data */}
              {(description || deal.description) && (
                <section className="prose max-w-none">
                  <h2>About This Deal</h2>
                  {description && <p>{description}</p>}
                  {deal.description && (
                    <p>{deal.description}</p>
                  )}
                </section>
              )}

              {/* Store Info */}
              {storeDescription && (
                <section>
                  <h2 className="text-xl font-bold text-charcoal mb-4">
                    About {storeName}
                  </h2>
                  <p className="text-slate mb-4">
                    {storeDescription}
                  </p>
                  {storeSlug && (
                    <Link
                      href={`/stores/${storeSlug}`}
                      className="inline-flex items-center gap-1 text-maple-red hover:underline font-medium"
                    >
                      View all {storeName} deals →
                    </Link>
                  )}
                </section>
              )}

              {/* FAQ Section - only show if we have REAL store-specific FAQs */}
              {faqs.length > 0 && (
                <section>
                  <h2 className="text-xl font-bold text-charcoal mb-4">
                    Frequently Asked Questions
                  </h2>
                  <div className="space-y-4">
                    {faqs.map((faq, index) => (
                      <div key={index} className="border border-silver-light rounded-card p-4">
                        <h3 className="font-semibold text-charcoal mb-2">
                          {faq.question}
                        </h3>
                        <p className="text-slate text-sm">
                          {faq.answer}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Related Deals Grid - show when no other content OR always show affiliated deals */}
              {affiliatedRelatedDeals.length > 0 && (
                <section>
                  <h2 className="text-xl font-bold text-charcoal mb-4">
                    More Deals You Might Like
                  </h2>
                  <DealGrid>
                    {affiliatedRelatedDeals.slice(0, 8).map(related => (
                      <DealCard
                        key={related.id}
                        id={related.id}
                        title={related.title}
                        slug={related.slug}
                        imageUrl={related.image_blob_url || related.image_url || undefined}
                        price={related.price}
                        originalPrice={related.original_price}
                        discountPercent={related.discount_percent}
                        store={related.store}
                        affiliateUrl={related.affiliate_url}
                      />
                    ))}
                  </DealGrid>
                </section>
              )}
            </div>

            {/* Sidebar (1 col) */}
            <div className="space-y-6">
              {/* Sticky CTA (desktop) */}
              <div className="sticky top-4 space-y-4 hidden md:block">
                <div className="bg-white border border-silver-light rounded-card p-4 shadow-card">
                  <PriceDisplay
                    currentPrice={deal.price}
                    originalPrice={deal.original_price}
                    discountPercent={deal.discount_percent}
                    size="md"
                  />
                  <div className="mt-4">
                    <CTAButton
                      href={deal.affiliate_url}
                      storeName={storeName}
                      size="lg"
                    />
                  </div>
                </div>

                {/* Related Deals - only affiliated */}
                {affiliatedRelatedDeals.length > 0 && (
                  <div className="bg-ivory rounded-card p-4">
                    <h3 className="font-bold text-charcoal mb-3">
                      Related Deals
                    </h3>
                    <div className="space-y-3">
                      {affiliatedRelatedDeals.slice(0, 4).map(related => (
                        <a
                          key={related.id}
                          href={related.affiliate_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block group"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-warm-grey rounded-lg overflow-hidden flex-shrink-0">
                              {(related.image_blob_url || related.image_url) && (
                                <Image
                                  src={related.image_blob_url || related.image_url || ''}
                                  alt={related.title}
                                  width={48}
                                  height={48}
                                  className="object-cover w-full h-full"
                                  onError={(e) => { e.currentTarget.style.display = 'none' }}
                                />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-sm font-medium text-charcoal truncate group-hover:text-maple-red">
                                {related.title}
                              </div>
                              {related.price && related.price > 0 && (
                                <div className="text-sm text-maple-red font-bold">
                                  ${formatPrice(related.price)}
                                </div>
                              )}
                            </div>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>

        {/* Sticky Mobile CTA */}
        <StickyMobileCTA
          href={deal.affiliate_url}
          price={deal.price}
          storeName={storeName}
        />
      </div>

      <Footer />
    </>
  )
}
