import type { Course } from '@/payload/payload-types'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { RichText } from '@/components/RichText'
import { Clock, CheckCircle, TrendingUp, FileText } from 'lucide-react'
import Link from 'next/link'
import type { CategorySettings } from '@/lib/getSiteSettings'

interface CoursePageTemplateProps {
  category: string
  categoryName: string
  categoryIcon: React.ComponentType<{ className?: string }>
  courses: Course[]
  categorySettings?: CategorySettings
}

export function CoursePageTemplate({
  category,
  categoryName,
  categoryIcon: Icon,
  courses,
  categorySettings,
}: CoursePageTemplateProps) {
  const headerTitle = categorySettings?.headerTitle || `${categoryName} Programs`
  const headerSubtitle = categorySettings?.headerSubtitle || `Build a rewarding career in ${categoryName.toLowerCase()}`

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brand-primary to-brand-primary/80 text-white py-16">
        <div className="section-container">
          <div className="max-w-3xl">
            <nav className="text-sm text-white/70 mb-4">
              <Link href="/" className="hover:text-white">
                Home
              </Link>
              <span className="mx-2">→</span>
              <Link href="/courses" className="hover:text-white">
                Courses
              </Link>
              <span className="mx-2">→</span>
              <span className="text-white">{categoryName}</span>
            </nav>
            <div className="flex items-center gap-4 mb-6">
              <div className="p-4 bg-white/10 rounded-lg">
                <Icon className="w-10 h-10" />
              </div>
              <h1 className="text-4xl md:text-5xl font-serif">{headerTitle}</h1>
            </div>
            <p className="text-lg text-white/90">
              {headerSubtitle}
            </p>
            {categorySettings?.categoryDescription ? (
              <div className="mt-6 text-white/90 prose prose-invert max-w-none">
                <RichText content={categorySettings.categoryDescription as any} />
              </div>
            ) : null}
          </div>
        </div>
      </section>

      {/* Courses List */}
      <section className="py-16 bg-white">
        <div className="section-container">
          <h2 className="text-3xl font-serif text-brand-primary mb-8">Available Courses</h2>
          <div className="space-y-6">
            {courses.map((course) => (
              <div
                key={course.id}
                id={course.id}
                className="bg-white border border-neutral-200 rounded-xl p-6 md:p-8 hover:shadow-md transition-all duration-200 scroll-mt-24"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-2xl font-semibold text-neutral-900">{course.name}</h3>
                      {course.featured && (
                        <Badge variant="secondary" className="text-xs">
                          Popular
                        </Badge>
                      )}
                    </div>
                    {course.shortDescription && (
                      <p className="text-neutral-600">{course.shortDescription}</p>
                    )}
                  </div>
                  {course.duration && (
                    <div className="flex items-center gap-2 text-sm text-neutral-600 bg-brand-light px-4 py-2 rounded-lg whitespace-nowrap">
                      <Clock className="w-4 h-4" />
                      <span className="font-semibold">{course.duration}</span>
                    </div>
                  )}
                </div>

                <div className="grid md:grid-cols-3 gap-6 mt-6">
                  {/* Eligibility */}
                  {course.eligibility && (
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <CheckCircle className="w-5 h-5 text-brand-secondary" />
                        <h4 className="font-semibold text-neutral-900">Eligibility</h4>
                      </div>
                      <RichText
                        content={course.eligibility}
                        className="text-sm"
                      />
                    </div>
                  )}

                  {/* Career Scope */}
                  {course.careerScope && (
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <TrendingUp className="w-5 h-5 text-brand-secondary" />
                        <h4 className="font-semibold text-neutral-900">Career Scope</h4>
                      </div>
                      <RichText
                        content={course.careerScope}
                        className="text-sm"
                      />
                    </div>
                  )}

                  {/* Admission Guidance */}
                  {course.admissionGuidance && (
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <FileText className="w-5 h-5 text-brand-secondary" />
                        <h4 className="font-semibold text-neutral-900">Admission Process</h4>
                      </div>
                      <RichText
                        content={course.admissionGuidance}
                        className="text-sm"
                      />
                    </div>
                  )}
                </div>

                <div className="mt-6 pt-6 border-t border-neutral-200">
                  <Button href="/admission" variant="primary" size="sm">
                    Apply for {course.name}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-12 bg-brand-secondary text-white">
        <div className="section-container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl font-serif mb-2">Need Help Choosing the Right Course?</h2>
              <p className="text-white/90">
                Our expert counsellors are here to guide you through the selection process
              </p>
            </div>
            <div className="flex gap-4">
              <Button
                href="/contact"
                variant="outline"
                size="lg"
                className="bg-white text-brand-secondary border-white hover:bg-white/90"
              >
                Get Free Counselling
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
