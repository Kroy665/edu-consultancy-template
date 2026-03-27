import type { Metadata } from 'next'
import { EnquiryForm } from '@/components/sections/EnquiryForm'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import { getSiteSettings, DEFAULT_SITE_SETTINGS } from '@/lib/getSiteSettings'

export async function generateMetadata(): Promise<Metadata> {
  const siteSettings = await getSiteSettings()
  const siteName = siteSettings?.siteName || DEFAULT_SITE_SETTINGS.siteName

  return {
    title: 'Contact Us',
    description: `Get in touch with ${siteName} for admission guidance, career counselling, and course information. Visit us in Dhupguri, West Bengal.`,
  }
}

export default async function ContactPage() {
  const siteSettings = await getSiteSettings()
  const settings = siteSettings || DEFAULT_SITE_SETTINGS

  // Parse address lines
  const addressLines = settings.contactInfo?.address?.split('\n') || []
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brand-primary to-brand-primary/80 text-white py-16">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-serif mb-6">Contact Us</h1>
            <p className="text-lg text-white/90">
              Have questions? We're here to help. Reach out to us for admission guidance and career
              counselling.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information & Form */}
      <section className="py-16 bg-white">
        <div className="section-container">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact Information */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-2xl font-serif text-brand-primary mb-6">Get In Touch</h2>
                <p className="text-neutral-600 mb-8">
                  Visit our office or reach out to us through phone, email, or WhatsApp. We're
                  always ready to assist you with your educational needs.
                </p>
              </div>

              {/* Office Address */}
              <div className="flex gap-4">
                <div className="p-3 bg-brand-secondary/10 rounded-lg h-fit">
                  <MapPin className="w-6 h-6 text-brand-secondary" />
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-900 mb-2">Office Address</h3>
                  <p className="text-neutral-600 text-sm">
                    {addressLines.map((line, idx) => (
                      <span key={idx}>
                        {line}
                        {idx < addressLines.length - 1 && <br />}
                      </span>
                    ))}
                    <br />
                    India
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex gap-4">
                <div className="p-3 bg-brand-secondary/10 rounded-lg h-fit">
                  <Phone className="w-6 h-6 text-brand-secondary" />
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-900 mb-2">Phone & WhatsApp</h3>
                  <p className="text-neutral-600 text-sm">
                    {settings.contactInfo?.phone && (
                      <>
                        <a href={`tel:${settings.contactInfo.phone}`} className="hover:text-brand-secondary">
                          {settings.contactInfo.phone}
                        </a>
                        <br />
                      </>
                    )}
                    {settings.contactInfo?.alternatePhone && (
                      <>
                        <a href={`tel:${settings.contactInfo.alternatePhone}`} className="hover:text-brand-secondary">
                          {settings.contactInfo.alternatePhone}
                        </a>
                        <br />
                      </>
                    )}
                    <span className="text-xs text-neutral-500">
                      (Available for calls & WhatsApp)
                    </span>
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex gap-4">
                <div className="p-3 bg-brand-secondary/10 rounded-lg h-fit">
                  <Mail className="w-6 h-6 text-brand-secondary" />
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-900 mb-2">Email Address</h3>
                  <p className="text-neutral-600 text-sm">
                    {settings.contactInfo?.email && (
                      <>
                        <a href={`mailto:${settings.contactInfo.email}`} className="hover:text-brand-secondary">
                          {settings.contactInfo.email}
                        </a>
                        <br />
                      </>
                    )}
                    {settings.contactInfo?.secondaryEmail && (
                      <a href={`mailto:${settings.contactInfo.secondaryEmail}`} className="hover:text-brand-secondary">
                        {settings.contactInfo.secondaryEmail}
                      </a>
                    )}
                  </p>
                </div>
              </div>

              {/* Office Hours */}
              <div className="flex gap-4">
                <div className="p-3 bg-brand-secondary/10 rounded-lg h-fit">
                  <Clock className="w-6 h-6 text-brand-secondary" />
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-900 mb-2">Office Hours</h3>
                  <p className="text-neutral-600 text-sm">
                    {settings.businessHours?.workingDays}: {settings.businessHours?.workingHours}
                    <br />
                    {settings.businessHours?.closedDays}
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              <div className="bg-brand-light rounded-xl p-6 md:p-8">
                <h2 className="text-2xl font-serif text-brand-primary mb-2">Send Us a Message</h2>
                <p className="text-neutral-600 mb-6 text-sm">
                  Fill out the form below and we'll get back to you as soon as possible
                </p>
                <EnquiryForm source="contact-page" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Google Map */}
      {settings.location?.googleMapsEmbedUrl && (
        <section className="h-96 md:h-[500px]">
          <iframe
            src={settings.location.googleMapsEmbedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={`${settings.siteName} Location`}
          />
        </section>
      )}
    </>
  )
}
