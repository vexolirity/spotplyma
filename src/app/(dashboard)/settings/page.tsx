'use client'
import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useTheme } from '@/contexts/ThemeContext'
import { Bell, Shield, Volume2 } from 'lucide-react'
import Button from '@/components/ui/Button'
import toast from 'react-hot-toast'

export default function SettingsPage() {
  const { user, updateProfile } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const [notifications, setNotifications] = useState(user?.settings?.notifications ?? true)
  const [soundEffects, setSoundEffects] = useState(true)

  const handleSave = async () => {
    try {
      await updateProfile({ settings: { notifications, theme, language: 'en' } })
      toast.success('Settings saved')
    } catch {
      toast.error('Failed')
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold gradient-text">Settings</h1>
      <div className="space-y-6">
        <div className="glassmorphism p-6"><h2 className="text-xl font-semibold mb-4 flex items-center gap-2"><Shield className="w-5 h-5" /> Appearance</h2><div className="flex justify-between items-center"><span>Dark Mode</span><button onClick={toggleTheme} className="relative w-14 h-8 rounded-full bg-white/10"><div className={`absolute top-1 left-1 w-6 h-6 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-transform ${theme === 'light' ? 'translate-x-6' : ''}`} /></button></div></div>
        <div className="glassmorphism p-6"><h2 className="text-xl font-semibold mb-4 flex items-center gap-2"><Bell className="w-5 h-5" /> Notifications</h2><div className="flex justify-between items-center"><span>Enable push notifications</span><button onClick={() => setNotifications(!notifications)} className={`px-4 py-2 rounded-lg ${notifications ? 'bg-cyan-500' : 'bg-gray-600'}`}>{notifications ? 'ON' : 'OFF'}</button></div></div>
        <div className="glassmorphism p-6"><h2 className="text-xl font-semibold mb-4 flex items-center gap-2"><Volume2 className="w-5 h-5" /> Sound</h2><div className="flex justify-between items-center"><span>Sound effects</span><button onClick={() => setSoundEffects(!soundEffects)} className={`px-4 py-2 rounded-lg ${soundEffects ? 'bg-cyan-500' : 'bg-gray-600'}`}>{soundEffects ? 'ON' : 'OFF'}</button></div></div>
        <Button onClick={handleSave} className="w-full">Save All Settings</Button>
      </div>
    </div>
  )
}