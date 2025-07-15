const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, '.env') });

// Direct connection string
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
    
    // Update the admin user
    const adminEmail = 'seanpatterson.work@gmail.com';
    
    User.findOneAndUpdate(
      { email: adminEmail },
      { 
        $set: { 
          isAdmin: true,
          role: 'admin',
          status: 'active'
        } 
      },
      { new: true }
    )
    .then(updatedUser => {
      if (!updatedUser) {
        console.log(`❌ User with email ${adminEmail} not found.`);
        process.exit(1);
      }
      
      console.log('✅ Successfully updated user to admin:');
      console.log({
        _id: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email,
        role: updatedUser.role,
        isAdmin: updatedUser.isAdmin,
        status: updatedUser.status
      });
      
      process.exit(0);
    })
    .catch(err => {
      console.error('❌ Error updating user:', err);
      process.exit(1);
    });
  })
  .catch(err => {
    console.error('❌ Error connecting to MongoDB:', err);
    process.exit(1);
  });
