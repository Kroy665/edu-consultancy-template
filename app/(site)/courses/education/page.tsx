import type { Metadata } from 'next'
import type { Course } from '@/payload/payload-types'
import { getPayload } from 'payload'
import config from '@payload-config'
import { GraduationCap } from 'lucide-react'
import { CoursePageTemplate } from '@/components/course/CoursePageTemplate'

export const metadata: Metadata = {
  title: 'Education Courses',
  description: 'Explore B.Ed, D.Ed, M.Ed and other education courses. Get admission guidance for top education colleges.',
}

export const revalidate = 60;

export default async function EducationCoursesPage() {
  const payload = await getPayload({ config })
  const { docs: courses } = await payload.find({
    collection: 'courses',
    where: { category: { equals: 'education' } },
    limit: 100,
    sort: 'order',
  })

  return <CoursePageTemplate category="education" categoryName="Education" categoryIcon={GraduationCap} courses={courses as Course[]} />
}
