import AdminShell from '@/components/admin/AdminShell'
import ProductsManager from '@/components/admin/ProductsManager'
import { buildPageMetadata } from '@/lib/metadata'
import { requireAdminSession } from '@/lib/auth'
import { getCategories, getProducts } from '@/lib/site-data'

export const metadata = buildPageMetadata({
  title: '관리자 제품 관리',
  description: '제품 카탈로그와 대표 라인업을 관리하는 관리자 페이지입니다.',
  path: '/admin/products',
})

export default async function AdminProductsPage() {
  const session = await requireAdminSession()
  const [categories, products] = await Promise.all([getCategories(), getProducts()])

  return (
    <AdminShell
      adminName={session.name}
      title="제품 관리"
      description="공개 카탈로그와 메인 대표 라인업에 노출되는 제품 데이터를 관리합니다."
    >
      <ProductsManager categories={categories} products={products} />
    </AdminShell>
  )
}
