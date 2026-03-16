import AdminShell from '@/components/admin/AdminShell'
import SettingsForm from '@/components/admin/SettingsForm'
import { buildPageMetadata } from '@/lib/metadata'
import { requireAdminSession } from '@/lib/auth'
import { getSiteSettings } from '@/lib/site-data'

export const metadata = buildPageMetadata({
  title: '관리자 설정',
  description: '사이트 공통 정보, 연락처, 지도, 푸터 정보를 관리하는 관리자 페이지입니다.',
  path: '/admin/settings',
})

export default async function AdminSettingsPage() {
  const session = await requireAdminSession()
  const settings = await getSiteSettings()

  return (
    <AdminShell
      adminName={session.name}
      title="사이트 설정"
      description="공개 사이트 전역에 노출되는 연락처, 주소, 히어로 문구, 지도 정보를 수정합니다."
    >
      <div className="p-6 lg:p-8 bg-white border border-border">
        <SettingsForm initialSettings={settings} />
      </div>
    </AdminShell>
  )
}
