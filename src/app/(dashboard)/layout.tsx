'use client'
import { useAuth } from '@/contexts/AuthContext'
import Navbar from '@/components/layout/Navbar'
import Sidebar from '@/components/layout/Sidebar'
import { motion } from 'framer-motion'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  return (
    <div className="min-h-screen">
      <Navbar user={user} />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6 md:p-8 lg:p-10 md:ml-64">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  )
}