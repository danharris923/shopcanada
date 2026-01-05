'use client'

import { useState } from 'react'

interface StoreLogoProps {
  src: string
  alt: string
  domain: string
  size?: number
  className?: string
}

// Color palette for letter avatars (Google-style colors)
const AVATAR_COLORS = [
  '#EA4335', // Red
  '#4285F4', // Blue
  '#34A853', // Green
  '#FBBC05', // Yellow
  '#FF6D01', // Orange
  '#46BDC6', // Teal
  '#7B1FA2', // Purple
  '#C2185B', // Pink
]

// Get consistent color based on name
function getAvatarColor(name: string): string {
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash)
  }
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length]
}

// Get first letter (handles special cases)
function getInitial(name: string): string {
  const cleaned = name.trim()
  if (!cleaned) return '?'
  return cleaned.charAt(0).toUpperCase()
}

export function StoreLogo({ src, alt, domain, size = 40, className = '' }: StoreLogoProps) {
  const [imgSrc, setImgSrc] = useState(src)
  const [errorCount, setErrorCount] = useState(0)

  const handleError = () => {
    if (errorCount === 0) {
      // First error: try Google favicon
      setErrorCount(1)
      setImgSrc(`https://www.google.com/s2/favicons?domain=${domain}&sz=128`)
    } else if (errorCount === 1) {
      // Second error: give up on images
      setErrorCount(2)
    }
  }

  // Show letter avatar if all image sources failed
  if (errorCount >= 2 || (!src && !domain)) {
    const bgColor = getAvatarColor(alt)
    const fontSize = Math.floor(size * 0.5)

    return (
      <div
        className={`flex items-center justify-center rounded-full text-white font-semibold ${className}`}
        style={{
          width: size,
          height: size,
          backgroundColor: bgColor,
          fontSize: fontSize,
        }}
        aria-label={alt}
      >
        {getInitial(alt)}
      </div>
    )
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
