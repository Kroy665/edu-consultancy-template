# CLAUDE.md — Educational Consultancy Website Template

> Full project specification for Claude Code. This is an open-source Next.js + Payload CMS template for educational consultancy businesses. Every decision, naming convention, stack choice, and content structure is defined here.

---

## Project Overview

**Project:** Educational Consultancy Website Template (Open Source)
**Type:** Next.js 16 website with Payload CMS admin panel
**Goal:** Lead generation, course discovery, and student enquiry platform
**Use Case:** Template for educational consultancy businesses, admission guidance centers, career counseling services

---

## Tech Stack (do not deviate)

| Layer | Choice | Notes |
|---|---|---|
| Framework | Next.js 16 (App Router) | Use `app/` directory, Server Components by default |
| Language | TypeScript | Strict mode on |
| Styling | Tailwind CSS v3 | No CSS modules, no styled-components |
| CMS | Payload CMS v2 | Self-hosted, runs alongside Next.js |
| Database | MongoDB Atlas | Free tier (512 MB), via `MONGODB_URI` env var |
| Forms | React Hook Form + Zod | All forms validated client + server side |
| Email | Resend | Free tier (3,000/mo). Transactional only. |
| Animations | Framer Motion | Use sparingly — page transitions and scroll reveals only |
| Deployment | Vercel (Hobby tier) | Free, auto-deploys from `main` branch |
| SEO | next-sitemap + next/metadata API | Dynamic metadata per page |
| Analytics | Google Analytics 4 | Via `@next/third-parties/google` |
| Maps | Google Maps static embed | No API key billing — use embed iframe only |

---

## Repository Structure

```
edu-consultancy-template/
├── app/                          # Next.js App Router
│   ├── (site)/                   # Public-facing site layout group
│   │   ├── layout.tsx            # Root site layout (Navbar + Footer)
│   │   ├── page.tsx              # Home /
│   │   ├── about/page.tsx
│   │   ├── courses/
│   │   │   ├── page.tsx          # Courses hub
│   │   │   ├── nursing/page.tsx
│   │   │   ├── pharmacy/page.tsx
│   │   │   ├── btech/page.tsx
│   │   │   ├── diploma/page.tsx
│   │   │   ├── management/page.tsx
│   │   │   ├── education/page.tsx
│   │   │   ├── general-degree/page.tsx
│   │   │   └── others/page.tsx
│   │   ├── services/page.tsx
│   │   ├── admission/page.tsx
│   │   ├── student-corner/page.tsx
│   │   ├── blog/
│   │   │   ├── page.tsx          # Blog listing
│   │   │   └── [slug]/page.tsx   # Dynamic blog post
│   │   ├── contact/page.tsx
│   │   ├── privacy-policy/page.tsx
│   │   ├── terms-and-conditions/page.tsx
│   │   └── disclaimer/page.tsx
│   ├── (payload)/                # Payload CMS admin routes
│   │   └── admin/[[...segments]]/page.tsx
│   └── api/
│       ├── enquiry/route.ts      # Form submission handler
│       └── [...payload]/route.ts # Payload REST API
├── components/
│   ├── ui/                       # Primitive UI components
│   │   ├── Button.tsx
│   │   ├── Badge.tsx
│   │   ├── Card.tsx
│   │   └── Input.tsx
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── sections/                 # Page sections (reusable)
│   │   ├── HeroBanner.tsx
│   │   ├── CourseCategoriesGrid.tsx
│   │   ├── WhyChooseUs.tsx
│   │   ├── ServicesOverview.tsx
│   │   ├── PopularCourses.tsx
│   │   ├── CounsellingProcess.tsx
│   │   ├── Testimonials.tsx
│   │   ├── EnquiryForm.tsx
│   │   ├── ContactSnapshot.tsx
│   │   └── GoogleMap.tsx
│   ├── course/
│   │   └── CoursePageTemplate.tsx  # Shared template for all 8 sub-pages
│   └── blog/
│       ├── BlogCard.tsx
│       └── BlogPostContent.tsx
├── payload/
│   ├── payload.config.ts         # Payload CMS configuration
│   └── collections/
│       ├── Courses.ts
│       ├── BlogPosts.ts
│       ├── Banners.ts
│       ├── Testimonials.ts
│       ├── Enquiries.ts
│       └── Users.ts
├── lib/
│   ├── payload.ts                # Payload local API helper
│   ├── resend.ts                 # Email sender utility
│   └── validations.ts            # Zod schemas
├── public/
│   └── images/
├── styles/
│   └── globals.css
├── next.config.js
├── payload.config.ts             # (root alias, imports from payload/)
├── tailwind.config.ts
├── tsconfig.json
└── .env.local                    # See Environment Variables section
```

