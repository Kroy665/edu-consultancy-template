import type { Banner, Testimonial, Media } from '@/payload/payload-types'
import { getPayload } from 'payload'
import config from '@payload-config'
import { EnquiryForm } from '@/components/sections/EnquiryForm'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Heart, Pill, Cpu, Award, Briefcase, GraduationCap, BookOpen, MoreHorizontal, MapPin, Phone, Mail, Star, User } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { getSiteSettings, DEFAULT_SITE_SETTINGS } from '@/lib/getSiteSettings'

export const revalidate = 60;

const courseCategories = [
  { name: 'Nursing', slug: 'nursing', icon: Heart, tagline: 'B.Sc, GNM & more' },
  { name: 'Pharmacy', slug: 'pharmacy', icon: Pill, tagline: 'B.Pharm, D.Pharm' },
  { name: 'B.Tech', slug: 'btech', icon: Cpu, tagline: '8 specialisations' },
  { name: 'Diploma', slug: 'diploma', icon: Award, tagline: 'Polytechnic & Para-medical' },
  { name: 'Management', slug: 'management', icon: Briefcase, tagline: 'MBA, BBA' },
  { name: 'Education', slug: 'education', icon: GraduationCap, tagline: 'B.Ed, D.Ed, M.Ed' },
  { name: 'General Degree', slug: 'general-degree', icon: BookOpen, tagline: 'BA, BSc, BCom & more' },
  { name: 'Others', slug: 'others', icon: MoreHorizontal, tagline: 'Law, Agri, Library' },
]

