'use client'

import { useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

const categories = [
  { id: 'all', name: '전체', icon: '✨' },
  { id: 'rings', name: '반지', icon: '💍' },
  { id: 'necklaces', name: '목걸이', icon: '📿' },
  { id: 'earrings', name: '귀걸이', icon: '💎' },
  { id: 'bracelets', name: '팔찌', icon: '⌚' },
]

const products = [
  // 반지
  { id: 1, name: '18K 솔리테어 다이아 반지', spec: '0.3ct / 18K White Gold', category: 'rings', icon: '💍' },
  { id: 2, name: '플래티넘 웨딩밴드', spec: 'Pt950 / 3mm', category: 'rings', icon: '💍' },
  { id: 3, name: '18K 에터니티 링', spec: '1.0ct Total / 18K Gold', category: 'rings', icon: '💍' },
  { id: 4, name: '14K 시그니처 반지', spec: '0.5ct / 14K Rose Gold', category: 'rings', icon: '💍' },
  // 목걸이
  { id: 5, name: '14K 테니스 목걸이', spec: '2.0ct Total / 14K Gold', category: 'necklaces', icon: '📿' },
  { id: 6, name: '18K 펄 펜던트', spec: 'South Sea Pearl / 18K', category: 'necklaces', icon: '📿' },
  { id: 7, name: '18K 다이아 펜던트', spec: '0.3ct / 18K White Gold', category: 'necklaces', icon: '📿' },
  { id: 8, name: '14K 레이어드 체인', spec: '14K Gold / 42cm', category: 'necklaces', icon: '📿' },
  // 귀걸이
  { id: 9, name: '18K 드롭 귀걸이', spec: '0.5ct / 18K Rose Gold', category: 'earrings', icon: '💎' },
  { id: 10, name: '14K 후프 귀걸이', spec: '14K Gold / 20mm', category: 'earrings', icon: '💎' },
  { id: 11, name: '18K 스터드 귀걸이', spec: '0.2ct / 18K White Gold', category: 'earrings', icon: '💎' },
  { id: 12, name: '플래티넘 다이아 귀걸이', spec: '0.4ct / Pt950', category: 'earrings', icon: '💎' },
  // 팔찌
  { id: 13, name: '18K 테니스 팔찌', spec: '3.0ct Total / 18K Gold', category: 'bracelets', icon: '⌚' },
  { id: 14, name: '14K 체인 팔찌', spec: '14K Gold / 18cm', category: 'bracelets', icon: '⌚' },
  { id: 15, name: '18K 뱅글', spec: '18K Rose Gold', category: 'bracelets', icon: '⌚' },
  { id: 16, name: '플래티넘 다이아 팔찌', spec: '1.5ct / Pt950', category: 'bracelets', icon: '⌚' },
]

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState('all')

  const filteredProducts = activeCategory === 'all'
    ? products
    : products.filter(product => product.category === activeCategory)

  return (
    <>
      {/* Hero Section */}
      <section className="pt-[72px]">
        <div className="py-20 lg:py-24 px-6 bg-bg-secondary">
          <div className="max-w-content mx-auto text-center">
            <p className="text-[11px] font-medium tracking-[0.15em] uppercase text-accent mb-4">
              Collection
            </p>
            <h1 className="font-serif text-3xl lg:text-[2.8rem] font-light text-text-default mb-6">
              제품 라인업
            </h1>
            <p className="text-[15px] text-text-muted max-w-[480px] mx-auto">
              엄선된 원석과 최상의 공정으로 제작된<br className="hidden sm:block" />
              프리미엄 귀금속 컬렉션
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="sticky top-[72px] z-40 bg-bg-primary border-b border-border">
        <div className="max-w-content mx-auto px-6">
          <div className="flex gap-2 py-4 overflow-x-auto scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={cn(
                  'flex items-center gap-2 px-5 py-2.5 text-[13px] font-medium whitespace-nowrap transition-all',
                  activeCategory === category.id
                    ? 'bg-text-default text-white'
                    : 'bg-bg-secondary text-text-muted hover:text-text-default'
                )}
              >
                <span>{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 lg:py-24 px-6">
        <div className="max-w-content mx-auto">
          {/* Results count */}
          <p className="text-[13px] text-text-muted mb-8">
            {filteredProducts.length}개의 제품
          </p>

          {/* Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {filteredProducts.map((product) => (
              <div key={product.id} className="group cursor-pointer">
                <div className="aspect-square bg-bg-secondary flex items-center justify-center text-5xl lg:text-6xl mb-4 transition-transform duration-300 group-hover:scale-[1.02]">
                  {product.icon}
                </div>
                <h3 className="text-[14px] lg:text-[15px] font-medium text-text-default mb-1.5 group-hover:text-accent transition-colors">
                  {product.name}
                </h3>
                <p className="text-[12px] lg:text-[13px] text-text-muted">
                  {product.spec}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Notice */}
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
              <span className="text-accent">•</span>
              표시된 제품은 대표 라인업이며, 실제 재고 및 가격은 문의 부탁드립니다.
            </p>
            <p className="flex gap-3">
              <span className="text-accent">•</span>
              고객 요청에 따른 맞춤 제작이 가능합니다.
            </p>
            <p className="flex gap-3">
              <span className="text-accent">•</span>
              카탈로그 요청 시 더 많은 제품을 확인하실 수 있습니다.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 lg:py-32 px-6 bg-white">
        <div className="max-w-[600px] mx-auto text-center">
          <h2 className="font-serif text-2xl lg:text-[2rem] font-light text-text-default mb-6">
            관심있는 제품이 있으신가요?
          </h2>
          <p className="text-[15px] text-text-muted mb-10 leading-relaxed">
            재고 확인 및 가격 문의는 상담을 통해 안내받으실 수 있습니다.<br />
            카탈로그 요청도 가능합니다.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-10 py-4 bg-text-default text-white text-[14px] font-medium hover:bg-neutral-800 transition-colors"
            >
              상담 요청하기
            </Link>
            <Link
              href="/contact"
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
