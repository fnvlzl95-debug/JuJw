export type InquiryStatus = 'pending' | 'contacted' | 'completed'

export interface Category {
  id: number
  name: string
  slug: string
  icon: string | null
  orderIndex: number
  createdAt: string
}

export interface StoredProduct {
  id: number
  categoryId: number
  name: string
  spec: string
  description: string
  imageUrl: string | null
  isFeatured: boolean
  orderIndex: number
  createdAt: string
  updatedAt: string
}

export interface Product extends StoredProduct {
  categorySlug: string
  categoryName: string
  categoryIcon: string | null
}

export interface Inquiry {
  id: number
  companyName: string
  phone: string
  interest: string | null
  message: string | null
  status: InquiryStatus
  createdAt: string
  updatedAt: string
}

export interface AdminUser {
  id: number
  email: string
  passwordHash: string
  name: string
  createdAt: string
}

export interface SiteSettings {
  siteName: string
  siteUrl: string
  heroTitle: string
  heroSubtitle: string
  heroDescription: string
  intro: string
  phone: string
  email: string
  addressLine1: string
  addressLine2: string
  postalCode: string
  hoursWeekday: string
  hoursWeekend: string
  parking: string
  businessName: string
  representativeName: string
  businessNumber: string
  mapEmbedUrl: string
  naverMapUrl: string
  footerNote: string
  contactResponseTime: string
}

export type SiteSettingKey = keyof SiteSettings

export interface LocalDb {
  categories: Category[]
  products: StoredProduct[]
  inquiries: Inquiry[]
  settings: SiteSettings
  admins: AdminUser[]
}

export interface ProductInput {
  categorySlug: string
  name: string
  spec: string
  description: string
  imageUrl: string | null
  isFeatured: boolean
  orderIndex: number
}

export interface InquiryInput {
  companyName: string
  phone: string
  interest: string | null
  message: string | null
}

export interface AdminSession {
  adminId: number
  email: string
  name: string
  exp: number
}

export interface DashboardSummary {
  totalProducts: number
  featuredProducts: number
  totalInquiries: number
  pendingInquiries: number
  latestInquiry: Inquiry | null
}

export interface D1PreparedStatementLike {
  bind(...values: Array<string | number | null>): D1PreparedStatementLike
  first<T>(): Promise<T | null>
  all<T>(): Promise<{ results: T[] }>
  run(): Promise<{ success: boolean; meta?: { last_row_id?: number } }>
}

export interface D1DatabaseLike {
  prepare(query: string): D1PreparedStatementLike
  batch<T = unknown>(
    statements: D1PreparedStatementLike[]
  ): Promise<Array<{ success: boolean; results?: T[] }>>
  exec(query: string): Promise<unknown>
}

export interface R2BucketLike {
  put(
    key: string,
    value: ReadableStream | ArrayBuffer | ArrayBufferView | string | Blob,
    options?: { httpMetadata?: { contentType?: string } }
  ): Promise<unknown>
}

export interface CloudflareBindings {
  DB?: D1DatabaseLike
  BUCKET?: R2BucketLike
}
