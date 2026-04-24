import { getCloudflareEnv, isProductionRuntime } from '@/lib/env'
import type {
  Admin,
  Category,
  DashboardSummary,
  Inquiry,
  InquiryInput,
  InquiryStatus,
  Notice,
  NoticeInput,
  Product,
  ProductImage,
  ProductInput,
} from '@/lib/models'

type ProductRecord = {
  id: number
  categoryId: number
  name: string
  slug: string
  spec: string | null
  description: string | null
  isFeatured: boolean
  isPublished: boolean
  orderIndex: number
  createdAt: string
  updatedAt: string
}

type InquiryRecord = {
  id: number
  companyName: string
  phone: string
  interest: string | null
  message: string | null
  status: InquiryStatus
  ipAddress: string | null
  createdAt: string
  updatedAt: string
}

type NoticeRecord = {
  id: number
  title: string
  content: string
  isPublished: boolean
  isPinned: boolean
  createdAt: string
  updatedAt: string
}

type SettingsMap = Record<string, string>

type MemoryStore = {
  categories: Category[]
  products: ProductRecord[]
  productImages: ProductImage[]
  inquiries: InquiryRecord[]
  settings: SettingsMap
  notices: NoticeRecord[]
  admins: Admin[]
  counters: {
    product: number
    productImage: number
    inquiry: number
    notice: number
    admin: number
  }
}

const DEFAULT_SETTINGS: SettingsMap = {
  shop_name: 'JU JEWELRY',
  phone_primary: '02-123-4567',
  phone_secondary: '010-9876-5432',
  email: 'contact@jujewelry.com',
  address: '서울특별시 종로구 돈화문로 10길 15 (묘동)',
  business_hours: '평일 10:30 - 19:30 / 주말 11:00 - 18:30',
  closed_day: '화요일 휴무',
  naver_map_url: 'https://map.naver.com',
  instagram_url: '',
  facebook_url: '',
  business_name: 'JU JEWELRY',
  representative_name: '',
  business_number: '',
  home_hero_line_1: '오래 간직할 수 있는 빛,',
  home_hero_line_2: 'Ju가 차분히 제안합니다',
  home_hero_cta: '컬렉션 보기',
  home_menu_cta: '상담 예약',
  home_menu_note: '제품 비교와 선물 상담이 필요하시면 문의 페이지에서 편하게 남겨 주세요.',
  home_benefit_1_title: '정교한 세공',
  home_benefit_1_description: '착용감과 비율까지 살핀 섬세한 마감',
  home_benefit_2_title: '선물 포장',
  home_benefit_2_description: '받는 순간까지 고급스럽게 완성하는 패키지',
  home_benefit_3_title: '엄선된 소재',
  home_benefit_3_description: '14K/18K 골드와 선별된 스톤의 안정적인 품질',
  home_benefit_4_title: '맞춤 상담',
  home_benefit_4_description: '예산과 용도에 맞춰 차분하게 제안합니다',
  home_brand_kicker: 'Brand Story',
  home_brand_title_1: '시간이 지나도',
  home_brand_title_2: '자연스럽게 빛나는 주얼리',
  home_brand_description:
    'Ju는 과한 장식보다 균형과 착용감을 먼저 봅니다. 매일의 옷차림에도, 특별한 날에도 편안하게 어울리는 주얼리를 제안합니다.',
  home_brand_cta: '브랜드 이야기 보기',
  home_collection_kicker: 'Collection',
  home_collection_title: '카테고리별 컬렉션',
  home_collection_necklaces_title: 'NECKLACES',
  home_collection_necklaces_subtitle: '목걸이',
  home_collection_earrings_title: 'EARRINGS',
  home_collection_earrings_subtitle: '귀걸이',
  home_collection_rings_title: 'RINGS',
  home_collection_rings_subtitle: '반지',
  home_collection_bracelets_title: 'BRACELETS',
  home_collection_bracelets_subtitle: '팔찌',
  home_recommended_kicker: 'Recommended',
  home_recommended_title: 'Ju 추천 제품',
  home_signature_kicker: 'Signature Collection',
  home_signature_title_1: '빛의 결을 담은',
  home_signature_title_2: '시그니처 컬렉션',
  home_signature_description:
    '작지만 선명한 반짝임, 매일 손이 가는 편안한 비율. Ju가 오래 착용할 수 있는 기본을 세심하게 고릅니다.',
  home_signature_cta: '시그니처 제품 보기',
  home_consult_kicker: 'Gift & Consultation',
  home_consult_title_1: '마음을 전하는 순간도',
  home_consult_title_2: '차분하게 준비해 드립니다',
  home_consult_description:
    '착용할 분의 취향, 예산, 필요한 날짜를 알려주시면 어울리는 제품과 포장까지 함께 안내해 드립니다.',
  home_consult_cta: '상담 예약하기',
  home_consult_feature_1_title: '선물 포장',
  home_consult_feature_1_description: '받는 순간까지 정돈된 패키지로 준비합니다.',
  home_consult_feature_2_title: '1:1 상담',
  home_consult_feature_2_description: '취향과 예산에 맞춰 부담 없이 비교해 드립니다.',
  home_consult_feature_3_title: '제품 확인',
  home_consult_feature_3_description: '소재와 스펙, 관리 방법까지 함께 안내합니다.',
  home_footer_note: '오래 착용할 수 있는 빛을 Ju의 시선으로 제안합니다.',
}

