import type { Metadata } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'
import { Button } from '@/components/ui/Button'
import { RichText } from '@/components/RichText'
import { PageHeader } from '@/components/layout/PageHeader'
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
      <PageHeader
        title={pageSettings?.headerTitle || DEFAULT_SITE_SETTINGS.pages.servicesPage.headerTitle}
        subtitle={pageSettings?.headerSubtitle || DEFAULT_SITE_SETTINGS.pages.servicesPage.headerSubtitle}
      />

      {/* Services Grid */}
      <section className="py-20 bg-gradient-to-b from-white via-brand-light/20 to-white relative overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute top-20 left-0 w-96 h-96 bg-brand-secondary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-0 w-96 h-96 bg-brand-accent/5 rounded-full blur-3xl" />
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
                      className="bg-gradient-to-br from-white to-brand-light/30 rounded-2xl border border-neutral-200/60 overflow-hidden p-5 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-gradient-to-br from-brand-secondary/20 to-brand-accent/20 rounded-xl">
                          <Icon className="w-5 h-5 text-brand-secondary" />
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
                      className="bg-gradient-to-br from-white to-brand-light/30 rounded-3xl border border-neutral-200/60 overflow-hidden shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group"
                    >
                      <div className="p-8 md:p-10">
                        <div className="flex items-start gap-6">
                          <div className="p-5 bg-gradient-to-br from-brand-secondary/20 to-brand-accent/20 rounded-2xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                            <Icon className="w-10 h-10 text-brand-secondary" />
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
      <section className="py-20 bg-gradient-to-br from-brand-secondary via-brand-accent to-brand-secondary text-white relative overflow-hidden animate-gradient">
        <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-transparent" />
        <div className="absolute top-10 right-10 w-80 h-80 bg-white/10 rounded-full blur-3xl" />

        <div className="section-container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif mb-6 drop-shadow-lg">Ready to Get Started?</h2>
            <p className="text-xl md:text-2xl text-white/95 mb-10 font-medium">
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
      <section className="py-16 bg-gradient-to-b from-brand-light/50 to-white relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-secondary/10 rounded-full blur-3xl" />

        <div className="section-container relative z-10">
          <div className="grid grid-cols-3 gap-8 text-center">
            <div className="bg-gradient-to-br from-white to-brand-light/40 rounded-2xl p-8 shadow-lg border border-neutral-200/60 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <div className="text-4xl md:text-5xl font-bold gradient-text mb-3">100%</div>
              <p className="text-sm md:text-base text-brand-navy font-semibold">Transparent Process</p>
            </div>
            <div className="bg-gradient-to-br from-white to-brand-light/40 rounded-2xl p-8 shadow-lg border border-neutral-200/60 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <div className="text-4xl md:text-5xl font-bold gradient-text mb-3">Zero</div>
              <p className="text-sm md:text-base text-brand-navy font-semibold">Hidden Charges</p>
            </div>
            <div className="bg-gradient-to-br from-white to-brand-light/40 rounded-2xl p-8 shadow-lg border border-neutral-200/60 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <div className="text-4xl md:text-5xl font-bold gradient-text mb-3">24/7</div>
              <p className="text-sm md:text-base text-brand-navy font-semibold">Support Available</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
