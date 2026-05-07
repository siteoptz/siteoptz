import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { page = 1, limit = 50, category, search } = req.query;
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
        tool.overview?.description?.toLowerCase().includes(searchTerm) ||
        tool.features?.some((feature: string) => 
          feature.toLowerCase().includes(searchTerm)
        )
      );
    }
    
    // Calculate pagination
    const startIndex = (pageNum - 1) * limitNum;
    const endIndex = startIndex + limitNum;
    const paginatedTools = filteredTools.slice(startIndex, endIndex);
    
    // Return paginated data
    res.status(200).json({
      tools: paginatedTools,
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
    console.error('Tools API error:', error);
    res.status(500).json({ error: 'Failed to load tools data' });
  }
}