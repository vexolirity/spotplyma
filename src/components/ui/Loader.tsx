import { motion } from 'framer-motion'
export default function Loader() {
  return <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"><motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }} className="w-12 h-12 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full" /></div>
}