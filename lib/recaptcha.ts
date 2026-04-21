/**
 * Google reCAPTCHA v3 verification utility
 * Docs: https://developers.google.com/recaptcha/docs/v3
 */

interface RecaptchaVerificationResponse {
  success: boolean
  challenge_ts?: string
  hostname?: string
  score?: number
  action?: string
  'error-codes'?: string[]
}

/**
 * Verify reCAPTCHA token on the server side
 * @param token - The token generated on the client side
 * @param expectedAction - The action expected (e.g., 'submit_enquiry')
 * @param minimumScore - Minimum score required (0.0 - 1.0). Default: 0.5
 * @returns Object with success status and score
 */
export async function verifyRecaptcha(
  token: string,
  expectedAction?: string,
  minimumScore: number = 0.5
): Promise<{ success: boolean; score?: number; error?: string }> {
  // Skip verification if secret key is not configured
  const secretKey = process.env.RECAPTCHA_SECRET_KEY
  if (!secretKey || secretKey.startsWith('6LeXXXX')) {
    console.warn('reCAPTCHA secret key not configured. Skipping verification.')
    return { success: true, score: 1.0 }
  }

  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        secret: secretKey,
        response: token,
      }),
    })

    const data: RecaptchaVerificationResponse = await response.json()

    if (!data.success) {
      console.error('reCAPTCHA verification failed:', data['error-codes'])
      return {
        success: false,
        error: 'reCAPTCHA verification failed',
      }
    }

    // Verify action if provided
    if (expectedAction && data.action !== expectedAction) {
      console.error(`reCAPTCHA action mismatch. Expected: ${expectedAction}, Got: ${data.action}`)
      return {
        success: false,
        error: 'Invalid reCAPTCHA action',
      }
    }

    // Check score
    const score = data.score ?? 0
    if (score < minimumScore) {
      console.warn(`reCAPTCHA score too low: ${score} (minimum: ${minimumScore})`)
      return {
        success: false,
        score,
        error: 'Suspicious activity detected',
      }
    }

    return {
      success: true,
      score,
    }
  } catch (error) {
    console.error('reCAPTCHA verification error:', error)
    // In case of network errors, allow the request (fail open)
    // In production, you might want to fail closed for critical actions
    return {
      success: true,
      error: 'Verification service unavailable',
    }
  }
}

/**
 * Check if reCAPTCHA is enabled in the current environment
 */
export function isRecaptchaEnabled(): boolean {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY
  return !!(siteKey && !siteKey.startsWith('6LeXXXX'))
}
