import { Property, IndustrialPark } from './types'

// Sample Properties Data (Bất động sản)
export const sampleProperties: Property[] = [
  {
    id: '1',
    code: 'INL-BDS-001',
    name: 'Nhà phố cao cấp Quận 7',
    slug: 'nha-pho-cao-cap-quan-7',
    province: 'TP.HCM',
    district: 'Quận 7',
    type: 'nha-pho',
    status: 'available',
    legal_status: 'so-hong-rieng',
    area: 120,
    land_area: 100,
    construction_area: 300,
    bedrooms: 4,
    bathrooms: 3,
    floors: 3,
    orientation: 'dong',
    price: 4800000000,
    price_per_sqm: 40000000,
    furniture: 'full',
    description: 'Nhà phố 1 trệt 2 lầu, thiết kế hiện đại, nội thất cao cấp, khu dân cư an ninh.',
    description_full: 'Sở hữu vị trí đắc địa tại trung tâm Quận 7, kết nối nhanh đến Phú Mỹ Hưng. Thiết kế tinh tế, tối ưu công năng, nội thất nhập khẩu, sân trước rộng rãi, gara ô tô. Pháp lý minh bạch, sổ hồng riêng.',
    thumbnail_url: 'https://images.unsplash.com/photo-1501183638710-841dd1904471?q=80&w=1200',
    amenities: ['gara-oto', 'san-vuon', 'an-ninh-24-7'],
    created_at: '2025-01-01T00:00:00Z',
    updated_at: '2025-01-01T00:00:00Z',
  },
  {
    id: '2',
    code: 'INL-BDS-002',
    name: 'Căn hộ Skyline Riverside',
    slug: 'can-ho-skyline-riverside',
    province: 'TP.HCM',
    district: 'Bình Thạnh',
    type: 'can-ho',
    status: 'available',
    legal_status: 'so-hong-rieng',
    area: 72,
    bedrooms: 2,
    bathrooms: 2,
    floors: 1,
    orientation: 'nam',
    price: 2200000000,
    price_per_sqm: 30555556,
    furniture: 'basic',
    description: 'Căn hộ 2PN view sông, tiện ích 5 sao, an ninh 24/7.',
    description_full: 'Không gian sống đẳng cấp giữa lòng thành phố. Tận hưởng hệ thống tiện ích nội khu hoàn hảo: hồ bơi tràn bờ, gym & yoga, vườn thiền, khu BBQ. Kết nối giao thông thuận tiện.',
    thumbnail_url: 'https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?q=80&w=1200',
    amenities: ['ho-boi', 'gym', 'thang-may', 'an-ninh-24-7'],
    created_at: '2025-01-02T00:00:00Z',
    updated_at: '2025-01-02T00:00:00Z',
  },
  {
    id: '3',
    code: 'INL-BDS-003',
    name: 'Biệt thự Phú Mỹ Hưng',
    slug: 'biet-thu-phu-my-hung',
    province: 'TP.HCM',
    district: 'Quận 7',
    type: 'biet-thu',
    status: 'available',
    legal_status: 'so-hong-rieng',
    area: 250,
    land_area: 200,
    construction_area: 400,
    bedrooms: 5,
    bathrooms: 4,
    floors: 2,
    orientation: 'dong-nam',
    price: 12500000000,
    price_per_sqm: 50000000,
    furniture: 'full',
    description: 'Biệt thự đơn lập, sân vườn rộng, hồ bơi riêng',
    thumbnail_url: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1200',
    amenities: ['ho-boi', 'san-vuon', 'gara-oto', 'an-ninh-24-7'],
    created_at: '2025-01-03T00:00:00Z',
    updated_at: '2025-01-03T00:00:00Z',
  },
  {
    id: '4',
    code: 'INL-BDS-004',
    name: 'Nhà xưởng KCN Tân Bình',
    slug: 'nha-xuong-kcn-tan-binh',
    province: 'TP.HCM',
    district: 'Tân Bình',
    type: 'nha-xuong',
    status: 'available',
    legal_status: 'hop-le',
    area: 500,
    construction_area: 450,
    price: 8000000000,
    price_per_sqm: 16000000,
    furniture: 'empty',
    description: 'Nhà xưởng khu công nghiệp, hạ tầng hoàn chỉnh',
    thumbnail_url: 'https://images.unsplash.com/photo-1565514020179-026b92b84bb6?q=80&w=1200',
    amenities: ['cho-dau-xe', 'an-ninh-24-7'],
    created_at: '2025-01-04T00:00:00Z',
    updated_at: '2025-01-04T00:00:00Z',
  },
  {
    id: '5',
    code: 'INL-BDS-005',
    name: 'Đất nền Bình Chánh',
    slug: 'dat-nen-binh-chanh',
    province: 'TP.HCM',
    district: 'Bình Chánh',
    type: 'dat-nen',
    status: 'available',
    legal_status: 'so-hong-rieng',
    area: 150,
    width: 10,
    length: 15,
    price: 3000000000,
    price_per_sqm: 20000000,
    description: 'Đất nền mặt tiền đường lớn, vị trí đẹp',
    thumbnail_url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1200',
    created_at: '2025-01-05T00:00:00Z',
    updated_at: '2025-01-05T00:00:00Z',
  },
  {
    id: '6',
    code: 'INL-BDS-006',
    name: 'Shophouse The Manor',
    slug: 'shophouse-the-manor',
    province: 'TP.HCM',
    district: 'Bình Thạnh',
    type: 'shophouse',
    status: 'reserved',
    legal_status: 'so-hong-rieng',
    area: 180,
    bedrooms: 3,
    bathrooms: 3,
    floors: 4,
    orientation: 'dong',
    price: 8500000000,
    price_per_sqm: 47222222,
    furniture: 'basic',
    description: 'Shophouse 1 trệt 3 lầu, kinh doanh tốt',
    thumbnail_url: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1200',
    amenities: ['thang-may', 'cho-dau-xe', 'an-ninh-24-7'],
    created_at: '2025-01-06T00:00:00Z',
    updated_at: '2025-01-06T00:00:00Z',
  },
]

