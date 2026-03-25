import type { Metadata } from 'next'
import type { Course } from '@/payload/payload-types'
import { getPayload } from 'payload'
import config from '@payload-config'
import { Award } from 'lucide-react'
import { CoursePageTemplate } from '@/components/course/CoursePageTemplate'

export const metadata: Metadata = {
  title: 'Diploma Courses',
  description: 'Explore diploma courses in polytechnic and para-medical fields. Get admission guidance for top diploma colleges.',
}

export default async function DiplomaCoursesPage() {
  const payload = await getPayload({ config })
  const { docs: courses } = await payload.find({
    collection: 'courses',
    where: { category: { equals: 'diploma' } },
    limit: 100,
    sort: 'order',
  })

  return <CoursePageTemplate category="diploma" categoryName="Diploma" categoryIcon={Award} courses={courses as Course[]} />
}
