import type { Metadata } from 'next'
import type { Course } from '@/payload/payload-types'
import { getPayload } from 'payload'
import config from '@payload-config'
import { Briefcase } from 'lucide-react'
import { CoursePageTemplate } from '@/components/course/CoursePageTemplate'
import { getCourseCategorySettings, DEFAULT_SITE_SETTINGS } from '@/lib/getSiteSettings'

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const categorySettings = await getCourseCategorySettings('management')
  return {
    title: categorySettings?.metaTitle || DEFAULT_SITE_SETTINGS.courseCategories.management.metaTitle,
    description: categorySettings?.metaDescription || DEFAULT_SITE_SETTINGS.courseCategories.management.metaDescription,
  }
}

export default async function ManagementCoursesPage() {
  const payload = await getPayload({ config })
  const categorySettings = await getCourseCategorySettings('management')
  const { docs: courses } = await payload.find({
    collection: 'courses',
    where: { category: { equals: 'management' } },
    limit: 100,
    sort: 'order',
  })
  return <CoursePageTemplate category="management" categoryName="Management" categoryIcon={Briefcase} courses={courses as Course[]} categorySettings={categorySettings || DEFAULT_SITE_SETTINGS.courseCategories.management} />
}
