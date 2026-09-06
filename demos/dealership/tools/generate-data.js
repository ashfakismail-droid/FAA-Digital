/*
 * Prestige Motors — Data & Asset Generator
 * Generates:
 *   - assets/data/vehicles.js   (90+ realistic vehicles)
 *   - assets/data/blog.js       (10 articles)
 *   - assets/data/offers.js     (special offers)
 *   - assets/img/brands/*.svg   (manufacturer wordmarks)
 *   - assets/img/vehicles/*.svg (unique, body-type + color matched imagery)
 *
 * Run:  node tools/generate-data.js
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const IMG_DIR = path.join(ROOT, 'assets', 'img');
const DATA_DIR = path.join(ROOT, 'assets', 'data');
fs.mkdirSync(path.join(IMG_DIR, 'brands'), { recursive: true });
fs.mkdirSync(path.join(IMG_DIR, 'vehicles'), { recursive: true });
fs.mkdirSync(DATA_DIR, { recursive: true });

/* ------------------------------------------------------------------ */
/*  Brand palette                                                      */
/* ------------------------------------------------------------------ */
const BRANDS = {
  'BMW':          { color: '#1c69d4', text: '#ffffff' },
  'Mercedes-Benz':{ color: '#9b7d3a', text: '#ffffff' },
  'Audi':         { color: '#bb0a30', text: '#ffffff' },
  'Porsche':      { color: '#d5001c', text: '#ffffff' },
  'Ferrari':      { color: '#dc0000', text: '#ffffff' },
  'Lamborghini':  { color: '#cc3333', text: '#ffffff' },
  'Rolls-Royce':  { color: '#1a1a1a', text: '#d4af37' },
  'Bentley':      { color: '#1f3a5f', text: '#d4af37' },
  'Range Rover':  { color: '#4a5d23', text: '#ffffff' },
  'Tesla':        { color: '#cc0000', text: '#ffffff' },
  'Volvo':        { color: '#003057', text: '#ffffff' },
  'Toyota':       { color: '#eb0a1e', text: '#ffffff' },
  'Honda':        { color: '#cc0000', text: '#ffffff' },
  'Lexus':        { color: '#0a0a0a', text: '#b08d57' },
  'Hyundai':      { color: '#002c5f', text: '#ffffff' },
  'Kia':          { color: '#b30a1f', text: '#ffffff' },
  'Ford':         { color: '#003478', text: '#ffffff' },
  'Jeep':         { color: '#000000', text: '#ffffff' }
};

/* ------------------------------------------------------------------ */
/*  Body type silhouettes (side profiles)                              */
/* ------------------------------------------------------------------ */
function bodyPath(body) {
  switch (body) {
    case 'SUV':
      return 'M40,250 L70,250 L95,170 L300,150 L470,160 L520,250 L560,250 L560,300 L40,300 Z M120,250 a40,40 0 1,0 80,0 a40,40 0 1,0 -80,0 M400,250 a40,40 0 1,0 80,0 a40,40 0 1,0 -80,0';
    case 'Pickup Truck':
      return 'M40,250 L70,250 L95,170 L300,160 L320,160 L320,250 L560,250 L560,300 L40,300 Z M120,250 a40,40 0 1,0 80,0 a40,40 0 1,0 -80,0 M400,250 a40,40 0 1,0 80,0 a40,40 0 1,0 -80,0';
    case 'Convertible':
      return 'M40,250 L70,250 L100,180 L300,165 L470,175 L520,250 L560,250 L560,300 L40,300 Z M120,250 a40,40 0 1,0 80,0 a40,40 0 1,0 -80,0 M400,250 a40,40 0 1,0 80,0 a40,40 0 1,0 -80,0';
    case 'Coupe':
      return 'M40,255 L75,255 L110,185 L300,160 L470,180 L520,255 L560,255 L560,300 L40,300 Z M120,255 a38,38 0 1,0 76,0 a38,38 0 1,0 -76,0 M400,255 a38,38 0 1,0 76,0 a38,38 0 1,0 -76,0';
    case 'Hatchback':
      return 'M40,255 L75,255 L105,185 L300,165 L480,180 L525,255 L560,255 L560,300 L40,300 Z M120,255 a38,38 0 1,0 76,0 a38,38 0 1,0 -76,0 M400,255 a38,38 0 1,0 76,0 a38,38 0 1,0 -76,0';
    case 'Van':
      return 'M40,250 L70,250 L95,165 L520,160 L540,250 L560,250 L560,300 L40,300 Z M120,250 a40,40 0 1,0 80,0 a40,40 0 1,0 -80,0 M400,250 a40,40 0 1,0 80,0 a40,40 0 1,0 -80,0';
    case 'Sedan':
    default:
      return 'M40,255 L75,255 L110,190 L300,165 L470,185 L520,255 L560,255 L560,300 L40,300 Z M120,255 a38,38 0 1,0 76,0 a38,38 0 1,0 -76,0 M400,255 a38,38 0 1,0 76,0 a38,38 0 1,0 -76,0';
  }
}

