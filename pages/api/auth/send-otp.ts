import { NextApiRequest, NextApiResponse } from 'next';
import { generateOTP, storeOTP } from '../../../lib/otp-service';

interface OTPResponse {
  success: boolean;
  message: string;
  error?: string;
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
    // Generate and store OTP
    const code = generateOTP();
    storeOTP(email, code);
    
    // In production, you would send this via email
    // For now, just log it and return success
    
    res.status(200).json({ 
      success: true, 
      message: `One-time code sent! In development mode, check your terminal/console where you're running 'npm run dev' to see the 6-digit code.`
    });
    
  } catch (error) {
    console.error('❌ Error sending OTP:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to send one-time code. Please try again.' 
    });
  }
}