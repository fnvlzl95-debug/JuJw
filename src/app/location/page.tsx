import Link from 'next/link'
import { MapPin, Clock, Phone, Car } from 'lucide-react'

const locationInfo = [
  {
    icon: MapPin,
    title: '주소',
    content: '서울 종로구 종로 OO길 OO',
    sub: '종묘귀금속 내',
  },
  {
    icon: Clock,
    title: '운영시간',
    content: '평일 09:00 - 18:00',
    sub: '주말 및 공휴일 휴무 (예약 시 상담 가능)',
  },
  {
    icon: Phone,
    title: '연락처',
    content: '02-000-0000',
    sub: 'info@jujewelry.kr',
  },
  {
    icon: Car,
    title: '주차 안내',
    content: '인근 공영주차장 이용',
    sub: '종로3가 공영주차장 도보 3분',
  },
]

const directions = [
  {
    method: '지하철',
    details: [
      '1호선 종로3가역 6번 출구 도보 5분',
      '3호선 종로3가역 15번 출구 도보 3분',
      '5호선 종로3가역 2번 출구 도보 4분',
    ],
  },
  {
    method: '버스',
    details: [
      '종로3가 정류장 하차',
      '간선: 101, 103, 143, 150, 160',
      '지선: 7025',
    ],
  },
  {
    method: '자가용',
    details: [
      '네비게이션 "종묘귀금속" 검색',
      '인근 공영주차장 이용 권장',
      '주차 후 도보 3분',
    ],
  },
]

export default function LocationPage() {
  return (
    <>
      {/* Hero Section */}
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
              종로 종묘귀금속에서 만나보세요
            </p>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-24 lg:py-32 px-6">
        <div className="max-w-content mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Map Placeholder */}
            <div className="aspect-square lg:aspect-auto lg:min-h-[500px] bg-bg-secondary flex items-center justify-center text-8xl border border-border">
              📍
            </div>

            {/* Info */}
            <div className="flex flex-col justify-center">
              <h2 className="font-serif text-2xl lg:text-[2rem] font-light text-text-default mb-10">
                Ju Jewelry
              </h2>
              <div className="space-y-8">
                {locationInfo.map((item, index) => (
                  <div key={index} className="flex gap-5">
                    <div className="flex-shrink-0 w-11 h-11 rounded-full bg-bg-secondary flex items-center justify-center">
                      <item.icon size={20} className="text-accent" />
                    </div>
                    <div>
                      <p className="text-[12px] font-medium text-text-muted tracking-wide uppercase mb-1">
                        {item.title}
                      </p>
                      <p className="text-[16px] text-text-default mb-1">
                        {item.content}
                      </p>
                      <p className="text-[13px] text-text-muted">
                        {item.sub}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-10">
                <a
                  href="https://map.naver.com"
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

      {/* Directions */}
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
            {directions.map((item, index) => (
              <div key={index} className="p-8 bg-bg-primary border border-border">
                <h3 className="text-[15px] font-medium text-text-default mb-6 pb-4 border-b border-border">
                  {item.method}
                </h3>
                <ul className="space-y-3">
                  {item.details.map((detail, i) => (
                    <li key={i} className="flex gap-3 text-[14px] text-text-muted">
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

      {/* Visit Notice */}
      <section className="py-24 lg:py-32 px-6 bg-bg-secondary">
        <div className="max-w-[600px] mx-auto text-center">
          <h2 className="font-serif text-2xl lg:text-[2rem] font-light text-text-default mb-6">
            방문 전 안내
          </h2>
          <p className="text-[15px] text-text-muted mb-10 leading-relaxed">
            원활한 상담을 위해 방문 전 미리 연락 부탁드립니다.<br />
            예약 시 주말 상담도 가능합니다.
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
