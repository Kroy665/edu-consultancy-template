'use client'

import { useState, useEffect, useCallback, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Search, FileText, GraduationCap, Briefcase, HelpCircle, FileSearch, Loader2 } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'

interface SearchResult {
  id: string
  type: 'course' | 'blog' | 'service' | 'faq' | 'page'
  title: string
  description: string
  url: string
  category?: string
  date?: string
}

interface SearchResponse {
  results: SearchResult[]
  totalResults: number
  query: string
}

const typeIcons = {
  course: GraduationCap,
  blog: FileText,
  service: Briefcase,
  faq: HelpCircle,
  page: FileSearch,
}

const typeLabels = {
  course: 'Course',
  blog: 'Blog Post',
  service: 'Service',
  faq: 'FAQ',
  page: 'Page',
}

const typeColors = {
  course: 'primary',
  blog: 'secondary',
  service: 'info',
  faq: 'warning',
  page: 'info',
} as const

function SearchContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [query, setQuery] = useState(searchParams.get('q') || '')
  const [results, setResults] = useState<SearchResult[]>([])
  const [totalResults, setTotalResults] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)

  const performSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([])
      setTotalResults(0)
      setHasSearched(false)
      return
    }

    setIsLoading(true)
    setHasSearched(true)

    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`)
      const data: SearchResponse = await response.json()

      setResults(data.results || [])
      setTotalResults(data.totalResults || 0)
    } catch (error) {
      console.error('Search error:', error)
      setResults([])
      setTotalResults(0)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    const q = searchParams.get('q')
    if (q) {
      setQuery(q)
      performSearch(q)
    }
  }, [searchParams, performSearch])

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="section-container">
        {/* Search Header */}
        <div className="max-w-3xl mx-auto mb-12">
          <h1 className="text-3xl md:text-4xl font-serif text-brand-navy mb-6 text-center">
            Search
          </h1>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              value={query}
              onChange={handleInputChange}
              placeholder="Search for courses, services, blog posts..."
              className="w-full px-6 py-4 pr-14 border-2 border-neutral-200 rounded-xl text-lg focus:outline-none focus:border-brand-secondary transition-colors"
              autoFocus
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 p-3 bg-brand-secondary text-brand-primary rounded-lg hover:bg-brand-accent transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
          </form>

          {/* Results Count */}
          {hasSearched && !isLoading && (
            <p className="mt-4 text-neutral-600 text-center">
              {totalResults > 0 ? (
                <>
                  Found <span className="font-semibold text-brand-navy">{totalResults}</span>{' '}
                  {totalResults === 1 ? 'result' : 'results'} for &quot;
                  <span className="font-semibold text-brand-navy">{searchParams.get('q')}</span>
                  &quot;
                </>
              ) : (
                <>
                  No results found for &quot;
                  <span className="font-semibold text-brand-navy">{searchParams.get('q')}</span>
                  &quot;
                </>
              )}
            </p>
          )}
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-12 h-12 text-brand-secondary animate-spin mb-4" />
            <p className="text-neutral-600">Searching...</p>
          </div>
        )}

        {/* Search Results */}
        {!isLoading && hasSearched && results.length > 0 && (
          <div className="max-w-4xl mx-auto space-y-4">
            {results.map((result) => {
              const Icon = typeIcons[result.type]
              return (
                <Link
                  key={result.id}
                  href={result.url}
                  className="block bg-white border border-neutral-200 rounded-xl p-6 hover:shadow-lg hover:border-brand-secondary transition-all duration-200 group"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 p-3 bg-brand-light rounded-lg group-hover:bg-brand-secondary/10 transition-colors">
                      <Icon className="w-6 h-6 text-brand-secondary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <h3 className="text-xl font-semibold text-brand-navy group-hover:text-brand-secondary transition-colors line-clamp-2">
                          {result.title}
                        </h3>
                        <Badge variant={typeColors[result.type]} className="flex-shrink-0">
                          {typeLabels[result.type]}
                        </Badge>
                      </div>
                      {result.description && (
                        <p className="text-neutral-600 line-clamp-2 mb-3">
                          {result.description}
                        </p>
                      )}
                      {result.category && (
                        <p className="text-sm text-brand-secondary capitalize">
                          Category: {result.category.replace('-', ' ')}
                        </p>
                      )}
                      {result.date && (
                        <p className="text-sm text-neutral-500">
                          Published: {new Date(result.date).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        )}

        {/* No Results State */}
        {!isLoading && hasSearched && results.length === 0 && (
          <div className="max-w-2xl mx-auto text-center py-20">
            <FileSearch className="w-20 h-20 text-neutral-300 mx-auto mb-6" />
            <h2 className="text-2xl font-serif text-brand-navy mb-4">No Results Found</h2>
            <p className="text-neutral-600 mb-8">
              We couldn&apos;t find any results matching your search. Try different keywords or browse
              our popular sections below.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button href="/courses" variant="outline" className="w-full">
                <GraduationCap className="w-4 h-4 mr-2" />
                Courses
              </Button>
              <Button href="/services" variant="outline" className="w-full">
                <Briefcase className="w-4 h-4 mr-2" />
                Services
              </Button>
              <Button href="/blog" variant="outline" className="w-full">
                <FileText className="w-4 h-4 mr-2" />
                Blog
              </Button>
              <Button href="/student-corner" variant="outline" className="w-full">
                <HelpCircle className="w-4 h-4 mr-2" />
                FAQs
              </Button>
            </div>
          </div>
        )}

        {/* Empty State (Before Search) */}
        {!hasSearched && !isLoading && (
          <div className="max-w-2xl mx-auto text-center py-20">
            <Search className="w-20 h-20 text-neutral-300 mx-auto mb-6" />
            <h2 className="text-2xl font-serif text-brand-navy mb-4">Start Your Search</h2>
            <p className="text-neutral-600 mb-8">
              Search across our courses, services, blog posts, and more to find what you&apos;re looking for.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 bg-brand-light rounded-lg">
                <GraduationCap className="w-8 h-8 text-brand-secondary mx-auto mb-2" />
                <p className="text-sm text-brand-navy font-medium">Courses</p>
              </div>
              <div className="p-4 bg-brand-light rounded-lg">
                <Briefcase className="w-8 h-8 text-brand-secondary mx-auto mb-2" />
                <p className="text-sm text-brand-navy font-medium">Services</p>
              </div>
              <div className="p-4 bg-brand-light rounded-lg">
                <FileText className="w-8 h-8 text-brand-secondary mx-auto mb-2" />
                <p className="text-sm text-brand-navy font-medium">Blog Posts</p>
              </div>
              <div className="p-4 bg-brand-light rounded-lg">
                <HelpCircle className="w-8 h-8 text-brand-secondary mx-auto mb-2" />
                <p className="text-sm text-brand-navy font-medium">FAQs</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white py-12">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="w-12 h-12 text-brand-secondary animate-spin mb-4" />
              <p className="text-neutral-600">Loading search...</p>
            </div>
          </div>
        </div>
      </div>
    }>
      <SearchContent />
    </Suspense>
  )
}
