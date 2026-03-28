import type { Metadata } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'
import { Button } from '@/components/ui/Button'
import { RichText } from '@/components/RichText'
import {
  Users,
  Target,
  Award,
  FileText,
  ChevronDown,
  UserCheck,
  GraduationCap,
  BookOpen,
  Banknote,
  Briefcase,
  Heart
} from 'lucide-react'
import { getPageSettings, DEFAULT_SITE_SETTINGS } from '@/lib/getSiteSettings'

export async function generateMetadata(): Promise<Metadata> {
  const pageSettings = await getPageSettings('servicesPage')

  return {
    title: pageSettings?.metaTitle || 'Our Services | Nibedita Institute',
    description: pageSettings?.metaDescription || DEFAULT_SITE_SETTINGS.pages.servicesPage.metaDescription,
  }
}

export const revalidate = 60;

// Icon mapping
const iconMap: Record<string, any> = {
  'user-check': UserCheck,
  'graduation-cap': GraduationCap,
  'book-open': BookOpen,
  'award': Award,
  'banknote': Banknote,
  'file-text': FileText,
  'briefcase': Briefcase,
  'target': Target,
  'heart': Heart,
  'users': Users,
}

export default async function ServicesPage() {
  const payload = await getPayload({ config })
  const pageSettings = await getPageSettings('servicesPage')

  // Fetch services from CMS
  const { docs: services } = await payload.find({
    collection: 'services',
    where: {
      featured: {
        equals: true,
      },
    },
    limit: 20,
    sort: 'order',
  })
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brand-primary to-brand-primary/80 text-white py-12 sm:py-16">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif mb-4 sm:mb-6">
              {pageSettings?.headerTitle || DEFAULT_SITE_SETTINGS.pages.servicesPage.headerTitle}
            </h1>
            <p className="text-base sm:text-lg text-white/90">
              {pageSettings?.headerSubtitle || DEFAULT_SITE_SETTINGS.pages.servicesPage.headerSubtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-8 sm:py-12 md:py-16 bg-white">
        <div className="section-container">
          {services.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-neutral-600">No services available at the moment.</p>
            </div>
          ) : (
            <>
              {/* Mobile Version */}
              <div className="sm:hidden space-y-4">
                {services.map((service, index) => {
                  const Icon = iconMap[service.icon] || UserCheck
                  const isEven = index % 2 === 0

                  return (
                    <div
                      key={service.id}
                      className={`rounded-xl border border-neutral-200 overflow-hidden p-4 ${
                        isEven ? 'bg-white' : 'bg-brand-light'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <div className="p-1.5 bg-brand-secondary/10 rounded-lg">
                          <Icon className="w-4 h-4 text-brand-secondary" />
                        </div>
                        <h2 className="text-lg font-serif text-brand-primary">
                          {service.name}
                        </h2>
                      </div>

                      <p className="text-sm text-neutral-600 mb-3">{service.shortDescription}</p>

                      <div className="bg-neutral-50 rounded-lg p-3 border border-neutral-200">
                        <h3 className="font-semibold text-neutral-900 mb-2 text-xs uppercase tracking-wide">
                          What We Offer:
                        </h3>
                        <div className="prose prose-sm max-w-none text-xs text-neutral-700">
                          <RichText content={service.fullDescription} />
                        </div>

                        {service.benefits && service.benefits.length > 0 && (
                          <ul className="space-y-1.5 mt-3">
                            {service.benefits.map((item: any, idx: number) => (
                              <li key={idx} className="flex items-start gap-1.5 text-xs text-neutral-700">
                                <ChevronDown className="w-3 h-3 text-brand-secondary flex-shrink-0 mt-0.5 rotate-[-90deg]" />
                                <span className="flex-1 leading-relaxed">{item.benefit}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Desktop Version */}
              <div className="hidden sm:block space-y-8">
                {services.map((service, index) => {
                  const Icon = iconMap[service.icon] || UserCheck
                  const isEven = index % 2 === 0

                  return (
                    <div
                      key={service.id}
                      className={`rounded-xl border border-neutral-200 overflow-hidden ${
                        isEven ? 'bg-white' : 'bg-brand-light'
                      }`}
                    >
                      <div className="p-6 md:p-8">
                        <div className="flex items-start gap-6">
                          <div className="p-4 bg-brand-secondary/10 rounded-lg flex-shrink-0">
                            <Icon className="w-8 h-8 text-brand-secondary" />
                          </div>
                          <div className="flex-1">
                            <h2 className="text-2xl font-serif text-brand-primary mb-2">
                              {service.name}
                            </h2>
                            <p className="text-neutral-600 mb-4">{service.shortDescription}</p>

                            <div className="bg-white rounded-lg p-6 border border-neutral-200">
                              <h3 className="font-semibold text-neutral-900 mb-3 text-sm uppercase tracking-wide">
                                What We Offer:
                              </h3>
                              <div className="prose prose-sm max-w-none">
                                <RichText content={service.fullDescription} />
                              </div>

                              {service.benefits && service.benefits.length > 0 && (
                                <ul className="space-y-2 mt-4">
                                  {service.benefits.map((item: any, idx: number) => (
                                    <li key={idx} className="flex items-start gap-3 text-sm text-neutral-700">
                                      <ChevronDown className="w-4 h-4 text-brand-secondary flex-shrink-0 mt-0.5 rotate-[-90deg]" />
                                      <span>{item.benefit}</span>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 bg-brand-secondary text-white">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-serif mb-3 sm:mb-4">Ready to Get Started?</h2>
            <p className="text-base sm:text-lg text-white/90 mb-6 sm:mb-8">
              Book a free consultation session with our expert counsellors today. No obligations,
              just genuine guidance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                href="/contact"
                variant="outline"
                size="lg"
                className="bg-white text-brand-secondary border-white hover:bg-white/90"
              >
                Schedule Free Consultation
              </Button>
              <Button
                href="/admission"
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white/10"
              >
                Start Application
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-8 sm:py-12 bg-brand-light">
        <div className="section-container">
          <div className="grid grid-cols-3 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 text-center">
            <div>
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-brand-primary mb-1 sm:mb-2">100%</div>
              <p className="text-xs sm:text-sm md:text-base text-neutral-600">Transparent Process</p>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-brand-primary mb-1 sm:mb-2">Zero</div>
              <p className="text-xs sm:text-sm md:text-base text-neutral-600">Hidden Charges</p>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-brand-primary mb-1 sm:mb-2">24/7</div>
              <p className="text-xs sm:text-sm md:text-base text-neutral-600">Support Available</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
