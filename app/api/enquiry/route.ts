import { NextRequest, NextResponse } from 'next/server'
import { getPayloadClient } from '@/lib/payload'
import { resend } from '@/lib/resend'
import { enquirySchema } from '@/lib/validations'
import { checkRateLimit } from '@/lib/rate-limit'
import { verifyRecaptcha } from '@/lib/recaptcha'
import { sanitizeInput, sanitizeEmail, sanitizePhoneNumber } from '@/lib/sanitize'

export async function POST(req: NextRequest) {
  try {
    // Rate limiting: 5 requests per 10 minutes per IP
    const rateLimitCheck = await checkRateLimit(req, { limit: 5, window: 600 })
    if (!rateLimitCheck.success) {
      return rateLimitCheck.response!
    }

    const body = await req.json()

    // 1. Verify reCAPTCHA token
    const { recaptchaToken, ...formData } = body
    if (recaptchaToken) {
      const recaptchaResult = await verifyRecaptcha(recaptchaToken, 'submit_enquiry', 0.5)
      if (!recaptchaResult.success) {
        return NextResponse.json(
          {
            error: 'Verification failed',
            message: recaptchaResult.error || 'Please try again',
          },
          { status: 400 }
        )
      }
    }

    // 2. Sanitize input data
    const sanitizedData = {
      name: sanitizeInput(formData.name, { maxLength: 100 }),
      phone: sanitizePhoneNumber(formData.phone),
      email: formData.email ? sanitizeEmail(formData.email) : undefined,
      course: formData.course ? sanitizeInput(formData.course, { maxLength: 100 }) : undefined,
      message: formData.message ? sanitizeInput(formData.message, { maxLength: 500 }) : undefined,
      source: formData.source ? sanitizeInput(formData.source, { maxLength: 200 }) : undefined,
    }

    // 3. Validate sanitized data
    const parsed = enquirySchema.safeParse(sanitizedData)
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid data', details: parsed.error.issues },
        { status: 400 }
      )
    }

    const data = parsed.data

    // 4. Save to Payload CMS
    const payload = await getPayloadClient()
    await payload.create({
      collection: 'enquiries',
      data: {
        ...data,
        status: 'new',
      },
    })

    // 5. Send email via Resend (only if API key is configured)
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
