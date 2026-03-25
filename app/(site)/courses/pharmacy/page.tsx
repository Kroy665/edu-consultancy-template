import type { Metadata } from 'next'
import type { Course } from '@/payload/payload-types'
import { getPayload } from 'payload'
import config from '@payload-config'
import { Pill } from 'lucide-react'
import { CoursePageTemplate } from '@/components/course/CoursePageTemplate'

export const metadata: Metadata = {
  title: 'Pharmacy Courses',
  description: 'Explore pharmacy courses including B.Pharm, D.Pharm, and more. Get expert guidance for admission to top pharmacy colleges.',
}

export default async function PharmacyCoursesPage() {
  const payload = await getPayload({ config })
  const { docs: courses } = await payload.find({
    collection: 'courses',
    where: { category: { equals: 'pharmacy' } },
    limit: 100,
    sort: 'order',
  })

  return <CoursePageTemplate category="pharmacy" categoryName="Pharmacy" categoryIcon={Pill} courses={courses as Course[]} />
}
