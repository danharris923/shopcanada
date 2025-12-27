'use client'

import { Leaf, ExternalLink } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { DealCardProps } from '@/types/deal'
import { toNumber, formatPrice, calculateSavings } from '@/lib/price-utils'
import { getStoreLogo, generateLogoUrl } from '@/lib/store-logos'
import { getBrandBySlug } from '@/lib/brands-data'

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

  // Get store info from brand data
  const storeSlug = store?.toLowerCase().replace(/\s+/g, '-') || ''
  const storeInfo = getStoreLogo(storeSlug)
  const brand = getBrandBySlug(storeSlug)
  const storeLogo = storeInfo?.logo || brand?.logo || generateLogoUrl(storeSlug.replace(/-/g, '') + '.ca')
  const storeName = storeInfo?.name || brand?.name || store

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

  // Function to handle Read more click
  const handleReadMoreClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    window.location.href = `/deals/${slug}`
  }

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
        {/* Store with Logo */}
        <div className="flex items-center gap-1.5 mb-1">
          {storeLogo && (
            <img
              src={storeLogo}
              alt=""
              className="w-4 h-4 rounded-sm object-contain"
              onError={(e) => { e.currentTarget.style.display = 'none' }}
            />
          )}
          <span className="deal-card-store uppercase tracking-wide">
            {storeName}
          </span>
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

        {/* Read more link - only show if there's an affiliate URL (main card is clickable) */}
        {affiliateUrl && (
          <div className="mt-3 pt-2 border-t border-gray-100">
            <button
              onClick={handleReadMoreClick}
              className="text-xs text-gray-500 hover:text-gray-700 transition-colors duration-200"
            >
              Read more →
            </button>
          </div>
        )}
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
        className="deal-card group block cursor-pointer hover:no-underline"
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
