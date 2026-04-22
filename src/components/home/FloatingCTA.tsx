'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const sectionLabels: Record<string, string> = {
  collections: '컬렉션 보기',
  best: '대표 상품 문의',
  moments: '착용 장면 보기',
  atelier: '상담 기준 확인',
  'visit-notes': '방문 안내',
  about: '방문 예약',
}

const sectionIds = Object.keys(sectionLabels)

export default function FloatingCTA() {
  const [visible, setVisible] = useState(false)
  const [label, setLabel] = useState('컬렉션 보기')

  useEffect(() => {
    const heroEl = document.getElementById('home')
    const observers: IntersectionObserver[] = []

    // Hero 관찰: 벗어나면 CTA 표시
    if (heroEl) {
      const heroObserver = new IntersectionObserver(
        ([entry]) => setVisible(!entry.isIntersecting),
        { threshold: 0.1 }
      )
      heroObserver.observe(heroEl)
      observers.push(heroObserver)
    }

    // 각 섹션 관찰: 문구 변경
    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setLabel(sectionLabels[id])
          }
        },
        { threshold: 0.3 }
      )
      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [])

  return (
    <Link
      href="/contact"
      className={`fixed bottom-8 right-6 z-40 rounded-full bg-text-default px-6 py-3 text-[10px] uppercase tracking-[0.15em] text-white shadow-lg transition-all duration-500 hover:bg-text-muted sm:right-8 ${
        visible
          ? 'translate-y-0 opacity-100'
          : 'translate-y-4 opacity-0 pointer-events-none'
      }`}
      style={{ fontFamily: "'Montserrat', sans-serif" }}
    >
      {label}
    </Link>
  )
}
