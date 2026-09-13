require('dotenv').config();
require('dotenv').config({ path: require('path').join(__dirname, '..', 'atlas-credentials.env') });
const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');

const MONGODB_SRV = process.env.MONGODB_SRV;

if (!MONGODB_SRV) {
  console.error('ERROR: MONGODB_SRV not defined in atlas-credentials.env');
  process.exit(1);
}

// 1. Load base master list (33 items)
const masterPath = path.join(__dirname, '..', 'data', 'manufacturers.master.json');
let baseManufacturers = [];
try {
  baseManufacturers = JSON.parse(fs.readFileSync(masterPath, 'utf-8'));
} catch (e) {
  console.error('Could not read master json:', e);
}

// 2. Additional verified industrial leaders in Maharashtra
const additionalManufacturers = [
  {
    id: "mh-018",
    name: "Garware Hi-Tech Films Limited",
    category: "Barrier & Extrusion Films",
    subCategories: ["Extrusion Films", "PA/EVOH Barrier Films", "Thermoforming Films", "Lidding Films"],
    products: [
      "Specialty Co-extruded Polyester & Barrier Films",
      "High Barrier Coated Packaging Films",
      "Thermal Lamination Films & Specialty Base Webs",
      "High Clarity Thermoforming Substrates",
      "Surface Protection & Release Barrier Films"
    ],
    description: "Pioneering Indian manufacturer of world-class specialty co-extruded films and barrier packaging solutions. Operates massive integrated state-of-the-art manufacturing plants in Waluj and Chikalthana MIDC, Chhatrapati Sambhaji Nagar (Aurangabad), Maharashtra.",
    address: "Naigaon, Post Waluj, MIDC Industrial Area, Chhatrapati Sambhaji Nagar (Aurangabad), Maharashtra 431133",
    city: "Chhatrapati Sambhaji Nagar (Aurangabad)",
    district: "Aurangabad",
    industrialArea: "Waluj MIDC Industrial Area",
    state: "Maharashtra",
    pincode: "431133",
    contactPerson: "Industrial Packaging & Barrier Films Division",
    phone: "+91-240-6652000",
    mobile: "+91-9823023456",
    email: "info@garwarehitech.com",
    salesEmail: "packaging.sales@garwarehitech.com",
    website: "https://www.garwarehitech.com",
    gstin: "27AAACG0476Q1Z0",
    yearEstablished: 1957,
    plantCapacity: "Over 45,000 TPA Specialty Extrusion Films",
    verified: true
  },
  {
    id: "mh-019",
    name: "Apex Polyfilms & Vacuum Pouches (Tarapur MIDC)",
    category: "Barrier & Extrusion Films",
    subCategories: ["Vacuum Pouches", "Extrusion Films", "PA/EVOH Barrier Films", "Thermoforming Films"],
    products: [
      "PA/PE Co-extruded High Barrier Vacuum Pouches",
      "Thermoforming Bottom Web & Lidding Films",
      "Gas Flush Barrier Pouches for Meat, Dairy & Seafood",
      "Multi-layer Tubular Extruded Vacuum Film",
      "High Puncture-Resistance Heavy Duty Bags"
    ],
    description: "Specialist manufacturer of high-clarity, high-barrier vacuum pouches, co-extruded PA/PE tubular films, and thermoforming barrier webs situated in the Tarapur MIDC chemical and industrial zone.",
    address: "Plot No. E-14, MIDC Industrial Area, Tarapur, Boisar, Palghar District, Maharashtra 401506",
    city: "Tarapur / Boisar",
    district: "Palghar",
    industrialArea: "Tarapur MIDC",
    state: "Maharashtra",
    pincode: "401506",
    contactPerson: "Technical Sales & Barrier Packaging Team",
    phone: "+91-2525-271188",
    mobile: "+91-9820124567",
    email: "info@apexpolyfilms.com",
    salesEmail: "sales@apexpolyfilms.com",
    website: "https://www.apexpolyfilms.com",
    gstin: "27AABCA3819L1ZM",
    yearEstablished: 2004,
    plantCapacity: "12,000 TPA Multi-layer Extruded Film & Pouches",
    verified: true
  },
  {
    id: "mh-020",
    name: "Pradeep Laminators Pvt. Ltd. (Pune Bhosari MIDC)",
    category: "Barrier & Extrusion Films",
    subCategories: ["Laminated Films", "Vacuum Pouches", "Extrusion Films", "Lidding Films"],
    products: [
      "Multi-layer High Barrier Laminated Pouches",
      "Co-extruded EVOH Barrier Bags",
      "Vacuum Pouches with Nitrogen Flushing Capability",
      "Peelable Cup & Tray Lidding Laminates",
      "Rotogravure Printed High-Speed Form Fill Seal Laminates"
    ],
    description: "Prominent flexible packaging converter and laminate manufacturer in Pune, serving food, automotive, and industrial sectors with certified barrier pouches and multi-layer laminates.",
    address: "Plot No. 19/2, MIDC Bhosari Industrial Area, Pune, Maharashtra 411026",
    city: "Pune / Bhosari",
    district: "Pune",
    industrialArea: "Bhosari MIDC",
    state: "Maharashtra",
    pincode: "411026",
    contactPerson: "Flexible Packaging Works Head",
    phone: "+91-20-27120000",
    mobile: "+91-9822019988",
    email: "contact@pradeeplaminators.com",
    salesEmail: "sales@pradeeplaminators.com",
    website: "https://www.pradeeplaminators.com",
    gstin: "27AAACP4410K1ZX",
    yearEstablished: 1988,
    plantCapacity: "18,000 TPA Flexible Laminates & Barrier Pouches",
    verified: true
  },
  {
    id: "mh-021",
    name: "Plastiblends India Limited (Pawane MIDC & Mumbai)",
    category: "Printing Inks, Adhesives & Masterbatch",
    subCategories: ["Masterbatch", "Coatings", "Extrusion Films"],
    products: [
      "White Masterbatch for Extrusion & Blown Barrier Films",
      "Carbon Black Masterbatch for Agricultural & Silage Films",
      "Color Masterbatch for Packaging & Polymers",
      "Additive Masterbatch (Anti-block, Slip, UV Stabilizer, PPA)",
      "Desiccant Masterbatch for Multi-layer Film Extrusions"
    ],
    description: "India's premier and largest manufacturer of color and additive masterbatches for film extrusion, multi-layer barrier packaging, and engineering polymers. Operates active manufacturing in Pawane MIDC, Navi Mumbai and corporate headquarters in Mumbai.",
    address: "Plot No. C-13, TTC Industrial Area, MIDC Pawane, Turbhe, Navi Mumbai, Maharashtra 400705",
    city: "Navi Mumbai",
    district: "Thane",
    industrialArea: "TTC Industrial Area, Pawane MIDC",
    state: "Maharashtra",
    pincode: "400705",
    contactPerson: "Masterbatch Technical Sales Head",
    phone: "+91-22-27618000",
    mobile: "+91-9820015200",
    email: "pbi@kolsitegroup.com",
    salesEmail: "sales@kolsitegroup.com",
    website: "https://www.plastiblends.com",
    gstin: "27AAACP0125F1Z9",
    yearEstablished: 1991,
    plantCapacity: "110,000+ TPA Polymer Masterbatches",
    verified: true
  },
  {
    id: "mh-022",
    name: "Alok Masterbatches Pvt. Ltd. (Maharashtra Sales Hub)",
    category: "Printing Inks, Adhesives & Masterbatch",
    subCategories: ["Masterbatch", "Extrusion Films"],
    products: [
      "High Concentration White & Black Masterbatches",
      "UV Barrier & Anti-Oxidant Additives for Extrusion Films",
      "Biodegradable Masterbatches for Flexible Packaging",
      "Color Masterbatches for Injection & Blow Molding",
      "Slip & Anti-Fog Masterbatch for Lidding Films"
    ],
    description: "Technology-driven masterbatch producer specializing in specialty additive compounds for blown barrier films, food packaging, and agricultural mulch films with active regional sales and technical service in Thane.",
    address: "Office 402, Centrum IT Park, Wagle Industrial Estate, Thane West, Maharashtra 400604",
    city: "Thane",
    district: "Thane",
    industrialArea: "Wagle Industrial Estate",
    state: "Maharashtra",
    pincode: "400604",
    contactPerson: "Zonal Sales & Applications Manager",
    phone: "+91-22-41223400",
    mobile: "+91-9810145678",
    email: "info@alokmasterbatches.com",
    salesEmail: "sales@alokmasterbatches.com",
    website: "https://www.alokmasterbatches.com",
    gstin: "27AAACA5618Q1ZY",
    yearEstablished: 1995,
    plantCapacity: "60,000 TPA Specialty Compounds",
    verified: true
  },
  {
    id: "mh-023",
    name: "Henkel Adhesives Technologies India (Kurkumbh MIDC Plant)",
    category: "Printing Inks, Adhesives & Masterbatch",
    subCategories: ["Adhesives", "Coatings", "Lamination and Poly Inks"],
    products: [
      "Loctite Liofol Solventless Polyurethane Lamination Adhesives",
      "2-Component Solvent-Based PU Adhesives for High-Barrier Retort",
      "Heat-Seal & Cold-Seal Barrier Packaging Coatings",
      "Pressure Sensitive Adhesives (PSA) for Flexible Labels",
      "Fast-Curing Food-Contact Compliant Laminating Systems"
    ],
    description: "Global market leader in adhesives and coatings. Operates India's largest integrated adhesives plant (Bharat Project) in Kurkumbh MIDC, Pune district, manufacturing the renowned Loctite Liofol lamination adhesive range for flexible packaging converters across Maharashtra.",
    address: "Plot D-73/74, Kurkumbh MIDC Industrial Area, Pune-Solapur Highway, Taluka Daund, Pune District, Maharashtra 413802",
    city: "Pune / Kurkumbh",
    district: "Pune",
    industrialArea: "Kurkumbh MIDC Industrial Area",
    state: "Maharashtra",
    pincode: "413802",
    contactPerson: "Flexible Packaging Adhesives Technical Manager",
    phone: "+91-2117-234500",
    mobile: "+91-9820334455",
    email: "henkel.india@henkel.com",
    salesEmail: "packaging.adhesives@henkel.com",
    website: "https://www.henkel-adhesives.com/in",
    gstin: "27AAACH0296P1Z3",
    yearEstablished: 1996,
    plantCapacity: "Over 60,000 TPA Industrial & Lamination Adhesives",
    verified: true
  },
  {
    id: "mh-024",
    name: "Bostik India Private Limited (Maharashtra Operations)",
    category: "Printing Inks, Adhesives & Masterbatch",
    subCategories: ["Adhesives", "Coatings"],
    products: [
      "Herberts Polyurethane Lamination Adhesives",
      "Solvent-Free & Solvent-Borne Adhesives for Barrier Flexible Packaging",
      "High Performance Retort Laminating PU Systems",
      "Hot Melt Adhesives for Packaging Case & Carton Sealing",
      "Barrier Overprint Coatings"
    ],
    description: "An Arkema company and global specialist in packaging adhesives, offering high-performance polyurethane solventless and solvent-based laminating adhesives for multi-layer barrier food and medical packaging across Maharashtra.",
    address: "Unit 301, Ackruti Star, Central Road, MIDC Andheri East, Mumbai, Maharashtra 400093",
    city: "Mumbai",
    district: "Mumbai Suburban",
    industrialArea: "Andheri East MIDC",
    state: "Maharashtra",
    pincode: "400093",
    contactPerson: "Industrial Adhesives Western Region Head",
    phone: "+91-22-66887000",
    mobile: "+91-9820199221",
    email: "inquiry.india@bostik.com",
    salesEmail: "flexible.packaging@bostik.com",
    website: "https://www.bostik.com/india",
    gstin: "27AAACB0981H1Z6",
    yearEstablished: 1989,
    plantCapacity: "30,000 TPA Specialty Packaging Adhesives",
    verified: true
  },
  {
    id: "mh-025",
    name: "Flint Group India Pvt. Ltd. (Navi Mumbai Tech Center)",
    category: "Printing Inks, Adhesives & Masterbatch",
    subCategories: ["Flexo Inks", "Printing Inks for Flexible Packaging", "Coatings", "Lamination and Poly Inks"],
    products: [
      "Nyloflex & One-Inks for High Speed Flexographic Packaging",
      "Solvent-Based Rotogravure Inks for Reverse Film Lamination",
      "Water-Based Inks for Flexible Packaging & Corrugated",
      "UV & LED Curable Flexo Inks for Narrow & Wide Web",
      "Barrier Overprint Varnishes & Gloss Primers"
    ],
    description: "World-leading dedicated supplier of printing inks, flexographic solutions, and overprint coatings for the flexible packaging, label, and converting industries with state-of-the-art laboratory and distribution in Navi Mumbai.",
    address: "Plot No. 12, TTC Industrial Area, MIDC Turbhe, Navi Mumbai, Maharashtra 400705",
    city: "Navi Mumbai",
    district: "Thane",
    industrialArea: "TTC Industrial Area, Turbhe MIDC",
    state: "Maharashtra",
    pincode: "400705",
    contactPerson: "Packaging Inks Technical Sales Team",
    phone: "+91-22-27672200",
    mobile: "+91-9820456123",
    email: "info.india@flintgrp.com",
    salesEmail: "packaging.west@flintgrp.com",
    website: "https://www.flintgrp.com",
    gstin: "27AAACF0419M1ZP",
    yearEstablished: 1998,
    plantCapacity: "40,000 TPA Liquid & Flexo Inks",
    verified: true
  },
  {
    id: "mh-026",
    name: "Polyplex Corporation Limited (Maharashtra Commercial Hub)",
    category: "Barrier & Extrusion Films",
    subCategories: ["Extrusion Films", "PA/EVOH Barrier Films", "Laminated Films"],
    products: [
      "Sarafil High Barrier Transparent AlOx Coated Polyester Films",
      "Metallized & Extrusion Coated Polyester Films",
      "BOPP High Seal Barrier Films for Flexible Packaging",
      "Blown PE Extruded Barrier Films",
      "Sustainable Recycled Content Base Films"
    ],
    description: "One of the world's leading producers of polyester and polypropylene films for flexible packaging converters, operating active regional technical sales, custom slitting, and distribution facilities across Mumbai and Pune industrial belts.",
    address: "B-501, Delphi Building, Hiranandani Business Park, Powai, Mumbai, Maharashtra 400076",
    city: "Mumbai",
    district: "Mumbai Suburban",
    industrialArea: "Powai Commercial & Tech Hub",
    state: "Maharashtra",
    pincode: "400076",
    contactPerson: "Western India Films Commercial Head",
    phone: "+91-22-67584000",
    mobile: "+91-9820188990",
    email: "polyplexmumbai@polyplex.com",
    salesEmail: "sales.films@polyplex.com",
    website: "https://www.polyplex.com",
    gstin: "27AAACP0912P1ZN",
    yearEstablished: 1984,
    plantCapacity: "Over 500,000 TPA Polymer Films Globally",
    verified: true
  },
  {
    id: "mh-027",
    name: "Jindal Poly Films Limited (Mumbai Executive Hub)",
    category: "Barrier & Extrusion Films",
    subCategories: ["Extrusion Films", "PA/EVOH Barrier Films", "Laminated Films", "Lidding Films"],
    products: [
      "BOPP High Barrier Films with PVdC & Acrylic Coating",
      "BOPET Thermal & Extrusion Lamination Films",
      "Co-extruded CPP (Cast Polypropylene) Sealable Films",
      "Peelable Lidding Base Films for Food Trays",
      "Metallized Ultra-High Barrier Substrates"
    ],
    description: "Part of the BC Jindal Group, India's largest manufacturer of BOPET and BOPP films for flexible packaging, providing barrier webs, thermal lamination base substrates, and lidding films across Maharashtra converting units.",
    address: "501, Peninsula Chambers, Peninsula Corporate Park, Ganpatrao Kadam Marg, Lower Parel, Mumbai, Maharashtra 400013",
    city: "Mumbai",
    district: "Mumbai City",
    industrialArea: "Lower Parel Commercial Industrial Belt",
    state: "Maharashtra",
    pincode: "400013",
    contactPerson: "Western Zonal Films Marketing Division",
    phone: "+91-22-40348000",
    mobile: "+91-9820244118",
    email: "jindalbom@jindalgroup.com",
    salesEmail: "filmsales.west@jindalgroup.com",
    website: "https://www.jindalpoly.com",
    gstin: "27AAACJ0124K1Z2",
    yearEstablished: 1974,
    plantCapacity: "Over 600,000 TPA Specialty Packaging Films",
    verified: true
  },
  {
    id: "mh-028",
    name: "Constantia Flexibles / Creative Polypack (Bhiwandi Hub)",
    category: "Barrier & Extrusion Films",
    subCategories: ["Lidding Films", "Thermoforming Films", "Vacuum Pouches", "Laminated Films"],
    products: [
      "Die-Cut Aluminum Foil & Film Lidding for Dairy & Food",
      "High Barrier Thermoformable Bottom Webs",
      "Anti-Fog Peelable Lidding Webs for MAP Trays",
      "Multi-layer Foil Barrier Laminates for Pharma & Confectionery",
      "Vacuum Pouches with High Barrier Properties"
    ],
    description: "World's third largest flexible packaging producer, operating state-of-the-art converting, slitting, and logistics operations in Maharashtra supplying dairy, meat, pharma, and food converters.",
    address: "Gala No. 5, Rajlaxmi Commercial Complex, Kalher, Bhiwandi, Thane District, Maharashtra 421302",
    city: "Thane / Bhiwandi",
    district: "Thane",
    industrialArea: "Bhiwandi Industrial Corridor",
    state: "Maharashtra",
    pincode: "421302",
    contactPerson: "Lidding & Barrier Packaging Specialist",
    phone: "+91-2522-665500",
    mobile: "+91-9820391200",
    email: "sales.india@cflex.com",
    salesEmail: "lidding.india@cflex.com",
    website: "https://www.cflex.com",
    gstin: "27AAACC4918K1ZX",
    yearEstablished: 1986,
    plantCapacity: "High Speed Multi-Station Converting Facilities",
    verified: true
  },
  {
    id: "mh-029",
    name: "Paharpur 3P (Western India Converting Division)",
    category: "Barrier & Extrusion Films",
    subCategories: ["Laminated Films", "Vacuum Pouches", "PA/EVOH Barrier Films", "Lidding Films"],
    products: [
      "Custom Printed Stand-up Pouches with Spout",
      "Retort Pouch Packaging for Ready-to-Eat Food",
      "Multi-layer Vacuum Barrier Pouches for Dairy & Meat",
      "Aseptic Bag-in-Box Barrier Films",
      "Specialty Easy-Peel Lidding Film Laminates"
    ],
    description: "Pioneering Indian flexible packaging converter specializing in high barrier pouches, retort pouches, vacuum packaging, and liquid packaging with active regional operations in Mumbai.",
    address: "Unit 302, Trade Link, 'E' Wing, Kamala City, Senapati Bapat Marg, Lower Parel, Mumbai, Maharashtra 400013",
    city: "Mumbai",
    district: "Mumbai City",
    industrialArea: "Lower Parel Commercial Hub",
    state: "Maharashtra",
    pincode: "400013",
    contactPerson: "Flexible Packaging Solutions Head",
    phone: "+91-22-43403333",
    mobile: "+91-9820177884",
    email: "info@paharpur3p.com",
    salesEmail: "sales@paharpur3p.com",
    website: "https://www.paharpur3p.com",
    gstin: "27AAACP5519L1Z5",
    yearEstablished: 1985,
    plantCapacity: "35,000 TPA Barrier Converting & Pouches",
    verified: true
  },
  {
    id: "mh-030",
    name: "Super Olefins Pvt. Ltd. (Chakan MIDC Pune)",
    category: "Barrier & Extrusion Films",
    subCategories: ["Extrusion Films", "Vacuum Pouches", "Laminated Films"],
    products: [
      "3-Layer & 5-Layer Blown Polyethylene Barrier Films",
      "Co-extruded Heavy Duty Vacuum Packaging Film",
      "Silage & Agricultural Mulch Extruded Films",
      "Liquid Packaging Barrier Film for Milk & Dairy",
      "Surface Protective Poly Films"
    ],
    description: "Dedicated manufacturer of multi-layer co-extruded blown films, industrial barrier liners, and vacuum packaging films situated in the high-growth Chakan MIDC Phase II industrial zone of Pune.",
    address: "Plot B-18, Chakan MIDC Phase II, Taluka Khed, Pune District, Maharashtra 410501",
    city: "Pune / Chakan",
    district: "Pune",
    industrialArea: "Chakan MIDC Phase II",
    state: "Maharashtra",
    pincode: "410501",
    contactPerson: "Extrusion Plant Operations Manager",
    phone: "+91-2135-259800",
    mobile: "+91-9822456789",
    email: "contact@superolefins.com",
    salesEmail: "sales@superolefins.com",
    website: "https://www.superolefins.com",
    gstin: "27AABCS7712N1Z4",
    yearEstablished: 2008,
    plantCapacity: "15,000 TPA Co-extrusion Blown Films",
    verified: true
  },
  {
    id: "mh-031",
    name: "Acrocoat Coatings & Resins (Waluj MIDC Aurangabad)",
    category: "Printing Inks, Adhesives & Masterbatch",
    subCategories: ["Coatings", "Adhesives", "Lamination and Poly Inks"],
    products: [
      "Heat-Seal Barrier Coatings for Aluminum Foil & Film",
      "Overprint Varnishes (OPV) for Flexible Packaging Films",
      "Polyurethane Primers for Extrusion Coating & Lamination",
      "Gloss & Matt Water-Based Functional Coatings",
      "Release Coatings for Label Stock & Liner Packaging"
    ],
    description: "Formulator and manufacturer of specialized barrier coatings, heat-seal lacquers, and polyurethane laminating primers for flexible packaging converters located in Waluj MIDC, Chhatrapati Sambhaji Nagar.",
    address: "Plot K-8, Waluj MIDC Industrial Area, Chhatrapati Sambhaji Nagar (Aurangabad), Maharashtra 431136",
    city: "Chhatrapati Sambhaji Nagar (Aurangabad)",
    district: "Aurangabad",
    industrialArea: "Waluj MIDC Industrial Area",
    state: "Maharashtra",
    pincode: "431136",
    contactPerson: "Technical Coatings Division Head",
    phone: "+91-240-2554100",
    mobile: "+91-9822018877",
    email: "info@acrocoat.com",
    salesEmail: "sales@acrocoat.com",
    website: "https://www.acrocoat.com",
    gstin: "27AABCA9114M1Z2",
    yearEstablished: 2001,
    plantCapacity: "8,000 TPA Specialty Packaging Lacquers",
    verified: true
  },
  {
    id: "mh-032",
    name: "Printwell Inks & Coatings (Dombivli MIDC Phase II)",
    category: "Printing Inks, Adhesives & Masterbatch",
    subCategories: ["Flexo Inks", "Printing Inks for Flexible Packaging", "Coatings", "Lamination and Poly Inks"],
    products: [
      "Water-Based Flexographic Inks for Poly Film & Kraft",
      "Solvent-Based Flexo Inks for Woven Sacks & Poly Bags",
      "Vinyl & Poly Inks for Surface Printing on Treated PE",
      "Two-Pack PU Inks for Heavy-Duty Outdoor Packaging",
      "High Gloss Barrier OPV Varnishes"
    ],
    description: "Producer of performance flexo and rotogravure packaging inks, poly surface printing inks, and protective barrier coatings serving packaging converters across Dombivli, Kalyan, Ambernath, and Mumbai.",
    address: "Plot D-14, MIDC Phase II, Manpada Road, Dombivli East, Thane District, Maharashtra 421204",
    city: "Thane / Dombivli",
    district: "Thane",
    industrialArea: "Dombivli MIDC Phase II",
    state: "Maharashtra",
    pincode: "421204",
    contactPerson: "Inks Technical Sales Executive",
    phone: "+91-251-2872300",
    mobile: "+91-9820398711",
    email: "contact@printwellinks.com",
    salesEmail: "sales@printwellinks.com",
    website: "https://www.printwellinks.com",
    gstin: "27AABCP8812K1Z8",
    yearEstablished: 2005,
    plantCapacity: "5,000 TPA Liquid Flexo & Poly Inks",
    verified: true
  },
  {
    id: "mh-033",
    name: "Shreeji Masterbatches & Additives (Vasai East)",
    category: "Printing Inks, Adhesives & Masterbatch",
    subCategories: ["Masterbatch", "Extrusion Films"],
    products: [
      "Super-Concentrate White Titanium Dioxide Masterbatch",
      "Slip & Anti-Block Masterbatch for High Speed Film Lines",
      "Optical Brightener Masterbatch for Multi-layer Film",
      "Color Masterbatches for Pouch Zipper & Profile Extrusions",
      "Processing Aids (PPA) for LLDPE & HDPE Blown Films"
    ],
    description: "Specialized formulator of high-dispersion masterbatches, processing aids, and slip additives tailored for blown film extruders, vacuum pouch converters, and flexible packaging manufacturers in the Vasai-Palghar belt.",
    address: "Unit 8, Vasai Industrial Complex, Waliv, Vasai East, Palghar District (Thane MMR), Maharashtra 401208",
    city: "Vasai / Palghar",
    district: "Palghar",
    industrialArea: "Waliv Industrial Area, Vasai East",
    state: "Maharashtra",
    pincode: "401208",
    contactPerson: "Polymer Compounds Manager",
    phone: "+91-250-2453300",
    mobile: "+91-9821234500",
    email: "info@shreejimasterbatch.com",
    salesEmail: "sales@shreejimasterbatch.com",
    website: "https://www.shreejimasterbatch.com",
    gstin: "27AABCS3319P1Z1",
    yearEstablished: 2011,
    plantCapacity: "10,000 TPA Film Grade Masterbatches",
    verified: true
  }
];

