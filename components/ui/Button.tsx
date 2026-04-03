import React from 'react'
import Link from 'next/link'

interface ButtonProps {
  children: React.ReactNode
  href?: string
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  fullWidth?: boolean
}

export function Button({
  children,
  href,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  type = 'button',
  disabled = false,
  fullWidth = false,
}: ButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group'

  const variantClasses = {
    primary: 'bg-gradient-to-r from-brand-secondary to-brand-accent text-brand-primary hover:shadow-gold hover:scale-105 focus:ring-brand-secondary transform active:scale-95',
    secondary: 'bg-gradient-to-r from-brand-navy to-brand-navy/90 text-brand-accent hover:shadow-navy hover:scale-105 focus:ring-brand-navy transform active:scale-95',
    outline: 'border-2 border-brand-secondary text-brand-secondary hover:bg-brand-secondary hover:text-brand-primary hover:shadow-lg focus:ring-brand-secondary transform hover:scale-105 active:scale-95',
    ghost: 'text-brand-secondary hover:bg-brand-light/50 focus:ring-brand-secondary backdrop-blur-sm',
  }

  const sizeClasses = {
    sm: 'px-5 py-2.5 text-sm rounded-xl',
    md: 'px-7 py-3.5 text-base rounded-xl',
    lg: 'px-9 py-4 text-lg rounded-2xl',
  }

  const widthClass = fullWidth ? 'w-full' : ''

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${className}`

  if (href) {
    return (
      <Link href={href}
        className={classes}
      >
        <span className="relative z-10">{children}</span>
        {variant === 'primary' && (
          <span className="absolute inset-0 -z-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700 ease-in-out" />
        )}
      </Link>
    )
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
    >
      <span className="relative z-10">{children}</span>
      {variant === 'primary' && (
        <span className="absolute inset-0 -z-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700 ease-in-out" />
      )}
    </button>
  )
}
