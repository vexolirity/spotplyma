import { forwardRef } from 'react'
import { Loader2 } from 'lucide-react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  children: React.ReactNode
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', loading, children, className, ...props }, ref) => {
    const base = 'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 disabled:opacity-50'
    const variants = {
      primary: 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg hover:shadow-cyan-500/25',
      secondary: 'bg-white/10 text-white hover:bg-white/20',
      outline: 'border border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10',
      ghost: 'text-gray-400 hover:text-white hover:bg-white/10'
    }
    const sizes = { sm: 'px-3 py-1.5 text-sm', md: 'px-4 py-2 text-base', lg: 'px-6 py-3 text-lg' }
    return (
      <button ref={ref} className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} disabled={loading} {...props}>
        {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
        {children}
      </button>
    )
  }
)
Button.displayName = 'Button'

// ✅ Tambahkan default export
export default Button
