import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '예물 반지 도매',
  description: '웨딩/예물 반지 도매 상담, 맞춤 제작 대응, 종로 기반 빠른 리드타임',
}

export default function WholesaleWeddingRingPage() {
  return (
    <div className="public-page-shell min-h-screen bg-white">
      <section className="mx-auto max-w-4xl px-4 py-14 sm:px-6 md:px-8">
        <h1 className="text-3xl font-light text-stone-900">예물 반지 도매</h1>
        <p className="mt-4 text-sm leading-7 text-stone-700">
          웨딩 수요에 맞춘 솔리테어, 밴드, 커플링 라인업을 운영합니다.
          스톤 스펙/금속 함량/납기 기준으로 빠르게 상담해 드립니다.
        </p>
        <ul className="mt-6 space-y-2 text-sm text-stone-700">
          <li>• 14K/18K/Pt 맞춤 옵션 지원</li>
          <li>• 매장/온라인 판매처별 구성 제안</li>
          <li>• 맞춤 제작 리드타임 7-14일</li>
        </ul>
        <div className="mt-8 flex gap-3">
          <Link href="/products/rings" className="rounded-md bg-stone-900 px-4 py-2 text-sm text-white">
            반지 라인업 보기
          </Link>
          <Link href="/contact" className="rounded-md border border-stone-300 px-4 py-2 text-sm">
            도매 상담 요청
          </Link>
        </div>
      </section>
    </div>
  )
}