---

## Environment Variables

Create `.env.local` with:

```env
# MongoDB (Payload CMS database)
MONGODB_URI=mongodb+srv://<user>:<pass>@cluster0.xxxxx.mongodb.net/educonsult

# Payload CMS
PAYLOAD_SECRET=<generate-32-char-random-string>
NEXT_PUBLIC_SERVER_URL=http://localhost:3000

# Resend (email)
RESEND_API_KEY=re_xxxxxxxxxxxx
RESEND_FROM_EMAIL=enquiry@yourdomain.com
RESEND_TO_EMAIL=admin@yourdomain.com

# Google Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# WhatsApp (optional)
NEXT_PUBLIC_PHONE=1234567890
```

---

## Brand & Design System

### Colors (add to `tailwind.config.ts`)

```ts
colors: {
  brand: {
    primary:   '#1A4D3A',   // Deep forest green — primary brand color
    secondary: '#E86E2C',   // Saffron orange — CTAs, highlights
    light:     '#E8F2ED',   // Green tint — section backgrounds
    orange:    '#FDF0E8',   // Orange tint — warm sections
  },
  neutral: {
    50:  '#FAFAF8',
    100: '#F3F2EE',
    200: '#E5E4DF',
    400: '#9CA3A0',
    600: '#6B7280',
    800: '#2C3E50',
    900: '#1A1A2E',
  }
}
```

### Typography

```ts
// tailwind.config.ts fontFamily
fontFamily: {
  sans:    ['DM Sans', 'sans-serif'],
  serif:   ['DM Serif Display', 'serif'],
  display: ['DM Serif Display', 'serif'],
}
```

Add to `app/(site)/layout.tsx` head:
```html
<link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap" rel="stylesheet" />
```

### Design Principles

- **Mobile-first** — design for 375px, enhance upward
- **Section rhythm** — alternating `bg-white` and `bg-brand-light` sections on Home
- **CTA color** — all primary buttons use `bg-brand-secondary` (saffron orange) with white text
- **Headings** — use `font-serif` for section titles, `font-sans` for body
- **Border radius** — `rounded-xl` for cards, `rounded-full` for pills/badges
- **Shadows** — `shadow-sm` only. No heavy drop shadows.
- **WhatsApp button** — fixed bottom-right, `z-50`, visible on all pages

---

## Payload CMS Collections

### `Users` collection

```ts
// payload/collections/Users.ts
{
  slug: 'users',
  auth: true,
  admin: { useAsTitle: 'email' },
  access: {
    read: () => true,
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'role', type: 'select', options: ['admin', 'editor'], defaultValue: 'editor' },
  ],
}
```

Seed 2 users on first run:
- `admin@yourdomain.com` / role: `admin`
- `editor@yourdomain.com` / role: `editor`

### `Courses` collection

