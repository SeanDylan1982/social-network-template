const http = require('http');

const options = {
  hostname: 'localhost',
  port: 5001,
  path: '/api/health',
  method: 'GET',
  timeout: 5000
};

const req = http.request(options, (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  console.log('HEADERS:', JSON.stringify(res.headers));
  
  res.setEncoding('utf8');
  res.on('data', (chunk) => {
    console.log('BODY:', chunk);
  });
  
  res.on('end', () => {
    console.log('No more data in response.');
  });
});

req.on('error', (e) => {
  console.error(`Problem with request: ${e.message}`);
  console.error('Error details:', e);
});

req.on('timeout', () => {
  console.error('Request timed out');
  req.destroy();
});

console.log('Sending request...');
req.end();
