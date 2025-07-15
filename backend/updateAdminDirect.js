const { MongoClient } = require('mongodb');

// MongoDB connection string
const uri = 'mongodb+srv://admin:7I0BRLl13kzcWhD0@cluster0.rmvbh7u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const client = new MongoClient(uri);

async function updateAdmin() {
  try {
    // Connect to MongoDB
    await client.connect();
    console.log('✅ Successfully connected to MongoDB');

    // Get the database and collection
    const database = client.db('social_network');
    const users = database.collection('users');

    // Update the user
    const result = await users.updateOne(
      { email: 'seanpatterson.work@gmail.com' },
      {
        $set: {
          isAdmin: true,
          role: 'admin',
          status: 'active'
        }
      }
    );

    console.log('Update result:', JSON.stringify(result, null, 2));

    if (result.matchedCount === 0) {
      console.log('❌ No user found with the specified email.');
    } else if (result.modifiedCount === 0) {
      console.log('ℹ️ User found but no changes were made (user already has these values).');
    } else {
      console.log('✅ Successfully updated user to admin.');
    }

    // Verify the update
    const updatedUser = await users.findOne({ email: 'seanpatterson.work@gmail.com' });
    console.log('\nUpdated user details:', {
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      role: updatedUser.role,
      isAdmin: updatedUser.isAdmin,
      status: updatedUser.status
    });

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    // Close the connection
    await client.close();
  }
}

// Run the function
updateAdmin();