```ts
{
  slug: 'courses',
  admin: { useAsTitle: 'name' },
  fields: [
    { name: 'name', type: 'text', required: true },           // e.g. "B.Sc Nursing"
    { name: 'category', type: 'select', required: true, options: [
      'nursing', 'pharmacy', 'btech', 'diploma',
      'management', 'education', 'general-degree', 'others'
    ]},
    { name: 'shortDescription', type: 'textarea' },
    { name: 'duration', type: 'text' },                       // e.g. "4 Years"
    { name: 'eligibility', type: 'richText' },
    { name: 'careerScope', type: 'richText' },
    { name: 'admissionGuidance', type: 'richText' },
    { name: 'featured', type: 'checkbox', defaultValue: false },
    { name: 'order', type: 'number', defaultValue: 0 },
  ],
}
```

### `BlogPosts` collection

```ts
{
  slug: 'blog-posts',
  admin: { useAsTitle: 'title' },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true },
    { name: 'excerpt', type: 'textarea', required: true },
    { name: 'content', type: 'richText', required: true },
    { name: 'featuredImage', type: 'upload', relationTo: 'media' },
    { name: 'author', type: 'text', defaultValue: 'Editorial Team' },
    { name: 'tags', type: 'array', fields: [{ name: 'tag', type: 'text' }] },
    { name: 'publishedAt', type: 'date' },
    { name: 'status', type: 'select', options: ['draft', 'published'], defaultValue: 'draft' },
  ],
}
```

### `Banners` collection

```ts
{
  slug: 'banners',
  admin: { useAsTitle: 'headline' },
  fields: [
    { name: 'headline', type: 'text', required: true },       // e.g. "Admissions Open 2026"
    { name: 'subheadline', type: 'text' },
    { name: 'ctaText', type: 'text', defaultValue: 'Apply Now' },
    { name: 'ctaLink', type: 'text', defaultValue: '/admission' },
    { name: 'backgroundImage', type: 'upload', relationTo: 'media' },
    { name: 'active', type: 'checkbox', defaultValue: true },
    { name: 'order', type: 'number', defaultValue: 0 },
  ],
}
```

### `Testimonials` collection

```ts
{
  slug: 'testimonials',
  admin: { useAsTitle: 'studentName' },
  fields: [
    { name: 'studentName', type: 'text', required: true },
    { name: 'course', type: 'text', required: true },         // e.g. "B.Sc Nursing 2024"
    { name: 'quote', type: 'textarea', required: true },
    { name: 'photo', type: 'upload', relationTo: 'media' },
    { name: 'rating', type: 'number', min: 1, max: 5, defaultValue: 5 },
    { name: 'featured', type: 'checkbox', defaultValue: false },
  ],
}
```

### `Enquiries` collection

```ts
{
  slug: 'enquiries',
  admin: { useAsTitle: 'name', defaultColumns: ['name', 'phone', 'course', 'createdAt'] },
  access: { create: () => true, read: ({ req: { user } }) => !!user },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'phone', type: 'text', required: true },
    { name: 'email', type: 'email' },
    { name: 'course', type: 'text' },
    { name: 'message', type: 'textarea' },
    { name: 'source', type: 'text' },                         // which page form was submitted from
    { name: 'status', type: 'select', options: ['new', 'contacted', 'converted', 'closed'], defaultValue: 'new' },
  ],
}
```

### Media collection

```ts
{
  slug: 'media',
  upload: {
    staticURL: '/media',
    staticDir: 'media',
    imageSizes: [
      { name: 'thumbnail', width: 400, height: 300, position: 'centre' },
      { name: 'card', width: 800, height: 600, position: 'centre' },
    ],
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/*'],
  },
  fields: [{ name: 'alt', type: 'text', required: true }],
}
```

---

## Page Specifications

### Home Page (`/`)

Build these sections in order. Each is a separate component in `components/sections/`.

