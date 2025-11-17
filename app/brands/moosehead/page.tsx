import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Moosehead Breweries Story - Maritime Tradition Since 1867 | The Canadian Catalogue',
  description: 'Discover Moosehead, Canada\'s oldest independent brewery. Brewing Maritime tradition and crisp Canadian beer since 1867.',
}

export default function MooseheadPage() {
  const faqs = [
    {
      question: "Is Moosehead still family-owned?",
      answer: "Yes, Moosehead Breweries remains Canada's oldest and largest independent family-owned brewery."
    },
    {
      question: "Where is Moosehead beer made?",
      answer: "Moosehead is brewed in Saint John, New Brunswick."
    }
  ]

  return (
    <main className="min-h-screen bg-[#0f1410]">
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Brand",
            "name": "Moosehead Breweries",
            "foundingDate": "1867",
            "url": "https://moosehead.ca",
            "logo": "/beer-bottles-brewery-vintage-maritime-dark-wood.jpg",
            "description": "Moosehead is Canada's oldest independent brewery, crafting classic Maritime beers since 1867."
          })
        }}
      />

      {/* Breadcrumb */}
      <div className="bg-[#1a2a1a] py-3 px-6 border-b border-[#3a4a3a]">
        <div className="max-w-6xl mx-auto text-sm text-[#b8a896]">
          <Link href="/" className="hover:text-[#b8860b]">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/brands" className="hover:text-[#b8860b]">Brand Stories</Link>
          <span className="mx-2">/</span>
          <span className="text-[#f4ede4]">Moosehead</span>
        </div>
      </div>

      {/* Hero */}
      <div className="bg-[#1a3a1a] py-16 px-6 border-b-4 border-[#3a4a3a]">
        <div className="max-w-4xl mx-auto">
          <div className="inline-block mb-4 px-4 py-2 bg-[#5c1a1a] text-[#b8860b] text-xs tracking-widest border border-[#b8860b]">
            🇨🇦 BRAND STORY • EST. 1867
          </div>
          <h1 className="text-5xl md:text-6xl font-serif mb-6 text-[#f4ede4] text-balance">
            Moosehead — Maritime Brewing Tradition Since 1867
          </h1>
          <p className="text-xl text-[#b8a896] leading-relaxed">
            Canada's oldest independent brewery, surviving fires, Prohibition, wars, and shifting trends while staying family-owned.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <article className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <img 
            src="/beer-bottles-brewery-vintage-maritime-dark-wood.jpg" 
            alt="Moosehead beer bottles and brewery"
            className="w-full mb-8 border-2 border-[#3a4a3a]"
          />

          <div className="prose prose-invert max-w-none">
            <p className="text-[#b8a896] text-lg leading-relaxed mb-6">
              Moosehead Breweries is Canada's oldest independent brewery, proudly family-owned since 1867. Based in Saint John, New Brunswick, Moosehead survived fires, Prohibition, world wars, and shifting consumer trends — all while keeping production Canadian and independent.
            </p>

            <p className="text-[#b8a896] leading-relaxed mb-6">
              The brand built its identity on Maritime grit and craftsmanship. Their classic Moosehead Lager is a staple across the country, known for its crisp, clean taste and approachable style. Over the years, the brewery has expanded into small-batch craft lines, seasonal brews, and specialty releases, proving they can innovate without losing their heritage.
            </p>

            <p className="text-[#b8a896] leading-relaxed mb-6">
              Moosehead is a symbol of Canadian resilience and craftsmanship — a brand that grew from a local brewery into a national icon without ever selling out to foreign ownership.
            </p>

            <div className="my-12 p-6 bg-[#1a2a1a] border-2 border-[#3a4a3a]">
              <h2 className="text-2xl font-serif text-[#b8860b] mb-4">Why Moosehead Matters</h2>
              <ul className="space-y-3 text-[#b8a896]">
                <li>✓ <strong className="text-[#f4ede4]">Independent & Family-Owned:</strong> Canada's oldest brewery still operated by the founding family</li>
                <li>✓ <strong className="text-[#f4ede4]">Maritime Heritage:</strong> Brewed in Saint John, New Brunswick since 1867</li>
                <li>✓ <strong className="text-[#f4ede4]">Classic Taste:</strong> Crisp, clean lager that's a Canadian staple</li>
                <li>✓ <strong className="text-[#f4ede4]">Craft Innovation:</strong> Expanding into small-batch and specialty brews</li>
              </ul>
            </div>

            <h2 className="text-3xl font-serif text-[#b8860b] mb-4 mt-12">Frequently Asked Questions</h2>
            
            {faqs.map((faq, index) => (
              <div key={index} className="mb-6 p-4 bg-[#1a2a1a] border border-[#3a4a3a]">
                <h3 className="text-lg font-bold text-[#f4ede4] mb-2">{faq.question}</h3>
                <p className="text-[#b8a896]">{faq.answer}</p>
              </div>
            ))}

            <div className="mt-12 p-6 bg-[#5c1a1a] border-2 border-[#b8860b]">
              <h3 className="text-xl font-bold text-[#f4ede4] mb-3">Find Moosehead</h3>
              <p className="text-[#b8a896] mb-4">
                Discover the full range of Moosehead beers and find where to buy near you.
              </p>
              <a 
                href="https://moosehead.ca" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-[#b8860b] text-[#0f1410] px-6 py-3 font-bold hover:bg-[#d4a520] transition-colors"
              >
                VISIT MOOSEHEAD.CA →
              </a>
            </div>
          </div>
        </div>
      </article>
    </main>
  )
}
