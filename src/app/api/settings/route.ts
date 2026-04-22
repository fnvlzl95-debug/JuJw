export const runtime = 'edge'

import { NextResponse } from 'next/server'
import { getPublicSettings } from '@/lib/db'

export async function GET() {
  const settings = await getPublicSettings()
  return NextResponse.json({ settings })
}
