import { Leaf } from 'lucide-react'
import Link from 'next/link'
import { brands, getBrandBySlug, getRelatedBrands, getCategoryBySlug } from '@/lib/brands-data'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { CategorySidebar } from '@/components/category-sidebar'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const brand = getBrandBySlug(slug)

  if (!brand) {
    return { title: 'Brand Not Found' }
  }

  return {
    title: `${brand.name} - Canadian Brand`,
    description: brand.description,
  }
}

export function generateStaticParams() {
  return brands.map((brand) => ({
    slug: brand.slug,
  }))
}

export default async function BrandPage({ params }: Props) {
  const { slug } = await params
  const brand = getBrandBySlug(slug)

  if (!brand) {
    notFound()
  }

  const relatedBrands = getRelatedBrands(brand, 6)
  const categorySlug = brand.category.toLowerCase().replace(/\s+/g, '-')
  const category = getCategoryBySlug(categorySlug)

  return (
    <>
      <Header />
      <main className="min-h-screen bg-cream">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <Breadcrumbs items={[
            { label: 'Home', href: '/' },
            { label: 'Canadian Brands', href: '/canadian' },
            { label: brand.category, href: `/canadian/category/${categorySlug}` },
            { label: brand.name }
          ]} />

          <div className="flex gap-8 mt-8">
            <CategorySidebar activeCategory={categorySlug} />

            <div className="flex-1">
              {/* Brand Hero */}
              <div className="mb-12 bg-white border border-silver-light rounded-card p-8 md:p-12">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8 mb-8">
                  <div className="w-24 h-24 md:w-32 md:h-32 bg-cream border border-maple-red flex items-center justify-center rounded-card overflow-hidden">
                    {brand.logo ? (
                      <img
                        src={brand.logo}
                        alt={`${brand.name} logo`}
                        className="w-full h-full object-contain p-2"
                      />
                    ) : (
                      <span className="text-5xl md:text-6xl"></span>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="inline-block mb-2 px-3 py-1 bg-burgundy text-white text-xs tracking-widest rounded">
                      CANADIAN {brand.category.toUpperCase()}
                    </div>
                    <h1 className="text-3xl md:text-5xl font-bold text-charcoal mb-2">{brand.name}</h1>
                    <p className="text-lg md:text-xl text-slate">
                      Proudly Canadian
                    </p>
                  </div>
                </div>

                <p className="text-base md:text-lg text-charcoal leading-relaxed mb-8">
                  {brand.description}
                </p>

                {brand.amazonLink && (
                  <a
                    href={brand.amazonLink}
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                    className="btn-secondary text-center inline-block"
                  >
                    {brand.buttonText || 'Shop Now 🛒'}
                  </a>
                )}
              </div>

              {/* Website Screenshot with Visit Button */}
              {brand.screenshot && (
                <div className="mb-12 relative group">
                  <a
                    href={brand.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block relative overflow-hidden rounded-card border border-silver-light hover:border-maple-red transition-all"
                  >
                    <img
                      src={brand.screenshot}
                      alt={`${brand.name} website preview`}
                      className="w-full h-auto"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform">
                      <span className="btn-primary inline-block">
                        Visit {brand.name} →
                      </span>
                    </div>
                  </a>
                </div>
              )}


              {/* Brand Story (only if available) */}
              {brand.brandStory && (
                <div className="mb-12 p-8 bg-ivory rounded-card border border-maple-red/30">
                  <h2 className="text-2xl md:text-3xl font-bold text-burgundy mb-6">The {brand.name} Story</h2>
                  <div className="prose max-w-none">
                    <div
                      className="text-charcoal leading-relaxed space-y-4"
                      dangerouslySetInnerHTML={{ __html: brand.brandStory }}
                    />
                  </div>
                </div>
              )}

              {/* Affiliate Products Section (only if available) */}
              {brand.affiliateProducts && brand.affiliateProducts.length > 0 && (
                <div className="mb-12">
                  <h2 className="text-2xl md:text-3xl font-bold text-maple-red mb-6">
                    Popular {brand.name} Products
                  </h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {brand.affiliateProducts.map((product, idx) => (
                      <a
                        key={idx}
                        href={product.url}
                        target="_blank"
                        rel="nofollow noopener noreferrer"
                        className="group bg-white border border-silver-light rounded-card p-6 hover:border-maple-red transition-all hover:-translate-y-1"
                      >
                        {product.image && (
                          <div className="mb-4 h-48 flex items-center justify-center bg-cream rounded-lg border border-silver-light">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="max-h-full max-w-full object-contain"
                            />
                          </div>
                        )}
                        <h3 className="text-lg font-bold text-charcoal mb-2 group-hover:text-maple-red">
                          {product.name}
                        </h3>
                        <span className="block w-full px-4 py-2 bg-maple-red text-white text-sm font-bold text-center hover:bg-burgundy mt-4 rounded-button">
                          Shop Now →
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Related Brands */}
              {relatedBrands.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-maple-red mb-6">
                    More Canadian {brand.category} Brands:
                  </h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {relatedBrands.map((relatedBrand) => (
                      <Link
                        key={relatedBrand.slug}
                        href={`/canadian/brand/${relatedBrand.slug}`}
                        className="group bg-white border border-silver-light rounded-card p-6 hover:border-maple-red transition-all hover:-translate-y-1"
                      >
                        <div className="mb-4 h-20 flex items-center justify-center">
                          {relatedBrand.logo ? (
                            <img
                              src={relatedBrand.logo}
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
                          {relatedBrand.description}
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
                  ← Back to {brand.category} Brands
                </Link>
                <Link
                  href="/canadian/categories"
                  className="btn-secondary"
                >
                  ← View All Categories
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
