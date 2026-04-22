'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'

type Category = {
  id: number
  name: string
  slug: string
}

type Product = {
  id: number
  categoryId: number
  categoryName?: string
  categorySlug?: string
  slug: string
  name: string
  spec: string | null
  description: string | null
  imageUrl: string | null
  isPublished: boolean
}

export default function ProductsPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [activeCategory, setActiveCategory] = useState('all')

  useEffect(() => {
    const load = async () => {
      const [categoryRes, productRes] = await Promise.all([
        fetch('/api/categories', { cache: 'no-store' }),
        fetch('/api/products', { cache: 'no-store' }),
      ])

      if (categoryRes.ok) {
        const payload = (await categoryRes.json()) as { categories?: Category[] }
        setCategories(payload.categories ?? [])
      }

      if (productRes.ok) {
        const payload = (await productRes.json()) as { products?: Product[] }
        setProducts((payload.products ?? []).filter((product) => product.isPublished))
      }
    }

    void load()
  }, [])

  const navigationCategories = useMemo(
    () => [{ id: 0, name: '전체', slug: 'all' }, ...categories],
    [categories]
  )

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'all') {
      return products
    }

    return products.filter((product) => product.categorySlug === activeCategory)
  }, [activeCategory, products])

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-stone-50 px-4 pb-12 pt-24 sm:px-6 sm:pb-16 sm:pt-28 md:px-8 md:pb-20 md:pt-32">
        <div className="mx-auto max-w-7xl text-center">
          <p
            className="mb-4 text-[9px] font-light uppercase tracking-[0.25em] text-amber-600/70 sm:mb-6 sm:text-[10px] sm:tracking-[0.3em]"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Collection
          </p>
          <h1
            className="mb-4 text-4xl font-light italic tracking-tight text-stone-900 sm:mb-6 sm:text-5xl md:text-6xl lg:text-7xl"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Jewelry
          </h1>
          <div className="mx-auto mb-6 mt-6 h-[1px] w-12 bg-amber-500/30 sm:mb-8 sm:mt-8 sm:w-16" />
          <p className="mx-auto max-w-[520px] px-4 text-xs font-light leading-relaxed text-stone-600 sm:text-sm md:text-base">
            관리자에서 등록한 대표 라인업과 스펙을 확인하고 상담을 요청해 보세요.
          </p>
        </div>
      </section>

      <section className="sticky top-[60px] z-40 border-b border-stone-200 bg-white/95 backdrop-blur-md sm:top-[68px] md:top-[72px]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <div className="flex gap-4 overflow-x-auto py-4 sm:gap-6 sm:py-5 md:gap-8">
            {navigationCategories.map((category) => (
              <button
                key={category.slug}
                onClick={() => setActiveCategory(category.slug)}
                className={`whitespace-nowrap border-b pb-2 text-[11px] uppercase tracking-[0.18em] transition-all ${
                  activeCategory === category.slug
                    ? 'border-stone-900 text-stone-900'
                    : 'border-transparent text-stone-500 hover:text-stone-900'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-12 sm:px-6 sm:py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex items-center justify-between">
            <p className="text-sm font-light text-stone-500">총 {filteredProducts.length}개</p>
            <Link href="/contact" className="text-sm font-medium text-stone-900 underline-offset-4 hover:underline">
              가격 및 재고 문의
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4 lg:gap-8">
            {filteredProducts.map((product) => {
              const imageUrl = product.imageUrl || '/img/hero/hero.png'

              return (
                <Link
                  key={product.id}
                  href={
                    product.categorySlug
                      ? `/products/${product.categorySlug}/${product.slug}`
                      : '/contact'
                  }
                  className="group block"
                >
                  <div className="mb-4 aspect-[3/4] overflow-hidden rounded bg-stone-100">
                    <img
                      src={imageUrl}
                      alt={product.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <h2
                    className="text-lg font-light tracking-tight text-stone-900 sm:text-xl"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    {product.name}
                  </h2>
                  <p className="mt-1 text-xs uppercase tracking-[0.15em] text-stone-500">
                    {product.categoryName || '컬렉션'}
                  </p>
                  <p className="mt-2 text-sm font-light leading-relaxed text-stone-600">
                    {product.spec || product.description || '상세 스펙은 상담 시 안내드립니다.'}
                  </p>
                </Link>
              )
            })}
          </div>

          {filteredProducts.length === 0 ? (
            <p className="rounded-md border border-stone-200 p-6 text-center text-sm text-stone-500">
              현재 등록된 공개 제품이 없습니다.
            </p>
          ) : null}
        </div>
      </section>

      <section className="bg-stone-50 px-6 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h2
            className="mb-8 text-3xl font-light italic tracking-tight text-stone-900 md:text-5xl"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            문의하기
          </h2>
          <p className="mx-auto mb-12 max-w-xl text-sm font-light leading-relaxed text-stone-600 md:text-base">
            재고 확인, 가격 문의, 카탈로그 요청은 상담을 통해 빠르게 안내받으실 수 있습니다.
          </p>
          <Link
            href="/contact"
            className="inline-flex min-h-[52px] items-center justify-center rounded-md bg-stone-900 px-12 py-4 text-[11px] font-medium uppercase tracking-[0.2em] text-white transition-all duration-300 hover:bg-amber-600"
          >
            상담 요청
          </Link>
        </div>
      </section>
    </div>
  )
}
