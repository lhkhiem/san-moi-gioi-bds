import React from 'react'
import { CheckCircle } from 'lucide-react'
import clsx from 'clsx'

export interface IconListItem {
  icon?: React.ReactNode
  label: string
  value?: string
}

interface IconListCardProps {
  title: string
  items: IconListItem[]
  columns?: 1 | 2 | 3
}

export const IconListCard: React.FC<IconListCardProps> = ({ title, items, columns = 2 }) => {
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3'
  }[columns]
  return (
    <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-black/5">
      <h3 className="mb-4 text-lg font-semibold tracking-tight">{title}</h3>
      <div className={clsx('grid gap-3 text-sm', gridCols)}>
        {items.map((it, i) => (
          <div key={i} className="flex gap-2 rounded-md bg-gray-50 px-3 py-2">
            <div className="mt-0.5 text-primary">
              {it.icon || <CheckCircle className="h-4 w-4" />}
            </div>
            <div className="flex flex-col">
              <span className="font-medium">{it.label}</span>
              {it.value && <span className="text-gray-600">{it.value}</span>}
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <div className="text-xs text-gray-500">No data</div>
        )}
      </div>
    </div>
  )
}

export default IconListCard
