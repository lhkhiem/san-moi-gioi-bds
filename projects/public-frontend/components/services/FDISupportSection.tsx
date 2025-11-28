'use client'

import { motion } from 'framer-motion'
import { Users, Briefcase, Globe2, HeartHandshake, Building2, UserCog } from 'lucide-react'
import { useLayoutMeasurements } from '@/components/LayoutMeasurementsContext'
import { useSectionReveal } from '@/hooks/useSectionReveal'

export default function FDISupportSection() {
  const { headerHeight } = useLayoutMeasurements()
  const paddingTop = headerHeight + 30
  const revealed = useSectionReveal(3) // Section index in dich-vu page

  const pillars = [
    { icon: Users, title: 'Tuyển dụng địa phương', desc: 'Kết nối nguồn nhân lực phù hợp ngành & văn hoá.' },
    { icon: Briefcase, title: 'Nhân sự & hành chính', desc: 'Thiết lập quy trình nội bộ, hồ sơ lao động, bảo hiểm.' },
    { icon: Globe2, title: 'Hội nhập văn hoá', desc: 'Đào tạo thích ứng môi trường làm việc & pháp luật VN.' },
    { icon: HeartHandshake, title: 'Đời sống doanh nghiệp', desc: 'Hoạt động gắn kết, CSR, phúc lợi cơ bản.' }
  ]

  const services = [
    'Xây dựng cơ cấu tổ chức ban đầu',
    'Thiết lập thang bảng lương & chính sách phúc lợi',
    'Tuyển dụng vị trí quản lý & kỹ thuật trọng yếu',
    'Soạn thảo nội quy lao động & thỏa ước',
    'Đào tạo an toàn lao động cơ bản',
    'Tổ chức định hướng nhân viên mới (onboarding)',
    'Thiết lập kênh truyền thông nội bộ',
    'Tư vấn chiến lược nhân sự 12 tháng đầu'
  ]

  const outcomes = [
    { value: '30%+', label: 'Rút ngắn thời gian tuyển' },
    { value: '100%', label: 'Hồ sơ lao động đạt chuẩn' },
    { value: '24/7', label: 'Hỗ trợ hành chính' },
    { value: '0', label: 'Sự cố pháp lý phát sinh' }
  ]

  return (
    <section className="relative h-screen w-full flex items-start justify-start overflow-hidden bg-gradient-to-br from-white to-gray-50">
      <div 
        className="w-full max-w-[1600px] mx-auto px-8 sm:px-12 md:px-16 lg:px-20 pb-6 md:pb-8 h-full flex flex-col"
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
              Hỗ trợ FDI
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Vận Hành <span className="text-goldDark">Ổn Định</span> Ngay Từ Ngày Đầu
          </h2>
          <p className="text-sm md:text-base text-gray-600 max-w-3xl mx-auto">
            Gói dịch vụ toàn diện giúp doanh nghiệp FDI giảm ma sát khi triển khai hoạt động sản xuất và xây dựng đội ngũ tại Việt Nam.
          </p>
        </motion.div>

        <div className="grid xl:grid-cols-4 md:grid-cols-2 gap-5 mb-3">
          {pillars.map((p, i) => {
            const Icon = p.icon
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={revealed ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.5, delay: revealed ? i * 0.05 : 0 }}
                className="p-5 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-xl bg-goldLight/25 flex items-center justify-center mb-3">
                  <Icon className="w-6 h-6 text-goldDark" />
                </div>
                <div className="font-bold text-gray-900 mb-1 text-sm md:text-base">{p.title}</div>
                <div className="text-xs md:text-sm text-gray-600 leading-relaxed">{p.desc}</div>
              </motion.div>
            )
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
          {/* Services list */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
          >
            <h3 className="text-lg font-bold text-gray-900 mb-4">Danh mục hỗ trợ</h3>
            <ul className="space-y-3">
              {services.map((s, i) => (
                <li key={i} className="flex gap-3">
                  <div className="w-5 h-5 rounded-md bg-goldLight/30 text-goldDark flex items-center justify-center text-xs font-bold">✓</div>
                  <span className="text-sm text-gray-700">{s}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Outcomes */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-4">Kết quả</h3>
              <div className="grid grid-cols-2 gap-4">
                {outcomes.map((o, i) => (
                  <div key={i} className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                    <div className="text-goldDark font-bold text-xl">{o.value}</div>
                    <div className="text-xs text-gray-600">{o.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

          {/* Summary narrative */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-goldLight/15 to-goldLight/5 rounded-2xl p-6 shadow-lg border border-goldLight/30"
          >
            <h3 className="text-lg font-bold text-gray-900 mb-3">Tại sao quan trọng</h3>
            <p className="text-sm text-gray-700 leading-relaxed mb-4">
              12 tháng đầu là giai đoạn quyết định hiệu suất dài hạn. Inland đồng hành giúp doanh nghiệp thiết lập nền tảng nhân sự, văn hoá & quy trình chuẩn thay vì tự xử lý manh mún gây phát sinh rủi ro.
            </p>
            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-white shadow-sm border border-gray-100">
                <div className="text-goldDark font-bold">Giảm 40% chi phí sai sót</div>
                <div className="text-xs text-gray-600">So với thiếu chuẩn hoá ban đầu</div>
              </div>
              <div className="p-3 rounded-xl bg-white shadow-sm border border-gray-100">
                <div className="text-goldDark font-bold">Thiết lập nhanh hệ thống HR</div>
                <div className="text-xs text-gray-600">Quy trình, biểu mẫu, hồ sơ</div>
              </div>
              <div className="p-3 rounded-xl bg-white shadow-sm border border-gray-100">
                <div className="text-goldDark font-bold">Nâng cao giữ chân nhân sự</div>
                <div className="text-xs text-gray-600">Onboarding bài bản & phúc lợi rõ ràng</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
