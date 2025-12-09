import { ArticleCard } from '@/components/article-card'

export const metadata = {
  title: 'Canadian Product Reviews - Honest Tests & Analysis | The Canadian Catalogue',
  description: 'Honest, detailed reviews of Canadian products. Real-world testing, long-term durability assessments, and transparent value analysis.',
}

export default function ReviewsPage() {
  return (
    <main className="min-h-screen bg-[#f5f0e8]">
      <div className="bg-[#0f1410] py-16 px-6 border-b-4 border-[#3a4a3a]">
        <div className="max-w-6xl mx-auto">
          <div className="inline-block mb-4 px-4 py-2 bg-[#5c1a1a] text-[#b8860b] text-xs tracking-widest border border-[#b8860b]">
            HONEST • DETAILED • NO BS
          </div>
          <h1 className="text-5xl md:text-6xl font-serif mb-6 text-[#f4ede4]">
            Product Reviews & Analysis
          </h1>
          <p className="text-xl text-[#b8a896] max-w-3xl leading-relaxed">
            Honest, detailed reviews of Canadian products. Real-world testing, long-term
            durability assessments, and transparent value analysis. We're not here to sell
            you things—we're here to help you make informed decisions.
          </p>
        </div>
      </div>

      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ArticleCard 
              title="Roots Cabin Hoodie – Is It Worth $100?"
              excerpt="A Canadian favourite with that classic Cabin look — but does it earn its $100 price tag? We tested the hoodie through daily wear, winter layering, and multiple washes."
              category="REVIEW"
              readTime="6 min read"
              href="/reviews/roots-cabin-hoodie"
              image="/roots-cabin-hoodie-cozy-sweater-dark-wood-backgrou.jpg"
            />
            <ArticleCard 
              title="Canadian Work Boots That Actually Last – 5-Year Test"
              excerpt="Real Canadian conditions, real long-term wear. We put these work boots through construction sites, winter weather, and years of abuse."
              category="REVIEW"
              readTime="8 min read"
              href="/reviews/canadian-work-boots"
              image="/canadian-work-boots-leather-vintage-worn-construct.jpg"
            />
            <ArticleCard 
              title="Are Canadian Products Worth the Premium?"
              excerpt="Canadian-made goods often cost more — but do they perform better? We compare local vs. imported items across quality, materials, longevity, and usability."
              category="COMPARISON"
              readTime="8 min read"
              href="/reviews/canadian-premium"
              image="/canadian-flag-maple-leaf-quality-products-made-in-.jpg"
            />
            <ArticleCard 
              title="Canada Goose vs Alternatives – The Parka Debate"
              excerpt="Is a $1,200 Canada Goose parka really justified? We compare leading Canadian and international winter coats for warmth, construction, down quality, and real-world performance."
              category="COMPARISON"
              readTime="8 min read"
              href="/reviews/canada-goose-alternatives"
              image="/canada-goose-parka-winter-coat-snow-cold-weather.jpg"
            />
            <ArticleCard 
              title="Stanfield's Merino Wool – 3-Month Review"
              excerpt="Stanfield's Merino base layers are a cold-weather staple, but how do they perform long-term? After three months of daily wear, we break down warmth, breathability, durability, and performance."
              category="REVIEW"
              readTime="7 min read"
              href="/reviews/stanfields-merino"
              image="/merino-wool-base-layer-winter-clothing-stanfields-.jpg"
            />
            <ArticleCard 
              title="Supporting Local: Quebec Artisan Soap Review"
              excerpt="These handcrafted Quebec soaps aim to elevate everyday skincare — but do they measure up? We review scent strength, lather quality, skin feel, and cost compared to big-box brands."
              category="REVIEW"
              readTime="5 min read"
              href="/reviews/quebec-artisan-soap"
              image="/handmade-artisan-soap-bars-natural-ingredients-que.jpg"
            />
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Canadian Product Reviews",
            "description": "Honest reviews of Canadian products with real-world testing and value analysis",
            "mainEntity": {
              "@type": "ItemList",
              "itemListElement": [
                {
                  "@type": "Review",
                  "itemReviewed": {
                    "@type": "Product",
                    "name": "Roots Cabin Hoodie",
                    "brand": "Roots"
                  },
                  "reviewRating": {
                    "@type": "Rating",
                    "ratingValue": "4",
                    "bestRating": "5"
                  }
                },
                {
                  "@type": "Review",
                  "itemReviewed": {
                    "@type": "Product",
                    "name": "Canadian Work Boots"
                  },
                  "reviewRating": {
                    "@type": "Rating",
                    "ratingValue": "4.5",
                    "bestRating": "5"
                  }
                },
                {
                  "@type": "Review",
                  "itemReviewed": {
                    "@type": "Product",
                    "name": "Canada Goose Parka"
                  },
                  "reviewRating": {
                    "@type": "Rating",
                    "ratingValue": "4",
                    "bestRating": "5"
                  }
                },
                {
                  "@type": "Review",
                  "itemReviewed": {
                    "@type": "Product",
                    "name": "Stanfield's Merino Wool Base Layer",
                    "brand": "Stanfield's"
                  },
                  "reviewRating": {
                    "@type": "Rating",
                    "ratingValue": "4.4",
                    "bestRating": "5"
                  }
                },
                {
                  "@type": "Review",
                  "itemReviewed": {
                    "@type": "Product",
                    "name": "Quebec Artisan Soap"
                  },
                  "reviewRating": {
                    "@type": "Rating",
                    "ratingValue": "4.2",
                    "bestRating": "5"
                  }
                }
              ]
            }
          })
        }}
      />
    </main>
  )
}
