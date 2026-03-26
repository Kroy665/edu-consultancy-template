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

export const metadata: Metadata = {
  title: 'Our Services',
  description:
    'Comprehensive educational consultancy services including career counselling, admission guidance, course selection, scholarship support, and education loan assistance.',
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
      <section className="bg-gradient-to-br from-brand-primary to-brand-primary/80 text-white py-16">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-serif mb-6">Our Services</h1>
            <p className="text-lg text-white/90">
              Comprehensive support for every step of your educational journey. From career
              counselling to admission confirmation, we're with you all the way.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-white">
        <div className="section-container">
          {services.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-neutral-600">No services available at the moment.</p>
            </div>
          ) : (
            <div className="space-y-8">
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
                    {/* Service Header */}
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

                          {/* Full Description */}
                          <div className="bg-white rounded-lg p-6 border border-neutral-200">
                            <h3 className="font-semibold text-neutral-900 mb-3 text-sm uppercase tracking-wide">
                              What We Offer:
                            </h3>
                            <div className="prose prose-sm max-w-none">
                              <RichText content={service.fullDescription} />
                            </div>

                            {/* Benefits List */}
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
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-brand-secondary text-white">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-serif mb-4">Ready to Get Started?</h2>
            <p className="text-lg text-white/90 mb-8">
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
      <section className="py-12 bg-brand-light">
        <div className="section-container">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-brand-primary mb-2">100%</div>
              <p className="text-neutral-600">Transparent Process</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-brand-primary mb-2">Zero</div>
              <p className="text-neutral-600">Hidden Charges</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-brand-primary mb-2">24/7</div>
              <p className="text-neutral-600">Support Available</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
