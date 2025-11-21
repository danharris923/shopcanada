import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://shopcanada.cc'

  // Static pages
  const staticPages = [
    '',
    '/about',
    '/brands',
    '/all-brands',
    '/categories',
    '/featured',
    '/gift-guide',
    '/reviews',
  ]

  // Brand pages
  const brands = [
    'arcteryx',
    'canada-goose',
    'crown-royal',
    'moosehead',
    'roots',
    'stanfields',
  ]

  // Category pages
  const categories = [
    'clothing',
    'outerwear',
    'footwear',
    'accessories',
    'beverages',
    'home-goods',
  ]

  const staticUrls = staticPages.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: path === '' ? 1.0 : 0.8,
  }))

  const brandUrls = brands.map((brand) => ({
    url: `${baseUrl}/brands/${brand}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  const categoryUrls = categories.map((category) => ({
    url: `${baseUrl}/categories/${category}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.7,
  }))

  return [...staticUrls, ...brandUrls, ...categoryUrls]
}
