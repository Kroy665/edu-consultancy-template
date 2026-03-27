# Site Settings Collection - Usage Guide

## Overview

The SiteSettings collection provides centralized, **fully type-safe** control over:
- Page-specific metadata (title, description, headers)
- Course category-specific settings
- Contact information
- Social media links
- Business hours
- Legal pages content
- SEO settings
- Footer settings

**Key Features:**
- ✅ **Full TypeScript Type Safety** - No `any` types, complete IntelliSense support
- ✅ **Compile-time Validation** - Catch errors before deployment
- ✅ **Generic Type Parameters** - Automatic type inference based on page/category name
- ✅ **Comprehensive Interfaces** - Properly typed for all settings

## Type-Safe Interfaces

All site settings are fully typed with dedicated TypeScript interfaces:

```typescript
// Core interfaces available for import
import type {
  PageSettings,              // Base page settings
  BlogPageSettings,          // Blog-specific (extends PageSettings)
  ContactPageSettings,       // Contact-specific (extends PageSettings)
  AdmissionPageSettings,     // Admission-specific (extends PageSettings)
  CategorySettings,          // Course category settings
  ExtendedSiteSettings,      // Full site settings type
} from '@/lib/getSiteSettings'
```

## Accessing Site Settings

### 1. Get Complete Site Settings (Fully Typed)

```typescript
import { getSiteSettings } from '@/lib/getSiteSettings'

// In a Server Component
export default async function Page() {
  const settings = await getSiteSettings()
  // settings is typed as ExtendedSiteSettings | null
  // Full IntelliSense for all properties

  return (
    <div>
      <h1>{settings?.siteName}</h1>
      <p>{settings?.siteTagline}</p>
      <p>{settings?.contactInfo?.email}</p>
    </div>
  )
}
```

### 2. Get Page-Specific Settings (Type-Safe with Generics)

```typescript
import { getPageSettings, DEFAULT_SITE_SETTINGS } from '@/lib/getSiteSettings'
import type { Metadata } from 'next'

// Generate metadata for a page - FULLY TYPED
export async function generateMetadata(): Promise<Metadata> {
  // TypeScript knows the exact return type based on 'blogPage'
  const pageSettings = await getPageSettings('blogPage')
  // pageSettings is BlogPageSettings | null
  // IntelliSense shows: metaTitle, metaDescription, headerTitle, headerSubtitle, postsPerPage

  return {
    title: pageSettings?.metaTitle || 'Blog',
    description: pageSettings?.metaDescription || DEFAULT_SITE_SETTINGS.pages.blogPage.metaDescription,
  }
}

// Use in component
export default async function BlogPage() {
  const pageSettings = await getPageSettings('blogPage')

  return (
    <div>
      <h1>{pageSettings?.headerTitle}</h1>
      <p>{pageSettings?.headerSubtitle}</p>
    </div>
  )
}
```

### 3. Get Course Category Settings

```typescript
import { getCourseCategorySettings } from '@/lib/getSiteSettings'

export default async function NursingPage() {
  const categorySettings = await getCourseCategorySettings('nursing')

  return (
    <div>
      <h1>{categorySettings?.headerTitle}</h1>
      <p>{categorySettings?.headerSubtitle}</p>
    </div>
  )
}
```

## Available Page Settings

The following pages have dedicated settings:

- `homePage` - Home page metadata
- `aboutPage` - About page metadata and header content
- `coursesPage` - Courses hub page settings
- `servicesPage` - Services page settings
- `admissionPage` - Admission page settings (includes banner toggle)
- `studentCornerPage` - Student corner settings
- `blogPage` - Blog listing page settings (includes postsPerPage)
- `contactPage` - Contact page settings (includes map toggle)

## Available Course Categories

- `nursing` - Nursing programs
- `pharmacy` - Pharmacy programs
- `btech` - Engineering programs
- `diploma` - Diploma programs
- `management` - Management programs
- `education` - Education programs
- `generalDegree` - General degree programs
- `others` - Other specialized programs

## Example: Complete Page Implementation

