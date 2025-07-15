const http = require('http');
const PORT = 5002; // Using a different port to test

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Test server is working!');});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Test server running on port ${PORT}`);
  
  // Test connection to self
  const net = require('net');
  const client = new net.Socket();
  
  client.on('error', (err) => {
    console.error('Failed to connect to test server:', err);
    process.exit(1);
  });
  
  client.connect(PORT, '127.0.0.1', () => {
    console.log('Successfully connected to test server!');
    client.end();
    process.exit(0);
  });
});

server.on('error', (err) => {
  console.error('Test server error:', err);
  process.exit(1);
});
