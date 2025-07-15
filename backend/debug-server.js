const http = require('http');
const PORT = 5003; // Using a different port to test

const server = http.createServer((req, res) => {
  console.log(`Received request for ${req.url}`);
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Debug server is working!');
});

server.on('error', (err) => {
  console.error('Server error:', err);
  process.exit(1);
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Debug server running on http://localhost:${PORT}`);
  
  // Test if we can connect to ourselves
  const net = require('net');
  const client = new net.Socket();
  
  client.on('error', (err) => {
    console.error('Failed to connect to debug server:', err);
    process.exit(1);
  });
  
  client.on('data', (data) => {
    console.log('Received data from debug server:', data.toString());
    client.end();
  });
  
  client.connect(PORT, '127.0.0.1', () => {
    console.log('Successfully connected to debug server!');
    client.write('TEST');
  });
});

// Handle process termination
process.on('SIGINT', () => {
  console.log('Shutting down debug server...');
  server.close(() => {
    console.log('Debug server closed');
    process.exit(0);
  });
});
