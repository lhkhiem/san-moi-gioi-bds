'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { useFullpage } from '@/components/FullpageContext'
import { Ruler, Hammer, ClipboardList, Layers, Building, BadgeCheck } from 'lucide-react'
import { useLayoutMeasurements } from '@/components/LayoutMeasurementsContext'
import { useSectionReveal } from '@/hooks/useSectionReveal'

export default function DesignConstructionSection() {
  const { headerHeight } = useLayoutMeasurements()
  const paddingTop = headerHeight + 30
  const sectionRef = useRef(null)
  const revealed = useSectionReveal(4) // Section index in dich-vu page
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start']
  })
  
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.9, 0.7])
  const { currentSection } = useFullpage()

  const phases = [
    { icon: ClipboardList, title: 'Khảo sát nhu cầu', desc: 'Phân tích công năng, sản lượng, quy chuẩn kỹ thuật.' },
    { icon: Ruler, title: 'Thiết kế concept', desc: 'Phác thảo sơ bộ layout, tối ưu dòng chảy sản xuất.' },
    { icon: Layers, title: 'Thiết kế kỹ thuật', desc: 'Bản vẽ chi tiết kiến trúc, kết cấu, MEP, phòng cháy.' },
    { icon: Hammer, title: 'Thi công & giám sát', desc: 'Quản lý tiến độ, chất lượng, an toàn lao động.' },
    { icon: Building, title: 'Nghiệm thu & bàn giao', desc: 'Kiểm tra thông số cuối cùng & hoàn thiện hồ sơ.' },
    { icon: BadgeCheck, title: 'Vận hành đầu kỳ', desc: 'Tối ưu vận hành ban đầu, điều chỉnh thực tế.' }
  ]

  const advantages = [
    'Tối ưu chi phí vòng đời nhà xưởng',
    'Đảm bảo tiêu chuẩn an toàn & tuân thủ',
    'Giảm thời gian điều chỉnh phát sinh',
    'Tăng hiệu suất vận hành ngay sau bàn giao'
  ]

  return (
    <section ref={sectionRef} className="relative h-screen w-full flex items-start justify-start overflow-hidden">
      {/* Parallax Background */}
      <motion.div 
        className="absolute inset-0"
        style={{ y: currentSection === 0 ? '0%' : y }}
      >
        <div className="absolute inset-0 bg-black/60 z-[5]" />
        <div
          className="absolute inset-0 w-full h-[120%]"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1565008576549-57569a49371d?auto=format&fit=crop&w=2000&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
      </motion.div>
      <div 
        className="relative z-10 w-full max-w-[1600px] mx-auto px-8 sm:px-12 md:px-16 lg:px-20 pb-8 h-full flex flex-col text-white"
        style={{ paddingTop: `${paddingTop}px` }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={revealed ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-5 md:mb-6"
        >
          <div className="inline-block px-4 py-2 bg-white/10 backdrop-blur rounded-full mb-3">
            <span className="text-goldLight text-sm font-semibold tracking-wide uppercase">
              Thiết kế & Thi công
            </span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold mb-2">
            Triển Khai <span className="text-goldLight">Chuẩn Hoá</span> & Tối ưu Dòng Chảy Sản Xuất
          </h2>
          <p className="text-sm md:text-base text-gray-100 max-w-3xl mx-auto mb-4">
            Quy trình tích hợp từ khảo sát đến vận hành đầu kỳ đảm bảo hiệu suất và khả năng mở rộng trong tương lai.
          </p>
        </motion.div>

        <div className="grid xl:grid-cols-6 md:grid-cols-3 sm:grid-cols-2 gap-2 md:gap-3 mb-4 md:mb-6">
          {phases.map((p, i) => {
            const Icon = p.icon
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={revealed ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.5, delay: revealed ? i * 0.05 : 0 }}
                className="p-4 rounded-xl bg-white/10 border border-white/15 backdrop-blur-sm hover:bg-white/15 transition"
              >
                <div className="w-10 h-10 rounded-lg bg-goldLight/30 flex items-center justify-center mb-2">
                  <Icon className="w-5 h-5 text-goldLight" />
                </div>
                <div className="font-semibold text-sm mb-1">{p.title}</div>
                <div className="text-[11px] leading-relaxed text-gray-200">{p.desc}</div>
              </motion.div>
            )
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-4 md:gap-6">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="bg-white/10 rounded-2xl p-6 shadow-lg border border-white/15 backdrop-blur-sm"
          >
            <h3 className="text-lg font-bold mb-4">Lợi thế tích hợp</h3>
            <ul className="space-y-3 text-sm text-gray-100">
              {advantages.map((a, i) => (
                <li key={i} className="flex gap-3">
                  <div className="w-5 h-5 rounded-md bg-goldLight/30 text-goldLight flex items-center justify-center text-xs font-bold">✓</div>
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white/10 rounded-2xl p-6 shadow-lg border border-white/15 backdrop-blur-sm"
          >
            <h3 className="text-lg font-bold mb-4">Kiểm soát chất lượng</h3>
            <p className="text-sm text-gray-100 leading-relaxed">
              Áp dụng checklist chuẩn quốc tế cho từng hạng mục thi công: vật liệu, an toàn, nghiệm thu. Hạn chế lỗi lặp lại và chi phí sửa đổi.
            </p>
            <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-black/30 border border-white/10"><div className="text-goldLight font-bold">98%</div><div>Đúng tiến độ</div></div>
              <div className="p-3 rounded-xl bg-black/30 border border-white/10"><div className="text-goldLight font-bold">&lt;4%</div><div>Phát sinh điều chỉnh</div></div>
              <div className="p-3 rounded-xl bg-black/30 border border-white/10"><div className="text-goldLight font-bold">0</div><div>Sự cố an toàn nghiêm trọng</div></div>
              <div className="p-3 rounded-xl bg-black/30 border border-white/10"><div className="text-goldLight font-bold">100%</div><div>Nghiệm thu đạt chuẩn</div></div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="bg-white/10 rounded-2xl p-6 shadow-lg border border-white/15 backdrop-blur-sm"
          >
            <h3 className="text-lg font-bold mb-3">Kết nối INTERLINK</h3>
            <p className="text-sm text-gray-100 leading-relaxed mb-3">
              Tích hợp dữ liệu thiết kế với hệ thống quản lý sản xuất & vận hành giúp giảm thời gian chuyển giao sau bàn giao xây dựng.
            </p>
            <div className="space-y-2 text-xs">
              <div className="p-2 rounded-lg bg-black/30 border border-white/10">Đồng bộ thông số thiết bị</div>
              <div className="p-2 rounded-lg bg-black/30 border border-white/10">Chuẩn hoá layout digital twin</div>
              <div className="p-2 rounded-lg bg-black/30 border border-white/10">API kết nối hệ thống ERP/MES</div>
              <div className="p-2 rounded-lg bg-black/30 border border-white/10">Theo dõi bảo trì từ ngày đầu</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
