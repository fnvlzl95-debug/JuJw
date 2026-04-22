'use client'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-stone-50 px-4 text-center">
      <p className="text-xs uppercase tracking-[0.2em] text-red-600/70">Error</p>
      <h1 className="mt-3 text-3xl font-light text-stone-900">일시적인 오류가 발생했습니다</h1>
      <p className="mt-3 max-w-md text-sm text-stone-600">
        {error.message || '잠시 후 다시 시도해 주세요.'}
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-6 rounded-md bg-stone-900 px-5 py-2.5 text-sm text-white"
      >
        다시 시도
      </button>
    </div>
  )
}