#### 1. HeroBanner
- Full-width, min-height `100vh`
- Background: if active banner exists in CMS → use its `backgroundImage`, else use a CSS gradient (`from-brand-primary to-brand-primary/80`)
- Overlay: dark overlay at 50% opacity over image
- Content (from CMS `Banners` collection, `active: true`, sorted by `order`):
  - Badge pill: "Admissions Open 2026" (saffron)
  - `h1`: headline from CMS
  - `p`: subheadline from CMS
  - Two buttons: **Apply Now** (`/admission`) + **Explore Courses** (`/courses`)
- Mobile: stack buttons vertically

#### 2. CourseCategoriesGrid
- Section title: "Explore Our Programs"
- 8 cards in a responsive grid (`grid-cols-2 md:grid-cols-4`)
- Each card: icon (use lucide-react), category name, short tagline, link to `/courses/{slug}`
- Categories and their icons:

| Category | Icon | Tagline |
|---|---|---|
| Nursing | `Heart` | B.Sc, GNM & more |
| Pharmacy | `Pill` | B.Pharm, D.Pharm |
| Engineering (B.Tech) | `Cpu` | 8 specialisations |
| Diploma | `Award` | Polytechnic & Para-medical |
| Management | `Briefcase` | MBA, BBA |
| Education | `GraduationCap` | B.Ed, D.Ed, M.Ed |
| General Degree | `BookOpen` | BA, BSc, BCom & more |
| Others | `MoreHorizontal` | Law, Agri, Library |

#### 3. WhyChooseUs
- Background: `bg-brand-light`
- 4 stat counters (animate on scroll into view using Framer Motion):
  - `500+` Students Placed
  - `50+` Partner Colleges
  - `8+` Course Categories
  - `10+` Years Experience
- Below stats: 4 feature cards with icons + short descriptions

#### 4. ServicesOverview
- Background: `bg-white`
- Section title: "What We Do For You"
- 7 service cards in a `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` grid
- Services: Career Counselling, Admission Guidance, Course Selection Support, Scholarship Guidance, Education Loan Assistance, Documentation Support, Placement Guidance
- Each card: icon, title, 1-line description, saffron left-border accent

#### 5. PopularCourses
- Background: `bg-brand-orange`
- Show courses where `featured: true` from CMS (limit 6)
- Horizontal scrollable on mobile, grid on desktop
- Each card: course name, category badge, duration, "Enquire Now" button

#### 6. CounsellingProcess
- Background: `bg-brand-primary` (dark green)
- White text
- 5-step numbered process:
  1. Free Consultation
  2. Profile Assessment
  3. Course Shortlisting
  4. College Application
  5. Admission Confirmation
- Connected step indicators with line between them

#### 7. Testimonials
- Fetch from CMS `Testimonials` where `featured: true` (limit 4)
- Quote card layout with student photo (or initials avatar fallback), name, course, star rating, quote
- Auto-carousel on mobile (Framer Motion drag gesture)

#### 8. EnquiryForm (Main CTA)
- Background: `bg-brand-light`
- Section title: "Start Your Admission Journey"
- Fields: Full Name*, Phone Number*, Email, Interested Course (select — all 8 categories), Message
- On submit: POST to `/api/enquiry`
- Success state: green confirmation message
- Error state: red error message

#### 9. ContactSnapshot
- 3 columns: Address, Phone/WhatsApp, Email
- Icons from lucide-react
- Dark background (`bg-neutral-900`), white text

#### 10. GoogleMap
- Embedded Google Maps iframe for your location
- `loading="lazy"`, `allowFullScreen`
- Use this embed pattern:
```html
<iframe
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d...!2sYour+Location"
  width="100%" height="400" style="border:0" allowFullScreen loading="lazy"
/>
```
- Replace `pb=` param with your actual location coordinates embed URL

---

### About Page (`/about`)

Five subsections:
1. **About the Institute** — hero image + 3 paragraphs of description
2. **Mission & Vision** — two-column card layout. Mission left, Vision right. Brand colors.
3. **Director / Founder Message** — photo (placeholder if none), name, designation, quoted message in styled blockquote
4. **Certifications & Registrations** — grid of certification badges/logos (use placeholder boxes if no assets provided)
5. **Why Students Choose Us** — 6 USP cards with icons

