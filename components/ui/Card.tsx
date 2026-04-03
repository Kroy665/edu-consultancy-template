import React from 'react'

interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  padding?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'gradient' | 'glass'
}

export function Card({
  children,
  className = '',
  hover = false,
  padding = 'md',
  variant = 'default'
}: CardProps) {
  const paddingClasses = {
    sm: 'p-5',
    md: 'p-7',
    lg: 'p-9',
  }

  const hoverClass = hover
    ? 'hover:shadow-xl hover:-translate-y-2 transition-all duration-300 hover:border-brand-secondary/30'
    : 'transition-all duration-300'

  const variantClasses = {
    default: 'bg-white border border-neutral-200/60 shadow-lg',
    gradient: 'bg-gradient-to-br from-white to-brand-light/30 border border-brand-secondary/20 shadow-xl',
    glass: 'glass backdrop-blur-lg border-white/20 shadow-2xl',
  }

  return (
    <div
      className={`rounded-2xl ${paddingClasses[padding]} ${hoverClass} ${variantClasses[variant]} ${className}`}
    >
      {children}
    </div>
  )
}
