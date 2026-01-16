'use client'

import Image from 'next/image'
import Link from 'next/link'
import { MapPin } from 'lucide-react'
import { CostcoDealCardProps } from '@/types/costco'

/**
 * Deal card component for Costco products
 * Shows price range instead of single price, plus warehouse availability
 */
export function CostcoDealCard({ product, variant = 'default' }: CostcoDealCardProps) {
  const {
    name,
    slug,
    image_url,
    category,
    current_price,
    current_price_min,
    current_price_max,
    warehouses_reporting,
  } = product

  // Determine display price
  const minPrice = current_price_min ?? current_price
  const maxPrice = current_price_max ?? current_price
  const hasPriceRange = minPrice !== null && maxPrice !== null && minPrice !== maxPrice

  const formatPrice = (price: number) => {
    return price.toLocaleString('en-CA', {
      style: 'currency',
      currency: 'CAD',
      minimumFractionDigits: 2,
    })
  }

  // Warehouse availability
  const hasWarehouses = warehouses_reporting && warehouses_reporting > 0
  const isLimited = warehouses_reporting !== null && warehouses_reporting < 50

  return (
    <Link
      href={`/deals/costco/${slug}`}
      className="deal-card group block"
    >
      {/* Image Container */}
      <div className="relative aspect-square bg-cream">
        {/* Costco Badge */}
        <div className="absolute top-2 left-2 z-10">
          <span className="bg-[#e31837] text-white px-2 py-1 rounded-lg font-bold text-xs shadow-md">
            COSTCO
          </span>
        </div>

        {/* Warehouse Badge */}
        {hasWarehouses && (
          <div className="absolute top-2 right-2 z-10">
            <span
              className={`
                inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium shadow-md
                ${isLimited ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'}
              `}
            >
              <MapPin size={10} />
              {warehouses_reporting}
            </span>
          </div>
        )}

        {/* Image */}
        <Image
          src={image_url || '/placeholder-deal.jpg'}
          alt={name}
          fill
          className="object-contain p-4 group-hover:scale-105 transition-transform duration-200"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Category */}
        {category && (
          <div className="flex items-center gap-1.5 mb-1">
            <span className="deal-card-store uppercase tracking-wide text-[#e31837]">
              {category}
            </span>
          </div>
        )}

        {/* Title */}
        <h3 className="deal-card-title mb-2 line-clamp-2 group-hover:text-maple-red transition-colors">
          {name}
        </h3>

        {/* Price Display */}
        <div className="mb-3">
          {minPrice !== null ? (
            hasPriceRange ? (
              <>
                <span className="deal-card-price">
                  {formatPrice(minPrice)} - {formatPrice(maxPrice!)}
                </span>
                <span className="block text-xs text-muted mt-0.5">
                  Price varies by location
                </span>
              </>
            ) : (
              <span className="deal-card-price">
                {formatPrice(minPrice)}
              </span>
            )
          ) : (
            <span className="text-muted">Check store for price</span>
          )}
        </div>

        {/* Warehouse availability text */}
        {hasWarehouses && (
          <div className="text-xs text-muted">
            Available at {warehouses_reporting} Costco locations
          </div>
        )}
      </div>
    </Link>
  )
}

/**
 * Grid wrapper for Costco deal cards
 */
export function CostcoDealGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {children}
    </div>
  )
}
