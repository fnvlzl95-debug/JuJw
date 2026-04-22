'use client'

export const runtime = 'edge'

import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Camera, ImagePlus, Search, Trash2 } from 'lucide-react'

type Category = {
  id: number
  name: string
  slug: string
}

type ProductImage = {
  id: number
  productId: number
  url: string
  altText: string | null
  isPrimary: boolean
  orderIndex: number
}

type Product = {
  id: number
  categoryId: number
  categoryName?: string
  categorySlug?: string
  name: string
  slug: string
  spec: string | null
  description: string | null
  isPublished: boolean
  imageUrl: string | null
  updatedAt: string
  images?: ProductImage[]
}

type ProductForm = {
  categoryId: string
  name: string
  spec: string
  description: string
  isPublished: boolean
}

const initialForm: ProductForm = {
  categoryId: '',
  name: '',
  spec: '',
  description: '',
  isPublished: true,
}

function normalizeImageUrl(url: string | null | undefined): string {
  if (!url || url.startsWith('products/')) {
    return '/img/hero/hero.png'
  }
  return url
}

export default function AdminProductsPage() {
  const searchParams = useSearchParams()
  const [categories, setCategories] = useState<Category[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [form, setForm] = useState<ProductForm>(initialForm)
  const [search, setSearch] = useState('')
  const [filterCategory, setFilterCategory] = useState('all')
  const [visibilityFilter, setVisibilityFilter] = useState<'all' | 'published' | 'draft'>('all')
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  const hydrateForm = (product: Product) => {
    setSelectedId(product.id)
    setForm({
      categoryId: String(product.categoryId),
      name: product.name,
      spec: product.spec ?? '',
      description: product.description ?? '',
      isPublished: product.isPublished,
    })
  }

  const load = async () => {
    setIsLoading(true)

    try {
      const [categoryRes, productRes] = await Promise.all([
        fetch('/api/categories', { cache: 'no-store' }),
        fetch('/api/admin/products', { cache: 'no-store' }),
      ])

      if (categoryRes.ok) {
        const payload = (await categoryRes.json()) as { categories?: Category[] }
        setCategories(payload.categories ?? [])
      }

      if (productRes.ok) {
        const payload = (await productRes.json()) as { products?: Product[] }
        const nextProducts = payload.products ?? []
        setProducts(nextProducts)

        if (selectedId) {
          const found = nextProducts.find((item) => item.id === selectedId)
          if (found) {
            hydrateForm(found)
          }
        }
      }
    } finally {
      setIsLoading(false)
    }
  }

  const resetForm = () => {
    setSelectedId(null)
    setForm({
      ...initialForm,
      categoryId: categories[0] ? String(categories[0].id) : '',
    })
    setError('')
    setMessage('')
  }

  useEffect(() => {
    void load()
  }, [])

  useEffect(() => {
    if (!form.categoryId && categories[0]) {
      setForm((prev) => ({ ...prev, categoryId: String(categories[0].id) }))
    }
  }, [categories, form.categoryId])

  useEffect(() => {
    if (searchParams.get('new') === '1') {
      resetForm()
    }
  }, [searchParams, categories])

  const selectedProduct = useMemo(
    () => products.find((product) => product.id === selectedId) ?? null,
    [products, selectedId]
  )

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      if (filterCategory !== 'all' && product.categorySlug !== filterCategory) {
        return false
      }

      if (visibilityFilter === 'published' && !product.isPublished) {
        return false
      }

      if (visibilityFilter === 'draft' && product.isPublished) {
        return false
      }

      const keyword = search.trim().toLowerCase()
      if (!keyword) {
        return true
      }

      return [product.name, product.spec ?? '', product.description ?? '']
        .join(' ')
        .toLowerCase()
        .includes(keyword)
    })
  }, [filterCategory, products, search, visibilityFilter])

  const onSelectProduct = (product: Product) => {
    hydrateForm(product)
    setError('')
    setMessage('')
  }

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')
    setMessage('')

    if (!form.categoryId || !form.name.trim()) {
      setError('카테고리와 제품명은 필수입니다.')
      return
    }

    setIsSaving(true)

    const body = {
      categoryId: Number(form.categoryId),
      name: form.name.trim(),
      spec: form.spec.trim(),
      description: form.description.trim(),
      isPublished: form.isPublished,
    }

    try {
      const response = await fetch(selectedId ? `/api/admin/products/${selectedId}` : '/api/admin/products', {
        method: selectedId ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      const payload = (await response.json()) as { error?: string; product?: Product }
      if (!response.ok || !payload.product) {
        throw new Error(payload.error || '저장에 실패했습니다.')
      }

      setMessage(
        selectedId
          ? '제품 정보가 저장되었습니다. 아래에서 사진도 바로 관리할 수 있습니다.'
          : '제품이 저장되었습니다. 이제 사진을 추가하세요.'
      )
      await load()
      hydrateForm(payload.product)
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : '저장 중 오류가 발생했습니다.')
    } finally {
      setIsSaving(false)
    }
  }

  const onDelete = async () => {
    if (!selectedProduct) {
      return
    }

    if (!window.confirm(`"${selectedProduct.name}" 제품을 삭제하시겠습니까?`)) {
      return
    }

    setError('')
    setMessage('')

    const response = await fetch(`/api/admin/products/${selectedProduct.id}`, {
      method: 'DELETE',
    })

    const payload = (await response.json().catch(() => ({}))) as { error?: string }
    if (!response.ok) {
      setError(payload.error || '삭제에 실패했습니다.')
      return
    }

    setMessage('제품이 삭제되었습니다.')
    await load()
    resetForm()
  }

  const uploadFiles = async (files: FileList | null) => {
    if (!selectedProduct || !files || files.length === 0) {
      return
    }

    setError('')
    setMessage('')
    setIsUploading(true)

    try {
      const formData = new FormData()
      formData.append('productId', String(selectedProduct.id))
      formData.append(
        'primaryIndex',
        String(selectedProduct.images?.some((image) => image.isPrimary) ? -1 : 0)
      )

      Array.from(files).forEach((file) => {
        formData.append('files', file)
      })

      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      })

      const payload = (await response.json()) as { error?: string }
      if (!response.ok) {
        throw new Error(payload.error || '업로드에 실패했습니다.')
      }

      setMessage('사진 업로드가 완료되었습니다.')
      await load()
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : '업로드 중 오류가 발생했습니다.')
    } finally {
      setIsUploading(false)
    }
  }

  const onUploadChange = async (event: ChangeEvent<HTMLInputElement>) => {
    await uploadFiles(event.target.files)
    event.target.value = ''
  }

  const onSetPrimary = async (imageId: number) => {
    if (!selectedProduct) {
      return
    }

    setError('')
    setMessage('')

    const response = await fetch(`/api/admin/products/${selectedProduct.id}/images/${imageId}`, {
      method: 'PATCH',
    })

    const payload = (await response.json()) as { error?: string }
    if (!response.ok) {
      setError(payload.error || '대표사진 설정에 실패했습니다.')
      return
    }

    setMessage('대표사진이 변경되었습니다.')
    await load()
  }

  const onDeleteImage = async (imageId: number) => {
    if (!selectedProduct) {
      return
    }

    if (!window.confirm('이 사진을 삭제하시겠습니까?')) {
      return
    }

    setError('')
    setMessage('')

    const response = await fetch(`/api/admin/products/${selectedProduct.id}/images/${imageId}`, {
      method: 'DELETE',
    })

    const payload = (await response.json()) as { error?: string }
    if (!response.ok) {
      setError(payload.error || '사진 삭제에 실패했습니다.')
      return
    }

    setMessage('사진이 삭제되었습니다.')
    await load()
  }

  return (
    <div className="space-y-6">
      <section className="rounded-[28px] border border-stone-200 bg-stone-50 p-5 sm:p-6">
        <p className="text-xs uppercase tracking-[0.2em] text-stone-500">Products</p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-stone-950">제품 관리</h2>
        <p className="mt-2 text-sm leading-6 text-stone-500">
          목록에서 제품을 고르고, 기본정보를 저장한 뒤 아래에서 바로 사진을 관리하는 구조입니다.
        </p>
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.92fr_1.08fr]">
        <div className="space-y-5">
          <div className="rounded-[28px] border border-stone-200 bg-white p-5 shadow-[0_24px_80px_-48px_rgba(28,25,23,0.45)] sm:p-6">
            <div className="flex flex-col gap-3 lg:flex-row">
              <label className="relative flex-1">
                <Search size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="제품명 또는 스펙 검색"
                  className="min-h-[52px] w-full rounded-2xl border border-stone-300 pl-11 pr-4 text-sm"
                />
              </label>
              <select
                value={filterCategory}
                onChange={(event) => setFilterCategory(event.target.value)}
                className="min-h-[52px] rounded-2xl border border-stone-300 px-4 text-sm"
              >
                <option value="all">전체 카테고리</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.slug}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-3 grid grid-cols-3 gap-2">
              {[
                { value: 'all', label: '전체' },
                { value: 'published', label: '공개' },
                { value: 'draft', label: '비공개' },
              ].map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setVisibilityFilter(option.value as typeof visibilityFilter)}
                  className={`min-h-[46px] rounded-2xl text-sm font-semibold transition ${
                    visibilityFilter === option.value
                      ? 'bg-stone-900 text-white'
                      : 'border border-stone-300 bg-stone-50 text-stone-600'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>

            <div className="mt-4 flex items-center justify-between">
              <p className="text-sm text-stone-500">총 {filteredProducts.length}개</p>
              <button
                type="button"
                onClick={resetForm}
                className="text-sm font-medium text-stone-700 underline-offset-4 hover:underline"
              >
                새 제품 입력
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {isLoading ? (
              <p className="rounded-2xl border border-dashed border-stone-300 p-5 text-sm text-stone-500">불러오는 중...</p>
            ) : filteredProducts.length === 0 ? (
              <p className="rounded-2xl border border-dashed border-stone-300 p-5 text-sm text-stone-500">
                조건에 맞는 제품이 없습니다.
              </p>
            ) : (
              filteredProducts.map((product) => {
                const active = product.id === selectedId

                return (
                  <button
                    key={product.id}
                    type="button"
                    onClick={() => onSelectProduct(product)}
                    className={`w-full rounded-[26px] border p-4 text-left transition ${
                      active
                        ? 'border-stone-900 bg-stone-900 text-white shadow-[0_24px_80px_-48px_rgba(28,25,23,0.65)]'
                        : 'border-stone-200 bg-white text-stone-900 hover:border-stone-300'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="h-20 w-16 shrink-0 overflow-hidden rounded-2xl bg-stone-100">
                        <img
                          src={normalizeImageUrl(product.imageUrl)}
                          alt={product.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="text-base font-semibold tracking-tight">{product.name}</p>
                          <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${active ? 'bg-white/15 text-white/80' : 'bg-stone-100 text-stone-500'}`}>
                            {product.categoryName || '카테고리 없음'}
                          </span>
                        </div>
                        <p className={`mt-2 text-sm leading-6 ${active ? 'text-white/75' : 'text-stone-500'}`}>
                          {product.spec || '스펙 미입력'}
                        </p>
                        <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
                          <span className={`rounded-full px-2.5 py-1 ${active ? 'bg-white/15 text-white/85' : product.isPublished ? 'bg-emerald-100 text-emerald-700' : 'bg-stone-100 text-stone-500'}`}>
                            {product.isPublished ? '공개' : '비공개'}
                          </span>
                          <span className={active ? 'text-white/55' : 'text-stone-400'}>
                            {new Date(product.updatedAt).toLocaleDateString('ko-KR')}
                          </span>
                        </div>
                      </div>
                    </div>
                  </button>
                )
              })
            )}
          </div>
        </div>

        <div className="space-y-6">
          <section className="rounded-[28px] border border-stone-200 bg-white p-5 shadow-[0_24px_80px_-48px_rgba(28,25,23,0.45)] sm:p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h3 className="text-lg font-semibold tracking-tight text-stone-950">
                  {selectedProduct ? '제품 기본정보 수정' : '새 제품 등록'}
                </h3>
                <p className="mt-2 text-sm leading-6 text-stone-500">
                  기본 필드만 먼저 입력하고 저장한 뒤 사진을 붙입니다.
                </p>
              </div>
              {selectedProduct ? (
                <button
                  type="button"
                  onClick={() => void onDelete()}
                  className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-2xl border border-red-200 px-4 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                >
                  <Trash2 size={16} />
                  제품 삭제
                </button>
              ) : null}
            </div>

            <form className="mt-5 space-y-4" onSubmit={onSubmit}>
              <div>
                <label className="mb-2 block text-sm font-medium text-stone-700">카테고리</label>
                <select
                  value={form.categoryId}
                  onChange={(event) => setForm((prev) => ({ ...prev, categoryId: event.target.value }))}
                  className="min-h-[56px] w-full rounded-2xl border border-stone-300 px-4 text-base"
                >
                  <option value="">카테고리 선택</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-stone-700">제품명</label>
                <input
                  value={form.name}
                  onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
                  className="min-h-[56px] w-full rounded-2xl border border-stone-300 px-4 text-base"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-stone-700">스펙</label>
                <input
                  value={form.spec}
                  onChange={(event) => setForm((prev) => ({ ...prev, spec: event.target.value }))}
                  placeholder="예: 18K / Diamond / 1.2g"
                  className="min-h-[56px] w-full rounded-2xl border border-stone-300 px-4 text-base"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-stone-700">설명</label>
                <textarea
                  value={form.description}
                  onChange={(event) => setForm((prev) => ({ ...prev, description: event.target.value }))}
                  rows={5}
                  className="w-full rounded-2xl border border-stone-300 px-4 py-4 text-base"
                />
              </div>

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

              {error ? (
                <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
              ) : null}

              {message ? (
                <p className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{message}</p>
              ) : null}

              <div className="flex flex-wrap gap-2">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="inline-flex min-h-[52px] items-center justify-center rounded-2xl bg-stone-900 px-6 text-sm font-semibold text-white transition hover:bg-stone-700 disabled:opacity-60"
                >
                  {isSaving ? '저장 중...' : selectedProduct ? '기본정보 저장' : '1단계 저장'}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="inline-flex min-h-[52px] items-center justify-center rounded-2xl border border-stone-300 px-6 text-sm font-semibold text-stone-700 transition hover:bg-stone-100"
                >
                  새 입력으로 전환
                </button>
              </div>
            </form>
          </section>

          <section className="rounded-[28px] border border-stone-200 bg-stone-50 p-5 sm:p-6">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-lg font-semibold tracking-tight text-stone-950">사진 관리</h3>
                <p className="mt-2 text-sm leading-6 text-stone-500">
                  저장된 제품에만 사진을 붙일 수 있습니다. 드래그 정렬 대신 대표사진 지정만 남겼습니다.
                </p>
              </div>
              {selectedProduct ? (
                <span className="rounded-full bg-white px-3 py-1 text-sm font-medium text-stone-600">
                  {selectedProduct.images?.length ?? 0}장
                </span>
              ) : null}
            </div>

            {selectedProduct ? (
              <>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <label className="flex min-h-[84px] cursor-pointer items-center justify-center gap-3 rounded-[24px] border border-stone-300 bg-white px-4 text-sm font-semibold text-stone-800 transition hover:bg-stone-100">
                    <Camera size={18} />
                    카메라로 촬영
                    <input
                      type="file"
                      accept="image/*"
                      capture="environment"
                      className="hidden"
                      onChange={(event) => void onUploadChange(event)}
                    />
                  </label>

                  <label className="flex min-h-[84px] cursor-pointer items-center justify-center gap-3 rounded-[24px] border border-stone-300 bg-white px-4 text-sm font-semibold text-stone-800 transition hover:bg-stone-100">
                    <ImagePlus size={18} />
                    앨범에서 선택
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={(event) => void onUploadChange(event)}
                    />
                  </label>
                </div>

                {isUploading ? (
                  <p className="mt-4 text-sm text-stone-500">사진 업로드 중입니다...</p>
                ) : null}

                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  {selectedProduct.images?.map((image) => (
                    <article key={image.id} className="overflow-hidden rounded-[24px] border border-stone-200 bg-white">
                      <div className="aspect-[4/3] bg-stone-100">
                        <img
                          src={normalizeImageUrl(image.url)}
                          alt={image.altText || selectedProduct.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <div className="flex flex-wrap items-center gap-2">
                          {image.isPrimary ? (
                            <span className="rounded-full bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-800">
                              대표사진
                            </span>
                          ) : (
                            <span className="rounded-full bg-stone-100 px-2.5 py-1 text-xs font-semibold text-stone-500">
                              일반사진
                            </span>
                          )}
                          <span className="text-xs text-stone-400">순서 {image.orderIndex + 1}</span>
                        </div>
                        <div className="mt-4 grid grid-cols-2 gap-2">
                          <button
                            type="button"
                            onClick={() => void onSetPrimary(image.id)}
                            className={`min-h-[46px] rounded-2xl text-sm font-semibold transition ${
                              image.isPrimary
                                ? 'bg-stone-900 text-white'
                                : 'border border-stone-300 bg-stone-50 text-stone-700 hover:bg-stone-100'
                            }`}
                          >
                            대표사진
                          </button>
                          <button
                            type="button"
                            onClick={() => void onDeleteImage(image.id)}
                            className="min-h-[46px] rounded-2xl border border-red-200 bg-white text-sm font-semibold text-red-600 transition hover:bg-red-50"
                          >
                            삭제
                          </button>
                        </div>
                      </div>
                    </article>
                  ))}

                  {(selectedProduct.images?.length ?? 0) === 0 ? (
                    <p className="rounded-2xl border border-dashed border-stone-300 p-5 text-sm text-stone-500 sm:col-span-2">
                      아직 사진이 없습니다. 위 버튼으로 바로 촬영하거나 앨범에서 여러 장을 선택할 수 있습니다.
                    </p>
                  ) : null}
                </div>
              </>
            ) : (
              <p className="mt-4 rounded-2xl border border-dashed border-stone-300 p-5 text-sm text-stone-500">
                먼저 제품 기본정보를 저장해 주세요. 저장 후 이 영역이 바로 활성화됩니다.
              </p>
            )}
          </section>
        </div>
      </section>
    </div>
  )
}
