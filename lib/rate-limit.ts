/**
 * Simple in-memory rate limiter for API routes
 * For production with multiple instances, consider using Redis with @upstash/ratelimit
 */

interface RateLimitEntry {
  count: number
  resetAt: number
}

class RateLimiter {
  private store: Map<string, RateLimitEntry> = new Map()
  private cleanupInterval: NodeJS.Timeout | null = null

  constructor() {
    // Clean up expired entries every 5 minutes
    this.cleanupInterval = setInterval(() => {
      this.cleanup()
    }, 5 * 60 * 1000)
  }

  /**
   * Check if a request should be rate limited
   * @param identifier - Unique identifier (IP address, user ID, etc.)
   * @param limit - Maximum number of requests allowed
   * @param window - Time window in seconds
   * @returns Object with success status and optional retry-after time
   */
  check(
    identifier: string,
    limit: number = 5,
    window: number = 60
  ): { success: boolean; remaining: number; resetAt: number } {
    const now = Date.now()
    const windowMs = window * 1000
    const entry = this.store.get(identifier)

    // No previous entry - allow and create new entry
    if (!entry || now > entry.resetAt) {
      this.store.set(identifier, {
        count: 1,
        resetAt: now + windowMs,
      })
      return {
        success: true,
        remaining: limit - 1,
        resetAt: now + windowMs,
      }
    }

    // Entry exists and window hasn't expired
    if (entry.count < limit) {
      entry.count++
      return {
        success: true,
        remaining: limit - entry.count,
        resetAt: entry.resetAt,
      }
    }

    // Rate limit exceeded
    return {
      success: false,
      remaining: 0,
      resetAt: entry.resetAt,
    }
  }

  /**
   * Remove expired entries from memory
   */
  private cleanup(): void {
    const now = Date.now()
    for (const [key, entry] of this.store.entries()) {
      if (now > entry.resetAt) {
        this.store.delete(key)
      }
    }
  }

  /**
   * Clear all entries (useful for testing)
   */
  clear(): void {
    this.store.clear()
  }

  /**
   * Clean up interval on shutdown
   */
  destroy(): void {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval)
      this.cleanupInterval = null
    }
    this.clear()
  }
}

// Singleton instance
export const rateLimiter = new RateLimiter()

/**
 * Helper function to get client identifier from request
 * Uses IP address as identifier
 */
export function getClientIdentifier(request: Request): string {
  // Try to get real IP from headers (for proxies/load balancers)
  const forwardedFor = request.headers.get('x-forwarded-for')
  const realIp = request.headers.get('x-real-ip')

  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim()
  }

  if (realIp) {
    return realIp
  }

  // Fallback to a default identifier
  return 'unknown'
}

/**
 * Middleware-style rate limit checker for Next.js API routes
 */
export async function checkRateLimit(
  request: Request,
  options: { limit?: number; window?: number } = {}
): Promise<{ success: boolean; response?: Response }> {
  const { limit = 5, window = 60 } = options
  const identifier = getClientIdentifier(request)

  const result = rateLimiter.check(identifier, limit, window)

  if (!result.success) {
    const retryAfter = Math.ceil((result.resetAt - Date.now()) / 1000)

    return {
      success: false,
      response: new Response(
        JSON.stringify({
          error: 'Too many requests',
          message: `Rate limit exceeded. Please try again in ${retryAfter} seconds.`,
          retryAfter,
        }),
        {
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            'Retry-After': retryAfter.toString(),
            'X-RateLimit-Limit': limit.toString(),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': new Date(result.resetAt).toISOString(),
          },
        }
      ),
    }
  }

  return { success: true }
}
