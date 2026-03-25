import type { CollectionConfig } from 'payload'

export const Banners: CollectionConfig = {
  slug: 'banners',
  admin: {
    useAsTitle: 'headline',
    defaultColumns: ['headline', 'active', 'order'],
  },
  fields: [
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
      defaultValue: 'Apply Now',
    },
    {
      name: 'ctaLink',
      type: 'text',
      defaultValue: '/admission',
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
