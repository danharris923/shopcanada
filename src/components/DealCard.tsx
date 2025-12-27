'use client'

import { Leaf, ExternalLink, RotateCcw, Truck, Crown, Scale } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { DealCardProps } from '@/types/deal'
import { toNumber, formatPrice, calculateSavings } from '@/lib/price-utils'
import { getStoreLogo, generateLogoUrl } from '@/lib/store-logos'
import { getBrandBySlug } from '@/lib/brands-data'
import { getStoreInfo } from '@/lib/store-info'

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
  const storeLogoInfo = getStoreLogo(storeSlug)
  const brand = getBrandBySlug(storeSlug)
  const storeLogo = storeLogoInfo?.logo || brand?.logo || generateLogoUrl(storeSlug.replace(/-/g, '') + '.ca')
  const storeName = storeLogoInfo?.name || brand?.name || store

  // Get store policies for SEO badges
  const storeData = getStoreInfo(storeSlug)

  // Parse return days from policy text
  const getReturnDays = (policy: string): string | null => {
    const match = policy.match(/(\d+)\s*day/i)
    return match ? `${match[1]}-day returns` : null
  }

  // Parse free shipping threshold
  const getShipThreshold = (shipping: string): string | null => {
    const match = shipping.match(/\$(\d+)/i)
    if (shipping.toLowerCase().includes('free') && match) {
      return `Free ship $${match[1]}+`
    }
    return null
  }

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
        {priceNum !== null && (
          <div className="flex items-baseline gap-2 mb-3">
            <span className="deal-card-price">
              ${formatPrice(priceNum)}
            </span>
            {originalPriceNum !== null && (
              <span className="deal-card-original-price">
                ${formatPrice(originalPriceNum)}
              </span>
            )}
          </div>
        )}

        {/* Savings */}
        {savings && (
          <div className="text-sm text-maple-red font-semibold mb-2">
            Save ${savings}
          </div>
        )}

        {/* Store Info Badges - Real SEO data */}
        {storeData && (
          <div className="flex flex-wrap gap-1 mb-3">
            {storeData.returnPolicy && getReturnDays(storeData.returnPolicy) && (
              <span className="inline-flex items-center gap-0.5 text-[10px] text-charcoal bg-cream px-1.5 py-0.5 rounded">
                <RotateCcw size={10} className="text-maple-red" />
                {getReturnDays(storeData.returnPolicy)}
              </span>
            )}
            {storeData.loyaltyProgram && (
              <span className="inline-flex items-center gap-0.5 text-[10px] text-charcoal bg-cream px-1.5 py-0.5 rounded">
                <Crown size={10} className="text-maple-red" />
                {storeData.loyaltyProgram.name}
              </span>
            )}
            {storeData.shippingInfo && getShipThreshold(storeData.shippingInfo) && (
              <span className="inline-flex items-center gap-0.5 text-[10px] text-charcoal bg-cream px-1.5 py-0.5 rounded">
                <Truck size={10} className="text-maple-red" />
                {getShipThreshold(storeData.shippingInfo)}
              </span>
            )}
            {storeData.priceMatch && (
              <span className="inline-flex items-center gap-0.5 text-[10px] text-charcoal bg-cream px-1.5 py-0.5 rounded">
                <Scale size={10} className="text-maple-red" />
                Price Match
              </span>
            )}
          </div>
        )}

        {/* Read More button */}
        <div className="mt-2">
          <button
            onClick={handleReadMoreClick}
            className="inline-block px-4 py-2 bg-white border border-charcoal text-charcoal text-sm font-medium rounded-lg hover:shadow-md transition-shadow"
          >
            Read More
          </button>
        </div>
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
