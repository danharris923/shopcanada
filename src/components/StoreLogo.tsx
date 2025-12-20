'use client'

import { useState } from 'react'

interface StoreLogoProps {
  src: string
  alt: string
  domain: string
  size?: number
  className?: string
}

export function StoreLogo({ src, alt, domain, size = 40, className = '' }: StoreLogoProps) {
  const [imgSrc, setImgSrc] = useState(src)
  const [hasError, setHasError] = useState(false)

  const handleError = () => {
    if (!hasError) {
      setHasError(true)
      // Fallback to Google favicon
      setImgSrc(`https://www.google.com/s2/favicons?domain=${domain}&sz=128`)
    }
  }

  return (
    <img
      src={imgSrc}
      alt={alt}
      width={size}
      height={size}
      className={`object-contain ${className}`}
      onError={handleError}
    />
  )
}
