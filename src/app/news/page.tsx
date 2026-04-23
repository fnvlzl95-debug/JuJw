import type { Metadata } from 'next'
import { getNotices } from '@/lib/db'

export const metadata: Metadata = {
  title: '공지사항',
  description: 'JU JEWELRY 신제품 입고 및 운영 공지',
}

export default async function NewsPage() {
  const notices = await getNotices({ publishedOnly: true })

  return (
    <div className="min-h-screen bg-white">
      <section className="public-hero bg-stone-50 px-4 sm:px-6 md:px-8">
        <div className="mx-auto max-w-5xl">
          <p className="text-xs uppercase tracking-[0.2em] text-amber-700/70">News</p>
          <h1 className="mt-3 text-4xl font-light italic text-stone-900">공지사항</h1>
        </div>
      </section>

      <section className="mx-auto max-w-5xl space-y-3 px-4 py-12 sm:px-6 md:px-8 md:py-16">
        {notices.map((notice) => (
          <article key={notice.id} className="rounded-md border border-stone-200 p-5">
            <div className="flex items-center gap-2 text-xs text-stone-500">
              {notice.isPinned ? <span className="rounded bg-amber-100 px-2 py-0.5 text-amber-800">고정</span> : null}
              <span>{new Date(notice.createdAt).toLocaleDateString('ko-KR')}</span>
            </div>
            <h2 className="mt-2 text-lg font-medium text-stone-900">{notice.title}</h2>
            <p className="mt-2 whitespace-pre-line text-sm leading-6 text-stone-700">{notice.content}</p>
          </article>
        ))}

        {notices.length === 0 ? (
          <p className="rounded-md border border-stone-200 p-5 text-sm text-stone-500">
            등록된 공지가 없습니다.
          </p>
        ) : null}
      </section>
    </div>
  )
}
