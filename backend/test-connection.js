const net = require('net');
const http = require('http');

const TEST_PORT = 5004; // Using a different port for testing

// Create a simple HTTP server for testing
const server = http.createServer((req, res) => {
  console.log(`Received ${req.method} request for ${req.url}`);
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Test server response');
});

// Start the test server
server.listen(TEST_PORT, '0.0.0.0', () => {
  console.log(`Test server listening on port ${TEST_PORT}`);
  
  // Test connection to the test server
  testConnection('127.0.0.1', TEST_PORT, 'Test Server');
  
  // Also test the main server
  testConnection('127.0.0.1', 5001, 'Main Server');
});

// Function to test a TCP connection
function testConnection(host, port, name) {
  console.log(`\nTesting connection to ${name} (${host}:${port})...`);
  
  const socket = new net.Socket();
  const timeout = 5000; // 5 seconds timeout
  
  // Set up a connection timeout
  const connectionTimer = setTimeout(() => {
    console.error(`  ❌ ${name} connection timed out after ${timeout}ms`);
    socket.destroy();
  }, timeout);
  
  socket.on('connect', () => {
    clearTimeout(connectionTimer);
    console.log(`  ✅ Successfully connected to ${name} on port ${port}`);
    
    // If this is the test server, send an HTTP request
    if (port === TEST_PORT) {
      const req = http.get(`http://${host}:${port}`, (res) => {
        console.log(`  ✅ Received HTTP ${res.statusCode} from ${name}`);
        process.exit(0);
      });
      
      req.on('error', (err) => {
        console.error(`  ❌ HTTP request to ${name} failed:`, err.message);
        process.exit(1);
      });
    } else {
      // For the main server, just test the TCP connection
      socket.end();
    }
  });
  
  socket.on('error', (err) => {
    clearTimeout(connectionTimer);
    console.error(`  ❌ Failed to connect to ${name}:`, err.message);
    if (err.code === 'ECONNREFUSED') {
      console.error('  ℹ️  Connection was refused. The server might not be running or is not accepting connections.');
    }
    if (port !== TEST_PORT) process.exit(1);
  });
  
  socket.connect(port, host);
}

// Handle process termination
process.on('SIGINT', () => {
  console.log('\nShutting down test server...');
  server.close(() => {
    console.log('Test server closed');
    process.exit(0);
  });
});
