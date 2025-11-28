'use client'

import { motion } from 'framer-motion'
import { Factory, MapPin, Workflow, Layers } from 'lucide-react'
import { useLayoutMeasurements } from '@/components/LayoutMeasurementsContext'
import { useSectionReveal } from '@/hooks/useSectionReveal'

export default function BrokerageSection() {
  const { headerHeight } = useLayoutMeasurements()
  const paddingTop = headerHeight + 30
  const revealed = useSectionReveal(1) // Section index in dich-vu page

  const benefits = [
    'Tiếp cận nhanh danh mục nhà xưởng & đất công nghiệp chất lượng',
    'Quy trình minh bạch, pháp lý rõ ràng',
    'Tư vấn tối ưu chi phí & thời gian thuê/mua',
    'Hỗ trợ đàm phán & ký kết hợp đồng an toàn'
  ]

  const process = [
    'Tiếp nhận nhu cầu & tiêu chí',
    'Khảo sát & đề xuất địa điểm phù hợp',
    'Pháp lý & thẩm định điều kiện',
    'Đàm phán & ký kết',
    'Bàn giao & hỗ trợ vận hành đầu kỳ'
  ]

  const stats = [
    { label: 'Tổng diện tích chào thuê', value: '2.5M+ m²' },
    { label: 'Danh mục dự án', value: '180+' },
    { label: 'Nhà xưởng hoàn chỉnh', value: '600+' },
    { label: 'Quỹ đất công nghiệp', value: '1.2M+ m²' }
  ]

  const categories = [
    { icon: Factory, title: 'Nhà xưởng xây sẵn', desc: 'Tiết kiệm thời gian, sẵn sàng vận hành' },
    { icon: Layers, title: 'Đất công nghiệp', desc: 'Phù hợp mở rộng sản xuất dài hạn' }
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
              Môi giới BĐS Công nghiệp
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 md:mb-3">
            Thuê / Mua <span className="text-goldDark">Hiệu Quả</span>
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
            Giải pháp tối ưu kết nối nhu cầu doanh nghiệp FDI với nguồn cung nhà xưởng & đất công nghiệp chất lượng cao.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
          {/* Left: Benefits */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={revealed ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
            transition={{ duration: 0.6, delay: revealed ? 0.1 : 0 }}
            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
          >
            <h3 className="text-lg font-bold text-gray-900 mb-4">Lợi ích</h3>
            <ul className="space-y-3">
              {benefits.map((b, i) => (
                <li key={i} className="flex gap-3">
                  <MapPin className="w-5 h-5 text-goldDark flex-shrink-0" />
                  <span className="text-sm text-gray-700">{b}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Middle: Process */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
          >
            <h3 className="text-lg font-bold text-gray-900 mb-4">Quy trình</h3>
            <ol className="space-y-3 list-none">
              {process.map((step, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-goldLight/30 text-goldDark flex items-center justify-center text-xs font-bold">{i + 1}</div>
                  <span className="text-sm text-gray-700">{step}</span>
                </li>
              ))}
            </ol>
          </motion.div>

          {/* Right: Stats */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
          >
            <h3 className="text-lg font-bold text-gray-900 mb-4">Thống kê</h3>
            <div className="grid grid-cols-2 gap-4">
              {stats.map((s, i) => (
                <div key={i} className="p-3 rounded-xl bg-gray-50 border border-gray-100">
                  <div className="text-goldDark font-bold text-lg">{s.value}</div>
                  <div className="text-xs text-gray-600">{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Categories */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-4 mt-6 md:mt-7"
        >
          {categories.map((cat, i) => {
            const Icon = cat.icon
            return (
              <div key={i} className="flex items-center gap-4 p-5 bg-white rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-goldLight/20 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-goldDark" />
                </div>
                <div>
                  <div className="font-bold text-gray-900 mb-1">{cat.title}</div>
                  <div className="text-sm text-gray-600">{cat.desc}</div>
                </div>
              </div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
