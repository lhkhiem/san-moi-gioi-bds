"use client"

import { useMemo, useState } from 'react'
import { Search, SlidersHorizontal } from 'lucide-react'
import ProductFilterDropdown from './ProductFilterDropdown'
import PriceRangeSlider from './PriceRangeSlider'
import MultiSelectDropdown from './MultiSelectDropdown'
import { provinces as vnProvinces, wardsByProvince } from '@/lib/vietnam'
import { IndustrialParkFilter } from '@/lib/types'

type Option = { label: string; value: string }

export default function IndustrialParkFilterBar({
  onChange,
}: {
  onChange: (filters: IndustrialParkFilter) => void
}) {
  const [filters, setFilters] = useState<IndustrialParkFilter>({
    q: '',
    demand: undefined,
    province: undefined,
    district: undefined,
    rental_price_min: 0,
    rental_price_max: 500000,
    available_area_min: 0,
    industries: [],
    infrastructure: [],
  })

  const [showAdvanced, setShowAdvanced] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  const emit = (next: Partial<IndustrialParkFilter>) => {
    const merged = { ...filters, ...next }
    setFilters(merged)
    onChange(merged)
  }

  // Options
  const demandOptions: Option[] = [
    { label: 'Thuê', value: 'rent' },
    { label: 'Mua sở hữu', value: 'buy' },
  ]

  const provinceOptions = useMemo(() => vnProvinces.map(p => ({ label: p, value: p })), [])
  const districtOptions = useMemo(() => {
    if (!filters.province) return []
    const districts = wardsByProvince[filters.province] || []
    return districts.map(d => ({ label: d, value: d }))
  }, [filters.province])

  const industryOptions: Option[] = [
    { label: 'Điện tử', value: 'dien-tu' },
    { label: 'Cơ khí', value: 'co-khi' },
    { label: 'May mặc', value: 'may-mac' },
    { label: 'Hóa chất', value: 'hoa-chat' },
    { label: 'Thực phẩm', value: 'thuc-pham' },
    { label: 'Dược phẩm', value: 'duoc-pham' },
    { label: 'Nông sản', value: 'nong-san' },
    { label: 'Gỗ & Đồ gỗ', value: 'go-do-go' },
    { label: 'Nhựa', value: 'nhua' },
    { label: 'Da giày', value: 'da-giay' },
    { label: 'Logistics', value: 'logistics' },
    { label: 'Kho bãi', value: 'kho-bai' },
  ]

  const infrastructureOptions: Option[] = [
    { label: 'Điện', value: 'power' },
    { label: 'Nước', value: 'water' },
    { label: 'Thoát nước', value: 'drainage' },
    { label: 'Xử lý chất thải', value: 'waste' },
    { label: 'Internet', value: 'internet' },
    { label: 'Đường nội bộ', value: 'road' },
    { label: 'An ninh 24/7', value: 'security' },
  ]

  const rentalPricePresets: Array<{ label: string; min: number; max: number }> = [
    { label: 'Dưới 50k', min: 0, max: 50000 },
    { label: '50k - 100k', min: 50000, max: 100000 },
    { label: '100k - 150k', min: 100000, max: 150000 },
    { label: '150k - 200k', min: 150000, max: 200000 },
    { label: 'Trên 200k', min: 200000, max: 500000 },
  ]

  const areaPresets: Array<{ label: string; min: number }> = [
    { label: 'Tối thiểu 10 ha', min: 100000 },
    { label: 'Tối thiểu 50 ha', min: 500000 },
    { label: 'Tối thiểu 100 ha', min: 1000000 },
    { label: 'Tối thiểu 200 ha', min: 2000000 },
  ]

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-4 md:p-6">
      <div className="flex items-center justify-between mb-3">
        <div className="text-sm font-semibold text-gray-900">Tìm kiếm khu công nghiệp</div>
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="flex items-center gap-2 text-sm text-goldDark hover:text-goldDark/80"
        >
          <SlidersHorizontal className="w-4 h-4" />
          {showAdvanced ? 'Ẩn bộ lọc' : 'Bộ lọc nâng cao'}
        </button>
      </div>

      {/* Row 1: Basic Search */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 md:gap-4 mt-2">
        <div className="lg:col-span-4 relative">
          <input
            value={filters.q || ''}
            onChange={e => emit({ q: e.target.value })}
            placeholder="Nhập tên KCN hoặc từ khóa..."
            className="w-full h-12 md:h-14 px-4 md:px-5 pr-12 rounded-xl border border-gray-200 focus:border-goldDark outline-none"
          />
          <Search className="w-5 h-5 absolute right-4 top-1/2 -translate-y-1/2 text-goldDark" />
        </div>
        <div className="lg:col-span-2">
          <ProductFilterDropdown
            label="Nhu cầu"
            options={demandOptions}
            value={filters.demand || ''}
            onChange={v => emit({ demand: v || undefined })}
            isOpen={activeDropdown === 'demand'}
            onOpen={() => setActiveDropdown('demand')}
            onClose={() => setActiveDropdown(null)}
          />
        </div>
        <div className="lg:col-span-3">
          <ProductFilterDropdown
            label="Tỉnh/Thành"
            options={provinceOptions}
            value={filters.province || ''}
            onChange={v => emit({ province: v || undefined, district: undefined })}
            isOpen={activeDropdown === 'province'}
            onOpen={() => setActiveDropdown('province')}
            onClose={() => setActiveDropdown(null)}
          />
        </div>
        <div className="lg:col-span-3">
          <ProductFilterDropdown
            label="Quận/Huyện"
            options={districtOptions}
            value={filters.district || ''}
            onChange={v => emit({ district: v || undefined })}
            isOpen={activeDropdown === 'district'}
            onOpen={() => setActiveDropdown('district')}
            onClose={() => setActiveDropdown(null)}
          />
        </div>
      </div>

      {/* Row 2: Price & Area Sliders */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mt-3">
        <div>
          <PriceRangeSlider
            min={0}
            max={500000}
            step={10000}
            value={[filters.rental_price_min || 0, filters.rental_price_max || 500000]}
            onChange={v => emit({ rental_price_min: v[0], rental_price_max: v[1] })}
            formatter={n => `${n.toLocaleString('vi-VN')} đ`}
          />
        </div>
        <div>
          <PriceRangeSlider
            min={0}
            max={5000000}
            step={10000}
            value={[filters.available_area_min || 0, filters.available_area_max || 5000000]}
            onChange={v => emit({ available_area_min: v[0], available_area_max: v[1] })}
            formatter={n => `${(n / 10000).toFixed(1)} ha`}
          />
        </div>
      </div>

      {/* Rental Price Quick Presets */}
      <div className="mt-3">
        <div className="text-xs text-gray-500 mb-2">Giá thuê phổ biến:</div>
        <div className="flex flex-wrap gap-2">
          {rentalPricePresets.map(preset => (
            <button
              key={preset.label}
              onClick={() => emit({ rental_price_min: preset.min, rental_price_max: preset.max })}
              className="px-3 py-1.5 rounded-full text-sm bg-gray-50 border border-gray-200 hover:border-goldDark/50 hover:bg-goldLight/10 transition-colors"
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Area Quick Presets */}
      <div className="mt-3">
        <div className="text-xs text-gray-500 mb-2">Diện tích còn trống:</div>
        <div className="flex flex-wrap gap-2">
          {areaPresets.map(preset => (
            <button
              key={preset.label}
              onClick={() => emit({ available_area_min: preset.min })}
              className="px-3 py-1.5 rounded-full text-sm bg-gray-50 border border-gray-200 hover:border-goldDark/50 hover:bg-goldLight/10 transition-colors"
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Advanced Filters */}
      {showAdvanced && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            <MultiSelectDropdown
              label="Ngành nghề được phép"
              options={industryOptions}
              values={filters.industries || []}
              onChange={vals => emit({ industries: vals })}
              display="summary"
              showLabel={false}
              isOpen={activeDropdown === 'industries'}
              onOpen={() => setActiveDropdown('industries')}
              onClose={() => setActiveDropdown(null)}
            />
            <MultiSelectDropdown
              label="Hạ tầng"
              options={infrastructureOptions}
              values={filters.infrastructure || []}
              onChange={vals => emit({ infrastructure: vals })}
              display="summary"
              showLabel={false}
              isOpen={activeDropdown === 'infrastructure'}
              onOpen={() => setActiveDropdown('infrastructure')}
              onClose={() => setActiveDropdown(null)}
            />
          </div>

          {/* Reset Button */}
          <div className="mt-4 flex justify-end">
            <button
              onClick={() => {
                const reset: IndustrialParkFilter = {
                  q: '',
                  province: undefined,
                  district: undefined,
                  rental_price_min: 0,
                  rental_price_max: 500000,
                  available_area_min: 0,
                  industries: [],
                  infrastructure: [],
                }
                setFilters(reset)
                onChange(reset)
              }}
              className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 border border-gray-200 rounded-lg hover:border-goldDark/50 transition-colors"
            >
              Đặt lại bộ lọc
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
