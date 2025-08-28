import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import Cors from 'cors';

// Initialize CORS middleware
const cors = Cors({
  methods: ['POST', 'HEAD'],
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
 * Public API v1: Compare AI Tools
 * 
 * @route POST /api/v1/tools/compare
 * @body {string[]} slugs - Array of tool slugs to compare (2-5 tools)
 * @body {string[]} fields - Optional fields to include in comparison
 * 
 * @example
 * POST /api/v1/tools/compare
 * Body: { "slugs": ["chatgpt", "claude", "gemini"] }
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Run CORS middleware
  await runMiddleware(req, res, cors);

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      error: 'Method Not Allowed',
      message: 'Only POST requests are allowed'
    });
  }

  try {
    const { slugs, fields } = req.body;
    
    // Validate slugs
    if (!slugs || !Array.isArray(slugs)) {
      return res.status(400).json({
        success: false,
        error: 'Bad Request',
        message: 'slugs array is required'
      });
    }

    if (slugs.length < 2) {
      return res.status(400).json({
        success: false,
        error: 'Bad Request',
        message: 'At least 2 tools are required for comparison'
      });
    }

    if (slugs.length > 5) {
      return res.status(400).json({
        success: false,
        error: 'Bad Request',
        message: 'Maximum 5 tools can be compared at once'
      });
    }

    // Load tools data
    const dataPath = path.join(process.cwd(), 'public/data/aiToolsData.json');
    const toolsData = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

    // Find tools by slugs
    const tools = slugs.map(slug => {
      const tool = toolsData.find((t: any) => t.slug === slug);
      if (!tool) {
        throw new Error(`Tool with slug '${slug}' not found`);
      }
      return tool;
    });

    // Prepare comparison data
    const comparisonData: any = {
      tools: [],
      features: {},
      pricing: {},
      ratings: {},
      categories: [],
      tags: new Set()
    };

    // Process each tool
    tools.forEach(tool => {
      // Basic info
      const toolInfo: any = {
        slug: tool.slug,
        name: tool.name,
        logo: tool.logo,
        website: tool.overview?.website || tool.affiliate_link,
        description: tool.overview?.description
      };

      // Filter fields if specified
      if (fields && Array.isArray(fields)) {
        const filtered: any = {};
        fields.forEach(field => {
          if (field in tool) {
            filtered[field] = tool[field];
          }
        });
        toolInfo.data = filtered;
      } else {
        toolInfo.data = tool;
      }

      comparisonData.tools.push(toolInfo);

      // Collect features
      if (tool.features?.main) {
        comparisonData.features[tool.slug] = tool.features.main;
      }

      // Collect pricing
      if (tool.pricing) {
        comparisonData.pricing[tool.slug] = tool.pricing.map((p: any) => ({
          plan: p.plan_name,
          price: p.price_per_month,
          billing: p.billing_options,
          features: p.features?.slice(0, 5) // Top 5 features
        }));
      }

      // Collect ratings
      if (tool.schema?.aggregateRating) {
        comparisonData.ratings[tool.slug] = {
          rating: tool.schema.aggregateRating.ratingValue,
          reviewCount: tool.schema.aggregateRating.reviewCount
        };
      }

      // Collect categories
      if (tool.overview?.category) {
        if (!comparisonData.categories.includes(tool.overview.category)) {
          comparisonData.categories.push(tool.overview.category);
        }
      }

      // Collect tags
      if (tool.tags) {
        tool.tags.forEach((tag: string) => comparisonData.tags.add(tag));
      }
    });

    // Convert Set to Array for tags
    comparisonData.tags = Array.from(comparisonData.tags);

    // Build comparison matrix
    const matrix: any = {
      pricing: [],
      features: [],
      ratings: []
    };

    // Create pricing matrix
    const allPlans = new Set<string>();
    Object.values(comparisonData.pricing).forEach((plans: any) => {
      plans.forEach((plan: any) => allPlans.add(plan.plan));
    });

    allPlans.forEach(planName => {
      const row: any = { plan: planName };
      slugs.forEach(slug => {
        const toolPlans = comparisonData.pricing[slug] || [];
        const plan = toolPlans.find((p: any) => p.plan === planName);
        row[slug] = plan ? `$${plan.price}/mo` : 'N/A';
      });
      matrix.pricing.push(row);
    });

    // Create features matrix
    const allFeatures = new Set<string>();
    Object.values(comparisonData.features).forEach((features: any) => {
      features.forEach((feature: string) => allFeatures.add(feature));
    });

    allFeatures.forEach(feature => {
      const row: any = { feature };
      slugs.forEach(slug => {
        const toolFeatures = comparisonData.features[slug] || [];
        row[slug] = toolFeatures.includes(feature);
      });
      matrix.features.push(row);
    });

    // Build response
    const response = {
      success: true,
      data: {
        tools: comparisonData.tools,
        comparison: {
          features: comparisonData.features,
          pricing: comparisonData.pricing,
          ratings: comparisonData.ratings
        },
        matrix,
        metadata: {
          categories: comparisonData.categories,
          tags: comparisonData.tags,
          toolCount: tools.length
        }
      },
      links: {
        self: '/api/v1/tools/compare',
        tools: slugs.map(slug => `/api/v1/tools/${slug}`),
        comparison_page: `https://siteoptz.ai/compare?tools=${slugs.join(',')}`
      }
    };

    // Set cache headers
    res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=3600');
    
    return res.status(200).json(response);

  } catch (error: any) {
    console.error('API Error:', error);
    
    if (error.message.includes('not found')) {
      return res.status(404).json({ 
        success: false,
        error: 'Not Found',
        message: error.message
      });
    }
    
    return res.status(500).json({ 
      success: false,
      error: 'Internal Server Error',
      message: 'An error occurred while comparing tools'
    });
  }
}