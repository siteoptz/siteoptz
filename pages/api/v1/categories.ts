import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import Cors from 'cors';

// Initialize CORS middleware
const cors = Cors({
  methods: ['GET', 'HEAD'],
  origin: '*',
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

/**
 * Public API v1: Get Tool Categories
 * 
 * @route GET /api/v1/categories
 * @param {boolean} include_count - Include tool count for each category
 * 
 * @example
 * GET /api/v1/categories
 * GET /api/v1/categories?include_count=true
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

  try {
    // Load tools data
    const dataPath = path.join(process.cwd(), 'public/data/aiToolsData.json');
    const toolsData = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

    // Extract categories
    const categoryMap = new Map<string, number>();
    
    toolsData.forEach((tool: any) => {
      const category = tool.overview?.category;
      if (category) {
        categoryMap.set(category, (categoryMap.get(category) || 0) + 1);
      }
    });

    // Format response
    const includeCount = req.query.include_count === 'true';
    
    let categories;
    if (includeCount) {
      categories = Array.from(categoryMap.entries()).map(([name, count]) => ({
        name,
        slug: name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-'),
        count,
        url: `/api/v1/tools?category=${encodeURIComponent(name)}`
      }));
    } else {
      categories = Array.from(categoryMap.keys()).map(name => ({
        name,
        slug: name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-'),
        url: `/api/v1/tools?category=${encodeURIComponent(name)}`
      }));
    }

    // Sort by name
    categories.sort((a, b) => a.name.localeCompare(b.name));

    const response = {
      success: true,
      data: categories,
      meta: {
        total: categories.length
      },
      links: {
        self: '/api/v1/categories',
        tools: '/api/v1/tools'
      }
    };

    // Set cache headers
    res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=3600');
    
    return res.status(200).json(response);

  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ 
      success: false,
      error: 'Internal Server Error',
      message: 'An error occurred while fetching categories'
    });
  }
}