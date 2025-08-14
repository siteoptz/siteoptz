// Rate limiting utilities for API endpoints

interface RateLimitConfig {
  windowMs: number;    // Time window in milliseconds
  maxRequests: number; // Maximum requests per window
  skipSuccessfulRequests?: boolean;
  skipFailedRequests?: boolean;
}

interface RateLimitResult {
  success: boolean;
  remaining: number;
  resetTime: number;
  totalRequests: number;
}

// In-memory rate limiter (use Redis in production)
class MemoryRateLimiter {
  private store = new Map<string, { count: number; resetTime: number }>();
  
  constructor(private config: RateLimitConfig) {}
  
  check(key: string): RateLimitResult {
    const now = Date.now();
    const current = this.store.get(key);
    
    // Initialize or reset if window expired
    if (!current || now > current.resetTime) {
      const resetTime = now + this.config.windowMs;
      this.store.set(key, { count: 1, resetTime });
      
      return {
        success: true,
        remaining: this.config.maxRequests - 1,
        resetTime,
        totalRequests: 1
      };
    }
    
    // Check if limit exceeded
    if (current.count >= this.config.maxRequests) {
      return {
        success: false,
        remaining: 0,
        resetTime: current.resetTime,
        totalRequests: current.count
      };
    }
    
    // Increment counter
    current.count++;
    
    return {
      success: true,
      remaining: this.config.maxRequests - current.count,
      resetTime: current.resetTime,
      totalRequests: current.count
    };
  }
  
  reset(key: string): void {
    this.store.delete(key);
  }
  
  // Clean up expired entries
  cleanup(): void {
    const now = Date.now();
    for (const [key, value] of this.store.entries()) {
      if (now > value.resetTime) {
        this.store.delete(key);
      }
    }
  }
}

// Redis rate limiter (for production use)
class RedisRateLimiter {
  private redis: any; // Redis client
  
  constructor(private config: RateLimitConfig, redisClient: any) {
    this.redis = redisClient;
  }
  
  async check(key: string): Promise<RateLimitResult> {
    const now = Date.now();
    const windowStart = now - this.config.windowMs;
    
    // Use Redis sorted set to track requests in time window
    const pipeline = this.redis.pipeline();
    
    // Remove old entries
    pipeline.zremrangebyscore(key, 0, windowStart);
    
    // Count current requests
    pipeline.zcard(key);
    
    // Add current request
    pipeline.zadd(key, now, `${now}-${Math.random()}`);
    
    // Set expiration
    pipeline.expire(key, Math.ceil(this.config.windowMs / 1000));
    
    const results = await pipeline.exec();
    const currentCount = results[1][1]; // Count after removing old entries
    
    const remaining = Math.max(0, this.config.maxRequests - currentCount - 1);
    const resetTime = now + this.config.windowMs;
    
    return {
      success: currentCount < this.config.maxRequests,
      remaining,
      resetTime,
      totalRequests: currentCount + 1
    };
  }
  
  async reset(key: string): Promise<void> {
    await this.redis.del(key);
  }
}

// Rate limiter factory
export class RateLimiter {
  private limiter: MemoryRateLimiter | RedisRateLimiter;
  
  constructor(config: RateLimitConfig, redisClient?: any) {
    if (redisClient) {
      this.limiter = new RedisRateLimiter(config, redisClient);
    } else {
      this.limiter = new MemoryRateLimiter(config);
      
      // Cleanup expired entries every 5 minutes for memory limiter
      if (this.limiter instanceof MemoryRateLimiter) {
        setInterval(() => {
          this.limiter.cleanup();
        }, 5 * 60 * 1000);
      }
    }
  }
  
  async check(identifier: string): Promise<RateLimitResult> {
    if (this.limiter instanceof RedisRateLimiter) {
      return await this.limiter.check(identifier);
    } else {
      return this.limiter.check(identifier);
    }
  }
  
  async reset(identifier: string): Promise<void> {
    if (this.limiter instanceof RedisRateLimiter) {
      await this.limiter.reset(identifier);
    } else {
      this.limiter.reset(identifier);
    }
  }
}

// Predefined rate limit configurations
export const rateLimitConfigs = {
  // Email subscription: 5 requests per 15 minutes
  emailSubscription: {
    windowMs: 15 * 60 * 1000,
    maxRequests: 5
  },
  
  // API general: 100 requests per hour
  api: {
    windowMs: 60 * 60 * 1000,
    maxRequests: 100
  },
  
  // Contact form: 3 requests per 10 minutes
  contactForm: {
    windowMs: 10 * 60 * 1000,
    maxRequests: 3
  },
  
  // Tool data API: 1000 requests per hour
  toolData: {
    windowMs: 60 * 60 * 1000,
    maxRequests: 1000
  }
};

// Utility to get client IP from request
export function getClientIP(req: any): string {
  return (
    (req.headers['x-forwarded-for'] as string)?.split(',')[0] ||
    (req.headers['x-real-ip'] as string) ||
    req.socket?.remoteAddress ||
    req.connection?.remoteAddress ||
    'unknown'
  );
}

// Create rate limiter instances
export const emailSubscriptionLimiter = new RateLimiter(rateLimitConfigs.emailSubscription);
export const apiLimiter = new RateLimiter(rateLimitConfigs.api);
export const contactFormLimiter = new RateLimiter(rateLimitConfigs.contactForm);
export const toolDataLimiter = new RateLimiter(rateLimitConfigs.toolData);