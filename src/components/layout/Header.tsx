'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'

const navigation = [
  { name: '브랜드', href: '/about', eyebrow: 'Maison', note: '브랜드 스토리와 결' },
  { name: '제품', href: '/products', eyebrow: 'Collection', note: '대표 라인업과 분위기' },
  { name: '거래안내', href: '/trade', eyebrow: 'Trade', note: '도매 상담과 진행 절차' },
  { name: '오시는길', href: '/location', eyebrow: 'Visit', note: '종로 쇼룸 방문 안내' },
  { name: 'FAQ', href: '/faq', eyebrow: 'Guide', note: '자주 묻는 문의 정리' },
]

export default function Header() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const isHome = pathname === '/'
  const isHomeTop = isHome && !isScrolled
  const isHomeMenuTone = isHome && (isHomeTop || mobileMenuOpen)

  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!isHome) {
      setIsScrolled(false)
      return
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 28)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [isHome])

  useEffect(() => {
    if (!mobileMenuOpen) {
      document.body.style.removeProperty('overflow')
      return
    }

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = originalOverflow
    }
  }, [mobileMenuOpen])

  if (pathname.startsWith('/admin') || pathname === '/') {
    return null
  }

  return (
    <>
      <header
        data-site-header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 h-[72px] transition-all duration-500',
          isHome && 'md:hidden',
          isHome
            ? mobileMenuOpen
              ? 'border-b border-white/10 bg-black/20 backdrop-blur-xl'
              : isHomeTop
                ? 'border-b border-transparent bg-transparent'
                : 'border-b border-border bg-bg-primary/92 backdrop-blur-md'
            : 'border-b border-border bg-bg-primary'
        )}
      >
        <div className="h-full max-w-content mx-auto px-6 lg:px-12 flex items-center justify-between">
          <Link
            href="/"
            className={cn(
              'font-display text-xl tracking-wide transition-colors',
              isHomeMenuTone
                ? 'text-white [text-shadow:0_2px_14px_rgba(0,0,0,0.35)] hover:text-white/80'
                : 'text-text-default hover:text-accent'
            )}
          >
            Ju Jewelry
          </Link>

          <nav className="hidden md:flex items-center gap-10">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-[13px] font-medium text-text-muted hover:text-text-default transition-colors tracking-wide"
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="/contact"
              className="px-6 py-3 bg-text-default text-white text-[13px] font-medium hover:bg-neutral-800 transition-colors"
            >
              상담 요청
            </Link>
          </nav>

          <button
            type="button"
            aria-expanded={mobileMenuOpen}
            className={cn(
              'md:hidden -mr-2 p-2 transition-colors',
              isHomeMenuTone
                ? 'text-white [text-shadow:0_2px_14px_rgba(0,0,0,0.35)] hover:text-white/80'
                : 'text-text-muted hover:text-text-default'
            )}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      <div
        data-site-header-overlay
        className={cn(
          'fixed inset-0 z-40 md:hidden transition-all duration-500',
          mobileMenuOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        )}
      >
        <button
          type="button"
          aria-label="메뉴 닫기"
          className="absolute inset-0"
          onClick={() => setMobileMenuOpen(false)}
        />
        <div
          className={cn(
            'absolute inset-x-0 bottom-0 top-[72px] overflow-hidden transition-all duration-500',
            mobileMenuOpen ? 'translate-y-0' : 'translate-y-3'
          )}
        >
          <div
            className={cn(
              'absolute inset-0',
              isHome
                ? 'bg-stone-950/82 backdrop-blur-2xl'
                : 'bg-bg-primary/96 backdrop-blur-2xl'
            )}
          />
          <div
            className={cn(
              'absolute inset-0',
              isHome
                ? 'bg-[radial-gradient(circle_at_top,rgba(160,140,91,0.24),transparent_34%),linear-gradient(180deg,rgba(28,22,18,0.08)_0%,rgba(12,10,8,0.18)_100%)]'
                : 'bg-[radial-gradient(circle_at_top,rgba(160,140,91,0.12),transparent_30%)]'
            )}
          />

          <nav className="relative flex h-full flex-col justify-between px-6 pb-[calc(env(safe-area-inset-bottom,0px)+1.5rem)] pt-5">
            <div>
              <div
                className={cn(
                  'h-px w-10',
                  isHome ? 'bg-[#c8ad73]/70' : 'bg-accent/70'
                )}
              />
              <p
                className={cn(
                  'mt-4 text-[10px] uppercase tracking-[0.34em]',
                  isHome ? 'text-[#c8ad73]' : 'text-accent'
                )}
              >
                Explore
              </p>

              <div className="mt-6">
                {navigation.map((item, index) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      'flex items-center justify-between gap-4 border-t py-4 transition-colors last:border-b',
                      isHome ? 'border-white/10 hover:bg-white/[0.03]' : 'border-border/60 hover:bg-black/[0.02]'
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <div className="min-w-0">
                      <p
                        className={cn(
                          'text-[10px] uppercase tracking-[0.28em]',
                          isHome ? 'text-white/40' : 'text-text-subtle'
                        )}
                      >
                        {item.eyebrow}
                      </p>
                      <span
                        className={cn(
                          'mt-2 block font-display text-[2rem] leading-none tracking-[0.01em]',
                          isHome ? 'text-white' : 'text-text-default'
                        )}
                      >
                        {item.name}
                      </span>
                    </div>
                    <span
                      className={cn(
                        'text-[10px] tracking-[0.34em]',
                        isHome ? 'text-white/26' : 'text-text-subtle'
                      )}
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="pt-5">
              <p
                className={cn(
                  'text-[10px] uppercase tracking-[0.3em]',
                  isHome ? 'text-white/38' : 'text-text-subtle'
                )}
              >
                Private Consultation
              </p>
              <div className="mt-3 grid grid-cols-2 gap-3">
                <Link
                  href="/contact"
                  className={cn(
                    'flex min-h-[52px] items-center justify-center rounded-full px-4 text-[13px] font-medium transition-colors',
                    isHome
                      ? 'bg-white text-text-default hover:bg-[#f4ede1]'
                      : 'bg-text-default text-white hover:bg-neutral-800'
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  상담 예약
                </Link>
                <Link
                  href="/products"
                  className={cn(
                    'flex min-h-[52px] items-center justify-center rounded-full border px-4 text-[13px] font-medium transition-colors',
                    isHome
                      ? 'border-[#c8ad73]/35 text-white hover:border-[#c8ad73]/60 hover:bg-white/[0.05]'
                      : 'border-border text-text-default hover:bg-bg-secondary'
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  컬렉션
                </Link>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </>
  )
}
