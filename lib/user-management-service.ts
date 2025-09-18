// User Management Service with conditional GoHighLevel integration
// Only new users get added to GoHighLevel and receive welcome messages
// Upgrades only update existing contacts, no welcome messages

import { createGoHighLevelContact, sendWelcomeEmail, sendAdminNotificationEmail } from './gohighlevel-service';

export interface UserData {
  email: string;
  name?: string;
  phone?: string;
  company?: string;
  companySize?: string;
  interests?: string;
  plan?: string;
  billingCycle?: string;
  provider?: string;
  stripeCustomerId?: string;
  isUpgrade?: boolean;
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
    
    if (process.env.GOHIGHLEVEL_LOCATION_ID) {
      headers['Location-Id'] = process.env.GOHIGHLEVEL_LOCATION_ID;
    }
    
    // Search for existing contact by email
    const searchResponse = await fetch(
      `https://services.leadconnectorhq.com/contacts/search/duplicate?email=${encodeURIComponent(email)}`,
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
    
    if (process.env.GOHIGHLEVEL_LOCATION_ID) {
      headers['Location-Id'] = process.env.GOHIGHLEVEL_LOCATION_ID;
    }

    // Prepare update data - only update plan-related fields
    const updateData = {
      tags: [
        `plan-${userData.plan || 'free'}`,
        userData.billingCycle ? `billing-${userData.billingCycle}` : 'billing-none',
        'siteoptz-user',
        userData.provider ? `provider-${userData.provider}` : 'provider-direct',
        'upgraded-user'
      ],
      customFields: [
        {
          key: 'subscription_plan',
          field_value: userData.plan || 'free'
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
        }
      ]
    };

    // Add company info if available
    if (userData.company) {
      updateData.customFields.push({
        key: 'company_name',
        field_value: userData.company
      });
    }

    console.log('📤 Updating GoHighLevel contact with:', JSON.stringify(updateData, null, 2));
    
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
        result.success = false;
        result.error = createResult.error;
        console.error('❌ Failed to create new user contact');
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
    plan: 'free',
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
    plan: 'free',
    provider: 'oauth',
    isUpgrade: false
  };
}