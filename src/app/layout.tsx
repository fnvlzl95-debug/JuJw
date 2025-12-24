import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'Ju Jewelry - 프리미엄 귀금속 도매',
  description: '종로 종묘귀금속에 위치한 주얼리 도매 전문점. 반지, 목걸이, 귀걸이, 팔찌 등 다양한 귀금속 제품을 도매가로 제공합니다.',
  keywords: '주얼리 도매, 귀금속 도매, 종로 귀금속, 반지 도매, 목걸이 도매',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body className="font-sans bg-bg-primary text-text-default">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
