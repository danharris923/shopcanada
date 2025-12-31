"use client"

import { useState } from 'react'
import { toNumber, formatPrice } from '@/lib/price-utils'

interface CTAButtonProps {
  href: string
  price?: number | string | null
  storeName?: string
  variant?: 'primary' | 'secondary'
  size?: 'md' | 'lg' | 'xl'
  fullWidth?: boolean
  animate?: boolean
}

export function CTAButton({
  href,
  price,
  storeName,
  variant = 'primary',
  size = 'lg',
  fullWidth = true,
  animate = true,
}: CTAButtonProps) {
  const [isHovered, setIsHovered] = useState(false)
  const priceNum = toNumber(price)

  const sizeClasses = {
    md: 'py-3 px-6 text-base',
    lg: 'py-4 px-8 text-lg',
    xl: 'py-5 px-10 text-xl',
  }

  const variantClasses = {
    primary: `
      bg-maple-red hover:bg-burgundy
      shadow-lg shadow-maple-red/30
      hover:shadow-xl hover:shadow-burgundy/40
    `,
    secondary: `
      bg-burgundy hover:bg-burgundy-dark
      shadow-lg shadow-burgundy/30
      hover:shadow-xl hover:shadow-burgundy-dark/40
    `,
  }

  const buttonText = priceNum !== null
    ? `GET THIS DEAL - $${formatPrice(priceNum)}`
    : 'GET THIS DEAL NOW'

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer nofollow"
      className={`
        inline-flex items-center justify-center
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${fullWidth ? 'w-full' : ''}
        ${animate ? 'animate-pulse hover:animate-none' : ''}
        text-white font-black uppercase tracking-wide
        rounded-button
        transition-all duration-200
        hover:scale-105 active:scale-95
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => {
        // Track click event (analytics placeholder)
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'click', {
            event_category: 'affiliate',
            event_label: storeName || 'unknown',
          })
        }
      }}
    >
      <span className={`transition-transform duration-200 ${isHovered ? 'scale-110' : ''}`}>
        {buttonText}
      </span>
    </a>
  )
}

// Secondary CTA for "Compare Prices" etc
export function SecondaryCTA({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  return (
    <a
      href={href}
      className="
        inline-flex items-center justify-center
        py-3 px-6 w-full
        bg-ivory hover:bg-warm-grey
        text-charcoal font-medium
        rounded-button
        transition-colors duration-200
      "
    >
      {children}
    </a>
  )
}
