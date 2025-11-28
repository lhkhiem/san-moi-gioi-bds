'use client'

import { motion } from 'framer-motion'
import { UserCircle, Briefcase, Scale, Building2 } from 'lucide-react'
import { useSectionReveal } from '@/hooks/useSectionReveal'

export default function KeyTeam() {
  const revealed = useSectionReveal(4) // Section index in gioi-thieu page
  const experts = [
    {
      category: 'Chuyên gia tư vấn',
      icon: Briefcase,
      members: [
        { role: 'Tư vấn đa ngôn ngữ', count: '10+' },
        { role: 'Chuyên gia pháp lý', count: '5+' }
      ],
      description: 'Đội ngũ tư vấn chuyên nghiệp, thông thạo tiếng Trung, Anh, Việt, am hiểu sâu sắc về pháp luật và thị trường BĐS công nghiệp.'
    },
    {
      category: 'Giá trị cốt lõi',
      icon: Scale,
      values: [
        { title: 'Minh bạch', desc: 'Giải thích chi tiết từng giá trị' },
        { title: 'Tận tâm', desc: 'Luôn đặt khách hàng lên hàng đầu' },
        { title: 'Chuyên nghiệp', desc: 'Đào tạo bài bản, quy trình chuẩn' },
        { title: 'Bền vững', desc: 'Hợp tác lâu dài, cùng phát triển' }
      ],
      description: 'Những giá trị này định hướng mọi hoạt động của INLANDV, tạo nên văn hóa doanh nghiệp độc đáo và bền vững.'
    }
  ]

  return (
    <section 
      className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-center bg-no-repeat bg-cover bg-scroll lg:bg-fixed"
      style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=2000&q=80)' }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/70 z-[5]" />
      
      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-8 sm:px-12 md:px-16 lg:px-20 py-4 md:py-6 h-full flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="inline-block px-4 py-2 bg-goldLight/20 backdrop-blur-sm rounded-full mb-3">
            <span className="text-goldLight text-sm font-semibold tracking-wide uppercase">
              Đội ngũ chuyên gia
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2">
            Đội ngũ <span className="text-goldLight">Key Team</span>
          </h2>
          <p className="text-sm md:text-base text-gray-200 max-w-3xl mx-auto">
            Chuyên gia tư vấn đa ngôn ngữ và giá trị cốt lõi định hướng mọi hoạt động
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Chuyên gia tư vấn */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={revealed ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, delay: revealed ? 0.2 : 0 }}
            className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-lg border-2 border-goldDark/20"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-xl bg-goldLight/20 flex items-center justify-center">
                <Briefcase className="w-7 h-7 text-goldDark" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Chuyên gia tư vấn</h3>
            </div>

            <p className="text-gray-600 mb-6 leading-relaxed">
              Đội ngũ tư vấn chuyên nghiệp, thông thạo tiếng Trung, Anh, Việt, am hiểu sâu sắc về pháp luật và thị trường BĐS công nghiệp.
            </p>

            <div className="space-y-4">
              {experts[0].members?.map((member, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <UserCircle className="w-5 h-5 text-goldDark" />
                    <span className="font-medium text-gray-900">{member.role}</span>
                  </div>
                  <span className="text-2xl font-bold text-goldDark">{member.count}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Giá trị cốt lõi */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={revealed ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: revealed ? 0.3 : 0 }}
            className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-lg border-2 border-goldDark/20"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-xl bg-goldLight/20 flex items-center justify-center">
                <Scale className="w-7 h-7 text-goldDark" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Giá trị cốt lõi</h3>
            </div>

            <p className="text-gray-600 mb-6 leading-relaxed">
              Những giá trị này định hướng mọi hoạt động của INLANDV, tạo nên văn hóa doanh nghiệp độc đáo và bền vững.
            </p>

            <div className="grid grid-cols-2 gap-3">
              {experts[1].values?.map((value, idx) => (
                <div key={idx} className="bg-gradient-to-br from-goldLight/10 to-goldLight/5 rounded-xl p-4 border border-goldDark/10">
                  <div className="font-bold text-gray-900 mb-1">{value.title}</div>
                  <div className="text-xs text-gray-600">{value.desc}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
