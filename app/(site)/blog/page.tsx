import type { Metadata } from 'next'
import type { BlogPost, Media } from '@/payload/payload-types'
import { getPayload } from 'payload'
import config from '@payload-config'
import Link from 'next/link'
import Image from 'next/image'
import { Badge } from '@/components/ui/Badge'
import { Calendar, User, ArrowRight } from 'lucide-react'
import { getPageSettings, DEFAULT_SITE_SETTINGS, type BlogPageSettings } from '@/lib/getSiteSettings'

export async function generateMetadata(): Promise<Metadata> {
  const pageSettings = await getPageSettings('blogPage')

  return {
    title: pageSettings?.metaTitle || 'Blog | Nibedita Institute',
    description: pageSettings?.metaDescription || DEFAULT_SITE_SETTINGS.pages.blogPage.metaDescription,
  }
}

export const revalidate = 60;

export default async function BlogPage() {
  const payload = await getPayload({ config })
  const pageSettings = await getPageSettings('blogPage')

  const postsPerPage = (pageSettings as BlogPageSettings)?.postsPerPage || DEFAULT_SITE_SETTINGS.pages.blogPage.postsPerPage

  const { docs: posts } = await payload.find({
    collection: 'blog-posts',
    where: {
      status: {
        equals: 'published',
      },
    },
    limit: postsPerPage,
    sort: '-publishedAt',
  })

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brand-primary to-brand-primary/80 text-white py-16">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-serif mb-6">
              {pageSettings?.headerTitle || DEFAULT_SITE_SETTINGS.pages.blogPage.headerTitle}
            </h1>
            <p className="text-lg text-white/90">
              {pageSettings?.headerSubtitle || DEFAULT_SITE_SETTINGS.pages.blogPage.headerSubtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16 bg-white">
        <div className="section-container">
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-neutral-600 mb-4">No blog posts available yet.</p>
              <p className="text-sm text-neutral-500">
                Check back soon for career guidance and admission tips!
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => {
                // Get featured image URL
                const featuredImageUrl = post.featuredImage && typeof post.featuredImage === 'object'
                  ? (post.featuredImage as Media)?.url
                  : null

                return (
                  <article
                    key={post.id}
                    className="bg-white border border-neutral-200 rounded-xl overflow-hidden hover:shadow-md transition-all duration-200 hover:border-brand-secondary"
                  >
                    {/* Featured Image */}
                    <Link href={`/blog/${post.slug}`} className="block">
                      {featuredImageUrl ? (
                        <div className="relative aspect-video overflow-hidden bg-neutral-100">
                          <Image
                            src={featuredImageUrl}
                            alt={post.title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      ) : (
                        <div className="aspect-video bg-gradient-to-br from-brand-primary to-brand-secondary flex items-center justify-center">
                          <span className="text-white/20 text-6xl font-serif">N</span>
                        </div>
                      )}
                    </Link>

                    {/* Content */}
                    <div className="p-6">
                    {/* Tags */}
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {post.tags.slice(0, 2).map((tagItem: any, index: number) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {tagItem.tag}
                          </Badge>
                        ))}
                      </div>
                    )}

                    {/* Title */}
                    <h2 className="text-xl font-semibold text-neutral-900 mb-3 line-clamp-2">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="hover:text-brand-secondary transition-colors"
                      >
                        {post.title}
                      </Link>
                    </h2>

                    {/* Excerpt */}
                    <p className="text-sm text-neutral-600 mb-4 line-clamp-3">{post.excerpt}</p>

                    {/* Meta Info */}
                    <div className="flex items-center justify-between text-xs text-neutral-500 mb-4">
                      <div className="flex items-center gap-4">
                        {post.publishedAt && (
                          <div className="flex items-center gap-1">
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
                        {post.author && (
                          <div className="flex items-center gap-1">
                            <User className="w-3 h-3" />
                            <span>{post.author}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Read More Link */}
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-brand-secondary hover:text-brand-secondary/80 transition-colors"
                    >
                      Read More
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                    </div>
                  </article>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      {posts.length > 0 && (
        <section className="py-12 bg-brand-light">
          <div className="section-container">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-2xl font-serif text-brand-primary mb-4">
                Get Personalized Career Guidance
              </h2>
              <p className="text-neutral-600 mb-6">
                Reading articles is great, but personalized counselling can make all the difference.
                Book a free session with our experts today.
              </p>
              <Link
                href="/contact"
                className="inline-block px-8 py-3 bg-brand-secondary text-white rounded-full font-semibold hover:bg-brand-secondary/90 transition-colors"
              >
                Book Free Counselling
              </Link>
            </div>
          </div>
        </section>
      )}
    </>
  )
}
