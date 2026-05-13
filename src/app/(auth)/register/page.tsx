'use client'
import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { motion } from 'framer-motion'
import { Eye, EyeOff, UserPlus, Mail, Lock, Sparkles } from 'lucide-react'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'

export default function RegisterPage() {
  const { register } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({ username: '', email: '', password: '' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await register(formData.username, formData.email, formData.password)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="glassmorphism p-8">
          <div className="text-center mb-8">
            <Sparkles className="w-12 h-12 text-cyan-400 mx-auto mb-2" />
            <h1 className="text-3xl font-bold gradient-text">Create Account</h1>
            <p className="text-gray-400">Join Spotplyma Premium</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input label="Username" placeholder="Choose a username" value={formData.username} onChange={(e) => setFormData({ ...formData, username: e.target.value })} required icon={<UserPlus className="w-4 h-4" />} />
            <Input label="Email" type="email" placeholder="your@email.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required icon={<Mail className="w-4 h-4" />} />
            <Input label="Password" type={showPassword ? 'text' : 'password'} placeholder="Create a strong password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} required icon={showPassword ? <EyeOff className="w-4 h-4" /> : <Lock className="w-4 h-4" />} onIconClick={() => setShowPassword(!showPassword)} />
            <Button type="submit" loading={loading} className="w-full bg-gradient-to-r from-cyan-500 to-blue-600"><UserPlus className="w-4 h-4 mr-2" /> Sign Up</Button>
          </form>
          <p className="text-center mt-6 text-sm text-gray-400">Already have an account? <Link href="/login" className="text-cyan-400">Sign In</Link></p>
        </div>
      </motion.div>
    </div>
  )
}