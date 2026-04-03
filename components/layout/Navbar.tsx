'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { Menu, X, ChevronDown, Search } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import type { Media } from '@/payload/payload-types'

const courseCategories = [
  { name: 'Nursing', slug: 'nursing' },
  { name: 'Pharmacy', slug: 'pharmacy' },
  { name: 'B.Tech', slug: 'btech' },
  { name: 'Diploma', slug: 'diploma' },
  { name: 'Management', slug: 'management' },
  { name: 'Education', slug: 'education' },
  { name: 'General Degree', slug: 'general-degree' },
  { name: 'Others', slug: 'others' },
]

interface NavbarProps {
  siteName?: string
  siteLogo?: string | Media | null
}

export function Navbar({ siteName = 'Nibedita Institute', siteLogo }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isCoursesDropdownOpen, setIsCoursesDropdownOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Get logo URL
  const logoUrl = siteLogo && typeof siteLogo === 'object' ? (siteLogo as Media).url : null

  // Helper function to check if a link is active
  const isActiveLink = (path: string) => {
    if (path === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(path)
  }

  return (
    <nav
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'glass border-b border-white/20 shadow-xl'
          : 'bg-white/95 backdrop-blur-sm'
      }`}
    >
      <div className="section-container">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            {logoUrl ? (
              <div className="relative h-12 w-auto">
                <Image
                  src={logoUrl}
                  alt={siteName}
                  height={48}
                  width={180}
                  className="h-12 w-auto object-contain"
                  priority
                />
              </div>
            ) : (
              <span className="text-xl md:text-2xl font-serif font-semibold text-brand-primary">
                {siteName}
              </span>
            )}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link
              href="/"
              className={`text-brand-navy hover:text-brand-secondary transition-colors duration-200 ${
                isActiveLink('/') ? 'text-brand-secondary font-semibold border-b-2 border-brand-secondary' : ''
              }`}
            >
              Home
            </Link>
            <Link
              href="/about"
              className={`text-brand-navy hover:text-brand-secondary transition-colors duration-200 ${
                isActiveLink('/about') ? 'text-brand-secondary font-semibold border-b-2 border-brand-secondary' : ''
              }`}
            >
              About
            </Link>

            {/* Courses Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsCoursesDropdownOpen(true)}
              onMouseLeave={() => setIsCoursesDropdownOpen(false)}
            >
              <button className={`flex items-center space-x-1 text-brand-navy hover:text-brand-secondary transition-colors duration-200 ${
                isActiveLink('/courses') ? 'text-brand-secondary font-semibold border-b-2 border-brand-secondary' : ''
              }`}>
                <span>Courses</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              {isCoursesDropdownOpen && (
                <div className="absolute top-full left-0 w-56 bg-white rounded-lg shadow-lg border border-neutral-200 py-2">
                  {courseCategories.map((category) => (
                    <Link
                      key={category.slug}
                      href={`/courses/${category.slug}`}
                      className={`block px-4 py-2 text-brand-navy hover:bg-brand-light hover:text-brand-secondary transition-colors duration-150 ${
                        pathname === `/courses/${category.slug}` ? 'bg-brand-light text-brand-secondary font-semibold' : ''
                      }`}
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/services"
              className={`text-brand-navy hover:text-brand-secondary transition-colors duration-200 ${
                isActiveLink('/services') ? 'text-brand-secondary font-semibold border-b-2 border-brand-secondary' : ''
              }`}
            >
              Services
            </Link>
            <Link
              href="/student-corner"
              className={`text-brand-navy hover:text-brand-secondary transition-colors duration-200 ${
                isActiveLink('/student-corner') ? 'text-brand-secondary font-semibold border-b-2 border-brand-secondary' : ''
              }`}
            >
              Student Corner
            </Link>
            <Link
              href="/blog"
              className={`text-brand-navy hover:text-brand-secondary transition-colors duration-200 ${
                isActiveLink('/blog') ? 'text-brand-secondary font-semibold border-b-2 border-brand-secondary' : ''
              }`}
            >
              Blog
            </Link>
            <Link
              href="/contact"
              className={`text-brand-navy hover:text-brand-secondary transition-colors duration-200 ${
                isActiveLink('/contact') ? 'text-brand-secondary font-semibold border-b-2 border-brand-secondary' : ''
              }`}
            >
              Contact
            </Link>
          </div>

          {/* Search & CTA Buttons (Desktop) */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/search"
              className="p-2 text-brand-navy hover:text-brand-secondary transition-colors duration-200"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </Link>
            <Button href="/admission" variant="primary" size="sm">
              Enquire Now
            </Button>
          </div>

          {/* Mobile Buttons */}
          <div className="flex lg:hidden items-center gap-2">
            <Link
              href="/search"
              className="p-2 text-brand-navy hover:text-brand-secondary transition-colors duration-200"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-brand-navy hover:text-brand-secondary"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-neutral-200">
          <div className="section-container py-4 space-y-4">
            <Link
              href="/"
              className={`block py-2 text-brand-navy hover:text-brand-secondary ${
                isActiveLink('/') ? 'text-brand-secondary font-semibold border-l-4 border-brand-secondary pl-2' : ''
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/about"
              className={`block py-2 text-brand-navy hover:text-brand-secondary ${
                isActiveLink('/about') ? 'text-brand-secondary font-semibold border-l-4 border-brand-secondary pl-2' : ''
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>

            {/* Mobile Courses Submenu */}
            <div>
              <button
                onClick={() => setIsCoursesDropdownOpen(!isCoursesDropdownOpen)}
                className={`flex items-center justify-between w-full py-2 text-brand-navy ${
                  isActiveLink('/courses') ? 'text-brand-secondary font-semibold border-l-4 border-brand-secondary pl-2' : ''
                }`}
              >
                <span>Courses</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    isCoursesDropdownOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {isCoursesDropdownOpen && (
                <div className="pl-4 mt-2 space-y-2">
                  {courseCategories.map((category) => (
                    <Link
                      key={category.slug}
                      href={`/courses/${category.slug}`}
                      className={`block py-2 text-sm text-brand-navy hover:text-brand-secondary ${
                        pathname === `/courses/${category.slug}` ? 'text-brand-secondary font-semibold border-l-2 border-brand-secondary pl-2' : ''
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/services"
              className={`block py-2 text-brand-navy hover:text-brand-secondary ${
                isActiveLink('/services') ? 'text-brand-secondary font-semibold border-l-4 border-brand-secondary pl-2' : ''
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Services
            </Link>
            <Link
              href="/student-corner"
              className={`block py-2 text-brand-navy hover:text-brand-secondary ${
                isActiveLink('/student-corner') ? 'text-brand-secondary font-semibold border-l-4 border-brand-secondary pl-2' : ''
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Student Corner
            </Link>
            <Link
              href="/blog"
              className={`block py-2 text-brand-navy hover:text-brand-secondary ${
                isActiveLink('/blog') ? 'text-brand-secondary font-semibold border-l-4 border-brand-secondary pl-2' : ''
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Blog
            </Link>
            <Link
              href="/contact"
              className={`block py-2 text-brand-navy hover:text-brand-secondary ${
                isActiveLink('/contact') ? 'text-brand-secondary font-semibold border-l-4 border-brand-secondary pl-2' : ''
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </Link>

            <Button href="/admission" variant="primary" size="md" fullWidth>
              Enquire Now
            </Button>
          </div>
        </div>
      )}
    </nav>
  )
}
