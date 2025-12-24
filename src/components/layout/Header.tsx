'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'

const navigation = [
  { name: '브랜드', href: '/about' },
  { name: '제품', href: '/products' },
  { name: '거래안내', href: '/trade' },
  { name: '오시는길', href: '/location' },
  { name: 'FAQ', href: '/faq' },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-[72px] bg-bg-primary border-b border-border">
      <div className="h-full max-w-content mx-auto px-6 lg:px-12 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="font-display text-xl tracking-wide text-text-default hover:text-accent transition-colors"
        >
          Ju Jewelry
        </Link>

        {/* Desktop Navigation */}
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

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="md:hidden p-2 -mr-2 text-text-muted hover:text-text-default transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          'md:hidden fixed inset-x-0 top-[72px] bg-bg-primary border-b border-border transition-all duration-300 overflow-hidden',
          mobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <nav className="flex flex-col py-4 px-6">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="py-3 text-[15px] text-text-muted hover:text-text-default transition-colors border-b border-border/50 last:border-0"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <Link
            href="/contact"
            className="mt-4 py-4 bg-text-default text-white text-center text-[14px] font-medium hover:bg-neutral-800 transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            상담 요청
          </Link>
        </nav>
      </div>
    </header>
  )
}