---

### Courses Hub (`/courses`)

- Hero with title "Explore All Programs" and search/filter bar
- Filter by category (tabs or pills at top)
- Fetch all courses from CMS via Payload local API
- Group by category
- Each course as a card with: name, category badge, duration, eligibility summary, "View Details" link
- "Apply Now" CTA at bottom of page

---

### Course Sub-pages (`/courses/[category]`)

Use a single `CoursePageTemplate` component for all 8 sub-pages. Pass category slug as prop.

Each sub-page fetches courses from CMS where `category === slug`.

Template sections:
1. **Hero** — category name, breadcrumb, description
2. **Courses List** — cards for each course in category
3. **Eligibility** — rich text from CMS
4. **Career Scope** — rich text from CMS with icon list
5. **Admission Guidance** — step-by-step rich text
6. **Apply Now CTA** — full-width saffron banner with enquiry form link

Static metadata per page:
```ts
export async function generateMetadata({ params }) {
  // return category-specific title and description
}
```

---

### Services Page (`/services`)

Hero + 7 detailed service cards. Each card expands (accordion) to show full description.

Services with descriptions:
- **Career Counselling** — One-on-one sessions to identify the right career path based on academic background, interests, and goals
- **Admission Guidance** — End-to-end support through the college application and admission process
- **Course Selection Support** — Expert advice on choosing the right course considering eligibility, fees, and job prospects
- **Scholarship Guidance** — Information on government and private scholarships, eligibility criteria and application support
- **Education Loan Assistance** — Help with loan documentation and connecting students with partner banks
- **Documentation Support** — Assistance with preparing and verifying all required academic documents
- **Placement Guidance** — Resume building, interview prep and connection with placement-active colleges

---

### Admission Page (`/admission`)

1. **Admission Process** — 5 numbered steps with icons
2. **Eligibility Guide** — table format (Class 10 pass, Class 12 pass, Graduation as headers)
3. **Required Documents Checklist** — styled checkbox list (non-interactive, visual only):
   - 10th Marksheet & Certificate
   - 12th Marksheet & Certificate
   - Graduation Certificate (if applicable)
   - Aadhar Card
   - Passport size photos (4)
   - Caste Certificate (if applicable)
   - Migration Certificate (if required)
4. **Online Admission Enquiry Form** — same `EnquiryForm` component reused

---

### Student Corner (`/student-corner`)

1. **FAQs** — Accordion component. Seed with 10 FAQs:
   - What is the last date for admission?
   - Can I apply for multiple courses?
   - Is hostel facility available through partner colleges?
   - Do you assist with scholarship applications?
   - What documents are required for admission?
   - Are there any fees for your counselling services?
   - Can students from other states apply?
   - How long does the admission process take?
   - Do you provide education loan assistance?
   - What courses are most popular this year?

2. **Career Guidance Articles** — Link cards to blog posts tagged "career"
3. **Admission Updates** — Simple list of notifications (hardcoded for now, 5 items with dates)
4. **Notifications** — Badge-style update items

---

### Blog (`/blog` + `/blog/[slug]`)

