import Link from 'next/link'
import { Car, Clock, MapPin, Phone } from 'lucide-react'
import { buildPageMetadata } from '@/lib/metadata'
import { getSiteSettings } from '@/lib/site-data'

export const metadata = buildPageMetadata({
  title: '오시는 길',
  description: 'Ju Jewelry 방문 안내, 지도, 연락처, 교통 정보를 확인할 수 있습니다.',
  path: '/location',
})

export default async function LocationPage() {
  const settings = await getSiteSettings()

  const locationInfo = [
    {
      icon: MapPin,
      title: '주소',
      content: settings.addressLine1,
      sub: settings.addressLine2,
    },
    {
      icon: Clock,
      title: '운영시간',
      content: settings.hoursWeekday,
      sub: settings.hoursWeekend,
    },
    {
      icon: Phone,
      title: '연락처',
      content: settings.phone,
      sub: settings.email,
    },
    {
      icon: Car,
      title: '주차 안내',
      content: settings.parking,
      sub: '방문 전 연락 주시면 주변 안내를 도와드립니다.',
    },
  ]

  const directions = [
    {
      method: '지하철',
      details: [
        '1호선·3호선·5호선 종로3가역 기준 도보 이동권',
        '상담 예약 후 정확한 방문 위치를 안내드립니다.',
      ],
    },
    {
      method: '버스',
      details: [
        '종로3가 일대 하차 후 도보 이동이 가능합니다.',
        '방문 전 유선 문의 시 가장 가까운 정류장을 안내합니다.',
      ],
    },
    {
      method: '자가용',
      details: [
        '인근 공영주차장 이용을 권장합니다.',
        '주차 여건은 시간대에 따라 달라질 수 있습니다.',
      ],
    },
  ]

  return (
    <>
      <section className="pt-[72px]">
        <div className="py-20 lg:py-24 px-6 bg-bg-secondary">
          <div className="max-w-content mx-auto text-center">
            <p className="text-[11px] font-medium tracking-[0.15em] uppercase text-accent mb-4">
              Location
            </p>
            <h1 className="font-serif text-3xl lg:text-[2.8rem] font-light text-text-default mb-6">
              오시는 길
            </h1>
            <p className="text-[15px] text-text-muted max-w-[480px] mx-auto">
              방문 상담 전 위치와 운영시간을 확인해 주세요.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32 px-6">
        <div className="max-w-content mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            <div className="aspect-square lg:aspect-auto lg:min-h-[500px] border border-border overflow-hidden bg-white">
              {settings.mapEmbedUrl ? (
                <iframe
                  src={settings.mapEmbedUrl}
                  title={`${settings.siteName} 지도`}
                  className="h-full w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              ) : (
                <div className="h-full w-full bg-bg-secondary flex items-center justify-center text-8xl">
                  📍
                </div>
              )}
            </div>

            <div className="flex flex-col justify-center">
              <h2 className="font-serif text-2xl lg:text-[2rem] font-light text-text-default mb-10">
                {settings.siteName}
              </h2>
              <div className="space-y-8">
                {locationInfo.map((item) => (
                  <div key={item.title} className="flex gap-5">
                    <div className="flex-shrink-0 w-11 h-11 rounded-full bg-bg-secondary flex items-center justify-center">
                      <item.icon size={20} className="text-accent" />
                    </div>
                    <div>
                      <p className="text-[12px] font-medium text-text-muted tracking-wide uppercase mb-1">
                        {item.title}
                      </p>
                      <p className="text-[16px] text-text-default mb-1">{item.content}</p>
                      <p className="text-[13px] text-text-muted">{item.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-10">
                <a
                  href={settings.naverMapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-8 py-4 border border-border text-text-default text-[14px] font-medium hover:border-text-default transition-colors"
                >
                  네이버 지도로 보기
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32 px-6 bg-white">
        <div className="max-w-content mx-auto">
          <div className="text-center mb-16">
            <p className="text-[11px] font-medium tracking-[0.15em] uppercase text-accent mb-4">
              Directions
            </p>
            <h2 className="font-serif text-2xl lg:text-[2rem] font-light text-text-default">
              교통 안내
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {directions.map((item) => (
              <div key={item.method} className="p-8 bg-bg-primary border border-border">
                <h3 className="text-[15px] font-medium text-text-default mb-6 pb-4 border-b border-border">
                  {item.method}
                </h3>
                <ul className="space-y-3">
                  {item.details.map((detail) => (
                    <li key={detail} className="flex gap-3 text-[14px] text-text-muted">
                      <span className="text-accent">•</span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32 px-6 bg-bg-secondary">
        <div className="max-w-[600px] mx-auto text-center">
          <h2 className="font-serif text-2xl lg:text-[2rem] font-light text-text-default mb-6">
            방문 전 안내
          </h2>
          <p className="text-[15px] text-text-muted mb-10 leading-relaxed">
            원활한 상담을 위해 방문 전 미리 연락 부탁드립니다.
            예약 시 더 정확한 위치 안내와 상담 준비가 가능합니다.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-10 py-4 bg-text-default text-white text-[14px] font-medium hover:bg-neutral-800 transition-colors"
          >
            방문 예약하기
          </Link>
        </div>
      </section>
    </>
  )
}
