"use client"

import { useState } from 'react'
import FullpageScroll from '@/components/FullpageScroll'
import CareersTabs from '@/components/careers/CareersTabs'
import {
  HRPolicySection,
  OverviewSection,
  BenefitsSection,
  TrainingSection,
  WorkEnvironmentSection
} from '@/components/careers/HRPolicySection'

export default function ChinhSachNhanSuPage() {
  const [currentSection, setCurrentSection] = useState(0)

  const sections = [
    { id: 'tong-quan', label: 'Tổng quan' },
    { id: 'phuc-loi', label: 'Chính sách phúc lợi' },
    { id: 'dao-tao', label: 'Đào tạo & phát triển' },
    { id: 'moi-truong', label: 'Môi trường làm việc' }
  ]

  return (
    <>
      <CareersTabs />
      
      <FullpageScroll
        sections={sections}
        currentSection={currentSection}
        onSectionChange={setCurrentSection}
      >
        <HRPolicySection id="tong-quan" title="Tổng quan" content={<OverviewSection />} />
        <HRPolicySection id="phuc-loi" title="Chính sách phúc lợi" content={<BenefitsSection />} />
        <HRPolicySection id="dao-tao" title="Đào tạo & phát triển" content={<TrainingSection />} />
        <HRPolicySection id="moi-truong" title="Môi trường làm việc" content={<WorkEnvironmentSection />} />
      </FullpageScroll>
    </>
  )
}
