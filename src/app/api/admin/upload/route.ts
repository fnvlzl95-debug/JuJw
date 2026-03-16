import { getR2Bucket } from '@/lib/cloudflare'
import { jsonError, jsonOk, requireAdminApiSession } from '@/lib/api'

function normalizeName(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9.-]+/g, '-')
    .replace(/-+/g, '-')
}

export async function POST(request: Request) {
  const session = await requireAdminApiSession()
  if (!session) {
    return jsonError('인증이 필요합니다.', 401)
  }

  const bucket = await getR2Bucket()
  if (!bucket) {
    return jsonError('R2 버킷이 연결되지 않았습니다. 이미지 URL 직접 입력을 사용해 주세요.', 503)
  }

  const formData = await request.formData()
  const file = formData.get('file')

  if (!(file instanceof File)) {
    return jsonError('업로드할 파일이 없습니다.', 400)
  }

  const timestamp = Date.now()
  const key = `products/${timestamp}-${normalizeName(file.name || 'upload')}`
  await bucket.put(key, await file.arrayBuffer(), {
    httpMetadata: {
      contentType: file.type || 'application/octet-stream',
    },
  })

  const publicBaseUrl = process.env.R2_PUBLIC_BASE_URL || ''

  return jsonOk({
    key,
    url: publicBaseUrl ? `${publicBaseUrl.replace(/\/$/, '')}/${key}` : null,
  })
}
