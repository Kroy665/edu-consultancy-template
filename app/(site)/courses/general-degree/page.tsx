import type { Metadata } from 'next'
import type { Course } from '@/payload/payload-types'
import { getPayload } from 'payload'
import config from '@payload-config'
import { BookOpen } from 'lucide-react'
import { CoursePageTemplate } from '@/components/course/CoursePageTemplate'

export const metadata: Metadata = {
  title: 'General Degree Courses',
  description: 'Explore BA, BSc, BCom and other general degree courses. Get admission guidance for top colleges.',
}

export const revalidate = 60;

export default async function GeneralDegreeCoursesPage() {
  const payload = await getPayload({ config })
  const { docs: courses } = await payload.find({
    collection: 'courses',
    where: { category: { equals: 'general-degree' } },
    limit: 100,
    sort: 'order',
  })

  return <CoursePageTemplate category="general-degree" categoryName="General Degree" categoryIcon={BookOpen} courses={courses as Course[]} />
}
