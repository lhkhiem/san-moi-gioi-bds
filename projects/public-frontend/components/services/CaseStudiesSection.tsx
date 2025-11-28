'use client'

import { motion } from 'framer-motion'
import { Building2, Factory, Home } from 'lucide-react'
import { useLayoutMeasurements } from '@/components/LayoutMeasurementsContext'
import { useSectionReveal } from '@/hooks/useSectionReveal'

export default function CaseStudiesSection() {
  const { headerHeight } = useLayoutMeasurements()
  const paddingTop = headerHeight + 30
  const revealed = useSectionReveal(5) // Section index in dich-vu page

  const cases = [
    {
      id: 1,
      title: 'Khu Dân Cư Hiện Đại',
      category: 'Khu dân cư',
      image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80',
      result: 'Rút ngắn 25% thời gian set-up',
      highlights: [
        'Diện tích 12,000 m²',
        'Layout tối ưu dòng nguyên liệu',
        'Không phát sinh chỉnh sửa kết cấu'
      ],
      icon: Home
    },
    {
      id: 2,
      title: 'Khu Công Nghiệp Thông Minh',
      category: 'Khu công nghiệp',
      image: 'https://images.unsplash.com/photo-1565008576549-57569a49371d?auto=format&fit=crop&w=800&q=80',
      result: 'Tăng 18% hiệu suất lưu chuyển',
      highlights: [
        'Giải pháp giá kệ thông minh',
        'Luồng xuất nhập liền mạch',
        'Tích hợp theo dõi nhiệt độ & PCCC'
      ],
      icon: Factory
    },
    {
      id: 3,
      title: 'Môi Giới Cho Thuê Nhà Máy',
      category: 'Môi giới nhà máy',
      image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800&q=80',
      result: 'Giảm 30% chi phí tái cấu trúc',
      highlights: [
        'Tận dụng kết cấu cũ',
        'Bổ sung MEP đồng bộ',
        'Không gián đoạn sản xuất'
      ],
      icon: Building2
    }
  ]

  return (
    <section className="relative h-screen w-full isolate flex items-start justify-start overflow-hidden bg-white">
      <div 
        className="w-full max-w-[1600px] mx-auto px-8 sm:px-12 md:px-16 lg:px-20 pb-8 h-full flex flex-col"
        style={{ paddingTop: `${paddingTop}px` }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={revealed ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-5 md:mb-6"
        >
          <div className="inline-block px-4 py-2 bg-goldLight/10 rounded-full mb-3">
            <span className="text-goldDark text-sm font-semibold tracking-wide uppercase">
              Case Study
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 md:mb-3">
            Dự Án <span className="text-goldDark">Tiêu Biểu</span>
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
            Một số ví dụ điển hình thể hiện khả năng tối ưu thời gian triển khai & chi phí vận hành cho khách hàng FDI.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-[1450px] mx-auto">
          {cases.map((project, i) => {
            const Icon = project.icon
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group relative rounded-xl overflow-hidden bg-white shadow-md hover:shadow-xl transition-all duration-500"
              >
                {/* Image Container with 3:4 aspect ratio */}
                <div className="relative w-full aspect-[3/4] overflow-hidden">
                  <motion.div
                    className="absolute inset-0"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  >
                    <div
                      className="w-full h-full bg-cover bg-center"
                      style={{ backgroundImage: `url(${project.image})` }}
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  </motion.div>

                  {/* Title on image */}
                  <div className="absolute top-4 left-4 right-4 z-10">
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className="w-10 h-10 rounded-lg bg-goldLight/90 backdrop-blur-sm flex items-center justify-center">
                        <Icon className="w-5 h-5 text-goldDark" />
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-white drop-shadow-lg leading-tight">
                      {project.title}
                    </h3>
                    <p className="text-xs text-goldLight font-medium uppercase tracking-wide mt-1">
                      {project.category}
                    </p>
                  </div>
                </div>

                {/* Text Content Block */}
                <motion.div
                  className="p-4 bg-white"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Result highlight */}
                  <div className="mb-3 pb-3 border-b border-gray-100">
                    <div className="text-sm font-bold text-goldDark">
                      {project.result}
                    </div>
                  </div>

                  {/* Highlights list */}
                  <ul className="space-y-2">
                    {project.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-gray-600 leading-relaxed">
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-goldDark mt-1.5 flex-shrink-0" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Footer note */}
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <p className="text-[10px] text-gray-400 italic">
                      * Số liệu minh hoạ nội bộ
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
