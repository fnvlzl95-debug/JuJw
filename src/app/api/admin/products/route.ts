import { createProduct, getProducts } from '@/lib/site-data'
import { jsonError, jsonOk, requireAdminApiSession } from '@/lib/api'
import { ValidationError, validateProductPayload } from '@/lib/validation'

export async function GET() {
  const session = await requireAdminApiSession()
  if (!session) {
    return jsonError('인증이 필요합니다.', 401)
  }

  const products = await getProducts()
  return jsonOk(products)
}

export async function POST(request: Request) {
  const session = await requireAdminApiSession()
  if (!session) {
    return jsonError('인증이 필요합니다.', 401)
  }

  try {
    const payload = validateProductPayload(await request.json())
    const product = await createProduct(payload)
    return jsonOk(product, { status: 201 })
  } catch (error) {
    if (error instanceof ValidationError) {
      return jsonError(error.message, 400)
    }

    return jsonError(error instanceof Error ? error.message : '제품 생성에 실패했습니다.', 500)
  }
}
