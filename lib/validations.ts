import { z } from 'zod'

export const enquirySchema = z.object({
  name: z.string().min(2, 'Name is required'),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Enter a valid 10-digit Indian mobile number'),
  email: z.string().email().optional().or(z.literal('')),
  course: z.string().optional(),
  message: z.string().max(500).optional(),
  source: z.string().optional(),
})

export type EnquiryInput = z.infer<typeof enquirySchema>
