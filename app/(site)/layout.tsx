import type { Metadata } from 'next'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { WhatsAppButton } from '@/components/layout/WhatsAppButton'
import { RecaptchaProvider } from '@/components/providers/RecaptchaProvider'
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
    metadataBase: new URL(process.env.NEXT_PUBLIC_SERVER_URL || 'https://yourdomain.com'),
    title: {
      default: `${siteName} | Educational Consultancy`,
      template: `%s | ${siteName}`,
    },
    description,
    keywords,
    authors: [{ name: siteName }],
    creator: siteName,
    publisher: siteName,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type: 'website',
      locale: 'en_IN',
      url: process.env.NEXT_PUBLIC_SERVER_URL || 'https://yourdomain.com',
      siteName,
      title: `${siteName} | Educational Consultancy`,
      description,
      images: [
        {
          url: '/images/og-image.jpg',
          width: 1200,
          height: 630,
          alt: `${siteName} - Educational Consultancy`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${siteName} | Educational Consultancy`,
      description,
      images: ['/images/og-image.jpg'],
    },
    alternates: {
      canonical: process.env.NEXT_PUBLIC_SERVER_URL || 'https://yourdomain.com',
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

  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'https://yourdomain.com'

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    '@id': `${baseUrl}/#organization`,
    name: siteSettings?.siteName || 'EduConsult Pro',
    description: siteSettings?.seo?.metaDescription || 'Educational consultancy offering admission guidance and career counseling services',
    url: baseUrl,
    logo: siteSettings?.siteLogo && typeof siteSettings.siteLogo === 'object'
      ? `${baseUrl}${siteSettings.siteLogo.url}`
      : `${baseUrl}/images/logo.png`,
    image: `${baseUrl}/images/og-image.jpg`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteSettings?.contactInfo?.address?.split('\n')[0] || 'Your Street Address',
      addressLocality: 'Your City',
      addressRegion: 'Your State',
      postalCode: 'XXXXXX',
      addressCountry: 'US',
    },
    telephone: siteSettings?.contactInfo?.phone || '+1 234 567 8900',
    email: siteSettings?.contactInfo?.email || 'info@yourdomain.com',
    areaServed: {
      '@type': 'State',
      name: 'Your State',
    },
    knowsAbout: [
      'Nursing Education',
      'Pharmacy Education',
      'Engineering Education',
      'Management Education',
      'Career Counselling',
      'Admission Guidance',
    ],
    sameAs: [
      siteSettings?.socialMedia?.facebook,
      siteSettings?.socialMedia?.instagram,
      siteSettings?.socialMedia?.youtube,
    ].filter(Boolean),
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
        <RecaptchaProvider>
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
        </RecaptchaProvider>
      </body>
    </html>
  )
}
