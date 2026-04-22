import type { Metadata } from 'next'
import Link from 'next/link'
import { getPublicSettings } from '@/lib/db'
import { normalizeSiteSettings } from '@/lib/site-settings'

export const metadata: Metadata = {
  title: '브랜드 소개',
  description: 'JU JEWELRY의 브랜드 철학과 종로 기반 주얼리 도매 운영 방식을 소개합니다.',
}

const values = [
  {
    title: 'Quality',
    description: '엄선된 원석과 귀금속만을 선별해 안정적인 품질 기준을 지킵니다.',
  },
  {
    title: 'Craftsmanship',
    description: '종로 기반의 장인 네트워크와 세심한 제작 공정으로 완성도를 높입니다.',
  },
  {
    title: 'Trust',
    description: '거래 조건과 제작 가능 범위를 명확하게 안내하고, 장기 거래가 가능한 운영 방식을 지향합니다.',
  },
]

export default async function AboutPage() {
  const settings = normalizeSiteSettings(await getPublicSettings())

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-stone-50 px-4 pb-12 pt-24 sm:px-6 sm:pb-16 sm:pt-28 md:px-8 md:pb-20 md:pt-32">
        <div className="mx-auto max-w-7xl text-center">
          <p
            className="mb-4 text-[9px] font-light uppercase tracking-[0.25em] text-amber-600/70 sm:mb-6 sm:text-[10px] sm:tracking-[0.3em]"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            About Us
          </p>
          <h1
            className="mb-6 text-4xl font-light italic tracking-tight text-stone-900 sm:text-5xl md:text-6xl lg:text-7xl"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            {settings.shopName}
          </h1>
          <div className="mx-auto mb-8 mt-6 h-[1px] w-12 bg-amber-500/30 sm:mt-8 sm:w-16" />
          <p className="mx-auto max-w-2xl px-4 text-xs font-light leading-relaxed text-stone-600 sm:text-sm md:text-base">
            종로에서 시작된 주얼리 파트너십과 안정적인 B2B 거래 경험을 소개합니다.
          </p>
        </div>
      </section>

      <section className="bg-white px-4 py-12 sm:px-6 sm:py-16 md:px-8 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div className="aspect-[4/3] overflow-hidden bg-stone-100">
            <img src="/img/hero/hero.png" alt="JU JEWELRY" className="h-full w-full object-cover" />
          </div>
          <div>
            <p
              className="mb-4 text-[10px] font-light uppercase tracking-[0.2em] text-amber-600/70"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Our Story
            </p>
            <h2
              className="mb-6 text-3xl font-light italic tracking-tight text-stone-900 sm:text-4xl md:text-5xl"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              종로에서 시작된 신뢰의 파트너
            </h2>
            <div className="mb-8 h-[1px] w-12 bg-amber-500/30" />
            <div className="space-y-5 text-sm font-light leading-relaxed text-stone-600 md:text-base">
              <p>
                {settings.shopName}는 {settings.address}를 기반으로 운영되는 주얼리 도매 브랜드입니다.
              </p>
              <p>
                소매 매장, 예물 전문점, 맞춤 제작 상담 고객을 대상으로 안정적인 품질과 빠른 응대, 명확한 거래 조건을 제공하는 것을 운영 원칙으로 삼고 있습니다.
              </p>
              <p>
                상담부터 출고, 사후 관리까지 한 흐름으로 이어지는 운영 체계를 지향하며, 장기 거래가 가능한 파트너십에 집중합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-stone-50 px-4 py-12 sm:px-6 sm:py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <p
              className="mb-4 text-[10px] font-light uppercase tracking-[0.2em] text-amber-600/70"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Our Values
            </p>
            <h2
              className="text-3xl font-light italic tracking-tight text-stone-900 sm:text-4xl md:text-5xl"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              우리가 지키는 기준
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-3 sm:gap-8">
            {values.map((value) => (
              <article key={value.title} className="border border-stone-200 bg-white p-8 text-center">
                <h3
                  className="mb-4 text-2xl font-light italic tracking-tight text-stone-900"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  {value.title}
                </h3>
                <p className="text-sm font-light leading-relaxed text-stone-600">{value.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-5xl rounded-lg border border-stone-200 bg-stone-50 p-8 md:p-10">
          <div className="grid gap-5 md:grid-cols-3">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-stone-500">주소</p>
              <p className="mt-2 text-sm text-stone-900">{settings.address}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-stone-500">연락처</p>
              <p className="mt-2 text-sm text-stone-900">{settings.phonePrimary}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-stone-500">운영시간</p>
              <p className="mt-2 text-sm text-stone-900">{settings.businessHours}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-stone-50 px-6 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h2
            className="mb-8 text-3xl font-light italic tracking-tight text-stone-900 md:text-5xl"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            함께 거래를 시작해 보세요
          </h2>
          <p className="mx-auto mb-12 max-w-xl text-sm font-light leading-relaxed text-stone-600 md:text-base">
            브랜드 소개만으로 부족하다면 실제 제품과 거래 조건을 상담을 통해 바로 안내해 드립니다.
          </p>
          <Link
            href="/contact"
            className="inline-flex min-h-[52px] items-center justify-center rounded-md bg-stone-900 px-12 py-4 text-[11px] font-medium uppercase tracking-[0.2em] text-white transition-all duration-300 hover:bg-amber-600"
          >
            상담 요청
          </Link>
        </div>
      </section>
    </div>
  )
}
