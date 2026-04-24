'use client'

import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import type { Category, Product } from '@/types/site'

/* eslint-disable @next/next/no-img-element */

interface ProductsCatalogProps {
  categories: Category[]
  products: Product[]
}

export default function ProductsCatalog({
  categories,
  products,
}: ProductsCatalogProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isNavigating, setIsNavigating] = useState(false)

  const activeCategory = searchParams.get('category') || 'all'

  const filteredProducts =
    activeCategory === 'all'
      ? products
      : products.filter((product) => product.categorySlug === activeCategory)

  function selectCategory(categorySlug: string) {
    const nextParams = new URLSearchParams(searchParams.toString())

    if (categorySlug === 'all') {
      nextParams.delete('category')
    } else {
      nextParams.set('category', categorySlug)
    }

    const queryString = nextParams.toString()
    setIsNavigating(true)
    router.replace(queryString ? `${pathname}?${queryString}` : pathname, {
      scroll: false,
    })
    setTimeout(() => setIsNavigating(false), 150)
  }

  return (
    <>
      <section className="sticky top-[72px] z-40 bg-bg-primary border-b border-border">
        <div className="max-w-content mx-auto px-6">
          <div className="flex gap-2 py-4 overflow-x-auto scrollbar-hide">
            <button
              type="button"
              onClick={() => selectCategory('all')}
              className={cn(
                'px-5 py-2.5 text-[13px] font-medium whitespace-nowrap transition-all',
                activeCategory === 'all'
                  ? 'bg-text-default text-white'
                  : 'bg-bg-secondary text-text-muted hover:text-text-default'
              )}
            >
              전체
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() => selectCategory(category.slug)}
                className={cn(
                  'px-5 py-2.5 text-[13px] font-medium whitespace-nowrap transition-all',
                  activeCategory === category.slug
                    ? 'bg-text-default text-white'
                    : 'bg-bg-secondary text-text-muted hover:text-text-default'
                )}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 px-6">
        <div className="max-w-content mx-auto">
          <p className="text-[13px] text-text-muted mb-8">
            {isNavigating ? '필터 적용 중...' : `${filteredProducts.length}개의 제품`}
          </p>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {filteredProducts.map((product) => (
              <div key={product.id} className="group overflow-hidden border border-border/70 bg-white shadow-[0_18px_42px_-34px_rgba(28,25,23,0.28)]">
                <div className="aspect-square overflow-hidden bg-bg-secondary">
                  {product.imageUrl ? (
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-[13px] text-text-muted transition-transform duration-300 group-hover:scale-[1.02]">
                      이미지 준비 중
                    </div>
                  )}
                </div>
                <div className="border-t border-border/70 px-4 pb-5 pt-4">
                  <p className="mb-1 text-[12px] text-accent">{product.categoryName}</p>
                  <h3 className="mb-1.5 text-[14px] font-medium text-text-default transition-colors group-hover:text-accent lg:text-[15px]">
                    {product.name}
                  </h3>
                  <p className="text-[12px] text-text-muted lg:text-[13px]">{product.spec}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 px-6 bg-bg-secondary">
        <div className="max-w-[800px] mx-auto">
          <div className="text-center mb-10">
            <p className="text-[11px] font-medium tracking-[0.15em] uppercase text-accent mb-4">
              Notice
            </p>
            <h2 className="font-serif text-xl lg:text-2xl font-light text-text-default">
              제품 안내
            </h2>
          </div>
          <div className="space-y-4 text-[14px] text-text-muted leading-relaxed">
            <p className="flex gap-3">
              <span className="mt-[0.75rem] h-px w-5 shrink-0 bg-accent" />
              표시된 제품은 대표 라인업 기준이며, 실제 재고 및 가격은 상담을 통해 안내합니다.
            </p>
            <p className="flex gap-3">
              <span className="mt-[0.75rem] h-px w-5 shrink-0 bg-accent" />
              카테고리별 구색 제안과 매장 맞춤 추천이 가능합니다.
            </p>
            <p className="flex gap-3">
              <span className="mt-[0.75rem] h-px w-5 shrink-0 bg-accent" />
              맞춤 제작 또는 별도 카탈로그 요청은 상담 폼으로 접수해 주세요.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32 px-6 bg-white">
        <div className="max-w-[600px] mx-auto text-center">
          <h2 className="font-serif text-2xl lg:text-[2rem] font-light text-text-default mb-6">
            관심 있는 제품이 있으신가요?
          </h2>
          <p className="text-[15px] text-text-muted mb-10 leading-relaxed">
            재고 확인, 가격 문의, 카탈로그 요청은 상담을 통해 빠르게 안내해 드립니다.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-10 py-4 bg-text-default text-white text-[14px] font-medium hover:bg-neutral-800 transition-colors"
            >
              상담 요청하기
            </Link>
            <Link
              href="/contact?interest=catalog"
              className="inline-flex items-center justify-center px-10 py-4 border border-border text-text-default text-[14px] font-medium hover:border-text-default transition-colors"
            >
              카탈로그 요청
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
