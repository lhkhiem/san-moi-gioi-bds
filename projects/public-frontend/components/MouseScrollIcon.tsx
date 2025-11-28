'use client'

import { motion } from 'framer-motion'
import type { BackgroundType } from '@/components/FullpageContext'

interface MouseScrollIconProps {
  onClick: () => void
  isVisible: boolean
  backgroundType: BackgroundType
}

export default function MouseScrollIcon({ onClick, isVisible, backgroundType }: MouseScrollIconProps) {
  if (!isVisible) return null

  // Centralized color rules
  const isLight = backgroundType === 'light'
  const ACTIVE_COLOR = isLight ? '#358b4e' : '#ffffff'
  const borderStyle = { borderColor: isLight ? 'rgba(53,139,78,0.7)' : 'rgba(255,255,255,0.7)' }
  const dotStyle = { backgroundColor: isLight ? 'rgba(53,139,78,0.9)' : 'rgba(255,255,255,0.9)' }
  const textStyle = { color: isLight ? ACTIVE_COLOR : '#ffffff', opacity: 0.9 }

  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      onClick={onClick}
      className="fixed right-8 z-[90] group"
      style={{ bottom: 'calc(2rem + 40px + 0.75rem)' }}
      aria-label="Scroll to next section"
      tabIndex={0}
    >
      <div className="relative flex flex-col items-center gap-2">
        {/* Mouse icon */}
        <div className={`w-7 h-10 border-2 rounded-full flex items-start justify-center p-2 transition-colors duration-300 bg-transparent`} style={borderStyle}>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            className={`w-1 h-2 rounded-full transition-colors duration-300`}
            style={dotStyle}
          />
        </div>
        
        {/* Label */}
        <span className={`text-xs transition-colors duration-300`} style={textStyle}>
          Scroll
        </span>
      </div>
    </motion.button>
  )
}
