'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Users, Building2, BookOpen, Award } from 'lucide-react'

const stats = [
  {
    value: 500,
    suffix: '+',
    label: 'Students Placed',
    icon: Users,
  },
  {
    value: 50,
    suffix: '+',
    label: 'Partner Colleges',
    icon: Building2,
  },
  {
    value: 8,
    suffix: '+',
    label: 'Course Categories',
    icon: BookOpen,
  },
  {
    value: 10,
    suffix: '+',
    label: 'Years Experience',
    icon: Award,
  },
]

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  useEffect(() => {
    if (!isInView) return

    let startTime: number | null = null
    const duration = 2000 // 2 seconds

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)

      // Easing function for smooth animation
      const easeOutQuad = (t: number) => t * (2 - t)
      const easedProgress = easeOutQuad(progress)

      setCount(Math.floor(easedProgress * value))

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [isInView, value])

  return (
    <div ref={ref} className="text-4xl md:text-5xl font-bold text-brand-secondary mb-2">
      {count}
      {suffix}
    </div>
  )
}

export function WhyChooseUs() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1] as const,
      },
    },
  }

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 200,
        damping: 15,
        delay: 0.2,
      },
    },
  }

  return (
    <section className="py-16 bg-brand-light">
      <div className="section-container">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-3xl md:text-4xl font-serif text-center mb-12 text-brand-navy"
        >
          Why Choose Nibedita Institute
        </motion.h2>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="text-center group"
              >
                <motion.div
                  variants={iconVariants}
                  className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-brand-secondary/10 rounded-full group-hover:bg-brand-secondary/20 transition-colors"
                >
                  <Icon className="w-8 h-8 text-brand-secondary" />
                </motion.div>
                <Counter value={stat.value} suffix={stat.suffix} />
                <p className="text-brand-navy font-medium">{stat.label}</p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
