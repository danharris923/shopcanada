import Link from 'next/link'
import { categories } from '@/lib/brands-data'

export function Footer() {
  const popularCategories = categories.slice(0, 6)
  
  return (
    <footer className="bg-[#0f1410] border-t-4 border-[#3a4a3a] py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-serif text-[#b8860b] mb-4">Shop Canada</h3>
            <p className="text-[#b8a896] text-sm leading-relaxed">
              Supporting Canadian businesses and manufacturing through informed purchasing decisions.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-[#f4ede4] mb-3">Popular Categories</h4>
            <ul className="space-y-2 text-sm">
              {popularCategories.map((category) => (
                <li key={category.slug}>
                  <Link href={`/category/${category.slug}`} className="text-[#b8a896] hover:text-[#b8860b]">
                    {category.icon} {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-[#f4ede4] mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/all-brands" className="text-[#b8a896] hover:text-[#b8860b]">All Brands A-Z</Link></li>
              <li><Link href="/categories" className="text-[#b8a896] hover:text-[#b8860b]">Browse Categories</Link></li>
              <li><Link href="/brands" className="text-[#b8a896] hover:text-[#b8860b]">Brand Stories</Link></li>
              <li><Link href="/reviews" className="text-[#b8a896] hover:text-[#b8860b]">Reviews</Link></li>
              <li><Link href="/about" className="text-[#b8a896] hover:text-[#b8860b]">About Us</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-[#f4ede4] mb-3">Connect</h4>
            <p className="text-[#b8a896] text-sm mb-3">Subscribe to Shop Canada Weekly</p>
            <input 
              type="email" 
              placeholder="Email address" 
              className="w-full px-4 py-2 bg-[#1a2a1a] text-[#f4ede4] border border-[#3a4a3a] text-sm mb-2"
            />
            <button className="w-full px-4 py-2 bg-[#b8860b] text-[#0f1410] text-sm font-bold hover:bg-[#d4a520]">
              SUBSCRIBE
            </button>
          </div>
        </div>
        
        <div className="py-6 border-t border-b border-[#3a4a3a] text-center">
          <p className="text-[#b8a896] text-sm mb-2">Can't find what you're looking for?</p>
          <div className="flex justify-center gap-4 text-sm">
            <Link href="/all-brands" className="text-[#b8860b] hover:text-[#d4a520] font-bold">
              View All Brands A-Z
            </Link>
            <span className="text-[#b8a896]">or</span>
            <Link href="/categories" className="text-[#b8860b] hover:text-[#d4a520] font-bold">
              Browse Categories
            </Link>
          </div>
        </div>
        
        <div className="pt-8 text-center text-sm text-[#b8a896]">
          <p>© 2025 Shop Canada. Supporting Canadian manufacturing and craftsmanship.</p>
        </div>
      </div>
    </footer>
  )
}
