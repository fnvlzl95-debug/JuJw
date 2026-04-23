'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import {
  ArrowRight,
  Facebook,
  Gem,
  Gift,
  Heart,
  Instagram,
  Leaf,
  Menu,
  MessageCircle,
  Plus,
  X,
} from 'lucide-react'
import ShowcaseImage from '@/components/media/ShowcaseImage'
import { cn } from '@/lib/utils'
import { DEFAULT_SITE_SETTINGS, normalizeSiteSettings, type SiteSettings } from '@/lib/site-settings'

const GENERIC_PRODUCT_PLACEHOLDER = '/img/hero/hero.png'
const HOME_HERO_IMAGE = '/img/products-generated/home-hero-desktop.png'
const HOME_HERO_MOBILE_IMAGE = '/img/products-generated/home-hero-mobile.png'
const HOME_BRAND_IMAGE = '/img/products-generated/home-brand-desktop.png'
const HOME_BRAND_MOBILE_IMAGE = '/img/products-generated/home-brand-mobile.png'
const HOME_SIGNATURE_IMAGE = '/img/products-generated/home-signature-desktop.png'
const HOME_SIGNATURE_MOBILE_IMAGE = '/img/products-generated/home-signature-mobile.png'

const HOME_IMAGES = {
  collectionBracelet: '/img/products-generated/home-collection-bracelet-card.png',
  collectionEarrings: '/img/products-generated/home-collection-earrings-card.png',
  collectionNecklace: '/img/products-generated/home-collection-necklace-card.png',
  collectionRing: '/img/products-generated/home-collection-ring-card.png',
  bestBracelet: '/img/products-generated/home-best-bracelet-portrait.png',
  bestEarrings: '/img/products-generated/home-best-earrings-portrait.png',
  bestNecklace: '/img/products-generated/home-best-necklace-portrait.png',
  bestRing: '/img/products-generated/home-best-ring-portrait.png',
  giftConsultation: '/img/products-generated/home-gift-consultation-portrait.png',
} as const

const navigation = [
  { label: '컬렉션', href: '/products' },
  { label: '브랜드 스토리', href: '/about' },
  { label: '거래 안내', href: '/trade' },
  { label: '오시는 길', href: '/location' },
  { label: 'FAQ', href: '/faq' },
] as const

const benefits = [
  {
    title: '핸드메이드 퀄리티',
    description: '섬세한 수작업으로 완성된 높은 완성도',
    Icon: Gem,
  },
  {
    title: '프리미엄 패키지',
    description: '정성을 담은 리본 포장과 특별한 순간을 준비하세요',
    Icon: Gift,
  },
  {
    title: '프리미엄 소재',
    description: '14K/18K 골드, 천연 다이아몬드와 엄선된 스톤을 사용합니다',
    Icon: Leaf,
  },
  {
    title: '빠른 상담',
    description: '관련 스타일과 견적까지 빠르게 도와드립니다',
    Icon: MessageCircle,
  },
] as const

const collections = [
  { title: 'NECKLACES', subtitle: '목걸이', image: HOME_IMAGES.collectionNecklace, href: '/products/necklaces' },
  { title: 'EARRINGS', subtitle: '귀걸이', image: HOME_IMAGES.collectionEarrings, href: '/products/earrings' },
  { title: 'RINGS', subtitle: '반지', image: HOME_IMAGES.collectionRing, href: '/products/rings' },
  { title: 'BRACELETS', subtitle: '팔찌', image: HOME_IMAGES.collectionBracelet, href: '/products/bracelets' },
] as const

type HomeProduct = {
  id: number
  categoryName?: string
  categorySlug?: string
  imageUrl: string | null
  name: string
  slug: string
  spec: string | null
}

type ProductCard = {
  key: string
  name: string
  detail: string
  price: string
  image: string
  href: string
}

const categoryImageMap: Record<string, string> = {
  bracelets: HOME_IMAGES.bestBracelet,
  earrings: HOME_IMAGES.bestEarrings,
  necklaces: HOME_IMAGES.bestNecklace,
  rings: HOME_IMAGES.bestRing,
}

