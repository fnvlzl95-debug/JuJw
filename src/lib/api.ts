import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getAdminSessionFromRequest } from '@/lib/auth'

export function jsonError(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status })
}

export function jsonOk<T>(data: T, status = 200) {
  return NextResponse.json(data, { status })
}

export async function requireAdmin(request: Request | NextRequest) {
  const session = await getAdminSessionFromRequest(request)
  if (!session) {
    return {
      ok: false as const,
      response: jsonError('Unauthorized', 401),
    }
  }

  return {
    ok: true as const,
    session,
  }
}

export function createSlug(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}