```typescript
// app/(site)/blog/page.tsx
import { getPageSettings, getSiteSettings } from '@/lib/getSiteSettings'
import type { Metadata } from 'next'

// Generate metadata
export async function generateMetadata(): Promise<Metadata> {
  const pageSettings = await getPageSettings('blogPage')
  const siteSettings = await getSiteSettings()

  return {
    title: pageSettings?.metaTitle || 'Blog',
    description: pageSettings?.metaDescription || siteSettings?.seo?.metaDescription,
  }
}

// Page component
export default async function BlogPage() {
  const pageSettings = await getPageSettings('blogPage')
  const postsPerPage = pageSettings?.postsPerPage || 12

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-brand-primary text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-serif mb-4">
            {pageSettings?.headerTitle || 'Our Blog'}
          </h1>
          <p className="text-xl">
            {pageSettings?.headerSubtitle || 'Latest updates and articles'}
          </p>
          {pageSettings?.headerDescription && (
            <div className="mt-6 prose prose-invert">
              {/* Render rich text content */}
            </div>
          )}
        </div>
      </section>

      {/* Blog posts grid */}
      <section className="py-12">
        {/* Fetch and display {postsPerPage} posts */}
      </section>
    </div>
  )
}
```

## Updating Settings via CMS Admin

1. Navigate to `/admin` in your browser
2. Log in with your admin credentials
3. Go to "Site Settings" collection
4. Click on the existing settings document (or create one if none exists)
5. Update the desired fields:
   - **Page-Specific Settings**: Expand the "pages" group
   - **Course Categories**: Expand the "courseCategories" group
   - **Contact Info**: Update phone, email, address, WhatsApp
   - **Social Media**: Add your social media URLs
   - **SEO**: Update meta descriptions and keywords
6. Click "Save"

## Default Fallback Values

If no site settings are configured in the CMS, the system will use default values defined in `/lib/getSiteSettings.ts` (`DEFAULT_SITE_SETTINGS` constant).

## Best Practices

1. **Always use getters**: Use `getPageSettings()` and `getCourseCategorySettings()` instead of accessing the full settings object
2. **Provide fallbacks**: Always provide fallback values for optional fields using `DEFAULT_SITE_SETTINGS`
3. **Cache appropriately**: These functions fetch from the database, so they benefit from Next.js's built-in caching (60s revalidate)
4. **Server Components only**: These are async functions meant for Server Components only
5. **Update once**: Create a single SiteSettings document in the CMS - don't create multiple
6. **Import types**: Always import specific types for better IDE support: `type BlogPageSettings`, `type CategorySettings`
7. **Use optional chaining**: Always use `?.` when accessing settings properties for null safety

## TypeScript Support

### ✅ **Full Type Safety (No `any` Types)**

The helper functions return **properly typed data** with zero `any` types:

```typescript
// Generic type parameters provide exact types
const blogSettings = await getPageSettings('blogPage')
// Type: BlogPageSettings | null

const nursingSettings = await getCourseCategorySettings('nursing')
// Type: CategorySettings | null
```

### Type Inference Benefits:

1. **IntelliSense/Autocomplete** - Your IDE shows all available properties
2. **Compile-time Errors** - Typos caught during development
3. **Refactoring Support** - Rename properties safely across the codebase
4. **Documentation** - Types serve as inline documentation

### Example with Full Type Safety:

```typescript
import { getPageSettings, type BlogPageSettings, DEFAULT_SITE_SETTINGS } from '@/lib/getSiteSettings'

export default async function BlogPage() {
  const settings = await getPageSettings('blogPage')

  // TypeScript knows settings is BlogPageSettings | null
  // settings?.postsPerPage is number | undefined ✓
  // settings?.showMap would be a TYPE ERROR ✓

  const postsPerPage = settings?.postsPerPage || DEFAULT_SITE_SETTINGS.pages.blogPage.postsPerPage
  // postsPerPage is typed as: number
}
```

## Troubleshooting

### Settings not appearing
- Ensure you've created a SiteSettings document in the CMS admin panel
- Check that the MONGODB_URI environment variable is correctly set
- Verify the Payload CMS is properly configured

### TypeScript errors
- Run `npm run generate:types` to regenerate Payload types
- Check that your `.env.local` file has all required variables
- Ensure the database connection is working

### Changes not reflecting
- Clear Next.js cache: `rm -rf .next`
- Restart the dev server
- Check if you're using the correct page/category key
