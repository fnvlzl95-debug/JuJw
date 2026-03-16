'use client'

import { useState } from 'react'
import type { Inquiry, InquiryStatus } from '@/types/site'

const statusLabels: Record<InquiryStatus, string> = {
  pending: '대기',
  contacted: '연락 완료',
  completed: '처리 완료',
}

interface InquiriesManagerProps {
  inquiries: Inquiry[]
}

export default function InquiriesManager({
  inquiries,
}: InquiriesManagerProps) {
  const [items, setItems] = useState(inquiries)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function updateStatus(id: number, status: InquiryStatus) {
    setError(null)
    setMessage(null)

    try {
      const response = await fetch(`/api/admin/inquiries/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      })

      const result = (await response.json()) as {
        ok: boolean
        message?: string
        data?: Inquiry
      }

      if (!response.ok || !result.ok || !result.data) {
        throw new Error(result.message || '문의 상태 변경에 실패했습니다.')
      }

      setItems((current) =>
        current.map((item) => (item.id === id ? result.data || item : item))
      )
      setMessage('문의 상태를 변경했습니다.')
    } catch (statusError) {
      setError(
        statusError instanceof Error
          ? statusError.message
          : '문의 상태 변경에 실패했습니다.'
      )
    }
  }

  return (
    <div className="space-y-4">
      {error ? <p className="text-[13px] text-red-600">{error}</p> : null}
      {message ? <p className="text-[13px] text-emerald-700">{message}</p> : null}

      {items.length === 0 ? (
        <div className="p-6 bg-white border border-border text-[14px] text-text-muted">
          접수된 문의가 없습니다.
        </div>
      ) : null}

      {items.map((inquiry) => (
        <div key={inquiry.id} className="p-5 bg-white border border-border">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
            <div className="space-y-2">
              <p className="text-[12px] text-accent">문의 #{inquiry.id}</p>
              <h3 className="text-[16px] font-medium text-text-default">
                {inquiry.companyName}
              </h3>
              <p className="text-[14px] text-text-muted">연락처: {inquiry.phone}</p>
              <p className="text-[14px] text-text-muted">
                관심 품목: {inquiry.interest || '미입력'}
              </p>
              <p className="text-[14px] text-text-muted whitespace-pre-wrap">
                {inquiry.message || '문의 내용 없음'}
              </p>
              <p className="text-[12px] text-text-muted">
                접수일: {new Date(inquiry.createdAt).toLocaleString('ko-KR')}
              </p>
            </div>
            <div className="w-full lg:w-[220px]">
              <label className="block text-[13px] text-text-muted mb-2">상태</label>
              <select
                value={inquiry.status}
                onChange={(event) =>
                  updateStatus(inquiry.id, event.target.value as InquiryStatus)
                }
                className="w-full px-4 py-3 border border-border bg-bg-primary text-[14px] text-text-default focus:outline-none focus:border-accent"
              >
                {Object.entries(statusLabels).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
