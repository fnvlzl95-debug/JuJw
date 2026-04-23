import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '종로 귀금속 도매',
  description: '종로 귀금속 상권에서 신뢰할 수 있는 주얼리 도매 파트너 JU JEWELRY',
}

export default function JongnoJewelryPage() {
  return (
    <LandingLayout
      title="종로 귀금속 도매"
      description="종로 상권 기반의 빠른 상담/출고 프로세스로 안정적인 거래를 지원합니다."
      points={[
        '종로 귀금속 상권 네트워크 기반 소싱',
        '반지/목걸이/귀걸이/팔찌 카테고리 운영',
        '소량 주문부터 맞춤 제작까지 유연 대응',
      ]}
    />
  )
}

function LandingLayout({
  title,
  description,
  points,
}: {
  title: string
  description: string
  points: string[]
}) {
  return (
    <div className="public-page-shell min-h-screen bg-white">
      <section className="mx-auto max-w-4xl px-4 py-14 sm:px-6 md:px-8">
        <h1 className="text-3xl font-light text-stone-900">{title}</h1>
        <p className="mt-4 text-sm leading-7 text-stone-700">{description}</p>
        <ul className="mt-6 space-y-2 text-sm text-stone-700">
          {points.map((point) => (
            <li key={point}>• {point}</li>
          ))}
        </ul>
        <div className="mt-8 flex gap-3">
          <Link href="/products" className="rounded-md bg-stone-900 px-4 py-2 text-sm text-white">
            제품 보기
          </Link>
          <Link href="/contact" className="rounded-md border border-stone-300 px-4 py-2 text-sm">
            상담 문의
          </Link>
        </div>
      </section>
    </div>
  )
}
