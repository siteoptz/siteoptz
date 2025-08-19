// Form debugging utility for production debugging
export const debugFormSubmission = (formName, data, response, error = null) => {
  const timestamp = new Date().toISOString();
  const debugInfo = {
    timestamp,
    form: formName,
    data: data,
    response: response ? {
      status: response.status,
      ok: response.ok,
      statusText: response.statusText,
      url: response.url,
      headers: response.headers ? Object.fromEntries(response.headers.entries()) : null
    } : null,
    error: error ? {
      message: error.message,
      stack: error.stack,
      name: error.name
    } : null,
    environment: {
      userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : 'unknown',
      url: typeof window !== 'undefined' ? window.location.href : 'unknown',
      referrer: typeof document !== 'undefined' ? document.referrer : 'unknown'
    }
  };

  // Log to console with styling
  if (error) {
    console.error(`❌ [${formName}] Form submission failed:`, debugInfo);
  } else if (response && !response.ok) {
    console.warn(`⚠️ [${formName}] Form submission returned error:`, debugInfo);
  } else {
    console.log(`✅ [${formName}] Form submission successful:`, debugInfo);
  }

  // Also store in sessionStorage for debugging
  if (typeof window !== 'undefined' && window.sessionStorage) {
    const logs = JSON.parse(window.sessionStorage.getItem('formDebugLogs') || '[]');
    logs.push(debugInfo);
    // Keep only last 10 logs
    if (logs.length > 10) {
      logs.shift();
    }
    window.sessionStorage.setItem('formDebugLogs', JSON.stringify(logs));
  }

  return debugInfo;
};

// Function to get all form debug logs
export const getFormDebugLogs = () => {
  if (typeof window !== 'undefined' && window.sessionStorage) {
    return JSON.parse(window.sessionStorage.getItem('formDebugLogs') || '[]');
  }
  return [];
};

// Function to clear form debug logs
export const clearFormDebugLogs = () => {
  if (typeof window !== 'undefined' && window.sessionStorage) {
    window.sessionStorage.removeItem('formDebugLogs');
  }
};

// Enhanced fetch wrapper with debugging
export const debugFetch = async (url, options = {}) => {
  console.log(`🔍 Making API call to: ${url}`);
  console.log('📦 Request options:', options);
  
  try {
    const response = await fetch(url, options);
    console.log(`📨 Response status: ${response.status} ${response.statusText}`);
    
    if (!response.ok) {
      console.error(`❌ API error response:`, {
        status: response.status,
        statusText: response.statusText,
        url: response.url
      });
    }
    
    return response;
  } catch (error) {
    console.error(`❌ Network error calling ${url}:`, error);
    throw error;
  }
};