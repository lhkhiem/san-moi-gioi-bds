import FullpageScroll, { SectionData } from '@/components/FullpageScroll'
import Section from '@/components/Section'
import HeroSection from '@/components/sections/HeroSection'
import AboutSection from '@/components/sections/AboutSection'
import ProjectsSection from '@/components/sections/ProjectsSection'
import NewsSection from '@/components/sections/NewsSection'
import ContactSection from '@/components/sections/ContactSection'
import Footer from '@/components/layout/Footer'

const sections: SectionData[] = [
  { id: 'hero', index: 0, title: 'Trang chủ' },
  { id: 'gioi-thieu', index: 1, title: 'Giới thiệu' },
  { id: 'du-an', index: 2, title: 'Dự án' },
  { id: 'tin-tuc', index: 3, title: 'Tin tức' },
  { id: 'lien-he', index: 4, title: 'Liên hệ' },
]

export default function HomePage() {
  return (
    <div className="relative">
      <FullpageScroll sections={sections}>
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <NewsSection />
        <ContactSection />
      </FullpageScroll>
      
      {/* Footer - accessible via natural scroll after last section */}
      <Footer />
    </div>
  )
}
