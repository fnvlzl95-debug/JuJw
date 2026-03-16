import type { MetadataRoute } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://jujewelry.co.kr'

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '/',
    '/about',
    '/products',
    '/trade',
    '/location',
    '/contact',
    '/faq',
    '/privacy',
    '/terms',
  ]

  return routes.map((route) => ({
    url: new URL(route, siteUrl).toString(),
    lastModified: new Date(),
  }))
}
