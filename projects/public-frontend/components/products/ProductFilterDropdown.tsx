"use client"

import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

type Option = { label: string; value: string; children?: Option[] }

export default function ProductFilterDropdown({
  label,
  options,
  value,
  onChange,
}: {
  label: string
  options: Option[]
  value?: string
  onChange: (val: string) => void
}) {
  const [open, setOpen] = useState(false)
  const selected = options.find(o => o.value === value)
  const isPlaceholder = !selected
  const display = selected?.label ?? label

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((s) => !s)}
        className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white flex items-center justify-between text-gray-700 hover:border-goldDark/50"
      >
        <span className={`truncate ${isPlaceholder ? 'text-gray-400' : 'text-gray-800'}`}>{display}</span>
        <ChevronDown className="w-4 h-4" />
      </button>

      {open && (
        <div className="absolute z-20 mt-2 w-full max-h-72 overflow-auto bg-white rounded-xl shadow-xl border border-gray-100">
          {options.map((opt) => (
            <div key={opt.value} className="">
              <button
                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${value===opt.value? 'text-goldDark font-semibold': 'text-gray-700'}`}
                onClick={() => { onChange(opt.value); setOpen(false) }}
              >
                {opt.label}
              </button>
              {opt.children && (
                <div className="pl-4">
                  {opt.children.map(child => (
                    <button
                      key={child.value}
                      className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-50"
                      onClick={() => { onChange(child.value); setOpen(false) }}
                    >
                      {child.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
