import { getFeaturedProducts } from '@/lib/site-data'
import { jsonOk } from '@/lib/api'

export async function GET() {
  const products = await getFeaturedProducts()
  return jsonOk(products)
}
