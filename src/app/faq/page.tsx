'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { ChevronDown, MoveRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import JsonLd from '@/components/seo/JsonLd'

const faqCategories = [
  { id: 'all', name: '전체', description: '주문부터 A/S까지 전체 질문을 빠르게 확인할 수 있습니다.' },
  { id: 'order', name: '주문/결제', description: '거래 방식과 결제 조건, 세금계산서 발행 안내입니다.' },
  { id: 'product', name: '제품', description: '품질 보증과 맞춤 제작, 카탈로그 관련 내용입니다.' },
  { id: 'delivery', name: '배송', description: '출고 일정과 수령 방식, 배송 기준을 확인할 수 있습니다.' },
  { id: 'as', name: 'A/S', description: '교환과 반품, 사후 점검 절차를 정리했습니다.' },
] as const

const faqs = [
  {
    id: 1,
    category: 'order',
    question: '최소 주문 수량이 있나요?',
    answer:
      '최소 주문 수량은 별도로 정해져 있지 않습니다. 소량 주문도 가능하며, 수량 및 금액은 상담을 통해 협의해 드립니다. 첫 거래 시에도 부담 없이 문의해 주세요.',
  },
  {
    id: 2,
    category: 'order',
    question: '세금계산서 발행이 가능한가요?',
    answer:
      '네, 사업자 거래 시 세금계산서를 발행해 드립니다. 주문 시 사업자등록증 사본을 보내주시면 됩니다.',
  },
  {
    id: 3,
    category: 'order',
    question: '결제는 어떤 방식으로 가능한가요?',
    answer:
      '현금, 카드, 계좌이체 모두 가능합니다. 대량 주문 시 결제 조건은 협의 가능하며, 자세한 내용은 상담 시 안내드립니다.',
  },
  {
    id: 4,
    category: 'product',
    question: '제품 품질 보증은 어떻게 되나요?',
    answer:
      '모든 다이아몬드는 GIA 인증서를 제공합니다. 귀금속 함량 및 제품 스펙은 정확하게 표기되며, 품질에 대해 확실히 보증합니다.',
  },
  {
    id: 5,
    category: 'product',
    question: '맞춤 제작이 가능한가요?',
    answer:
      '네, 고객의 요청에 따른 맞춤 제작이 가능합니다. 원하시는 디자인, 소재, 사이즈 등을 말씀해 주시면 상담 후 제작 진행해 드립니다. 제작 기간은 디자인에 따라 7-14일 정도 소요됩니다.',
  },
  {
    id: 6,
    category: 'product',
    question: '카탈로그를 받아볼 수 있나요?',
    answer:
      '네, 상담 요청 시 카탈로그 요청을 선택해 주시면 이메일 또는 우편으로 보내드립니다. 더 다양한 제품을 확인하실 수 있습니다.',
  },
  {
    id: 7,
    category: 'delivery',
    question: '배송은 얼마나 걸리나요?',
    answer:
      '재고 보유 제품은 당일 또는 익일 출고됩니다. 주문 제작 제품은 디자인에 따라 7-14일 정도 소요됩니다. 배송은 안전 포장 후 택배로 발송되며, 종로 매장에서 직접 수령도 가능합니다.',
  },
  {
    id: 8,
    category: 'delivery',
    question: '배송비는 얼마인가요?',
    answer:
      '배송비는 주문 금액에 따라 달라질 수 있습니다. 자세한 내용은 상담 시 안내드립니다.',
  },
  {
    id: 9,
    category: 'as',
    question: '교환/반품이 가능한가요?',
    answer:
      '제품 수령 후 7일 이내 동일 조건으로 교환이 가능합니다. 단, 맞춤 제작 제품은 교환/반품이 제한될 수 있습니다. 자세한 내용은 거래 안내 페이지를 참고해 주세요.',
  },
  {
    id: 10,
    category: 'as',
    question: 'A/S는 어떻게 받나요?',
    answer:
      '구매하신 제품의 무상 점검 서비스를 제공합니다. 수리가 필요한 경우 합리적인 비용으로 진행해 드립니다. 매장 방문 또는 택배로 A/S 접수가 가능합니다.',
  },
] as const

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState<(typeof faqCategories)[number]['id']>('all')
  const [openId, setOpenId] = useState<number | null>(faqs[0]?.id ?? null)

  const filteredFaqs = useMemo(
    () => (activeCategory === 'all' ? faqs : faqs.filter((faq) => faq.category === activeCategory)),
    [activeCategory]
  )

  const activeCategoryMeta =
    faqCategories.find((category) => category.id === activeCategory) ?? faqCategories[0]

  useEffect(() => {
    if (!filteredFaqs.some((faq) => faq.id === openId)) {
      setOpenId(filteredFaqs[0]?.id ?? null)
    }
  }, [filteredFaqs, openId])

  return (
    <>
      <JsonLd
        id="faq-jsonld"
        data={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: faq.answer,
            },
          })),
        }}
      />

      <section className="public-hero bg-stone-50 px-4 sm:px-6 md:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <p
            className="mb-4 text-[10px] uppercase tracking-[0.25em] text-[#b38b5d] sm:mb-5"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            FAQ
          </p>
          <h1 className="text-balance text-[2.35rem] font-medium leading-[1.2] tracking-[-0.03em] text-[#2f241d] sm:text-[3rem]">
            자주 묻는 질문
          </h1>
          <div className="mx-auto mt-6 h-px w-12 bg-[#d8c3aa]" />
          <p className="mx-auto mt-6 max-w-[620px] text-[15px] leading-7 text-[#6d5f54] sm:text-[16px]">
            주문, 제품, 배송, A/S 내용을 간단히 정리했습니다. 필요한 항목을 선택하면 관련 질문만 바로 확인할 수 있습니다.
          </p>
        </div>
      </section>

      <section className="bg-white px-4 py-12 sm:px-6 sm:py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-[920px]">
          <div className="border-b border-[#e5d8ca] pb-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p
                  className="text-[12px] uppercase tracking-[0.2em] text-[#b38b5d]"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  {activeCategoryMeta.name}
                </p>
                <h2 className="mt-3 text-[1.65rem] leading-[1.35] text-[#32261f] sm:text-[1.8rem]">
                  {activeCategoryMeta.description}
                </h2>
              </div>
              <p className="text-[13px] text-[#87796d]">{filteredFaqs.length}개의 질문</p>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {faqCategories.map((category) => {
                const isActive = activeCategory === category.id

                return (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={cn(
                      'rounded-full border px-4 py-2 text-[14px] transition-colors',
                      isActive
                        ? 'border-[#8d6a49] bg-[#8d6a49] text-white'
                        : 'border-[#ddd0c1] text-[#6f6155] hover:border-[#bda182] hover:text-[#4a3b31]'
                    )}
                  >
                    {category.name}
                  </button>
                )
              })}
            </div>
          </div>

          <div className="mt-3">
            {filteredFaqs.map((faq, index) => {
              const categoryName =
                faqCategories.find((category) => category.id === faq.category)?.name ?? '질문'
              const isOpen = openId === faq.id

              return (
                <article key={faq.id} className="border-b border-[#ece2d6]">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${faq.id}`}
                    onClick={() => setOpenId(isOpen ? null : faq.id)}
                    className="flex w-full items-start gap-4 py-6 text-left sm:gap-5 sm:py-7"
                  >
                    <span
                      className="mt-1 min-w-[44px] text-[11px] uppercase tracking-[0.16em] text-[#b38b5d]"
                      style={{ fontFamily: "'Cormorant Garamond', serif" }}
                    >
                      Q{String(index + 1).padStart(2, '0')}
                    </span>
                    <div className="min-w-0 flex-1">
                      {activeCategory === 'all' && (
                        <span className="inline-flex text-[11px] uppercase tracking-[0.16em] text-[#8f7e6e]">
                          {categoryName}
                        </span>
                      )}
                      <h3
                        className={cn(
                          'text-[17px] leading-7 text-[#2f241d] sm:text-[20px]',
                          activeCategory === 'all' && 'mt-3'
                        )}
                      >
                        {faq.question}
                      </h3>
                    </div>
                    <ChevronDown
                      size={18}
                      className={cn(
                        'mt-1 flex-shrink-0 text-[#8f7e6e] transition-transform duration-300',
                        isOpen && 'rotate-180'
                      )}
                    />
                  </button>

                  <div
                    className={cn(
                      'grid transition-[grid-template-rows,opacity] duration-300 ease-out',
                      isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    )}
                  >
                    <div className="overflow-hidden">
                      <div
                        id={`faq-answer-${faq.id}`}
                        className="pb-6 pl-0 pr-2 text-[15px] leading-7 text-[#66584c] sm:pl-[4rem] sm:pr-8"
                      >
                        <p className="max-w-[720px]">{faq.answer}</p>
                      </div>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>

          <div className="mt-10 flex flex-col gap-5 border border-[#e5d8ca] bg-[#f8f3ed] px-6 py-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-[18px] text-[#31251f]">원하는 답이 없다면 문의해 주세요.</h3>
              <p className="mt-2 text-[14px] leading-7 text-[#6d5f54]">
                제품 비교, 거래 조건, 방문 상담처럼 상황에 맞는 내용을 바로 안내해 드립니다.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-[14px] font-medium text-[#4a382d] transition-colors hover:text-[#2f241d]"
            >
              문의하기
              <MoveRight size={15} strokeWidth={1.8} />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
