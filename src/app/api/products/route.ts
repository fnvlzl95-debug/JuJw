import { getProducts } from '@/lib/site-data'
import { jsonOk } from '@/lib/api'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category') || undefined
  const featuredOnly = searchParams.get('featured') === 'true'

  const products = await getProducts({
    categorySlug: category,
    featuredOnly,
  })

  return jsonOk(products)
}
