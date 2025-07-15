const mongoose = require('mongoose');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/social-network');

// Import the User model
const User = require('./src/models/User');

async function listUsers() {
  try {
    const users = await User.find({}).select('-password');
    console.log('Users in database:');
    console.log(JSON.stringify(users, null, 2));
    process.exit(0);
  } catch (error) {
    console.error('Error listing users:', error);
    process.exit(1);
  }
}

// Run the function
listUsers();
