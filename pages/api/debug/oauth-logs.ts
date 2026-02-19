import { NextApiRequest, NextApiResponse } from 'next';

// Simple in-memory log store for debugging OAuth callbacks
const oauthLogs: string[] = [];
const maxLogs = 100; // Keep last 100 log entries

// Function to add log entry (will be called by NextAuth)
export function addOAuthLog(message: string) {
  const timestamp = new Date().toISOString();
  const logEntry = `[${timestamp}] ${message}`;
  oauthLogs.unshift(logEntry); // Add to beginning
  
  // Keep only last maxLogs entries
  if (oauthLogs.length > maxLogs) {
    oauthLogs.splice(maxLogs);
  }
  
  console.log(logEntry); // Also log to console
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    return res.status(200).json({
      success: true,
      logs: oauthLogs,
      totalLogs: oauthLogs.length,
      timestamp: new Date().toISOString()
    });
  }
  
  if (req.method === 'DELETE') {
    oauthLogs.length = 0; // Clear all logs
    return res.status(200).json({
      success: true,
      message: 'All OAuth logs cleared'
    });
  }
  
  return res.status(405).json({ error: 'Method not allowed' });
}