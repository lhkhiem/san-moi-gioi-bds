'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion } from 'framer-motion'
import { useScrollLock } from '@/hooks/useScrollLock'
import { useSectionObserver } from '@/hooks/useSectionObserver'
import MouseScrollIcon from './MouseScrollIcon'

export interface SectionData {
  id: string
  index: number
  title: string
}

interface FullpageScrollProps {
  children: React.ReactNode[]
  sections: SectionData[]
  showIndicators?: boolean
  debug?: boolean
}

export default function FullpageScroll({ 
  children, 
  sections,
  showIndicators = true,
  debug = false
}: FullpageScrollProps) {
  const [currentSection, setCurrentSection] = useState(0)
  const [isInFooterZone, setIsInFooterZone] = useState(false)
  const touchStartY = useRef<number>(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const { lock, isLocked } = useScrollLock(800)
  
  // Use IntersectionObserver to track active section
  const observedIndex = useSectionObserver(sections.length)
  
  const totalSections = children.length
  const isAtLastSection = currentSection === totalSections - 1
  
  // Determine if current section has dark background
  // Section 0 (Hero), Section 2 (Projects), and Section 4 (Contact) have dark backgrounds
  const isDarkSection = currentSection === 0 || currentSection === 2 || currentSection === 4

  // Debug logging
  const log = useCallback((...args: any[]) => {
    if (debug) {
      console.log('[FullpageScroll]', ...args)
    }
  }, [debug])

  // Update current section from observer
  useEffect(() => {
    if (!isLocked()) {
      setCurrentSection(observedIndex)
      log('Active section updated by observer:', observedIndex)
    }
  }, [observedIndex, isLocked, log])

  const scrollToSection = useCallback((index: number) => {
    if (index < 0 || index >= totalSections || isLocked()) {
      log('Scroll blocked:', { index, isLocked: isLocked(), totalSections })
      return
    }

    log('Scrolling to section:', index)
    lock()
    setCurrentSection(index)

    // Use requestAnimationFrame for smoother scroll
    requestAnimationFrame(() => {
      const element = document.getElementById(`section-${index}`)
      if (element) {
        // Instant scroll to target, rely on CSS scroll-snap
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        log('ScrollIntoView called for section:', index)
      }
    })
  }, [totalSections, isLocked, lock, log])

  // Handle wheel events with debounce
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      const deltaY = e.deltaY
      
      // If at last section and scrolling down, scroll directly to bottom (show full footer)
      if (isAtLastSection && deltaY > 0 && !isInFooterZone) {
        e.preventDefault()
        log('At last section, scrolling down - jumping to footer')
        setIsInFooterZone(true)
        
        // Disable scroll snap
        if (containerRef.current) {
          containerRef.current.style.scrollSnapType = 'none'
        }
        
        // Scroll directly to the bottom of the page to show full footer
        requestAnimationFrame(() => {
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth'
          })
        })
        return
      }
      
      // If in footer zone and scrolling up, return to section control
      if (isInFooterZone && deltaY < 0) {
        e.preventDefault()
        log('In footer zone, scrolling up - returning to section control')
        setIsInFooterZone(false)
        if (containerRef.current) {
          containerRef.current.style.scrollSnapType = 'y mandatory'
        }
        scrollToSection(totalSections - 1)
        return
      }
      
      // Normal fullpage scroll behavior (sections 0-4)
      if (!isInFooterZone) {
        e.preventDefault()
        
        if (isLocked()) {
          log('Wheel event blocked - scroll locked')
          return
        }

        if (Math.abs(deltaY) < 5) return // Ignore tiny scrolls

        log('Wheel event:', { deltaY, currentSection })

        if (deltaY > 0) {
          scrollToSection(currentSection + 1)
        } else {
          scrollToSection(currentSection - 1)
        }
      }
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (isLocked() || isInFooterZone) return

      switch (e.key) {
        case 'ArrowDown':
        case 'PageDown':
          e.preventDefault()
          if (isAtLastSection) {
            // Scroll directly to footer bottom
            setIsInFooterZone(true)
            if (containerRef.current) {
              containerRef.current.style.scrollSnapType = 'none'
            }
            window.scrollTo({
              top: document.documentElement.scrollHeight,
              behavior: 'smooth'
            })
          } else {
            scrollToSection(currentSection + 1)
          }
          break
        case 'ArrowUp':
        case 'PageUp':
          e.preventDefault()
          scrollToSection(currentSection - 1)
          break
        case 'Home':
          e.preventDefault()
          scrollToSection(0)
          break
        case 'End':
          e.preventDefault()
          scrollToSection(totalSections - 1)
          break
      }
    }

    // Touch events for mobile
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY
    }

    const handleTouchEnd = (e: TouchEvent) => {
      if (isLocked()) return

      const touchEndY = e.changedTouches[0].clientY
      const deltaY = touchStartY.current - touchEndY

      // Minimum swipe distance: 50px
      if (Math.abs(deltaY) > 50) {
        log('Touch swipe:', { deltaY })
        
        // If at last section and swiping up (scrolling down), scroll to footer bottom
        if (isAtLastSection && deltaY > 0 && !isInFooterZone) {
          log('Touch: At last section, swiping up - jumping to footer')
          setIsInFooterZone(true)
          if (containerRef.current) {
            containerRef.current.style.scrollSnapType = 'none'
          }
          // Scroll directly to bottom
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth'
          })
          return
        }
        
        // If in footer zone and swiping down (scrolling up), return to sections
        if (isInFooterZone && deltaY < 0) {
          log('Touch: In footer, swiping down - returning to sections')
          setIsInFooterZone(false)
          if (containerRef.current) {
            containerRef.current.style.scrollSnapType = 'y mandatory'
          }
          scrollToSection(totalSections - 1)
          return
        }
        
        // Normal section navigation
        if (!isInFooterZone) {
          if (deltaY > 0) {
            scrollToSection(currentSection + 1)
          } else {
            scrollToSection(currentSection - 1)
          }
        }
      }
    }

    const container = containerRef.current
    if (!container) return

    // Use passive: false to allow preventDefault
    window.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('keydown', handleKeyDown)
    container.addEventListener('touchstart', handleTouchStart, { passive: true })
    container.addEventListener('touchend', handleTouchEnd, { passive: true })

    return () => {
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('keydown', handleKeyDown)
      container.removeEventListener('touchstart', handleTouchStart)
      container.removeEventListener('touchend', handleTouchEnd)
    }
  }, [currentSection, isLocked, scrollToSection, totalSections, log, isAtLastSection, isInFooterZone])

  return (
    <div ref={containerRef} className="relative" style={{ scrollSnapType: 'y mandatory' }}>
      {/* Timeline Navigation - hide in footer zone */}
      {showIndicators && !isInFooterZone && (
        <TimelineNav
          sections={sections}
          activeSection={currentSection}
          onSectionClick={scrollToSection}
          isDarkSection={isDarkSection}
        />
      )}

      {/* Sections - all rendered for scroll-snap */}
      <div className="relative">
        {children.map((child, index) => (
          <div
            key={index}
            id={`section-${index}`}
            className="fullpage-section"
            style={{ scrollSnapAlign: 'start' }}
            role="region"
            aria-label={sections[index]?.title || `Section ${index + 1}`}
          >
            {child}
          </div>
        ))}
      </div>

      {/* Mouse Scroll Icon - hide only when in footer zone */}
      <MouseScrollIcon 
        onClick={() => scrollToSection(currentSection + 1)}
        isVisible={!isInFooterZone}
        isDarkSection={isDarkSection}
      />

      {/* Scroll hint (first section only) */}
      {currentSection === 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            delay: 1.5, 
            duration: 1, 
            repeat: Infinity, 
            repeatType: 'reverse' 
          }}
          className="fixed bottom-20 left-1/2 -translate-x-1/2 z-30 hidden md:block"
        >
          <div className="flex flex-col items-center gap-2 text-white/80">
            <span className="text-sm font-medium">Scroll</span>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </motion.div>
      )}
    </div>
  )
}

