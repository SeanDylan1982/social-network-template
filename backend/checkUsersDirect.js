const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables from .env file
const envPath = path.resolve(__dirname, '.env');
dotenv.config({ path: envPath });

// Direct connection string from .env
const mongoUri = 'mongodb+srv://admin:7I0BRLl13kzcWhD0@cluster0.rmvbh7u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Masked version for logging
const maskedUri = mongoUri.replace(/:([^:]+)@/, ':*****@');
console.log('Connecting to MongoDB at:', maskedUri);

// Connect to MongoDB
mongoose.connect(mongoUri)
  .then(() => {
    console.log('✅ Successfully connected to MongoDB');
    
    // Import the User model
    const User = require('./src/models/User');
    
    // List all users
    User.find({}).select('-password').lean()
      .then(users => {
        console.log('\n📋 Users in database:');
        if (users.length === 0) {
          console.log('No users found in the database.');
        } else {
          users.forEach((user, index) => {
            console.log(`\n👤 User #${index + 1}:`);
            console.log(`   ID: ${user._id}`);
            console.log(`   Username: ${user.username}`);
            console.log(`   Email: ${user.email}`);
            console.log(`   Name: ${user.name}`);
            console.log(`   Role: ${user.role || 'not set'}`);
            console.log(`   isAdmin: ${user.isAdmin || false}`);
            console.log(`   Status: ${user.status || 'active'}`);
          });
        }
        
        // Check for admin users
        return User.findOne({ $or: [{ isAdmin: true }, { role: 'admin' }] });
      })
      .then(adminUser => {
        console.log('\n🔍 Admin user check:');
        if (adminUser) {
          console.log('✅ Found admin user:');
          console.log(`   Username: ${adminUser.username}`);
          console.log(`   Email: ${adminUser.email}`);
          console.log(`   Role: ${adminUser.role || 'not set'}`);
          console.log(`   isAdmin: ${adminUser.isAdmin || false}`);
        } else {
          console.log('❌ No admin user found in the database.');
        }
        
        process.exit(0);
      })
      .catch(err => {
        console.error('❌ Error fetching users:', err);
        process.exit(1);
      });
  })
  .catch(err => {
    console.error('❌ Error connecting to MongoDB:', err);
    process.exit(1);
  });
