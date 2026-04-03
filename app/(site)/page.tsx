import type { Banner, Testimonial, Media } from '@/payload/payload-types'
import type { Metadata } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'
import { EnquiryForm } from '@/components/sections/EnquiryForm'
import { WhyChooseUs } from '@/components/sections/WhyChooseUs'
import { CourseCategoriesGrid } from '@/components/sections/CourseCategoriesGrid'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { MapPin, Phone, Mail } from 'lucide-react'
import Image from 'next/image'
import { getSiteSettings, DEFAULT_SITE_SETTINGS } from '@/lib/getSiteSettings'

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const siteSettings = await getSiteSettings()
  const settings = siteSettings || DEFAULT_SITE_SETTINGS
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'https://nibedita.kroy.dev'

  return {
    title: `${settings.siteName} - Best Educational Consultancy in Dhupguri, West Bengal`,
    description: siteSettings?.seo?.metaDescription || 'Leading educational consultancy in Dhupguri offering expert admission guidance for Nursing, Engineering, Pharmacy, MBA and 100+ courses. Free career counselling, scholarship assistance & placement support.',
    keywords: [
      'educational consultancy dhupguri',
      'admission guidance west bengal',
      'nursing admission dhupguri',
      'engineering admission jalpaiguri',
      'career counselling',
      'education consultancy',
      'nibedita institute',
    ],
    openGraph: {
      title: `${settings.siteName} - Best Educational Consultancy in Dhupguri`,
      description: 'Expert guidance for Nursing, Engineering, Pharmacy, MBA & 100+ courses. Free counselling & placement support.',
      url: baseUrl,
      type: 'website',
      images: [
        {
          url: `${baseUrl}/images/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: `${settings.siteName} - Educational Consultancy`,
        },
      ],
    },
    alternates: {
      canonical: baseUrl,
    },
  }
}

const courseCategories = [
  { name: 'Nursing', slug: 'nursing', icon: 'Heart', tagline: 'B.Sc, GNM & more' },
  { name: 'Pharmacy', slug: 'pharmacy', icon: 'Pill', tagline: 'B.Pharm, D.Pharm' },
  { name: 'B.Tech', slug: 'btech', icon: 'Cpu', tagline: '8 specialisations' },
  { name: 'Diploma', slug: 'diploma', icon: 'Award', tagline: 'Polytechnic & Para-medical' },
  { name: 'Management', slug: 'management', icon: 'Briefcase', tagline: 'MBA, BBA' },
  { name: 'Education', slug: 'education', icon: 'GraduationCap', tagline: 'B.Ed, D.Ed, M.Ed' },
  { name: 'General Degree', slug: 'general-degree', icon: 'BookOpen', tagline: 'BA, BSc, BCom & more' },
  { name: 'Others', slug: 'others', icon: 'MoreHorizontal', tagline: 'Law, Agri, Library' },
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
      <section aria-label="Hero Banner" className="relative min-h-screen flex items-center bg-gradient-to-br from-brand-navy to-brand-navy/80">
        {backgroundImageUrl && (
          <Image
            src={backgroundImageUrl}
            alt={`${activeBanner?.headline || 'Nibedita Institute Educational Consultancy'} - Banner Image`}
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
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-6 leading-tight text-brand-accent">
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
                <Button href={activeBanner.secondaryCtaLink} variant="outline" size="lg" className="bg-white/10 border-brand-accent text-brand-accent hover:bg-brand-accent hover:text-brand-navy">
                  {activeBanner.secondaryCtaText}
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Course Categories Grid */}
      <CourseCategoriesGrid categories={courseCategories} />

      {/* Why Choose Us */}
      <WhyChooseUs />

      {/* Testimonials */}
      <TestimonialsSection
        testimonials={featuredTestimonials.map((testimonial) => ({
          id: testimonial.id,
          studentName: testimonial.studentName,
          course: testimonial.course,
          quote: testimonial.quote,
          rating: testimonial.rating,
          photo: testimonial.photo && typeof testimonial.photo === 'object'
            ? { url: (testimonial.photo as Media)?.url || '' }
            : null,
        }))}
      />

      {/* Enquiry Form */}
      <EnquiryForm source="home-page" />

      {/* Contact Snapshot */}
      <section className="bg-brand-primary text-white py-12">
        <div className="section-container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
              <MapPin className="w-6 h-6 text-brand-secondary flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-1 text-brand-accent">Visit Us</h3>
                <p className="text-neutral-300 text-sm">
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
                <h3 className="font-semibold mb-1 text-brand-accent">Call Us</h3>
                {settings.contactInfo?.phone && (
                  <p className="text-neutral-300 text-sm">{settings.contactInfo.phone}</p>
                )}
                {settings.contactInfo?.whatsapp && (
                  <p className="text-neutral-300 text-sm">WhatsApp Available</p>
                )}
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
              <Mail className="w-6 h-6 text-brand-secondary flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-1 text-brand-accent">Email Us</h3>
                {settings.contactInfo?.email && (
                  <p className="text-neutral-300 text-sm">{settings.contactInfo.email}</p>
                )}
                {settings.contactInfo?.secondaryEmail && (
                  <p className="text-neutral-300 text-sm">{settings.contactInfo.secondaryEmail}</p>
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
