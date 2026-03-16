'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { faqCategories, faqs } from '@/content/static'
import { cn } from '@/lib/utils'

export default function FaqList() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [openId, setOpenId] = useState<number | null>(null)

  const filteredFaqs =
    activeCategory === 'all'
      ? faqs
      : faqs.filter((faq) => faq.category === activeCategory)

  return (
    <>
      <section className="sticky top-[72px] z-40 bg-bg-primary border-b border-border">
        <div className="max-w-[800px] mx-auto px-6">
          <div className="flex gap-2 py-4 overflow-x-auto scrollbar-hide">
            {faqCategories.map((category) => (
              <button
                key={category.id}
                type="button"
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

      <section className="py-16 lg:py-24 px-6">
        <div className="max-w-[800px] mx-auto">
          <p className="text-[13px] text-text-muted mb-8">
            {filteredFaqs.length}개의 질문
          </p>

          <div className="space-y-4">
            {filteredFaqs.map((faq) => (
              <div key={faq.id} className="border border-border bg-white">
                <button
                  type="button"
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

      <section className="py-24 lg:py-32 px-6 bg-bg-secondary">
        <div className="max-w-[600px] mx-auto text-center">
          <h2 className="font-serif text-2xl lg:text-[2rem] font-light text-text-default mb-6">
            원하는 답변을 찾지 못하셨나요?
          </h2>
          <p className="text-[15px] text-text-muted mb-10 leading-relaxed">
            추가로 궁금하신 점이 있으면 문의 폼으로 남겨 주세요.
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
