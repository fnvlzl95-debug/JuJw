import type { Product } from '@/lib/models'

export const GENERIC_PRODUCT_PLACEHOLDER = '/img/hero/hero.png'

export const productFallbacks: Record<string, string[]> = {
  rings: ['/img/products-generated/products-card-ring.png', '/img/products-generated/products-card-ring.png'],
  necklaces: ['/img/products-generated/products-card-necklace.png', '/img/products-generated/products-card-necklace.png'],
  earrings: ['/img/products-generated/products-card-earrings.png', '/img/products-generated/products-card-earrings.png'],
  bracelets: ['/img/products-generated/products-card-bracelet.png', '/img/products-generated/products-card-bracelet.png'],
}

export const defaultProductFallbacks = [
  '/img/products-generated/products-card-necklace.png',
  '/img/products-generated/products-card-earrings.png',
  '/img/products-generated/products-card-ring.png',
  '/img/products-generated/products-card-bracelet.png',
]

export function resolveProductHref(product: Product) {
  return product.categorySlug ? `/products/${product.categorySlug}/${product.slug}` : '/contact'
}

export function trimText(text: string | null | undefined, fallback: string, limit: number) {
  const source = text?.trim() || fallback
  return source.length > limit ? `${source.slice(0, limit).trim()}...` : source
}

export function resolveProductImage(product: Product, index: number) {
  if (
    product.imageUrl &&
    product.imageUrl !== GENERIC_PRODUCT_PLACEHOLDER &&
    !product.imageUrl.startsWith('products/')
  ) {
    return product.imageUrl
  }

  const candidates = product.categorySlug
    ? productFallbacks[product.categorySlug] ?? defaultProductFallbacks
    : defaultProductFallbacks

  return candidates[index % candidates.length]
}
