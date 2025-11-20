'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown } from 'lucide-react'
import { usePathname } from 'next/navigation'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const pathname = usePathname()

  // Determine if current route should have white background
  const isProductRoute = pathname?.startsWith('/san-pham') || pathname === '/mua-ban' || pathname === '/cho-thue' || pathname?.startsWith('/tin-tuc') || pathname?.startsWith('/tuyen-dung') || pathname?.startsWith('/chinh-sach-nhan-su')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }
    handleScroll() // initialize immediately
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const menuItems = [
    { label: 'Trang chủ', href: '/' },
    { label: 'Giới thiệu', href: '/gioi-thieu' },
    {
      label: 'Mua bán',
      href: '/mua-ban',
      submenu: [
        { label: 'Căn hộ', href: '/mua-ban?type=can-ho' },
        { label: 'Nhà phố', href: '/mua-ban?type=nha-pho' },
        { label: 'Biệt thự', href: '/mua-ban?type=biet-thu' },
        { label: 'Đất nền', href: '/mua-ban?type=dat-nen' },
      ],
    },
    {
      label: 'Cho thuê',
      href: '/cho-thue',
      submenu: [
        { label: 'Căn hộ', href: '/cho-thue?type=can-ho' },
        { label: 'Nhà phố', href: '/cho-thue?type=nha-pho' },
        { label: 'Văn phòng', href: '/cho-thue?type=van-phong' },
      ],
    },
    { label: 'Tin tức', href: '/tin-tuc' },
    { label: 'Tuyển dụng', href: '/tuyen-dung' },
    { label: 'Liên hệ', href: '/lien-he' },
  ]

  return (
    <>
      <motion.header
        initial={{ y: 0 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isProductRoute || isScrolled
            ? 'bg-white shadow-md py-4'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center h-full">
              <img 
                src="/logo.png" 
                alt="INLAND Logo" 
                className="h-12 w-auto object-contain"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {menuItems.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => item.submenu && setActiveDropdown(item.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={item.href}
                    className={`flex items-center gap-1 text-sm font-medium transition-colors duration-300 hover:text-goldDark ${
                      isProductRoute || isScrolled ? 'text-gray-900' : 'text-white'
                    }`}
                  >
                    {item.label}
                    {item.submenu && (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </Link>

                  {/* Dropdown */}
                  {item.submenu && activeDropdown === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2"
                    >
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.label}
                          href={subItem.href}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-goldDark transition-colors"
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </div>
              ))}
            </nav>

            {/* CTA Button */}
            <Link
              href="/lien-he"
              className={`hidden lg:block px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                isProductRoute || isScrolled
                  ? 'bg-goldDark text-white hover:bg-yellow-700'
                  : 'bg-white text-gray-900 hover:bg-gray-100'
              }`}
            >
              Liên hệ tư vấn
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden p-2 transition-colors duration-300 ${
                isProductRoute || isScrolled ? 'text-gray-900' : 'text-white'
              }`}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div className="absolute inset-0 bg-black/50" onClick={() => setIsMobileMenuOpen(false)} />
            <div className="absolute right-0 top-0 bottom-0 w-80 bg-white shadow-xl overflow-y-auto">
              <div className="p-6 pt-24">
                <nav className="flex flex-col gap-4">
                  {menuItems.map((item) => (
                    <div key={item.label}>
                      <Link
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block text-lg font-medium text-gray-900 hover:text-goldDark transition-colors"
                      >
                        {item.label}
                      </Link>
                      {item.submenu && (
                        <div className="ml-4 mt-2 flex flex-col gap-2">
                          {item.submenu.map((subItem) => (
                            <Link
                              key={subItem.label}
                              href={subItem.href}
                              onClick={() => setIsMobileMenuOpen(false)}
                              className="text-sm text-gray-600 hover:text-goldDark transition-colors"
                            >
                              {subItem.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </nav>
                <Link
                  href="/lien-he"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="mt-8 block w-full text-center px-6 py-3 bg-goldDark text-white rounded-full font-medium hover:bg-yellow-700 transition-colors"
                >
                  Liên hệ tư vấn
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
