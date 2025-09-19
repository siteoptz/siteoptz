# 🚀 User Registration to GoHighLevel API System

## Overview
This system captures all user registration data from SiteOptz.ai and automatically creates comprehensive contacts in your GoHighLevel account with proper field mapping and workflow triggers.

## 🏗️ System Architecture

### 1. Frontend Registration Form
- Captures all user data during registration
- Validates data before submission
- Sends data to backend API

### 2. Backend API Endpoint
- Processes registration data
- Maps fields to GoHighLevel format
- Creates contact in GoHighLevel
- Handles errors and responses

### 3. GoHighLevel Integration
- Creates new contact with all fields
- Applies appropriate tags
- Triggers workflows
- Maps custom fields

## 📋 Complete Implementation

### Step 1: Create Registration API Endpoint

```typescript
// pages/api/user-registration.ts
import { NextApiRequest, NextApiResponse } from 'next';

interface UserRegistrationData {
  // Personal Information
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  
  // Business Information
  company?: string;
  companySize?: string;
  industry?: string;
  jobTitle?: string;
  
  // AI/Technology Interests
  aiToolsInterest?: string[];
  primaryUseCase?: string;
  experienceLevel?: string;
  budget?: string;
  timeline?: string;
  
  // Marketing & Communication
  marketingConsent: boolean;
  newsletterSubscription: boolean;
  preferredContactMethod?: string;
  
  // Additional Data
  source?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  referrer?: string;
  
  // Custom Fields
  customFields?: Record<string, any>;
}

interface ApiResponse {
  success: boolean;
  message: string;
  contactId?: string;
  error?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed'
    });
  }

  try {
    const registrationData: UserRegistrationData = req.body;
    
    // Validate required fields
    if (!registrationData.email || !registrationData.firstName || !registrationData.lastName) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: email, firstName, lastName'
      });
    }

    // Process registration and create GoHighLevel contact
    const result = await processUserRegistration(registrationData);
    
    if (result.success) {
      return res.status(200).json({
        success: true,
        message: 'User registered successfully',
        contactId: result.contactId
      });
    } else {
      return res.status(500).json({
        success: false,
        message: 'Failed to process registration',
        error: result.error
      });
    }

  } catch (error) {
    console.error('Registration API error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

// Process user registration and create GoHighLevel contact
async function processUserRegistration(data: UserRegistrationData) {
  try {
    console.log('=== USER REGISTRATION PROCESSING ===');
    console.log('Registration data:', JSON.stringify(data, null, 2));
    
    // Check if GoHighLevel integration is enabled
    const isGHLEnabled = process.env.ENABLE_GHL === 'true';
    if (!isGHLEnabled || !process.env.GOHIGHLEVEL_API_KEY || !process.env.GOHIGHLEVEL_LOCATION_ID) {
      console.log('⚠️ GoHighLevel integration disabled - logging registration data only');
      return { success: true, contactId: 'local-' + Date.now() };
    }

    // Create GoHighLevel contact
    const ghlResult = await createGoHighLevelContact(data);
    
    if (ghlResult.success) {
      console.log('✅ GoHighLevel contact created successfully:', ghlResult.contactId);
      
      // Send welcome email if consent given
      if (data.marketingConsent && data.email) {
        await sendWelcomeEmail(data);
      }
      
      return { success: true, contactId: ghlResult.contactId };
    } else {
      console.error('❌ Failed to create GoHighLevel contact:', ghlResult.error);
      return { success: false, error: ghlResult.error };
    }

  } catch (error) {
    console.error('💥 Registration processing error:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

// Create contact in GoHighLevel with comprehensive field mapping
async function createGoHighLevelContact(data: UserRegistrationData) {
  try {
    const apiKey = process.env.GOHIGHLEVEL_API_KEY;
    const locationId = process.env.GOHIGHLEVEL_LOCATION_ID;
    
    // Prepare comprehensive contact data
    const contactData = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone || '',
      tags: [
        'New User Registration',
        'SiteOptz User',
        data.company ? `Company: ${data.company}` : 'Individual User',
        data.companySize ? `Company Size: ${data.companySize}` : '',
        data.industry ? `Industry: ${data.industry}` : '',
        data.experienceLevel ? `Experience: ${data.experienceLevel}` : '',
        data.budget ? `Budget: ${data.budget}` : '',
        data.timeline ? `Timeline: ${data.timeline}` : '',
        data.marketingConsent ? 'Marketing Consent: Yes' : 'Marketing Consent: No',
        data.newsletterSubscription ? 'Newsletter: Yes' : 'Newsletter: No',
        data.source ? `Source: ${data.source}` : 'Direct Registration',
        `Registered: ${new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}`
      ].filter(tag => tag), // Remove empty tags
      
      customFields: [
        {
          key: 'company_name',
          field_value: data.company || ''
        },
        {
          key: 'company_size',
          field_value: data.companySize || ''
        },
        {
          key: 'industry',
          field_value: data.industry || ''
        },
        {
          key: 'job_title',
          field_value: data.jobTitle || ''
        },
        {
          key: 'ai_tools_interest',
          field_value: data.aiToolsInterest?.join(', ') || ''
        },
        {
          key: 'primary_use_case',
          field_value: data.primaryUseCase || ''
        },
        {
          key: 'experience_level',
          field_value: data.experienceLevel || ''
        },
        {
          key: 'budget',
          field_value: data.budget || ''
        },
        {
          key: 'timeline',
          field_value: data.timeline || ''
        },
        {
          key: 'preferred_contact_method',
          field_value: data.preferredContactMethod || 'email'
        },
        {
          key: 'utm_source',
          field_value: data.utmSource || ''
        },
        {
          key: 'utm_medium',
          field_value: data.utmMedium || ''
        },
        {
          key: 'utm_campaign',
          field_value: data.utmCampaign || ''
        },
        {
          key: 'referrer',
          field_value: data.referrer || ''
        },
        {
          key: 'registration_date',
          field_value: new Date().toISOString()
        },
        {
          key: 'marketing_consent',
          field_value: data.marketingConsent ? 'Yes' : 'No'
        },
        {
          key: 'newsletter_subscription',
          field_value: data.newsletterSubscription ? 'Yes' : 'No'
        }
      ],
      
      source: 'SiteOptz User Registration',
      locationId: locationId
    };

    console.log('Sending contact data to GoHighLevel:', JSON.stringify(contactData, null, 2));

    // Create contact in GoHighLevel
    const response = await fetch('https://services.leadconnectorhq.com/contacts/', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'Version': '2021-07-28',
        'Location-Id': locationId
      },
      body: JSON.stringify(contactData)
    });

    console.log('GoHighLevel API Response Status:', response.status);

    if (response.ok) {
      const result = await response.json();
      console.log('✅ GoHighLevel contact created successfully');
      console.log('Contact ID:', result.contact?.id);
      
      return { success: true, contactId: result.contact?.id };
    } else {
      const errorText = await response.text();
      console.error('❌ GoHighLevel API error:', response.status, errorText);
      return { success: false, error: `GoHighLevel API error: ${response.status} - ${errorText}` };
    }

  } catch (error) {
    console.error('💥 GoHighLevel contact creation error:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

// Send welcome email to new user
async function sendWelcomeEmail(data: UserRegistrationData) {
  try {
    // Implement your email sending logic here
    // This could use SendGrid, Postmark, or your preferred email service
    console.log('📧 Sending welcome email to:', data.email);
    
    // Example implementation with SendGrid
    if (process.env.SENDGRID_API_KEY) {
      const sgMail = require('@sendgrid/mail');
      sgMail.setApiKey(process.env.SENDGRID_API_KEY);
      
      const msg = {
        to: data.email,
        from: process.env.EMAIL_FROM || 'welcome@siteoptz.ai',
        subject: 'Welcome to SiteOptz.ai - Your AI Journey Starts Here!',
        html: `
          <h2>Welcome to SiteOptz.ai, ${data.firstName}!</h2>
          <p>Thank you for registering with us. We're excited to help you transform your business with AI.</p>
          <p>Here's what you can expect:</p>
          <ul>
            <li>Access to our AI tool database</li>
            <li>Expert AI consulting services</li>
            <li>Implementation support and guidance</li>
            <li>Regular updates on AI trends and opportunities</li>
          </ul>
          <p>If you have any questions, feel free to reach out to our team.</p>
          <p>Best regards,<br>The SiteOptz.ai Team</p>
        `
      };
      
      await sgMail.send(msg);
      console.log('✅ Welcome email sent successfully');
    }
  } catch (error) {
    console.error('❌ Failed to send welcome email:', error);
  }
}
```