/* ------------------------------------------------------------------ */
/*  Vehicle SVG generator (unique per vehicle)                         */
/* ------------------------------------------------------------------ */
function vehicleSVG(brand, body, extColor, label) {
  const c = BRANDS[brand] || { color: '#222', text: '#fff' };
  const path = bodyPath(body);
  // subtle gradient from the exterior color
  const id = 'g' + Math.random().toString(36).slice(2, 8);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 360" width="600" height="360" role="img" aria-label="${label}">
  <defs>
    <linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#f4f6f8"/>
      <stop offset="1" stop-color="#d7dde3"/>
    </linearGradient>
    <linearGradient id="${id}b" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${extColor}"/>
      <stop offset="1" stop-color="${shade(extColor, -28)}"/>
    </linearGradient>
  </defs>
  <rect width="600" height="360" fill="url(#${id})"/>
  <ellipse cx="300" cy="312" rx="270" ry="20" fill="#000" opacity="0.10"/>
  <path d="${path}" fill="url(#${id}b)" stroke="${shade(extColor, -45)}" stroke-width="2"/>
  <path d="M150,200 L300,182 L300,205 L160,212 Z" fill="#cfe3f2" opacity="0.85"/>
  <path d="M312,182 L460,196 L470,212 L312,205 Z" fill="#cfe3f2" opacity="0.85"/>
  <circle cx="158" cy="255" r="38" fill="#15181c"/><circle cx="158" cy="255" r="18" fill="#3a3f45"/>
  <circle cx="438" cy="255" r="38" fill="#15181c"/><circle cx="438" cy="255" r="18" fill="#3a3f45"/>
  <rect x="500" y="232" width="40" height="14" rx="4" fill="#fff3b0" opacity="0.9"/>
  <rect x="40" y="232" width="30" height="12" rx="4" fill="#ff5a5a" opacity="0.9"/>
  <text x="300" y="345" text-anchor="middle" font-family="Georgia, serif" font-size="20" fill="${c.color}" font-weight="700">${brand}</text>
</svg>`;
  return svg;
}

function shade(hex, amt) {
  const n = parseInt(hex.slice(1), 16);
  let r = (n >> 16) + amt, g = ((n >> 8) & 255) + amt, b = (n & 255) + amt;
  r = Math.max(0, Math.min(255, r)); g = Math.max(0, Math.min(255, g)); b = Math.max(0, Math.min(255, b));
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

/* ------------------------------------------------------------------ */
/*  Brand logo SVG (wordmark)                                          */
/* ------------------------------------------------------------------ */
function brandSVG(brand) {
  const c = BRANDS[brand];
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 80" width="240" height="80" role="img" aria-label="${brand}">
  <rect width="240" height="80" rx="8" fill="${c.color}"/>
  <text x="120" y="50" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="26" fill="${c.text}" font-weight="700" letter-spacing="1">${brand}</text>
</svg>`;
  return svg;
}

