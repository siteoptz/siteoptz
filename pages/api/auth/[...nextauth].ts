import NextAuth, { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

// Helper function to check if user exists in GoHighLevel
async function searchGHLContact(email: string) {
  try {
    if (!process.env.GHL_API_KEY || !process.env.GHL_LOCATION_ID) {
      console.log('GHL credentials not configured');
      return null;
    }

    const response = await fetch(
      `https://services.leadconnectorhq.com/contacts/search/duplicate?locationId=${process.env.GHL_LOCATION_ID}&email=${encodeURIComponent(email)}`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${process.env.GHL_API_KEY}`,
          'Version': '2021-07-28'
        }
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ GHL search failed:', {
        status: response.status,
        statusText: response.statusText,
        error: errorText,
        email: email
      });
      return null;
    }

    const data = await response.json();
    if (data.contact) {
      console.log('✅ Found existing GHL contact:', email);
      return data.contact;
    }

    console.log('ℹ️ No GHL contact found for:', email);
    return null;
  } catch (error) {
    console.error('GHL search error:', error);
    return null;
  }
}

// Helper function to create new contact in GoHighLevel
async function createGHLContact(email: string, name: string, plan: string = 'free', isTrialUser: boolean = false, qualifyingData?: any) {
  try {
    if (!process.env.GHL_API_KEY || !process.env.GHL_LOCATION_ID) {
      console.log('GHL credentials not configured - skipping contact creation');
      return null;
    }

    // Determine tags and source based on signup type
    const tags = isTrialUser 
      ? [`siteoptz-trial-${plan}`, 'trial-user', 'oauth-signup']
      : [`siteoptz-plan-${plan}`, 'oauth-signup'];

    // Add discovery-application tag if qualifying data exists
    if (qualifyingData) {
      tags.push('discovery-application', 'signup-form');
    }

    // Build custom fields from qualifying data
    const customFields: Array<{id: string, field_value: string}> = [];
    if (qualifyingData) {
      console.log('🔧 Building custom fields from qualifying data:', qualifyingData);
      
      // Create a comprehensive test with all possible field formats
      const fieldMappings = [
        // Try the exact display names you provided
        { key: 'business', value: qualifyingData.business, ids: ['Q1: Clinic Website (If any)'] },
        { key: 'bottlenecks', value: qualifyingData.bottlenecks, ids: ['Q2: What are the top 1–2 bottlenecks in your business right now where you believe AI could save you the most time or money?'] },
        { key: 'currentAIUsage', value: qualifyingData.currentAIUsage, ids: ['Q3: How are you currently using AI tools in your business today?'] },
        { key: 'priorityOutcome', value: qualifyingData.priorityOutcome, ids: ['Q4: If SiteOptz.ai could fully automate one outcome for you over the next 90 days, which would you prioritize first?'] },
        
        // Try simplified field names
        { key: 'business', value: qualifyingData.business, ids: ['clinic_website', 'business_website', 'website'] },
        { key: 'bottlenecks', value: qualifyingData.bottlenecks, ids: ['bottlenecks', 'business_bottlenecks', 'challenges'] },
        { key: 'currentAIUsage', value: qualifyingData.currentAIUsage, ids: ['ai_usage', 'current_ai_usage', 'ai_tools'] },
        { key: 'priorityOutcome', value: qualifyingData.priorityOutcome, ids: ['priority_outcome', 'automation_priority', 'desired_outcome'] },
        
        // Try common GHL custom field patterns
        { key: 'business', value: qualifyingData.business, ids: ['custom_field_1', 'q1', 'field1'] },
        { key: 'bottlenecks', value: qualifyingData.bottlenecks, ids: ['custom_field_2', 'q2', 'field2'] },
        { key: 'currentAIUsage', value: qualifyingData.currentAIUsage, ids: ['custom_field_3', 'q3', 'field3'] },
        { key: 'priorityOutcome', value: qualifyingData.priorityOutcome, ids: ['custom_field_4', 'q4', 'field4'] }
      ];
      
      fieldMappings.forEach(mapping => {
        if (mapping.value) {
          mapping.ids.forEach(id => {
            customFields.push({
              id: id,
              field_value: mapping.value
            });
          });
        }
      });
      
      console.log('🔧 Custom fields array length:', customFields.length);
      console.log('🔧 All custom field attempts:', customFields.map(f => f.id));
    }

    const requestBody = {
      locationId: process.env.GHL_LOCATION_ID,
      email,
      name,
      tags: tags,
      source: qualifyingData ? 'SiteOptz SignUp Form' : 'Google OAuth',
      ...(customFields.length > 0 && { customFields })
    };

    console.log('🔧 GHL API Request Body:', JSON.stringify(requestBody, null, 2));
    
    const response = await fetch('https://services.leadconnectorhq.com/contacts/', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GHL_API_KEY}`,
        'Version': '2021-07-28',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });

    console.log('🔧 GHL API Response Status:', response.status);
    console.log('🔧 GHL API Response Headers:', Object.fromEntries(response.headers.entries()));

    if (!response.ok) {
      const error = await response.text();
      console.error('❌ GHL create contact failed:', {
        status: response.status,
        statusText: response.statusText,
        error: error,
        email: email,
        customFieldsAttempted: customFields.length,
        requestBody
      });
      
      // Try to parse error for custom field specific issues
      try {
        const errorData = JSON.parse(error);
        if (errorData.message && errorData.message.includes('custom')) {
          console.error('🔍 Custom field related error detected:', errorData);
        }
      } catch (e) {
        // Error wasn't JSON, continue
      }
      
      return null;
    }

    const data = await response.json();
    console.log('✅ Created new GHL contact:', email, 'Plan:', plan, 'Trial:', isTrialUser, 'With qualifying data:', !!qualifyingData);
    console.log('🔧 GHL Response Data:', JSON.stringify(data, null, 2));
    return data.contact;
  } catch (error) {
    console.error('GHL create contact error:', error);
    return null;
  }
}

