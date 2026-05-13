import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'

export default function WelcomeBanner({ user }: any) {
  const isGuest = user?.isGuest
  const left = 20 - (user?.requestCount || 0)
  return (
    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="glassmorphism p-6 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-yellow-400" />
            Welcome back, {user?.username}!
          </h2>
          <p className="text-gray-400">{isGuest ? `You have ${left} requests remaining. Upgrade to premium.` : 'Enjoy unlimited downloads!'}</p>
        </div>
        {isGuest && left <= 5 && (
          <button className="px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg">Upgrade Now</button>
        )}
      </div>
    </motion.div>
  )
}
