import type { CollectionConfig } from 'payload'

const isProduction = process.env.VERCEL === '1'

export const Media: CollectionConfig = {
  slug: 'media',
  upload: {
    ...(isProduction ? { disableLocalStorage: true } : { staticDir: 'media' }),
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
      },
      {
        name: 'card',
        width: 800,
        height: 600,
        position: 'centre',
      },
      {
        name: 'hero',
        width: 1920,
        height: 1080,
        position: 'centre',
      },
    ],
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/*'],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
}
