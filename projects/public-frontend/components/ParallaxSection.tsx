'use client'

import React from 'react'

interface ParallaxSectionProps {
  backgroundImage: string
  children: React.ReactNode
  className?: string
  contentClassName?: string
}

// Duda-style pure CSS parallax: single block, background fixed only on desktop.
// No transforms, JS scroll listeners, or <img> tags.
export function ParallaxSection({
  backgroundImage,
  children,
  className = '',
  contentClassName = '',
}: ParallaxSectionProps) {
  return (
    <section
      className={`parallax-section relative overflow-hidden bg-center bg-no-repeat bg-cover bg-scroll lg:bg-fixed min-h-[40vh] sm:min-h-[50vh] lg:min-h-[60vh] ${className}`}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className={`parallax-inner relative z-10 flex flex-col justify-center items-start w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${contentClassName}`}>
        {children}
      </div>
    </section>
  )
}

export default ParallaxSection