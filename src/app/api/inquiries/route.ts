import { createInquiry } from '@/lib/site-data'
import { jsonError, jsonOk } from '@/lib/api'
import { ValidationError, validateInquiryPayload } from '@/lib/validation'

export async function POST(request: Request) {
  try {
    const payload = validateInquiryPayload(await request.json())
    const inquiry = await createInquiry(payload)
    return jsonOk(inquiry, { status: 201 })
  } catch (error) {
    if (error instanceof ValidationError) {
      return jsonError(error.message, 400)
    }

    return jsonError('문의 접수 중 오류가 발생했습니다.', 500)
  }
}
