# IndiaPack Scout ⚡

> **All-India Packaging Films, Inks, Adhesives & Ethyl Acetate Industrial Intelligence Platform**

IndiaPack Scout is a high-speed B2B industrial intelligence and web scouting web application focused on premier packaging manufacturing and chemical facilities across **India**. It provides verified manufacturer intelligence, live web scouting, state-wise filtering, direct contact dossiers, and MongoDB Atlas cloud synchronization for flexible packaging films, printing inks, coatings, laminating adhesives, and **bulk Ethyl Acetate chemical ecosystems**.

---

## 🎯 Target Industrial Domains & Ecosystems

The platform tracks and verifies manufacturing plants across three technical pillars:

1. **Extrusion & High-Barrier Packaging Films**:
   - Co-extruded blown & cast films (3-layer, 5-layer, 7-layer, 9-layer)
   - Polyamide (PA / Nylon) and EVOH high-barrier films
   - Multi-layer laminated films & flexible webs
   - Heavy-duty & gas-flush vacuum pouches
   - Peelable & anti-fog lidding films (cups, trays, MAP packaging)
   - Thermoforming bottom & top web films (food, meat, dairy & medical packaging)

2. **Printing Inks, Adhesives & Masterbatches**:
   - Rotogravure printing inks for flexible packaging
   - Flexographic printing inks (water-based, solvent-based, UV)
   - Lamination and poly inks (NTNK - Non-Toluene Non-Ketone compliant)
   - Solventless and solvent-based 2-component polyurethane (PU) lamination adhesives
   - Functional barrier coatings (oxygen, moisture, and grease barrier, OPV)
   - Additive & color masterbatches (white TiO₂, slip, anti-block, PPA, UV)

