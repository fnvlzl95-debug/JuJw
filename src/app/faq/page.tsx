'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

const faqCategories = [
  { id: 'all', name: '전체' },
  { id: 'order', name: '주문/결제' },
  { id: 'product', name: '제품' },
  { id: 'delivery', name: '배송' },
  { id: 'as', name: 'A/S' },
]

const faqs = [
  {
    id: 1,
    category: 'order',
    question: '최소 주문 수량이 있나요?',
    answer: '최소 주문 수량은 별도로 정해져 있지 않습니다. 소량 주문도 가능하며, 수량 및 금액은 상담을 통해 협의해 드립니다. 첫 거래 시에도 부담 없이 문의해 주세요.',
  },
  {
    id: 2,
    category: 'order',
    question: '세금계산서 발행이 가능한가요?',
    answer: '네, 사업자 거래 시 세금계산서를 발행해 드립니다. 주문 시 사업자등록증 사본을 보내주시면 됩니다.',
  },
  {
    id: 3,
    category: 'order',
    question: '결제는 어떤 방식으로 가능한가요?',
    answer: '현금, 카드, 계좌이체 모두 가능합니다. 대량 주문 시 결제 조건은 협의 가능하며, 자세한 내용은 상담 시 안내드립니다.',
  },
  {
    id: 4,
    category: 'product',
    question: '제품 품질 보증은 어떻게 되나요?',
    answer: '모든 다이아몬드는 GIA 인증서를 제공합니다. 귀금속 함량 및 제품 스펙은 정확하게 표기되며, 품질에 대해 확실히 보증합니다.',
  },
  {
    id: 5,
    category: 'product',
    question: '맞춤 제작이 가능한가요?',
    answer: '네, 고객의 요청에 따른 맞춤 제작이 가능합니다. 원하시는 디자인, 소재, 사이즈 등을 말씀해 주시면 상담 후 제작 진행해 드립니다. 제작 기간은 디자인에 따라 7-14일 정도 소요됩니다.',
  },
  {
    id: 6,
    category: 'product',
    question: '카탈로그를 받아볼 수 있나요?',
    answer: '네, 상담 요청 시 카탈로그 요청을 선택해 주시면 이메일 또는 우편으로 보내드립니다. 더 다양한 제품을 확인하실 수 있습니다.',
  },
  {
    id: 7,
    category: 'delivery',
    question: '배송은 얼마나 걸리나요?',
    answer: '재고 보유 제품은 당일 또는 익일 출고됩니다. 주문 제작 제품은 디자인에 따라 7-14일 정도 소요됩니다. 배송은 안전 포장 후 택배로 발송되며, 종로 매장에서 직접 수령도 가능합니다.',
  },
  {
    id: 8,
    category: 'delivery',
    question: '배송비는 얼마인가요?',
    answer: '배송비는 주문 금액에 따라 달라질 수 있습니다. 자세한 내용은 상담 시 안내드립니다.',
  },
  {
    id: 9,
    category: 'as',
    question: '교환/반품이 가능한가요?',
    answer: '제품 수령 후 7일 이내 동일 조건으로 교환이 가능합니다. 단, 맞춤 제작 제품은 교환/반품이 제한될 수 있습니다. 자세한 내용은 거래 안내 페이지를 참고해 주세요.',
  },
  {
    id: 10,
    category: 'as',
    question: 'A/S는 어떻게 받나요?',
    answer: '구매하신 제품의 무상 점검 서비스를 제공합니다. 수리가 필요한 경우 합리적인 비용으로 진행해 드립니다. 매장 방문 또는 택배로 A/S 접수가 가능합니다.',
  },
]

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [openId, setOpenId] = useState<number | null>(null)

  const filteredFaqs = activeCategory === 'all'
    ? faqs
    : faqs.filter(faq => faq.category === activeCategory)

  return (
    <>
      {/* Hero Section */}
      <section className="pt-[72px]">
        <div className="py-20 lg:py-24 px-6 bg-bg-secondary">
          <div className="max-w-content mx-auto text-center">
            <p className="text-[11px] font-medium tracking-[0.15em] uppercase text-accent mb-4">
              FAQ
            </p>
            <h1 className="font-serif text-3xl lg:text-[2.8rem] font-light text-text-default mb-6">
              자주 묻는 질문
            </h1>
            <p className="text-[15px] text-text-muted max-w-[480px] mx-auto">
              궁금하신 점을 확인해 보세요
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="sticky top-[72px] z-40 bg-bg-primary border-b border-border">
        <div className="max-w-[800px] mx-auto px-6">
          <div className="flex gap-2 py-4 overflow-x-auto scrollbar-hide">
            {faqCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={cn(
                  'px-5 py-2.5 text-[13px] font-medium whitespace-nowrap transition-all',
                  activeCategory === category.id
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

      {/* FAQ List */}
      <section className="py-16 lg:py-24 px-6">
        <div className="max-w-[800px] mx-auto">
          <p className="text-[13px] text-text-muted mb-8">
            {filteredFaqs.length}개의 질문
          </p>

          <div className="space-y-4">
            {filteredFaqs.map((faq) => (
              <div
                key={faq.id}
                className="border border-border bg-white"
              >
                <button
                  onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="text-[15px] font-medium text-text-default pr-4">
                    {faq.question}
                  </span>
                  <ChevronDown
                    size={20}
                    className={cn(
                      'flex-shrink-0 text-text-muted transition-transform',
                      openId === faq.id && 'rotate-180'
                    )}
                  />
                </button>
                <div
                  className={cn(
                    'overflow-hidden transition-all',
                    openId === faq.id ? 'max-h-96' : 'max-h-0'
                  )}
                >
                  <div className="px-6 pb-6 pt-0">
                    <p className="text-[14px] text-text-muted leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 lg:py-32 px-6 bg-bg-secondary">
        <div className="max-w-[600px] mx-auto text-center">
          <h2 className="font-serif text-2xl lg:text-[2rem] font-light text-text-default mb-6">
            원하는 답변을 찾지 못하셨나요?
          </h2>
          <p className="text-[15px] text-text-muted mb-10 leading-relaxed">
            추가로 궁금하신 점이 있으시면 언제든 문의해 주세요.<br />
            친절하게 안내해 드리겠습니다.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-10 py-4 bg-text-default text-white text-[14px] font-medium hover:bg-neutral-800 transition-colors"
          >
            문의하기
          </Link>
        </div>
      </section>
    </>
  )
}
