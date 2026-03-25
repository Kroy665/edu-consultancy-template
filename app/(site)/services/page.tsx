import type { Metadata } from 'next'
import { Button } from '@/components/ui/Button'
import {
  Users,
  FileCheck,
  Target,
  Award,
  CreditCard,
  FileText,
  TrendingUp,
  ChevronDown
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Our Services',
  description:
    'Comprehensive educational consultancy services including career counselling, admission guidance, course selection, scholarship support, and education loan assistance.',
}

const services = [
  {
    icon: Users,
    title: 'Career Counselling',
    description: 'Expert one-on-one guidance to help you choose the right career path',
    details: [
      'Personalized assessment of your academic background, interests, and strengths',
      'In-depth discussion about various career options aligned with your goals',
      'Guidance on course selection based on current industry trends',
      'Long-term career planning and goal setting',
      'Understanding of market demand and job prospects in different fields',
    ],
  },
  {
    icon: FileCheck,
    title: 'Admission Guidance',
    description: 'End-to-end support throughout the college application process',
    details: [
      'Step-by-step guidance through the entire admission process',
      'Help with filling out application forms accurately',
      'Timeline management to ensure you never miss important deadlines',
      'Interview preparation and tips for entrance exams',
      'Follow-up with colleges on your behalf until admission confirmation',
    ],
  },
  {
    icon: Target,
    title: 'Course Selection Support',
    description: 'Data-driven recommendations for choosing the best course',
    details: [
      'Detailed comparison of different courses and their career outcomes',
      'Analysis of course curriculum and its relevance to your goals',
      'Information on fee structure, duration, and eligibility criteria',
      'Insights into placement records and alumni success stories',
      'Guidance on selecting specializations within your chosen field',
    ],
  },
  {
    icon: Award,
    title: 'Scholarship Guidance',
    description: 'Maximize your chances of securing financial aid',
    details: [
      'Comprehensive database of government and private scholarships',
      'Eligibility assessment for various scholarship programs',
      'Application assistance and document preparation',
      'Tips for writing compelling scholarship essays',
      'Follow-up support until scholarship confirmation',
    ],
  },
  {
    icon: CreditCard,
    title: 'Education Loan Assistance',
    description: 'Simplified process for securing education financing',
    details: [
      'Partnerships with leading banks and financial institutions',
      'Comparison of different loan options and interest rates',
      'Help with loan application and documentation',
      'Guidance on collateral requirements and co-borrower selection',
      'Support with loan approval follow-up and disbursement',
    ],
  },
  {
    icon: FileText,
    title: 'Documentation Support',
    description: 'Complete assistance with paperwork and verification',
    details: [
      'Document checklist for admission and verification',
      'Help with obtaining certificates and mark sheets',
      'Assistance with affidavit and bonafide certificate preparation',
      'Document verification and attestation guidance',
      'Migration certificate and TC application support',
    ],
  },
  {
    icon: TrendingUp,
    title: 'Placement Guidance',
    description: 'Career readiness and job placement support',
    details: [
      'Resume building and professional profile optimization',
      'Mock interviews and communication skills training',
      'Guidance on internship opportunities during the course',
      'Connection with placement-active colleges and universities',
      'Industry insights and networking opportunities',
    ],
  },
]

export default function ServicesPage() {
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
          <div className="space-y-8">
            {services.map((service, index) => {
              const Icon = service.icon
              const isEven = index % 2 === 0

              return (
                <div
                  key={service.title}
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
                          {service.title}
                        </h2>
                        <p className="text-neutral-600 mb-4">{service.description}</p>

                        {/* Details List */}
                        <div className="bg-white rounded-lg p-6 border border-neutral-200">
                          <h3 className="font-semibold text-neutral-900 mb-3 text-sm uppercase tracking-wide">
                            What We Offer:
                          </h3>
                          <ul className="space-y-2">
                            {service.details.map((detail, idx) => (
                              <li key={idx} className="flex items-start gap-3 text-sm text-neutral-700">
                                <ChevronDown className="w-4 h-4 text-brand-secondary flex-shrink-0 mt-0.5 rotate-[-90deg]" />
                                <span>{detail}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
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
