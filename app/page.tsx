import Link from 'next/link'
import Image from 'next/image'
import { brands, getBrandBySlug } from '@/lib/brands-data'

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
    <main className="bg-[#1a3a1a] min-h-screen">
      {/* Hero Section */}
      <section className="bg-[#0f1410] border-b-4 border-[#3a4a3a] py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-serif text-[#f4ede4] mb-6 text-balance">
            Shop Canada
          </h1>
          <p className="text-xl text-[#b8a896] mb-4 max-w-2xl mx-auto leading-relaxed">
            Support Canadian businesses and manufacturing. Browse {totalBrands} quality brands, read honest reviews, and make informed purchasing decisions.
          </p>
          <p className="text-sm text-[#b8860b] mb-8">
            {totalBrands} Verified Canadian Brands & Growing
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/all-brands"
              className="bg-[#b8860b] text-[#0f1410] px-8 py-4 font-bold hover:bg-[#d4a520] transition-colors"
            >
              BROWSE ALL BRANDS
            </Link>
            <Link 
              href="/categories"
              className="bg-[#3a4a3a] text-[#f4ede4] px-8 py-4 font-bold hover:bg-[#4a5a4a] transition-colors"
            >
              SHOP BY CATEGORY
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Canadian Brands Section */}
      <section id="featured" className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block bg-[#5c1a1a] px-6 py-3 mb-4">
              <span className="text-[#b8860b] font-bold">🇨🇦 FEATURED CANADIAN BRANDS</span>
            </div>
            <h2 className="text-4xl font-serif text-[#f4ede4] mb-4">
              Icons of Canadian Retail
            </h2>
            <p className="text-[#b8a896] max-w-2xl mx-auto leading-relaxed">
              These Canadian companies have built global reputations on quality, innovation, and authenticity. Learn their stories and shop with confidence.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {featuredBrands.map((brand) => (
              <div
                key={brand.slug}
                className="group bg-[#0f1410] border-2 border-[#3a4a3a] hover:border-[#b8860b] transition-all overflow-hidden"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={brand.image || "/placeholder.svg"}
                    alt={`${brand.name} - ${brand.tagline}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4 bg-[#5c1a1a] px-3 py-1">
                    <span className="text-[#b8860b] text-sm font-bold">EST. {brand.founded.split(', ')[1]}</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-serif text-[#f4ede4] mb-2">
                    {brand.name}
                  </h3>
                  <p className="text-[#b8a896] mb-4">
                    {brand.tagline}
                  </p>
                  
                  {brand.amazonLink ? (
                    <a
                      href={brand.amazonLink}
                      target="_blank"
                      rel="nofollow noopener noreferrer"
                      className="block w-full text-center bg-[#b8860b] hover:bg-[#d4a520] text-[#0f1410] font-bold py-3 px-6 mb-4 transition-colors shadow-lg hover:shadow-xl"
                    >
                      {brand.buttonText?.toUpperCase() || 'SHOP NOW'}
                    </a>
                  ) : (
                    <Link
                      href={`/featured/${brand.slug}`}
                      className="block w-full text-center bg-[#b8860b] hover:bg-[#d4a520] text-[#0f1410] font-bold py-3 px-6 mb-4 transition-colors shadow-lg hover:shadow-xl"
                    >
                      SHOP NOW
                    </Link>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <span className="text-[#b8860b] text-sm font-bold">
                      📍 {brand.founded}
                    </span>
                    <Link 
                      href={`/featured/${brand.slug}`}
                      className="text-[#b8860b] font-bold group-hover:text-[#d4a520] text-sm"
                    >
                      READ MORE →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="bg-[#0f1410] border-t-4 border-[#3a4a3a] py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl mb-4">📚</div>
              <h3 className="text-xl font-bold text-[#f4ede4] mb-2">Brand Stories</h3>
              <p className="text-[#b8a896] text-sm mb-4">
                Discover the history and heritage behind Canada's most beloved brands
              </p>
              <Link href="/brands" className="text-[#b8860b] hover:text-[#d4a520] font-bold">
                Read Stories →
              </Link>
            </div>
            <div>
              <div className="text-4xl mb-4">⭐</div>
              <h3 className="text-xl font-bold text-[#f4ede4] mb-2">Honest Reviews</h3>
              <p className="text-[#b8a896] text-sm mb-4">
                Real assessments of quality, value, and Canadian manufacturing
              </p>
              <Link href="/reviews" className="text-[#b8860b] hover:text-[#d4a520] font-bold">
                Browse Reviews →
              </Link>
            </div>
            <div>
              <div className="text-4xl mb-4">🎁</div>
              <h3 className="text-xl font-bold text-[#f4ede4] mb-2">Gift Guide</h3>
              <p className="text-[#b8a896] text-sm mb-4">
                Curated selections perfect for supporting Canadian businesses
              </p>
              <Link href="/gift-guide" className="text-[#b8860b] hover:text-[#d4a520] font-bold">
                Explore Guide →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-12 px-6 bg-[#5c1a1a]">
        <div className="max-w-2xl mx-auto text-center">
          <h3 className="text-2xl font-serif text-[#f4ede4] mb-4">
            Shop Canada Weekly
          </h3>
          <p className="text-[#b8a896] mb-6">
            Subscribe for new Canadian brand discoveries, exclusive deals, and economic patriotism updates.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-1 px-4 py-3 bg-[#0f1410] text-[#f4ede4] border-2 border-[#3a4a3a] focus:border-[#b8860b] outline-none"
            />
            <button className="bg-[#b8860b] text-[#0f1410] px-8 py-3 font-bold hover:bg-[#d4a520] transition-colors whitespace-nowrap">
              SUBSCRIBE
            </button>
          </div>
        </div>
      </section>
    </main>
  )
}
