import type { Metadata } from 'next'
import type { Course } from '@/payload/payload-types'
import { getPayload } from 'payload'
import config from '@payload-config'
import { MoreHorizontal } from 'lucide-react'
import { CoursePageTemplate } from '@/components/course/CoursePageTemplate'
import { getCourseCategorySettings, DEFAULT_SITE_SETTINGS } from '@/lib/getSiteSettings'

export const revalidate = 1800  // 30 minutes

export async function generateMetadata(): Promise<Metadata> {
  const categorySettings = await getCourseCategorySettings('others')
  return {
    title: categorySettings?.metaTitle || DEFAULT_SITE_SETTINGS.courseCategories.others.metaTitle,
    description: categorySettings?.metaDescription || DEFAULT_SITE_SETTINGS.courseCategories.others.metaDescription,
  }
}

export default async function OthersCoursesPage() {
  const payload = await getPayload({ config })
  const categorySettings = await getCourseCategorySettings('others')
  const { docs: courses } = await payload.find({
    collection: 'courses',
    where: { category: { equals: 'others' } },
    limit: 100,
    sort: 'order',
  })
  return <CoursePageTemplate category="others" categoryName="Others" categoryIcon={MoreHorizontal} courses={courses as Course[]} categorySettings={categorySettings || DEFAULT_SITE_SETTINGS.courseCategories.others} />
}
