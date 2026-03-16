import FaqList from '@/components/faq/FaqList'
import { buildPageMetadata } from '@/lib/metadata'

export const metadata = buildPageMetadata({
  title: 'FAQ',
  description: '주문, 결제, 배송, A/S 등 자주 묻는 질문을 정리했습니다.',
  path: '/faq',
})

export default function FAQPage() {
  return (
    <>
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
              거래 전에 많이 문의하시는 내용을 먼저 확인해 보세요.
            </p>
          </div>
        </div>
      </section>

      <FaqList />
    </>
  )
}
