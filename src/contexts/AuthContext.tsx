'use client'
import React, { createContext, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import apiClient from '@/lib/apiClient'

interface User {
  id: string
  username: string
  email?: string
  isGuest: boolean
  profilePicture?: string
  role: string
  requestCount: number
  settings?: any
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (username: string, password: string, remember?: boolean) => Promise<void>
  register: (username: string, email: string, password: string) => Promise<void>
  guestLogin: () => Promise<void>
  logout: () => Promise<void>
  updateProfile: (data: Partial<User>) => Promise<void>
  uploadProfilePicture: (file: File) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    const token = localStorage.getItem('token')
    if (!token) {
      setIsLoading(false)
      return
    }
    try {
      const res = await apiClient.get('/auth/me')
      setUser(res.data)
    } catch {
      localStorage.removeItem('token')
    } finally {
      setIsLoading(false)
    }
  }

  const login = async (username: string, password: string, remember = false) => {
    const res = await apiClient.post('/auth/login', { username, password, remember })
    const { token, user } = res.data
    localStorage.setItem('token', token)
    setUser(user)
    toast.success('Welcome back!')
    router.push('/dashboard')
  }

  const register = async (username: string, email: string, password: string) => {
    const res = await apiClient.post('/auth/register', { username, email, password })
    const { token, user } = res.data
    localStorage.setItem('token', token)
    setUser(user)
    toast.success('Account created!')
    router.push('/dashboard')
  }

  const guestLogin = async () => {
    const res = await apiClient.post('/auth/guest')
    const { token, user } = res.data
    localStorage.setItem('token', token)
    setUser(user)
    toast.success('Guest mode activated')
    router.push('/dashboard')
  }

  const logout = async () => {
    await apiClient.post('/auth/logout')
    localStorage.removeItem('token')
    setUser(null)
    router.push('/login')
  }

  const updateProfile = async (data: Partial<User>) => {
    const res = await apiClient.put('/auth/me', data)
    setUser(res.data)
    toast.success('Profile updated')
  }

  const uploadProfilePicture = async (file: File) => {
    const formData = new FormData()
    formData.append('image', file)
    const res = await apiClient.post('/upload', formData)
    await updateProfile({ profilePicture: res.data.url })
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, guestLogin, logout, updateProfile, uploadProfilePicture }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext }