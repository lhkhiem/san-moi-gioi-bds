'use client'

import { motion, useInView } from 'framer-motion'
import { useEffect, useState, useRef } from 'react'

// Counter animation hook
function useCounter(end: number, duration: number = 2000, start: number = 0) {
  const [count, setCount] = useState(start)

  const animate = () => {
    const startTime = Date.now()
    const endTime = startTime + duration

    const timer = setInterval(() => {
      const now = Date.now()
      const progress = Math.min((now - startTime) / duration, 1)
      
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const currentCount = Math.floor(start + (end - start) * easeOutQuart)
      
      setCount(currentCount)

      if (now >= endTime) {
        setCount(end)
        clearInterval(timer)
      }
    }, 16)

    return () => clearInterval(timer)
  }

  return { count, animate }
}

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

export default function AboutHero() {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/60 to-goldDark/30 z-[5]" />
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=2000&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="inline-block mb-6 px-6 py-2 bg-goldDark/20 backdrop-blur-sm border border-goldLight/30 rounded-full"
          >
            <span className="text-goldLight text-sm md:text-base font-medium tracking-wider uppercase">
              Về chúng tôi
            </span>
          </motion.div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Giới thiệu
            <br />
            <span className="text-goldLight">Inland Real Estate</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed">
            Với hơn 15 năm kinh nghiệm trong lĩnh vực bất động sản, chúng tôi tự hào là đối tác 
            đáng tin cậy của hàng nghìn khách hàng trên khắp cả nước. Sự hài lòng của bạn chính 
            là thành công của chúng tôi.
          </p>
        </motion.div>

        {/* Stats with counter animation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-5xl mx-auto"
        >
          <div className="text-center backdrop-blur-sm bg-white/5 rounded-2xl p-6 border border-goldLight/10">
            <AnimatedCounter value={15} suffix="+" duration={2000} />
            <div className="text-sm md:text-base text-gray-300 font-medium">
              Năm Kinh Nghiệm
            </div>
          </div>
          
          <div className="text-center backdrop-blur-sm bg-white/5 rounded-2xl p-6 border border-goldLight/10">
            <AnimatedCounter value={200} suffix="+" duration={2200} />
            <div className="text-sm md:text-base text-gray-300 font-medium">
              Dự Án
            </div>
          </div>
          
          <div className="text-center backdrop-blur-sm bg-white/5 rounded-2xl p-6 border border-goldLight/10">
            <AnimatedCounter value={5000} suffix="+" duration={2500} />
            <div className="text-sm md:text-base text-gray-300 font-medium">
              Khách Hàng
            </div>
          </div>
          
          <div className="text-center backdrop-blur-sm bg-white/5 rounded-2xl p-6 border border-goldLight/10">
            <AnimatedCounter value={50} suffix="+" duration={2000} />
            <div className="text-sm md:text-base text-gray-300 font-medium">
              Đối Tác
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
