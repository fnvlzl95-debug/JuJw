import { NextResponse } from 'next/server'
import { setAdminSessionCookie } from '@/lib/auth'
import { authenticateAdmin } from '@/lib/site-data'
import { jsonError, jsonOk } from '@/lib/api'
import { ValidationError, validateLoginPayload } from '@/lib/validation'

export async function POST(request: Request) {
  try {
    const { email, password } = validateLoginPayload(await request.json())
    const admin = await authenticateAdmin(email, password)

    if (!admin) {
      return jsonError('이메일 또는 비밀번호가 올바르지 않습니다.', 401)
    }

    const response = NextResponse.json({
      ok: true,
      data: {
        id: admin.id,
        email: admin.email,
        name: admin.name,
      },
    })

    setAdminSessionCookie(response, admin)
    return response
  } catch (error) {
    if (error instanceof ValidationError) {
      return jsonError(error.message, 400)
    }

    return jsonError('로그인 처리 중 오류가 발생했습니다.', 500)
  }
}
