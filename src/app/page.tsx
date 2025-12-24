import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

const categories = [
  { name: '반지', icon: '💍', href: '/products?category=rings' },
  { name: '목걸이', icon: '📿', href: '/products?category=necklaces' },
  { name: '귀걸이', icon: '💎', href: '/products?category=earrings' },
  { name: '팔찌', icon: '⌚', href: '/products?category=bracelets' },
]

const products = [
  { name: '18K 솔리테어 다이아 반지', spec: '0.3ct / 18K White Gold', icon: '💍' },
  { name: '14K 테니스 목걸이', spec: '2.0ct Total / 14K Gold', icon: '📿' },
  { name: '18K 드롭 귀걸이', spec: '0.5ct / 18K Rose Gold', icon: '💎' },
  { name: '18K 테니스 팔찌', spec: '3.0ct Total / 18K Gold', icon: '⌚' },
  { name: '플래티넘 웨딩밴드', spec: 'Pt950 / 3mm', icon: '💍' },
  { name: '18K 펄 펜던트', spec: 'South Sea Pearl / 18K', icon: '📿' },
]

const trustBadges = [
  '사업자 거래 전문',
  '세금계산서 발행',
  '당일/익일 출고',
  'GIA 인증 다이아',
]

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="min-h-screen pt-[72px] grid lg:grid-cols-[1fr_1.4fr]">
        <div className="flex flex-col justify-center px-6 lg:px-12 py-20 lg:py-0 max-w-[560px] lg:ml-auto">
          <h1 className="font-serif text-3xl lg:text-[2.8rem] font-light leading-tight text-text-default tracking-tight mb-5">
            믿을 수 있는<br />귀금속 파트너
          </h1>
          <p className="text-[15px] text-text-muted tracking-wide mb-12">
            프리미엄 귀금속 도매
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
            alt="Ju Jewelry"
            fill
            className="object-cover"
            priority
          />
        </div>
      </section>

      {/* Trust Badges */}
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

      {/* Categories */}
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
              <Link
                key={category.name}
                href={category.href}
                className="group"
              >
                <div className="aspect-square bg-bg-secondary flex items-center justify-center text-5xl lg:text-6xl mb-4 transition-transform duration-300 group-hover:scale-[1.02]">
                  {category.icon}
                </div>
                <p className="text-[14px] font-medium text-center text-text-default">
                  {category.name}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
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
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
            {products.map((product, index) => (
              <Link
                key={index}
                href="/products"
                className="group"
              >
                <div className="aspect-[4/5] bg-bg-secondary flex items-center justify-center text-5xl lg:text-6xl mb-5">
                  {product.icon}
                </div>
                <h3 className="text-[15px] font-medium text-text-default mb-1.5">
                  {product.name}
                </h3>
                <p className="text-[13px] text-text-muted">
                  {product.spec}
                </p>
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

      {/* CTA Section */}
      <section className="py-24 lg:py-32 px-6 bg-bg-secondary">
        <div className="max-w-[600px] mx-auto text-center">
          <h2 className="font-serif text-2xl lg:text-[2rem] font-light text-text-default mb-6">
            도매 상담이 필요하신가요?
          </h2>
          <p className="text-[15px] text-text-muted mb-10 leading-relaxed">
            사업자 고객을 위한 맞춤 서비스를 제공합니다.<br />
            문의 주시면 빠르게 안내해 드리겠습니다.
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
