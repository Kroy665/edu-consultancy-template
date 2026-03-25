import { NextRequest, NextResponse } from 'next/server'
import { getPayloadClient } from '@/lib/payload'
import { resend } from '@/lib/resend'
import { enquirySchema } from '@/lib/validations'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    // 1. Validate
    const parsed = enquirySchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid data', details: parsed.error.issues },
        { status: 400 }
      )
    }

    const data = parsed.data

    // 2. Save to Payload CMS
    const payload = await getPayloadClient()
    await payload.create({
      collection: 'enquiries',
      data: {
        ...data,
        status: 'new',
      },
    })

    // 3. Send email via Resend (only if API key is configured)
    if (process.env.RESEND_API_KEY && process.env.RESEND_API_KEY !== 're_placeholder_api_key') {
      try {
        await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL!,
          to: process.env.RESEND_TO_EMAIL!,
          subject: `New Enquiry from ${data.name} — ${data.course || 'General'}`,
          html: `
            <h2>New Admission Enquiry</h2>
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Phone:</strong> ${data.phone}</p>
            <p><strong>Email:</strong> ${data.email || 'Not provided'}</p>
            <p><strong>Course Interest:</strong> ${data.course || 'Not specified'}</p>
            <p><strong>Message:</strong> ${data.message || '—'}</p>
            <p><strong>Source Page:</strong> ${data.source || '—'}</p>
          `,
        })
      } catch (emailError) {
        console.error('Failed to send email:', emailError)
        // Continue even if email fails
      }
    }

    return NextResponse.json({ success: true, message: 'Enquiry submitted successfully' })
  } catch (error) {
    console.error('Enquiry submission error:', error)
    return NextResponse.json(
      { error: 'Internal server error', message: 'Failed to submit enquiry' },
      { status: 500 }
    )
  }
}
