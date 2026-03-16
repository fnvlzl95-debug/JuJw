import { getCategories } from '@/lib/site-data'
import { jsonOk } from '@/lib/api'

export async function GET() {
  const categories = await getCategories()
  return jsonOk(categories)
}
