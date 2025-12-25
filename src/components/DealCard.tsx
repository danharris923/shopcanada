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

  // Random highlight tags for affiliated deals only
  const highlightTags = [
    { text: 'HOT DEAL', color: 'bg-red-600' },
    { text: 'BEST PRICE', color: 'bg-orange-600' },
    { text: 'LIMITED TIME', color: 'bg-purple-600' },
    { text: 'TRENDING', color: 'bg-pink-600' },
    { text: 'POPULAR', color: 'bg-blue-600' },
    { text: 'FLASH SALE', color: 'bg-green-600' },
    { text: 'EXCLUSIVE', color: 'bg-indigo-600' },
    { text: 'TOP PICK', color: 'bg-yellow-600' },
  ]

  // Generate consistent random tag based on deal ID
  const getRandomTag = (dealId: string) => {
    const hash = dealId.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0)
      return a & a
    }, 0)
    return highlightTags[Math.abs(hash) % highlightTags.length]
  }

  const shouldShowHighlight = affiliateUrl && !directAffiliate
  const randomTag = shouldShowHighlight ? getRandomTag(id) : null

  // CTR-focused button phrases with consistent site colors
  const buttonVariations = [
    { text: 'Get Deal Now', style: 'primary' },
    { text: 'Shop Now', style: 'secondary' },
    { text: 'Claim Offer', style: 'primary' },
    { text: 'View Deal', style: 'secondary' },
    { text: 'Save Now', style: 'primary' },
    { text: 'Buy Now', style: 'secondary' },
    { text: 'See Offer', style: 'primary' },
    { text: 'Get Discount', style: 'secondary' },
  ]

  // Generate consistent random button based on deal ID
  const getRandomButton = (dealId: string) => {
    const hash = dealId.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0)
      return a & a
    }, 0)
    return buttonVariations[Math.abs(hash) % buttonVariations.length]
  }

  const randomButton = getRandomButton(id)

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

        {/* Highlight Badge - Only show for affiliate deals with random tags */}
        {randomTag && (
          <div className="absolute top-2 left-2 z-10">
            <span className={`
              ${randomTag.color} text-white
              px-2 py-1 rounded-lg
              font-bold text-xs
              shadow-md
              animate-pulse
            `}>
              {randomTag.text}
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
        <div className="flex items-baseline gap-2 mb-3">
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
              Price varies
            </span>
          )}
        </div>

        {/* Savings */}
        {savings && (
          <div className="text-sm text-maple-red font-semibold mb-3">
            Save ${savings}
          </div>
        )}

        {/* CTA Button */}
        <button className={`
          w-full py-2 px-4 rounded-lg font-semibold text-sm
          transition-all duration-200
          transform hover:scale-105 hover:shadow-lg
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-maple-red
          ${randomButton.style === 'primary'
            ? 'bg-maple-red hover:bg-burgundy text-white'
            : 'bg-white hover:bg-cream text-maple-red border-2 border-maple-red hover:border-burgundy'
          }
        `}>
          {randomButton.text}
        </button>
      </div>
    </>
  )

  // Always go direct to retailer if affiliateUrl exists
  if (affiliateUrl) {
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

  // Fallback - navigate to deal page if no affiliate URL
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
