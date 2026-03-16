import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { trustBadges } from '@/content/static'
import { buildPageMetadata } from '@/lib/metadata'
import { getCategories, getFeaturedProducts, getSiteSettings } from '@/lib/site-data'

/* eslint-disable @next/next/no-img-element */

export const metadata = buildPageMetadata({
  title: '홈',
  description:
    'Ju Jewelry의 대표 라인업, 카테고리, 도매 상담 안내를 한 페이지에서 확인할 수 있습니다.',
  path: '/',
})

export default async function Home() {
  const [categories, featuredProducts, settings] = await Promise.all([
    getCategories(),
    getFeaturedProducts(),
    getSiteSettings(),
  ])

  return (
    <>
      <section className="min-h-screen pt-[72px] grid lg:grid-cols-[1fr_1.35fr]">
        <div className="flex flex-col justify-center px-6 lg:px-12 py-20 lg:py-0 max-w-[560px] lg:ml-auto">
          <p className="text-[11px] font-medium tracking-[0.15em] uppercase text-accent mb-4">
            {settings.heroSubtitle}
          </p>
          <h1 className="font-serif text-3xl lg:text-[2.8rem] font-light leading-tight text-text-default tracking-tight mb-6">
            {settings.heroTitle}
          </h1>
          <p className="text-[15px] text-text-muted tracking-wide mb-12 leading-relaxed">
            {settings.heroDescription}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-text-default text-white text-[14px] font-medium hover:bg-neutral-800 transition-colors"
            >
              도매 상담 요청
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center justify-center px-8 py-4 border border-border text-text-default text-[14px] font-medium hover:border-text-default transition-colors"
            >
              제품 보기
            </Link>
          </div>
        </div>
        <div className="relative min-h-[50vh] lg:min-h-0">
          <Image
            src="/img/hero/hero.png"
            alt={settings.siteName}
            fill
            className="object-cover"
            priority
          />
        </div>
      </section>

      <section className="py-12 px-6 border-b border-border">
        <div className="max-w-content mx-auto flex flex-wrap justify-center gap-6 lg:gap-12">
          {trustBadges.map((badge) => (
            <span
              key={badge}
              className="flex items-center gap-2.5 text-[11px] font-medium tracking-widest uppercase text-text-muted"
            >
              <span className="w-1.5 h-1.5 bg-accent rounded-full" />
              {badge}
            </span>
          ))}
        </div>
      </section>

      <section className="py-24 lg:py-32 px-6">
        <div className="max-w-content mx-auto">
          <div className="text-center mb-16">
            <p className="text-[11px] font-medium tracking-[0.15em] uppercase text-accent mb-4">
              Collection
            </p>
            <h2 className="font-serif text-2xl lg:text-[2rem] font-light text-text-default">
              제품 카테고리
            </h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link key={category.id} href={`/products?category=${category.slug}`} className="group">
                <div className="aspect-square bg-bg-secondary flex items-center justify-center text-5xl lg:text-6xl mb-4 transition-transform duration-300 group-hover:scale-[1.02]">
                  {category.icon || '✨'}
                </div>
                <p className="text-[14px] font-medium text-center text-text-default">
                  {category.name}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32 px-6 bg-white">
        <div className="max-w-content mx-auto">
          <div className="text-center mb-16">
            <p className="text-[11px] font-medium tracking-[0.15em] uppercase text-accent mb-4">
              Best Sellers
            </p>
            <h2 className="font-serif text-2xl lg:text-[2rem] font-light text-text-default">
              대표 라인업
            </h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-12">
            {featuredProducts.map((product) => (
              <Link key={product.id} href={`/products?category=${product.categorySlug}`} className="group">
                <div className="aspect-[4/5] bg-bg-secondary flex items-center justify-center overflow-hidden mb-5 border border-border/60">
                  {product.imageUrl ? (
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    />
                  ) : (
                    <span className="text-5xl lg:text-6xl">{product.categoryIcon || '✨'}</span>
                  )}
                </div>
                <h3 className="text-[15px] font-medium text-text-default mb-1.5">
                  {product.name}
                </h3>
                <p className="text-[13px] text-text-muted">{product.spec}</p>
              </Link>
            ))}
          </div>
          <div className="text-center">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-[14px] font-medium text-text-default hover:text-accent hover:gap-3 transition-all"
            >
              전체 제품 보기
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32 px-6 bg-bg-secondary">
        <div className="max-w-[600px] mx-auto text-center">
          <h2 className="font-serif text-2xl lg:text-[2rem] font-light text-text-default mb-6">
            도매 상담이 필요하신가요?
          </h2>
          <p className="text-[15px] text-text-muted mb-10 leading-relaxed">
            {settings.contactResponseTime} 기준으로 빠르게 응대하며,
            제품 카탈로그와 거래 조건도 함께 안내해 드립니다.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-10 py-4 bg-text-default text-white text-[14px] font-medium hover:bg-neutral-800 transition-colors"
          >
            상담 요청하기
          </Link>
        </div>
      </section>
    </>
  )
}
