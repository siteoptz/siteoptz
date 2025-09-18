import { NextApiRequest, NextApiResponse } from 'next';
import { otpStore } from './send-otp';

interface VerifyOTPResponse {
  success: boolean;
  message: string;
  user?: {
    id: string;
    email: string;
    name: string;
  };
  error?: string;
}

export default async function handler(
  req: NextApiRequest, 
  res: NextApiResponse<VerifyOTPResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const { email, code } = req.body;

  if (!email || !code) {
    return res.status(400).json({ success: false, message: 'Email and code are required' });
  }

  try {
    const storedOTP = otpStore.get(email);
    
    if (!storedOTP) {
      return res.status(400).json({ 
        success: false, 
        message: 'No code found for this email. Please request a new one.' 
      });
    }

    // Check if code has expired
    if (Date.now() > storedOTP.expires) {
      otpStore.delete(email);
      return res.status(400).json({ 
        success: false, 
        message: 'Code has expired. Please request a new one.' 
      });
    }

    // Check if too many attempts
    if (storedOTP.attempts >= 3) {
      otpStore.delete(email);
      return res.status(400).json({ 
        success: false, 
        message: 'Too many failed attempts. Please request a new code.' 
      });
    }

    // Verify the code
    if (storedOTP.code !== code.toString()) {
      storedOTP.attempts++;
      return res.status(400).json({ 
        success: false, 
        message: `Invalid code. ${3 - storedOTP.attempts} attempts remaining.` 
      });
    }

    // Code is valid - clean up and create user session
    otpStore.delete(email);
    
    console.log(`✅ OTP verified successfully for ${email}`);
    
    // Extract name from email for fallback
    const emailLocal = email.split('@')[0];
    let userName = 'User';
    if (emailLocal.includes('.')) {
      const parts = emailLocal.split('.');
      userName = parts.map((part: string) => 
        part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()
      ).join(' ');
    } else if (emailLocal.includes('_')) {
      const parts = emailLocal.split('_');
      userName = parts.map((part: string) => 
        part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()
      ).join(' ');
    } else {
      userName = emailLocal.charAt(0).toUpperCase() + emailLocal.slice(1).toLowerCase();
    }

    const user = {
      id: email,
      email: email,
      name: userName
    };
    
    res.status(200).json({ 
      success: true, 
      message: 'Code verified successfully',
      user: user
    });
    
  } catch (error) {
    console.error('❌ Error verifying OTP:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to verify code. Please try again.' 
    });
  }
}