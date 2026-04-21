'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'
import { enquirySchema, type EnquiryInput } from '@/lib/validations'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'

const courseOptions = [
  { value: '', label: 'Select a course' },
  { value: 'nursing', label: 'Nursing' },
  { value: 'pharmacy', label: 'Pharmacy' },
  { value: 'btech', label: 'B.Tech / Engineering' },
  { value: 'diploma', label: 'Diploma' },
  { value: 'management', label: 'Management (MBA/BBA)' },
  { value: 'education', label: 'Education (B.Ed/M.Ed)' },
  { value: 'general-degree', label: 'General Degree' },
  { value: 'others', label: 'Others' },
]

interface EnquiryFormProps {
  source?: string
  className?: string
}

export function EnquiryForm({ source = 'home', className = '' }: EnquiryFormProps) {
  const { executeRecaptcha } = useGoogleReCaptcha()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null)
  const [errorMessage, setErrorMessage] = useState('')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EnquiryInput>({
    resolver: zodResolver(enquirySchema),
    defaultValues: {
      source,
    },
  })

  const onSubmit = async (data: EnquiryInput) => {
    setIsSubmitting(true)
    setSubmitStatus(null)
    setErrorMessage('')

    try {
      // Get reCAPTCHA token
      let recaptchaToken: string | undefined
      if (executeRecaptcha) {
        try {
          recaptchaToken = await executeRecaptcha('submit_enquiry')
        } catch (error) {
          console.error('reCAPTCHA error:', error)
          // Continue without token if reCAPTCHA fails
        }
      }

      const response = await fetch('/api/enquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...data, source, recaptchaToken }),
      })

      const result = await response.json()

      if (response.ok) {
        setSubmitStatus('success')
        reset()
        // Reset success message after 5 seconds
        setTimeout(() => setSubmitStatus(null), 5000)
      } else {
        setSubmitStatus('error')
        setErrorMessage(result.message || 'Failed to submit enquiry. Please try again.')
      }
    } catch (error) {
      setSubmitStatus('error')
      setErrorMessage('Network error. Please check your connection and try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className={`bg-gradient-to-b from-brand-light/50 via-brand-orange/30 to-brand-light/50 py-20 relative overflow-hidden ${className}`}>
      {/* Decorative Elements */}
      <div className="absolute top-20 left-0 w-96 h-96 bg-brand-secondary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-0 w-96 h-96 bg-brand-accent/10 rounded-full blur-3xl" />

      <div className="section-container relative z-10">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-serif mb-4">
              <span className="gradient-text">Start Your</span> <span className="text-brand-navy">Admission Journey</span>
            </h2>
            <p className="text-neutral-600 text-lg">
              Fill out the form below and our experts will get in touch with you within 24 hours
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="bg-gradient-to-br from-white to-brand-light/30 rounded-3xl shadow-2xl p-8 md:p-10 space-y-6 border border-neutral-200/60 backdrop-blur-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Input
                label="Full Name"
                type="text"
                placeholder="Enter your full name"
                required
                error={errors.name?.message}
                {...register('name')}
              />

              <Input
                label="Phone Number"
                type="tel"
                placeholder="10-digit mobile number"
                required
                error={errors.phone?.message}
                {...register('phone')}
              />
            </div>

            <Input
              label="Email Address"
              type="email"
              placeholder="your.email@example.com (optional)"
              error={errors.email?.message}
              {...register('email')}
            />

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Interested Course
              </label>
              <select
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all duration-200"
                {...register('course')}
              >
                {courseOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.course && (
                <p className="mt-1 text-sm text-red-600">{errors.course.message}</p>
              )}
            </div>

            <Input
              label="Message"
              multiline
              rows={4}
              placeholder="Tell us about your educational background and career goals (optional)"
              error={errors.message?.message}
              {...register('message')}
            />

            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Enquiry'}
            </Button>

            {submitStatus === 'success' && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-green-800 text-center font-medium">
                  Thank you! Your enquiry has been submitted successfully. We'll contact you soon.
                </p>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-800 text-center">
                  {errorMessage || 'Something went wrong. Please try again.'}
                </p>
              </div>
            )}

            <p className="text-xs text-neutral-500 text-center">
              By submitting this form, you agree to our{' '}
              <a href="/privacy-policy" className="text-brand-primary hover:underline">
                Privacy Policy
              </a>{' '}
              and{' '}
              <a href="/terms-and-conditions" className="text-brand-primary hover:underline">
                Terms & Conditions
              </a>
            </p>
          </form>
        </div>
      </div>
    </section>
  )
}