// Sample Industrial Parks Data (Khu công nghiệp)
export const sampleIndustrialParks: IndustrialPark[] = [
  {
    id: '1',
    code: 'INL-KCN-001',
    name: 'KCN Tân Bình',
    slug: 'kcn-tan-binh',
    province: 'TP.HCM',
    district: 'Tân Bình',
    total_area: 500,
    available_area: 120,
    occupancy_rate: 76,
    infrastructure_power: true,
    infrastructure_water: true,
    infrastructure_drainage: true,
    infrastructure_waste: true,
    infrastructure_internet: true,
    infrastructure_road: true,
    infrastructure_security: true,
    rental_price_min: 80000,
    rental_price_max: 150000,
    allowed_industries: ['dien-tu', 'co-khi', 'hoa-chat'],
    description: 'KCN hiện đại, hạ tầng hoàn chỉnh, gần cảng biển',
    description_full: 'Khu công nghiệp Tân Bình là một trong những KCN hiện đại nhất khu vực, với hạ tầng kỹ thuật hoàn chỉnh, gần các cảng biển lớn, thuận tiện cho xuất nhập khẩu.',
    thumbnail_url: 'https://images.unsplash.com/photo-1565514020179-026b92b84bb6?q=80&w=1200',
    contact_phone: '0901234567',
    contact_email: 'kcn.tanbinh@inland.vn',
    created_at: '2025-01-01T00:00:00Z',
    updated_at: '2025-01-01T00:00:00Z',
  },
  {
    id: '2',
    code: 'INL-KCN-002',
    name: 'KCN Long Thành',
    slug: 'kcn-long-thanh',
    province: 'Đồng Nai',
    district: 'Long Thành',
    total_area: 1200,
    available_area: 450,
    occupancy_rate: 62.5,
    infrastructure_power: true,
    infrastructure_water: true,
    infrastructure_drainage: true,
    infrastructure_waste: false,
    infrastructure_internet: true,
    infrastructure_road: true,
    infrastructure_security: true,
    rental_price_min: 70000,
    rental_price_max: 120000,
    allowed_industries: ['may-mac', 'co-khi', 'nong-san'],
    description: 'KCN quy mô lớn, gần sân bay Long Thành',
    description_full: 'Khu công nghiệp Long Thành nằm tại vị trí chiến lược, cách sân bay quốc tế Long Thành chỉ 5km, thuận lợi cho các doanh nghiệp logistics và sản xuất.',
    thumbnail_url: 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?q=80&w=1200',
    contact_phone: '0909876543',
    contact_email: 'kcn.longthanh@inland.vn',
    created_at: '2025-01-02T00:00:00Z',
    updated_at: '2025-01-02T00:00:00Z',
  },
  {
    id: '3',
    code: 'INL-KCN-003',
    name: 'KCN Hiệp Phước',
    slug: 'kcn-hiep-phuoc',
    province: 'TP.HCM',
    district: 'Nhà Bè',
    total_area: 800,
    available_area: 200,
    occupancy_rate: 75,
    infrastructure_power: true,
    infrastructure_water: true,
    infrastructure_drainage: true,
    infrastructure_waste: true,
    infrastructure_internet: true,
    infrastructure_road: true,
    infrastructure_security: true,
    rental_price_min: 90000,
    rental_price_max: 160000,
    allowed_industries: ['dien-tu', 'duoc-pham', 'thuc-pham'],
    description: 'KCN sát cảng Hiệp Phước, logistics thuận lợi',
    thumbnail_url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200',
    contact_phone: '0903456789',
    contact_email: 'kcn.hiepphuoc@inland.vn',
    created_at: '2025-01-03T00:00:00Z',
    updated_at: '2025-01-03T00:00:00Z',
  },
]

