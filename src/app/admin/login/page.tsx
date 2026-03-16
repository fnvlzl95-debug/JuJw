import LoginForm from '@/components/admin/LoginForm'
import { buildPageMetadata } from '@/lib/metadata'

export const metadata = buildPageMetadata({
  title: '관리자 로그인',
  description: 'Ju Jewelry 관리자 콘솔 로그인 페이지입니다.',
  path: '/admin/login',
})

export default function AdminLoginPage() {
  return (
    <section className="min-h-screen pt-[72px] px-6 bg-bg-secondary">
      <div className="max-w-[480px] mx-auto py-20">
        <div className="p-8 lg:p-10 bg-white border border-border">
          <p className="text-[11px] font-medium tracking-[0.15em] uppercase text-accent mb-4">
            Admin
          </p>
          <h1 className="font-serif text-3xl font-light text-text-default mb-4">
            관리자 로그인
          </h1>
          <p className="text-[14px] text-text-muted mb-8">
            기본 로컬 계정은 `admin@jujewelry.kr / admin1234!` 입니다.
          </p>
          <LoginForm />
        </div>
      </div>
    </section>
  )
}
