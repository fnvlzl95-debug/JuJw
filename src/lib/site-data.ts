import 'server-only'

import { promises as fs } from 'node:fs'
import path from 'node:path'
import { getD1Database } from '@/lib/cloudflare'
import { verifyPassword } from '@/lib/auth'
import type {
  AdminUser,
  Category,
  DashboardSummary,
  Inquiry,
  InquiryInput,
  InquiryStatus,
  LocalDb,
  Product,
  ProductInput,
  SiteSettingKey,
  SiteSettings,
  StoredProduct,
} from '@/types/site'

const LOCAL_DB_PATH = path.join(process.cwd(), 'data', 'local-db.json')

export const defaultSettings: SiteSettings = {
  siteName: 'Ju Jewelry',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://jujewelry.co.kr',
  heroTitle: '믿을 수 있는 귀금속 파트너',
  heroSubtitle: 'Premium Jewelry Wholesale',
  heroDescription: '사업자 고객을 위한 주얼리 도매 상담과 대표 라인업 안내를 제공합니다.',
  intro: '종로권 주얼리 도매 파트너로서 안정적인 품질과 빠른 응대를 지향합니다.',
  phone: '02-000-0000',
  email: 'info@jujewelry.kr',
  addressLine1: '서울특별시 종로구 종로3가 귀금속 상권',
  addressLine2: '방문 전 상담 예약 권장',
  postalCode: '03140',
  hoursWeekday: '평일 09:00 - 18:00',
  hoursWeekend: '주말/공휴일 휴무 (예약 상담 가능)',
  parking: '인근 공영주차장 이용',
  businessName: 'Ju Jewelry',
  representativeName: '홍길동',
  businessNumber: '000-00-00000',
  mapEmbedUrl:
    'https://www.google.com/maps?q=%EC%A2%85%EB%A1%9C3%EA%B0%80%20%EA%B7%80%EA%B8%88%EC%86%8D%EA%B1%B0%EB%A6%AC&output=embed',
  naverMapUrl: 'https://map.naver.com/p/search/%EC%A2%85%EB%A1%9C3%EA%B0%80%20%EA%B7%80%EA%B8%88%EC%86%8D%EA%B1%B0%EB%A6%AC',
  footerNote: '실제 사업자 정보와 상세 주소는 관리자 설정에서 교체할 수 있습니다.',
  contactResponseTime: '영업일 기준 24시간 이내 연락',
}

const settingKeys = Object.keys(defaultSettings) as SiteSettingKey[]

async function readLocalDb() {
  const raw = await fs.readFile(LOCAL_DB_PATH, 'utf8')
  return JSON.parse(raw) as LocalDb
}

async function writeLocalDb(db: LocalDb) {
  await fs.writeFile(LOCAL_DB_PATH, JSON.stringify(db, null, 2), 'utf8')
}

function hydrateProduct(product: StoredProduct, categories: Category[]): Product {
  const category = categories.find((item) => item.id === product.categoryId)
  if (!category) {
    throw new Error(`Category not found for product ${product.id}`)
  }

  return {
    ...product,
    categorySlug: category.slug,
    categoryName: category.name,
    categoryIcon: category.icon,
  }
}

function sortProducts(products: StoredProduct[]) {
  return [...products].sort((a, b) => a.orderIndex - b.orderIndex || a.id - b.id)
}

function sortCategories(categories: Category[]) {
  return [...categories].sort((a, b) => a.orderIndex - b.orderIndex || a.id - b.id)
}

function normalizeSettings(nextSettings: Partial<SiteSettings>) {
  return {
    ...defaultSettings,
    ...nextSettings,
  }
}

function mapD1Settings(rows: Array<{ key: string; value: string }>) {
  const settings = { ...defaultSettings }

  for (const row of rows) {
    if (row.key in settings) {
      settings[row.key as SiteSettingKey] = row.value
    }
  }

  return settings
}

function mapD1ProductRow(
  row: {
    id: number
    categoryId: number
    name: string
    spec: string
    description: string
    imageUrl: string | null
    isFeatured: number
    orderIndex: number
    createdAt: string
    updatedAt: string
    categorySlug: string
    categoryName: string
    categoryIcon: string | null
  }
): Product {
  return {
    id: row.id,
    categoryId: row.categoryId,
    name: row.name,
    spec: row.spec,
    description: row.description,
    imageUrl: row.imageUrl,
    isFeatured: Boolean(row.isFeatured),
    orderIndex: row.orderIndex,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
    categorySlug: row.categorySlug,
    categoryName: row.categoryName,
    categoryIcon: row.categoryIcon,
  }
}