// Timeline Navigation Component (improved style matching reference)
interface TimelineNavProps {
  sections: SectionData[]
  activeSection: number
  onSectionClick: (index: number) => void
  isDarkSection: boolean
}

function TimelineNav({ sections, activeSection, onSectionClick, isDarkSection }: TimelineNavProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  
  // Color classes based on section background - using gold colors
  const lineColor = isDarkSection ? 'bg-goldLight/30' : 'bg-goldDark/20'
  const labelActiveColor = isDarkSection ? 'text-goldLight' : 'text-goldDark'
  const labelInactiveColor = isDarkSection ? 'text-goldLight/50' : 'text-goldDark/50'
  const dotActiveColor = isDarkSection ? 'bg-goldLight' : 'bg-goldDark'
  const dotInactiveColor = isDarkSection ? 'bg-goldLight/30' : 'bg-goldDark/30'

  // Capitalize first letter only
  const capitalizeFirst = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
  }

  return (
    <nav 
      className="fixed right-6 md:right-10 top-1/2 -translate-y-1/2 z-50 hidden md:block pointer-events-auto"
      aria-label="Section navigation"
    >
      <div className="relative flex flex-col gap-6">
        {/* Vertical line connecting dots - positioned to go through center of dots */}
        <div className={`absolute right-[4px] top-0 bottom-0 w-px ${lineColor} pointer-events-none transition-colors duration-300`} />
        
        {sections.map((section, index) => {
          const isActive = index === activeSection
          const isHovered = index === hoveredIndex

          return (
            <button
              key={section.id}
              onClick={() => onSectionClick(index)}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="relative group flex items-center justify-end gap-3"
              aria-label={`Go to ${section.title}`}
              aria-current={isActive ? 'true' : 'false'}
            >
              {/* Label text - italic and capitalize first letter only */}
              <span 
                className={`
                  text-xs md:text-sm font-medium italic transition-all duration-300 text-right tracking-wide
                  ${isActive 
                    ? `${labelActiveColor} opacity-100 scale-105` 
                    : `${labelInactiveColor} opacity-60 hover:opacity-100`
                  }
                `}
              >
                {capitalizeFirst(section.title)}
              </span>

              {/* Connection dot */}
              <div 
                className={`
                  relative z-10 w-2.5 h-2.5 rounded-full transition-all duration-300
                  ${isActive ? `${dotActiveColor} scale-125` : `${dotInactiveColor} scale-90`}
                `}
              />
            </button>
          )
        })}
      </div>
    </nav>
  )
}
