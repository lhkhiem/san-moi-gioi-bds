export type JobPosting = {
  id: string
  slug: string
  title: string
  quantity: number
  deadline: string
  description: {
    overview: string
    responsibilities: string[]
    requirements: string[]
    benefits: string[]
  }
}

export const jobPostings: JobPosting[] = [
  {
    id: 'j1',
    slug: 'chuyen-vien-tu-van-bat-dong-san',
    title: 'Chuyên viên Tư vấn Bất động sản',
    quantity: 10,
    deadline: '2025-01-15',
    description: {
      overview: 'INLAND Real Estate đang tìm kiếm các Chuyên viên Tư vấn Bất động sản năng động, nhiệt huyết để gia nhập đội ngũ kinh doanh chuyên nghiệp. Đây là cơ hội tuyệt vời để phát triển sự nghiệp trong lĩnh vực bất động sản cao cấp với mức thu nhập hấp dẫn và cơ hội thăng tiến rõ ràng.',
      responsibilities: [
        'Tư vấn và giới thiệu các sản phẩm bất động sản cho khách hàng',
        'Tìm kiếm và phát triển nguồn khách hàng tiềm năng',
        'Nghiên cứu thị trường và đối thủ cạnh tranh',
        'Đàm phán và ký kết hợp đồng mua bán, cho thuê bất động sản',
        'Duy trì mối quan hệ lâu dài với khách hàng',
        'Báo cáo kết quả công việc theo định kỳ cho quản lý trực tiếp'
      ],
      requirements: [
        'Tốt nghiệp Đại học các chuyên ngành Kinh tế, Kinh doanh, Marketing hoặc tương đương',
        'Có từ 1-2 năm kinh nghiệm trong lĩnh vực bất động sản (ưu tiên)',
        'Kỹ năng giao tiếp, thuyết trình và đàm phán tốt',
        'Khả năng làm việc độc lập và làm việc nhóm',
        'Có tinh thần trách nhiệm, chủ động trong công việc',
        'Sử dụng thành thạo tin học văn phòng',
        'Ngoại hình ưa nhìn, giọng nói dễ nghe'
      ],
      benefits: [
        'Mức lương cơ bản hấp dẫn + Hoa hồng không giới hạn (15-25%)',
        'Thu nhập trung bình 20-50 triệu/tháng',
        'Thưởng theo doanh số và KPI đạt được',
        'Được đào tạo bài bản về sản phẩm, kỹ năng bán hàng',
        'Môi trường làm việc chuyên nghiệp, năng động',
        'Cơ hội thăng tiến rõ ràng: Nhân viên → Trưởng nhóm → Quản lý',
        'Tham gia đầy đủ BHXH, BHYT, BHTN theo quy định',
        'Du lịch, team building hàng năm',
        'Các chế độ phúc lợi khác theo chính sách công ty'
      ]
    }
  },
  {
    id: 'j2',
    slug: 'nhan-vien-marketing',
    title: 'Nhân viên Marketing',
    quantity: 3,
    deadline: '2025-01-10',
    description: {
      overview: 'Chúng tôi đang tìm kiếm Nhân viên Marketing sáng tạo để phát triển và thực hiện các chiến dịch marketing cho các dự án bất động sản cao cấp của INLAND.',
      responsibilities: [
        'Lập kế hoạch và triển khai các chiến dịch marketing online/offline',
        'Quản lý và phát triển nội dung trên website, social media',
        'Tổ chức các sự kiện, triển lãm, roadshow giới thiệu dự án',
        'Phối hợp với đối tác truyền thông để đưa tin về dự án',
        'Phân tích hiệu quả chiến dịch và đề xuất cải tiến',
        'Xây dựng và quản lý ngân sách marketing'
      ],
      requirements: [
        'Tốt nghiệp Đại học chuyên ngành Marketing, Truyền thông',
        'Có ít nhất 2 năm kinh nghiệm về marketing bất động sản',
        'Thành thạo Facebook Ads, Google Ads, SEO/SEM',
        'Kỹ năng thiết kế cơ bản (Photoshop, Canva)',
        'Khả năng viết content, copywriting tốt',
        'Tư duy sáng tạo, nhạy bén với xu hướng thị trường',
        'Làm việc theo nhóm hiệu quả'
      ],
      benefits: [
        'Mức lương: 12-18 triệu (thỏa thuận theo năng lực)',
        'Thưởng theo hiệu quả công việc',
        'Được học hỏi và làm việc với các chuyên gia hàng đầu',
        'Môi trường sáng tạo, năng động',
        'Đầy đủ chế độ BHXH, BHYT, BHTN',
        'Thưởng lễ, tết, sinh nhật',
        'Du lịch, team building định kỳ'
      ]
    }
  },
  {
    id: 'j3',
    slug: 'truong-phong-kinh-doanh',
    title: 'Trưởng phòng Kinh doanh',
    quantity: 2,
    deadline: '2025-01-20',
    description: {
      overview: 'INLAND Real Estate cần tuyển Trưởng phòng Kinh doanh có kinh nghiệm để quản lý và phát triển đội ngũ bán hàng, đảm bảo đạt và vượt chỉ tiêu kinh doanh đề ra.',
      responsibilities: [
        'Xây dựng chiến lược kinh doanh và kế hoạch bán hàng',
        'Quản lý, đào tạo và phát triển đội ngũ nhân viên kinh doanh',
        'Giám sát hoạt động bán hàng, đảm bảo đạt KPI',
        'Phát triển và duy trì mối quan hệ với khách hàng lớn',
        'Phân tích thị trường, đối thủ cạnh tranh',
        'Báo cáo định kỳ cho Ban Giám đốc về tình hình kinh doanh'
      ],
      requirements: [
        'Tốt nghiệp Đại học chuyên ngành Kinh tế, Quản trị kinh doanh',
        'Có ít nhất 5 năm kinh nghiệm trong lĩnh vực BĐS, trong đó có 2 năm ở vị trí quản lý',
        'Kỹ năng lãnh đạo, quản lý đội nhóm xuất sắc',
        'Khả năng phân tích, xử lý tình huống tốt',
        'Kỹ năng đàm phán, thuyết trình chuyên nghiệp',
        'Có mạng lưới khách hàng rộng là một lợi thế'
      ],
      benefits: [
        'Mức lương: 25-40 triệu + Thưởng theo doanh số',
        'Hoa hồng quản lý từ toàn bộ đội nhóm',
        'Thưởng hiệu suất cao, thưởng dự án',
        'Được tham gia các khóa đào tạo quản lý cao cấp',
        'Cơ hội thăng tiến lên vị trí Giám đốc Kinh doanh',
        'Xe công ty, điện thoại, laptop',
        'BHXH, BHYT đầy đủ',
        'Du lịch nghỉ dưỡng cao cấp hàng năm'
      ]
    }
  },
  {
    id: 'j4',
    slug: 'ke-toan-tong-hop',
    title: 'Kế toán Tổng hợp',
    quantity: 2,
    deadline: '2025-01-12',
    description: {
      overview: 'Tìm kiếm Kế toán Tổng hợp có kinh nghiệm để quản lý toàn bộ công tác kế toán tài chính của công ty.',
      responsibilities: [
        'Theo dõi và hạch toán các nghiệp vụ kinh tế phát sinh',
        'Lập báo cáo tài chính theo quy định',
        'Kiểm soát chi phí, công nợ',
        'Lập và quyết toán thuế',
        'Quản lý sổ sách kế toán, chứng từ',
        'Phối hợp với các phòng ban trong công tác tài chính'
      ],
      requirements: [
        'Tốt nghiệp Đại học chuyên ngành Kế toán, Tài chính',
        'Có ít nhất 3 năm kinh nghiệm vị trí tương đương',
        'Am hiểu luật thuế, kế toán hiện hành',
        'Sử dụng thành thạo các phần mềm kế toán (MISA, FAST)',
        'Cẩn thận, tỉ mỉ, trung thực',
        'Kỹ năng làm việc nhóm tốt'
      ],
      benefits: [
        'Mức lương: 12-18 triệu (tùy năng lực)',
        'Thưởng cuối năm, thưởng lễ tết',
        'Làm việc giờ hành chính, nghỉ T7-CN',
        'BHXH, BHYT đầy đủ',
        'Môi trường ổn định, chuyên nghiệp',
        'Được đào tạo nâng cao nghiệp vụ'
      ]
    }
  },
  {
    id: 'j5',
    slug: 'nhan-vien-cham-soc-khach-hang',
    title: 'Nhân viên Chăm sóc Khách hàng',
    quantity: 5,
    deadline: '2025-01-18',
    description: {
      overview: 'Cần tuyển Nhân viên Chăm sóc Khách hàng để hỗ trợ và giải đáp thắc mắc cho khách hàng về các sản phẩm bất động sản.',
      responsibilities: [
        'Tiếp nhận và xử lý yêu cầu, thắc mắc của khách hàng',
        'Tư vấn, giải đáp thông tin về sản phẩm, dịch vụ',
        'Chăm sóc khách hàng sau bán hàng',
        'Hỗ trợ khách hàng trong quá trình giao dịch',
        'Thu thập phản hồi và đề xuất cải thiện dịch vụ',
        'Báo cáo định kỳ về hoạt động CSKH'
      ],
      requirements: [
        'Tốt nghiệp Cao đẳng trở lên',
        'Giọng nói dễ nghe, phát âm chuẩn',
        'Kỹ năng giao tiếp, xử lý tình huống tốt',
        'Kiên nhẫn, nhiệt tình, thái độ phục vụ tốt',
        'Sử dụng máy tính thành thạo',
        'Ưu tiên có kinh nghiệm CSKH'
      ],
      benefits: [
        'Mức lương: 8-12 triệu + KPI',
        'Thưởng theo hiệu quả công việc',
        'Làm việc trong môi trường văn phòng hiện đại',
        'Được đào tạo kỹ năng mềm',
        'BHXH, BHYT đầy đủ',
        'Nghỉ phép năm 12 ngày',
        'Team building định kỳ'
      ]
    }
  }
]
