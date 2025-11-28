'use client'

import { motion } from 'framer-motion'
import { Lightbulb, TrendingUp, Users } from 'lucide-react'
import { useSectionReveal } from '@/hooks/useSectionReveal'

export default function StoryOrigin() {
  const revealed = useSectionReveal(1) // Section index in gioi-thieu page
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 to-white">
      <div className="w-full max-w-[1600px] mx-auto px-8 sm:px-12 md:px-16 lg:px-20 py-6 md:py-8 max-h-[85vh] overflow-y-auto scrollbar-hide flex flex-col justify-center">
        <div className="grid md:grid-cols-2 gap-4 md:gap-6 items-center">
          {/* Left: Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={revealed ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
            className="relative h-[300px] md:h-[400px] rounded-2xl overflow-hidden shadow-2xl order-2 md:order-1"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-goldDark/30 to-transparent z-10" />
            <div
              className="absolute inset-0 w-full h-full"
              style={{
                backgroundImage: 'url(https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80)',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            />
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={revealed ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: revealed ? 0.2 : 0 }}
            className="space-y-6 order-1 md:order-2"
          >
            <div className="inline-block px-4 py-2 bg-goldLight/10 rounded-full mb-2">
              <span className="text-goldDark text-sm font-semibold tracking-wide uppercase">
                Câu chuyện INLANDV
              </span>
            </div>

            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 leading-tight">
              Xuất phát điểm
              <br />
              <span className="text-goldDark">Từ đâu?</span>
            </h2>

            <div className="space-y-3 text-sm md:text-base text-gray-700 leading-relaxed">
              <p>
                <strong className="text-goldDark">INLANDV</strong> được thành lập với xuất phát điểm 
                từ đam mê và tầm nhìn của những nhà đầu tư am tường, thành công trong lĩnh vực 
                bất động sản công nghiệp. Nhận thấy nhu cầu ngày càng tăng của các doanh nghiệp 
                FDI tại Việt Nam, chúng tôi quyết tâm xây dựng một nền tảng kết nối chuyên nghiệp.
              </p>

              <p>
                Với sự am hiểu sâu sắc về thị trường Việt Nam và văn hóa Trung Hoa, 
                <strong className="text-goldDark"> INLANDV</strong> ra đời như cầu nối tin cậy giữa 
                các nhà đầu tư FDI và hệ sinh thái bất động sản công nghiệp trong nước, 
                giúp nhà đầu tư an tâm, thành công.
              </p>
            </div>

            {/* Key Points */}
            <div className="space-y-2 pt-2">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-goldLight/20 flex items-center justify-center flex-shrink-0">
                  <Lightbulb className="w-5 h-5 text-goldDark" />
                </div>
                <div>
                  <div className="font-bold text-gray-900">Xuất phát điểm</div>
                  <div className="text-sm text-gray-600">Từ đam mê và tầm nhìn của những nhà đầu tư thành công</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-goldLight/20 flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-5 h-5 text-goldDark" />
                </div>
                <div>
                  <div className="font-bold text-gray-900">Sự mệnh</div>
                  <div className="text-sm text-gray-600">Giúp nhà đầu tư FDI an tâm, thành công</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-goldLight/20 flex items-center justify-center flex-shrink-0">
                  <Users className="w-5 h-5 text-goldDark" />
                </div>
                <div>
                  <div className="font-bold text-gray-900">Tầm nhìn</div>
                  <div className="text-sm text-gray-600">Trở thành đối tác số 1 cho FDI tại Việt Nam</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
