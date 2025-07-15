const mongoose = require('mongoose');
require('dotenv').config();

// Log the MongoDB URI being used
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/social-network';
console.log('Connecting to MongoDB at:', mongoUri);

// Connect to MongoDB
mongoose.connect(mongoUri)
  .then(() => {
    console.log('Successfully connected to MongoDB');
    
    // List all collections in the database
    mongoose.connection.db.listCollections().toArray((err, collections) => {
      if (err) {
        console.error('Error listing collections:', err);
        process.exit(1);
      }
      
      console.log('Collections in database:');
      if (collections.length === 0) {
        console.log('  No collections found');
      } else {
        collections.forEach(collection => {
          console.log(`  - ${collection.name}`);
        });
      }
      
      mongoose.connection.close();
    });
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);
  });
