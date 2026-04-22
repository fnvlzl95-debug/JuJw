export type SiteSettings = {
  shopName: string
  phonePrimary: string
  phoneSecondary: string
  email: string
  address: string
  businessHours: string
  closedDay: string
  naverMapUrl: string
  instagramUrl: string
  facebookUrl: string
  businessName: string
  representativeName: string
  businessNumber: string
}

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  shopName: 'JU JEWELRY',
  phonePrimary: '02-123-4567',
  phoneSecondary: '010-9876-5432',
  email: 'contact@jujewelry.com',
  address: '서울특별시 종로구 돈화문로 10길 15 (묘동)',
  businessHours: '평일 10:30 - 19:30 / 주말 11:00 - 18:30',
  closedDay: '화요일 휴무',
  naverMapUrl: 'https://map.naver.com',
  instagramUrl: '',
  facebookUrl: '',
  businessName: 'JU JEWELRY',
  representativeName: '',
  businessNumber: '',
}

export function normalizeSiteSettings(
  input: Record<string, string> | null | undefined
): SiteSettings {
  const source = input ?? {}

  return {
    shopName: source.shop_name || DEFAULT_SITE_SETTINGS.shopName,
    phonePrimary: source.phone_primary || DEFAULT_SITE_SETTINGS.phonePrimary,
    phoneSecondary: source.phone_secondary || DEFAULT_SITE_SETTINGS.phoneSecondary,
    email: source.email || DEFAULT_SITE_SETTINGS.email,
    address: source.address || DEFAULT_SITE_SETTINGS.address,
    businessHours: source.business_hours || DEFAULT_SITE_SETTINGS.businessHours,
    closedDay: source.closed_day || DEFAULT_SITE_SETTINGS.closedDay,
    naverMapUrl: source.naver_map_url || DEFAULT_SITE_SETTINGS.naverMapUrl,
    instagramUrl: source.instagram_url || DEFAULT_SITE_SETTINGS.instagramUrl,
    facebookUrl: source.facebook_url || DEFAULT_SITE_SETTINGS.facebookUrl,
    businessName: source.business_name || DEFAULT_SITE_SETTINGS.businessName,
    representativeName: source.representative_name || DEFAULT_SITE_SETTINGS.representativeName,
    businessNumber: source.business_number || DEFAULT_SITE_SETTINGS.businessNumber,
  }
}

export function getContactLines(settings: SiteSettings): string[] {
  return [settings.phonePrimary, settings.phoneSecondary, settings.email].filter(Boolean)
}
