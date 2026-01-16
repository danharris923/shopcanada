import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ExternalLink } from 'lucide-react'

import {
  getCostcoProductBySlug,
  getCostcoPriceHistory,
  getRelatedCostcoProducts,
  getAllCostcoSlugs,
} from '@/lib/db'
import { CostcoProduct } from '@/types/costco'
import { SITE_URL, REVALIDATE_INTERVAL } from '@/lib/config'

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { StatsBar } from '@/components/StatsBar'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { PriceRangeDisplay } from '@/components/costco/PriceRangeDisplay'
import { WarehouseBadge } from '@/components/costco/WarehouseBadge'
import { PriceHistoryChart } from '@/components/costco/PriceHistoryChart'
import { CostcoDealCard, CostcoDealGrid } from '@/components/costco/CostcoDealCard'

// ISR - revalidate every 15 minutes
export const revalidate = REVALIDATE_INTERVAL

interface PageProps {
  params: { slug: string }
}

// Generate static pages for all Costco products
export async function generateStaticParams() {
  try {
    const slugs = await getAllCostcoSlugs()
    return slugs.map(slug => ({ slug }))
  } catch (error) {
    return []
  }
}

// Generate metadata with SEO optimization
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const product = await getCostcoProductBySlug(params.slug)

  if (!product) {
    return { title: 'Product Not Found' }
  }

  const priceDisplay = formatPriceForMeta(product)
  const title = `${product.name} - ${priceDisplay} at Costco Canada | Shop Canada`
  const description = generateMetaDescription(product)
  const imageUrl = product.image_url || '/placeholder-deal.jpg'
  const canonicalUrl = `${SITE_URL}/deals/costco/${product.slug}`

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
      images: [{ url: imageUrl, width: 800, height: 600, alt: product.name }],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
  }
}

function formatPriceForMeta(product: CostcoProduct): string {
  const minPrice = product.current_price_min ?? product.current_price
  const maxPrice = product.current_price_max ?? product.current_price

  if (minPrice === null || minPrice === undefined) return 'Price varies'

  // Ensure it's a number
  const minNum = typeof minPrice === 'number' ? minPrice : parseFloat(String(minPrice))
  const maxNum = typeof maxPrice === 'number' ? maxPrice : parseFloat(String(maxPrice))

  if (isNaN(minNum)) return 'Price varies'

  if (!isNaN(maxNum) && minNum !== maxNum) {
    return `$${minNum.toFixed(2)}-$${maxNum.toFixed(2)}`
  }

  return `$${minNum.toFixed(2)}`
}

function generateMetaDescription(product: CostcoProduct): string {
  const parts: string[] = []

  // Price info - ensure numbers
  const minPrice = product.current_price_min ?? product.current_price
  if (minPrice !== null && minPrice !== undefined) {
    const minNum = typeof minPrice === 'number' ? minPrice : parseFloat(String(minPrice))
    const maxPrice = product.current_price_max ?? product.current_price
    const maxNum = maxPrice !== null ? (typeof maxPrice === 'number' ? maxPrice : parseFloat(String(maxPrice))) : NaN

    if (!isNaN(minNum)) {
      if (!isNaN(maxNum) && minNum !== maxNum) {
        parts.push(`Currently $${minNum.toFixed(2)}-$${maxNum.toFixed(2)}`)
      } else {
        parts.push(`Currently $${minNum.toFixed(2)}`)
      }
    }
  }

  // Warehouse availability
  if (product.warehouses_reporting && product.warehouses_reporting > 0) {
    parts.push(`across ${product.warehouses_reporting} Costco locations`)
  }

  // Category
  if (product.category) {
    parts.push(`in ${product.category}`)
  }

  return `Track Costco prices for ${product.name}. ${parts.join(' ')}. See price history and compare warehouse prices across Canada.`
}

