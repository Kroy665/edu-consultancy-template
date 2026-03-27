import type { Metadata } from 'next'
import type { Course } from '@/payload/payload-types'
import { getPayload } from 'payload'
import config from '@payload-config'
import { Cpu } from 'lucide-react'
import { CoursePageTemplate } from '@/components/course/CoursePageTemplate'
import { getCourseCategorySettings, DEFAULT_SITE_SETTINGS } from '@/lib/getSiteSettings'

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const categorySettings = await getCourseCategorySettings('btech')

  return {
    title: categorySettings?.metaTitle || DEFAULT_SITE_SETTINGS.courseCategories.btech.metaTitle,
    description: categorySettings?.metaDescription || DEFAULT_SITE_SETTINGS.courseCategories.btech.metaDescription,
  }
}

export default async function BTechCoursesPage() {
  const payload = await getPayload({ config })
  const categorySettings = await getCourseCategorySettings('btech')

  const { docs: courses } = await payload.find({
    collection: 'courses',
    where: { category: { equals: 'btech' } },
    limit: 100,
    sort: 'order',
  })

  return (
    <CoursePageTemplate
      category="btech"
      categoryName="B.Tech"
      categoryIcon={Cpu}
      courses={courses as Course[]}
      categorySettings={categorySettings || DEFAULT_SITE_SETTINGS.courseCategories.btech}
    />
  )
}
