// OTP Service - Shared in-memory store for development
// In production, this should be replaced with Redis or database storage

interface OTPEntry {
  code: string;
  expires: number;
  attempts: number;
}

// Singleton pattern to ensure same Map instance across all imports
declare global {
  var __otpStore: Map<string, OTPEntry> | undefined;
}

// Global in-memory store with singleton pattern
const otpStore = globalThis.__otpStore ?? new Map<string, OTPEntry>();
if (!globalThis.__otpStore) {
  globalThis.__otpStore = otpStore;
}

// Generate a 6-digit OTP code
export function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Store OTP with expiration and attempt tracking
export function storeOTP(email: string, code: string): void {
  const expires = Date.now() + 10 * 60 * 1000; // 10 minutes
  otpStore.set(email, { code, expires, attempts: 0 });
  console.log(`🔑 Generated OTP for ${email}: ${code} (expires in 10 minutes)`);
  console.log(`🔑 In development, the OTP code is: ${code}`);
}

// Send OTP via email (production mode)
export async function sendOTPEmail(email: string, code: string): Promise<{ success: boolean; message: string; error?: string }> {
  try {
    // Dynamic import to avoid module loading issues
    const { sendEmail } = require('./email-service');
    const { generateOTPEmailHTML, generateOTPEmailText } = require('./email-templates/otp-email');
    
    const subject = 'Your SiteOptz AI Access Code';
    const html = generateOTPEmailHTML(code, 10);
    const text = generateOTPEmailText(code, 10);
    
    console.log(`📧 Sending OTP email to ${email}`);
    
    const result = await sendEmail({
      to: email,
      subject,
      html,
      text,
      from: `"SiteOptz AI" <${process.env.EMAIL_FROM || 'info@siteoptz.ai'}>`
    });
    
    if (result.success) {
      console.log(`✅ OTP email sent successfully to ${email} via ${result.provider}`);
      return {
        success: true,
        message: `One-time code sent to ${email}. Please check your email inbox (and spam folder if needed).`
      };
    } else {
      console.error(`❌ Failed to send OTP email to ${email}:`, result.error);
      return {
        success: false,
        message: 'Failed to send verification email. Please try again.',
        error: result.error
      };
    }
  } catch (error) {
    console.error('❌ Error in sendOTPEmail:', error);
    return {
      success: false,
      message: 'Failed to send verification email. Please try again.',
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

// Verify OTP code
export function verifyOTP(email: string, inputCode: string): { 
  success: boolean; 
  message: string; 
  remainingAttempts?: number;
} {
  const storedOTP = otpStore.get(email);
  
  if (!storedOTP) {
    return {
      success: false,
      message: 'No code found for this email. Please request a new one.'
    };
  }

  // Check if code has expired
  if (Date.now() > storedOTP.expires) {
    otpStore.delete(email);
    return {
      success: false,
      message: 'Code has expired. Please request a new one.'
    };
  }

  // Check if too many attempts
  if (storedOTP.attempts >= 3) {
    otpStore.delete(email);
    return {
      success: false,
      message: 'Too many failed attempts. Please request a new code.'
    };
  }

  // Verify the code
  if (storedOTP.code !== inputCode.toString()) {
    storedOTP.attempts++;
    return {
      success: false,
      message: `Invalid code. ${3 - storedOTP.attempts} attempts remaining.`,
      remainingAttempts: 3 - storedOTP.attempts
    };
  }

  // Code is valid - clean up
  otpStore.delete(email);
  console.log(`✅ OTP verified successfully for ${email}`);
  
  return {
    success: true,
    message: 'Code verified successfully'
  };
}

// Debug function to check store contents
export function debugOTPStore(): void {
  console.log('🔍 OTP Store Debug:');
  console.log('Store size:', otpStore.size);
  for (const [email, data] of otpStore.entries()) {
    console.log(`  ${email}: code=${data.code}, expires=${new Date(data.expires).toISOString()}, attempts=${data.attempts}`);
  }
}