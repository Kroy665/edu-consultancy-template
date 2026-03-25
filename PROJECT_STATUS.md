# Nibedita Institute Website - Project Status

## ✅ COMPLETED (Core Infrastructure)

### 1. Project Setup & Configuration
- ✅ Next.js 16 project initialized with TypeScript and Tailwind CSS v4
- ✅ All dependencies installed (Payload CMS v3, Zod, React Hook Form, Resend, Framer Motion, Lucide React, etc.)
- ✅ Environment variables configured (`.env.local`)
- ✅ Tailwind CSS configured with brand colors and custom fonts (DM Sans, DM Serif Display)
- ✅ `next.config.ts` configured for Payload CMS integration
- ✅ `globals.css` with complete brand design system

### 2. Payload CMS
- ✅ Payload configuration (`payload/payload.config.ts`)
- ✅ All 7 collections created:
  - Users (with auth)
  - Courses
  - BlogPosts
  - Banners
  - Testimonials
  - Enquiries
  - Media
- ✅ Root payload config alias
- ✅ Admin panel route (`app/(payload)/admin/[[...segments]]/page.tsx`)
- ✅ API routes (`app/api/[...payload]/route.ts`)

### 3. Utilities & Helpers
- ✅ `lib/validations.ts` - Zod schemas for form validation
- ✅ `lib/payload.ts` - Payload client helper
- ✅ `lib/resend.ts` - Email service helper

### 4. UI Components
- ✅ `components/ui/Button.tsx`
- ✅ `components/ui/Badge.tsx`
- ✅ `components/ui/Card.tsx`
- ✅ `components/ui/Input.tsx`

### 5. Layout Components
- ✅ `components/layout/Navbar.tsx` - Fully responsive with dropdown and mobile menu
- ✅ `components/layout/Footer.tsx` - Complete footer with all sections
- ✅ `components/layout/WhatsAppButton.tsx` - Floating WhatsApp button

### 6. App Structure
- ✅ Directory structure created for all pages
- ✅ Site layout with SEO and JSON-LD (`app/(site)/layout.tsx`)
- ✅ Enquiry API route (`app/api/enquiry/route.ts`)
- ✅ Payload admin configured

---

## 🔨 REMAINING WORK

### Phase 1: Home Page Components (Priority HIGH)

Create these components in `components/sections/`:

#### 1. `HeroBanner.tsx`
```tsx
'use client'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'

// Fetch banner from CMS, display hero with:
// - Background image or gradient
// - Badge pill with "Admissions Open 2026"
// - h1 headline from CMS
// - p subheadline
// - Two buttons: Apply Now + Explore Courses
```

#### 2. `CourseCategoriesGrid.tsx`
```tsx
import { Heart, Pill, Cpu, Award, Briefcase, GraduationCap, BookOpen, MoreHorizontal } from 'lucide-react'
import Link from 'next/link'

// 8 cards in grid-cols-2 md:grid-cols-4
// Each: icon, name, tagline, link to /courses/{slug}
```

#### 3. `WhyChooseUs.tsx`
```tsx
'use client'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'

// Background: bg-brand-light
// 4 animated stat counters: 500+ Students, 50+ Colleges, 8+ Categories, 10+ Years
// 4 feature cards below
```

#### 4. `ServicesOverview.tsx`
```tsx
import { Card } from '@/components/ui/Card'
// 7 service cards in grid
// Each with icon, title, description, saffron left border
```

#### 5. `PopularCourses.tsx`
```tsx
import { getPayloadClient } from '@/lib/payload'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'

// Fetch courses where featured=true (limit 6)
// Display in scrollable grid
// Background: bg-brand-orange
```

#### 6. `CounsellingProcess.tsx`
```tsx
// Background: bg-brand-primary, white text
// 5-step process with numbered indicators
// Connected with lines
```

#### 7. `Testimonials.tsx`
```tsx
'use client'
import { motion } from 'framer-motion'
// Fetch testimonials where featured=true
// Carousel with drag gesture
// Display: photo/avatar, name, course, stars, quote
```

#### 8. `EnquiryForm.tsx` ⭐ CRITICAL
```tsx
'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { enquirySchema } from '@/lib/validations'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'

// Form with: name*, phone*, email, course select, message
// POST to /api/enquiry
// Show success/error states
```

#### 9. `ContactSnapshot.tsx`
```tsx
import { MapPin, Phone, Mail } from 'lucide-react'
// 3 columns: Address, Phone, Email
// Dark background (bg-neutral-900)
```

#### 10. `GoogleMap.tsx`
```tsx
// Embedded Google Maps iframe for Dhupguri
// Use: https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d114614.8!2d89.0102!3d26.5854
```

Then create `app/(site)/page.tsx`:
```tsx
import { HeroBanner } from '@/components/sections/HeroBanner'
import { CourseCategoriesGrid } from '@/components/sections/CourseCategoriesGrid'
// ... import all 10 sections
// Compose them in order
```

---

### Phase 2: Content Pages

#### About Page (`app/(site)/about/page.tsx`)
5 sections:
1. About the Institute - Hero + 3 paragraphs
2. Mission & Vision - 2-column cards
3. Director Message - Photo + blockquote
4. Certifications - Grid of badges
5. Why Students Choose Us - 6 USP cards

#### Services Page (`app/(site)/services/page.tsx`)
- Hero
- 7 service cards with accordion (expand to show full description)
- Use React state for accordion

#### Admission Page (`app/(site)/admission/page.tsx`)
1. Admission Process - 5 steps with icons
2. Eligibility table
3. Documents checklist (visual checkboxes)
4. Enquiry form (reuse `EnquiryForm` component)

