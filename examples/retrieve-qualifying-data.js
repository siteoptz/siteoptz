// Example: How to retrieve qualifying data from different sources

// Method 1: API Bridge Retrieval (Server-side)
async function retrieveFromAPIBridge(email) {
  try {
    const response = await fetch(`/api/qualifying-data?email=${encodeURIComponent(email)}`, {
      method: 'GET'
    });
    
    if (response.ok) {
      const result = await response.json();
      return result.data; // Returns the qualifying data object or null
    }
    
    return null;
  } catch (error) {
    console.error('Error retrieving from API bridge:', error);
    return null;
  }
}

// Method 2: SessionStorage Retrieval (Client-side)
function retrieveFromSessionStorage() {
  try {
    const stored = sessionStorage.getItem('signup_qualifying_data');
    if (stored) {
      return JSON.parse(stored);
    }
    return null;
  } catch (error) {
    console.error('Error retrieving from sessionStorage:', error);
    return null;
  }
}

// Method 3: URL Parameter Retrieval (Client-side)
function retrieveFromURL(url = window.location.href) {
  try {
    const urlObj = new URL(url);
    const encodedData = urlObj.searchParams.get('qualifying');
    
    if (encodedData) {
      const decodedData = JSON.parse(decodeURIComponent(encodedData));
      return {
        business: decodedData.b,
        bottlenecks: decodedData.bt,
        currentAIUsage: decodedData.ai,
        priorityOutcome: decodedData.po
      };
    }
    
    return null;
  } catch (error) {
    console.error('Error retrieving from URL:', error);
    return null;
  }
}

// Method 4: Cookie Retrieval (Server-side)
function retrieveFromCookies(req) {
  try {
    const cookies = req.headers.cookie;
    if (!cookies) return null;
    
    const cookieObj = {};
    cookies.split(';').forEach(cookie => {
      const [name, value] = cookie.trim().split('=');
      cookieObj[name] = value;
    });
    
    if (cookieObj.signup_data) {
      return JSON.parse(decodeURIComponent(cookieObj.signup_data));
    }
    
    return null;
  } catch (error) {
    console.error('Error retrieving from cookies:', error);
    return null;
  }
}

// Combined Retrieval Function (Try all methods)
async function getQualifyingData(email, req = null) {
  let data = null;
  
  // Try API bridge first (most reliable)
  if (email) {
    console.log('🔍 Trying API bridge...');
    data = await retrieveFromAPIBridge(email);
    if (data) {
      console.log('✅ Found data in API bridge');
      return data;
    }
  }
  
  // Try sessionStorage (client-side only)
  if (typeof window !== 'undefined') {
    console.log('🔍 Trying sessionStorage...');
    data = retrieveFromSessionStorage();
    if (data) {
      console.log('✅ Found data in sessionStorage');
      return data;
    }
  }
  
  // Try URL parameters
  if (typeof window !== 'undefined') {
    console.log('🔍 Trying URL parameters...');
    data = retrieveFromURL();
    if (data) {
      console.log('✅ Found data in URL');
      return data;
    }
  }
  
  // Try cookies (server-side)
  if (req) {
    console.log('🔍 Trying cookies...');
    data = retrieveFromCookies(req);
    if (data) {
      console.log('✅ Found data in cookies');
      return data;
    }
  }
  
  console.log('❌ No qualifying data found');
  return null;
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    retrieveFromAPIBridge,
    retrieveFromSessionStorage,
    retrieveFromURL,
    retrieveFromCookies,
    getQualifyingData
  };
}