/* ------------------------------------------------------------------ */
/*  Vehicle model catalogue                                            */
/* ------------------------------------------------------------------ */
// [brand, model, body, basePrice, hp, engine, topSpeed, accel, fuel, transmission, drive, seats]
const CATALOG = [
  ['BMW','3 Series','Sedan',42900,255,'2.0L Turbo I4',240,5.8,'Petrol','Automatic','RWD',5],
  ['BMW','5 Series','Sedan',58900,335,'3.0L Turbo I6',250,4.9,'Petrol','Automatic','RWD',5],
  ['BMW','7 Series','Sedan',94000,375,'3.0L Turbo I6',155,5.2,'Petrol','Automatic','AWD',5],
  ['BMW','X3','SUV',48000,248,'2.0L Turbo I4',210,6.6,'Petrol','Automatic','AWD',5],
  ['BMW','X5','SUV',65000,335,'3.0L Turbo I6',210,5.5,'Petrol','Automatic','AWD',7],
  ['BMW','X7','SUV',78000,375,'3.0L Turbo I6',210,5.8,'Petrol','Automatic','AWD',7],
  ['BMW','M4','Coupe',79000,503,'3.0L Twin-Turbo I6',180,3.8,'Petrol','Automatic','RWD',4],
  ['BMW','i4','Sedan',55900,335,'Electric Motor',180,5.7,'Electric','Automatic','AWD',5],
  ['BMW','iX','SUV',84900,516,'Dual Electric Motor',124,4.6,'Electric','Automatic','AWD',5],
  ['BMW','Z4','Convertible',52900,382,'3.0L Turbo I6',155,4.5,'Petrol','Automatic','RWD',2],

  ['Mercedes-Benz','A-Class','Hatchback',38900,221,'1.3L Turbo I4',234,6.9,'Petrol','Automatic','FWD',5],
  ['Mercedes-Benz','C-Class','Sedan',47900,255,'2.0L Turbo I4',246,6.0,'Petrol','Automatic','RWD',5],
  ['Mercedes-Benz','E-Class','Sedan',62900,362,'3.0L Turbo I6',250,5.0,'Petrol','Automatic','AWD',5],
  ['Mercedes-Benz','S-Class','Sedan',112000,429,'3.0L Turbo I6',209,4.9,'Petrol','Automatic','AWD',5],
  ['Mercedes-Benz','GLA','SUV',39900,221,'1.3L Turbo I4',210,6.9,'Petrol','Automatic','FWD',5],
  ['Mercedes-Benz','GLC','SUV',52900,255,'2.0L Turbo I4',240,6.2,'Petrol','Automatic','AWD',5],
  ['Mercedes-Benz','GLE','SUV',69000,362,'3.0L Turbo I6',250,5.6,'Petrol','Automatic','AWD',7],
  ['Mercedes-Benz','G-Wagon','SUV',139000,577,'4.0L Twin-Turbo V8',210,4.5,'Petrol','Automatic','AWD',5],
  ['Mercedes-Benz','EQS','Sedan',102000,516,'Electric Motor',210,4.3,'Electric','Automatic','AWD',5],
  ['Mercedes-Benz','AMG GT','Coupe',134000,577,'4.0L Twin-Turbo V8',318,3.2,'Petrol','Automatic','RWD',2],

  ['Audi','A3','Sedan',37900,201,'1.5L Turbo I4',232,7.0,'Petrol','Automatic','FWD',5],
  ['Audi','A4','Sedan',44900,261,'2.0L Turbo I4',246,5.8,'Petrol','Automatic','AWD',5],
  ['Audi','A6','Sedan',58900,335,'3.0L Turbo V6',250,5.1,'Petrol','Automatic','AWD',5],
  ['Audi','A8','Sedan',99000,462,'3.0L Turbo V6',250,4.8,'Petrol','Automatic','AWD',5],
  ['Audi','Q3','SUV',39900,184,'1.5L Turbo I4',206,8.0,'Petrol','Automatic','FWD',5],
  ['Audi','Q5','SUV',49900,261,'2.0L Turbo I4',240,6.1,'Petrol','Automatic','AWD',5],
  ['Audi','Q7','SUV',65900,335,'3.0L Turbo V6',250,5.7,'Petrol','Automatic','AWD',7],
  ['Audi','Q8','SUV',78900,335,'3.0L Turbo V6',250,5.6,'Petrol','Automatic','AWD',5],
  ['Audi','e-tron GT','Sedan',106000,469,'Dual Electric Motor',245,4.1,'Electric','Automatic','AWD',4],
  ['Audi','RS e-tron GT','Sedan',139000,637,'Dual Electric Motor',250,3.3,'Electric','Automatic','AWD',4],

  ['Porsche','911 Carrera','Coupe',114000,379,'3.0L Twin-Turbo H6',293,4.1,'Petrol','Automatic','RWD',4],
  ['Porsche','911 Turbo S','Coupe',230000,640,'3.8L Twin-Turbo H6',330,2.7,'Petrol','Automatic','AWD',4],
  ['Porsche','Cayenne','SUV',79000,348,'3.0L Turbo V6',248,6.0,'Petrol','Automatic','AWD',5],
  ['Porsche','Macan','SUV',62000,261,'2.0L Turbo I4',232,6.2,'Petrol','Automatic','AWD',5],
  ['Porsche','Taycan','Sedan',92000,402,'Electric Motor',230,5.1,'Electric','Automatic','AWD',4],
  ['Porsche','Panamera','Sedan',92000,325,'2.9L Twin-Turbo V6',272,5.3,'Petrol','Automatic','AWD',4],

  ['Ferrari','Roma','Coupe',222000,612,'3.9L Twin-Turbo V8',320,3.4,'Petrol','Automatic','RWD',4],
  ['Ferrari','F8 Tributo','Coupe',280000,710,'3.9L Twin-Turbo V8',340,2.9,'Petrol','Automatic','RWD',2],
  ['Ferrari','296 GTB','Coupe',322000,818,'3.0L Twin-Turbo V6 Hybrid',330,2.9,'Hybrid','Automatic','RWD',2],
  ['Ferrari','SF90 Stradale','Coupe',625000,986,'4.0L V8 Hybrid',340,2.5,'Hybrid','Automatic','AWD',2],

  ['Lamborghini','Huracan','Coupe',240000,631,'5.2L V10',325,2.9,'Petrol','Automatic','AWD',2],
  ['Lamborghini','Aventador','Coupe',550000,769,'6.5L V12',350,2.8,'Petrol','Automatic','AWD',2],
  ['Lamborghini','Urus','SUV',230000,657,'4.0L Twin-Turbo V8',305,3.6,'Petrol','Automatic','AWD',5],

  ['Rolls-Royce','Ghost','Sedan',340000,563,'6.75L Twin-Turbo V12',250,4.8,'Petrol','Automatic','AWD',5],
  ['Rolls-Royce','Phantom','Sedan',460000,563,'6.75L Twin-Turbo V12',240,5.3,'Petrol','Automatic','RWD',5],
  ['Rolls-Royce','Cullinan','SUV',390000,563,'6.75L Twin-Turbo V12',250,5.2,'Petrol','Automatic','AWD',5],

  ['Bentley','Continental GT','Coupe',230000,542,'4.0L Twin-Turbo V8',318,3.9,'Petrol','Automatic','AWD',4],
  ['Bentley','Flying Spur','Sedan',220000,542,'4.0L Twin-Turbo V8',318,4.1,'Petrol','Automatic','AWD',5],
  ['Bentley','Bentayga','SUV',190000,542,'4.0L Twin-Turbo V8',290,4.5,'Petrol','Automatic','AWD',5],

  ['Range Rover','Evoque','SUV',49000,246,'2.0L Turbo I4',230,7.0,'Petrol','Automatic','AWD',5],
  ['Range Rover','Velar','SUV',62000,296,'2.0L Turbo I4',217,6.2,'Petrol','Automatic','AWD',5],
  ['Range Rover','Sport','SUV',89000,395,'3.0L Turbo I6',225,5.7,'Petrol','Automatic','AWD',5],
  ['Range Rover','Vogue','SUV',105000,395,'3.0L Turbo I6',225,6.0,'Petrol','Automatic','AWD',5],

  ['Tesla','Model 3','Sedan',42900,283,'Electric Motor',233,4.4,'Electric','Automatic','RWD',5],
  ['Tesla','Model S','Sedan',89900,670,'Dual Electric Motor',322,3.1,'Electric','Automatic','AWD',5],
  ['Tesla','Model X','SUV',99900,670,'Dual Electric Motor',262,3.8,'Electric','Automatic','AWD',7],
  ['Tesla','Model Y','SUV',52900,384,'Dual Electric Motor',217,4.8,'Electric','Automatic','AWD',5],

  ['Volvo','XC40','SUV',39900,197,'2.0L Turbo I4',180,8.0,'Petrol','Automatic','FWD',5],
  ['Volvo','XC60','SUV',49900,250,'2.0L Turbo I4',180,6.9,'Petrol','Automatic','AWD',5],
  ['Volvo','XC90','SUV',62900,300,'2.0L Turbo I4 Hybrid',180,6.5,'Hybrid','Automatic','AWD',7],
  ['Volvo','S90','Sedan',58900,250,'2.0L Turbo I4',180,7.0,'Petrol','Automatic','AWD',5],

  ['Toyota','Corolla','Sedan',24900,169,'2.0L I4',180,9.2,'Petrol','Automatic','FWD',5],
  ['Toyota','Camry','Sedan',28900,203,'2.5L I4',210,8.0,'Petrol','Automatic','FWD',5],
  ['Toyota','RAV4','SUV',31900,203,'2.5L I4 Hybrid',180,8.1,'Hybrid','Automatic','AWD',5],
  ['Toyota','Highlander','SUV',41900,265,'3.5L V6',180,7.5,'Petrol','Automatic','AWD',7],
  ['Toyota','Land Cruiser','SUV',89000,409,'3.5L Twin-Turbo V6',210,6.7,'Petrol','Automatic','AWD',7],
  ['Toyota','Supra','Coupe',55900,382,'3.0L Turbo I6',155,4.1,'Petrol','Automatic','RWD',2],
  ['Toyota','Hilux','Pickup Truck',38900,204,'2.8L Turbo Diesel',175,10.0,'Diesel','Automatic','4WD',5],
  ['Toyota','GR86','Coupe',32900,228,'2.4L I4',226,6.3,'Petrol','Manual','RWD',4],

  ['Honda','Civic','Sedan',26900,182,'1.5L Turbo I4',200,8.2,'Petrol','Automatic','FWD',5],
  ['Honda','Accord','Sedan',31900,252,'1.5L Turbo I4',190,7.6,'Petrol','Automatic','FWD',5],
  ['Honda','CR-V','SUV',33900,190,'1.5L Turbo I4',180,9.0,'Petrol','Automatic','AWD',5],
  ['Honda','Pilot','SUV',41900,285,'3.5L V6',180,7.0,'Petrol','Automatic','AWD',8],
  ['Honda','NSX','Coupe',169000,573,'3.5L V6 Hybrid',307,2.9,'Hybrid','Automatic','AWD',2],

  ['Lexus','IS','Sedan',42900,241,'3.5L V6',230,5.6,'Petrol','Automatic','RWD',5],
  ['Lexus','ES','Sedan',44900,302,'3.5L V6',210,6.6,'Petrol','Automatic','FWD',5],
  ['Lexus','RX','SUV',49900,275,'3.5L V6 Hybrid',180,7.5,'Hybrid','Automatic','AWD',5],
  ['Lexus','LX','SUV',92000,409,'3.5L Twin-Turbo V6',210,6.9,'Petrol','Automatic','AWD',7],
  ['Lexus','LC','Coupe',96000,471,'5.0L V8',270,4.4,'Petrol','Automatic','RWD',4],

  ['Hyundai','Tucson','SUV',29900,187,'2.5L I4',190,8.5,'Petrol','Automatic','FWD',5],
  ['Hyundai','Santa Fe','SUV',36900,277,'2.5L Turbo I4',200,7.0,'Petrol','Automatic','AWD',7],
  ['Hyundai','Palisade','SUV',39900,291,'3.8L V6',190,7.2,'Petrol','Automatic','AWD',8],
  ['Hyundai','Ioniq 5','SUV',45900,320,'Electric Motor',185,5.2,'Electric','Automatic','AWD',5],
  ['Hyundai','Elantra N','Sedan',34900,276,'2.0L Turbo I4',250,5.3,'Petrol','Manual','FWD',5],

  ['Kia','Sportage','SUV',29900,187,'2.5L I4',190,8.4,'Petrol','Automatic','FWD',5],
  ['Kia','Telluride','SUV',39900,291,'3.8L V6',190,7.5,'Petrol','Automatic','AWD',8],
  ['Kia','Sorento','SUV',36900,281,'2.5L Turbo I4',200,7.3,'Petrol','Automatic','AWD',7],
  ['Kia','EV6','SUV',48900,320,'Electric Motor',185,5.1,'Electric','Automatic','AWD',5],
  ['Kia','Stinger','Sedan',39900,368,'3.3L Twin-Turbo V6',270,4.7,'Petrol','Automatic','RWD',5],

  ['Ford','Mustang','Coupe',42900,450,'5.0L V8',250,4.3,'Petrol','Manual','RWD',4],
  ['Ford','Bronco','SUV',44900,310,'2.7L Turbo V6',180,7.0,'Petrol','Automatic','4WD',5],
  ['Ford','Explorer','SUV',39900,300,'2.3L Turbo I4',200,7.0,'Petrol','Automatic','AWD',7],
  ['Ford','F-150','Pickup Truck',52900,400,'3.5L Twin-Turbo V6',180,6.0,'Petrol','Automatic','4WD',5],
  ['Ford','Mach-E','SUV',49900,346,'Electric Motor',180,5.8,'Electric','Automatic','AWD',5],

  ['Jeep','Wrangler','SUV',35900,285,'3.6L V6',180,7.5,'Petrol','Manual','4WD',5],
  ['Jeep','Grand Cherokee','SUV',44900,293,'3.6L V6',180,7.2,'Petrol','Automatic','4WD',5],
  ['Jeep','Gladiator','Pickup Truck',42900,285,'3.6L V6',180,7.8,'Petrol','Manual','4WD',5],
  ['Jeep','Compass','SUV',31900,200,'2.0L Turbo I4',200,9.0,'Petrol','Automatic','4WD',5]
];

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */
const EXT_COLORS = [
  ['Alpine White','#f2f2f2'],['Black Sapphire','#10131a'],['Obsidian Black','#0c0c0c'],
  ['Silver Metallic','#c7ccd1'],['Graphite Grey','#4a4f55'],['Midnight Blue','#1b2a4a'],
  ['British Racing Green','#0f3d2e'],['Burgundy Red','#5e1620'],['Sunset Orange','#d4622a'],
  ['Pearl White','#eef0ee'],['Titanium Grey','#7d8288'],['Sapphire Blue','#1f3a93'],
  ['Champagne Gold','#c9a86a'],['Matte Black','#1a1a1a'],['Emerald Green','#1f5e3a'],
  ['Crimson Red','#a01b2e'],['Desert Sand','#cbb48a'],['Deep Purple','#3a2350']
];
const INT_COLORS = ['Black Leather','Saddle Brown Leather','Ivory Leather','Charcoal Cloth','Cognac Leather','Porcelain Leather','Red Leather','Grey Alcantara','Beige Leather','White Nappa'];
const CONDITIONS = ['New','Certified Pre-Owned','Used'];
const FEATURE_POOL = [
  'Adaptive Cruise Control','Panoramic Sunroof','Heads-Up Display','Premium Sound System',
  'Heated & Ventilated Seats','Wireless Apple CarPlay','360° Camera','Lane Keep Assist',
  'Massage Seats','Ambient Lighting','Burmester Audio','Carbon Ceramic Brakes',
  'Active Air Suspension','Night Vision Assistant','Augmented Reality Nav','Keyless Entry',
  'Power Tailgate','Remote Start','Blind Spot Monitoring','Traffic Sign Recognition',
  'Wireless Charging','Soft-Close Doors','Rear Entertainment','Adaptive LED Matrix Lights'
];

