'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '@/contexts/AuthContext'
import SpotifySearch from '@/components/features/SpotifySearch'
import TikTokDownloader from '@/components/features/TikTokDownloader'
import YouTubeDownloader from '@/components/features/YouTubeDownloader'
import AutoDetectLink from '@/components/features/AutoDetectLink'
import StatsCard from '@/components/dashboard/StatsCard'
import WelcomeBanner from '@/components/dashboard/WelcomeBanner'
import { Music, Video, Youtube, Link2, Activity, Download } from 'lucide-react'

export default function DashboardPage() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('spotify')
  const tabs = [
    { id: 'spotify', label: 'Spotify', icon: Music, color: 'from-blue-500 to-cyan-500' },
    { id: 'tiktok', label: 'TikTok', icon: Video, color: 'from-pink-500 to-red-500' },
    { id: 'youtube', label: 'YouTube', icon: Youtube, color: 'from-red-500 to-orange-500' },
    { id: 'autodetect', label: 'Auto Detect', icon: Link2, color: 'from-purple-500 to-indigo-500' },
  ]
  const stats = [
    { label: 'Downloads Today', value: '24', icon: Download, change: '+12%' },
    { label: 'Active Sessions', value: '3', icon: Activity, change: '+2' },
    { label: 'API Calls Left', value: user?.isGuest ? 20 - (user.requestCount || 0) : 'Unlimited', icon: Activity, change: user?.isGuest ? `${20 - (user.requestCount || 0)} left` : 'Premium' },
  ]

  return (
    <div className="space-y-8">
      <WelcomeBanner user={user} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, idx) => <StatsCard key={idx} {...stat} />)}
      </div>
      <div className="glassmorphism p-6">
        <div className="flex flex-wrap gap-2 border-b border-white/10 pb-4 mb-6">
          {tabs.map(tab => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${activeTab === tab.id ? `bg-gradient-to-r ${tab.color} text-white shadow-lg` : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            )
          })}
        </div>
        <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
          {activeTab === 'spotify' && <SpotifySearch colorGradient={tabs.find(t => t.id === 'spotify')?.color || ''} />}
          {activeTab === 'tiktok' && <TikTokDownloader colorGradient={tabs.find(t => t.id === 'tiktok')?.color || ''} />}
          {activeTab === 'youtube' && <YouTubeDownloader colorGradient={tabs.find(t => t.id === 'youtube')?.color || ''} />}
          {activeTab === 'autodetect' && <AutoDetectLink colorGradient={tabs.find(t => t.id === 'autodetect')?.color || ''} />}
        </motion.div>
      </div>
    </div>
  )
}