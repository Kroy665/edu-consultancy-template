import { buildConfig } from 'payload'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Courses } from './collections/Courses'
import { BlogPosts } from './collections/BlogPosts'
import { Banners } from './collections/Banners'
import { Testimonials } from './collections/Testimonials'
import { Enquiries } from './collections/Enquiries'
import { Media } from './collections/Media'
import { FAQs } from './collections/FAQs'
import { AdmissionUpdates } from './collections/AdmissionUpdates'
import { Services } from './collections/Services'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  editor: lexicalEditor(),
  collections: [Users, Courses, BlogPosts, Banners, Testimonials, Enquiries, Media, FAQs, AdmissionUpdates, Services],
  secret: process.env.PAYLOAD_SECRET!,
  db: mongooseAdapter({
    url: process.env.MONGODB_URI!,
  }),
  sharp,
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: '— Nibedita CMS',
      // favicon: '/favicon.ico',
    },
  },
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  graphQL: {
    disable: true,
  },
})
