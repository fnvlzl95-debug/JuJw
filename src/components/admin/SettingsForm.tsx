'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import type { SiteSettings } from '@/types/site'

interface SettingsFormProps {
  initialSettings: SiteSettings
}

export default function SettingsForm({
  initialSettings,
}: SettingsFormProps) {
  const router = useRouter()
  const [settings, setSettings] = useState(initialSettings)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitting(true)
    setMessage(null)
    setError(null)

    try {
      const response = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(settings),
      })

      const result = (await response.json()) as {
        ok: boolean
        message?: string
      }

      if (!response.ok || !result.ok) {
        throw new Error(result.message || '설정 저장에 실패했습니다.')
      }

      setMessage('설정을 저장했습니다.')
      router.refresh()
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : '설정 저장에 실패했습니다.'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  function updateField<K extends keyof SiteSettings>(key: K, value: SiteSettings[K]) {
    setSettings((current) => ({
      ...current,
      [key]: value,
    }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-[13px] text-text-muted mb-2">사이트명</label>
          <input
            type="text"
            value={settings.siteName}
            onChange={(event) => updateField('siteName', event.target.value)}
            className="w-full px-4 py-3 border border-border bg-bg-primary text-[14px] text-text-default focus:outline-none focus:border-accent"
          />
        </div>
        <div>
          <label className="block text-[13px] text-text-muted mb-2">사이트 URL</label>
          <input
            type="url"
            value={settings.siteUrl}
            onChange={(event) => updateField('siteUrl', event.target.value)}
            className="w-full px-4 py-3 border border-border bg-bg-primary text-[14px] text-text-default focus:outline-none focus:border-accent"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-[13px] text-text-muted mb-2">히어로 제목</label>
          <input
            type="text"
            value={settings.heroTitle}
            onChange={(event) => updateField('heroTitle', event.target.value)}
            className="w-full px-4 py-3 border border-border bg-bg-primary text-[14px] text-text-default focus:outline-none focus:border-accent"
          />
        </div>
        <div>
          <label className="block text-[13px] text-text-muted mb-2">히어로 서브타이틀</label>
          <input
            type="text"
            value={settings.heroSubtitle}
            onChange={(event) => updateField('heroSubtitle', event.target.value)}
            className="w-full px-4 py-3 border border-border bg-bg-primary text-[14px] text-text-default focus:outline-none focus:border-accent"
          />
        </div>
      </div>

      <div>
        <label className="block text-[13px] text-text-muted mb-2">히어로 설명</label>
        <textarea
          rows={3}
          value={settings.heroDescription}
          onChange={(event) => updateField('heroDescription', event.target.value)}
          className="w-full px-4 py-3 border border-border bg-bg-primary text-[14px] text-text-default focus:outline-none focus:border-accent resize-none"
        />
      </div>

      <div>
        <label className="block text-[13px] text-text-muted mb-2">브랜드 소개 문구</label>
        <textarea
          rows={3}
          value={settings.intro}
          onChange={(event) => updateField('intro', event.target.value)}
          className="w-full px-4 py-3 border border-border bg-bg-primary text-[14px] text-text-default focus:outline-none focus:border-accent resize-none"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-[13px] text-text-muted mb-2">전화번호</label>
          <input
            type="text"
            value={settings.phone}
            onChange={(event) => updateField('phone', event.target.value)}
            className="w-full px-4 py-3 border border-border bg-bg-primary text-[14px] text-text-default focus:outline-none focus:border-accent"
          />
        </div>
        <div>
          <label className="block text-[13px] text-text-muted mb-2">이메일</label>
          <input
            type="email"
            value={settings.email}
            onChange={(event) => updateField('email', event.target.value)}
            className="w-full px-4 py-3 border border-border bg-bg-primary text-[14px] text-text-default focus:outline-none focus:border-accent"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-[13px] text-text-muted mb-2">주소 1</label>
          <input
            type="text"
            value={settings.addressLine1}
            onChange={(event) => updateField('addressLine1', event.target.value)}
            className="w-full px-4 py-3 border border-border bg-bg-primary text-[14px] text-text-default focus:outline-none focus:border-accent"
          />
        </div>
        <div>
          <label className="block text-[13px] text-text-muted mb-2">주소 2</label>
          <input
            type="text"
            value={settings.addressLine2}
            onChange={(event) => updateField('addressLine2', event.target.value)}
            className="w-full px-4 py-3 border border-border bg-bg-primary text-[14px] text-text-default focus:outline-none focus:border-accent"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <label className="block text-[13px] text-text-muted mb-2">우편번호</label>
          <input
            type="text"
            value={settings.postalCode}
            onChange={(event) => updateField('postalCode', event.target.value)}
            className="w-full px-4 py-3 border border-border bg-bg-primary text-[14px] text-text-default focus:outline-none focus:border-accent"
          />
        </div>
        <div>
          <label className="block text-[13px] text-text-muted mb-2">평일 운영시간</label>
          <input
            type="text"
            value={settings.hoursWeekday}
            onChange={(event) => updateField('hoursWeekday', event.target.value)}
            className="w-full px-4 py-3 border border-border bg-bg-primary text-[14px] text-text-default focus:outline-none focus:border-accent"
          />
        </div>
        <div>
          <label className="block text-[13px] text-text-muted mb-2">주말/공휴일</label>
          <input
            type="text"
            value={settings.hoursWeekend}
            onChange={(event) => updateField('hoursWeekend', event.target.value)}
            className="w-full px-4 py-3 border border-border bg-bg-primary text-[14px] text-text-default focus:outline-none focus:border-accent"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <label className="block text-[13px] text-text-muted mb-2">상호</label>
          <input
            type="text"
            value={settings.businessName}
            onChange={(event) => updateField('businessName', event.target.value)}
            className="w-full px-4 py-3 border border-border bg-bg-primary text-[14px] text-text-default focus:outline-none focus:border-accent"
          />
        </div>
        <div>
          <label className="block text-[13px] text-text-muted mb-2">대표자명</label>
          <input
            type="text"
            value={settings.representativeName}
            onChange={(event) => updateField('representativeName', event.target.value)}
            className="w-full px-4 py-3 border border-border bg-bg-primary text-[14px] text-text-default focus:outline-none focus:border-accent"
          />
        </div>
        <div>
          <label className="block text-[13px] text-text-muted mb-2">사업자등록번호</label>
          <input
            type="text"
            value={settings.businessNumber}
            onChange={(event) => updateField('businessNumber', event.target.value)}
            className="w-full px-4 py-3 border border-border bg-bg-primary text-[14px] text-text-default focus:outline-none focus:border-accent"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-[13px] text-text-muted mb-2">지도 임베드 URL</label>
          <input
            type="url"
            value={settings.mapEmbedUrl}
            onChange={(event) => updateField('mapEmbedUrl', event.target.value)}
            className="w-full px-4 py-3 border border-border bg-bg-primary text-[14px] text-text-default focus:outline-none focus:border-accent"
          />
        </div>
        <div>
          <label className="block text-[13px] text-text-muted mb-2">네이버 지도 URL</label>
          <input
            type="url"
            value={settings.naverMapUrl}
            onChange={(event) => updateField('naverMapUrl', event.target.value)}
            className="w-full px-4 py-3 border border-border bg-bg-primary text-[14px] text-text-default focus:outline-none focus:border-accent"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-[13px] text-text-muted mb-2">주차 안내</label>
          <input
            type="text"
            value={settings.parking}
            onChange={(event) => updateField('parking', event.target.value)}
            className="w-full px-4 py-3 border border-border bg-bg-primary text-[14px] text-text-default focus:outline-none focus:border-accent"
          />
        </div>
        <div>
          <label className="block text-[13px] text-text-muted mb-2">응답 안내 문구</label>
          <input
            type="text"
            value={settings.contactResponseTime}
            onChange={(event) => updateField('contactResponseTime', event.target.value)}
            className="w-full px-4 py-3 border border-border bg-bg-primary text-[14px] text-text-default focus:outline-none focus:border-accent"
          />
        </div>
      </div>

      <div>
        <label className="block text-[13px] text-text-muted mb-2">푸터 메모</label>
        <textarea
          rows={3}
          value={settings.footerNote}
          onChange={(event) => updateField('footerNote', event.target.value)}
          className="w-full px-4 py-3 border border-border bg-bg-primary text-[14px] text-text-default focus:outline-none focus:border-accent resize-none"
        />
      </div>

      {error ? <p className="text-[13px] text-red-600">{error}</p> : null}
      {message ? <p className="text-[13px] text-emerald-700">{message}</p> : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="px-8 py-4 bg-text-default text-white text-[14px] font-medium hover:bg-neutral-800 transition-colors disabled:opacity-60"
      >
        {isSubmitting ? '저장 중...' : '설정 저장'}
      </button>
    </form>
  )
}
