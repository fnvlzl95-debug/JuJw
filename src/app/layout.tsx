import type { Metadata } from 'next'
import { Cormorant_Garamond, Noto_Serif_KR } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { getSiteSettings } from '@/lib/site-data'

const serif = Noto_Serif_KR({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-serif',
  display: 'swap',
})

const display = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-display',
  display: 'swap',
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://jujewelry.co.kr'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Ju Jewelry | 프리미엄 귀금속 도매',
    template: '%s | Ju Jewelry',
  },
  description:
    '종로권 주얼리 도매 파트너 Ju Jewelry. 제품 카탈로그, 거래 안내, 오시는 길, 상담 요청 기능을 제공합니다.',
  keywords: ['주얼리 도매', '귀금속 도매', '종로 귀금속', '반지 도매', '목걸이 도매'],
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const settings = await getSiteSettings()

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'JewelryStore',
    name: settings.siteName,
    description: settings.intro,
    url: settings.siteUrl || siteUrl,
    telephone: settings.phone,
    email: settings.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${settings.addressLine1} ${settings.addressLine2}`.trim(),
      postalCode: settings.postalCode,
      addressCountry: 'KR',
      addressLocality: '서울',
    },
    openingHours: [settings.hoursWeekday, settings.hoursWeekend],
  }

  return (
    <html lang="ko">
      <body
        className={`${serif.variable} ${display.variable} font-sans bg-bg-primary text-text-default`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
