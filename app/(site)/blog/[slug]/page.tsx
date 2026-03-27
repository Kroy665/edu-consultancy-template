import type { Metadata } from 'next'
import type { BlogPost, Media } from '@/payload/payload-types'
import { getPayload } from 'payload'
import config from '@payload-config'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { Badge } from '@/components/ui/Badge'
import { RichText } from '@/components/RichText'
import { Calendar, User, ArrowLeft, ArrowRight } from 'lucide-react'
import { getSiteSettings, DEFAULT_SITE_SETTINGS } from '@/lib/getSiteSettings'

type Props = {
  params: Promise<{
    slug: string
  }>
}

export const revalidate = 60;

export async function generateStaticParams() {
  const payload = await getPayload({ config })

  const { docs: posts } = await payload.find({
    collection: 'blog-posts',
    where: {
      status: {
        equals: 'published',
      },
    },
    limit: 100,
  })

  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const payload = await getPayload({ config })
  const siteSettings = await getSiteSettings()
  const siteName = siteSettings?.siteName || DEFAULT_SITE_SETTINGS.siteName

  const { docs: posts } = await payload.find({
    collection: 'blog-posts',
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
  })

  const post = posts[0]

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: post.title,
    description: post.excerpt || `Read this article from ${siteName}`,
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const payload = await getPayload({ config })

  const { docs: posts } = await payload.find({
    collection: 'blog-posts',
    where: {
      slug: {
        equals: slug,
      },
      status: {
        equals: 'published',
      },
    },
    limit: 1,
  })

  const post = posts[0] as BlogPost

  if (!post) {
    notFound()
  }

  // Get featured image URL
  const featuredImageUrl = post.featuredImage && typeof post.featuredImage === 'object'
    ? (post.featuredImage as Media)?.url
    : null

  // Fetch related posts (same tags)
  let relatedPosts: BlogPost[] = []
  if (post.tags && post.tags.length > 0) {
    const { docs } = await payload.find({
      collection: 'blog-posts',
      where: {
        status: {
          equals: 'published',
        },
        id: {
          not_equals: post.id,
        },
      },
      limit: 3,
    })
    relatedPosts = docs as BlogPost[]
  }

  return (
    <>
      {/* Breadcrumb & Back */}
      <section className="bg-brand-light py-4 border-b border-neutral-200">
        <div className="section-container">
          <div className="flex items-center justify-between">
            <nav className="text-sm text-neutral-600">
              <Link href="/" className="hover:text-brand-secondary">
                Home
              </Link>
              <span className="mx-2">→</span>
              <Link href="/blog" className="hover:text-brand-secondary">
                Blog
              </Link>
              <span className="mx-2">→</span>
              <span className="text-neutral-900">{post.title}</span>
            </nav>
            <Link
              href="/blog"
              className="flex items-center gap-2 text-sm text-brand-secondary hover:text-brand-secondary/80 font-semibold"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <article className="py-16 bg-white">
        <div className="section-container">
          <div className="max-w-3xl mx-auto">
            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {post.tags.map((tagItem, index) => (
                  <Badge key={index} variant="secondary">
                    {tagItem.tag}
                  </Badge>
                ))}
              </div>
            )}

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-serif text-brand-primary mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Meta Info */}
            <div className="flex items-center gap-6 text-sm text-neutral-600 mb-8 pb-8 border-b border-neutral-200">
              {post.publishedAt && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-brand-secondary" />
                  <span>
                    {new Date(post.publishedAt).toLocaleDateString('en-IN', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                </div>
              )}
              {post.author && (
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-brand-secondary" />
                  <span>{post.author}</span>
                </div>
              )}
            </div>

            {/* Featured Image */}
            {featuredImageUrl ? (
              <div className="relative aspect-video overflow-hidden rounded-xl mb-12 bg-neutral-100">
                <Image
                  src={featuredImageUrl}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 720px"
                  className="object-cover"
                  priority
                />
              </div>
            ) : (
              <div className="aspect-video bg-gradient-to-br from-brand-primary to-brand-secondary rounded-xl flex items-center justify-center mb-12">
                <span className="text-white/20 text-9xl font-serif">N</span>
              </div>
            )}

            {/* Content */}
            <div className="max-w-none">
              <div className="text-xl text-neutral-700 mb-8 font-semibold">{post.excerpt}</div>

              {/* Rich Text Content */}
              <RichText content={post.content} className="text-base" />
            </div>

            {/* Share & CTA */}
            <div className="mt-12 pt-8 border-t border-neutral-200">
              <div className="bg-brand-light rounded-xl p-8 text-center">
                <h3 className="text-2xl font-serif text-brand-primary mb-4">
                  Need Personalized Guidance?
                </h3>
                <p className="text-neutral-600 mb-6">
                  Our expert counsellors can help you make the right career and course decisions
                </p>
                <Link
                  href="/contact"
                  className="inline-block px-8 py-3 bg-brand-secondary text-white rounded-full font-semibold hover:bg-brand-secondary/90 transition-colors"
                >
                  Book Free Counselling
                </Link>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 bg-brand-light">
          <div className="section-container">
            <h2 className="text-3xl font-serif text-center mb-12 text-brand-primary">
              Related Articles
            </h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {relatedPosts.map((relatedPost) => {
                const relatedImageUrl = relatedPost.featuredImage && typeof relatedPost.featuredImage === 'object'
                  ? (relatedPost.featuredImage as Media)?.url
                  : null

                return (
                  <Link
                    key={relatedPost.id}
                    href={`/blog/${relatedPost.slug}`}
                    className="bg-white border border-neutral-200 rounded-xl overflow-hidden hover:shadow-md transition-all hover:border-brand-secondary"
                  >
                    {relatedImageUrl ? (
                      <div className="relative aspect-video overflow-hidden bg-neutral-100">
                        <Image
                          src={relatedImageUrl}
                          alt={relatedPost.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ) : (
                      <div className="aspect-video bg-gradient-to-br from-brand-primary/20 to-brand-secondary/20 flex items-center justify-center">
                        <span className="text-brand-primary/20 text-4xl font-serif">N</span>
                      </div>
                    )}
                    <div className="p-6">
                      <h3 className="font-semibold text-neutral-900 mb-2 line-clamp-2">
                        {relatedPost.title}
                      </h3>
                      <p className="text-sm text-neutral-600 line-clamp-2 mb-3">
                        {relatedPost.excerpt}
                      </p>
                      <span className="inline-flex items-center gap-2 text-sm font-semibold text-brand-secondary">
                        Read More
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
