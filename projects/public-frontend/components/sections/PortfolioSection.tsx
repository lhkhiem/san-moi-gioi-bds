'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Award, ChevronLeft, ChevronRight, MapPin, Building2 } from 'lucide-react'

// Mock data - Industrial parks collaborated with
const industrialParks = [
  {
    id: '1',
    name: 'KCN Long Hậu',
    location: 'Long An',
    area: '500 ha',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800',
    year: '2023'
  },
  {
    id: '2',
    name: 'KCN Vsip Bắc Ninh',
    location: 'Bắc Ninh',
    area: '350 ha',
    image: 'https://images.unsplash.com/photo-1565883003103-e5a46ed6d7fd?q=80&w=800',
    year: '2023'
  },
  {
    id: '3',
    name: 'KCN Hiệp Phước',
    location: 'TP. HCM',
    area: '420 ha',
    image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=800',
    year: '2022'
  },
  {
    id: '4',
    name: 'KCN Nhơn Trạch',
    location: 'Đồng Nai',
    area: '680 ha',
    image: 'https://images.unsplash.com/photo-1590859808308-3d2d9c515b1a?q=80&w=800',
    year: '2022'
  },
  {
    id: '5',
    name: 'KCN Đình Vũ',
    location: 'Hải Phòng',
    area: '550 ha',
    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=800',
    year: '2021'
  },
  {
    id: '6',
    name: 'KCN Thăng Long',
    location: 'Hà Nội',
    area: '280 ha',
    image: 'https://images.unsplash.com/photo-1513828649310-cb6e3e5f5f8d?q=80&w=800',
    year: '2021'
  }
]

const awards = [
  {
    title: 'Top 10 Sàn BĐS Công nghiệp Uy tín',
    year: '2023'
  },
  {
    title: 'Đối tác Chiến lược KCN',
    year: '2022'
  },
  {
    title: 'Dịch vụ Môi giới Xuất sắc',
    year: '2022'
  }
]

export default function PortfolioSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  // Auto-scroll every 3 seconds
  useEffect(() => {
    if (isPaused) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const nextIndex = prev + 2
        return nextIndex >= industrialParks.length ? 0 : nextIndex
      })
    }, 3000)

    return () => clearInterval(interval)
  }, [isPaused])

  const handlePrev = () => {
    setCurrentIndex((prev) => {
      const newIndex = prev - 2
      return newIndex < 0 ? Math.max(0, industrialParks.length - 2) : newIndex
    })
  }

  const handleNext = () => {
    setCurrentIndex((prev) => {
      const nextIndex = prev + 2
      return nextIndex >= industrialParks.length ? 0 : nextIndex
    })
  }

  const visibleParks = industrialParks.slice(currentIndex, currentIndex + 2)
  if (visibleParks.length < 2 && industrialParks.length > 1) {
    visibleParks.push(...industrialParks.slice(0, 2 - visibleParks.length))
  }

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Image with White Overlay */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1565883003103-e5a46ed6d7fd?q=80&w=2400)'
          }}
        />
        <div className="absolute inset-0 bg-white/90" />
      </div>

      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-8 sm:px-12 md:px-16 lg:px-20 py-4 md:py-6 h-full flex flex-col justify-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-4 md:mb-5"
        >
          <div className="inline-block px-3 py-1 bg-goldLight/10 rounded-full mb-2">
            <span className="text-goldDark text-xs font-semibold tracking-wide uppercase">
              Hồ sơ năng lực
            </span>
          </div>
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
            Các KCN <span className="text-goldDark">Đã Hợp Tác</span>
          </h2>
          <p className="text-xs md:text-sm text-gray-600 max-w-3xl mx-auto">
            Đối tác tin cậy của hơn 50+ khu công nghiệp lớn trên toàn quốc
          </p>
        </motion.div>

        {/* Industrial Parks Slider */}
        <div
          className="relative mb-3 md:mb-4"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="grid md:grid-cols-2 gap-4 md:gap-5">
            <AnimatePresence mode="wait">
              {visibleParks.map((park, idx) => (
                <motion.div
                  key={`${park.id}-${currentIndex}`}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="group relative bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  {/* Image */}
                  <div className="relative h-44 md:h-48 overflow-hidden">
                    <div
                      className="absolute inset-0 w-full h-full bg-cover bg-center transform group-hover:scale-110 transition-transform duration-500"
                      style={{ backgroundImage: `url(${park.image})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    
                    {/* Year Badge */}
                    <div className="absolute top-3 right-3 px-2.5 py-1 bg-goldDark text-white rounded-full text-xs font-semibold">
                      {park.year}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-goldDark transition-colors">
                      {park.name}
                    </h3>
                    
                    <div className="space-y-1.5 text-gray-600">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-goldDark flex-shrink-0" />
                        <span className="text-xs">{park.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Building2 className="w-3.5 h-3.5 text-goldDark flex-shrink-0" />
                        <span className="text-xs">Diện tích: {park.area}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-goldDark hover:bg-goldDark hover:text-white transition-colors duration-300 z-10"
            aria-label="Previous"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-goldDark hover:bg-goldDark hover:text-white transition-colors duration-300 z-10"
            aria-label="Next"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Progress Indicators */}
          <div className="flex justify-center gap-1.5 mt-3">
            {Array.from({ length: Math.ceil(industrialParks.length / 2) }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx * 2)}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  currentIndex === idx * 2 ? 'bg-goldDark w-6' : 'bg-gray-300'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Awards Section */}
        {awards.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="max-w-4xl mx-auto"
          >
            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4 text-center flex items-center justify-center gap-2">
              <Award className="w-5 h-5 text-goldDark" />
              Giải Thưởng & Chứng Nhận
            </h3>
            
            <div className="grid md:grid-cols-3 gap-3">
              {awards.map((award, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  className="bg-white rounded-lg p-4 shadow-md border-2 border-transparent hover:border-goldDark/30 transition-all duration-300 text-center"
                >
                  <div className="w-10 h-10 bg-goldLight/20 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Award className="w-5 h-5 text-goldDark" />
                  </div>
                  <h4 className="font-bold text-gray-900 mb-1 text-xs leading-tight">
                    {award.title}
                  </h4>
                  <p className="text-goldDark font-semibold text-xs">{award.year}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}