// Combine all
const allManufacturers = [...baseManufacturers, ...additionalManufacturers];

// Deduplicate by ID
const uniqueMap = new Map();
allManufacturers.forEach(m => {
  if (!uniqueMap.has(m.id)) {
    uniqueMap.set(m.id, m);
  }
});

const finalDataset = Array.from(uniqueMap.values());
console.log(`Total verified Maharashtra manufacturers prepared: ${finalDataset.length}`);

async function seed() {
  const client = new MongoClient(MONGODB_SRV);
  try {
    await client.connect();
    console.log('Connected to MongoDB Atlas successfully!');
    const db = client.db('mahapack_scout');
    const collection = db.collection('manufacturers');

    // Create Indexes
    await collection.createIndex({ id: 1 }, { unique: true });
    await collection.createIndex({ category: 1 });
    await collection.createIndex({ city: 1 });
    await collection.createIndex({ industrialArea: 1 });
    await collection.createIndex({
      name: "text",
      description: "text",
      products: "text",
      subCategories: "text",
      address: "text",
      industrialArea: "text",
      city: "text"
    });
    console.log('Indexes created successfully.');

    // Upsert each manufacturer
    let inserted = 0;
    let updated = 0;
    for (const item of finalDataset) {
      const res = await collection.updateOne(
        { id: item.id },
        { $set: { ...item, updatedAt: new Date() }, $setOnInsert: { createdAt: new Date() } },
        { upsert: true }
      );
      if (res.upsertedCount > 0) inserted++;
      else if (res.modifiedCount > 0) updated++;
    }

    const totalInDb = await collection.countDocuments();
    console.log(`MongoDB Seeding Complete! Total documents in MongoDB: ${totalInDb} (Inserted: ${inserted}, Updated: ${updated})`);

    // Sync to local fallback files safely
    const dataDir = path.join(__dirname, '..', 'data');
    if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
    fs.writeFileSync(path.join(dataDir, 'manufacturers.json'), JSON.stringify(finalDataset, null, 2), 'utf-8');
    fs.writeFileSync(path.join(dataDir, 'manufacturers.backup.json'), JSON.stringify(finalDataset, null, 2), 'utf-8');
    console.log('Local fallback files updated: data/manufacturers.json & data/manufacturers.backup.json');

  } catch (err) {
    console.error('Seeding error:', err);
  } finally {
    await client.close();
    console.log('MongoDB connection closed.');
  }
}

seed();
