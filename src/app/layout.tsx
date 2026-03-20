import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { SITE_URL } from '@/lib/config'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Click & Save Canada - Best Canadian Deals & Discounts 2025',
    template: '%s | Click & Save Canada'
  },
  description: 'Find the best deals from top Canadian retailers like Amazon.ca, Walmart, Costco & Best Buy. Save up to 70% on electronics, fashion & home goods. Updated hourly.',
  keywords: [
    'canadian deals',
    'canada sales',
    'discounts canada',
    'coupons canada',
    'canadian brands',
    'amazon canada deals',
    'walmart canada sales',
    'costco deals',
    'best buy canada',
    'canadian tire sales',
    'boxing day deals canada',
    'black friday canada',
    'cyber monday canada',
  ],
  authors: [{ name: 'Click & Save Canada' }],
  creator: 'Click & Save Canada',
  publisher: 'Click & Save Canada',
  openGraph: {
    type: 'website',
    locale: 'en_CA',
    url: SITE_URL,
    siteName: 'Click & Save Canada',
    title: 'Click & Save Canada - Best Canadian Deals & Discounts',
    description: 'Find the best deals from top Canadian retailers. Save up to 70% on electronics, fashion, home goods.',
    images: [
      {
        url: `${SITE_URL}/hero-desktop.png`,
        width: 1200,
        height: 400,
        alt: 'Click & Save Canada - Best Canadian Deals',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Click & Save Canada - Best Canadian Deals & Discounts',
    description: 'Find the best deals from top Canadian retailers. Updated hourly.',
    images: [`${SITE_URL}/hero-desktop.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
  verification: {
    // Add your verification codes here when available
    // google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en-CA">
      <head>
        {/* Preload hero images for faster LCP */}
        <link rel="preload" href="/hero-desktop.webp" as="image" type="image/webp" media="(min-width: 768px)" />
        <link rel="preload" href="/hero-mobile.webp" as="image" type="image/webp" media="(max-width: 767px)" />

        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#8F020D" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Click & Save Canada" />

        {/* Umami Analytics */}
        <script
          defer
          src="https://analytics.promopenguin.ca/script.js"
          data-website-id="30045994-c858-4e3a-bb6c-fc15e2471852"
        />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
