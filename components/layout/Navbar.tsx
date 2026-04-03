'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { Menu, X, ChevronDown } from 'lucide-react'
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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Get logo URL
  const logoUrl = siteLogo && typeof siteLogo === 'object' ? (siteLogo as Media).url : null

  return (
    <nav
      className={`sticky top-0 z-40 bg-white transition-all duration-200 ${
        isScrolled ? 'border-b border-neutral-200 shadow-sm' : ''
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
              className="text-brand-navy hover:text-brand-secondary transition-colors duration-200"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-brand-navy hover:text-brand-secondary transition-colors duration-200"
            >
              About
            </Link>

            {/* Courses Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsCoursesDropdownOpen(true)}
              onMouseLeave={() => setIsCoursesDropdownOpen(false)}
            >
              <button className="flex items-center space-x-1 text-brand-navy hover:text-brand-secondary transition-colors duration-200">
                <span>Courses</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              {isCoursesDropdownOpen && (
                <div className="absolute top-full left-0 w-56 bg-white rounded-lg shadow-lg border border-neutral-200 py-2">
                  {courseCategories.map((category) => (
                    <Link
                      key={category.slug}
                      href={`/courses/${category.slug}`}
                      className="block px-4 py-2 text-brand-navy hover:bg-brand-light hover:text-brand-secondary transition-colors duration-150"
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/services"
              className="text-brand-navy hover:text-brand-secondary transition-colors duration-200"
            >
              Services
            </Link>
            <Link
              href="/student-corner"
              className="text-brand-navy hover:text-brand-secondary transition-colors duration-200"
            >
              Student Corner
            </Link>
            <Link
              href="/blog"
              className="text-brand-navy hover:text-brand-secondary transition-colors duration-200"
            >
              Blog
            </Link>
            <Link
              href="/contact"
              className="text-brand-navy hover:text-brand-secondary transition-colors duration-200"
            >
              Contact
            </Link>
          </div>

          {/* CTA Button (Desktop) */}
          <div className="hidden lg:block">
            <Button href="/admission" variant="primary" size="sm">
              Enquire Now
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-neutral-800 hover:text-brand-primary"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-neutral-200">
          <div className="section-container py-4 space-y-4">
            <Link
              href="/"
              className="block py-2 text-brand-navy hover:text-brand-secondary"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/about"
              className="block py-2 text-brand-navy hover:text-brand-secondary"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>

            {/* Mobile Courses Submenu */}
            <div>
              <button
                onClick={() => setIsCoursesDropdownOpen(!isCoursesDropdownOpen)}
                className="flex items-center justify-between w-full py-2 text-brand-navy"
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
                      className="block py-2 text-sm text-brand-navy hover:text-brand-secondary"
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
              className="block py-2 text-brand-navy hover:text-brand-secondary"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Services
            </Link>
            <Link
              href="/student-corner"
              className="block py-2 text-brand-navy hover:text-brand-secondary"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Student Corner
            </Link>
            <Link
              href="/blog"
              className="block py-2 text-brand-navy hover:text-brand-secondary"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Blog
            </Link>
            <Link
              href="/contact"
              className="block py-2 text-brand-navy hover:text-brand-secondary"
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
