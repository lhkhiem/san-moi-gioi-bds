"use client"

import { useState } from 'react'
import ProductFilterBar, { type ProductFilters } from '@/components/products/ProductFilterBar'
import ProductGrid from '@/components/products/ProductGrid'

export default function ChoThuePage(){
  const [filters, setFilters] = useState<ProductFilters>({ q: '', type: undefined, provinces: [], wards: [], price: [0, 10_000_000_000], area: [0, 100000] })

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Cho thuê</h1>
        <div className="space-y-6">
          <ProductFilterBar
            defaultType={filters.type}
            onChange={(f)=> setFilters(f)}
            typeOptions={[
              { label:'Nhà phố', value:'nha-pho' },
              { label:'Căn hộ', value:'can-ho' },
              { label:'Toà nhà/Văn phòng', value:'van-phong' },
              { label:'Đất nền', value:'dat-nen' },
            ]}
            priceConfig={{ min: 0, max: 10_000_000_000, step: 5_000_000 }}
          />
          <ProductGrid filters={filters} />
        </div>
      </div>
    </div>
  )
}
