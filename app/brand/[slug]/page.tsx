import Link from 'next/link'
import { brands, getBrandBySlug, getRelatedBrands, getCategoryBySlug } from '@/lib/brands-data'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { CategorySidebar } from '@/components/category-sidebar'
import { notFound } from 'next/navigation'

export function generateStaticParams() {
  return brands.map((brand) => ({
    slug: brand.slug,
  }))
}

export default async function BrandPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const brand = getBrandBySlug(slug)

  if (!brand) {
    notFound()
  }

  const relatedBrands = getRelatedBrands(brand, 6)
  const categorySlug = brand.category.toLowerCase().replace(/\s+/g, '-')
  const category = getCategoryBySlug(categorySlug)

  return (
    <main className="min-h-screen bg-[#0f1410]">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <Breadcrumbs items={[
          { label: 'Home', href: '/' },
          { label: 'Categories', href: '/categories' },
          { label: brand.category, href: `/category/${categorySlug}` },
          { label: brand.name }
        ]} />

        <div className="flex gap-8 mt-8">
          <CategorySidebar activeCategory={categorySlug} />

          <div className="flex-1">
            {/* Brand Hero */}
            <div className="mb-12 bg-[#f5f0e8] border-4 border-[#3a4a3a] p-12">
              <div className="flex items-center gap-8 mb-8">
                <div className="w-32 h-32 bg-[#0f1410] border-2 border-[#b8860b] flex items-center justify-center">
                  <span className="text-6xl">🍁</span>
                </div>
                <div className="flex-1">
                  <div className="inline-block mb-2 px-3 py-1 bg-[#5c1a1a] text-[#b8860b] text-xs tracking-widest border border-[#b8860b]">
                    CANADIAN {brand.category.toUpperCase()}
                  </div>
                  <h1 className="text-5xl font-serif text-[#2a2a2a] mb-2">{brand.name}</h1>
                  <p className="text-xl text-[#5a5a5a]">
                    Proudly Canadian
                  </p>
                </div>
              </div>

              <p className="text-lg text-[#2a2a2a] leading-relaxed mb-8">
                {brand.description}
              </p>

              {/* External Links */}
              <div className="flex gap-4 flex-wrap">
                <a
                  href={brand.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-8 py-4 bg-[#b8860b] text-[#0f1410] font-bold hover:bg-[#d4a520] transition-colors"
                >
                  Visit {brand.name} →
                </a>

                {brand.amazonLink && (
                  <a
                    href={brand.amazonLink}
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                    className="inline-block px-8 py-4 bg-transparent text-[#b8860b] font-bold border-2 border-[#b8860b] hover:bg-[#5c1a1a] transition-colors"
                  >
                    {brand.buttonText || 'Shop Now 🛒'}
                  </a>
                )}
              </div>
            </div>

            {/* Brand Story Section */}
            <div className="mb-12 p-8 bg-[#1a2a1a] border-2 border-[#3a4a3a]">
              <h2 className="text-3xl font-serif text-[#b8860b] mb-4">Why Choose {brand.name}?</h2>
              <div className="space-y-4 text-[#b8a896] leading-relaxed">
                <p>
                  {brand.name} represents the best of Canadian {brand.category.toLowerCase()} - combining quality
                  craftsmanship, ethical manufacturing, and a commitment to supporting local communities.
                </p>
                <p>
                  By choosing {brand.name}, you're not just buying a product - you're supporting Canadian jobs,
                  manufacturing expertise, and the economic stability of our communities.
                </p>
              </div>
            </div>

            {/* Extended Brand Story (only if available) */}
            {brand.brandStory && (
              <div className="mb-12 p-8 bg-[#f5f0e8] border-4 border-[#b8860b]/30">
                <h2 className="text-3xl font-serif text-[#5c1a1a] mb-6">The {brand.name} Story</h2>
                <div className="prose max-w-none">
                  <div
                    className="text-[#2a2a2a] leading-relaxed space-y-4"
                    dangerouslySetInnerHTML={{ __html: brand.brandStory }}
                  />
                </div>
              </div>
            )}

            {/* Affiliate Products Section (only if available) */}
            {brand.affiliateProducts && brand.affiliateProducts.length > 0 && (
              <div className="mb-12">
                <h2 className="text-3xl font-serif text-[#b8860b] mb-6">
                  Popular {brand.name} Products
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {brand.affiliateProducts.map((product, idx) => (
                    <a
                      key={idx}
                      href={product.url}
                      target="_blank"
                      rel="nofollow noopener noreferrer"
                      className="group bg-[#1a2a1a] border-2 border-[#3a4a3a] p-6 hover:border-[#b8860b] transition-all hover:-translate-y-1"
                    >
                      {product.image && (
                        <div className="mb-4 h-48 flex items-center justify-center bg-[#0f1410] border border-[#3a4a3a]">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="max-h-full max-w-full object-contain"
                          />
                        </div>
                      )}
                      <h3 className="text-lg font-bold text-[#f4ede4] mb-2 group-hover:text-[#b8860b]">
                        {product.name}
                      </h3>
                      <button className="w-full px-4 py-2 bg-[#b8860b] text-[#0f1410] text-sm font-bold hover:bg-[#d4a520] mt-4">
                        Shop Now →
                      </button>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Related Brands */}
            {relatedBrands.length > 0 && (
              <div className="mb-8">
                <h2 className="text-3xl font-serif text-[#b8860b] mb-6">
                  More Canadian {brand.category} Brands:
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {relatedBrands.map((relatedBrand) => (
                    <Link
                      key={relatedBrand.slug}
                      href={`/brand/${relatedBrand.slug}`}
                      className="group bg-[#1a2a1a] border-2 border-[#3a4a3a] p-6 hover:border-[#b8860b] transition-all hover:-translate-y-1"
                    >
                      <div className="mb-4 h-20 flex items-center justify-center">
                        <span className="text-4xl">🍁</span>
                      </div>
                      <h3 className="text-lg font-bold text-[#f4ede4] mb-2 group-hover:text-[#b8860b]">
                        {relatedBrand.name}
                      </h3>
                      <p className="text-sm text-[#b8a896] line-clamp-2">
                        {relatedBrand.description}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Back Navigation */}
            <div className="mt-12 pt-8 border-t-2 border-[#3a4a3a] flex gap-4">
              <Link
                href={`/category/${categorySlug}`}
                className="px-6 py-3 bg-[#1a2a1a] border-2 border-[#3a4a3a] text-[#b8860b] hover:border-[#b8860b] font-bold transition-colors"
              >
                ← Back to {brand.category} Brands
              </Link>
              <Link
                href="/categories"
                className="px-6 py-3 bg-[#1a2a1a] border-2 border-[#3a4a3a] text-[#b8860b] hover:border-[#b8860b] font-bold transition-colors"
              >
                ← View All Categories
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