const fallbackProducts: ProductCard[] = [
  {
    key: 'fallback-1',
    name: '에끌라 스파클 링',
    detail: '14K 골드, 다이아몬드',
    price: '₩ 520,000',
    image: HOME_IMAGES.bestRing,
    href: '/products/rings',
  },
  {
    key: 'fallback-2',
    name: '루미에르 라인 목걸이',
    detail: '14K 골드, 다이아몬드',
    price: '₩ 690,000',
    image: HOME_IMAGES.bestNecklace,
    href: '/products/necklaces',
  },
  {
    key: 'fallback-3',
    name: '클래식 체인 팔찌',
    detail: '14K 골드',
    price: '₩ 780,000',
    image: HOME_IMAGES.bestBracelet,
    href: '/products/bracelets',
  },
  {
    key: 'fallback-4',
    name: '헤일로 링 귀걸이',
    detail: '14K 골드, 큐빅 지르코니아',
    price: '₩ 390,000',
    image: HOME_IMAGES.bestEarrings,
    href: '/products/earrings',
  },
  {
    key: 'fallback-5',
    name: '스텔라 라인 목걸이',
    detail: '14K 골드, 다이아몬드',
    price: '₩ 620,000',
    image: HOME_IMAGES.bestNecklace,
    href: '/products/necklaces',
  },
  {
    key: 'fallback-6',
    name: '볼륨 플라워 링',
    detail: '14K 골드, 다이아몬드',
    price: '₩ 480,000',
    image: HOME_IMAGES.bestRing,
    href: '/products/rings',
  },
] as const

const footerGroups = [
  {
    title: 'SHOP',
    links: [
      { label: '컬렉션', href: '/products' },
      { label: '베스트 셀러', href: '/products' },
      { label: '신상품', href: '/products' },
      { label: '기프트', href: '/contact' },
      { label: 'SALE', href: '/products' },
    ],
  },
  {
    title: 'CUSTOMER',
    links: [
      { label: '공지사항', href: '/faq' },
      { label: '자주 묻는 질문', href: '/faq' },
      { label: '배송 안내', href: '/trade' },
      { label: '교환/반품 안내', href: '/trade' },
      { label: '1:1 문의', href: '/contact' },
    ],
  },
  {
    title: 'ABOUT US',
    links: [
      { label: '브랜드 스토리', href: '/about' },
      { label: '대량 상담', href: '/trade' },
      { label: '제휴 문의', href: '/contact' },
    ],
  },
] as const

const getProductHref = (product: Pick<HomeProduct, 'categorySlug' | 'slug'>) => {
  if (product.categorySlug && product.slug) {
    return `/products/${product.categorySlug}/${product.slug}`
  }

  return '/products'
}

