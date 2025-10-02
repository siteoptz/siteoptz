// lib/client-side-ghl.ts
// Client-side GoHighLevel integration (doesn't cause infinite loops)

export interface ContactLookupResult {
  exists: boolean;
  contactId?: string;
  name?: string;
  plan?: string;
  email?: string;
}

// Client-side function to get GoHighLevel contact info (optional enhancement)
export async function getContactByEmailClientSide(email: string): Promise<ContactLookupResult> {
  try {
    // Only make this call on client-side when explicitly requested
    // This prevents server-side infinite loops
    if (typeof window === 'undefined') {
      return { exists: false };
    }

    const response = await fetch('/api/user/ghl-lookup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    if (response.ok) {
      return await response.json();
    } else {
      console.warn('GoHighLevel lookup failed:', response.status);
      return { exists: false };
    }
  } catch (error) {
    console.warn('GoHighLevel lookup error:', error);
    return { exists: false };
  }
}

// Client-side function to update user profile with GoHighLevel data
export async function updateUserProfileWithGHL(userEmail: string): Promise<void> {
  try {
    if (typeof window === 'undefined') return;

    const contact = await getContactByEmailClientSide(userEmail);
    
    if (contact.exists && contact.name) {
      // Update user profile in localStorage or send to API
      const profileData = {
        name: contact.name,
        plan: contact.plan,
        lastUpdated: new Date().toISOString()
      };
      
      localStorage.setItem('user_profile_enhanced', JSON.stringify(profileData));
      console.log('✅ Enhanced user profile with GoHighLevel data');
    }
  } catch (error) {
    console.warn('Failed to update user profile with GoHighLevel data:', error);
  }
}

// Get enhanced user profile (combines basic profile with GHL data)
export function getEnhancedUserProfile(userEmail: string, basicProfile: any): any {
  try {
    if (typeof window === 'undefined') {
      return basicProfile;
    }

    const enhanced = localStorage.getItem('user_profile_enhanced');
    if (enhanced) {
      const ghlData = JSON.parse(enhanced);
      return {
        ...basicProfile,
        name: ghlData.name || basicProfile.userName,
        plan: ghlData.plan || basicProfile.plan,
        enhanced: true,
        lastEnhanced: ghlData.lastUpdated
      };
    }
  } catch (error) {
    console.warn('Failed to get enhanced user profile:', error);
  }
  
  return basicProfile;
}
