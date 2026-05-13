import { v4 as uuidv4 } from 'uuid'

// In-memory storage
const users: Map<string, any> = new Map()
const notifications: Map<string, any[]> = new Map()

// Seed demo user (yamaxiar)
users.set('demo_user', {
  id: 'demo_user',
  username: 'yamaxiar',
  email: 'demo@spotplyma.com',
  password: null,
  isGuest: false,
  role: 'premium',
  requestCount: 0,
  profilePicture: null,
  settings: { theme: 'dark', notifications: true },
  createdAt: Date.now()
})

export function createUser(data: any) {
  const id = data.id || uuidv4()
  const user = { ...data, id, createdAt: Date.now() }
  users.set(id, user)
  return { ...user, password: undefined }
}

export function findUserByUsername(username: string) {
  for (const user of users.values()) {
    if (user.username === username) {
      return { ...user, password: undefined }
    }
  }
  return null
}

export function findUserById(id: string) {
  const user = users.get(id)
  return user ? { ...user, password: undefined } : null
}

export function updateUser(id: string, updates: any) {
  const user = users.get(id)
  if (!user) return null
  Object.assign(user, updates)
  users.set(id, user)
  return { ...user, password: undefined }
}

export function incrementRequestCount(userId: string) {
  const user = users.get(userId)
  if (user) user.requestCount++
}

export function addNotification(userId: string, notif: any) {
  if (!notifications.has(userId)) notifications.set(userId, [])
  const list = notifications.get(userId)!
  list.unshift({ id: uuidv4(), ...notif, read: false, createdAt: Date.now() })
  if (list.length > 50) list.pop()
}

export function getNotifications(userId: string) {
  return notifications.get(userId) || []
}

export function markNotificationRead(userId: string, notifId: string) {
  const list = notifications.get(userId)
  if (!list) return
  const notif = list.find(n => n.id === notifId)
  if (notif) notif.read = true
}

export function markAllNotificationsRead(userId: string) {
  const list = notifications.get(userId)
  if (!list) return
  list.forEach(n => n.read = true)
}
