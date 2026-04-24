'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function AdminLogoutButton({ variant = 'light' }: { variant?: 'light' | 'dark' }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleLogout = async () => {
    setIsLoading(true)
    try {
      await fetch('/api/admin/login', { method: 'DELETE' })
      router.replace('/admin/login')
      router.refresh()
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={isLoading}
      className={`inline-flex min-h-[48px] w-full items-center justify-center rounded-2xl border px-4 text-sm font-semibold transition active:translate-y-px disabled:opacity-60 ${
        variant === 'dark'
          ? 'border-white/10 text-white/75 hover:bg-white/10 hover:text-white'
          : 'border-stone-300 text-stone-700 hover:bg-stone-100'
      }`}
    >
      {isLoading ? '처리 중...' : '로그아웃'}
    </button>
  )
}
