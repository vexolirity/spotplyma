'use client'
import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
export default function Modal({ isOpen, onClose, title, children }: any) {
  useEffect(() => { document.body.style.overflow = isOpen ? 'hidden' : 'unset' }, [isOpen])
  return <AnimatePresence>{isOpen && <><motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50" onClick={onClose} /><motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md"><div className="glassmorphism p-6"><div className="flex justify-between items-center mb-4"><h2 className="text-xl font-bold">{title}</h2><button onClick={onClose}><X className="w-5 h-5" /></button></div>{children}</div></motion.div></>}</AnimatePresence>
}