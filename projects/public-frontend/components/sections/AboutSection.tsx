'use client'

import { motion } from 'framer-motion'
import { Target, Award, Users, TrendingUp } from 'lucide-react'
import { useSectionReveal } from '@/hooks/useSectionReveal'

export default function AboutSection() {
  const revealed = useSectionReveal(1) // Section index in homepage
  const features = [
    {
      icon: Target,
      title: 'Tầm Nhìn',
      description: 'Trở thành sàn giao dịch bất động sản hàng đầu, mang đến những giá trị bền vững cho cộng đồng.',
    },
    {
      icon: Award,
      title: 'Sứ Mệnh',
      description: 'Cung cấp dịch vụ tư vấn chuyên nghiệp, minh bạch và tận tâm với từng khách hàng.',
    },
    {
      icon: Users,
      title: 'Đội Ngũ',
      description: 'Chuyên gia giàu kinh nghiệm, am hiểu thị trường và luôn đồng hành cùng bạn.',
    },
    {
      icon: TrendingUp,
      title: 'Lợi Thế',
      description: 'Kết nối đa dạng dự án, thủ tục nhanh chóng, hỗ trợ tài chính tối ưu.',
    },
  ]

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-white/70 z-[5]" />
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
      </div>
      
      {/* Content */}
      <div className="relative z-20 w-full max-w-[1600px] mx-auto px-8 sm:px-12 md:px-16 lg:px-20 py-4 md:py-6 max-h-[85vh] overflow-y-auto scrollbar-hide flex flex-col justify-center">
        <div className="text-center mb-4 md:mb-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: revealed ? 0.1 : 0 }}
            className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-2"
          >
            Về <span className="text-goldLight">Inland Real Estate</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: revealed ? 0.2 : 0 }}
            className="text-xs md:text-sm lg:text-base text-gray-700 max-w-3xl mx-auto"
          >
            Với hơn 15 năm kinh nghiệm trong lĩnh vực bất động sản, chúng tôi tự hào là đối tác đáng tin cậy
            của hàng nghìn khách hàng trên khắp cả nước.
          </motion.p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 lg:gap-6 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: revealed ? 0.3 + index * 0.1 : 0 }}
              whileHover={{ y: -5 }}
              className="bg-gray-900/95 backdrop-blur-sm rounded-xl p-3 md:p-4 lg:p-5 shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-gray-800"
            >
              <div className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 bg-goldLight/20 rounded-full flex items-center justify-center mb-2 md:mb-3 mx-auto">
                <feature.icon className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-goldLight" />
              </div>
              <h3 className="text-sm md:text-base lg:text-lg font-bold text-white mb-1 md:mb-2 text-center">
                {feature.title}
              </h3>
              <p className="text-xs md:text-sm text-gray-300 text-center leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-4 md:mt-6 text-center"
        >
          <div className="inline-block bg-gray-900/95 backdrop-blur-sm rounded-xl shadow-xl p-4 md:p-6 max-w-3xl border border-gray-800">
            <p className="text-xs md:text-sm lg:text-base text-white leading-relaxed italic">
              &ldquo;Chúng tôi không chỉ bán bất động sản, mà còn xây dựng niềm tin và tạo dựng những giá trị
              bền vững cho mỗi gia đình Việt. Sự hài lòng của khách hàng chính là thành công của chúng tôi.&rdquo;
            </p>
            <div className="mt-3 md:mt-4">
              <p className="font-bold text-white text-sm md:text-base">CEO - Nguyễn Văn A</p>
              <p className="text-xs text-gray-300">Người sáng lập Inland Real Estate</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
