type Bucket = {
  count: number
  resetAt: number
}

const store = new Map<string, Bucket>()

export function rateLimit(input: {
  key: string
  max: number
  windowMs: number
}): { allowed: boolean; remaining: number; retryAfterMs: number } {
  const now = Date.now()
  const existing = store.get(input.key)

  if (!existing || existing.resetAt <= now) {
    store.set(input.key, {
      count: 1,
      resetAt: now + input.windowMs,
    })
    return {
      allowed: true,
      remaining: input.max - 1,
      retryAfterMs: input.windowMs,
    }
  }

  if (existing.count >= input.max) {
    return {
      allowed: false,
      remaining: 0,
      retryAfterMs: existing.resetAt - now,
    }
  }

  existing.count += 1
  store.set(input.key, existing)

  return {
    allowed: true,
    remaining: input.max - existing.count,
    retryAfterMs: existing.resetAt - now,
  }
}
