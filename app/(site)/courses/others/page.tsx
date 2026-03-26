import type { Metadata } from 'next'
import type { Course } from '@/payload/payload-types'
import { getPayload } from 'payload'
import config from '@payload-config'
import { MoreHorizontal } from 'lucide-react'
import { CoursePageTemplate } from '@/components/course/CoursePageTemplate'

export const metadata: Metadata = {
  title: 'Other Courses',
  description: 'Explore law, agriculture, library science and other specialized courses. Get admission guidance for various fields.',
}

export const revalidate = 60;

export default async function OtherCoursesPage() {
  const payload = await getPayload({ config })
  const { docs: courses } = await payload.find({
    collection: 'courses',
    where: { category: { equals: 'others' } },
    limit: 100,
    sort: 'order',
  })

  return <CoursePageTemplate category="others" categoryName="Others" categoryIcon={MoreHorizontal} courses={courses as Course[]} />
}
