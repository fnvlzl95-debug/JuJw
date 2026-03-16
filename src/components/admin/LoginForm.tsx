'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function LoginForm() {
  const router = useRouter()
  const [email, setEmail] = useState('admin@jujewelry.kr')
  const [password, setPassword] = useState('admin1234!')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      const result = (await response.json()) as {
        ok: boolean
        message?: string
      }

      if (!response.ok || !result.ok) {
        throw new Error(result.message || '로그인에 실패했습니다.')
      }

      router.push('/admin')
      router.refresh()
    } catch (loginError) {
      setError(loginError instanceof Error ? loginError.message : '로그인에 실패했습니다.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-[13px] font-medium text-text-muted mb-2 tracking-wide">
          이메일
        </label>
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="w-full px-4 py-4 text-[15px] bg-bg-primary border border-border text-text-default focus:outline-none focus:border-accent transition-colors"
        />
      </div>

      <div>
        <label className="block text-[13px] font-medium text-text-muted mb-2 tracking-wide">
          비밀번호
        </label>
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="w-full px-4 py-4 text-[15px] bg-bg-primary border border-border text-text-default focus:outline-none focus:border-accent transition-colors"
        />
      </div>

      {error ? <p className="text-[13px] text-red-600">{error}</p> : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-4 bg-text-default text-white text-[14px] font-medium hover:bg-neutral-800 transition-colors disabled:opacity-60"
      >
        {isSubmitting ? '로그인 중...' : '로그인'}
      </button>
    </form>
  )
}
