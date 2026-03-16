import Link from 'next/link'
import {
  CreditCard,
  FileText,
  Package,
  RefreshCw,
  Truck,
  Wrench,
} from 'lucide-react'
import { processSteps, tradeTerms } from '@/content/static'
import { buildPageMetadata } from '@/lib/metadata'

export const metadata = buildPageMetadata({
  title: '거래 안내',
  description: '주문, 결제, 배송, 교환, A/S 등 Ju Jewelry의 기본 거래 기준을 확인할 수 있습니다.',
  path: '/trade',
})

const iconMap = {
  package: Package,
  'credit-card': CreditCard,
  truck: Truck,
  'refresh-cw': RefreshCw,
  wrench: Wrench,
  'file-text': FileText,
}

export default function TradePage() {
  return (
    <>
      <section className="pt-[72px]">
        <div className="py-20 lg:py-24 px-6 bg-bg-secondary">
          <div className="max-w-content mx-auto text-center">
            <p className="text-[11px] font-medium tracking-[0.15em] uppercase text-accent mb-4">
              Trade Information
            </p>
            <h1 className="font-serif text-3xl lg:text-[2.8rem] font-light text-text-default mb-6">
              거래 안내
            </h1>
            <p className="text-[15px] text-text-muted max-w-[480px] mx-auto">
              사업자 고객을 위한 기본 거래 조건과 진행 흐름을 안내드립니다.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32 px-6">
        <div className="max-w-content mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tradeTerms.map((term) => {
              const Icon = iconMap[term.icon as keyof typeof iconMap]
              return (
                <div
                  key={term.title}
                  className="p-8 bg-white border border-border hover:border-accent/30 transition-colors"
                >
                  <div className="w-12 h-12 rounded-full bg-bg-secondary flex items-center justify-center mb-6">
                    <Icon size={22} className="text-accent" />
                  </div>
                  <h3 className="text-[15px] font-medium text-text-default mb-2">
                    {term.title}
                  </h3>
                  <p className="text-[14px] text-accent mb-4">{term.description}</p>
                  <p className="text-[13px] text-text-muted leading-relaxed">
                    {term.details}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32 px-6 bg-bg-secondary">
        <div className="max-w-content mx-auto">
          <div className="text-center mb-16">
            <p className="text-[11px] font-medium tracking-[0.15em] uppercase text-accent mb-4">
              Process
            </p>
            <h2 className="font-serif text-2xl lg:text-[2rem] font-light text-text-default">
              거래 프로세스
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 lg:gap-4">
            {processSteps.map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white border border-border flex items-center justify-center">
                  <span className="font-serif text-lg text-accent">{item.step}</span>
                </div>
                <h3 className="text-[14px] font-medium text-text-default mb-2">
                  {item.title}
                </h3>
                <p className="text-[12px] text-text-muted leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32 px-6 bg-white">
        <div className="max-w-[800px] mx-auto">
          <div className="text-center mb-12">
            <p className="text-[11px] font-medium tracking-[0.15em] uppercase text-accent mb-4">
              Summary
            </p>
            <h2 className="font-serif text-2xl lg:text-[2rem] font-light text-text-default">
              거래 조건 요약
            </h2>
          </div>
          <table className="w-full">
            <tbody>
              {tradeTerms.map((term) => (
                <tr key={term.title} className="border-b border-border">
                  <td className="py-5 text-[13px] font-medium text-text-muted w-32">
                    {term.title}
                  </td>
                  <td className="py-5 text-[15px] text-text-default">{term.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="py-24 lg:py-32 px-6 bg-bg-primary">
        <div className="max-w-[600px] mx-auto text-center">
          <h2 className="font-serif text-2xl lg:text-[2rem] font-light text-text-default mb-6">
            거래 상담이 필요하신가요?
          </h2>
          <p className="text-[15px] text-text-muted mb-10 leading-relaxed">
            첫 거래도 부담 없이 문의해 주세요. 제품군과 거래 조건에 맞춰
            친절하게 안내해 드리겠습니다.
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
