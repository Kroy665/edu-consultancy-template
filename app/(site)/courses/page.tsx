import type { Metadata } from 'next'
import type { Course } from '@/payload/payload-types'
import { getPayload } from 'payload'
import config from '@payload-config'
import Link from 'next/link'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Heart, Pill, Cpu, Award, Briefcase, GraduationCap, BookOpen, MoreHorizontal, Clock } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Explore All Courses',
  description:
    'Browse through our extensive range of courses including Nursing, Engineering, Pharmacy, Management, and more. Find the perfect course for your career goals.',
}

export const revalidate = 60;

const categoryIcons: Record<string, any> = {
  nursing: Heart,
  pharmacy: Pill,
  btech: Cpu,
  diploma: Award,
  management: Briefcase,
  education: GraduationCap,
  'general-degree': BookOpen,
  others: MoreHorizontal,
}

const categoryLabels: Record<string, string> = {
  nursing: 'Nursing',
  pharmacy: 'Pharmacy',
  btech: 'B.Tech',
  diploma: 'Diploma',
  management: 'Management',
  education: 'Education',
  'general-degree': 'General Degree',
  others: 'Others',
}

export default async function CoursesPage() {
  const payload = await getPayload({ config })

  // Fetch all courses from Payload CMS
  const { docs: courses } = await payload.find({
    collection: 'courses',
    limit: 100,
    sort: 'order',
  })

  // Group courses by category
  const coursesByCategory = courses.reduce((acc, course) => {
    const category = course.category as string
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(course)
    return acc
  }, {} as Record<string, typeof courses>)

  const categories = Object.keys(coursesByCategory)

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brand-primary to-brand-primary/80 text-white py-16">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-serif mb-6">Explore All Programs</h1>
            <p className="text-lg text-white/90 mb-8">
              Find the perfect course to launch your career. We offer guidance for 100+ courses
              across 8 major categories.
            </p>
          </div>
        </div>
      </section>

      {/* Course Categories */}
      <section className="py-16 bg-white">
        <div className="section-container">
          {categories.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-neutral-600">
                No courses available at the moment. Please check back later.
              </p>
            </div>
          ) : (
            <div className="space-y-16">
              {categories.map((category) => {
                const Icon = categoryIcons[category] || MoreHorizontal
                const categoryName = categoryLabels[category] || category
                const categoryCourses = coursesByCategory[category]

                return (
                  <div key={category}>
                    {/* Category Header */}
                    <div className="flex items-center gap-4 mb-8">
                      <div className="p-3 bg-brand-secondary/10 rounded-lg">
                        <Icon className="w-8 h-8 text-brand-secondary" />
                      </div>
                      <div className="flex-1">
                        <h2 className="text-3xl font-serif text-brand-primary">{categoryName}</h2>
                        <p className="text-neutral-600">{categoryCourses.length} courses available</p>
                      </div>
                      <Link
                        href={`/courses/${category}`}
                        className="text-brand-secondary hover:text-brand-secondary/80 font-semibold text-sm"
                      >
                        View All →
                      </Link>
                    </div>

                    {/* Courses Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {categoryCourses.map((course) => (
                        <div
                          key={course.id}
                          className="bg-white border border-neutral-200 rounded-xl p-6 hover:shadow-md transition-all duration-200 hover:border-brand-secondary"
                        >
                          <div className="flex items-start justify-between mb-4">
                            <Badge variant="secondary" className="text-xs">
                              {categoryName}
                            </Badge>
                            {course.featured && (
                              <Badge variant="primary" className="text-xs">
                                Popular
                              </Badge>
                            )}
                          </div>

                          <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                            {course.name}
                          </h3>

                          {course.shortDescription && (
                            <p className="text-sm text-neutral-600 mb-4 line-clamp-2">
                              {course.shortDescription}
                            </p>
                          )}

                          {course.duration && (
                            <div className="flex items-center gap-2 text-sm text-neutral-600 mb-4">
                              <Clock className="w-4 h-4" />
                              <span>{course.duration}</span>
                            </div>
                          )}

                          <Link
                            href={`/courses/${category}#${course.id}`}
                            className="inline-block text-brand-secondary hover:text-brand-secondary/80 font-semibold text-sm"
                          >
                            View Details →
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-brand-secondary text-white">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-serif mb-4">Ready to Start Your Journey?</h2>
            <p className="text-lg text-white/90 mb-8">
              Our expert counsellors are here to guide you through the admission process
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/admission" variant="outline" size="lg" className="bg-white text-brand-secondary border-white hover:bg-white/90">
                Apply Now
              </Button>
              <Button href="/contact" variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                Get Free Counselling
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
