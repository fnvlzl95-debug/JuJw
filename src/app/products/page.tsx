import ProductsCatalog from '@/components/products/ProductsCatalog'
import { buildPageMetadata } from '@/lib/metadata'
import { getCategories, getProducts } from '@/lib/site-data'

export const metadata = buildPageMetadata({
  title: '제품 라인업',
  description: '카테고리별 대표 주얼리 라인업을 확인하고 관심 제품 상담을 요청할 수 있습니다.',
  path: '/products',
})

export default async function ProductsPage() {
  const [categories, products] = await Promise.all([getCategories(), getProducts()])

  return (
    <>
      <section className="pt-[72px]">
        <div className="py-20 lg:py-24 px-6 bg-bg-secondary">
          <div className="max-w-content mx-auto text-center">
            <p className="text-[11px] font-medium tracking-[0.15em] uppercase text-accent mb-4">
              Collection
            </p>
            <h1 className="font-serif text-3xl lg:text-[2.8rem] font-light text-text-default mb-6">
              제품 라인업
            </h1>
            <p className="text-[15px] text-text-muted max-w-[480px] mx-auto">
              엄선된 대표 라인업을 카테고리별로 확인하고,
              관심 제품은 바로 상담으로 이어갈 수 있습니다.
            </p>
          </div>
        </div>
      </section>

      <ProductsCatalog categories={categories} products={products} />
    </>
  )
}
