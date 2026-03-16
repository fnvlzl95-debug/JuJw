'use client'

import { useState } from 'react'

const interestOptions = [
  { value: '', label: '선택해 주세요' },
  { value: 'rings', label: '반지' },
  { value: 'necklaces', label: '목걸이' },
  { value: 'earrings', label: '귀걸이' },
  { value: 'bracelets', label: '팔찌' },
  { value: 'custom', label: '맞춤 제작' },
  { value: 'catalog', label: '카탈로그 요청' },
  { value: 'other', label: '기타' },
]

interface ContactFormProps {
  initialInterest?: string
  contactResponseTime: string
}

export default function ContactForm({
  initialInterest = '',
  contactResponseTime,
}: ContactFormProps) {
  const [formData, setFormData] = useState({
    companyName: '',
    phone: '',
    interest: initialInterest,
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitting(true)
    setError(null)
    setSuccess(null)

    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = (await response.json()) as {
        ok: boolean
        message?: string
      }

      if (!response.ok || !result.ok) {
        throw new Error(result.message || '문의 접수에 실패했습니다.')
      }

      setSuccess('상담 요청이 접수되었습니다. 확인 후 빠르게 연락드리겠습니다.')
      setFormData({
        companyName: '',
        phone: '',
        interest: initialInterest,
        message: '',
      })
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : '문의 접수 중 오류가 발생했습니다.'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-[13px] font-medium text-text-muted mb-2 tracking-wide">
          상호 / 성함 *
        </label>
        <input
          type="text"
          required
          value={formData.companyName}
          onChange={(event) =>
            setFormData((current) => ({
              ...current,
              companyName: event.target.value,
            }))
          }
          placeholder="상호 또는 성함을 입력해 주세요"
          className="w-full px-4 py-4 text-[15px] bg-bg-primary border border-border text-text-default placeholder:text-text-subtle focus:outline-none focus:border-accent transition-colors"
        />
      </div>

      <div>
        <label className="block text-[13px] font-medium text-text-muted mb-2 tracking-wide">
          연락처 *
        </label>
        <input
          type="tel"
          required
          value={formData.phone}
          onChange={(event) =>
            setFormData((current) => ({
              ...current,
              phone: event.target.value,
            }))
          }
          placeholder="연락 가능한 번호를 입력해 주세요"
          className="w-full px-4 py-4 text-[15px] bg-bg-primary border border-border text-text-default placeholder:text-text-subtle focus:outline-none focus:border-accent transition-colors"
        />
      </div>

      <div>
        <label className="block text-[13px] font-medium text-text-muted mb-2 tracking-wide">
          관심 품목
        </label>
        <select
          value={formData.interest}
          onChange={(event) =>
            setFormData((current) => ({
              ...current,
              interest: event.target.value,
            }))
          }
          className="w-full px-4 py-4 text-[15px] bg-bg-primary border border-border text-text-default focus:outline-none focus:border-accent transition-colors cursor-pointer"
        >
          {interestOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-[13px] font-medium text-text-muted mb-2 tracking-wide">
          문의 내용
        </label>
        <textarea
          value={formData.message}
          onChange={(event) =>
            setFormData((current) => ({
              ...current,
              message: event.target.value,
            }))
          }
          placeholder="문의 내용을 입력해 주세요"
          rows={5}
          className="w-full px-4 py-4 text-[15px] bg-bg-primary border border-border text-text-default placeholder:text-text-subtle focus:outline-none focus:border-accent transition-colors resize-none"
        />
      </div>

      {error ? <p className="text-[13px] text-red-600">{error}</p> : null}
      {success ? <p className="text-[13px] text-emerald-700">{success}</p> : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-4 bg-text-default text-white text-[14px] font-medium hover:bg-neutral-800 transition-colors disabled:opacity-60"
      >
        {isSubmitting ? '접수 중...' : '상담 요청'}
      </button>

      <p className="text-center text-[13px] text-text-muted">{contactResponseTime}</p>
    </form>
  )
}
