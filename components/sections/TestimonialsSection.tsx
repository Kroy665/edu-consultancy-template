'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import { Star } from 'lucide-react'

interface TestimonialData {
  id: string | number
  studentName: string
  course: string
  quote: string
  rating?: number
  photo?: {
    url: string
  } | null
}

interface TestimonialsSectionProps {
  testimonials: TestimonialData[]
}

export function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  if (!testimonials || testimonials.length === 0) {
    return null
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  }

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.9,
      rotateX: -15,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1] as const,
      },
    },
  }

  const starVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: (index: number) => ({
      scale: 1,
      rotate: 0,
      transition: {
        delay: 0.3 + index * 0.1,
        type: 'spring' as const,
        stiffness: 200,
        damping: 10,
      },
    }),
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
          What Our Students Say
        </motion.h2>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {testimonials.map((testimonial, index) => {
            // Get photo URL if exists
            const photoUrl = testimonial.photo?.url || null

            // Get initials for fallback
            const initials = testimonial.studentName
              .split(' ')
              .map((n) => n[0])
              .join('')
              .toUpperCase()
              .slice(0, 2)

            return (
              <motion.div
                key={testimonial.id}
                variants={cardVariants}
                whileHover={{
                  y: -10,
                  scale: 1.02,
                  transition: { duration: 0.3, ease: 'easeOut' as const },
                }}
                className="bg-brand-light rounded-xl p-6 border border-neutral-200 hover:border-brand-secondary hover:shadow-lg transition-all duration-300"
              >
                {/* Student Photo/Avatar */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={
                    isInView
                      ? { scale: 1, opacity: 1 }
                      : { scale: 0.8, opacity: 0 }
                  }
                  transition={{
                    delay: 0.2 + index * 0.15,
                    duration: 0.4,
                    ease: 'easeOut' as const,
                  }}
                  className="flex items-center gap-3 mb-4"
                >
                  {photoUrl ? (
                    <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-brand-secondary/20">
                      <Image
                        src={photoUrl}
                        alt={testimonial.studentName}
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-brand-secondary/10 flex items-center justify-center flex-shrink-0 ring-2 ring-brand-secondary/20">
                      <span className="text-brand-secondary font-semibold text-sm">
                        {initials}
                      </span>
                    </div>
                  )}
                  <div>
                    <p className="font-semibold text-neutral-900">
                      {testimonial.studentName}
                    </p>
                    <p className="text-xs text-neutral-600">{testimonial.course}</p>
                  </div>
                </motion.div>

                {/* Rating */}
                <div className="flex gap-1 mb-3">
                  {[...Array(testimonial.rating || 5)].map((_, i) => (
                    <motion.div
                      key={i}
                      custom={i}
                      variants={starVariants}
                      initial="hidden"
                      animate={isInView ? 'visible' : 'hidden'}
                    >
                      <Star className="w-4 h-4 fill-brand-secondary text-brand-secondary" />
                    </motion.div>
                  ))}
                </div>

                {/* Quote */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={
                    isInView ? { opacity: 1 } : { opacity: 0 }
                  }
                  transition={{
                    delay: 0.4 + index * 0.15,
                    duration: 0.5,
                  }}
                  className="text-neutral-700 text-sm italic leading-relaxed"
                >
                  &ldquo;{testimonial.quote}&rdquo;
                </motion.p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
