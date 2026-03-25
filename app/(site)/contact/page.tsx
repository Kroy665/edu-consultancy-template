import type { Metadata } from 'next'
import { EnquiryForm } from '@/components/sections/EnquiryForm'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with Nibedita Institute & Management for admission guidance, career counselling, and course information. Visit us in Dhupguri, West Bengal.',
}

export default function ContactPage() {
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
                    Nibedita Institute & Management
                    <br />
                    Dhupguri, Jalpaiguri
                    <br />
                    West Bengal — 735210
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
                    <a href="tel:+919999999999" className="hover:text-brand-secondary">
                      +91 99999 99999
                    </a>
                    <br />
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
                    <a href="mailto:info@nibedita.in" className="hover:text-brand-secondary">
                      info@nibedita.in
                    </a>
                    <br />
                    <a href="mailto:director@nibedita.in" className="hover:text-brand-secondary">
                      director@nibedita.in
                    </a>
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
                    Monday - Saturday: 9:00 AM - 6:00 PM
                    <br />
                    Sunday: Closed
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
      <section className="h-96 md:h-[500px]">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d114614.8!2d89.0102!3d26.5854!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39e444e10c7c1e89%3A0x81321e9e51d0e4db!2sDhupguri%2C%20West%20Bengal!5e0!3m2!1sen!2sin!4v1234567890"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Nibedita Institute Location - Dhupguri, West Bengal"
        />
      </section>
    </>
  )
}
