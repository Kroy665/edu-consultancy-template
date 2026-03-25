import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Terms and Conditions',
  description:
    'Terms and Conditions for using Nibedita Institute & Management services. Please read carefully before using our services.',
}

export default function TermsAndConditionsPage() {
  return (
    <>
      <section className="bg-brand-light py-8 border-b border-neutral-200">
        <div className="section-container">
          <nav className="text-sm text-neutral-600 mb-4">
            <Link href="/" className="hover:text-brand-secondary">
              Home
            </Link>
            <span className="mx-2">→</span>
            <span className="text-neutral-900">Terms and Conditions</span>
          </nav>
          <h1 className="text-4xl font-serif text-brand-primary">Terms and Conditions</h1>
          <p className="text-neutral-600 mt-2">Last updated: March 25, 2026</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="section-container">
          <div className="max-w-3xl mx-auto prose prose-neutral">
            <h2>Agreement to Terms</h2>
            <p>
              By accessing or using the services of Nibedita Institute & Management ("Company," "we,"
              "our," or "us"), you agree to be bound by these Terms and Conditions. If you disagree
              with any part of these terms, you may not use our services.
            </p>

            <h2>Services Provided</h2>
            <p>Nibedita Institute & Management provides educational consultancy services, including:</p>
            <ul>
              <li>Career counselling and guidance</li>
              <li>Course and college selection support</li>
              <li>Admission application assistance</li>
              <li>Documentation support</li>
              <li>Scholarship and education loan guidance</li>
            </ul>

            <h2>Service Fees and Payments</h2>
            <ul>
              <li>Initial career counselling sessions are provided free of charge</li>
              <li>
                Service fees for admission assistance will be communicated before you commit to our
                services
              </li>
              <li>All fees are non-refundable unless otherwise stated in writing</li>
              <li>Payment must be made through authorized channels only</li>
              <li>We do not accept any form of illegal or unethical payments</li>
            </ul>

            <h2>Your Responsibilities</h2>
            <p>When using our services, you agree to:</p>
            <ul>
              <li>Provide accurate and truthful information</li>
              <li>Submit all required documents in a timely manner</li>
              <li>Respond promptly to our communications</li>
              <li>Comply with all admission requirements of educational institutions</li>
              <li>Not engage in fraudulent or deceptive practices</li>
              <li>Attend all scheduled counselling sessions and meetings</li>
            </ul>

            <h2>Our Commitments</h2>
            <p>We commit to:</p>
            <ul>
              <li>Provide honest and professional guidance</li>
              <li>Maintain confidentiality of your personal information</li>
              <li>Use our best efforts to assist in your admission process</li>
              <li>Keep you informed about admission updates and deadlines</li>
              <li>Provide support throughout the admission process</li>
            </ul>

            <h2>Limitations and Disclaimers</h2>
            <ul>
              <li>
                <strong>No Guarantee of Admission:</strong> While we provide expert guidance, we cannot
                guarantee admission to any specific institution
              </li>
              <li>
                <strong>College Authority:</strong> Final admission decisions rest with the respective
                educational institutions
              </li>
              <li>
                <strong>Information Accuracy:</strong> We strive to provide accurate information but are
                not responsible for changes made by institutions without notice
              </li>
              <li>
                <strong>Third-Party Services:</strong> We are not responsible for services provided by
                educational institutions, banks, or other third parties
              </li>
            </ul>

            <h2>Intellectual Property</h2>
            <p>
              All content on our website, including text, graphics, logos, and images, is the property
              of Nibedita Institute & Management and is protected by copyright laws. You may not
              reproduce, distribute, or create derivative works without our written permission.
            </p>

            <h2>User Conduct</h2>
            <p>You agree not to:</p>
            <ul>
              <li>Use our services for any unlawful purpose</li>
              <li>Impersonate any person or entity</li>
              <li>Interfere with or disrupt our services</li>
              <li>Upload or transmit viruses or malicious code</li>
              <li>Collect or harvest information about other users</li>
              <li>Engage in any activity that could harm our reputation</li>
            </ul>

            <h2>Termination</h2>
            <p>
              We reserve the right to terminate or suspend your access to our services immediately,
              without prior notice, if you breach these Terms and Conditions.
            </p>

            <h2>Indemnification</h2>
            <p>
              You agree to indemnify and hold Nibedita Institute & Management harmless from any claims,
              damages, or expenses arising from your use of our services or violation of these terms.
            </p>

            <h2>Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, Nibedita Institute & Management shall not be
              liable for any indirect, incidental, special, or consequential damages arising from your
              use of our services.
            </p>

            <h2>Modifications to Terms</h2>
            <p>
              We reserve the right to modify these Terms and Conditions at any time. Changes will be
              effective immediately upon posting on our website. Your continued use of our services
              after changes constitutes acceptance of the modified terms.
            </p>

            <h2>Governing Law</h2>
            <p>
              These Terms and Conditions shall be governed by and construed in accordance with the laws
              of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in
              Jalpaiguri, West Bengal.
            </p>

            <h2>Severability</h2>
            <p>
              If any provision of these Terms and Conditions is found to be unenforceable, the remaining
              provisions shall continue in full force and effect.
            </p>

            <h2>Contact Information</h2>
            <p>For questions about these Terms and Conditions, please contact us:</p>
            <ul>
              <li>
                <strong>Email:</strong>{' '}
                <a href="mailto:info@nibedita.in" className="text-brand-secondary">
                  info@nibedita.in
                </a>
              </li>
              <li>
                <strong>Phone:</strong> +91 99999 99999
              </li>
              <li>
                <strong>Address:</strong> Nibedita Institute & Management, Dhupguri, Jalpaiguri, West
                Bengal — 735210
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  )
}