const resolveProductImage = (product: HomeProduct, index: number) => {
  if (
    product.imageUrl &&
    product.imageUrl !== GENERIC_PRODUCT_PLACEHOLDER &&
    !product.imageUrl.startsWith('products/')
  ) {
    return product.imageUrl
  }

  if (product.categorySlug && categoryImageMap[product.categorySlug]) {
    return categoryImageMap[product.categorySlug]
  }

  return fallbackProducts[index % fallbackProducts.length].image
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SITE_SETTINGS)
  const [featuredProducts, setFeaturedProducts] = useState<HomeProduct[]>([])

  useEffect(() => {
    document.body.classList.add('home-reference-page')

    return () => {
      document.body.classList.remove('home-reference-page')
    }
  }, [])

  useEffect(() => {
    const originalOverflow = document.body.style.overflow

    document.body.style.overflow = menuOpen ? 'hidden' : ''

    return () => {
      document.body.style.overflow = originalOverflow
    }
  }, [menuOpen])

  useEffect(() => {
    const load = async () => {
      try {
        const [settingsRes, featuredRes, productsRes] = await Promise.all([
          fetch('/api/settings', { cache: 'no-store' }),
          fetch('/api/products?featured=true', { cache: 'no-store' }),
          fetch('/api/products', { cache: 'no-store' }),
        ])

        if (settingsRes.ok) {
          const payload = (await settingsRes.json()) as { settings?: Record<string, string> }
          setSettings(normalizeSiteSettings(payload.settings))
        }

        if (featuredRes.ok) {
          const payload = (await featuredRes.json()) as { products?: HomeProduct[] }
          const nextProducts = payload.products ?? []

          if (nextProducts.length > 0) {
            setFeaturedProducts(nextProducts)
            return
          }
        }

        if (productsRes.ok) {
          const payload = (await productsRes.json()) as { products?: HomeProduct[] }
          setFeaturedProducts(payload.products ?? [])
        }
      } catch {
        setFeaturedProducts([])
      }
    }

    void load()
  }, [])

  const bestSellerCards = useMemo(() => {
    const dynamicCards = featuredProducts.slice(0, 6).map((product, index) => ({
      key: `dynamic-${product.id}`,
      name: product.name,
      detail: product.spec || `${product.categoryName || 'JU 컬렉션'}`,
      price: product.categoryName || '상담 문의',
      image: resolveProductImage(product, index),
      href: getProductHref(product),
    }))

    const merged = [...dynamicCards]

    for (const item of fallbackProducts) {
      if (merged.length >= 6) {
        break
      }
      merged.push(item)
    }

    return merged.slice(0, 6)
  }, [featuredProducts])

  const contactLines = [settings.phonePrimary, settings.phoneSecondary, settings.email].filter(Boolean)

  return (
    <div className="bg-[#f3ece3] text-[#2d211a]">
      <div
        className={cn(
          'fixed inset-0 z-[70] transition-all duration-300',
          menuOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        )}
      >
        <button
          type="button"
          aria-label="메뉴 닫기"
          className="absolute inset-0 bg-[#120d09]/76 backdrop-blur-sm"
          onClick={() => setMenuOpen(false)}
        />
        <aside
          className={cn(
            'absolute right-0 top-0 flex h-full w-full max-w-[420px] flex-col bg-[#2e2119] px-7 py-7 text-white transition-transform duration-300 sm:px-9',
            menuOpen ? 'translate-x-0' : 'translate-x-full'
          )}
        >
          <div className="flex items-center justify-between">
            <span
              className="text-[2.2rem] italic leading-none tracking-[0.08em]"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Ju
            </span>
            <button type="button" aria-label="닫기" onClick={() => setMenuOpen(false)} className="p-2 text-white/80">
              <X size={22} />
            </button>
          </div>

          <div className="mt-10">
            <p
              className="text-[11px] uppercase tracking-[0.28em] text-[#d8b78c]"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Explore
            </p>
            <nav className="mt-5 border-t border-white/10">
              {navigation.map((item, index) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="flex items-center justify-between border-b border-white/10 py-5"
                  onClick={() => setMenuOpen(false)}
                >
                  <span
                    className="text-[1.75rem] leading-none"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
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
              className="mt-5 inline-flex items-center gap-3 border border-[#c59a69] px-5 py-3 text-[11px] uppercase tracking-[0.22em] text-[#f5e3cb]"
              onClick={() => setMenuOpen(false)}
            >
              상담 예약
              <ArrowRight size={15} />
            </Link>
          </div>
        </aside>
      </div>

      <section className="relative min-h-[720px] overflow-hidden bg-[#403026] sm:min-h-[860px]">
        <ShowcaseImage
          src={HOME_HERO_IMAGE}
          mobileSrc={HOME_HERO_MOBILE_IMAGE}
          alt="메인 히어로 주얼리"
          loading="eager"
          className="absolute inset-0 h-full w-full bg-[#403026]"
          imageClassName="object-cover object-[70%_44%] md:object-[76%_44%]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(42,28,20,0.38)_0%,rgba(42,28,20,0.16)_38%,rgba(33,22,16,0.48)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,240,227,0.08),transparent_28%)]" />

        <div className="relative z-10 mx-auto flex min-h-[720px] max-w-[1440px] flex-col px-6 pb-16 pt-6 sm:min-h-[860px] sm:px-10 sm:pb-20 sm:pt-8">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="text-[2rem] italic leading-none tracking-[0.08em] text-white"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Ju
            </Link>
            <button
              type="button"
              aria-label="메뉴 열기"
              onClick={() => setMenuOpen(true)}
              className="text-white transition-opacity hover:opacity-80"
            >
              <Menu size={24} strokeWidth={1.7} />
            </button>
          </div>

          <div className="my-auto flex flex-col items-center justify-center pb-8 text-center sm:pb-12">
            <div className="mx-auto flex w-[150px] items-center justify-center gap-4 text-[#dcc09c]">
              <span className="h-px flex-1 bg-current/45" />
              <span className="text-[13px]">✦</span>
              <span className="h-px flex-1 bg-current/45" />
            </div>
            <h1
              className="hero-brand-mark mt-5 text-[4.8rem] italic leading-none tracking-[0.04em] text-white sm:text-[7.5rem]"
            >
              Ju
            </h1>
            <p className="mt-5 max-w-[420px] text-[13px] leading-7 text-white/82 sm:text-[15px]">
              일상의 빛을 가장 아름답게, 주얼리의 본질을 담다
            </p>
            <Link
              href="/products"
              className="mt-8 inline-flex min-w-[240px] items-center justify-center gap-4 border border-[#efe5da] bg-[#f7f3ed] px-8 py-4 text-[12px] tracking-[0.18em] text-[#5a4337] transition-colors hover:bg-white"
            >
              컬렉션 둘러보기
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <section className="border-y border-[#e4d6c6] bg-[#fbf7f2]">
        <div className="mx-auto grid max-w-[1440px] gap-y-8 px-6 py-8 sm:px-10 lg:grid-cols-4 lg:gap-0">
          {benefits.map((item, index) => {
            const Icon = item.Icon

            return (
              <article
                key={item.title}
                className={cn(
                  'grid grid-cols-[40px_minmax(0,1fr)] items-start gap-4 lg:px-8',
                  index < benefits.length - 1 && 'lg:border-r lg:border-[#e2d4c5]'
                )}
              >
                <div className="pt-1 text-[#b68d5d]">
                  <Icon size={25} strokeWidth={1.5} />
                </div>
                <div>
                  <h2
                    className="text-[13px] uppercase tracking-[0.16em] text-[#674d3f]"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    {item.title}
                  </h2>
                  <p className="mt-2 max-w-[240px] text-[12px] leading-6 text-[#7d6c5f] sm:text-[13px]">
                    {item.description}
                  </p>
                </div>
              </article>
            )
          })}
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#3f2f25]">
        <div className="absolute inset-y-0 right-0 hidden w-[58%] lg:block">
          <ShowcaseImage
            src={HOME_BRAND_IMAGE}
            mobileSrc={HOME_BRAND_MOBILE_IMAGE}
            alt="골드 네크리스"
            className="h-full w-full bg-[#3f2f25]"
            imageClassName="object-cover object-[86%_38%]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(63,47,37,0.98)_0%,rgba(63,47,37,0.42)_42%,rgba(63,47,37,0.08)_100%)]" />
        </div>
        <div className="relative mx-auto grid max-w-[1440px] gap-10 px-6 py-[4.5rem] sm:px-10 lg:grid-cols-[440px_minmax(0,1fr)] lg:py-20">
          <div className="max-w-[430px]">
            <p
              className="text-[11px] uppercase tracking-[0.28em] text-[#d6b28b]"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Brand Story
            </p>
            <h2
              className="text-balance mt-5 text-[2.2rem] leading-[1.35] text-[#f4e8d9] sm:text-[2.85rem]"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              시간이 지나도 변치 않는 가치, Ju
            </h2>
            <p className="mt-5 text-[15px] leading-8 text-white/70">
              Ju는 섬세한 감성과 정교한 기술로 당신의 가장 소중한 순간을 빛냅니다. 유행보다 본질에 집중하는 주얼리를 소개합니다.
            </p>
            <Link
              href="/about"
              className="mt-8 inline-flex items-center gap-4 border border-[#9e7a5b] px-6 py-4 text-[11px] uppercase tracking-[0.22em] text-[#f0dec9] transition-colors hover:bg-white/5"
            >
              브랜드 스토리 보기
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="overflow-hidden lg:hidden">
            <ShowcaseImage
              src={HOME_BRAND_MOBILE_IMAGE}
              alt="골드 네크리스"
              className="aspect-[4/3]"
              imageClassName="object-cover object-[72%_44%]"
            />
          </div>
        </div>
      </section>

      <section className="bg-[#fbf7f2] px-6 py-[4.5rem] sm:px-10 sm:py-20">
        <div className="mx-auto max-w-[1440px]">
          <div className="text-center">
            <p
              className="text-[11px] uppercase tracking-[0.28em] text-[#b68d5d]"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Collection
            </p>
            <h2
              className="mt-3 text-[2.5rem] leading-none text-[#3d2d23] sm:text-[3.4rem]"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              컬렉션
            </h2>
            <div className="mx-auto mt-4 h-px w-10 bg-[#caa57b]" />
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {collections.map((item) => (
              <Link key={item.title} href={item.href} className="group block bg-white">
                <ShowcaseImage
                  src={item.image}
                  alt={item.title}
                  className="aspect-[1.1/0.96]"
                  imageClassName="object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <div className="flex items-end justify-between gap-5 border border-t-0 border-[#e3d7ca] px-5 py-5">
                  <div>
                    <h3
                      className="text-[1.5rem] leading-none tracking-[0.06em] text-[#3d2d23]"
                      style={{ fontFamily: "'Cormorant Garamond', serif" }}
                    >
                      {item.title}
                    </h3>
                    <p className="mt-2 text-[13px] text-[#7b6b5f]">{item.subtitle}</p>
                  </div>
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#b79776] text-[#8c6a4a]">
                    <Plus size={15} strokeWidth={1.7} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f7f1ea] px-6 py-[4.5rem] sm:px-10 sm:py-20">
        <div className="mx-auto max-w-[1440px]">
          <div className="text-center">
            <p
              className="text-[11px] uppercase tracking-[0.28em] text-[#b68d5d]"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Best Sellers
            </p>
            <h2
              className="mt-3 text-[2.45rem] leading-none text-[#3d2d23] sm:text-[3.2rem]"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              베스트 셀러
            </h2>
            <div className="mx-auto mt-4 h-px w-10 bg-[#caa57b]" />
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3 xl:grid-cols-6">
            {bestSellerCards.map((item) => (
              <Link key={item.key} href={item.href} className="group block bg-white">
                <div className="relative overflow-hidden">
                  <span className="absolute right-3 top-3 z-10 text-white/85">
                    <Heart size={18} strokeWidth={1.5} />
                  </span>
                  <ShowcaseImage
                    src={item.image}
                    alt={item.name}
                    className="aspect-[0.95/1]"
                    imageClassName="object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="border border-t-0 border-[#e3d7ca] px-4 py-4 text-center">
                  <h3 className="min-h-[40px] text-[14px] leading-6 text-[#3a2b22]">{item.name}</h3>
                  <p className="mt-2 text-[12px] leading-5 text-[#8b7a6b]">{item.detail}</p>
                  <p className="mt-1 text-[14px] text-[#6a4d3d]">{item.price}</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <Link
              href="/products"
              className="inline-flex items-center gap-4 border border-[#bca58d] px-6 py-3 text-[11px] uppercase tracking-[0.22em] text-[#6b4e3e] transition-colors hover:bg-white"
            >
              더 많은 베스트 셀러 보기
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#433125]">
        <div className="absolute inset-y-0 right-0 hidden w-[55%] lg:block">
          <ShowcaseImage
            src={HOME_SIGNATURE_IMAGE}
            mobileSrc={HOME_SIGNATURE_MOBILE_IMAGE}
            alt="시그니처 네크리스"
            className="h-full w-full bg-[#433125]"
            imageClassName="object-cover object-[82%_40%]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(67,49,37,1)_0%,rgba(67,49,37,0.55)_32%,rgba(67,49,37,0.08)_100%)]" />
        </div>
        <div className="relative mx-auto grid max-w-[1440px] gap-10 px-6 py-16 sm:px-10 lg:grid-cols-[520px_minmax(0,1fr)] lg:py-[4.5rem]">
          <div className="max-w-[430px]">
            <p
              className="text-[11px] uppercase tracking-[0.28em] text-[#d6b28b]"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Signature Collection
            </p>
            <h2
              className="text-balance mt-4 text-[2.2rem] leading-[1.28] text-[#f4e8d9] sm:text-[2.85rem]"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              라 뒤미에르 컬렉션
            </h2>
            <p className="mt-4 text-[15px] leading-8 text-white/70">
              빛의 결을 담아낸 시그니처 컬렉션. 당신의 특별한 순간에 맑은 존재감을 더합니다.
            </p>
            <Link
              href="/products"
              className="mt-8 inline-flex items-center gap-4 border border-[#9e7a5b] px-6 py-4 text-[11px] uppercase tracking-[0.22em] text-[#f0dec9] transition-colors hover:bg-white/5"
            >
              컬렉션 자세히 보기
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="overflow-hidden lg:hidden">
            <ShowcaseImage
              src={HOME_SIGNATURE_MOBILE_IMAGE}
              alt="시그니처 네크리스"
              className="aspect-[4/3]"
              imageClassName="object-cover object-[72%_44%]"
            />
          </div>
        </div>
      </section>

      <section className="border-t border-[#eadfd2] bg-[#fbf7f2]">
        <div className="mx-auto grid max-w-[1440px] gap-0 lg:grid-cols-[420px_minmax(0,1fr)]">
          <div className="overflow-hidden">
            <ShowcaseImage
              src={HOME_IMAGES.giftConsultation}
              alt="주얼리 착용 컷"
              className="h-full min-h-[280px] lg:min-h-[100%]"
              imageClassName="object-cover object-center"
            />
          </div>

          <div className="px-6 py-12 sm:px-10 lg:px-12">
            <p
              className="text-[11px] uppercase tracking-[0.28em] text-[#b68d5d]"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Gift & Consultation
            </p>
            <h2
              className="mt-4 text-[2.1rem] leading-[1.3] text-[#3a2b22] sm:text-[2.65rem]"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              특별한 순간을 선물하세요
            </h2>
            <p className="mt-4 max-w-[560px] text-[15px] leading-8 text-[#76675b]">
              선물 포장 서비스와 1:1 맞춤 상담으로 당신의 마음을 정성껏 전해드립니다.
            </p>
            <Link
              href="/contact"
              className="mt-7 inline-flex items-center gap-4 bg-[#5c4437] px-6 py-4 text-[11px] uppercase tracking-[0.22em] text-white transition-colors hover:bg-[#443126]"
            >
              상담 예약하기
              <ArrowRight size={15} />
            </Link>

            <div className="mt-10 grid gap-8 border-t border-[#e4d6c6] pt-8 sm:grid-cols-3">
              <article className="border-l border-[#eadfd2] pl-4 first:border-l-0 first:pl-0">
                <Gift size={22} strokeWidth={1.5} className="text-[#b68d5d]" />
                <h3 className="mt-4 text-[15px] text-[#3e2f25]">선물 포장 서비스</h3>
                <p className="mt-2 text-[13px] leading-6 text-[#7b6c60]">고급 패키지로 정성껏 포장해 드립니다.</p>
              </article>
              <article className="border-l border-[#eadfd2] pl-4">
                <MessageCircle size={22} strokeWidth={1.5} className="text-[#b68d5d]" />
                <h3 className="mt-4 text-[15px] text-[#3e2f25]">1:1 맞춤 상담</h3>
                <p className="mt-2 text-[13px] leading-6 text-[#7b6c60]">원하는 분위기와 예산에 맞춰 바로 제안합니다.</p>
              </article>
              <article className="border-l border-[#eadfd2] pl-4">
                <Gem size={22} strokeWidth={1.5} className="text-[#b68d5d]" />
                <h3 className="mt-4 text-[15px] text-[#3e2f25]">품질 보증</h3>
                <p className="mt-2 text-[13px] leading-6 text-[#7b6c60]">모든 제품에 대해 꼼꼼한 검수와 안내를 제공합니다.</p>
              </article>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-[#5d4738] bg-[#34261f] text-white">
        <div className="mx-auto max-w-[1440px] px-6 py-12 sm:px-10">
          <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1.2fr]">
            <div>
              <h2
                className="text-[3rem] italic leading-none text-white"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Ju
              </h2>
              <p className="mt-4 max-w-[240px] text-[14px] leading-7 text-white/72">
                일상의 빛을 가장 아름답게, 주얼리의 본질을 담다.
              </p>
              <div className="mt-6 flex gap-3">
                <a
                  href={settings.instagramUrl || '#'}
                  target={settings.instagramUrl ? '_blank' : undefined}
                  rel={settings.instagramUrl ? 'noreferrer' : undefined}
                  aria-label="Instagram"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/80 transition-colors hover:border-white/35 hover:text-white"
                >
                  <Instagram size={18} />
                </a>
                <a
                  href={settings.facebookUrl || '#'}
                  target={settings.facebookUrl ? '_blank' : undefined}
                  rel={settings.facebookUrl ? 'noreferrer' : undefined}
                  aria-label="Facebook"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/80 transition-colors hover:border-white/35 hover:text-white"
                >
                  <Facebook size={18} />
                </a>
              </div>
            </div>

            {footerGroups.map((group) => (
              <div key={group.title}>
                <h3
                  className="text-[12px] uppercase tracking-[0.22em] text-[#d7b996]"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  {group.title}
                </h3>
                <ul className="mt-5 space-y-3 text-[14px] text-white/70">
                  {group.links.map((item) => (
                    <li key={item.label}>
                      <Link href={item.href} className="transition-colors hover:text-white">
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div>
              <h3
                className="text-[12px] uppercase tracking-[0.22em] text-[#d7b996]"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                CONTACT
              </h3>
              <ul className="mt-5 space-y-3 text-[14px] leading-7 text-white/70">
                {contactLines.map((line) => (
                  <li key={line}>{line}</li>
                ))}
                <li>{settings.businessHours}</li>
                <li>{settings.address}</li>
              </ul>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-5 text-[12px] text-white/45 sm:flex-row sm:items-center sm:justify-between">
            <p>&copy; 2026 {settings.shopName}. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="/terms" className="transition-colors hover:text-white/75">
                이용약관
              </Link>
              <Link href="/privacy" className="transition-colors hover:text-white/75">
                개인정보처리방침
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
