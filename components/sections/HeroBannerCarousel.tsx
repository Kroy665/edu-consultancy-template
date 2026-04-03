'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'

interface BannerSlide {
  id: string
  headline: string
  subheadline?: string
  excerpt?: string
  ctaText?: string
  ctaLink?: string
  secondaryCtaText?: string
  secondaryCtaLink?: string
  backgroundImage?: {
    url: string
    alt: string
  } | null
}

interface HeroBannerCarouselProps {
  banners: BannerSlide[]
  autoPlayInterval?: number
}

export function HeroBannerCarousel({
  banners,
  autoPlayInterval = 5000
}: HeroBannerCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === banners.length - 1 ? 0 : prevIndex + 1
    )
  }, [banners.length])

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? banners.length - 1 : prevIndex - 1
    )
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || banners.length <= 1) return

    const interval = setInterval(goToNext, autoPlayInterval)
    return () => clearInterval(interval)
  }, [isAutoPlaying, autoPlayInterval, goToNext, banners.length])

  // Pause auto-play on hover
  const handleMouseEnter = () => setIsAutoPlaying(false)
  const handleMouseLeave = () => setIsAutoPlaying(true)

  if (banners.length === 0) {
    return (
      <section
        aria-label="Hero Banner"
        className="relative min-h-screen flex items-center bg-gradient-to-br from-brand-navy to-brand-navy/80"
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="section-container relative z-10 text-white py-20">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-6 leading-tight text-brand-accent">
              Admissions Open 2026 — Secure Your Future
            </h1>
            <p className="text-lg md:text-xl mb-8 text-white/90">
              Expert guidance for Nursing, Engineering, Pharmacy, MBA & 100+ more courses
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button href="/admission" variant="primary" size="lg">
                Apply Now
              </Button>
            </div>
          </div>
        </div>
      </section>
    )
  }

  const currentBanner = banners[currentIndex]

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  }

  const contentVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut' as const,
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    },
  }

  return (
    <section
      aria-label="Hero Banner Carousel"
      className="relative min-h-screen flex items-center bg-gradient-to-br from-brand-navy to-brand-navy/80 overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background Images with Carousel */}
      <AnimatePresence initial={false} custom={1}>
        <motion.div
          key={currentIndex}
          custom={1}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: 'spring', stiffness: 300, damping: 30 },
            opacity: { duration: 0.5 },
          }}
          className="absolute inset-0"
        >
          {currentBanner.backgroundImage?.url ? (
            <Image
              src={currentBanner.backgroundImage.url}
              alt={currentBanner.backgroundImage.alt || currentBanner.headline}
              fill
              sizes="100vw"
              className="object-cover"
              priority={currentIndex === 0}
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-brand-navy to-brand-navy/80" />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50 z-[1]" />

      {/* Content */}
      <div className="section-container relative z-10 text-white py-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="max-w-3xl"
          >
            {currentBanner.excerpt && (
              <motion.div variants={itemVariants}>
                <Badge variant="secondary" className="mb-6 inline-block">
                  {currentBanner.excerpt}
                </Badge>
              </motion.div>
            )}

            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-5xl lg:text-6xl font-serif mb-6 leading-tight text-brand-accent"
            >
              {currentBanner.headline}
            </motion.h1>

            {currentBanner.subheadline && (
              <motion.p
                variants={itemVariants}
                className="text-lg md:text-xl mb-8 text-white/90"
              >
                {currentBanner.subheadline}
              </motion.p>
            )}

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4"
            >
              {currentBanner.ctaText && currentBanner.ctaLink && (
                <Button href={currentBanner.ctaLink} variant="primary" size="lg">
                  {currentBanner.ctaText}
                </Button>
              )}
              {currentBanner.secondaryCtaText && currentBanner.secondaryCtaLink && (
                <Button
                  href={currentBanner.secondaryCtaLink}
                  variant="outline"
                  size="lg"
                  className="bg-white/10 border-brand-accent text-brand-accent hover:bg-brand-accent hover:text-brand-navy"
                >
                  {currentBanner.secondaryCtaText}
                </Button>
              )}
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Arrows (only show if more than 1 banner) */}
      {banners.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-200 hover:scale-110"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-200 hover:scale-110"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}

      {/* Dot Indicators (only show if more than 1 banner) */}
      {banners.length > 1 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentIndex
                  ? 'bg-brand-secondary w-8 h-3'
                  : 'bg-white/50 hover:bg-white/75 w-3 h-3'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  )
}
