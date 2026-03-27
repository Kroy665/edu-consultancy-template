import { getPayload } from 'payload'
import config from '@payload-config'
import type { SiteSetting } from '@/payload/payload-types'

/**
 * Fetch site settings from Payload CMS
 * Returns the first (and should be only) site settings document
 * This function is cached and can be called from Server Components
 */
export async function getSiteSettings(): Promise<SiteSetting | null> {
  try {
    const payload = await getPayload({ config })

    const { docs } = await payload.find({
      collection: 'site-settings',
      limit: 1,
      depth: 2, // Fetch related media (logo, favicon)
    })

    return (docs[0] as SiteSetting) || null
  } catch (error) {
    console.error('Error fetching site settings:', error)
    return null
  }
}

/**
 * Default fallback values if site settings are not configured
 */
export const DEFAULT_SITE_SETTINGS = {
  siteName: 'Nibedita Institute & Management',
  siteTagline: 'Your Gateway to Quality Education',
  contactInfo: {
    address: 'Nibedita Institute & Management\nDhupguri, Jalpaiguri\nWest Bengal — 735210',
    phone: '+91 99999 99999',
    alternatePhone: undefined,
    whatsapp: '919999999999',
    whatsappMessage: 'Hi, I want to know more about admissions at Nibedita Institute.',
    email: 'info@nibedita.in',
    secondaryEmail: 'director@nibedita.in',
  },
  location: {
    googleMapsEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d114614.8!2d89.0102!3d26.5854!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39e444e10c7c1e89%3A0x81321e9e51d0e4db!2sDhupguri%2C%20West%20Bengal!5e0!3m2!1sen!2sin!4v1234567890',
  },
  footer: {
    copyrightText: '© 2026 Nibedita Institute & Management. All rights reserved.',
    showLegalLinks: true,
  },
  businessHours: {
    workingDays: 'Monday - Saturday',
    workingHours: '9:00 AM - 6:00 PM',
    closedDays: 'Sundays & Public Holidays',
  },
  seo: {
    metaDescription: 'Leading educational consultancy in Dhupguri offering admission guidance for Nursing, Engineering, Pharmacy, MBA and more. Expert career counselling for students in West Bengal.',
    keywords: [
      { keyword: 'educational consultancy Dhupguri' },
      { keyword: 'admission guidance West Bengal' },
      { keyword: 'nursing admission' },
      { keyword: 'engineering admission' },
      { keyword: 'career counselling Jalpaiguri' },
    ],
  },
}
