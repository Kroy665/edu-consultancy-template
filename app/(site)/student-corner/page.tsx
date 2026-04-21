import type { Metadata } from 'next'
import type { BlogPost } from '@/payload/payload-types'
import { getPayload } from 'payload'
import config from '@payload-config'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { HelpCircle, BookOpen, Bell, Calendar } from 'lucide-react'
import Link from 'next/link'
import { getPageSettings, DEFAULT_SITE_SETTINGS } from '@/lib/getSiteSettings'

// Revalidate every hour (3600 seconds)
export const revalidate = 3600

export async function generateMetadata(): Promise<Metadata> {
  const pageSettings = await getPageSettings('studentCornerPage')

  return {
    title: pageSettings?.metaTitle || 'Student Corner | EduConsult Pro',
    description: pageSettings?.metaDescription || DEFAULT_SITE_SETTINGS.pages.studentCornerPage.metaDescription,
  }
}

export default async function StudentCornerPage() {
  const payload = await getPayload({ config })
  const pageSettings = await getPageSettings('studentCornerPage')

  // Fetch FAQs
  const { docs: faqs } = await payload.find({
    collection: 'faqs',
    where: {
      featured: {
        equals: true,
      },
    },
    limit: 20,
    sort: 'order',
  })

  // Fetch Admission Updates
  const { docs: admissionUpdates } = await payload.find({
    collection: 'admission-updates',
    where: {
      active: {
        equals: true,
      },
    },
    limit: 10,
    sort: '-publishedAt',
  })

  // Fetch Career Guidance blog posts (tagged with 'career')
  const { docs: careerPosts } = await payload.find({
    collection: 'blog-posts',
    where: {
      status: {
        equals: 'published',
      },
    },
    limit: 3,
    sort: '-publishedAt',
  })

  // Filter posts that have 'career' tag
  const careerGuidancePosts = (careerPosts as BlogPost[]).filter((post) =>
    post.tags?.some((tagItem: any) => tagItem.tag?.toLowerCase().includes('career'))
  )
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brand-primary to-brand-primary/80 text-white py-16">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-serif mb-6">
              {pageSettings?.headerTitle || DEFAULT_SITE_SETTINGS.pages.studentCornerPage.headerTitle}
            </h1>
            <p className="text-lg text-white/90">
              {pageSettings?.headerSubtitle || DEFAULT_SITE_SETTINGS.pages.studentCornerPage.headerSubtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-8 bg-brand-light border-b border-neutral-200">
        <div className="section-container">
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="#faqs" className="flex items-center gap-2 px-6 py-3 bg-white rounded-full border border-neutral-200 hover:border-brand-secondary transition-colors">
              <HelpCircle className="w-4 h-4 text-brand-secondary" />
              <span className="text-sm font-semibold text-neutral-900">FAQs</span>
            </a>
            <a href="#guidance" className="flex items-center gap-2 px-6 py-3 bg-white rounded-full border border-neutral-200 hover:border-brand-secondary transition-colors">
              <BookOpen className="w-4 h-4 text-brand-secondary" />
              <span className="text-sm font-semibold text-neutral-900">Career Guidance</span>
            </a>
            <a href="#updates" className="flex items-center gap-2 px-6 py-3 bg-white rounded-full border border-neutral-200 hover:border-brand-secondary transition-colors">
              <Bell className="w-4 h-4 text-brand-secondary" />
              <span className="text-sm font-semibold text-neutral-900">Admission Updates</span>
            </a>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section id="faqs" className="py-16 bg-white scroll-mt-16">
        <div className="section-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif text-brand-primary mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-neutral-600">
              Find answers to common questions about admissions, courses, and our services
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-neutral-600">No FAQs available at the moment.</p>
              </div>
            ) : (
              faqs.map((faq) => (
                <details
                  key={faq.id}
                  className="group bg-brand-light rounded-xl border border-neutral-200 overflow-hidden"
                >
                  <summary className="px-6 py-4 cursor-pointer list-none flex items-center justify-between hover:bg-white transition-colors">
                    <div className="flex items-start gap-4">
                      <HelpCircle className="w-5 h-5 text-brand-secondary flex-shrink-0 mt-0.5" />
                      <span className="font-semibold text-neutral-900">{faq.question}</span>
                    </div>
                    <svg
                      className="w-5 h-5 text-neutral-600 group-open:rotate-180 transition-transform flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="px-6 pb-4 pl-15 text-neutral-700 text-sm">
                    {faq.answer}
                  </div>
                </details>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Career Guidance Articles */}
      <section id="guidance" className="py-16 bg-brand-light scroll-mt-16">
        <div className="section-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif text-brand-primary mb-4">Career Guidance</h2>
            <p className="text-neutral-600">
              Expert articles and resources to help you make informed career decisions
            </p>
          </div>

          {careerGuidancePosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-neutral-600 mb-4">No career guidance articles available yet.</p>
              <Button href="/blog" variant="outline" size="md">
                View All Blog Posts
              </Button>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {careerGuidancePosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="bg-white rounded-xl p-6 border border-neutral-200 hover:border-brand-secondary transition-all hover:shadow-md"
                >
                  <BookOpen className="w-8 h-8 text-brand-secondary mb-4" />
                  <h3 className="font-semibold text-neutral-900 mb-2 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-neutral-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  {post.publishedAt && (
                    <div className="flex items-center gap-2 text-xs text-neutral-500 mb-3">
                      <Calendar className="w-3 h-3" />
                      <span>
                        {new Date(post.publishedAt).toLocaleDateString('en-IN', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                    </div>
                  )}
                  <span className="text-sm text-brand-secondary font-semibold">Read More →</span>
                </Link>
              ))}
            </div>
          )}

          <div className="text-center mt-8">
            <Button href="/blog" variant="outline" size="lg">
              View All Articles
            </Button>
          </div>
        </div>
      </section>

      {/* Admission Updates */}
      <section id="updates" className="py-16 bg-white scroll-mt-16">
        <div className="section-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif text-brand-primary mb-4">Latest Admission Updates</h2>
            <p className="text-neutral-600">
              Stay informed about important admission deadlines, entrance exams, and announcements
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {admissionUpdates.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-neutral-600">No admission updates available at the moment.</p>
              </div>
            ) : (
              admissionUpdates.map((update) => (
                <div
                  key={update.id}
                  className="bg-brand-light rounded-xl p-6 border-l-4 border-brand-secondary"
                >
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div className="flex items-center gap-3">
                      <Bell className="w-5 h-5 text-brand-secondary" />
                      <h3 className="font-semibold text-neutral-900">{update.title}</h3>
                    </div>
                    <Badge variant="secondary" className="text-xs whitespace-nowrap">
                      {update.badge}
                    </Badge>
                  </div>
                  <p className="text-sm text-neutral-700 mb-2">{update.description}</p>
                  {update.publishedAt && (
                    <p className="text-xs text-neutral-500">
                      {new Date(update.publishedAt).toLocaleDateString('en-IN', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-brand-secondary text-white">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-serif mb-4">Still Have Questions?</h2>
            <p className="text-lg text-white/90 mb-8">
              Our counselling team is here to help. Get personalized guidance for your career and
              admission queries.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                href="/contact"
                variant="outline"
                size="lg"
                className="bg-white text-brand-secondary border-white hover:bg-white/90"
              >
                Contact Us
              </Button>
              <Button
                href="/admission"
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white/10"
              >
                Apply Now
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
