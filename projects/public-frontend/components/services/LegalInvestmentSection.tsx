'use client'

import { motion } from 'framer-motion'
import { FileCheck, Hammer, ShieldCheck, ScrollText } from 'lucide-react'
import { useLayoutMeasurements } from '@/components/LayoutMeasurementsContext'
import { useSectionReveal } from '@/hooks/useSectionReveal'

export default function LegalInvestmentSection() {
  const { headerHeight } = useLayoutMeasurements()
  const paddingTop = headerHeight + 30
  const revealed = useSectionReveal(2) // Section index in dich-vu page

  const services = [
    { icon: FileCheck, title: 'Giấy phép đầu tư', desc: 'Tư vấn hồ sơ & tối ưu thời gian xử lý' },
    { icon: Hammer, title: 'Thủ tục xây dựng', desc: 'Hỗ trợ xin giấy phép xây dựng & PCCC' },
    { icon: ScrollText, title: 'Hợp đồng & pháp chế', desc: 'Rà soát rủi ro, đảm bảo tính pháp lý' },
    { icon: ShieldCheck, title: 'Tuân thủ & bảo hộ', desc: 'Đảm bảo hoạt động phù hợp quy định hiện hành' }
  ]

  const benefits = [
    'Giảm thiểu rủi ro pháp lý ngay từ đầu',
    'Tối ưu thời gian triển khai dự án',
    'Đảm bảo tính hợp lệ hồ sơ & chứng từ',
    'Đồng hành xuyên suốt trong và sau cấp phép'
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
              Tư vấn Pháp lý & Đầu tư
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 md:mb-3">
            An Toàn <span className="text-goldDark">Pháp Lý</span>
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
            Dịch vụ chuyên sâu đảm bảo dự án đầu tư tuân thủ đúng quy định, tối ưu chi phí & thời gian vận hành.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
          {/* Services list */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={revealed ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
            transition={{ duration: 0.6, delay: revealed ? 0.1 : 0 }}
            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
          >
            <h3 className="text-lg font-bold text-gray-900 mb-4">Dịch vụ cụ thể</h3>
            <div className="space-y-4">
              {services.map((s, i) => {
                const Icon = s.icon
                return (
                  <div key={i} className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-goldLight/20 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-goldDark" />
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 text-sm md:text-base mb-1">{s.title}</div>
                      <div className="text-xs md:text-sm text-gray-600">{s.desc}</div>
                    </div>
                  </div>
                )
              })}
            </div>
          </motion.div>

          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
          >
            <h3 className="text-lg font-bold text-gray-900 mb-4">Lợi ích</h3>
            <ul className="space-y-3">
              {benefits.map((b, i) => (
                <li key={i} className="flex gap-3">
                  <div className="w-5 h-5 rounded-md bg-goldLight/30 text-goldDark flex items-center justify-center text-xs font-bold">✓</div>
                  <span className="text-sm text-gray-700">{b}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Summary */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-goldLight/15 to-goldLight/5 rounded-2xl p-6 shadow-lg border border-goldLight/30"
          >
            <h3 className="text-lg font-bold text-gray-900 mb-3">Kết quả mang lại</h3>
            <p className="text-sm text-gray-700 leading-relaxed mb-4">
              Đảm bảo dự án vận hành hợp pháp, hạn chế tối đa rủi ro trong các giai đoạn tiếp theo: xây dựng, mở rộng, chuyển giao.
            </p>
            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-white shadow-sm border border-gray-100">
                <div className="text-goldDark font-bold">100% Hồ sơ đạt chuẩn</div>
                <div className="text-xs text-gray-600">Được thẩm định trước khi nộp</div>
              </div>
              <div className="p-3 rounded-xl bg-white shadow-sm border border-gray-100">
                <div className="text-goldDark font-bold">Giảm 30% thời gian xử lý</div>
                <div className="text-xs text-gray-600">So với tự triển khai</div>
              </div>
              <div className="p-3 rounded-xl bg-white shadow-sm border border-gray-100">
                <div className="text-goldDark font-bold">Tư vấn liên tục</div>
                <div className="text-xs text-gray-600">Trong & sau cấp phép đầu tư</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
