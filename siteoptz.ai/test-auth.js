/**
 * Test script for SiteOptz.ai authentication
 * Run this to verify the authentication is working correctly
 */

const fetch = require('node-fetch');

// Configuration
const API_URL = 'http://localhost:3000'; // Change to production URL when testing live
const TEST_EMAIL = 'test-auth@example.com'; // Use an email that exists in your GHL

async function testLogin(email, password) {
  console.log('\n🔐 Testing login for:', email);
  
  try {
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password })
    });
    
    const data = await response.json();
    
    console.log('Response status:', response.status);
    console.log('Response data:', JSON.stringify(data, null, 2));
    
    if (data.success) {
      console.log('✅ Login successful!');
      console.log('   User email:', data.user.email);
      console.log('   User plan:', data.user.plan);
      console.log('   Redirect URL:', data.redirectUrl);
    } else {
      console.log('❌ Login failed:', data.message);
      if (data.error === 'user_not_found') {
        console.log('   → User should be redirected to register');
      }
    }
    
    return data;
  } catch (error) {
    console.error('❌ Error during login:', error.message);
    return null;
  }
}

async function testRegister(name, email, password, plan = 'free') {
  console.log('\n📝 Testing registration for:', email);
  
  try {
    const response = await fetch(`${API_URL}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password, plan })
    });
    
    const data = await response.json();
    
    console.log('Response status:', response.status);
    console.log('Response data:', JSON.stringify(data, null, 2));
    
    if (data.success) {
      console.log('✅ Registration successful!');
      console.log('   User email:', data.user.email);
      console.log('   User plan:', data.user.plan);
      console.log('   Redirect URL:', data.redirectUrl);
    } else {
      console.log('❌ Registration failed:', data.message);
      if (data.error === 'user_exists') {
        console.log('   → User should be redirected to login');
      }
    }
    
    return data;
  } catch (error) {
    console.error('❌ Error during registration:', error.message);
    return null;
  }
}

async function runTests() {
  console.log('========================================');
  console.log('  SiteOptz.ai Authentication Tests');
  console.log('========================================');
  
  // Test 1: Login with existing user
  console.log('\n--- Test 1: Login with existing user ---');
  await testLogin('test-auth@example.com', 'password123');
  
  // Test 2: Login with non-existent user
  console.log('\n--- Test 2: Login with non-existent user ---');
  await testLogin('nonexistent@example.com', 'password123');
  
  // Test 3: Register new user
  console.log('\n--- Test 3: Register new user ---');
  const timestamp = Date.now();
  await testRegister(
    'Test User',
    `test-${timestamp}@example.com`,
    'password123',
    'pro'
  );
  
  // Test 4: Register existing user
  console.log('\n--- Test 4: Register with existing email ---');
  await testRegister(
    'Test User',
    'test-auth@example.com',
    'password123',
    'pro'
  );
  
  console.log('\n========================================');
  console.log('  Tests Complete');
  console.log('========================================');
  console.log('\nCheck the console output above to verify:');
  console.log('1. Existing users get their correct plan');
  console.log('2. Non-existent users get user_not_found error');
  console.log('3. New registrations create contacts in GHL');
  console.log('4. Duplicate registrations get user_exists error');
}

// Run tests
runTests().catch(console.error);