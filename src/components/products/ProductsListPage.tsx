'use client'

import Link from 'next/link'
import { useDeferredValue, useMemo, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import ShowcaseImage from '@/components/media/ShowcaseImage'
import { resolveProductHref, resolveProductImage, trimText } from '@/lib/product-display'
import { cn } from '@/lib/utils'
import type { Category, Product } from '@/lib/models'

type ProductsListPageProps = {
  categories: Category[]
  products: Product[]
}

const ALL_CATEGORY = 'all'

export default function ProductsListPage({ categories, products }: ProductsListPageProps) {
  const [activeCategory, setActiveCategory] = useState(ALL_CATEGORY)
  const deferredCategory = useDeferredValue(activeCategory)

  const orderedCategories = useMemo(
    () => [...categories].sort((a, b) => a.orderIndex - b.orderIndex || a.id - b.id),
    [categories]
  )

  const orderedProducts = useMemo(
    () =>
      [...products]
        .filter((product) => product.isPublished)
        .sort((a, b) => a.orderIndex - b.orderIndex || a.id - b.id),
    [products]
  )

  const productCountByCategory = useMemo(() => {
    const counts = new Map<string, number>()

    orderedProducts.forEach((product) => {
      if (!product.categorySlug) {
        return
      }

      counts.set(product.categorySlug, (counts.get(product.categorySlug) ?? 0) + 1)
    })

    return counts
  }, [orderedProducts])

  const visibleProducts = useMemo(() => {
    if (deferredCategory === ALL_CATEGORY) {
      return orderedProducts
    }

    return orderedProducts.filter((product) => product.categorySlug === deferredCategory)
  }, [deferredCategory, orderedProducts])

  const activeCategoryName =
    deferredCategory === ALL_CATEGORY
      ? '전체 제품'
      : orderedCategories.find((category) => category.slug === deferredCategory)?.name ?? '제품'

  return (
    <div className="min-h-screen bg-[#f7f2eb] text-[#33261f]">
      <section className="public-hero px-4 sm:px-6 md:px-8">
        <div className="mx-auto max-w-7xl">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-[13px] font-semibold text-[#8a6c59] transition-colors hover:text-[#5f4332]"
          >
            컬렉션 메인
            <ArrowRight size={14} strokeWidth={1.7} />
          </Link>
          <p className="mt-8 text-[11px] uppercase tracking-[0.24em] text-[#a77c52]">Product Catalog</p>
          <div className="mt-4 grid gap-5 md:grid-cols-[0.9fr_1.1fr] md:items-end">
            <h1 className="text-[2.15rem] font-semibold leading-[1.16] tracking-[-0.05em] text-[#2f241d] sm:text-[3.1rem] md:text-[3.6rem]">
              전체 제품 목록
            </h1>
            <p className="max-w-2xl text-[15px] leading-8 text-[#6b5c4f] md:justify-self-end">
              카테고리별 제품을 한 화면에서 빠르게 비교할 수 있도록 정리했습니다.
              마음에 드는 제품은 상세 페이지에서 확인하거나 상담으로 이어갈 수 있습니다.
            </p>
          </div>
        </div>
      </section>

      <section className="sticky top-[72px] z-30 border-y border-[#dfd0bf] bg-[#f7f2eb]/95 px-4 backdrop-blur sm:px-6 md:px-8">
        <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto py-3 scrollbar-hide">
          <button
            type="button"
            onClick={() => setActiveCategory(ALL_CATEGORY)}
            className={cn(
              'min-h-[44px] shrink-0 border px-5 text-[14px] font-semibold transition-colors active:translate-y-[1px]',
              activeCategory === ALL_CATEGORY
                ? 'border-[#4b3529] bg-[#4b3529] text-white'
                : 'border-[#d9c8b6] bg-[#fbf8f4] text-[#6b5c4f] hover:border-[#a98b70]'
            )}
          >
            전체 {orderedProducts.length}
          </button>
          {orderedCategories.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => setActiveCategory(category.slug)}
              className={cn(
                'min-h-[44px] shrink-0 border px-5 text-[14px] font-semibold transition-colors active:translate-y-[1px]',
                activeCategory === category.slug
                  ? 'border-[#4b3529] bg-[#4b3529] text-white'
                  : 'border-[#d9c8b6] bg-[#fbf8f4] text-[#6b5c4f] hover:border-[#a98b70]'
              )}
            >
              {category.name} {productCountByCategory.get(category.slug) ?? 0}
            </button>
          ))}
        </div>
      </section>

      <section className="px-4 py-9 sm:px-6 md:px-8 md:py-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-5 flex flex-col gap-2 border-b border-[#dfd0bf] pb-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[12px] font-semibold tracking-[0.2em] text-[#a77c52]">
                {activeCategoryName}
              </p>
              <h2 className="mt-2 text-[1.45rem] font-semibold tracking-[-0.04em] text-[#2f241d]">
                {visibleProducts.length}개 제품
              </h2>
            </div>
            <p className="text-[13px] leading-6 text-[#7b6a5e]">
              가격과 재고는 상담 시점 기준으로 정확히 안내됩니다.
            </p>
          </div>

          {visibleProducts.length > 0 ? (
            <div className="border-y border-[#dfd0bf] bg-[#fbf8f4]">
              {visibleProducts.map((product, index) => (
                <Link
                  key={product.id}
                  href={resolveProductHref(product)}
                  className="group grid gap-4 border-b border-[#dfd0bf] p-3 transition-colors last:border-b-0 hover:bg-white sm:grid-cols-[112px_1fr_auto] sm:items-center sm:p-4 md:grid-cols-[128px_1fr_152px]"
                >
                  <ShowcaseImage
                    src={resolveProductImage(product, index)}
                    alt={product.name}
                    className="aspect-[5/4] overflow-hidden bg-[#efe5d9] sm:aspect-[1/1.08]"
                    imageClassName="object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
                  />

                  <div className="min-w-0">
                    <p className="text-[12px] font-semibold tracking-[0.18em] text-[#a77c52]">
                      {product.categoryName || '컬렉션'}
                    </p>
                    <h3 className="mt-2 text-[1.08rem] font-semibold leading-[1.35] tracking-[-0.04em] text-[#2f241d] sm:text-[1.18rem]">
                      {product.name}
                    </h3>
                    <p className="mt-2 text-[13px] leading-6 text-[#6b5c4f]">
                      {trimText(product.spec, '상세 스펙은 상담으로 안내해 드립니다.', 70)}
                    </p>
                    <p className="mt-1 text-[13px] leading-6 text-[#8a7566]">
                      {trimText(product.description, '착용 장면과 예산에 맞춰 차분하게 제안합니다.', 86)}
                    </p>
                  </div>

                  <div className="flex items-center justify-between border-t border-[#e9ded3] pt-3 text-[13px] font-semibold text-[#5f4332] sm:block sm:border-t-0 sm:pt-0 sm:text-right">
                    <span>가격 문의</span>
                    <span className="inline-flex items-center gap-2 sm:mt-4">
                      상세 보기
                      <ArrowRight size={15} strokeWidth={1.6} className="transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="border-y border-[#dfd0bf] bg-[#fbf8f4] px-4 py-12 text-center sm:py-16">
              <p className="text-[1.35rem] font-semibold tracking-[-0.04em] text-[#2f241d]">
                등록된 제품이 없습니다
              </p>
              <p className="mt-3 text-[14px] leading-7 text-[#6b5c4f]">
                선택한 카테고리는 상담을 통해 먼저 안내해 드릴 수 있습니다.
              </p>
              <Link
                href="/contact"
                className="mt-7 inline-flex min-h-[48px] items-center justify-center bg-[#3d2d24] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#5a4031]"
              >
                상담 문의
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
