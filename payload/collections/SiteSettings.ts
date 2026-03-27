import type { CollectionConfig } from 'payload'

export const SiteSettings: CollectionConfig = {
  slug: 'site-settings',
  admin: {
    useAsTitle: 'siteName',
    description: 'Manage global site settings and contact information',
    group: 'Settings',
  },
  access: {
    read: () => true, // Public read access for frontend
  },
  fields: [
    // Site Identity
    {
      name: 'siteName',
      type: 'text',
      label: 'Site Name',
      required: true,
      defaultValue: 'Nibedita Institute & Management',
      admin: {
        description: 'Official name of your institution',
      },
    },
    {
      name: 'siteTagline',
      type: 'text',
      label: 'Site Tagline',
      defaultValue: 'Your Gateway to Quality Education',
      admin: {
        description: 'Short tagline displayed in footer',
      },
    },
    {
      name: 'siteLogo',
      type: 'upload',
      relationTo: 'media',
      label: 'Site Logo',
      admin: {
        description: 'Main logo displayed in navbar (recommended size: 180x60px)',
      },
    },
    {
      name: 'siteFavicon',
      type: 'upload',
      relationTo: 'media',
      label: 'Favicon',
      admin: {
        description: 'Browser tab icon (recommended size: 32x32px)',
      },
    },

    // Contact Information
    {
      name: 'contactInfo',
      type: 'group',
      label: 'Contact Information',
      fields: [
        {
          name: 'address',
          type: 'textarea',
          label: 'Address',
          required: true,
          defaultValue: 'Nibedita Institute & Management\nDhupguri, Jalpaiguri\nWest Bengal — 735210',
          admin: {
            description: 'Full address (use line breaks for formatting)',
          },
        },
        {
          name: 'phone',
          type: 'text',
          label: 'Phone Number',
          required: true,
          defaultValue: '+91 99999 99999',
          admin: {
            description: 'Primary phone number with country code',
          },
        },
        {
          name: 'alternatePhone',
          type: 'text',
          label: 'Alternate Phone Number',
          admin: {
            description: 'Secondary phone number (optional)',
          },
        },
        {
          name: 'whatsapp',
          type: 'text',
          label: 'WhatsApp Number',
          required: true,
          defaultValue: '919999999999',
          admin: {
            description: 'WhatsApp number in format: 919999999999 (no + or spaces)',
          },
        },
        {
          name: 'whatsappMessage',
          type: 'textarea',
          label: 'Default WhatsApp Message',
          defaultValue: 'Hi, I want to know more about admissions at Nibedita Institute.',
          admin: {
            description: 'Pre-filled message when users click WhatsApp button',
          },
        },
        {
          name: 'email',
          type: 'email',
          label: 'Primary Email',
          required: true,
          defaultValue: 'info@nibedita.in',
        },
        {
          name: 'secondaryEmail',
          type: 'email',
          label: 'Secondary Email',
          defaultValue: 'director@nibedita.in',
          admin: {
            description: 'Additional contact email (optional)',
          },
        },
      ],
    },

    // Social Media
    {
      name: 'socialMedia',
      type: 'group',
      label: 'Social Media Links',
      fields: [
        {
          name: 'facebook',
          type: 'text',
          label: 'Facebook URL',
          admin: {
            placeholder: 'https://facebook.com/yourpage',
          },
        },
        {
          name: 'instagram',
          type: 'text',
          label: 'Instagram URL',
          admin: {
            placeholder: 'https://instagram.com/yourpage',
          },
        },
        {
          name: 'youtube',
          type: 'text',
          label: 'YouTube URL',
          admin: {
            placeholder: 'https://youtube.com/@yourchannel',
          },
        },
        {
          name: 'twitter',
          type: 'text',
          label: 'Twitter/X URL',
          admin: {
            placeholder: 'https://twitter.com/yourpage',
          },
        },
        {
          name: 'linkedin',
          type: 'text',
          label: 'LinkedIn URL',
          admin: {
            placeholder: 'https://linkedin.com/company/yourcompany',
          },
        },
      ],
    },

    // Location
    {
      name: 'location',
      type: 'group',
      label: 'Location & Map',
      fields: [
        {
          name: 'googleMapsEmbedUrl',
          type: 'textarea',
          label: 'Google Maps Embed URL',
          required: true,
          defaultValue: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d114614.8!2d89.0102!3d26.5854!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39e444e10c7c1e89%3A0x81321e9e51d0e4db!2sDhupguri%2C%20West%20Bengal!5e0!3m2!1sen!2sin!4v1234567890',
          admin: {
            description: 'Full Google Maps embed URL (from Share > Embed a map)',
          },
        },
        {
          name: 'latitude',
          type: 'number',
          label: 'Latitude',
          admin: {
            description: 'Latitude coordinate (optional, for future use)',
          },
        },
        {
          name: 'longitude',
          type: 'number',
          label: 'Longitude',
          admin: {
            description: 'Longitude coordinate (optional, for future use)',
          },
        },
      ],
    },

    // Legal Pages
    {
      name: 'legalPages',
      type: 'group',
      label: 'Legal Pages Content',
      fields: [
        {
          name: 'privacyPolicy',
          type: 'richText',
          label: 'Privacy Policy',
          admin: {
            description: 'Full privacy policy content',
          },
        },
        {
          name: 'termsAndConditions',
          type: 'richText',
          label: 'Terms and Conditions',
          admin: {
            description: 'Full terms and conditions content',
          },
        },
        {
          name: 'disclaimer',
          type: 'richText',
          label: 'Disclaimer',
          admin: {
            description: 'Full disclaimer content',
          },
        },
      ],
    },

    // Business Hours
    {
      name: 'businessHours',
      type: 'group',
      label: 'Business Hours',
      fields: [
        {
          name: 'workingDays',
          type: 'text',
          label: 'Working Days',
          defaultValue: 'Monday - Saturday',
        },
        {
          name: 'workingHours',
          type: 'text',
          label: 'Working Hours',
          defaultValue: '9:00 AM - 6:00 PM',
        },
        {
          name: 'closedDays',
          type: 'text',
          label: 'Closed On',
          defaultValue: 'Sundays & Public Holidays',
        },
      ],
    },

    // SEO & Analytics
    {
      name: 'seo',
      type: 'group',
      label: 'SEO & Analytics',
      fields: [
        {
          name: 'metaDescription',
          type: 'textarea',
          label: 'Default Meta Description',
          defaultValue: 'Leading educational consultancy in Dhupguri offering admission guidance for Nursing, Engineering, Pharmacy, MBA and more. Expert career counselling for students in West Bengal.',
          admin: {
            description: 'Default meta description for pages without custom descriptions',
          },
        },
        {
          name: 'keywords',
          type: 'array',
          label: 'SEO Keywords',
          fields: [
            {
              name: 'keyword',
              type: 'text',
            },
          ],
          admin: {
            description: 'Common keywords for your site',
          },
        },
        {
          name: 'googleAnalyticsId',
          type: 'text',
          label: 'Google Analytics ID',
          admin: {
            placeholder: 'G-XXXXXXXXXX',
            description: 'Google Analytics measurement ID',
          },
        },
      ],
    },

    // Footer Content
    {
      name: 'footer',
      type: 'group',
      label: 'Footer Settings',
      fields: [
        {
          name: 'copyrightText',
          type: 'text',
          label: 'Copyright Text',
          defaultValue: '© 2026 Nibedita Institute & Management. All rights reserved.',
          admin: {
            description: 'Copyright text displayed in footer',
          },
        },
        {
          name: 'showLegalLinks',
          type: 'checkbox',
          label: 'Show Legal Links in Footer',
          defaultValue: true,
          admin: {
            description: 'Display Privacy Policy, Terms, and Disclaimer links',
          },
        },
      ],
    },

    // Page-Specific Settings
    {
      name: 'pages',
      type: 'group',
      label: 'Page-Specific Settings',
      fields: [
        // Home Page
        {
          name: 'homePage',
          type: 'group',
          label: 'Home Page',
          fields: [
            {
              name: 'metaTitle',
              type: 'text',
              label: 'Meta Title',
              defaultValue: 'Nibedita Institute & Management | Educational Consultancy Dhupguri',
            },
            {
              name: 'metaDescription',
              type: 'textarea',
              label: 'Meta Description',
              defaultValue: 'Leading educational consultancy in Dhupguri offering admission guidance for Nursing, Engineering, Pharmacy, MBA and more.',
            },
          ],
        },

        // About Page
        {
          name: 'aboutPage',
          type: 'group',
          label: 'About Page',
          fields: [
            {
              name: 'metaTitle',
              type: 'text',
              label: 'Meta Title',
              defaultValue: 'About Us | Nibedita Institute & Management',
            },
            {
              name: 'metaDescription',
              type: 'textarea',
              label: 'Meta Description',
              defaultValue: 'Learn about Nibedita Institute, our mission, vision, and commitment to helping students achieve their educational goals.',
            },
            {
              name: 'headerTitle',
              type: 'text',
              label: 'Header Title',
              defaultValue: 'About Nibedita Institute',
            },
            {
              name: 'headerSubtitle',
              type: 'textarea',
              label: 'Header Subtitle',
              defaultValue: 'Your trusted partner in education for over a decade',
            },
          ],
        },

        // Courses Page
        {
          name: 'coursesPage',
          type: 'group',
          label: 'Courses Page',
          fields: [
            {
              name: 'metaTitle',
              type: 'text',
              label: 'Meta Title',
              defaultValue: 'Explore All Programs | Nibedita Institute',
            },
            {
              name: 'metaDescription',
              type: 'textarea',
              label: 'Meta Description',
              defaultValue: 'Browse through our comprehensive list of courses including Nursing, Engineering, Pharmacy, Management, and more.',
            },
            {
              name: 'headerTitle',
              type: 'text',
              label: 'Header Title',
              defaultValue: 'Explore All Programs',
            },
            {
              name: 'headerSubtitle',
              type: 'textarea',
              label: 'Header Subtitle',
              defaultValue: 'Find the perfect course to match your career aspirations',
            },
            {
              name: 'headerDescription',
              type: 'richText',
              label: 'Header Description',
              admin: {
                description: 'Additional description text shown below the subtitle',
              },
            },
          ],
        },

        // Services Page
        {
          name: 'servicesPage',
          type: 'group',
          label: 'Services Page',
          fields: [
            {
              name: 'metaTitle',
              type: 'text',
              label: 'Meta Title',
              defaultValue: 'Our Services | Nibedita Institute',
            },
            {
              name: 'metaDescription',
              type: 'textarea',
              label: 'Meta Description',
              defaultValue: 'Comprehensive educational consultancy services including career counselling, admission guidance, and scholarship assistance.',
            },
            {
              name: 'headerTitle',
              type: 'text',
              label: 'Header Title',
              defaultValue: 'Our Services',
            },
            {
              name: 'headerSubtitle',
              type: 'textarea',
              label: 'Header Subtitle',
              defaultValue: 'Comprehensive support for your educational journey',
            },
            {
              name: 'headerDescription',
              type: 'richText',
              label: 'Header Description',
            },
          ],
        },

        // Admission Page
        {
          name: 'admissionPage',
          type: 'group',
          label: 'Admission Page',
          fields: [
            {
              name: 'metaTitle',
              type: 'text',
              label: 'Meta Title',
              defaultValue: 'Admission Process | Nibedita Institute',
            },
            {
              name: 'metaDescription',
              type: 'textarea',
              label: 'Meta Description',
              defaultValue: 'Learn about our admission process, eligibility criteria, required documents, and start your application today.',
            },
            {
              name: 'headerTitle',
              type: 'text',
              label: 'Header Title',
              defaultValue: 'Start Your Admission Journey',
            },
            {
              name: 'headerSubtitle',
              type: 'textarea',
              label: 'Header Subtitle',
              defaultValue: 'Simple, transparent, and hassle-free admission process',
            },
            {
              name: 'headerDescription',
              type: 'richText',
              label: 'Header Description',
            },
            {
              name: 'showBanner',
              type: 'checkbox',
              label: 'Show Admission Open Banner',
              defaultValue: true,
            },
            {
              name: 'bannerText',
              type: 'text',
              label: 'Banner Text',
              defaultValue: 'Admissions Open for 2026 Session',
            },
          ],
        },

        // Student Corner Page
        {
          name: 'studentCornerPage',
          type: 'group',
          label: 'Student Corner Page',
          fields: [
            {
              name: 'metaTitle',
              type: 'text',
              label: 'Meta Title',
              defaultValue: 'Student Corner | Nibedita Institute',
            },
            {
              name: 'metaDescription',
              type: 'textarea',
              label: 'Meta Description',
              defaultValue: 'FAQs, career guidance articles, admission updates, and resources for students.',
            },
            {
              name: 'headerTitle',
              type: 'text',
              label: 'Header Title',
              defaultValue: 'Student Corner',
            },
            {
              name: 'headerSubtitle',
              type: 'textarea',
              label: 'Header Subtitle',
              defaultValue: 'Resources and information to help you succeed',
            },
          ],
        },

        // Blog Page
        {
          name: 'blogPage',
          type: 'group',
          label: 'Blog Page',
          fields: [
            {
              name: 'metaTitle',
              type: 'text',
              label: 'Meta Title',
              defaultValue: 'Blog | Nibedita Institute',
            },
            {
              name: 'metaDescription',
              type: 'textarea',
              label: 'Meta Description',
              defaultValue: 'Latest articles on career guidance, admission tips, education trends, and student success stories.',
            },
            {
              name: 'headerTitle',
              type: 'text',
              label: 'Header Title',
              defaultValue: 'Our Blog',
            },
            {
              name: 'headerSubtitle',
              type: 'textarea',
              label: 'Header Subtitle',
              defaultValue: 'Insights, tips, and news from the world of education',
            },
            {
              name: 'headerDescription',
              type: 'richText',
              label: 'Header Description',
            },
            {
              name: 'postsPerPage',
              type: 'number',
              label: 'Posts Per Page',
              defaultValue: 12,
              min: 6,
              max: 24,
            },
          ],
        },

        // Contact Page
        {
          name: 'contactPage',
          type: 'group',
          label: 'Contact Page',
          fields: [
            {
              name: 'metaTitle',
              type: 'text',
              label: 'Meta Title',
              defaultValue: 'Contact Us | Nibedita Institute',
            },
            {
              name: 'metaDescription',
              type: 'textarea',
              label: 'Meta Description',
              defaultValue: 'Get in touch with Nibedita Institute for admission enquiries, career counselling, and educational guidance.',
            },
            {
              name: 'headerTitle',
              type: 'text',
              label: 'Header Title',
              defaultValue: 'Contact Us',
            },
            {
              name: 'headerSubtitle',
              type: 'textarea',
              label: 'Header Subtitle',
              defaultValue: 'We\'re here to help you with your educational journey',
            },
            {
              name: 'headerDescription',
              type: 'richText',
              label: 'Header Description',
            },
            {
              name: 'showMap',
              type: 'checkbox',
              label: 'Show Google Map',
              defaultValue: true,
            },
          ],
        },
      ],
    },

    // Course Category Settings
    {
      name: 'courseCategories',
      type: 'group',
      label: 'Course Category Settings',
      fields: [
        {
          name: 'nursing',
          type: 'group',
          label: 'Nursing Category',
          fields: [
            {
              name: 'metaTitle',
              type: 'text',
              label: 'Meta Title',
              defaultValue: 'Nursing Courses | B.Sc Nursing, GNM & More',
            },
            {
              name: 'metaDescription',
              type: 'textarea',
              label: 'Meta Description',
              defaultValue: 'Explore nursing courses including B.Sc Nursing, GNM, ANM, and post-basic nursing programs.',
            },
            {
              name: 'headerTitle',
              type: 'text',
              label: 'Header Title',
              defaultValue: 'Nursing Programs',
            },
            {
              name: 'headerSubtitle',
              type: 'textarea',
              label: 'Header Subtitle',
              defaultValue: 'Build a rewarding career in healthcare',
            },
            {
              name: 'categoryDescription',
              type: 'richText',
              label: 'Category Description',
            },
          ],
        },
        {
          name: 'pharmacy',
          type: 'group',
          label: 'Pharmacy Category',
          fields: [
            {
              name: 'metaTitle',
              type: 'text',
              label: 'Meta Title',
              defaultValue: 'Pharmacy Courses | B.Pharm, D.Pharm & More',
            },
            {
              name: 'metaDescription',
              type: 'textarea',
              label: 'Meta Description',
              defaultValue: 'Explore pharmacy courses including B.Pharm, D.Pharm, and pharmaceutical science programs.',
            },
            {
              name: 'headerTitle',
              type: 'text',
              label: 'Header Title',
              defaultValue: 'Pharmacy Programs',
            },
            {
              name: 'headerSubtitle',
              type: 'textarea',
              label: 'Header Subtitle',
              defaultValue: 'Launch your career in pharmaceutical sciences',
            },
            {
              name: 'categoryDescription',
              type: 'richText',
              label: 'Category Description',
            },
          ],
        },
        {
          name: 'btech',
          type: 'group',
          label: 'B.Tech Category',
          fields: [
            {
              name: 'metaTitle',
              type: 'text',
              label: 'Meta Title',
              defaultValue: 'Engineering Courses | B.Tech Programs',
            },
            {
              name: 'metaDescription',
              type: 'textarea',
              label: 'Meta Description',
              defaultValue: 'Explore B.Tech engineering programs in CSE, Mechanical, Civil, Electrical, and more specializations.',
            },
            {
              name: 'headerTitle',
              type: 'text',
              label: 'Header Title',
              defaultValue: 'Engineering Programs',
            },
            {
              name: 'headerSubtitle',
              type: 'textarea',
              label: 'Header Subtitle',
              defaultValue: 'Shape the future with engineering excellence',
            },
            {
              name: 'categoryDescription',
              type: 'richText',
              label: 'Category Description',
            },
          ],
        },
        {
          name: 'diploma',
          type: 'group',
          label: 'Diploma Category',
          fields: [
            {
              name: 'metaTitle',
              type: 'text',
              label: 'Meta Title',
              defaultValue: 'Diploma Courses | Polytechnic & Paramedical',
            },
            {
              name: 'metaDescription',
              type: 'textarea',
              label: 'Meta Description',
              defaultValue: 'Explore diploma courses in engineering, paramedical, and technical fields.',
            },
            {
              name: 'headerTitle',
              type: 'text',
              label: 'Header Title',
              defaultValue: 'Diploma Programs',
            },
            {
              name: 'headerSubtitle',
              type: 'textarea',
              label: 'Header Subtitle',
              defaultValue: 'Fast-track your career with industry-ready skills',
            },
            {
              name: 'categoryDescription',
              type: 'richText',
              label: 'Category Description',
            },
          ],
        },
        {
          name: 'management',
          type: 'group',
          label: 'Management Category',
          fields: [
            {
              name: 'metaTitle',
              type: 'text',
              label: 'Meta Title',
              defaultValue: 'Management Courses | MBA, BBA & More',
            },
            {
              name: 'metaDescription',
              type: 'textarea',
              label: 'Meta Description',
              defaultValue: 'Explore management programs including MBA, BBA, and specialized business courses.',
            },
            {
              name: 'headerTitle',
              type: 'text',
              label: 'Header Title',
              defaultValue: 'Management Programs',
            },
            {
              name: 'headerSubtitle',
              type: 'textarea',
              label: 'Header Subtitle',
              defaultValue: 'Develop leadership skills for tomorrow\'s business world',
            },
            {
              name: 'categoryDescription',
              type: 'richText',
              label: 'Category Description',
            },
          ],
        },
        {
          name: 'education',
          type: 'group',
          label: 'Education Category',
          fields: [
            {
              name: 'metaTitle',
              type: 'text',
              label: 'Meta Title',
              defaultValue: 'Education Courses | B.Ed, D.Ed, M.Ed',
            },
            {
              name: 'metaDescription',
              type: 'textarea',
              label: 'Meta Description',
              defaultValue: 'Explore teacher training programs including B.Ed, D.Ed, M.Ed, and other education courses.',
            },
            {
              name: 'headerTitle',
              type: 'text',
              label: 'Header Title',
              defaultValue: 'Education Programs',
            },
            {
              name: 'headerSubtitle',
              type: 'textarea',
              label: 'Header Subtitle',
              defaultValue: 'Shape young minds and inspire the next generation',
            },
            {
              name: 'categoryDescription',
              type: 'richText',
              label: 'Category Description',
            },
          ],
        },
        {
          name: 'generalDegree',
          type: 'group',
          label: 'General Degree Category',
          fields: [
            {
              name: 'metaTitle',
              type: 'text',
              label: 'Meta Title',
              defaultValue: 'General Degree Courses | BA, BSc, BCom',
            },
            {
              name: 'metaDescription',
              type: 'textarea',
              label: 'Meta Description',
              defaultValue: 'Explore general degree programs including BA, BSc, BCom, and various undergraduate courses.',
            },
            {
              name: 'headerTitle',
              type: 'text',
              label: 'Header Title',
              defaultValue: 'General Degree Programs',
            },
            {
              name: 'headerSubtitle',
              type: 'textarea',
              label: 'Header Subtitle',
              defaultValue: 'Build a strong foundation for your academic journey',
            },
            {
              name: 'categoryDescription',
              type: 'richText',
              label: 'Category Description',
            },
          ],
        },
        {
          name: 'others',
          type: 'group',
          label: 'Others Category',
          fields: [
            {
              name: 'metaTitle',
              type: 'text',
              label: 'Meta Title',
              defaultValue: 'Other Courses | Law, Agriculture, Library Science',
            },
            {
              name: 'metaDescription',
              type: 'textarea',
              label: 'Meta Description',
              defaultValue: 'Explore specialized courses including Law, Agriculture, Library Science, and other programs.',
            },
            {
              name: 'headerTitle',
              type: 'text',
              label: 'Header Title',
              defaultValue: 'Other Programs',
            },
            {
              name: 'headerSubtitle',
              type: 'textarea',
              label: 'Header Subtitle',
              defaultValue: 'Discover unique career pathways',
            },
            {
              name: 'categoryDescription',
              type: 'richText',
              label: 'Category Description',
            },
          ],
        },
      ],
    },
  ],
}
