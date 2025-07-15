const mongoose = require('mongoose');
require('dotenv').config();

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

// Check if a user exists by ID
const checkUser = async (userId) => {
  try {
    const User = require('./src/models/User');
    const user = await User.findById(userId).select('-password');
    
    if (user) {
      console.log('User found:');
      console.log(JSON.stringify(user, null, 2));
    } else {
      console.log('User not found');
      
      // List all users in the database
      const allUsers = await User.find({}).select('-password');
      console.log('\nAll users in database:');
      console.log(JSON.stringify(allUsers, null, 2));
    }
  } catch (error) {
    console.error('Error checking user:', error);
  } finally {
    mongoose.connection.close();
  }
};

// Get user ID from command line arguments or use the one from the JWT token
const userId = process.argv[2] || '68702e6a7813be341c2a04d8';

// Run the check
connectDB().then(() => checkUser(userId));
