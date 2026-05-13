import { motion } from 'framer-motion'
export default function Skeleton({ className }: { className?: string }) {
  return <motion.div animate={{ opacity: [0.5,1,0.5] }} transition={{ repeat: Infinity, duration: 1.5 }} className={`bg-white/10 rounded-lg ${className}`} />
}