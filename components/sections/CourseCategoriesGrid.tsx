'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import { Heart, Pill, Cpu, Award, Briefcase, GraduationCap, BookOpen, MoreHorizontal, LucideIcon } from 'lucide-react'

interface CourseCategory {
  name: string
  slug: string
  icon: string
  tagline: string
}

interface CourseCategoriesGridProps {
  categories: CourseCategory[]
}

const iconMap: Record<string, LucideIcon> = {
  Heart,
  Pill,
  Cpu,
  Award,
  Briefcase,
  GraduationCap,
  BookOpen,
  MoreHorizontal,
}

export function CourseCategoriesGrid({ categories }: CourseCategoriesGridProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 40,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1] as const,
      },
    },
  }

  const titleVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut' as const,
      },
    },
  }

  return (
    <section className="py-16 bg-white">
      <div className="section-container">
        <motion.h2
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={titleVariants}
          className="text-3xl md:text-4xl font-serif text-center mb-12 text-brand-primary"
        >
          Explore Our Programs
        </motion.h2>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {categories.map((category, index) => {
            const Icon = iconMap[category.icon] || BookOpen
            return (
              <motion.div
                key={category.slug}
                variants={itemVariants}
                whileHover={{
                  y: -8,
                  transition: { duration: 0.3, ease: 'easeOut' as const }
                }}
              >
                <Link
                  href={`/courses/${category.slug}`}
                  className="block bg-white border border-neutral-200 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300 hover:border-brand-secondary group h-full"
                >
                  <motion.div
                    initial={{ scale: 1, rotate: 0 }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Icon className="w-10 h-10 text-brand-secondary mb-3 transition-transform" />
                  </motion.div>
                  <h3 className="font-semibold text-neutral-900 mb-1 group-hover:text-brand-primary transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-sm text-neutral-600">{category.tagline}</p>
                </Link>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
