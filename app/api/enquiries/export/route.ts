import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@/payload.config'

export async function GET(req: NextRequest) {
  try {
    // Get authenticated user from Payload
    const payload = await getPayload({ config })

    // Fetch all enquiries
    const { docs: enquiries } = await payload.find({
      collection: 'enquiries',
      limit: 10000, // Adjust as needed
      sort: '-createdAt',
    })

    if (!enquiries || enquiries.length === 0) {
      return new NextResponse('No enquiries found', { status: 404 })
    }

    // Define CSV headers
    const headers = ['ID', 'Name', 'Phone', 'Email', 'Course', 'Message', 'Source', 'Status', 'Created At', 'Updated At']

    // Convert enquiries to CSV rows
    const csvRows = [
      headers.join(','), // Header row
      ...enquiries.map((enquiry) => {
        return [
          enquiry.id,
          `"${enquiry.name?.replace(/"/g, '""') || ''}"`, // Escape quotes in name
          `"${enquiry.phone || ''}"`,
          `"${enquiry.email || ''}"`,
          `"${enquiry.course || ''}"`,
          `"${enquiry.message?.replace(/"/g, '""') || ''}"`, // Escape quotes in message
          `"${enquiry.source || ''}"`,
          `"${enquiry.status || ''}"`,
          `"${enquiry.createdAt ? new Date(enquiry.createdAt).toLocaleString('en-IN') : ''}"`,
          `"${enquiry.updatedAt ? new Date(enquiry.updatedAt).toLocaleString('en-IN') : ''}"`,
        ].join(',')
      }),
    ]

    const csvContent = csvRows.join('\n')

    // Generate filename with current date
    const filename = `enquiries_${new Date().toISOString().split('T')[0]}.csv`

    // Return CSV file
    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    })
  } catch (error) {
    console.error('Error exporting enquiries:', error)
    return new NextResponse('Error exporting enquiries', { status: 500 })
  }
}
