'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import ParallaxSection from '@/components/ParallaxSection'
import Link from 'next/link'
import { MapPin, TrendingUp, ArrowRight } from 'lucide-react'
import { api } from '@/lib/api'
import type { Project } from '@/lib/types'
import { formatPrice, getAreaRange } from '@/lib/utils'

export default function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([])
  const [activeFilter, setActiveFilter] = useState<string>('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await api.getFeaturedProjects(6)
        if (response.success && response.data) {
          setProjects(response.data)
        }
      } catch (error) {
        console.error('Failed to fetch projects:', error)
        // Mock data for demo
        setProjects([
          {
            id: '1',
            title: 'Vinhomes Grand Park',
            slug: 'vinhomes-grand-park',
            description: 'Đô thị thông minh đẳng cấp quốc tế',
            location: 'Quận 9, TP. HCM',
            price_min: 2000000000,
            price_max: 5000000000,
            area_min: 50,
            area_max: 120,
            status: 'dang-mo-ban',
            thumbnail_url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=800',
            gallery: [],
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
          {
            id: '2',
            title: 'Masteri Lumiere Riverside',
            slug: 'masteri-lumiere-riverside',
            description: 'Căn hộ cao cấp bên bờ sông Sài Gòn',
            location: 'Quận 2, TP. HCM',
            price_min: 3000000000,
            price_max: 6000000000,
            area_min: 60,
            area_max: 150,
            status: 'dang-mo-ban',
            thumbnail_url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800',
            gallery: [],
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
          {
            id: '3',
            title: 'The Sycamore',
            slug: 'the-sycamore',
            description: 'Biệt thự sinh thái trong lòng thành phố',
            location: 'Quận 7, TP. HCM',
            price_min: 10000000000,
            price_max: 20000000000,
            area_min: 200,
            area_max: 500,
            status: 'sap-mo-ban',
            thumbnail_url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800',
            gallery: [],
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  const filters = [
    { id: 'all', label: 'Tất cả' },
    { id: 'dang-mo-ban', label: 'Đang mở bán' },
    { id: 'sap-mo-ban', label: 'Sắp mở bán' },
  ]

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(p => p.status === activeFilter)

  return (
    <ParallaxSection
      backgroundImage="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=2400&auto=format&fit=crop"
      overlay="dark"
      fullWidth
      className="h-screen flex items-center justify-center"
    >
      <div className="relative w-full px-4 sm:px-6 md:px-8 md:pr-20 lg:pr-28 py-4 md:py-6 max-h-[90vh] flex flex-col justify-center">
        <div className="text-center mb-3 md:mb-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-2"
          >
            Dự Án <span className="text-goldLight">Nổi Bật</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xs md:text-sm lg:text-base text-white/90 mx-auto"
          >
            Khám phá các dự án bất động sản cao cấp, đáp ứng mọi nhu cầu đầu tư và an cư
          </motion.p>
        </div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex justify-center gap-2 md:gap-3 mb-3 md:mb-4"
        >
          {filters.map((filter, index) => (
            <motion.button
              key={filter.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-3 md:px-5 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-300 ${
                activeFilter === filter.id
                  ? 'bg-goldLight text-gray-900 shadow-lg'
                  : 'bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm'
              }`}
            >
              {filter.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-h-[50vh] overflow-y-auto scrollbar-hide">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link 
                  href={`/mua-ban/${project.slug}`}
                  className="group block bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className="relative h-64 overflow-hidden">
                    <div 
                      className="w-full h-full bg-cover bg-center transform group-hover:scale-110 transition-transform duration-500"
                      style={{ backgroundImage: `url(${project.thumbnail_url})` }}
                    />
                    <div className="absolute top-4 right-4">
                      <span className={`px-4 py-2 rounded-full text-xs font-medium ${
                        project.status === 'dang-mo-ban'
                          ? 'bg-green-500 text-white'
                          : 'bg-yellow-500 text-white'
                      }`}>
                        {project.status === 'dang-mo-ban' ? 'Đang mở bán' : 'Sắp mở bán'}
                      </span>
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-goldDark transition-colors">
                      {project.title}
                    </h3>
                    
                    <div className="flex items-center text-gray-600 text-sm mb-3">
                      <MapPin className="w-4 h-4 mr-2" />
                      {project.location}
                    </div>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {project.description}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Giá từ</div>
                        <div className="text-lg font-bold text-goldDark">
                          {formatPrice(project.price_min)}
                        </div>
                      </div>
                      <div className="flex items-center text-goldDark text-sm font-medium group-hover:translate-x-2 transition-transform">
                        Xem chi tiết
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        {/* View More */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-4 md:mt-6"
        >
          <Link
            href="/mua-ban"
            className="btn-primary group"
          >
            Xem tất cả dự án
            <TrendingUp className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </ParallaxSection>
  )
}
