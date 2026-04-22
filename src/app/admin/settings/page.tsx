'use client'

export const runtime = 'edge'

import { FormEvent, useEffect, useState } from 'react'

type Settings = Record<string, string>

const GROUPS: Array<{
  title: string
  description: string
  fields: Array<{ key: string; label: string; multiline?: boolean; placeholder?: string }>
}> = [
  {
    title: '매장 정보',
    description: '브랜드명과 사업자 정보를 공개 페이지와 하단 푸터에 같이 씁니다.',
    fields: [
      { key: 'shop_name', label: '브랜드명', placeholder: '예: JU JEWELRY' },
      { key: 'business_name', label: '사업자 상호' },
      { key: 'representative_name', label: '대표자명' },
      { key: 'business_number', label: '사업자등록번호' },
    ],
  },
  {
    title: '연락처',
    description: '전화, 이메일, 주소와 영업시간은 문의 페이지와 위치 페이지에 노출됩니다.',
    fields: [
      { key: 'phone_primary', label: '대표 전화', placeholder: '예: 02-000-0000' },
      { key: 'phone_secondary', label: '보조 전화' },
      { key: 'email', label: '이메일', placeholder: '예: contact@example.com' },
      { key: 'address', label: '주소', multiline: true },
      { key: 'business_hours', label: '영업시간', multiline: true },
      { key: 'closed_day', label: '휴무일' },
    ],
  },
  {
    title: 'SNS / 지도',
    description: '없는 항목은 비워 두면 공개 화면에서 자동으로 숨깁니다.',
    fields: [
      { key: 'naver_map_url', label: '네이버 지도 URL' },
      { key: 'instagram_url', label: '인스타그램 URL' },
      { key: 'facebook_url', label: '페이스북 URL' },
    ],
  },
]

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Settings>({})
  const [isSaving, setIsSaving] = useState(false)
  const [message, setMessage] = useState('')

  const load = async () => {
    const response = await fetch('/api/admin/settings', { cache: 'no-store' })
    if (response.ok) {
      const payload = (await response.json()) as { settings: Settings }
      setSettings(payload.settings ?? {})
    }
  }

  useEffect(() => {
    void load()
  }, [])

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setMessage('')
    setIsSaving(true)

    const response = await fetch('/api/admin/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ settings }),
    })

    if (response.ok) {
      setMessage('저장되었습니다.')
    } else {
      setMessage('저장에 실패했습니다.')
    }

    setIsSaving(false)
  }

  return (
    <div className="space-y-6">
      <section className="rounded-[28px] border border-stone-200 bg-stone-50 p-5 sm:p-6">
        <p className="text-xs uppercase tracking-[0.2em] text-stone-500">Settings</p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-stone-950">매장 정보 설정</h2>
        <p className="mt-2 text-sm leading-6 text-stone-500">
          휴대폰에서도 큰 입력창으로 편하게 수정하고, PC에서는 오른쪽 미리보기로 노출 상태를 같이 확인할 수 있습니다.
        </p>
      </section>

      <form className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]" onSubmit={onSubmit}>
        <div className="space-y-6">
          {GROUPS.map((group) => (
            <section key={group.title} className="rounded-[28px] border border-stone-200 bg-white p-5 shadow-[0_24px_80px_-48px_rgba(28,25,23,0.45)] sm:p-6">
              <h3 className="text-lg font-semibold tracking-tight text-stone-950">{group.title}</h3>
              <p className="mt-2 text-sm leading-6 text-stone-500">{group.description}</p>

              <div className="mt-5 grid gap-4">
                {group.fields.map((field) => (
                  <div key={field.key}>
                    <label className="mb-2 block text-sm font-medium text-stone-700">
                      {field.label}
                    </label>
                    {field.multiline ? (
                      <textarea
                        value={settings[field.key] || ''}
                        onChange={(e) =>
                          setSettings((prev) => ({
                            ...prev,
                            [field.key]: e.target.value,
                          }))
                        }
                        placeholder={field.placeholder}
                        rows={3}
                        className="w-full rounded-2xl border border-stone-300 px-4 py-4 text-base"
                      />
                    ) : (
                      <input
                        value={settings[field.key] || ''}
                        onChange={(e) =>
                          setSettings((prev) => ({
                            ...prev,
                            [field.key]: e.target.value,
                          }))
                        }
                        placeholder={field.placeholder}
                        className="min-h-[56px] w-full rounded-2xl border border-stone-300 px-4 text-base"
                      />
                    )}
                  </div>
                ))}
              </div>
            </section>
          ))}

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="submit"
              disabled={isSaving}
              className="inline-flex min-h-[52px] items-center justify-center rounded-2xl bg-stone-900 px-6 text-sm font-semibold text-white transition hover:bg-stone-700 disabled:opacity-60"
            >
              {isSaving ? '저장 중...' : '설정 저장'}
            </button>
            {message ? (
              <p className={`text-sm ${message.includes('실패') ? 'text-red-600' : 'text-green-600'}`}>
                {message}
              </p>
            ) : null}
          </div>
        </div>

        <aside className="space-y-6">
          <section className="rounded-[28px] border border-stone-200 bg-stone-50 p-5 sm:p-6 xl:sticky xl:top-36">
            <h3 className="text-lg font-semibold tracking-tight text-stone-950">현재 노출 미리보기</h3>
            <div className="mt-5 space-y-4">
              <div className="rounded-2xl bg-white p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-stone-400">브랜드명</p>
                <p className="mt-2 text-lg font-semibold text-stone-950">{settings.shop_name || '-'}</p>
              </div>
              <div className="rounded-2xl bg-white p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-stone-400">연락처</p>
                <div className="mt-2 space-y-1 text-sm leading-6 text-stone-700">
                  <p>{settings.phone_primary || '-'}</p>
                  <p>{settings.phone_secondary || ''}</p>
                  <p>{settings.email || '-'}</p>
                </div>
              </div>
              <div className="rounded-2xl bg-white p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-stone-400">주소 / 영업시간</p>
                <div className="mt-2 space-y-2 text-sm leading-6 text-stone-700">
                  <p className="whitespace-pre-line">{settings.address || '-'}</p>
                  <p className="whitespace-pre-line">{settings.business_hours || '-'}</p>
                  <p>{settings.closed_day || ''}</p>
                </div>
              </div>
              <div className="rounded-2xl bg-white p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-stone-400">사업자 정보</p>
                <div className="mt-2 space-y-1 text-sm leading-6 text-stone-700">
                  <p>{settings.business_name || '-'}</p>
                  <p>{settings.representative_name || '-'}</p>
                  <p>{settings.business_number || '-'}</p>
                </div>
              </div>
            </div>
          </section>
        </aside>
      </form>
    </div>
  )
}