function rnd(arr){ return arr[Math.floor(Math.random()*arr.length)]; }
function rndInt(a,b){ return Math.floor(Math.random()*(b-a+1))+a; }
function pickFeatures(){
  const n = rndInt(6,10); const s = new Set();
  while(s.size<n) s.add(rnd(FEATURE_POOL));
  return [...s];
}
function vin(){
  const chars='ABCDEFGHJKLMNPRSTUVWXYZ0123456789';
  let v=''; for(let i=0;i<17;i++) v+=chars[Math.floor(Math.random()*chars.length)];
  return v;
}
function slug(s){ return s.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,''); }

/* ------------------------------------------------------------------ */
/*  Build vehicles                                                     */
/* ------------------------------------------------------------------ */
const vehicles = [];
let idCounter = 1;
const now = new Date();

CATALOG.forEach((row, idx) => {
  const [brand, model, body, basePrice, hp, engine, topSpeed, accel, fuel, transmission, drive, seats] = row;
  // create 1-2 listings per model for variety
  const count = (idx % 3 === 0) ? 2 : 1;
  for (let k=0;k<count;k++){
    const year = rndInt(2019, 2025);
    const isNew = year >= 2024 && Math.random() > 0.4;
    const mileage = isNew ? rndInt(0, 80) : rndInt(4000, 78000);
    const [extName, extHex] = rnd(EXT_COLORS);
    const intColor = rnd(INT_COLORS);
    const priceAdj = (isNew ? 1 : (1 - mileage/200000)) * (0.92 + Math.random()*0.16);
    const price = Math.round((basePrice * priceAdj) / 500) * 500;
    const emi = Math.round((price * 0.018) / 10) * 10; // ~ rough monthly
    const availability = isNew ? 'In Stock' : rnd(['In Stock','Reserved','Coming Soon']);
    const desc = `The ${year} ${brand} ${model} represents the pinnacle of ${brand} engineering — a ${body.toLowerCase()} that blends ${fuel === 'Electric' ? 'zero-emission performance' : 'refined power'} with unmistakable presence. Finished in ${extName} over a ${intColor.toLowerCase()} cabin, this example is offered ${isNew ? 'brand new with full manufacturer warranty' : 'as a meticulously maintained pre-owned vehicle'}.`;

    const gallery = [];
    const angles = ['Exterior Front','Exterior Side','Rear View','Interior','Detail'];
    angles.forEach(a => {
      const fname = `v${idCounter}_${slug(a)}.svg`;
      fs.writeFileSync(path.join(IMG_DIR,'vehicles',fname), vehicleSVG(brand, body, extHex, `${brand} ${model}`));
      gallery.push(`assets/img/vehicles/${fname}`);
    });

    vehicles.push({
      id: idCounter,
      slug: slug(`${brand}-${model}-${year}-${idCounter}`),
      brand, model, year,
      mileage,
      fuel, transmission, drive,
      horsepower: hp,
      engine,
      topSpeed,
      acceleration: accel,
      vin: vin(),
      exteriorColor: extName,
      exteriorHex: extHex,
      interiorColor: intColor,
      bodyType: body,
      seats,
      price,
      emi,
      condition: isNew ? 'New' : rnd(CONDITIONS.filter(c=>c!=='New')),
      description: desc,
      features: pickFeatures(),
      gallery,
      availability,
      dateAdded: new Date(now.getTime() - rndInt(0, 400)*86400000).toISOString(),
      featured: Math.random() > 0.78,
      offer: Math.random() > 0.82
    });
    idCounter++;
  }
});

