import type { Metadata } from 'next'
import FullpageScroll, { SectionData } from '@/components/FullpageScroll'
import AboutHero from '@/components/about/AboutHero'
import CompanyIntro from '@/components/about/CompanyIntro'
import VisionMission from '@/components/about/VisionMission'
import OrgChart from '@/components/about/OrgChart'
import Services from '@/components/about/Services'
import Awards from '@/components/about/Awards'
import Testimonials from '@/components/about/Testimonials'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'Giới thiệu - Inland Real Estate',
  description: 'Tìm hiểu về Inland Real Estate - Sàn giao dịch bất động sản uy tín với hơn 15 năm kinh nghiệm',
}

const sections: SectionData[] = [
  { id: 'hero', index: 0, title: 'Hero' },
  { id: 'gioi-thieu', index: 1, title: 'Giới thiệu' },
  { id: 'tam-nhin', index: 2, title: 'Tầm nhìn' },
  { id: 'to-chuc', index: 3, title: 'Tổ chức' },
  { id: 'dich-vu', index: 4, title: 'Dịch vụ' },
  { id: 'thanh-tuu', index: 5, title: 'Thành tựu' },
  { id: 'danh-gia', index: 6, title: 'Đánh giá' },
]

export default function AboutPage() {
  return (
    <div className="relative">
      <FullpageScroll sections={sections}>
        <AboutHero />
        <CompanyIntro />
        <VisionMission />
        <OrgChart />
        <Services />
        <Awards />
        <Testimonials />
      </FullpageScroll>
      
      {/* Footer - accessible via natural scroll after last section */}
      <Footer />
    </div>
  )
}
