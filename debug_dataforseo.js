const https = require('https');

// DataForSEO API credentials
const DATAFORSEO_USERNAME = 'antonio@siteoptz.com';
const DATAFORSEO_PASSWORD = '8215cb0ce338b385';

// Function to test DataForSEO API
async function testDataForSEO() {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({
      keywords: ['ChatGPT vs Jasper AI'],
      location_code: 2840, // United States
      language_code: "en",
      search_partners: false,
      include_serp_info: true,
      include_subdomains: true
    });

    const options = {
      hostname: 'api.dataforseo.com',
      port: 443,
      path: '/v3/keywords_data/google/keyword_suggestions',
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + Buffer.from(DATAFORSEO_USERNAME + ':' + DATAFORSEO_PASSWORD).toString('base64'),
        'Content-Type': 'application/json',
        'Content-Length': data.length
      }
    };

    console.log('🔍 Making API request to DataForSEO...');
    console.log('📊 Request data:', data);
    console.log('🔑 Authorization:', 'Basic ' + Buffer.from(DATAFORSEO_USERNAME + ':' + DATAFORSEO_PASSWORD).toString('base64'));

    const req = https.request(options, (res) => {
      console.log('📡 Response status:', res.statusCode);
      console.log('📡 Response headers:', res.headers);
      
      let responseData = '';
      
      res.on('data', (chunk) => {
        responseData += chunk;
      });
      
      res.on('end', () => {
        console.log('📄 Raw response data:', responseData.substring(0, 1000));
        
        try {
          const result = JSON.parse(responseData);
          console.log('✅ Parsed JSON response:');
          console.log(JSON.stringify(result, null, 2));
          resolve(result);
        } catch (error) {
          console.error('❌ Error parsing JSON:', error.message);
          reject(error);
        }
      });
    });

    req.on('error', (error) => {
      console.error('❌ Request error:', error.message);
      reject(error);
    });

    req.write(data);
    req.end();
  });
}

// Main function
async function main() {
  console.log('🚀 Testing DataForSEO API Connection\n');
  
  try {
    const result = await testDataForSEO();
    console.log('\n✅ API test completed successfully!');
  } catch (error) {
    console.error('\n❌ API test failed:', error.message);
  }
}

main().catch(console.error);
