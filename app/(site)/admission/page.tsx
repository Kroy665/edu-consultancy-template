import type { Metadata } from 'next'
import { EnquiryForm } from '@/components/sections/EnquiryForm'
import { Badge } from '@/components/ui/Badge'
import { CheckCircle, FileText, GraduationCap, UserCheck, Award } from 'lucide-react'
import { getPageSettings, DEFAULT_SITE_SETTINGS, type AdmissionPageSettings } from '@/lib/getSiteSettings'

export async function generateMetadata(): Promise<Metadata> {
  const pageSettings = await getPageSettings('admissionPage')

  return {
    title: pageSettings?.metaTitle || 'Admission Process | Nibedita Institute',
    description: pageSettings?.metaDescription || DEFAULT_SITE_SETTINGS.pages.admissionPage.metaDescription,
  }
}

const admissionSteps = [
  {
    icon: UserCheck,
    title: 'Initial Consultation',
    description: 'Book a free counselling session to discuss your academic background and career goals',
  },
  {
    icon: FileText,
    title: 'Course Selection',
    description: 'Our experts help you choose the right course and college based on your profile',
  },
  {
    icon: CheckCircle,
    title: 'Document Verification',
    description: 'We verify all your documents and ensure they meet admission requirements',
  },
  {
    icon: GraduationCap,
    title: 'Application Submission',
    description: 'We assist in filling forms and submitting applications to your chosen colleges',
  },
  {
    icon: Award,
    title: 'Admission Confirmation',
    description: 'Follow-up with colleges and support until you receive your admission letter',
  },
]

const requiredDocuments = [
  '10th Standard Marksheet & Certificate',
  '12th Standard Marksheet & Certificate (if applicable)',
  'Graduation Certificate & Marksheets (for postgraduate courses)',
  'Aadhar Card (mandatory)',
  'Passport size photographs (4 copies)',
  'Caste Certificate (if applicable - SC/ST/OBC)',
  'Income Certificate (for scholarship applications)',
  'Migration Certificate (if changing boards/universities)',
  'Transfer Certificate (TC) from previous institution',
  'Character Certificate',
]

