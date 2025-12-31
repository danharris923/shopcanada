import { redirect } from 'next/navigation'

// Server-side redirect - better for SEO than client-side
export default function CanadianRedirectPage() {
  redirect('/stores?filter=canadian')
}
