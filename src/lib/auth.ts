import 'server-only'

import { createHmac, randomBytes, scryptSync, timingSafeEqual } from 'node:crypto'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { NextResponse } from 'next/server'
import type { AdminSession, AdminUser } from '@/types/site'

const SESSION_COOKIE_NAME = 'jujw_admin_session'
const SESSION_TTL_SECONDS = 60 * 60 * 12

function getSessionSecret() {
  return process.env.SESSION_SECRET || 'jujw-local-session-secret'
}

function sign(value: string) {
  return createHmac('sha256', getSessionSecret()).update(value).digest('base64url')
}

function encodeSession(session: AdminSession) {
  const payload = Buffer.from(JSON.stringify(session)).toString('base64url')
  return `${payload}.${sign(payload)}`
}

function decodeSession(token: string): AdminSession | null {
  const [payload, signature] = token.split('.')

  if (!payload || !signature) {
    return null
  }

  const expected = sign(payload)
  const actualBuffer = Buffer.from(signature)
  const expectedBuffer = Buffer.from(expected)

  if (actualBuffer.length !== expectedBuffer.length) {
    return null
  }

  if (!timingSafeEqual(actualBuffer, expectedBuffer)) {
    return null
  }

  try {
    const parsed = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8')) as AdminSession
    if (parsed.exp * 1000 < Date.now()) {
      return null
    }
    return parsed
  } catch {
    return null
  }
}

export function hashPassword(password: string) {
  const salt = randomBytes(16).toString('hex')
  const hash = scryptSync(password, salt, 64).toString('hex')
  return `${salt}:${hash}`
}

export function verifyPassword(password: string, storedHash: string) {
  const [salt, hash] = storedHash.split(':')
  if (!salt || !hash) {
    return false
  }

  const candidate = scryptSync(password, salt, 64).toString('hex')
  const candidateBuffer = Buffer.from(candidate)
  const hashBuffer = Buffer.from(hash)

  if (candidateBuffer.length !== hashBuffer.length) {
    return false
  }

  return timingSafeEqual(candidateBuffer, hashBuffer)
}

export function setAdminSessionCookie(
  response: NextResponse,
  admin: Pick<AdminUser, 'id' | 'email' | 'name'>
) {
  const session: AdminSession = {
    adminId: admin.id,
    email: admin.email,
    name: admin.name,
    exp: Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS,
  }

  response.cookies.set(SESSION_COOKIE_NAME, encodeSession(session), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: SESSION_TTL_SECONDS,
  })
}

export function clearAdminSessionCookie(response: NextResponse) {
  response.cookies.set(SESSION_COOKIE_NAME, '', {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 0,
  })
}

export async function getAdminSession() {
  const cookieStore = cookies()
  const sessionToken = cookieStore.get(SESSION_COOKIE_NAME)?.value
  return sessionToken ? decodeSession(sessionToken) : null
}

export async function requireAdminSession() {
  const session = await getAdminSession()
  if (!session) {
    redirect('/admin/login')
  }
  return session
}