function generateCostcoBreadcrumbs(product: CostcoProduct): Array<{ label: string; href?: string }> {
  const breadcrumbs: Array<{ label: string; href?: string }> = [
    { label: 'Home', href: '/' },
    { label: 'Costco', href: '/deals/costco' },
  ]

  if (product.category) {
    breadcrumbs.push({
      label: product.category,
      href: `/deals/costco?category=${encodeURIComponent(product.category)}`,
    })
  }

  breadcrumbs.push({ label: product.name })

  return breadcrumbs
}

function generateProductSchema(product: CostcoProduct) {
  const minPrice = product.current_price_min ?? product.current_price
  const maxPrice = product.current_price_max ?? product.current_price

  // Ensure prices are numbers
  const minNum = minPrice !== null ? (typeof minPrice === 'number' ? minPrice : parseFloat(String(minPrice))) : null
  const maxNum = maxPrice !== null ? (typeof maxPrice === 'number' ? maxPrice : parseFloat(String(maxPrice))) : null

  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: product.image_url,
    url: `${SITE_URL}/deals/costco/${product.slug}`,
    sku: product.item_id,
    brand: {
      '@type': 'Brand',
      name: 'Costco',
    },
  }

  // Use AggregateOffer for price range
  if (minNum !== null && !isNaN(minNum)) {
    if (maxNum !== null && !isNaN(maxNum) && minNum !== maxNum) {
      schema.offers = {
        '@type': 'AggregateOffer',
        priceCurrency: 'CAD',
        lowPrice: minNum.toFixed(2),
        highPrice: maxNum.toFixed(2),
        offerCount: product.warehouses_reporting?.toString() || '1',
        availability: 'https://schema.org/InStock',
      }
    } else {
      schema.offers = {
        '@type': 'Offer',
        priceCurrency: 'CAD',
        price: minNum.toFixed(2),
        availability: 'https://schema.org/InStock',
        seller: {
          '@type': 'Organization',
          name: 'Costco Canada',
        },
      }
    }
  }

  return schema
}

function generateBreadcrumbSchema(product: CostcoProduct) {
  const breadcrumbs = generateCostcoBreadcrumbs(product)

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs
      .filter((crumb): crumb is { label: string; href: string } => !!crumb.href)
      .map((crumb, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: crumb.label,
        item: crumb.href.startsWith('http') ? crumb.href : `${SITE_URL}${crumb.href}`,
      })),
  }
}

