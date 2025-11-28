"use client"

import { useMemo, useState } from 'react'
import { Search, SlidersHorizontal } from 'lucide-react'
import ProductFilterDropdown from './ProductFilterDropdown'
import PriceRangeSlider from './PriceRangeSlider'
import MultiSelectDropdown from './MultiSelectDropdown'
import { provinces as vnProvinces, wardsByProvince } from '@/lib/vietnam'
import { PropertyFilter } from '@/lib/types'

type Option = { label: string; value: string }

export default function PropertyFilterBar({
  defaultType,
  onChange,
}: {
  defaultType?: string
  onChange: (filters: PropertyFilter) => void
}) {
  const [filters, setFilters] = useState<PropertyFilter>({
    q: '',
    demand: undefined,
    type: defaultType,
    province: undefined,
    district: undefined,
    price_min: 0,
    price_max: 50000000000,
    area_min: 0,
    area_max: 1000,
    status: undefined,
    legal_status: undefined,
    bedrooms: undefined,
    orientation: undefined,
    furniture: undefined,
    amenities: [],
  })

  const [showAdvanced, setShowAdvanced] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  const emit = (next: Partial<PropertyFilter>) => {
    const merged = { ...filters, ...next }
    setFilters(merged)
    onChange(merged)
  }

  // Options
  const demandOptions: Option[] = [
    { label: 'Thuê', value: 'rent' },
    { label: 'Mua sở hữu', value: 'buy' },
  ]

  const typeOptions: Option[] = [
    { label: 'Nhà phố', value: 'nha-pho' },
    { label: 'Căn hộ', value: 'can-ho' },
    { label: 'Biệt thự', value: 'biet-thu' },
    { label: 'Đất nền', value: 'dat-nen' },
    { label: 'Shophouse', value: 'shophouse' },
    { label: 'Nhà xưởng', value: 'nha-xuong' },
  ]

  const statusOptions: Option[] = [
    { label: 'Còn trống', value: 'available' },
    { label: 'Đã bán', value: 'sold' },
    { label: 'Đã đặt cọc', value: 'reserved' },
  ]

  const legalStatusOptions: Option[] = [
    { label: 'Sổ hồng riêng', value: 'so-hong-rieng' },
    { label: 'Sổ đỏ', value: 'so-do' },
    { label: 'Đang làm sổ', value: 'dang-lam-so' },
    { label: 'Giấy tờ hợp lệ', value: 'hop-le' },
  ]

  const orientationOptions: Option[] = [
    { label: 'Đông', value: 'dong' },
    { label: 'Tây', value: 'tay' },
    { label: 'Nam', value: 'nam' },
    { label: 'Bắc', value: 'bac' },
    { label: 'Đông Nam', value: 'dong-nam' },
    { label: 'Đông Bắc', value: 'dong-bac' },
    { label: 'Tây Nam', value: 'tay-nam' },
    { label: 'Tây Bắc', value: 'tay-bac' },
  ]

  const furnitureOptions: Option[] = [
    { label: 'Đầy đủ', value: 'full' },
    { label: 'Cơ bản', value: 'basic' },
    { label: 'Không nội thất', value: 'empty' },
  ]

  const bedroomOptions: Option[] = [
    { label: '1 PN', value: '1' },
    { label: '2 PN', value: '2' },
    { label: '3 PN', value: '3' },
    { label: '4+ PN', value: '4' },
  ]

  const amenityOptions: Option[] = [
    { label: 'Hồ bơi', value: 'ho-boi' },
    { label: 'Gym', value: 'gym' },
    { label: 'Công viên', value: 'cong-vien' },
    { label: 'Chỗ đậu xe', value: 'cho-dau-xe' },
    { label: 'An ninh 24/7', value: 'an-ninh-24-7' },
    { label: 'Thang máy', value: 'thang-may' },
    { label: 'Sân thượng', value: 'san-thuong' },
    { label: 'Ban công', value: 'ban-cong' },
    { label: 'Sân vườn', value: 'san-vuon' },
    { label: 'Gara ô tô', value: 'gara-oto' },
  ]

  const provinceOptions = useMemo(() => vnProvinces.map(p => ({ label: p, value: p })), [])
  const districtOptions = useMemo(() => {
    if (!filters.province) return []
    const districts = wardsByProvince[filters.province] || []
    return districts.map(d => ({ label: d, value: d }))
  }, [filters.province])

  const pricePresets: Array<{ label: string; min: number; max: number }> = [
    { label: 'Dưới 1 tỷ', min: 0, max: 1000000000 },
    { label: '1-3 tỷ', min: 1000000000, max: 3000000000 },
    { label: '3-5 tỷ', min: 3000000000, max: 5000000000 },
    { label: '5-10 tỷ', min: 5000000000, max: 10000000000 },
    { label: 'Trên 10 tỷ', min: 10000000000, max: 50000000000 },
  ]

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-4 md:p-6">
      <div className="flex items-center justify-between mb-3">
        <div className="text-sm font-semibold text-gray-900">Tìm kiếm bất động sản</div>
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
        <div className="lg:col-span-3 relative">
          <input
            value={filters.q || ''}
            onChange={e => emit({ q: e.target.value })}
            placeholder="Nhập từ khóa tìm kiếm..."
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
        <div className="lg:col-span-2">
          <ProductFilterDropdown
            label="Loại hình"
            options={typeOptions}
            value={filters.type || ''}
            onChange={v => emit({ type: v || undefined })}
            isOpen={activeDropdown === 'type'}
            onOpen={() => setActiveDropdown('type')}
            onClose={() => setActiveDropdown(null)}
          />
        </div>
        <div className="lg:col-span-2">
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
            max={50000000000}
            step={100000000}
            value={[filters.price_min || 0, filters.price_max || 50000000000]}
            onChange={v => emit({ price_min: v[0], price_max: v[1] })}
          />
        </div>
        <div>
          <PriceRangeSlider
            min={0}
            max={1000}
            step={10}
            value={[filters.area_min || 0, filters.area_max || 1000]}
            onChange={v => emit({ area_min: v[0], area_max: v[1] })}
            formatter={n => `${n.toLocaleString('vi-VN')} m²`}
          />
        </div>
      </div>

      {/* Price Quick Presets */}
      <div className="flex flex-wrap gap-2 mt-3">
        {pricePresets.map(preset => (
          <button
            key={preset.label}
            onClick={() => emit({ price_min: preset.min, price_max: preset.max })}
            className="px-3 py-1.5 rounded-full text-sm bg-gray-50 border border-gray-200 hover:border-goldDark/50 hover:bg-goldLight/10 transition-colors"
          >
            {preset.label}
          </button>
        ))}
      </div>

      {/* Advanced Filters */}
      {showAdvanced && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            <ProductFilterDropdown
              label="Tình trạng"
              options={statusOptions}
              value={filters.status || ''}
              onChange={v => emit({ status: v || undefined })}
              isOpen={activeDropdown === 'status'}
              onOpen={() => setActiveDropdown('status')}
              onClose={() => setActiveDropdown(null)}
            />
            <ProductFilterDropdown
              label="Pháp lý"
              options={legalStatusOptions}
              value={filters.legal_status || ''}
              onChange={v => emit({ legal_status: v || undefined })}
              isOpen={activeDropdown === 'legal'}
              onOpen={() => setActiveDropdown('legal')}
              onClose={() => setActiveDropdown(null)}
            />
            <ProductFilterDropdown
              label="Số phòng ngủ"
              options={bedroomOptions}
              value={filters.bedrooms?.toString() || ''}
              onChange={v => emit({ bedrooms: v ? parseInt(v) : undefined })}
              isOpen={activeDropdown === 'bedrooms'}
              onOpen={() => setActiveDropdown('bedrooms')}
              onClose={() => setActiveDropdown(null)}
            />
            <ProductFilterDropdown
              label="Hướng nhà"
              options={orientationOptions}
              value={filters.orientation || ''}
              onChange={v => emit({ orientation: v || undefined })}
              isOpen={activeDropdown === 'orientation'}
              onOpen={() => setActiveDropdown('orientation')}
              onClose={() => setActiveDropdown(null)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mt-3">
            <ProductFilterDropdown
              label="Nội thất"
              options={furnitureOptions}
              value={filters.furniture || ''}
              onChange={v => emit({ furniture: v || undefined })}
              isOpen={activeDropdown === 'furniture'}
              onOpen={() => setActiveDropdown('furniture')}
              onClose={() => setActiveDropdown(null)}
            />
            <MultiSelectDropdown
              label="Tiện ích"
              options={amenityOptions}
              values={filters.amenities || []}
              onChange={vals => emit({ amenities: vals })}
              display="summary"
              showLabel={false}
              isOpen={activeDropdown === 'amenities'}
              onOpen={() => setActiveDropdown('amenities')}
              onClose={() => setActiveDropdown(null)}
            />
          </div>

          {/* Reset Button */}
          <div className="mt-4 flex justify-end">
            <button
              onClick={() => {
                const reset: PropertyFilter = {
                  q: '',
                  type: undefined,
                  province: undefined,
                  district: undefined,
                  price_min: 0,
                  price_max: 50000000000,
                  area_min: 0,
                  area_max: 1000,
                  status: undefined,
                  legal_status: undefined,
                  bedrooms: undefined,
                  orientation: undefined,
                  furniture: undefined,
                  amenities: [],
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
