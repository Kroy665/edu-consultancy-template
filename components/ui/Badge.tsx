import React from 'react'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'info'
  className?: string
}

export function Badge({ children, variant = 'primary', className = '' }: BadgeProps) {
  const variantClasses = {
    primary: 'bg-gradient-to-r from-brand-secondary to-brand-accent text-brand-primary font-semibold shadow-gold',
    secondary: 'bg-gradient-to-r from-brand-accent to-brand-secondary text-brand-primary font-semibold shadow-md',
    success: 'bg-gradient-to-r from-green-400 to-emerald-500 text-white shadow-lg',
    warning: 'bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow-lg',
    info: 'bg-gradient-to-r from-brand-navy to-blue-700 text-white shadow-navy',
  }

  return (
    <span
      className={`inline-flex items-center px-4 py-1.5 rounded-full text-sm font-semibold backdrop-blur-sm transform hover:scale-105 transition-transform duration-200 ${variantClasses[variant]} ${className}`}
    >
      {children}
    </span>
  )
}
