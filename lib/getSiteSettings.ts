import { cache } from 'react'
import { getPayloadClient } from '@/lib/payload'
import type { SiteSetting } from '@/payload/payload-types'

// TypeScript interfaces for site settings structure
export interface PageSettings {
  metaTitle?: string
  metaDescription?: string
  headerTitle?: string
  headerSubtitle?: string
  headerDescription?: unknown // RichText type from Payload
}

export interface BlogPageSettings extends PageSettings {
  postsPerPage?: number
}

export interface ContactPageSettings extends PageSettings {
  showMap?: boolean
}

export interface AdmissionPageSettings extends PageSettings {
  showBanner?: boolean
  bannerText?: string
}

export interface CoursesPageSettings extends PageSettings {}
export interface ServicesPageSettings extends PageSettings {}
export interface StudentCornerPageSettings extends PageSettings {}
export interface AboutPageSettings extends PageSettings {}
export interface HomePageSettings {
  metaTitle?: string
  metaDescription?: string
}

export interface CategorySettings {
  metaTitle?: string
  metaDescription?: string
  headerTitle?: string
  headerSubtitle?: string
  categoryDescription?: unknown // RichText type from Payload
}

export interface SiteSettingsPages {
  homePage?: HomePageSettings
  aboutPage?: AboutPageSettings
  coursesPage?: CoursesPageSettings
  servicesPage?: ServicesPageSettings
  admissionPage?: AdmissionPageSettings
  studentCornerPage?: StudentCornerPageSettings
  blogPage?: BlogPageSettings
  contactPage?: ContactPageSettings
}

export interface SiteSettingsCategories {
  nursing?: CategorySettings
  pharmacy?: CategorySettings
  btech?: CategorySettings
  diploma?: CategorySettings
  management?: CategorySettings
  education?: CategorySettings
  generalDegree?: CategorySettings
  others?: CategorySettings
}

export interface ExtendedSiteSettings extends SiteSetting {
  pages?: SiteSettingsPages
  courseCategories?: SiteSettingsCategories
}

/**
 * Fetch site settings from Payload CMS
 * Returns the first (and should be only) site settings document
 * This function is cached using React cache() to prevent duplicate queries per request
 */
const getSiteSettingsUncached = async (): Promise<ExtendedSiteSettings | null> => {
  try {
    const payload = await getPayloadClient()

    const { docs } = await payload.find({
      collection: 'site-settings',
      limit: 1,
      depth: 2, // Fetch related media (logo, favicon)
    })

    return (docs[0] as ExtendedSiteSettings) || null
  } catch (error) {
    console.error('Error fetching site settings:', error)
    // Return null to use DEFAULT_SITE_SETTINGS as fallback
    // This prevents the app from crashing if MongoDB connection fails
    return null
  }
}

// Export cached version to prevent duplicate database calls
export const getSiteSettings = cache(getSiteSettingsUncached)

/**
 * Helper function to get page-specific metadata
 * @param pageName - The page identifier
 * @returns Page-specific metadata and header content
 */
export async function getPageSettings<K extends keyof SiteSettingsPages>(
  pageName: K
): Promise<SiteSettingsPages[K] | null> {
  const settings = await getSiteSettings()
  return settings?.pages?.[pageName] || null
}

/**
 * Helper function to get course category-specific settings
 * @param category - The course category identifier
 * @returns Category-specific metadata and header content
 */
export async function getCourseCategorySettings<K extends keyof SiteSettingsCategories>(
  category: K
): Promise<CategorySettings | null> {
  const settings = await getSiteSettings()
  return settings?.courseCategories?.[category] || null
}

/**
 * Default fallback values if site settings are not configured
 */