export async function getSiteSettings() {
  const db = await getD1Database()
  if (!db) {
    const localDb = await readLocalDb()
    return normalizeSettings(localDb.settings)
  }

  const { results } = await db
    .prepare('SELECT key, value FROM settings')
    .all<{ key: string; value: string }>()

  return mapD1Settings(results)
}

export async function getCategories() {
  const db = await getD1Database()
  if (!db) {
    const localDb = await readLocalDb()
    return sortCategories(localDb.categories)
  }

  const { results } = await db.prepare(
    `
      SELECT
        id,
        name,
        slug,
        icon,
        order_index AS orderIndex,
        created_at AS createdAt
      FROM categories
      ORDER BY order_index, id
    `
  ).all<Category>()

  return results
}

export async function getProducts(options?: { categorySlug?: string; featuredOnly?: boolean }) {
  const db = await getD1Database()

  if (!db) {
    const localDb = await readLocalDb()
    const categories = sortCategories(localDb.categories)
    const selectedCategory = options?.categorySlug
      ? categories.find((category) => category.slug === options.categorySlug)
      : null

    const filtered = sortProducts(localDb.products).filter((product) => {
      if (options?.featuredOnly && !product.isFeatured) {
        return false
      }

      if (selectedCategory && product.categoryId !== selectedCategory.id) {
        return false
      }

      return true
    })

    return filtered.map((product) => hydrateProduct(product, categories))
  }

  const clauses = ['1 = 1']
  const values: Array<string | number | null> = []

  if (options?.categorySlug) {
    clauses.push('categories.slug = ?')
    values.push(options.categorySlug)
  }

  if (options?.featuredOnly) {
    clauses.push('products.is_featured = 1')
  }

  const { results } = await db.prepare(
    `
      SELECT
        products.id AS id,
        products.category_id AS categoryId,
        products.name AS name,
        products.spec AS spec,
        products.description AS description,
        products.image_url AS imageUrl,
        products.is_featured AS isFeatured,
        products.order_index AS orderIndex,
        products.created_at AS createdAt,
        products.updated_at AS updatedAt,
        categories.slug AS categorySlug,
        categories.name AS categoryName,
        categories.icon AS categoryIcon
      FROM products
      INNER JOIN categories ON categories.id = products.category_id
      WHERE ${clauses.join(' AND ')}
      ORDER BY products.order_index, products.id
    `
  ).bind(...values).all<{
    id: number
    categoryId: number
    name: string
    spec: string
    description: string
    imageUrl: string | null
    isFeatured: number
    orderIndex: number
    createdAt: string
    updatedAt: string
    categorySlug: string
    categoryName: string
    categoryIcon: string | null
  }>()

  return results.map(mapD1ProductRow)
}

export async function getFeaturedProducts() {
  return getProducts({ featuredOnly: true })
}

export async function createInquiry(input: InquiryInput) {
  const db = await getD1Database()
  if (!db) {
    const localDb = await readLocalDb()
    const now = new Date().toISOString()
    const inquiry: Inquiry = {
      id: Math.max(0, ...localDb.inquiries.map((item) => item.id)) + 1,
      companyName: input.companyName,
      phone: input.phone,
      interest: input.interest,
      message: input.message,
      status: 'pending',
      createdAt: now,
      updatedAt: now,
    }
    localDb.inquiries.unshift(inquiry)
    await writeLocalDb(localDb)
    return inquiry
  }

  await db.prepare(
    `
      INSERT INTO inquiries (company_name, phone, interest, message, status)
      VALUES (?, ?, ?, ?, 'pending')
    `
  ).bind(input.companyName, input.phone, input.interest, input.message).run()

  const inquiry = await db.prepare(
    `
      SELECT
        id,
        company_name AS companyName,
        phone,
        interest,
        message,
        status,
        created_at AS createdAt,
        updated_at AS updatedAt
      FROM inquiries
      ORDER BY id DESC
      LIMIT 1
    `
  ).first<Inquiry>()

  if (!inquiry) {
    throw new Error('Failed to load created inquiry')
  }

  return inquiry
}

