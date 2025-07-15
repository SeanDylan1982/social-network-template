const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

// Import routes
// Import routes
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const commentRoutes = require('./routes/commentRoutes');

// Import middleware
const errorHandler = require('./middleware/errorHandler');

// Import database connection
const connectDB = require('./config/db');

// Initialize Express app
const app = express();

// Simple logging function
const log = (...args) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}]`, ...args);
};

// Ensure logs directory exists (commented out as it's not being used)
// const logDir = path.join(__dirname, '..', 'logs');
// if (!fs.existsSync(logDir)) {
//   fs.mkdirSync(logDir, { recursive: true });
// }

// Create a write stream for logging (commented out as it's not being used)
// const logStream = fs.createWriteStream(path.join(logDir, 'server.log'), { flags: 'a' });

// Middleware
app.use(express.json());

// Configure CORS
const corsOptions = {
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204
};
app.use(cors(corsOptions));
app.use(morgan('dev'));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);

// Error handling middleware
app.use(errorHandler);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, error: 'Not Found' });
});

const startServer = async (port = 5050) => {
  try {
    // Connect to MongoDB
    await connectDB();

    // Middleware
    app.use(express.json());
    app.use(cors({
      origin: process.env.CLIENT_URL || 'http://localhost:3000',
      credentials: true
    }));

    // Logging
    if (process.env.NODE_ENV === 'development') {
      app.use(morgan('dev'));
    }

    // Create HTTP server
    const http = require('http');
    const server = http.createServer(app);

    // Start the server
    return new Promise((resolve, reject) => {
      const onError = (error) => {
        if (error.code === 'EADDRINUSE') {
          log(`Port ${port} is already in use, trying next port...`);
          server.close(() => {
            startServer(port + 1).then(resolve).catch(reject);
          });
        } else {
          log('Server error:', error);
          reject(error);
        }
      };

      server.on('error', onError);

      server.listen(port, '0.0.0.0', () => {
        log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`);
        log(`API Documentation: http://localhost:${port}/api-docs`);
        log(`Health check: http://localhost:${port}/api/health`);
        
        // Test if we can actually accept connections
        const net = require('net');
        const testSocket = new net.Socket();
        
        testSocket.on('error', (err) => {
          log(`Port ${port} is not accessible: ${err.message}`);
          server.close(() => {
            log(`Trying next port (${port + 1})...`);
            startServer(port + 1).then(resolve).catch(reject);
          });
        });
        
        testSocket.connect(port, '127.0.0.1', () => {
          log(`Server is confirmed to be accepting TCP connections on port ${port}`);
          testSocket.destroy();
          resolve(server);
        });
      });
    });
  } catch (error) {
    log('Failed to start server:', error);
    process.exit(1);
  }
};

// Start the server with the configured port or default to 5050
const PORT = parseInt(process.env.PORT || '5050', 10);

// Log environment variables for debugging
log('Environment variables:');
log(`- PORT: ${process.env.PORT || '5050 (default)'}`);
log(`- NODE_ENV: ${process.env.NODE_ENV || 'development (default)'}`);
log(`- MONGO_URI: ${process.env.MONGO_URI ? '*** (hidden for security) ***' : 'Not set!'}`);

log(`\nStarting server on port ${PORT}...`);

startServer(PORT).then(server => {
  log(`Server successfully started and listening on port ${PORT}`);
  log(`API Documentation: http://localhost:${PORT}/api-docs`);
  log(`Health check: http://localhost:${PORT}/api/health`);
}).catch((error) => {
  log('Fatal error starting server:');
  console.error(error);
  process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  log('Uncaught Exception:', error);
  process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  log('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});