// Brand logos
Object.keys(BRANDS).forEach(b => {
  fs.writeFileSync(path.join(IMG_DIR,'brands', slug(b)+'.svg'), brandSVG(b));
});

/* ------------------------------------------------------------------ */
/*  Blog articles                                                      */
/* ------------------------------------------------------------------ */
const BLOG = [
  { title:'The Art of the Test Drive: What to Look For', category:'Buying Guide', author:'Editorial Team', readTime:6,
    excerpt:'A structured approach to evaluating a luxury vehicle before you commit — from cabin ergonomics to powertrain refinement.',
    body:'When stepping into a prestige vehicle, the test drive is your most valuable due diligence. Begin with the cabin: assess seat support over a 30-minute window, evaluate infotainment latency, and listen for wind noise at motorway speeds. On the road, sample both urban and open-road conditions. Pay attention to throttle response, brake modulation, and steering weight. Finally, review the ownership proposition — warranty, service intervals, and residual value all shape the true cost of luxury.' },
  { title:'Electric Luxury: Are EVs Ready for Enthusiasts?', category:'Technology', author:'Marcus Hale', readTime:8,
    excerpt:'Instant torque, silent cabins, and surprising dynamics — we examine whether electric flagships satisfy the purist.',
    body:'The latest electric luxury sedans and SUVs deliver acceleration figures that embarrass combustion supercars. But enthusiasts crave more than straight-line speed. Regenerative braking feel, chassis balance, and steering communication now define the experience. Brands like Porsche and Audi have invested heavily in bespoke EV platforms that prioritise driving engagement. The verdict: electric luxury has matured from novelty to genuine contender.' },
  { title:'Certified Pre-Owned: The Smart Path to Prestige', category:'Buying Guide', author:'Sophia Reyes', readTime:5,
    excerpt:'How a manufacturer-backed warranty transforms a used luxury car into a low-risk proposition.',
    body:'A Certified Pre-Owned programme bridges the gap between new-car peace of mind and used-car value. Expect multi-point inspections, extended warranties, and roadside assistance. For models with strong residuals, CPO often represents the steepest depreciation avoided. Always verify the inspection checklist and remaining factory coverage before signing.' },
  { title:'Interior Materials: Leather, Alcantara & Beyond', category:'Design', author:'Editorial Team', readTime:4,
    excerpt:'The tactile language of luxury — and why the right upholstery matters more than you think.',
    body:'Luxury is felt before it is seen. Full-grain leather, Nappa hides, and Alcantara each communicate a different character. Sustainable alternatives such as vegan leather now rival traditional hides for durability. Consider climate: ventilated seats excel in warm regions, while heated and massaging functions define long-distance comfort.' },
  { title:'Financing vs Leasing a Luxury Vehicle', category:'Finance', author:'Daniel Cho', readTime:7,
    excerpt:'A clear breakdown of when to finance, when to lease, and how to read the fine print.',
    body:'Leasing keeps monthly payments low and lets you rotate into new technology every few years — ideal if you value novelty. Financing builds equity and suits high-mileage drivers. Compare the money factor, residual value, and mileage caps. At Prestige Motors our calculators model both paths transparently so you can decide with confidence.' },
  { title:'The Resurgence of the Grand Tourer', category:'Lifestyle', author:'Marcus Hale', readTime:6,
    excerpt:'Why the GT — equal parts sports car and long-distance cruiser — is enjoying a renaissance.',
    body:'The grand tourer occupies a unique niche: exhilarating on a coastal road, serene on a 600-mile haul. Modern GTs pair twin-turbo V8s with adaptive air suspension and whisper-quiet cabins. The Bentley Continental GT and Ferrari Roma exemplify the breed. For the driver who refuses to choose between comfort and character, the GT is the answer.' },
  { title:'Winter Preparedness for Performance Cars', category:'Ownership', author:'Sophia Reyes', readTime:5,
    excerpt:'Protecting your investment when temperatures drop — tyres, storage, and battery care.',
    body:'Performance tyres lose grip below 7°C; a dedicated winter set is non-negotiable in cold climates. For convertibles, conditioned storage prevents seal degradation. EV owners should precondition the battery while plugged in to preserve range. A little preparation preserves both safety and resale value.' },
  { title:'How We Inspect Every Vehicle', category:'Behind the Scenes', author:'Editorial Team', readTime:4,
    excerpt:'A transparent look at the 150-point process every Prestige Motors car undergoes.',
    body:'Each vehicle passes through our detailing bay, diagnostic suite, and road-test circuit. Technicians verify drivetrain health, brake condition, and ADAS calibration. Only then does a car earn our showroom floor. This rigour is why customers return — and why our used inventory commands trust.' },
  { title:'The Future of In-Car Connectivity', category:'Technology', author:'Daniel Cho', readTime:6,
    excerpt:'From over-the-air updates to augmented reality navigation, the cabin is becoming a platform.',
    body:'Modern luxury cars receive software updates like smartphones, unlocking new features post-purchase. Augmented reality head-up displays overlay directions onto the road. 5G connectivity enables real-time traffic and concierge services. The implication: a vehicle purchased today will keep improving for years.' },
  { title:'Choosing the Right SUV for Your Family', category:'Buying Guide', author:'Sophia Reyes', readTime:7,
    excerpt:'Space, safety, and sophistication — balancing practicality with prestige.',
    body:'Luxury SUVs now rival sedans for refinement while offering versatility. Prioritise third-row access if you regularly carry passengers, and verify cargo volume with seats folded. Advanced driver assistance reduces fatigue on school runs and road trips alike. The Range Rover, BMW X7, and Mercedes GLE each lead their segments for distinct reasons.' }
].map((a,i)=>({
  id: i+1,
  slug: slug(a.title),
  image: `assets/img/vehicles/v${(i%vehicles.length)+1}_exterior-side.svg`,
  date: new Date(now.getTime() - (i*9+3)*86400000).toISOString().slice(0,10),
  ...a
}));

