'use client'
import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { motion } from 'framer-motion'
import { User, Mail, Calendar, Camera } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import toast from 'react-hot-toast'

export default function ProfilePage() {
  const { user, updateProfile, uploadProfilePicture } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({ username: user?.username || '', email: user?.email || '' })
  const [uploading, setUploading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await updateProfile(formData)
      setIsEditing(false)
      toast.success('Profile updated')
    } catch {
      toast.error('Update failed')
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      await uploadProfilePicture(file)
      toast.success('Photo updated')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold gradient-text">Profile Settings</h1>
      <div className="glassmorphism p-8 space-y-8">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="w-32 h-32 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 p-1">
              <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center overflow-hidden">
                {user?.profilePicture ? <img src={user.profilePicture} alt="Profile" className="w-full h-full object-cover" /> : <User className="w-16 h-16 text-gray-400" />}
              </div>
            </div>
            <label className="absolute bottom-0 right-0 p-2 bg-cyan-500 rounded-full cursor-pointer hover:bg-cyan-600">
              <Camera className="w-4 h-4" />
              <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={uploading} />
            </label>
          </div>
          {uploading && <p className="text-sm text-cyan-400">Uploading...</p>}
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input label="Username" value={formData.username} onChange={(e) => setFormData({ ...formData, username: e.target.value })} disabled={!isEditing} icon={<User className="w-4 h-4" />} />
          <Input label="Email" type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} disabled={!isEditing} icon={<Mail className="w-4 h-4" />} />
          <div className="flex items-center gap-4 text-gray-400 text-sm"><Calendar className="w-4 h-4" /><span>Member since: {new Date().toLocaleDateString()}</span></div>
          <div className="flex gap-3">
            {!isEditing ? <Button type="button" onClick={() => setIsEditing(true)}>Edit Profile</Button> : <><Button type="submit">Save Changes</Button><Button type="button" variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button></>}
          </div>
        </form>
      </div>
    </div>
  )
}
