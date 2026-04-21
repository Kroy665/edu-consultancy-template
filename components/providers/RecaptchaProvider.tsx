'use client'

import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'
import { type ReactNode } from 'react'

interface RecaptchaProviderProps {
  children: ReactNode
}

export function RecaptchaProvider({ children }: RecaptchaProviderProps) {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY

  // If reCAPTCHA is not configured, just return children without provider
  if (!siteKey || siteKey.startsWith('6LeXXXX')) {
    return <>{children}</>
  }

  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={siteKey}
      scriptProps={{
        async: true,
        defer: true,
        appendTo: 'head',
      }}
    >
      {children}
    </GoogleReCaptchaProvider>
  )
}
