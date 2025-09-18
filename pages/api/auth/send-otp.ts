import { NextApiRequest, NextApiResponse } from 'next';
import { generateOTP, storeOTP, sendOTPEmail } from '../../../lib/otp-service';

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
    
    // Determine if we should send via email or show in console
    const isDevelopment = process.env.NODE_ENV === 'development';
    const emailProvider = process.env.EMAIL_PROVIDER;
    const shouldSendEmail = !isDevelopment || emailProvider === 'sendgrid' || emailProvider === 'smtp' || emailProvider === 'console';
    
    console.log('🔧 OTP Delivery Mode:', {
      isDevelopment,
      emailProvider,
      shouldSendEmail,
      nodeEnv: process.env.NODE_ENV
    });
    
    if (shouldSendEmail) {
      // Production mode: Send via email
      console.log('📧 Production mode: Sending OTP via email');
      const emailResult = await sendOTPEmail(email, code);
      
      if (emailResult.success) {
        res.status(200).json({ 
          success: true, 
          message: emailResult.message
        });
      } else {
        // Fallback to console if email fails
        console.log('📧 Email failed, falling back to console mode');
        res.status(200).json({ 
          success: true, 
          message: `One-time code generated. In development mode, check your terminal/console where you&apos;re running &apos;npm run dev&apos; to see the 6-digit code. (Email delivery failed: ${emailResult.error})`
        });
      }
    } else {
      // Development mode: Show in console
      console.log('🛠️ Development mode: OTP shown in console');
      res.status(200).json({ 
        success: true, 
        message: `One-time code sent! In development mode, check your terminal/console where you&apos;re running &apos;npm run dev&apos; to see the 6-digit code.`
      });
    }
    
  } catch (error) {
    console.error('❌ Error sending OTP:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to send one-time code. Please try again.' 
    });
  }
}