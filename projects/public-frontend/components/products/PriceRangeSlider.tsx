"use client"

import { useEffect, useState } from 'react'

export default function PriceRangeSlider({
  min=0,
  max=1000000000,
  step=1000000,
  value,
  onChange,
  formatter,
}: {
  min?: number
  max?: number
  step?: number
  value: [number, number]
  onChange: (v: [number, number]) => void
  formatter?: (n:number)=>string
}) {
  const [local, setLocal] = useState<[number, number]>(value)

  useEffect(()=>{ setLocal(value) }, [value])

  const handle = (idx: 0|1, v: number) => {
    const next: [number, number] = idx===0 ? [Math.min(v, local[1]), local[1]] : [local[0], Math.max(v, local[0])]
    setLocal(next)
    onChange(next)
  }

  const pct = (n:number)=> ((n - min) / (max - min)) * 100

  return (
    <div className="w-full">
      <div className="relative h-2 bg-gray-200 rounded-full">
        <div className="absolute h-2 bg-goldDark rounded-full" style={{ left: pct(local[0])+'%', right: (100 - pct(local[1]))+'%' }} />
        <input type="range" min={min} max={max} step={step} value={local[0]} onChange={(e)=>handle(0, Number(e.target.value))} className="range-input absolute w-full appearance-none bg-transparent pointer-events-auto h-2 focus:outline-none" />
        <input type="range" min={min} max={max} step={step} value={local[1]} onChange={(e)=>handle(1, Number(e.target.value))} className="range-input absolute w-full appearance-none bg-transparent pointer-events-auto h-2 focus:outline-none" />
      </div>
      <div className="mt-2 flex justify-between text-sm text-gray-600">
        <span>{(formatter||formatCurrency)(local[0])}</span>
        <span>{(formatter||formatCurrency)(local[1])}</span>
      </div>
    </div>
  )
}

const formatCurrency = (n:number) => new Intl.NumberFormat('vi-VN', { style:'currency', currency:'VND', maximumFractionDigits:0 }).format(n)
