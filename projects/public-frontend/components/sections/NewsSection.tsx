'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Calendar, ArrowRight } from 'lucide-react'
import { api } from '@/lib/api'
import type { Post } from '@/lib/types'
import { formatDate, truncateText } from '@/lib/utils'

export default function NewsSection() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.getFeaturedPosts(3)
        if (response.success && response.data) {
          setPosts(response.data)
        }
      } catch (error) {
        console.error('Failed to fetch posts:', error)
        // Mock data for demo
        setPosts([
          {
            id: '1',
            title: 'Thị trường bất động sản TP.HCM quý 1/2024',
            slug: 'thi-truong-bat-dong-san-tphcm-quy-1-2024',
            category: 'Tin thị trường',
            thumbnail_url: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=800',
            content: 'Nội dung bài viết...',
            excerpt: 'Phân tích xu hướng và biến động giá bất động sản tại TP.HCM trong quý đầu năm 2024...',
            created_at: new Date().toISOString(),
          },
          {
            id: '2',
            title: 'Hướng dẫn thủ tục mua bán nhà đất',
            slug: 'huong-dan-thu-tuc-mua-ban-nha-dat',
            category: 'Kiến thức',
            thumbnail_url: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=800',
            content: 'Nội dung bài viết...',
            excerpt: 'Tổng hợp đầy đủ các bước và giấy tờ cần thiết khi thực hiện giao dịch bất động sản...',
            created_at: new Date(Date.now() - 86400000).toISOString(),
          },
          {
            id: '3',
            title: 'Top 10 dự án căn hộ đáng đầu tư năm 2024',
            slug: 'top-10-du-an-can-ho-dang-dau-tu-2024',
            category: 'Đầu tư',
            thumbnail_url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=800',
            content: 'Nội dung bài viết...',
            excerpt: 'Danh sách các dự án căn hộ có tiềm năng sinh lời cao và đáng chú ý trong năm nay...',
            created_at: new Date(Date.now() - 172800000).toISOString(),
          },
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  return (
    <section className="h-screen w-full flex items-center justify-center bg-gray-50 overflow-hidden">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8 md:pr-20 lg:pr-28 py-4 md:py-6 max-h-[90vh] flex flex-col justify-center">
        <div className="text-center mb-3 md:mb-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-2"
          >
            Tin Tức <span className="text-goldDark">Nổi Bật</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xs md:text-sm lg:text-base text-gray-600 mx-auto"
          >
            Cập nhật thông tin mới nhất về thị trường và xu hướng bất động sản
          </motion.p>
        </div>

        {loading ? (
          <div className="text-center py-10">
            <div className="inline-block w-8 h-8 border-4 border-goldDark border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {posts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              >
                <Link
                  href={`/tin-tuc/${post.slug}`}
                  className="group block bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className="relative h-56 overflow-hidden">
                    <div
                      className="w-full h-full bg-cover bg-center transform group-hover:scale-110 transition-transform duration-500"
                      style={{ backgroundImage: `url(${post.thumbnail_url})` }}
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-4 py-2 bg-goldDark text-white rounded-full text-xs font-medium">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center text-gray-500 text-sm mb-3">
                      <Calendar className="w-4 h-4 mr-2" />
                      {formatDate(post.created_at)}
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-goldDark transition-colors line-clamp-2">
                      {post.title}
                    </h3>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {post.excerpt || truncateText(post.content, 150)}
                    </p>

                    <div className="flex items-center text-goldDark text-sm font-medium group-hover:translate-x-2 transition-transform">
                      Đọc thêm
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link href="/tin-tuc" className="btn-primary group">
            Xem tất cả tin tức
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
