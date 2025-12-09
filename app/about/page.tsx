export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#0f1410]">
      <div className="bg-[#f5f0e8] py-16 px-6 border-b-4 border-[#3a4a3a]">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-serif mb-6 text-[#2a2a2a]">
            About The Canadian Catalogue
          </h1>
          <p className="text-xl text-[#5a5a5a] leading-relaxed">
            A practical guide to shopping Canadian in an era of trade uncertainty.
          </p>
        </div>
      </div>

      <article className="py-16 px-6">
        <div className="max-w-4xl mx-auto prose prose-invert max-w-none">
          <h2 className="text-3xl font-serif text-[#b8860b] mb-4">Why We Exist</h2>
          
          <p className="text-[#b8a896] leading-relaxed mb-6">
            The Canadian Catalogue was created in response to increasing trade tensions between 
            the United States and Canada. As tariffs, policy uncertainty, and cross-border 
            complications grew, it became clear that many Canadians wanted to support domestic 
            businesses—but didn't know where to start.
          </p>

          <p className="text-[#b8a896] leading-relaxed mb-6">
            This isn't a lifestyle blog. It's not about performative patriotism or maple leaf 
            kitsch. It's a practical resource for people who want to make informed decisions about 
            where their money goes and what they're actually getting for it.
          </p>

          <h2 className="text-3xl font-serif text-[#b8860b] mb-4 mt-12">Our Approach</h2>

          <p className="text-[#b8a896] leading-relaxed mb-6">
            We focus on three main types of content:
          </p>

          <div className="space-y-6 mb-8">
            <div className="p-6 bg-[#1a2a1a] border-2 border-[#3a4a3a]">
              <h3 className="text-xl font-bold text-[#f4ede4] mb-2">Brand Stories</h3>
              <p className="text-[#b8a896] leading-relaxed">
                In-depth histories of Canadian companies. How they started, why they stayed in 
                Canada, what they make, and why it matters. These aren't press releases—they're 
                researched articles that include both successes and challenges.
              </p>
            </div>

            <div className="p-6 bg-[#1a2a1a] border-2 border-[#3a4a3a]">
              <h3 className="text-xl font-bold text-[#f4ede4] mb-2">Honest Reviews</h3>
              <p className="text-[#b8a896] leading-relaxed">
                Real-world product testing with a focus on long-term durability and value. 
                We compare Canadian products to alternatives and address the price premium honestly. 
                Sometimes Canadian products are worth it. Sometimes they're not.
              </p>
            </div>

            <div className="p-6 bg-[#1a2a1a] border-2 border-[#3a4a3a]">
              <h3 className="text-xl font-bold text-[#f4ede4] mb-2">Economic Context</h3>
              <p className="text-[#b8a896] leading-relaxed">
                Understanding how trade policies, tariffs, and manufacturing economics affect 
                Canadian consumers and businesses. This isn't political—it's practical information 
                about how global economics impacts your shopping decisions.
              </p>
            </div>
          </div>

          <h2 className="text-3xl font-serif text-[#b8860b] mb-4 mt-12">Editorial Standards</h2>

          <p className="text-[#b8a896] leading-relaxed mb-6">
            <strong className="text-[#f4ede4]">Affiliate Disclosure:</strong> Some product links 
            are affiliate links, meaning we may earn a small commission if you make a purchase. 
            This never affects our reviews or recommendations. We only link to products we've 
            actually researched and believe are worth considering.
          </p>

          <p className="text-[#b8a896] leading-relaxed mb-6">
            <strong className="text-[#f4ede4]">No Paid Placements:</strong> Brands cannot pay 
            for coverage or positive reviews. If we write about a product, it's because we think 
            it's interesting or relevant—not because someone paid us.
          </p>

          <p className="text-[#b8a896] leading-relaxed mb-6">
            <strong className="text-[#f4ede4]">Honest Assessment:</strong> Canadian products 
            aren't automatically better just because they're Canadian. We assess quality, value, 
            and alternatives fairly. Supporting local matters, but so does getting your money's worth.
          </p>

          <h2 className="text-3xl font-serif text-[#b8860b] mb-4 mt-12">The Design Choice</h2>

          <p className="text-[#b8a896] leading-relaxed mb-6">
            You might notice this site looks different from most modern websites. That's intentional. 
            We're inspired by the vintage Sears Christmas Wishbook—dense with information, practical 
            in design, built for browsing rather than quick scrolling.
          </p>

          <p className="text-[#b8a896] leading-relaxed mb-6">
            The dark, cozy aesthetic mirrors the experience of flipping through a catalogue on a 
            winter evening. It's nostalgic, but it's also functional: more information per page, 
            easier on the eyes, and a clear focus on content over flashy design.
          </p>

          <h2 className="text-3xl font-serif text-[#b8860b] mb-4 mt-12">Contact</h2>

          <p className="text-[#b8a896] leading-relaxed mb-6">
            Have a Canadian brand we should cover? Found an error in one of our articles? 
            Want to share your own experience with a product we reviewed?
          </p>

          <div className="p-6 bg-[#1a2a1a] border-2 border-[#3a4a3a]">
            <p className="text-[#b8a896] mb-2">Email: <span className="text-[#b8860b]">editorial@canadiancatalogue.ca</span></p>
            <p className="text-[#b8a896]">Newsletter: Subscribe to The Weekly Catalogue (form below)</p>
          </div>
        </div>
      </article>
    </main>
  )
}
