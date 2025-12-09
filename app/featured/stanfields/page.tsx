import Link from 'next/link'
import { Breadcrumbs } from '@/components/breadcrumbs'

export const metadata = {
  title: "Stanfield's — A Deep Dive Into 166+ Years of Canadian Woolen Craftsmanship",
  description: "Stanfield's has crafted warm, durable wool and thermal clothing in Nova Scotia since 1856. Discover the Canadian heritage brand trusted for generations.",
}

export default function StanfieldsPage() {
  return (
    <main className="bg-[#f5f0e8] min-h-screen">
      <Breadcrumbs items={[
        { label: 'Home', href: '/' },
        { label: 'Featured Brands', href: '/#featured' },
        { label: "Stanfield's" }
      ]} />

      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-8">
          <div className="inline-block bg-[#5c1a1a] px-4 py-2 mb-4">
            <span className="text-[#b8860b] font-bold text-sm">🇨🇦 FEATURED CANADIAN BRAND</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif text-[#2a2a2a] mb-4 text-balance">
            Stanfield's — A Deep Dive Into 166+ Years of Canadian Woolen Craftsmanship
          </h1>
          <p className="text-xl text-[#5a5a5a] leading-relaxed">
            Founded in 1856 in Nova Scotia, Stanfield's is Canada's original wool and thermal clothing company. Known for warm, durable garments built to withstand real Canadian winters.
          </p>
        </div>

        <div className="bg-[#0f1410] border-2 border-[#3a4a3a] p-8 mb-8">
          <img
            src="/wool-underwear-clothing-vintage-catalogue-dark-woo.jpg"
            alt="Stanfield's vintage wool clothing catalogue"
            className="w-full h-64 object-cover mb-6"
          />

          <div className="prose prose-invert max-w-none">
            <div className="text-[#f4ede4] leading-relaxed space-y-6 text-lg">
              <p>
                Stanfield's is one of Canada's oldest and most enduring clothing companies — a true heritage brand with roots stretching back to <strong className="text-[#b8860b]">1856 in Truro, Nova Scotia</strong>. While fast fashion comes and goes, Stanfield's has survived world wars, economic shifts, and massive changes in manufacturing by staying committed to one thing: making warm, durable clothing that Canadians can trust.
              </p>

              <h2 className="text-3xl font-serif text-[#b8860b] mt-12 mb-4">
                🔨 The Early Days: Built on Wool, Warmth & Hard Work
              </h2>

              <p>
                The Stanfield family began as small-batch spinners and weavers in rural Nova Scotia. Their earliest products were basic wool and cotton essentials — socks, underwear, and knit garments made to withstand Atlantic winters. By the late 1800s, Stanfield's thermal underwear had become legendary across Canada for its reliability and long lifespan.
              </p>

              <p>
                This reputation wasn't marketing hype — it was earned. Farmers, fishermen, loggers, railway workers, and early settlers relied on Stanfield's woolens because they were warm, tough, and almost impossible to wear out.
              </p>

              <h2 className="text-3xl font-serif text-[#b8860b] mt-12 mb-4">
                🇨🇦 A Brand Forged in Canadian History
              </h2>

              <p>
                Stanfield's clothing became a staple during major historical moments:
              </p>

              <ul className="space-y-3 text-[#f4ede4] list-none pl-0">
                <li><strong className="text-[#b8860b]">Klondike Gold Rush (1896–1899):</strong> Thousands of miners wore Stanfield's wool layers to survive sub-zero Yukon temperatures.</li>
                <li><strong className="text-[#b8860b]">World War I & II:</strong> The Canadian military contracted Stanfield's for thermal underwear and wool garments for troops.</li>
                <li><strong className="text-[#b8860b]">Early northern exploration:</strong> Arctic expeditions frequently listed Stanfield's layers as essential survival gear.</li>
              </ul>

              <p>
                Few Canadian brands have been this intertwined with the nation's development.
              </p>

              <h2 className="text-3xl font-serif text-[#b8860b] mt-12 mb-4">
                🧵 Manufacturing That Stayed at Home
              </h2>

              <p>
                While most apparel brands moved manufacturing overseas, Stanfield's continued to produce a large portion of its garments at its original Truro factory, where hundreds of Nova Scotians are still employed today.
              </p>

              <p>
                Their commitment to domestic production means:
              </p>

              <ul className="space-y-2 text-[#f4ede4] list-none pl-0">
                <li>✓ Consistent, controlled quality</li>
                <li>✓ Ethical labour practices</li>
                <li>✓ Support for Canadian jobs</li>
                <li>✓ Lower environmental impact through shorter supply chains</li>
              </ul>

              <p>
                It's one of the last major clothing companies still proudly making garments on home soil.
              </p>

              <h2 className="text-3xl font-serif text-[#b8860b] mt-12 mb-4">
                ❄️ Why Canadians Still Love Stanfield's
              </h2>

              <p>
                Stanfield's isn't trendy — it's dependable. And in Canada's climate, dependability matters. Today the brand is best known for:
              </p>

              <ul className="space-y-2 text-[#f4ede4] list-none pl-0">
                <li>• Wool base layers</li>
                <li>• Thermal underwear</li>
                <li>• Flannels</li>
                <li>• Long johns</li>
                <li>• Workwear</li>
                <li>• Fleece and wool blends</li>
              </ul>

              <p>
                Their gear is loved by tradespeople, outdoor workers, cabin owners, winter hikers, hunters, snowmobilers, and anyone who spends long hours outside.
              </p>

              <h2 className="text-3xl font-serif text-[#b8860b] mt-12 mb-4">
                📌 In a World of Disposable Fashion, Stanfield's Is Built to Last
              </h2>

              <p>
                Stanfield's has weathered 166+ years by doing the opposite of fast fashion: making clothing that lasts decades, not seasons. Their garments are known to be handed down through generations, patched and repatched, yet still functional.
              </p>

              <p>
                As the "Buy Canadian" movement grows, Stanfield's stands out as one of the truest Canadian heritage brands still operating today.
              </p>

              <div className="bg-[#1a2a1a] border-l-4 border-[#b8860b] p-6 my-8">
                <h3 className="text-[#b8860b] font-bold text-xl mb-3">Why Choose Stanfield's</h3>
                <ul className="space-y-2 text-[#f4ede4]">
                  <li>✓ Founded in 1856 in Truro, Nova Scotia — 166+ years of Canadian heritage</li>
                  <li>✓ Still manufactures garments at original Nova Scotia factory</li>
                  <li>✓ Trusted by Canadian military, explorers, and outdoor workers</li>
                  <li>✓ Known for wool underwear, thermal layers, and long-lasting workwear</li>
                  <li>✓ Built to last decades, not seasons</li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <a
                  href="https://www.stanfields.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-transparent text-[#b8860b] px-8 py-4 font-bold text-center border-2 border-[#b8860b] hover:bg-[#5c1a1a] transition-colors"
                >
                  VISIT STANFIELD'S.COM →
                </a>
                <a
                  href="https://amzn.to/4p8TKoG"
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                  className="flex-1 bg-[#b8860b] text-[#0f1410] px-8 py-4 font-bold text-center hover:bg-[#d4a520] transition-colors"
                >
                  SHOP NOW ON AMAZON
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#0f1410] border-2 border-[#3a4a3a] p-8 mb-8">
          <h3 className="text-2xl font-serif text-[#b8860b] mb-6">Frequently Asked Questions</h3>
          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-bold text-[#f4ede4] mb-2">Q: When was Stanfield's founded?</h4>
              <p className="text-[#b8a896]">
                A: Stanfield's was founded in 1856 in Truro, Nova Scotia, making it one of Canada's oldest continuously operating clothing manufacturers.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-bold text-[#f4ede4] mb-2">Q: What is Stanfield's known for?</h4>
              <p className="text-[#b8a896]">
                A: The brand is famous for wool underwear, thermal layers, long johns, and rugged Canadian-made workwear.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-bold text-[#f4ede4] mb-2">Q: Is Stanfield's clothing still made in Canada?</h4>
              <p className="text-[#b8a896]">
                A: Yes. Stanfield's continues to manufacture many of its garments at its original factory in Truro, Nova Scotia.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-bold text-[#f4ede4] mb-2">Q: Who wears Stanfield's today?</h4>
              <p className="text-[#b8a896]">
                A: Outdoor workers, tradespeople, winter sports enthusiasts, and Canadians who need warm, long-lasting clothing.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Link
            href="/#featured"
            className="inline-block text-[#b8860b] hover:text-[#d4a520] font-bold"
          >
            ← Back to Featured Brands
          </Link>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Brand",
            "name": "Stanfield's",
            "foundingDate": "1856",
            "url": "https://yourdomain.ca/stanfields",
            "description": "Stanfield's is a Canadian heritage brand founded in 1856, known for its warm wool underwear, thermal layers, and durable Canadian-made workwear.",
            "founder": "Charles E. Stanfield",
            "sameAs": [
              "https://www.stanfields.com",
              "https://www.facebook.com/stanfields",
              "https://www.instagram.com/stanfields"
            ]
          })
        }}
      />
    </main>
  )
}
