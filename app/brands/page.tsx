import { BrandCard } from '@/components/brand-card'

export default function BrandsPage() {
  const brandStories = [
    {
      name: "Lululemon",
      description: "Founded in Vancouver in 1998, Lululemon revolutionized athleisure with innovative fabric technology and performance design. From buttery-soft Nulu leggings to the famous ABC pants, this global icon still carries its West Coast mindful energy.",
      established: "Est. 1998",
      href: "/featured/lululemon",
      image: "/lululemon-yoga-pants-athletic-wear-storefront.jpg"
    },
    {
      name: "Aritzia",
      description: "Born in Vancouver in 1984, Aritzia has become a global fashion powerhouse known for elevated everyday essentials and cult-favorite pieces. The Super Puff jacket alone has achieved iconic status worldwide.",
      established: "Est. 1984",
      href: "/featured/aritzia",
      image: "/aritzia-fashion-clothing-store-super-puff-jacket.jpg"
    },
    {
      name: "Ardene",
      description: "Founded in Montreal in 1982, Ardene delivers affordable, trend-forward fashion for every Canadian. With over 250 stores, this brand makes style accessible without breaking the bank.",
      established: "Est. 1982",
      href: "/featured/ardene",
      image: "/ardene-fashion-lifestyle.jpg"
    },
    {
      name: "Roots",
      description: "Canadian craftsmanship since 1973, known for premium leather goods and cozy cabin-style clothing. A heritage brand built on comfort, quality, and authenticity.",
      established: "Est. 1973",
      href: "/brands/roots",
      image: "/roots-leather-goods-vintage-catalogue-style-dark-w.jpg"
    },
    {
      name: "Canada Goose",
      description: "Born in Toronto in 1957, Canada Goose creates world-leading cold-weather parkas engineered for Arctic conditions. Unmatched performance and Canadian manufacturing.",
      established: "Est. 1957",
      href: "/brands/canada-goose",
      image: "/canada-goose-parka-winter-coat-vintage-style-dark.jpg"
    },
    {
      name: "Stanfield's",
      description: "Founded in 1856 in Nova Scotia, Stanfield's is Canada's original wool and thermal clothing maker. Durable, warm, and crafted for real Canadian winters.",
      established: "Est. 1856",
      href: "/brands/stanfields",
      image: "/wool-underwear-clothing-vintage-catalogue-dark-woo.jpg"
    },
    {
      name: "Arc'teryx",
      description: "A Vancouver-born performance brand designing elite outdoor gear built for the mountains. Engineered for durability, weather protection, and serious adventure.",
      established: "Est. 1989",
      href: "/brands/arcteryx",
      image: "/technical-outdoor-gear-mountain-equipment-dark.jpg"
    },
    {
      name: "Moosehead",
      description: "Canada's oldest independent brewery, proudly family-owned since 1867. Maritime tradition meets crisp, classic Canadian beer.",
      established: "Est. 1867",
      href: "/brands/moosehead",
      image: "/beer-bottles-brewery-vintage-maritime-dark-wood.jpg"
    },
    {
      name: "Crown Royal",
      description: "Created in Manitoba in 1939, Crown Royal is Canada's most iconic whisky. Smooth, refined, and world-renowned for exceptional craftsmanship.",
      established: "Est. 1939",
      href: "/brands/crown-royal",
      image: "/whisky-bottle-crown-royal-vintage-dark-elegant.jpg"
    },
    {
      name: "Mark's",
      description: "Founded in Calgary in 1977, Mark's has been outfitting Canadians with practical workwear, winter boots, and clothing built for real Canadian weather.",
      established: "Est. 1977",
      href: "/brands/marks",
      image: "/marks-work-wearhouse-winter-boots-workwear-canadia.jpg"
    }
  ]

  return (
    <main className="min-h-screen">
      <div className="bg-[#1a3a1a] py-16 px-6 border-b-4 border-[#3a4a3a]">
        <div className="max-w-6xl mx-auto">
          <div className="inline-block mb-4 px-4 py-2 bg-[#5c1a1a] text-[#b8860b] text-xs tracking-widest border border-[#b8860b]">
            HERITAGE • CRAFTSMANSHIP • CANADIAN PRIDE
          </div>
          <h1 className="text-5xl md:text-6xl font-serif mb-6 text-[#f4ede4]">
            Canadian Brand Stories
          </h1>
          <p className="text-xl text-[#b8a896] max-w-3xl leading-relaxed">
            Deep dives into the companies that built Canadian manufacturing heritage. 
            From century-old textile mills to modern outdoor innovators, these brands 
            represent quality, durability, and keeping jobs in Canada.
          </p>
        </div>
      </div>

      <section className="py-16 px-6 bg-[#0f1410]">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {brandStories.map((brand) => (
              <BrandCard
                key={brand.name}
                name={brand.name}
                tagline={brand.description}
                established={brand.established}
                href={brand.href}
                image={brand.image}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
