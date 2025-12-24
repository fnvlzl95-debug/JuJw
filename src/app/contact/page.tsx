'use client'

import { useState } from 'react'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'

const contactInfo = [
  { icon: Phone, label: '전화', value: '02-000-0000' },
  { icon: Mail, label: '이메일', value: 'info@jujewelry.kr' },
  { icon: MapPin, label: '주소', value: '서울 종로구 종로 OO길 OO' },
  { icon: Clock, label: '운영시간', value: '평일 09:00 - 18:00' },
]

const interestOptions = [
  { value: '', label: '선택해 주세요' },
  { value: 'ring', label: '반지' },
  { value: 'necklace', label: '목걸이' },
  { value: 'earring', label: '귀걸이' },
  { value: 'bracelet', label: '팔찌' },
  { value: 'custom', label: '맞춤 제작' },
  { value: 'other', label: '기타' },
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    company: '',
    phone: '',
    interest: '',
    message: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: 폼 제출 처리
    alert('상담 요청이 접수되었습니다. 빠른 시일 내에 연락드리겠습니다.')
  }

  return (
    <>
      {/* Hero Section */}
      <section className="pt-[72px]">
        <div className="py-20 lg:py-24 px-6 bg-bg-secondary">
          <div className="max-w-content mx-auto text-center">
            <p className="text-[11px] font-medium tracking-[0.15em] uppercase text-accent mb-4">
              Contact
            </p>
            <h1 className="font-serif text-3xl lg:text-[2.8rem] font-light text-text-default mb-6">
              상담 요청
            </h1>
            <p className="text-[15px] text-text-muted max-w-[480px] mx-auto">
              문의 사항을 남겨주시면 빠르게 연락드리겠습니다
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-24 lg:py-32 px-6">
        <div className="max-w-content mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Contact Info */}
            <div>
              <h2 className="font-serif text-2xl lg:text-[1.8rem] font-light text-text-default mb-10">
                연락처 안내
              </h2>
              <div className="space-y-8 mb-12">
                {contactInfo.map((item, index) => (
                  <div key={index} className="flex gap-5">
                    <div className="flex-shrink-0 w-11 h-11 rounded-full bg-bg-secondary flex items-center justify-center">
                      <item.icon size={20} className="text-accent" />
                    </div>
                    <div>
                      <p className="text-[12px] font-medium text-text-muted tracking-wide uppercase mb-1">
                        {item.label}
                      </p>
                      <p className="text-[16px] text-text-default">
                        {item.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-6 bg-bg-secondary">
                <p className="text-[14px] text-text-muted leading-relaxed">
                  <span className="text-accent font-medium">영업시간 내</span> 문의 주시면
                  당일 연락드리며, 영업시간 외 문의는 다음 영업일에 순차적으로
                  연락드립니다.
                </p>
              </div>
            </div>

            {/* Form */}
            <div>
              <h2 className="font-serif text-2xl lg:text-[1.8rem] font-light text-text-default mb-10">
                상담 요청 폼
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-[13px] font-medium text-text-muted mb-2 tracking-wide">
                    상호 / 성함 *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="상호 또는 성함을 입력해 주세요"
                    className="w-full px-4 py-4 text-[15px] bg-bg-primary border border-border text-text-default placeholder:text-text-subtle focus:outline-none focus:border-accent transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[13px] font-medium text-text-muted mb-2 tracking-wide">
                    연락처 *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="연락 가능한 번호를 입력해 주세요"
                    className="w-full px-4 py-4 text-[15px] bg-bg-primary border border-border text-text-default placeholder:text-text-subtle focus:outline-none focus:border-accent transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[13px] font-medium text-text-muted mb-2 tracking-wide">
                    관심 품목
                  </label>
                  <select
                    value={formData.interest}
                    onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                    className="w-full px-4 py-4 text-[15px] bg-bg-primary border border-border text-text-default focus:outline-none focus:border-accent transition-colors cursor-pointer"
                  >
                    {interestOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[13px] font-medium text-text-muted mb-2 tracking-wide">
                    문의 내용
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="문의 내용을 입력해 주세요"
                    rows={5}
                    className="w-full px-4 py-4 text-[15px] bg-bg-primary border border-border text-text-default placeholder:text-text-subtle focus:outline-none focus:border-accent transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-text-default text-white text-[14px] font-medium hover:bg-neutral-800 transition-colors"
                >
                  상담 요청
                </button>

                <p className="text-center text-[13px] text-text-muted">
                  영업일 기준 24시간 내 연락드리겠습니다.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
