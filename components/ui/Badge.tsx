import React from 'react'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'info'
  className?: string
}

export function Badge({ children, variant = 'primary', className = '' }: BadgeProps) {
  const variantClasses = {
    primary: 'bg-brand-secondary text-brand-primary font-semibold',
    secondary: 'bg-brand-accent text-brand-primary font-semibold',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-brand-accent text-brand-primary font-semibold',
    info: 'bg-brand-navy text-white',
  }

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${variantClasses[variant]} ${className}`}
    >
      {children}
    </span>
  )
}
