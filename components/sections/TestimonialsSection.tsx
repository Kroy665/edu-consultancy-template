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
    <section className="py-20 bg-gradient-to-b from-white via-brand-light/30 to-white relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 w-80 h-80 bg-brand-secondary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-brand-accent/10 rounded-full blur-3xl" />

      <div className="section-container relative z-10">
        <motion.h2
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={titleVariants}
          className="text-4xl md:text-5xl font-serif text-center mb-4"
        >
          <span className="gradient-text">What Our Students</span> <span className="text-brand-navy">Say</span>
        </motion.h2>
        <motion.p
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={titleVariants}
          className="text-center text-neutral-600 mb-16 max-w-2xl mx-auto"
        >
          Real success stories from students who transformed their careers with us
        </motion.p>

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
                  y: -12,
                  scale: 1.03,
                  transition: { duration: 0.3, ease: 'easeOut' as const },
                }}
                className="bg-gradient-to-br from-white to-brand-light/50 rounded-2xl p-7 border border-neutral-200/60 hover:border-brand-secondary/50 hover:shadow-2xl transition-all duration-300 relative overflow-hidden group"
              >
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-brand-secondary/0 to-brand-accent/0 group-hover:from-brand-secondary/5 group-hover:to-brand-accent/5 transition-all duration-300 rounded-2xl" />
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
                  className="flex items-center gap-3 mb-4 relative z-10"
                >
                  {photoUrl ? (
                    <div className="relative w-14 h-14 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-brand-secondary/30 group-hover:ring-brand-secondary transition-all duration-300">
                      <Image
                        src={photoUrl}
                        alt={testimonial.studentName}
                        fill
                        sizes="56px"
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-brand-secondary/20 to-brand-accent/20 flex items-center justify-center flex-shrink-0 ring-2 ring-brand-secondary/30 group-hover:ring-brand-secondary transition-all duration-300">
                      <span className="text-brand-secondary font-bold text-base">
                        {initials}
                      </span>
                    </div>
                  )}
                  <div>
                    <p className="font-bold text-brand-navy group-hover:text-brand-secondary transition-colors">
                      {testimonial.studentName}
                    </p>
                    <p className="text-sm text-neutral-600">{testimonial.course}</p>
                  </div>
                </motion.div>

                {/* Rating */}
                <div className="flex gap-1 mb-4 relative z-10">
                  {[...Array(testimonial.rating || 5)].map((_, i) => (
                    <motion.div
                      key={i}
                      custom={i}
                      variants={starVariants}
                      initial="hidden"
                      animate={isInView ? 'visible' : 'hidden'}
                    >
                      <Star className="w-5 h-5 fill-brand-secondary text-brand-secondary drop-shadow-sm" />
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
                  className="text-neutral-700 text-base italic leading-relaxed relative z-10 pl-6"
                >
                  <span className="absolute -left-2 -top-4 text-6xl text-brand-secondary/20 font-serif">&ldquo;</span>
                  {testimonial.quote}&rdquo;
                </motion.p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
