'use client'

import { PriceRangeDisplayProps } from '@/types/costco'

/**
 * Display price range for Costco products (min-max)
 */
export function PriceRangeDisplay({
  priceMin,
  priceMax,
  currentPrice,
  size = 'md',
}: PriceRangeDisplayProps) {
  // Determine the display price
  const minPrice = priceMin ?? currentPrice
  const maxPrice = priceMax ?? currentPrice

  // No price data
  if (minPrice === null && maxPrice === null) {
    return (
      <div className="text-muted text-sm">
        Price not available
      </div>
    )
  }

  const formatPrice = (price: number) => {
    return price.toLocaleString('en-CA', {
      style: 'currency',
      currency: 'CAD',
      minimumFractionDigits: 2,
    })
  }

  const sizeClasses = {
    sm: {
      price: 'text-lg font-bold',
      subtext: 'text-xs',
    },
    md: {
      price: 'text-xl font-bold',
      subtext: 'text-sm',
    },
    lg: {
      price: 'text-2xl font-bold',
      subtext: 'text-sm',
    },
    xl: {
      price: 'text-3xl font-bold',
      subtext: 'text-base',
    },
  }

  const classes = sizeClasses[size]

  // Single price (min equals max or only one exists)
  const hasSinglePrice = minPrice === maxPrice || !minPrice || !maxPrice
  const effectiveMin = minPrice || maxPrice || 0
  const effectiveMax = maxPrice || minPrice || 0

  if (hasSinglePrice || effectiveMin === effectiveMax) {
    return (
      <div>
        <span className={`${classes.price} text-maple-red`}>
          {formatPrice(effectiveMin)}
        </span>
      </div>
    )
  }

  // Price range
  return (
    <div>
      <div className={`${classes.price} text-maple-red`}>
        {formatPrice(effectiveMin)} - {formatPrice(effectiveMax)}
      </div>
      <div className={`${classes.subtext} text-muted mt-1`}>
        Price varies by location
      </div>
    </div>
  )
}
