'use client'

export const runtime = 'edge'

import Link from 'next/link'
import { LayoutDashboard, Megaphone, Package2, PhoneCall, Plus, Settings as SettingsIcon } from 'lucide-react'
import { ReactNode, useMemo } from 'react'
import { usePathname } from 'next/navigation'
import AdminLogoutButton from '@/components/admin/AdminLogoutButton'

const desktopNavItems = [
  { href: '/admin', label: '대시보드', icon: LayoutDashboard },
  { href: '/admin/inquiries', label: '문의', icon: PhoneCall },
  { href: '/admin/products', label: '제품', icon: Package2 },
  { href: '/admin/notices', label: '공지', icon: Megaphone },
  { href: '/admin/settings', label: '설정', icon: SettingsIcon },
]

const mobileNavItems = desktopNavItems.filter((item) => item.href !== '/admin')

type RouteMeta = {
  match: string
  title: string
  description: string
  actionHref?: string
  actionLabel?: string
}

const routeMeta: RouteMeta[] = [
  {
    match: '/admin/inquiries',
    title: '문의 관리',
    description: '전화 한 번과 상태 버튼 세 개로 빠르게 처리합니다.',
  },
  {
    match: '/admin/products',
    title: '제품 관리',
    description: '기본정보 저장 후 사진을 붙이는 2단계 흐름으로 단순화했습니다.',
    actionHref: '/admin/products?new=1',
    actionLabel: '제품 등록',
  },
  {
    match: '/admin/notices',
    title: '공지 관리',
    description: '모바일과 PC 모두 큰 입력창으로 바로 작성하고 공개 상태를 바꿉니다.',
    actionHref: '/admin/notices?new=1',
    actionLabel: '공지 작성',
  },
  {
    match: '/admin/settings',
    title: '매장 설정',
    description: '연락처, 주소, SNS와 사업자 정보를 한 화면에서 수정합니다.',
  },
  {
    match: '/admin',
    title: '운영 대시보드',
    description: '오늘 처리할 문의와 빠른 등록 작업을 먼저 보여줍니다.',
    actionHref: '/admin/products?new=1',
    actionLabel: '빠른 등록',
  },
]

function isActive(pathname: string, href: string): boolean {
  return href === '/admin' ? pathname === href : pathname.startsWith(href)
}

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const currentRoute = useMemo(
    () =>
      routeMeta.find((item) =>
        item.match === '/admin' ? pathname === item.match : pathname.startsWith(item.match)
      ) ?? routeMeta[routeMeta.length - 1],
    [pathname]
  )

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f7f4ef_0%,#f5efe8_36%,#faf7f2_100%)] pt-16 text-stone-900">
      <div className="fixed left-0 right-0 top-16 z-40 border-b border-stone-200/90 bg-white/92 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <div className="min-w-0">
            <Link href="/admin" className="text-[11px] font-medium uppercase tracking-[0.24em] text-stone-500">
              JU JEWELRY Admin
            </Link>
            <div className="mt-2 flex items-end gap-3">
              <h1 className="truncate text-xl font-semibold tracking-tight text-stone-950 sm:text-2xl">
                {currentRoute.title}
              </h1>
              <p className="hidden pb-1 text-sm text-stone-500 lg:block">{currentRoute.description}</p>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            {currentRoute.actionHref && currentRoute.actionLabel ? (
              <Link
                href={currentRoute.actionHref}
                className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-stone-900 px-4 text-sm font-medium text-white transition hover:bg-stone-700"
              >
                <Plus size={16} />
                <span className="hidden sm:inline">{currentRoute.actionLabel}</span>
                <span className="sm:hidden">등록</span>
              </Link>
            ) : null}
            <AdminLogoutButton />
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-7xl px-4 pb-28 pt-32 sm:px-6 lg:grid lg:grid-cols-[250px_minmax(0,1fr)] lg:gap-8 lg:px-8 lg:pb-10">
        <aside className="hidden lg:block">
          <div className="sticky top-36 overflow-hidden rounded-[28px] border border-stone-200/80 bg-white/92 p-5 shadow-[0_20px_60px_-28px_rgba(28,25,23,0.35)] backdrop-blur">
            <div className="rounded-2xl bg-stone-900 px-5 py-5 text-white">
              <p className="text-[11px] uppercase tracking-[0.24em] text-white/60">Workspace</p>
              <p className="mt-2 text-2xl font-semibold tracking-tight">운영 센터</p>
              <p className="mt-2 text-sm leading-6 text-white/75">
                문의, 제품, 공지, 설정을 같은 흐름으로 관리합니다.
              </p>
            </div>

            <nav className="mt-5 space-y-2">
              {desktopNavItems.map((item) => {
                const Icon = item.icon
                const active = isActive(pathname, item.href)

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex min-h-[52px] items-center gap-3 rounded-2xl px-4 text-sm font-medium transition ${
                      active
                        ? 'bg-amber-50 text-stone-950 shadow-[inset_0_0_0_1px_rgba(217,119,6,0.22)]'
                        : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
                    }`}
                  >
                    <Icon size={18} />
                    <span>{item.label}</span>
                  </Link>
                )
              })}
            </nav>

            <div className="mt-5 rounded-2xl border border-stone-200 bg-stone-50 p-4">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-stone-500">운영 팁</p>
              <p className="mt-2 text-sm leading-6 text-stone-600">
                제품은 먼저 저장하고 사진을 올리면 휴대폰과 PC 모두 훨씬 덜 복잡합니다.
              </p>
            </div>

            <div className="mt-5 border-t border-stone-200 pt-5">
              <AdminLogoutButton />
            </div>
          </div>
        </aside>

        <main className="min-w-0">
          <div className="mb-4 rounded-3xl border border-stone-200/80 bg-white/80 px-5 py-4 shadow-[0_20px_60px_-36px_rgba(28,25,23,0.4)] backdrop-blur lg:hidden">
            <p className="text-sm leading-6 text-stone-600">{currentRoute.description}</p>
          </div>
          <div className="rounded-[32px] border border-stone-200/80 bg-white/94 p-4 shadow-[0_30px_90px_-42px_rgba(28,25,23,0.35)] backdrop-blur sm:p-6 lg:p-8">
            {children}
          </div>
        </main>
      </div>

      <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-stone-200 bg-white/95 px-2 py-2 backdrop-blur lg:hidden">
        <div className="grid grid-cols-4 gap-2">
          {mobileNavItems.map((item) => {
            const Icon = item.icon
            const active = isActive(pathname, item.href)

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex min-h-[60px] flex-col items-center justify-center rounded-2xl text-xs font-medium transition ${
                  active
                    ? 'bg-stone-900 text-white'
                    : 'text-stone-500 active:bg-stone-100'
                }`}
              >
                <Icon size={18} />
                <span className="mt-1">{item.label}</span>
              </Link>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
