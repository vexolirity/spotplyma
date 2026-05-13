import { forwardRef } from 'react'
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string; error?: string; icon?: React.ReactNode; onIconClick?: () => void
}
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, onIconClick, className, ...props }, ref) => (
    <div className="w-full">
      {label && <label className="block text-sm font-medium text-gray-300 mb-1">{label}</label>}
      <div className="relative">
        <input ref={ref} className={`w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-all ${icon ? 'pl-10' : ''} ${className}`} {...props} />
        {icon && <button type="button" onClick={onIconClick} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">{icon}</button>}
      </div>
      {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
    </div>
  )
)
Input.displayName = 'Input'