'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, CheckCircle, MapPin, Phone, Mail, Clock } from 'lucide-react'
import { api } from '@/lib/api'
import type { Lead } from '@/lib/types'
import { validateEmail, validatePhone } from '@/lib/utils'

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    consultationType: '',
    message: '',
    source: 'homepage' as const,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const consultationTypes = [
    { value: 'mua', label: 'Mua bất động sản' },
    { value: 'ban', label: 'Bán bất động sản' },
    { value: 'thue', label: 'Thuê bất động sản' },
    { value: 'cho-thue', label: 'Cho thuê bất động sản' },
    { value: 'khac', label: 'Dịch vụ khác' },
  ]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => {const newErrors = { ...prev }; delete newErrors[name]; return newErrors })
    }
  }

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Vui lòng nhập họ tên'
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Vui lòng nhập số điện thoại'
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Số điện thoại không hợp lệ'
    }

    if (formData.email.trim() && !validateEmail(formData.email)) {
      newErrors.email = 'Email không hợp lệ'
    }

    if (!formData.consultationType) {
      newErrors.consultationType = 'Vui lòng chọn nhu cầu tư vấn'
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Vui lòng nhập lời nhắn'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validate()) return

    setLoading(true)
    try {
      const leadData: Lead = {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        message: `[${consultationTypes.find(t => t.value === formData.consultationType)?.label}] ${formData.message}`,
        source: formData.source,
      }
      
      const response = await api.createLead(leadData)
      if (response.success) {
        setSuccess(true)
        setFormData({
          name: '',
          phone: '',
          email: '',
          consultationType: '',
          message: '',
          source: 'homepage',
        })
        setTimeout(() => setSuccess(false), 5000)
      }
    } catch (error) {
      console.error('Failed to submit form:', error)
      setErrors({ submit: 'Có lỗi xảy ra. Vui lòng thử lại sau.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/70 z-10" />
        <div 
          className="w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000)',
          }}
        />
      </div>

      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 md:pr-20 lg:pr-28 py-6 md:py-8 max-h-[90vh] flex flex-col justify-center">
        <div className="text-center mb-4 md:mb-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2"
          >
            Liên Hệ <span className="text-goldLight">Tư Vấn</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm md:text-base text-gray-300"
          >
            Để lại thông tin, chúng tôi sẽ liên hệ tư vấn miễn phí cho bạn
          </motion.p>
        </div>

        <div className="max-w-6xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
            {/* Contact Info - 2 columns */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="lg:col-span-2 text-white space-y-4"
            >
              <h3 className="text-xl md:text-2xl font-bold mb-4">Thông tin liên hệ</h3>
              
              <div className="space-y-3 text-sm md:text-base">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-goldLight flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold mb-1">Địa chỉ</p>
                    <p className="text-gray-300">
                      123 Đường ABC, Phường XYZ<br />
                      Quận 1, TP. Hồ Chí Minh
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-goldLight flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold mb-1">Điện thoại</p>
                    <a href="tel:1900123456" className="text-gray-300 hover:text-goldLight transition-colors">
                      1900 123 456
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-goldLight flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold mb-1">Email</p>
                    <a href="mailto:info@inlandrealestate.vn" className="text-gray-300 hover:text-goldLight transition-colors">
                      info@inlandrealestate.vn
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-goldLight flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold mb-1">Giờ làm việc</p>
                    <p className="text-gray-300">
                      Thứ 2 - Thứ 6: 8:00 - 18:00
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form - 3 columns */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="lg:col-span-3"
            >
              <form onSubmit={handleSubmit} className="bg-white/95 backdrop-blur-sm rounded-xl p-4 md:p-6 shadow-2xl max-h-[65vh] overflow-y-auto scrollbar-hide">
                {success && (
                  <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2 text-green-700 text-sm">
                    <CheckCircle className="w-4 h-4 flex-shrink-0" />
                    <p>Cảm ơn bạn! Chúng tôi sẽ liên hệ sớm nhất.</p>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                  {/* Họ và tên */}
                  <div>
                    <label htmlFor="name" className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
                      Họ và tên <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-goldDark focus:border-transparent transition-all ${
                        errors.name ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Nguyễn Văn A"
                    />
                    {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
                  </div>

                  {/* Số điện thoại */}
                  <div>
                    <label htmlFor="phone" className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
                      Số điện thoại <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-goldDark focus:border-transparent transition-all ${
                        errors.phone ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="0901234567"
                    />
                    {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
                  </div>

                  {/* Email (không bắt buộc) */}
                  <div>
                    <label htmlFor="email" className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-goldDark focus:border-transparent transition-all ${
                        errors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="email@example.com"
                    />
                    {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                  </div>

                  {/* Cần tư vấn */}
                  <div>
                    <label htmlFor="consultationType" className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
                      Cần tư vấn <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="consultationType"
                      name="consultationType"
                      value={formData.consultationType}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-goldDark focus:border-transparent transition-all ${
                        errors.consultationType ? 'border-red-500' : 'border-gray-300'
                      }`}
                    >
                      <option value="">-- Chọn nhu cầu --</option>
                      {consultationTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                    {errors.consultationType && <p className="mt-1 text-xs text-red-500">{errors.consultationType}</p>}
                  </div>
                </div>

                {/* Lời nhắn */}
                <div className="mt-3 md:mt-4">
                  <label htmlFor="message" className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
                    Lời nhắn <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={3}
                    className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-goldDark focus:border-transparent transition-all resize-none ${
                      errors.message ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Tôi muốn tìm hiểu về..."
                  />
                  {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message}</p>}
                </div>

                {errors.submit && (
                  <p className="mt-3 text-xs md:text-sm text-red-500">{errors.submit}</p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-4 px-6 py-2.5 bg-goldDark hover:bg-yellow-700 text-white text-sm font-medium rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Đang gửi...
                    </>
                  ) : (
                    <>
                      Gửi thông tin
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
