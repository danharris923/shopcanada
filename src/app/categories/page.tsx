import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { CategoryIcon } from '@/components/CategoryIcon'
import { Smartphone, Shirt, Home, ShoppingCart, Sparkles, Dumbbell, BookOpen, Baby, Gamepad2, Wrench, Heart, Package } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Browse Categories - Shop Canada',
  description: 'Browse deals by category. Find the best prices on electronics, fashion, home goods, groceries, and more from Canadian retailers.',
}

const categories = [
  { slug: 'electronics', name: 'Electronics', icon: Smartphone, description: 'Computers, phones, tablets, gaming, and tech accessories', count: '2,500+' },
  { slug: 'fashion', name: 'Fashion & Apparel', icon: Shirt, description: 'Clothing, shoes, accessories for men, women, and kids', count: '5,000+' },
  { slug: 'home', name: 'Home & Garden', icon: Home, description: 'Furniture, decor, appliances, tools, and outdoor living', count: '3,200+' },
  { slug: 'grocery', name: 'Grocery & Food', icon: ShoppingCart, description: 'Fresh food, pantry staples, snacks, and beverages', count: '1,800+' },
  { slug: 'beauty', name: 'Beauty & Personal Care', icon: Sparkles, description: 'Skincare, makeup, haircare, and wellness products', count: '2,100+' },
  { slug: 'sports', name: 'Sports & Outdoors', icon: Dumbbell, description: 'Fitness equipment, outdoor gear, and sportswear', count: '1,500+' },
  { slug: 'books', name: 'Books & Media', icon: BookOpen, description: 'Books, e-books, movies, music, and games', count: '800+' },
  { slug: 'baby', name: 'Baby & Kids', icon: Baby, description: 'Baby gear, toys, kids clothing, and nursery items', count: '1,200+' },
  { slug: 'toys', name: 'Toys & Games', icon: Gamepad2, description: 'Toys, board games, video games, and collectibles', count: '900+' },
  { slug: 'tools', name: 'Tools & Hardware', icon: Wrench, description: 'Power tools, hand tools, hardware, and automotive', count: '1,100+' },
  { slug: 'health', name: 'Health & Wellness', icon: Heart, description: 'Vitamins, supplements, medical supplies, and fitness', count: '750+' },
  { slug: 'other', name: 'Everything Else', icon: Package, description: 'Office supplies, pet supplies, and miscellaneous items', count: '2,000+' },
]

export default function CategoriesPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-cream">
        {/* Hero */}
        <section className="bg-soft-black py-12">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold text-white mb-4">
              Browse by Category
            </h1>
            <p className="text-silver-light text-lg max-w-2xl mx-auto">
              Find the best deals organized by category from hundreds of Canadian retailers
            </p>
          </div>
        </section>

        {/* Categories Grid */}
        <section className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {categories.map(category => {
                const Icon = category.icon
                return (
                  <Link
                    key={category.slug}
                    href={`/category/${category.slug}`}
                    className="group bg-white border border-silver-light rounded-card p-6 hover:border-maple-red hover:shadow-card-hover transition-all"
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-cream rounded-lg group-hover:bg-maple-red/10 transition-colors">
                        <Icon size={32} className="text-maple-red" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-charcoal group-hover:text-maple-red transition-colors mb-1">
                          {category.name}
                        </h3>
                        <p className="text-sm text-slate mb-2">
                          {category.description}
                        </p>
                        <span className="text-xs font-semibold text-maple-red">
                          {category.count} deals
                        </span>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>

        {/* Featured Categories */}
        <section className="py-12 px-4 bg-white border-t border-silver-light">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold text-charcoal mb-6">Popular Right Now</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {['electronics', 'fashion', 'home', 'grocery'].map(slug => {
                const category = categories.find(c => c.slug === slug)
                if (!category) return null
                const Icon = category.icon

                return (
                  <Link
                    key={category.slug}
                    href={`/category/${category.slug}`}
                    className="flex flex-col items-center justify-center p-6 bg-cream rounded-card hover:bg-ivory transition-colors group"
                  >
                    <Icon size={40} className="text-maple-red mb-3" />
                    <span className="font-semibold text-charcoal group-hover:text-maple-red transition-colors text-center">
                      {category.name}
                    </span>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}