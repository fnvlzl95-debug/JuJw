import { getRequestContext } from '@cloudflare/next-on-pages'

export type AppEnv = {
  DB?: D1Database
  BUCKET?: R2Bucket
  JWT_SECRET?: string
  SITE_URL?: string
  R2_PUBLIC_BASE_URL?: string
  ADMIN_EMAIL?: string
  ADMIN_PASSWORD?: string
}

export function getCloudflareEnv(): AppEnv {
  try {
    const context = getRequestContext()
    return (context?.env ?? {}) as AppEnv
  } catch {
    return {}
  }
}

export function getSiteUrl(): string {
  const env = getCloudflareEnv()
  return (
    process.env.SITE_URL ??
    env.SITE_URL ??
    'https://jujw.pages.dev'
  )
}

export function isProductionRuntime(): boolean {
  return process.env.NODE_ENV === 'production'
}

export function getOptionalJwtSecret(): string | undefined {
  const env = getCloudflareEnv()
  return process.env.JWT_SECRET ?? env.JWT_SECRET
}

export function getJwtSecret(): string {
  const secret = getOptionalJwtSecret()
  if (secret) {
    return secret
  }

  if (isProductionRuntime()) {
    throw new Error('JWT_SECRET is required in production.')
  }

  return 'dev-only-local-secret'
}
