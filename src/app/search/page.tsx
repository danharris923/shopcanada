import { Metadata } from 'next'
import Link from 'next/link'
import { searchDeals } from '@/lib/db'
import { searchFlippDeals } from '@/lib/flipp'
import { brands } from '@/lib/brands-data'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { DealCard, DealGrid } from '@/components/DealCard'
import { FlippDealCard, FlippDealGrid } from '@/components/FlippDealCard'

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

  // Search deals from DB
  const dbDeals = hasQuery ? await searchDeals(query, 30) : []

  // Search Flipp deals
  const flippDeals = hasQuery ? await searchFlippDeals(query, 20) : []

  // Search Canadian brands
  const matchingBrands = hasQuery
    ? brands.filter(
        b =>
          b.name.toLowerCase().includes(query.toLowerCase()) ||
          b.slug.toLowerCase().includes(query.toLowerCase()) ||
          (b.description && b.description.toLowerCase().includes(query.toLowerCase()))
      ).slice(0, 12)
    : []

  const totalResults = dbDeals.length + flippDeals.length + matchingBrands.length

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

        {/* Results */}
        <section className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            {hasQuery ? (
              <>
                {/* Canadian Brands */}
                {matchingBrands.length > 0 && (
                  <div className="mb-12">
                    <h2 className="text-2xl font-bold text-heading mb-6">
                      Canadian Brands ({matchingBrands.length})
                    </h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                      {matchingBrands.map(brand => (
                        <Link
                          key={brand.slug}
                          href={`/canadian/brand/${brand.slug}`}
                          className="bg-card-bg border border-card-border rounded-card p-4 shadow-card hover:shadow-card-hover hover:border-maple-red transition-all text-center group"
                        >
                          {brand.logo ? (
                            <img
                              src={brand.logo}
                              alt={brand.name}
                              className="w-12 h-12 mx-auto mb-2 object-contain rounded"
                            />
                          ) : (
                            <div className="w-12 h-12 mx-auto mb-2 bg-cream rounded flex items-center justify-center text-xl">
                              {brand.name.charAt(0)}
                            </div>
                          )}
                          <span className="font-semibold text-heading text-sm group-hover:text-maple-red transition-colors">
                            {brand.name}
                          </span>
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
                          store={deal.store || 'Unknown'}
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
                        <FlippDealCard key={deal.id} deal={deal} />
                      ))}
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
