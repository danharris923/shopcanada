import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://shopcanada.cc'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Shop Canada - Best Canadian Deals & Discounts 2025',
    template: '%s | Shop Canada'
  },
  description: 'Find the best deals, sales, and discounts from top Canadian retailers like Amazon.ca, Walmart, Costco, Best Buy, and more. Save up to 70% on electronics, fashion, home goods. Updated hourly.',
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
  authors: [{ name: 'Shop Canada' }],
  creator: 'Shop Canada',
  publisher: 'Shop Canada',
  openGraph: {
    type: 'website',
    locale: 'en_CA',
    url: SITE_URL,
    siteName: 'Shop Canada',
    title: 'Shop Canada - Best Canadian Deals & Discounts',
    description: 'Find the best deals from top Canadian retailers. Save up to 70% on electronics, fashion, home goods.',
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'Shop Canada - Best Canadian Deals',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shop Canada - Best Canadian Deals & Discounts',
    description: 'Find the best deals from top Canadian retailers. Updated hourly.',
    images: [`${SITE_URL}/og-image.png`],
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
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#8F020D" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Shop Canada" />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
