import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { MapPin } from 'lucide-react'
import { searchDeals, searchStoresByKeyword, searchCostcoProducts } from '@/lib/db'
import { searchFlippDeals } from '@/lib/flipp'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { DealCard, DealGrid, FlippDealGrid } from '@/components/DealCard'
import { StatsBar } from '@/components/StatsBar'

export const revalidate = 0 // Don't cache search results

interface SearchPageProps {
  searchParams: { q?: string }
}

export async function generateMetadata({ searchParams }: SearchPageProps): Promise<Metadata> {
  const query = searchParams.q || ''
  return {
    title: query ? `Search: ${query} | Shop Canada` : 'Search Results | Shop Canada',
    description: query
      ? `Search results for "${query}" - Find the best Canadian deals`
      : 'Search for deals across all Canadian retailers',
  }
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q?.trim() || ''
  const hasQuery = query.length >= 2

  // Search all sources in parallel
  // Priority: Affiliated stores > DB deals > Flipp > Costco (SEO only, no revenue)
  const [dbDeals, flippDeals, costcoProducts, matchingStores] = await Promise.all([
    hasQuery ? searchDeals(query, 30) : Promise.resolve([]),
    hasQuery ? searchFlippDeals(query, 20) : Promise.resolve([]),
    hasQuery ? searchCostcoProducts(query, 6) : Promise.resolve([]), // Limited - SEO only, no affiliate
    hasQuery ? searchStoresByKeyword(query, 12) : Promise.resolve([]),
  ])

  const totalResults = dbDeals.length + flippDeals.length + costcoProducts.length + matchingStores.length

  return (
    <>
      <Header />
      <main className="min-h-screen bg-page-bg">
        {/* Hero */}
        <section className="bg-soft-black py-12">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold text-white mb-4">
              Search Results
            </h1>
            {hasQuery ? (
              <p className="text-silver-light text-lg">
                {totalResults} result{totalResults !== 1 ? 's' : ''} for "{query}"
              </p>
            ) : (
              <p className="text-silver-light text-lg">
                Enter a search term to find deals across all Canadian retailers
              </p>
            )}
          </div>
        </section>

        {/* Stats Bar */}
        <StatsBar />

        {/* Results */}
        <section className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            {hasQuery ? (
              <>
                {/* Stores that sell this product */}
                {matchingStores.length > 0 && (
                  <div className="mb-12">
                    <h2 className="text-2xl font-bold text-heading mb-6">
                      Stores for "{query}" ({matchingStores.length})
                    </h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                      {matchingStores.map(store => (
                        <Link
                          key={store.slug}
                          href={`/stores/${store.slug}`}
                          className="bg-card-bg border border-card-border rounded-card p-4 shadow-card hover:shadow-card-hover hover:border-maple-red transition-all text-center group relative"
                        >
                          {store.affiliate_url && (
                            <span className="absolute top-2 right-2 text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded">
                              Partner
                            </span>
                          )}
                          {store.logo_url ? (
                            <img
                              src={store.logo_url}
                              alt={store.name}
                              className="w-12 h-12 mx-auto mb-2 object-contain rounded"
                            />
                          ) : (
                            <div className="w-12 h-12 mx-auto mb-2 bg-cream rounded flex items-center justify-center text-xl">
                              {store.name.charAt(0)}
                            </div>
                          )}
                          <span className="font-semibold text-heading text-sm group-hover:text-maple-red transition-colors block">
                            {store.name}
                          </span>
                          {store.keywords && store.keywords.length > 0 && (
                            <span className="text-xs text-muted mt-1 block truncate">
                              {store.keywords.slice(0, 3).join(', ')}
                            </span>
                          )}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* DB Deals */}
                {dbDeals.length > 0 && (
                  <div className="mb-12">
                    <h2 className="text-2xl font-bold text-heading mb-6">
                      Deals ({dbDeals.length})
                    </h2>
                    <DealGrid>
                      {dbDeals.map(deal => (
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
                  </div>
                )}

                {/* Flipp Deals */}
                {flippDeals.length > 0 && (
                  <div className="mb-12">
                    <h2 className="text-2xl font-bold text-heading mb-6">
                      Flyer Deals ({flippDeals.length})
                    </h2>
                    <FlippDealGrid>
                      {flippDeals.map(deal => (
                        <DealCard
                          key={deal.id}
                          id={deal.id}
                          title={deal.title}
                          slug={deal.slug}
                          imageUrl={deal.imageUrl}
                          price={deal.price}
                          originalPrice={deal.originalPrice}
                          discountPercent={deal.discountPercent}
                          store={deal.store}
                          affiliateUrl=""
                          variant="flipp"
                          storeSlug={deal.storeSlug}
                          storeLogo={deal.storeLogo}
                          validTo={deal.validTo}
                          saleStory={deal.saleStory}
                        />
                      ))}
                    </FlippDealGrid>
                  </div>
                )}

                {/* Costco Products - Display like Flipp, direct links to costco.ca */}
                {costcoProducts.length > 0 && (
                  <div className="mb-12 pt-8 border-t border-silver-light">
                    <h3 className="text-lg font-semibold text-muted mb-4">
                      Costco Products ({costcoProducts.length})
                    </h3>
                    <FlippDealGrid>
                      {costcoProducts.map(product => {
                        const costcoUrl = `https://www.costco.ca/CatalogSearch?dept=All&keyword=${encodeURIComponent(product.name)}`
                        const minPrice = product.current_price_min ?? product.current_price
                        const maxPrice = product.current_price_max ?? product.current_price
                        const hasPriceRange = minPrice !== null && maxPrice !== null && minPrice !== maxPrice
                        const formatPrice = (price: number) => price.toLocaleString('en-CA', { style: 'currency', currency: 'CAD' })

                        return (
                          <a
                            key={product.id}
                            href={costcoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="deal-card group block"
                          >
                            {/* Image Container */}
                            <div className="relative aspect-square bg-cream">
                              {/* Costco Badge */}
                              <div className="absolute top-2 left-2 z-10">
                                <span className="bg-[#e31837] text-white px-2 py-1 rounded-lg font-bold text-xs shadow-md">
                                  COSTCO
                                </span>
                              </div>
                              {/* Warehouse Badge */}
                              {product.warehouses_reporting && product.warehouses_reporting > 0 && (
                                <div className="absolute top-2 right-2 z-10">
                                  <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium shadow-md ${product.warehouses_reporting < 50 ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'}`}>
                                    <MapPin size={10} />
                                    {product.warehouses_reporting}
                                  </span>
                                </div>
                              )}
                              <Image
                                src={product.image_url || '/placeholder-deal.jpg'}
                                alt={product.name}
                                fill
                                className="object-contain p-4 group-hover:scale-105 transition-transform duration-200"
                                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                              />
                            </div>
                            {/* Content */}
                            <div className="p-4">
                              {product.category && (
                                <div className="flex items-center gap-1.5 mb-1">
                                  <span className="deal-card-store uppercase tracking-wide text-[#e31837]">
                                    {product.category}
                                  </span>
                                </div>
                              )}
                              <h3 className="deal-card-title mb-2 line-clamp-2 group-hover:text-maple-red transition-colors">
                                {product.name}
                              </h3>
                              <div className="mb-3">
                                {minPrice !== null ? (
                                  hasPriceRange ? (
                                    <>
                                      <span className="deal-card-price">
                                        {formatPrice(minPrice)} - {formatPrice(maxPrice!)}
                                      </span>
                                      <span className="block text-xs text-muted mt-0.5">
                                        Price varies by location
                                      </span>
                                    </>
                                  ) : (
                                    <span className="deal-card-price">
                                      {formatPrice(minPrice)}
                                    </span>
                                  )
                                ) : (
                                  <span className="text-muted">Check store for price</span>
                                )}
                              </div>
                            </div>
                          </a>
                        )
                      })}
                    </FlippDealGrid>
                  </div>
                )}

                {/* No results */}
                {totalResults === 0 && (
                  <div className="text-center py-16">
                    <p className="text-body text-lg mb-4">
                      No deals found for "{query}"
                    </p>
                    <p className="text-meta mb-8">
                      Try a different search term or browse our{' '}
                      <Link href="/stores" className="text-maple-red hover:underline">
                        stores
                      </Link>
                    </p>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-16">
                <p className="text-body text-lg">
                  Use the search bar above to find deals
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
