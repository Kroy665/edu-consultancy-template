import type { Metadata } from 'next'
import type { Course } from '@/payload/payload-types'
import { getPayload } from 'payload'
import config from '@payload-config'
import { Pill } from 'lucide-react'
import { CoursePageTemplate } from '@/components/course/CoursePageTemplate'
import { getCourseCategorySettings, DEFAULT_SITE_SETTINGS } from '@/lib/getSiteSettings'

export const revalidate = 1800  // 30 minutes

export async function generateMetadata(): Promise<Metadata> {
  const categorySettings = await getCourseCategorySettings('pharmacy')

  return {
    title: categorySettings?.metaTitle || DEFAULT_SITE_SETTINGS.courseCategories.pharmacy.metaTitle,
    description: categorySettings?.metaDescription || DEFAULT_SITE_SETTINGS.courseCategories.pharmacy.metaDescription,
  }
}

export default async function PharmacyCoursesPage() {
  const payload = await getPayload({ config })
  const categorySettings = await getCourseCategorySettings('pharmacy')

  const { docs: courses } = await payload.find({
    collection: 'courses',
    where: { category: { equals: 'pharmacy' } },
    limit: 100,
    sort: 'order',
  })

  return (
    <CoursePageTemplate
      category="pharmacy"
      categoryName="Pharmacy"
      categoryIcon={Pill}
      courses={courses as Course[]}
      categorySettings={categorySettings || DEFAULT_SITE_SETTINGS.courseCategories.pharmacy}
    />
  )
}
