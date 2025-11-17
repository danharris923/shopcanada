import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Canada Goose Story - From Toronto to the Arctic | The Canadian Catalogue',
  description: 'Explore the history of Canada Goose, makers of world-class Arctic parkas since 1957. Premium Canadian outerwear built for extreme cold.',
}

export default function CanadaGoosePage() {
  const faqs = [
    {
      question: "Are Canada Goose jackets made in Canada?",
      answer: "Yes, Canada Goose manufactures many of its parkas in Canadian facilities across Toronto, Winnipeg, and Montreal."
    },
    {
      question: "Why are Canada Goose jackets so expensive?",
      answer: "They use high-quality down, durable shells, and are engineered for extreme cold and Arctic conditions."
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
            "name": "Canada Goose",
            "foundingDate": "1957",
            "url": "https://www.canadagoose.com",
            "logo": "/canada-goose-parka-winter-coat-vintage-style-dark.jpg",
            "description": "Canada Goose creates world-leading parkas and extreme weather outerwear made in Canada since 1957."
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
          <span className="text-[#f4ede4]">Canada Goose</span>
        </div>
      </div>

      {/* Hero */}
      <div className="bg-[#1a3a1a] py-16 px-6 border-b-4 border-[#3a4a3a]">
        <div className="max-w-4xl mx-auto">
          <div className="inline-block mb-4 px-4 py-2 bg-[#5c1a1a] text-[#b8860b] text-xs tracking-widest border border-[#b8860b]">
            🇨🇦 BRAND STORY • EST. 1957
          </div>
          <h1 className="text-5xl md:text-6xl font-serif mb-6 text-[#f4ede4] text-balance">
            Canada Goose — From Toronto Factory Floors to the Arctic
          </h1>
          <p className="text-xl text-[#b8a896] leading-relaxed">
            Few brands represent extreme weather gear the way Canada Goose does. Built on performance engineering for brutal temperatures.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <article className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <img 
            src="/canada-goose-parka-winter-coat-vintage-style-dark.jpg" 
            alt="Canada Goose Arctic parka"
            className="w-full mb-8 border-2 border-[#3a4a3a]"
          />

          <div className="prose prose-invert max-w-none">
            <p className="text-[#b8a896] text-lg leading-relaxed mb-6">
              Established in 1957 in Toronto, the brand started as a small warehouse making wool vests and cold-weather gear for local workers. But Canada Goose's reputation grew as its parkas found their way into the hands of Arctic researchers, film crews, polar explorers, and northern communities who needed serious protection from brutal temperatures.
            </p>

            <p className="text-[#b8a896] leading-relaxed mb-6">
              Canada Goose is built on performance engineering. Their parkas are stuffed with high-fill-power down, reinforced with durable shells, and tested to withstand conditions as low as -30°C and below. It's not fashion pretending to be functional — it's genuinely elite cold-weather gear.
            </p>

            <p className="text-[#b8a896] leading-relaxed mb-6">
              Today, Canada Goose is a global luxury brand worn everywhere from Nunavut to New York City. Yet the company still manufactures many of its products in its Canadian facilities, keeping jobs and craftsmanship at home.
            </p>

            <p className="text-[#b8a896] leading-relaxed mb-6">
              If you're looking to support Canadian outerwear, few brands carry the legacy, quality, and global respect of Canada Goose.
            </p>

            <div className="my-12 p-6 bg-[#1a2a1a] border-2 border-[#3a4a3a]">
              <h2 className="text-2xl font-serif text-[#b8860b] mb-4">Why Canada Goose Matters</h2>
              <ul className="space-y-3 text-[#b8a896]">
                <li>✓ <strong className="text-[#f4ede4]">Canadian Manufacturing:</strong> Multiple facilities across Toronto, Winnipeg, and Montreal</li>
                <li>✓ <strong className="text-[#f4ede4]">Arctic-Tested:</strong> Gear trusted by polar explorers and researchers</li>
                <li>✓ <strong className="text-[#f4ede4]">Premium Materials:</strong> High-fill-power down and durable shells</li>
                <li>✓ <strong className="text-[#f4ede4]">Global Icon:</strong> Canadian brand with worldwide recognition</li>
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
              <h3 className="text-xl font-bold text-[#f4ede4] mb-3">Shop Canada Goose</h3>
              <p className="text-[#b8a896] mb-4">
                Browse the full collection of Canada Goose parkas and extreme weather gear.
              </p>
              <a 
                href="https://www.canadagoose.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-[#b8860b] text-[#0f1410] px-6 py-3 font-bold hover:bg-[#d4a520] transition-colors"
              >
                VISIT CANADAGOOSE.COM →
              </a>
            </div>
          </div>
        </div>
      </article>
    </main>
  )
}
