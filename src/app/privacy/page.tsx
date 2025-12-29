import type { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Privacy Policy - Shop Canada',
  description: 'Shop Canada privacy policy. Learn how we handle your information, our use of cookies, and your privacy rights as a Canadian visitor.',
}

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-cream">
        {/* Hero */}
        <section className="bg-soft-black py-12">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Privacy Policy
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
              <h2>Our Commitment to Privacy</h2>
              <p>
                Shop Canada respects your privacy. This policy explains what information we collect, how we use
                it, and your rights regarding your personal data. We are committed to protecting the privacy of
                Canadian visitors and complying with applicable privacy laws, including PIPEDA (Personal Information
                Protection and Electronic Documents Act).
              </p>

              <h2>Information We Collect</h2>
              <p>
                Shop Canada is designed to be used without requiring personal information. We do not require
                account creation, registration, or login to browse deals. However, we may automatically collect
                certain non-personal information:
              </p>
              <ul>
                <li><strong>Usage data:</strong> Pages visited, time spent on site, links clicked</li>
                <li><strong>Technical data:</strong> Browser type, device type, operating system, screen resolution</li>
                <li><strong>Location data:</strong> General geographic location (country/province level) based on IP address</li>
                <li><strong>Referral data:</strong> How you arrived at our site (search engine, direct link, etc.)</li>
              </ul>

              <h2>Cookies and Tracking</h2>
              <p>
                We use cookies and similar technologies to improve your browsing experience and understand how
                visitors use our site. Cookies are small text files stored on your device. We use:
              </p>
              <ul>
                <li><strong>Essential cookies:</strong> Required for basic site functionality</li>
                <li><strong>Analytics cookies:</strong> Help us understand site usage patterns</li>
                <li><strong>Affiliate cookies:</strong> Track referrals to retailer websites for commission purposes</li>
              </ul>
              <p>
                You can control cookies through your browser settings. Disabling cookies may affect some site
                features but will not prevent you from browsing deals.
              </p>

              <h2>How We Use Information</h2>
              <p>
                We use collected information to:
              </p>
              <ul>
                <li>Improve our website and user experience</li>
                <li>Understand which deals and features are most popular</li>
                <li>Ensure the site works correctly on different devices and browsers</li>
                <li>Detect and prevent technical issues or abuse</li>
                <li>Track affiliate referrals for commission purposes</li>
              </ul>
              <p>
                We do not sell, rent, or share your personal information with third parties for their marketing
                purposes.
              </p>

              <h2>Third-Party Services</h2>
              <p>
                Our website uses third-party services that may collect information:
              </p>
              <ul>
                <li><strong>Analytics providers:</strong> To understand site usage (e.g., Google Analytics)</li>
                <li><strong>Hosting providers:</strong> To serve website content (e.g., Vercel)</li>
                <li><strong>Affiliate networks:</strong> To track purchases and calculate commissions</li>
              </ul>
              <p>
                When you click a deal link and visit a retailer's website, that retailer's privacy policy applies
                to any information you provide to them.
              </p>

              <h2>Data Retention</h2>
              <p>
                We retain analytics data in aggregate form to understand long-term trends. We do not maintain
                individual user profiles or store personal information beyond what is necessary for site operation.
              </p>

              <h2>Your Rights</h2>
              <p>
                As a Canadian resident, you have the right to:
              </p>
              <ul>
                <li>Know what personal information we have about you</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your information</li>
                <li>Withdraw consent for data collection</li>
                <li>Opt out of analytics tracking</li>
              </ul>
              <p>
                Since we do not collect personal information requiring accounts or registration, most visitors
                have no stored personal data with us.
              </p>

              <h2>Children's Privacy</h2>
              <p>
                Shop Canada is not directed at children under 13 years of age. We do not knowingly collect
                personal information from children. If you believe a child has provided us with personal
                information, please contact us.
              </p>

              <h2>Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy periodically. Changes will be posted on this page with an
                updated revision date. Continued use of the site after changes constitutes acceptance of the
                revised policy.
              </p>

              <h2>Contact</h2>
              <p>
                For questions about this Privacy Policy or to exercise your privacy rights, please visit our{' '}
                <Link href="/about" className="text-maple-red hover:underline">About page</Link> for more
                information.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
