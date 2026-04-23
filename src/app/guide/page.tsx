import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '구매 가이드',
  description: '반지 사이즈, 금속 종류, 보증서 확인 등 주얼리 구매 가이드',
}

export default function GuidePage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="public-hero bg-stone-50 px-4 sm:px-6 md:px-8">
        <div className="mx-auto max-w-5xl">
          <p className="text-xs uppercase tracking-[0.2em] text-amber-700/70">Guide</p>
          <h1 className="mt-3 text-4xl font-light italic text-stone-900">구매 가이드</h1>
          <p className="mt-4 max-w-2xl text-sm text-stone-600">
            거래 전에 자주 확인하시는 핵심 포인트를 정리했습니다.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-5xl gap-5 px-4 py-12 sm:px-6 md:px-8 md:py-16">
        <GuideCard
          title="반지 사이즈 측정"
          items={[
            '종이 스트립 또는 링 게이지로 손가락 둘레를 측정합니다.',
            '오후 시간대에 측정하면 보다 실제 착용감에 가깝습니다.',
            '마디가 굵은 경우 마디 기준으로 사이즈를 잡아주세요.',
          ]}
        />
        <GuideCard
          title="금속 종류 비교"
          items={[
            '14K: 강도와 가격 균형이 좋아 데일리 착용에 적합합니다.',
            '18K: 색감이 깊고 고급스러운 톤을 선호할 때 적합합니다.',
            'Pt(플래티넘): 백색 광택과 내구성을 중요하게 볼 때 선택합니다.',
          ]}
        />
        <GuideCard
          title="보증서 확인 포인트"
          items={[
            '스톤 중량(ct), 컬러/클래리티 등급을 확인합니다.',
            '금속 함량(14K/18K/Pt)과 제조 정보를 확인합니다.',
            '판매처 연락처, A/S 조건, 교환 정책을 함께 보관해 주세요.',
          ]}
        />
      </section>
    </div>
  )
}

function GuideCard({ title, items }: { title: string; items: string[] }) {
  return (
    <article className="rounded-md border border-stone-200 p-5 sm:p-6">
      <h2 className="text-lg font-medium text-stone-900">{title}</h2>
      <ul className="mt-3 space-y-2 text-sm leading-6 text-stone-700">
        {items.map((item) => (
          <li key={item} className="flex gap-2">
            <span>•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </article>
  )
}
