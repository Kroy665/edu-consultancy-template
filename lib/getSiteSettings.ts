import { getPayload } from 'payload'
import config from '@payload-config'
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
 * This function is cached and can be called from Server Components
 */
export async function getSiteSettings(): Promise<ExtendedSiteSettings | null> {
  try {
    const payload = await getPayload({ config })

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
  siteName: 'Nibedita Institute & Management',
  siteTagline: 'Your Gateway to Quality Education',
  contactInfo: {
    address: 'Nibedita Institute & Management\nDhupguri, Jalpaiguri\nWest Bengal — 735210',
    phone: '+91 99999 99999',
    alternatePhone: undefined,
    whatsapp: '919999999999',
    whatsappMessage: 'Hi, I want to know more about admissions at Nibedita Institute.',
    email: 'info@nibedita.in',
    secondaryEmail: 'director@nibedita.in',
  },
  location: {
    googleMapsEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d114614.8!2d89.0102!3d26.5854!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39e444e10c7c1e89%3A0x81321e9e51d0e4db!2sDhupguri%2C%20West%20Bengal!5e0!3m2!1sen!2sin!4v1234567890',
  },
  footer: {
    copyrightText: '© 2026 Nibedita Institute & Management. All rights reserved.',
    showLegalLinks: true,
  },
  businessHours: {
    workingDays: 'Monday - Saturday',
    workingHours: '9:00 AM - 6:00 PM',
    closedDays: 'Sundays & Public Holidays',
  },
  seo: {
    metaDescription: 'Leading educational consultancy in Dhupguri offering admission guidance for Nursing, Engineering, Pharmacy, MBA and more. Expert career counselling for students in West Bengal.',
    keywords: [
      { keyword: 'educational consultancy Dhupguri' },
      { keyword: 'admission guidance West Bengal' },
      { keyword: 'nursing admission' },
      { keyword: 'engineering admission' },
      { keyword: 'career counselling Jalpaiguri' },
    ],
  },
  pages: {
    homePage: {
      metaTitle: 'Nibedita Institute & Management | Educational Consultancy Dhupguri',
      metaDescription: 'Leading educational consultancy in Dhupguri offering admission guidance for Nursing, Engineering, Pharmacy, MBA and more.',
    },
    aboutPage: {
      metaTitle: 'About Us | Nibedita Institute & Management',
      metaDescription: 'Learn about Nibedita Institute, our mission, vision, and commitment to helping students achieve their educational goals.',
      headerTitle: 'About Nibedita Institute',
      headerSubtitle: 'Your trusted partner in education for over a decade',
    },
    coursesPage: {
      metaTitle: 'Explore All Programs | Nibedita Institute',
      metaDescription: 'Browse through our comprehensive list of courses including Nursing, Engineering, Pharmacy, Management, and more.',
      headerTitle: 'Explore All Programs',
      headerSubtitle: 'Find the perfect course to match your career aspirations',
    },
    blogPage: {
      metaTitle: 'Blog | Nibedita Institute',
      metaDescription: 'Latest articles on career guidance, admission tips, education trends, and student success stories.',
      headerTitle: 'Our Blog',
      headerSubtitle: 'Insights, tips, and news from the world of education',
      postsPerPage: 12,
    },
    contactPage: {
      metaTitle: 'Contact Us | Nibedita Institute',
      metaDescription: 'Get in touch with Nibedita Institute for admission enquiries, career counselling, and educational guidance.',
      headerTitle: 'Contact Us',
      headerSubtitle: "We're here to help you with your educational journey",
      showMap: true,
    },
    admissionPage: {
      metaTitle: 'Admission Process | Nibedita Institute',
      metaDescription: 'Learn about our admission process, eligibility criteria, required documents, and start your application today.',
      headerTitle: 'Start Your Admission Journey',
      headerSubtitle: 'Simple, transparent, and hassle-free admission process',
      showBanner: true,
      bannerText: 'Admissions Open for 2026 Session',
    },
    servicesPage: {
      metaTitle: 'Our Services | Nibedita Institute',
      metaDescription: 'Comprehensive educational consultancy services including career counselling, admission guidance, and scholarship assistance.',
      headerTitle: 'Our Services',
      headerSubtitle: 'Comprehensive support for your educational journey',
    },
    studentCornerPage: {
      metaTitle: 'Student Corner | Nibedita Institute',
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
