import Link from 'next/link'
import Image from 'next/image'
import { getCanadianBrandsByCategory, getCanadianBrandCategories } from '@/lib/db'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { StatsBar } from '@/components/StatsBar'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { CategoryIcon } from '@/components/CategoryIcon'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  // Convert slug back to category name (e.g., 'home-garden' -> 'Home Garden')
  const categoryName = slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

  return {
    title: `${categoryName} - Canadian Brands`,
    description: `Browse Canadian ${categoryName.toLowerCase()} brands. Support local businesses.`,
  }
}

export async function generateStaticParams() {
  const categories = await getCanadianBrandCategories()
  return categories.map((category) => ({
    slug: category.slug,
  }))
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params

  // Convert slug to category name for querying
  const categoryName = slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

  const categoryBrands = await getCanadianBrandsByCategory(categoryName)

  // If no brands found, try with original case variations
  if (categoryBrands.length === 0) {
    notFound()
  }

  return (
    <>
      <Header />
      <StatsBar />
      <main className="bg-cream min-h-screen">
        {/* Breadcrumbs */}
        <div className="max-w-6xl mx-auto px-6 pt-4">
          <Breadcrumbs items={[
            { label: 'Home', href: '/' },
            { label: 'Stores', href: '/stores' },
            { label: 'Categories', href: '/canadian/categories' },
            { label: categoryName, href: `/canadian/category/${slug}` },
          ]} />
        </div>

        {/* Hero Section - matching home page style */}
        <section className="relative mt-4">
          {/* Desktop Hero */}
          <div className="hidden md:block relative w-full h-[400px]">
            <Image
              src="/hero-desktop.webp"
              alt={`Canadian ${categoryName} Brands`}
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
          </div>
          {/* Mobile Hero */}
          <div className="block md:hidden relative w-full h-[300px]">
            <Image
              src="/hero-mobile.webp"
              alt={`Canadian ${categoryName} Brands`}
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full max-w-7xl mx-auto px-4 flex flex-col items-end">
              <div className="flex items-center gap-3 mb-2">
                <CategoryIcon category={categoryName} size={48} className="text-white drop-shadow" />
                <h1 className="text-3xl md:text-5xl font-bold text-white drop-shadow-lg text-right">
                  {categoryName}
                </h1>
              </div>
              <p className="text-white/90 text-sm md:text-lg drop-shadow text-right max-w-xl">
                Discover quality Canadian {categoryName.toLowerCase()} brands.
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
                    {brand.logo_url ? (
                      <img
                        src={brand.logo_url}
                        alt={`${brand.name} logo`}
                        className="w-12 h-12 rounded object-contain bg-cream flex-shrink-0"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded bg-cream flex items-center justify-center flex-shrink-0 text-2xl">

                      </div>
                    )}
                    <h3 className="text-xl font-bold text-charcoal">
                      {brand.name}
                    </h3>
                  </div>
                  <p className="text-slate text-sm mb-4 line-clamp-3">
                    {brand.description || brand.tagline || `Discover ${brand.name} products`}
                  </p>
                  <div className="flex flex-col gap-2">
                    <Link
                      href={`/canadian/brand/${brand.slug}`}
                      className="text-center bg-maple-red hover:bg-burgundy text-white font-bold py-3 px-4 transition-colors rounded-button"
                    >
                      READ MORE
                    </Link>
                    {brand.affiliate_url && (
                      <a
                        href={brand.affiliate_url}
                        target="_blank"
                        rel="nofollow noopener noreferrer"
                        className="text-center border border-maple-red text-maple-red hover:bg-maple-red hover:text-white font-bold py-3 px-4 transition-colors rounded-button"
                      >
                        SHOP NOW
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
                  Browse All Brands
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
