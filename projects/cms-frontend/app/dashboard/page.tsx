'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { api } from '@/lib/api'

export default function DashboardPage() {
  const [stats, setStats] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const loadStats = async () => {
      try {
        const token = localStorage.getItem('auth_token')
        if (!token) {
          router.push('/login')
          return
        }

        const response = await api.getDashboardStats()
        if (response.success) {
          setStats(response.data)
        }
      } catch (error) {
        console.error('Failed to load stats:', error)
        router.push('/login')
      } finally {
        setLoading(false)
      }
    }

    loadStats()
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>
        
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-sm font-medium text-gray-500">Projects</h3>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {stats.counts?.projects || 0}
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-sm font-medium text-gray-500">Posts</h3>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {stats.counts?.posts || 0}
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-sm font-medium text-gray-500">Leads</h3>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {stats.counts?.leads || 0}
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-sm font-medium text-gray-500">Recent Leads</h3>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {stats.recentLeads || 0}
              </p>
            </div>
          </div>
        )}

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="space-y-2">
            <a href="/projects" className="block text-primary-600 hover:text-primary-700">
              Quản lý Dự án
            </a>
            <a href="/leads" className="block text-primary-600 hover:text-primary-700">
              Quản lý Leads
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

