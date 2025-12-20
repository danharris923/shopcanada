import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Shop Canada - Best Canadian Deals & Discounts',
    template: '%s | Shop Canada'
  },
  description: 'Find the best deals, sales, and discounts from top Canadian retailers. Discover Canadian brands and save money shopping.',
  keywords: ['deals', 'canada', 'sales', 'discounts', 'coupons', 'savings', 'shopping', 'canadian brands'],
  authors: [{ name: 'Shop Canada' }],
  openGraph: {
    type: 'website',
    locale: 'en_CA',
    siteName: 'Shop Canada',
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en-CA">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
