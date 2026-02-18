// Example: How to retrieve qualifying data in API routes

import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../api/auth/[...nextauth]';
import { retrieveQualifyingData } from '../../lib/signup-bridge';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Get user session
    const session = await getServerSession(req, res, authOptions);
    
    if (!session?.user?.email) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const userEmail = session.user.email;

    // Method 1: Get from API bridge
    console.log('🔍 Retrieving qualifying data for:', userEmail);
    let qualifyingData = retrieveQualifyingData(userEmail);

    // Method 2: Check cookies as fallback
    if (!qualifyingData && req.headers.cookie) {
      try {
        const cookies = req.headers.cookie;
        const cookieObj: Record<string, string> = {};
        
        cookies.split(';').forEach(cookie => {
          const [name, value] = cookie.trim().split('=');
          if (name && value) {
            cookieObj[name] = decodeURIComponent(value);
          }
        });

        if (cookieObj.signup_data) {
          qualifyingData = JSON.parse(cookieObj.signup_data);
          console.log('✅ Retrieved from cookies:', qualifyingData);
        }
      } catch (error) {
        console.error('❌ Cookie parsing error:', error);
      }
    }

    // Method 3: Check URL parameters from request
    if (!qualifyingData && req.query.qualifying) {
      try {
        const encodedData = req.query.qualifying as string;
        const decodedData = JSON.parse(decodeURIComponent(encodedData));
        qualifyingData = {
          business: decodedData.b,
          bottlenecks: decodedData.bt,
          currentAIUsage: decodedData.ai,
          priorityOutcome: decodedData.po
        };
        console.log('✅ Retrieved from URL params:', qualifyingData);
      } catch (error) {
        console.error('❌ URL parsing error:', error);
      }
    }

    if (qualifyingData) {
      // Use the data for whatever you need
      console.log('📋 Processing qualifying data:', qualifyingData);
      
      // Example: Send to GHL, save to database, trigger workflows, etc.
      
      res.status(200).json({ 
        success: true, 
        data: qualifyingData,
        message: 'Qualifying data retrieved successfully'
      });
    } else {
      res.status(404).json({ 
        success: false, 
        message: 'No qualifying data found for user'
      });
    }

  } catch (error) {
    console.error('❌ API error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Example: Direct function call from other API routes
export async function getQualifyingDataForUser(email: string, req?: NextApiRequest) {
  console.log('🔍 Getting qualifying data for:', email);
  
  // Try API bridge first
  let data = retrieveQualifyingData(email);
  if (data) {
    console.log('✅ Found in API bridge');
    return data;
  }
  
  // Try cookies if request available
  if (req && req.headers.cookie) {
    try {
      const cookies = req.headers.cookie;
      const cookieObj: Record<string, string> = {};
      
      cookies.split(';').forEach(cookie => {
        const [name, value] = cookie.trim().split('=');
        if (name && value) {
          cookieObj[name] = decodeURIComponent(value);
        }
      });

      if (cookieObj.signup_data) {
        data = JSON.parse(cookieObj.signup_data);
        console.log('✅ Found in cookies');
        return data;
      }
    } catch (error) {
      console.error('❌ Cookie error:', error);
    }
  }
  
  console.log('❌ No qualifying data found');
  return null;
}