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
  ],
}
