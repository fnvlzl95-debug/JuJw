'use client'

export const runtime = 'edge'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, CircleHelp, Home, PackagePlus, PhoneCall } from 'lucide-react'
import { parseFaqItems } from '@/lib/faq'

type Inquiry = {
  id: number
  companyName: string
  phone: string
  status: 'pending' | 'contacted' | 'completed'
  createdAt: string
}

type Product = { id: number; isPublished?: boolean; isFeatured?: boolean }

const STATUS_LABEL: Record<Inquiry['status'], string> = {
  pending: '대기',
  contacted: '연락',
  completed: '완료',
}

export default function AdminDashboardPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [faqCount, setFaqCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const [inquiryRes, productRes, settingsRes] = await Promise.all([
          fetch('/api/admin/inquiries', { cache: 'no-store' }),
          fetch('/api/admin/products', { cache: 'no-store' }),
          fetch('/api/admin/settings', { cache: 'no-store' }),
        ])

        if (inquiryRes.ok) {
          const payload = (await inquiryRes.json()) as { inquiries?: Inquiry[] }
          setInquiries(payload.inquiries ?? [])
        }
        if (productRes.ok) {
          const payload = (await productRes.json()) as { products?: Product[] }
          setProducts(payload.products ?? [])
        }
        if (settingsRes.ok) {
          const payload = (await settingsRes.json()) as { settings?: Record<string, string> }
          setFaqCount(parseFaqItems(payload.settings?.faq_items).length)
        }
      } finally {
        setIsLoading(false)
      }
    }

    void load()
  }, [])

  const summary = useMemo(
    () => ({
      pending: inquiries.filter((item) => item.status === 'pending').length,
      contacted: inquiries.filter((item) => item.status === 'contacted').length,
      products: products.length,
      featured: products.filter((item) => item.isFeatured).length,
      faqs: faqCount,
    }),
    [faqCount, inquiries, products]
  )

  const recentInquiries = useMemo(
    () =>
      [...inquiries]
        .sort((a, b) => Number(a.status !== 'pending') - Number(b.status !== 'pending') || new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 6),
    [inquiries]
  )

  return (
    <div className="grid gap-4 lg:h-full lg:min-h-0 lg:grid-cols-[minmax(0,1fr)_360px]">
      <section className="min-w-0 rounded-[24px] border border-stone-200 bg-white lg:min-h-0 lg:overflow-hidden">
        <div className="flex items-center justify-between border-b border-stone-200 px-4 py-4 sm:px-5">
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-stone-950">오늘 확인할 항목</h2>
            <p className="mt-1 text-[14px] leading-6 text-stone-500">문의 처리와 빠른 등록을 우선 배치했습니다.</p>
          </div>
          <Link
            href="/admin/home"
            className="hidden min-h-[44px] items-center gap-2 rounded-2xl bg-stone-900 px-4 text-sm font-semibold text-white transition active:translate-y-px hover:bg-stone-700 sm:inline-flex"
          >
            홈편집
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="space-y-5 p-4 sm:p-5 lg:max-h-[calc(100dvh-185px)] lg:overflow-y-auto">
          <div data-admin-table className="divide-y divide-stone-200 border-y border-stone-200">
            <Metric title="미응답 문의" value={summary.pending} href="/admin/inquiries" intent={summary.pending > 0 ? 'warn' : 'default'} />
            <Metric title="연락 완료" value={summary.contacted} href="/admin/inquiries" />
            <Metric title="등록 제품" value={summary.products} href="/admin/products" />
            <Metric title="홈 추천 제품" value={summary.featured} href="/admin/products" />
            <Metric title="FAQ 질문" value={summary.faqs} href="/admin/faq" />
          </div>

          <div>
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-lg font-semibold tracking-tight text-stone-950">최근 문의</h3>
              <Link href="/admin/inquiries" className="text-sm font-semibold text-stone-600 hover:text-stone-950">
                전체 보기
              </Link>
            </div>

            {isLoading ? (
              <p className="rounded-2xl border border-dashed border-stone-300 p-5 text-[15px] text-stone-500">불러오는 중입니다.</p>
            ) : recentInquiries.length === 0 ? (
              <p className="rounded-2xl border border-dashed border-stone-300 p-5 text-[15px] text-stone-500">접수된 문의가 없습니다.</p>
            ) : (
              <div data-admin-table className="divide-y divide-stone-200 border-y border-stone-200">
                {recentInquiries.map((inquiry) => (
                  <div key={inquiry.id} className="grid gap-3 px-4 py-3 sm:grid-cols-[minmax(0,1fr)_120px_100px] sm:items-center">
                    <div className="min-w-0">
                      <p className="truncate text-[15px] font-semibold text-stone-950">{inquiry.companyName}</p>
                      <a href={`tel:${inquiry.phone}`} className="mt-1 inline-flex text-[14px] text-stone-500 underline-offset-4 hover:underline">
                        {inquiry.phone}
                      </a>
                    </div>
                    <p className="text-[13px] text-stone-500">{new Date(inquiry.createdAt).toLocaleDateString('ko-KR')}</p>
                    <span className={`inline-flex min-h-[34px] items-center justify-center rounded-xl px-3 text-[13px] font-semibold ${
                      inquiry.status === 'pending' ? 'bg-amber-100 text-amber-900' : 'bg-stone-100 text-stone-700'
                    }`}>
                      {STATUS_LABEL[inquiry.status]}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <aside className="space-y-4 lg:min-h-0 lg:overflow-y-auto">
        <div data-admin-table className="divide-y divide-stone-200 border-y border-stone-200 bg-white">
          <QuickLink href="/admin/home" title="홈페이지 문구 수정" description="실제 메인 화면 문구를 바로 바꿉니다." Icon={Home} />
          <QuickLink href="/admin/products?new=1" title="제품 등록" description="기본정보 저장 후 사진을 올립니다." Icon={PackagePlus} />
          <QuickLink href="/admin/inquiries" title="문의 처리" description="전화 걸기와 상태 변경을 바로 합니다." Icon={PhoneCall} />
          <QuickLink href="/admin/faq" title="FAQ 수정" description="자주 묻는 질문과 답변을 정리합니다." Icon={CircleHelp} />
        </div>
      </aside>
    </div>
  )
}

function Metric({
  title,
  value,
  href,
  intent = 'default',
}: {
  title: string
  value: number
  href: string
  intent?: 'default' | 'warn'
}) {
  return (
    <Link
      href={href}
      className={`grid min-h-[54px] grid-cols-[minmax(0,1fr)_80px] items-center px-4 py-2 transition active:translate-y-px ${
        intent === 'warn' ? 'bg-amber-50' : 'hover:bg-stone-50'
      }`}
    >
      <p className="text-[14px] font-semibold text-stone-700">{title}</p>
      <p className="text-right text-2xl font-semibold tracking-tight text-stone-950">{value}</p>
    </Link>
  )
}

function QuickLink({
  href,
  title,
  description,
  Icon,
}: {
  href: string
  title: string
  description: string
  Icon: typeof Home
}) {
  return (
    <Link
      href={href}
      className="block px-4 py-4 text-stone-950 transition active:translate-y-px hover:bg-stone-50"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-lg font-semibold tracking-tight">{title}</p>
          <p className="mt-1 text-[14px] leading-6 text-stone-500">{description}</p>
        </div>
        <Icon size={22} strokeWidth={1.8} className="text-stone-500" />
      </div>
    </Link>
  )
}
