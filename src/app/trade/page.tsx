import Link from 'next/link'
import { Package, CreditCard, Truck, RefreshCw, Wrench, FileText } from 'lucide-react'

const tradeTerms = [
  {
    icon: Package,
    title: '최소 주문',
    description: '협의 (소량 주문 가능)',
    details: '첫 거래 시에도 부담 없이 소량 주문이 가능합니다. 수량 및 금액은 상담을 통해 협의해 드립니다.',
  },
  {
    icon: CreditCard,
    title: '결제 방법',
    description: '세금계산서 발행, 현금/카드 결제',
    details: '사업자 거래 시 세금계산서를 발행해 드립니다. 현금, 카드, 계좌이체 모두 가능합니다.',
  },
  {
    icon: Truck,
    title: '배송 안내',
    description: '전국 택배 발송, 방문 수령 가능',
    details: '안전 포장 후 택배로 발송해 드립니다. 종로 매장에서 직접 수령도 가능합니다.',
  },
  {
    icon: RefreshCw,
    title: '교환/반품',
    description: '7일 이내 동일 조건 교환',
    details: '제품 수령 후 7일 이내 동일 조건으로 교환이 가능합니다. 단, 맞춤 제작 제품은 제외됩니다.',
  },
  {
    icon: Wrench,
    title: 'A/S',
    description: '구매 제품 무상 점검, 수리 협의',
    details: '구매하신 제품의 무상 점검 서비스를 제공합니다. 수리가 필요한 경우 합리적인 비용으로 진행해 드립니다.',
  },
  {
    icon: FileText,
    title: '리드타임',
    description: '재고품 당일/익일 출고, 주문제작 7-14일',
    details: '재고 보유 제품은 빠르게 출고됩니다. 주문 제작의 경우 디자인에 따라 7-14일 정도 소요됩니다.',
  },
]

const processSteps = [
  { step: '01', title: '상담 문의', description: '전화 또는 온라인으로 문의해 주세요' },
  { step: '02', title: '제품 상담', description: '원하시는 제품과 수량을 협의합니다' },
  { step: '03', title: '견적 안내', description: '상세 견적서를 보내드립니다' },
  { step: '04', title: '주문 확정', description: '결제 및 주문이 확정됩니다' },
  { step: '05', title: '제품 발송', description: '안전 포장 후 발송해 드립니다' },
]

export default function TradePage() {
  return (
    <>
      {/* Hero Section */}
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
              사업자 고객을 위한 명확하고 투명한 거래 조건을 안내드립니다
            </p>
          </div>
        </div>
      </section>

      {/* Trade Terms Grid */}
      <section className="py-24 lg:py-32 px-6">
        <div className="max-w-content mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tradeTerms.map((term, index) => (
              <div
                key={index}
                className="p-8 bg-white border border-border hover:border-accent/30 transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-bg-secondary flex items-center justify-center mb-6">
                  <term.icon size={22} className="text-accent" />
                </div>
                <h3 className="text-[15px] font-medium text-text-default mb-2">
                  {term.title}
                </h3>
                <p className="text-[14px] text-accent mb-4">
                  {term.description}
                </p>
                <p className="text-[13px] text-text-muted leading-relaxed">
                  {term.details}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Steps */}
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
            {processSteps.map((item, index) => (
              <div key={index} className="text-center">
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

      {/* Summary Table */}
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
              <tr className="border-b border-border">
                <td className="py-5 text-[13px] font-medium text-text-muted w-32">최소 주문</td>
                <td className="py-5 text-[15px] text-text-default">협의 (소량 주문 가능)</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-5 text-[13px] font-medium text-text-muted">리드타임</td>
                <td className="py-5 text-[15px] text-text-default">재고품 당일/익일 출고, 주문제작 7-14일</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-5 text-[13px] font-medium text-text-muted">결제</td>
                <td className="py-5 text-[15px] text-text-default">세금계산서 발행, 현금/카드 결제</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-5 text-[13px] font-medium text-text-muted">배송</td>
                <td className="py-5 text-[15px] text-text-default">전국 택배 발송, 방문 수령 가능</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-5 text-[13px] font-medium text-text-muted">교환/반품</td>
                <td className="py-5 text-[15px] text-text-default">7일 이내 동일 조건 교환</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-5 text-[13px] font-medium text-text-muted">A/S</td>
                <td className="py-5 text-[15px] text-text-default">구매 제품 무상 점검, 수리 협의</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 lg:py-32 px-6 bg-bg-primary">
        <div className="max-w-[600px] mx-auto text-center">
          <h2 className="font-serif text-2xl lg:text-[2rem] font-light text-text-default mb-6">
            거래 상담이 필요하신가요?
          </h2>
          <p className="text-[15px] text-text-muted mb-10 leading-relaxed">
            첫 거래도 부담 없이 문의해 주세요.<br />
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
