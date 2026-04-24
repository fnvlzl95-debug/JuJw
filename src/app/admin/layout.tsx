'use client'

export const runtime = 'edge'

import Link from 'next/link'
import { ReactNode, useMemo } from 'react'
import { usePathname } from 'next/navigation'
import {
  ExternalLink,
  Home,
  LayoutDashboard,
  CircleHelp,
  Package2,
  PhoneCall,
  Settings as SettingsIcon,
} from 'lucide-react'
import AdminLogoutButton from '@/components/admin/AdminLogoutButton'

const navItems = [
  { href: '/admin', label: '현황', icon: LayoutDashboard },
  { href: '/admin/home', label: '홈편집', icon: Home },
  { href: '/admin/products', label: '제품', icon: Package2 },
  { href: '/admin/inquiries', label: '문의', icon: PhoneCall },
  { href: '/admin/faq', label: 'FAQ', icon: CircleHelp },
  { href: '/admin/settings', label: '설정', icon: SettingsIcon },
]

const routeMeta = [
  { match: '/admin/home', title: '홈페이지 편집', description: '메인 화면에 실제로 보이는 문구를 수정합니다.' },
  { match: '/admin/products', title: '제품 관리', description: '제품 등록, 홈 추천 노출, 사진을 한 화면에서 처리합니다.' },
  { match: '/admin/inquiries', title: '문의 관리', description: '전화 연결과 처리 상태 변경을 빠르게 합니다.' },
  { match: '/admin/faq', title: 'FAQ 관리', description: '자주 묻는 질문 페이지에 노출되는 질문과 답변을 관리합니다.' },
  { match: '/admin/settings', title: '매장 설정', description: '연락처, 주소, SNS, 사업자 정보를 관리합니다.' },
  { match: '/admin', title: '운영 현황', description: '오늘 처리할 일을 한눈에 확인합니다.' },
]

function isActive(pathname: string, href: string) {
  return href === '/admin' ? pathname === href : pathname.startsWith(href)
}

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const currentRoute = useMemo(
    () =>
      routeMeta.find((item) =>
        item.match === '/admin' ? pathname === item.match : pathname.startsWith(item.match)
      ) ?? routeMeta[0],
    [pathname]
  )

  return (
    <div className="admin-flat-shell min-h-[100dvh] bg-[#f3f0ea] text-stone-950 lg:h-screen lg:overflow-hidden">
      <div className="lg:grid lg:h-screen lg:grid-cols-[224px_minmax(0,1fr)]">
        <aside className="hidden border-r border-stone-200 bg-[#211a16] text-white lg:flex lg:min-h-0 lg:flex-col">
          <div className="px-5 py-5">
            <Link href="/admin" className="block">
              <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/45">
                JU JEWELRY
              </span>
              <span className="mt-2 block text-2xl font-semibold tracking-tight">관리자</span>
            </Link>
          </div>

          <nav className="min-h-0 flex-1 space-y-1 px-3">
            {navItems.map((item) => {
              const Icon = item.icon
              const active = isActive(pathname, item.href)

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex min-h-[48px] items-center gap-3 rounded-2xl px-4 text-[15px] font-semibold transition active:translate-y-px ${
                    active ? 'bg-white text-stone-950' : 'text-white/70 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Icon size={19} strokeWidth={1.8} />
                  {item.label}
                </Link>
              )
            })}
          </nav>

          <div className="space-y-3 border-t border-white/10 p-4">
            <Link
              href="/"
              target="_blank"
              className="flex min-h-[46px] items-center justify-between rounded-2xl border border-white/10 px-4 text-sm font-semibold text-white/75 transition hover:bg-white/10 hover:text-white"
            >
              홈페이지 보기
              <ExternalLink size={16} />
            </Link>
            <AdminLogoutButton variant="dark" />
          </div>
        </aside>

        <div className="min-w-0 lg:flex lg:h-screen lg:min-h-0 lg:flex-col">
          <header className="sticky top-0 z-30 border-b border-stone-200 bg-[#f8f6f1]/96 backdrop-blur lg:static lg:shrink-0">
            <div className="flex min-h-[72px] items-center justify-between gap-3 px-4 sm:px-6 lg:px-7">
              <div className="min-w-0">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-stone-400">Admin</p>
                <h1 className="mt-1 truncate text-xl font-semibold tracking-tight text-stone-950 sm:text-2xl">
                  {currentRoute.title}
                </h1>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <Link
                  href="/"
                  target="_blank"
                  className="hidden min-h-[46px] items-center gap-2 rounded-2xl border border-stone-300 bg-white px-4 text-sm font-semibold text-stone-700 transition active:translate-y-px hover:border-stone-400 sm:inline-flex"
                >
                  홈페이지
                  <ExternalLink size={16} />
                </Link>
                <div className="hidden sm:block lg:hidden">
                  <AdminLogoutButton />
                </div>
              </div>
            </div>
            <p className="border-t border-stone-200 px-4 py-2 text-[13px] leading-5 text-stone-500 sm:px-6 lg:hidden">
              {currentRoute.description}
            </p>
          </header>

          <main className="min-w-0 px-4 pb-24 pt-4 sm:px-6 lg:min-h-0 lg:flex-1 lg:overflow-hidden lg:px-7 lg:pb-7 lg:pt-5">
            {children}
          </main>
        </div>
      </div>

      <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-stone-200 bg-white/96 px-1.5 py-2 backdrop-blur lg:hidden">
        <div className="grid grid-cols-6 gap-1">
          {navItems.map((item) => {
            const Icon = item.icon
            const active = isActive(pathname, item.href)

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex min-h-[58px] flex-col items-center justify-center rounded-2xl text-[10px] font-semibold transition active:translate-y-px ${
                  active ? 'bg-stone-900 text-white' : 'text-stone-500 active:bg-stone-100'
                }`}
              >
                <Icon size={17} strokeWidth={1.9} />
                <span className="mt-1">{item.label}</span>
              </Link>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