// Helper function to add contact to trial pipeline
async function addToTrialPipeline(contactId: string, trialType: string) {
  try {
    console.log('🔧 Attempting to add contact to pipeline:', { contactId, trialType });
    
    if (!process.env.GHL_API_KEY || !process.env.GHL_LOCATION_ID) {
      console.error('❌ GHL credentials not configured:', {
        hasApiKey: !!process.env.GHL_API_KEY,
        hasLocationId: !!process.env.GHL_LOCATION_ID
      });
      return false;
    }

    // Pipeline configuration for different trial types
    const pipelineConfig = {
      'free': {
        pipelineId: process.env.GHL_FREE_TRIAL_PIPELINE_ID || 'MISSING_FREE_PIPELINE_ID',
        stageId: process.env.GHL_FREE_TRIAL_STAGE_ID || 'MISSING_FREE_STAGE_ID'
      },
      'starter': {
        pipelineId: process.env.GHL_STARTER_TRIAL_PIPELINE_ID || 'MISSING_STARTER_PIPELINE_ID',
        stageId: process.env.GHL_STARTER_TRIAL_STAGE_ID || 'MISSING_STARTER_STAGE_ID'
      },
      'pro': {
        pipelineId: process.env.GHL_PRO_TRIAL_PIPELINE_ID || 'MISSING_PRO_PIPELINE_ID',
        stageId: process.env.GHL_PRO_TRIAL_STAGE_ID || 'MISSING_PRO_STAGE_ID'
      }
    };

    const config = pipelineConfig[trialType as keyof typeof pipelineConfig];
    
    console.log('🔧 Pipeline config for', trialType, ':', config);
    
    // Check if we have valid pipeline IDs
    if (config.pipelineId.startsWith('MISSING_') || config.stageId.startsWith('MISSING_')) {
      console.error('❌ Missing pipeline configuration for trial type:', trialType, config);
      return false;
    }
    
    const requestBody = {
      contactId: contactId,
      pipelineId: config.pipelineId,
      pipelineStageId: config.stageId,
      title: `SiteOptz ${trialType.toUpperCase()} Trial - OAuth Signup`,
      monetaryValue: trialType === 'free' ? 0 : trialType === 'starter' ? 59 : 199,
      source: 'Google OAuth Trial Signup'
    };
    
    console.log('🔧 Request body:', requestBody);
    
    const response = await fetch('https://services.leadconnectorhq.com/opportunities/', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GHL_API_KEY}`,
        'Version': '2021-07-28',
        'Content-Type': 'application/json',
        'Location-Id': process.env.GHL_LOCATION_ID
      },
      body: JSON.stringify(requestBody)
    });

    console.log('🔧 GHL API Response Status:', response.status);
    
    if (!response.ok) {
      const error = await response.text();
      console.error('❌ GHL pipeline addition failed:', {
        status: response.status,
        statusText: response.statusText,
        error: error,
        config: config
      });
      return false;
    }

    const responseData = await response.json();
    console.log('✅ Added contact to trial pipeline:', contactId, 'Type:', trialType, 'Response:', responseData);
    return true;
  } catch (error) {
    console.error('❌ GHL pipeline addition error:', error);
    return false;
  }
}

// Helper function to submit qualifying data to GHL form submissions endpoint
async function submitToGHLFormSubmissions(email: string, name: string, qualifyingData: any) {
  try {
    if (!process.env.GHL_API_KEY || !process.env.GHL_LOCATION_ID) {
      console.log('GHL credentials not configured - skipping form submission');
      return null;
    }

    console.log('🔧 Preparing form submission data for GHL:', qualifyingData);

    // Submit directly to the form submissions endpoint you provided
    const formSubmissionData = {
      locationId: process.env.GHL_LOCATION_ID,
      formId: 'sugm3qdEBmvskAdbKwaS', // Your form ID
      email: email,
      name: name,
      // Try to match the form field structure
      'Q1: Clinic Website (If any)': qualifyingData.business || '',
      'Q2: What are the top 1–2 bottlenecks in your business right now where you believe AI could save you the most time or money?': qualifyingData.bottlenecks || '',
      'Q3: How are you currently using AI tools in your business today?': qualifyingData.currentAIUsage || '',
      'Q4: If SiteOptz.ai could fully automate one outcome for you over the next 90 days, which would you prioritize first?': qualifyingData.priorityOutcome || ''
    };

    console.log('🔧 Form submission request body:', JSON.stringify(formSubmissionData, null, 2));

    const response = await fetch('https://app.gohighlevel.com/v2/location/ECu5ScdYFmB0WnhvYoBU/form-builder/submissions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GHL_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formSubmissionData)
    });

    console.log('🔧 GHL Form Submission Response Status:', response.status);
    console.log('🔧 GHL Form Submission Response Headers:', Object.fromEntries(response.headers.entries()));

    if (!response.ok) {
      const error = await response.text();
      console.error('❌ GHL form submission failed:', {
        status: response.status,
        statusText: response.statusText,
        error: error,
        endpoint: 'form-builder/submissions'
      });
      return null;
    }

    const data = await response.json();
    console.log('✅ Successfully submitted qualifying data to GHL form:', data);
    return data;
  } catch (error) {
    console.error('GHL form submission error:', error);
    return null;
  }
}

// Helper function to extract plan from GHL contact tags
function extractPlanFromTags(tags: string[]): string {
  if (!tags || !Array.isArray(tags)) return 'free';
  
  const planTag = tags.find(tag => tag.startsWith('siteoptz-plan-'));
  if (planTag) {
    const plan = planTag.replace('siteoptz-plan-', '');
    console.log('📋 Extracted plan from GHL tags:', plan);
    return plan;
  }
  
  return 'free';
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login',
    error: '/auth/error',
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      console.log('🔥🔥🔥 OAUTH CALLBACK STARTED 🔥🔥🔥');
      console.log('🔥 OAuth Sign In Attempt:', user.email);
      console.log('🔥 DEBUG: NextAuth callback triggered at:', new Date().toISOString());
      console.log('🔥 Account Provider:', account?.provider);
      console.log('🔥 User Info:', { email: user.email, name: user.name });
      
      // Only process Google OAuth
      if (account?.provider !== 'google') {
        return true;
      }

      try {
        // Check if user exists in GoHighLevel
        const existingContact = await searchGHLContact(user.email!);
        
        if (!existingContact) {
          // New user - determine if this is a trial signup
          // We can check for trial params in the callback URL or state
          const callbackUrl = account?.callbackUrl || '';
          const state = account?.state || '';
          
          console.log('🔍 OAuth Debug Info:', {
            callbackUrl: callbackUrl,
            state: state,
            provider: account?.provider
          });
          
          // Extract qualifying data from callback URL
          let qualifyingData = null;
          console.log('🔍 Checking for qualifying data in callback URL:', callbackUrl);
          if (typeof callbackUrl === 'string' && callbackUrl.includes('qualifying=')) {
            try {
              console.log('🔍 Found qualifying parameter in URL');
              const urlParams = new URLSearchParams(callbackUrl.split('?')[1] || '');
              const encodedData = urlParams.get('qualifying');
              console.log('🔍 Encoded data:', encodedData);
              if (encodedData) {
                const decodedData = JSON.parse(decodeURIComponent(encodedData));
                console.log('🔍 Decoded data:', decodedData);
                qualifyingData = {
                  business: decodedData.b,
                  bottlenecks: decodedData.bt,
                  currentAIUsage: decodedData.ai,
                  priorityOutcome: decodedData.po
                };
                console.log('🔍 Extracted qualifying data from URL:', qualifyingData);
              }
            } catch (error) {
              console.error('❌ Error parsing qualifying data:', error);
            }
          } else {
            console.log('🔍 No qualifying data found in callback URL');
          }
          
          // More comprehensive trial detection
          const isTrialSignup = (typeof callbackUrl === 'string' && callbackUrl.includes('trial=true')) || 
                                (typeof state === 'string' && state.includes('trial')) ||
                                (typeof callbackUrl === 'string' && callbackUrl.includes('plan=')) ||
                                (typeof callbackUrl === 'string' && callbackUrl.includes('signup')) ||
                                true; // For now, treat ALL new OAuth signups as trials
          
          // Extract plan from callback URL if present
          let plan = 'free';
          if (typeof callbackUrl === 'string' && callbackUrl) {
            const urlParams = new URLSearchParams(callbackUrl.split('?')[1] || '');
            plan = urlParams.get('plan') || 'free';
          }
          
          console.log('🆕 New user via OAuth:', user.email, 'Plan:', plan, 'Trial:', isTrialSignup, 'Has qualifying data:', !!qualifyingData);
          
          const newContact = await createGHLContact(
            user.email!,
            user.name || 'User',
            plan,
            isTrialSignup,
            qualifyingData
          );
          
          // Also submit qualifying data directly to GHL form submissions
          if (qualifyingData) {
            console.log('🔧 Submitting qualifying data to GHL form submissions endpoint');
            await submitToGHLFormSubmissions(user.email!, user.name || 'User', qualifyingData);
          }
          
          if (!newContact && process.env.GHL_API_KEY) {
            // If GHL is configured but creation failed, log error but ALLOW sign in
            console.error('⚠️ Failed to create GHL contact, but allowing sign in to proceed');
            console.error('⚠️ User can still access the platform, but may not be tracked in GHL');
            // Don't block sign in - GHL issues shouldn't prevent user access
          }

          // If this is a trial signup, add to trial pipeline
          if (isTrialSignup && newContact) {
            console.log('🔧 Processing trial pipeline addition for:', user.email, 'Contact ID:', newContact.id);
            const pipelineResult = await addToTrialPipeline(newContact.id, plan);
            if (pipelineResult) {
              console.log('✅ Successfully added to pipeline:', newContact.id, plan);
            } else {
              console.error('❌ Failed to add to pipeline:', newContact.id, plan);
            }
          } else {
            console.log('🔧 Skipping pipeline addition:', { isTrialSignup, hasContact: !!newContact, email: user.email });
          }
        } else {
          console.log('✅ Existing user found in GHL:', user.email);
        }
        
        return true;
      } catch (error) {
        console.error('❌❌❌ SIGN IN CALLBACK ERROR ❌❌❌');
        console.error('❌ Sign in callback error:', error);
        console.error('❌ Error stack:', error instanceof Error ? error.stack : 'No stack trace');
        // Always allow sign in even if GHL integration fails
        // Users shouldn't be blocked from accessing the platform due to CRM issues
        console.log('⚠️ OAuth sign in proceeding despite GHL integration error');
        return true;
      }
    },
    
    async redirect({ url, baseUrl }) {
      // Redirect to dashboard after sign in
      if (url === baseUrl + '/api/auth/callback/google' || url === baseUrl + '/') {
        return baseUrl + '/dashboard';
      }
      
      if (url.startsWith('/')) return `${baseUrl}${url}`;
      else if (new URL(url).origin === baseUrl) return url;
      
      return baseUrl + '/dashboard';
    },
    
    async jwt({ token, user, account }) {
      // On initial sign in, fetch user data from GHL
      if (account && user) {
        token.accessToken = account.access_token;
        
        try {
          // Get user's plan from GoHighLevel
          const ghlContact = await searchGHLContact(user.email!);
          if (ghlContact) {
            const plan = extractPlanFromTags(ghlContact.tags || []);
            token.plan = plan;
            console.log('📋 JWT: Set user plan to:', plan);
          } else {
            token.plan = 'free';
            console.log('📋 JWT: No GHL contact, defaulting to free plan');
          }
        } catch (error) {
          console.error('JWT callback error:', error);
          token.plan = 'free';
        }
      }
      
      return token;
    },
    
    async session({ session, token }) {
      // Add plan to session
      if (session.user) {
        (session.user as any).plan = token.plan || 'free';
        console.log('📋 Session: User plan is:', (session.user as any).plan);
      }
      
      if (token.accessToken) {
        (session as any).accessToken = token.accessToken;
      }
      
      return session;
    },
  },
  debug: process.env.NODE_ENV === 'development',
}

export default NextAuth(authOptions)