3. **Ethyl Acetate (EtOAc) Chemical & Application Ecosystem**:
   - **Primary Bulk Producers**: Mega-scale acetyl chemical plants (Laxmi Organic, Jubilant Ingrevia, IOL Chemicals, Godavari Biorefineries, GNFC, Dhampur Bio Organics).
   - **Paints, Coatings & Industrial Finishes**: Automotive OEM 2K clear coats, nitrocellulose & acrylic wood finishes, and industrial primers (Asian Paints, Kansai Nerolac, Berger Paints).
   - **Industrial Glues & Adhesives**: Primary fast-evaporating tack carriers in contact cements, pressure-sensitive tapes, and 2K polyurethane laminating adhesives (Pidilite Industries, Brilliant Polymers, Henkel Anand).
   - **Food Packaging Printing Inks**: Standard clean-evaporating carrier solvents for rotogravure and flexographic inks meeting food wrapper safety regulations (Siegwerk, DIC India, Hubergroup, Toyo Ink, Sakata Inx).
   - **Pharmaceuticals & Cosmetics**: Extraction, crystallization, and purification of Active Pharmaceutical Ingredients (APIs) under US FDA limits (Divi's Laboratories, IOLCP) and personal care nail lacquers/perfumes (Fiabila India).
   - **Food & Beverage Processing**: Natural sugarcane ethyl acetate decaffeination of coffee beans and green tea (Tata Coffee Theni EOU) and botanical spice oleoresin extraction (Synthite Industries).
   - **Emerging Technology Applications**: Photoresist stripping in semiconductor fabrication and lithium-ion battery electrode slurry formulation (Chemcon Speciality Chemicals).

---

## 📍 Geographic Coverage (Pan-India Industrial Corridors)

Covers **105 premier manufacturing facilities** across India's top 11 industrial states:

- **Maharashtra** (59 plants): Mahad MIDC, Lote Parshuram MIDC, Chakan MIDC, Bhosari MIDC, Waluj MIDC, Tarapur MIDC, Vasai East, TTC Navi Mumbai, Taloja, Kurkumbh MIDC, Nira, Ambernath MIDC, Mumbai MMR.
- **Gujarat** (14 plants): Sanand GIDC, Vapi GIDC, Dahej PCPIR, Ankleshwar GIDC, Bharuch, Vallabh Vidyanagar (Anand).
- **Tamil Nadu** (6 plants): Sriperumbudur SIPCOT, Gummidipoondi SIPCOT, Ambattur, Theni Decaffeination EOU.
- **Uttar Pradesh** (5 plants): Kasna Greater Noida, Noida Sector 57, Gajraula UPSIDC, Asmoli Sambhal.
- **Dadra and Nagar Haveli & Daman and Diu** (4 plants): Silvassa Industrial Area (Piparia, Athal) and Daman.
- **Karnataka** (3 plants): Peenya Industrial Area, Bommasandra KIADB, Sameerwadi Biorefinery Complex.
- **Telangana** (3 plants): Cherlapally IDA, Pashamylaram, Choutuppal Pharma Industrial Zone.
- **Haryana / Delhi NCR** (3 plants): Gurugram, Bawal HSIIDC, Manesar, Faridabad.
- **Punjab** (1 plant): Barnala Trident Chemical Complex (IOLCP 100,000 TPA facility).
- **Kerala** (1 plant): Kolenchery / Cochin (Synthite Bio-Industrial Park).
- **West Bengal** (1 plant): Kolkata & Howrah Industrial Belt.

---

## ✨ Key Features

- **105 Verified Manufacturing Units**: In-depth dossiers covering plant capacities, year established, GSTIN numbers, ethyl acetate roles, solvents handled, and target applications.
- **Dedicated Ethyl Acetate Sector Filter & Quick Chips**: Instantly filter across Bulk Producers, Paints & Finishes, Glues & Adhesives, Food Packaging Inks, Pharma API, and Decaffeination.
- **State-Wise Dynamic Filtering**: Instant state selection dropdown with dynamic industrial cluster updates for GIDC, MIDC, SIPCOT, KIADB, UPSIDC, etc.
- **Complete Contact Dossiers**: Direct factory landlines, mobile numbers, technical sales emails, and full physical plant addresses.
- **Real-Time Live Web Scout Engine (`POST /api/search-web`)**:
  - **Mode A (Live URL & Corporate Domain Scanner)**: Accepts full URLs or bare domains (e.g. `laxmi.com`, `iolcp.com`, `jubilantingrevia.com`, `tcpl.in`). Concurrently scans `/` and `/contact-us`, extracting real-time meta descriptions, verified telephone landlines, sales emails, and plant addresses with live HTTP latency telemetry.
  - **Mode B (Technical Spec & Knowledge Graph with Real-Time HTTP Probing)**: Multi-term technical search across Indian chemical and packaging plants with acronym expansion (`EtOAc`, `PU`, `PA`, `EVOH`, `NTNK`, `BOPP`), state targeting, and parallel live HTTP probing.
  - **1-Click Save to Directory**: Save newly scouted leads from the live web directly into MongoDB Atlas.
- **Instant CSV Export**: Filtered export including State, Ethyl Acetate Role, Solvents Handled, and Key Applications.
- **Lead Bookmarking**: Save leads locally for review and offline tracking.
- **Zero-Dependency Modern Frontend**: Vanilla JS and high-performance CSS with dark-mode aesthetic and glassmorphism.

---

## 🛠️ Tech Stack

- **Runtime**: Node.js (v18+)
- **Server Framework**: Express.js
- **Database**: MongoDB Atlas (`mongodb` driver v6+)
- **HTTP & Scraping**: Axios, Cheerio
- **Configuration**: Dotenv (`.env` and `atlas-credentials.env`)
- **Frontend**: Vanilla HTML5, Vanilla CSS3, Vanilla ES6+ JavaScript

---

## 🚀 Getting Started

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (v18.0.0 or higher)
- [npm](https://www.npmjs.com/) (bundled with Node.js)

### 2. Installation
Clone or open the project directory and install dependencies:

```bash
npm install
```

### 3. Environment Variables
Configure your MongoDB Atlas connection string in a `.env` file (or `atlas-credentials.env`) in the root directory:

```env
MONGODB_SRV="mongodb+srv://<username>:<password>@<cluster>.mongodb.net/?appName=Cluster0"
PORT=3000
```

### 4. Database Seeding & Synchronization

To synchronize or seed the manufacturer records into MongoDB Atlas:

```bash
# Sync manufacturers data to MongoDB Atlas
npm run sync

# Fix, audit, and verify all official websites in MongoDB Atlas
node scripts/fix_websites_and_sync.js

# Initial seed script
npm run seed
```

### 5. Running the Application

```bash
# Start production server
npm start

# Or start in development watch mode
npm run dev
```

Once started, open your browser and navigate to:
```
http://localhost:3000
```

---

## 📡 REST API Documentation

### 1. Get Manufacturers
`GET /api/manufacturers`

**Query Parameters:**
- `state` (optional): Filter by Indian state / UT (e.g., `Gujarat`, `Maharashtra`, `Tamil Nadu`, `Dadra and Nagar Haveli and Daman and Diu`).
- `category` (optional): Filter by domain (`Barrier & Extrusion Films` or `Printing Inks, Adhesives & Masterbatch`).
- `subCategory` (optional): Filter by specialization (e.g., `Vacuum Pouches`, `Flexo Inks`, `Adhesives`).
- `city` (optional): Filter by city or cluster (e.g., `Sanand`, `Vapi`, `Pune`, `Chennai`, `Silvassa`).
- `industrialArea` (optional): Filter by industrial estate (e.g., `Sanand GIDC`, `Chakan MIDC`, `SIPCOT`).
- `query` (optional): Free-text search term across company name, products, address, state, etc.
- `verified` (optional): Set to `true` for verified units only.

**Sample Response:**
```json
{
  "success": true,
  "total": 81,
  "data": [
    {
      "id": "gj-001",
      "name": "Vishakha Polyfab Pvt. Ltd.",
      "category": "Barrier & Extrusion Films",
      "subCategories": ["PA/EVOH Barrier Films", "Extrusion Films", "Vacuum Pouches"],
      "products": ["9-Layer High Barrier EVOH/PA Films", "Vacuum Pouches"],
      "state": "Gujarat",
      "city": "Ahmedabad",
      "industrialArea": "Sanand GIDC",
      "address": "Plot No. 1205, GIDC Phase II, Sanand, Ahmedabad, Gujarat 382110",
      "phone": "+91-79-61900000",
      "salesEmail": "info@vishakhapolyfab.com",
      "website": "https://www.vishakhapolyfab.com",
      "verified": true
    }
  ]
}
```

---

### 2. Get Platform Statistics
`GET /api/stats`

**Sample Response:**
```json
{
  "totalCount": 81,
  "barrierFilmsCount": 42,
  "inksAdhesivesCount": 39,
  "uniqueClusters": 24,
  "statesCount": 9,
  "statesList": [
    "Dadra and Nagar Haveli and Daman and Diu",
    "Gujarat",
    "Haryana",
    "Karnataka",
    "Maharashtra",
    "Tamil Nadu",
    "Telangana",
    "Uttar Pradesh",
    "West Bengal"
  ],
  "verifiedCount": 81
}
```

---

### 3. Live Web Scout
`POST /api/search-web`

**Request Body:**
```json
{
  "query": "7 layer PA EVOH barrier film",
  "state": "Gujarat",
  "city": "Sanand Vapi"
}
```
*Tip: Passing a full URL (e.g., `{"query": "https://www.vishakhapolyfab.com"}`) triggers the Mode A live website DOM extractor.*

---

### 4. Save Manufacturer
`POST /api/manufacturers`

Saves or updates a manufacturer dossier directly to MongoDB Atlas with automatic fallback to local JSON storage.

---

### 5. Delete Manufacturer (Remove Plant)
`DELETE /api/manufacturers/:id`

Permanently deletes a manufacturer plant by ID from MongoDB Atlas and synchronizes the local storage mirrors.

**Sample Response:**
```json
{
  "success": true,
  "message": "Plant mh-001 removed successfully from directory",
  "id": "mh-001"
}
```

---

### 6. Export CSV
`GET /api/export`

Downloads a full or filtered CSV file with headers: `ID, Company Name, Category, Sub-Categories, Products, City, Industrial Area, Full Address, Pincode, Phone, Mobile, Email, Sales Email, Website, GSTIN`.

---

## 📂 Project Structure

```
pramod_research/
├── .env                           # Environment variables (MONGODB_SRV, PORT)
├── atlas-credentials.env          # MongoDB Atlas credential mirror
├── package.json                   # Project metadata and npm scripts
├── server.js                      # Express backend & MongoDB Atlas integration
├── public/                        # Static frontend assets
│   ├── index.html                 # Main application UI & layout
│   ├── style.css                  # Custom CSS design system
│   └── app.js                     # High-speed client-side application logic
├── data/                          # Local JSON storage mirrors
│   ├── manufacturers.json         # Active JSON dataset (48 records)
│   ├── manufacturers.backup.json  # Backup snapshot
│   └── manufacturers.master.json  # Master reference catalog
└── scripts/                       # Migration & synchronization utilities
    ├── fix_websites_and_sync.js   # Audit and fix website URLs & sync to Atlas
    ├── seed_mongodb.js            # Initial MongoDB collection seed
    └── sync_to_mongodb.js         # Direct JSON-to-MongoDB sync utility
```

---

## 🔒 Security & Data Integrity

- **Environment Isolation**: Sensitive credentials are kept in `.env` and `atlas-credentials.env` and should not be committed to public version control.
- **Sanitized Scrapes**: Regex filters clean phone numbers and emails while blocking invalid media files and trackers.
- **Dual-Storage Resilience**: Cloud MongoDB Atlas is the primary database, while local files provide fallback capabilities.

---

## 📄 License

ISC License. Built for Maharashtra Packaging & Chemicals B2B Market Research.
