'use client'
import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { motion } from 'framer-motion'
import { Eye, EyeOff, LogIn, UserPlus, Sparkles } from 'lucide-react'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'

export default function LoginPage() {
  const { login, guestLogin } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({ username: '', password: '' })
  const [remember, setRemember] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await login(formData.username, formData.password, remember)
    } finally {
      setLoading(false)
    }
  }

  const handleGuest = async () => {
    setLoading(true)
    try {
      await guestLogin()
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="glassmorphism p-8 relative overflow-hidden">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 opacity-20 blur-xl" />
          <div className="text-center mb-8">
            <motion.div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 mb-4">
              <Sparkles className="w-10 h-10 text-white" />
            </motion.div>
            <h1 className="text-4xl font-bold gradient-text mb-2">Spotplyma</h1>
            <p className="text-gray-400">Premium Media Experience</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input label="Username" placeholder="yamaxiar" value={formData.username} onChange={(e) => setFormData({ ...formData, username: e.target.value })} required icon={<UserPlus className="w-4 h-4" />} />
            <Input label="Password" type={showPassword ? 'text' : 'password'} placeholder="••••••" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} required icon={showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />} onIconClick={() => setShowPassword(!showPassword)} />
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} className="w-4 h-4 rounded" />
                <span className="text-sm text-gray-400">Remember me</span>
              </label>
              <a href="#" className="text-sm text-cyan-400">Forgot password?</a>
            </div>
            <Button type="submit" loading={loading} className="w-full bg-gradient-to-r from-cyan-500 to-blue-600"><LogIn className="w-4 h-4 mr-2" /> Sign In</Button>
          </form>
          <div className="relative my-6"><div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10"></div></div><div className="relative flex justify-center text-xs"><span className="px-2 bg-black/50 text-gray-400">Or</span></div></div>
          <Button variant="outline" onClick={handleGuest} loading={loading} className="w-full border-cyan-500/50 text-cyan-400">Try as Guest</Button>
          <p className="text-center mt-6 text-sm text-gray-400">Don't have an account? <Link href="/register" className="text-cyan-400">Create Account</Link></p>
          <div className="mt-4 p-3 rounded-lg bg-white/5 border border-white/10 text-center"><p className="text-xs text-gray-500">Demo: yamaxiar / yama123</p></div>
        </div>
      </motion.div>
    </div>
  )
}