import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Crown Royal Story - Canada\'s Legendary Whisky Icon | The Canadian Catalogue',
  description: 'Explore Crown Royal\'s legacy — Manitoba-crafted Canadian whisky born in 1939. Smooth, iconic, and globally celebrated.',
}

export default function CrownRoyalPage() {
  const faqs = [
    {
      question: "Where is Crown Royal whisky produced?",
      answer: "Crown Royal is distilled and blended in Gimli, Manitoba."
    },
    {
      question: "What is Crown Royal known for?",
      answer: "Its smooth flavour profile and signature velvet bag packaging."
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
            "name": "Crown Royal",
            "foundingDate": "1939",
            "url": "https://crownroyal.com",
            "logo": "/whisky-bottle-crown-royal-vintage-dark-elegant.jpg",
            "description": "Crown Royal is Canada's most iconic whisky, distilled in Gimli, Manitoba and known worldwide for its smooth flavour."
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
          <span className="text-[#f4ede4]">Crown Royal</span>
        </div>
      </div>

      {/* Hero */}
      <div className="bg-[#f5f0e8] py-16 px-6 border-b-4 border-[#3a4a3a]">
        <div className="max-w-4xl mx-auto">
          <div className="inline-block mb-4 px-4 py-2 bg-[#5c1a1a] text-[#b8860b] text-xs tracking-widest border border-[#b8860b]">
            🇨🇦 BRAND STORY • EST. 1939
          </div>
          <h1 className="text-5xl md:text-6xl font-serif mb-6 text-[#2a2a2a] text-balance">
            Crown Royal — Canada's Legendary Whisky Icon
          </h1>
          <p className="text-xl text-[#5a5a5a] leading-relaxed">
            Crafted in Manitoba as a gift for royalty, Crown Royal became one of the world's most recognized Canadian whiskies.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <article className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <img 
            src="/whisky-bottle-crown-royal-vintage-dark-elegant.jpg" 
            alt="Crown Royal whisky bottle"
            className="w-full mb-8 border-2 border-[#3a4a3a]"
          />

          <div className="prose prose-invert max-w-none">
            <p className="text-[#b8a896] text-lg leading-relaxed mb-6">
              Crafted in 1939 in Gimli, Manitoba, Crown Royal was originally created as a gift for visiting royalty — and it still carries that sense of luxury and sophistication today. Distilled using pure Canadian grains and filtered water from Lake Winnipeg, Crown Royal quickly became one of the most recognized Canadian whiskies worldwide.
            </p>

            <p className="text-[#b8a896] leading-relaxed mb-6">
              The brand's signature velvet bag and smooth, approachable flavour helped Crown Royal stand out in the global whisky scene. Over time, the distillery introduced a wide range of blends: Northern Harvest Rye, Apple, Vanilla, Black, and high-end reserve releases — many of which have won international awards.
            </p>

            <p className="text-[#b8a896] leading-relaxed mb-6">
              Crown Royal is more than a liquor brand. It's a piece of Canadian history, a globally recognized symbol of Canadian whisky craftsmanship, and one of the country's greatest exports.
            </p>

            <div className="my-12 p-6 bg-[#1a2a1a] border-2 border-[#3a4a3a]">
              <h2 className="text-2xl font-serif text-[#b8860b] mb-4">Why Crown Royal Matters</h2>
              <ul className="space-y-3 text-[#b8a896]">
                <li>✓ <strong className="text-[#f4ede4]">Manitoba Distilled:</strong> Crafted in Gimli using Lake Winnipeg water</li>
                <li>✓ <strong className="text-[#f4ede4]">Iconic Packaging:</strong> Signature velvet bag recognized worldwide</li>
                <li>✓ <strong className="text-[#f4ede4]">Smooth Profile:</strong> Approachable, award-winning flavour</li>
                <li>✓ <strong className="text-[#f4ede4]">Global Recognition:</strong> One of Canada's most famous exports</li>
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
              <h3 className="text-xl font-bold text-[#f4ede4] mb-3">Explore Crown Royal</h3>
              <p className="text-[#b8a896] mb-4">
                Discover the full collection of Crown Royal Canadian whiskies and blends.
              </p>
              <a 
                href="https://crownroyal.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-[#b8860b] text-[#0f1410] px-6 py-3 font-bold hover:bg-[#d4a520] transition-colors"
              >
                VISIT CROWNROYAL.COM →
              </a>
            </div>
          </div>
        </div>
      </article>
    </main>
  )
}
