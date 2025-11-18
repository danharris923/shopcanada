import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Stanfield\'s Story - 166 Years of Canadian Wool & Workwear | The Canadian Catalogue',
  description: 'Learn about Stanfield\'s, Canada\'s oldest wool and thermal clothing brand. Warm, durable apparel crafted in Nova Scotia since 1856.',
}

export default function StanfieldsPage() {
  const faqs = [
    {
      question: "What products is Stanfield's known for?",
      answer: "Stanfield's is best known for wool underwear, thermal layers, and durable workwear."
    },
    {
      question: "Is Stanfield's still made in Canada?",
      answer: "Yes, much of their production is still done in Truro, Nova Scotia."
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
            "name": "Stanfield's",
            "foundingDate": "1856",
            "url": "https://stanfields.com",
            "logo": "/wool-underwear-clothing-vintage-catalogue-dark-woo.jpg",
            "description": "Stanfield's is Canada's oldest wool and thermal clothing brand, crafting durable garments since 1856 in Nova Scotia."
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
          <span className="text-[#f4ede4]">Stanfield's</span>
        </div>
      </div>

      {/* Hero */}
      <div className="bg-[#1a3a1a] py-16 px-6 border-b-4 border-[#3a4a3a]">
        <div className="max-w-4xl mx-auto">
          <div className="inline-block mb-4 px-4 py-2 bg-[#5c1a1a] text-[#b8860b] text-xs tracking-widest border border-[#b8860b]">
            🇨🇦 BRAND STORY • EST. 1856
          </div>
          <h1 className="text-5xl md:text-6xl font-serif mb-6 text-[#f4ede4] text-balance">
            Stanfield's — 166 Years of Woolens and Workwear
          </h1>
          <p className="text-xl text-[#b8a896] leading-relaxed">
            One of Canada's oldest continuously operating clothing companies, built on reliability when clothing literally helped Canadians survive winter.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <article className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <img 
            src="/wool-underwear-clothing-vintage-catalogue-dark-woo.jpg" 
            alt="Stanfield's wool clothing and thermal wear"
            className="w-full mb-8 border-2 border-[#3a4a3a]"
          />

          <div className="prose prose-invert max-w-none">
            <p className="text-[#b8a896] text-lg leading-relaxed mb-6">
              Stanfield's is one of Canada's oldest continuously operating clothing companies — founded all the way back in 1856 in Nova Scotia. Known originally for its rugged wool garments and warm underlayers, Stanfield's built its name on reliability during an era when clothing literally needed to help Canadians survive winter.
            </p>

            <p className="text-[#b8a896] leading-relaxed mb-6">
              Over generations, the brand became famous for its thermal underwear, wool base layers, and durable workwear, earning a loyal following from outdoor workers, farmers, hunters, and anyone living through Canada's long cold seasons. Their products are still made with a focus on warmth, longevity, and traditional craftsmanship.
            </p>

            <p className="text-[#b8a896] leading-relaxed mb-6">
              Stanfield's is a cornerstone of Canadian manufacturing — they continue to produce much of their clothing at their original Truro, Nova Scotia facility. In a world of fast fashion, Stanfield's stands out by sticking to what works: wool, warmth, and the kind of quality your grandparents trusted.
            </p>

            <div className="my-12 p-6 bg-[#1a2a1a] border-2 border-[#3a4a3a]">
              <h2 className="text-2xl font-serif text-[#b8860b] mb-4">Why Stanfield's Matters</h2>
              <ul className="space-y-3 text-[#b8a896]">
                <li>✓ <strong className="text-[#f4ede4]">Heritage Manufacturing:</strong> Still producing in Truro, Nova Scotia since 1856</li>
                <li>✓ <strong className="text-[#f4ede4]">Time-Tested Quality:</strong> Wool and thermal wear built to last generations</li>
                <li>✓ <strong className="text-[#f4ede4]">Traditional Craftsmanship:</strong> Focus on warmth and durability</li>
                <li>✓ <strong className="text-[#f4ede4]">Maritime Pride:</strong> A cornerstone of Nova Scotia manufacturing</li>
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
              <h3 className="text-xl font-bold text-[#f4ede4] mb-3">Shop Stanfield's</h3>
              <p className="text-[#b8a896] mb-4">
                Browse the full collection of Stanfield's thermal wear, wool clothing, and workwear.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="https://amzn.to/4okYQxr"
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                  className="flex-1 bg-[#b8860b] text-[#0f1410] px-6 py-3 font-bold hover:bg-[#d4a520] transition-colors text-center"
                >
                  SHOP ON AMAZON
                </a>
                <a
                  href="https://stanfields.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-[#3a4a3a] text-[#f4ede4] px-6 py-3 font-bold hover:bg-[#4a5a4a] transition-colors text-center"
                >
                  VISIT STANFIELDS.COM →
                </a>
              </div>
            </div>
          </div>
        </div>
      </article>
    </main>
  )
}