export default async function CostcoDealPage({ params }: PageProps) {
  let product = null
  try {
    product = await getCostcoProductBySlug(params.slug)
  } catch (error) {
    notFound()
  }

  if (!product) {
    notFound()
  }

  // Fetch price history and related products
  let priceHistory: Awaited<ReturnType<typeof getCostcoPriceHistory>> = []
  let relatedProducts: CostcoProduct[] = []

  try {
    ;[priceHistory, relatedProducts] = await Promise.all([
      getCostcoPriceHistory(product.id, 30),
      getRelatedCostcoProducts(product, 8),
    ])
  } catch (error) {
    // Continue with empty arrays
  }

  const breadcrumbs = generateCostcoBreadcrumbs(product)
  const productSchema = generateProductSchema(product)
  const breadcrumbSchema = generateBreadcrumbSchema(product)
  const schemas = [productSchema, breadcrumbSchema]

  const imageUrl = product.image_url || '/placeholder-deal.jpg'
  const costcoSearchUrl = `https://www.costco.ca/CatalogSearch?keyword=${encodeURIComponent(product.item_id)}`

  return (
    <>
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemas),
        }}
      />

      <Header />

      <div className="min-h-screen bg-cream">
        {/* Stats Bar */}
        <StatsBar />

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 py-4">
          {/* Breadcrumbs */}
          <div className="mb-4">
            <Breadcrumbs items={breadcrumbs} />
          </div>

          {/* Hero Section */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Left: Product Image */}
            <div className="relative">
              {/* Costco Badge */}
              <div className="absolute top-4 left-4 z-10">
                <span className="bg-[#e31837] text-white px-3 py-1.5 rounded-lg font-bold text-sm shadow-md">
                  COSTCO
                </span>
              </div>

              {/* Image */}
              <div className="relative aspect-square bg-ivory rounded-card overflow-hidden">
                <Image
                  src={imageUrl}
                  alt={product.name}
                  fill
                  className="object-contain"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>

            {/* Right: Product Info */}
            <div className="flex flex-col">
              {/* Category Badge */}
              {product.category && (
                <div className="mb-3">
                  <Link
                    href={`/deals/costco?category=${encodeURIComponent(product.category)}`}
                    className="text-[#e31837] text-sm font-medium hover:underline uppercase tracking-wide"
                  >
                    {product.category}
                  </Link>
                </div>
              )}

              {/* Title */}
              <h1 className="text-2xl md:text-3xl font-bold text-charcoal mb-4">
                {product.name}
              </h1>

              {/* Price Display */}
              <div className="mb-4">
                <PriceRangeDisplay
                  priceMin={product.current_price_min}
                  priceMax={product.current_price_max}
                  currentPrice={product.current_price}
                  size="xl"
                />
              </div>

              {/* Warehouse Badge */}
              {product.warehouses_reporting && product.warehouses_reporting > 0 && (
                <div className="mb-6">
                  <WarehouseBadge
                    warehouseCount={product.warehouses_reporting}
                    size="md"
                  />
                </div>
              )}

              {/* CTA Button */}
              <div className="mb-6">
                <a
                  href={costcoSearchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full md:w-auto px-8 py-4 bg-[#e31837] hover:bg-[#c41230] text-white font-bold text-lg rounded-lg transition-colors shadow-md"
                >
                  <ExternalLink size={20} />
                  View on Costco.ca
                </a>
                <p className="text-xs text-muted mt-2">
                  Opens Costco Canada website
                </p>
              </div>

              {/* Product ID */}
              <div className="text-sm text-muted">
                Item #{product.item_id}
              </div>

              {/* Last Updated */}
              <div className="text-sm text-muted mt-2">
                Last updated: {new Date(product.last_updated_at).toLocaleDateString('en-CA')}
              </div>
            </div>
          </div>

          {/* Price History Section */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-charcoal mb-4">
              Price History
            </h2>
            <PriceHistoryChart
              history={priceHistory}
              currentPrice={product.current_price}
            />
          </div>

          {/* About Section */}
          <div className="mb-8 bg-white border border-silver-light rounded-card p-6">
            <h2 className="text-xl font-bold text-charcoal mb-4">
              About Costco Price Tracking
            </h2>
            <div className="prose max-w-none text-slate">
              <p>
                We track prices for this product across {product.warehouses_reporting || 'multiple'} Costco
                warehouse locations in Canada. Prices can vary by location, which is why you may see a
                price range displayed.
              </p>
              <p className="mt-3">
                Our price history helps you identify the best time to buy. If you see a recent price
                drop, it might be a good time to visit your local Costco!
              </p>
              <p className="mt-3 text-sm text-muted">
                Note: Prices and availability are subject to change. Always verify at your local Costco
                warehouse or on Costco.ca.
              </p>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <section className="mb-8">
              <h2 className="text-xl font-bold text-charcoal mb-4">
                Related Costco Products
              </h2>
              <CostcoDealGrid>
                {relatedProducts.map(related => (
                  <CostcoDealCard key={related.id} product={related} />
                ))}
              </CostcoDealGrid>
            </section>
          )}

          {/* Back to Costco */}
          <div className="text-center py-8">
            <Link
              href="/deals/costco"
              className="inline-flex items-center gap-2 text-maple-red hover:underline font-medium"
            >
              ← Browse all Costco products
            </Link>
          </div>
        </main>
      </div>

      <Footer />
    </>
  )
}
