import type { Metadata } from 'next'
import { Suspense } from 'react'
import FullpageScroll, { SectionData } from '@/components/FullpageScroll'
import SectionNavigationHandler from '@/components/SectionNavigationHandler'
import ServicesHero from '@/components/services/ServicesHero'
import BrokerageSection from '@/components/services/BrokerageSection'
import LegalInvestmentSection from '@/components/services/LegalInvestmentSection'
import FDISupportSection from '@/components/services/FDISupportSection'
import DesignConstructionSection from '@/components/services/DesignConstructionSection'
import CaseStudiesSection from '@/components/services/CaseStudiesSection'
import ServicesTestimonialsSection from '@/components/services/ServicesTestimonialsSection'
import ServicesCTASection from '@/components/services/ServicesCTASection'

export const metadata: Metadata = {
  title: 'Dịch vụ - Inland Real Estate',
  description: 'Giải pháp bất động sản công nghiệp toàn diện cho doanh nghiệp FDI – Môi giới, Tư vấn pháp lý, Hỗ trợ FDI, Thiết kế & Thi công, Case Study, Testimonials.'
}

const sections: SectionData[] = [
  { id: 'hero', index: 0, title: 'Mở đầu', backgroundType: 'image' },
  { id: 'moi-gioi', index: 1, title: 'Môi giới', backgroundType: 'light' },
  { id: 'phap-ly', index: 2, title: 'Pháp lý', backgroundType: 'light' },
  { id: 'fdi', index: 3, title: 'FDI', backgroundType: 'light' },
  { id: 'thiet-ke-thi-cong', index: 4, title: 'Thiết kế', backgroundType: 'image' },
  { id: 'case-study', index: 5, title: 'Case Study', backgroundType: 'light' },
  { id: 'testimonials', index: 6, title: 'Đánh giá', backgroundType: 'light' },
  { id: 'cta', index: 7, title: 'CTA', backgroundType: 'dark' }
]

export default function ServicesPage() {
  return (
    <div className="relative">
      <Suspense fallback={null}>
        <SectionNavigationHandler sections={sections} />
      </Suspense>
      <FullpageScroll sections={sections}>
        <ServicesHero />
        <BrokerageSection />
        <LegalInvestmentSection />
        <FDISupportSection />
        <DesignConstructionSection />
        <CaseStudiesSection />
        <ServicesTestimonialsSection />
        <ServicesCTASection />
      </FullpageScroll>
    </div>
  )
}
