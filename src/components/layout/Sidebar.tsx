'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, User, Settings, Music, Video, Youtube, Link2 } from 'lucide-react'

const menuItems = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Profile', href: '/profile', icon: User },
  { name: 'Settings', href: '/settings', icon: Settings },
  { name: 'Spotify', href: '/dashboard?tab=spotify', icon: Music },
  { name: 'TikTok', href: '/dashboard?tab=tiktok', icon: Video },
  { name: 'YouTube', href: '/dashboard?tab=youtube', icon: Youtube },
  { name: 'Auto Detect', href: '/dashboard?tab=autodetect', icon: Link2 },
]

export default function Sidebar() {
  const pathname = usePathname()
  return (
    <aside className="hidden md:block w-64 glassmorphism border-r border-white/10 min-h-[calc(100vh-64px)] fixed">
      <div className="p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || (pathname === '/dashboard' && item.href.includes('tab='))
          return <Link key={item.name} href={item.href} className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all ${isActive ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400 border-l-2 border-cyan-400' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}><Icon className="w-5 h-5" /><span>{item.name}</span></Link>
        })}
      </div>
    </aside>
  )
}