'use client';

import { ReactNode, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface SectionProps {
  id: string;
  index: number;
  title: string;
  children: ReactNode;
  className?: string;
  isActive?: boolean;
  background?: string;
}

export default function Section({ 
  id, 
  index, 
  title, 
  children, 
  className = '',
  isActive = false,
  background = 'bg-white'
}: SectionProps) {
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isActive && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isActive, hasAnimated]);

  const shouldAnimate = isActive || hasAnimated;

  return (
    <section
      id={`section-${index}`}
      data-section-id={id}
      className={`
        fullpage-section relative w-full min-h-screen flex items-center justify-center
        ${background} ${className}
      `}
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={shouldAnimate ? { 
          opacity: 1, 
          y: 0 
        } : { 
          opacity: 0, 
          y: 50 
        }}
        transition={{ 
          duration: 0.8, 
          ease: [0.22, 1, 0.36, 1],
          delay: 0.1
        }}
        className="w-full h-full"
      >
        {children}
      </motion.div>

      {/* Section title for accessibility */}
      <span className="sr-only">{title}</span>
    </section>
  );
}

// Specialized Hero Section with parallax background
export function HeroSection({ 
  id, 
  index, 
  title, 
  children, 
  backgroundImage,
  isActive = false
}: SectionProps & { backgroundImage?: string }) {
  return (
    <section
      id={`section-${index}`}
      data-section-id={id}
      className="fullpage-section relative w-full min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image with Parallax */}
      {backgroundImage && (
        <motion.div
          initial={{ scale: 1.1 }}
          animate={isActive ? { scale: 1 } : { scale: 1.1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 z-0"
        >
          <div 
            className="w-full h-full bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60" />
        </motion.div>
      )}

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={isActive ? { 
          opacity: 1, 
          y: 0 
        } : { 
          opacity: 0, 
          y: 60 
        }}
        transition={{ 
          duration: 1, 
          ease: [0.22, 1, 0.36, 1],
          delay: 0.3
        }}
        className="relative z-10 w-full h-full"
      >
        {children}
      </motion.div>

      <span className="sr-only">{title}</span>
    </section>
  );
}
