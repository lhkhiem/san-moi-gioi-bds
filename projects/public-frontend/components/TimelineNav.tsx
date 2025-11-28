'use client'

import React, { useState, useRef, useEffect } from 'react'
import type { SectionData } from './FullpageScroll'
import type { BackgroundType } from './FullpageContext'
import { useLayoutMeasurements } from './LayoutMeasurementsContext'

interface TimelineNavProps {
  sections: SectionData[]
  activeSection: number
  onSectionClick: (index: number) => void
  backgroundType: BackgroundType
}

export default function TimelineNav({ sections, activeSection, onSectionClick, backgroundType }: TimelineNavProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const navRef = useRef<HTMLDivElement>(null)
  const { setTimelineWidth } = useLayoutMeasurements()

  // Centralized color palette per spec
  const isLight = backgroundType === 'light'
  const ACTIVE_COLOR = isLight ? '#358b4e' : '#ffffff'
  const INACTIVE_COLOR = isLight ? 'rgba(53,139,78,0.6)' : 'rgba(255,255,255,0.6)'
  const LINE_COLOR = ACTIVE_COLOR

  // Measure timeline width
  useEffect(() => {
    const measureTimeline = () => {
      if (navRef.current) {
        // Check if timeline is visible (hidden on mobile with md:block)
        const isVisible = window.getComputedStyle(navRef.current).display !== 'none'
        const width = isVisible ? navRef.current.offsetWidth : 0
        setTimelineWidth(width)
      }
    }

    measureTimeline()
    window.addEventListener('resize', measureTimeline)
    return () => window.removeEventListener('resize', measureTimeline)
  }, [setTimelineWidth])

  // Helpers
  const capitalizeFirst = (str: string) => {
    if (!str || typeof str !== 'string') return ''
    return str.charAt(0).toUpperCase() + str.slice(1)
  }

  return (
    <nav
      ref={navRef} 
      className="fixed right-6 md:right-10 top-1/2 -translate-y-1/2 z-[90] hidden md:block pointer-events-auto"
      aria-label="Section navigation"
    >
      <div className="relative flex flex-col gap-6">
        {/* Vertical line */}
        <div
          className="absolute right-[4px] top-0 bottom-0 w-px pointer-events-none transition-colors duration-300"
          style={{ backgroundColor: LINE_COLOR }}
        />

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
              {/* Label */}
              <span
                className="text-xs md:text-sm font-medium italic transition-all duration-300 text-right tracking-wide"
                style={{
                  color: isActive ? ACTIVE_COLOR : INACTIVE_COLOR,
                  opacity: isActive ? 1 : isHovered ? 0.9 : 0.6,
                  transform: isActive ? 'scale(1.05)' : 'scale(1)'
                }}
              >
                {capitalizeFirst(section.title)}
              </span>

              {/* Dot */}
              <div
                className="relative z-10 w-2.5 h-2.5 rounded-full transition-all duration-300"
                style={{
                  backgroundColor: isActive ? ACTIVE_COLOR : INACTIVE_COLOR,
                  transform: isActive ? 'scale(1.25)' : 'scale(0.9)',
                  boxShadow: isActive
                    ? `0 0 0 4px ${isLight ? 'rgba(53,139,78,0.25)' : 'rgba(255,255,255,0.25)'}`
                    : isHovered
                      ? `0 0 0 4px ${isLight ? 'rgba(53,139,78,0.15)' : 'rgba(255,255,255,0.15)'}`
                      : 'none'
                }}
              />
            </button>
          )
        })}
      </div>
    </nav>
  )
}
