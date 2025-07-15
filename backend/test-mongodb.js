const mongoose = require('mongoose');
require('dotenv').config();

async function testMongoDB() {
  try {
    console.log('Testing MongoDB connection...');
    console.log('MONGO_URI:', process.env.MONGO_URI ? 'Found (hidden for security)' : 'Not found');
    
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI is not defined in environment variables');
    }
    
    console.log('Attempting to connect to MongoDB...');
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 5000,
    });
    
    console.log('✅ MongoDB connection successful!');
    console.log(`Host: ${conn.connection.host}`);
    console.log(`Database: ${conn.connection.name}`);
    
    // List all collections
    const collections = await conn.connection.db.listCollections().toArray();
    console.log('\nCollections in database:');
    collections.forEach((collection, index) => {
      console.log(`${index + 1}. ${collection.name}`);
    });
    
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('❌ MongoDB connection error:');
    console.error(error.message);
    
    if (error.name === 'MongooseServerSelectionError') {
      console.error('\nTroubleshooting steps:');
      console.error('1. Check if your MongoDB server is running');
      console.error('2. Verify your MongoDB connection string in .env file');
      console.error('3. If using MongoDB Atlas, ensure your IP is whitelisted');
      console.error('4. Check your internet connection');
    }
    
    process.exit(1);
  }
}

testMongoDB();
