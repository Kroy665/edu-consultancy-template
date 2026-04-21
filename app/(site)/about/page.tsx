import type { Metadata } from 'next'
import { Target, Eye, Award, Users, Clock, Shield } from 'lucide-react'
import Image from 'next/image'
import { getPageSettings, getSiteSettings, DEFAULT_SITE_SETTINGS } from '@/lib/getSiteSettings'

// Revalidate every hour (3600 seconds)
export const revalidate = 3600

export async function generateMetadata(): Promise<Metadata> {
  const pageSettings = await getPageSettings('aboutPage')

  return {
    title: pageSettings?.metaTitle || 'About Us | EduConsult Pro',
    description: pageSettings?.metaDescription || DEFAULT_SITE_SETTINGS.pages.aboutPage.metaDescription,
  }
}

export default async function AboutPage() {
  const pageSettings = await getPageSettings('aboutPage')
  const siteSettings = await getSiteSettings()
  const settings = siteSettings || DEFAULT_SITE_SETTINGS

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brand-navy via-brand-primary to-brand-navy text-white py-24 relative overflow-hidden animate-gradient">
        {/* Decorative Elements */}
        <div className="absolute top-10 right-10 w-96 h-96 bg-brand-secondary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-brand-accent/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

        <div className="section-container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif mb-6 leading-tight">
              <span className="gradient-text drop-shadow-lg">
                {pageSettings?.headerTitle || DEFAULT_SITE_SETTINGS.pages.aboutPage.headerTitle}
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/95 font-medium">
              {pageSettings?.headerSubtitle || DEFAULT_SITE_SETTINGS.pages.aboutPage.headerSubtitle}
            </p>
          </div>
        </div>
      </section>

      {/* About the Institute */}
      <section className="py-20 bg-gradient-to-b from-white via-brand-light/20 to-white relative overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute top-20 left-0 w-96 h-96 bg-brand-secondary/5 rounded-full blur-3xl" />

        <div className="section-container relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-serif mb-6">
                <span className="gradient-text-navy">Your Trusted</span><br />
                <span className="text-brand-navy">Education Partner</span>
              </h2>
              <div className="space-y-4 text-neutral-700 text-lg leading-relaxed">
                <p>
                  EduConsult Pro is a leading educational consultancy dedicated to guiding
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
            <div className="bg-gradient-to-br from-white to-brand-light/50 rounded-3xl p-8 shadow-2xl border border-neutral-200/60 hover:shadow-gold hover:-translate-y-2 transition-all duration-500 group">
              <div className="aspect-video bg-gradient-to-br from-brand-secondary via-brand-accent to-brand-secondary rounded-2xl flex items-center justify-center relative overflow-hidden animate-gradient">
                <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-transparent" />

                {/* Animated sparkle effect */}
                <div className="absolute top-4 right-4 w-2 h-2 bg-white/80 rounded-full animate-ping" />
                <div className="absolute bottom-6 left-6 w-1.5 h-1.5 bg-white/60 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
                <div className="absolute top-1/3 right-8 w-1 h-1 bg-white/70 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />

                <div className="text-white text-center relative z-10">
                  <div className="inline-flex items-center justify-center w-24 h-24 bg-white/20 backdrop-blur-sm rounded-2xl mb-4 shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                    <Award className="w-14 h-14 group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <p className="text-2xl font-bold drop-shadow-lg group-hover:scale-105 transition-transform duration-300">10+ Years of Excellence</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gradient-to-b from-brand-light/40 via-brand-orange/20 to-brand-light/40 relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-10 right-10 w-80 h-80 bg-brand-secondary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-brand-accent/10 rounded-full blur-3xl" />

        <div className="section-container relative z-10">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Mission */}
            <div className="bg-gradient-to-br from-white to-brand-light/30 rounded-2xl p-8 shadow-xl border border-brand-secondary/30 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-4 bg-gradient-to-br from-brand-secondary/20 to-brand-accent/20 rounded-xl group-hover:scale-110 transition-transform duration-300">
                  <Target className="w-10 h-10 text-brand-secondary" />
                </div>
                <h2 className="text-3xl font-serif gradient-text">Our Mission</h2>
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
            <div className="bg-gradient-to-br from-white to-brand-light/30 rounded-2xl p-8 shadow-xl border border-brand-navy/30 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-4 bg-gradient-to-br from-brand-navy/20 to-brand-primary/20 rounded-xl group-hover:scale-110 transition-transform duration-300">
                  <Eye className="w-10 h-10 text-brand-navy" />
                </div>
                <h2 className="text-3xl font-serif gradient-text-navy">Our Vision</h2>
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
      <section className="py-20 bg-gradient-to-b from-white to-brand-light/30 relative overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-accent/10 rounded-full blur-3xl" />

        <div className="section-container relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="bg-gradient-to-br from-white to-brand-light/50 rounded-3xl p-10 md:p-14 shadow-2xl border border-neutral-200/60">
              <div className="flex flex-col md:flex-row gap-10 items-start">
                <div className="w-36 h-36 bg-gradient-to-br from-brand-secondary via-brand-accent to-brand-secondary rounded-2xl flex items-center justify-center flex-shrink-0 shadow-gold animate-gradient relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-black/10 to-transparent" />
                  <div className="w-28 h-28 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <Users className="w-14 h-14 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <h2 className="text-3xl md:text-4xl font-serif mb-2">
                    <span className="gradient-text">Director's Message</span>
                  </h2>
                  <p className="text-base text-brand-navy font-semibold mb-6">Founder & Director</p>
                  <blockquote className="text-neutral-700 text-lg italic leading-relaxed pl-6 border-l-4 border-brand-secondary relative">
                    <span className="absolute -left-4 -top-4 text-6xl text-brand-secondary/20 font-serif">"</span>
                    "Education is the foundation of a successful future. At EduConsult Pro, we
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
      <section className="py-20 bg-gradient-to-b from-white via-brand-light/30 to-white relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-brand-secondary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-brand-accent/10 rounded-full blur-3xl" />

        <div className="section-container relative z-10">
          <h2 className="text-4xl md:text-5xl font-serif text-center mb-4">
            <span className="gradient-text">Why Students</span> <span className="text-brand-navy">Choose Us</span>
          </h2>
          <p className="text-center text-neutral-600 mb-16 max-w-2xl mx-auto text-lg">
            Discover what makes us the preferred choice for students across West Bengal
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                  className="bg-gradient-to-br from-white to-brand-light/30 rounded-2xl p-7 shadow-lg border border-neutral-200/60 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-secondary/0 to-brand-accent/0 group-hover:from-brand-secondary/5 group-hover:to-brand-accent/5 transition-all duration-300 rounded-2xl" />
                  <div className="relative z-10">
                    <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-brand-secondary/20 to-brand-accent/20 rounded-xl mb-5 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-8 h-8 text-brand-secondary" />
                    </div>
                    <h3 className="text-xl font-bold text-brand-navy mb-3 group-hover:text-brand-secondary transition-colors">{item.title}</h3>
                    <p className="text-neutral-600 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Certifications & Registrations */}
      <section className="py-20 bg-gradient-to-b from-brand-light/50 to-white relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-10 right-0 w-80 h-80 bg-brand-secondary/10 rounded-full blur-3xl" />

        <div className="section-container relative z-10">
          <h2 className="text-4xl md:text-5xl font-serif text-center mb-4">
            <span className="text-brand-navy">Certifications &</span> <span className="gradient-text">Registrations</span>
          </h2>
          <p className="text-center text-neutral-600 mb-16 max-w-2xl mx-auto text-lg">
            Recognized and certified by leading educational authorities
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {['Registered Consultancy', 'Verified Partner', 'ISO Certified', 'Member of IACEA'].map(
              (cert, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-white to-brand-light/40 rounded-2xl p-8 text-center border border-neutral-200/60 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-brand-secondary/20 to-brand-accent/20 rounded-xl mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
                    <Award className="w-10 h-10 text-brand-secondary" />
                  </div>
                  <p className="font-bold text-brand-navy text-base group-hover:text-brand-secondary transition-colors">{cert}</p>
                </div>
              )
            )}
          </div>
        </div>
      </section>
    </>
  )
}
