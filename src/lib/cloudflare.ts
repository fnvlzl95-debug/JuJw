import 'server-only'

import type { CloudflareBindings, D1DatabaseLike, R2BucketLike } from '@/types/site'

type GlobalWithCloudflare = typeof globalThis & {
  __cloudflareBindings?: Partial<CloudflareBindings>
}

const dynamicImport = new Function(
  'specifier',
  'return import(specifier)'
) as (specifier: string) => Promise<unknown>

export async function getCloudflareBindings(): Promise<Partial<CloudflareBindings> | null> {
  const globalWithBindings = globalThis as GlobalWithCloudflare

  if (globalWithBindings.__cloudflareBindings) {
    return globalWithBindings.__cloudflareBindings
  }

  try {
    const mod = (await dynamicImport('cloudflare:workers')) as { env?: Partial<CloudflareBindings> }
    if (mod?.env) {
      globalWithBindings.__cloudflareBindings = mod.env
      return mod.env
    }
  } catch {
    return null
  }

  return null
}

export async function getD1Database(): Promise<D1DatabaseLike | null> {
  const bindings = await getCloudflareBindings()
  return bindings?.DB ?? null
}

export async function getR2Bucket(): Promise<R2BucketLike | null> {
  const bindings = await getCloudflareBindings()
  return bindings?.BUCKET ?? null
}
