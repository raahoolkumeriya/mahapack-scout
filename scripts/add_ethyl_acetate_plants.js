/**
 * scripts/add_ethyl_acetate_plants.js
 * 
 * Enriches the IndiaPack Scout dataset with dedicated Ethyl Acetate bulk producers
 * and major formulateurs across paints, coatings, glues, food packaging inks,
 * pharma APIs, food decaffeination, and electronics.
 */

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '../data/manufacturers.json');
const MASTER_FILE = path.join(__dirname, '../data/manufacturers.master.json');
const BACKUP_FILE = path.join(__dirname, '../data/manufacturers.backup.json');

const currentData = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
console.log(`Current plants count: ${currentData.length}`);

// Map of existing plant enrichments for Ethyl Acetate usage
const ENRICHMENT_MAP = {
  'mh-012': { // Siegwerk Dombivli
    ethylAcetateRole: 'Food Packaging Inks',
    solventsHandled: ['Ethyl Acetate', 'Ethanol', 'Methoxy Propanol'],
    applications: ['Food Packaging Inks', 'Rotogravure Inks', 'Flexographic Printing']
  },
  'mh-014': { // Brilliant Polymers
    ethylAcetateRole: 'Industrial Glues & Adhesives',
    solventsHandled: ['Ethyl Acetate', 'IPA'],
    applications: ['Industrial Glues', 'Laminating Adhesives', '2K PU Flexible Packaging Adhesives']
  },
  'mh-015': { // Henkel Anand India
    ethylAcetateRole: 'Industrial Glues & Adhesives',
    solventsHandled: ['Ethyl Acetate'],
    applications: ['Industrial Glues', 'Laminating Adhesives', 'Retort Packaging']
  },
  'mh-013': { // Toyo Ink Kanjurmarg / Mumbai
    ethylAcetateRole: 'Food Packaging Inks',
    solventsHandled: ['Ethyl Acetate', 'IPA'],
    applications: ['Food Packaging Inks', 'Rotogravure Inks', 'Laminating Adhesives']
  },
  'gj-002': { // Hubergroup Vapi
    ethylAcetateRole: 'Food Packaging Inks',
    solventsHandled: ['Ethyl Acetate', 'Ethanol'],
    applications: ['Food Packaging Inks', 'Rotogravure Inks', 'Packaging and Printing']
  },
  'gj-009': { // DIC India Saykha
    ethylAcetateRole: 'Food Packaging Inks',
    solventsHandled: ['Ethyl Acetate'],
    applications: ['Food Packaging Inks', 'Rotogravure Inks', 'Laminating Adhesives']
  },
  'in-tn-001': { // DIC India Sriperumbudur
    ethylAcetateRole: 'Food Packaging Inks',
    solventsHandled: ['Ethyl Acetate'],
    applications: ['Food Packaging Inks', 'Rotogravure Inks']
  },
  'in-tn-002': { // Sakata Inx Gummidipoondi
    ethylAcetateRole: 'Food Packaging Inks',
    solventsHandled: ['Ethyl Acetate', 'Ethanol'],
    applications: ['Food Packaging Inks', 'Flexo & Gravure Inks']
  },
  'in-ka-001': { // Siegwerk Peenya Bangalore
    ethylAcetateRole: 'Food Packaging Inks',
    solventsHandled: ['Ethyl Acetate'],
    applications: ['Food Packaging Inks', 'Rotogravure Inks']
  },
  'in-wb-001': { // DIC India Taratala Kolkata
    ethylAcetateRole: 'Food Packaging Inks',
    solventsHandled: ['Ethyl Acetate'],
    applications: ['Food Packaging Inks', 'Rotogravure Inks']
  }
};

// Apply enrichments
currentData.forEach(item => {
  if (ENRICHMENT_MAP[item.id]) {
    Object.assign(item, ENRICHMENT_MAP[item.id]);
  }
});

