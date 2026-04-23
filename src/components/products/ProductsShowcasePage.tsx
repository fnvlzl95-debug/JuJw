'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import {
  ArrowRight,
  Facebook,
  Gift,
  Heart,
  Headphones,
  Instagram,
  Mail,
  MapPin,
  Menu,
  Phone,
  UserRound,
  X,
} from 'lucide-react'
import ShowcaseImage from '@/components/media/ShowcaseImage'
import { cn } from '@/lib/utils'
import type { Category, Product } from '@/lib/models'
import type { SiteSettings } from '@/lib/site-settings'

/* eslint-disable @next/next/no-img-element */

type ProductsShowcasePageProps = {
  categories: Category[]
  products: Product[]
  settings: SiteSettings
}

const sectionFrame =
  'mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8'

const GENERIC_PRODUCT_PLACEHOLDER = '/img/hero/hero.png'
const PRODUCTS_HERO_IMAGE = '/img/products-generated/products-hero-desktop.png'
const PRODUCTS_HERO_MOBILE_IMAGE = '/img/products-generated/products-hero-mobile.png'
const PRODUCTS_COLLECTION_IMAGE = '/img/products-generated/products-collection-panel.png'
const PRODUCTS_MODEL_IMAGE = '/img/products-generated/products-curation-model.png'
const PRODUCTS_SERVICE_IMAGE = '/img/products-generated/products-service-gift.png'

const navLinks = [
  { label: '컬렉션', href: '/products' },
  { label: '브랜드 스토리', href: '/about' },
  { label: '거래 안내', href: '/trade' },
  { label: '오시는 길', href: '/location' },
  { label: 'FAQ', href: '/faq' },
]

const productFallbacks: Record<string, string[]> = {
  rings: ['/img/products-generated/products-card-ring.png', '/img/products-generated/products-card-ring.png'],
  necklaces: ['/img/products-generated/products-card-necklace.png', '/img/products-generated/products-card-necklace.png'],
  earrings: ['/img/products-generated/products-card-earrings.png', '/img/products-generated/products-card-earrings.png'],
  bracelets: ['/img/products-generated/products-card-bracelet.png', '/img/products-generated/products-card-bracelet.png'],
}

const defaultFallbacks = [
  '/img/products-generated/products-card-necklace.png',
  '/img/products-generated/products-card-earrings.png',
  '/img/products-generated/products-card-ring.png',
  '/img/products-generated/products-card-bracelet.png',
]

const serviceHighlights = [
  {
    icon: Gift,
    title: '선물 포장 서비스',
    description: '정성스러운 패키지와 함께 특별한 순간을 더욱 깊게 전해드립니다.',
  },
  {
    icon: Headphones,
    title: '1:1 상담 서비스',
    description: '취향과 예산, 착용 장면까지 고려해 차분하게 안내해 드립니다.',
  },
  {
    icon: UserRound,
    title: '스타일 제안',
    description: '레이어드와 세트 구성을 기준으로 가장 어울리는 균형을 제안합니다.',
  },
]

function resolveProductHref(product: Product) {
  return product.categorySlug ? `/products/${product.categorySlug}/${product.slug}` : '/contact'
}

function trimText(text: string | null | undefined, fallback: string, limit: number) {
  const source = text?.trim() || fallback
  return source.length > limit ? `${source.slice(0, limit).trim()}…` : source
}

function resolveProductImage(product: Product, index: number) {
  if (
    product.imageUrl &&
    product.imageUrl !== GENERIC_PRODUCT_PLACEHOLDER &&
    !product.imageUrl.startsWith('products/')
  ) {
    return product.imageUrl
  }

  const candidates = product.categorySlug
    ? productFallbacks[product.categorySlug] ?? defaultFallbacks
    : defaultFallbacks

  return candidates[index % candidates.length]
}

