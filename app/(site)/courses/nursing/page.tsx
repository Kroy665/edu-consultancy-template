import type { Metadata } from 'next'
import type { Course } from '@/payload/payload-types'
import { getPayload } from 'payload'
import config from '@payload-config'
import { Heart } from 'lucide-react'
import { CoursePageTemplate } from '@/components/course/CoursePageTemplate'

export const metadata: Metadata = {
  title: 'Nursing Courses',
  description:
    'Explore nursing courses including B.Sc Nursing, GNM, and more. Get expert guidance for admission to top nursing colleges in West Bengal and across India.',
}

export default async function NursingCoursesPage() {
  const payload = await getPayload({ config })

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
    />
  )
}
