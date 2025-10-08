import { NextApiRequest, NextApiResponse } from 'next';
import * as crypto from 'crypto';
import bcrypt from 'bcryptjs';
import { createOptzClient } from '@/lib/optz-client-manager';
import { CyfeSSOMiddleware } from '@/lib/cyfe-sso-middleware';
import { sendAutoLoginEmail } from '@/lib/email-service';
import { provisionCyfeDashboards } from '@/lib/cyfe-provisioning';

// Map GHL tags to plans
const GHL_TAG_TO_PLAN_MAP: Record<string, string> = {
  'free-plan': 'free',
  'starter-plan': 'starter',
  'pro-plan': 'pro',
  'enterprise-plan': 'enterprise',
  // Legacy mappings
  'basic': 'free',
  'premium': 'pro',
  'vip': 'enterprise'
};

// Map plans to dashboard counts
const PLAN_DASHBOARD_LIMITS: Record<string, number> = {
  'free': 1,        // Basic dashboard only
  'starter': 2,     // Basic + Marketing
  'pro': 4,         // Basic + Marketing + Advanced + ROI
  'enterprise': -1  // Unlimited dashboards
};

interface GHLContact {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  tags?: string[];
  customFields?: Record<string, any>;
  dateAdded: string;
}

interface GHLWebhookPayload {
  event: string;
  data: GHLContact;
  timestamp: number;
}

// Verify GHL webhook signature
function verifyGHLSignature(payload: string, signature: string): boolean {
  const secret = process.env.GHL_WEBHOOK_SECRET || '';
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');
  
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  );
}

// Extract plan from GHL tags
function getPlanFromTags(tags: string[]): string {
  for (const tag of tags) {
    const normalizedTag = tag.toLowerCase().trim();
    if (GHL_TAG_TO_PLAN_MAP[normalizedTag]) {
      return GHL_TAG_TO_PLAN_MAP[normalizedTag];
    }
  }
  return 'free'; // Default to free plan
}

// Generate secure random password
function generateSecurePassword(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
  let password = '';
  const randomBytes = crypto.randomBytes(16);
  for (let i = 0; i < 16; i++) {
    password += chars[randomBytes[i] % chars.length];
  }
  return password;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Verify webhook signature
    const signature = req.headers['x-ghl-signature'] as string;
    if (!signature) {
      console.error('Missing GHL webhook signature');
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const rawBody = JSON.stringify(req.body);
    if (!verifyGHLSignature(rawBody, signature)) {
      console.error('Invalid GHL webhook signature');
      return res.status(401).json({ error: 'Invalid signature' });
    }

    const payload: GHLWebhookPayload = req.body;
    
    // Only process contact.created events
    if (payload.event !== 'contact.created') {
      return res.status(200).json({ message: 'Event ignored' });
    }

    const contact = payload.data;
    console.log('Processing new GHL contact:', contact.email);

    // Extract plan from tags
    const plan = getPlanFromTags(contact.tags || []);
    console.log('Assigned plan:', plan, 'from tags:', contact.tags);

    // Generate credentials
    const password = generateSecurePassword();
    const hashedPassword = await bcrypt.hash(password, 10);
    const username = contact.email.split('@')[0].toLowerCase();
    
    // Extract company name from email domain or custom fields
    const companyName = contact.customFields?.company_name || 
                       contact.email.split('@')[1].split('.')[0] || 
                       'Company';

    // Step 1: Create user in database
    console.log('Creating user in database...');
    const dbUser = await createOptzClient({
      email: contact.email,
      plan,
      username,
      password: hashedPassword,
      companyName: companyName.charAt(0).toUpperCase() + companyName.slice(1),
      isActive: true,
      ghlContactId: contact.id,
      metadata: {
        firstName: contact.firstName,
        lastName: contact.lastName,
        phone: contact.phone,
        createdFrom: 'ghl_webhook',
        tags: contact.tags
      }
    });

    if (!dbUser.success || !dbUser.data) {
      throw new Error(`Failed to create user: ${dbUser.error || 'Unknown error'}`);
    }

    console.log('User created:', dbUser.data.id);

    // Step 2: Provision Cyfe dashboards based on plan
    console.log('Provisioning Cyfe dashboards for plan:', plan);
    const dashboardLimit = PLAN_DASHBOARD_LIMITS[plan];
    
    const cyfeProvisioning = await provisionCyfeDashboards({
      email: contact.email,
      username,
      plan,
      dashboardLimit,
      companyName
    });

    if (!cyfeProvisioning.success) {
      console.error('Cyfe provisioning failed:', cyfeProvisioning.error);
      // Continue anyway - user can still access basic features
    }

    // Step 3: Generate SSO token for auto-login
    console.log('Generating SSO token...');
    const ssoToken = CyfeSSOMiddleware.generateToken({
      email: contact.email,
      plan,
      username,
      companyName,
      dashboards: cyfeProvisioning.dashboards || [],
      expiresIn: '7d' // Token valid for 7 days
    });

    // Step 4: Generate auto-login URL
    const loginUrl = CyfeSSOMiddleware.generateAutoLoginUrl({
      token: ssoToken,
      plan,
      redirectTo: `/dashboard/${plan}`,
      autoLogin: true
    });

    console.log('Generated auto-login URL:', loginUrl);

    // Step 5: Send email with auto-login link
    const emailSent = await sendAutoLoginEmail({
      to: contact.email,
      firstName: contact.firstName || username,
      loginUrl,
      plan,
      dashboards: cyfeProvisioning.dashboards || [],
      credentials: {
        username,
        password // Send initial password for manual login if needed
      }
    });

    if (!emailSent.success) {
      console.error('Failed to send email:', emailSent.error);
    }

    // Step 6: Update GHL contact with custom fields
    if (process.env.GHL_API_KEY) {
      await updateGHLContact(contact.id, {
        customFields: {
          optz_user_id: dbUser.data.id,
          optz_plan: plan,
          optz_dashboard_count: cyfeProvisioning.dashboards?.length || 0,
          optz_login_url: loginUrl
        }
      });
    }

    // Return success response
    return res.status(200).json({
      success: true,
      message: 'Contact processed successfully',
      data: {
        userId: dbUser.data.id,
        email: contact.email,
        plan,
        dashboardsProvisioned: cyfeProvisioning.dashboards?.length || 0,
        loginUrl,
        emailSent: emailSent.success
      }
    });

  } catch (error: any) {
    console.error('GHL webhook error:', error);
    
    // Return success to GHL to prevent retries for invalid data
    return res.status(200).json({
      success: false,
      error: error.message,
      message: 'Error processed - webhook acknowledged'
    });
  }
}

// Update GHL contact with custom fields
async function updateGHLContact(contactId: string, updates: any): Promise<void> {
  try {
    const response = await fetch(`https://api.gohighlevel.com/v1/contacts/${contactId}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${process.env.GHL_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updates)
    });

    if (!response.ok) {
      console.error('Failed to update GHL contact:', await response.text());
    }
  } catch (error) {
    console.error('Error updating GHL contact:', error);
  }
}

// Export for testing
export { GHL_TAG_TO_PLAN_MAP, PLAN_DASHBOARD_LIMITS, getPlanFromTags };