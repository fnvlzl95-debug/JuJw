export const runtime = 'edge'

import { NextResponse } from 'next/server'
import { getNotices } from '@/lib/db'

export async function GET() {
  const notices = await getNotices({ publishedOnly: true })
  return NextResponse.json({ notices })
}
