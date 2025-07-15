const { MongoClient } = require('mongodb');

// MongoDB connection string
const uri = 'mongodb+srv://admin:7I0BRLl13kzcWhD0@cluster0.rmvbh7u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const client = new MongoClient(uri);

async function listDatabases() {
  try {
    // Connect to MongoDB
    await client.connect();
    console.log('✅ Successfully connected to MongoDB');

    // List all databases
    const adminDb = client.db().admin();
    const dbList = await adminDb.listDatabases();
    
    console.log('\n📂 Databases:');
    dbList.databases.forEach(db => {
      console.log(`- ${db.name}`);
    });

    // For each database, list collections
    for (const dbInfo of dbList.databases) {
      const db = client.db(dbInfo.name);
      const collections = await db.listCollections().toArray();
      
      console.log(`\n📁 Collections in ${dbInfo.name}:`);
      if (collections.length === 0) {
        console.log('  No collections found');
      } else {
        collections.forEach(collection => {
          console.log(`  - ${collection.name}`);
        });
      }
    }

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    // Close the connection
    await client.close();
  }
}

// Run the function
listDatabases();
