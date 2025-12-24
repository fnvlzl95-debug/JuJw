import Link from 'next/link'
import { Shield, Gem, Clock, Award } from 'lucide-react'

const values = [
  {
    title: '신뢰',
    description: '거래처와의 신뢰를 가장 소중히 여깁니다.',
  },
  {
    title: '품질',
    description: 'GIA 인증 다이아몬드와 최상급 원석만을 취급합니다.',
  },
  {
    title: '정직',
    description: '투명한 가격 정책과 정확한 제품 정보를 제공합니다.',
  },
]

const strengths = [
  {
    icon: Shield,
    title: '검증된 품질',
    description: '엄선된 원석과 귀금속만을 취급합니다. 오랜 경험과 노하우로 최상의 서비스를 제공합니다.',
  },
  {
    icon: Gem,
    title: 'GIA 인증',
    description: '모든 다이아몬드는 GIA 인증서를 제공합니다. 품질에 대한 확실한 보증으로 안심하고 거래하실 수 있습니다.',
  },
  {
    icon: Clock,
    title: '빠른 출고',
    description: '재고 보유 제품은 당일 또는 익일 출고가 가능합니다. 급한 주문도 신속하게 처리해 드립니다.',
  },
  {
    icon: Award,
    title: '맞춤 제작',
    description: '고객의 요청에 따른 맞춤 제작이 가능합니다. 디자인 상담부터 제작까지 원스톱으로 진행됩니다.',
  },
]

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-[72px]">
        <div className="min-h-[50vh] flex items-center justify-center bg-bg-secondary px-6">
          <div className="text-center py-20">
            <p className="text-[11px] font-medium tracking-[0.15em] uppercase text-accent mb-4">
              About Us
            </p>
            <h1 className="font-serif text-3xl lg:text-[2.8rem] font-light text-text-default leading-tight mb-6">
              변하지 않는 신뢰,<br />Ju Jewelry
            </h1>
            <p className="text-[15px] text-text-muted max-w-[480px] mx-auto leading-relaxed">
              종로 종묘귀금속에 위치한<br className="hidden sm:block" />
              프리미엄 귀금속 도매 전문점
            </p>
          </div>
        </div>
      </section>

      {/* Brand Story */}
      <section className="py-24 lg:py-32 px-6">
        <div className="max-w-content mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div className="aspect-[4/3] bg-bg-secondary flex items-center justify-center text-8xl">
              🏢
            </div>
            <div>
              <p className="text-[11px] font-medium tracking-[0.15em] uppercase text-accent mb-4">
                Our Story
              </p>
              <h2 className="font-serif text-2xl lg:text-[2rem] font-light text-text-default mb-8">
                종로에서 시작된<br />귀금속 전문점
              </h2>
              <div className="space-y-5 text-[15px] text-text-muted leading-relaxed">
                <p>
                  종로 종묘귀금속에서 시작한 Ju Jewelry는
                  신뢰받는 귀금속 파트너로 자리잡았습니다.
                </p>
                <p>
                  처음부터 변함없이 지켜온 원칙이 있습니다.
                  최상의 품질, 정직한 거래, 그리고 고객과의 신뢰입니다.
                </p>
                <p>
                  풍부한 경험과 네트워크를 바탕으로,
                  전국의 소매업체에 프리미엄 귀금속을 공급하고 있습니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 lg:py-32 px-6 bg-white">
        <div className="max-w-content mx-auto">
          <div className="text-center mb-16">
            <p className="text-[11px] font-medium tracking-[0.15em] uppercase text-accent mb-4">
              Our Values
            </p>
            <h2 className="font-serif text-2xl lg:text-[2rem] font-light text-text-default">
              우리가 지키는 가치
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-12 lg:gap-16">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-bg-secondary flex items-center justify-center">
                  <span className="font-serif text-2xl text-accent">{index + 1}</span>
                </div>
                <h3 className="font-serif text-xl text-text-default mb-4">
                  {value.title}
                </h3>
                <p className="text-[15px] text-text-muted leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Strengths */}
      <section className="py-24 lg:py-32 px-6 bg-bg-primary">
        <div className="max-w-content mx-auto">
          <div className="text-center mb-16">
            <p className="text-[11px] font-medium tracking-[0.15em] uppercase text-accent mb-4">
              Why Choose Us
            </p>
            <h2 className="font-serif text-2xl lg:text-[2rem] font-light text-text-default">
              Ju Jewelry를 선택하는 이유
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {strengths.map((item, index) => (
              <div
                key={index}
                className="flex gap-6 p-8 bg-white border border-border"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-bg-secondary flex items-center justify-center">
                  <item.icon size={22} className="text-accent" />
                </div>
                <div>
                  <h3 className="font-medium text-text-default mb-3">
                    {item.title}
                  </h3>
                  <p className="text-[14px] text-text-muted leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location Preview */}
      <section className="py-24 lg:py-32 px-6 bg-bg-secondary">
        <div className="max-w-content mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-[11px] font-medium tracking-[0.15em] uppercase text-accent mb-4">
                Location
              </p>
              <h2 className="font-serif text-2xl lg:text-[2rem] font-light text-text-default mb-8">
                종로의 중심에서<br />만나보세요
              </h2>
              <div className="space-y-4 mb-8">
                <div className="flex py-3 border-b border-border">
                  <span className="w-20 text-[13px] text-text-muted">주소</span>
                  <span className="text-[15px] text-text-default">서울 종로구 종로 OO길 OO</span>
                </div>
                <div className="flex py-3 border-b border-border">
                  <span className="w-20 text-[13px] text-text-muted">운영시간</span>
                  <span className="text-[15px] text-text-default">평일 09:00 - 18:00</span>
                </div>
                <div className="flex py-3 border-b border-border">
                  <span className="w-20 text-[13px] text-text-muted">전화</span>
                  <span className="text-[15px] text-text-default">02-000-0000</span>
                </div>
              </div>
              <Link
                href="/location"
                className="inline-flex items-center px-8 py-4 border border-border text-text-default text-[14px] font-medium hover:border-text-default transition-colors"
              >
                오시는 길 자세히 보기
              </Link>
            </div>
            <div className="aspect-[4/3] bg-border flex items-center justify-center text-6xl order-first lg:order-last">
              📍
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 lg:py-32 px-6 bg-white">
        <div className="max-w-[600px] mx-auto text-center">
          <h2 className="font-serif text-2xl lg:text-[2rem] font-light text-text-default mb-6">
            함께 성장할 파트너를 찾습니다
          </h2>
          <p className="text-[15px] text-text-muted mb-10 leading-relaxed">
            Ju Jewelry와 함께 신뢰할 수 있는 거래를 시작해 보세요.<br />
            문의 주시면 자세히 안내해 드리겠습니다.
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
