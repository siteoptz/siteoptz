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
 * Public API v1: Get Single AI Tool by Slug
 * 
 * @route GET /api/v1/tools/{slug}
 * @param {string} slug - Tool slug identifier
 * @param {string} fields - Optional comma-separated fields to include
 * 
 * @example
 * GET /api/v1/tools/chatgpt
 * GET /api/v1/tools/claude?fields=name,pricing,features
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
    const { slug, fields } = req.query;
    
    // Validate slug
    if (!slug || typeof slug !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'Bad Request',
        message: 'Tool slug is required'
      });
    }

    // Load tools data
    const dataPath = path.join(process.cwd(), 'public/data/aiToolsData.json');
    const toolsData = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

    // Find tool by slug
    const tool = toolsData.find((t: any) => t.slug === slug);

    if (!tool) {
      return res.status(404).json({
        success: false,
        error: 'Not Found',
        message: `Tool with slug '${slug}' not found`
      });
    }

    // Filter fields if specified
    let responseTool = tool;
    if (fields && typeof fields === 'string') {
      const fieldList = fields.split(',').map(f => f.trim());
      const filtered: any = {};
      fieldList.forEach(field => {
        if (field in tool) {
          filtered[field] = tool[field];
        }
      });
      responseTool = filtered;
    }

    // Build response
    const response = {
      success: true,
      data: responseTool,
      links: {
        self: `/api/v1/tools/${slug}`,
        collection: '/api/v1/tools',
        website: tool.overview?.website || tool.affiliate_link,
        siteoptz_page: `https://siteoptz.ai/tools/${slug}`
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
      message: 'An error occurred while fetching tool data'
    });
  }
}