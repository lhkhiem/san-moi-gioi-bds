'use client'

import { motion } from 'framer-motion'
import { Building2, Factory, MapPin, Users, Award, Star } from 'lucide-react'
import { useLayoutMeasurements } from '@/components/LayoutMeasurementsContext'
import { useSectionReveal } from '@/hooks/useSectionReveal'

export default function KeyClients() {
  const { headerHeight } = useLayoutMeasurements()
  const paddingTop = headerHeight + 30
  const revealed = useSectionReveal(6) // Section index in gioi-thieu page

  const clients = [
    {
      name: 'Logo các công ty',
      description: 'Logo công ty FDI tiêu biểu',
      projects: '15+'
    },
    {
      name: 'Logo các KCN lớn',
      description: 'KCN đối tác tiêu biểu',
      projects: '50+'
    },
    {
      name: 'Đối tác thiết kế',
      description: 'Đối tác thi công & Xây dựng',
      projects: '20+'
    }
  ]

  return (
    <section className="relative h-screen w-full flex items-start justify-start overflow-hidden bg-white">
      <div 
        className="w-full max-w-[1600px] mx-auto px-8 sm:px-12 md:px-16 lg:px-20 pb-4 md:pb-6 h-full flex flex-col"
        style={{ paddingTop: `${paddingTop}px` }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-5"
        >
          <div className="inline-block px-4 py-2 bg-goldLight/10 rounded-full mb-3">
            <span className="text-goldDark text-sm font-semibold tracking-wide uppercase">
              Khách hàng & Đối tác
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
            Khách hàng <span className="text-goldDark">Tiêu biểu</span>
          </h2>
          <p className="text-sm md:text-base text-gray-600 max-w-3xl mx-auto">
            Hợp tác cùng các công ty FDI hàng đầu và KCN lớn trên toàn quốc
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: revealed ? 0.2 : 0 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3"
        >
          <div className="bg-gradient-to-br from-goldLight/10 to-goldLight/5 rounded-xl p-4 border border-goldDark/10 text-center">
            <Building2 className="w-8 h-8 text-goldDark mx-auto mb-2" />
            <div className="text-3xl font-bold text-goldDark mb-1">50+</div>
            <div className="text-sm text-gray-600">KCN hợp tác</div>
          </div>
          <div className="bg-gradient-to-br from-goldLight/10 to-goldLight/5 rounded-xl p-4 border border-goldDark/10 text-center">
            <Users className="w-8 h-8 text-goldDark mx-auto mb-2" />
            <div className="text-3xl font-bold text-goldDark mb-1">100+</div>
            <div className="text-sm text-gray-600">Khách hàng FDI</div>
          </div>
          <div className="bg-gradient-to-br from-goldLight/10 to-goldLight/5 rounded-xl p-4 border border-goldDark/10 text-center">
            <Award className="w-8 h-8 text-goldDark mx-auto mb-2" />
            <div className="text-3xl font-bold text-goldDark mb-1">20+</div>
            <div className="text-sm text-gray-600">Đối tác chiến lược</div>
          </div>
          <div className="bg-gradient-to-br from-goldLight/10 to-goldLight/5 rounded-xl p-4 border border-goldDark/10 text-center">
            <Star className="w-8 h-8 text-goldDark mx-auto mb-2" />
            <div className="text-3xl font-bold text-goldDark mb-1">98%</div>
            <div className="text-sm text-gray-600">Hài lòng</div>
          </div>
        </motion.div>

        {/* Client Categories */}
        <div className="grid md:grid-cols-3 gap-4">
          {clients.map((client, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: revealed ? 0.3 + index * 0.1 : 0 }}
              className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100 hover:border-goldDark/30 hover:shadow-xl transition-all duration-300"
            >
              <div className="aspect-video bg-gray-100 rounded-xl mb-4 flex items-center justify-center">
                <div className="text-center">
                  <Building2 className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                  <p className="text-sm text-gray-400">{client.name}</p>
                </div>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">{client.description}</h3>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Dự án thành công</span>
                <span className="text-2xl font-bold text-goldDark">{client.projects}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={revealed ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: revealed ? 0.6 : 0 }}
          className="text-center mt-8"
        >
          <p className="text-gray-600 italic">
            * Logo các đối tác sẽ được cập nhật trong phiên bản chính thức
          </p>
        </motion.div>
      </div>
    </section>
  )
}
