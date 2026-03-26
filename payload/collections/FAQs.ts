import type { CollectionConfig } from 'payload'

export const FAQs: CollectionConfig = {
  slug: 'faqs',
  admin: {
    useAsTitle: 'question',
    defaultColumns: ['question', 'featured', 'order'],
  },
  fields: [
    {
      name: 'question',
      type: 'text',
      required: true,
      admin: {
        description: 'The FAQ question',
      },
    },
    {
      name: 'answer',
      type: 'textarea',
      required: true,
      maxLength: 1000,
      admin: {
        description: 'The answer to the question',
      },
    },
    {
      name: 'category',
      type: 'select',
      options: [
        { label: 'Admission', value: 'admission' },
        { label: 'Courses', value: 'courses' },
        { label: 'Services', value: 'services' },
        { label: 'Fees & Payments', value: 'fees' },
        { label: 'General', value: 'general' },
      ],
      defaultValue: 'general',
      admin: {
        description: 'Category to organize FAQs',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Display on Student Corner page',
      },
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: {
        description: 'Order of appearance (lower numbers appear first)',
      },
    },
  ],
}