**Listing page:**
- Fetch all published blog posts from CMS (`status: 'published'`)
- Sort by `publishedAt` descending
- `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
- Each card: featured image, tag, title, excerpt (120 chars), date, "Read More" link
- Generate `sitemap.xml` entries for all published posts

**Post page (`/blog/[slug]`):**
- `generateStaticParams` — pre-render all published posts at build time
- `generateMetadata` — dynamic title, description, OG image from post data
- Layout: max-width 720px, centered, serif body font for content
- Breadcrumb: Home → Blog → Post Title
- Featured image full-width at top
- Rich text content rendered via `@payloadcms/richtext-lexical`
- Related posts (same tag) at bottom — max 3

**Seed 3 blog posts:**
1. Title: "Career After 12th: Top Options for Science Students in 2026" | Tag: career
2. Title: "Complete Guide to B.Sc Nursing Admission" | Tag: nursing
3. Title: "Engineering vs Diploma: Which is Right For You?" | Tag: engineering

---

### Contact Page (`/contact`)

- **Office Address:** Your Institute Name, Your City, Your State — Postal Code
- **Phone:** +XX XXXXX XXXXX (placeholder)
- **Email:** info@yourdomain.com (placeholder)
- **WhatsApp Button:** opens `https://wa.me/XXXXXXXXXXXX` with pre-filled message: "Hi, I want to know more about admissions."
- **Google Maps embed** (same as home)
- **Enquiry Form** — same `EnquiryForm` component

---

### Legal Pages

All three pages use the same `LegalPageTemplate` component. Sections render from hardcoded content (not CMS).

- `/privacy-policy` — standard privacy policy covering: data collection, usage, cookies, third-party services, user rights
- `/terms-and-conditions` — standard terms for educational consultancy website
- `/disclaimer` — standard disclaimer about admission guidance being advisory

Generate realistic but generic content appropriate for an Indian educational consultancy.

---

## Enquiry Form API (`/api/enquiry`)

```ts
// app/api/enquiry/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'
import { Resend } from 'resend'
import { enquirySchema } from '@/lib/validations'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  const body = await req.json()

  // 1. Validate
  const parsed = enquirySchema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: 'Invalid data' }, { status: 400 })

  const data = parsed.data

  // 2. Save to Payload CMS
  const payload = await getPayload({ config })
  await payload.create({
    collection: 'enquiries',
    data: { ...data, status: 'new' },
  })

  // 3. Send email via Resend
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

  return NextResponse.json({ success: true })
}
```

---

## Zod Validation Schemas (`lib/validations.ts`)

```ts
import { z } from 'zod'

export const enquirySchema = z.object({
  name:    z.string().min(2, 'Name is required'),
  phone:   z.string().regex(/^[6-9]\d{9}$/, 'Enter a valid 10-digit Indian mobile number'),
  email:   z.string().email().optional().or(z.literal('')),
  course:  z.string().optional(),
  message: z.string().max(500).optional(),
  source:  z.string().optional(),
})

export type EnquiryInput = z.infer<typeof enquirySchema>
```

---

## Navbar Component

```
Logo (left)                    Links (center/right)          CTA (right)
Your Institute Name            Home  About  Courses  Services  Blog  Contact    [Enquire Now]
```

- Sticky (`sticky top-0 z-40`)
- Background: white with `border-b border-neutral-200` on scroll (use `useScrollPosition` hook)
- Mobile: hamburger menu, full-screen slide-in drawer
- "Courses" link has a dropdown with all 8 course categories
- **Enquire Now** button: saffron, opens enquiry modal
- Active link: underline with saffron color

---

## Footer Component

```
[Logo + tagline]   [Quick Links]   [Courses]   [Contact]
                   Home            Nursing     Address
                   About           Pharmacy    Phone
                   Services        B.Tech      Email
                   Admission       Diploma     WhatsApp
                   Blog            Management
                   Contact         Education

[Social: Facebook, Instagram, YouTube (icons)]
[Bottom bar: © 2026 Your Institute Name | Privacy Policy | Terms | Disclaimer]
```

Background: `bg-neutral-900`, white text

---

## WhatsApp Floating Button

Add to root layout, visible on all pages:

```tsx
// components/layout/WhatsAppButton.tsx
const WHATSAPP_URL = `https://wa.me/XXXXXXXXXXXX?text=${encodeURIComponent(
  'Hi, I want to know more about admissions.'
)}`

export function WhatsAppButton() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white rounded-full p-3.5 shadow-lg hover:scale-110 transition-transform"
      aria-label="Chat on WhatsApp"
    >
      {/* WhatsApp SVG icon 28x28 */}
      <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
      </svg>
    </a>
  )
}
```