export async function listInquiries() {
  const db = await getD1Database()
  if (!db) {
    const localDb = await readLocalDb()
    return [...localDb.inquiries].sort((a, b) => b.id - a.id)
  }

  const { results } = await db.prepare(
    `
      SELECT
        id,
        company_name AS companyName,
        phone,
        interest,
        message,
        status,
        created_at AS createdAt,
        updated_at AS updatedAt
      FROM inquiries
      ORDER BY id DESC
    `
  ).all<Inquiry>()

  return results
}

export async function updateInquiryStatus(id: number, status: InquiryStatus) {
  const db = await getD1Database()
  if (!db) {
    const localDb = await readLocalDb()
    const inquiry = localDb.inquiries.find((item) => item.id === id)

    if (!inquiry) {
      throw new Error('Inquiry not found')
    }

    inquiry.status = status
    inquiry.updatedAt = new Date().toISOString()
    await writeLocalDb(localDb)
    return inquiry
  }

  await db.prepare(
    `
      UPDATE inquiries
      SET status = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `
  ).bind(status, id).run()

  const inquiry = await db.prepare(
    `
      SELECT
        id,
        company_name AS companyName,
        phone,
        interest,
        message,
        status,
        created_at AS createdAt,
        updated_at AS updatedAt
      FROM inquiries
      WHERE id = ?
    `
  ).bind(id).first<Inquiry>()

  if (!inquiry) {
    throw new Error('Inquiry not found')
  }

  return inquiry
}

async function findCategoryBySlug(slug: string) {
  const categories = await getCategories()
  return categories.find((category) => category.slug === slug) ?? null
}

export async function createProduct(input: ProductInput) {
  const category = await findCategoryBySlug(input.categorySlug)
  if (!category) {
    throw new Error('Category not found')
  }

  const db = await getD1Database()
  if (!db) {
    const localDb = await readLocalDb()
    const now = new Date().toISOString()
    const product: StoredProduct = {
      id: Math.max(0, ...localDb.products.map((item) => item.id)) + 1,
      categoryId: category.id,
      name: input.name,
      spec: input.spec,
      description: input.description,
      imageUrl: input.imageUrl,
      isFeatured: input.isFeatured,
      orderIndex: input.orderIndex,
      createdAt: now,
      updatedAt: now,
    }
    localDb.products.push(product)
    await writeLocalDb(localDb)
    return hydrateProduct(product, localDb.categories)
  }

  await db.prepare(
    `
      INSERT INTO products (
        category_id,
        name,
        spec,
        description,
        image_url,
        is_featured,
        order_index
      )
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `
  ).bind(
    category.id,
    input.name,
    input.spec,
    input.description,
    input.imageUrl,
    input.isFeatured ? 1 : 0,
    input.orderIndex
  ).run()

  const product = await db.prepare(
    `
      SELECT
        products.id AS id,
        products.category_id AS categoryId,
        products.name AS name,
        products.spec AS spec,
        products.description AS description,
        products.image_url AS imageUrl,
        products.is_featured AS isFeatured,
        products.order_index AS orderIndex,
        products.created_at AS createdAt,
        products.updated_at AS updatedAt,
        categories.slug AS categorySlug,
        categories.name AS categoryName,
        categories.icon AS categoryIcon
      FROM products
      INNER JOIN categories ON categories.id = products.category_id
      ORDER BY products.id DESC
      LIMIT 1
    `
  ).first<{
    id: number
    categoryId: number
    name: string
    spec: string
    description: string
    imageUrl: string | null
    isFeatured: number
    orderIndex: number
    createdAt: string
    updatedAt: string
    categorySlug: string
    categoryName: string
    categoryIcon: string | null
  }>()

  if (!product) {
    throw new Error('Failed to load created product')
  }

  return mapD1ProductRow(product)
}

