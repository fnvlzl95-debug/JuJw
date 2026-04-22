'use client'

export const runtime = 'edge'

import { PhoneCall } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'

type Inquiry = {
  id: number
  companyName: string
  phone: string
  interest: string | null
  message: string | null
  status: 'pending' | 'contacted' | 'completed'
  createdAt: string
}

const STATUS_OPTIONS: Array<{ value: Inquiry['status']; label: string }> = [
  { value: 'pending', label: '대기' },
  { value: 'contacted', label: '연락' },
  { value: 'completed', label: '완료' },
]

const STATUS_PRIORITY: Record<Inquiry['status'], number> = {
  pending: 0,
  contacted: 1,
  completed: 2,
}

const STATUS_STYLE: Record<string, string> = {
  pending: 'border-amber-300 bg-amber-50 text-amber-900',
  contacted: 'border-blue-200 bg-blue-50 text-blue-800',
  completed: 'border-emerald-200 bg-emerald-50 text-emerald-800',
}

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [updatingId, setUpdatingId] = useState<number | null>(null)

  const load = async () => {
    const response = await fetch('/api/admin/inquiries', { cache: 'no-store' })
    if (response.ok) {
      const payload = (await response.json()) as { inquiries: Inquiry[] }
      setInquiries(payload.inquiries ?? [])
    }
    setIsLoading(false)
  }

  useEffect(() => {
    void load()
  }, [])

  const updateStatus = async (id: number, status: Inquiry['status']) => {
    setUpdatingId(id)

    try {
      const response = await fetch(`/api/admin/inquiries/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })

      if (response.ok) {
        await load()
      }
    } finally {
      setUpdatingId(null)
    }
  }

  const sortedInquiries = useMemo(
    () =>
      [...inquiries].sort(
        (a, b) =>
          STATUS_PRIORITY[a.status] - STATUS_PRIORITY[b.status] ||
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      ),
    [inquiries]
  )

  const pendingCount = inquiries.filter((item) => item.status === 'pending').length
  const completedCount = inquiries.filter((item) => item.status === 'completed').length

  return (
    <div className="space-y-6">
      <section className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-[24px] border border-stone-200 bg-stone-50 p-4">
          <p className="text-xs uppercase tracking-[0.18em] text-stone-500">전체 문의</p>
          <p className="mt-3 text-3xl font-semibold tracking-tight text-stone-950">{inquiries.length}</p>
        </div>
        <div className="rounded-[24px] border border-amber-300 bg-amber-50 p-4">
          <p className="text-xs uppercase tracking-[0.18em] text-stone-500">바로 연락</p>
          <p className="mt-3 text-3xl font-semibold tracking-tight text-stone-950">{pendingCount}</p>
        </div>
        <div className="rounded-[24px] border border-stone-200 bg-stone-50 p-4">
          <p className="text-xs uppercase tracking-[0.18em] text-stone-500">완료</p>
          <p className="mt-3 text-3xl font-semibold tracking-tight text-stone-950">{completedCount}</p>
        </div>
      </section>

      {isLoading ? (
        <p className="text-sm text-stone-500">불러오는 중...</p>
      ) : sortedInquiries.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-stone-300 p-5 text-sm text-stone-500">
          접수된 문의가 없습니다.
        </p>
      ) : (
        <div className="grid gap-4 xl:grid-cols-2">
          {sortedInquiries.map((inquiry) => (
            <article
              key={inquiry.id}
              className="rounded-[28px] border border-stone-200 bg-stone-50 p-4 shadow-[0_24px_80px_-54px_rgba(28,25,23,0.5)] sm:p-5"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-lg font-semibold tracking-tight text-stone-950">
                      {inquiry.companyName}
                    </p>
                    {inquiry.interest ? (
                      <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-stone-500">
                        {inquiry.interest}
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-2 text-sm text-stone-400">
                    {new Date(inquiry.createdAt).toLocaleString('ko-KR')}
                  </p>
                </div>
                <span className={`inline-flex min-h-[36px] items-center rounded-full border px-3 text-sm font-semibold ${STATUS_STYLE[inquiry.status] || ''}`}>
                  {STATUS_OPTIONS.find((option) => option.value === inquiry.status)?.label || inquiry.status}
                </span>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_auto]">
                <a
                  href={`tel:${inquiry.phone}`}
                  className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-2xl bg-stone-900 px-4 text-sm font-semibold text-white transition hover:bg-stone-700"
                >
                  <PhoneCall size={18} />
                  {inquiry.phone}
                </a>
                <div className="grid grid-cols-3 gap-2">
                  {STATUS_OPTIONS.map((option) => {
                    const active = inquiry.status === option.value
                    return (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => void updateStatus(inquiry.id, option.value)}
                        disabled={updatingId === inquiry.id}
                        className={`min-h-[52px] rounded-2xl px-3 text-sm font-semibold transition ${
                          active
                            ? 'bg-stone-900 text-white'
                            : 'border border-stone-300 bg-white text-stone-700 hover:bg-stone-100'
                        } disabled:opacity-60`}
                      >
                        {option.label}
                      </button>
                    )
                  })}
                </div>
              </div>

              {inquiry.message ? (
                <div className="mt-4 rounded-2xl bg-white p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-stone-400">문의 내용</p>
                  <p className="mt-3 whitespace-pre-line text-sm leading-7 text-stone-700">{inquiry.message}</p>
                </div>
              ) : null}
            </article>
          ))}
        </div>
      )}
    </div>
  )
}
