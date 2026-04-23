export const runtime = 'edge'

import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import ShowcaseImage from '@/components/media/ShowcaseImage'
import JsonLd from '@/components/seo/JsonLd'
import { getProductBySlug, getProductImages } from '@/lib/db'
import { getSiteUrl } from '@/lib/env'

export const dynamic = 'force-dynamic'

const GENERIC_PRODUCT_PLACEHOLDER = '/img/hero/hero.png'

const categoryFallbackImages: Record<string, string[]> = {
  bracelets: ['/img/products-generated/products-card-bracelet.png'],
  earrings: ['/img/products-generated/products-card-earrings.png'],
  necklaces: ['/img/products-generated/products-card-necklace.png'],
  rings: ['/img/products-generated/products-card-ring.png'],
}

export async function generateMetadata({
  params,
}: {
  params: { category: string; slug: string }
}): Promise<Metadata> {
  const product = await getProductBySlug(params.category, params.slug)

  if (!product) {
    return {
      title: '제품 상세',
    }
  }

  return {
    title: `${product.name} 도매`,
    description: product.spec || product.description || `${product.name} 상세 정보`,
    alternates: {
      canonical: `/products/${params.category}/${params.slug}`,
    },
  }
}

export default async function ProductDetailPage({
  params,
}: {
  params: { category: string; slug: string }
}) {
  const product = await getProductBySlug(params.category, params.slug)

  if (!product) {
    notFound()
  }

  const images = await getProductImages(product.id)
  const primaryImage = images.find((image) => image.isPrimary)
  const fallbackCandidates = categoryFallbackImages[params.category] ?? ['/img/products-generated/products-card-necklace.png']
  const imageUrl =
    primaryImage?.url &&
    primaryImage.url !== GENERIC_PRODUCT_PLACEHOLDER &&
    !primaryImage.url.startsWith('products/')
      ? primaryImage.url
      : product.imageUrl &&
          product.imageUrl !== GENERIC_PRODUCT_PLACEHOLDER &&
          !product.imageUrl.startsWith('products/')
        ? product.imageUrl
        : fallbackCandidates[0]

  const siteUrl = getSiteUrl().replace(/\/$/, '')
  const productUrl = `${siteUrl}/products/${params.category}/${params.slug}`

  return (
    <div className="min-h-screen bg-white pt-24">
      <JsonLd
        id="product-jsonld"
        data={{
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: product.name,
          description: product.description || product.spec || `${product.name} 제품 정보`,
          image: [
            imageUrl.startsWith('http') ? imageUrl : `${siteUrl}${imageUrl}`,
          ],
          sku: String(product.id),
          category: product.categoryName || params.category,
          offers: {
            '@type': 'Offer',
            availability: 'https://schema.org/InStock',
            priceCurrency: 'KRW',
            price: '0',
            url: productUrl,
          },
        }}
      />
      <JsonLd
        id="breadcrumb-jsonld"
        data={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: '홈',
              item: siteUrl,
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: '제품',
              item: `${siteUrl}/products`,
            },
            {
              '@type': 'ListItem',
              position: 3,
              name: product.categoryName || params.category,
              item: `${siteUrl}/products/${params.category}`,
            },
            {
              '@type': 'ListItem',
              position: 4,
              name: product.name,
              item: productUrl,
            },
          ],
        }}
      />

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-2 md:px-8 md:py-16">
        <ShowcaseImage
          src={imageUrl}
          alt={product.name}
          className="min-h-[420px] overflow-hidden rounded-md border border-stone-200 bg-stone-100 md:min-h-[540px]"
          imageClassName="object-cover object-center"
        />

        <div>
          <p className="text-xs uppercase tracking-[0.15em] text-stone-500">
            {product.categoryName || params.category}
          </p>
          <h1 className="mt-2 text-3xl font-light text-stone-900">{product.name}</h1>
          <p className="mt-4 text-sm text-stone-700">{product.spec || '스펙 상담 가능'}</p>
          <p className="mt-4 whitespace-pre-line text-sm leading-7 text-stone-600">
            {product.description || '제품 상세 정보는 상담을 통해 안내드립니다.'}
          </p>

          <div className="mt-8 flex gap-3">
            <Link href="/contact" className="rounded-md bg-stone-900 px-5 py-2.5 text-sm text-white">
              견적 문의
            </Link>
            <Link href={`/products/${params.category}`} className="rounded-md border border-stone-300 px-5 py-2.5 text-sm text-stone-700">
              카테고리로 돌아가기
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
