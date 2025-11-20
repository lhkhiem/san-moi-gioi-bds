"use client"

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Briefcase, Users, ArrowDown } from 'lucide-react'
import JobTable from '@/components/careers/JobTable'
import { jobPostings } from '@/lib/careersData'
import Footer from '@/components/layout/Footer'

export default function TuyenDungPage() {
  const [showContent, setShowContent] = useState(false)
  const [activeTab, setActiveTab] = useState<'chinh-sach' | 'co-hoi'>('co-hoi')
  const heroRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const touchStartY = useRef<number>(0)
  const isScrollingRef = useRef(false)

  // Handle wheel event for hero -> content transition
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isScrollingRef.current) return

      const heroElement = heroRef.current
      const contentElement = contentRef.current
      
      if (!heroElement || !contentElement) return

      // Check if we're in hero section
      const heroRect = heroElement.getBoundingClientRect()
      const isInHero = heroRect.top === 0 && !showContent

      // Check if we're at top of content section
      const isAtTopOfContent = showContent && contentElement.scrollTop === 0

      // Scroll down from hero to content
      if (isInHero && e.deltaY > 0) {
        e.preventDefault()
        isScrollingRef.current = true
        setShowContent(true)
        setTimeout(() => {
          isScrollingRef.current = false
        }, 1000)
      }
      // Scroll up from content to hero
      else if (isAtTopOfContent && e.deltaY < 0) {
        e.preventDefault()
        isScrollingRef.current = true
        setShowContent(false)
        setTimeout(() => {
          isScrollingRef.current = false
        }, 1000)
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    
    return () => {
      window.removeEventListener('wheel', handleWheel)
    }
  }, [showContent])

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isScrollingRef.current) return

      const contentElement = contentRef.current
      if (!contentElement) return

      const isAtTopOfContent = showContent && contentElement.scrollTop === 0

      if (e.key === 'ArrowDown' && !showContent) {
        e.preventDefault()
        isScrollingRef.current = true
        setShowContent(true)
        setTimeout(() => {
          isScrollingRef.current = false
        }, 1000)
      } else if (e.key === 'ArrowUp' && isAtTopOfContent) {
        e.preventDefault()
        isScrollingRef.current = true
        setShowContent(false)
        setTimeout(() => {
          isScrollingRef.current = false
        }, 1000)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [showContent])

  // Handle touch events
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY
    }

    const handleTouchEnd = (e: TouchEvent) => {
      if (isScrollingRef.current) return

      const contentElement = contentRef.current
      if (!contentElement) return

      const touchEndY = e.changedTouches[0].clientY
      const deltaY = touchStartY.current - touchEndY
      const isAtTopOfContent = showContent && contentElement.scrollTop === 0

      // Minimum swipe distance: 50px
      if (Math.abs(deltaY) > 50) {
        if (!showContent && deltaY > 0) {
          isScrollingRef.current = true
          setShowContent(true)
          setTimeout(() => {
            isScrollingRef.current = false
          }, 1000)
        } else if (isAtTopOfContent && deltaY < 0) {
          isScrollingRef.current = true
          setShowContent(false)
          setTimeout(() => {
            isScrollingRef.current = false
          }, 1000)
        }
      }
    }

    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchend', handleTouchEnd, { passive: true })

    return () => {
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchend', handleTouchEnd)
    }
  }, [showContent])

  return (
    <div className="relative min-h-screen">
      {/* Hero Section - Fixed height */}
      <div
        ref={heroRef}
        className={`h-screen relative flex items-center justify-center transition-transform duration-1000 ease-in-out ${
          showContent ? '-translate-y-full' : 'translate-y-0'
        }`}
        style={{ position: showContent ? 'absolute' : 'relative', width: '100%', top: 0, zIndex: showContent ? 0 : 10 }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=2000)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-goldDark/30" />
        
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center text-white px-4"
        >
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
            TUYỂN DỤNG
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-12 max-w-3xl mx-auto">
            Tham gia INLAND - Nơi tài năng được tỏa sáng và sự nghiệp phát triển không giới hạn
          </p>
          
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex flex-col items-center gap-2 cursor-pointer"
            onClick={() => setShowContent(true)}
          >
            <span className="text-sm text-gray-300">Cuộn xuống để khám phá</span>
            <ArrowDown className="w-6 h-6" />
          </motion.div>
        </motion.div>
      </div>

      {/* Content Section - Normal scroll */}
      <div
        ref={contentRef}
        className={`flex flex-col bg-white ${
          showContent ? 'relative z-20' : 'opacity-0 pointer-events-none'
        }`}
        style={{ 
          overflow: 'auto',
          maxHeight: showContent ? '100vh' : 0,
          scrollBehavior: 'smooth',
          minHeight: showContent ? '100vh' : 0
        }}
      >
        {/* Tabs - STICKY at top, always visible - Must be below header */}
        <div className="sticky top-[80px] z-40 bg-white shadow-md border-b border-gray-200">
          <div className="flex items-center justify-center gap-3 py-4 bg-white">
            <button
              onClick={() => {
                setActiveTab('chinh-sach')
              }}
              className={`px-6 py-2.5 font-semibold text-sm uppercase transition-all rounded ${
                activeTab === 'chinh-sach'
                  ? 'bg-goldDark text-black'
                  : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
              }`}
            >
              Chính sách nhân sự
            </button>

            <button
              onClick={() => {
                setActiveTab('co-hoi')
              }}
              className={`px-6 py-2.5 font-semibold text-sm uppercase transition-all rounded ${
                activeTab === 'co-hoi'
                  ? 'bg-goldDark text-black'
                  : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
              }`}
            >
              Cơ hội nghề nghiệp
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="mt-8 flex-1">
          <AnimatePresence mode="wait">
            {activeTab === 'co-hoi' ? (
              <motion.div
                key="co-hoi"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <CoHoiTab />
              </motion.div>
            ) : (
              <motion.div
                key="chinh-sach"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChinhSachTab />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer - Always at bottom */}
        <div className="mt-auto">
          <Footer />
        </div>
      </div>
    </div>
  )
}

