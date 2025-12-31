import { redirect } from 'next/navigation'
import { getCanadianBrandSlugs } from '@/lib/db'

interface Props {
  params: Promise<{ slug: string }>
}

// Generate static params for all Canadian brands (for redirect generation)
export async function generateStaticParams() {
  try {
    const slugs = await getCanadianBrandSlugs()
    return slugs.map(slug => ({ slug }))
  } catch (error) {
    return []
  }
}

// Redirect all /canadian/brand/[slug] to /stores/[slug]
// All brand pages are now consolidated at /stores/[slug]
export default async function CanadianBrandPage({ params }: Props) {
  const { slug } = await params
  redirect(`/stores/${slug}`)
}
