'use client'

import Link from 'next/link'
import { categories } from '@/lib/brands-data'

interface CategorySidebarProps {
  activeCategory?: string
}

export function CategorySidebar({ activeCategory }: CategorySidebarProps) {
  return (
    <aside className="w-64 shrink-0 hidden lg:block">
      <div className="sticky top-24 bg-[#1a2a1a] border-2 border-[#3a4a3a] p-6">
        <h3 className="text-[#b8860b] font-bold tracking-wider uppercase text-sm mb-4">
          Browse Categories
        </h3>
        <ul className="space-y-2 max-h-[60vh] overflow-y-auto">
          {categories.map((category) => {
            const isActive = activeCategory === category.slug
            return (
              <li key={category.slug}>
                <Link
                  href={`/canadian/category/${category.slug}`}
                  className={`flex items-center gap-2 text-sm py-2 px-3 rounded transition-colors ${
                    isActive
                      ? 'bg-[#5c1a1a] text-[#b8860b] font-bold'
                      : 'text-[#b8a896] hover:text-[#f4ede4] hover:bg-[#2a3a2a]'
                  }`}
                >
                  <span className="text-lg">{category.icon}</span>
                  <span className="flex-1">{category.name}</span>
                  <span className="text-xs text-[#b8a896]">({category.brandCount})</span>
                </Link>
              </li>
            )
          })}
        </ul>

        <div className="mt-8 pt-6 border-t border-[#3a4a3a]">
          <h4 className="text-[#b8860b] font-bold tracking-wider uppercase text-xs mb-3">
            Quick Links
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/canadian/brands" className="text-[#b8a896] hover:text-[#b8860b]">
                • All Brands A-Z
              </Link>
            </li>
            <li>
              <Link href="/canadian/categories" className="text-[#b8a896] hover:text-[#b8860b]">
                • All Categories
              </Link>
            </li>
            <li>
              <Link href="/canadian" className="text-[#b8a896] hover:text-[#b8860b]">
                • Canadian Home
              </Link>
            </li>
          </ul>
        </div>

        <div className="mt-6 p-4 bg-[#0f1410] border border-[#3a4a3a] text-center">
          <p className="text-xs text-[#b8a896] mb-2">Can't find what you're looking for?</p>
          <Link href="/canadian/brands" className="text-[#b8860b] hover:text-[#d4a520] text-sm font-bold">
            View All Brands A-Z →
          </Link>
        </div>
      </div>
    </aside>
  )
}
