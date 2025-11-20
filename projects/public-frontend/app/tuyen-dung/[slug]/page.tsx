"use client"

import { notFound } from 'next/navigation'
import JobDetailHero from '@/components/careers/JobDetailHero'
import JobDetailContent from '@/components/careers/JobDetailContent'
import JobApplyForm from '@/components/careers/JobApplyForm'
import { jobPostings } from '@/lib/careersData'

export default function JobDetailPage({ params }: { params: { slug: string } }) {
  const job = jobPostings.find(j => j.slug === params.slug)

  if (!job) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="h-20" />
      
      <JobDetailHero job={job} />
      
      <JobDetailContent job={job} />
      
      <JobApplyForm jobTitle={job.title} />
      
      <div className="h-16" />
    </div>
  )
}