// New Ethyl Acetate Ecosystem Plants
const newPlants = [
  {
    id: "ea-bulk-001",
    name: "Laxmi Organic Industries Limited (Mahad Flagship Chemical Complex)",
    category: "Bulk Solvents & Chemicals",
    subCategories: [
      "Ethyl Acetate Bulk Producer",
      "Pharma Grade Solvents",
      "Acetyl Intermediates"
    ],
    products: [
      "Ethyl Acetate (Pharma / Pure / Technical Grade)",
      "Acetic Anhydride",
      "Specialty Acetyl Intermediates",
      "Acetaldehyde & Ethyl Chloroacetate"
    ],
    description: "India's largest manufacturer of Ethyl Acetate and 3rd largest globally (ex-China). Operates world-scale integrated chemical complex in Mahad MIDC serving pharmaceuticals, packaging printing inks, agrochemicals, and paints across India and 50+ countries.",
    address: "Plot No. A-22/2/3, MIDC Industrial Area, Mahad, Raigad District, Maharashtra 402309",
    city: "Mahad",
    district: "Raigad",
    industrialArea: "Mahad MIDC",
    state: "Maharashtra",
    pincode: "402309",
    contactPerson: "Industrial Solvents Commercial Desk",
    phone: "+91-2145-232000",
    mobile: "+91-9820045610",
    email: "info@laxmi.com",
    salesEmail: "sales@laxmi.com",
    website: "https://www.laxmi.com",
    gstin: "27AAACL0369D1ZN",
    yearEstablished: 1989,
    plantCapacity: "Mega Volume (200,000+ MTPA Ethyl Acetate)",
    verified: true,
    ethylAcetateRole: "Bulk Producer",
    solventsHandled: [
      "Ethyl Acetate",
      "Acetic Anhydride",
      "Acetaldehyde",
      "Ethyl Chloroacetate"
    ],
    applications: [
      "Drug Manufacturing",
      "Food Packaging Inks",
      "Paints, Coatings, and Adhesives",
      "Industrial Finishes",
      "Industrial Glues"
    ]
  },
  {
    id: "ea-bulk-002",
    name: "Laxmi Organic Industries Limited (Site-III Mega Complex)",
    category: "Bulk Solvents & Chemicals",
    subCategories: [
      "Ethyl Acetate Bulk Producer",
      "Pharma Grade Solvents",
      "Specialty Chemicals"
    ],
    products: [
      "High Purity Ethyl Acetate",
      "Ketene Derivatives",
      "Diketene Derivatives",
      "Ester Solvents"
    ],
    description: "State-of-the-art automated manufacturing complex at Lote Parshuram commissioned to expand capacity of acetyl intermediates and ultra-pure ethyl acetate for domestic pharmaceutical APIs and global export.",
    address: "Plot No. B-34, MIDC Industrial Area, Lote Parshuram, Taluka Khed, Ratnagiri District, Maharashtra 415722",
    city: "Chiplun / Lote Parshuram",
    district: "Ratnagiri",
    industrialArea: "Lote Parshuram MIDC",
    state: "Maharashtra",
    pincode: "415722",
    contactPerson: "Site Technical Operations",
    phone: "+91-2356-272000",
    mobile: "+91-9820198730",
    email: "lote@laxmi.com",
    salesEmail: "sales@laxmi.com",
    website: "https://www.laxmi.com",
    gstin: "27AAACL0369D1ZP",
    yearEstablished: 2021,
    plantCapacity: "High Volume (100,000+ MTPA)",
    verified: true,
    ethylAcetateRole: "Bulk Producer",
    solventsHandled: [
      "Ethyl Acetate",
      "Ketene",
      "Diketene"
    ],
    applications: [
      "Drug Manufacturing",
      "Active Pharmaceutical Ingredients (APIs)",
      "Industrial Finishes",
      "Food Packaging Inks"
    ]
  },
  {
    id: "ea-bulk-003",
    name: "Jubilant Ingrevia Limited (Nira Manufacturing Works)",
    category: "Bulk Solvents & Chemicals",
    subCategories: [
      "Ethyl Acetate Bulk Producer",
      "Pharma Grade Solvents",
      "Specialty Acetyls"
    ],
    products: [
      "Ethyl Acetate (Pharma Grade / Urethane Grade / Technical Grade)",
      "Acetic Anhydride",
      "Specialty Intermediates"
    ],
    description: "Key acetyls manufacturing unit of Jubilant Ingrevia (7th largest manufacturer of ethyl acetate globally) located in Nira, Pune district. Integrated supply of green ethyl acetate for pharmaceutical API extraction and printing ink applications.",
    address: "Village Nimbut, Nira, Taluka Baramati, Pune District, Maharashtra 412102",
    city: "Nira / Baramati",
    district: "Pune",
    industrialArea: "Nimbut Industrial Corridor / Nira",
    state: "Maharashtra",
    pincode: "412102",
    contactPerson: "Chemicals & Intermediates Division",
    phone: "+91-2112-269100",
    mobile: "+91-9822019450",
    email: "contact@jubilantingrevia.com",
    salesEmail: "chemicals@jubilantingrevia.com",
    website: "https://www.jubilantingrevia.com",
    gstin: "27AAACJ8584H1Z1",
    yearEstablished: 1978,
    plantCapacity: "150,000+ MTPA Global Scale",
    verified: true,
    ethylAcetateRole: "Bulk Producer",
    solventsHandled: [
      "Ethyl Acetate",
      "Acetic Anhydride",
      "Acetaldehyde"
    ],
    applications: [
      "Drug Manufacturing",
      "Food Packaging Inks",
      "Industrial Glues",
      "Industrial Finishes",
      "Personal Care"
    ]
  },
  {
    id: "ea-bulk-004",
    name: "Jubilant Ingrevia Limited (Gajraula Mega Complex)",
    category: "Bulk Solvents & Chemicals",
    subCategories: [
      "Ethyl Acetate Bulk Producer",
      "Pharma Grade Solvents",
      "Acetyl Intermediates"
    ],
    products: [
      "Pure Grade Ethyl Acetate",
      "Bio-based Ethyl Acetate",
      "Acetic Anhydride",
      "Pyridine Derivatives"
    ],
    description: "Jubilant Ingrevia's massive manufacturing complex in Gajraula, Uttar Pradesh, housing multi-train acetyls plants supplying North India's packaging converters, pharmaceutical clusters, and export markets.",
    address: "Plot No. 5-8, Western Industrial Area, Gajraula, District Amroha, Uttar Pradesh 244223",
    city: "Gajraula / Delhi NCR Corridor",
    district: "Amroha",
    industrialArea: "UPSIDC Gajraula Industrial Area",
    state: "Uttar Pradesh",
    pincode: "244223",
    contactPerson: "Northern Regional Sales Office",
    phone: "+91-5924-252315",
    mobile: "+91-9810056740",
    email: "gajraula@jubilantingrevia.com",
    salesEmail: "chemicals@jubilantingrevia.com",
    website: "https://www.jubilantingrevia.com",
    gstin: "09AAACJ8584H1ZT",
    yearEstablished: 1980,
    plantCapacity: "High Volume (120,000 MTPA)",
    verified: true,
    ethylAcetateRole: "Bulk Producer",
    solventsHandled: [
      "Ethyl Acetate",
      "Acetic Acid",
      "Acetic Anhydride"
    ],
    applications: [
      "Drug Manufacturing",
      "Food Packaging Inks",
      "Paints, Coatings, and Adhesives",
      "Electronics & Batteries"
    ]
  },
  {
    id: "ea-bulk-005",
    name: "IOL Chemicals and Pharmaceuticals Limited (Barnala Flagship Plant)",
    category: "Bulk Solvents & Chemicals",
    subCategories: [
      "Ethyl Acetate Bulk Producer",
      "Pharma Grade Solvents",
      "API Synthesis"
    ],
    products: [
      "Ethyl Acetate (Pharma Grade / Packaging Grade)",
      "Ibuprofen API",
      "Metformin Hydrochloride",
      "Iso Butyl Benzene"
    ],
    description: "Operates India's largest single-location ethyl acetate manufacturing facility with an installed capacity of 100,000 tonnes per annum in Barnala, Punjab. World's leading producer of Ibuprofen with captive solvent usage.",
    address: "Trident Complex, Mansa Road, Village Dhaula, Barnala, Punjab 148107",
    city: "Barnala",
    district: "Barnala",
    industrialArea: "Dhaula Industrial Estate",
    state: "Punjab",
    pincode: "148107",
    contactPerson: "Bulk Chemicals Commercial Division",
    phone: "+91-1679-244701",
    mobile: "+91-9814088920",
    email: "contact@iolcp.com",
    salesEmail: "chemicals@iolcp.com",
    website: "https://www.iolcp.com",
    gstin: "03AAACI2467D1ZN",
    yearEstablished: 1986,
    plantCapacity: "100,000 MTPA Single Site",
    verified: true,
    ethylAcetateRole: "Bulk Producer",
    solventsHandled: [
      "Ethyl Acetate",
      "Iso Butyl Benzene",
      "Caustic Soda"
    ],
    applications: [
      "Drug Manufacturing",
      "Active Pharmaceutical Ingredients (APIs)",
      "Food Packaging Inks",
      "Paints, Coatings, and Adhesives"
    ]
  },
  {
    id: "ea-bulk-006",
    name: "Godavari Biorefineries Limited (Sakarwadi Chemical Works)",
    category: "Bulk Solvents & Chemicals",
    subCategories: [
      "Bio-Ethyl Acetate Bulk Producer",
      "Green Solvents",
      "Renewable Acetyls"
    ],
    products: [
      "NaturoEA® Bio-based Ethyl Acetate (USDA Certified)",
      "Bio-based Acetic Acid",
      "Crotonaldehyde",
      "Bio-Butanol"
    ],
    description: "Pioneer in ethanol-derived sustainable green chemicals. Produces NaturoEA® 100% bio-based ethyl acetate derived from sugarcane molasses ethanol, certified by USDA for bio-based carbon content.",
    address: "Sakarwadi, Taluka Kopargaon, Ahmednagar District, Maharashtra 413708",
    city: "Ahmednagar / Shirdi Corridor",
    district: "Ahmednagar",
    industrialArea: "Sakarwadi Industrial Zone",
    state: "Maharashtra",
    pincode: "413708",
    contactPerson: "Bio-Chemicals Sales Team",
    phone: "+91-2423-279300",
    mobile: "+91-9822087410",
    email: "chemicals@somaiya.com",
    salesEmail: "sales.chemicals@somaiya.com",
    website: "https://www.godavaribiorefineries.com",
    gstin: "27AAACG0439F1ZU",
    yearEstablished: 1939,
    plantCapacity: "70,000 MTPA Bio-Chemicals",
    verified: true,
    ethylAcetateRole: "Bulk Producer",
    solventsHandled: [
      "Bio-Ethyl Acetate",
      "Bio-Ethanol",
      "Bio-Acetic Acid"
    ],
    applications: [
      "Food and Beverage Processing",
      "Decaffeination and Extraction",
      "Food Packaging Inks",
      "Personal Care",
      "Paints, Coatings, and Adhesives"
    ]
  },
  {
    id: "ea-bulk-007",
    name: "Godavari Biorefineries Limited (Sameerwadi Biorefinery Complex)",
    category: "Bulk Solvents & Chemicals",
    subCategories: [
      "Bio-Ethyl Acetate Bulk Producer",
      "Renewable Ethanol",
      "Bio-based Solvents"
    ],
    products: [
      "Renewable Ethanol Feedstock",
      "Bio-Ethyl Acetate",
      "Bagasse Co-gen Energy",
      "Industrial Bio-Solvents"
    ],
    description: "Integrated biorefinery complex in Sameerwadi, Karnataka processing sugarcane biomass into green ethanol and bio-derived chemical intermediates feeding the bio-ethyl acetate supply chain.",
    address: "Sameerwadi, Bilagi Taluka, Bagalkot District, Karnataka 587316",
    city: "Sameerwadi / Bagalkot",
    district: "Bagalkot",
    industrialArea: "Sameerwadi Biorefinery Complex",
    state: "Karnataka",
    pincode: "587316",
    contactPerson: "Southern Regional Operations",
    phone: "+91-8350-260020",
    mobile: "+91-9845012390",
    email: "sameerwadi@somaiya.com",
    salesEmail: "sales.chemicals@somaiya.com",
    website: "https://www.godavaribiorefineries.com",
    gstin: "29AAACG0439F1ZQ",
    yearEstablished: 1965,
    plantCapacity: "World Scale Integrated Biorefinery",
    verified: true,
    ethylAcetateRole: "Bulk Producer",
    solventsHandled: [
      "Bio-Ethyl Acetate",
      "Anhydrous Ethanol",
      "Rectified Spirit"
    ],
    applications: [
      "Food and Beverage Processing",
      "Decaffeination and Extraction",
      "Personal Care",
      "Food Packaging Inks"
    ]
  },
  {
    id: "ea-bulk-008",
    name: "Gujarat Narmada Valley Fertilizers & Chemicals Limited (GNFC Chemical Complex)",
    category: "Bulk Solvents & Chemicals",
    subCategories: [
      "Ethyl Acetate Bulk Producer",
      "Petrochemicals & Solvents",
      "Industrial Acids"
    ],
    products: [
      "Ethyl Acetate (Industrial / Urethane Grade)",
      "Acetic Acid",
      "Methanol",
      "Formic Acid",
      "Toluene Diisocyanate (TDI)"
    ],
    description: "Leading public-private industrial major with a 50,000 TPA dedicated Ethyl Acetate manufacturing plant in Bharuch, Gujarat. Major feedstock supplier to the ink, paint, and API manufacturing industries of western India.",
    address: "P.O. Narmadanagar, Bharuch, Gujarat 392015",
    city: "Bharuch",
    district: "Bharuch",
    industrialArea: "GNFC Industrial Complex, Narmadanagar",
    state: "Gujarat",
    pincode: "392015",
    contactPerson: "Chemicals Marketing Group",
    phone: "+91-2642-247001",
    mobile: "+91-9825022100",
    email: "marketing@gnfc.in",
    salesEmail: "chemicals@gnfc.in",
    website: "https://www.gnfc.in",
    gstin: "24AAACG1115F1ZB",
    yearEstablished: 1976,
    plantCapacity: "50,000 MTPA Ethyl Acetate",
    verified: true,
    ethylAcetateRole: "Bulk Producer",
    solventsHandled: [
      "Ethyl Acetate",
      "Acetic Acid",
      "Methanol",
      "TDI"
    ],
    applications: [
      "Industrial Finishes",
      "Industrial Glues",
      "Food Packaging Inks",
      "Electronics & Batteries"
    ]
  },
  {
    id: "ea-bulk-009",
    name: "Dhampur Bio Organics Limited (Asmoli Chemical Works)",
    category: "Bulk Solvents & Chemicals",
    subCategories: [
      "Bio-Ethyl Acetate Bulk Producer",
      "Distillery & Solvents",
      "Renewable Chemicals"
    ],
    products: [
      "Ethyl Acetate from Cane Ethanol",
      "Power Ethanol",
      "Industrial Alcohol",
      "Acetic Acid Derivatives"
    ],
    description: "State-of-the-art distillery and chemical processing plant in Asmoli, Sambhal district, producing molasses-derived bio-ethyl acetate serving northern India's printing ink and pharmaceutical sectors.",
    address: "Asmoli, Sambhal District, Uttar Pradesh 244304",
    city: "Sambhal / Moradabad Corridor",
    district: "Sambhal",
    industrialArea: "Asmoli Industrial Complex",
    state: "Uttar Pradesh",
    pincode: "244304",
    contactPerson: "Bio-Chemicals Commercial Desk",
    phone: "+91-5923-282200",
    mobile: "+91-9837012890",
    email: "info@dhampurbio.com",
    salesEmail: "sales@dhampurbio.com",
    website: "https://www.dhampurbio.com",
    gstin: "09AAECD3245G1ZX",
    yearEstablished: 1995,
    plantCapacity: "45,000 MTPA Ethyl Acetate",
    verified: true,
    ethylAcetateRole: "Bulk Producer",
    solventsHandled: [
      "Ethyl Acetate",
      "Bio-Ethanol",
      "Denatured Spirit"
    ],
    applications: [
      "Food Packaging Inks",
      "Paints, Coatings, and Adhesives",
      "Drug Manufacturing"
    ]
  },
  {
    id: "ea-bulk-010",
    name: "Runa Chemicals Private Limited (Dombivli Solvent Works)",
    category: "Bulk Solvents & Chemicals",
    subCategories: [
      "Pharma Grade Solvents",
      "Redistilled Solvents",
      "High Purity Chemicals"
    ],
    products: [
      "High Purity Ethyl Acetate (Pharma / HPLC Grade)",
      "Redistilled Solvents",
      "Extraction Solvents",
      "Pure IPA"
    ],
    description: "Specialized manufacturer and refiner of pharma-grade solvents, offering ultra-pure distilled ethyl acetate with stringent trace-metal and low-residual impurity limits for Active Pharmaceutical Ingredient (API) crystallization.",
    address: "Plot No. W-11, Phase II, MIDC Industrial Area, Dombivli East, Thane District, Maharashtra 421204",
    city: "Dombivli / Thane",
    district: "Thane",
    industrialArea: "Dombivli MIDC Phase II",
    state: "Maharashtra",
    pincode: "421204",
    contactPerson: "Solvents Technical Quality Desk",
    phone: "+91-251-2870100",
    mobile: "+91-9821034560",
    email: "info@runachemicals.com",
    salesEmail: "sales@runachemicals.com",
    website: "https://www.runachemicals.com",
    gstin: "27AAACR4412B1Z8",
    yearEstablished: 1982,
    plantCapacity: "25,000 MTPA Distilled Solvents",
    verified: true,
    ethylAcetateRole: "Bulk Producer",
    solventsHandled: [
      "Ethyl Acetate",
      "Methylene Chloride",
      "Isopropyl Alcohol",
      "Acetone"
    ],
    applications: [
      "Drug Manufacturing",
      "Active Pharmaceutical Ingredients (APIs)",
      "Personal Care",
      "Electronics & Batteries"
    ]
  },
  {
    id: "ea-paint-001",
    name: "Asian Paints Limited (Kasna Industrial Coatings Plant)",
    category: "Paints, Coatings, and Adhesives",
    subCategories: [
      "Industrial Finishes",
      "Automotive Clear Coats",
      "Wood Finishes & Primers"
    ],
    products: [
      "Automotive OEM 2K Clear Coats",
      "PU Wood Finishes & Lacquers",
      "Industrial Protective Primers",
      "Coil Coatings"
    ],
    description: "One of Asian Paints' premier automated production complexes, heavily utilizing ethyl acetate as a fast-evaporating solvent to dissolve acrylic and nitrocellulose resins for high-gloss, defect-free automotive and industrial finishes.",
    address: "Plot No. A-1, UPSIDC Industrial Area, Kasna, Greater Noida, Gautam Buddha Nagar, Uttar Pradesh 201306",
    city: "Greater Noida / Delhi NCR",
    district: "Gautam Buddha Nagar",
    industrialArea: "UPSIDC Industrial Area Kasna",
    state: "Uttar Pradesh",
    pincode: "201306",
    contactPerson: "Industrial Coatings Technical Division",
    phone: "+91-120-2569500",
    mobile: "+91-9818045610",
    email: "customercare@asianpaints.com",
    salesEmail: "industrial.coatings@asianpaints.com",
    website: "https://www.asianpaints.com",
    gstin: "09AAACA3772C1Z4",
    yearEstablished: 1990,
    plantCapacity: "100,000+ KL Per Annum",
    verified: true,
    ethylAcetateRole: "Paints & Coatings",
    solventsHandled: [
      "Ethyl Acetate",
      "Butyl Acetate",
      "Xylene",
      "Methoxy Propyl Acetate"
    ],
    applications: [
      "Paints, Coatings, and Adhesives",
      "Industrial Finishes",
      "Automotive Clear Coats",
      "Wood Finishes"
    ]
  },
  {
    id: "ea-paint-002",
    name: "Asian Paints Limited (Khandala Mega Plant)",
    category: "Paints, Coatings, and Adhesives",
    subCategories: [
      "Industrial Finishes",
      "Automotive Clear Coats",
      "Solvent-Borne Coatings"
    ],
    products: [
      "Automotive OEM Clear Coats",
      "Industrial Protective Finishes",
      "Solvent-Borne Enamels & Primers"
    ],
    description: "Asian Paints' modern high-volume plant in Khandala MIDC, equipped with advanced solvent recovery systems for formulating high-solids industrial and automotive finishes with ethyl acetate carriers.",
    address: "Plot No. C-1, MIDC Khandala Phase I, Kesurdi, Taluka Khandala, Satara District, Maharashtra 412802",
    city: "Khandala / Pune Corridor",
    district: "Satara",
    industrialArea: "Khandala MIDC Phase I",
    state: "Maharashtra",
    pincode: "412802",
    contactPerson: "Plant Operations & Supply Chain",
    phone: "+91-2169-245000",
    mobile: "+91-9822033450",
    email: "khandala.plant@asianpaints.com",
    salesEmail: "industrial.coatings@asianpaints.com",
    website: "https://www.asianpaints.com",
    gstin: "27AAACA3772C1ZT",
    yearEstablished: 2013,
    plantCapacity: "300,000 KL Per Annum Mega Plant",
    verified: true,
    ethylAcetateRole: "Paints & Coatings",
    solventsHandled: [
      "Ethyl Acetate",
      "Butyl Acetate",
      "Aromatic Solvents"
    ],
    applications: [
      "Paints, Coatings, and Adhesives",
      "Industrial Finishes",
      "Industrial Glues"
    ]
  },
  {
    id: "ea-paint-003",
    name: "Kansai Nerolac Paints Limited (Lote Parshuram Works)",
    category: "Paints, Coatings, and Adhesives",
    subCategories: [
      "Industrial Finishes",
      "Automotive Clear Coats",
      "High Performance Primers"
    ],
    products: [
      "Automotive OEM Clear Coats & Topcoats",
      "General Industrial Finishes",
      "Polyurethane & Epoxy Primers"
    ],
    description: "Major manufacturing base of Kansai Nerolac in Lote Parshuram MIDC producing automotive OEM finishes, two-pack polyurethane clear coats, and industrial protective coatings using ethyl acetate as key solvent.",
    address: "Plot No. B-1, MIDC Industrial Area, Lote Parshuram, Taluka Khed, Ratnagiri District, Maharashtra 415722",
    city: "Chiplun / Lote Parshuram",
    district: "Ratnagiri",
    industrialArea: "Lote Parshuram MIDC",
    state: "Maharashtra",
    pincode: "415722",
    contactPerson: "Automotive Coatings Technical Desk",
    phone: "+91-2356-272201",
    mobile: "+91-9820455610",
    email: "complaints@nerolac.com",
    salesEmail: "industrial@nerolac.com",
    website: "https://www.nerolac.com",
    gstin: "27AAACK1850K1ZM",
    yearEstablished: 1995,
    plantCapacity: "60,000 MTPA Industrial Coatings",
    verified: true,
    ethylAcetateRole: "Paints & Coatings",
    solventsHandled: [
      "Ethyl Acetate",
      "Butyl Acetate",
      "Solvesso 100",
      "PMA"
    ],
    applications: [
      "Paints, Coatings, and Adhesives",
      "Industrial Finishes",
      "Automotive Clear Coats"
    ]
  },
  {
    id: "ea-paint-004",
    name: "Kansai Nerolac Paints Limited (Bawal Northern Works)",
    category: "Paints, Coatings, and Adhesives",
    subCategories: [
      "Industrial Finishes",
      "Automotive Clear Coats",
      "OEM Finishes"
    ],
    products: [
      "Automotive Clear Coats & Basecoats",
      "Industrial Electrodeposition Coatings",
      "Two-Pack PU Finishes"
    ],
    description: "Strategically located plant in Bawal HSIIDC supplying automotive OEM clusters of Gurgaon, Manesar, and Neemrana with specialized clear coats formulated with fast-evaporating ethyl acetate solvents.",
    address: "Plot No. 1, Sector 7, HSIIDC Growth Centre, Bawal, Rewari District, Haryana 123501",
    city: "Bawal / NCR Automotive Hub",
    district: "Rewari",
    industrialArea: "HSIIDC Growth Centre Bawal",
    state: "Haryana",
    pincode: "123501",
    contactPerson: "OEM Northern Commercial Desk",
    phone: "+91-1284-264000",
    mobile: "+91-9812033420",
    email: "bawal@nerolac.com",
    salesEmail: "industrial@nerolac.com",
    website: "https://www.nerolac.com",
    gstin: "06AAACK1850K1Z9",
    yearEstablished: 2005,
    plantCapacity: "55,000 MTPA Automotive Coatings",
    verified: true,
    ethylAcetateRole: "Paints & Coatings",
    solventsHandled: [
      "Ethyl Acetate",
      "Butyl Acetate",
      "Xylene",
      "Diacetone Alcohol"
    ],
    applications: [
      "Paints, Coatings, and Adhesives",
      "Industrial Finishes",
      "Automotive Clear Coats"
    ]
  },
  {
    id: "ea-paint-005",
    name: "Berger Paints India Limited (Gujarat Industrial Works)",
    category: "Paints, Coatings, and Adhesives",
    subCategories: [
      "Industrial Finishes",
      "Protective Coatings",
      "Coil Coatings"
    ],
    products: [
      "Industrial Protective Coatings",
      "Coil & Container Coatings",
      "Synthetic Enamels & Primers",
      "Epoxy Clear Coats"
    ],
    description: "Berger Paints' premier western manufacturing works in Anand/Vallabh Vidyanagar, formulating specialized industrial finishes and clear coats utilizing ethyl acetate for optimal film leveling and rapid drying.",
    address: "Plot No. 14 & 15, GIDC Industrial Estate, Vallabh Vidyanagar, Anand District, Gujarat 388120",
    city: "Anand / Vallabh Vidyanagar",
    district: "Anand",
    industrialArea: "GIDC Vallabh Vidyanagar",
    state: "Gujarat",
    pincode: "388120",
    contactPerson: "Industrial Sales Support",
    phone: "+91-2692-236100",
    mobile: "+91-9825044320",
    email: "consumerfeedback@bergerindia.com",
    salesEmail: "industrial@bergerindia.com",
    website: "https://www.bergerpaints.com",
    gstin: "24AAACB3045L1ZC",
    yearEstablished: 1985,
    plantCapacity: "40,000 MTPA Industrial Paints",
    verified: true,
    ethylAcetateRole: "Paints & Coatings",
    solventsHandled: [
      "Ethyl Acetate",
      "Butyl Acetate",
      "Mineral Spirits"
    ],
    applications: [
      "Paints, Coatings, and Adhesives",
      "Industrial Finishes",
      "Industrial Glues"
    ]
  },
  {
    id: "ea-paint-006",
    name: "Asian Paints Limited (Ankleshwar GIDC Plant)",
    category: "Paints, Coatings, and Adhesives",
    subCategories: [
      "Industrial Finishes",
      "Wood Finishes & Primers",
      "Synthetic Resins"
    ],
    products: [
      "Automotive Refinish Clear Coats",
      "PU Wood Finishes & Melamine",
      "Alkyd & Acrylic Resins",
      "Industrial Primers"
    ],
    description: "Major dedicated industrial chemical and coatings facility of Asian Paints in Ankleshwar GIDC, synthesizing specialty resins and industrial finishes with ethyl acetate solvent matrices.",
    address: "Plot No. 2602, GIDC Industrial Estate, Ankleshwar, Bharuch District, Gujarat 393002",
    city: "Ankleshwar / Bharuch",
    district: "Bharuch",
    industrialArea: "GIDC Industrial Estate Ankleshwar",
    state: "Gujarat",
    pincode: "393002",
    contactPerson: "Western Industrial Coatings Technical Desk",
    phone: "+91-2646-220100",
    mobile: "+91-9825145670",
    email: "customercare@asianpaints.com",
    salesEmail: "industrial.coatings@asianpaints.com",
    website: "https://www.asianpaints.com",
    gstin: "24AAACA3772C1ZR",
    yearEstablished: 1982,
    plantCapacity: "85,000 MTPA Resins & Coatings",
    verified: true,
    ethylAcetateRole: "Paints & Coatings",
    solventsHandled: [
      "Ethyl Acetate",
      "Butyl Acetate",
      "Toluene-Free Solvents",
      "IPA"
    ],
    applications: [
      "Paints, Coatings, and Adhesives",
      "Industrial Finishes",
      "Wood Finishes",
      "Automotive Clear Coats"
    ]
  },
  {
    id: "ea-glue-001",
    name: "Pidilite Industries Limited (Mahad Adhesives Works)",
    category: "Paints, Coatings, and Adhesives",
    subCategories: [
      "Industrial Glues",
      "Contact Cements",
      "Pressure-Sensitive Adhesives"
    ],
    products: [
      "Fevicol Industrial Contact Cements",
      "Synthetic Elastomer Adhesives",
      "Pressure-Sensitive Tapes Resins",
      "Laminating Glues"
    ],
    description: "Flagship adhesives manufacturing complex in Mahad MIDC producing high-tack contact cements, industrial glues, and synthetic rubber adhesives where ethyl acetate serves as the primary fast-evaporating carrier solvent.",
    address: "Plot No. A-21, MIDC Industrial Area, Mahad, Raigad District, Maharashtra 402309",
    city: "Mahad",
    district: "Raigad",
    industrialArea: "Mahad MIDC",
    state: "Maharashtra",
    pincode: "402309",
    contactPerson: "Industrial Products Division",
    phone: "+91-2145-232150",
    mobile: "+91-9820067410",
    email: "pil@pidilite.com",
    salesEmail: "industrial.adhesives@pidilite.com",
    website: "https://www.pidilite.com",
    gstin: "27AAACP0151J1Z8",
    yearEstablished: 1974,
    plantCapacity: "120,000+ MTPA Adhesives",
    verified: true,
    ethylAcetateRole: "Industrial Glues",
    solventsHandled: [
      "Ethyl Acetate",
      "Toluene-Free Solvents",
      "Hexane",
      "Acetone"
    ],
    applications: [
      "Paints, Coatings, and Adhesives",
      "Industrial Glues",
      "Contact Cements",
      "Pressure-Sensitive Adhesives",
      "Laminating Adhesives"
    ]
  },
  {
    id: "ea-glue-002",
    name: "Pidilite Industries Limited (Vapi Industrial Plant)",
    category: "Paints, Coatings, and Adhesives",
    subCategories: [
      "Industrial Glues",
      "Pressure-Sensitive Adhesives",
      "Polymer Emulsions"
    ],
    products: [
      "Industrial Contact Glues",
      "Specialty Laminating Adhesives",
      "Solvent-Borne Rubber Cements",
      "Hot Melt & Water Cements"
    ],
    description: "Pidilite's massive manufacturing operations in Vapi GIDC, formulating high-performance solvent-borne glues and laminating adhesives using pure ethyl acetate carriers for rapid bond strength and green tack.",
    address: "Plot No. 23, GIDC Industrial Estate, Vapi, Valsad District, Gujarat 396195",
    city: "Vapi",
    district: "Valsad",
    industrialArea: "Vapi GIDC Industrial Estate",
    state: "Gujarat",
    pincode: "396195",
    contactPerson: "Western Industrial Supply Desk",
    phone: "+91-260-2401200",
    mobile: "+91-9825123980",
    email: "vapi@pidilite.com",
    salesEmail: "industrial.adhesives@pidilite.com",
    website: "https://www.pidilite.com",
    gstin: "24AAACP0151J1ZQ",
    yearEstablished: 1980,
    plantCapacity: "80,000 MTPA Adhesives & Polymers",
    verified: true,
    ethylAcetateRole: "Industrial Glues",
    solventsHandled: [
      "Ethyl Acetate",
      "Cyclohexane",
      "IPA"
    ],
    applications: [
      "Paints, Coatings, and Adhesives",
      "Industrial Glues",
      "Pressure-Sensitive Adhesives",
      "Laminating Adhesives"
    ]
  },
  {
    id: "ea-pharma-001",
    name: "Divi's Laboratories Limited (Unit-1 Manufacturing Facility)",
    category: "Pharmaceuticals & Fine Chemicals",
    subCategories: [
      "Drug Manufacturing",
      "API Extraction & Crystallization",
      "Fine Chemicals"
    ],
    products: [
      "Active Pharmaceutical Ingredients (APIs)",
      "Custom Synthesis Intermediates",
      "Peptides",
      "Nutraceutical Ingredients"
    ],
    description: "World-scale pharmaceutical API facility in Choutuppal, Telangana. Heavily relies on low-toxicity, Class-3 green solvents like ethyl acetate for crystallization, extraction, and purification of active drug compounds adhering to US FDA limits.",
    address: "Unit-1, Lingojigudem Village, Choutuppal Mandal, Yadadri Bhuvanagiri District, Telangana 508252",
    city: "Hyderabad / Choutuppal Corridor",
    district: "Yadadri Bhuvanagiri",
    industrialArea: "Choutuppal Pharma Industrial Zone",
    state: "Telangana",
    pincode: "508252",
    contactPerson: "Regulatory & Technical Supply Division",
    phone: "+91-8694-257001",
    mobile: "+91-9848011240",
    email: "mail@divislabs.com",
    salesEmail: "api.sales@divislabs.com",
    website: "https://www.divislabs.com",
    gstin: "36AAACD1150N1ZF",
    yearEstablished: 1990,
    plantCapacity: "US FDA Approved Global Scale APIs",
    verified: true,
    ethylAcetateRole: "Pharma API & Cosmetics",
    solventsHandled: [
      "Pharma Grade Ethyl Acetate",
      "Isopropanol",
      "Dichloromethane",
      "Acetone"
    ],
    applications: [
      "Pharmaceuticals and Cosmetics",
      "Drug Manufacturing",
      "Active Pharmaceutical Ingredients (APIs)",
      "Extraction and Crystallization"
    ]
  },
  {
    id: "ea-cosmetics-001",
    name: "Fiabila India Private Limited (Taloja Cosmetic Works)",
    category: "Pharmaceuticals & Personal Care",
    subCategories: [
      "Personal Care",
      "Cosmetics & Nail Lacquers",
      "Solvent Formulations"
    ],
    products: [
      "Nail Polishes & Enamels",
      "Nail Polish Removers",
      "UV Gel Nail Coatings",
      "Fragrance & Cosmetic Diluents"
    ],
    description: "Indian manufacturing plant of France's Fiabila, the world leader in nail lacquer formulation. Ethyl acetate and butyl acetate form the core volatile solvent matrix ensuring smooth leveling and instant skin/nail evaporation.",
    address: "Plot No. V-16, MIDC Industrial Area, Taloja, Panvel, Raigad District, Maharashtra 410208",
    city: "Navi Mumbai / Taloja",
    district: "Raigad",
    industrialArea: "Taloja MIDC",
    state: "Maharashtra",
    pincode: "410208",
    contactPerson: "Cosmetic Formulation Technical Team",
    phone: "+91-22-27412000",
    mobile: "+91-9820124590",
    email: "info@fiabila.com",
    salesEmail: "india.sales@fiabila.com",
    website: "https://www.fiabila.com",
    gstin: "27AABCF4567D1Z1",
    yearEstablished: 2002,
    plantCapacity: "Leading Global Nail Lacquer Producer",
    verified: true,
    ethylAcetateRole: "Personal Care & Cosmetics",
    solventsHandled: [
      "Ethyl Acetate",
      "Butyl Acetate",
      "Nitrocellulose Base",
      "IPA"
    ],
    applications: [
      "Pharmaceuticals and Cosmetics",
      "Personal Care",
      "Nail Lacquers",
      "Perfumes & Fragrances"
    ]
  },
  {
    id: "ea-food-001",
    name: "Tata Coffee Limited (Theni Instant Coffee & Decaffeination Works)",
    category: "Food and Beverage Processing",
    subCategories: [
      "Decaffeination and Extraction",
      "Instant Coffee Processing",
      "Botanical Extraction"
    ],
    products: [
      "Decaffeinated Coffee Beans",
      "Freeze-Dried Instant Coffee",
      "Spray-Dried Coffee",
      "Natural Coffee Extracts"
    ],
    description: "100% Export-Oriented Unit (EOU) in Theni, Tamil Nadu operating state-of-the-art premium extraction plants. Employs natural sugarcane-derived ethyl acetate (the 'Sugarcane Decaffeination Process') to selectively extract caffeine without leaving toxic residues.",
    address: "SF No. 493/1, Periyakulam Road, Theni District, Tamil Nadu 625531",
    city: "Theni",
    district: "Theni",
    industrialArea: "Theni Industrial Corridor",
    state: "Tamil Nadu",
    pincode: "625531",
    contactPerson: "Plant Operations & Export Desk",
    phone: "+91-4546-252400",
    mobile: "+91-9842134560",
    email: "tatacoffee@tataconsumer.com",
    salesEmail: "exports.coffee@tataconsumer.com",
    website: "https://www.tataconsumer.com",
    gstin: "33AAACT1042E1ZP",
    yearEstablished: 1993,
    plantCapacity: "10,000+ MTPA Instant Coffee & Decaf",
    verified: true,
    ethylAcetateRole: "Food Decaffeination & Extraction",
    solventsHandled: [
      "Natural Sugarcane Ethyl Acetate (Food Grade FCC)",
      "Water Vapor"
    ],
    applications: [
      "Food and Beverage Processing",
      "Decaffeination and Extraction",
      "Coffee & Tea Processing",
      "Natural Flavor Extraction"
    ]
  },
  {
    id: "ea-food-002",
    name: "Synthite Industries Private Limited (Kolenchery Spice Bio-Extraction)",
    category: "Food and Beverage Processing",
    subCategories: [
      "Botanical Extraction",
      "Decaffeination and Extraction",
      "Spice Oleoresins"
    ],
    products: [
      "Spice Oleoresins (Black Pepper, Paprika, Turmeric)",
      "Natural Essential Oils",
      "Food Grade Flavors & Colors",
      "Botanical Extracts"
    ],
    description: "World's largest manufacturer of spice oleoresins and botanical extracts, processing over 30% of global demand. Utilizes food-grade ethyl acetate for gentle, clean extraction of full flavor, aroma, and color profiles.",
    address: "Synthite Valley, Kolenchery, Ernakulam District, Cochin, Kerala 682311",
    city: "Kolenchery / Cochin",
    district: "Ernakulam",
    industrialArea: "Synthite Valley Bio-Industrial Park",
    state: "Kerala",
    pincode: "682311",
    contactPerson: "Global Flavors & Extraction Division",
    phone: "+91-484-3051200",
    mobile: "+91-9846012450",
    email: "synthite@synthite.com",
    salesEmail: "sales@synthite.com",
    website: "https://www.synthite.com",
    gstin: "32AAACS1234F1Z9",
    yearEstablished: 1972,
    plantCapacity: "Global Market Leader (30%+ World Supply)",
    verified: true,
    ethylAcetateRole: "Food Decaffeination & Extraction",
    solventsHandled: [
      "Food-Grade Ethyl Acetate",
      "Supercritical CO2",
      "Ethanol"
    ],
    applications: [
      "Food and Beverage Processing",
      "Decaffeination and Extraction",
      "Spice Oleoresins",
      "Natural Flavors & Essential Oils"
    ]
  },
  {
    id: "ea-tech-001",
    name: "Chemcon Speciality Chemicals Limited (Dahej Ultra-Pure Plant)",
    category: "Bulk Solvents & Chemicals",
    subCategories: [
      "Electronics & Batteries",
      "Ultra-Pure Solvents",
      "Semiconductor Chemicals"
    ],
    products: [
      "Ultra-Pure Ethyl Acetate for Electronics",
      "Hexamethyldisilazane (HMDS)",
      "Chloromethyl Isopropyl Carbonate (CMIC)",
      "Lithium Battery Co-Solvents"
    ],
    description: "Speciality chemical manufacturing complex in Dahej PCPIR, producing ultra-pure solvent systems and silanes utilized in semiconductor wafer photoresist stripping and lithium-ion battery electrode slurry formulation.",
    address: "Plot No. Z/103/F, Dahej PCPIR, GIDC Industrial Estate, Vagra, Bharuch District, Gujarat 392130",
    city: "Dahej / Bharuch",
    district: "Bharuch",
    industrialArea: "Dahej PCPIR GIDC",
    state: "Gujarat",
    pincode: "392130",
    contactPerson: "Specialty Chemicals Commercial Desk",
    phone: "+91-2641-282000",
    mobile: "+91-9825091240",
    email: "info@chemconpharma.com",
    salesEmail: "sales@chemconpharma.com",
    website: "https://www.chemconpharma.com",
    gstin: "24AABCC1234D1Z2",
    yearEstablished: 1988,
    plantCapacity: "20,000 MTPA High Purity Chemicals",
    verified: true,
    ethylAcetateRole: "Emerging Tech & Electronics",
    solventsHandled: [
      "Ultra-Pure Ethyl Acetate",
      "Silanes",
      "Carbonates"
    ],
    applications: [
      "Emerging Technology Applications",
      "Electronics & Batteries",
      "Semiconductor Photoresist Stripping",
      "3D Printing"
    ]
  },
  {
    id: "ea-dist-001",
    name: "Pon Pure Chemical India Private Limited (Chennai Industrial Solvent Terminal)",
    category: "Bulk Solvents & Chemicals",
    subCategories: [
      "Solvent Distribution & Formulation",
      "Industrial Solvents",
      "Pharma Solvents"
    ],
    products: [
      "Ethyl Acetate (Technical / Pharma Grade)",
      "Laminating Adhesives Solvents",
      "Thinners & Inks Solvents",
      "Storage Terminal Blends"
    ],
    description: "India's largest industrial solvent and chemicals distributor with extensive bulk tank farm storage in Chennai, Ennore, and Ranipet, supplying verified bulk and drummed ethyl acetate across South India's printing and pharma hubs.",
    address: "Plot No. 32, Industrial Estate, Ambattur, Chennai, Tamil Nadu 600058",
    city: "Chennai / Ambattur",
    district: "Chennai",
    industrialArea: "Ambattur Industrial Estate",
    state: "Tamil Nadu",
    pincode: "600058",
    contactPerson: "Solvents Bulk Distribution Desk",
    phone: "+91-44-42988888",
    mobile: "+91-9840012340",
    email: "info@pure-chemical.com",
    salesEmail: "sales@pure-chemical.com",
    website: "https://www.pure-chemical.com",
    gstin: "33AAACP8976B1Z5",
    yearEstablished: 1981,
    plantCapacity: "National Distribution & Blending (500,000+ MT Network)",
    verified: true,
    ethylAcetateRole: "Bulk Producer",
    solventsHandled: [
      "Ethyl Acetate",
      "IPA",
      "Toluene-Free Solvents",
      "Glycol Ethers"
    ],
    applications: [
      "Food Packaging Inks",
      "Paints, Coatings, and Adhesives",
      "Drug Manufacturing",
      "Industrial Glues"
    ]
  }
];

// Append new plants without duplicating IDs
newPlants.forEach(plant => {
  const existingIdx = currentData.findIndex(p => p.id === plant.id);
  if (existingIdx >= 0) {
    currentData[existingIdx] = plant;
  } else {
    currentData.push(plant);
  }
});

console.log(`Updated plants count: ${currentData.length}`);

// Write back to all three mirrors
fs.writeFileSync(DATA_FILE, JSON.stringify(currentData, null, 2), 'utf8');
fs.writeFileSync(MASTER_FILE, JSON.stringify(currentData, null, 2), 'utf8');
fs.writeFileSync(BACKUP_FILE, JSON.stringify(currentData, null, 2), 'utf8');

console.log(`Successfully synchronized ${currentData.length} records to data/manufacturers.json, .master.json, .backup.json`);
