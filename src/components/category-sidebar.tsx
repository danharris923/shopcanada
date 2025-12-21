'use client'

import Link from 'next/link'
import { categories } from '@/lib/brands-data'
import { CategoryIcon } from '@/components/CategoryIcon'

interface CategorySidebarProps {
  activeCategory?: string
}

export function CategorySidebar({ activeCategory }: CategorySidebarProps) {
  return (
    <aside className="w-64 shrink-0 hidden lg:block">
      <div className="sticky top-24 bg-white border border-silver-light rounded-card p-6">
        <h3 className="text-maple-red font-bold tracking-wider uppercase text-sm mb-4">
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
                      ? 'bg-burgundy text-white font-bold'
                      : 'text-slate hover:text-charcoal hover:bg-ivory'
                  }`}
                >
                  <CategoryIcon category={category.name} size={18} className={isActive ? 'text-white' : 'text-maple-red'} />
                  <span className="flex-1">{category.name}</span>
                  <span className={`text-xs ${isActive ? 'text-silver-light' : 'text-silver'}`}>
                    ({category.brandCount})
                  </span>
                </Link>
              </li>
            )
          })}
        </ul>

        <div className="mt-8 pt-6 border-t border-silver-light">
          <h4 className="text-maple-red font-bold tracking-wider uppercase text-xs mb-3">
            Quick Links
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/canadian/brands" className="text-slate hover:text-maple-red">
                All Brands A-Z
              </Link>
            </li>
            <li>
              <Link href="/canadian/categories" className="text-slate hover:text-maple-red">
                All Categories
              </Link>
            </li>
            <li>
              <Link href="/canadian" className="text-slate hover:text-maple-red">
                Canadian Home
              </Link>
            </li>
          </ul>
        </div>

        <div className="mt-6 p-4 bg-ivory border border-silver-light rounded text-center">
          <p className="text-xs text-slate mb-2">Can&apos;t find what you&apos;re looking for?</p>
          <Link href="/canadian/brands" className="text-maple-red hover:text-burgundy text-sm font-bold">
            View All Brands A-Z →
          </Link>
        </div>
      </div>
    </aside>
  )
}
