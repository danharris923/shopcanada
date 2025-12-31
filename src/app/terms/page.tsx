import type { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { SITE_URL } from '@/lib/config'

export const metadata: Metadata = {
  title: 'Terms of Service - Shop Canada',
  description: 'Terms and conditions for using Shop Canada. Read about our affiliate relationships, user responsibilities, and site usage policies.',
  alternates: {
    canonical: `${SITE_URL}/terms`,
  },
}

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-cream">
        {/* Hero */}
        <section className="bg-soft-black py-12">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Terms of Service
            </h1>
            <p className="text-silver">
              Last updated: December 2024
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-card p-8 shadow-soft prose prose-slate max-w-none">
              <h2>Agreement to Terms</h2>
              <p>
                By accessing and using Shop Canada (shopcanada.cc), you agree to be bound by these Terms of Service.
                If you do not agree with any part of these terms, please do not use our website. We reserve the
                right to modify these terms at any time, and your continued use of the site constitutes acceptance
                of any changes.
              </p>

              <h2>Description of Service</h2>
              <p>
                Shop Canada is a deal aggregation website that displays product deals and discounts from various
                Canadian retailers. We do not sell products directly. Instead, we provide links to third-party
                retailer websites where you can complete your purchases. All transactions occur directly between
                you and the respective retailer.
              </p>

              <h2>Affiliate Relationships</h2>
              <p>
                Shop Canada participates in affiliate marketing programs, including the Amazon Associates Program
                and other retailer affiliate programs. This means we may earn a commission when you click on a
                deal link and make a purchase from the retailer. These commissions come from the retailer at no
                additional cost to you.
              </p>
              <p>
                Affiliate relationships do not influence which deals we display or how we present them. We strive
                to show the best deals available regardless of affiliate status.
              </p>

              <h2>Pricing and Availability</h2>
              <p>
                While we make every effort to display accurate pricing and availability information, we cannot
                guarantee that all information is current or error-free. Prices, discounts, and product availability
                are determined by the respective retailers and may change without notice.
              </p>
              <p>
                Always verify the current price and availability on the retailer's website before making a purchase.
                Shop Canada is not responsible for pricing errors or out-of-stock items.
              </p>

              <h2>User Responsibilities</h2>
              <p>
                When using Shop Canada, you agree to:
              </p>
              <ul>
                <li>Use the site for lawful purposes only</li>
                <li>Not attempt to scrape, copy, or redistribute our content without permission</li>
                <li>Not interfere with the site's operation or security</li>
                <li>Not use automated tools to access the site in ways that could overload our servers</li>
                <li>Verify all deal information with the retailer before purchasing</li>
              </ul>

              <h2>Intellectual Property</h2>
              <p>
                The Shop Canada website, including its design, logos, and original content, is protected by
                copyright and other intellectual property laws. Product images, brand names, and logos displayed
                on our site remain the property of their respective owners.
              </p>

              <h2>Limitation of Liability</h2>
              <p>
                Shop Canada provides deal information on an "as is" basis without warranties of any kind. We are
                not liable for any damages arising from your use of our site or your transactions with third-party
                retailers. This includes, but is not limited to, issues with product quality, delivery, returns,
                or customer service from retailers.
              </p>

              <h2>Third-Party Links</h2>
              <p>
                Our website contains links to third-party retailer websites. We are not responsible for the
                content, privacy practices, or terms of service of these external sites. Your interactions with
                these sites are governed by their own terms and policies.
              </p>

              <h2>Governing Law</h2>
              <p>
                These Terms of Service are governed by the laws of Canada. Any disputes arising from your use
                of Shop Canada shall be resolved in accordance with Canadian law.
              </p>

              <h2>Contact</h2>
              <p>
                If you have questions about these Terms of Service, please visit our{' '}
                <Link href="/about" className="text-maple-red hover:underline">About page</Link> for more
                information about Shop Canada.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
