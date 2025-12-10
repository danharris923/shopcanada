import type { Metadata } from 'next'
import { Merriweather } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Analytics } from '@vercel/analytics/next'

const merriweather = Merriweather({ 
  weight: ['300', '400', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Shop Canada | Shop Canadian. Support Local.',
  description: 'Discover quality Canadian-made products and support domestic businesses.',
  generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <script defer src="https://analytics.promopenguin.ca/script.js" data-website-id="30045994-c858-4e3a-bb6c-fc15e2471852"></script>
      </head>
      <body className={merriweather.className}>
        <Header />
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}
