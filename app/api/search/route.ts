import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get('q')

    if (!query || query.trim().length === 0) {
      return NextResponse.json({
        results: [],
        totalResults: 0,
        query: '',
      })
    }

    const payload = await getPayload({ config })
    const searchQuery = query.trim()

    // Search across multiple collections
    const [courses, blogPosts, services, faqs] = await Promise.all([
      // Search Courses
      payload.find({
        collection: 'courses',
        where: {
          or: [
            {
              name: {
                contains: searchQuery,
              },
            },
            {
              shortDescription: {
                contains: searchQuery,
              },
            },
          ],
        },
        limit: 10,
      }),

      // Search Blog Posts
      payload.find({
        collection: 'blog-posts',
        where: {
          and: [
            {
              status: {
                equals: 'published',
              },
            },
            {
              or: [
                {
                  title: {
                    contains: searchQuery,
                  },
                },
                {
                  excerpt: {
                    contains: searchQuery,
                  },
                },
              ],
            },
          ],
        },
        limit: 10,
      }),

      // Search Services
      payload.find({
        collection: 'services',
        where: {
          or: [
            {
              name: {
                contains: searchQuery,
              },
            },
            {
              shortDescription: {
                contains: searchQuery,
              },
            },
          ],
        },
        limit: 10,
      }),

      // Search FAQs
      payload.find({
        collection: 'faqs',
        where: {
          or: [
            {
              question: {
                contains: searchQuery,
              },
            },
            {
              answer: {
                contains: searchQuery,
              },
            },
          ],
        },
        limit: 10,
      }),
    ])

    // Format results
    const results = [
      ...courses.docs.map((course: any) => ({
        id: course.id,
        type: 'course',
        title: course.name,
        description: course.shortDescription || '',
        url: `/courses/${course.category}`,
        category: course.category,
      })),
      ...blogPosts.docs.map((post: any) => ({
        id: post.id,
        type: 'blog',
        title: post.title,
        description: post.excerpt || '',
        url: `/blog/${post.slug}`,
        date: post.publishedAt,
      })),
      ...services.docs.map((service: any) => ({
        id: service.id,
        type: 'service',
        title: service.name,
        description: service.shortDescription || '',
        url: '/services',
      })),
      ...faqs.docs.map((faq: any) => ({
        id: faq.id,
        type: 'faq',
        title: faq.question,
        description: faq.answer ? faq.answer.substring(0, 150) + '...' : '',
        url: '/student-corner',
      })),
    ]

    // Add static pages based on query
    const staticPages = []
    const queryLower = searchQuery.toLowerCase()

    if (queryLower.includes('admission') || queryLower.includes('apply')) {
      staticPages.push({
        id: 'admission-page',
        type: 'page',
        title: 'Admission Process',
        description: 'Learn about our admission process, requirements, and how to apply.',
        url: '/admission',
      })
    }

    if (queryLower.includes('about') || queryLower.includes('who')) {
      staticPages.push({
        id: 'about-page',
        type: 'page',
        title: 'About Us',
        description: 'Learn more about Nibedita Institute and our mission.',
        url: '/about',
      })
    }

    if (queryLower.includes('contact') || queryLower.includes('reach')) {
      staticPages.push({
        id: 'contact-page',
        type: 'page',
        title: 'Contact Us',
        description: 'Get in touch with us for any queries or assistance.',
        url: '/contact',
      })
    }

    const allResults = [...staticPages, ...results]

    return NextResponse.json({
      results: allResults,
      totalResults: allResults.length,
      query: searchQuery,
    })
  } catch (error) {
    console.error('Search error:', error)
    return NextResponse.json(
      {
        error: 'Failed to perform search',
        results: [],
        totalResults: 0,
      },
      { status: 500 }
    )
  }
}
