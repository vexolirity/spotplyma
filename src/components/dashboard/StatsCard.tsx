import { motion } from 'framer-motion'
import { TrendingUp } from 'lucide-react'

export default function StatsCard({ label, value, icon: Icon, change }: any) {
  return (
    <motion.div whileHover={{ scale: 1.02 }} className="glassmorphism p-6">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-400 text-sm">{label}</p>
          <p className="text-3xl font-bold mt-2">{value}</p>
          {change && (
            <div className="flex items-center gap-1 mt-2 text-xs text-green-400">
              <TrendingUp className="w-3 h-3" />
              <span>{change}</span>
            </div>
          )}
        </div>
        <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20">
          <Icon className="w-6 h-6 text-cyan-400" />
        </div>
      </div>
    </motion.div>
  )
}
