"use client"

import { notFound } from 'next/navigation'
import { motion } from 'framer-motion'
import { Calendar, User } from 'lucide-react'
import NewsFloatingButtons from '@/components/news/NewsFloatingButtons'
import RelatedNews from '@/components/news/RelatedNews'
import { newsArticles, newsCategoryLabels } from '@/lib/newsData'

export default function NewsDetailPage({ params }: { params: { slug: string } }) {
  const article = newsArticles.find(a => a.slug === params.slug)

  if (!article) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50 relative">
      <NewsFloatingButtons />

      {/* Spacer for fixed header */}
      <div className="h-20" />

      {/* Hero Image */}
      <div className="relative h-[400px] md:h-[500px] w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ backgroundImage: `url(${article.thumbnail})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-20">
        <motion.article
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 isolate"
        >
          {/* Category Badge */}
          <div className="mb-6">
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold bg-goldDark text-white">
              {newsCategoryLabels[article.category]}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {article.title}
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap gap-6 text-sm text-gray-600 mb-8 pb-8 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {new Date(article.date).toLocaleDateString('vi-VN', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
            {article.author && (
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                {article.author}
              </div>
            )}
          </div>

          {/* Content */}
          <div
            className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3 prose-p:text-gray-700 prose-p:leading-relaxed prose-li:text-gray-700 prose-a:text-goldDark prose-a:no-underline hover:prose-a:underline"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </motion.article>

        {/* Related News */}
        <RelatedNews articles={newsArticles} currentId={article.id} />

        <div className="h-16" />
      </div>
    </div>
  )
}
