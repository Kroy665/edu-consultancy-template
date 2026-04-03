'use client'

import React, { forwardRef } from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label?: string
  error?: string
  multiline?: boolean
  rows?: number
}

export const Input = forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps>(
  ({ label, error, multiline = false, rows = 4, className = '', ...props }, ref) => {
    const baseClasses =
      'w-full px-5 py-3.5 bg-white/50 border-2 border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-secondary/50 focus:border-brand-secondary transition-all duration-300 hover:border-brand-secondary/30 placeholder:text-neutral-400'

    const errorClasses = error
      ? 'border-red-400 focus:ring-red-400 focus:border-red-400'
      : ''

    const inputClasses = `${baseClasses} ${errorClasses} ${className}`

    return (
      <div className="w-full group">
        {label && (
          <label className="block text-sm font-semibold text-brand-navy mb-2 group-hover:text-brand-secondary transition-colors duration-200">
            {label}
            {props.required && <span className="text-brand-secondary ml-1">*</span>}
          </label>
        )}
        {multiline ? (
          <textarea
            ref={ref as React.Ref<HTMLTextAreaElement>}
            rows={rows}
            className={inputClasses}
            {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
          />
        ) : (
          <input
            ref={ref as React.Ref<HTMLInputElement>}
            className={inputClasses}
            {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
          />
        )}
        {error && <p className="mt-2 text-sm text-red-600 font-medium flex items-center gap-1">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>}
      </div>
    )
  }
)

Input.displayName = 'Input'
