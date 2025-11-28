import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import BackToTopMount from '@/components/layout/BackToTopMount'
import { FullpageProvider } from '@/components/FullpageContext'
import { LayoutMeasurementsProvider } from '@/components/LayoutMeasurementsContext'

const inter = Inter({ 
  subsets: ['latin', 'vietnamese'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Inland Real Estate - Sàn Bất Động Sản Uy Tín',
  description: 'Sàn giao dịch bất động sản chuyên nghiệp, cung cấp các dự án mua bán và cho thuê bất động sản cao cấp tại Việt Nam.',
  keywords: 'bất động sản, mua bán nhà đất, cho thuê căn hộ, dự án bất động sản, inland real estate',
  authors: [{ name: 'Inland Real Estate' }],
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    url: 'https://inlandrealestate.vn',
    siteName: 'Inland Real Estate',
    title: 'Inland Real Estate - Sàn Bất Động Sản Uy Tín',
    description: 'Sàn giao dịch bất động sản chuyên nghiệp, cung cấp các dự án mua bán và cho thuê bất động sản cao cấp tại Việt Nam.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Inland Real Estate',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Inland Real Estate - Sàn Bất Động Sản Uy Tín',
    description: 'Sàn giao dịch bất động sản chuyên nghiệp',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi" className={inter.variable}>
      <body className={inter.className}>
        <LayoutMeasurementsProvider>
          <FullpageProvider>
            <Header />
            <main>
              {children}
            </main>
            <Footer />
            {/* Movetop: fullpage uses its own; normal scroll uses dedicated module */}
            <BackToTopMount />
          </FullpageProvider>
        </LayoutMeasurementsProvider>
      </body>
    </html>
  )
}
