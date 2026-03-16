import { NextResponse } from 'next/server'
import { getAdminSession } from '@/lib/auth'

export function jsonError(message: string, status = 400) {
  return NextResponse.json({ ok: false, message }, { status })
}

export function jsonOk<T>(data: T, init?: ResponseInit) {
  return NextResponse.json({ ok: true, data }, init)
}

export async function requireAdminApiSession() {
  const session = await getAdminSession()
  return session ?? null
}
