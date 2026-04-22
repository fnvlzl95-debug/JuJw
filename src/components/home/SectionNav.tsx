'use client'

import { useState, useEffect } from 'react'

const sections = [
  { id: 'collections', label: 'Collections', number: '01' },
  { id: 'best', label: 'Best', number: '02' },
  { id: 'moments', label: 'Moments', number: '03' },
  { id: 'atelier', label: 'Atelier', number: '04' },
  { id: 'visit-notes', label: 'Visit', number: '05' },
  { id: 'about', label: 'Service', number: '06' },
]

export default function SectionNav() {
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    sections.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (!el) return

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id)
          }
        },
        { threshold: 0.3 }
      )

      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [])

  const scrollTo = (id: string) => {
    const target = document.getElementById(id)
    if (!target) {
      return
    }

    const headerHeight = Number.parseInt(
      getComputedStyle(document.documentElement).getPropertyValue('--site-header-height'),
      10
    )

    const top = target.getBoundingClientRect().top + window.scrollY - (headerHeight || 64) - 24
    window.scrollTo({ top, behavior: 'smooth' })
  }

  return (
    <nav className="fixed left-8 top-1/2 z-40 hidden -translate-y-1/2 lg:flex">
      <ul className="flex flex-col gap-5">
        {sections.map(({ id, label, number }) => {
          const isActive = activeSection === id
          return (
            <li key={id}>
              <button
                onClick={() => scrollTo(id)}
                className={`group flex items-center gap-3 transition-all duration-400 ${
                  isActive
                    ? 'text-text-default'
                    : 'text-text-subtle hover:text-text-muted'
                }`}
              >
                <span className={`block h-5 w-[2px] transition-all duration-400 ${
                  isActive ? 'bg-text-default' : 'bg-transparent'
                }`} />
                <span
                  className="text-[10px] font-light tracking-[0.15em]"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  {number}
                </span>
                <span
                  className={`text-[10px] font-light uppercase tracking-[0.15em] transition-all duration-400 ${
                    isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                  }`}
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  {label}
                </span>
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
