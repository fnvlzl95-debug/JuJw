import Link from 'next/link'
import { Award, Clock, Gem, Shield } from 'lucide-react'
import { aboutStrengths, aboutValues } from '@/content/static'
import { buildPageMetadata } from '@/lib/metadata'
import { getSiteSettings } from '@/lib/site-data'

export const metadata = buildPageMetadata({
  title: '브랜드 소개',
  description: 'Ju Jewelry의 거래 철학과 운영 방식, 브랜드 강점을 소개합니다.',
  path: '/about',
})

const iconMap = {
  shield: Shield,
  gem: Gem,
  clock: Clock,
  award: Award,
}

export default async function AboutPage() {
  const settings = await getSiteSettings()

  return (
    <>
      <section className="pt-[72px]">
        <div className="min-h-[50vh] flex items-center justify-center bg-bg-secondary px-6">
          <div className="text-center py-20">
            <p className="text-[11px] font-medium tracking-[0.15em] uppercase text-accent mb-4">
              About Us
            </p>
            <h1 className="font-serif text-3xl lg:text-[2.8rem] font-light text-text-default leading-tight mb-6">
              변하지 않는 신뢰,
              <br />
              {settings.siteName}
            </h1>
            <p className="text-[15px] text-text-muted max-w-[520px] mx-auto leading-relaxed">
              {settings.intro}
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32 px-6">
        <div className="max-w-content mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div className="aspect-[4/3] bg-bg-secondary flex items-center justify-center text-8xl">
              💼
            </div>
            <div>
              <p className="text-[11px] font-medium tracking-[0.15em] uppercase text-accent mb-4">
                Our Story
              </p>
              <h2 className="font-serif text-2xl lg:text-[2rem] font-light text-text-default mb-8">
                종로권에서 시작된
                <br />
                귀금속 도매 파트너
              </h2>
              <div className="space-y-5 text-[15px] text-text-muted leading-relaxed">
                <p>
                  {settings.siteName}는 사업자 고객을 위한 주얼리 도매 상담과 대표
                  라인업 제안을 중심으로 운영됩니다.
                </p>
                <p>
                  매장 상황에 맞는 구색과 납기, 재고 가능 범위를 명확하게 안내하는
                  것을 기본 원칙으로 삼고 있습니다.
                </p>
                <p>
                  반복 거래가 가능한 안정적인 커뮤니케이션과 빠른 응대를 통해
                  신뢰할 수 있는 파트너가 되는 것을 목표로 합니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

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
            {aboutValues.map((value, index) => (
              <div key={value.title} className="text-center">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-bg-secondary flex items-center justify-center">
                  <span className="font-serif text-2xl text-accent">{index + 1}</span>
                </div>
                <h3 className="font-serif text-xl text-text-default mb-4">{value.title}</h3>
                <p className="text-[15px] text-text-muted leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32 px-6 bg-bg-primary">
        <div className="max-w-content mx-auto">
          <div className="text-center mb-16">
            <p className="text-[11px] font-medium tracking-[0.15em] uppercase text-accent mb-4">
              Why Choose Us
            </p>
            <h2 className="font-serif text-2xl lg:text-[2rem] font-light text-text-default">
              {settings.siteName}를 선택하는 이유
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {aboutStrengths.map((item) => {
              const Icon = iconMap[item.icon as keyof typeof iconMap]
              return (
                <div key={item.title} className="flex gap-6 p-8 bg-white border border-border">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-bg-secondary flex items-center justify-center">
                    <Icon size={22} className="text-accent" />
                  </div>
                  <div>
                    <h3 className="font-medium text-text-default mb-3">{item.title}</h3>
                    <p className="text-[14px] text-text-muted leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32 px-6 bg-bg-secondary">
        <div className="max-w-content mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-[11px] font-medium tracking-[0.15em] uppercase text-accent mb-4">
                Location
              </p>
              <h2 className="font-serif text-2xl lg:text-[2rem] font-light text-text-default mb-8">
                종로의 중심에서
                <br />
                상담을 이어갑니다
              </h2>
              <div className="space-y-4 mb-8">
                <div className="flex py-3 border-b border-border">
                  <span className="w-24 text-[13px] text-text-muted">주소</span>
                  <span className="text-[15px] text-text-default">
                    {settings.addressLine1}
                  </span>
                </div>
                <div className="flex py-3 border-b border-border">
                  <span className="w-24 text-[13px] text-text-muted">운영시간</span>
                  <span className="text-[15px] text-text-default">
                    {settings.hoursWeekday}
                  </span>
                </div>
                <div className="flex py-3 border-b border-border">
                  <span className="w-24 text-[13px] text-text-muted">연락처</span>
                  <span className="text-[15px] text-text-default">{settings.phone}</span>
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

      <section className="py-24 lg:py-32 px-6 bg-white">
        <div className="max-w-[600px] mx-auto text-center">
          <h2 className="font-serif text-2xl lg:text-[2rem] font-light text-text-default mb-6">
            함께 성장할 파트너를 찾습니다
          </h2>
          <p className="text-[15px] text-text-muted mb-10 leading-relaxed">
            브랜드 소개를 확인하셨다면, 실제 거래 조건과 관심 품목을 상담으로
            이어가실 수 있습니다.
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