---

## SEO Setup

### `next-sitemap.config.js`

```js
module.exports = {
  siteUrl: 'https://yourdomain.com',
  generateRobotsTxt: true,
  exclude: ['/admin', '/admin/*', '/api/*'],
  additionalPaths: async (config) => {
    // Add dynamic blog post paths
    return []
  },
}
```

### Metadata Template (Root Layout)

```ts
export const metadata: Metadata = {
  metadataBase: new URL('https://yourdomain.com'),
  title: {
    default: 'Your Institute Name | Educational Consultancy',
    template: '%s | Your Institute Name',
  },
  description: 'Leading educational consultancy offering admission guidance for Nursing, Engineering, Pharmacy, MBA and more. Expert career counselling for students.',
  keywords: ['educational consultancy', 'admission guidance', 'nursing admission', 'engineering admission', 'career counselling'],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://yourdomain.com',
    siteName: 'Your Institute Name',
  },
}
```

### JSON-LD Schema (add to root layout)

```tsx
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: 'Your Institute Name',
  description: 'Educational consultancy offering admission guidance',
  url: 'https://yourdomain.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Your Street Address',
    addressLocality: 'Your City',
    addressRegion: 'Your State',
    postalCode: 'XXXXXX',
    addressCountry: 'US',
  },
  telephone: '+XXXXXXXXXXXX',
  email: 'info@yourdomain.com',
}
```

---

## Performance Rules

- Use `next/image` for **all** images. Never use `<img>` tags.
- Use `loading="lazy"` on below-fold images
- Use `priority` prop on hero banner image only
- Wrap heavy components with `React.Suspense` and skeleton loaders
- Use `generateStaticParams` for blog post pages (SSG)
- Fetch CMS data in Server Components — never `useEffect` for data fetching
- Avoid `"use client"` unless component needs browser APIs or interactivity

---

## Payload CMS Config (`payload/payload.config.ts`)

```ts
import { buildConfig } from 'payload/config'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'

import { Users } from './collections/Users'
import { Courses } from './collections/Courses'
import { BlogPosts } from './collections/BlogPosts'
import { Banners } from './collections/Banners'
import { Testimonials } from './collections/Testimonials'
import { Enquiries } from './collections/Enquiries'
import { Media } from './collections/Media'

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: '— Admin CMS',
      favicon: '/favicon.ico',
    },
  },
  editor: lexicalEditor({}),
  collections: [Users, Courses, BlogPosts, Banners, Testimonials, Enquiries, Media],
  db: mongooseAdapter({ url: process.env.MONGODB_URI! }),
  secret: process.env.PAYLOAD_SECRET!,
  typescript: { outputFile: path.resolve(__dirname, 'payload-types.ts') },
  graphQL: { disable: true },
})
```

---

