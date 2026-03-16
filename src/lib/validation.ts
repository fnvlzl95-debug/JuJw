import type { InquiryInput, InquiryStatus, ProductInput, SiteSettings } from '@/types/site'

export class ValidationError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ValidationError'
  }
}

function toTrimmedString(value: unknown) {
  return typeof value === 'string' ? value.trim() : ''
}

function toNullableString(value: unknown) {
  const nextValue = toTrimmedString(value)
  return nextValue.length > 0 ? nextValue : null
}

function toBoolean(value: unknown) {
  if (typeof value === 'boolean') {
    return value
  }

  if (typeof value === 'string') {
    return value === 'true' || value === '1' || value === 'on'
  }

  return false
}

function toNumber(value: unknown, fallback = 0) {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return value
  }

  if (typeof value === 'string' && value.trim().length > 0) {
    const parsed = Number(value)
    return Number.isFinite(parsed) ? parsed : fallback
  }

  return fallback
}

export function isInquiryStatus(value: unknown): value is InquiryStatus {
  return value === 'pending' || value === 'contacted' || value === 'completed'
}

export function validateLoginPayload(payload: unknown) {
  if (!payload || typeof payload !== 'object') {
    throw new ValidationError('잘못된 로그인 요청입니다.')
  }

  const email = toTrimmedString((payload as Record<string, unknown>).email).toLowerCase()
  const password = toTrimmedString((payload as Record<string, unknown>).password)

  if (!email || !password) {
    throw new ValidationError('이메일과 비밀번호를 입력해 주세요.')
  }

  return { email, password }
}

export function validateInquiryPayload(payload: unknown): InquiryInput {
  if (!payload || typeof payload !== 'object') {
    throw new ValidationError('잘못된 문의 요청입니다.')
  }

  const companyName = toTrimmedString((payload as Record<string, unknown>).companyName)
  const phone = toTrimmedString((payload as Record<string, unknown>).phone)
  const interest = toNullableString((payload as Record<string, unknown>).interest)
  const message = toNullableString((payload as Record<string, unknown>).message)

  if (!companyName) {
    throw new ValidationError('상호 또는 성함을 입력해 주세요.')
  }

  if (!phone) {
    throw new ValidationError('연락처를 입력해 주세요.')
  }

  return {
    companyName,
    phone,
    interest,
    message,
  }
}

export function validateProductPayload(payload: unknown): ProductInput {
  if (!payload || typeof payload !== 'object') {
    throw new ValidationError('잘못된 제품 요청입니다.')
  }

  const source = payload as Record<string, unknown>
  const categorySlug = toTrimmedString(source.categorySlug)
  const name = toTrimmedString(source.name)
  const spec = toTrimmedString(source.spec)
  const description = toTrimmedString(source.description)
  const imageUrl = toNullableString(source.imageUrl)
  const isFeatured = toBoolean(source.isFeatured)
  const orderIndex = toNumber(source.orderIndex)

  if (!categorySlug) {
    throw new ValidationError('카테고리를 선택해 주세요.')
  }

  if (!name) {
    throw new ValidationError('제품명을 입력해 주세요.')
  }

  if (!spec) {
    throw new ValidationError('제품 스펙을 입력해 주세요.')
  }

  return {
    categorySlug,
    name,
    spec,
    description,
    imageUrl,
    isFeatured,
    orderIndex,
  }
}

export function validateSettingsPayload(payload: unknown) {
  if (!payload || typeof payload !== 'object') {
    throw new ValidationError('잘못된 설정 요청입니다.')
  }

  const source = payload as Record<string, unknown>
  const allowedKeys: Array<keyof SiteSettings> = [
    'siteName',
    'siteUrl',
    'heroTitle',
    'heroSubtitle',
    'heroDescription',
    'intro',
    'phone',
    'email',
    'addressLine1',
    'addressLine2',
    'postalCode',
    'hoursWeekday',
    'hoursWeekend',
    'parking',
    'businessName',
    'representativeName',
    'businessNumber',
    'mapEmbedUrl',
    'naverMapUrl',
    'footerNote',
    'contactResponseTime',
  ]

  const nextSettings: Partial<SiteSettings> = {}

  for (const key of allowedKeys) {
    if (key in source) {
      nextSettings[key] = toTrimmedString(source[key])
    }
  }

  if (!nextSettings.siteName && !nextSettings.businessName && Object.keys(nextSettings).length === 0) {
    throw new ValidationError('업데이트할 설정 값이 없습니다.')
  }

  return nextSettings
}
