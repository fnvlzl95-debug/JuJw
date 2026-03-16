import { buildPageMetadata } from '@/lib/metadata'

export const metadata = buildPageMetadata({
  title: '이용약관',
  description: 'Ju Jewelry 사이트 이용과 상담 요청에 대한 기본 약관입니다.',
  path: '/terms',
})

const sections = [
  {
    title: '1. 목적',
    body: '본 약관은 Ju Jewelry 웹사이트의 정보 제공 및 상담 요청 서비스 이용 조건을 규정합니다.',
  },
  {
    title: '2. 서비스 범위',
    body: '사이트는 제품 소개, 거래 안내, 위치 정보, 상담 요청 접수 기능을 제공합니다.',
  },
  {
    title: '3. 정보의 성격',
    body: '사이트 내 제품 정보와 거래 조건은 안내용이며, 실제 재고·가격·납기는 상담 시점 기준으로 확정됩니다.',
  },
  {
    title: '4. 문의 및 책임',
    body: '운영상 필요한 경우 내용은 변경될 수 있으며, 중요한 거래 조건은 별도 협의를 통해 확정합니다.',
  },
]

export default function TermsPage() {
  return (
    <section className="pt-[72px] px-6 py-20 lg:py-24 bg-bg-secondary min-h-screen">
      <div className="max-w-[880px] mx-auto p-8 lg:p-10 bg-white border border-border">
        <p className="text-[11px] font-medium tracking-[0.15em] uppercase text-accent mb-4">
          Terms
        </p>
        <h1 className="font-serif text-3xl font-light text-text-default mb-6">
          이용약관
        </h1>
        <div className="space-y-8">
          {sections.map((section) => (
            <div key={section.title}>
              <h2 className="text-[16px] font-medium text-text-default mb-3">
                {section.title}
              </h2>
              <p className="text-[14px] leading-relaxed text-text-muted">
                {section.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
