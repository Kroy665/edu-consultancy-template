import type { Metadata } from 'next'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { WhatsAppButton } from '@/components/layout/WhatsAppButton'
import { GoogleAnalytics } from '@next/third-parties/google'
import { getSiteSettings, DEFAULT_SITE_SETTINGS } from '@/lib/getSiteSettings'
import '@/app/globals.css'

export async function generateMetadata(): Promise<Metadata> {
  const siteSettings = await getSiteSettings()
  const settings = siteSettings || DEFAULT_SITE_SETTINGS

  const siteName = settings.siteName
  const description = siteSettings?.seo?.metaDescription || DEFAULT_SITE_SETTINGS.seo.metaDescription
  const keywords = siteSettings?.seo?.keywords?.map(k => k.keyword).filter((k): k is string => !!k) ||
    DEFAULT_SITE_SETTINGS.seo.keywords.map(k => k.keyword)

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SERVER_URL || 'https://nibedita.in'),
    title: {
      default: `${siteName} | Educational Consultancy Dhupguri`,
      template: `%s | ${siteName}`,
    },
    description,
    keywords,
    openGraph: {
      type: 'website',
      locale: 'en_IN',
      url: process.env.NEXT_PUBLIC_SERVER_URL || 'https://nibedita.in',
      siteName,
      title: `${siteName} | Educational Consultancy Dhupguri`,
      description,
    },
  }
}

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Fetch site settings from CMS
  const siteSettings = await getSiteSettings()
  const settings = siteSettings || DEFAULT_SITE_SETTINGS

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: siteSettings?.siteName || 'Nibedita Institute and Management',
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
    telephone: siteSettings?.contactInfo?.phone || '+91 99999 99999',
    email: siteSettings?.contactInfo?.email || 'info@nibedita.in',
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
        <Navbar siteName={settings.siteName} siteLogo={siteSettings?.siteLogo} />
        <main className="min-h-screen">{children}</main>
        <Footer siteSettings={siteSettings} />
        <WhatsAppButton
          whatsappNumber={siteSettings?.contactInfo?.whatsapp}
          defaultMessage={siteSettings?.contactInfo?.whatsappMessage}
        />
        {(siteSettings?.seo?.googleAnalyticsId || process.env.NEXT_PUBLIC_GA_ID) &&
         (siteSettings?.seo?.googleAnalyticsId !== 'G-XXXXXXXXXX' && process.env.NEXT_PUBLIC_GA_ID !== 'G-XXXXXXXXXX') && (
          <GoogleAnalytics gaId={siteSettings?.seo?.googleAnalyticsId || process.env.NEXT_PUBLIC_GA_ID!} />
        )}
      </body>
    </html>
  )
}
