import type { Metadata } from 'next'
import Link from 'next/link'
import { getPublicSettings } from '@/lib/db'
import { normalizeSiteSettings } from '@/lib/site-settings'

export const metadata: Metadata = {
  title: '오시는 길',
  description: 'JU JEWELRY 매장 위치, 운영시간, 연락처, 방문 안내를 확인해 보세요.',
}

const directions = [
  {
    method: '지하철',
    details: ['종로3가역 인근 도보 이동 가능', '방문 전 예약 시 자세한 길 안내 제공'],
  },
  {
    method: '버스',
    details: ['종로 일대 정류장에서 하차 후 도보 이동', '상담 예약 시 가장 가까운 정류장을 안내'],
  },
  {
    method: '자가용',
    details: ['인근 공영주차장 이용 권장', '방문 예약 시 주차 가능 위치를 안내'],
  },
]

export default async function LocationPage() {
  const settings = normalizeSiteSettings(await getPublicSettings())
  const mapUrl = settings.naverMapUrl || 'https://map.naver.com'

  const locationInfo = [
    { title: 'Address', content: settings.address, sub: '방문 전 예약 권장' },
    {
      title: 'Hours',
      content: settings.businessHours,
      sub: settings.closedDay || '운영시간은 상황에 따라 변경될 수 있습니다.',
    },
    {
      title: 'Contact',
      content: [settings.phonePrimary, settings.phoneSecondary].filter(Boolean).join(' / '),
      sub: settings.email,
    },
    {
      title: 'Map',
      content: '네이버 지도에서 위치 확인',
      sub: '탭 한 번으로 길찾기 이동 가능',
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-stone-50 px-4 pb-12 pt-24 sm:px-6 sm:pb-16 sm:pt-28 md:px-8 md:pb-20 md:pt-32">
        <div className="mx-auto max-w-7xl text-center">
          <p
            className="mb-4 text-[9px] font-light uppercase tracking-[0.25em] text-amber-600/70 sm:mb-6 sm:text-[10px] sm:tracking-[0.3em]"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Location
          </p>
          <h1
            className="mb-4 text-4xl font-light italic tracking-tight text-stone-900 sm:mb-6 sm:text-5xl md:text-6xl lg:text-7xl"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Visit Us
          </h1>
          <div className="mx-auto mb-6 mt-6 h-[1px] w-12 bg-amber-500/30 sm:mb-8 sm:mt-8 sm:w-16" />
          <p className="mx-auto max-w-[520px] px-4 text-xs font-light leading-relaxed text-stone-600 sm:text-sm md:text-base">
            매장 위치와 운영시간, 방문 전 확인할 정보를 안내합니다.
          </p>
        </div>
      </section>

      <section className="bg-white px-4 py-12 sm:px-6 sm:py-16 md:px-8 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2 lg:gap-16">
          <div className="overflow-hidden bg-stone-100">
            <img src="/img/hero/hero.png" alt="JU JEWELRY 매장 위치" className="h-full w-full object-cover" />
          </div>

          <div className="flex flex-col justify-center">
            <h2
              className="mb-8 text-2xl font-light italic tracking-tight text-stone-900 sm:text-3xl md:text-4xl lg:text-5xl"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              {settings.shopName}
            </h2>
            <div className="space-y-8">
              {locationInfo.map((item) => (
                <div key={item.title}>
                  <p
                    className="mb-2 text-[10px] font-light uppercase tracking-[0.2em] text-amber-600/70"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    {item.title}
                  </p>
                  <p className="text-base font-light text-stone-900">{item.content}</p>
                  <p className="mt-1 text-sm font-light text-stone-500">{item.sub}</p>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <a
                href={mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[52px] items-center justify-center rounded-md border border-stone-300 px-8 py-4 text-[11px] font-medium uppercase tracking-[0.2em] text-stone-900 transition-all duration-300 hover:border-amber-600 hover:text-amber-600"
              >
                네이버 지도 열기
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-stone-50 px-6 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <p
              className="mb-4 text-[10px] font-light uppercase tracking-[0.2em] text-amber-600/70"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Directions
            </p>
            <h2
              className="text-3xl font-light italic tracking-tight text-stone-900 md:text-5xl"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              방문 안내
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {directions.map((item) => (
              <article key={item.method} className="border border-stone-200 bg-white p-8">
                <h3
                  className="mb-5 border-b border-stone-200 pb-4 text-2xl font-light italic tracking-tight text-stone-900"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  {item.method}
                </h3>
                <ul className="space-y-3">
                  {item.details.map((detail) => (
                    <li key={detail} className="flex gap-3 text-sm font-light leading-relaxed text-stone-600">
                      <span className="text-amber-600">·</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h2
            className="mb-8 text-3xl font-light italic tracking-tight text-stone-900 md:text-5xl"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            방문 예약
          </h2>
          <p className="mx-auto mb-12 max-w-xl text-sm font-light leading-relaxed text-stone-600 md:text-base">
            원활한 상담을 위해 방문 전 미리 연락 부탁드립니다. 예약 시 더욱 자세한 안내가 가능합니다.
          </p>
          <Link
            href="/contact"
            className="inline-flex min-h-[52px] items-center justify-center rounded-md bg-stone-900 px-12 py-4 text-[11px] font-medium uppercase tracking-[0.2em] text-white transition-all duration-300 hover:bg-amber-600"
          >
            방문 예약
          </Link>
        </div>
      </section>
    </div>
  )
}
