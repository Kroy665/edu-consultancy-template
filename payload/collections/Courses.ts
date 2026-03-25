import type { CollectionConfig } from 'payload'

export const Courses: CollectionConfig = {
  slug: 'courses',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'category', 'duration', 'featured'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Nursing', value: 'nursing' },
        { label: 'Pharmacy', value: 'pharmacy' },
        { label: 'B.Tech', value: 'btech' },
        { label: 'Diploma', value: 'diploma' },
        { label: 'Management', value: 'management' },
        { label: 'Education', value: 'education' },
        { label: 'General Degree', value: 'general-degree' },
        { label: 'Others', value: 'others' },
      ],
    },
    {
      name: 'shortDescription',
      type: 'textarea',
    },
    {
      name: 'duration',
      type: 'text',
    },
    {
      name: 'eligibility',
      type: 'richText',
    },
    {
      name: 'careerScope',
      type: 'richText',
    },
    {
      name: 'admissionGuidance',
      type: 'richText',
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
    },
  ],
}
