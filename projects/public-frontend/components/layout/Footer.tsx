import Link from 'next/link'
import { Facebook, Youtube, Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
  const footerLinks = {
    company: [
      { label: 'Giới thiệu', href: '/gioi-thieu' },
      { label: 'Tuyển dụng', href: '/tuyen-dung' },
      { label: 'Liên hệ', href: '/lien-he' },
    ],
    services: [
      { label: 'Mua bán', href: '/mua-ban' },
      { label: 'Cho thuê', href: '/cho-thue' },
      { label: 'Tư vấn đầu tư', href: '/lien-he' },
    ],
    resources: [
      { label: 'Tin tức', href: '/tin-tuc' },
      { label: 'Kiến thức BĐS', href: '/tin-tuc?category=kien-thuc' },
      { label: 'Chính sách', href: '/chinh-sach' },
    ],
  }

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-6">
          {/* Company Info */}
          <div className="lg:col-span-4">
            <h3 className="text-2xl font-bold text-white mb-4 whitespace-nowrap">INLANDV COMPANY LIMITED</h3>
            <p className="text-gray-400 mb-6">
              Sàn giao dịch bất động sản uy tín, đồng hành cùng bạn trong mọi quyết định đầu tư.
            </p>
            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-goldDark transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-goldDark transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Company Links */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-semibold mb-4">Công ty</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-goldLight transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div className="lg:col-span-3">
            <h4 className="text-white font-semibold mb-4">Dịch vụ</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-goldLight transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-3">
            <h4 className="text-white font-semibold mb-4">Liên hệ</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-goldLight flex-shrink-0 mt-1" />
                <span className="text-gray-400">
                  123 Đường ABC, Phường XYZ<br />
                  Quận 1, TP. Hồ Chí Minh
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-goldLight flex-shrink-0" />
                <a href="tel:1900123456" className="text-gray-400 hover:text-goldLight transition-colors">
                  1900 123 456
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-goldLight flex-shrink-0" />
                <a href="mailto:info@inlandrealestate.vn" className="text-gray-400 hover:text-goldLight transition-colors">
                  info@inlandrealestate.vn
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © 2025 Inlandv Real Estate. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <Link href="/dieu-khoan" className="text-gray-400 hover:text-goldLight transition-colors">
                Điều khoản sử dụng
              </Link>
              <Link href="/chinh-sach" className="text-gray-400 hover:text-goldLight transition-colors">
                Chính sách bảo mật
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
