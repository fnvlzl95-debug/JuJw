export type InquiryStatus = 'pending' | 'contacted' | 'completed'

export type Category = {
  id: number
  name: string
  slug: string
  orderIndex: number
}

export type ProductImage = {
  id: number
  productId: number
  objectKey: string | null
  url: string
  altText: string | null
  isPrimary: boolean
  orderIndex: number
}

export type Product = {
  id: number
  categoryId: number
  categoryName?: string
  categorySlug?: string
  name: string
  slug: string
  spec: string | null
  description: string | null
  isFeatured: boolean
  isPublished: boolean
  orderIndex: number
  imageUrl: string | null
  createdAt: string
  updatedAt: string
  images?: ProductImage[]
}

export type ProductInput = {
  categoryId: number
  name: string
  slug: string
  spec?: string | null
  description?: string | null
  isFeatured?: boolean
  isPublished?: boolean
  orderIndex?: number
}

export type Inquiry = {
  id: number
  companyName: string
  phone: string
  interest: string | null
  message: string | null
  status: InquiryStatus
  createdAt: string
  updatedAt: string
}

export type InquiryInput = {
  companyName: string
  phone: string
  interest?: string | null
  message?: string | null
  ipAddress?: string | null
}

export type Notice = {
  id: number
  title: string
  content: string
  isPublished: boolean
  isPinned: boolean
  createdAt: string
  updatedAt: string
}

export type NoticeInput = {
  title: string
  content: string
  isPublished?: boolean
  isPinned?: boolean
}

export type Admin = {
  id: number
  email: string
  name: string | null
  passwordHash: string
}

export type DashboardSummary = {
  productCount: number
  pendingInquiryCount: number
  totalInquiryCount: number
  noticeCount: number
}
