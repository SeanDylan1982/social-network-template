const mongoose = require('mongoose');
require('dotenv').config();

// Log the MongoDB URI being used (masking the password for security)
const mongoUri = process.env.MONGODB_URI;
const maskedUri = mongoUri ? mongoUri.replace(/:([^:]+)@/, ':*****@') : 'not set';
console.log('Connecting to MongoDB at:', maskedUri);

// Connect to MongoDB
mongoose.connect(mongoUri)
  .then(() => console.log('Successfully connected to MongoDB'))
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);
  });

// Import the User model
const User = require('./src/models/User');

// Admin user data
const adminUser = {
  _id: '687038374e9b0e3fdc2043fa',
  username: 'SeanDylan1982',
  email: 'seanpatterson.work@gmail.com',
  password: '$2a$10$81htJbbIOwJAXV4YyDTll.8FbAJZlezgLCUy3ir6fLmU6ODtGugmW',
  name: 'Sean Patterson',
  role: 'admin',
  isAdmin: true,
  isVerified: true,
  status: 'active',
  lastActive: new Date()
};

async function createAdminUser() {
  try {
    // Check if admin user already exists by ID
    const existingAdminById = await User.findById(adminUser._id);
    
    if (existingAdminById) {
      console.log('Admin user with this ID already exists:');
      console.log({
        _id: existingAdminById._id,
        username: existingAdminById.username,
        email: existingAdminById.email,
        role: existingAdminById.role,
        isAdmin: existingAdminById.isAdmin
      });
      process.exit(0);
    }
    
    // Also check by email and username to be thorough
    const existingAdminByEmail = await User.findOne({ email: adminUser.email });
    if (existingAdminByEmail) {
      console.log('Admin user with this email already exists:');
      console.log({
        _id: existingAdminByEmail._id,
        username: existingAdminByEmail.username,
        email: existingAdminByEmail.email,
        role: existingAdminByEmail.role,
        isAdmin: existingAdminByEmail.isAdmin
      });
      process.exit(0);
    }
    
    const existingAdminByUsername = await User.findOne({ username: adminUser.username });
    if (existingAdminByUsername) {
      console.log('Admin user with this username already exists:');
      console.log({
        _id: existingAdminByUsername._id,
        username: existingAdminByUsername.username,
        email: existingAdminByUsername.email,
        role: existingAdminByUsername.role,
        isAdmin: existingAdminByUsername.isAdmin
      });
      process.exit(0);
    }

    // Create the admin user
    const user = new User(adminUser);
    await user.save();
    
    console.log('Admin user created successfully:');
    console.log({
      _id: user._id,
      username: user.username,
      email: user.email,
      name: user.name,
      role: user.role,
      isAdmin: user.isAdmin,
      status: user.status
    });
    
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin user:', error);
    process.exit(1);
  }
}

// Run the function
createAdminUser();
