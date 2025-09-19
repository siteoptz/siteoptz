// User Management Service with conditional GoHighLevel integration
// Only new users get added to GoHighLevel and receive welcome messages
// Upgrades only update existing contacts, no welcome messages

import { createGoHighLevelContact, sendWelcomeEmail, sendAdminNotificationEmail } from './gohighlevel-service';

export interface UserData {
  // Personal Information
  email: string;
  name?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  
  // Business Information
  company?: string;
  companySize?: string;
  industry?: string;
  jobTitle?: string;
  
  // AI/Technology Interests
  interests?: string;
  aiToolsInterest?: string[];
  primaryUseCase?: string;
  experienceLevel?: string;
  budget?: string;
  timeline?: string;
  
  // Plan Information
  plan?: string;
  billingCycle?: string;
  provider?: string;
  stripeCustomerId?: string;
  
  // Marketing & Analytics
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
  referrer?: string;
  marketingConsent?: boolean;
  newsletterSubscription?: boolean;
  preferredContactMethod?: string;
  
  // System Fields
  isUpgrade?: boolean;
  isRegistrationAttempt?: boolean;
  source?: string;
  registrationDate?: string;
}

export interface UserActionResult {
  success: boolean;
  isNewUser: boolean;
  action: 'created' | 'updated' | 'skipped';
  contactId?: string;
  emailSent?: boolean;
  adminNotificationSent?: boolean;
  error?: string;
}

// Check if user already exists in GoHighLevel
async function checkExistingContact(email: string): Promise<{ exists: boolean; contactId?: string }> {
  console.log('🔍 Checking if contact exists in GoHighLevel:', email);
  
  // Check if GoHighLevel integration is enabled
  const isGHLEnabled = process.env.ENABLE_GHL === 'true';
  if (!isGHLEnabled || !process.env.GOHIGHLEVEL_API_KEY || !process.env.GOHIGHLEVEL_LOCATION_ID) {
    console.log('⚠️ GoHighLevel integration disabled, assuming contact does not exist');
    return { exists: false };
  }

  try {
    const headers: Record<string, string> = {
      'Authorization': `Bearer ${process.env.GOHIGHLEVEL_API_KEY}`,
      'Content-Type': 'application/json',
      'Version': '2021-07-28'
    };
    
    // Search for existing contact by email - locationId is already in the URL
    const searchResponse = await fetch(
      `https://services.leadconnectorhq.com/contacts/search/duplicate?email=${encodeURIComponent(email)}&locationId=${process.env.GOHIGHLEVEL_LOCATION_ID}`,
      {
        method: 'GET',
        headers
      }
    );

    console.log('📥 GoHighLevel search response status:', searchResponse.status);

    if (searchResponse.ok) {
      const searchResult = await searchResponse.json();
      console.log('📥 GoHighLevel search result:', JSON.stringify(searchResult, null, 2));
      
      // If contact exists, return the contact ID
      if (searchResult.contact && searchResult.contact.id) {
        console.log('✅ Existing contact found:', searchResult.contact.id);
        return { exists: true, contactId: searchResult.contact.id };
      } else {
        console.log('ℹ️ No existing contact found for:', email);
        return { exists: false };
      }
    } else {
      const error = await searchResponse.text();
      console.error('❌ Failed to search for existing contact. Status:', searchResponse.status);
      console.error('❌ Error response:', error);
      // If search fails, assume contact doesn't exist to avoid blocking new registrations
      return { exists: false };
    }
  } catch (error) {
    console.error('💥 Network error searching for existing contact:', error);
    // If search fails, assume contact doesn't exist to avoid blocking new registrations
    return { exists: false };
  }
}

