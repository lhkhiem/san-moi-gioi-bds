"use client"
import React, { useState } from 'react'
import MediaSlider from './MediaSlider'
import InfoCard from './InfoCard'
import IconListCard from './IconListCard'
import MapSection from './MapSection'
import ContactSection from './ContactSection'
import PriceCard from './PriceCard'
import SimilarItemsSection from './SimilarItemsSection'
import ConsultationFormModal from './ConsultationFormModal'
import { DetailEntity, SimilarItemCardData, Property, IndustrialPark } from '../../../lib/types'
import { MapPin, BadgeInfo, Building2 } from 'lucide-react'

interface DetailLayoutProps {
  entity: DetailEntity
  similarItems?: SimilarItemCardData[]
}

// Pure layout/structure: assumes data is already provided.
export const DetailLayout: React.FC<DetailLayoutProps> = ({ entity, similarItems = [] }) => {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const isProperty = entity.kind === 'property'
  const data = entity.item as Property | IndustrialPark

  // Basic media data extraction
  const images = (data as any).images?.map((img: any) => img.url) || []
  const videoUrl = (data as any).video_url

  return (
    <div className="container mx-auto max-w-6xl px-4 py-10" data-bg-type="light">
      {/* Hero Media */}
      <MediaSlider images={images} videoUrl={videoUrl} aspect="4:3" />

      {/* Header Title */}
      <header className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">
          {data.name || 'Tên sản phẩm / dự án'}
        </h1>
        <p className="mt-2 text-sm text-gray-600 line-clamp-3">
          {(data as any).description || 'Mô tả ngắn gọn sẽ hiển thị ở đây.'}
        </p>
      </header>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-8">
          {/* Conditional Info Blocks */}
          {isProperty ? (
            <InfoCard title="Thông tin Bất động sản" icon={BadgeInfo}>
              <ul className="grid grid-cols-2 gap-4 text-sm">
                <li><span className="font-medium">Diện tích:</span> {(data as any).area || '--'} m²</li>
                <li><span className="font-medium">Giá:</span> {(data as any).price ? (data as any).price.toLocaleString('vi-VN') + '₫' : '--'}</li>
                <li><span className="font-medium">Vị trí:</span> {(data as any).province || '--'}</li>
                <li><span className="font-medium">Pháp lý:</span> {(data as any).legal_status || '--'}</li>
              </ul>
            </InfoCard>
          ) : (
            <InfoCard title="Thông tin Khu công nghiệp" icon={Building2}>
              <ul className="grid grid-cols-2 gap-4 text-sm">
                <li><span className="font-medium">Tổng diện tích:</span> {(data as any).total_area || '--'} ha</li>
                <li><span className="font-medium">Diện tích trống:</span> {(data as any).available_area || '--'} ha</li>
                <li><span className="font-medium">Ngành nghề ưu đãi:</span> {(data as any).allowed_industries?.slice(0,3).join(', ') || '--'}</li>
                <li><span className="font-medium">Giá thuê tham khảo:</span> {(data as any).rental_price_min ? (data as any).rental_price_min.toLocaleString('vi-VN') + '₫' : '--'}</li>
              </ul>
            </InfoCard>
          )}

          {/* Amenity / Infrastructure List */}
          {isProperty ? (
            <IconListCard
              title="Tiện ích"
              items={(data as any).amenities?.map((a: string) => ({ label: a })) || []}
              columns={3}
            />
          ) : (
            <IconListCard
              title="Hạ tầng"
              items={(() => {
                const infra = data as any
                const mapping: { key: string; label: string }[] = [
                  { key: 'infrastructure_road', label: 'Giao thông' },
                  { key: 'infrastructure_power', label: 'Điện' },
                  { key: 'infrastructure_water', label: 'Nước' },
                  { key: 'infrastructure_internet', label: 'Thông tin liên lạc' },
                  { key: 'infrastructure_drainage', label: 'Thoát nước' },
                  { key: 'infrastructure_waste', label: 'Xử lý nước thải' },
                  { key: 'infrastructure_security', label: 'An ninh' }
                ]
                return mapping.map(m => ({ label: m.label, value: infra[m.key] ? 'Có' : '—' }))
              })()}
              columns={3}
            />
          )}

          {/* Long Description replaces previous map position */}
          <InfoCard title="Mô tả chi tiết" icon={BadgeInfo}>
            <div className="prose max-w-none prose-sm">
              <p>{(data as any).description_full || 'Đang cập nhật mô tả chi tiết...'}</p>
            </div>
          </InfoCard>
        </div>

        <div className="space-y-8">
          <PriceCard
            type={isProperty ? 'property' : 'industrialPark'}
            price={(data as any).price}
            pricePerSqm={(data as any).price_per_sqm}
            rentalPriceMin={(data as any).rental_price_min}
            rentalPriceMax={(data as any).rental_price_max}
            negotiable={(data as any).negotiable}
          />
          <ContactSection
            type={isProperty ? 'property' : 'industrialPark'}
            phoneNumber={(data as any).contact_phone || '0901234567'}
            onOpenForm={() => setIsFormOpen(true)}
          />
          <InfoCard title="Địa điểm" icon={MapPin}>
            <div className="text-sm">{(data as any).province || 'Chưa cập nhật'}</div>
          </InfoCard>
          <MapSection
            latitude={(data as any).latitude}
            longitude={(data as any).longitude}
            address={(data as any).address || (data as any).province}
          />
        </div>
      </div>

      {/* Similar Items */}
      <SimilarItemsSection
        items={similarItems}
        title={isProperty ? 'Bất động sản tương tự' : 'Khu công nghiệp tương tự'}
        basePath={isProperty ? '/bat-dong-san' : '/kcn'}
      />

      {/* Consultation Form Modal */}
      <ConsultationFormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        productName={data.name}
      />
    </div>
  )
}

export default DetailLayout
