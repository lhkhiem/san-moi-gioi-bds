"use client"

import { motion } from 'framer-motion'
import CareersTabs from '@/components/careers/CareersTabs'
import JobTable from '@/components/careers/JobTable'
import { jobPostings } from '@/lib/careersData'
import { Briefcase } from 'lucide-react'

export default function CoHoiNgheNghiepPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <CareersTabs />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-goldDark rounded-full mb-6">
            <Briefcase className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Cơ hội Nghề nghiệp
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Khám phá các vị trí tuyển dụng đang mở tại INLAND Real Estate. 
            Gia nhập đội ngũ chuyên nghiệp và phát triển sự nghiệp cùng chúng tôi.
          </p>
        </motion.div>

        {/* Job Count */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <p className="text-gray-700">
            Hiện có <span className="font-bold text-goldDark">{jobPostings.length}</span> vị trí đang tuyển dụng
          </p>
        </motion.div>

        {/* Job Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden"
        >
          <JobTable jobs={jobPostings} />
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12 text-center bg-gradient-to-r from-goldDark to-goldLight rounded-2xl p-8 text-white"
        >
          <h3 className="text-2xl font-bold mb-3">Không tìm thấy vị trí phù hợp?</h3>
          <p className="mb-6">
            Hãy gửi CV của bạn đến email: <a href="mailto:hr@inland.vn" className="underline font-semibold">hr@inland.vn</a>
          </p>
          <p className="text-sm opacity-90">
            Chúng tôi luôn chào đón những tài năng xuất sắc!
          </p>
        </motion.div>
      </div>
    </div>
  )
}
