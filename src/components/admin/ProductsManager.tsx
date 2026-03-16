'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import type { Category, Product } from '@/types/site'

interface ProductDraft {
  categorySlug: string
  name: string
  spec: string
  description: string
  imageUrl: string
  isFeatured: boolean
  orderIndex: string
}

interface ProductsManagerProps {
  categories: Category[]
  products: Product[]
}

function createDraft(categories: Category[], orderIndex: number): ProductDraft {
  return {
    categorySlug: categories[0]?.slug || '',
    name: '',
    spec: '',
    description: '',
    imageUrl: '',
    isFeatured: false,
    orderIndex: String(orderIndex),
  }
}

export default function ProductsManager({
  categories,
  products,
}: ProductsManagerProps) {
  const router = useRouter()
  const [draft, setDraft] = useState<ProductDraft>(() =>
    createDraft(categories, products.length + 1)
  )
  const [editingId, setEditingId] = useState<number | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  function resetDraft() {
    setEditingId(null)
    setDraft(createDraft(categories, products.length + 1))
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitting(true)
    setError(null)
    setMessage(null)

    try {
      const response = await fetch(
        editingId ? `/api/admin/products/${editingId}` : '/api/admin/products',
        {
          method: editingId ? 'PUT' : 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...draft,
            imageUrl: draft.imageUrl || null,
            orderIndex: Number(draft.orderIndex || 0),
          }),
        }
      )

      const result = (await response.json()) as {
        ok: boolean
        message?: string
      }

      if (!response.ok || !result.ok) {
        throw new Error(result.message || '제품 저장에 실패했습니다.')
      }

      setMessage(editingId ? '제품을 수정했습니다.' : '제품을 추가했습니다.')
      resetDraft()
      router.refresh()
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : '제품 저장에 실패했습니다.'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  async function handleDelete(id: number) {
    if (!window.confirm('이 제품을 삭제하시겠습니까?')) {
      return
    }

    setError(null)
    setMessage(null)

    try {
      const response = await fetch(`/api/admin/products/${id}`, {
        method: 'DELETE',
      })
      const result = (await response.json()) as {
        ok: boolean
        message?: string
      }

      if (!response.ok || !result.ok) {
        throw new Error(result.message || '제품 삭제에 실패했습니다.')
      }

      setMessage('제품을 삭제했습니다.')
      if (editingId === id) {
        resetDraft()
      }
      router.refresh()
    } catch (deleteError) {
      setError(
        deleteError instanceof Error
          ? deleteError.message
          : '제품 삭제에 실패했습니다.'
      )
    }
  }

  async function handleUpload(file: File) {
    setIsUploading(true)
    setError(null)
    setMessage(null)

    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      })

      const result = (await response.json()) as {
        ok: boolean
        message?: string
        data?: { url: string | null }
      }

      if (!response.ok || !result.ok) {
        throw new Error(result.message || '이미지 업로드에 실패했습니다.')
      }

      if (result.data?.url) {
        setDraft((current) => ({
          ...current,
          imageUrl: result.data?.url || '',
        }))
        setMessage('이미지를 업로드했습니다.')
      } else {
        setMessage('업로드는 완료됐지만 공개 URL이 없어 직접 URL 입력이 필요합니다.')
      }
    } catch (uploadError) {
      setError(
        uploadError instanceof Error
          ? uploadError.message
          : '이미지 업로드에 실패했습니다.'
      )
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-8">
      <div className="space-y-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="p-5 bg-white border border-border grid md:grid-cols-[1fr_auto] gap-4"
          >
            <div>
              <p className="text-[12px] text-accent mb-2">
                {product.categoryName} {product.isFeatured ? '• 대표 라인업' : ''}
              </p>
              <h3 className="text-[16px] font-medium text-text-default mb-1">
                {product.name}
              </h3>
              <p className="text-[13px] text-text-muted mb-2">{product.spec}</p>
              <p className="text-[13px] text-text-muted leading-relaxed">
                {product.description || '설명 없음'}
              </p>
              {product.imageUrl ? (
                <p className="mt-2 text-[12px] text-text-muted break-all">
                  이미지 URL: {product.imageUrl}
                </p>
              ) : null}
            </div>
            <div className="flex md:flex-col gap-2">
              <button
                type="button"
                onClick={() => {
                  setEditingId(product.id)
                  setDraft({
                    categorySlug: product.categorySlug,
                    name: product.name,
                    spec: product.spec,
                    description: product.description,
                    imageUrl: product.imageUrl || '',
                    isFeatured: product.isFeatured,
                    orderIndex: String(product.orderIndex),
                  })
                }}
                className="px-4 py-2 border border-border text-[13px] text-text-default hover:border-text-default transition-colors"
              >
                수정
              </button>
              <button
                type="button"
                onClick={() => handleDelete(product.id)}
                className="px-4 py-2 border border-red-200 text-[13px] text-red-600 hover:border-red-400 transition-colors"
              >
                삭제
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="p-6 bg-white border border-border h-fit">
        <div className="flex items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="font-serif text-2xl font-light text-text-default">
              {editingId ? '제품 수정' : '새 제품 추가'}
            </h2>
            <p className="text-[13px] text-text-muted mt-2">
              대표 라인업과 공개 카탈로그에 노출되는 제품을 관리합니다.
            </p>
          </div>
          {editingId ? (
            <button
              type="button"
              onClick={resetDraft}
              className="px-4 py-2 border border-border text-[13px] text-text-muted hover:text-text-default transition-colors"
            >
              취소
            </button>
          ) : null}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[13px] text-text-muted mb-2">카테고리</label>
            <select
              value={draft.categorySlug}
              onChange={(event) =>
                setDraft((current) => ({
                  ...current,
                  categorySlug: event.target.value,
                }))
              }
              className="w-full px-4 py-3 border border-border bg-bg-primary text-[14px] text-text-default focus:outline-none focus:border-accent"
            >
              {categories.map((category) => (
                <option key={category.id} value={category.slug}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[13px] text-text-muted mb-2">제품명</label>
            <input
              type="text"
              value={draft.name}
              onChange={(event) =>
                setDraft((current) => ({
                  ...current,
                  name: event.target.value,
                }))
              }
              className="w-full px-4 py-3 border border-border bg-bg-primary text-[14px] text-text-default focus:outline-none focus:border-accent"
            />
          </div>

          <div>
            <label className="block text-[13px] text-text-muted mb-2">스펙</label>
            <input
              type="text"
              value={draft.spec}
              onChange={(event) =>
                setDraft((current) => ({
                  ...current,
                  spec: event.target.value,
                }))
              }
              className="w-full px-4 py-3 border border-border bg-bg-primary text-[14px] text-text-default focus:outline-none focus:border-accent"
            />
          </div>

          <div>
            <label className="block text-[13px] text-text-muted mb-2">설명</label>
            <textarea
              rows={4}
              value={draft.description}
              onChange={(event) =>
                setDraft((current) => ({
                  ...current,
                  description: event.target.value,
                }))
              }
              className="w-full px-4 py-3 border border-border bg-bg-primary text-[14px] text-text-default focus:outline-none focus:border-accent resize-none"
            />
          </div>

          <div>
            <label className="block text-[13px] text-text-muted mb-2">이미지 URL</label>
            <input
              type="url"
              value={draft.imageUrl}
              onChange={(event) =>
                setDraft((current) => ({
                  ...current,
                  imageUrl: event.target.value,
                }))
              }
              placeholder="https://..."
              className="w-full px-4 py-3 border border-border bg-bg-primary text-[14px] text-text-default focus:outline-none focus:border-accent"
            />
            <div className="mt-3 flex items-center gap-3">
              <label className="inline-flex items-center gap-2 text-[13px] text-text-muted cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(event) => {
                    const file = event.target.files?.[0]
                    if (file) {
                      void handleUpload(file)
                    }
                    event.currentTarget.value = ''
                  }}
                />
                <span className="px-4 py-2 border border-border hover:border-text-default transition-colors">
                  {isUploading ? '업로드 중...' : 'R2 업로드'}
                </span>
              </label>
              <span className="text-[12px] text-text-muted">
                R2 미연결 시 직접 URL 입력을 사용하세요.
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[13px] text-text-muted mb-2">정렬 순서</label>
              <input
                type="number"
                value={draft.orderIndex}
                onChange={(event) =>
                  setDraft((current) => ({
                    ...current,
                    orderIndex: event.target.value,
                  }))
                }
                className="w-full px-4 py-3 border border-border bg-bg-primary text-[14px] text-text-default focus:outline-none focus:border-accent"
              />
            </div>
            <label className="flex items-center gap-3 pt-8 text-[14px] text-text-default">
              <input
                type="checkbox"
                checked={draft.isFeatured}
                onChange={(event) =>
                  setDraft((current) => ({
                    ...current,
                    isFeatured: event.target.checked,
                  }))
                }
                className="h-4 w-4"
              />
              대표 라인업에 노출
            </label>
          </div>

          {error ? <p className="text-[13px] text-red-600">{error}</p> : null}
          {message ? <p className="text-[13px] text-emerald-700">{message}</p> : null}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 bg-text-default text-white text-[14px] font-medium hover:bg-neutral-800 transition-colors disabled:opacity-60"
          >
            {isSubmitting ? '저장 중...' : editingId ? '제품 수정' : '제품 추가'}
          </button>
        </form>
      </div>
    </div>
  )
}
