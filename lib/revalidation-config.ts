/**
 * Centralized revalidation configuration for ISR (Incremental Static Regeneration)
 *
 * Optimized based on content update frequency:
 * - High frequency (60s): Home page with dynamic banners
 * - Medium frequency (30 min): Course pages, Blog
 * - Low frequency (1 hour): About, Services, Contact
 * - Static (24 hours): Legal pages
 */

export const REVALIDATION = {
  // Homepage - frequently changing content (banners, testimonials)
  HOME: 60, // 1 minute

  // Course-related pages - moderate updates
  COURSES_HUB: 1800, // 30 minutes
  COURSE_CATEGORY: 1800, // 30 minutes

  // Blog - moderate updates
  BLOG_LIST: 1800, // 30 minutes
  BLOG_POST: 3600, // 1 hour (once published, rarely changes)

  // Static content pages - infrequent updates
  ABOUT: 3600, // 1 hour
  SERVICES: 3600, // 1 hour
  ADMISSION: 3600, // 1 hour
  CONTACT: 3600, // 1 hour
  STUDENT_CORNER: 3600, // 1 hour

  // Legal pages - very infrequent updates
  LEGAL: 86400, // 24 hours
} as const

/**
 * Get human-readable time for a revalidation value
 */
export function getRevalidationLabel(seconds: number): string {
  if (seconds < 60) return `${seconds}s`
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m`
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h`
  return `${Math.floor(seconds / 86400)}d`
}
