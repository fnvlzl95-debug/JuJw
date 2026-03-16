import { updateInquiryStatus } from '@/lib/site-data'
import { jsonError, jsonOk, requireAdminApiSession } from '@/lib/api'
import { ValidationError, isInquiryStatus } from '@/lib/validation'

function parseId(value: string) {
  const id = Number(value)
  if (!Number.isFinite(id)) {
    throw new ValidationError('잘못된 문의 ID입니다.')
  }
  return id
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await requireAdminApiSession()
  if (!session) {
    return jsonError('인증이 필요합니다.', 401)
  }

  try {
    const payload = (await request.json()) as { status?: unknown }
    if (!isInquiryStatus(payload.status)) {
      throw new ValidationError('잘못된 문의 상태입니다.')
    }

    const inquiry = await updateInquiryStatus(parseId(params.id), payload.status)
    return jsonOk(inquiry)
  } catch (error) {
    if (error instanceof ValidationError) {
      return jsonError(error.message, 400)
    }

    return jsonError(error instanceof Error ? error.message : '문의 상태 변경에 실패했습니다.', 500)
  }
}
