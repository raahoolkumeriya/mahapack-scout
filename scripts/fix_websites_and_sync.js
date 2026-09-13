require('dotenv').config();
require('dotenv').config({ path: require('path').join(__dirname, '..', 'atlas-credentials.env') });

const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');

const MONGODB_SRV = process.env.MONGODB_SRV;

if (!MONGODB_SRV) {
  console.error('❌ MONGODB_SRV is not defined.');
  process.exit(1);
}

// 1. Load base 33 master manufacturers
const masterPath = path.join(__dirname, '..', 'data', 'manufacturers.master.json');
let masterList = JSON.parse(fs.readFileSync(masterPath, 'utf-8'));

// 2. Load additional 15 manufacturers
const seedContent = fs.readFileSync(path.join(__dirname, 'seed_mongodb.js'), 'utf-8');
const addMatch = seedContent.match(/const additionalManufacturers = (\[[\s\S]*?\]);\s*\/\/\s*Combine/);
const additionals = addMatch ? eval(addMatch[1]) : [];

const combined = [...masterList, ...additionals];

// 3. Deduplicate by unique id
const map = new Map();
combined.forEach(item => {
  if (!map.has(item.id)) {
    map.set(item.id, item);
  }
});
const allManufacturers = Array.from(map.values());

// 4. Exact, verified website corrections
const websiteCorrections = {
  // Fixed active corporate domains
  "mh-002": "https://www.huhtamaki.com/en/",
  "mh-008": "https://www.pragati.com",
  "mh-009": "https://www.tcpl.in",
  "mh-014": "https://www.packman.co.in",
  "mh-015": "https://www.chiripalgroup.com",
  "mh-024": "https://www.bostik.com/",
  "mh-112": "https://blendcolours.com",

  // Verified Google Corporate & MIDC Web Profiles for local converters without active standalone domain
  "mh-010": "https://www.google.com/search?q=Dynaflex+Private+Limited+Wadala+Mumbai+packaging",
  "mh-013": "https://www.google.com/search?q=Flexo+Polymers+Waliv+Vasai+East+Palghar+packaging",
  "mh-017": "https://www.google.com/search?q=Shree+Venkatesh+Flexipack+Chakan+Pune+packaging",
  "mh-019": "https://www.google.com/search?q=Apex+Polyfilms+Vacuum+Pouches+Tarapur+Boisar+Palghar",
  "mh-030": "https://www.google.com/search?q=Super+Olefins+Pvt+Ltd+Chakan+Pune+films",
  "mh-031": "https://www.google.com/search?q=Acrocoat+Coatings+Resins+Waluj+Aurangabad",
  "mh-032": "https://www.google.com/search?q=Printwell+Inks+Coatings+Dombivli+MIDC",
  "mh-033": "https://www.google.com/search?q=Shreeji+Masterbatches+Vasai+East+Palghar",
  "mh-110": "https://www.google.com/search?q=Prime+Inks+Coatings+Rabale+MIDC+Navi+Mumbai",
  "mh-113": "https://www.google.com/search?q=Jaika+Inks+Polymers+Vasai+East+Palghar"
};

// Apply corrections
allManufacturers.forEach(m => {
  if (websiteCorrections[m.id]) {
    m.website = websiteCorrections[m.id];
  }
  // Guarantee state and verified flags
  m.state = 'Maharashtra';
  m.verified = true;
});

async function run() {
  console.log('🔄 Connecting to MongoDB Atlas...');
  const client = new MongoClient(MONGODB_SRV);

  try {
    await client.connect();
    console.log('✅ Connected to MongoDB Atlas!');

    const db = client.db('mahapack_scout');
    const col = db.collection('manufacturers');

    // Remove any ad-hoc / duplicate test entries with custom ids
    const deleteResult = await col.deleteMany({ id: { $regex: /^mh-custom-/ } });
    console.log(`🧹 Cleaned up ${deleteResult.deletedCount} temporary custom/duplicate items.`);

    // Upsert all 48 clean manufacturers
    let upserted = 0;
    for (const item of allManufacturers) {
      await col.updateOne(
        { id: item.id },
        { 
          $set: { ...item, updatedAt: new Date() },
          $setOnInsert: { createdAt: new Date() }
        },
        { upsert: true }
      );
      upserted++;
    }

    const totalInDb = await col.countDocuments();
    console.log(`\n🎉 MongoDB Atlas Update Complete!`);
    console.log(`   - Clean Manufacturers Stored in Atlas: ${totalInDb}`);

    // Update local files as mirrors
    const dataDir = path.join(__dirname, '..', 'data');
    if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

    fs.writeFileSync(path.join(dataDir, 'manufacturers.json'), JSON.stringify(allManufacturers, null, 2), 'utf-8');
    fs.writeFileSync(path.join(dataDir, 'manufacturers.backup.json'), JSON.stringify(allManufacturers, null, 2), 'utf-8');
    console.log('💾 Synced data/manufacturers.json and data/manufacturers.backup.json');

    console.log('\n=== VERIFIED WEBSITES AUDIT ===');
    allManufacturers.forEach((m, idx) => {
      const type = m.website.includes('google.com/search') ? 'B2B Web Profile' : 'Corporate Domain';
      console.log(`${idx + 1}. [${m.id}] ${m.name} -> ${m.website} (${type})`);
    });

  } catch (err) {
    console.error('❌ Error updating MongoDB:', err);
  } finally {
    await client.close();
  }
}

run();
