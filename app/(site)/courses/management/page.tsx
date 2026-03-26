import type { Metadata } from 'next'
import type { Course } from '@/payload/payload-types'
import { getPayload } from 'payload'
import config from '@payload-config'
import { Briefcase } from 'lucide-react'
import { CoursePageTemplate } from '@/components/course/CoursePageTemplate'

export const metadata: Metadata = {
  title: 'Management Courses',
  description: 'Explore MBA, BBA and other management courses. Get admission guidance for top management colleges.',
}

export const revalidate = 60;

export default async function ManagementCoursesPage() {
  const payload = await getPayload({ config })
  const { docs: courses } = await payload.find({
    collection: 'courses',
    where: { category: { equals: 'management' } },
    limit: 100,
    sort: 'order',
  })

  return <CoursePageTemplate category="management" categoryName="Management" categoryIcon={Briefcase} courses={courses as Course[]} />
}
