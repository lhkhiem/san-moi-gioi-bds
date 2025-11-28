"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { SlidersHorizontal, Grid3x3, MapIcon } from 'lucide-react'
import IndustrialParkFilterBar from '@/components/products/IndustrialParkFilterBar'
import IndustrialParkCard from '@/components/products/IndustrialParkCard'
import { sampleIndustrialParks, filterIndustrialParks } from '@/lib/realEstateData'
import { IndustrialParkFilter } from '@/lib/types'

export default function IndustrialParksPage() {
  const [filters, setFilters] = useState<IndustrialParkFilter>({})
  const [sortBy, setSortBy] = useState<string>('newest')

  const filteredParks = filterIndustrialParks(sampleIndustrialParks, filters)

  const sortedParks = [...filteredParks].sort((a, b) => {
    switch (sortBy) {
      case 'price-asc':
        return (a.rental_price_min || 0) - (b.rental_price_min || 0)
      case 'price-desc':
        return (b.rental_price_max || 0) - (a.rental_price_max || 0)
      case 'area-desc':
        return b.total_area - a.total_area
      case 'newest':
      default:
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    }
  })

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Hero Section with background image + dark overlay (taller by ~15-20%) */}
      <div className="relative text-white">
        <div
          className="absolute inset-0 bg-center bg-cover"
          style={{ backgroundImage: "url(/images/contact-intro-bg.jpg)" }}
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative py-20 md:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Khu công nghiệp</h1>
              <p className="text-lg md:text-xl text-white/90">
                Tìm kiếm khu công nghiệp phù hợp cho doanh nghiệp của bạn
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Filter Section */}
        <motion.div
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mb-8"
        >
          <IndustrialParkFilterBar onChange={setFilters} />
        </motion.div>

        {/* Toolbar */}
        <motion.div
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="bg-white rounded-xl shadow-md border border-gray-100 p-4 mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Results Count */}
            <div className="text-sm text-gray-600">
              Tìm thấy <span className="font-semibold text-gray-900">{sortedParks.length}</span> khu công nghiệp
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-4">
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-goldDark"
              >
                <option value="newest">Mới nhất</option>
                <option value="price-asc">Giá thuê thấp → cao</option>
                <option value="price-desc">Giá thuê cao → thấp</option>
                <option value="area-desc">Diện tích lớn → nhỏ</option>
              </select>

              {/* Future: Map View */}
              {/* <button
                className="p-2 rounded-md border border-gray-200 text-gray-400"
                title="Xem trên bản đồ (Sắp ra mắt)"
                disabled
              >
                <MapIcon className="w-5 h-5" />
              </button> */}
            </div>
          </div>
        </motion.div>

        {/* Industrial Parks Grid */}
        {sortedParks.length === 0 ? (
          <motion.div
            animate={{ opacity: 1 }}
            className="bg-white rounded-2xl shadow-lg p-12 text-center"
          >
            <div className="text-gray-400 mb-4">
              <SlidersHorizontal className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Không tìm thấy kết quả</h3>
            <p className="text-gray-600">Vui lòng thử điều chỉnh bộ lọc để xem nhiều khu công nghiệp hơn.</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedParks.map(park => (
              <IndustrialParkCard key={park.id} park={park} />
            ))}
          </div>
        )}

        {/* Load More Button (for future pagination) */}
        {sortedParks.length > 0 && sortedParks.length >= 12 && (
          <div className="mt-12 text-center">
            <button className="px-8 py-3 bg-goldDark text-white font-semibold rounded-lg hover:bg-goldDark/90 transition-colors">
              Xem thêm khu công nghiệp
            </button>
          </div>
        )}

        {/* CTA Section with background image + dark overlay */}
        <motion.div
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 relative overflow-hidden rounded-2xl text-white text-center"
        >
          <div
            className="absolute inset-0 bg-center bg-cover"
            style={{ backgroundImage: "url(/images/contact-form-bg.jpg)" }}
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative p-8 md:p-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Cần tư vấn về khu công nghiệp?</h2>
            <p className="text-lg text-white/90 mb-6">
              Đội ngũ chuyên gia của chúng tôi sẵn sàng hỗ trợ bạn tìm kiếm khu công nghiệp phù hợp nhất
            </p>
            <a
              href="/lien-he"
              className="inline-block px-8 py-3 bg-white text-goldDark font-semibold rounded-lg hover:bg-gray-50 transition-colors"
            >
              Liên hệ tư vấn
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