// Update existing GoHighLevel contact with new plan information
async function updateExistingContact(contactId: string, userData: UserData): Promise<{ success: boolean; error?: string }> {
  console.log('🔄 Updating existing GoHighLevel contact:', contactId);
  
  try {
    const headers: Record<string, string> = {
      'Authorization': `Bearer ${process.env.GOHIGHLEVEL_API_KEY}`,
      'Content-Type': 'application/json',
      'Version': '2021-07-28'
    };

    // Prepare update data - comprehensive fields for existing contacts
    const updateData: any = {
      tags: [
        // Core Tags
        'SiteOptz User',
        'upgraded-user',
        
        // Plan & Billing Tags
        `plan-${userData.plan || 'Free User'}`,
        userData.billingCycle ? `billing-${userData.billingCycle}` : 'billing-none',
        userData.provider ? `provider-${userData.provider}` : 'provider-direct',
        
        // Business Information Tags
        userData.company ? `Company: ${userData.company}` : 'No Company',
        userData.companySize ? `Company Size: ${userData.companySize}` : 'Company Size Unknown',
        userData.industry ? `Industry: ${userData.industry}` : 'Industry Unknown',
        userData.jobTitle ? `Job Title: ${userData.jobTitle}` : 'Job Title Unknown',
        
        // AI/Technology Interest Tags
        userData.experienceLevel ? `Experience: ${userData.experienceLevel}` : 'Experience Unknown',
        userData.budget ? `Budget: ${userData.budget}` : 'Budget Unknown',
        userData.primaryUseCase ? `Use Case: ${userData.primaryUseCase}` : 'Use Case Unknown',
        userData.timeline ? `Timeline: ${userData.timeline}` : 'Timeline Unknown',
        
        // Marketing & Consent Tags
        `Marketing Consent: ${userData.marketingConsent ? 'Yes' : 'No'}`,
        `Newsletter: ${userData.newsletterSubscription ? 'Yes' : 'No'}`,
        userData.preferredContactMethod ? `Contact Method: ${userData.preferredContactMethod}` : 'Contact Method Unknown',
        
        // UTM & Source Tags
        userData.utmSource ? `UTM Source: ${userData.utmSource}` : 'No UTM Source',
        userData.utmMedium ? `UTM Medium: ${userData.utmMedium}` : 'No UTM Medium',
        userData.utmCampaign ? `UTM Campaign: ${userData.utmCampaign}` : 'No UTM Campaign',
        userData.referrer ? `Referrer: ${userData.referrer}` : 'No Referrer',
        
        // Dynamic AI Tools Interest Tags
        ...(userData.aiToolsInterest?.map(tool => `Interest: ${tool}`) || []),
        
        // Upgrade Date Tag
        `Last Upgrade: ${new Date().toISOString().split('T')[0]}`
      ].filter(Boolean),
      customFields: [
        // Plan and Billing Information
        {
          key: 'subscription_plan',
          field_value: userData.plan || 'Free User'
        },
        {
          key: 'billing_cycle',
          field_value: userData.billingCycle || ''
        },
        {
          key: 'last_upgrade_date',
          field_value: new Date().toISOString()
        },
        {
          key: 'stripe_customer_id',
          field_value: userData.stripeCustomerId || ''
        },
        
        // Business Information
        {
          key: 'company_name',
          field_value: userData.company || ''
        },
        {
          key: 'company_size',
          field_value: userData.companySize || ''
        },
        {
          key: 'industry',
          field_value: userData.industry || ''
        },
        {
          key: 'job_title',
          field_value: userData.jobTitle || ''
        },
        
        // AI/Technology Interests
        {
          key: 'ai_tools_interest',
          field_value: userData.aiToolsInterest?.join(', ') || userData.interests || ''
        },
        {
          key: 'primary_use_case',
          field_value: userData.primaryUseCase || ''
        },
        {
          key: 'experience_level',
          field_value: userData.experienceLevel || ''
        },
        {
          key: 'budget',
          field_value: userData.budget || ''
        },
        {
          key: 'timeline',
          field_value: userData.timeline || ''
        },
        
        // Marketing & Analytics
        {
          key: 'utm_source',
          field_value: userData.utmSource || ''
        },
        {
          key: 'utm_medium',
          field_value: userData.utmMedium || ''
        },
        {
          key: 'utm_campaign',
          field_value: userData.utmCampaign || ''
        },
        {
          key: 'utm_term',
          field_value: userData.utmTerm || ''
        },
        {
          key: 'utm_content',
          field_value: userData.utmContent || ''
        },
        {
          key: 'referrer',
          field_value: userData.referrer || ''
        },
        {
          key: 'marketing_consent',
          field_value: userData.marketingConsent ? 'Yes' : 'No'
        },
        {
          key: 'newsletter_subscription',
          field_value: userData.newsletterSubscription ? 'Yes' : 'No'
        },
        {
          key: 'preferred_contact_method',
          field_value: userData.preferredContactMethod || ''
        },
        
        // System Fields
        {
          key: 'source',
          field_value: userData.source || 'SiteOptz Registration'
        },
        {
          key: 'registration_date',
          field_value: userData.registrationDate || new Date().toISOString()
        },
        {
          key: 'provider',
          field_value: userData.provider || 'direct'
        }
      ]
    };

    // Note: Update operations don't need locationId in body (causes 422 error)
    // The contactId already contains the location context

    console.log('📤 Updating GoHighLevel contact:', JSON.stringify(updateData, null, 2));
    
    const response = await fetch(`https://services.leadconnectorhq.com/contacts/${contactId}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(updateData)
    });

    console.log('📥 GoHighLevel update response status:', response.status);

    if (response.ok) {
      const result = await response.json();
      console.log('✅ Successfully updated existing GoHighLevel contact');
      console.log('Update result:', JSON.stringify(result, null, 2));
      return { success: true };
    } else {
      const error = await response.text();
      console.error('❌ Failed to update existing GoHighLevel contact. Status:', response.status);
      console.error('❌ Error response:', error);
      return { success: false, error: `HTTP ${response.status}: ${error}` };
    }
  } catch (error) {
    console.error('💥 Network error updating existing GoHighLevel contact:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

// Main function to handle user registration/upgrade with conditional logic
export async function handleUserAction(userData: UserData): Promise<UserActionResult> {
  console.log('🎯 === USER ACTION HANDLER ===');
  console.log('User data:', JSON.stringify(userData, null, 2));
  console.log('Is upgrade?:', userData.isUpgrade);

  const result: UserActionResult = {
    success: false,
    isNewUser: false,
    action: 'skipped'
  };

  try {
    // Step 1: Check if user already exists in GoHighLevel
    const existingContact = await checkExistingContact(userData.email);
    
    if (existingContact.exists && existingContact.contactId) {
      // User exists - this is an upgrade, update the existing contact
      console.log('👤 Existing user detected - updating contact for upgrade');
      result.isNewUser = false;
      result.action = 'updated';
      
      const updateResult = await updateExistingContact(existingContact.contactId, userData);
      
      if (updateResult.success) {
        result.success = true;
        result.contactId = existingContact.contactId;
        console.log('✅ Existing user contact updated successfully');
        
        // Send admin notification for upgrade (no welcome email for existing users)
        if (userData.isUpgrade) {
          console.log('📧 Sending admin upgrade notification...');
          try {
            const adminNotificationResult = await sendAdminNotificationEmail(userData);
            result.adminNotificationSent = adminNotificationResult.success;
            if (adminNotificationResult.success) {
              console.log('✅ Admin upgrade notification sent');
            } else {
              console.error('❌ Failed to send admin upgrade notification:', adminNotificationResult.error);
            }
          } catch (error) {
            console.error('Error sending admin upgrade notification:', error);
            result.adminNotificationSent = false;
          }
        }
      } else {
        result.success = false;
        result.error = updateResult.error;
        console.error('❌ Failed to update existing user contact');
      }
      
    } else {
      // User doesn't exist - this is a new registration, create new contact
      console.log('🆕 New user detected - creating contact and sending welcome email');
      result.isNewUser = true;
      result.action = 'created';
      
      const createResult = await createGoHighLevelContact(userData);
      
      if (createResult.success) {
        result.success = true;
        result.contactId = createResult.contactId;
        console.log('✅ New user contact created successfully');
        
        // Send welcome email for new users only
        console.log('📧 Sending welcome email to new user...');
        try {
          const welcomeResult = await sendWelcomeEmail(userData);
          result.emailSent = welcomeResult.success;
          if (welcomeResult.success) {
            console.log('✅ Welcome email sent to new user');
          } else {
            console.error('❌ Failed to send welcome email:', welcomeResult.error);
          }
        } catch (error) {
          console.error('Error sending welcome email:', error);
          result.emailSent = false;
        }
        
        // Send admin notification for new user
        console.log('📧 Sending admin notification for new user...');
        try {
          const adminNotificationResult = await sendAdminNotificationEmail({
            ...userData,
            isUpgrade: false // This is a new user, not an upgrade
          });
          result.adminNotificationSent = adminNotificationResult.success;
          if (adminNotificationResult.success) {
            console.log('✅ Admin new user notification sent');
          } else {
            console.error('❌ Failed to send admin new user notification:', adminNotificationResult.error);
          }
        } catch (error) {
          console.error('Error sending admin new user notification:', error);
          result.adminNotificationSent = false;
        }
        
      } else {
        // GoHighLevel creation failed, but we'll still process emails and mark as success
        console.error('❌ Failed to create new user contact in GoHighLevel:', createResult.error);
        console.log('📋 Contact will need to be created manually in GoHighLevel');
        console.log('📋 Contact data for manual entry:', JSON.stringify(createResult.contactData, null, 2));
        
        // Still send welcome email for new users even if GoHighLevel fails
        console.log('📧 Sending welcome email to new user (GoHighLevel failed but proceeding)...');
        try {
          const welcomeResult = await sendWelcomeEmail(userData);
          result.emailSent = welcomeResult.success;
          if (welcomeResult.success) {
            console.log('✅ Welcome email sent to new user');
          } else {
            console.error('❌ Failed to send welcome email:', welcomeResult.error);
          }
        } catch (error) {
          console.error('Error sending welcome email:', error);
          result.emailSent = false;
        }
        
        // Send admin notification for new user (with GoHighLevel failure note)
        console.log('📧 Sending admin notification for new user (with GoHighLevel failure note)...');
        try {
          const adminNotificationResult = await sendAdminNotificationEmail({
            ...userData,
            isUpgrade: false // This is a new user, not an upgrade
          });
          result.adminNotificationSent = adminNotificationResult.success;
          if (adminNotificationResult.success) {
            console.log('✅ Admin new user notification sent');
          } else {
            console.error('❌ Failed to send admin new user notification:', adminNotificationResult.error);
          }
        } catch (error) {
          console.error('Error sending admin new user notification:', error);
          result.adminNotificationSent = false;
        }
        
        // Mark as success since user registration is complete, even if GoHighLevel failed
        result.success = true;
        result.error = `GoHighLevel creation failed (${createResult.error}) but user registration completed successfully. Manual GoHighLevel entry required.`;
      }
    }

    console.log('🎯 === USER ACTION RESULT ===');
    console.log('Final result:', JSON.stringify(result, null, 2));
    
    return result;

  } catch (error) {
    console.error('💥 Error in handleUserAction:', error);
    result.success = false;
    result.error = error instanceof Error ? error.message : 'Unknown error';
    return result;
  }
}

// Utility function to create UserData from different sources
export function createUserDataFromRegistration(registrationData: any): UserData {
  return {
    email: registrationData.email?.toLowerCase()?.trim(),
    name: registrationData.name?.trim(),
    phone: registrationData.phone,
    company: registrationData.company || `Business Size: ${registrationData.businessSize || ''}`,
    companySize: registrationData.businessSize,
    interests: registrationData.aiToolsInterest,
    plan: 'Free User',
    provider: registrationData.registrationMethod || 'direct',
    isUpgrade: false
  };
}

export function createUserDataFromStripeCustomer(customer: any, plan: string, billingCycle: string): UserData {
  return {
    email: customer.email,
    name: customer.name || 'Customer',
    phone: customer.phone,
    company: customer.metadata?.company || `${plan} Plan Customer`,
    companySize: customer.metadata?.company_size || 'Not collected',
    interests: customer.metadata?.interests || 'Not collected',
    plan: plan,
    billingCycle: billingCycle,
    provider: 'stripe',
    stripeCustomerId: customer.id,
    isUpgrade: true
  };
}

export function createUserDataFromOAuth(user: any, businessInfo: any = null): UserData {
  return {
    email: user.email?.toLowerCase()?.trim(),
    name: user.name?.trim(),
    company: businessInfo?.company || 'OAuth Registration',
    companySize: businessInfo?.companySize || 'Not collected',
    interests: businessInfo?.interests || 'Not collected',
    plan: 'Free User',
    provider: 'oauth',
    isUpgrade: false
  };
}