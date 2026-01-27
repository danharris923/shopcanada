import { redirect } from 'next/navigation'

interface Props {
  params: Promise<{ slug: string }>
}

// Redirect all /canadian/brand/[slug] to /stores/[slug]
// All brand pages are now consolidated at /stores/[slug]
export default async function CanadianBrandPage({ params }: Props) {
  const { slug } = await params
  redirect(`/stores/${slug}`)
}
