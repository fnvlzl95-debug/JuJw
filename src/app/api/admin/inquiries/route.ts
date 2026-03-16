import { listInquiries } from '@/lib/site-data'
import { jsonError, jsonOk, requireAdminApiSession } from '@/lib/api'

export async function GET() {
  const session = await requireAdminApiSession()
  if (!session) {
    return jsonError('인증이 필요합니다.', 401)
  }

  const inquiries = await listInquiries()
  return jsonOk(inquiries)
}
