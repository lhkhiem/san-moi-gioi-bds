import FullpageScroll, { SectionData } from '@/components/FullpageScroll'
import Section from '@/components/Section'
import HeroSection from '@/components/sections/HeroSection'
import AboutSection from '@/components/sections/AboutSection'
import ProjectsSection from '@/components/sections/ProjectsSection'
import PortfolioSection from '@/components/sections/PortfolioSection'
import NewsSection from '@/components/sections/NewsSection'
import ContactSection from '@/components/sections/ContactSection'

const sections: SectionData[] = [
  { id: 'hero', index: 0, title: 'Trang chủ', backgroundType: 'image' },
  { id: 'gioi-thieu', index: 1, title: 'Giới thiệu', backgroundType: 'light' },
  { id: 'du-an', index: 2, title: 'Dự án', backgroundType: 'image' },
  { id: 'ho-so', index: 3, title: 'Hồ sơ', backgroundType: 'light' },
  { id: 'tin-tuc', index: 4, title: 'Tin tức', backgroundType: 'light' },
  { id: 'lien-he', index: 5, title: 'Liên hệ', backgroundType: 'image' },
]

export default function HomePage() {
  return (
    <div className="relative">
      <FullpageScroll sections={sections}>
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <PortfolioSection />
        <NewsSection />
        <ContactSection />
      </FullpageScroll>
    </div>
  )
}
