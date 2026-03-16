import type { Metadata } from 'next'

const siteName = 'Ju Jewelry'
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://jujewelry.co.kr'

interface PageMetadataOptions {
  title: string
  description: string
  path?: string
}

export function buildPageMetadata({
  title,
  description,
  path = '/',
}: PageMetadataOptions): Metadata {
  const canonical = new URL(path, siteUrl).toString()

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      type: 'website',
      url: canonical,
      title: `${title} | ${siteName}`,
      description,
      siteName,
      locale: 'ko_KR',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${siteName}`,
      description,
    },
  }
}