const DEFAULT_CATEGORIES: Category[] = [
  { id: 1, name: '반지', slug: 'rings', orderIndex: 1 },
  { id: 2, name: '목걸이', slug: 'necklaces', orderIndex: 2 },
  { id: 3, name: '귀걸이', slug: 'earrings', orderIndex: 3 },
  { id: 4, name: '팔찌', slug: 'bracelets', orderIndex: 4 },
]

const DEFAULT_PRODUCTS: ProductRecord[] = [
  {
    id: 1,
    categoryId: 1,
    name: '18K 솔리테어 반지',
    slug: '18k-solitaire-ring',
    spec: '0.3ct / 18K White Gold',
    description: '세련된 밴드 라인의 솔리테어 반지입니다.',
    isFeatured: true,
    isPublished: true,
    orderIndex: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 2,
    categoryId: 2,
    name: '사파이어 펜던트 목걸이',
    slug: 'sapphire-pendant-necklace',
    spec: '14K Gold / Natural Sapphire',
    description: '은은한 컬러감의 사파이어 포인트 목걸이입니다.',
    isFeatured: true,
    isPublished: true,
    orderIndex: 2,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 3,
    categoryId: 3,
    name: '드롭 이어링',
    slug: 'drop-earring',
    spec: '18K Rose Gold / Diamond',
    description: '데일리와 포멀 모두 어울리는 드롭 이어링입니다.',
    isFeatured: false,
    isPublished: true,
    orderIndex: 3,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

const DEFAULT_PRODUCT_IMAGES: ProductImage[] = [
  {
    id: 1,
    productId: 1,
    objectKey: null,
    url: '/img/hero/hero.png',
    altText: '18K 솔리테어 반지',
    isPrimary: true,
    orderIndex: 1,
  },
  {
    id: 2,
    productId: 2,
    objectKey: null,
    url: '/img/hero/hero.png',
    altText: '사파이어 펜던트 목걸이',
    isPrimary: true,
    orderIndex: 1,
  },
  {
    id: 3,
    productId: 3,
    objectKey: null,
    url: '/img/hero/hero.png',
    altText: '드롭 이어링',
    isPrimary: true,
    orderIndex: 1,
  },
]

declare global {
  // eslint-disable-next-line no-var
  var __jujwStore: MemoryStore | undefined
}

function createMemoryStore(): MemoryStore {
  return {
    categories: [...DEFAULT_CATEGORIES],
    products: [...DEFAULT_PRODUCTS],
    productImages: [...DEFAULT_PRODUCT_IMAGES],
    inquiries: [],
    settings: { ...DEFAULT_SETTINGS },
    notices: [],
    admins: [],
    counters: {
      product: 4,
      productImage: 4,
      inquiry: 1,
      notice: 1,
      admin: 1,
    },
  }
}

function memoryStore(): MemoryStore {
  if (!globalThis.__jujwStore) {
    globalThis.__jujwStore = createMemoryStore()
  }
  return globalThis.__jujwStore
}

function toBoolean(value: unknown): boolean {
  return value === true || value === 1 || value === '1'
}

function nowText(): string {
  return new Date().toISOString()
}

function getDb(): D1Database | null {
  const env = getCloudflareEnv()
  return env.DB ?? null
}

function ensurePersistentWrite(action: string): void {
  if (!getDb() && isProductionRuntime()) {
    throw new Error(`${action} requires a bound D1 database in production.`)
  }
}

async function allRows<T>(sql: string, params: unknown[] = []): Promise<T[] | null> {
  const db = getDb()
  if (!db) {
    return null
  }
  const prepared = db.prepare(sql).bind(...params)
  const result = await prepared.all<T>()
  return (result.results ?? []) as T[]
}

async function firstRow<T>(sql: string, params: unknown[] = []): Promise<T | null> {
  const db = getDb()
  if (!db) {
    return null
  }
  const prepared = db.prepare(sql).bind(...params)
  const result = await prepared.first<T>()
  return result ?? null
}

async function runQuery(sql: string, params: unknown[] = []): Promise<D1Result | null> {
  const db = getDb()
  if (!db) {
    return null
  }
  const prepared = db.prepare(sql).bind(...params)
  return prepared.run()
}

function mapProductRow(row: {
  id: number
  categoryId: number
  categoryName?: string
  categorySlug?: string
  name: string
  slug: string
  spec?: string | null
  description?: string | null
  isFeatured?: number | boolean
  isPublished?: number | boolean
  orderIndex?: number
  imageUrl?: string | null
  createdAt?: string
  updatedAt?: string
}): Product {
  return {
    id: Number(row.id),
    categoryId: Number(row.categoryId),
    categoryName: row.categoryName,
    categorySlug: row.categorySlug,
    name: row.name,
    slug: row.slug,
    spec: row.spec ?? null,
    description: row.description ?? null,
    isFeatured: toBoolean(row.isFeatured),
    isPublished: toBoolean(row.isPublished),
    orderIndex: Number(row.orderIndex ?? 0),
    imageUrl: row.imageUrl ?? null,
    createdAt: row.createdAt ?? nowText(),
    updatedAt: row.updatedAt ?? nowText(),
  }
}

export async function getCategories(): Promise<Category[]> {
  const rows = await allRows<{
    id: number
    name: string
    slug: string
    orderIndex: number
  }>(
    `SELECT id, name, slug, order_index AS orderIndex
       FROM categories
      ORDER BY order_index ASC, id ASC`
  )

  if (rows) {
    return rows.map((row) => ({
      id: Number(row.id),
      name: row.name,
      slug: row.slug,
      orderIndex: Number(row.orderIndex),
    }))
  }

  return [...memoryStore().categories]
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const row = await firstRow<{
    id: number
    name: string
    slug: string
    orderIndex: number
  }>(
    `SELECT id, name, slug, order_index AS orderIndex
       FROM categories
      WHERE slug = ?`,
    [slug]
  )

  if (row) {
    return {
      id: Number(row.id),
      name: row.name,
      slug: row.slug,
      orderIndex: Number(row.orderIndex),
    }
  }

  const store = memoryStore()
  return store.categories.find((category) => category.slug === slug) ?? null
}

type GetProductsOptions = {
  category?: string
  featured?: boolean
  published?: boolean
  limit?: number
}

export async function getProducts(options: GetProductsOptions = {}): Promise<Product[]> {
  const where: string[] = ['1=1']
  const params: unknown[] = []

  if (options.category) {
    where.push('c.slug = ?')
    params.push(options.category)
  }

  if (typeof options.featured === 'boolean') {
    where.push('p.is_featured = ?')
    params.push(options.featured ? 1 : 0)
  }

  if (typeof options.published === 'boolean') {
    where.push('p.is_published = ?')
    params.push(options.published ? 1 : 0)
  }

  let sql = `SELECT
      p.id,
      p.category_id AS categoryId,
      c.name AS categoryName,
      c.slug AS categorySlug,
      p.name,
      p.slug,
      p.spec,
      p.description,
      p.is_featured AS isFeatured,
      p.is_published AS isPublished,
      p.order_index AS orderIndex,
      p.created_at AS createdAt,
      p.updated_at AS updatedAt,
      pi.url AS imageUrl
    FROM products p
    LEFT JOIN categories c ON c.id = p.category_id
    LEFT JOIN product_images pi ON pi.product_id = p.id AND pi.is_primary = 1
    WHERE ${where.join(' AND ')}
    ORDER BY p.order_index ASC, p.id DESC`

  if (options.limit && options.limit > 0) {
    sql += ' LIMIT ?'
    params.push(options.limit)
  }

  const rows = await allRows<{
    id: number
    categoryId: number
    categoryName?: string
    categorySlug?: string
    name: string
    slug: string
    spec?: string | null
    description?: string | null
    isFeatured?: number | boolean
    isPublished?: number | boolean
    orderIndex?: number
    imageUrl?: string | null
    createdAt?: string
    updatedAt?: string
  }>(sql, params)

  if (rows) {
    return rows.map(mapProductRow)
  }

  const store = memoryStore()
  const categoryMap = new Map(store.categories.map((category) => [category.id, category]))

  return store.products
    .filter((product) => {
      const category = categoryMap.get(product.categoryId)
      if (options.category && category?.slug !== options.category) {
        return false
      }
      if (typeof options.featured === 'boolean' && product.isFeatured !== options.featured) {
        return false
      }
      if (typeof options.published === 'boolean' && product.isPublished !== options.published) {
        return false
      }
      return true
    })
    .sort((a, b) => a.orderIndex - b.orderIndex || b.id - a.id)
    .slice(0, options.limit ? options.limit : undefined)
    .map((product) => {
      const category = categoryMap.get(product.categoryId)
      const primaryImage = store.productImages.find(
        (image) => image.productId === product.id && image.isPrimary
      )
      return {
        id: product.id,
        categoryId: product.categoryId,
        categoryName: category?.name,
        categorySlug: category?.slug,
        name: product.name,
        slug: product.slug,
        spec: product.spec,
        description: product.description,
        isFeatured: product.isFeatured,
        isPublished: product.isPublished,
        orderIndex: product.orderIndex,
        imageUrl: primaryImage?.url ?? null,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
      }
    })
}

export async function getProductById(id: number): Promise<Product | null> {
  const rows = await getProducts({ published: undefined })
  return rows.find((product) => product.id === id) ?? null
}

export async function getProductBySlug(categorySlug: string, slug: string): Promise<Product | null> {
  const rows = await allRows<{
    id: number
    categoryId: number
    categoryName?: string
    categorySlug?: string
    name: string
    slug: string
    spec?: string | null
    description?: string | null
    isFeatured?: number | boolean
    isPublished?: number | boolean
    orderIndex?: number
    imageUrl?: string | null
    createdAt?: string
    updatedAt?: string
  }>(
    `SELECT
      p.id,
      p.category_id AS categoryId,
      c.name AS categoryName,
      c.slug AS categorySlug,
      p.name,
      p.slug,
      p.spec,
      p.description,
      p.is_featured AS isFeatured,
      p.is_published AS isPublished,
      p.order_index AS orderIndex,
      p.created_at AS createdAt,
      p.updated_at AS updatedAt,
      pi.url AS imageUrl
    FROM products p
    LEFT JOIN categories c ON c.id = p.category_id
    LEFT JOIN product_images pi ON pi.product_id = p.id AND pi.is_primary = 1
    WHERE c.slug = ?
      AND p.slug = ?
    LIMIT 1`,
    [categorySlug, slug]
  )

  if (rows && rows.length > 0) {
    return mapProductRow(rows[0])
  }

  const products = await getProducts({ category: categorySlug })
  return products.find((product) => product.slug === slug) ?? null
}

export async function getProductImages(productId: number): Promise<ProductImage[]> {
  const rows = await allRows<{
    id: number
    productId: number
    objectKey: string | null
    url: string
    altText: string | null
    isPrimary: number | boolean
    orderIndex: number
  }>(
    `SELECT
      id,
      product_id AS productId,
      object_key AS objectKey,
      url,
      alt_text AS altText,
      is_primary AS isPrimary,
      order_index AS orderIndex
    FROM product_images
    WHERE product_id = ?
    ORDER BY order_index ASC, id ASC`,
    [productId]
  )

  if (rows) {
    return rows.map((row) => ({
      id: Number(row.id),
      productId: Number(row.productId),
      objectKey: row.objectKey,
      url: row.url,
      altText: row.altText,
      isPrimary: toBoolean(row.isPrimary),
      orderIndex: Number(row.orderIndex),
    }))
  }

  return memoryStore().productImages.filter((image) => image.productId === productId)
}

export async function createProduct(input: ProductInput): Promise<Product | null> {
  ensurePersistentWrite('Product writes')
  const payload: ProductInput = {
    categoryId: input.categoryId,
    name: input.name.trim(),
    slug: input.slug.trim(),
    spec: input.spec ?? null,
    description: input.description ?? null,
    isFeatured: input.isFeatured ?? false,
    isPublished: input.isPublished ?? true,
    orderIndex: input.orderIndex ?? 0,
  }

  const run = await runQuery(
    `INSERT INTO products (
      category_id,
      name,
      slug,
      spec,
      description,
      is_featured,
      is_published,
      order_index,
      created_at,
      updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`,
    [
      payload.categoryId,
      payload.name,
      payload.slug,
      payload.spec,
      payload.description,
      payload.isFeatured ? 1 : 0,
      payload.isPublished ? 1 : 0,
      payload.orderIndex,
    ]
  )

  if (run) {
    const insertedId = Number(run.meta.last_row_id)
    return getProductById(insertedId)
  }

  const store = memoryStore()
  const id = store.counters.product++
  store.products.push({
    id,
    categoryId: payload.categoryId,
    name: payload.name,
    slug: payload.slug,
    spec: payload.spec ?? null,
    description: payload.description ?? null,
    isFeatured: payload.isFeatured ?? false,
    isPublished: payload.isPublished ?? true,
    orderIndex: payload.orderIndex ?? 0,
    createdAt: nowText(),
    updatedAt: nowText(),
  })

  return getProductById(id)
}

export async function updateProduct(id: number, input: Partial<ProductInput>): Promise<Product | null> {
  ensurePersistentWrite('Product writes')
  const run = await runQuery(
    `UPDATE products
       SET category_id = COALESCE(?, category_id),
           name = COALESCE(?, name),
           slug = COALESCE(?, slug),
           spec = COALESCE(?, spec),
           description = COALESCE(?, description),
           is_featured = COALESCE(?, is_featured),
           is_published = COALESCE(?, is_published),
           order_index = COALESCE(?, order_index),
           updated_at = CURRENT_TIMESTAMP
     WHERE id = ?`,
    [
      input.categoryId ?? null,
      input.name?.trim() ?? null,
      input.slug?.trim() ?? null,
      input.spec ?? null,
      input.description ?? null,
      typeof input.isFeatured === 'boolean' ? (input.isFeatured ? 1 : 0) : null,
      typeof input.isPublished === 'boolean' ? (input.isPublished ? 1 : 0) : null,
      input.orderIndex ?? null,
      id,
    ]
  )

  if (run) {
    return getProductById(id)
  }

  const store = memoryStore()
  const target = store.products.find((product) => product.id === id)
  if (!target) {
    return null
  }

  if (typeof input.categoryId === 'number') target.categoryId = input.categoryId
  if (typeof input.name === 'string') target.name = input.name.trim()
  if (typeof input.slug === 'string') target.slug = input.slug.trim()
  if (typeof input.spec !== 'undefined') target.spec = input.spec
  if (typeof input.description !== 'undefined') target.description = input.description
  if (typeof input.isFeatured === 'boolean') target.isFeatured = input.isFeatured
  if (typeof input.isPublished === 'boolean') target.isPublished = input.isPublished
  if (typeof input.orderIndex === 'number') target.orderIndex = input.orderIndex
  target.updatedAt = nowText()

  return getProductById(id)
}

export async function deleteProduct(id: number): Promise<{ ok: boolean; imageKeys: string[] }> {
  ensurePersistentWrite('Product writes')
  const existingImages = await getProductImages(id)
  const imageKeys = existingImages
    .map((image) => image.objectKey)
    .filter((key): key is string => Boolean(key))

  const run = await runQuery('DELETE FROM products WHERE id = ?', [id])
  if (run) {
    return { ok: true, imageKeys }
  }

  const store = memoryStore()
  const initialLength = store.products.length
  store.products = store.products.filter((product) => product.id !== id)
  store.productImages = store.productImages.filter((image) => image.productId !== id)

  return {
    ok: store.products.length !== initialLength,
    imageKeys,
  }
}

export async function addProductImage(input: {
  productId: number
  objectKey: string | null
  url: string
  altText?: string | null
  isPrimary?: boolean
  orderIndex?: number
}): Promise<ProductImage | null> {
  ensurePersistentWrite('Product image writes')
  if (input.isPrimary) {
    await runQuery('UPDATE product_images SET is_primary = 0 WHERE product_id = ?', [input.productId])
  }

  const run = await runQuery(
    `INSERT INTO product_images (
      product_id,
      object_key,
      url,
      alt_text,
      is_primary,
      order_index,
      created_at
    ) VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)`,
    [
      input.productId,
      input.objectKey,
      input.url,
      input.altText ?? null,
      input.isPrimary ? 1 : 0,
      input.orderIndex ?? 0,
    ]
  )

  if (run) {
    const id = Number(run.meta.last_row_id)
    const rows = await allRows<{
      id: number
      productId: number
      objectKey: string | null
      url: string
      altText: string | null
      isPrimary: number | boolean
      orderIndex: number
    }>(
      `SELECT
        id,
        product_id AS productId,
        object_key AS objectKey,
        url,
        alt_text AS altText,
        is_primary AS isPrimary,
        order_index AS orderIndex
      FROM product_images
      WHERE id = ?`,
      [id]
    )

    if (!rows || rows.length === 0) {
      return null
    }

    const row = rows[0]
    return {
      id: Number(row.id),
      productId: Number(row.productId),
      objectKey: row.objectKey,
      url: row.url,
      altText: row.altText,
      isPrimary: toBoolean(row.isPrimary),
      orderIndex: Number(row.orderIndex),
    }
  }

  const store = memoryStore()
  if (input.isPrimary) {
    store.productImages = store.productImages.map((image) =>
      image.productId === input.productId ? { ...image, isPrimary: false } : image
    )
  }

  const image: ProductImage = {
    id: store.counters.productImage++,
    productId: input.productId,
    objectKey: input.objectKey,
    url: input.url,
    altText: input.altText ?? null,
    isPrimary: Boolean(input.isPrimary),
    orderIndex: input.orderIndex ?? 0,
  }

  store.productImages.push(image)
  return image
}

export async function deleteProductImage(id: number): Promise<{ ok: boolean; imageKey: string | null }> {
  ensurePersistentWrite('Product image writes')
  const row = await firstRow<{
    id: number
    productId: number
    objectKey: string | null
    isPrimary: number | boolean
  }>(
    `SELECT id, product_id AS productId, object_key AS objectKey, is_primary AS isPrimary
       FROM product_images
      WHERE id = ?`,
    [id]
  )

  if (row) {
    await runQuery('DELETE FROM product_images WHERE id = ?', [id])

    if (toBoolean(row.isPrimary)) {
      await runQuery(
        `UPDATE product_images
            SET is_primary = 1
          WHERE id = (
            SELECT id FROM product_images
             WHERE product_id = ?
             ORDER BY order_index ASC, id ASC
             LIMIT 1
          )`,
        [row.productId]
      )
    }

    return { ok: true, imageKey: row.objectKey }
  }

  const store = memoryStore()
  const target = store.productImages.find((image) => image.id === id)
  if (!target) {
    return { ok: false, imageKey: null }
  }

  store.productImages = store.productImages.filter((image) => image.id !== id)
  if (target.isPrimary) {
    const fallback = store.productImages
      .filter((image) => image.productId === target.productId)
      .sort((a, b) => a.orderIndex - b.orderIndex || a.id - b.id)[0]

    if (fallback) {
      fallback.isPrimary = true
    }
  }

  return { ok: true, imageKey: target.objectKey }
}

export async function setPrimaryProductImage(id: number): Promise<ProductImage | null> {
  ensurePersistentWrite('Product image writes')

  const row = await firstRow<{
    id: number
    productId: number
    objectKey: string | null
    url: string
    altText: string | null
    isPrimary: number | boolean
    orderIndex: number
  }>(
    `SELECT
      id,
      product_id AS productId,
      object_key AS objectKey,
      url,
      alt_text AS altText,
      is_primary AS isPrimary,
      order_index AS orderIndex
     FROM product_images
     WHERE id = ?`,
    [id]
  )

  if (row) {
    await runQuery('UPDATE product_images SET is_primary = 0 WHERE product_id = ?', [row.productId])
    await runQuery('UPDATE product_images SET is_primary = 1 WHERE id = ?', [id])
    return {
      id: Number(row.id),
      productId: Number(row.productId),
      objectKey: row.objectKey,
      url: row.url,
      altText: row.altText,
      isPrimary: true,
      orderIndex: Number(row.orderIndex),
    }
  }

  const store = memoryStore()
  const target = store.productImages.find((image) => image.id === id)
  if (!target) {
    return null
  }

  store.productImages = store.productImages.map((image) =>
    image.productId === target.productId ? { ...image, isPrimary: image.id === target.id } : image
  )

  return store.productImages.find((image) => image.id === id) ?? null
}

export async function createInquiry(input: InquiryInput): Promise<Inquiry> {
  ensurePersistentWrite('Inquiry writes')
  const payload: InquiryInput = {
    companyName: input.companyName.trim(),
    phone: input.phone.trim(),
    interest: input.interest ?? null,
    message: input.message ?? null,
    ipAddress: input.ipAddress ?? null,
  }

  const run = await runQuery(
    `INSERT INTO inquiries (
      company_name,
      phone,
      interest,
      message,
      status,
      ip_address,
      created_at,
      updated_at
    ) VALUES (?, ?, ?, ?, 'pending', ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`,
    [payload.companyName, payload.phone, payload.interest, payload.message, payload.ipAddress]
  )

  if (run) {
    const insertedId = Number(run.meta.last_row_id)
    const inquiry = await firstRow<{
      id: number
      companyName: string
      phone: string
      interest: string | null
      message: string | null
      status: InquiryStatus
      createdAt: string
      updatedAt: string
    }>(
      `SELECT
        id,
        company_name AS companyName,
        phone,
        interest,
        message,
        status,
        created_at AS createdAt,
        updated_at AS updatedAt
      FROM inquiries
      WHERE id = ?`,
      [insertedId]
    )

    if (inquiry) {
      return inquiry
    }
  }

  const store = memoryStore()
  const inquiry: InquiryRecord = {
    id: store.counters.inquiry++,
    companyName: payload.companyName,
    phone: payload.phone,
    interest: payload.interest ?? null,
    message: payload.message ?? null,
    status: 'pending',
    ipAddress: payload.ipAddress ?? null,
    createdAt: nowText(),
    updatedAt: nowText(),
  }

  store.inquiries.unshift(inquiry)
  return inquiry
}

export async function getInquiries(): Promise<Inquiry[]> {
  const rows = await allRows<Inquiry>(
    `SELECT
      id,
      company_name AS companyName,
      phone,
      interest,
      message,
      status,
      created_at AS createdAt,
      updated_at AS updatedAt
    FROM inquiries
    ORDER BY id DESC`
  )

  if (rows) {
    return rows
  }

  return [...memoryStore().inquiries].sort((a, b) => b.id - a.id)
}

export async function updateInquiryStatus(id: number, status: InquiryStatus): Promise<Inquiry | null> {
  ensurePersistentWrite('Inquiry writes')
  const run = await runQuery(
    `UPDATE inquiries
       SET status = ?, updated_at = CURRENT_TIMESTAMP
     WHERE id = ?`,
    [status, id]
  )

  if (run) {
    return firstRow<Inquiry>(
      `SELECT
        id,
        company_name AS companyName,
        phone,
        interest,
        message,
        status,
        created_at AS createdAt,
        updated_at AS updatedAt
      FROM inquiries
      WHERE id = ?`,
      [id]
    )
  }

  const store = memoryStore()
  const target = store.inquiries.find((inquiry) => inquiry.id === id)
  if (!target) {
    return null
  }

  target.status = status
  target.updatedAt = nowText()
  return target
}

export async function getPublicSettings(): Promise<SettingsMap> {
  const rows = await allRows<{ key: string; value: string }>('SELECT key, value FROM settings')
  if (rows) {
    return rows.reduce<SettingsMap>((acc, row) => {
      acc[row.key] = row.value
      return acc
    }, {})
  }

  return { ...memoryStore().settings }
}

export async function getAllSettings(): Promise<SettingsMap> {
  return getPublicSettings()
}

export async function upsertSettings(settings: SettingsMap): Promise<void> {
  ensurePersistentWrite('Settings writes')
  const entries = Object.entries(settings)

  if (entries.length === 0) {
    return
  }

  const db = getDb()
  if (db) {
    for (const [key, value] of entries) {
      await db
        .prepare(
          `INSERT INTO settings (key, value, updated_at)
           VALUES (?, ?, CURRENT_TIMESTAMP)
           ON CONFLICT(key) DO UPDATE SET
             value = excluded.value,
             updated_at = CURRENT_TIMESTAMP`
        )
        .bind(key, value)
        .run()
    }
    return
  }

  const store = memoryStore()
  for (const [key, value] of entries) {
    store.settings[key] = value
  }
}

export async function getAdminByEmail(email: string): Promise<Admin | null> {
  const row = await firstRow<{
    id: number
    email: string
    name: string | null
    passwordHash: string
  }>(
    `SELECT
      id,
      email,
      name,
      password_hash AS passwordHash
     FROM admins
    WHERE email = ?`,
    [email]
  )

  if (row) {
    return {
      id: Number(row.id),
      email: row.email,
      name: row.name,
      passwordHash: row.passwordHash,
    }
  }

  const store = memoryStore()
  return store.admins.find((admin) => admin.email === email) ?? null
}

export async function upsertAdmin(input: {
  email: string
  name?: string | null
  passwordHash: string
}): Promise<void> {
  ensurePersistentWrite('Admin writes')
  const db = getDb()
  if (db) {
    await db
      .prepare(
        `INSERT INTO admins (email, name, password_hash)
         VALUES (?, ?, ?)
         ON CONFLICT(email) DO UPDATE SET
           name = excluded.name,
           password_hash = excluded.password_hash`
      )
      .bind(input.email, input.name ?? null, input.passwordHash)
      .run()
    return
  }

  const store = memoryStore()
  const existing = store.admins.find((admin) => admin.email === input.email)
  if (existing) {
    existing.name = input.name ?? null
    existing.passwordHash = input.passwordHash
    return
  }

  store.admins.push({
    id: store.counters.admin++,
    email: input.email,
    name: input.name ?? null,
    passwordHash: input.passwordHash,
  })
}

type NoticeOptions = {
  publishedOnly?: boolean
  limit?: number
}

export async function getNotices(options: NoticeOptions = {}): Promise<Notice[]> {
  const where: string[] = ['1=1']
  const params: unknown[] = []

  if (options.publishedOnly) {
    where.push('is_published = 1')
  }

  let sql = `SELECT
      id,
      title,
      content,
      is_published AS isPublished,
      is_pinned AS isPinned,
      created_at AS createdAt,
      updated_at AS updatedAt
    FROM notices
    WHERE ${where.join(' AND ')}
    ORDER BY is_pinned DESC, id DESC`

  if (options.limit && options.limit > 0) {
    sql += ' LIMIT ?'
    params.push(options.limit)
  }

  const rows = await allRows<{
    id: number
    title: string
    content: string
    isPublished: number | boolean
    isPinned: number | boolean
    createdAt: string
    updatedAt: string
  }>(sql, params)

  if (rows) {
    return rows.map((row) => ({
      id: Number(row.id),
      title: row.title,
      content: row.content,
      isPublished: toBoolean(row.isPublished),
      isPinned: toBoolean(row.isPinned),
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
    }))
  }

  return [...memoryStore().notices]
    .filter((notice) => (options.publishedOnly ? notice.isPublished : true))
    .sort((a, b) => Number(b.isPinned) - Number(a.isPinned) || b.id - a.id)
    .slice(0, options.limit ? options.limit : undefined)
}

export async function createNotice(input: NoticeInput): Promise<Notice | null> {
  ensurePersistentWrite('Notice writes')
  const run = await runQuery(
    `INSERT INTO notices (
      title,
      content,
      is_published,
      is_pinned,
      created_at,
      updated_at
    ) VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`,
    [input.title, input.content, input.isPublished ? 1 : 0, input.isPinned ? 1 : 0]
  )

  if (run) {
    const id = Number(run.meta.last_row_id)
    return firstRow<Notice>(
      `SELECT
        id,
        title,
        content,
        is_published AS isPublished,
        is_pinned AS isPinned,
        created_at AS createdAt,
        updated_at AS updatedAt
      FROM notices
      WHERE id = ?`,
      [id]
    )
  }

  const store = memoryStore()
  const notice: NoticeRecord = {
    id: store.counters.notice++,
    title: input.title,
    content: input.content,
    isPublished: input.isPublished ?? true,
    isPinned: input.isPinned ?? false,
    createdAt: nowText(),
    updatedAt: nowText(),
  }

  store.notices.unshift(notice)
  return notice
}

export async function updateNotice(id: number, input: NoticeInput): Promise<Notice | null> {
  ensurePersistentWrite('Notice writes')
  const run = await runQuery(
    `UPDATE notices
      SET title = ?,
          content = ?,
          is_published = ?,
          is_pinned = ?,
          updated_at = CURRENT_TIMESTAMP
     WHERE id = ?`,
    [input.title, input.content, input.isPublished ? 1 : 0, input.isPinned ? 1 : 0, id]
  )

  if (run) {
    return firstRow<Notice>(
      `SELECT
        id,
        title,
        content,
        is_published AS isPublished,
        is_pinned AS isPinned,
        created_at AS createdAt,
        updated_at AS updatedAt
      FROM notices
      WHERE id = ?`,
      [id]
    )
  }

  const store = memoryStore()
  const target = store.notices.find((notice) => notice.id === id)
  if (!target) {
    return null
  }

  target.title = input.title
  target.content = input.content
  target.isPublished = input.isPublished ?? target.isPublished
  target.isPinned = input.isPinned ?? target.isPinned
  target.updatedAt = nowText()
  return target
}

export async function deleteNotice(id: number): Promise<boolean> {
  ensurePersistentWrite('Notice writes')
  const run = await runQuery('DELETE FROM notices WHERE id = ?', [id])
  if (run) {
    return true
  }

  const store = memoryStore()
  const before = store.notices.length
  store.notices = store.notices.filter((notice) => notice.id !== id)
  return before !== store.notices.length
}

export async function getDashboardSummary(): Promise<DashboardSummary> {
  const row = await firstRow<{
    productCount: number
    pendingInquiryCount: number
    totalInquiryCount: number
    noticeCount: number
  }>(
    `SELECT
      (SELECT COUNT(*) FROM products) AS productCount,
      (SELECT COUNT(*) FROM inquiries WHERE status = 'pending') AS pendingInquiryCount,
      (SELECT COUNT(*) FROM inquiries) AS totalInquiryCount,
      (SELECT COUNT(*) FROM notices) AS noticeCount`
  )

  if (row) {
    return {
      productCount: Number(row.productCount),
      pendingInquiryCount: Number(row.pendingInquiryCount),
      totalInquiryCount: Number(row.totalInquiryCount),
      noticeCount: Number(row.noticeCount),
    }
  }

  const store = memoryStore()
  return {
    productCount: store.products.length,
    pendingInquiryCount: store.inquiries.filter((inquiry) => inquiry.status === 'pending').length,
    totalInquiryCount: store.inquiries.length,
    noticeCount: store.notices.length,
  }
}
