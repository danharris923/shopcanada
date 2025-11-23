import React from 'react'
import Link from 'next/link'

interface PrimaryButtonProps {
  children: React.ReactNode
  href?: string
  onClick?: () => void
  className?: string
  target?: string
  rel?: string
}

/**
 * Primary CTA button with 2025 design system
 * - Clean flat red (#E10600)
 * - Subtle hover lift effect
 * - Works as link or button
 */
export function PrimaryButton({
  children,
  href,
  onClick,
  className = '',
  target,
  rel
}: PrimaryButtonProps) {
  const baseClassName =
    'inline-flex items-center justify-center rounded-lg px-6 py-3 text-sm font-semibold ' +
    'bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-hover)] ' +
    'transition-all duration-150 ease-out hover:-translate-y-0.5 ' +
    'focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:ring-offset-2 focus:ring-offset-[var(--color-bg)] ' +
    className

  if (href) {
    // External link
    if (href.startsWith('http')) {
      return (
        <a
          href={href}
          className={baseClassName}
          target={target}
          rel={rel}
        >
          {children}
        </a>
      )
    }

    // Internal link
    return (
      <Link href={href} className={baseClassName}>
        {children}
      </Link>
    )
  }

  // Button
  return (
    <button className={baseClassName} onClick={onClick}>
      {children}
    </button>
  )
}