## package.json Scripts

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "payload": "payload",
    "generate:types": "payload generate:types",
    "postinstall": "payload generate:types"
  }
}
```

---

## Key Dependencies

```json
{
  "dependencies": {
    "next": "14.2.x",
    "react": "^18",
    "react-dom": "^18",
    "typescript": "^5",
    "tailwindcss": "^3",
    "payload": "^2",
    "@payloadcms/db-mongodb": "^2",
    "@payloadcms/richtext-lexical": "^2",
    "react-hook-form": "^7",
    "zod": "^3",
    "@hookform/resolvers": "^3",
    "resend": "^3",
    "framer-motion": "^11",
    "lucide-react": "^0.400.0",
    "@next/third-parties": "^14",
    "next-sitemap": "^4"
  }
}
```

---

## Build Order for Claude Code

Execute in this order to avoid dependency issues:

1. `npx create-next-app@latest edu-consultancy-template --typescript --tailwind --app --src-dir=false --import-alias="@/*"`
2. Install all dependencies listed above
3. Configure `tailwind.config.ts` — add brand colors and font families
4. Create `globals.css` — import Google Fonts, base Tailwind directives
5. Set up Payload CMS — create `payload/payload.config.ts` and all 7 collections
6. Create `.env.local` with all required variables (use placeholder values)
7. Configure `next.config.js` for Payload + Next.js co-location
8. Build `lib/` utilities — `payload.ts`, `resend.ts`, `validations.ts`
9. Build UI primitives — `Button`, `Badge`, `Card`, `Input`
10. Build layout components — `Navbar`, `Footer`, `WhatsAppButton`
11. Build all `components/sections/` for the Home page
12. Build `app/(site)/layout.tsx` — wrap with Navbar, Footer, WhatsAppButton, GA
13. Build Home page — compose all 10 sections
14. Build About page
15. Build `CoursePageTemplate` component
16. Build Courses hub + all 8 sub-pages
17. Build Services, Admission, Student Corner pages
18. Build Blog listing + dynamic blog post page
19. Build Contact page + legal pages (Privacy Policy, T&C, Disclaimer)
20. Build `/api/enquiry` route
21. Configure SEO — metadata, JSON-LD, `next-sitemap`
22. Generate Payload types (`npm run generate:types`)
23. Run `npm run build` — fix all TypeScript and ESLint errors
24. Verify all routes return 200 in dev mode

---

## Seed Data

After CMS is running, seed these records:

**Banners (1):**
- Headline: "Admissions Open 2026 — Secure Your Future"
- Subheadline: "Expert guidance for Nursing, Engineering, Pharmacy, MBA & 100+ more courses"
- CTA: "Apply Now" → `/admission`
- Active: true

**Courses (sample, 2 per category = 16 total):**
- Category `nursing`: B.Sc Nursing (4 years), GNM Nursing (3 years)
- Category `pharmacy`: B.Pharm (4 years), D.Pharm (2 years)
- Category `btech`: CSE (4 years, featured), AI & ML (4 years, featured)
- Category `diploma`: Diploma in Civil Engineering (3 years), Diploma in Computer Science (3 years)
- Category `management`: MBA (2 years, featured), BBA (3 years)
- Category `education`: B.Ed (2 years), D.Ed (2 years)
- Category `general-degree`: B.A (3 years), B.Com (3 years)
- Category `others`: LLB (3 years), B.Lib (1 year)

**Testimonials (4):**
- Sarah Johnson — B.Sc Nursing 2024 — "The team guided me through the entire admission process. I got into my dream college without any stress."
- Michael Chen — B.Tech CSE 2023 — "The counsellors here are very knowledgeable. They helped me choose the best college within my budget."
- Emily Davis — MBA 2024 — "Excellent documentation support. Got my education loan approved within 2 weeks with their help."
- David Wilson — GNM Nursing 2023 — "Very professional team. They answered all my questions patiently and guided me at every step."

---

## Quality Checklist (run before marking complete)

- [ ] All 20+ routes return 200 in `npm run dev`
- [ ] `npm run build` completes with 0 errors
- [ ] No TypeScript errors (`tsc --noEmit`)
- [ ] Payload CMS admin accessible at `/admin`
- [ ] Enquiry form submits → saves to CMS + sends email
- [ ] All 8 course sub-pages render with CMS data
- [ ] Blog slug pages render with SSG
- [ ] Mobile responsive at 375px, 768px, 1280px
- [ ] WhatsApp button visible on all pages
- [ ] `sitemap.xml` and `robots.txt` generated
- [ ] Google Analytics script present in `<head>`
- [ ] `next/image` used for all images (no raw `<img>` tags)
- [ ] No hardcoded phone numbers — use `NEXT_PUBLIC_PHONE` env var
- [ ] Legal pages have realistic content
- [ ] Lighthouse Performance score ≥ 85 on Home page