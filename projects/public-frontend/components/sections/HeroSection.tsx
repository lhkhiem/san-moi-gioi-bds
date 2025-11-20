'use client'

import { motion, AnimatePresence, useInView } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState, useRef } from 'react'

// Counter animation hook
function useCounter(end: number, duration: number = 2000, start: number = 0) {
  const [count, setCount] = useState(start)
  const [isAnimating, setIsAnimating] = useState(false)

  const animate = () => {
    setIsAnimating(true)
    const startTime = Date.now()
    const endTime = startTime + duration

    const timer = setInterval(() => {
      const now = Date.now()
      const progress = Math.min((now - startTime) / duration, 1)
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const currentCount = Math.floor(start + (end - start) * easeOutQuart)
      
      setCount(currentCount)

      if (now >= endTime) {
        setCount(end)
        clearInterval(timer)
        setIsAnimating(false)
      }
    }, 16) // ~60fps

    return () => clearInterval(timer)
  }

  return { count, animate, isAnimating }
}

// Animated counter component
function AnimatedCounter({ value, suffix = '', duration = 2000 }: { value: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const { count, animate } = useCounter(value, duration)

  useEffect(() => {
    if (isInView) {
      animate()
    }
  }, [isInView])

  return (
    <div ref={ref} className="text-4xl md:text-5xl font-bold text-goldLight mb-2">
      {count.toLocaleString()}{suffix}
    </div>
  )
}

export default function HeroSection() {
  const slides = [
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2000',
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2000',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000',
    'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2000',
  ]
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length)
    }, 8000) // change slide every 8s (transition itself is 3s)
    return () => clearInterval(id)
  }, [slides.length])

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Slider */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50 z-[5]" />
        <AnimatePresence>
          {slides.map((url, i) => (
            i === index && (
              <motion.div
                key={url}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 3, ease: 'easeInOut' }}
                className="absolute inset-0 w-full h-full"
                style={{ backgroundImage: `url(${url})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
              />
            )
          ))}
        </AnimatePresence>
      </div>

      {/* Content */}
      <div className="relative z-20 w-full max-w-6xl mx-auto px-6 md:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
            Nơi Khởi Đầu
            <br />
            <span className="text-goldLight">Hành Trình An Cư</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Sàn giao dịch bất động sản uy tín, đồng hành cùng bạn trong mọi quyết định đầu tư
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/mua-ban"
              className="btn-primary group bg-goldLight text-gray-900 hover:opacity-90"
            >
              Khám phá dự án
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/lien-he"
              className="px-6 py-3 border-2 border-white text-white rounded-md hover:bg-white hover:text-gray-900 transition-colors duration-200"
            >
              Liên hệ tư vấn
            </Link>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
        >
          <div className="text-center">
            <AnimatedCounter value={15} suffix="+" duration={2000} />
            <div className="text-sm md:text-base text-gray-300">
              Năm Kinh Nghiệm
            </div>
          </div>
          
          <div className="text-center">
            <AnimatedCounter value={200} suffix="+" duration={2200} />
            <div className="text-sm md:text-base text-gray-300">
              Dự Án
            </div>
          </div>
          
          <div className="text-center">
            <AnimatedCounter value={5000} suffix="+" duration={2500} />
            <div className="text-sm md:text-base text-gray-300">
              Khách Hàng
            </div>
          </div>
          
          <div className="text-center">
            <AnimatedCounter value={50} suffix="+" duration={2000} />
            <div className="text-sm md:text-base text-gray-300">
              Đối Tác
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
