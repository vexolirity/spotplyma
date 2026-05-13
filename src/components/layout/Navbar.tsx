'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import { Menu, X, Bell, LogOut, Sparkles } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navbar({ user }: any) {
  const { logout } = useAuth()
  const [mobileOpen, setMobileOpen] = useState(false)
  return (
    <nav className="sticky top-0 z-50 glassmorphism border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/dashboard" className="flex items-center gap-2"><Sparkles className="w-6 h-6 text-cyan-400" /><span className="font-bold text-xl gradient-text">Spotplyma</span></Link>
          <div className="hidden md:flex items-center gap-6"><Link href="/dashboard" className="text-gray-300 hover:text-white">Home</Link><Link href="/profile" className="text-gray-300 hover:text-white">Profile</Link><Link href="/settings" className="text-gray-300 hover:text-white">Settings</Link></div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 rounded-lg hover:bg-white/10"><Bell className="w-5 h-5" /></button>
            <div className="hidden md:flex items-center gap-3"><span className="text-sm text-gray-300">Hi, {user?.username}</span><button onClick={logout} className="p-2 rounded-lg hover:bg-white/10"><LogOut className="w-5 h-5" /></button></div>
            <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 rounded-lg hover:bg-white/10">{mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}</button>
          </div>
        </div>
      </div>
      <AnimatePresence>{mobileOpen && <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="md:hidden border-t border-white/10 bg-black/90"><div className="px-4 py-4 space-y-3"><Link href="/dashboard" className="block text-gray-300">Home</Link><Link href="/profile" className="block text-gray-300">Profile</Link><Link href="/settings" className="block text-gray-300">Settings</Link><button onClick={logout} className="block w-full text-left text-red-400">Logout</button></div></motion.div>}</AnimatePresence>
    </nav>
  )
}