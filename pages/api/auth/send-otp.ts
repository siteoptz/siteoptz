import { NextApiRequest, NextApiResponse } from 'next';

interface OTPResponse {
  success: boolean;
  message: string;
  error?: string;
}

// Simple in-memory store for development (in production, use Redis or database)
const otpStore = new Map<string, { code: string; expires: number; attempts: number }>();

// Generate a 6-digit code
function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export default async function handler(
  req: NextApiRequest, 
  res: NextApiResponse<OTPResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ success: false, message: 'Email is required' });
  }

  try {
    // Generate OTP
    const code = generateOTP();
    const expires = Date.now() + 10 * 60 * 1000; // 10 minutes
    
    // Store OTP
    otpStore.set(email, { code, expires, attempts: 0 });
    
    console.log(`🔑 Generated OTP for ${email}: ${code} (expires in 10 minutes)`);
    console.log(`🔑 In development, the OTP code is: ${code}`);
    
    // In production, you would send this via email
    // For now, just log it and return success
    
    res.status(200).json({ 
      success: true, 
      message: `One-time code sent to ${email}. Check the server console for the code (development mode).`
    });
    
  } catch (error) {
    console.error('❌ Error sending OTP:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to send one-time code. Please try again.' 
    });
  }
}

// Export the OTP store for verification (development only)
export { otpStore };