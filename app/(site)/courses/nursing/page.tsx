import type { Metadata } from 'next'
import type { Course } from '@/payload/payload-types'
import { getPayload } from 'payload'
import config from '@payload-config'
import { Heart } from 'lucide-react'
import { CoursePageTemplate } from '@/components/course/CoursePageTemplate'
import { getCourseCategorySettings, DEFAULT_SITE_SETTINGS } from '@/lib/getSiteSettings'

// Revalidate every 30 minutes (1800 seconds)
export const revalidate = 1800

export async function generateMetadata(): Promise<Metadata> {
  const categorySettings = await getCourseCategorySettings('nursing')

  return {
    title: categorySettings?.metaTitle || DEFAULT_SITE_SETTINGS.courseCategories.nursing.metaTitle,
    description: categorySettings?.metaDescription || DEFAULT_SITE_SETTINGS.courseCategories.nursing.metaDescription,
  }
}

export default async function NursingCoursesPage() {
  const payload = await getPayload({ config })
  const categorySettings = await getCourseCategorySettings('nursing')

  const { docs: courses } = await payload.find({
    collection: 'courses',
    where: {
      category: {
        equals: 'nursing',
      },
    },
    limit: 100,
    sort: 'order',
  })

  return (
    <CoursePageTemplate
      category="nursing"
      categoryName="Nursing"
      categoryIcon={Heart}
      courses={courses as Course[]}
      categorySettings={categorySettings || DEFAULT_SITE_SETTINGS.courseCategories.nursing}
    />
  )
}
