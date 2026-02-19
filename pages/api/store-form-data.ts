import { NextApiRequest, NextApiResponse } from 'next';

interface FormData {
  email: string;
  name: string;
  phone?: string;
  business?: string;
  bottlenecks: string;
  currentAIUsage: string;
  priorityOutcome: string;
  timestamp: number;
}

// In-memory store for temporary form data (in production, use Redis or database)
const formDataStore = new Map<string, FormData>();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const formData: FormData = req.body;
      
      if (!formData.email || !formData.name) {
        return res.status(400).json({ error: 'Email and name are required' });
      }

      console.log('📦 Storing form data for OAuth flow:', formData.email);
      
      // Create a unique key for this user's form data
      const key = `form_${formData.email}_${Date.now()}`;
      
      // Store with timestamp for cleanup
      const dataWithTimestamp = {
        ...formData,
        timestamp: Date.now()
      };
      
      formDataStore.set(key, dataWithTimestamp);
      
      // Auto-cleanup after 1 hour
      setTimeout(() => {
        formDataStore.delete(key);
        console.log('🗑️ Auto-cleaned form data:', key);
      }, 60 * 60 * 1000);
      
      console.log('✅ Form data stored successfully:', key);
      
      return res.status(200).json({
        success: true,
        key: key,
        message: 'Form data stored for OAuth flow'
      });
      
    } catch (error) {
      console.error('❌ Error storing form data:', error);
      return res.status(500).json({ error: 'Failed to store form data' });
    }
  }
  
  if (req.method === 'GET') {
    try {
      const { email } = req.query;
      
      if (!email || typeof email !== 'string') {
        return res.status(400).json({ error: 'Email parameter is required' });
      }

      console.log('🔍 Retrieving form data for:', email);
      
      // Find the most recent form data for this email
      let mostRecentData = null;
      let mostRecentKey = null;
      let mostRecentTimestamp = 0;
      
      for (const [key, data] of formDataStore.entries()) {
        if (data.email === email && data.timestamp > mostRecentTimestamp) {
          mostRecentData = data;
          mostRecentKey = key;
          mostRecentTimestamp = data.timestamp;
        }
      }
      
      if (mostRecentData) {
        // Clean up the retrieved data
        if (mostRecentKey) {
          formDataStore.delete(mostRecentKey);
        }
        
        console.log('✅ Retrieved form data for:', email);
        return res.status(200).json({
          success: true,
          data: mostRecentData
        });
      } else {
        console.log('ℹ️ No form data found for:', email);
        return res.status(404).json({
          success: false,
          message: 'No form data found'
        });
      }
      
    } catch (error) {
      console.error('❌ Error retrieving form data:', error);
      return res.status(500).json({ error: 'Failed to retrieve form data' });
    }
  }
  
  return res.status(405).json({ error: 'Method not allowed' });
}