import type { Banner, Testimonial, Media } from '@/payload/payload-types'
import type { Metadata } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'
import { EnquiryForm } from '@/components/sections/EnquiryForm'
import { WhyChooseUs } from '@/components/sections/WhyChooseUs'
import { CourseCategoriesGrid } from '@/components/sections/CourseCategoriesGrid'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'
import { HeroBannerCarousel } from '@/components/sections/HeroBannerCarousel'
import { MapPin, Phone, Mail } from 'lucide-react'
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

  // Fetch all active banners for carousel
  const { docs: banners } = await payload.find({
    collection: 'banners',
    where: {
      active: {
        equals: true,
      },
    },
    limit: 10,
    sort: 'order',
  })

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

  // Process banners for carousel
  const bannerSlides = await Promise.all(
    banners.map(async (banner) => {
      const typedBanner = banner as Banner
      let backgroundImage = null

      if (typedBanner.backgroundImage) {
        const mediaId = typeof typedBanner.backgroundImage === 'string'
          ? typedBanner.backgroundImage
          : typedBanner.backgroundImage.id

        try {
          const media = await payload.findByID({
            collection: 'media',
            id: mediaId,
          }) as Media

          if (media?.url) {
            backgroundImage = {
              url: media.url,
              alt: media.alt || typedBanner.headline || 'Banner image',
            }
          }
        } catch (error) {
          console.error('Error fetching banner image:', error)
        }
      }

      return {
        id: typedBanner.id,
        headline: typedBanner.headline || 'Admissions Open 2026 — Secure Your Future',
        subheadline: typedBanner.subheadline || 'Expert guidance for Nursing, Engineering, Pharmacy, MBA & 100+ more courses',
        excerpt: typedBanner.excerpt || undefined,
        ctaText: typedBanner.ctaText || 'Apply Now',
        ctaLink: typedBanner.ctaLink || '/admission',
        secondaryCtaText: typedBanner.secondaryCtaText || undefined,
        secondaryCtaLink: typedBanner.secondaryCtaLink || undefined,
        backgroundImage,
      }
    })
  )
  return (
    <>
      {/* Hero Banner Carousel */}
      <HeroBannerCarousel banners={bannerSlides} autoPlayInterval={6000} />

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