export async function updateProduct(id: number, input: ProductInput) {
  const category = await findCategoryBySlug(input.categorySlug)
  if (!category) {
    throw new Error('Category not found')
  }

  const db = await getD1Database()
  if (!db) {
    const localDb = await readLocalDb()
    const product = localDb.products.find((item) => item.id === id)

    if (!product) {
      throw new Error('Product not found')
    }

    Object.assign(product, {
      categoryId: category.id,
      name: input.name,
      spec: input.spec,
      description: input.description,
      imageUrl: input.imageUrl,
      isFeatured: input.isFeatured,
      orderIndex: input.orderIndex,
      updatedAt: new Date().toISOString(),
    })

    await writeLocalDb(localDb)
    return hydrateProduct(product, localDb.categories)
  }

  await db.prepare(
    `
      UPDATE products
      SET
        category_id = ?,
        name = ?,
        spec = ?,
        description = ?,
        image_url = ?,
        is_featured = ?,
        order_index = ?,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `
  ).bind(
    category.id,
    input.name,
    input.spec,
    input.description,
    input.imageUrl,
    input.isFeatured ? 1 : 0,
    input.orderIndex,
    id
  ).run()

  const product = await db.prepare(
    `
      SELECT
        products.id AS id,
        products.category_id AS categoryId,
        products.name AS name,
        products.spec AS spec,
        products.description AS description,
        products.image_url AS imageUrl,
        products.is_featured AS isFeatured,
        products.order_index AS orderIndex,
        products.created_at AS createdAt,
        products.updated_at AS updatedAt,
        categories.slug AS categorySlug,
        categories.name AS categoryName,
        categories.icon AS categoryIcon
      FROM products
      INNER JOIN categories ON categories.id = products.category_id
      WHERE products.id = ?
    `
  ).bind(id).first<{
    id: number
    categoryId: number
    name: string
    spec: string
    description: string
    imageUrl: string | null
    isFeatured: number
    orderIndex: number
    createdAt: string
    updatedAt: string
    categorySlug: string
    categoryName: string
    categoryIcon: string | null
  }>()

  if (!product) {
    throw new Error('Product not found')
  }

  return mapD1ProductRow(product)
}

export async function deleteProduct(id: number) {
  const db = await getD1Database()
  if (!db) {
    const localDb = await readLocalDb()
    localDb.products = localDb.products.filter((item) => item.id !== id)
    await writeLocalDb(localDb)
    return
  }

  await db.prepare('DELETE FROM products WHERE id = ?').bind(id).run()
}

export async function findAdminByEmail(email: string) {
  const db = await getD1Database()
  if (!db) {
    const localDb = await readLocalDb()
    return (
      localDb.admins.find((admin) => admin.email.toLowerCase() === email.toLowerCase()) ?? null
    )
  }

  return db.prepare(
    `
      SELECT
        id,
        email,
        password_hash AS passwordHash,
        name,
        created_at AS createdAt
      FROM admins
      WHERE email = ?
    `
  ).bind(email).first<AdminUser>()
}

export async function authenticateAdmin(email: string, password: string) {
  if (process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD) {
    if (
      email.toLowerCase() === process.env.ADMIN_EMAIL.toLowerCase() &&
      password === process.env.ADMIN_PASSWORD
    ) {
      return {
        id: 0,
        email: process.env.ADMIN_EMAIL,
        name: 'Primary Admin',
        passwordHash: '',
        createdAt: new Date().toISOString(),
      } satisfies AdminUser
    }
  }

  const admin = await findAdminByEmail(email)
  if (!admin) {
    return null
  }

  return (await verifyPassword(password, admin.passwordHash)) ? admin : null
}

export async function updateSettings(input: Partial<SiteSettings>) {
  const db = await getD1Database()
  if (!db) {
    const localDb = await readLocalDb()
    localDb.settings = normalizeSettings({
      ...localDb.settings,
      ...input,
    })
    await writeLocalDb(localDb)
    return localDb.settings
  }

  const nextSettings = normalizeSettings({
    ...(await getSiteSettings()),
    ...input,
  })

  await db.batch(
    settingKeys.map((key) =>
      db.prepare(
        `
          INSERT INTO settings (key, value, updated_at)
          VALUES (?, ?, CURRENT_TIMESTAMP)
          ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = CURRENT_TIMESTAMP
        `
      ).bind(key, nextSettings[key])
    )
  )

  return nextSettings
}

export async function getDashboardSummary(): Promise<DashboardSummary> {
  const [products, inquiries] = await Promise.all([getProducts(), listInquiries()])

  return {
    totalProducts: products.length,
    featuredProducts: products.filter((product) => product.isFeatured).length,
    totalInquiries: inquiries.length,
    pendingInquiries: inquiries.filter((inquiry) => inquiry.status === 'pending').length,
    latestInquiry: inquiries[0] ?? null,
  }
}