### Step 2: Create Frontend Registration Form

```typescript
// components/UserRegistrationForm.tsx
import React, { useState } from 'react';
import { useRouter } from 'next/router';

interface RegistrationFormData {
  // Personal Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  
  // Business Information
  company: string;
  companySize: string;
  industry: string;
  jobTitle: string;
  
  // AI/Technology Interests
  aiToolsInterest: string[];
  primaryUseCase: string;
  experienceLevel: string;
  budget: string;
  timeline: string;
  
  // Marketing & Communication
  marketingConsent: boolean;
  newsletterSubscription: boolean;
  preferredContactMethod: string;
}

export const UserRegistrationForm: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<RegistrationFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    companySize: '',
    industry: '',
    jobTitle: '',
    aiToolsInterest: [],
    primaryUseCase: '',
    experienceLevel: '',
    budget: '',
    timeline: '',
    marketingConsent: false,
    newsletterSubscription: false,
    preferredContactMethod: 'email'
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (name === 'aiToolsInterest') {
      const checked = (e.target as HTMLInputElement).checked;
      const value = (e.target as HTMLInputElement).value;
      
      setFormData(prev => ({
        ...prev,
        aiToolsInterest: checked 
          ? [...prev.aiToolsInterest, value]
          : prev.aiToolsInterest.filter(item => item !== value)
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Get UTM parameters and referrer
      const utmParams = {
        utmSource: router.query.utm_source as string || '',
        utmMedium: router.query.utm_medium as string || '',
        utmCampaign: router.query.utm_campaign as string || '',
        referrer: document.referrer || ''
      };

      const registrationData = {
        ...formData,
        ...utmParams,
        source: 'SiteOptz Registration Form'
      };

      console.log('Submitting registration data:', registrationData);

      const response = await fetch('/api/user-registration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registrationData),
      });

      const result = await response.json();

      if (result.success) {
        setSuccess(true);
        console.log('Registration successful:', result.contactId);
        
        // Redirect to dashboard or success page
        setTimeout(() => {
          router.push('/dashboard?welcome=true');
        }, 2000);
      } else {
        setError(result.message || 'Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Registration error:', error);
      setError('An error occurred during registration. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
        <div className="text-center">
          <div className="text-green-500 text-6xl mb-4">✓</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Registration Successful!</h2>
          <p className="text-gray-600">Welcome to SiteOptz.ai! Redirecting to your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Create Your Account</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information */}
        <div className="border-b border-gray-200 pb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Personal Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                First Name *
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                required
                value={formData.firstName}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                Last Name *
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                required
                value={formData.lastName}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Business Information */}
        <div className="border-b border-gray-200 pb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Business Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="company" className="block text-sm font-medium text-gray-700">
                Company Name
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700">
                Job Title
              </label>
              <input
                type="text"
                id="jobTitle"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="companySize" className="block text-sm font-medium text-gray-700">
                Company Size
              </label>
              <select
                id="companySize"
                name="companySize"
                value={formData.companySize}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select company size</option>
                <option value="1-10">1-10 employees</option>
                <option value="11-50">11-50 employees</option>
                <option value="51-200">51-200 employees</option>
                <option value="201-500">201-500 employees</option>
                <option value="500+">500+ employees</option>
              </select>
            </div>
            <div>
              <label htmlFor="industry" className="block text-sm font-medium text-gray-700">
                Industry
              </label>
              <select
                id="industry"
                name="industry"
                value={formData.industry}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select industry</option>
                <option value="technology">Technology</option>
                <option value="healthcare">Healthcare</option>
                <option value="finance">Finance</option>
                <option value="retail">Retail</option>
                <option value="manufacturing">Manufacturing</option>
                <option value="education">Education</option>
                <option value="consulting">Consulting</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
        </div>

        {/* AI Interests */}
        <div className="border-b border-gray-200 pb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">AI & Technology Interests</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                AI Tools of Interest (select all that apply)
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {[
                  'ChatGPT', 'Claude', 'Jasper', 'Copy.ai', 'Grammarly',
                  'Midjourney', 'DALL-E', 'Stable Diffusion', 'Notion AI',
                  'Zapier', 'Make', 'Bard', 'Perplexity', 'Character.ai'
                ].map(tool => (
                  <label key={tool} className="flex items-center">
                    <input
                      type="checkbox"
                      name="aiToolsInterest"
                      value={tool}
                      checked={formData.aiToolsInterest.includes(tool)}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    <span className="text-sm">{tool}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label htmlFor="primaryUseCase" className="block text-sm font-medium text-gray-700">
                Primary Use Case
              </label>
              <select
                id="primaryUseCase"
                name="primaryUseCase"
                value={formData.primaryUseCase}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select primary use case</option>
                <option value="content-creation">Content Creation</option>
                <option value="customer-service">Customer Service</option>
                <option value="data-analysis">Data Analysis</option>
                <option value="marketing">Marketing</option>
                <option value="sales">Sales</option>
                <option value="productivity">Productivity</option>
                <option value="research">Research</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="experienceLevel" className="block text-sm font-medium text-gray-700">
                  AI Experience Level
                </label>
                <select
                  id="experienceLevel"
                  name="experienceLevel"
                  value={formData.experienceLevel}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select experience level</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                  <option value="expert">Expert</option>
                </select>
              </div>
              <div>
                <label htmlFor="budget" className="block text-sm font-medium text-gray-700">
                  Budget Range
                </label>
                <select
                  id="budget"
                  name="budget"
                  value={formData.budget}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select budget range</option>
                  <option value="under-1k">Under $1,000</option>
                  <option value="1k-5k">$1,000 - $5,000</option>
                  <option value="5k-10k">$5,000 - $10,000</option>
                  <option value="10k-25k">$10,000 - $25,000</option>
                  <option value="25k+">$25,000+</option>
                </select>
              </div>
              <div>
                <label htmlFor="timeline" className="block text-sm font-medium text-gray-700">
                  Implementation Timeline
                </label>
                <select
                  id="timeline"
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select timeline</option>
                  <option value="immediate">Immediate</option>
                  <option value="1-month">Within 1 month</option>
                  <option value="3-months">Within 3 months</option>
                  <option value="6-months">Within 6 months</option>
                  <option value="1-year">Within 1 year</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Marketing Preferences */}
        <div className="border-b border-gray-200 pb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Communication Preferences</h3>
          <div className="space-y-4">
            <div>
              <label htmlFor="preferredContactMethod" className="block text-sm font-medium text-gray-700">
                Preferred Contact Method
              </label>
              <select
                id="preferredContactMethod"
                name="preferredContactMethod"
                value={formData.preferredContactMethod}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="email">Email</option>
                <option value="phone">Phone</option>
                <option value="sms">SMS</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="marketingConsent"
                  checked={formData.marketingConsent}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                <span className="text-sm">I consent to receive marketing communications from SiteOptz.ai</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="newsletterSubscription"
                  checked={formData.newsletterSubscription}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                <span className="text-sm">Subscribe to our newsletter for AI insights and updates</span>
              </label>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Creating Account...' : 'Create Account'}
          </button>
        </div>
      </form>
    </div>
  );
};
```

