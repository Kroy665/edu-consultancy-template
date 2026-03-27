import type { Metadata } from 'next'
import type { Course } from '@/payload/payload-types'
import { getPayload } from 'payload'
import config from '@payload-config'
import { BookOpen } from 'lucide-react'
import { CoursePageTemplate } from '@/components/course/CoursePageTemplate'
import { getCourseCategorySettings, DEFAULT_SITE_SETTINGS } from '@/lib/getSiteSettings'

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const categorySettings = await getCourseCategorySettings('generalDegree')
  return {
    title: categorySettings?.metaTitle || DEFAULT_SITE_SETTINGS.courseCategories.generalDegree.metaTitle,
    description: categorySettings?.metaDescription || DEFAULT_SITE_SETTINGS.courseCategories.generalDegree.metaDescription,
  }
}

export default async function GeneralDegreeCoursesPage() {
  const payload = await getPayload({ config })
  const categorySettings = await getCourseCategorySettings('generalDegree')
  const { docs: courses } = await payload.find({
    collection: 'courses',
    where: { category: { equals: 'general-degree' } },
    limit: 100,
    sort: 'order',
  })
  return <CoursePageTemplate category="general-degree" categoryName="General Degree" categoryIcon={BookOpen} courses={courses as Course[]} categorySettings={categorySettings || DEFAULT_SITE_SETTINGS.courseCategories.generalDegree} />
}
