import { NextApiRequest, NextApiResponse } from 'next';

interface BusinessInfo {
  aiToolsInterest: string;
  businessSize: string;
  planName: string;
  timestamp: number;
}

interface ApiResponse {
  success: boolean;
  data?: BusinessInfo;
  error?: string;
}

// In-memory store for business info (in production, use Redis or database)
const businessInfoStore = new Map<string, BusinessInfo>();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  if (req.method === 'POST' && req.body.action === 'store') {
    // Store business information
    try {
      const { email, businessInfo } = req.body;
      
      if (!email || !businessInfo) {
        return res.status(400).json({
          success: false,
          error: 'Email and business info are required'
        });
      }
      
      // Store with 10 minute expiration
      const expirationTime = Date.now() + (10 * 60 * 1000);
      businessInfoStore.set(email, {
        ...businessInfo,
        timestamp: expirationTime
      });
      
      console.log('Stored business info for OAuth user:', email);
      
      return res.status(200).json({
        success: true
      });
    } catch (error) {
      console.error('Error storing business info:', error);
      return res.status(500).json({
        success: false,
        error: 'Failed to store business info'
      });
    }
  }
  
  if (req.method === 'GET') {
    // Retrieve business information
    try {
      const { email } = req.query;
      
      if (!email || typeof email !== 'string') {
        return res.status(400).json({
          success: false,
          error: 'Email is required'
        });
      }
      
      const businessInfo = businessInfoStore.get(email);
      
      if (!businessInfo) {
        return res.status(404).json({
          success: false,
          error: 'No business info found for this email'
        });
      }
      
      // Check if expired
      if (Date.now() > businessInfo.timestamp) {
        businessInfoStore.delete(email);
        return res.status(404).json({
          success: false,
          error: 'Business info expired'
        });
      }
      
      // Remove from store after retrieval (one-time use)
      businessInfoStore.delete(email);
      
      console.log('Retrieved business info for OAuth user:', email);
      
      return res.status(200).json({
        success: true,
        data: businessInfo
      });
    } catch (error) {
      console.error('Error retrieving business info:', error);
      return res.status(500).json({
        success: false,
        error: 'Failed to retrieve business info'
      });
    }
  }
  
  return res.status(405).json({
    success: false,
    error: 'Method not allowed'
  });
}