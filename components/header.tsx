'use client'

import Link from 'next/link'
import { useState } from 'react'
import { categories } from '@/lib/brands-data'

export function Header() {
  const [showCategories, setShowCategories] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-[#0f1410] border-b-4 border-[#3a4a3a]">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="text-2xl md:text-3xl font-serif text-[#b8860b] tracking-tight">
              Shop Canada
            </div>
          </Link>
          
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-[#f4ede4] hover:text-[#b8860b] transition-colors font-medium">
              Home
            </Link>
            <Link href="/all-brands" className="text-[#f4ede4] hover:text-[#b8860b] transition-colors font-medium">
              All Brands
            </Link>
            
            {/* Categories Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setShowCategories(true)}
              onMouseLeave={() => setShowCategories(false)}
            >
              <button className="text-[#f4ede4] hover:text-[#b8860b] transition-colors font-medium flex items-center gap-1">
                Categories
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {showCategories && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-[#0f1410] border-2 border-[#3a4a3a] shadow-xl">
                  <div className="p-2">
                    {categories.slice(0, 6).map((category) => (
                      <Link
                        key={category.slug}
                        href={`/category/${category.slug}`}
                        className="flex items-center gap-3 px-4 py-3 text-[#f4ede4] hover:bg-[#1a2a1a] hover:text-[#b8860b] transition-colors"
                      >
                        <span className="text-xl">{category.icon}</span>
                        <span className="flex-1">{category.name}</span>
                        <span className="text-xs text-[#b8a896]">({category.brandCount})</span>
                      </Link>
                    ))}
                    <Link
                      href="/categories"
                      className="block px-4 py-3 text-[#b8860b] hover:text-[#d4a520] transition-colors font-bold text-sm mt-2 border-t border-[#3a4a3a]"
                    >
                      View All Categories →
                    </Link>
                  </div>
                </div>
              )}
            </div>
            
            <Link href="/brands" className="text-[#f4ede4] hover:text-[#b8860b] transition-colors font-medium">
              Brand Stories
            </Link>
            <Link href="/reviews" className="text-[#f4ede4] hover:text-[#b8860b] transition-colors font-medium">
              Reviews
            </Link>
            <Link href="/about" className="text-[#f4ede4] hover:text-[#b8860b] transition-colors font-medium">
              About
            </Link>
          </nav>

          <button 
            className="md:hidden text-[#b8860b]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-[#3a4a3a] pt-4">
            <nav className="flex flex-col gap-4">
              <Link href="/" className="text-[#f4ede4] hover:text-[#b8860b]">Home</Link>
              <Link href="/all-brands" className="text-[#f4ede4] hover:text-[#b8860b]">All Brands</Link>
              <Link href="/categories" className="text-[#f4ede4] hover:text-[#b8860b]">Categories</Link>
              <Link href="/brands" className="text-[#f4ede4] hover:text-[#b8860b]">Brand Stories</Link>
              <Link href="/reviews" className="text-[#f4ede4] hover:text-[#b8860b]">Reviews</Link>
              <Link href="/about" className="text-[#f4ede4] hover:text-[#b8860b]">About</Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
