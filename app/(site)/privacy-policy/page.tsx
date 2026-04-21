import type { Metadata } from 'next'
import Link from 'next/link'
import { getSiteSettings, DEFAULT_SITE_SETTINGS } from '@/lib/getSiteSettings'
import { RichText } from '@/components/RichText'

// Legal pages change infrequently - revalidate once per day (86400 seconds)
export const revalidate = 86400

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Privacy Policy for EduConsult Pro. Learn how we collect, use, and protect your personal information.',
}

export default async function PrivacyPolicyPage() {
  const siteSettings = await getSiteSettings()
  const settings = siteSettings || DEFAULT_SITE_SETTINGS

  // Parse address lines for contact section
  const addressLines = settings.contactInfo?.address?.split('\n') || []

  // Check if CMS has custom privacy policy content
  const hasCustomContent = siteSettings?.legalPages?.privacyPolicy

  return (
    <>
      <section className="bg-brand-light py-8 border-b border-neutral-200">
        <div className="section-container">
          <nav className="text-sm text-neutral-600 mb-4">
            <Link href="/" className="hover:text-brand-secondary">
              Home
            </Link>
            <span className="mx-2">→</span>
            <span className="text-neutral-900">Privacy Policy</span>
          </nav>
          <h1 className="text-4xl font-serif text-brand-primary">Privacy Policy</h1>
          <p className="text-neutral-600 mt-2">Last updated: March 25, 2026</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="section-container">
          <div className="max-w-3xl mx-auto prose prose-neutral">
            {hasCustomContent ? (
              // Render CMS content if available
              <RichText content={siteSettings?.legalPages?.privacyPolicy} />
            ) : (
              // Default content as fallback
              <>
            <h2>Introduction</h2>
            <p>
              Welcome to EduConsult Pro ("we," "our," or "us"). We are committed to
              protecting your personal information and your right to privacy. This Privacy Policy
              explains how we collect, use, disclose, and safeguard your information when you visit
              our website or use our services.
            </p>

            <h2>Information We Collect</h2>
            <h3>Personal Information</h3>
            <p>We may collect personal information that you voluntarily provide to us when you:</p>
            <ul>
              <li>Submit an enquiry form</li>
              <li>Request admission guidance</li>
              <li>Subscribe to our newsletter</li>
              <li>Contact us via email or phone</li>
            </ul>
            <p>The personal information we collect may include:</p>
            <ul>
              <li>Full name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Academic qualifications</li>
              <li>Course preferences</li>
              <li>Any other information you choose to provide</li>
            </ul>

            <h3>Automatically Collected Information</h3>
            <p>When you visit our website, we may automatically collect certain information, including:</p>
            <ul>
              <li>IP address</li>
              <li>Browser type and version</li>
              <li>Operating system</li>
              <li>Pages visited and time spent on pages</li>
              <li>Referring website</li>
            </ul>

            <h2>How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Provide educational counselling and admission guidance services</li>
              <li>Respond to your enquiries and provide customer support</li>
              <li>Send you information about courses, colleges, and admission updates</li>
              <li>Improve our website and services</li>
              <li>Analyze website usage and trends</li>
              <li>Comply with legal obligations</li>
            </ul>

            <h2>Disclosure of Your Information</h2>
            <p>We may share your information with:</p>
            <ul>
              <li>
                <strong>Educational Institutions:</strong> We may share your information with colleges
                and universities for admission processing
              </li>
              <li>
                <strong>Service Providers:</strong> Third-party vendors who assist us in operating our
                website and providing services
              </li>
              <li>
                <strong>Legal Requirements:</strong> When required by law or to protect our rights
              </li>
            </ul>
            <p>
              We do not sell, rent, or trade your personal information to third parties for marketing
              purposes.
            </p>

            <h2>Data Security</h2>
            <p>
              We implement appropriate technical and organizational security measures to protect your
              personal information. However, no method of transmission over the internet is 100% secure,
              and we cannot guarantee absolute security.
            </p>

            <h2>Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Access the personal information we hold about you</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your personal information</li>
              <li>Object to or restrict processing of your information</li>
              <li>Withdraw consent at any time</li>
            </ul>

            <h2>Cookies and Tracking Technologies</h2>
            <p>
              We use cookies and similar tracking technologies to track activity on our website and store
              certain information. You can instruct your browser to refuse all cookies or to indicate
              when a cookie is being sent.
            </p>

            <h2>Third-Party Links</h2>
            <p>
              Our website may contain links to third-party websites. We are not responsible for the
              privacy practices of these external sites. We encourage you to read their privacy policies.
            </p>

            <h2>Children's Privacy</h2>
            <p>
              Our services are intended for individuals who are at least 16 years old. We do not
              knowingly collect information from children under 16. If you believe we have collected
              information from a child under 16, please contact us.
            </p>

            <h2>Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any changes by
              posting the new Privacy Policy on this page and updating the "Last updated" date.
            </p>

            <h2>Contact Us</h2>
            <p>If you have questions about this Privacy Policy, please contact us:</p>
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
