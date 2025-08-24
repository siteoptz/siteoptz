#!/usr/bin/env node

// Test GoHighLevel API integration
require('dotenv').config({ path: '.env.local' });

const GHL_API_KEY = process.env.GHL_API_KEY || '';
const GHL_LOCATION_ID = process.env.GHL_LOCATION_ID || '';
const GHL_API_BASE = 'https://rest.gohighlevel.com/v1';

console.log('Testing GoHighLevel API Integration');
console.log('===================================');
console.log('API Key exists:', !!GHL_API_KEY);
console.log('API Key length:', GHL_API_KEY.length);
console.log('Location ID:', GHL_LOCATION_ID);
console.log('API Base URL:', GHL_API_BASE);
console.log('');

async function testGoHighLevel() {
  try {
    console.log('Testing API connection...');
    
    // Test 1: Check API authentication by getting location info
    console.log('Test 1: Getting location info...');
    const locationResponse = await fetch(`${GHL_API_BASE}/locations/${GHL_LOCATION_ID}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${GHL_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    console.log('Location API Status:', locationResponse.status);
    if (!locationResponse.ok) {
      const errorText = await locationResponse.text();
      console.error('Location API Error:', errorText);
    } else {
      const locationData = await locationResponse.json();
      console.log('Location Name:', locationData.name || 'Unknown');
    }
    console.log('');

    // Test 2: Check contacts endpoint structure
    console.log('Test 2: Testing contacts endpoint...');
    const testContactData = {
      firstName: 'Test',
      lastName: 'User',
      email: `test-${Date.now()}@example.com`,
      phone: '',
      tags: ['New Lead', 'API Test'],
      customField: {
        company: 'Test Company',
        source: 'API Test',
      },
      locationId: GHL_LOCATION_ID,
    };

    console.log('Sending test contact data:', JSON.stringify(testContactData, null, 2));

    const contactResponse = await fetch(`${GHL_API_BASE}/contacts/`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GHL_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testContactData),
    });

    console.log('Contact API Status:', contactResponse.status);
    const responseText = await contactResponse.text();
    
    if (!contactResponse.ok) {
      console.error('Contact API Error:', responseText);
      
      // Try to parse as JSON for better error info
      try {
        const errorData = JSON.parse(responseText);
        console.error('Parsed Error:', JSON.stringify(errorData, null, 2));
      } catch (e) {
        console.error('Raw Error Response:', responseText);
      }
    } else {
      try {
        const contactData = JSON.parse(responseText);
        console.log('✅ Success! Contact created with ID:', contactData.id);
        console.log('Contact data:', JSON.stringify(contactData, null, 2));
      } catch (e) {
        console.log('✅ Success! Raw response:', responseText);
      }
    }

  } catch (error) {
    console.error('Test failed with error:', error);
  }
}

// Run the test
testGoHighLevel()
  .then(() => console.log('\nTest completed'))
  .catch(err => console.error('\nTest failed:', err));