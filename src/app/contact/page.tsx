import { Clock, Mail, MapPin, Phone } from 'lucide-react'
import ContactForm from '@/components/contact/ContactForm'
import { buildPageMetadata } from '@/lib/metadata'
import { getSiteSettings } from '@/lib/site-data'

export const metadata = buildPageMetadata({
  title: '상담 요청',
  description: '도매 상담, 카탈로그 요청, 방문 예약 문의를 온라인으로 접수할 수 있습니다.',
  path: '/contact',
})

export default async function ContactPage({
  searchParams,
}: {
  searchParams?: { interest?: string }
}) {
  const settings = await getSiteSettings()

  const contactInfo = [
    { icon: Phone, label: '전화', value: settings.phone },
    { icon: Mail, label: '이메일', value: settings.email },
    { icon: MapPin, label: '주소', value: settings.addressLine1 },
    { icon: Clock, label: '운영시간', value: settings.hoursWeekday },
  ]

  return (
    <>
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
              문의 사항을 남겨주시면 빠르게 확인 후 연락드리겠습니다.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32 px-6">
        <div className="max-w-content mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
            <div>
              <h2 className="font-serif text-2xl lg:text-[1.8rem] font-light text-text-default mb-10">
                연락처 안내
              </h2>
              <div className="space-y-8 mb-12">
                {contactInfo.map((item) => (
                  <div key={item.label} className="flex gap-5">
                    <div className="flex-shrink-0 w-11 h-11 rounded-full bg-bg-secondary flex items-center justify-center">
                      <item.icon size={20} className="text-accent" />
                    </div>
                    <div>
                      <p className="text-[12px] font-medium text-text-muted tracking-wide uppercase mb-1">
                        {item.label}
                      </p>
                      <p className="text-[16px] text-text-default">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-6 bg-bg-secondary">
                <p className="text-[14px] text-text-muted leading-relaxed">
                  <span className="text-accent font-medium">{settings.contactResponseTime}</span>
                  {' '}기준으로 순차 연락드리며, 영업시간 외 문의는 다음 영업일에
                  확인합니다.
                </p>
              </div>
            </div>

            <div>
              <h2 className="font-serif text-2xl lg:text-[1.8rem] font-light text-text-default mb-10">
                상담 요청 폼
              </h2>
              <ContactForm
                initialInterest={searchParams?.interest}
                contactResponseTime={settings.contactResponseTime}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
