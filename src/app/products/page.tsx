import ProductsShowcasePage from '@/components/products/ProductsShowcasePage'
import { getCategories, getProducts, getPublicSettings } from '@/lib/db'
import { normalizeSiteSettings } from '@/lib/site-settings'

export const dynamic = 'force-dynamic'

export default async function ProductsPage() {
  const [categories, products, rawSettings] = await Promise.all([
    getCategories(),
    getProducts({ published: true }),
    getPublicSettings(),
  ])

  return (
    <ProductsShowcasePage
      categories={categories}
      products={products}
      settings={normalizeSiteSettings(rawSettings)}
    />
  )
}
