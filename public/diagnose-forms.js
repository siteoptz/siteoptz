// Form Diagnostics Script - Run this in browser console on live site
// Copy and paste this entire script into the browser console

(function() {
  console.log('🔍 SITEOPTZ FORM DIAGNOSTICS');
  console.log('============================\n');
  
  // Check current URL
  console.log('📍 Current URL:', window.location.href);
  console.log('🌐 Host:', window.location.host);
  console.log('🔒 Protocol:', window.location.protocol);
  
  // Check for jQuery (might interfere)
  console.log('\n📚 Libraries:');
  console.log('jQuery loaded:', typeof jQuery !== 'undefined' ? jQuery.fn.jquery : 'No');
  console.log('React loaded:', typeof React !== 'undefined' ? 'Yes' : 'No');
  
  // Test API endpoints
  console.log('\n🧪 Testing API Endpoints...\n');
  
  const testAPIs = async () => {
    const apis = [
      '/api/subscribe',
      '/api/email-capture',
      '/api/expert-consultation',
      '/api/download-guide'
    ];
    
    for (const api of apis) {
      try {
        console.log(`Testing ${api}...`);
        const response = await fetch(api, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ test: true })
        });
        
        if (response.ok) {
          console.log(`✅ ${api} - Reachable (${response.status})`);
        } else {
          console.log(`⚠️ ${api} - Error (${response.status} ${response.statusText})`);
          try {
            const errorBody = await response.json();
            console.log('   Error details:', errorBody);
          } catch (e) {
            console.log('   Could not parse error response');
          }
        }
      } catch (error) {
        console.error(`❌ ${api} - Network error:`, error.message);
      }
    }
  };
  
  // Check for form elements
  console.log('\n📝 Checking for forms...');
  const forms = document.querySelectorAll('form');
  console.log(`Found ${forms.length} form(s) on page`);
  
  forms.forEach((form, index) => {
    console.log(`Form ${index + 1}:`, {
      action: form.action || 'No action',
      method: form.method || 'No method',
      id: form.id || 'No ID',
      className: form.className || 'No class'
    });
  });
  
  // Check for buttons that might trigger modals
  console.log('\n🔘 Checking for modal triggers...');
  const modalButtons = document.querySelectorAll('button');
  let newsletterButton = null;
  let expertButton = null;
  let guideButton = null;
  
  modalButtons.forEach(button => {
    const text = button.textContent.toLowerCase();
    if (text.includes('newsletter') || text.includes('subscribe')) {
      newsletterButton = button;
      console.log('📧 Found newsletter button:', button.textContent.trim());
    }
    if (text.includes('expert') || text.includes('consultation')) {
      expertButton = button;
      console.log('👨‍💼 Found expert button:', button.textContent.trim());
    }
    if (text.includes('guide') || text.includes('download')) {
      guideButton = button;
      console.log('📄 Found guide button:', button.textContent.trim());
    }
  });
  
  // Override fetch to log all API calls
  console.log('\n🎯 Installing fetch interceptor...');
  const originalFetch = window.fetch;
  window.fetch = function(...args) {
    console.log('🔍 Fetch intercepted:', {
      url: args[0],
      options: args[1]
    });
    
    return originalFetch.apply(this, args).then(response => {
      console.log(`📨 Response for ${args[0]}:`, {
        status: response.status,
        ok: response.ok,
        statusText: response.statusText
      });
      return response;
    }).catch(error => {
      console.error(`❌ Fetch error for ${args[0]}:`, error);
      throw error;
    });
  };
  console.log('✅ Fetch interceptor installed - all API calls will be logged');
  
  // Test the APIs
  testAPIs().then(() => {
    console.log('\n✅ Diagnostics complete!');
    console.log('\n💡 Next steps:');
    console.log('1. Try submitting a form and watch the console');
    console.log('2. Look for any red error messages');
    console.log('3. Check if API calls are being made');
    console.log('4. If no API calls appear, the form is not submitting properly');
  });
  
  // Return diagnostic info
  return {
    url: window.location.href,
    host: window.location.host,
    protocol: window.location.protocol,
    forms: forms.length,
    hasNewsletterButton: !!newsletterButton,
    hasExpertButton: !!expertButton,
    hasGuideButton: !!guideButton
  };
})();