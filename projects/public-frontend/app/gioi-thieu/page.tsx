import type { Metadata } from 'next'
import { Suspense } from 'react'
import FullpageScroll, { SectionData } from '@/components/FullpageScroll'
import SectionNavigationHandler from '@/components/SectionNavigationHandler'
import AboutHero from '@/components/about/AboutHero'
import StoryOrigin from '@/components/about/StoryOrigin'
import MissionVision from '@/components/about/MissionVision'
import CompanyIntro from '@/components/about/CompanyIntro'
import KeyTeam from '@/components/about/KeyTeam'
import OrgChart from '@/components/about/OrgChart'
import KeyClients from '@/components/about/KeyClients'

export const metadata: Metadata = {
  title: 'Giới thiệu - Inland Real Estate',
  description: 'Tìm hiểu về Inland Real Estate - Sàn giao dịch bất động sản uy tín với hơn 15 năm kinh nghiệm',
}

const sections: SectionData[] = [
  { id: 'hero', index: 0, title: 'Mở đầu', backgroundType: 'image' },
  { id: 'xuat-phat', index: 1, title: 'Xuất phát', backgroundType: 'light' },
  { id: 'tam-nhin', index: 2, title: 'Tầm nhìn', backgroundType: 'light' },
  { id: 'gioi-thieu', index: 3, title: 'Giới thiệu', backgroundType: 'light' },
  { id: 'doi-ngu', index: 4, title: 'Đội ngũ', backgroundType: 'image' },
  { id: 'to-chuc', index: 5, title: 'Tổ chức', backgroundType: 'light' },
  { id: 'khach-hang', index: 6, title: 'Khách hàng', backgroundType: 'light' },
]

export default function AboutPage() {
  return (
    <div className="relative">
      <Suspense fallback={null}>
        <SectionNavigationHandler sections={sections} />
      </Suspense>
      <FullpageScroll sections={sections}>
        <AboutHero />
        <StoryOrigin />
        <MissionVision />
        <CompanyIntro />
        <KeyTeam />
        <OrgChart />
        <KeyClients />
      </FullpageScroll>
    </div>
  )
}
