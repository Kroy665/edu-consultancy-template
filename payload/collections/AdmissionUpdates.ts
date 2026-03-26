import type { CollectionConfig } from 'payload'

export const AdmissionUpdates: CollectionConfig = {
  slug: 'admission-updates',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'badge', 'publishedAt', 'active'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'Update title (e.g., "B.Tech Admissions Open")',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      maxLength: 500,
      admin: {
        description: 'Brief description of the update',
      },
    },
    {
      name: 'badge',
      type: 'select',
      options: [
        { label: 'New', value: 'New' },
        { label: 'Important', value: 'Important' },
        { label: 'Deadline', value: 'Deadline' },
        { label: 'Event', value: 'Event' },
        { label: 'Extended', value: 'Extended' },
        { label: 'Urgent', value: 'Urgent' },
      ],
      defaultValue: 'New',
      admin: {
        description: 'Badge type to highlight the update',
      },
    },
    {
      name: 'publishedAt',
      type: 'date',
      required: true,
      defaultValue: () => new Date().toISOString(),
      admin: {
        description: 'Date of the update',
        date: {
          pickerAppearance: 'dayOnly',
        },
      },
    },
    {
      name: 'active',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Show on Student Corner page',
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
