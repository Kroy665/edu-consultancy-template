import type { Metadata } from 'next'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { WhatsAppButton } from '@/components/layout/WhatsAppButton'
import { GoogleAnalytics } from '@next/third-parties/google'
import '@/app/globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SERVER_URL || 'https://nibedita.in'),
  title: {
    default: 'Nibedita Institute & Management | Educational Consultancy Dhupguri',
    template: '%s | Nibedita Institute',
  },
  description:
    'Leading educational consultancy in Dhupguri offering admission guidance for Nursing, Engineering, Pharmacy, MBA and more. Expert career counselling for students in West Bengal.',
  keywords: [
    'educational consultancy Dhupguri',
    'admission guidance West Bengal',
    'nursing admission',
    'engineering admission',
    'career counselling Jalpaiguri',
    'Nibedita Institute',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: process.env.NEXT_PUBLIC_SERVER_URL || 'https://nibedita.in',
    siteName: 'Nibedita Institute & Management',
    title: 'Nibedita Institute & Management | Educational Consultancy Dhupguri',
    description:
      'Leading educational consultancy in Dhupguri offering admission guidance for Nursing, Engineering, Pharmacy, MBA and more.',
  },
}

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'Nibedita Institute and Management',
    description: 'Educational consultancy offering admission guidance in Dhupguri, West Bengal',
    url: process.env.NEXT_PUBLIC_SERVER_URL || 'https://nibedita.in',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Dhupguri',
      addressLocality: 'Jalpaiguri',
      addressRegion: 'West Bengal',
      postalCode: '735210',
      addressCountry: 'IN',
    },
    telephone: `+${process.env.NEXT_PUBLIC_PHONE}`,
    email: 'info@nibedita.in',
  }

  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <WhatsAppButton />
        {process.env.NEXT_PUBLIC_GA_ID && process.env.NEXT_PUBLIC_GA_ID !== 'G-XXXXXXXXXX' && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        )}
      </body>
    </html>
  )
}
