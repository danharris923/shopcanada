'use client'

import { Leaf, ExternalLink, RotateCcw, Truck } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { DealCardProps } from '@/types/deal'
import { toNumber, formatPrice, calculateSavings } from '@/lib/price-utils'
import { getReturnDays, getShipThreshold } from '@/lib/utils/policy-parser'
import { getRandomTag } from '@/lib/utils/deal-utils'
import { getAffiliateSearchUrl, getDealAffiliateUrl } from '@/lib/affiliates'

// Helper to generate fallback logo URL using Google favicons
const generateLogoUrl = (domain: string) =>
  `https://www.google.com/s2/favicons?domain=${domain}&sz=128`

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
  // Store data from database (passed from server component)
  storeData,
  // Flipp-specific props
  variant = 'default',
  storeSlug: propStoreSlug,
  storeLogo: propStoreLogo,
  validTo,
  saleStory,
}: DealCardProps) {
  const isFlipp = variant === 'flipp'

  const priceNum = toNumber(price)
  const originalPriceNum = toNumber(originalPrice)
  const savings = calculateSavings(originalPrice, price)

  // Determine store slug - use prop for Flipp, derive from storeData, or from store name
  const storeSlug = propStoreSlug || storeData?.slug || store?.toLowerCase().replace(/\s+/g, '-') || ''

  // Determine store logo - use prop for Flipp, then database data, then fallback to generated URL
  const storeLogo = propStoreLogo || storeData?.logo_url || generateLogoUrl(storeSlug.replace(/-/g, '') + '.ca')
  const storeName = storeData?.name || store

  // Store policy data for SEO badges (from storeData prop)
  const hasReturnPolicy = storeData?.return_policy
  const hasShippingInfo = storeData?.shipping_info

  // Build affiliate URL with search-wrapping for frictionless shopping
  // Uses getDealAffiliateUrl which search-wraps homepage links
  const effectiveAffiliateUrl = getDealAffiliateUrl(affiliateUrl || null, storeSlug, title) || ''

  const shouldShowHighlight = effectiveAffiliateUrl && !directAffiliate
  const randomTag = shouldShowHighlight ? getRandomTag(id) : null

  // For Flipp: show FLYER badge when no random tag
  const showFlyerBadge = isFlipp && !randomTag

  // Flipp-specific: check if we have price data
  const hasPriceData = priceNum !== null && priceNum > 0
  const hasDiscount = discountPercent !== null && discountPercent > 0

  // Check if this is a fashion affiliate deal (synthetic, no deal page)
  const isFashionDeal = id.startsWith('fashion-')

  // Function to handle Read More click
  // Affiliated deals go to store page, others go to deal page
  const handleReadMoreClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (effectiveAffiliateUrl && storeSlug) {
      window.location.href = `/stores/${storeSlug}`
    } else {
      window.location.href = `/deals/${slug}`
    }
  }

  const cardContent = (
    <>
      {/* Image Container */}
      <div className="relative aspect-square bg-cream">
        {/* Discount Badge */}
        {hasDiscount && (
          <div className="discount-badge">
            -{discountPercent}%
          </div>
        )}

        {/* Highlight Badge - Only show for affiliate deals with random tags */}
        {randomTag ? (
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
        ) : showFlyerBadge ? (
          <div className="absolute top-2 left-2 z-10">
            <span className="
              bg-orange-600 text-white
              px-2 py-1 rounded-lg
              font-bold text-xs
              shadow-md
            ">
              FLYER
            </span>
          </div>
        ) : null}

        {/* Direct Affiliate Badge */}
        {directAffiliate && effectiveAffiliateUrl && (
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

        {/* Canadian Badge (only for regular variant) */}
        {!isFlipp && isCanadian && (
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
          unoptimized={isFlipp}
        />
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Store with Logo */}
        {store && storeName && (
          <div className="flex items-center gap-1.5 mb-1">
            {storeLogo && (
              <img
                src={storeLogo}
                alt={`${storeName} logo`}
                className="w-4 h-4 rounded-sm object-contain"
                onError={(e) => { e.currentTarget.style.display = 'none' }}
              />
            )}
            <span className="deal-card-store uppercase tracking-wide">
              {storeName}
            </span>
          </div>
        )}

        {/* Title */}
        <h3 className="deal-card-title mb-2 line-clamp-2 group-hover:text-maple-red transition-colors">
          {title}
        </h3>

        {/* Price - different logic for Flipp variant */}
        {isFlipp ? (
          <div className="flex items-baseline gap-2 mb-3">
            {hasPriceData ? (
              <>
                <span className="deal-card-price">
                  ${priceNum?.toFixed(2)}
                </span>
                {originalPriceNum !== null && originalPriceNum > (priceNum || 0) && (
                  <span className="deal-card-original-price">
                    ${originalPriceNum.toFixed(2)}
                  </span>
                )}
              </>
            ) : saleStory ? (
              <span className="text-lg font-semibold text-maple-red">
                {saleStory}
              </span>
            ) : (
              <span className="text-lg font-semibold text-charcoal">
                Check Flyer
              </span>
            )}
          </div>
        ) : (
          // Regular variant price display
          priceNum !== null && (
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
          )
        )}

        {/* Savings (only for regular variant) */}
        {!isFlipp && savings && (
          <div className="text-sm text-maple-red font-semibold mb-2">
            Save ${savings}
          </div>
        )}

        {/* Valid dates (only for Flipp variant) */}
        {isFlipp && validTo && (
          <div className="text-sm text-meta mb-2">
            Valid until {validTo.split('T')[0]}
          </div>
        )}

        {/* Store Info Badges - from database */}
        {storeData && (hasReturnPolicy || hasShippingInfo) && (
          <div className="flex flex-wrap gap-1 mb-3">
            {storeData.return_policy && getReturnDays(storeData.return_policy) && (
              <span className="inline-flex items-center gap-0.5 text-[10px] text-charcoal bg-cream px-1.5 py-0.5 rounded">
                <RotateCcw size={10} className="text-maple-red" />
                {getReturnDays(storeData.return_policy)}
              </span>
            )}
            {storeData.shipping_info && getShipThreshold(storeData.shipping_info) && (
              <span className="inline-flex items-center gap-0.5 text-[10px] text-charcoal bg-cream px-1.5 py-0.5 rounded">
                <Truck size={10} className="text-maple-red" />
                {getShipThreshold(storeData.shipping_info)}
              </span>
            )}
          </div>
        )}

        {/* Read More / Shop Now button (only for regular variant) */}
        {!isFlipp && (
          <div className="mt-2">
            <button
              onClick={handleReadMoreClick}
              className="inline-block px-4 py-2 bg-white border border-charcoal text-charcoal text-sm font-medium rounded-lg hover:shadow-md transition-shadow"
            >
              Read More
            </button>
          </div>
        )}
      </div>
    </>
  )

  // Always go direct to retailer if affiliateUrl exists
  if (effectiveAffiliateUrl) {
    return (
      <a
        href={effectiveAffiliateUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="deal-card group block cursor-pointer hover:no-underline"
      >
        {cardContent}
      </a>
    )
  }

  // For Flipp with no affiliate: display without link
  if (isFlipp) {
    return (
      <div className="deal-card group block">
        {cardContent}
      </div>
    )
  }

  // Fallback - navigate to deal page if no affiliate URL (regular variant)
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

// Alias for FlippDealGrid - same as DealGrid for backward compatibility
export const FlippDealGrid = DealGrid
