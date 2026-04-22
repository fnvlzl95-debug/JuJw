import { getCloudflareEnv } from '@/lib/env'

const MAX_UPLOAD_BYTES = 10 * 1024 * 1024
const ALLOWED_MIME_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp'])

type UploadResult = {
  key: string | null
  url: string
}

function sanitizeFilename(name: string): string {
  return name
    .toLowerCase()
    .replace(/\.[^/.]+$/, '')
    .replace(/[^a-z0-9-_]+/g, '-')
    .replace(/-{2,}/g, '-')
    .replace(/^-|-$/g, '')
}

function extensionFromMimeType(type: string): string {
  if (type === 'image/png') return 'png'
  if (type === 'image/webp') return 'webp'
  return 'jpg'
}

function getPublicBaseUrl(): string | null {
  const env = getCloudflareEnv()
  return process.env.R2_PUBLIC_BASE_URL ?? env.R2_PUBLIC_BASE_URL ?? null
}

export async function uploadProductImageToR2(input: {
  productId: number
  file: File
}): Promise<UploadResult> {
  const { productId, file } = input

  if (!ALLOWED_MIME_TYPES.has(file.type)) {
    throw new Error('jpg/png/webp 파일만 업로드할 수 있습니다.')
  }

  if (file.size > MAX_UPLOAD_BYTES) {
    throw new Error('최대 10MB 파일까지 업로드할 수 있습니다.')
  }

  const extension = extensionFromMimeType(file.type)
  const base = sanitizeFilename(file.name || `product-${productId}`)
  const key = `products/${productId}/${Date.now()}-${base}.${extension}`

  const env = getCloudflareEnv()
  const bucket = env.BUCKET
  if (!bucket) {
    return {
      key: null,
      url: '/img/hero/hero.png',
    }
  }

  const arrayBuffer = await file.arrayBuffer()
  await bucket.put(key, arrayBuffer, {
    httpMetadata: {
      contentType: file.type,
    },
  })

  const publicBase = getPublicBaseUrl()
  if (!publicBase) {
    return {
      key,
      url: key,
    }
  }

  return {
    key,
    url: `${publicBase.replace(/\/$/, '')}/${key}`,
  }
}

export async function deleteR2Object(key: string): Promise<void> {
  const env = getCloudflareEnv()
  if (!env.BUCKET) {
    return
  }
  await env.BUCKET.delete(key)
}
