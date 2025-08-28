import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import Cors from 'cors';
import { authenticateRequest, addRateLimitHeaders } from '../../../../utils/auth';

// Initialize CORS middleware
const cors = Cors({
  methods: ['GET', 'HEAD'],
  origin: '*', // Allow all origins for public API
  credentials: true,
});

// Helper method to wait for a middleware to execute before continuing
function runMiddleware(req: NextApiRequest, res: NextApiResponse, fn: Function) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

// Rate limiting map (simple in-memory implementation)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

// Simple rate limiting function
function checkRateLimit(ip: string, limit: number = 100, window: number = 60000): boolean {
  const now = Date.now();
  const userLimit = rateLimitMap.get(ip);

  if (!userLimit || now > userLimit.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + window });
    return true;
  }

  if (userLimit.count >= limit) {
    return false;
  }

  userLimit.count++;
  return true;
}

interface QueryParams {
  category?: string;
  search?: string;
  limit?: string;
  offset?: string;
  sort?: string;
  fields?: string;
}

/**
 * Public API v1: Get AI Tools
 * 
 * @route GET /api/v1/tools
 * @param {string} category - Filter by category
 * @param {string} search - Search in name and description
 * @param {number} limit - Number of results (default: 20, max: 100)
 * @param {number} offset - Pagination offset (default: 0)
 * @param {string} sort - Sort field (name, rating, price)
 * @param {string} fields - Comma-separated fields to include
 * 
 * @example
 * GET /api/v1/tools?category=seo&limit=10
 * GET /api/v1/tools?search=chatgpt&fields=name,slug,pricing
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Run CORS middleware
  await runMiddleware(req, res, cors);

  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ 
      error: 'Method Not Allowed',
      message: 'Only GET requests are allowed'
    });
  }

  // Authenticate request (optional for public API)
  const auth = authenticateRequest(req);
  
  // If authentication failed with error, return 401
  if (auth.error) {
    return res.status(401).json({ 
      error: 'Authentication Failed',
      message: auth.error
    });
  }

  // For anonymous users, apply default rate limiting
  if (!auth.isAuthenticated) {
    const clientIp = req.headers['x-forwarded-for'] || 
                     req.socket.remoteAddress || 
                     'unknown';
    
    if (!checkRateLimit(clientIp as string)) {
      return res.status(429).json({ 
        error: 'Too Many Requests',
        message: 'Rate limit exceeded. Please try again later.'
      });
    }
  }

  try {
    // Load tools data
    const dataPath = path.join(process.cwd(), 'public/data/aiToolsData.json');
    const toolsData = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

    // Parse query parameters
    const {
      category,
      search,
      limit = '20',
      offset = '0',
      sort = 'name',
      fields
    } = req.query as QueryParams;

    let filteredTools = [...toolsData];

    // Filter by category
    if (category) {
      filteredTools = filteredTools.filter(tool => 
        tool.overview?.category?.toLowerCase() === category.toLowerCase()
      );
    }

    // Search filter
    if (search) {
      const searchTerm = search.toLowerCase();
      filteredTools = filteredTools.filter(tool =>
        tool.name?.toLowerCase().includes(searchTerm) ||
        tool.overview?.description?.toLowerCase().includes(searchTerm) ||
        tool.tags?.some((tag: string) => tag.toLowerCase().includes(searchTerm))
      );
    }

    // Sorting
    filteredTools.sort((a, b) => {
      switch (sort) {
        case 'rating':
          const ratingA = a.schema?.aggregateRating?.ratingValue || 0;
          const ratingB = b.schema?.aggregateRating?.ratingValue || 0;
          return ratingB - ratingA;
        case 'price':
          const priceA = a.pricing?.[0]?.price_per_month || 0;
          const priceB = b.pricing?.[0]?.price_per_month || 0;
          return priceA - priceB;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    // Calculate pagination
    const limitNum = Math.min(parseInt(limit), 100);
    const offsetNum = parseInt(offset);
    const totalCount = filteredTools.length;
    const totalPages = Math.ceil(totalCount / limitNum);
    const currentPage = Math.floor(offsetNum / limitNum) + 1;

    // Apply pagination
    const paginatedTools = filteredTools.slice(offsetNum, offsetNum + limitNum);

    // Filter fields if specified
    let responseTools = paginatedTools;
    if (fields) {
      const fieldList = fields.split(',').map(f => f.trim());
      responseTools = paginatedTools.map(tool => {
        const filtered: any = {};
        fieldList.forEach(field => {
          if (field in tool) {
            filtered[field] = tool[field];
          }
        });
        return filtered;
      });
    }

    // Build response
    const response = {
      success: true,
      data: responseTools,
      meta: {
        total: totalCount,
        limit: limitNum,
        offset: offsetNum,
        page: currentPage,
        totalPages,
        hasMore: offsetNum + limitNum < totalCount
      },
      links: {
        self: `/api/v1/tools?limit=${limitNum}&offset=${offsetNum}`,
        first: `/api/v1/tools?limit=${limitNum}&offset=0`,
        last: `/api/v1/tools?limit=${limitNum}&offset=${Math.max(0, (totalPages - 1) * limitNum)}`,
        next: offsetNum + limitNum < totalCount 
          ? `/api/v1/tools?limit=${limitNum}&offset=${offsetNum + limitNum}`
          : null,
        prev: offsetNum > 0
          ? `/api/v1/tools?limit=${limitNum}&offset=${Math.max(0, offsetNum - limitNum)}`
          : null
      }
    };

    // Set cache headers
    res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=3600');
    
    // Add rate limit headers
    addRateLimitHeaders(res, auth.apiKey);
    
    return res.status(200).json(response);

  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ 
      success: false,
      error: 'Internal Server Error',
      message: 'An error occurred while fetching tools data'
    });
  }
}