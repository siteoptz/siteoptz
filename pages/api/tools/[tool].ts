import { NextApiRequest, NextApiResponse } from 'next';
import toolData from '../../../data/tool_data.json';

export interface ToolData {
  slug: string;
  name: string;
  description: string;
  meta: {
    title: string;
    description: string;
  };
  schema: {
    "@context": string;
    "@type": string;
    name: string;
    applicationCategory: string;
    operatingSystem: string;
    offers?: {
      "@type": string;
      price: string;
      priceCurrency: string;
    };
    aggregateRating?: {
      "@type": string;
      ratingValue: string;
      reviewCount: string;
    };
  };
  features: string[];
  pros: string[];
  cons: string[];
  pricing: Array<{
    plan: string;
    price: string;
    details: string;
  }>;
  benchmarks: {
    speed_score?: number;
    accuracy_score?: number;
    cost_efficiency?: number;
    content_quality?: number;
    ease_of_use?: number;
    value_for_money?: number;
    seo_features?: number;
    team_collaboration?: number;
    customer_support?: number;
  };
  related_tools: string[];
  website_url?: string;
  logo?: string;
  category?: string;
  developer?: string;
  founded_year?: string;
  api_available?: boolean;
  integrations?: string[];
  use_cases?: Array<{
    title: string;
    description: string;
    ideal_for: string;
  }>;
  last_updated?: string;
  version?: string;
  platforms?: string[];
  languages?: string[];
  support?: {
    email?: boolean;
    chat?: boolean;
    phone?: boolean;
    documentation?: boolean;
    community?: boolean;
  };
}

export type ApiResponse = ToolData | { error: string; message?: string };

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ 
      error: 'Method not allowed',
      message: 'Only GET requests are allowed'
    });
  }

  const { tool } = req.query;
  
  // Validate tool parameter
  if (!tool || typeof tool !== 'string') {
    return res.status(400).json({ 
      error: 'Invalid request',
      message: 'Tool slug is required'
    });
  }
  
  // Sanitize the tool slug to prevent any injection attempts
  const sanitizedSlug = tool.toLowerCase().replace(/[^a-z0-9-]/g, '');
  
  if (sanitizedSlug !== tool) {
    return res.status(400).json({ 
      error: 'Invalid tool slug',
      message: 'Tool slug contains invalid characters'
    });
  }
  
  try {
    // Find the tool in the data
    const toolInfo = (toolData as ToolData[]).find(t => t.slug === sanitizedSlug);
    
    if (!toolInfo) {
      return res.status(404).json({ 
        error: 'Tool not found',
        message: `No tool found with slug: ${sanitizedSlug}`
      });
    }
    
    // Add cache headers for performance
    res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
    
    // Return the tool data
    res.status(200).json(toolInfo);
  } catch (error) {
    console.error('Error fetching tool data:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: 'An error occurred while fetching tool data'
    });
  }
}