import Link from 'next/link'
import AdminShell from '@/components/admin/AdminShell'
import { buildPageMetadata } from '@/lib/metadata'
import { requireAdminSession } from '@/lib/auth'
import { getDashboardSummary } from '@/lib/site-data'

export const metadata = buildPageMetadata({
  title: '관리자 대시보드',
  description: '제품 수, 문의 현황, 최근 활동을 확인하는 관리자 대시보드입니다.',
  path: '/admin',
})

export default async function AdminDashboardPage() {
  const session = await requireAdminSession()
  const summary = await getDashboardSummary()

  return (
    <AdminShell
      adminName={session.name}
      title="대시보드"
      description="공개 사이트에 노출되는 데이터와 문의 현황을 한 곳에서 확인합니다."
    >
      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        <div className="p-6 bg-white border border-border">
          <p className="text-[12px] uppercase tracking-[0.18em] text-text-muted mb-3">
            Total Products
          </p>
          <p className="font-serif text-4xl text-text-default">{summary.totalProducts}</p>
        </div>
        <div className="p-6 bg-white border border-border">
          <p className="text-[12px] uppercase tracking-[0.18em] text-text-muted mb-3">
            Featured
          </p>
          <p className="font-serif text-4xl text-text-default">{summary.featuredProducts}</p>
        </div>
        <div className="p-6 bg-white border border-border">
          <p className="text-[12px] uppercase tracking-[0.18em] text-text-muted mb-3">
            Inquiries
          </p>
          <p className="font-serif text-4xl text-text-default">{summary.totalInquiries}</p>
        </div>
        <div className="p-6 bg-white border border-border">
          <p className="text-[12px] uppercase tracking-[0.18em] text-text-muted mb-3">
            Pending
          </p>
          <p className="font-serif text-4xl text-text-default">{summary.pendingInquiries}</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr_320px] gap-6">
        <div className="p-6 bg-white border border-border">
          <h2 className="font-serif text-2xl font-light text-text-default mb-4">
            최근 문의
          </h2>
          {summary.latestInquiry ? (
            <div className="space-y-3 text-[14px] text-text-muted">
              <p>
                <span className="text-text-default font-medium">상호 / 성함:</span>{' '}
                {summary.latestInquiry.companyName}
              </p>
              <p>
                <span className="text-text-default font-medium">연락처:</span>{' '}
                {summary.latestInquiry.phone}
              </p>
              <p>
                <span className="text-text-default font-medium">관심 품목:</span>{' '}
                {summary.latestInquiry.interest || '미입력'}
              </p>
              <p className="whitespace-pre-wrap">
                <span className="text-text-default font-medium">문의 내용:</span>{' '}
                {summary.latestInquiry.message || '없음'}
              </p>
              <p>
                <span className="text-text-default font-medium">상태:</span>{' '}
                {summary.latestInquiry.status}
              </p>
            </div>
          ) : (
            <p className="text-[14px] text-text-muted">최근 문의가 없습니다.</p>
          )}
        </div>

        <div className="p-6 bg-white border border-border">
          <h2 className="font-serif text-2xl font-light text-text-default mb-4">
            빠른 작업
          </h2>
          <div className="space-y-3">
            <Link
              href="/admin/products"
              className="block px-4 py-3 border border-border text-[14px] text-text-default hover:border-text-default transition-colors"
            >
              제품 관리로 이동
            </Link>
            <Link
              href="/admin/inquiries"
              className="block px-4 py-3 border border-border text-[14px] text-text-default hover:border-text-default transition-colors"
            >
              문의 상태 관리
            </Link>
            <Link
              href="/admin/settings"
              className="block px-4 py-3 border border-border text-[14px] text-text-default hover:border-text-default transition-colors"
            >
              사이트 설정 수정
            </Link>
          </div>
        </div>
      </div>
    </AdminShell>
  )
}
