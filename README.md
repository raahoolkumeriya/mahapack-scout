# MahaPack Scout ⚡

> **Maharashtra Packaging Films, Inks & Adhesives Industrial Intelligence & Live B2B Web Scout Platform**

MahaPack Scout is a high-speed B2B industrial intelligence and web scouting web application focused exclusively on manufacturing facilities in **Maharashtra, India**. It provides verified manufacturer intelligence, live web scouting, direct contact dossiers, and MongoDB Atlas cloud synchronization for flexible packaging films, printing inks, coatings, adhesives, and masterbatches.

---

## 🎯 Target Industrial Domains

The platform tracks and verifies manufacturing plants across two technical domains:

1. **Extrusion & High-Barrier Packaging Films**:
   - Co-extruded blown & cast films (3-layer, 5-layer, 7-layer, 9-layer)
   - Polyamide (PA / Nylon) and EVOH high-barrier films
   - Multi-layer laminated films & flexible webs
   - Heavy-duty & gas-flush vacuum pouches
   - Peelable & anti-fog lidding films (cups, trays, MAP packaging)
   - Thermoforming bottom & top web films (food, meat, dairy & medical device packaging)

2. **Printing Inks, Adhesives & Masterbatches**:
   - Rotogravure printing inks for flexible packaging
   - Flexographic printing inks (water-based, solvent-based, UV)
   - Lamination and poly inks (NTNK - Non-Toluene Non-Ketone compliant)
   - Solventless and solvent-based 2-component polyurethane (PU) lamination adhesives
   - Functional barrier coatings (oxygen, moisture, and grease barrier, overprint varnishes)
   - Additive & color masterbatches (white TiO₂, slip, anti-block, PPA, UV stabilizers)

---

## 📍 Geographic Coverage (Maharashtra MIDC Clusters)

Exclusively covers manufacturing plants, converting units, and technical hubs located in Maharashtra's key MIDC and industrial zones:

- **Pune District**: Chakan Phase I & II MIDC, Bhosari MIDC, PCNTDA, Kurkumbh MIDC
- **Mumbai Metropolitan Region (MMR)**: Andheri East/Marol, Lower Parel, Wadala, Kurla, Sakinaka
- **Thane District**: Thane Wagle MIDC, Bhiwandi Logistics Corridor, Ambernath Anand Nagar MIDC, Dombivli MIDC Phase II
- **Navi Mumbai**: TTC Industrial Area (Turbhe, Mahape, Rabale), Taloja MIDC
- **Palghar District**: Tarapur / Boisar MIDC, Vasai East Industrial Estates (Waliv, Parmar)
- **Chhatrapati Sambhaji Nagar (Aurangabad)**: Waluj MIDC, Shendra MIDC, Chikalthana
- **Raigad District**: Khopoli MIDC, Mahad MIDC
- **North Maharashtra**: Jalgaon MIDC

---

## ✨ Key Features

- **54 Verified Manufacturing Units**: In-depth dossiers covering plant capacities, year established, GSTIN numbers, and comprehensive product lists.
- **Complete Contact Dossiers**: Direct factory landlines, mobile numbers, technical sales emails, and full physical MIDC addresses.
- **Real-Time Live Web Scout Engine (`POST /api/search-web`)**:
  - **Mode A (Live URL & Corporate Domain Scanner)**: Accepts full URLs or bare domains (e.g. `tcpl.in`, `bilcare.com`, `cosmofirst.com`). Concurrently scans `/` and `/contact-us`, extracting company name, real-time meta descriptions, verified telephone landlines (022, 020, 0250, 0240, etc.), sales emails, and MIDC plant addresses with live HTTP latency telemetry.
  - **Mode B (Technical Spec & Knowledge Graph with Real-Time HTTP Probing)**: Multi-term technical search across Maharashtra packaging plants with acronym expansion (`PA`, `EVOH`, `PU`, `MB`, `NTNK`, `BOPP`, etc.), zero-empty cluster broadening, and parallel live HTTP probing (`HTTP 200` round-trip latency, live page titles, and live website snippets).
  - **1-Click Save to Directory**: Save newly scouted leads from the live web directly into MongoDB Atlas with complete contact details and instant local UI synchronization.
- **100% Working Official Web Links**: Verified HTTPS corporate domains and guaranteed Google B2B / MIDC Industrial Profiles (no dead links).
- **Auto-Healing MongoDB Atlas Cloud Database**: Cloud-hosted storage connected via `MONGODB_SRV` with automatic master file fallback and resilient self-seeding.
- **Instant CSV Export**: Filtered or full directory export with one click.
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
- `category` (optional): Filter by domain (`Barrier & Extrusion Films` or `Printing Inks, Adhesives & Masterbatch`).
- `subCategory` (optional): Filter by specialization (e.g., `Vacuum Pouches`, `Flexo Inks`, `Adhesives`).
- `city` (optional): Filter by city or cluster (e.g., `Pune`, `Tarapur`, `Vasai`, `Aurangabad`).
- `industrialArea` (optional): Filter by MIDC area (e.g., `Chakan`, `Waluj`, `TTC`).
- `query` (optional): Free-text search term across company name, products, address, etc.
- `verified` (optional): Set to `true` for verified units only.

**Sample Response:**
```json
{
  "success": true,
  "total": 48,
  "data": [
    {
      "id": "mh-001",
      "name": "Cosmo First Limited (formerly Cosmo Films)",
      "category": "Barrier & Extrusion Films",
      "subCategories": ["PA/EVOH Barrier Films", "Extrusion Films", "Laminated Films"],
      "products": ["High Barrier EVOH Co-extruded Films", "BOPP Barrier Films"],
      "address": "AL-24, MIDC Industrial Area, Waluj, Chhatrapati Sambhaji Nagar (Aurangabad), Maharashtra 431136",
      "city": "Chhatrapati Sambhaji Nagar (Aurangabad)",
      "phone": "+91-240-6660000",
      "salesEmail": "sales@cosmofirst.com",
      "website": "https://www.cosmofirst.com",
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
  "totalCount": 48,
  "barrierFilmsCount": 25,
  "inksAdhesivesCount": 23,
  "uniqueClusters": 18,
  "verifiedCount": 48,
  "clustersList": [
    "Pune / Chakan",
    "Tarapur / Boisar",
    "Vasai / Palghar",
    "Chhatrapati Sambhaji Nagar (Aurangabad)",
    "Ambernath / Thane",
    "Navi Mumbai",
    "Mumbai"
  ]
}
```

---

### 3. Live Web Scout
`POST /api/search-web`

**Request Body:**
```json
{
  "query": "Manufacturers of Extrusion films",
  "city": "Maharashtra"
}
```
*Tip: Passing a full URL (e.g., `{"query": "https://www.cosmofirst.com"}`) triggers the Mode A live website DOM extractor.*

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
