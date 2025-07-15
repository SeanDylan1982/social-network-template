const http = require('http');
const assert = require('assert').strict;

const PORT = process.env.PORT || 5001;
const BASE_URL = `http://localhost:${PORT}/api`;

function testEndpoint(method, path, expectedStatus, data = null) {
  return new Promise((resolve) => {
    const options = {
      hostname: 'localhost',
      port: PORT,
      path: `/api${path}`,
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        console.log(`TEST ${method} ${path} - Status: ${res.statusCode}`);
        if (res.statusCode !== expectedStatus) {
          console.error(`  ❌ Expected ${expectedStatus}, got ${res.statusCode}`);
          console.error(`  Response: ${data}`);
          process.exit(1);
        } else {
          console.log(`  ✅ Passed`);
        }
        resolve();
      });
    });

    req.on('error', (error) => {
      console.error(`  ❌ Request failed: ${error.message}`);
      process.exit(1);
    });

    if (data) {
      req.write(JSON.stringify(data));
    }
    req.end();
  });
}

async function runTests() {
  try {
    console.log('Starting API tests...');
    
    // Test health check endpoint
    await testEndpoint('GET', '/health', 200);
    
    // Test non-existent endpoint (should return 404)
    await testEndpoint('GET', '/nonexistent', 404);
    
    // Test user registration with invalid data (should return 400)
    await testEndpoint('POST', '/users/register', 400, {
      username: '',
      email: 'invalid-email',
      password: 'short'
    });
    
    console.log('✅ All tests passed!');
  } catch (error) {
    console.error('❌ Test failed:', error);
    process.exit(1);
  }
}

runTests();