### Step 3: Environment Variables Setup

```bash
# .env.local
# GoHighLevel Configuration
GOHIGHLEVEL_API_KEY=your_gohighlevel_api_key_here
GOHIGHLEVEL_LOCATION_ID=your_location_id_here
ENABLE_GHL=true

# Email Configuration
SENDGRID_API_KEY=your_sendgrid_api_key_here
EMAIL_FROM=welcome@siteoptz.ai

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://siteoptz.ai
```

### Step 4: GoHighLevel Custom Fields Setup

In your GoHighLevel account, create these custom fields:

```
company_name (Single Line Text)
company_size (Single Line Text)
industry (Single Line Text)
job_title (Single Line Text)
ai_tools_interest (Multi Line Text)
primary_use_case (Single Line Text)
experience_level (Single Line Text)
budget (Single Line Text)
timeline (Single Line Text)
preferred_contact_method (Single Line Text)
utm_source (Single Line Text)
utm_medium (Single Line Text)
utm_campaign (Single Line Text)
referrer (Single Line Text)
registration_date (Date/Time)
marketing_consent (Single Line Text)
newsletter_subscription (Single Line Text)
```

### Step 5: GoHighLevel Workflow Setup

Create a workflow triggered by the "New User Registration" tag:

1. **Trigger**: Tag Added → "New User Registration"
2. **Actions**:
   - Send welcome email
   - Add to "New Users" campaign
   - Create task for sales team
   - Update lead score
   - Add to appropriate pipeline stage

