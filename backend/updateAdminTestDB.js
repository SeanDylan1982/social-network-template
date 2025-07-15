const { MongoClient } = require('mongodb');

// MongoDB connection string
const uri = 'mongodb+srv://admin:7I0BRLl13kzcWhD0@cluster0.rmvbh7u.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0';
const client = new MongoClient(uri);

async function updateAdmin() {
  try {
    // Connect to MongoDB
    await client.connect();
    console.log('✅ Successfully connected to MongoDB');

    // Get the database and collection
    const database = client.db('test');
    const users = database.collection('users');

    // First, check if the user exists
    const user = await users.findOne({ email: 'seanpatterson.work@gmail.com' });
    
    if (!user) {
      console.log('❌ User not found with email: seanpatterson.work@gmail.com');
      return;
    }

    console.log('\n👤 Found user:', {
      _id: user._id,
      username: user.username,
      email: user.email,
      currentRole: user.role,
      currentIsAdmin: user.isAdmin,
      currentStatus: user.status
    });

    // Update the user
    const result = await users.updateOne(
      { _id: user._id },
      {
        $set: {
          isAdmin: true,
          role: 'admin',
          status: 'active',
          updatedAt: new Date()
        }
      }
    );

    console.log('\n📝 Update result:', {
      matchedCount: result.matchedCount,
      modifiedCount: result.modifiedCount,
      acknowledged: result.acknowledged
    });

    if (result.matchedCount === 0) {
      console.log('❌ No user found with the specified ID.');
    } else if (result.modifiedCount === 0) {
      console.log('ℹ️ User found but no changes were made (user already has these values).');
    } else {
      console.log('✅ Successfully updated user to admin.');
    }

    // Verify the update
    const updatedUser = await users.findOne({ _id: user._id });
    console.log('\n🔍 Updated user details:', {
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      role: updatedUser.role,
      isAdmin: updatedUser.isAdmin,
      status: updatedUser.status,
      updatedAt: updatedUser.updatedAt
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
