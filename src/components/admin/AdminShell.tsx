import Link from 'next/link'

interface AdminShellProps {
  adminName: string
  title: string
  description: string
  children: React.ReactNode
}

const navigation = [
  { href: '/admin', label: '대시보드' },
  { href: '/admin/products', label: '제품 관리' },
  { href: '/admin/inquiries', label: '문의 관리' },
  { href: '/admin/settings', label: '설정' },
]

export default function AdminShell({
  adminName,
  title,
  description,
  children,
}: AdminShellProps) {
  return (
    <div className="min-h-screen bg-bg-secondary pt-[72px]">
      <div className="max-w-content mx-auto px-6 py-10 lg:py-14">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-10">
          <div>
            <p className="text-[12px] uppercase tracking-[0.18em] text-accent mb-3">
              Admin Console
            </p>
            <h1 className="font-serif text-3xl font-light text-text-default mb-3">
              {title}
            </h1>
            <p className="text-[15px] text-text-muted">{description}</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-4 py-2 bg-white border border-border text-[13px] text-text-muted">
              {adminName}
            </span>
            <form action="/api/admin/logout" method="post">
              <button
                type="submit"
                className="px-4 py-2 bg-text-default text-white text-[13px] font-medium hover:bg-neutral-800 transition-colors"
              >
                로그아웃
              </button>
            </form>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mb-10">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-4 py-2 border border-border bg-white text-[13px] text-text-muted hover:text-text-default hover:border-text-default transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {children}
      </div>
    </div>
  )
}
