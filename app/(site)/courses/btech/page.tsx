import type { Metadata } from 'next'
import type { Course } from '@/payload/payload-types'
import { getPayload } from 'payload'
import config from '@payload-config'
import { Cpu } from 'lucide-react'
import { CoursePageTemplate } from '@/components/course/CoursePageTemplate'

export const metadata: Metadata = {
  title: 'B.Tech Engineering Courses',
  description: 'Explore B.Tech engineering courses across 8+ specializations. Get admission guidance for top engineering colleges.',
}

export default async function BTechCoursesPage() {
  const payload = await getPayload({ config })
  const { docs: courses } = await payload.find({
    collection: 'courses',
    where: { category: { equals: 'btech' } },
    limit: 100,
    sort: 'order',
  })

  return <CoursePageTemplate category="btech" categoryName="B.Tech" categoryIcon={Cpu} courses={courses as Course[]} />
}
