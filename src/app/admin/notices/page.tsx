'use client'

export const runtime = 'edge'

import { FormEvent, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

type Notice = {
  id: number
  title: string
  content: string
  isPublished: boolean
  isPinned: boolean
  createdAt: string
}

type FormState = {
  title: string
  content: string
  isPublished: boolean
  isPinned: boolean
}

const initialForm: FormState = {
  title: '',
  content: '',
  isPublished: true,
  isPinned: false,
}

export default function AdminNoticesPage() {
  const searchParams = useSearchParams()
  const [notices, setNotices] = useState<Notice[]>([])
  const [form, setForm] = useState<FormState>(initialForm)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [error, setError] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const load = async () => {
    const response = await fetch('/api/admin/notices', { cache: 'no-store' })
    if (response.ok) {
      const payload = (await response.json()) as { notices: Notice[] }
      setNotices(payload.notices ?? [])
    }
  }

  useEffect(() => {
    void load()
  }, [])

  useEffect(() => {
    if (searchParams.get('new') === '1') {
      setShowForm(true)
    }
  }, [searchParams])

  const resetForm = () => {
    setEditingId(null)
    setForm(initialForm)
    setError('')
    setShowForm(false)
    setIsSaving(false)
  }

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')

    if (!form.title.trim() || !form.content.trim()) {
      setError('제목과 내용은 필수입니다.')
      return
    }

    setIsSaving(true)

    try {
      const method = editingId ? 'PUT' : 'POST'
      const url = editingId ? `/api/admin/notices/${editingId}` : '/api/admin/notices'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (!response.ok) {
        const payload = (await response.json()) as { error?: string }
        setError(payload.error || '저장에 실패했습니다.')
        return
      }

      resetForm()
      await load()
    } finally {
      setIsSaving(false)
    }
  }

  const onEdit = (notice: Notice) => {
    setEditingId(notice.id)
    setForm({
      title: notice.title,
      content: notice.content,
      isPublished: notice.isPublished,
      isPinned: notice.isPinned,
    })
    setShowForm(true)
    setError('')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const onDelete = async (id: number) => {
    if (!window.confirm('이 공지를 삭제하시겠습니까?')) {
      return
    }

    const response = await fetch(`/api/admin/notices/${id}`, { method: 'DELETE' })

    if (response.ok) {
      await load()
      if (editingId === id) {
        resetForm()
      }
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 rounded-[28px] border border-stone-200 bg-stone-50 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-stone-500">Notice</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-stone-950">공지 관리</h2>
          <p className="mt-2 text-sm leading-6 text-stone-500">
            큰 입력창과 즉시 공개 토글로 모바일과 PC 모두 빠르게 쓸 수 있게 정리했습니다.
          </p>
        </div>
        {!showForm ? (
          <button
            type="button"
            onClick={() => setShowForm(true)}
            className="inline-flex min-h-[52px] items-center justify-center rounded-2xl bg-stone-900 px-5 text-sm font-semibold text-white transition hover:bg-stone-700"
          >
            새 공지 작성
          </button>
        ) : null}
      </div>

      {showForm ? (
        <section className="rounded-[28px] border border-stone-200 bg-white p-5 shadow-[0_24px_80px_-48px_rgba(28,25,23,0.45)] sm:p-6">
          <h3 className="mb-5 text-lg font-semibold tracking-tight text-stone-950">
            {editingId ? '공지 수정' : '새 공지 작성'}
          </h3>

          <form className="space-y-4" onSubmit={onSubmit}>
            <div>
              <label className="mb-2 block text-sm font-medium text-stone-700">제목</label>
              <input
                value={form.title}
                onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
                className="min-h-[56px] w-full rounded-2xl border border-stone-300 px-4 text-base"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-stone-700">내용</label>
              <textarea
                value={form.content}
                onChange={(e) => setForm((prev) => ({ ...prev, content: e.target.value }))}
                className="w-full rounded-2xl border border-stone-300 px-4 py-4 text-base"
                rows={7}
                required
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-stone-200 bg-stone-50 p-4">
                <p className="text-sm font-semibold text-stone-900">공개 여부</p>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setForm((prev) => ({ ...prev, isPublished: true }))}
                    className={`min-h-[48px] rounded-2xl text-sm font-semibold transition ${
                      form.isPublished ? 'bg-stone-900 text-white' : 'bg-white text-stone-600'
                    }`}
                  >
                    공개
                  </button>
                  <button
                    type="button"
                    onClick={() => setForm((prev) => ({ ...prev, isPublished: false }))}
                    className={`min-h-[48px] rounded-2xl text-sm font-semibold transition ${
                      !form.isPublished ? 'bg-stone-900 text-white' : 'bg-white text-stone-600'
                    }`}
                  >
                    비공개
                  </button>
                </div>
              </div>

              <div className="rounded-2xl border border-stone-200 bg-stone-50 p-4">
                <p className="text-sm font-semibold text-stone-900">상단 고정</p>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setForm((prev) => ({ ...prev, isPinned: true }))}
                    className={`min-h-[48px] rounded-2xl text-sm font-semibold transition ${
                      form.isPinned ? 'bg-stone-900 text-white' : 'bg-white text-stone-600'
                    }`}
                  >
                    고정
                  </button>
                  <button
                    type="button"
                    onClick={() => setForm((prev) => ({ ...prev, isPinned: false }))}
                    className={`min-h-[48px] rounded-2xl text-sm font-semibold transition ${
                      !form.isPinned ? 'bg-stone-900 text-white' : 'bg-white text-stone-600'
                    }`}
                  >
                    일반
                  </button>
                </div>
              </div>
            </div>

            {error ? (
              <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
            ) : null}

            <div className="flex gap-2">
              <button
                type="submit"
                disabled={isSaving}
                className="inline-flex min-h-[52px] items-center justify-center rounded-2xl bg-stone-900 px-5 text-sm font-semibold text-white transition hover:bg-stone-700 disabled:opacity-60"
              >
                {isSaving ? '저장 중...' : editingId ? '수정 저장' : '등록'}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="inline-flex min-h-[52px] items-center justify-center rounded-2xl border border-stone-300 px-5 text-sm font-semibold text-stone-700 transition hover:bg-stone-100"
              >
                취소
              </button>
            </div>
          </form>
        </section>
      ) : null}

      <section>
        <p className="mb-3 text-sm text-stone-500">총 {notices.length}건</p>
        <div className="space-y-3">
          {notices.map((notice) => (
            <article key={notice.id} className="rounded-[24px] border border-stone-200 bg-stone-50 p-4">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <p className="text-base font-semibold tracking-tight text-stone-950">{notice.title}</p>
                  <div className="mt-2 flex flex-wrap items-center gap-1.5">
                    {notice.isPinned ? (
                      <span className="rounded-full bg-blue-100 px-2.5 py-1 text-xs font-semibold text-blue-700">고정</span>
                    ) : null}
                    {notice.isPublished ? (
                      <span className="rounded-full bg-green-100 px-2.5 py-1 text-xs font-semibold text-green-700">공개</span>
                    ) : (
                      <span className="rounded-full bg-stone-200 px-2.5 py-1 text-xs font-semibold text-stone-600">비공개</span>
                    )}
                    <span className="text-xs text-stone-400">
                      {new Date(notice.createdAt).toLocaleDateString('ko-KR')}
                    </span>
                  </div>
                  <p className="mt-3 whitespace-pre-line text-sm leading-7 text-stone-600">
                    {notice.content}
                  </p>
                </div>
                <div className="flex shrink-0 gap-2">
                  <button
                    type="button"
                    onClick={() => onEdit(notice)}
                    className="inline-flex min-h-[44px] items-center justify-center rounded-2xl border border-stone-300 px-4 text-sm font-semibold text-stone-700 transition hover:bg-stone-100"
                  >
                    수정
                  </button>
                  <button
                    type="button"
                    onClick={() => void onDelete(notice.id)}
                    className="inline-flex min-h-[44px] items-center justify-center rounded-2xl border border-red-200 px-4 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                  >
                    삭제
                  </button>
                </div>
              </div>
            </article>
          ))}

          {notices.length === 0 ? (
            <p className="rounded-2xl border border-dashed border-stone-300 p-5 text-sm text-stone-500">
              등록된 공지가 없습니다.
            </p>
          ) : null}
        </div>
      </section>
    </div>
  )
}
