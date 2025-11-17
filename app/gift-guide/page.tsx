import { ProductCard } from '@/components/product-card'

export default function GiftGuidePage() {
  return (
    <main className="min-h-screen bg-[#0f1410]">
      <div className="bg-[#1a3a1a] py-16 px-6 border-b-4 border-[#3a4a3a]">
        <div className="max-w-6xl mx-auto">
          <div className="inline-block mb-4 px-4 py-2 bg-[#5c1a1a] text-[#b8860b] text-xs tracking-widest border border-[#b8860b]">
            CANADIAN GIFTS • SUPPORT LOCAL
          </div>
          <h1 className="text-5xl md:text-6xl font-serif mb-6 text-[#f4ede4]">
            Canadian Gift Guide 2025
          </h1>
          <p className="text-xl text-[#b8a896] max-w-3xl leading-relaxed">
            Quality gifts that support Canadian businesses and manufacturing. From practical 
            essentials to special occasion pieces, these are products people will actually use 
            and appreciate—not dust collectors.
          </p>
        </div>
      </div>

      <section className="py-16 px-6 bg-[#0f1410]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-serif mb-8 text-[#b8860b]">For The Outdoor Enthusiast</h2>
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <ProductCard 
              name="Expedition Parka"
              brand="Canada Goose"
              price="$1,395"
              established="Est. 1957"
              image="/placeholder.svg?height=300&width=400"
              href="#"
            />
            <ProductCard 
              name="Alpha SV Jacket"
              brand="Arc'teryx"
              price="$825"
              established="Est. 1989"
              image="/placeholder.svg?height=300&width=400"
              href="#"
            />
            <ProductCard 
              name="Merino Wool Base Layer"
              brand="Stanfield's"
              price="$89"
              established="Est. 1856"
              image="/placeholder.svg?height=300&width=400"
              href="#"
            />
          </div>

          <h2 className="text-4xl font-serif mb-8 text-[#b8860b]">Everyday Canadian Essentials</h2>
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <ProductCard 
              name="Original Cabin Hoodie"
              brand="Roots"
              price="$148"
              established="Est. 1973"
              image="/placeholder.svg?height=300&width=400"
              href="#"
            />
            <ProductCard 
              name="Tribe Leather Backpack"
              brand="Roots"
              price="$358"
              established="Est. 1973"
              image="/placeholder.svg?height=300&width=400"
              href="#"
            />
            <ProductCard 
              name="Classic Work Boots"
              brand="Viberg"
              price="$720"
              established="Est. 1931"
              image="/placeholder.svg?height=300&width=400"
              href="#"
            />
          </div>

          <h2 className="text-4xl font-serif mb-8 text-[#b8860b]">Food & Beverage</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <ProductCard 
              name="Canadian Whisky Collection"
              brand="Crown Royal"
              price="$38"
              established="Est. 1939"
              image="/placeholder.svg?height=300&width=400"
              href="#"
            />
            <ProductCard 
              name="Variety Pack"
              brand="Moosehead"
              price="$52"
              established="Est. 1867"
              image="/placeholder.svg?height=300&width=400"
              href="#"
            />
            <ProductCard 
              name="Pure Maple Syrup Set"
              brand="Quebec Maple"
              price="$45"
              established="Traditional"
              image="/placeholder.svg?height=300&width=400"
              href="#"
            />
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-[#1a3a1a] border-t-4 border-[#3a4a3a]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-serif mb-6 text-[#b8860b]">Last-Minute Canadian Gifts</h2>
          <p className="text-xl text-[#b8a896] mb-8 leading-relaxed">
            Need something fast? These Canadian brands offer quick shipping and digital gift cards 
            so you can support local even when you're running out of time.
          </p>
          <button className="px-8 py-4 bg-[#b8860b] text-[#0f1410] font-bold tracking-wide hover:bg-[#d4a520] transition-colors">
            VIEW QUICK SHIP OPTIONS
          </button>
        </div>
      </section>
    </main>
  )
}
