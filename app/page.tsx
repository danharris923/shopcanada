import Link from 'next/link'
import Image from 'next/image'
import { brands, getBrandBySlug } from '@/lib/brands-data'
import { TopDealsSection } from '@/components/top-deals-section'
import { PrimaryButton } from '@/components/primary-button'

export default function Home() {
  const totalBrands = brands.length

  const featuredBrandSlugs = ['lululemon', 'roots', 'aritzia', 'ardene']

  const featuredBrands = featuredBrandSlugs.map(slug => {
    const brandData = getBrandBySlug(slug)
    if (!brandData) return null

    const displayData: Record<string, { tagline: string, image: string, founded: string }> = {
      'lululemon': {
        tagline: "Canada's Global Athleisure Icon",
        image: '/lululemon-yoga-pants-athletic-wear-storefront.jpg',
        founded: 'Vancouver, 1998'
      },
      'aritzia': {
        tagline: 'Elevated Fashion With a Cult Following',
        image: '/aritzia-fashion-clothing-store-super-puff-jacket.jpg',
        founded: 'Vancouver, 1984'
      },
      'roots': {
        tagline: 'Heritage Brand Built on Craftsmanship',
        image: '/roots-canada-leather-goods-sweatpants-cabin-clothi.jpg',
        founded: 'Toronto, 1973'
      },
      'ardene': {
        tagline: 'Affordable Fashion for Every Canadian',
        image: '/ardene-fashion-lifestyle.jpg',
        founded: 'Montreal, 1982'
      }
    }

    return {
      ...brandData,
      ...displayData[slug]
    }
  }).filter(Boolean)

  return (
    <main className="bg-[var(--color-bg)] min-h-screen">
      {/* Hero Section */}
      <section className="bg-[var(--color-bg)] border-b border-[var(--color-border-subtle)] py-12 md:py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-serif text-[var(--color-text)] mb-6 text-balance">
            Shop Canada
          </h1>
          <p className="text-lg md:text-xl text-[var(--color-text-secondary)] mb-4 max-w-2xl mx-auto leading-relaxed">
            Support Canadian businesses and manufacturing. Browse {totalBrands} quality brands, read honest reviews, and make informed purchasing decisions.
          </p>
          <p className="text-sm text-[var(--color-text-secondary)] mb-8">
            {totalBrands} Verified Canadian Brands & Growing
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <PrimaryButton href="/all-brands">
              BROWSE ALL BRANDS
            </PrimaryButton>
            <Link
              href="/categories"
              className="inline-flex items-center justify-center rounded-lg px-8 py-4 font-semibold bg-[var(--color-surface)] text-[var(--color-text)] hover:bg-opacity-80 transition-all"
            >
              SHOP BY CATEGORY
            </Link>
          </div>
        </div>
      </section>

      {/* NEW: Top Canadian Deals - Above the Fold */}
      <TopDealsSection deals={featuredBrands} />


      {/* Quick Links Section */}
      <section className="bg-[var(--color-surface)] border-t border-[var(--color-border-subtle)] py-12 md:py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl mb-4">📚</div>
              <h3 className="text-xl font-bold text-[var(--color-text)] mb-2">Brand Stories</h3>
              <p className="text-[var(--color-text-secondary)] text-sm mb-4">
                Discover the history and heritage behind Canada's most beloved brands
              </p>
              <Link href="/brands" className="text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] font-bold transition-colors">
                Read Stories →
              </Link>
            </div>
            <div>
              <div className="text-4xl mb-4">⭐</div>
              <h3 className="text-xl font-bold text-[var(--color-text)] mb-2">Honest Reviews</h3>
              <p className="text-[var(--color-text-secondary)] text-sm mb-4">
                Real assessments of quality, value, and Canadian manufacturing
              </p>
              <Link href="/reviews" className="text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] font-bold transition-colors">
                Browse Reviews →
              </Link>
            </div>
            <div>
              <div className="text-4xl mb-4">🎁</div>
              <h3 className="text-xl font-bold text-[var(--color-text)] mb-2">Gift Guide</h3>
              <p className="text-[var(--color-text-secondary)] text-sm mb-4">
                Curated selections perfect for supporting Canadian businesses
              </p>
              <Link href="/gift-guide" className="text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] font-bold transition-colors">
                Explore Guide →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-12 md:py-16 px-6 bg-[var(--color-bg)] border-t border-[var(--color-border-subtle)]">
        <div className="max-w-2xl mx-auto text-center">
          <h3 className="text-2xl md:text-3xl font-serif text-[var(--color-text)] mb-4">
            Shop Canada Weekly
          </h3>
          <p className="text-[var(--color-text-secondary)] mb-6">
            Subscribe for new Canadian brand discoveries, exclusive deals, and economic patriotism updates.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-4 py-3 bg-[var(--color-surface)] text-[var(--color-text)] border border-[var(--color-border-subtle)] focus:border-[var(--color-accent)] outline-none rounded-lg transition-colors"
            />
            <PrimaryButton className="whitespace-nowrap">
              SUBSCRIBE
            </PrimaryButton>
          </div>
        </div>
      </section>
    </main>
  )
}