export default async function AdmissionPage() {
  const pageSettings = await getPageSettings('admissionPage')

  const showBanner = pageSettings?.showBanner ?? DEFAULT_SITE_SETTINGS.pages.admissionPage.showBanner
  const bannerText = pageSettings?.bannerText || DEFAULT_SITE_SETTINGS.pages.admissionPage.bannerText

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brand-primary to-brand-primary/80 text-white py-16">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center">
            {showBanner && (
              <Badge variant="secondary" className="mb-4 inline-block">
                {bannerText}
              </Badge>
            )}
            <h1 className="text-4xl md:text-5xl font-serif mb-6">
              {pageSettings?.headerTitle || DEFAULT_SITE_SETTINGS.pages.admissionPage.headerTitle}
            </h1>
            <p className="text-lg text-white/90">
              {pageSettings?.headerSubtitle || DEFAULT_SITE_SETTINGS.pages.admissionPage.headerSubtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Admission Process */}
      <section className="py-16 bg-white">
        <div className="section-container">
          <h2 className="text-3xl font-serif text-center mb-12 text-brand-primary">
            Our 5-Step Admission Process
          </h2>

          <div className="grid md:grid-cols-5 gap-6 max-w-6xl mx-auto">
            {admissionSteps.map((step, index) => {
              const Icon = step.icon
              return (
                <div key={index} className="relative">
                  {/* Connector Line */}
                  {index < admissionSteps.length - 1 && (
                    <div className="hidden md:block absolute top-12 left-[60%] w-full h-0.5 bg-brand-secondary/30 z-0" />
                  )}

                  {/* Step Card */}
                  <div className="relative bg-white border-2 border-brand-secondary/20 rounded-xl p-6 hover:border-brand-secondary transition-colors z-10">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-16 h-16 bg-brand-secondary/10 rounded-full flex items-center justify-center mb-4">
                        <Icon className="w-8 h-8 text-brand-secondary" />
                      </div>
                      <div className="text-sm font-bold text-brand-secondary mb-2">
                        STEP {index + 1}
                      </div>
                      <h3 className="font-semibold text-neutral-900 mb-2">{step.title}</h3>
                      <p className="text-sm text-neutral-600">{step.description}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Eligibility Guide */}
      <section className="py-16 bg-brand-light">
        <div className="section-container">
          <h2 className="text-3xl font-serif text-center mb-12 text-brand-primary">
            Eligibility Criteria
          </h2>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
              <table className="w-full">
                <thead className="bg-brand-primary text-white">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold">Education Level</th>
                    <th className="px-6 py-4 text-left font-semibold">Minimum Qualification</th>
                    <th className="px-6 py-4 text-left font-semibold">Examples</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200">
                  <tr>
                    <td className="px-6 py-4 font-semibold text-neutral-900">
                      Diploma / Certificate Courses
                    </td>
                    <td className="px-6 py-4 text-neutral-700">10th Pass</td>
                    <td className="px-6 py-4 text-sm text-neutral-600">
                      ITI, Polytechnic, Nursing (ANM)
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-semibold text-neutral-900">
                      Undergraduate (UG)
                    </td>
                    <td className="px-6 py-4 text-neutral-700">12th Pass</td>
                    <td className="px-6 py-4 text-sm text-neutral-600">
                      B.Tech, B.Sc Nursing, B.Pharm, BA, BSc, BCom
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-semibold text-neutral-900">
                      Postgraduate (PG)
                    </td>
                    <td className="px-6 py-4 text-neutral-700">Graduation (Any Stream)</td>
                    <td className="px-6 py-4 text-sm text-neutral-600">MBA, M.Tech, M.Sc, M.Ed</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-6 bg-brand-orange border-l-4 border-brand-secondary rounded-lg p-6">
              <p className="text-sm text-neutral-700">
                <strong className="text-brand-secondary">Note:</strong> Specific courses may have
                additional eligibility criteria such as entrance exams, age limits, or subject
                requirements. Contact us for detailed information about your chosen course.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Required Documents */}
      <section className="py-16 bg-white">
        <div className="section-container">
          <h2 className="text-3xl font-serif text-center mb-12 text-brand-primary">
            Required Documents Checklist
          </h2>

          <div className="max-w-3xl mx-auto">
            <div className="bg-brand-light rounded-xl p-8">
              <p className="text-neutral-600 mb-6 text-center">
                Keep these documents ready before starting your admission process
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                {requiredDocuments.map((doc, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 bg-white rounded-lg p-4 border border-neutral-200"
                  >
                    <CheckCircle className="w-5 h-5 text-brand-secondary flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-neutral-700">{doc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Admission Enquiry Form */}
      <section className="py-16 bg-brand-light">
        <div className="section-container">
          <div className="max-w-2xl mx-auto text-center mb-8">
            <h2 className="text-3xl font-serif text-brand-primary mb-4">
              Submit Your Admission Enquiry
            </h2>
            <p className="text-neutral-600">
              Fill out the form below and our counselling team will get back to you within 24 hours
            </p>
          </div>
          <div className="max-w-3xl mx-auto bg-white rounded-xl p-8 shadow-sm">
            <EnquiryForm source="admission-page" />
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section className="py-12 bg-brand-primary text-white">
        <div className="section-container">
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-2xl font-serif mb-4">Need Immediate Assistance?</h3>
            <p className="text-white/90 mb-6">
              Our admission counsellors are available to answer your questions
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center text-sm">
              <div>
                <span className="text-white/70">Call us:</span>{' '}
                <a href="tel:+919999999999" className="font-semibold hover:text-brand-secondary">
                  +91 99999 99999
                </a>
              </div>
              <div className="hidden sm:block text-white/30">|</div>
              <div>
                <span className="text-white/70">Email:</span>{' '}
                <a
                  href="mailto:admissions@nibedita.in"
                  className="font-semibold hover:text-brand-secondary"
                >
                  admissions@nibedita.in
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
