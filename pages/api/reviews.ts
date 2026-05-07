import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { page = 1, limit = 30, category, search } = req.query;
    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    
    // Load the full dataset
    const dataPath = path.join(process.cwd(), 'public/data/aiToolsData.json');
    const rawData = fs.readFileSync(dataPath, 'utf8');
    const allTools = JSON.parse(rawData);
    
    // Apply filters
    let filteredTools = allTools;
    
    // Category filter
    if (category && category !== 'All') {
      filteredTools = filteredTools.filter((tool: any) => 
        tool.overview?.category === category
      );
    }
    
    // Search filter
    if (search) {
      const searchTerm = (search as string).toLowerCase();
      filteredTools = filteredTools.filter((tool: any) =>
        tool.name?.toLowerCase().includes(searchTerm) ||
        tool.overview?.description?.toLowerCase().includes(searchTerm)
      );
    }
    
    // Sort by rating (highest first)
    filteredTools.sort((a: any, b: any) => (b.rating || 0) - (a.rating || 0));
    
    // Calculate pagination
    const startIndex = (pageNum - 1) * limitNum;
    const endIndex = startIndex + limitNum;
    const paginatedTools = filteredTools.slice(startIndex, endIndex);
    
    // Return lightweight data for reviews page
    const reviewData = paginatedTools.map((tool: any) => ({
      name: tool.name,
      slug: tool.slug,
      description: tool.overview?.description || tool.description,
      category: tool.overview?.category,
      rating: tool.rating || 4.5,
      logo: tool.logo,
      pricing: tool.pricing?.[0]?.price_per_month || 0
    }));
    
    res.status(200).json({
      reviews: reviewData,
      pagination: {
        currentPage: pageNum,
        totalPages: Math.ceil(filteredTools.length / limitNum),
        totalItems: filteredTools.length,
        hasNextPage: endIndex < filteredTools.length,
        hasPrevPage: pageNum > 1
      },
      categories: [...new Set(allTools.map((tool: any) => tool.overview?.category).filter(Boolean))]
    });
    
  } catch (error) {
    console.error('Reviews API error:', error);
    res.status(500).json({ error: 'Failed to load reviews data' });
  }
}