// Tab Cơ hội nghề nghiệp
function CoHoiTab() {
  return (
    <div className="bg-gray-50 py-12 min-h-[calc(100vh-180px)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title - với padding top để tránh bị tabs sticky che */}
        <div className="text-center mb-10 pt-8">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 uppercase">
            Cơ hội nghề nghiệp
          </h2>
          <div className="w-24 h-1 bg-goldDark mx-auto" />
        </div>

        {/* Job Table */}
        <div className="bg-white shadow-xl overflow-hidden">
          <JobTable jobs={jobPostings} />
        </div>
      </div>
    </div>
  )
}

// Tab Chính sách nhân sự - Layout Hình-Text / Text-Hình theo ảnh
function ChinhSachTab() {
  return (
    <div className="bg-white">
      {/* Hero Section - Vì sao chọn - với padding top */}
      <div 
        className="relative py-20 bg-cover bg-center pt-24"
        style={{ 
          backgroundImage: 'url(https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2000)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-gray-700/90 to-gray-600/80" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left: Text */}
            <div className="text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 uppercase">
                Vì sao chọn<br />Tập đoàn INLAND
              </h2>
              <div className="w-20 h-1 bg-goldLight mb-6" />
              <p className="text-base leading-relaxed mb-4">
                Với hơn 15 năm hình thành và phát triển trong lĩnh vực bất động sản, Tập đoàn Khải Hoàn
                Land khẳng định vị thế là Nhà Phát triển và Môi giới bất động sản hàng đầu tại thị trường
                phía Nam nói riêng và cả nước nói chung.
              </p>
              <p className="text-base leading-relaxed">
                Tập đoàn Khải Hoàn Land tự hào với mạng lưới chi nhánh rộng khắp cùng đội ngũ nhân lực
                hùng hậu, số lượng sản phẩm đồ sộ được chọn lọc từ các chủ đầu tư danh tiếng, dịch vụ
                khách hàng luôn được nâng cao chất lượng, chế độ đãi ngộ tốt nhất trong ngành... Đây là
                những điều kiện thuận lợi giúp đội ngũ nhân viên luôn an tâm công tác và cống hiến.
              </p>
            </div>
            
            {/* Right: Image */}
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800" 
                alt="Professional woman"
                className="rounded-lg shadow-2xl w-full h-[400px] object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Section 1: PHÚC LỢI - Text bên trái */}
      <div className="bg-gray-100 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Left: Text */}
            <div>
              <h3 className="text-3xl font-bold text-[#0066A1] mb-4 uppercase">
                Phúc lợi
              </h3>
              <div className="w-20 h-1 bg-goldDark mb-6" />
              
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Tập đoàn INLAND tự hào với mạng lưới chi nhánh rộng khắp cùng đội ngũ nhân lực hùng
                  hậu, số lượng sản phẩm đồ sộ được chọn lọc từ các chủ đầu tư danh tiếng, dịch vụ
                  khách hàng luôn được nâng cao chất lượng, chế độ đãi ngộ tốt nhất trong ngành...
                </p>
                <p>
                  Đây là những điều kiện thuận lợi giúp đội ngũ nhân viên luôn an tâm công tác và cống hiến.
                </p>
                
                <ul className="space-y-2 mt-6">
                  <li className="flex items-start gap-3">
                    <span className="text-goldDark mt-1">•</span>
                    <span>Lương cơ bản cạnh tranh + Hoa hồng hấp dẫn</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-goldDark mt-1">•</span>
                    <span>Bảo hiểm xã hội, y tế đầy đủ theo luật</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-goldDark mt-1">•</span>
                    <span>Thưởng hiệu suất, thưởng lễ tết</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-goldDark mt-1">•</span>
                    <span>Du lịch, teambuilding định kỳ</span>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Right: Image placeholder */}
            <div className="bg-gray-300 rounded-lg h-[400px] flex items-center justify-center">
              <span className="text-gray-500 text-sm">[Hình minh họa Phúc lợi]</span>
            </div>
          </div>
        </div>
      </div>

      {/* Section 2: ĐÀO TẠO - Hình bên trái, Text bên phải */}
      <div className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Left: Image placeholder */}
            <div className="bg-gray-300 rounded-lg h-[400px] flex items-center justify-center">
              <span className="text-gray-500 text-sm">[Hình minh họa Đào tạo]</span>
            </div>
            
            {/* Right: Text */}
            <div>
              <h3 className="text-3xl font-bold text-[#0066A1] mb-4 uppercase">
                Đào tạo & Phát triển
              </h3>
              <div className="w-20 h-1 bg-goldDark mb-6" />
              
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  INLAND cam kết đầu tư mạnh mẽ vào đào tạo và phát triển nguồn nhân lực. Chúng tôi tin
                  rằng sự thành công của công ty gắn liền với sự phát triển của mỗi cá nhân.
                </p>
                
                <ul className="space-y-2 mt-6">
                  <li className="flex items-start gap-3">
                    <span className="text-goldDark mt-1">•</span>
                    <span>Chương trình đào tạo chuyên sâu về BĐS</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-goldDark mt-1">•</span>
                    <span>Kỹ năng mềm và tư vấn bán hàng</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-goldDark mt-1">•</span>
                    <span>Lộ trình thăng tiến rõ ràng</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-goldDark mt-1">•</span>
                    <span>Mentorship từ các chuyên gia hàng đầu</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-goldDark mt-1">•</span>
                    <span>Hội thảo, workshop định kỳ</span>
                  </li>
                </ul>

                <p className="mt-4">
                  Mỗi nhân viên tại INLAND đều có cơ hội phát triển bản thân và tiến xa hơn trong sự nghiệp.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 3: MÔI TRƯỜNG - Text bên trái, gradient background */}
      <div 
        className="relative py-16 bg-cover bg-center"
        style={{ 
          backgroundImage: 'url(https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2000)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-gray-700/90 to-gray-600/80" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left: Text */}
            <div className="text-white">
              <h3 className="text-3xl font-bold mb-4 uppercase">
                Môi trường làm việc
              </h3>
              <div className="w-20 h-1 bg-goldLight mb-6" />
              
              <div className="space-y-4 leading-relaxed">
                <p>
                  Môi trường làm việc chuyên nghiệp, năng động và thân thiện là nền tảng giúp mỗi nhân
                  viên INLAND phát huy tối đa năng lực và sáng tạo.
                </p>
                
                <ul className="space-y-2 mt-6">
                  <li className="flex items-start gap-3">
                    <span className="text-goldLight mt-1">•</span>
                    <span>Văn hóa doanh nghiệp tích cực</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-goldLight mt-1">•</span>
                    <span>Đội ngũ đồng nghiệp hỗ trợ lẫn nhau</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-goldLight mt-1">•</span>
                    <span>Trang thiết bị hiện đại</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-goldLight mt-1">•</span>
                    <span>Không gian làm việc thoải mái</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-goldLight mt-1">•</span>
                    <span>Cơ hội networking rộng rãi</span>
                  </li>
                </ul>

                <p className="mt-4">
                  INLAND là nơi bạn không chỉ làm việc mà còn là nơi bạn phát triển, gắn bó và cống hiến lâu dài.
                </p>
              </div>
            </div>
            
            {/* Right: Empty space or image */}
            <div className="hidden md:block"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
