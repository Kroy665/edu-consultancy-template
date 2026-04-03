import type { Metadata } from 'next'
import { EnquiryForm } from '@/components/sections/EnquiryForm'
import { PageHeader } from '@/components/layout/PageHeader'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import { getPageSettings, getSiteSettings, DEFAULT_SITE_SETTINGS } from '@/lib/getSiteSettings'

export async function generateMetadata(): Promise<Metadata> {
  const pageSettings = await getPageSettings('contactPage')

  return {
    title: pageSettings?.metaTitle || 'Contact Us | Nibedita Institute',
    description: pageSettings?.metaDescription || DEFAULT_SITE_SETTINGS.pages.contactPage.metaDescription,
  }
}

export default async function ContactPage() {
  const pageSettings = await getPageSettings('contactPage')
  const siteSettings = await getSiteSettings()
  const settings = siteSettings || DEFAULT_SITE_SETTINGS

  const showMap = pageSettings?.showMap ?? DEFAULT_SITE_SETTINGS.pages.contactPage.showMap

  // Parse address lines
  const addressLines = settings.contactInfo?.address?.split('\n') || []
  return (
    <>
      {/* Hero Section */}
      <PageHeader
        title={pageSettings?.headerTitle || DEFAULT_SITE_SETTINGS.pages.contactPage.headerTitle}
        subtitle={pageSettings?.headerSubtitle || DEFAULT_SITE_SETTINGS.pages.contactPage.headerSubtitle}
      />

      {/* Contact Information & Form */}
      <section className="py-20 bg-gradient-to-b from-white via-brand-light/20 to-white relative overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute top-20 left-0 w-96 h-96 bg-brand-secondary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-0 w-96 h-96 bg-brand-accent/5 rounded-full blur-3xl" />

        <div className="section-container relative z-10">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact Information */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-3xl md:text-4xl font-serif mb-4">
                  <span className="gradient-text">Get In</span> <span className="text-brand-navy">Touch</span>
                </h2>
                <p className="text-neutral-600 mb-8">
                  Visit our office or reach out to us through phone, email, or WhatsApp. We're
                  always ready to assist you with your educational needs.
                </p>
              </div>

              {/* Office Address */}
              <div className="flex gap-5 bg-gradient-to-br from-white to-brand-light/30 p-6 rounded-2xl shadow-lg border border-neutral-200/60 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="p-4 bg-gradient-to-br from-brand-secondary/20 to-brand-accent/20 rounded-xl h-fit">
                  <MapPin className="w-7 h-7 text-brand-secondary" />
                </div>
                <div>
                  <h3 className="font-bold text-brand-navy mb-3 text-lg">Office Address</h3>
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
              <div className="flex gap-5 bg-gradient-to-br from-white to-brand-light/30 p-6 rounded-2xl shadow-lg border border-neutral-200/60 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="p-4 bg-gradient-to-br from-brand-secondary/20 to-brand-accent/20 rounded-xl h-fit">
                  <Phone className="w-7 h-7 text-brand-secondary" />
                </div>
                <div>
                  <h3 className="font-bold text-brand-navy mb-3 text-lg">Phone & WhatsApp</h3>
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
              <div className="flex gap-5 bg-gradient-to-br from-white to-brand-light/30 p-6 rounded-2xl shadow-lg border border-neutral-200/60 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="p-4 bg-gradient-to-br from-brand-secondary/20 to-brand-accent/20 rounded-xl h-fit">
                  <Mail className="w-7 h-7 text-brand-secondary" />
                </div>
                <div>
                  <h3 className="font-bold text-brand-navy mb-3 text-lg">Email Address</h3>
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
              <div className="flex gap-5 bg-gradient-to-br from-white to-brand-light/30 p-6 rounded-2xl shadow-lg border border-neutral-200/60 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="p-4 bg-gradient-to-br from-brand-secondary/20 to-brand-accent/20 rounded-xl h-fit">
                  <Clock className="w-7 h-7 text-brand-secondary" />
                </div>
                <div>
                  <h3 className="font-bold text-brand-navy mb-3 text-lg">Office Hours</h3>
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
      {showMap && settings.location?.googleMapsEmbedUrl && (
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
