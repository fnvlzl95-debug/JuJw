import AdminShell from '@/components/admin/AdminShell'
import InquiriesManager from '@/components/admin/InquiriesManager'
import { buildPageMetadata } from '@/lib/metadata'
import { requireAdminSession } from '@/lib/auth'
import { listInquiries } from '@/lib/site-data'

export const metadata = buildPageMetadata({
  title: '관리자 문의 관리',
  description: '접수된 상담 요청과 문의 상태를 관리하는 관리자 페이지입니다.',
  path: '/admin/inquiries',
})

export default async function AdminInquiriesPage() {
  const session = await requireAdminSession()
  const inquiries = await listInquiries()

  return (
    <AdminShell
      adminName={session.name}
      title="문의 관리"
      description="접수된 상담 요청을 확인하고 상태를 대기/연락 완료/처리 완료로 관리합니다."
    >
      <InquiriesManager inquiries={inquiries} />
    </AdminShell>
  )
}
