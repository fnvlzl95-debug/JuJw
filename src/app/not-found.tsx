import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-stone-50 px-4 text-center">
      <p className="text-xs uppercase tracking-[0.2em] text-amber-700/70">404</p>
      <h1 className="mt-3 text-3xl font-light text-stone-900">페이지를 찾을 수 없습니다</h1>
      <p className="mt-3 text-sm text-stone-600">요청하신 페이지가 이동되었거나 존재하지 않습니다.</p>
      <Link href="/" className="mt-6 rounded-md bg-stone-900 px-5 py-2.5 text-sm text-white">
        홈으로 이동
      </Link>
    </div>
  )
}
