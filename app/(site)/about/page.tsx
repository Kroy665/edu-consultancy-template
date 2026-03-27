import type { Metadata } from 'next'
import { Target, Eye, Award, Users, Clock, Shield } from 'lucide-react'
import Image from 'next/image'
import { getSiteSettings, DEFAULT_SITE_SETTINGS } from '@/lib/getSiteSettings'

export async function generateMetadata(): Promise<Metadata> {
  const siteSettings = await getSiteSettings()
  const siteName = siteSettings?.siteName || DEFAULT_SITE_SETTINGS.siteName

  return {
    title: 'About Us',
    description: `Learn about ${siteName} - Leading educational consultancy in Dhupguri, West Bengal, helping students achieve their academic dreams.`,
  }
}

export default async function AboutPage() {
  const siteSettings = await getSiteSettings()
  const settings = siteSettings || DEFAULT_SITE_SETTINGS
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brand-primary to-brand-primary/80 text-white py-20">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-serif mb-6">About {settings.siteName}</h1>
            <p className="text-lg text-white/90">
              {settings.siteTagline}
            </p>
          </div>
        </div>
      </section>

      {/* About the Institute */}
      <section className="py-16 bg-white">
        <div className="section-container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-serif text-brand-primary mb-6">
                Your Trusted Education Partner
              </h2>
              <div className="space-y-4 text-neutral-700">
                <p>
                  Nibedita Institute & Management is a leading educational consultancy based in
                  Dhupguri, West Bengal. Since our inception, we have been dedicated to guiding
                  students through their educational journey, helping them find the right courses
                  and colleges that align with their career aspirations.
                </p>
                <p>
                  With over a decade of experience in the education sector, we have successfully
                  placed hundreds of students in prestigious institutions across India. Our team of
                  experienced counsellors provides personalized guidance, ensuring each student
                  receives the support they need to make informed decisions about their future.
                </p>
                <p>
                  We specialize in admissions for Nursing, Engineering, Pharmacy, Management,
                  Education, and various other professional courses. Our comprehensive services
                  include career counselling, college selection, admission assistance, scholarship
                  guidance, and education loan support.
                </p>
              </div>
            </div>
            <div className="bg-brand-light rounded-xl p-8">
              <div className="aspect-video bg-gradient-to-br from-brand-primary to-brand-secondary rounded-lg flex items-center justify-center">
                <div className="text-white text-center">
                  <Award className="w-20 h-20 mx-auto mb-4" />
                  <p className="text-xl font-semibold">10+ Years of Excellence</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-brand-light">
        <div className="section-container">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Mission */}
            <div className="bg-white rounded-xl p-8 border-l-4 border-brand-secondary">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-brand-secondary/10 rounded-lg">
                  <Target className="w-8 h-8 text-brand-secondary" />
                </div>
                <h2 className="text-2xl font-serif text-brand-primary">Our Mission</h2>
              </div>
              <p className="text-neutral-700">
                To provide accessible, reliable, and personalized educational guidance to every
                student, empowering them to make informed decisions about their academic and
                professional future. We strive to bridge the gap between students and quality
                educational institutions, ensuring every aspirant gets the opportunity to pursue
                their dreams.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-white rounded-xl p-8 border-l-4 border-brand-primary">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-brand-primary/10 rounded-lg">
                  <Eye className="w-8 h-8 text-brand-primary" />
                </div>
                <h2 className="text-2xl font-serif text-brand-primary">Our Vision</h2>
              </div>
              <p className="text-neutral-700">
                To become the most trusted and preferred educational consultancy in West Bengal and
                beyond, recognized for our commitment to student success, ethical practices, and
                excellence in service. We envision a future where every student has access to the
                right guidance and resources to achieve their full potential.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Director's Message */}
      <section className="py-16 bg-white">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <div className="bg-brand-light rounded-xl p-8 md:p-12">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="w-32 h-32 bg-gradient-to-br from-brand-primary to-brand-secondary rounded-full flex items-center justify-center flex-shrink-0">
                  <Users className="w-16 h-16 text-white" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-serif text-brand-primary mb-2">Director's Message</h2>
                  <p className="text-sm text-neutral-600 mb-4">Founder & Director</p>
                  <blockquote className="text-neutral-700 italic border-l-4 border-brand-secondary pl-4">
                    "Education is the foundation of a successful future. At Nibedita Institute, we
                    are committed to helping each student find their path to success. Our approach
                    is not just about securing admissions; it's about understanding each student's
                    unique aspirations and guiding them towards the right opportunities. We take
                    pride in being a trusted partner in our students' educational journeys, and we
                    look forward to helping many more students achieve their dreams."
                  </blockquote>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Students Choose Us */}
      <section className="py-16 bg-brand-light">
        <div className="section-container">
          <h2 className="text-3xl md:text-4xl font-serif text-center mb-12 text-brand-primary">
            Why Students Choose Us
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Users,
                title: 'Expert Counsellors',
                description:
                  'Our experienced team provides personalized guidance based on your academic background and career goals.',
              },
              {
                icon: Shield,
                title: 'Trusted Service',
                description:
                  'Transparent processes, ethical practices, and genuine care for student success.',
              },
              {
                icon: Award,
                title: 'Proven Track Record',
                description:
                  '500+ successful placements in top colleges across India with high satisfaction rates.',
              },
              {
                icon: Clock,
                title: 'End-to-End Support',
                description:
                  'From career counselling to admission confirmation, we support you at every step.',
              },
              {
                icon: Target,
                title: 'Wide Network',
                description:
                  'Partnerships with 50+ colleges and universities offering diverse course options.',
              },
              {
                icon: Eye,
                title: 'Student-Centric Approach',
                description:
                  'We prioritize your needs, preferences, and aspirations in every recommendation.',
              },
            ].map((item, index) => {
              const Icon = item.icon
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 border-l-4 border-brand-secondary"
                >
                  <Icon className="w-10 h-10 text-brand-secondary mb-4" />
                  <h3 className="text-lg font-semibold text-neutral-900 mb-2">{item.title}</h3>
                  <p className="text-neutral-600 text-sm">{item.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Certifications & Registrations */}
      <section className="py-16 bg-white">
        <div className="section-container">
          <h2 className="text-3xl font-serif text-center mb-12 text-brand-primary">
            Certifications & Registrations
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {['Registered Consultancy', 'Verified Partner', 'ISO Certified', 'Member of IACEA'].map(
              (cert, index) => (
                <div
                  key={index}
                  className="bg-brand-light rounded-xl p-6 text-center border border-neutral-200"
                >
                  <Award className="w-12 h-12 text-brand-secondary mx-auto mb-3" />
                  <p className="font-semibold text-neutral-900 text-sm">{cert}</p>
                </div>
              )
            )}
          </div>
        </div>
      </section>
    </>
  )
}
