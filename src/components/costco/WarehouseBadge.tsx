'use client'

import { MapPin } from 'lucide-react'
import { WarehouseBadgeProps } from '@/types/costco'

/**
 * Badge showing warehouse availability for Costco products
 */
export function WarehouseBadge({ warehouseCount, size = 'md' }: WarehouseBadgeProps) {
  if (!warehouseCount || warehouseCount <= 0) return null

  const isLimited = warehouseCount < 50
  const bgColor = isLimited ? 'bg-amber-100' : 'bg-green-100'
  const textColor = isLimited ? 'text-amber-700' : 'text-green-700'
  const iconColor = isLimited ? 'text-amber-600' : 'text-green-600'

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-2.5 py-1',
    lg: 'text-base px-3 py-1.5',
  }

  const iconSizes = {
    sm: 12,
    md: 14,
    lg: 16,
  }

  const message = isLimited
    ? `Limited: ${warehouseCount} locations`
    : `${warehouseCount} Costco locations`

  return (
    <span
      className={`
        inline-flex items-center gap-1.5 rounded-full font-medium
        ${bgColor} ${textColor} ${sizeClasses[size]}
      `}
    >
      <MapPin size={iconSizes[size]} className={iconColor} />
      {message}
    </span>
  )
}
