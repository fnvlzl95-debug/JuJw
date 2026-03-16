import { buildPageMetadata } from '@/lib/metadata'

export const metadata = buildPageMetadata({
  title: '개인정보처리방침',
  description: 'Ju Jewelry 상담 요청과 운영 과정에서의 개인정보 처리 기준입니다.',
  path: '/privacy',
})

const sections = [
  {
    title: '1. 수집하는 정보',
    body: '상담 요청 시 상호/성함, 연락처, 관심 품목, 문의 내용을 수집할 수 있습니다.',
  },
  {
    title: '2. 이용 목적',
    body: '수집된 정보는 상담 응대, 거래 안내, 요청 내용 확인을 위해서만 사용합니다.',
  },
  {
    title: '3. 보관 기간',
    body: '문의 대응과 거래 이력 확인에 필요한 범위에서 보관하며, 별도 요청 시 검토 후 삭제할 수 있습니다.',
  },
  {
    title: '4. 문의',
    body: '개인정보 처리 관련 문의는 대표 연락처 또는 이메일로 접수해 주세요.',
  },
]

export default function PrivacyPage() {
  return (
    <section className="pt-[72px] px-6 py-20 lg:py-24 bg-bg-secondary min-h-screen">
      <div className="max-w-[880px] mx-auto p-8 lg:p-10 bg-white border border-border">
        <p className="text-[11px] font-medium tracking-[0.15em] uppercase text-accent mb-4">
          Privacy Policy
        </p>
        <h1 className="font-serif text-3xl font-light text-text-default mb-6">
          개인정보처리방침
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
