'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function AdminLogoutButton() {
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
      className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-stone-300 px-4 text-sm font-medium text-stone-700 transition hover:bg-stone-100 disabled:opacity-60"
    >
      {isLoading ? '처리 중...' : '로그아웃'}
    </button>
  )
}