## 🧪 Testing the System

### Test the API Endpoint
```bash
curl -X POST https://siteoptz.ai/api/user-registration \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "phone": "+1234567890",
    "company": "Tech Corp",
    "companySize": "51-200",
    "industry": "technology",
    "jobTitle": "CTO",
    "aiToolsInterest": ["ChatGPT", "Claude"],
    "primaryUseCase": "content-creation",
    "experienceLevel": "intermediate",
    "budget": "5k-10k",
    "timeline": "3-months",
    "marketingConsent": true,
    "newsletterSubscription": true,
    "preferredContactMethod": "email"
  }'
```

### Expected Response
```json
{
  "success": true,
  "message": "User registered successfully",
  "contactId": "contact_xyz123"
}
```

## 📊 Features of This System

1. **Comprehensive Data Capture**: Captures all user information
2. **Field Mapping**: Maps all fields to GoHighLevel custom fields
3. **Tag Management**: Applies relevant tags for segmentation
4. **Workflow Triggers**: Triggers GoHighLevel workflows
5. **UTM Tracking**: Captures marketing attribution data
6. **Error Handling**: Robust error handling and logging
7. **Email Integration**: Sends welcome emails
8. **Validation**: Client and server-side validation

This system will automatically create comprehensive contacts in your GoHighLevel account with all the registration data properly mapped and organized for your sales and marketing teams.

