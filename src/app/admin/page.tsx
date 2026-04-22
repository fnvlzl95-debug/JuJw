'use client'

export const runtime = 'edge'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, BellRing, PackagePlus, PhoneCall } from 'lucide-react'

type Inquiry = {
  id: number
  companyName: string
  phone: string
  status: 'pending' | 'contacted' | 'completed'
  createdAt: string
}

type Product = { id: number }
type Notice = { id: number }

const STATUS_LABEL: Record<string, string> = {
  pending: '대기중',
  contacted: '연락완료',
  completed: '처리완료',
}

export default function AdminDashboardPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [notices, setNotices] = useState<Notice[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const [inquiryRes, productRes, noticeRes] = await Promise.all([
          fetch('/api/admin/inquiries', { cache: 'no-store' }),
          fetch('/api/admin/products', { cache: 'no-store' }),
          fetch('/api/admin/notices', { cache: 'no-store' }),
        ])

        if (inquiryRes.ok) {
          const payload = (await inquiryRes.json()) as { inquiries: Inquiry[] }
          setInquiries(payload.inquiries ?? [])
        }
        if (productRes.ok) {
          const payload = (await productRes.json()) as { products: Product[] }
          setProducts(payload.products ?? [])
        }
        if (noticeRes.ok) {
          const payload = (await noticeRes.json()) as { notices: Notice[] }
          setNotices(payload.notices ?? [])
        }
      } finally {
        setIsLoading(false)
      }
    }

    void load()
  }, [])

  const summary = useMemo(
    () => ({
      productCount: products.length,
      inquiryCount: inquiries.length,
      pendingCount: inquiries.filter((item) => item.status === 'pending').length,
      contactedCount: inquiries.filter((item) => item.status === 'contacted').length,
      noticeCount: notices.length,
    }),
    [inquiries, notices.length, products.length]
  )

  const tasks = useMemo(
    () =>
      [
        summary.pendingCount > 0
          ? {
              title: `미처리 문의 ${summary.pendingCount}건`,
              description: '전화 버튼과 상태 버튼으로 바로 처리하세요.',
              href: '/admin/inquiries',
            }
          : null,
        products.length === 0
          ? {
              title: '등록된 제품이 없습니다',
              description: '대표 제품 1개만 먼저 올려도 공개 페이지가 훨씬 안정적입니다.',
              href: '/admin/products?new=1',
            }
          : null,
        notices.length === 0
          ? {
              title: '첫 공지를 준비하세요',
              description: '휴무, 납기, 입고 안내 중 하나를 먼저 올려 두는 편이 좋습니다.',
              href: '/admin/notices?new=1',
            }
          : null,
      ].filter(Boolean) as Array<{ title: string; description: string; href: string }>,
    [notices.length, products.length, summary.pendingCount]
  )

  return (
    <div className="space-y-6 lg:space-y-8">
      <section className="overflow-hidden rounded-[28px] bg-[linear-gradient(135deg,#1f1b18_0%,#3b3028_42%,#c58c3b_130%)] px-5 py-6 text-white sm:px-7 sm:py-7">
        <p className="text-[11px] uppercase tracking-[0.24em] text-white/60">Today</p>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
          오늘 바로 손대야 할 작업만 먼저 모았습니다.
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-white/76 sm:text-base">
          휴대폰에서는 큰 버튼 중심으로, PC에서는 목록과 현황을 같이 볼 수 있게 정리했습니다.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href="/admin/inquiries"
            className="inline-flex min-h-[48px] items-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-stone-900 transition hover:bg-amber-50"
          >
            <PhoneCall size={16} />
            문의 바로 보기
          </Link>
          <Link
            href="/admin/products?new=1"
            className="inline-flex min-h-[48px] items-center gap-2 rounded-full border border-white/30 px-5 text-sm font-medium text-white transition hover:bg-white/10"
          >
            <PackagePlus size={16} />
            제품 빠른 등록
          </Link>
        </div>
      </section>

      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <Link href="/admin/products" className="rounded-[24px] border border-stone-200 bg-stone-50 p-4 transition hover:bg-stone-100">
          <p className="text-xs uppercase tracking-[0.18em] text-stone-500">등록 제품</p>
          <p className="mt-3 text-3xl font-semibold tracking-tight text-stone-950">{summary.productCount}</p>
        </Link>
        <Link href="/admin/inquiries" className="rounded-[24px] border border-stone-200 bg-stone-50 p-4 transition hover:bg-stone-100">
          <p className="text-xs uppercase tracking-[0.18em] text-stone-500">전체 문의</p>
          <p className="mt-3 text-3xl font-semibold tracking-tight text-stone-950">{summary.inquiryCount}</p>
        </Link>
        <Link
          href="/admin/inquiries"
          className={`rounded-[24px] border p-4 transition ${
            summary.pendingCount > 0
              ? 'border-amber-300 bg-amber-50 hover:bg-amber-100'
              : 'border-stone-200 bg-stone-50 hover:bg-stone-100'
          }`}
        >
          <p className="text-xs uppercase tracking-[0.18em] text-stone-500">미응답 문의</p>
          <p className="mt-3 text-3xl font-semibold tracking-tight text-stone-950">{summary.pendingCount}</p>
        </Link>
        <Link href="/admin/notices" className="rounded-[24px] border border-stone-200 bg-stone-50 p-4 transition hover:bg-stone-100">
          <p className="text-xs uppercase tracking-[0.18em] text-stone-500">공지 게시물</p>
          <p className="mt-3 text-3xl font-semibold tracking-tight text-stone-950">{summary.noticeCount}</p>
        </Link>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[28px] border border-stone-200 bg-white p-5 shadow-[0_24px_80px_-48px_rgba(28,25,23,0.45)] sm:p-6">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold tracking-tight text-stone-950">최근 문의</h3>
              <p className="mt-1 text-sm text-stone-500">가장 최근 접수된 문의를 바로 확인합니다.</p>
            </div>
            <Link href="/admin/inquiries" className="text-sm font-medium text-stone-600 hover:text-stone-950">
              전체 보기
            </Link>
          </div>

          {isLoading ? (
            <p className="text-sm text-stone-500">불러오는 중...</p>
          ) : inquiries.length === 0 ? (
            <p className="rounded-2xl border border-dashed border-stone-300 p-5 text-sm text-stone-500">
              접수된 문의가 없습니다.
            </p>
          ) : (
            <div className="space-y-3">
              {inquiries.slice(0, 4).map((inquiry) => (
                <article
                  key={inquiry.id}
                  className="rounded-2xl border border-stone-200 bg-stone-50 px-4 py-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-base font-semibold tracking-tight text-stone-950">
                        {inquiry.companyName}
                      </p>
                      <a href={`tel:${inquiry.phone}`} className="mt-1 inline-flex text-sm text-stone-600 underline-offset-4 hover:underline">
                        {inquiry.phone}
                      </a>
                    </div>
                    <span
                      className={`inline-flex min-h-[32px] items-center rounded-full px-3 text-xs font-semibold ${
                        inquiry.status === 'pending'
                          ? 'bg-amber-100 text-amber-900'
                          : inquiry.status === 'contacted'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {STATUS_LABEL[inquiry.status] || inquiry.status}
                    </span>
                  </div>
                  <p className="mt-3 text-xs text-stone-400">
                    {new Date(inquiry.createdAt).toLocaleString('ko-KR')}
                  </p>
                </article>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-6">
          <section className="rounded-[28px] border border-stone-200 bg-stone-50 p-5 sm:p-6">
            <div className="flex items-center gap-2 text-amber-700">
              <BellRing size={18} />
              <h3 className="text-lg font-semibold tracking-tight text-stone-950">오늘 할 일</h3>
            </div>
            <div className="mt-4 space-y-3">
              {tasks.length > 0 ? (
                tasks.map((task) => (
                  <Link
                    key={task.title}
                    href={task.href}
                    className="flex items-center justify-between rounded-2xl border border-stone-200 bg-white px-4 py-4 transition hover:border-stone-300 hover:bg-stone-50"
                  >
                    <div className="pr-4">
                      <p className="text-sm font-semibold text-stone-950">{task.title}</p>
                      <p className="mt-1 text-sm leading-6 text-stone-500">{task.description}</p>
                    </div>
                    <ArrowRight size={18} className="shrink-0 text-stone-400" />
                  </Link>
                ))
              ) : (
                <p className="rounded-2xl border border-dashed border-stone-300 px-4 py-5 text-sm text-stone-500">
                  급한 작업이 없습니다. 공지와 제품 상태만 가볍게 점검하면 됩니다.
                </p>
              )}
            </div>
          </section>

          <section className="rounded-[28px] border border-stone-200 bg-white p-5 shadow-[0_24px_80px_-48px_rgba(28,25,23,0.45)] sm:p-6">
            <h3 className="text-lg font-semibold tracking-tight text-stone-950">빠른 등록</h3>
            <div className="mt-4 grid gap-3">
              <Link
                href="/admin/products?new=1"
                className="inline-flex min-h-[56px] items-center justify-between rounded-2xl bg-stone-900 px-4 text-sm font-semibold text-white transition hover:bg-stone-700"
              >
                제품 추가
                <ArrowRight size={18} />
              </Link>
              <Link
                href="/admin/notices?new=1"
                className="inline-flex min-h-[56px] items-center justify-between rounded-2xl border border-stone-300 px-4 text-sm font-semibold text-stone-800 transition hover:bg-stone-50"
              >
                공지 작성
                <ArrowRight size={18} />
              </Link>
              <Link
                href="/admin/settings"
                className="inline-flex min-h-[56px] items-center justify-between rounded-2xl border border-stone-300 px-4 text-sm font-semibold text-stone-800 transition hover:bg-stone-50"
              >
                연락처 점검
                <ArrowRight size={18} />
              </Link>
            </div>

            <div className="mt-5 rounded-2xl bg-stone-50 p-4">
              <p className="text-sm text-stone-500">현재 문의 상태</p>
              <div className="mt-3 grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-white px-4 py-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-stone-400">대기</p>
                  <p className="mt-2 text-2xl font-semibold tracking-tight text-stone-950">{summary.pendingCount}</p>
                </div>
                <div className="rounded-2xl bg-white px-4 py-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-stone-400">연락 완료</p>
                  <p className="mt-2 text-2xl font-semibold tracking-tight text-stone-950">{summary.contactedCount}</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>
    </div>
  )
}
