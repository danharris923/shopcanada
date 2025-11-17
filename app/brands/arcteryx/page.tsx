import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Arc\'teryx Story - Mountain Innovation from Vancouver | The Canadian Catalogue',
  description: 'Read the Arc\'teryx story — Vancouver\'s leader in high-performance outdoor gear. Innovative technical apparel built for mountain life.',
}

export default function ArcteryxPage() {
  const faqs = [
    {
      question: "Why is Arc'teryx so popular?",
      answer: "Its technical jackets and shells are engineered for extreme durability, weather protection, and performance."
    },
    {
      question: "Does Arc'teryx make gear in Canada?",
      answer: "Their ARC'One facility in Vancouver produces many of their most advanced technical garments."
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
            "name": "Arc'teryx",
            "foundingDate": "1989",
            "url": "https://arcteryx.com",
            "logo": "/technical-outdoor-gear-mountain-equipment-dark.jpg",
            "description": "Arc'teryx is a Vancouver-based leader in technical outdoor gear, known for innovative, high-performance apparel."
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
          <span className="text-[#f4ede4]">Arc'teryx</span>
        </div>
      </div>

      {/* Hero */}
      <div className="bg-[#1a3a1a] py-16 px-6 border-b-4 border-[#3a4a3a]">
        <div className="max-w-4xl mx-auto">
          <div className="inline-block mb-4 px-4 py-2 bg-[#5c1a1a] text-[#b8860b] text-xs tracking-widest border border-[#b8860b]">
            🇨🇦 BRAND STORY • EST. 1989
          </div>
          <h1 className="text-5xl md:text-6xl font-serif mb-6 text-[#f4ede4] text-balance">
            Arc'teryx — Mountain Innovation from Vancouver
          </h1>
          <p className="text-xl text-[#b8a896] leading-relaxed">
            A brand built for the mountains by climbers obsessed with engineering the most advanced technical gear on Earth.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <article className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <img 
            src="/technical-outdoor-gear-mountain-equipment-dark.jpg" 
            alt="Arc'teryx technical outdoor gear"
            className="w-full mb-8 border-2 border-[#3a4a3a]"
          />

          <div className="prose prose-invert max-w-none">
            <p className="text-[#b8a896] text-lg leading-relaxed mb-6">
              Arc'teryx, founded in 1989 in North Vancouver, is a brand built for the mountains — literally. Surrounded by dramatic alpine terrain, Arc'teryx was born from a group of climbers and outdoor enthusiasts determined to engineer the most advanced technical gear on Earth.
            </p>

            <p className="text-[#b8a896] leading-relaxed mb-6">
              Unlike many outdoor brands, Arc'teryx focuses obsessively on materials science, function-first design, and extreme durability. Their famous shells and insulated jackets are engineered to withstand heavy rain, intense wind, freezing temperatures, and the harsh realities of backcountry terrain.
            </p>

            <p className="text-[#b8a896] leading-relaxed mb-6">
              Arc'teryx manufactures a significant portion of its most technical gear at its ARC'One facility in Vancouver, ensuring precision and control over quality. This dedication to craftsmanship has made Arc'teryx a global benchmark for high-performance apparel.
            </p>

            <p className="text-[#b8a896] leading-relaxed mb-6">
              For anyone looking for the best Canadian outdoor gear, Arc'teryx represents innovation, engineering excellence, and the rugged spirit of the West Coast.
            </p>

            <div className="my-12 p-6 bg-[#1a2a1a] border-2 border-[#3a4a3a]">
              <h2 className="text-2xl font-serif text-[#b8860b] mb-4">Why Arc'teryx Matters</h2>
              <ul className="space-y-3 text-[#b8a896]">
                <li>✓ <strong className="text-[#f4ede4]">Vancouver Manufacturing:</strong> ARC'One facility produces advanced technical gear</li>
                <li>✓ <strong className="text-[#f4ede4]">Materials Science:</strong> Obsessive focus on performance fabrics and construction</li>
                <li>✓ <strong className="text-[#f4ede4]">Built for Extremes:</strong> Gear tested in the harshest mountain conditions</li>
                <li>✓ <strong className="text-[#f4ede4]">Global Benchmark:</strong> Industry-leading innovation and quality standards</li>
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
              <h3 className="text-xl font-bold text-[#f4ede4] mb-3">Shop Arc'teryx</h3>
              <p className="text-[#b8a896] mb-4">
                Browse the full collection of Arc'teryx technical outdoor gear and performance apparel.
              </p>
              <a 
                href="https://arcteryx.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-[#b8860b] text-[#0f1410] px-6 py-3 font-bold hover:bg-[#d4a520] transition-colors"
              >
                VISIT ARCTERYX.COM →
              </a>
            </div>
          </div>
        </div>
      </article>
    </main>
  )
}
