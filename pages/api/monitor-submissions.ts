import { NextApiRequest, NextApiResponse } from 'next';

interface SubmissionLog {
  timestamp: string;
  endpoint: string;
  data: any;
  success: boolean;
  ghlResult?: any;
  error?: string;
}

// In-memory storage for recent submissions (use Redis in production)
let recentSubmissions: SubmissionLog[] = [];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // Return recent submissions
    return res.status(200).json({
      submissions: recentSubmissions.slice(-10), // Last 10 submissions
      total: recentSubmissions.length
    });
  }
  
  if (req.method === 'POST') {
    // Log a new submission
    const submission: SubmissionLog = {
      timestamp: new Date().toISOString(),
      endpoint: req.body.endpoint || 'unknown',
      data: req.body.data || {},
      success: req.body.success || false,
      ghlResult: req.body.ghlResult,
      error: req.body.error
    };
    
    recentSubmissions.push(submission);
    
    // Keep only last 50 submissions
    if (recentSubmissions.length > 50) {
      recentSubmissions = recentSubmissions.slice(-50);
    }
    
    return res.status(200).json({ logged: true });
  }
  
  if (req.method === 'DELETE') {
    // Clear logs
    recentSubmissions = [];
    return res.status(200).json({ cleared: true });
  }
  
  return res.status(405).json({ error: 'Method not allowed' });
}