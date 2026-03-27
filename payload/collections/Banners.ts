import type { CollectionConfig } from 'payload'

export const Banners: CollectionConfig = {
  slug: 'banners',
  admin: {
    useAsTitle: 'headline',
    defaultColumns: ['headline', 'active', 'order'],
  },
  fields: [
    {
      name: 'excerpt',
      type: 'text',
      label: 'Badge Text / Excerpt',
      defaultValue: 'Admissions Open 2026',
      admin: {
        description: 'Short text displayed in the badge above the headline (e.g., "Admissions Open 2026")',
      },
    },
    {
      name: 'headline',
      type: 'text',
      required: true,
    },
    {
      name: 'subheadline',
      type: 'text',
    },
    {
      name: 'ctaText',
      type: 'text',
      label: 'Primary Button Text',
      defaultValue: 'Apply Now',
    },
    {
      name: 'ctaLink',
      type: 'text',
      label: 'Primary Button Link',
      defaultValue: '/admission',
    },
    {
      name: 'secondaryCtaText',
      type: 'text',
      label: 'Secondary Button Text',
      defaultValue: 'Explore Courses',
      admin: {
        description: 'Text for the secondary button (optional)',
      },
    },
    {
      name: 'secondaryCtaLink',
      type: 'text',
      label: 'Secondary Button Link',
      defaultValue: '/courses',
      admin: {
        description: 'Link for the secondary button (optional)',
      },
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'active',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
    },
  ],
}
