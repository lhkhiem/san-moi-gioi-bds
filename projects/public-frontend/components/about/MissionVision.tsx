'use client'

import { motion } from 'framer-motion'
import { Target, Rocket, Eye, Heart } from 'lucide-react'
import { useSectionReveal } from '@/hooks/useSectionReveal'

export default function MissionVision() {
  const revealed = useSectionReveal(2) // Section index in gioi-thieu page
  const items = [
    {
      icon: Eye,
      title: 'Tầm nhìn',
      subtitle: 'Trở thành đối tác số 1 cho FDI',
      description: 'Xây dựng nền tảng kết nối hàng đầu giữa nhà đầu tư FDI và hệ sinh thái bất động sản công nghiệp tại Việt Nam, trở thành cái tên được nhắc đến đầu tiên khi nghĩ về đầu tư BĐS công nghiệp.'
    },
    {
      icon: Target,
      title: 'Sứ mệnh',
      subtitle: 'Kết nối - Tư vấn - Đồng hành',
      description: 'Cung cấp giải pháp toàn diện cho nhà đầu tư FDI: từ tìm kiếm vị trí, tư vấn pháp lý, đến hỗ trợ xây dựng và vận hành. Chúng tôi đồng hành cùng khách hàng trong mọi giai đoạn của dự án.'
    },
    {
      icon: Rocket,
      title: 'Mục tiêu',
      subtitle: 'Tăng trưởng bền vững',
      description: 'Phát triển mạng lưới đối tác chiến lược, mở rộng danh mục KCN chất lượng cao và không ngừng nâng cao chất lượng dịch vụ để mang lại giá trị vượt trội cho khách hàng và đối tác.'
    },
    {
      icon: Heart,
      title: 'Giá trị cốt lõi',
      subtitle: 'Uy tín - Chuyên nghiệp - Tận tâm',
      description: 'Đặt lợi ích khách hàng lên hàng đầu, cam kết minh bạch trong mọi giao dịch, và luôn sẵn sàng hỗ trợ 24/7. Mỗi dự án thành công của khách hàng là niềm tự hào của chúng tôi.'
    }
  ]

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-white">
      <div className="w-full max-w-[1600px] mx-auto px-8 sm:px-12 md:px-16 lg:px-20 py-4 md:py-6 h-full flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="inline-block px-4 py-2 bg-goldLight/10 rounded-full mb-3">
            <span className="text-goldDark text-sm font-semibold tracking-wide uppercase">
              Định hướng phát triển
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
            Sứ mệnh & <span className="text-goldDark">Tầm nhìn</span>
          </h2>
          <p className="text-sm md:text-base text-gray-600 max-w-3xl mx-auto">
            Chúng tôi hướng đến mục tiêu trở thành đối tác tin cậy nhất cho các nhà đầu tư FDI tại Việt Nam
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-4">
          {items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: revealed ? 0.1 + index * 0.1 : 0 }}
              className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border-2 border-gray-100 hover:border-goldDark/30 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-xl bg-goldLight/20 flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-7 h-7 text-goldDark" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm font-medium text-goldDark mb-2">
                    {item.subtitle}
                  </p>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
