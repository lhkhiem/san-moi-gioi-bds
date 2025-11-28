'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'

interface LayoutMeasurements {
  headerHeight: number
  footerHeight: number
  timelineWidth: number
  setHeaderHeight: (height: number) => void
  setFooterHeight: (height: number) => void
  setTimelineWidth: (width: number) => void
}

const LayoutMeasurementsContext = createContext<LayoutMeasurements | undefined>(undefined)

interface LayoutMeasurementsProviderProps {
  children: ReactNode
}

export function LayoutMeasurementsProvider({ children }: LayoutMeasurementsProviderProps) {
  const [headerHeight, setHeaderHeight] = useState(0)
  const [footerHeight, setFooterHeight] = useState(0)
  const [timelineWidth, setTimelineWidth] = useState(0)

  const value: LayoutMeasurements = {
    headerHeight,
    footerHeight,
    timelineWidth,
    setHeaderHeight,
    setFooterHeight,
    setTimelineWidth,
  }

  return (
    <LayoutMeasurementsContext.Provider value={value}>
      {children}
    </LayoutMeasurementsContext.Provider>
  )
}

export function useLayoutMeasurements() {
  const context = useContext(LayoutMeasurementsContext)
  if (context === undefined) {
    throw new Error('useLayoutMeasurements must be used within a LayoutMeasurementsProvider')
  }
  return context
}
