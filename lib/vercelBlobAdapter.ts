import { put, del, list } from '@vercel/blob'
import type { CollectionConfig } from 'payload'
import path from 'path'

export const vercelBlobAdapter = () => {
  return {
    name: 'vercel-blob',

    // Generate URL for the uploaded file
    generateURL: ({ filename }: { filename: string }) => {
      if (process.env.NEXT_PUBLIC_SERVER_URL) {
        return `${process.env.NEXT_PUBLIC_SERVER_URL}/api/media/file/${filename}`
      }
      return `/api/media/file/${filename}`
    },

    // Handle file uploads
    handleUpload: async ({ data, file }: { data: any; file: any }) => {
      try {
        const filename = file.filename || file.name
        const buffer = file.data || file.buffer

        // Upload to Vercel Blob
        const blob = await put(filename, buffer, {
          access: 'public',
          addRandomSuffix: false,
        })

        return {
          filename,
          filesize: file.size,
          mimeType: file.mimetype || file.type,
          url: blob.url,
        }
      } catch (error) {
        console.error('Vercel Blob upload error:', error)
        throw error
      }
    },

    // Handle file deletion
    handleDelete: async ({ filename }: { filename: string }) => {
      try {
        await del(filename)
      } catch (error) {
        console.error('Vercel Blob delete error:', error)
      }
    },

    // Static handler for serving files (will use Vercel Blob URLs directly)
    staticHandler: async (req: any, { params }: any) => {
      const filename = params.filename

      // In production, files are served directly from Vercel Blob
      // This is just a fallback
      return new Response('File not found', { status: 404 })
    },
  }
}
