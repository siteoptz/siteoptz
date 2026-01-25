/**
 * Rate limiting for kids' AI features
 * Prevents abuse and manages API costs
 */

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

// Rate limits by feature type
const RATE_LIMITS = {
  'image-generation': { max: 10, window: 3600000 }, // 10 per hour
  'text-enhancement': { max: 20, window: 3600000 }, // 20 per hour
  'code-execution': { max: 50, window: 3600000 }, // 50 per hour
};

export function checkRateLimit(
  userId: string,
  feature: keyof typeof RATE_LIMITS
): { allowed: boolean; remaining?: number; resetAt?: Date } {
  const limit = RATE_LIMITS[feature];
  if (!limit) {
    return { allowed: true };
  }

  const key = `${userId}:${feature}`;
  const now = Date.now();
  const entry = rateLimitStore.get(key);

  if (!entry || now > entry.resetTime) {
    // Reset or create new entry
    rateLimitStore.set(key, {
      count: 1,
      resetTime: now + limit.window
    });
    return {
      allowed: true,
      remaining: limit.max - 1,
      resetAt: new Date(now + limit.window)
    };
  }

  if (entry.count >= limit.max) {
    return {
      allowed: false,
      remaining: 0,
      resetAt: new Date(entry.resetTime)
    };
  }

  entry.count++;
  rateLimitStore.set(key, entry);

  return {
    allowed: true,
    remaining: limit.max - entry.count,
    resetAt: new Date(entry.resetTime)
  };
}

// Clean up old entries periodically
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of rateLimitStore.entries()) {
    if (now > entry.resetTime) {
      rateLimitStore.delete(key);
    }
  }
}, 60000); // Clean up every minute