import fs from 'fs';
import path from 'path';

interface ApiKey {
  id: string;
  key: string;
  name: string;
  email: string;
  created: string;
  lastUsed?: string;
  requestCount: number;
  rateLimit: number;
  isActive: boolean;
}

const API_KEYS_FILE = path.join(process.cwd(), 'data/api-keys.json');

// Rate limiting storage (in-memory for demo)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

export function loadApiKeys(): ApiKey[] {
  try {
    if (!fs.existsSync(API_KEYS_FILE)) {
      return [];
    }
    const data = fs.readFileSync(API_KEYS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

export function validateApiKey(apiKey: string): ApiKey | null {
  if (!apiKey || !apiKey.startsWith('soz_')) {
    return null;
  }

  const keys = loadApiKeys();
  const key = keys.find(k => k.key === apiKey && k.isActive);
  
  if (!key) {
    return null;
  }

  // Update last used timestamp and request count
  key.lastUsed = new Date().toISOString();
  key.requestCount++;
  
  // Save updated usage stats
  const keyIndex = keys.findIndex(k => k.key === apiKey);
  if (keyIndex !== -1) {
    keys[keyIndex] = key;
    try {
      fs.writeFileSync(API_KEYS_FILE, JSON.stringify(keys, null, 2));
    } catch (error) {
      console.error('Failed to update API key usage:', error);
    }
  }

  return key;
}

export function checkRateLimit(apiKey: string, limit: number = 100, windowMs: number = 60000): boolean {
  const now = Date.now();
  const keyLimit = rateLimitStore.get(apiKey);

  if (!keyLimit || now > keyLimit.resetTime) {
    rateLimitStore.set(apiKey, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (keyLimit.count >= limit) {
    return false;
  }

  keyLimit.count++;
  return true;
}

export function getRateLimitStatus(apiKey: string): { remaining: number; resetTime: number } {
  const keyLimit = rateLimitStore.get(apiKey);
  const now = Date.now();

  if (!keyLimit || now > keyLimit.resetTime) {
    return { remaining: 99, resetTime: now + 60000 };
  }

  return {
    remaining: Math.max(0, 100 - keyLimit.count),
    resetTime: keyLimit.resetTime
  };
}

export function authenticateRequest(req: any): { isAuthenticated: boolean; apiKey?: ApiKey; error?: string } {
  // Check for API key in headers
  const authHeader = req.headers.authorization;
  const apiKeyHeader = req.headers['x-api-key'];
  
  let apiKeyString: string | null = null;
  
  if (authHeader && authHeader.startsWith('Bearer ')) {
    apiKeyString = authHeader.substring(7);
  } else if (apiKeyHeader) {
    apiKeyString = apiKeyHeader;
  }

  // If no API key provided, allow anonymous access with default rate limits
  if (!apiKeyString) {
    return { isAuthenticated: false };
  }

  // Validate API key
  const apiKey = validateApiKey(apiKeyString);
  if (!apiKey) {
    return { 
      isAuthenticated: false, 
      error: 'Invalid API key' 
    };
  }

  // Check rate limit
  if (!checkRateLimit(apiKeyString, apiKey.rateLimit)) {
    return { 
      isAuthenticated: false, 
      error: 'Rate limit exceeded' 
    };
  }

  return { isAuthenticated: true, apiKey };
}

export function addRateLimitHeaders(res: any, apiKey?: ApiKey) {
  if (apiKey) {
    const status = getRateLimitStatus(apiKey.key);
    res.setHeader('X-RateLimit-Limit', apiKey.rateLimit.toString());
    res.setHeader('X-RateLimit-Remaining', status.remaining.toString());
    res.setHeader('X-RateLimit-Reset', Math.ceil(status.resetTime / 1000).toString());
  } else {
    // Default anonymous limits
    res.setHeader('X-RateLimit-Limit', '100');
    res.setHeader('X-RateLimit-Window', '60s');
  }
}