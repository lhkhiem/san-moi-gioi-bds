'use client'

import { motion } from 'framer-motion'

interface MouseScrollIconProps {
  onClick: () => void
  isVisible: boolean
  isDarkSection: boolean
}

export default function MouseScrollIcon({ onClick, isVisible, isDarkSection }: MouseScrollIconProps) {
  if (!isVisible) return null

  // Color classes based on section background
  const borderColor = isDarkSection ? 'border-white/60 group-hover:border-white' : 'border-goldDark/60 group-hover:border-goldDark'
  const dotColor = isDarkSection ? 'bg-white/60 group-hover:bg-white' : 'bg-goldDark/60 group-hover:bg-goldDark'
  const textColor = isDarkSection ? 'text-white/60 group-hover:text-white' : 'text-goldDark/60 group-hover:text-goldDark'

  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      onClick={onClick}
      className="fixed right-8 z-40 group"
      style={{ bottom: 'calc(2rem + 40px + 0.75rem)' }}
      aria-label="Scroll to next section"
      tabIndex={0}
    >
      <div className="relative flex flex-col items-center gap-2">
        {/* Mouse icon */}
        <div className={`w-7 h-10 border-2 ${borderColor} rounded-full flex items-start justify-center p-2 transition-colors duration-300`}>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            className={`w-1 h-2 ${dotColor} rounded-full transition-colors duration-300`}
          />
        </div>
        
        {/* Label */}
        <span className={`text-xs ${textColor} transition-colors duration-300`}>
          Scroll
        </span>
      </div>
    </motion.button>
  )
}
