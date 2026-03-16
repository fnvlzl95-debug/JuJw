import { getSiteSettings } from '@/lib/site-data'
import { jsonOk } from '@/lib/api'

export async function GET() {
  const settings = await getSiteSettings()
  return jsonOk(settings)
}
