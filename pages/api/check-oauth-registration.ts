import { NextApiRequest, NextApiResponse } from 'next';

interface RegistrationData {
  isRegistrationAttempt: boolean;
  aiToolsInterest: string;
  businessSize: string;
  planName: string;
  timestamp: number;
}

interface ApiResponse {
  success: boolean;
  isRegistrationAttempt: boolean;
  data?: RegistrationData;
  error?: string;
}

// In-memory store for pending OAuth registrations (in production, use Redis or database)
const pendingRegistrations = new Map<string, RegistrationData>();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  if (req.method === 'POST' && req.body.action === 'store') {
    // Store registration attempt
    try {
      const { email, registrationData } = req.body;
      
      if (!email || !registrationData) {
        return res.status(400).json({
          success: false,
          isRegistrationAttempt: false,
          error: 'Email and registration data are required'
        });
      }
      
      // Store with 10 minute expiration
      const expirationTime = Date.now() + (10 * 60 * 1000);
      pendingRegistrations.set(email, {
        ...registrationData,
        timestamp: expirationTime
      });
      
      console.log('Stored OAuth registration attempt for:', email);
      
      return res.status(200).json({
        success: true,
        isRegistrationAttempt: true
      });
    } catch (error) {
      console.error('Error storing OAuth registration attempt:', error);
      return res.status(500).json({
        success: false,
        isRegistrationAttempt: false,
        error: 'Failed to store registration attempt'
      });
    }
  }
  
  if (req.method === 'GET') {
    // Check for pending registration attempt
    try {
      const { email } = req.query;
      
      if (!email || typeof email !== 'string') {
        return res.status(400).json({
          success: false,
          isRegistrationAttempt: false,
          error: 'Email is required'
        });
      }
      
      const registrationData = pendingRegistrations.get(email);
      
      if (!registrationData) {
        return res.status(200).json({
          success: true,
          isRegistrationAttempt: false
        });
      }
      
      // Check if expired
      if (Date.now() > registrationData.timestamp) {
        pendingRegistrations.delete(email);
        return res.status(200).json({
          success: true,
          isRegistrationAttempt: false
        });
      }
      
      // Remove from store after retrieval (one-time use)
      pendingRegistrations.delete(email);
      
      console.log('Retrieved OAuth registration attempt for:', email);
      
      return res.status(200).json({
        success: true,
        isRegistrationAttempt: true,
        data: registrationData
      });
    } catch (error) {
      console.error('Error checking OAuth registration attempt:', error);
      return res.status(500).json({
        success: false,
        isRegistrationAttempt: false,
        error: 'Failed to check registration attempt'
      });
    }
  }
  
  return res.status(405).json({
    success: false,
    isRegistrationAttempt: false,
    error: 'Method not allowed'
  });
}