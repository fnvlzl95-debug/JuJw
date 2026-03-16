import { getSiteSettings, updateSettings } from '@/lib/site-data'
import { jsonError, jsonOk, requireAdminApiSession } from '@/lib/api'
import { ValidationError, validateSettingsPayload } from '@/lib/validation'

export async function GET() {
  const session = await requireAdminApiSession()
  if (!session) {
    return jsonError('인증이 필요합니다.', 401)
  }

  const settings = await getSiteSettings()
  return jsonOk(settings)
}

export async function PUT(request: Request) {
  const session = await requireAdminApiSession()
  if (!session) {
    return jsonError('인증이 필요합니다.', 401)
  }

  try {
    const payload = validateSettingsPayload(await request.json())
    const settings = await updateSettings(payload)
    return jsonOk(settings)
  } catch (error) {
    if (error instanceof ValidationError) {
      return jsonError(error.message, 400)
    }

    return jsonError(error instanceof Error ? error.message : '설정 저장에 실패했습니다.', 500)
  }
}
