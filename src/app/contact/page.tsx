'use client'

import { useEffect, useState } from 'react'
import { DEFAULT_SITE_SETTINGS, normalizeSiteSettings, type SiteSettings } from '@/lib/site-settings'

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

type InquiryForm = {
  companyName: string
  phone: string
  interest: string
  message: string
  website: string
  privacyConsent: boolean
}

const initialForm: InquiryForm = {
  companyName: '',
  phone: '',
  interest: '',
  message: '',
  website: '',
  privacyConsent: false,
}

export default function ContactPage() {
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SITE_SETTINGS)
  const [formData, setFormData] = useState<InquiryForm>(initialForm)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    const loadSettings = async () => {
      const response = await fetch('/api/settings', { cache: 'no-store' })
      if (!response.ok) {
        return
      }

      const payload = (await response.json()) as { settings?: Record<string, string> }
      setSettings(normalizeSiteSettings(payload.settings))
    }

    void loadSettings()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!formData.privacyConsent) {
      setError('개인정보 수집 및 이용에 동의해 주세요.')
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const payload = (await response.json()) as { error?: string }
      if (!response.ok) {
        throw new Error(payload.error || '상담 요청 저장에 실패했습니다.')
      }

      setFormData(initialForm)
      setSuccess('상담 요청이 접수되었습니다. 영업일 기준 24시간 내 연락드리겠습니다.')
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : '문의 접수 중 오류가 발생했습니다.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    { label: 'Phone', value: [settings.phonePrimary, settings.phoneSecondary].filter(Boolean).join(' / ') },
    { label: 'Email', value: settings.email },
    { label: 'Address', value: settings.address },
    { label: 'Hours', value: [settings.businessHours, settings.closedDay].filter(Boolean).join(' / ') },
  ].filter((item) => item.value)

  return (
    <div className="min-h-screen bg-white">
      <section className="public-hero bg-stone-50 px-4 sm:px-6 md:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <p
            className="mb-4 text-[9px] font-light uppercase tracking-[0.25em] text-amber-600/70 sm:mb-6 sm:text-[10px] sm:tracking-[0.3em]"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Contact
          </p>
          <h1
            className="mb-4 text-4xl font-light italic tracking-tight text-stone-900 sm:mb-6 sm:text-5xl md:text-6xl lg:text-7xl"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            상담 문의
          </h1>
          <div className="mx-auto mb-6 mt-6 h-[1px] w-12 bg-amber-500/30 sm:mb-8 sm:mt-8 sm:w-16" />
          <p className="mx-auto max-w-[520px] px-4 text-xs font-light leading-relaxed text-stone-600 sm:text-sm md:text-base">
            문의 사항을 남겨주시면 빠르게 연락드리겠습니다.
          </p>
        </div>
      </section>

      <section className="bg-white px-4 py-12 sm:px-6 sm:py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="flex flex-col justify-center">
              <h2
                className="mb-8 text-2xl font-light italic tracking-tight text-stone-900 sm:text-3xl md:text-4xl"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                연락처 안내
              </h2>

              <div className="mb-10 space-y-8">
                {contactInfo.map((item) => (
                  <div key={item.label}>
                    <p
                      className="mb-2 text-[10px] font-light uppercase tracking-[0.2em] text-amber-600/70"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      {item.label}
                    </p>
                    <p className="text-sm font-light leading-relaxed text-stone-900 sm:text-base md:text-lg">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border border-stone-200 bg-stone-50 p-6 md:p-8">
                <p className="text-sm font-light leading-relaxed text-stone-600">
                  영업시간 내 문의 주시면 당일 연락드리며, 영업시간 외 문의는 다음 영업일에 순차적으로 연락드립니다.
                </p>
              </div>
            </div>

            <div>
              <h2
                className="mb-8 text-2xl font-light italic tracking-tight text-stone-900 sm:text-3xl md:text-4xl"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                상담 요청 폼
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
                <input
                  type="text"
                  value={formData.website}
                  onChange={(e) => setFormData((prev) => ({ ...prev, website: e.target.value }))}
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div>
                  <label
                    className="mb-3 block text-[10px] font-light uppercase tracking-[0.2em] text-stone-500"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.companyName}
                    onChange={(e) => setFormData((prev) => ({ ...prev, companyName: e.target.value }))}
                    placeholder="상호 또는 성함을 입력해 주세요"
                    className="min-h-[52px] w-full border-b border-stone-300 bg-transparent px-0 py-4 text-base font-light text-stone-900 placeholder:text-stone-400 focus:border-amber-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label
                    className="mb-3 block text-[10px] font-light uppercase tracking-[0.2em] text-stone-500"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                    placeholder="연락 가능한 번호를 입력해 주세요"
                    className="min-h-[52px] w-full border-b border-stone-300 bg-transparent px-0 py-4 text-base font-light text-stone-900 placeholder:text-stone-400 focus:border-amber-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label
                    className="mb-3 block text-[10px] font-light uppercase tracking-[0.2em] text-stone-500"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    Interest
                  </label>
                  <select
                    value={formData.interest}
                    onChange={(e) => setFormData((prev) => ({ ...prev, interest: e.target.value }))}
                    className="min-h-[52px] w-full cursor-pointer border-b border-stone-300 bg-transparent px-0 py-4 text-base font-light text-stone-900 focus:border-amber-600 focus:outline-none"
                  >
                    {interestOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    className="mb-3 block text-[10px] font-light uppercase tracking-[0.2em] text-stone-500"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    Message
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                    placeholder="문의 내용을 입력해 주세요"
                    rows={5}
                    className="w-full resize-none border-b border-stone-300 bg-transparent px-0 py-4 text-base font-light text-stone-900 placeholder:text-stone-400 focus:border-amber-600 focus:outline-none"
                  />
                </div>

                <label className="flex items-start gap-3 rounded-lg border border-stone-200 bg-stone-50 p-4 text-sm font-light leading-relaxed text-stone-600">
                  <input
                    type="checkbox"
                    checked={formData.privacyConsent}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, privacyConsent: e.target.checked }))
                    }
                    className="mt-0.5 h-5 w-5 shrink-0"
                  />
                  <span>
                    상담 요청 처리를 위해 개인정보 수집 및 이용에 동의합니다. 자세한 내용은 개인정보처리방침을 확인해 주세요.
                  </span>
                </label>

                {error ? (
                  <p className="rounded-md bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
                ) : null}

                {success ? (
                  <p className="rounded-md bg-green-50 px-4 py-3 text-sm text-green-700">
                    {success}
                  </p>
                ) : null}

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="min-h-[52px] w-full rounded-md bg-stone-900 px-6 py-4 text-[11px] font-medium uppercase tracking-[0.2em] text-white transition-all duration-300 hover:bg-amber-600 disabled:opacity-60"
                  >
                    {isSubmitting ? '접수 중...' : '상담 요청'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-stone-50 px-4 py-12 sm:px-6 sm:py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h2
            className="mb-6 text-2xl font-light italic tracking-tight text-stone-900 sm:text-3xl md:text-4xl lg:text-5xl"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            방문 예약
          </h2>
          <p className="mx-auto mb-10 max-w-xl px-4 text-xs font-light leading-relaxed text-stone-600 sm:text-sm md:text-base">
            매장 방문을 원하시는 경우 사전 예약을 부탁드립니다. 예약 시 더욱 세심한 상담이 가능합니다.
          </p>
          <div className="mx-auto flex max-w-md flex-col gap-4 sm:max-w-none sm:flex-row sm:justify-center sm:gap-6">
            <a
              href={`tel:${settings.phonePrimary.replace(/\s+/g, '')}`}
              className="inline-flex min-h-[52px] items-center justify-center rounded-md bg-stone-900 px-8 py-4 text-[11px] font-medium uppercase tracking-[0.2em] text-white transition-all duration-300 hover:bg-amber-600"
            >
              전화 예약
            </a>
            <a
              href={`mailto:${settings.email}`}
              className="inline-flex min-h-[52px] items-center justify-center rounded-md border border-stone-300 px-8 py-4 text-[11px] font-medium uppercase tracking-[0.2em] text-stone-900 transition-all duration-300 hover:border-amber-600 hover:text-amber-600"
            >
              이메일 문의
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
