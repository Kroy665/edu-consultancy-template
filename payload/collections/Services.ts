import type { CollectionConfig } from 'payload'

export const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'featured', 'order'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: {
        description: 'Service name (e.g., "Career Counselling")',
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'URL-friendly version (e.g., "career-counselling")',
      },
    },
    {
      name: 'shortDescription',
      type: 'textarea',
      required: true,
      maxLength: 200,
      admin: {
        description: 'Brief description for cards (max 200 chars)',
      },
    },
    {
      name: 'fullDescription',
      type: 'richText',
      required: true,
      admin: {
        description: 'Detailed description with formatting',
      },
    },
    {
      name: 'icon',
      type: 'select',
      required: true,
      options: [
        { label: 'User Check (Counselling)', value: 'user-check' },
        { label: 'Graduation Cap (Education)', value: 'graduation-cap' },
        { label: 'Book Open (Courses)', value: 'book-open' },
        { label: 'Award (Scholarship)', value: 'award' },
        { label: 'Banknote (Loan)', value: 'banknote' },
        { label: 'File Text (Documentation)', value: 'file-text' },
        { label: 'Briefcase (Placement)', value: 'briefcase' },
        { label: 'Target (Career)', value: 'target' },
        { label: 'Heart (Support)', value: 'heart' },
        { label: 'Users (Group)', value: 'users' },
      ],
      defaultValue: 'user-check',
      admin: {
        description: 'Icon to display with the service',
      },
    },
    {
      name: 'benefits',
      type: 'array',
      fields: [
        {
          name: 'benefit',
          type: 'text',
          required: true,
        },
      ],
      admin: {
        description: 'Key benefits/features of this service',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Display on Services page',
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
