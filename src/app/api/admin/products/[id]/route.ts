import { deleteProduct, updateProduct } from '@/lib/site-data'
import { jsonError, jsonOk, requireAdminApiSession } from '@/lib/api'
import { ValidationError, validateProductPayload } from '@/lib/validation'

function parseId(value: string) {
  const id = Number(value)
  if (!Number.isFinite(id)) {
    throw new ValidationError('잘못된 제품 ID입니다.')
  }
  return id
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await requireAdminApiSession()
  if (!session) {
    return jsonError('인증이 필요합니다.', 401)
  }

  try {
    const productId = parseId(params.id)
    const payload = validateProductPayload(await request.json())
    const product = await updateProduct(productId, payload)
    return jsonOk(product)
  } catch (error) {
    if (error instanceof ValidationError) {
      return jsonError(error.message, 400)
    }

    return jsonError(error instanceof Error ? error.message : '제품 수정에 실패했습니다.', 500)
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const session = await requireAdminApiSession()
  if (!session) {
    return jsonError('인증이 필요합니다.', 401)
  }

  try {
    const productId = parseId(params.id)
    await deleteProduct(productId)
    return jsonOk({ id: productId })
  } catch (error) {
    if (error instanceof ValidationError) {
      return jsonError(error.message, 400)
    }

    return jsonError(error instanceof Error ? error.message : '제품 삭제에 실패했습니다.', 500)
  }
}