/* ------------------------------------------------------------------ */
/*  Offers                                                            */
/* ------------------------------------------------------------------ */
const OFFERS = [
  { id:1, title:'Complimentary First Service', subtitle:'On all new 2025 arrivals', discount:'£0', type:'Service', expires:'2025-12-31',
    description:'Every new vehicle delivered this quarter includes a complimentary first scheduled service and a full detailing package.' },
  { id:2, title:'0% APR for 24 Months', subtitle:'Selected certified pre-owned models', discount:'0%', type:'Finance', expires:'2025-11-30',
    description:'Spread the cost with zero interest on a curated selection of certified pre-owned prestige vehicles. Subject to status.' },
  { id:3, title:'Trade-In Bonus', subtitle:'Up to £3,000 towards your next car', discount:'£3000', type:'Trade-In', expires:'2025-12-15',
    description:'Receive an enhanced valuation when you trade in your current vehicle against any model in our inventory.' },
  { id:4, title:'Extended Warranty 5 Years', subtitle:'Peace of mind included', discount:'5yr', type:'Warranty', expires:'2026-01-31',
    description:'Extend your coverage to five years or 100,000 miles on participating vehicles at no extra cost this month.' },
  { id:5, title:'Loyalty Rewards', subtitle:'£1,500 for returning clients', discount:'£1500', type:'Loyalty', expires:'2025-12-31',
    description:'Existing Prestige Motors customers receive a loyalty credit towards their next purchase or service.' },
  { id:6, title:'Winter Tyre Package', subtitle:'Fitted & balanced', discount:'20%', type:'Service', expires:'2025-11-15',
    description:'Prepare for the cold with 20% off a complete winter wheel and tyre package, fitted by our technicians.' }
];

/* ------------------------------------------------------------------ */
/*  Write data files                                                   */
/* ------------------------------------------------------------------ */
function toJS(name, data){
  return `/* AUTO-GENERATED by tools/generate-data.js — do not edit by hand */\nwindow.${name} = ${JSON.stringify(data, null, 2)};\n`;
}
fs.writeFileSync(path.join(DATA_DIR,'vehicles.js'), toJS('PRESTIGE_VEHICLES', vehicles));
fs.writeFileSync(path.join(DATA_DIR,'blog.js'), toJS('PRESTIGE_BLOG', BLOG));
fs.writeFileSync(path.join(DATA_DIR,'offers.js'), toJS('PRESTIGE_OFFERS', OFFERS));

console.log(`Generated ${vehicles.length} vehicles, ${BLOG.length} blog articles, ${OFFERS.length} offers.`);
console.log(`Brand logos: ${Object.keys(BRANDS).length}, vehicle images: ${vehicles.length*5}`);
