import Link from 'next/link'

const footerLinks = {
  products: [
    { name: '반지', href: '/products?category=rings' },
    { name: '목걸이', href: '/products?category=necklaces' },
    { name: '귀걸이', href: '/products?category=earrings' },
    { name: '팔찌', href: '/products?category=bracelets' },
  ],
  company: [
    { name: '브랜드 소개', href: '/about' },
    { name: '거래 안내', href: '/trade' },
    { name: '오시는 길', href: '/location' },
    { name: 'FAQ', href: '/faq' },
  ],
  contact: [
    { name: '02-000-0000', href: 'tel:02-000-0000' },
    { name: '서울 종로구 종묘귀금속', href: '/location' },
    { name: 'info@jujewelry.kr', href: 'mailto:info@jujewelry.kr' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-[#1a1a1a] text-neutral-400">
      <div className="max-w-content mx-auto px-6 lg:px-12 py-16 lg:py-20">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16 pb-12 border-b border-neutral-800">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="font-display text-xl text-white mb-4">Ju Jewelry</div>
            <p className="text-[13px] leading-relaxed text-neutral-500 max-w-[280px]">
              종로 종묘귀금속에 위치한 프리미엄 귀금속 도매점.<br />
              변하지 않는 신뢰로 함께합니다.
            </p>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-[11px] font-medium tracking-widest uppercase text-neutral-600 mb-5">
              Products
            </h4>
            <ul className="space-y-3">
              {footerLinks.products.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-[13px] text-neutral-500 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-[11px] font-medium tracking-widest uppercase text-neutral-600 mb-5">
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-[13px] text-neutral-500 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[11px] font-medium tracking-widest uppercase text-neutral-600 mb-5">
              Contact
            </h4>
            <ul className="space-y-3">
              {footerLinks.contact.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-[13px] text-neutral-500 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="text-[12px] text-neutral-600 leading-relaxed">
            <p>&copy; {new Date().getFullYear()} Ju Jewelry. All rights reserved.</p>
            <p className="mt-1">상호: Ju주얼리 | 대표: 홍길동 | 사업자등록번호: 000-00-00000</p>
          </div>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-[12px] text-neutral-600 hover:text-neutral-400 transition-colors">
              개인정보처리방침
            </Link>
            <Link href="/terms" className="text-[12px] text-neutral-600 hover:text-neutral-400 transition-colors">
              이용약관
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