// Filter functions
export function filterProperties(list: Property[], filters: any): Property[] {
  return list.filter(p => {
    // Search
    if (filters.q && !p.name.toLowerCase().includes(filters.q.toLowerCase())) return false

    // Type
    if (filters.type && p.type !== filters.type) return false

    // Location
    if (filters.province && p.province !== filters.province) return false
    if (filters.district && p.district !== filters.district) return false

    // Price
    if (filters.price_min !== undefined && p.price < filters.price_min) return false
    if (filters.price_max !== undefined && p.price > filters.price_max) return false

    // Area
    if (filters.area_min !== undefined && p.area < filters.area_min) return false
    if (filters.area_max !== undefined && p.area > filters.area_max) return false

    // Status
    if (filters.status && p.status !== filters.status) return false

    // Legal status
    if (filters.legal_status && p.legal_status !== filters.legal_status) return false

    // Bedrooms
    if (filters.bedrooms !== undefined && p.bedrooms !== undefined) {
      if (filters.bedrooms >= 4 && p.bedrooms < 4) return false
      else if (filters.bedrooms < 4 && p.bedrooms !== filters.bedrooms) return false
    }

    // Orientation
    if (filters.orientation && p.orientation !== filters.orientation) return false

    // Furniture
    if (filters.furniture && p.furniture !== filters.furniture) return false

    // Amenities
    if (filters.amenities && filters.amenities.length > 0) {
      if (!p.amenities || !filters.amenities.every((a: string) => p.amenities!.includes(a))) {
        return false
      }
    }

    return true
  })
}

export function filterIndustrialParks(list: IndustrialPark[], filters: any): IndustrialPark[] {
  return list.filter(park => {
    // Search
    if (filters.q && !park.name.toLowerCase().includes(filters.q.toLowerCase())) return false

    // Location
    if (filters.province && park.province !== filters.province) return false
    if (filters.district && park.district !== filters.district) return false

    // Rental price
    if (filters.rental_price_min !== undefined && park.rental_price_min && park.rental_price_min < filters.rental_price_min) return false
    if (filters.rental_price_max !== undefined && park.rental_price_max && park.rental_price_max > filters.rental_price_max) return false

    // Available area
    if (filters.available_area_min !== undefined && park.available_area && park.available_area < filters.available_area_min / 10000) return false

    // Industries
    if (filters.industries && filters.industries.length > 0) {
      if (!park.allowed_industries || !filters.industries.some((i: string) => park.allowed_industries!.includes(i))) {
        return false
      }
    }

    // Infrastructure
    if (filters.infrastructure && filters.infrastructure.length > 0) {
      const infraMap: Record<string, boolean | undefined> = {
        power: park.infrastructure_power,
        water: park.infrastructure_water,
        drainage: park.infrastructure_drainage,
        waste: park.infrastructure_waste,
        internet: park.infrastructure_internet,
        road: park.infrastructure_road,
        security: park.infrastructure_security,
      }
      if (!filters.infrastructure.every((i: string) => infraMap[i])) {
        return false
      }
    }

    return true
  })
}
