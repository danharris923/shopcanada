import Link from 'next/link'
import { brands, categories, getCategoryBySlug } from '@/lib/brands-data'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { CategoryIcon } from '@/components/CategoryIcon'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const category = getCategoryBySlug(slug)

  if (!category) {
    return { title: 'Category Not Found' }
  }

  return {
    title: `${category.name} - Canadian Brands`,
    description: category.seoBlurb || `Browse Canadian ${category.name.toLowerCase()} brands. Support local businesses.`,
  }
}

export async function generateStaticParams() {
  return categories.map((category) => ({
    slug: category.slug,
  }))
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params
  const category = getCategoryBySlug(slug)

  if (!category) {
    notFound()
  }

  const categoryBrands = brands.filter(
    brand => brand.category.toLowerCase() === category.name.toLowerCase()
  )

  return (
    <>
      <Header />
      <main className="bg-cream min-h-screen">
        {/* Hero Section - matching home page style */}
        <section className="relative">
          <picture>
            <source media="(min-width: 768px)" srcSet="/hero-desktop.png" />
            <img
              src="/hero-mobile.png"
              alt={`Canadian ${category.name} Brands`}
              className="w-full h-auto"
            />
          </picture>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full max-w-7xl mx-auto px-4 flex flex-col items-end">
              <Link href="/canadian/categories" className="text-white/80 hover:text-white text-sm mb-2 drop-shadow">
                &larr; Back to Categories
              </Link>
              <div className="flex items-center gap-3 mb-2">
                <CategoryIcon category={category.name} size={48} className="text-white drop-shadow" />
                <h1 className="text-3xl md:text-5xl font-bold text-white drop-shadow-lg text-right">
                  {category.name}
                </h1>
              </div>
              <p className="text-white/90 text-sm md:text-lg drop-shadow text-right max-w-xl">
                {category.seoBlurb || `Discover quality Canadian ${category.name.toLowerCase()} brands.`}
              </p>
              <p className="text-white font-bold mt-2 drop-shadow text-right">
                {categoryBrands.length} Canadian brands
              </p>
            </div>
          </div>
        </section>

        {/* Brands Grid */}
        <section className="py-12 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categoryBrands.map(brand => (
                <div
                  key={brand.slug}
                  className="bg-white border border-silver-light hover:border-maple-red transition-all p-6 rounded-card"
                >
                  <div className="flex items-center gap-3 mb-3">
                    {brand.logo ? (
                      <img
                        src={brand.logo}
                        alt={`${brand.name} logo`}
                        className="w-12 h-12 rounded object-contain bg-cream flex-shrink-0"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded bg-cream flex items-center justify-center flex-shrink-0 text-2xl">
                        🍁
                      </div>
                    )}
                    <h3 className="text-xl font-bold text-charcoal">
                      {brand.name}
                    </h3>
                  </div>
                  <p className="text-slate text-sm mb-4 line-clamp-3">
                    {brand.description}
                  </p>
                  <div className="flex flex-col gap-2">
                    <Link
                      href={`/canadian/brand/${brand.slug}`}
                      className="text-center bg-maple-red hover:bg-burgundy text-white font-bold py-3 px-4 transition-colors rounded-button"
                    >
                      READ MORE
                    </Link>
                    {brand.amazonLink && (
                      <a
                        href={brand.amazonLink}
                        target="_blank"
                        rel="nofollow noopener noreferrer"
                        className="text-center border border-maple-red text-maple-red hover:bg-maple-red hover:text-white font-bold py-3 px-4 transition-colors rounded-button"
                      >
                        {brand.buttonText?.toUpperCase() || 'SHOP NOW'}
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {categoryBrands.length === 0 && (
              <div className="text-center py-12">
                <p className="text-slate text-lg">No brands found in this category yet.</p>
                <Link href="/canadian/brands" className="text-maple-red hover:text-burgundy font-bold mt-4 inline-block">
                  Browse All Brands →
                </Link>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
