import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '다이아몬드 도매',
  description: '다이아몬드 중심 제품군 도매 상담 및 스펙 기반 거래 안내',
}

export default function DiamondWholesalePage() {
  return (
    <div className="min-h-screen bg-white pt-24">
      <section className="mx-auto max-w-4xl px-4 py-14 sm:px-6 md:px-8">
        <h1 className="text-3xl font-light text-stone-900">다이아몬드 도매</h1>
        <p className="mt-4 text-sm leading-7 text-stone-700">
          솔리테어, 테니스, 스터드 등 다이아몬드 중심 제품을 거래처 성격에 맞춰 제안합니다.
          스펙/가격대/납기 기준으로 빠르게 비교 견적을 제공합니다.
        </p>
        <ul className="mt-6 space-y-2 text-sm text-stone-700">
          <li>• 거래 조건별 라인업 큐레이션</li>
          <li>• 카탈로그/샘플 기반 상담 가능</li>
          <li>• A/S 및 사후 관리 프로세스 제공</li>
        </ul>
        <div className="mt-8 flex gap-3">
          <Link href="/products" className="rounded-md bg-stone-900 px-4 py-2 text-sm text-white">
            제품 보기
          </Link>
          <Link href="/contact" className="rounded-md border border-stone-300 px-4 py-2 text-sm">
            견적 문의
          </Link>
        </div>
      </section>
    </div>
  )
}