export default function ProductsShowcasePage({
  categories,
  products,
  settings,
}: ProductsShowcasePageProps) {
  const [activeCategory, setActiveCategory] = useState('all')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    document.body.classList.add('products-reference-page')

    return () => {
      document.body.classList.remove('products-reference-page')
      document.body.style.removeProperty('overflow')
    }
  }, [])

  useEffect(() => {
    if (!mobileMenuOpen) {
      document.body.style.removeProperty('overflow')
      return
    }

    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.removeProperty('overflow')
    }
  }, [mobileMenuOpen])

  useEffect(() => {
    if (activeCategory === 'all') {
      return
    }

    const exists = categories.some((category) => category.slug === activeCategory)
    if (!exists) {
      setActiveCategory('all')
    }
  }, [activeCategory, categories])

  const orderedCategories = useMemo(
    () => [...categories].sort((a, b) => a.orderIndex - b.orderIndex || a.id - b.id),
    [categories]
  )

  const navigationCategories = useMemo(
    () => [{ id: 0, name: '전체', slug: 'all', orderIndex: 0 }, ...orderedCategories],
    [orderedCategories]
  )

  const orderedProducts = useMemo(
    () =>
      [...products]
        .filter((product) => product.isPublished)
        .sort((a, b) => a.orderIndex - b.orderIndex || a.id - b.id),
    [products]
  )

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'all') {
      return orderedProducts
    }

    return orderedProducts.filter((product) => product.categorySlug === activeCategory)
  }, [activeCategory, orderedProducts])

  const featuredProducts = useMemo(() => {
    const featured = orderedProducts.filter((product) => product.isFeatured)
    return featured.length > 0 ? featured.slice(0, 4) : orderedProducts.slice(0, 4)
  }, [orderedProducts])

  const activeCategoryLabel =
    navigationCategories.find((category) => category.slug === activeCategory)?.name ?? '전체'

  const collectionHeading =
    activeCategory === 'all' ? '라 뤼미에르 컬렉션' : `${activeCategoryLabel} 셀렉션`

  const collectionLead =
    activeCategory === 'all'
      ? '빛의 조각을 모아, 가장 눈부신 순간을 닮다.'
      : `${activeCategoryLabel} 라인을 중심으로 가장 균형 있게 셀렉트했습니다.`

  const collectionBody =
    activeCategory === 'all'
      ? '당신의 일상에 스며드는 우아한 빛의 언어.'
      : '섬세한 디테일과 은은한 광채가 오래 남는 장면을 완성합니다.'

  return (
    <div data-products-shell className="bg-[#f3eee7] text-[#4d382d]">
      <header className="fixed inset-x-0 top-0 z-[70]">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 pt-6 sm:px-10 sm:pt-8">
          <Link
            href="/"
            className="brand-wordmark text-[2rem] leading-none tracking-[0.08em] text-white transition-opacity hover:opacity-80"
          >
            Ju
          </Link>

          <button
            type="button"
            aria-label={mobileMenuOpen ? '메뉴 닫기' : '메뉴 열기'}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="inline-flex h-10 w-10 items-center justify-center text-white transition-opacity hover:opacity-80"
          >
            {mobileMenuOpen ? <X size={22} strokeWidth={1.7} /> : <Menu size={22} strokeWidth={1.7} />}
          </button>
        </div>
      </header>

      <div
        className={cn(
          'fixed inset-0 z-[70] transition-all duration-300',
          mobileMenuOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        )}
      >
        <button
          type="button"
          aria-label="메뉴 닫기"
          onClick={() => setMobileMenuOpen(false)}
          className="absolute inset-0 bg-[#120d09]/76 backdrop-blur-sm"
        />

        <aside
          className={cn(
            'absolute right-0 top-0 flex h-full w-full max-w-[420px] flex-col bg-[#2e2119] px-7 py-7 text-white transition-transform duration-300 sm:px-9',
            mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          )}
        >
          <div className="flex items-center justify-between">
            <span className="brand-wordmark text-[2rem] leading-none tracking-[0.08em] text-white">
              Ju
            </span>
            <button
              type="button"
              aria-label="메뉴 닫기"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-white/80"
            >
              <X size={22} strokeWidth={1.7} />
            </button>
          </div>

          <div className="mt-10">
            <p data-products-serif className="text-[11px] uppercase tracking-[0.28em] text-[#d8b78c]">
              Explore
            </p>
            <nav className="mt-5 border-t border-white/10">
              {navLinks.map((item, index) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between border-b border-white/10 py-5 text-white transition-colors hover:text-[#f1ded0]"
                >
                  <span data-products-serif className="text-[1.75rem] leading-none">
                    {item.label}
                  </span>
                  <span className="text-[11px] tracking-[0.24em] text-white/38">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </Link>
              ))}
            </nav>
          </div>

          <div className="mt-auto border-t border-white/10 pt-6">
            <p className="text-[13px] leading-7 text-white/70">
              컬렉션 비교와 선물 상담은 문의 페이지에서 바로 예약할 수 있습니다.
            </p>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-5 inline-flex items-center gap-3 border border-[#c59a69] px-5 py-3 text-[11px] uppercase tracking-[0.22em] text-[#f5e3cb] transition-colors hover:bg-white/8"
            >
              상담 예약
              <ArrowRight size={15} strokeWidth={1.7} />
            </Link>
          </div>
        </aside>
      </div>

      <section className="relative isolate min-h-[640px] overflow-hidden bg-[#594233] md:min-h-[760px]">
        <ShowcaseImage
          src={PRODUCTS_HERO_IMAGE}
          mobileSrc={PRODUCTS_HERO_MOBILE_IMAGE}
          alt="브라운 새틴 위에 놓인 주얼리"
          loading="eager"
          className="absolute inset-0 h-full w-full bg-[#594233]"
          imageClassName="object-cover object-[74%_44%] md:object-[82%_42%]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(66,42,28,0.72)_0%,rgba(73,48,33,0.46)_48%,rgba(47,30,21,0.18)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_32%,rgba(255,232,214,0.16),transparent_18%),radial-gradient(circle_at_38%_44%,rgba(255,238,220,0.12),transparent_22%)]" />

        <div className={cn(sectionFrame, 'relative flex min-h-[640px] items-center pb-20 pt-28 md:min-h-[760px] md:pt-32')}>
          <div className="max-w-[430px] text-white">
            <div className="mb-6 flex w-fit items-center gap-3 text-[#e6d1c0] md:mb-8">
              <span className="h-px w-6 bg-current/70" />
              <span className="text-[10px] tracking-[0.34em]">COLLECTION</span>
              <span className="h-px w-10 bg-current/40" />
            </div>

            <h1
              data-products-serif
              className="text-[3.3rem] font-light leading-none tracking-[-0.05em] text-white sm:text-[4.2rem] md:text-[5.1rem]"
            >
              컬렉션
            </h1>
            <p
              data-products-serif
              className="mt-8 text-[1.2rem] font-light leading-[1.8] tracking-[-0.02em] text-[#f1e3d7] md:text-[1.42rem]"
            >
              섬세한 빛의 언어로 완성되는
              <br />
              당신만의 순간
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-[#e4dbcf] bg-[#f6f1eb]">
        <div className={cn(sectionFrame, 'py-5')}>
          <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-hide sm:justify-center">
            {navigationCategories.map((category) => (
              <button
                key={category.slug}
                type="button"
                onClick={() => setActiveCategory(category.slug)}
                className={cn(
                  'min-w-[122px] rounded-full border px-6 py-3 text-[14px] tracking-[-0.02em] transition-all',
                  activeCategory === category.slug
                    ? 'border-[#9f7e67] bg-white text-[#745640] shadow-[inset_0_0_0_1px_rgba(159,126,103,0.18)]'
                    : 'border-[#e4d9cd] bg-[#f9f4ee] text-[#9d8c7c] hover:border-[#ceb7a4] hover:text-[#745640]'
                )}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-8 md:py-10">
        <div className={sectionFrame}>
          <div className="overflow-hidden rounded-[20px] bg-[#4a352b] shadow-[0_24px_60px_-28px_rgba(54,33,21,0.5)]">
            <div className="grid md:grid-cols-[1.04fr_1.16fr]">
              <div className="flex items-center bg-[linear-gradient(135deg,#33231c_0%,#4d392f_100%)] px-7 py-10 text-white sm:px-10 md:px-12">
                <div className="max-w-[350px]">
                  <p className="text-[11px] tracking-[0.34em] text-[#d8bca7]">SIGNATURE COLLECTION</p>
                  <h2
                    data-products-serif
                    className="mt-5 text-[2.35rem] font-light leading-[1.12] tracking-[-0.05em] sm:text-[2.8rem]"
                  >
                    {collectionHeading}
                  </h2>
                  <p className="mt-6 text-[15px] leading-8 text-[#ecddd1]">
                    {collectionLead}
                    <br />
                    {collectionBody}
                  </p>
                  <Link
                    href="/contact"
                    className="mt-8 inline-flex min-h-[52px] items-center gap-3 border border-[#bea28d] px-6 text-[14px] text-[#f0e4db] transition-colors hover:bg-white/8"
                  >
                    컬렉션 보러가기
                    <ArrowRight size={16} strokeWidth={1.6} />
                  </Link>
                </div>
              </div>

              <div className="relative min-h-[320px]">
                <ShowcaseImage
                  src={PRODUCTS_COLLECTION_IMAGE}
                  alt="라 뤼미에르 컬렉션 대표 주얼리"
                  className="absolute inset-0 h-full w-full bg-[#5a4031]"
                  imageClassName="object-cover object-[62%_46%]"
                />
                <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(74,53,43,0.18)_0%,rgba(74,53,43,0)_36%,rgba(31,18,12,0.08)_100%)]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-10">
        <div className={sectionFrame}>
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
              {filteredProducts.map((product, index) => (
                <Link
                  key={product.id}
                  href={resolveProductHref(product)}
                  className="group overflow-hidden rounded-[12px] border border-[#e2d7cb] bg-[#fbf8f4] shadow-[0_18px_40px_-28px_rgba(72,46,31,0.34)] transition-transform duration-300 hover:-translate-y-1"
                >
                  <div className="relative overflow-hidden">
                    <span
                      aria-hidden="true"
                      className="absolute right-3 top-3 z-10 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/72 text-[#b99e8b] backdrop-blur-sm transition-colors hover:text-[#8b6a55]"
                    >
                      <Heart size={15} strokeWidth={1.7} />
                    </span>
                    <ShowcaseImage
                      src={resolveProductImage(product, index)}
                      alt={product.name}
                      className="aspect-[1/0.78]"
                      imageClassName="object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>

                  <div className="border-t border-[#e8ddd1] px-4 pb-5 pt-4 text-center md:px-5">
                    <h3
                      data-products-serif
                      className="text-[1.12rem] font-light leading-[1.45] tracking-[-0.03em] text-[#5a4338] md:text-[1.25rem]"
                    >
                      {product.name}
                    </h3>
                    <p className="mt-2 text-[12px] leading-6 text-[#8a7566]">
                      {trimText(product.spec, product.categoryName || '컬렉션 셀렉션', 40)}
                    </p>
                    <p
                      data-products-serif
                      className="mt-2 text-[1.02rem] font-light tracking-[-0.02em] text-[#765847]"
                    >
                      가격 문의
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="rounded-[20px] border border-[#e2d7cb] bg-[#faf6f1] px-8 py-16 text-center shadow-[0_20px_50px_-32px_rgba(72,46,31,0.3)]">
              <p data-products-serif className="text-[2rem] font-light tracking-[-0.04em] text-[#5c4336]">
                공개된 제품이 아직 없습니다
              </p>
              <p className="mt-4 text-[15px] leading-7 text-[#8b7668]">
                등록된 라인업이 준비되는 동안 상담 문의를 남겨주시면 우선 안내해 드리겠습니다.
              </p>
              <Link
                href="/contact"
                className="mt-8 inline-flex min-h-[52px] items-center gap-3 rounded-full bg-[#6c4d3a] px-7 text-sm text-white transition-colors hover:bg-[#5b4030]"
              >
                상담 문의
                <ArrowRight size={16} strokeWidth={1.6} />
              </Link>
            </div>
          )}
        </div>
      </section>

      <section className="pb-10">
        <div className={sectionFrame}>
          <div className="overflow-hidden rounded-[20px] bg-[#5a4031] shadow-[0_24px_60px_-30px_rgba(61,40,28,0.52)]">
            <div className="grid md:grid-cols-[1.08fr_1fr]">
              <div className="flex items-center bg-[linear-gradient(135deg,#4b3428_0%,#694c3b_100%)] px-7 py-10 text-white sm:px-10 md:px-12">
                <div className="max-w-[360px]">
                  <p className="text-[11px] tracking-[0.34em] text-[#d6bda9]">큐레이션</p>
                  <h2
                    data-products-serif
                    className="mt-5 text-[2.1rem] font-light leading-[1.22] tracking-[-0.05em] sm:text-[2.65rem]"
                  >
                    빛으로 완성하는 나만의 스타일
                  </h2>
                  <p className="mt-6 text-[15px] leading-8 text-[#ecddd1]">
                    다양한 주얼리 스타일링 제안으로
                    <br />
                    매일의 순간을 더욱 특별하게.
                  </p>
                  <Link
                    href="/contact"
                    className="mt-8 inline-flex min-h-[52px] items-center gap-3 border border-[#bfa08b] px-6 text-[14px] text-[#f0e4db] transition-colors hover:bg-white/8"
                  >
                    스타일 제안 보기
                    <ArrowRight size={16} strokeWidth={1.6} />
                  </Link>
                </div>
              </div>

              <div className="relative min-h-[300px]">
                <ShowcaseImage
                  src={PRODUCTS_MODEL_IMAGE}
                  alt="주얼리를 착용한 모델 컷"
                  className="absolute inset-0 h-full w-full bg-[#5a4031]"
                  imageClassName="object-cover object-[56%_42%]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-12">
        <div className={sectionFrame}>
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <p
                data-products-serif
                className="text-[2rem] font-light leading-none tracking-[-0.05em] text-[#5b4337]"
              >
                신상품
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 text-[14px] text-[#8a6c59] transition-colors hover:text-[#6e503d]"
            >
              전체 보기
              <ArrowRight size={16} strokeWidth={1.6} />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
            {featuredProducts.map((product, index) => (
              <Link
                key={product.id}
                href={resolveProductHref(product)}
                className="group overflow-hidden rounded-[12px] border border-[#e2d7cb] bg-[#fbf8f4] shadow-[0_18px_40px_-28px_rgba(72,46,31,0.34)] transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="relative overflow-hidden">
                  <span className="absolute left-3 top-3 z-10 bg-[#a88a6e] px-2.5 py-1 text-[10px] tracking-[0.2em] text-white">
                    NEW
                  </span>
                  <span
                    aria-hidden="true"
                    className="absolute right-3 top-3 z-10 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/72 text-[#b99e8b] backdrop-blur-sm transition-colors hover:text-[#8b6a55]"
                  >
                    <Heart size={15} strokeWidth={1.7} />
                  </span>
                  <ShowcaseImage
                    src={resolveProductImage(product, index + 5)}
                    alt={product.name}
                    className="aspect-[1/0.78]"
                    imageClassName="object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>

                <div className="border-t border-[#e8ddd1] px-4 pb-5 pt-4 text-center md:px-5">
                  <h3
                    data-products-serif
                    className="text-[1.08rem] font-light leading-[1.45] tracking-[-0.03em] text-[#5a4338] md:text-[1.2rem]"
                  >
                    {product.name}
                  </h3>
                  <p className="mt-2 text-[12px] leading-6 text-[#8a7566]">
                    {trimText(product.spec, product.categoryName || '시그니처 셀렉션', 38)}
                  </p>
                  <p className="mt-2 text-[13px] text-[#8b7668]">
                    {trimText(product.description, '상세 안내는 상담을 통해 도와드립니다.', 26)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-[#e0d7cc] bg-[#f6f0e8]">
        <div className="mx-auto grid max-w-[1440px] md:grid-cols-[1.05fr_1.95fr]">
          <div className="relative min-h-[220px] overflow-hidden">
            <ShowcaseImage
              src={PRODUCTS_SERVICE_IMAGE}
              alt="브랜드 패키지 이미지"
              className="absolute inset-0 h-full w-full bg-[#f1e6db]"
              imageClassName="object-cover object-[58%_50%]"
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,245,236,0.18)_0%,rgba(255,245,236,0.06)_100%)]" />
          </div>

          <div className="grid divide-y divide-[#e0d7cc] md:grid-cols-3 md:divide-x md:divide-y-0">
            {serviceHighlights.map((item) => {
              const Icon = item.icon

              return (
                <div key={item.title} className="flex items-center gap-5 px-7 py-8 sm:px-9 md:py-10">
                  <div className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-[#dccdbd] bg-white/70 text-[#8e705b]">
                    <Icon size={24} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3
                      data-products-serif
                      className="text-[1.35rem] font-light tracking-[-0.03em] text-[#5b4337]"
                    >
                      {item.title}
                    </h3>
                    <p className="mt-2 text-[13px] leading-6 text-[#8a7566]">{item.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <footer className="bg-[#433229] text-[#e7d8cd]">
        <div className={cn(sectionFrame, 'py-10 md:py-12')}>
          <div className="grid gap-10 border-b border-white/10 pb-10 md:grid-cols-[1.2fr_1fr_1fr_1fr_1.15fr] md:gap-8">
            <div>
              <Link
                href="/"
                data-products-display
                className="text-[44px] font-light italic tracking-[-0.04em] text-white transition-opacity hover:opacity-80"
              >
                Ju
              </Link>
              <p className="mt-4 text-[14px] leading-7 text-[#ccb8aa]">
                빛이 머문 순간을 아름답게
                <br />
                당신의 일상에 주얼리를.
              </p>

              {(settings.instagramUrl || settings.facebookUrl) ? (
                <div className="mt-6 flex gap-3">
                  {settings.instagramUrl ? (
                    <a
                      href={settings.instagramUrl}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Instagram"
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/12 text-[#ddcbbf] transition-colors hover:border-white/25 hover:text-white"
                    >
                      <Instagram size={16} strokeWidth={1.7} />
                    </a>
                  ) : null}
                  {settings.facebookUrl ? (
                    <a
                      href={settings.facebookUrl}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Facebook"
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/12 text-[#ddcbbf] transition-colors hover:border-white/25 hover:text-white"
                    >
                      <Facebook size={16} strokeWidth={1.7} />
                    </a>
                  ) : null}
                </div>
              ) : null}

              <p className="mt-6 text-[12px] text-[#a99282]">
                &copy; {new Date().getFullYear()} {settings.shopName}. All rights reserved.
              </p>
            </div>

            <div>
              <p className="text-[13px] tracking-[0.24em] text-[#f3e5da]">SHOP</p>
              <div className="mt-5 space-y-3 text-[14px] text-[#ccb8aa]">
                <Link href="/products" className="block transition-colors hover:text-white">
                  컬렉션
                </Link>
                <Link href="/products" className="block transition-colors hover:text-white">
                  베스트
                </Link>
                <Link href="/products" className="block transition-colors hover:text-white">
                  신상품
                </Link>
                <Link href="/contact" className="block transition-colors hover:text-white">
                  기프트
                </Link>
              </div>
            </div>

            <div>
              <p className="text-[13px] tracking-[0.24em] text-[#f3e5da]">CUSTOMER</p>
              <div className="mt-5 space-y-3 text-[14px] text-[#ccb8aa]">
                <Link href="/faq" className="block transition-colors hover:text-white">
                  공지사항
                </Link>
                <Link href="/faq" className="block transition-colors hover:text-white">
                  자주 묻는 질문
                </Link>
                <Link href="/trade" className="block transition-colors hover:text-white">
                  주문 안내
                </Link>
                <Link href="/contact" className="block transition-colors hover:text-white">
                  교환 및 상담 안내
                </Link>
              </div>
            </div>

            <div>
              <p className="text-[13px] tracking-[0.24em] text-[#f3e5da]">ABOUT US</p>
              <div className="mt-5 space-y-3 text-[14px] text-[#ccb8aa]">
                <Link href="/about" className="block transition-colors hover:text-white">
                  브랜드 스토리
                </Link>
                <Link href="/location" className="block transition-colors hover:text-white">
                  매장 안내
                </Link>
                <Link href="/trade" className="block transition-colors hover:text-white">
                  거래 문의
                </Link>
              </div>
            </div>

            <div>
              <p className="text-[13px] tracking-[0.24em] text-[#f3e5da]">CONTACT</p>
              <div className="mt-5 space-y-4 text-[14px] leading-7 text-[#ccb8aa]">
                <div className="flex items-start gap-3">
                  <Phone size={16} strokeWidth={1.6} className="mt-[6px] shrink-0 text-[#f1dfd2]" />
                  <div>
                    <p>{settings.phonePrimary}</p>
                    {settings.phoneSecondary ? <p>{settings.phoneSecondary}</p> : null}
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail size={16} strokeWidth={1.6} className="mt-[6px] shrink-0 text-[#f1dfd2]" />
                  <p>{settings.email}</p>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin size={16} strokeWidth={1.6} className="mt-[6px] shrink-0 text-[#f1dfd2]" />
                  <div>
                    <p>{settings.address}</p>
                    <p>{settings.businessHours}</p>
                    <p>{settings.closedDay}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 pt-6 text-[13px] text-[#a99282] sm:flex-row sm:items-center sm:justify-between">
            <p>{settings.businessName}</p>
            <div className="flex flex-wrap gap-5">
              <Link href="/terms" className="transition-colors hover:text-white">
                이용약관
              </Link>
              <Link href="/privacy" className="transition-colors hover:text-white">
                개인정보처리방침
              </Link>
              <Link href="/contact" className="transition-colors hover:text-white">
                사업자문의
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
