import Link from 'next/link'
import { getCategories, getSiteSettings } from '@/lib/site-data'

function toTelHref(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, '')}`
}

export default async function Footer() {
  const [categories, settings] = await Promise.all([getCategories(), getSiteSettings()])

  return (
    <footer className="bg-[#1a1a1a] text-neutral-400">
      <div className="max-w-content mx-auto px-6 lg:px-12 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16 pb-12 border-b border-neutral-800">
          <div className="lg:col-span-1">
            <div className="font-display text-xl text-white mb-4">{settings.siteName}</div>
            <p className="text-[13px] leading-relaxed text-neutral-500 max-w-[280px]">
              {settings.intro}
            </p>
          </div>

          <div>
            <h4 className="text-[11px] font-medium tracking-widest uppercase text-neutral-600 mb-5">
              Products
            </h4>
            <ul className="space-y-3">
              {categories.map((category) => (
                <li key={category.id}>
                  <Link
                    href={`/products?category=${category.slug}`}
                    className="text-[13px] text-neutral-500 hover:text-white transition-colors"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] font-medium tracking-widest uppercase text-neutral-600 mb-5">
              Company
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/about"
                  className="text-[13px] text-neutral-500 hover:text-white transition-colors"
                >
                  브랜드 소개
                </Link>
              </li>
              <li>
                <Link
                  href="/trade"
                  className="text-[13px] text-neutral-500 hover:text-white transition-colors"
                >
                  거래 안내
                </Link>
              </li>
              <li>
                <Link
                  href="/location"
                  className="text-[13px] text-neutral-500 hover:text-white transition-colors"
                >
                  오시는 길
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-[13px] text-neutral-500 hover:text-white transition-colors"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] font-medium tracking-widest uppercase text-neutral-600 mb-5">
              Contact
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href={toTelHref(settings.phone)}
                  className="text-[13px] text-neutral-500 hover:text-white transition-colors"
                >
                  {settings.phone}
                </Link>
              </li>
              <li>
                <Link
                  href="/location"
                  className="text-[13px] text-neutral-500 hover:text-white transition-colors"
                >
                  {settings.addressLine1}
                </Link>
              </li>
              <li>
                <Link
                  href={`mailto:${settings.email}`}
                  className="text-[13px] text-neutral-500 hover:text-white transition-colors"
                >
                  {settings.email}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="text-[12px] text-neutral-600 leading-relaxed">
            <p>&copy; {new Date().getFullYear()} {settings.siteName}. All rights reserved.</p>
            <p className="mt-1">
              상호: {settings.businessName} | 대표: {settings.representativeName} | 사업자등록번호:{' '}
              {settings.businessNumber}
            </p>
            <p className="mt-1">{settings.footerNote}</p>
          </div>
          <div className="flex gap-6">
            <Link
              href="/privacy"
              className="text-[12px] text-neutral-600 hover:text-neutral-400 transition-colors"
            >
              개인정보처리방침
            </Link>
            <Link
              href="/terms"
              className="text-[12px] text-neutral-600 hover:text-neutral-400 transition-colors"
            >
              이용약관
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