export default async function HomePage() {
  const payload = await getPayload({ config })

  // Fetch site settings
  const siteSettings = await getSiteSettings()
  const settings = siteSettings || DEFAULT_SITE_SETTINGS

  // Parse address lines
  const addressLines = settings.contactInfo?.address?.split('\n') || []

  // Fetch active banners
  const { docs: banners } = await payload.find({
    collection: 'banners',
    where: {
      active: {
        equals: true,
      },
    },
    limit: 1,
    sort: 'order',
  })

  const activeBanner = banners[0] as Banner | undefined

  // Fetch featured testimonials
  const { docs: testimonials } = await payload.find({
    collection: 'testimonials',
    where: {
      featured: {
        equals: true,
      },
    },
    limit: 4,
    sort: '-rating',
  })

  const featuredTestimonials = testimonials as Testimonial[]

  // Get background image URL if exists
  let backgroundImageUrl = ''
  if (activeBanner?.backgroundImage) {
    const mediaId = typeof activeBanner.backgroundImage === 'string'
      ? activeBanner.backgroundImage
      : activeBanner.backgroundImage.id

    const media = await payload.findByID({
      collection: 'media',
      id: mediaId,
    }) as Media

    backgroundImageUrl = media?.url || ''
  }
  return (
    <>
      {/* Hero Banner */}
      <section className="relative min-h-screen flex items-center bg-gradient-to-br from-brand-primary to-brand-primary/80">
        {backgroundImageUrl && (
          <Image
            src={backgroundImageUrl}
            alt="Hero Banner Background"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        )}
        <div className="absolute inset-0 bg-black/50" />
        <div className="section-container relative z-10 text-white py-20">
          <div className="max-w-3xl">
            {activeBanner?.excerpt && (
              <Badge variant="secondary" className="mb-6 inline-block">
                {activeBanner.excerpt}
              </Badge>
            )}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-6 leading-tight">
              {activeBanner?.headline || 'Admissions Open 2026 — Secure Your Future'}
            </h1>
            <p className="text-lg md:text-xl mb-8 text-white/90">
              {activeBanner?.subheadline || 'Expert guidance for Nursing, Engineering, Pharmacy, MBA & 100+ more courses'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button href={activeBanner?.ctaLink || '/admission'} variant="primary" size="lg">
                {activeBanner?.ctaText || 'Apply Now'}
              </Button>
              {activeBanner?.secondaryCtaText && activeBanner?.secondaryCtaLink && (
                <Button href={activeBanner.secondaryCtaLink} variant="outline" size="lg" className="bg-white/10 border-white text-white hover:bg-white hover:text-brand-primary">
                  {activeBanner.secondaryCtaText}
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Course Categories Grid */}
      <section className="py-16 bg-white">
        <div className="section-container">
          <h2 className="text-3xl md:text-4xl font-serif text-center mb-12 text-brand-primary">
            Explore Our Programs
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {courseCategories.map((category) => {
              const Icon = category.icon
              return (
                <Link
                  key={category.slug}
                  href={`/courses/${category.slug}`}
                  className="bg-white border border-neutral-200 rounded-xl p-6 hover:shadow-md transition-all duration-200 hover:border-brand-secondary group"
                >
                  <Icon className="w-10 h-10 text-brand-secondary mb-3 group-hover:scale-110 transition-transform" />
                  <h3 className="font-semibold text-neutral-900 mb-1">{category.name}</h3>
                  <p className="text-sm text-neutral-600">{category.tagline}</p>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-brand-light">
        <div className="section-container">
          <h2 className="text-3xl md:text-4xl font-serif text-center mb-12 text-brand-primary">
            Why Choose Nibedita Institute
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-brand-secondary mb-2">500+</div>
              <p className="text-neutral-700">Students Placed</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-brand-secondary mb-2">50+</div>
              <p className="text-neutral-700">Partner Colleges</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-brand-secondary mb-2">8+</div>
              <p className="text-neutral-700">Course Categories</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-brand-secondary mb-2">10+</div>
              <p className="text-neutral-700">Years Experience</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      {featuredTestimonials.length > 0 && (
        <section className="py-16 bg-white">
          <div className="section-container">
            <h2 className="text-3xl md:text-4xl font-serif text-center mb-12 text-brand-primary">
              What Our Students Say
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredTestimonials.map((testimonial) => {
                // Get photo URL if exists
                const photoUrl = testimonial.photo && typeof testimonial.photo === 'object'
                  ? (testimonial.photo as Media)?.url
                  : null

                // Get initials for fallback
                const initials = testimonial.studentName
                  .split(' ')
                  .map(n => n[0])
                  .join('')
                  .toUpperCase()
                  .slice(0, 2)

                return (
                  <div
                    key={testimonial.id}
                    className="bg-brand-light rounded-xl p-6 border border-neutral-200"
                  >
                    {/* Student Photo/Avatar */}
                    <div className="flex items-center gap-3 mb-4">
                      {photoUrl ? (
                        <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                          <Image
                            src={photoUrl}
                            alt={testimonial.studentName}
                            fill
                            sizes="48px"
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-brand-secondary/10 flex items-center justify-center flex-shrink-0">
                          <span className="text-brand-secondary font-semibold text-sm">
                            {initials}
                          </span>
                        </div>
                      )}
                      <div>
                        <p className="font-semibold text-neutral-900">{testimonial.studentName}</p>
                        <p className="text-xs text-neutral-600">{testimonial.course}</p>
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="flex gap-1 mb-3">
                      {[...Array(testimonial.rating || 5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-brand-secondary text-brand-secondary" />
                      ))}
                    </div>

                    {/* Quote */}
                    <p className="text-neutral-700 text-sm italic">
                      "{testimonial.quote}"
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Enquiry Form */}
      <EnquiryForm source="home-page" />

      {/* Contact Snapshot */}
      <section className="bg-neutral-900 text-white py-12">
        <div className="section-container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
              <MapPin className="w-6 h-6 text-brand-secondary flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-1">Visit Us</h3>
                <p className="text-neutral-400 text-sm">
                  {addressLines.map((line, idx) => (
                    <span key={idx}>
                      {line}
                      {idx < addressLines.length - 1 && <br />}
                    </span>
                  ))}
                </p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
              <Phone className="w-6 h-6 text-brand-secondary flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-1">Call Us</h3>
                {settings.contactInfo?.phone && (
                  <p className="text-neutral-400 text-sm">{settings.contactInfo.phone}</p>
                )}
                {settings.contactInfo?.whatsapp && (
                  <p className="text-neutral-400 text-sm">WhatsApp Available</p>
                )}
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
              <Mail className="w-6 h-6 text-brand-secondary flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-1">Email Us</h3>
                {settings.contactInfo?.email && (
                  <p className="text-neutral-400 text-sm">{settings.contactInfo.email}</p>
                )}
                {settings.contactInfo?.secondaryEmail && (
                  <p className="text-neutral-400 text-sm">{settings.contactInfo.secondaryEmail}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Google Map */}
      {settings.location?.googleMapsEmbedUrl && (
        <section className="h-96">
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
