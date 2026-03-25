import type { CollectionConfig } from 'payload'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  admin: {
    useAsTitle: 'studentName',
    defaultColumns: ['studentName', 'course', 'rating', 'featured'],
  },
  fields: [
    {
      name: 'studentName',
      type: 'text',
      required: true,
    },
    {
      name: 'course',
      type: 'text',
      required: true,
      admin: {
        description: 'e.g., B.Sc Nursing 2024',
      },
    },
    {
      name: 'quote',
      type: 'textarea',
      required: true,
      maxLength: 500,
    },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'rating',
      type: 'number',
      min: 1,
      max: 5,
      defaultValue: 5,
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Display on home page',
      },
    },
  ],
}
