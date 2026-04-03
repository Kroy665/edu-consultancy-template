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
    <section className="py-20 bg-gradient-to-b from-white via-brand-light/20 to-white relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-brand-secondary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-0 w-96 h-96 bg-brand-accent/5 rounded-full blur-3xl" />

      <div className="section-container relative z-10">
        <motion.h2
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={titleVariants}
          className="text-4xl md:text-5xl font-serif text-center mb-4 gradient-text-navy"
        >
          Explore Our Programs
        </motion.h2>
        <motion.p
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={titleVariants}
          className="text-center text-neutral-600 mb-16 max-w-2xl mx-auto"
        >
          Choose from our wide range of professional courses designed to shape your future
        </motion.p>

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
                  className="block bg-gradient-to-br from-white to-brand-light/30 border border-neutral-200/60 rounded-2xl p-7 hover:shadow-2xl transition-all duration-300 hover:border-brand-secondary/50 group h-full relative overflow-hidden"
                >
                  {/* Gradient Overlay on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-secondary/0 to-brand-accent/0 group-hover:from-brand-secondary/5 group-hover:to-brand-accent/5 transition-all duration-300 rounded-2xl" />

                  <div className="relative z-10">
                    <motion.div
                      initial={{ scale: 1, rotate: 0 }}
                      whileHover={{ scale: 1.15, rotate: 8 }}
                      transition={{ duration: 0.3, type: 'spring', stiffness: 300 }}
                      className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-brand-secondary/10 to-brand-accent/10 rounded-xl mb-4 group-hover:shadow-lg"
                    >
                      <Icon className="w-7 h-7 text-brand-secondary group-hover:text-brand-accent transition-colors" />
                    </motion.div>
                    <h3 className="font-semibold text-lg text-brand-navy mb-2 group-hover:text-brand-secondary transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-sm text-neutral-600 group-hover:text-neutral-700">{category.tagline}</p>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
