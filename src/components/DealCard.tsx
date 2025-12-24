'use client'

import { Leaf, ExternalLink } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { DealCardProps } from '@/types/deal'
import { toNumber, formatPrice, calculateSavings } from '@/lib/price-utils'

export function DealCard({
  id,
  title,
  slug,
  imageUrl,
  price,
  originalPrice,
  discountPercent,
  store,
  affiliateUrl,
  featured,
  isCanadian,
  directAffiliate = false,
}: DealCardProps) {
  const priceNum = toNumber(price)
  const originalPriceNum = toNumber(originalPrice)
  const savings = calculateSavings(originalPrice, price)

  const cardContent = (
    <>
      {/* Image Container */}
      <div className="relative aspect-square bg-cream">
        {/* Discount Badge */}
        {discountPercent && discountPercent > 0 && (
          <div className="discount-badge">
            -{discountPercent}%
          </div>
        )}

        {/* Featured Badge - Only show for deals with admin-set affiliate links */}
        {affiliateUrl && (
          <div className="absolute top-2 left-2 z-10">
            <span className="
              bg-burgundy text-white
              px-2 py-1 rounded-lg
              font-bold text-xs
              shadow-md
            ">
              HOT DEAL
            </span>
          </div>
        )}

        {/* Direct Affiliate Badge */}
        {directAffiliate && (
          <div className="absolute top-2 right-2 z-10">
            <span className="
              bg-maple-red text-white
              px-2 py-1 rounded-lg
              font-bold text-xs
              shadow-md
              flex items-center gap-1
            ">
              <ExternalLink size={10} /> Direct
            </span>
          </div>
        )}

        {/* Canadian Badge */}
        {isCanadian && (
          <div className="absolute bottom-2 left-2 z-10">
            <span className="
              bg-white text-maple-red
              px-2 py-1 rounded-lg
              font-bold text-xs
              shadow-md border border-maple-red
              flex items-center gap-1
            ">
              <Leaf size={12} className="text-maple-red" /> Canadian
            </span>
          </div>
        )}


        {/* Image */}
        <Image
          src={imageUrl || '/placeholder-deal.jpg'}
          alt={title}
          fill
          className="object-contain p-4 group-hover:scale-105 transition-transform duration-200"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Store */}
        <div className="deal-card-store uppercase tracking-wide mb-1">
          {store}
        </div>

        {/* Title */}
        <h3 className="deal-card-title mb-2 line-clamp-2 group-hover:text-maple-red transition-colors">
          {title}
        </h3>

        {/* Price */}
        <div className="flex items-baseline gap-2">
          {priceNum !== null ? (
            <>
              <span className="deal-card-price">
                ${formatPrice(priceNum)}
              </span>
              {originalPriceNum !== null && (
                <span className="deal-card-original-price">
                  ${formatPrice(originalPriceNum)}
                </span>
              )}
            </>
          ) : (
            <span className="text-lg font-semibold text-charcoal">
              See Deal
            </span>
          )}
        </div>

        {/* Savings */}
        {savings && (
          <div className="text-sm text-maple-red font-semibold mt-1">
            Save ${savings}
          </div>
        )}
      </div>
    </>
  )

  // Conditional rendering based on directAffiliate prop
  if (directAffiliate && affiliateUrl) {
    return (
      <a
        href={affiliateUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="deal-card group block cursor-pointer"
      >
        {cardContent}
      </a>
    )
  }

  // Default behavior - navigate to deal page
  return (
    <Link
      href={`/deals/${slug}`}
      className="deal-card group block"
    >
      {cardContent}
    </Link>
  )
}

// Grid wrapper for deal cards
export function DealGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {children}
    </div>
  )
}
