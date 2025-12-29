import Link from 'next/link'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { CategorySidebar } from '@/components/category-sidebar'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { StatsBar } from '@/components/StatsBar'
import { DealCard, DealGrid } from '@/components/DealCard'
import { getStoreBySlug, getDealsByStore, getCanadianBrandSlugs, getRelatedCanadianBrands, getCanadianBrandCategories } from '@/lib/db'
import { getBrandStory, markdownToHtml } from '@/lib/brand-story'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const brand = await getStoreBySlug(slug)

  if (!brand) {
    return { title: 'Brand Not Found' }
  }

  return {
    title: `${brand.name} - Canadian Brand`,
    description: brand.description || brand.tagline || `Shop ${brand.name} products`,
  }
}

export async function generateStaticParams() {
  const slugs = await getCanadianBrandSlugs()
  return slugs.map((slug) => ({ slug }))
}

export default async function BrandPage({ params }: Props) {
  const { slug } = await params
  const brand = await getStoreBySlug(slug)

  if (!brand) {
    notFound()
  }

  // Fetch related data in parallel
  const [relatedBrands, deals, brandStoryMd, brandCategories] = await Promise.all([
    getRelatedCanadianBrands(brand, 6),
    getDealsByStore(slug),
    getBrandStory(slug),
    getCanadianBrandCategories()
  ])

  const previewDeals = deals.slice(0, 4)
  const hasMoreDeals = deals.length > 4

  // Get the primary category for breadcrumbs
  const primaryCategory = brand.top_categories?.[0] || 'Canadian'
  const categorySlug = primaryCategory.toLowerCase().replace(/\s+/g, '-')

  // Convert brand story markdown to HTML if exists
  const brandStoryHtml = brandStoryMd ? markdownToHtml(brandStoryMd) : null

  return (
    <>
      <Header />
      <StatsBar />
      <main className="min-h-screen bg-cream">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <Breadcrumbs variant="default" items={[
            { label: 'Home', href: '/' },
            { label: 'Canadian Brands', href: '/canadian/brands' },
            { label: primaryCategory, href: `/canadian/category/${categorySlug}` },
            { label: brand.name }
          ]} />

          <div className="flex gap-8 mt-8">
            <CategorySidebar activeCategory={categorySlug} categories={brandCategories} />

            <div className="flex-1">
              {/* Brand Hero */}
              <div className="mb-12 bg-white border border-silver-light rounded-card p-8 md:p-12">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8 mb-8">
                  <div className="w-24 h-24 md:w-32 md:h-32 bg-cream border border-maple-red flex items-center justify-center rounded-card overflow-hidden">
                    {brand.logo_url ? (
                      <img
                        src={brand.logo_url}
                        alt={`${brand.name} logo`}
                        className="w-full h-full object-contain p-2"
                      />
                    ) : (
                      <span className="text-5xl md:text-6xl"></span>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="inline-block mb-2 px-3 py-1 bg-burgundy text-white text-xs tracking-widest rounded">
                      CANADIAN {primaryCategory.toUpperCase()}
                    </div>
                    <h1 className="text-3xl md:text-5xl font-bold text-charcoal mb-2">{brand.name}</h1>
                    <p className="text-lg md:text-xl text-slate">
                      {brand.province ? `Proudly Canadian - ${brand.province}` : 'Proudly Canadian'}
                    </p>
                  </div>
                </div>

                <p className="text-base md:text-lg text-charcoal leading-relaxed mb-8">
                  {brand.description || brand.tagline || `Discover quality products from ${brand.name}`}
                </p>

                {/* Badges */}
                {brand.badges && brand.badges.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {brand.badges.map((badge, idx) => (
                      <span key={idx} className="px-3 py-1 bg-ivory text-slate text-sm rounded-full">
                        {badge}
                      </span>
                    ))}
                  </div>
                )}

                {brand.affiliate_url && (
                  <a
                    href={brand.affiliate_url}
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                    className="btn-secondary text-center inline-block"
                  >
                    Shop Now
                  </a>
                )}
              </div>

              {/* Deals Section - Only show if deals exist */}
              {deals.length > 0 && (
                <section className="mb-12">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-charcoal">
                      Latest {brand.name} Deals
                    </h2>
                    {hasMoreDeals && (
                      <Link
                        href={`/stores/${slug}`}
                        className="text-maple-red hover:text-burgundy font-semibold transition-colors"
                      >
                        View All {deals.length} Deals
                      </Link>
                    )}
                  </div>
                  <DealGrid>
                    {previewDeals.map((deal: any) => (
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
                        href={`/stores/${slug}`}
                        className="btn-primary inline-block"
                      >
                        Show All {deals.length} Deals
                      </Link>
                    </div>
                  )}
                </section>
              )}

              {/* Website Link */}
              {brand.website_url && (
                <div className="mb-12 p-6 bg-ivory rounded-card border border-silver-light">
                  <h2 className="text-lg font-bold text-charcoal mb-3">Visit {brand.name}</h2>
                  <a
                    href={brand.affiliate_url || brand.website_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary inline-block"
                  >
                    Visit {brand.name} Website
                  </a>
                </div>
              )}

              {/* Brand Story (only if available) */}
              {brandStoryHtml && (
                <div className="mb-12 p-8 bg-ivory rounded-card border border-maple-red/30">
                  <h2 className="text-2xl md:text-3xl font-bold text-burgundy mb-6">The {brand.name} Story</h2>
                  <div className="prose max-w-none">
                    <div
                      className="text-charcoal leading-relaxed space-y-4"
                      dangerouslySetInnerHTML={{ __html: brandStoryHtml }}
                    />
                  </div>
                </div>
              )}

              {/* Store Policies */}
              {(brand.return_policy || brand.shipping_info || brand.price_match_policy) && (
                <div className="mb-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {brand.return_policy && (
                    <div className="p-6 bg-white border border-silver-light rounded-card">
                      <h3 className="font-bold text-charcoal mb-2">Return Policy</h3>
                      <p className="text-sm text-slate">{brand.return_policy}</p>
                    </div>
                  )}
                  {brand.shipping_info && (
                    <div className="p-6 bg-white border border-silver-light rounded-card">
                      <h3 className="font-bold text-charcoal mb-2">Shipping Info</h3>
                      <p className="text-sm text-slate">{brand.shipping_info}</p>
                    </div>
                  )}
                  {brand.price_match_policy && (
                    <div className="p-6 bg-white border border-silver-light rounded-card">
                      <h3 className="font-bold text-charcoal mb-2">Price Match</h3>
                      <p className="text-sm text-slate">{brand.price_match_policy}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Loyalty Program */}
              {brand.loyalty_program_name && (
                <div className="mb-12 p-6 bg-maple-red/10 border border-maple-red/30 rounded-card">
                  <h3 className="font-bold text-maple-red mb-2">{brand.loyalty_program_name}</h3>
                  {brand.loyalty_program_desc && (
                    <p className="text-sm text-charcoal">{brand.loyalty_program_desc}</p>
                  )}
                </div>
              )}

              {/* Related Brands */}
              {relatedBrands.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-maple-red mb-6">
                    More Canadian {primaryCategory} Brands:
                  </h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {relatedBrands.map((relatedBrand) => (
                      <Link
                        key={relatedBrand.slug}
                        href={`/canadian/brand/${relatedBrand.slug}`}
                        className="group bg-white border border-silver-light rounded-card p-6 hover:border-maple-red transition-all hover:-translate-y-1"
                      >
                        <div className="mb-4 h-20 flex items-center justify-center">
                          {relatedBrand.logo_url ? (
                            <img
                              src={relatedBrand.logo_url}
                              alt={`${relatedBrand.name} logo`}
                              className="max-h-full max-w-full object-contain"
                            />
                          ) : (
                            <span className="text-4xl"></span>
                          )}
                        </div>
                        <h3 className="text-lg font-bold text-charcoal mb-2 group-hover:text-maple-red">
                          {relatedBrand.name}
                        </h3>
                        <p className="text-sm text-slate line-clamp-2">
                          {relatedBrand.description || relatedBrand.tagline}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Back Navigation */}
              <div className="mt-12 pt-8 border-t border-silver-light flex flex-wrap gap-4">
                <Link
                  href={`/canadian/category/${categorySlug}`}
                  className="btn-secondary"
                >
                  Back to {primaryCategory} Brands
                </Link>
                <Link
                  href="/canadian/categories"
                  className="btn-secondary"
                >
                  View All Categories
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
