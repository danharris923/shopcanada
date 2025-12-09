import { ProductCard } from '@/components/product-card'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Roots Canada Story - 50 Years of Canadian Craftsmanship | The Canadian Catalogue',
  description: 'Discover the Roots story — a Canadian heritage brand crafting premium leather goods and cozy apparel since 1973. Authentic, durable, and proudly Canadian.',
}

export default function RootsPage() {
  const faqs = [
    {
      question: "Where is Roots clothing made?",
      answer: "Many Roots leather goods and select apparel are handcrafted in Toronto, Canada."
    },
    {
      question: "What is Roots known for?",
      answer: "Roots is famous for its premium leather bags, cozy sweatpants, and classic Canadian cabin style."
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
            "name": "Roots",
            "foundingDate": "1973",
            "url": "https://ca.roots.com",
            "logo": "/roots-leather-goods-vintage-catalogue-style-dark-w.jpg",
            "description": "Roots is a Canadian heritage brand known for premium leather goods and cozy apparel crafted since 1973.",
            "founder": ["Michael Budman", "Don Green"],
            "brand": "Roots Canada"
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
          <span className="text-[#f4ede4]">Roots</span>
        </div>
      </div>

      {/* Hero */}
      <div className="bg-[#f5f0e8] py-16 px-6 border-b-4 border-[#3a4a3a]">
        <div className="max-w-4xl mx-auto">
          <div className="inline-block mb-4 px-4 py-2 bg-[#5c1a1a] text-[#b8860b] text-xs tracking-widest border border-[#b8860b]">
            🇨🇦 BRAND STORY • EST. 1973
          </div>
          <h1 className="text-5xl md:text-6xl font-serif mb-6 text-[#2a2a2a] text-balance">
            Roots — 50 Years of Canadian Craftsmanship
          </h1>
          <p className="text-xl text-[#5a5a5a] leading-relaxed">
            Roots is one of Canada's most beloved heritage brands, known for comfort, craftsmanship, and that classic cabin-country style that feels like home.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <article className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <img 
            src="/roots-leather-goods-vintage-catalogue-style-dark-w.jpg" 
            alt="Roots leather goods and cozy clothing"
            className="w-full mb-8 border-2 border-[#3a4a3a]"
          />

          <div className="prose prose-invert max-w-none">
            <p className="text-[#b8a896] text-lg leading-relaxed mb-6">
              Founded in 1973 in Toronto, Roots began as a small leather workshop that focused on high-quality handmade goods. Their iconic leather bags and perfectly broken-in sweatpants quickly became a staple in Canadian homes, cottages, and classrooms.
            </p>

            <p className="text-[#b8a896] leading-relaxed mb-6">
              Over the years, Roots evolved into a symbol of Canadian identity — a blend of rugged outdoors, cozy comfort, and timeless design. Many of their leather pieces are still handcrafted at the Roots Leather Factory in Toronto, making the brand a true standout in a world full of overseas manufacturing.
            </p>

            <p className="text-[#b8a896] leading-relaxed mb-6">
              Whether it's their salt-and-pepper sweatpants, classic hoodies, or durable leather backpacks, Roots remains committed to quality and authenticity. For anyone looking to support Canadian-made products, Roots offers a perfect mix of heritage, sustainability, and craftsmanship that's hard to find anywhere else.
            </p>

            <div className="my-12 p-6 bg-[#1a2a1a] border-2 border-[#3a4a3a]">
              <h2 className="text-2xl font-serif text-[#b8860b] mb-4">Why Roots Matters</h2>
              <ul className="space-y-3 text-[#b8a896]">
                <li>✓ <strong className="text-[#f4ede4]">Canadian Manufacturing:</strong> Many leather pieces still handcrafted in Toronto</li>
                <li>✓ <strong className="text-[#f4ede4]">Heritage Design:</strong> Classic cabin-country style that never goes out of fashion</li>
                <li>✓ <strong className="text-[#f4ede4]">Quality Materials:</strong> Premium leather and fabrics built to last decades</li>
                <li>✓ <strong className="text-[#f4ede4]">Cultural Icon:</strong> A true symbol of Canadian identity since 1973</li>
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
              <h3 className="text-xl font-bold text-[#f4ede4] mb-3">Shop Roots</h3>
              <p className="text-[#b8a896] mb-4">
                Browse the full collection of Roots leather goods, cabin wear, and Canadian classics.
              </p>
              <a 
                href="https://ca.roots.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-[#b8860b] text-[#0f1410] px-6 py-3 font-bold hover:bg-[#d4a520] transition-colors"
              >
                VISIT ROOTS.COM →
              </a>
            </div>
          </div>
        </div>
      </article>
    </main>
  )
}
