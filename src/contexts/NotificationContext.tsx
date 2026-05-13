'use client'
import React, { createContext, useContext, useState, useEffect } from 'react'
import apiClient from '@/lib/apiClient'
import toast from 'react-hot-toast'

interface Notification {
  id: string
  title: string
  message: string
  type: 'info' | 'success' | 'warning' | 'error'
  read: boolean
  createdAt: number
}

interface NotificationContextType {
  notifications: Notification[]
  unreadCount: number
  fetchNotifications: () => Promise<void>
  markAsRead: (id: string) => Promise<void>
  markAllAsRead: () => Promise<void>
  addNotification: (title: string, message: string, type?: Notification['type']) => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)

  const fetchNotifications = async () => {
    try {
      const res = await apiClient.get('/notifications')
      setNotifications(res.data)
      setUnreadCount(res.data.filter((n: Notification) => !n.read).length)
    } catch (error) {
      console.error('Failed to fetch notifications')
    }
  }

  const markAsRead = async (id: string) => {
    try {
      await apiClient.patch(`/notifications/${id}/read`)
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n))
      setUnreadCount(prev => prev - 1)
    } catch (error) {
      console.error('Failed to mark as read')
    }
  }

  const markAllAsRead = async () => {
    try {
      await apiClient.post('/notifications/read-all')
      setNotifications(prev => prev.map(n => ({ ...n, read: true })))
      setUnreadCount(0)
    } catch (error) {
      console.error('Failed to mark all as read')
    }
  }

  const addNotification = (title: string, message: string, type: Notification['type'] = 'info') => {
    toast(message, { icon: type === 'success' ? '✅' : type === 'error' ? '❌' : '🔔' })
    apiClient.post('/notifications', { title, message, type }).then(() => fetchNotifications())
  }

  useEffect(() => {
    fetchNotifications()
    const interval = setInterval(fetchNotifications, 30000)
    return () => clearInterval(interval)
  }, [])

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        fetchNotifications,
        markAsRead,
        markAllAsRead,
        addNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  )
}

export const useNotification = () => {
  const context = useContext(NotificationContext)
  if (!context) throw new Error('useNotification must be used within NotificationProvider')
  return context
}
