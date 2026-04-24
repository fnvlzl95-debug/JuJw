import type { Metadata } from 'next'
import ProductsListPage from '@/components/products/ProductsListPage'
import { getCategories, getProducts } from '@/lib/db'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: '전체 제품 목록',
  description: 'Ju 주얼리 컬렉션의 전체 제품을 카테고리별로 확인해 보세요.',
  alternates: {
    canonical: '/products/all',
  },
}

export default async function ProductsAllPage() {
  const [categories, products] = await Promise.all([
    getCategories(),
    getProducts({ published: true }),
  ])

  return <ProductsListPage categories={categories} products={products} />
}
