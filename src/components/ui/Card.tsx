import { forwardRef } from 'react'
import { motion } from 'framer-motion'
export const Card = forwardRef<HTMLDivElement, any>(({ children, className, glow, hover, ...props }, ref) => (
  <motion.div ref={ref} whileHover={hover ? { y: -5 } : {}} className={`glassmorphism p-6 ${glow ? 'neon-border' : ''} ${className}`} {...props}>{children}</motion.div>
))
Card.displayName = 'Card'