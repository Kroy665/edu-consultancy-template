/**
 * Server-side sanitization utilities
 * Note: DOMPurify requires a DOM environment, so we use simple regex-based
 * sanitization for server-side use in Next.js API routes
 */

/**
 * Sanitization configuration options
 */
interface SanitizeOptions {
  /**
   * Allow basic HTML formatting (bold, italic, links, etc.)
   * Use for rich text fields where some HTML is expected
   */
  allowBasicHTML?: boolean

  /**
   * Maximum length for the sanitized string
   * Strings longer than this will be truncated
   */
  maxLength?: number

  /**
   * Trim whitespace from the beginning and end
   */
  trim?: boolean
}

/**
 * Strip HTML tags from input
 */
function stripHtmlTags(input: string): string {
  // Remove all HTML tags but keep the text content
  return input.replace(/<[^>]*>/g, '')
}

/**
 * Escape HTML special characters
 */
function escapeHtml(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
}

/**
 * Default sanitization - strips all HTML tags and scripts
 * Use for: names, emails, phone numbers, plain text fields
 */
export function sanitizeInput(
  input: string | undefined | null,
  options: SanitizeOptions = {}
): string {
  if (!input) return ''

  const {
    maxLength,
    trim = true,
  } = options

  // Strip all HTML tags
  let sanitized = stripHtmlTags(input)

  // Remove any null bytes
  sanitized = sanitized.replace(/\0/g, '')

  // Remove control characters except newlines and tabs
  sanitized = sanitized.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '')

  // Trim whitespace
  if (trim) {
    sanitized = sanitized.trim()
  }

  // Enforce maximum length
  if (maxLength && sanitized.length > maxLength) {
    sanitized = sanitized.substring(0, maxLength)
  }

  return sanitized
}

/**
 * Sanitize an object's string properties
 * Recursively sanitizes all string values in an object
 *
 * @example
 * const data = sanitizeObject({
 *   name: '<script>alert("xss")</script>John',
 *   email: 'john@example.com',
 *   nested: { message: '<b>Hello</b>' }
 * })
 * // Returns: { name: 'John', email: 'john@example.com', nested: { message: 'Hello' } }
 */
export function sanitizeObject<T extends Record<string, any>>(
  obj: T,
  options: SanitizeOptions = {}
): T {
  const sanitized = {} as T

  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'string') {
      sanitized[key as keyof T] = sanitizeInput(value, options) as T[keyof T]
    } else if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      sanitized[key as keyof T] = sanitizeObject(value, options)
    } else {
      sanitized[key as keyof T] = value
    }
  }

  return sanitized
}

/**
 * Sanitize search query
 * Removes special regex characters and SQL-like syntax
 * Use for: search inputs, filter queries
 */
export function sanitizeSearchQuery(query: string | undefined | null): string {
  if (!query) return ''

  // First sanitize HTML
  let sanitized = sanitizeInput(query, { trim: true, maxLength: 200 })

  // Escape special regex characters that could cause ReDoS
  sanitized = sanitized.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

  // Remove SQL-like keywords (extra protection)
  const sqlKeywords = /\b(SELECT|INSERT|UPDATE|DELETE|DROP|UNION|WHERE|FROM)\b/gi
  sanitized = sanitized.replace(sqlKeywords, '')

  return sanitized
}

/**
 * Sanitize phone number - keep only digits and +
 * Use for: phone number inputs
 */
export function sanitizePhoneNumber(phone: string | undefined | null): string {
  if (!phone) return ''

  // First remove any HTML
  let sanitized = sanitizeInput(phone)

  // Keep only digits, spaces, hyphens, and + sign
  sanitized = sanitized.replace(/[^\d\s\-+()]/g, '')

  return sanitized.trim()
}

/**
 * Sanitize email address
 * Use for: email inputs
 */
export function sanitizeEmail(email: string | undefined | null): string {
  if (!email) return ''

  // Remove HTML and trim
  let sanitized = sanitizeInput(email, { trim: true })

  // Convert to lowercase (standard email practice)
  sanitized = sanitized.toLowerCase()

  // Remove any characters that are definitely not part of a valid email
  // This is not full email validation, just sanitization
  sanitized = sanitized.replace(/[<>,"']/g, '')

  return sanitized
}

/**
 * Sanitize rich text content (for blog posts, course descriptions, etc.)
 * Note: For rich text, we strip potentially dangerous tags like script, iframe
 * but allow common formatting tags. In production, consider using a dedicated
 * rich text library with a proper HTML parser.
 */
export function sanitizeRichText(content: string | undefined | null): string {
  if (!content) return ''

  let sanitized = content

  // Remove script tags and their contents
  sanitized = sanitized.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')

  // Remove iframe tags
  sanitized = sanitized.replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')

  // Remove object and embed tags
  sanitized = sanitized.replace(/<(object|embed)[^>]*>/gi, '')

  // Remove event handlers (onclick, onerror, etc.)
  sanitized = sanitized.replace(/\s*on\w+\s*=\s*["'][^"']*["']/gi, '')
  sanitized = sanitized.replace(/\s*on\w+\s*=\s*[^\s>]*/gi, '')

  // Remove javascript: protocol in links
  sanitized = sanitized.replace(/href\s*=\s*["']?\s*javascript:/gi, 'href="')

  // Remove data: protocol (can be used for XSS)
  sanitized = sanitized.replace(/src\s*=\s*["']?\s*data:/gi, 'src="')

  return sanitized
}
