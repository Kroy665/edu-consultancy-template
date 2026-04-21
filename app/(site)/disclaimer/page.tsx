import type { Metadata } from 'next'
import Link from 'next/link'
import { getSiteSettings, DEFAULT_SITE_SETTINGS } from '@/lib/getSiteSettings'
import { RichText } from '@/components/RichText'

// Legal pages change infrequently - revalidate once per day (86400 seconds)
export const revalidate = 86400

export const metadata: Metadata = {
  title: 'Disclaimer',
  description:
    'Disclaimer for EduConsult Pro services. Important information about our educational consultancy services.',
}

export default async function DisclaimerPage() {
  const siteSettings = await getSiteSettings()
  const settings = siteSettings || DEFAULT_SITE_SETTINGS

  // Parse address lines for contact section
  const addressLines = settings.contactInfo?.address?.split('\n') || []

  // Check if CMS has custom disclaimer content
  const hasCustomContent = siteSettings?.legalPages?.disclaimer

  return (
    <>
      <section className="bg-brand-light py-8 border-b border-neutral-200">
        <div className="section-container">
          <nav className="text-sm text-neutral-600 mb-4">
            <Link href="/" className="hover:text-brand-secondary">
              Home
            </Link>
            <span className="mx-2">→</span>
            <span className="text-neutral-900">Disclaimer</span>
          </nav>
          <h1 className="text-4xl font-serif text-brand-primary">Disclaimer</h1>
          <p className="text-neutral-600 mt-2">Last updated: March 25, 2026</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="section-container">
          <div className="max-w-3xl mx-auto prose prose-neutral">
            {hasCustomContent ? (
              // Render CMS content if available
              <RichText content={siteSettings?.legalPages?.disclaimer} />
            ) : (
              // Default content as fallback
              <>
            <h2>General Disclaimer</h2>
            <p>
              The information provided by EduConsult Pro ("we," "our," or "us") on our
              website and through our services is for general informational and educational purposes
              only. While we strive to provide accurate and up-to-date information, we make no
              representations or warranties of any kind, express or implied, about the completeness,
              accuracy, reliability, or availability of information.
            </p>

            <h2>No Guarantee of Admission</h2>
            <p>
              EduConsult Pro is an <strong>educational consultancy service</strong> that
              provides guidance and support for course selection and college admissions. We do not:
            </p>
            <ul>
              <li>Guarantee admission to any educational institution</li>
              <li>Have direct admission authority to any college or university</li>
              <li>Make admission decisions on behalf of educational institutions</li>
              <li>Guarantee specific academic outcomes or career success</li>
            </ul>
            <p>
              Final admission decisions are made solely by the respective educational institutions based
              on their criteria and availability of seats.
            </p>

            <h2>Advisory Nature of Services</h2>
            <p>
              Our services are purely advisory in nature. We provide:
            </p>
            <ul>
              <li>Career guidance based on your profile and aspirations</li>
              <li>Information about available courses and colleges</li>
              <li>Assistance with application procedures and documentation</li>
              <li>Support in navigating the admission process</li>
            </ul>
            <p>
              You are ultimately responsible for making your own decisions regarding course selection,
              college choice, and career path.
            </p>

            <h2>Information Accuracy</h2>
            <p>
              While we make every effort to ensure that the information about courses, colleges, fees,
              eligibility criteria, and admission processes is accurate and current:
            </p>
            <ul>
              <li>Colleges and universities may change their policies without prior notice</li>
              <li>Fee structures may be revised by institutions</li>
              <li>Admission criteria may change from year to year</li>
              <li>Course availability may vary</li>
            </ul>
            <p>
              We recommend verifying all critical information directly with the respective educational
              institutions before making final decisions.
            </p>

            <h2>Third-Party Institutions</h2>
            <p>
              We work with various educational institutions, banks, and service providers. However:
            </p>
            <ul>
              <li>We are not responsible for the quality of education provided by institutions</li>
              <li>We do not control admission policies or fee structures of colleges</li>
              <li>We are not liable for any disputes between students and educational institutions</li>
              <li>We do not guarantee loan approval by financial institutions</li>
              <li>Scholarship eligibility and approval are determined by respective authorities</li>
            </ul>

            <h2>Documentation and Legal Compliance</h2>
            <ul>
              <li>
                Students must ensure all documents submitted are genuine and authentic
              </li>
              <li>
                We assist with documentation but are not responsible for fraudulent or forged documents
              </li>
              <li>
                Compliance with admission requirements is the student's responsibility
              </li>
              <li>
                We do not engage in or support any illegal admission practices
              </li>
            </ul>

            <h2>Financial Disclaimers</h2>
            <ul>
              <li>
                All fees quoted are subject to change by the respective institutions
              </li>
              <li>
                Our service fees are separate from college fees and other charges
              </li>
              <li>
                We are not responsible for refunds issued by educational institutions
              </li>
              <li>
                Payment of service fees does not guarantee admission to any institution
              </li>
            </ul>

            <h2>External Links</h2>
            <p>
              Our website may contain links to external websites operated by educational institutions,
              government bodies, or other third parties. We:
            </p>
            <ul>
              <li>Do not control the content of these external sites</li>
              <li>Are not responsible for the accuracy of information on external sites</li>
              <li>Do not endorse or take responsibility for external content</li>
              <li>Recommend reviewing the privacy policies of external sites</li>
            </ul>

            <h2>Professional Advice</h2>
            <p>
              While our counsellors are experienced professionals, our guidance should not be considered
              as the sole basis for major life decisions. We recommend:
            </p>
            <ul>
              <li>Consulting with your parents or guardians</li>
              <li>Conducting your own research about courses and careers</li>
              <li>Visiting colleges and speaking with their admission offices</li>
              <li>Considering multiple perspectives before making decisions</li>
            </ul>

            <h2>Changes to Disclaimer</h2>
            <p>
              We reserve the right to modify this disclaimer at any time. Changes will be posted on this
              page with an updated revision date. Your continued use of our services after changes
              constitutes acceptance of the modified disclaimer.
            </p>

            <h2>Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, EduConsult Pro, its directors,
              employees, and affiliates shall not be liable for:
            </p>
            <ul>
              <li>Any direct or indirect losses arising from the use of our services</li>
              <li>Decisions made based on our guidance or advice</li>
              <li>Actions or omissions of third-party institutions</li>
              <li>Changes in admission policies or procedures by institutions</li>
              <li>Any consequential, incidental, or special damages</li>
            </ul>

            <h2>Contact Us</h2>
            <p>
              If you have any questions about this disclaimer or need clarification on any matter,
              please contact us:
            </p>
            <ul>
              {settings.contactInfo?.email && (
                <li>
                  <strong>Email:</strong>{' '}
                  <a href={`mailto:${settings.contactInfo.email}`} className="text-brand-secondary">
                    {settings.contactInfo.email}
                  </a>
                </li>
              )}
              {settings.contactInfo?.phone && (
                <li>
                  <strong>Phone:</strong> {settings.contactInfo.phone}
                </li>
              )}
              {addressLines.length > 0 && (
                <li>
                  <strong>Address:</strong> {addressLines.join(', ')}
                </li>
              )}
            </ul>
            </>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
