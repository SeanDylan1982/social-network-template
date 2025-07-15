const axios = require('axios');

// Start with port 5050
let currentPort = 5050;
const MAX_RETRIES = 5;
let retryCount = 0;

const getBaseUrl = () => `http://localhost:${currentPort}/api`;

// Helper function to make API requests
const makeRequest = async (method, endpoint, data = null, token = null, retry = true) => {
  const config = {
    method,
    url: `${getBaseUrl()}${endpoint}`,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  if (data) {
    config.data = data;
  }

  // Log the request details
  console.log('\n--- Making Request ---');
  console.log(`${method.toUpperCase()} ${config.url}`);
  console.log('Headers:', JSON.stringify(config.headers, null, 2));
  if (data) {
    console.log('Body:', JSON.stringify(data, null, 2));
  }

  try {
    const response = await axios(config);
    // Log the successful response
    console.log('\n--- Response ---');
    console.log(`Status: ${response.status} ${response.statusText}`);
    console.log('Headers:', JSON.stringify(response.headers, null, 2));
    console.log('Data:', JSON.stringify(response.data, null, 2));
    return response;
  } catch (error) {
    // Handle ECONNREFUSED by trying the next port
    if (error.code === 'ECONNREFUSED' && retry && retryCount < MAX_RETRIES) {
      retryCount++;
      currentPort++;
      console.log(`\n⚠️  Connection refused on port ${currentPort - 1}, trying port ${currentPort}... (Attempt ${retryCount}/${MAX_RETRIES})`);
      return makeRequest(method, endpoint, data, token, false);
    }
    
    // Log the error response
    if (error.response) {
      console.log('\n--- Error Response ---');
      console.log(`Status: ${error.response.status} ${error.response.statusText}`);
      console.log('Headers:', JSON.stringify(error.response.headers, null, 2));
      console.log('Data:', JSON.stringify(error.response.data, null, 2));
      return error.response;
    }
    // Log other errors
    console.error('\n--- Request Error ---');
    console.error(error.message);
    throw error;
  }
};

// Test data
const testUser = {
  username: `testuser_${Date.now()}`,
  email: `test_${Date.now()}@example.com`,
  password: 'Test@1234',
  name: 'Test User'
};

let authToken = null;

async function runTests() {
  console.log('Starting API endpoint tests...\n');

  // 1. Test health check
  console.log('1. Testing health check endpoint...');
  let response = await makeRequest('get', '/health');
  console.log(`   Status: ${response.status} - ${response.statusText}`);
  console.log('   Response:', response.data);
  console.log();

  // 2. Test user registration
  console.log('2. Testing user registration...');
  response = await makeRequest('post', '/users/register', testUser);
  console.log(`   Status: ${response.status} - ${response.statusText}`);
  if (response.status === 201) {
    console.log('   ✅ User registered successfully');
  } else {
    console.log('   ❌ Registration failed:', response.data);
  }
  console.log();

  // 3. Test user login
  console.log('3. Testing user login...');
  try {
    response = await makeRequest('post', '/users/login', {
      email: testUser.email,
      password: testUser.password
    });
    
    console.log(`   Status: ${response.status} - ${response.statusText}`);
    
    if (response.status === 200) {
      authToken = response.data.token;
      console.log('   ✅ Login successful');
      console.log('   Token received');
      
      // Decode the token to see its contents
      const jwt = require('jsonwebtoken');
      const decoded = jwt.decode(authToken);
      console.log('   Decoded token:', decoded);
      
      // Store the user ID from the token for later use
      testUser.id = decoded.id;
    } else {
      console.log('   ❌ Login failed:', response.data);
      return; // Stop further tests if login fails
    }
  } catch (error) {
    console.error('   ❌ Error during login:', error.message);
    if (error.response) {
      console.error('   Response data:', error.response.data);
      console.error('   Response status:', error.response.status);
      console.error('   Response headers:', error.response.headers);
    }
    return; // Stop further tests if there's an error
  }
  console.log();

  // 4. Test getting current user profile (protected route)
  if (authToken) {
    console.log('\n4. Testing protected route (get current user by ID)...');
    
    try {
      // First, get the user by username since we don't have a direct ID endpoint
      const username = testUser.username;
      console.log(`   Getting user with username: ${username}`);
      
      response = await makeRequest('get', `/users/${username}`, null, authToken);
      console.log(`   Status: ${response.status} - ${response.statusText}`);
      
      if (response.status === 200) {
        console.log('   ✅ Successfully retrieved user profile by username');
        console.log('   User:', JSON.stringify(response.data, null, 2));
      } else {
        console.log('   ❌ Failed to get user profile by username:', response.data);
      }
    } catch (error) {
      console.error('   ❌ Error getting user by ID:', error.message);
      if (error.response) {
        console.error('   Response data:', error.response.data);
      }
    }
    
    // 5. Test the /me endpoint
    console.log('\n5. Testing /me endpoint...');
    try {
      const meResponse = await makeRequest('get', '/users/me', null, authToken);
      console.log(`   Status: ${meResponse.status} - ${meResponse.statusText}`);
      
      if (meResponse.status === 200) {
        console.log('   ✅ Successfully retrieved current user profile');
        console.log('   Current User:', JSON.stringify(meResponse.data, null, 2));
      } else {
        console.log('   ❌ Failed to get current user profile:', meResponse.data);
      }
    } catch (error) {
      console.error('   ❌ Error in /me endpoint:', error.message);
      if (error.response) {
        console.error('   Response data:', error.response.data);
      }
    }
  } else {
    console.log('4. Skipping protected route test - no auth token');
  }
  console.log('\nTests completed!');
}

// Run the tests
runTests().catch(console.error);
