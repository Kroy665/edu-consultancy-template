import Link from 'next/link'
import { Mail, Phone, MapPin } from 'lucide-react'
import { FaFacebook, FaInstagram, FaYoutube, FaLinkedin, FaTwitter } from 'react-icons/fa'
import type { SiteSetting } from '@/payload/payload-types'
import { DEFAULT_SITE_SETTINGS } from '@/lib/getSiteSettings'

const courseCategories = [
  { name: 'Nursing', slug: 'nursing' },
  { name: 'Pharmacy', slug: 'pharmacy' },
  { name: 'B.Tech', slug: 'btech' },
  { name: 'Diploma', slug: 'diploma' },
  { name: 'Management', slug: 'management' },
  { name: 'Education', slug: 'education' },
]

interface FooterProps {
  siteSettings?: SiteSetting | null
}

export function Footer({ siteSettings }: FooterProps) {
  const settings = siteSettings || DEFAULT_SITE_SETTINGS
  const currentYear = new Date().getFullYear()

  // Parse address for display (split by newlines)
  const addressLines = settings.contactInfo?.address?.split('\n') || []

  return (
    <footer className="bg-neutral-900 text-white">
      <div className="section-container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo & Tagline */}
          <div>
            <h3 className="text-xl font-serif font-semibold mb-3">
              {settings.siteName}
            </h3>
            <p className="text-neutral-400 text-sm mb-4">
              {settings.siteTagline}
            </p>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Leading educational consultancy in Dhupguri, West Bengal, providing expert admission guidance and career counselling.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-neutral-400 hover:text-white transition-colors text-sm"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-neutral-400 hover:text-white transition-colors text-sm"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-neutral-400 hover:text-white transition-colors text-sm"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/admission"
                  className="text-neutral-400 hover:text-white transition-colors text-sm"
                >
                  Admission
                </Link>
              </li>
              <li>
                <Link
                  href="/student-corner"
                  className="text-neutral-400 hover:text-white transition-colors text-sm"
                >
                  Student Corner
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-neutral-400 hover:text-white transition-colors text-sm"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-neutral-400 hover:text-white transition-colors text-sm"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Courses */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Courses</h4>
            <ul className="space-y-2">
              {courseCategories.map((category) => (
                <li key={category.slug}>
                  <Link
                    href={`/courses/${category.slug}`}
                    className="text-neutral-400 hover:text-white transition-colors text-sm"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2 text-sm">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0 text-brand-secondary" />
                <span className="text-neutral-400">
                  {addressLines.map((line: string, idx: number) => (
                    <span key={idx}>
                      {line}
                      {idx < addressLines.length - 1 && <br />}
                    </span>
                  ))}
                </span>
              </li>
              {settings.contactInfo?.phone && (
                <li className="flex items-center space-x-2 text-sm">
                  <Phone className="w-4 h-4 flex-shrink-0 text-brand-secondary" />
                  <a
                    href={`tel:${settings.contactInfo.phone}`}
                    className="text-neutral-400 hover:text-white transition-colors"
                  >
                    {settings.contactInfo.phone}
                  </a>
                </li>
              )}
              {settings.contactInfo?.email && (
                <li className="flex items-center space-x-2 text-sm">
                  <Mail className="w-4 h-4 flex-shrink-0 text-brand-secondary" />
                  <a
                    href={`mailto:${settings.contactInfo.email}`}
                    className="text-neutral-400 hover:text-white transition-colors"
                  >
                    {settings.contactInfo.email}
                  </a>
                </li>
              )}
            </ul>

            {/* Social Media */}
            {(siteSettings?.socialMedia?.facebook || siteSettings?.socialMedia?.instagram || siteSettings?.socialMedia?.youtube || siteSettings?.socialMedia?.linkedin || siteSettings?.socialMedia?.twitter) && (
              <div className="mt-6 flex space-x-4">
                {siteSettings?.socialMedia?.facebook && (
                  <a
                    href={siteSettings.socialMedia.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-400 hover:text-white transition-colors"
                    aria-label="Facebook"
                  >
                    <FaFacebook className="w-5 h-5" />
                  </a>
                )}
                {siteSettings?.socialMedia?.instagram && (
                  <a
                    href={siteSettings.socialMedia.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-400 hover:text-white transition-colors"
                    aria-label="Instagram"
                  >
                    <FaInstagram className="w-5 h-5" />
                  </a>
                )}
                {siteSettings?.socialMedia?.youtube && (
                  <a
                    href={siteSettings.socialMedia.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-400 hover:text-white transition-colors"
                    aria-label="YouTube"
                  >
                    <FaYoutube className="w-5 h-5" />
                  </a>
                )}
                {siteSettings?.socialMedia?.linkedin && (
                  <a
                    href={siteSettings.socialMedia.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-400 hover:text-white transition-colors"
                    aria-label="LinkedIn"
                  >
                    <FaLinkedin className="w-5 h-5" />
                  </a>
                )}
                {siteSettings?.socialMedia?.twitter && (
                  <a
                    href={siteSettings.socialMedia.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-400 hover:text-white transition-colors"
                    aria-label="Twitter/X"
                  >
                    <FaTwitter className="w-5 h-5" />
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-neutral-800">
        <div className="section-container py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-neutral-400 text-sm">
              {settings.footer?.copyrightText || `© ${currentYear} ${settings.siteName}. All rights reserved.`}
            </p>
            {settings.footer?.showLegalLinks !== false && (
              <div className="flex space-x-6 text-sm">
                <Link
                  href="/privacy-policy"
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/terms-and-conditions"
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  Terms
                </Link>
                <Link
                  href="/disclaimer"
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  Disclaimer
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  )
}
