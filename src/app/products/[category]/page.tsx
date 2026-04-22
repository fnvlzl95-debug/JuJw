export const runtime = 'edge'

import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import JsonLd from '@/components/seo/JsonLd'
import { getCategoryBySlug, getProducts } from '@/lib/db'
import { getSiteUrl } from '@/lib/env'

export const dynamic = 'force-dynamic'

export async function generateMetadata({
  params,
}: {
  params: { category: string }
}): Promise<Metadata> {
  const category = await getCategoryBySlug(params.category)

  if (!category) {
    return {
      title: '카테고리',
    }
  }

  return {
    title: `${category.name} 도매`,
    description: `${category.name} 카테고리 라인업과 스펙을 확인하고 상담을 요청해 보세요.`,
    alternates: {
      canonical: `/products/${category.slug}`,
    },
  }
}

export default async function ProductCategoryPage({
  params,
}: {
  params: { category: string }
}) {
  const category = await getCategoryBySlug(params.category)

  if (!category) {
    notFound()
  }

  const products = await getProducts({
    category: category.slug,
    published: true,
  })

  const siteUrl = getSiteUrl().replace(/\/$/, '')

  return (
    <div className="min-h-screen bg-white pt-24">
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
              name: category.name,
              item: `${siteUrl}/products/${category.slug}`,
            },
          ],
        }}
      />

      <section className="bg-stone-50 px-4 py-14 sm:px-6 md:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs uppercase tracking-[0.2em] text-amber-700/70">Category</p>
          <h1 className="mt-3 text-4xl font-light italic text-stone-900">{category.name}</h1>
          <p className="mt-4 text-sm text-stone-600">해당 카테고리의 대표 라인업입니다.</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:px-8 md:py-16">
        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4 lg:gap-8">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/products/${category.slug}/${product.slug}`}
              className="group"
            >
              <div className="aspect-[3/4] overflow-hidden rounded bg-stone-100">
                <img
                  src={
                    product.imageUrl && !product.imageUrl.startsWith('products/')
                      ? product.imageUrl
                      : '/img/hero/hero.png'
                  }
                  alt={product.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <h2 className="mt-3 text-sm font-medium text-stone-900 sm:text-base">{product.name}</h2>
              <p className="mt-1 text-xs text-stone-500">{product.spec || '상세 문의'}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
