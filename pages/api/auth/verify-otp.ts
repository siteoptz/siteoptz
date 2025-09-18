import { NextApiRequest, NextApiResponse } from 'next';
import { verifyOTP } from '../../../lib/otp-service';
import { getContactByEmail } from '../user/ghl-lookup';

interface VerifyOTPResponse {
  success: boolean;
  message: string;
  user?: {
    id: string;
    email: string;
    name: string;
    plan?: string;
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

  // Trim whitespace and normalize input to prevent common user errors
  const trimmedEmail = email.trim().toLowerCase();
  const trimmedCode = code.toString().trim();

  try {
    // Verify the OTP using the shared service
    const verificationResult = verifyOTP(trimmedEmail, trimmedCode);
    
    if (!verificationResult.success) {
      return res.status(400).json({
        success: false,
        message: verificationResult.message
      });
    }
    
    // Try to get user information from GoHighLevel first
    console.log('🔍 Looking up user in GoHighLevel CRM...');
    let user;
    
    try {
      const ghlUser = await getContactByEmail(trimmedEmail);
      
      if (ghlUser.exists && ghlUser.name && ghlUser.name !== 'User') {
        // Use GHL data if available and has real name
        console.log('✅ Found user in GoHighLevel:', {
          name: ghlUser.name,
          plan: ghlUser.plan,
          contactId: ghlUser.contactId
        });
        
        user = {
          id: ghlUser.contactId || trimmedEmail,
          email: trimmedEmail,
          name: ghlUser.name,
          plan: ghlUser.plan
        };
      } else {
        // Fallback to email-based name extraction
        console.log('⚠️ User not found in GoHighLevel or incomplete data, using email-based name');
        const emailLocal = trimmedEmail.split('@')[0];
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

        user = {
          id: trimmedEmail,
          email: trimmedEmail,
          name: userName
        };
      }
    } catch (error) {
      console.error('❌ Error looking up user in GoHighLevel:', error);
      
      // Fallback to email-based name extraction
      const emailLocal = trimmedEmail.split('@')[0];
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

      user = {
        id: trimmedEmail,
        email: trimmedEmail,
        name: userName
      };
    }
    
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