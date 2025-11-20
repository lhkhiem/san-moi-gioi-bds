'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUp } from 'lucide-react'

export default function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling 200px
      if (window.scrollY > 200) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    // Check if we're on a fullpage scroll page by looking for section elements
    const sections = document.querySelectorAll('[id^="section-"]')
    
    if (sections.length > 0) {
      // Fullpage scroll page - snap to first section
      const firstSection = document.getElementById('section-0')
      if (firstSection) {
        firstSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    } else {
      // Normal scroll page - scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.3 }}
          onClick={scrollToTop}
          className="
            fixed bottom-8 right-8
            w-7 h-10
            flex items-center justify-center
            border-2 border-goldDark/60 hover:border-goldDark
            bg-transparent
            rounded-full
            transition-all duration-300
            group
          "
          style={{ zIndex: 35 }}
          aria-label="Quay về đầu trang"
        >
          <ArrowUp className="w-4 h-4 text-goldDark/60 group-hover:text-goldDark transition-colors duration-300" strokeWidth={2.5} />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