#### Student Corner (`app/(site)/student-corner/page.tsx`)
1. FAQs - Accordion with 10 questions
2. Career articles - Links to blog posts tagged "career"
3. Admission updates - Hardcoded list (5 items)

---

### Phase 3: Courses

#### Courses Hub (`app/(site)/courses/page.tsx`)
```tsx
import { getPayloadClient } from '@/lib/payload'
// Fetch all courses
// Filter tabs by category
// Display as cards with: name, badge, duration, eligibility
// "View Details" link
```

#### Course Template Component (`components/course/CoursePageTemplate.tsx`)
```tsx
export function CoursePageTemplate({ category }: { category: string }) {
  // Fetch courses where category matches
  // 6 sections: Hero, Courses List, Eligibility, Career Scope, Admission Guidance, CTA
}
```

#### 8 Course Sub-pages
Create these pages, all using `CoursePageTemplate`:
- `app/(site)/courses/nursing/page.tsx`
- `app/(site)/courses/pharmacy/page.tsx`
- `app/(site)/courses/btech/page.tsx`
- `app/(site)/courses/diploma/page.tsx`
- `app/(site)/courses/management/page.tsx`
- `app/(site)/courses/education/page.tsx`
- `app/(site)/courses/general-degree/page.tsx`
- `app/(site)/courses/others/page.tsx`

Each:
```tsx
import { CoursePageTemplate } from '@/components/course/CoursePageTemplate'
export default function NursingPage() {
  return <CoursePageTemplate category="nursing" />
}
```

---

### Phase 4: Blog

#### Blog Components (`components/blog/`)
1. `BlogCard.tsx` - Card for listing page
2. `BlogPostContent.tsx` - Full post layout

#### Blog Listing (`app/(site)/blog/page.tsx`)
```tsx
import { getPayloadClient } from '@/lib/payload'
// Fetch all published posts
// Display in grid-cols-1 md:grid-cols-2 lg:grid-cols-3
// Each card: image, tag, title, excerpt, date
```

#### Blog Post (`app/(site)/blog/[slug]/page.tsx`)
```tsx
export async function generateStaticParams() {
  const payload = await getPayloadClient()
  const posts = await payload.find({
    collection: 'blog-posts',
    where: { status: { equals: 'published' } },
  })
  return posts.docs.map(post => ({ slug: post.slug }))
}

export async function generateMetadata({ params }) {
  // Dynamic metadata from post
}
```

---

### Phase 5: Contact & Legal

#### Contact Page (`app/(site)/contact/page.tsx`)
- Address, Phone, Email (with icons)
- Google Maps embed
- Enquiry form (reuse component)

#### Legal Pages Template (`components/LegalPageTemplate.tsx`)
```tsx
export function LegalPageTemplate({ title, children }) {
  return (
    <div className="section-container py-16 max-w-4xl mx-auto">
      <h1 className="text-4xl font-serif mb-8">{title}</h1>
      <div className="prose prose-neutral max-w-none">{children}</div>
    </div>
  )
}
```

Create 3 legal pages with realistic content:
- `app/(site)/privacy-policy/page.tsx`
- `app/(site)/terms-and-conditions/page.tsx`
- `app/(site)/disclaimer/page.tsx`

---

### Phase 6: SEO & Build

#### 1. Create `next-sitemap.config.js`
```js
module.exports = {
  siteUrl: 'https://nibedita.in',
  generateRobotsTxt: true,
  exclude: ['/admin', '/admin/*', '/api/*'],
}
```

#### 2. Add to `package.json`:
```json
"scripts": {
  "postbuild": "next-sitemap"
}
```

#### 3. Build & Fix Errors
```bash
npm run build
```
Fix any TypeScript/ESLint errors that appear.

#### 4. Test
```bash
npm run dev
```
Verify all routes:
- Home: `/`
- About: `/about`
- Services: `/services`
- Admission: `/admission`
- Student Corner: `/student-corner`
- Courses hub: `/courses`
- All 8 course sub-pages
- Blog: `/blog`
- Contact: `/contact`
- Legal pages (3)
- Admin: `/admin`

---

## Quick Start Commands

```bash
# Development
npm run dev

# Build
npm run build

# Start production
npm start

# Access admin panel
# Visit http://localhost:3000/admin
# Create first user with email/password

# Generate Payload types
npm run generate:types
```

---

## Database Setup

Before running, ensure MongoDB is set up:
1. Create a MongoDB Atlas account (free tier)
2. Create a cluster
3. Get connection string
4. Update `MONGODB_URI` in `.env.local`
5. Update `PAYLOAD_SECRET` with a secure 32-character string

---

## Notes

- Payload CMS v3 is installed (not v2 as in spec, but API is similar)
- Tailwind v4 uses `@theme inline` instead of config file
- All components use Server Components by default unless marked 'use client'
- Form validation uses Zod + React Hook Form
- Email sending via Resend (will skip if API key not configured)

---

## Priority Order

1. **EnquiryForm component** - Critical for lead generation
2. **Home page** - Primary landing page
3. **Courses pages** - Core offering
4. **Blog pages** - SEO value
5. **Everything else** - Nice to have

---

## File Reference

All completed files are in:
- `/components/ui/` - 4 primitive components
- `/components/layout/` - 3 layout components
- `/lib/` - 3 utility files
- `/payload/collections/` - 7 CMS collections
- `/app/api/` - 2 API routes
- `/app/(site)/layout.tsx` - Main site layout
- `/app/(payload)/admin/` - CMS admin

Directories created but empty:
- `/components/sections/` - Need 10 components
- `/components/course/` - Need 1 template
- `/components/blog/` - Need 2 components
- `/app/(site)/` - Need all page files
