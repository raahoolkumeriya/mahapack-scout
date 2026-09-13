// Load environment variables from .env and atlas-credentials.env
require('dotenv').config();
require('dotenv').config({ path: require('path').join(__dirname, '..', 'atlas-credentials.env') });

const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');

const MONGODB_SRV = process.env.MONGODB_SRV;

if (!MONGODB_SRV) {
  console.error('❌ Error: MONGODB_SRV is not set in environment or atlas-credentials.env');
  process.exit(1);
}

const DATA_FILE = path.join(__dirname, '..', 'data', 'manufacturers.json');

async function syncManufacturersToMongo() {
  console.log('🔄 Connecting to MongoDB Atlas using MONGODB_SRV...');
  const client = new MongoClient(MONGODB_SRV);

  try {
    await client.connect();
    console.log('✅ Connected successfully to MongoDB Atlas!');

    const db = client.db('mahapack_scout');
    const collection = db.collection('manufacturers');

    // 1. Ensure indexes
    console.log('📑 Ensuring collection indexes...');
    await collection.createIndex({ id: 1 }, { unique: true });
    await collection.createIndex({ category: 1 });
    await collection.createIndex({ city: 1 });
    await collection.createIndex({
      name: "text",
      description: "text",
      products: "text",
      subCategories: "text",
      address: "text",
      industrialArea: "text",
      city: "text"
    });

    // 2. Read manufacturers.json
    if (!fs.existsSync(DATA_FILE)) {
      throw new Error(`Data file not found at ${DATA_FILE}`);
    }

    const rawData = fs.readFileSync(DATA_FILE, 'utf-8');
    const manufacturers = JSON.parse(rawData);
    console.log(`📦 Loaded ${manufacturers.length} manufacturer records from data/manufacturers.json`);

    // 3. Upsert each document
    let upsertCount = 0;
    for (const item of manufacturers) {
      if (!item.id || !item.name) continue;

      const doc = {
        ...item,
        verified: item.verified !== undefined ? item.verified : true,
        updatedAt: new Date()
      };

      await collection.updateOne(
        { id: item.id },
        { 
          $set: doc,
          $setOnInsert: { createdAt: new Date() }
        },
        { upsert: true }
      );
      upsertCount++;
    }

    const totalInDb = await collection.countDocuments();
    console.log(`\n🎉 Sync Complete!`);
    console.log(`   - Records processed from manufacturers.json: ${upsertCount}`);
    console.log(`   - Total documents in MongoDB Atlas collection: ${totalInDb}`);

    const sample = await collection.findOne({}, { projection: { name: 1, category: 1, city: 1, phone: 1, salesEmail: 1 } });
    console.log(`\n📋 Verified sample document from MongoDB Atlas:`, sample);

  } catch (err) {
    console.error('❌ Failed to sync data to MongoDB Atlas:', err);
    process.exit(1);
  } finally {
    await client.close();
  }
}

syncManufacturersToMongo();
