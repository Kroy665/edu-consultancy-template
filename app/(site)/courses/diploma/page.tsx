import type { Metadata } from 'next'
import type { Course } from '@/payload/payload-types'
import { getPayload } from 'payload'
import config from '@payload-config'
import { Award } from 'lucide-react'
import { CoursePageTemplate } from '@/components/course/CoursePageTemplate'
import { getCourseCategorySettings, DEFAULT_SITE_SETTINGS } from '@/lib/getSiteSettings'

export const revalidate = 1800  // 30 minutes

export async function generateMetadata(): Promise<Metadata> {
  const categorySettings = await getCourseCategorySettings('diploma')
  return {
    title: categorySettings?.metaTitle || DEFAULT_SITE_SETTINGS.courseCategories.diploma.metaTitle,
    description: categorySettings?.metaDescription || DEFAULT_SITE_SETTINGS.courseCategories.diploma.metaDescription,
  }
}

export default async function DiplomaCoursesPage() {
  const payload = await getPayload({ config })
  const categorySettings = await getCourseCategorySettings('diploma')
  const { docs: courses } = await payload.find({
    collection: 'courses',
    where: { category: { equals: 'diploma' } },
    limit: 100,
    sort: 'order',
  })
  return <CoursePageTemplate category="diploma" categoryName="Diploma" categoryIcon={Award} courses={courses as Course[]} categorySettings={categorySettings || DEFAULT_SITE_SETTINGS.courseCategories.diploma} />
}