export const DEFAULT_SITE_SETTINGS = {
  siteName: 'EduConsult Pro',
  siteTagline: 'Your Gateway to Quality Education',
  contactInfo: {
    address: 'Your Institute Name\nYour Street Address\nYour City, Your State — Postal Code',
    phone: '+1 234 567 8900',
    alternatePhone: undefined,
    whatsapp: '1234567890',
    whatsappMessage: 'Hi, I want to know more about admissions.',
    email: 'info@yourdomain.com',
    secondaryEmail: 'admin@yourdomain.com',
  },
  location: {
    googleMapsEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.2219901290355!2d-74.00369368400567!3d40.71312937933155!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a316b4b2b5d%3A0x5e8f8e9f51fc6b!2sNew%20York%2C%20NY!5e0!3m2!1sen!2sus!4v1234567890',
  },
  footer: {
    copyrightText: '© 2026 Your Institute Name. All rights reserved.',
    showLegalLinks: true,
  },
  businessHours: {
    workingDays: 'Monday - Friday',
    workingHours: '9:00 AM - 5:00 PM',
    closedDays: 'Weekends & Public Holidays',
  },
  seo: {
    metaDescription: 'Leading educational consultancy offering admission guidance for Nursing, Engineering, Pharmacy, MBA and more. Expert career counselling for students.',
    keywords: [
      { keyword: 'educational consultancy' },
      { keyword: 'admission guidance' },
      { keyword: 'nursing admission' },
      { keyword: 'engineering admission' },
      { keyword: 'career counselling' },
    ],
  },
  pages: {
    homePage: {
      metaTitle: 'EduConsult Pro | Educational Consultancy Services',
      metaDescription: 'Leading educational consultancy offering admission guidance for Nursing, Engineering, Pharmacy, MBA and more.',
    },
    aboutPage: {
      metaTitle: 'About Us | EduConsult Pro',
      metaDescription: 'Learn about our mission, vision, and commitment to helping students achieve their educational goals.',
      headerTitle: 'About Us',
      headerSubtitle: 'Your trusted partner in education',
    },
    coursesPage: {
      metaTitle: 'Explore All Programs | EduConsult Pro',
      metaDescription: 'Browse through our comprehensive list of courses including Nursing, Engineering, Pharmacy, Management, and more.',
      headerTitle: 'Explore All Programs',
      headerSubtitle: 'Find the perfect course to match your career aspirations',
    },
    blogPage: {
      metaTitle: 'Blog | EduConsult Pro',
      metaDescription: 'Latest articles on career guidance, admission tips, education trends, and student success stories.',
      headerTitle: 'Our Blog',
      headerSubtitle: 'Insights, tips, and news from the world of education',
      postsPerPage: 12,
    },
    contactPage: {
      metaTitle: 'Contact Us | EduConsult Pro',
      metaDescription: 'Get in touch with us for admission enquiries, career counselling, and educational guidance.',
      headerTitle: 'Contact Us',
      headerSubtitle: "We're here to help you with your educational journey",
      showMap: true,
    },
    admissionPage: {
      metaTitle: 'Admission Process | EduConsult Pro',
      metaDescription: 'Learn about our admission process, eligibility criteria, required documents, and start your application today.',
      headerTitle: 'Start Your Admission Journey',
      headerSubtitle: 'Simple, transparent, and hassle-free admission process',
      showBanner: true,
      bannerText: 'Admissions Open for 2026 Session',
    },
    servicesPage: {
      metaTitle: 'Our Services | EduConsult Pro',
      metaDescription: 'Comprehensive educational consultancy services including career counselling, admission guidance, and scholarship assistance.',
      headerTitle: 'Our Services',
      headerSubtitle: 'Comprehensive support for your educational journey',
    },
    studentCornerPage: {
      metaTitle: 'Student Corner | EduConsult Pro',
      metaDescription: 'FAQs, career guidance articles, admission updates, and resources for students.',
      headerTitle: 'Student Corner',
      headerSubtitle: 'Resources and information to help you succeed',
    },
  },
  courseCategories: {
    nursing: {
      metaTitle: 'Nursing Courses | B.Sc Nursing, GNM & More',
      metaDescription: 'Explore nursing courses including B.Sc Nursing, GNM, ANM, and post-basic nursing programs.',
      headerTitle: 'Nursing Programs',
      headerSubtitle: 'Build a rewarding career in healthcare',
    },
    pharmacy: {
      metaTitle: 'Pharmacy Courses | B.Pharm, D.Pharm & More',
      metaDescription: 'Explore pharmacy courses including B.Pharm, D.Pharm, and pharmaceutical science programs.',
      headerTitle: 'Pharmacy Programs',
      headerSubtitle: 'Launch your career in pharmaceutical sciences',
    },
    btech: {
      metaTitle: 'Engineering Courses | B.Tech Programs',
      metaDescription: 'Explore B.Tech engineering programs in CSE, Mechanical, Civil, Electrical, and more specializations.',
      headerTitle: 'Engineering Programs',
      headerSubtitle: 'Shape the future with engineering excellence',
    },
    diploma: {
      metaTitle: 'Diploma Courses | Polytechnic & Paramedical',
      metaDescription: 'Explore diploma courses in engineering, paramedical, and technical fields.',
      headerTitle: 'Diploma Programs',
      headerSubtitle: 'Fast-track your career with industry-ready skills',
    },
    management: {
      metaTitle: 'Management Courses | MBA, BBA & More',
      metaDescription: 'Explore management programs including MBA, BBA, and specialized business courses.',
      headerTitle: 'Management Programs',
      headerSubtitle: "Develop leadership skills for tomorrow's business world",
    },
    education: {
      metaTitle: 'Education Courses | B.Ed, D.Ed, M.Ed',
      metaDescription: 'Explore teacher training programs including B.Ed, D.Ed, M.Ed, and other education courses.',
      headerTitle: 'Education Programs',
      headerSubtitle: 'Shape young minds and inspire the next generation',
    },
    generalDegree: {
      metaTitle: 'General Degree Courses | BA, BSc, BCom',
      metaDescription: 'Explore general degree programs including BA, BSc, BCom, and various undergraduate courses.',
      headerTitle: 'General Degree Programs',
      headerSubtitle: 'Build a strong foundation for your academic journey',
    },
    others: {
      metaTitle: 'Other Courses | Law, Agriculture, Library Science',
      metaDescription: 'Explore specialized courses including Law, Agriculture, Library Science, and other programs.',
      headerTitle: 'Other Programs',
      headerSubtitle: 'Discover unique career pathways',
    },
  },
}
