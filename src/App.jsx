import { useState, useEffect, useCallback } from "react";

// ─── PALETTE ─────────────────────────────────────────────────────────────────
const P = {
  pink:    "#FF6B9D",
  rose:    "#FF8FAB",
  lilac:   "#C77DFF",
  peach:   "#FFB347",
  mint:    "#7FDBDA",
  cream:   "#FFF0F5",
  white:   "#FFFFFF",
  dark:    "#3D1A5C",
  mid:     "#7B2D8B",
  soft:    "#F8E1F4",
  gold:    "#FFD700",
  border:  "#F2C2D8",
};

// ─── MICKEY SVG ──────────────────────────────────────────────────────────────
const Mickey = ({ size = 32, color = P.pink }) => (
  <svg width={size} height={size} viewBox="0 0 100 80" fill={color}>
    <circle cx="20" cy="22" r="18"/>
    <circle cx="80" cy="22" r="18"/>
    <ellipse cx="50" cy="58" rx="30" ry="22"/>
  </svg>
);

const MickeyTiny = ({ color = P.pink }) => (
  <svg width={16} height={13} viewBox="0 0 100 80" fill={color} style={{verticalAlign:"middle"}}>
    <circle cx="20" cy="22" r="18"/>
    <circle cx="80" cy="22" r="18"/>
    <ellipse cx="50" cy="58" rx="30" ry="22"/>
  </svg>
);

// ─── CASTLE SVG ──────────────────────────────────────────────────────────────
const CastleSVG = () => (
  <svg viewBox="0 0 300 180" width="100%" style={{maxWidth:340,display:"block",margin:"0 auto"}}>
    <defs>
      <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FFB3D1"/>
        <stop offset="100%" stopColor="#FFF0F5"/>
      </linearGradient>
      <linearGradient id="castle" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#E8A0C0"/>
        <stop offset="100%" stopColor="#C97FAE"/>
      </linearGradient>
    </defs>
    {/* Sky */}
    <rect width="300" height="180" fill="url(#sky)" rx="16"/>
    {/* Stars */}
    {[[30,20],[270,15],[60,40],[240,35],[150,10],[100,25],[200,18]].map(([x,y],i)=>(
      <circle key={i} cx={x} cy={y} r="2" fill={P.gold} opacity="0.8"/>
    ))}
    {/* Main tower */}
    <rect x="120" y="60" width="60" height="100" fill="url(#castle)"/>
    {/* Side towers */}
    <rect x="70" y="85" width="45" height="75" fill="#D48FAA"/>
    <rect x="185" y="85" width="45" height="75" fill="#D48FAA"/>
    {/* Spires */}
    <polygon points="150,5 135,60 165,60" fill={P.rose}/>
    <polygon points="92,45 80,85 104,85" fill={P.rose}/>
    <polygon points="208,45 196,85 220,85" fill={P.rose}/>
    {/* Windows */}
    <rect x="138" y="90" width="10" height="14" rx="5" fill="#FFE4F2"/>
    <rect x="155" y="90" width="10" height="14" rx="5" fill="#FFE4F2"/>
    <rect x="146" y="115" width="13" height="18" rx="6" fill="#FFE4F2"/>
    {/* Door arch */}
    <ellipse cx="150" cy="158" rx="12" ry="6" fill="#FFD6EB"/>
    <rect x="138" y="152" width="24" height="10" fill="#FFD6EB"/>
    {/* Flags */}
    <line x1="150" y1="5" x2="150" y2="0" stroke={P.gold} strokeWidth="1.5"/>
    <polygon points="150,0 160,3 150,6" fill={P.gold}/>
    <line x1="92" y1="45" x2="92" y2="40" stroke={P.gold} strokeWidth="1.5"/>
    <polygon points="92,40 101,43 92,46" fill={P.gold}/>
    {/* Ground */}
    <rect x="0" y="160" width="300" height="20" rx="0" fill="#F2C2D8" opacity="0.5"/>
    {/* Sparkles */}
    {[[55,55],[245,60],[30,100],[260,95]].map(([x,y],i)=>(
      <text key={i} x={x} y={y} fontSize="10" textAnchor="middle" fill={P.gold} opacity="0.9">✦</text>
    ))}
    <text x="150" y="178" fontSize="9" textAnchor="middle" fill={P.mid} fontStyle="italic">Where Dreams Come True ✨</text>
  </svg>
);

// ─── DATA ─────────────────────────────────────────────────────────────────────
const PARKS = {
  mk: { name:"Magic Kingdom", emoji:"🏰", color:P.pink,
    rides:[
      {name:"TRON Lightcycle / Run",tier:"Tier 1",ll:"LLSP",avgWait:90,llPrice:"$12–$22",height:'48"',thrill:"High",tips:"Buy LLSP at exactly 7 AM. Sells out in minutes."},
      {name:"Seven Dwarfs Mine Train",tier:"Tier 1",ll:"LLMP",avgWait:75,llPrice:"in LLMP",height:'38"',thrill:"Moderate",tips:"Book first at 7 AM in the app. Most beloved family coaster."},
      {name:"Space Mountain",tier:"Tier 2",ll:"LLMP",avgWait:55,llPrice:"in LLMP",height:'44"',thrill:"Moderate",tips:"Great rope-drop ride before lines build."},
      {name:"Haunted Mansion",tier:"Tier 2",ll:"LLMP",avgWait:45,llPrice:"in LLMP",height:"none",thrill:"Low",tips:"Manageable standby. Good for afternoon lull."},
      {name:"Big Thunder Mountain",tier:"Tier 2",ll:"LLMP",avgWait:50,llPrice:"in LLMP",height:'40"',thrill:"Moderate",tips:"Best views at dusk. Rope-drop or use LLMP."},
      {name:"Peter Pan's Flight",tier:"Tier 2",ll:"LLMP",avgWait:60,llPrice:"in LLMP",height:"none",thrill:"Low",tips:"Deceptively long lines. Use LLMP or go at park open."},
      {name:"Tiana's Bayou Adventure",tier:"Tier 1",ll:"LLMP",avgWait:70,llPrice:"in LLMP",height:'40"',thrill:"Moderate",tips:"New re-theme! Book LLMP early in the day."},
      {name:"Pirates of the Caribbean",tier:"Tier 3",ll:"None",avgWait:25,llPrice:"standby only",height:"none",thrill:"Low",tips:"Rarely over 30 min. Save LL for Tier 1–2."},
    ]},
  ep: { name:"EPCOT", emoji:"🌍", color:P.lilac,
    rides:[
      {name:"Guardians: Cosmic Rewind",tier:"Tier 1",ll:"LLSP",avgWait:85,llPrice:"$12–$20",height:'42"',thrill:"High",tips:"Virtual queue or LLSP. Buy at 7 AM sharp."},
      {name:"Test Track",tier:"Tier 1",ll:"LLMP",avgWait:65,llPrice:"in LLMP",height:"none",thrill:"Moderate",tips:"Design your concept car first for full experience."},
      {name:"Frozen Ever After",tier:"Tier 1",ll:"LLMP",avgWait:70,llPrice:"in LLMP",height:"none",thrill:"Low",tips:"Extremely popular! Book LLMP at park opening."},
      {name:"Remy's Ratatouille Adventure",tier:"Tier 2",ll:"LLMP",avgWait:55,llPrice:"in LLMP",height:"none",thrill:"Low",tips:"Visit France Pavilion early. Great for all ages."},
      {name:"Soarin' Around the World",tier:"Tier 2",ll:"LLMP",avgWait:50,llPrice:"in LLMP",height:'40"',thrill:"Low",tips:"Request row 1A — no feet dangling in your face!"},
      {name:"Mission: SPACE",tier:"Tier 2",ll:"LLMP",avgWait:35,llPrice:"in LLMP",height:'44"',thrill:"High/Low",tips:"Orange = intense. Green = mild. Know before you go."},
    ]},
  hs: { name:"Hollywood Studios", emoji:"🎬", color:P.peach,
    rides:[
      {name:"Rise of the Resistance",tier:"Tier 1",ll:"LLSP",avgWait:100,llPrice:"$15–$25",height:'40"',thrill:"Moderate",tips:"Most immersive ride at WDW. LLSP sells out by 7:05 AM."},
      {name:"Slinky Dog Dash",tier:"Tier 1",ll:"LLMP",avgWait:80,llPrice:"in LLMP",height:'38"',thrill:"Moderate",tips:"Rope-drop if skipping LLMP. Fills incredibly fast."},
      {name:"Millennium Falcon: Smugglers Run",tier:"Tier 2",ll:"LLMP",avgWait:55,llPrice:"in LLMP",height:'38"',thrill:"Moderate",tips:"Pilot seat = most interactive role!"},
      {name:"Tower of Terror",tier:"Tier 2",ll:"LLMP",avgWait:60,llPrice:"in LLMP",height:'40"',thrill:"High",tips:"Best thrill at HS. Evening waits often shorter."},
      {name:"Rock 'n' Roller Coaster",tier:"Tier 2",ll:"LLMP",avgWait:65,llPrice:"in LLMP",height:'48"',thrill:"High",tips:"Only Disney coaster with inversions — iconic!"},
      {name:"Mickey & Minnie's Runaway Railway",tier:"Tier 2",ll:"LLMP",avgWait:50,llPrice:"in LLMP",height:"none",thrill:"Low",tips:"Excellent trackless ride. Perfect for families."},
    ]},
  ak: { name:"Animal Kingdom", emoji:"🦁", color:P.mint,
    rides:[
      {name:"Avatar: Flight of Passage",tier:"Tier 1",ll:"LLSP",avgWait:110,llPrice:"$18–$28",height:'44"',thrill:"High",tips:"Best ride at WDW. LLSP is 100% worth every cent."},
      {name:"Na'vi River Journey",tier:"Tier 1",ll:"LLMP",avgWait:75,llPrice:"in LLMP",height:"none",thrill:"Low",tips:"Short but breathtakingly beautiful. Book LLMP early."},
      {name:"Expedition Everest",tier:"Tier 2",ll:"LLMP",avgWait:60,llPrice:"in LLMP",height:'44"',thrill:"High",tips:"Backwards surprise is everything. Fantastic coaster."},
      {name:"Kilimanjaro Safaris",tier:"Tier 2",ll:"LLMP",avgWait:40,llPrice:"in LLMP",height:"none",thrill:"Low",tips:"Go at opening or late afternoon — animals most active."},
      {name:"DINOSAUR",tier:"Tier 3",ll:"LLMP",avgWait:25,llPrice:"in LLMP",height:'40"',thrill:"Moderate",tips:"Dark and bumpy. May startle little ones."},
    ]},
};

const PARK_NAMES = { mk:"Magic Kingdom 🏰", ep:"EPCOT 🌍", hs:"Hollywood Studios 🎬", ak:"Animal Kingdom 🦁", off:"Rest Day 💤" };

// ─── OFFICIAL DISNEY LINKS (for live wait times — see note in app) ───────────
// We can't pull live wait time data directly (no public Disney API exists),
// so instead we link straight to Disney's own official wait-time pages.
const DISNEY_WAIT_LINKS = {
  mk: "https://disneyworld.disney.go.com/attractions/magic-kingdom/",
  ep: "https://disneyworld.disney.go.com/attractions/epcot/",
  hs: "https://disneyworld.disney.go.com/attractions/hollywood-studios/",
  ak: "https://disneyworld.disney.go.com/attractions/animal-kingdom/",
};
const MDE_APP_LINK = "https://disneyworld.disney.go.com/";

// ─── PARK MAP DATA (stylized coordinates on a 400x300 viewBox) ───────────────
const PARK_MAPS = {
  mk: {
    viewBox: "0 0 400 320",
    bgColor: "#FAF3E8",
    // Land area shapes (rough approximation of real MK hub-and-spoke layout)
    lands: [
      {name:"Main Street U.S.A.", color:"#F5D896", path:"M170,260 L230,260 L240,200 L160,200 Z"},
      {name:"Adventureland", color:"#A8C090", path:"M60,150 Q60,110 100,95 L150,110 Q160,150 130,180 Q90,190 60,150 Z"},
      {name:"Frontierland", color:"#D9B48F", path:"M40,90 Q60,55 110,55 L150,85 Q140,115 100,120 Q55,120 40,90 Z"},
      {name:"Liberty Square", color:"#AEB8C2", path:"M150,55 Q175,35 210,45 L220,85 Q195,100 165,90 Q150,75 150,55 Z"},
      {name:"Fantasyland", color:"#F3B8D0", path:"M210,40 Q260,25 300,50 L300,95 Q270,115 225,105 L210,85 Z"},
      {name:"Tomorrowland", color:"#C3AEED", path:"M300,50 Q345,55 360,100 L340,150 Q300,155 280,120 L290,90 Z"},
    ],
    // Real-style curved pathways (hub and spoke from the castle/Main St axis)
    paths: [
      "M200,300 L200,210",                          // Main Street axis
      "M200,210 Q200,180 200,160",                   // Hub to castle
      "M200,160 Q150,150 130,130",                   // Hub to Adventureland
      "M200,160 Q150,120 120,90",                     // Hub to Frontierland
      "M200,160 Q180,110 185,75",                     // Hub to Liberty Sq
      "M200,160 Q230,120 250,80",                      // Hub to Fantasyland
      "M200,160 Q270,140 300,110",                     // Hub to Tomorrowland
    ],
    water: [{cx:120,cy:75,rx:35,ry:20}], // Rivers of America area
    pins: [
      {ride:"Seven Dwarfs Mine Train", x:255, y:65, zone:"Fantasyland"},
      {ride:"Peter Pan's Flight", x:235, y:80, zone:"Fantasyland"},
      {ride:"TRON Lightcycle / Run", x:330, y:75, zone:"Tomorrowland"},
      {ride:"Space Mountain", x:340, y:115, zone:"Tomorrowland"},
      {ride:"Haunted Mansion", x:190, y:60, zone:"Liberty Square"},
      {ride:"Big Thunder Mountain", x:85, y:75, zone:"Frontierland"},
      {ride:"Tiana's Bayou Adventure", x:60, y:100, zone:"Frontierland"},
      {ride:"Pirates of the Caribbean", x:90, y:135, zone:"Adventureland"},
    ],
    bathrooms: [
      {x:200, y:240, label:"Main Street"},
      {x:110, y:155, label:"Adventureland"},
      {x:310, y:130, label:"Tomorrowland"},
      {x:255, y:95, label:"Fantasyland"},
      {x:170, y:70, label:"Liberty Square"},
    ],
    entrance: {x:200, y:305},
    landmark: {x:200, y:185, label:"Cinderella Castle", emoji:"🏰"},
  },
  ep: {
    viewBox: "0 0 400 320",
    bgColor: "#E8F2EE",
    lands: [
      {name:"World Celebration", color:"#F5D896", path:"M160,90 Q200,60 250,80 L260,140 Q220,165 175,150 Q150,120 160,90 Z"},
      {name:"World Discovery", color:"#C3AEED", path:"M260,60 Q320,50 355,95 L340,150 Q300,160 270,130 L260,90 Z"},
      {name:"World Nature", color:"#A8C090", path:"M60,80 Q110,50 160,75 L165,135 Q125,160 80,140 Q55,110 60,80 Z"},
      {name:"World Showcase", color:"#F3C9A0", path:"M50,230 Q200,300 350,230 L350,260 Q200,320 50,260 Z"},
    ],
    paths: [
      "M200,300 Q200,260 200,230",                    // Entrance to Showcase ring start
      "M200,230 Q200,190 205,160",                     // Up to World Celebration
      "M205,160 Q160,140 130,110",                      // To World Nature
      "M205,160 Q260,140 290,110",                       // To World Discovery
      "M80,250 Q200,290 320,250",                          // World Showcase promenade (lagoon walk)
    ],
    water: [{cx:200,cy:250,rx:130,ry:45}], // World Showcase Lagoon
    pins: [
      {ride:"Guardians: Cosmic Rewind", x:310, y:75, zone:"World Discovery"},
      {ride:"Test Track", x:335, y:120, zone:"World Discovery"},
      {ride:"Mission: SPACE", x:295, y:65, zone:"World Discovery"},
      {ride:"The Seas with Nemo & Friends", x:95, y:100, zone:"World Nature"},
      {ride:"Soarin' Around the World", x:75, y:130, zone:"World Nature"},
      {ride:"Frozen Ever After", x:150, y:255, zone:"World Showcase"},
      {ride:"Remy's Ratatouille Adventure", x:200, y:270, zone:"World Showcase"},
    ],
    bathrooms: [
      {x:210, y:190, label:"World Celebration"},
      {x:310, y:155, label:"World Discovery"},
      {x:110, y:220, label:"World Showcase West"},
      {x:290, y:225, label:"World Showcase East"},
    ],
    entrance: {x:200, y:305},
    landmark: {x:230, y:170, label:"Spaceship Earth", emoji:"🌐"},
  },
  hs: {
    viewBox: "0 0 400 320",
    bgColor: "#F2E8E0",
    lands: [
      {name:"Hollywood Blvd", color:"#F5D896", path:"M170,260 L230,260 L235,190 L165,190 Z"},
      {name:"Galaxy's Edge", color:"#7A8BA8", path:"M40,80 Q40,40 90,30 L150,55 Q160,100 120,130 Q60,135 40,80 Z"},
      {name:"Toy Story Land", color:"#8FD0C9", path:"M280,40 Q340,35 365,80 L350,130 Q300,140 270,100 L275,65 Z"},
      {name:"Sunset Blvd", color:"#E89878", path:"M250,150 Q300,140 330,175 L320,230 Q270,245 240,205 Z"},
      {name:"Animation Courtyard", color:"#C3AEED", path:"M100,140 Q140,130 165,160 L155,200 Q115,210 95,180 Z"},
    ],
    paths: [
      "M200,300 L200,225",
      "M200,225 Q150,200 110,170",
      "M200,225 Q160,170 130,110",
      "M200,225 Q260,190 290,160",
      "M200,225 Q280,140 310,90",
    ],
    water: [],
    pins: [
      {ride:"Rise of the Resistance", x:75, y:75, zone:"Galaxy's Edge"},
      {ride:"Millennium Falcon: Smugglers Run", x:115, y:105, zone:"Galaxy's Edge"},
      {ride:"Slinky Dog Dash", x:325, y:75, zone:"Toy Story Land"},
      {ride:"Tower of Terror", x:280, y:185, zone:"Sunset Blvd"},
      {ride:"Rock 'n' Roller Coaster", x:310, y:215, zone:"Sunset Blvd"},
      {ride:"Mickey & Minnie's Runaway Railway", x:200, y:230, zone:"Hollywood Blvd"},
    ],
    bathrooms: [
      {x:200, y:255, label:"Hollywood Blvd"},
      {x:140, y:120, label:"Galaxy's Edge"},
      {x:295, y:95, label:"Toy Story Land"},
      {x:125, y:175, label:"Animation Courtyard"},
    ],
    entrance: {x:200, y:305},
    landmark: {x:200, y:195, label:"Sorcerer Hat Plaza", emoji:"🎩"},
  },
  ak: {
    viewBox: "0 0 400 320",
    bgColor: "#EEF2E2",
    lands: [
      {name:"Discovery Island", color:"#F5D896", path:"M165,200 Q200,180 235,200 L230,250 Q200,265 170,250 Z"},
      {name:"Pandora", color:"#5CA89A", path:"M40,80 Q60,45 110,40 L150,80 Q140,125 90,135 Q45,120 40,80 Z"},
      {name:"Africa", color:"#D9B48F", path:"M50,150 Q90,140 120,170 L150,220 Q110,250 65,225 Q40,185 50,150 Z"},
      {name:"Asia", color:"#C3AEED", path:"M280,50 Q335,45 360,90 L345,140 Q295,150 265,115 L270,80 Z"},
      {name:"DinoLand U.S.A.", color:"#E89878", path:"M260,180 Q310,170 340,205 L330,255 Q280,270 250,235 Z"},
    ],
    paths: [
      "M200,300 L200,260",
      "M200,260 Q150,230 110,195",
      "M200,260 Q150,200 100,140",
      "M200,260 Q250,220 290,180",
      "M200,260 Q270,190 305,110",
    ],
    water: [{cx:130,cy:190,rx:40,ry:25},{cx:200,cy:215,rx:25,ry:15}],
    pins: [
      {ride:"Avatar: Flight of Passage", x:80, y:75, zone:"Pandora"},
      {ride:"Na'vi River Journey", x:115, y:100, zone:"Pandora"},
      {ride:"Kilimanjaro Safaris", x:80, y:185, zone:"Africa"},
      {ride:"Expedition Everest", x:310, y:80, zone:"Asia"},
      {ride:"DINOSAUR", x:305, y:225, zone:"DinoLand U.S.A."},
    ],
    bathrooms: [
      {x:200, y:230, label:"Discovery Island"},
      {x:100, y:155, label:"Africa"},
      {x:300, y:115, label:"Asia"},
      {x:290, y:200, label:"DinoLand"},
    ],
    entrance: {x:200, y:305},
    landmark: {x:200, y:220, label:"Tree of Life", emoji:"🌳"},
  },
};

// ─── CHARACTER DATA ───────────────────────────────────────────────────────────
const CHARACTERS = [
  {name:"Mickey Mouse", park:"mk", location:"Town Square Theater", tier:"Must-Do"},
  {name:"Minnie Mouse", park:"mk", location:"Town Square Theater", tier:"Must-Do"},
  {name:"Cinderella", park:"mk", location:"Princess Fairytale Hall", tier:"Princess"},
  {name:"Rapunzel", park:"mk", location:"Princess Fairytale Hall", tier:"Princess"},
  {name:"Tiana", park:"mk", location:"Princess Fairytale Hall", tier:"Princess"},
  {name:"Buzz Lightyear", park:"mk", location:"Tomorrowland", tier:"Classic"},
  {name:"Ariel", park:"mk", location:"Ariel's Grotto", tier:"Princess"},
  {name:"Moana", park:"ep", location:"World Nature", tier:"Must-Do"},
  {name:"Elsa & Anna", park:"ep", location:"World Showcase Norway", tier:"Princess"},
  {name:"Remy", park:"ep", location:"World Showcase France", tier:"Rare"},
  {name:"Baymax", park:"ep", location:"World Discovery", tier:"Rare"},
  {name:"BB-8", park:"hs", location:"Star Wars Launch Bay", tier:"Must-Do"},
  {name:"Buzz & Woody", park:"hs", location:"Pixar Place", tier:"Classic"},
  {name:"Mickey (Sorcerer)", park:"hs", location:"Commissary Lane", tier:"Classic"},
  {name:"Kevin the Bird", park:"ak", location:"Discovery Island", tier:"Rare"},
  {name:"Dug & Russell", park:"ak", location:"Discovery Island", tier:"Rare"},
  {name:"Pocahontas", park:"ak", location:"Discovery Island", tier:"Princess"},
];
const TIER_COLORS = {"Must-Do":P.pink, Princess:P.lilac, Rare:P.gold, Classic:P.mint};

const DINING_PLANS = [
  {name:"Quick-Service Plan",price:"$57 adult · $23 child / day",color:P.pink,
    includes:["2 Quick-Service meals/day","1 Snack/day","Resort refillable mug"],
    best:"Budget-friendly, picky eaters, counter-service lovers"},
  {name:"Standard Dining Plan",price:"$94 adult · $34 child / day",color:P.lilac,
    includes:["1 Quick-Service meal/day","1 Table-Service meal/day","1 Snack/day","Resort refillable mug"],
    best:"Families wanting 1 special dinner per day"},
  {name:"Deluxe Dining Plan",price:"$139 adult · $49 child / day",color:P.mid,
    includes:["3 meals/day (QS or TS)","2 Snacks/day","Resort refillable mug"],
    best:"Foodies, signature dining, anniversary trips"},
];

const RESORTS = [
  {tier:"Value 💛",price:"$100–$200/night",color:"#FFD166",
    list:[
      {name:"Art of Animation",transport:"Skyliner 🚡 · Bus 🚌",amenities:"Family Suites · 3 Pools · Food Court"},
      {name:"Pop Century",transport:"Skyliner 🚡 · Bus 🚌",amenities:"2 Pools · Food Court"},
      {name:"All-Star Movies/Music/Sports",transport:"Bus 🚌",amenities:"2 Pools · Food Court"},
    ]},
  {tier:"Moderate 💜",price:"$200–$400/night",color:P.lilac,
    list:[
      {name:"Caribbean Beach",transport:"Skyliner 🚡 · Bus 🚌",amenities:"6 Pools · Table Service · Marina"},
      {name:"Coronado Springs",transport:"Bus 🚌",amenities:"Gran Destino Tower · 3 Pools · Rix Bar"},
      {name:"Port Orleans French Quarter",transport:"Bus 🚌 · Boat 🚢",amenities:"1 Pool · Beignets! · Bike Rentals"},
      {name:"Port Orleans Riverside",transport:"Bus 🚌 · Boat 🚢",amenities:"5 Pools · Horse-drawn Carriage · Boatwrights"},
    ]},
  {tier:"Deluxe 💗",price:"$500–$1,200/night",color:P.pink,
    list:[
      {name:"Grand Floridian",transport:"Monorail 🚃 · Boat 🚢 · Bus 🚌",amenities:"Spa · Victoria & Alberts · Beach"},
      {name:"Polynesian Village",transport:"Monorail 🚃 · Boat 🚢 · Bus 🚌",amenities:"Trader Sam's · 'Ohana · 2 Pools"},
      {name:"Contemporary",transport:"Monorail 🚃 · Walk to MK 🚶 · Bus 🚌",amenities:"California Grill · Chef Mickey's · Bay Lake Tower"},
      {name:"Beach Club",transport:"Skyliner 🚡 · Walk to EPCOT 🚶 · Boat 🚢",amenities:"Stormalong Bay (BEST POOL!) · Beaches & Cream"},
      {name:"BoardWalk Inn",transport:"Skyliner 🚡 · Walk to EPCOT 🚶 · Boat 🚢",amenities:"Jellyrolls · ESPN Club · Boardwalk dining"},
      {name:"Wilderness Lodge",transport:"Boat 🚢 · Bus 🚌",amenities:"Geyser Point · Artist Point · 3 Pools"},
    ]},
];

// ─── STORAGE HELPERS ─────────────────────────────────────────────────────────
const safeGet = async (key) => { try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : null; } catch { return null; } };
const safeSet = async (key, val) => { try { localStorage.setItem(key, JSON.stringify(val)); } catch {} };

// ─── DATE / COUNTDOWN HELPERS ─────────────────────────────────────────────────
// Given a trip's Day 1 date (YYYY-MM-DD) and a zero-based day index, returns
// a real JS Date object representing that day at local midnight.
function dateForDayObj(travelDate, dayIndex) {
  if (!travelDate) return null;
  const base = new Date(travelDate + "T00:00:00");
  if (isNaN(base.getTime())) return null;
  base.setDate(base.getDate() + dayIndex);
  return base;
}
// Pretty short label like "Tue, Jul 14"
function dateForDay(travelDate, dayIndex) {
  const d = dateForDayObj(travelDate, dayIndex);
  if (!d) return "";
  return d.toLocaleDateString("en-US", { weekday:"short", month:"short", day:"numeric" });
}
// Combine a trip day + "HH:MM" time string into a real target Date for countdowns.
function dateTimeForSlot(travelDate, dayIndex, timeStr) {
  const d = dateForDayObj(travelDate, dayIndex);
  if (!d || !timeStr) return null;
  const [h, m] = timeStr.split(":").map(Number);
  if (isNaN(h) || isNaN(m)) return null;
  d.setHours(h, m, 0, 0);
  return d;
}
// Returns {d,h,m,s,totalMs,isPast} counting down to a target Date.
function useCountdown(targetDate) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  if (!targetDate) return null;
  const diff = targetDate.getTime() - now;
  const isPast = diff <= 0;
  const abs = Math.abs(diff);
  return {
    d: Math.floor(abs / 86400000),
    h: Math.floor((abs % 86400000) / 3600000),
    m: Math.floor((abs % 3600000) / 60000),
    s: Math.floor((abs % 60000) / 1000),
    totalMs: diff,
    isPast,
  };
}
function fmtCountdownShort(c) {
  if (!c) return "";
  if (c.d > 0) return `${c.d}d ${c.h}h ${c.m}m`;
  if (c.h > 0) return `${c.h}h ${c.m}m ${c.s}s`;
  return `${c.m}m ${c.s}s`;
}

// ─── TRIP PLANNER ─────────────────────────────────────────────────────────────
function TripPlannerTab() {
  const [tripName, setTripName]   = useState("Our Disney Dream Trip ✨");
  const [travelDate, setTravelDate] = useState("");
  const [numDays, setNumDays]     = useState(7);
  const [days, setDays]           = useState([]);
  const [saved, setSaved]         = useState(false);
  const [notes, setNotes]         = useState({});
  const [loading, setLoading]     = useState(true);

  useEffect(() => {
    (async () => {
      const stored = await safeGet("trip-plan");
      if (stored) {
        setTripName(stored.tripName || "Our Disney Dream Trip ✨");
        setTravelDate(stored.travelDate || "");
        setNumDays(stored.numDays || 7);
        setDays(stored.days || []);
        setNotes(stored.notes || {});
      } else {
        const d = Array.from({length:7},(_,i)=>({park:"mk",rides:[],mustDo:"",dining:[]}));
        setDays(d);
      }
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    if (days.length === 0) return;
    const d = Array.from({length:numDays},(_,i) => days[i] || {park:"mk",rides:[],mustDo:"",dining:[]});
    setDays(d);
  }, [numDays]);

  const save = async () => {
    await safeSet("trip-plan", {tripName, travelDate, numDays, days, notes});
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const setDayPark = (i, park) => {
    const d = [...days]; d[i] = {...d[i], park}; setDays(d);
  };
  const toggleRide = (dayIdx, ride) => {
    const d = [...days];
    const rides = d[dayIdx].rides || [];
    d[dayIdx] = {...d[dayIdx], rides: rides.includes(ride) ? rides.filter(r=>r!==ride) : [...rides,ride]};
    setDays(d);
  };
  const setMustDo = (i, val) => {
    const d = [...days]; d[i] = {...d[i], mustDo:val}; setDays(d);
  };
  const addDining = (i) => {
    const d = [...days];
    const dining = d[i].dining || [];
    d[i] = {...d[i], dining: [...dining, {id:Date.now(), name:"", time:"18:00"}]};
    setDays(d);
  };
  const updateDining = (i, id, key, val) => {
    const d = [...days];
    d[i] = {...d[i], dining: (d[i].dining||[]).map(r=>r.id===id?{...r,[key]:val}:r)};
    setDays(d);
  };
  const removeDining = (i, id) => {
    const d = [...days];
    d[i] = {...d[i], dining: (d[i].dining||[]).filter(r=>r.id!==id)};
    setDays(d);
  };

  if (loading) return <div style={{textAlign:"center",padding:40,color:P.mid}}>✨ Loading your trip...</div>;

  return (
    <div>
      <Card style={{marginBottom:20}}>
        <label style={{fontWeight:800,fontSize:13,color:P.mid,display:"block",marginBottom:6}}>✨ Trip Name</label>
        <input value={tripName} onChange={e=>setTripName(e.target.value)}
          style={{width:"100%",padding:"10px 14px",borderRadius:12,border:`2px solid ${P.border}`,fontSize:15,fontWeight:700,color:P.dark,background:P.cream,boxSizing:"border-box"}}/>

        <label style={{fontWeight:800,fontSize:13,color:P.mid,display:"block",margin:"14px 0 6px"}}>📅 Day 1 Travel Date</label>
        <input type="date" value={travelDate} onChange={e=>setTravelDate(e.target.value)}
          style={{width:"100%",padding:"10px 14px",borderRadius:12,border:`2px solid ${P.border}`,fontSize:15,fontWeight:700,color:P.dark,background:P.cream,boxSizing:"border-box"}}/>
        <div style={{fontSize:11,color:P.gray,marginTop:4}}>Used to power your trip countdown and daily Lightning Lane / dining countdowns</div>

        <div style={{display:"flex",alignItems:"center",gap:16,marginTop:14,flexWrap:"wrap"}}>
          <label style={{fontWeight:700,fontSize:13,color:P.mid}}>📅 Number of Days:</label>
          <div style={{display:"flex",gap:6}}>
            {[4,5,6,7,8,9,10].map(n=>(
              <button key={n} onClick={()=>setNumDays(n)}
                style={{width:34,height:34,borderRadius:99,border:`2px solid ${P.pink}`,background:numDays===n?P.pink:"transparent",color:numDays===n?"#fff":P.pink,fontWeight:800,cursor:"pointer",fontSize:14}}>
                {n}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {days.slice(0,numDays).map((day,i)=>(
        <Card key={i} style={{marginBottom:16,borderLeft:`5px solid ${PARKS[day.park]?.color||P.pink}`}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12,flexWrap:"wrap",gap:8}}>
            <div style={{fontWeight:900,fontSize:16,color:P.dark}}>
              <MickeyTiny color={PARKS[day.park]?.color||P.pink}/> Day {i+1}
              {travelDate && <span style={{fontSize:12,fontWeight:600,color:P.gray,marginLeft:8}}>{dateForDay(travelDate,i)}</span>}
            </div>
            <select value={day.park} onChange={e=>setDayPark(i,e.target.value)}
              style={{padding:"6px 12px",borderRadius:99,border:`2px solid ${PARKS[day.park]?.color||P.pink}`,background:P.cream,fontWeight:700,fontSize:13,color:P.dark,cursor:"pointer"}}>
              {Object.entries(PARK_NAMES).map(([k,v])=><option key={k} value={k}>{v}</option>)}
            </select>
          </div>

          {day.park !== "off" && PARKS[day.park] && (
            <>
              <div style={{fontSize:12,fontWeight:700,color:P.mid,marginBottom:8}}>🎢 Tap rides to add to your plan:</div>
              <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:12}}>
                {PARKS[day.park].rides.map(r=>{
                  const sel = (day.rides||[]).includes(r.name);
                  return (
                    <button key={r.name} onClick={()=>toggleRide(i,r.name)}
                      style={{padding:"5px 11px",borderRadius:99,border:`2px solid ${PARKS[day.park].color}`,background:sel?PARKS[day.park].color:P.cream,color:sel?"#fff":P.dark,fontSize:11,fontWeight:700,cursor:"pointer",transition:"all 0.15s"}}>
                      {sel?"✓ ":""}{r.name}
                    </button>
                  );
                })}
              </div>
              {(day.rides||[]).length>0 && (
                <div style={{background:P.soft,borderRadius:10,padding:"8px 12px",marginBottom:10,fontSize:12}}>
                  <strong style={{color:P.mid}}>Your picks:</strong>
                  <div style={{display:"flex",flexWrap:"wrap",gap:4,marginTop:4}}>
                    {(day.rides||[]).map((r,idx)=><span key={r} style={{background:PARKS[day.park].color+"22",color:P.dark,borderRadius:99,padding:"2px 8px"}}>{idx+1}. {r}</span>)}
                  </div>
                </div>
              )}
            </>
          )}

          <label style={{fontSize:12,fontWeight:700,color:P.mid,display:"block",marginBottom:6}}>🍽 Dining Reservations</label>
          <div style={{display:"grid",gap:8,marginBottom:10}}>
            {(day.dining||[]).map(res=>(
              <div key={res.id} style={{display:"flex",gap:8,alignItems:"center"}}>
                <input value={res.name} onChange={e=>updateDining(i,res.id,"name",e.target.value)} placeholder="Restaurant name"
                  style={{flex:1,padding:"7px 10px",borderRadius:8,border:`1.5px solid ${P.border}`,fontSize:12,color:P.dark,background:P.white,boxSizing:"border-box"}}/>
                <input type="time" value={res.time} onChange={e=>updateDining(i,res.id,"time",e.target.value)}
                  style={{padding:"7px 8px",borderRadius:8,border:`1.5px solid ${P.border}`,fontSize:12,color:P.dark,width:100}}/>
                <button onClick={()=>removeDining(i,res.id)} style={{background:"none",border:"none",color:"#ccc",fontSize:16,cursor:"pointer",padding:4}}>✕</button>
              </div>
            ))}
          </div>
          <button onClick={()=>addDining(i)}
            style={{padding:"6px 14px",borderRadius:8,border:`1.5px dashed ${P.peach}`,background:"transparent",color:P.peach,fontWeight:700,fontSize:12,cursor:"pointer",marginBottom:14}}>
            + Add Dining Reservation
          </button>

          <label style={{fontSize:12,fontWeight:700,color:P.mid,display:"block",marginBottom:4}}>📝 Notes / Must-Do's for this day:</label>
          <input value={day.mustDo||""} onChange={e=>setMustDo(i,e.target.value)} placeholder="e.g. Meet Cinderella, fireworks at 9pm..."
            style={{width:"100%",padding:"8px 12px",borderRadius:10,border:`1.5px solid ${P.border}`,fontSize:13,color:P.dark,background:P.cream,boxSizing:"border-box"}}/>
        </Card>
      ))}

      <button onClick={save}
        style={{width:"100%",padding:"14px",borderRadius:99,border:"none",background:`linear-gradient(135deg,${P.pink},${P.lilac})`,color:"#fff",fontWeight:900,fontSize:16,cursor:"pointer",boxShadow:"0 4px 20px rgba(255,107,157,0.4)",marginTop:8}}>
        {saved ? "✅ Trip Saved!" : "💾 Save My Trip Plan"}
      </button>
    </div>
  );
}

// ─── RIDES TAB ────────────────────────────────────────────────────────────────
function RidesTab({ parkKey }) {
  const pk = PARKS[parkKey];
  const [filter, setFilter] = useState("All");
  const tiers = ["All","Tier 1","Tier 2","Tier 3"];
  const filtered = filter==="All" ? pk.rides : pk.rides.filter(r=>r.tier===filter);
  const tierColor = {  "Tier 1":P.pink, "Tier 2":P.peach, "Tier 3":P.mint };

  return (
    <div>
      <a href={DISNEY_WAIT_LINKS[parkKey]} target="_blank" rel="noopener noreferrer" style={{textDecoration:"none"}}>
        <div style={{display:"flex",alignItems:"center",gap:10,background:P.dark,borderRadius:12,padding:"10px 14px",marginBottom:16,cursor:"pointer"}}>
          <span style={{fontSize:18}}>📡</span>
          <div style={{flex:1}}>
            <div style={{fontSize:12,fontWeight:800,color:"#fff"}}>Check Live Wait Times on Disney's Site</div>
            <div style={{fontSize:10,color:"rgba(255,255,255,0.6)"}}>Wait times below are planning estimates — tap for real-time data</div>
          </div>
          <span style={{color:P.gold,fontSize:16}}>↗</span>
        </div>
      </a>
      <div style={{display:"flex",gap:8,marginBottom:20,flexWrap:"wrap"}}>
        {tiers.map(t=>(
          <button key={t} onClick={()=>setFilter(t)}
            style={{padding:"6px 16px",borderRadius:99,border:`2px solid ${tierColor[t]||pk.color}`,background:filter===t?(tierColor[t]||pk.color):"transparent",color:filter===t?"#fff":(tierColor[t]||pk.color),fontWeight:700,cursor:"pointer",fontSize:13}}>
            {t}
          </button>
        ))}
      </div>
      {filtered.map(ride=>(
        <Card key={ride.name} style={{marginBottom:14,borderLeft:`5px solid ${tierColor[ride.tier]||pk.color}`}}>
          <div style={{display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:8,marginBottom:8}}>
            <div style={{fontWeight:800,fontSize:15,color:P.dark}}>{ride.name}</div>
            <span style={{background:tierColor[ride.tier]||pk.color,color:"#fff",borderRadius:99,padding:"2px 10px",fontSize:11,fontWeight:700}}>{ride.tier}</span>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(150px,1fr))",gap:"6px 14px",fontSize:13,marginBottom:10}}>
            <div><span style={{color:"#999"}}>⏱</span> <strong>~{ride.avgWait} min</strong> typical wait</div>
            <div><span style={{color:"#999"}}>⚡</span> <strong>{ride.ll}</strong></div>
            <div><span style={{color:"#999"}}>💰</span> {ride.llPrice}</div>
            <div><span style={{color:"#999"}}>📏</span> Height: <strong>{ride.height}</strong></div>
            <div><span style={{color:"#999"}}>🎢</span> {ride.thrill}</div>
          </div>
          <div style={{background:P.soft,borderRadius:10,padding:"8px 12px",fontSize:13,color:P.dark}}>
            💡 {ride.tips}
          </div>
        </Card>
      ))}
    </div>
  );
}

// ─── SHARED CARD ──────────────────────────────────────────────────────────────
const Card = ({children,style={}}) => (
  <div style={{background:P.white,borderRadius:16,padding:"16px 18px",boxShadow:"0 2px 16px rgba(255,107,157,0.10)",border:`1.5px solid ${P.border}`,...style}}>
    {children}
  </div>
);

const Callout = ({icon="💡",children}) => (
  <div style={{background:P.soft,border:`1px solid ${P.border}`,borderRadius:12,padding:"12px 16px",display:"flex",gap:12,marginBottom:16}}>
    <span style={{fontSize:20,flexShrink:0}}>{icon}</span>
    <div style={{fontSize:13,color:P.dark,lineHeight:1.6}}>{children}</div>
  </div>
);

// ═══════════════════════════════════════════════════════════════════════════
// INTERACTIVE PARK MAP — realistic terrain-style rendering
// ═══════════════════════════════════════════════════════════════════════════
function ParkMapTab({ parkKey }) {
  const pk = PARKS[parkKey];
  const map = PARK_MAPS[parkKey];
  const [view, setView] = useState("map"); // "map" | "zones"
  const [selectedPin, setSelectedPin] = useState(null);
  const [showBathrooms, setShowBathrooms] = useState(true);

  if (!map) return null;

  const rideData = (name) => pk.rides.find(r => r.name === name || r.name.includes(name.split(":")[0]));

  return (
    <div>
      <div style={{display:"flex",gap:8,marginBottom:12}}>
        <button onClick={()=>setView("map")}
          style={{flex:1,padding:"9px",borderRadius:10,border:`2px solid ${pk.color}`,background:view==="map"?pk.color:"transparent",color:view==="map"?"#fff":pk.color,fontWeight:800,fontSize:13,cursor:"pointer"}}>
          🗺️ Visual Map
        </button>
        <button onClick={()=>setView("zones")}
          style={{flex:1,padding:"9px",borderRadius:10,border:`2px solid ${pk.color}`,background:view==="zones"?pk.color:"transparent",color:view==="zones"?"#fff":pk.color,fontWeight:800,fontSize:13,cursor:"pointer"}}>
          📋 Zone List
        </button>
      </div>

      {/* Honest live-wait-times callout */}
      <a href={DISNEY_WAIT_LINKS[parkKey]} target="_blank" rel="noopener noreferrer" style={{textDecoration:"none"}}>
        <div style={{display:"flex",alignItems:"center",gap:10,background:P.dark,borderRadius:12,padding:"10px 14px",marginBottom:14,cursor:"pointer"}}>
          <span style={{fontSize:18}}>📡</span>
          <div style={{flex:1}}>
            <div style={{fontSize:12,fontWeight:800,color:"#fff"}}>Check Live Wait Times</div>
            <div style={{fontSize:10,color:"rgba(255,255,255,0.6)"}}>Opens Disney's official site — this app shows planning estimates, not live data</div>
          </div>
          <span style={{color:P.gold,fontSize:16}}>↗</span>
        </div>
      </a>

      {view === "map" ? (
        <Card style={{padding:12}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8,padding:"0 6px"}}>
            <span style={{fontSize:12,fontWeight:700,color:P.mid}}>Tap a pin for ride info</span>
            <label style={{display:"flex",alignItems:"center",gap:6,fontSize:12,color:P.mid,fontWeight:700,cursor:"pointer"}}>
              <input type="checkbox" checked={showBathrooms} onChange={e=>setShowBathrooms(e.target.checked)} style={{accentColor:pk.color}}/>
              🚻 Restrooms
            </label>
          </div>

          <svg viewBox={map.viewBox} style={{width:"100%",borderRadius:14,background:map.bgColor,border:`1px solid ${P.border}`}}>
            <defs>
              <filter id={`shadow-${parkKey}`} x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodOpacity="0.25"/>
              </filter>
            </defs>

            {/* Land area shapes — gives real park-silhouette geography */}
            {map.lands.map(land => (
              <path key={land.name} d={land.path} fill={land.color} opacity={0.55} stroke={land.color} strokeWidth={1.5}/>
            ))}

            {/* Water features */}
            {map.water.map((w,i)=>(
              <ellipse key={i} cx={w.cx} cy={w.cy} rx={w.rx} ry={w.ry} fill="#A8CDE0" opacity={0.7}/>
            ))}

            {/* Curved walkway paths (drawn as actual park pathways, not straight lines) */}
            {map.paths.map((d,i)=>(
              <path key={i} d={d} fill="none" stroke="#FFFFFF" strokeWidth={7} strokeLinecap="round" opacity={0.9}/>
            ))}
            {map.paths.map((d,i)=>(
              <path key={"line"+i} d={d} fill="none" stroke="#E0D5C8" strokeWidth={7} strokeLinecap="round" opacity={0.5} strokeDasharray="0"/>
            ))}

            {/* Land name labels */}
            {map.lands.map(land=>{
              // approximate label position from path bounding via pins in that zone
              const zonePins = map.pins.filter(p=>p.zone===land.name);
              if(zonePins.length===0) return null;
              const lx = zonePins.reduce((s,p)=>s+p.x,0)/zonePins.length;
              const ly = Math.min(...zonePins.map(p=>p.y)) - 14;
              return (
                <text key={land.name} x={lx} y={ly} fontSize="8" textAnchor="middle" fill={P.dark} fontWeight="700" opacity={0.65} style={{textTransform:"uppercase",letterSpacing:"0.5px"}}>
                  {land.name}
                </text>
              );
            })}

            {/* Central landmark icon (castle / Tree of Life / Spaceship Earth / hat) */}
            {map.landmark && (
              <g transform={`translate(${map.landmark.x},${map.landmark.y})`}>
                <circle r="14" fill="#fff" stroke={pk.color} strokeWidth="2" filter={`url(#shadow-${parkKey})`}/>
                <text y="5" fontSize="14" textAnchor="middle">{map.landmark.emoji}</text>
              </g>
            )}

            {/* Entrance marker */}
            <g transform={`translate(${map.entrance.x},${map.entrance.y})`}>
              <rect x="-22" y="-9" width="44" height="18" rx="9" fill={P.dark}/>
              <text y="4" fontSize="8" textAnchor="middle" fill="#fff" fontWeight="bold">ENTRANCE</text>
            </g>

            {/* Bathroom pins */}
            {showBathrooms && map.bathrooms.map((b,i)=>(
              <g key={i} transform={`translate(${b.x},${b.y})`}>
                <circle r="8" fill="#5B9BD5" stroke="#fff" strokeWidth="1.5" filter={`url(#shadow-${parkKey})`}/>
                <text y="3" fontSize="8" textAnchor="middle" fill="#fff" fontWeight="bold">WC</text>
              </g>
            ))}

            {/* Ride pins */}
            {map.pins.map((p,i)=>{
              const ride = rideData(p.ride);
              const isSelected = selectedPin === p.ride;
              return (
                <g key={i} transform={`translate(${p.x},${p.y})`} onClick={()=>setSelectedPin(isSelected?null:p.ride)} style={{cursor:"pointer"}}>
                  <circle r={isSelected?16:13} fill={pk.color} stroke="#fff" strokeWidth="2.5" filter={`url(#shadow-${parkKey})`}
                    style={{transition:"r 0.15s"}}/>
                  <text y="4" fontSize="12" textAnchor="middle" fill="#fff">🎢</text>
                  {isSelected && <circle r={20} fill="none" stroke={pk.color} strokeWidth="1.5" opacity="0.4"/>}
                </g>
              );
            })}
          </svg>

          {selectedPin && (()=>{
            const ride = rideData(selectedPin);
            const pin = map.pins.find(p=>p.ride===selectedPin);
            return (
              <div style={{marginTop:10,padding:"12px 14px",background:P.soft,borderRadius:12,borderLeft:`4px solid ${pk.color}`}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                  <div style={{fontWeight:800,fontSize:14,color:P.dark}}>{selectedPin}</div>
                  <button onClick={()=>setSelectedPin(null)} style={{background:"none",border:"none",color:P.gray,fontSize:16,cursor:"pointer",padding:0}}>✕</button>
                </div>
                <div style={{fontSize:12,color:P.mid,fontWeight:600,marginTop:2}}>📍 {pin.zone}</div>
                {ride && (
                  <div style={{display:"flex",gap:10,flexWrap:"wrap",marginTop:8,fontSize:12,color:P.dark}}>
                    <span>⏱ ~{ride.avgWait}min avg</span>
                    <span>⚡ {ride.ll}</span>
                    <span>📏 {ride.height}</span>
                  </div>
                )}
              </div>
            );
          })()}

          <div style={{display:"flex",gap:12,flexWrap:"wrap",marginTop:12,padding:"8px 10px",background:P.cream,borderRadius:10,fontSize:10,color:P.gray}}>
            <span>🎢 Ride</span>
            <span>🚻 Restroom</span>
            <span>{map.landmark?.emoji} Landmark</span>
            <span style={{marginLeft:"auto",fontStyle:"italic"}}>Illustrated map — not to scale</span>
          </div>
        </Card>
      ) : (
        <div style={{display:"grid",gap:14}}>
          {map.lands.map(land=>{
            const zonePins = map.pins.filter(p=>p.zone===land.name);
            if(zonePins.length===0) return null;
            return (
              <Card key={land.name} style={{borderLeft:`5px solid ${land.color}`}}>
                <div style={{fontWeight:800,fontSize:15,color:P.dark,marginBottom:10}}>{land.name}</div>
                <div style={{display:"grid",gap:8}}>
                  {zonePins.map(p=>{
                    const ride = rideData(p.ride);
                    return (
                      <div key={p.ride} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 10px",background:P.cream,borderRadius:8}}>
                        <span style={{fontSize:13,fontWeight:700,color:P.dark}}>🎢 {p.ride}</span>
                        {ride && <span style={{fontSize:11,color:P.gray}}>~{ride.avgWait}min · {ride.ll}</span>}
                      </div>
                    );
                  })}
                </div>
              </Card>
            );
          })}
          <Card style={{borderLeft:`5px solid #5B9BD5`}}>
            <div style={{fontWeight:800,fontSize:15,color:P.dark,marginBottom:10}}>🚻 Restroom Locations</div>
            <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
              {map.bathrooms.map(b=>(
                <span key={b.label} style={{background:"#EAF3FB",color:"#3A6EA5",borderRadius:99,padding:"5px 12px",fontSize:12,fontWeight:700}}>📍 {b.label}</span>
              ))}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// LIGHTNING LANE TIME BLOCKER
// ═══════════════════════════════════════════════════════════════════════════
function LightningLaneTab() {
  const [selectedDay, setSelectedDay] = useState(0);
  const [plans, setPlans] = useState({}); // { dayIdx: [{id,time,ride,park,type}] }
  const [saved, setSaved] = useState(false);
  const [tripDays, setTripDays] = useState(7);

  useEffect(() => {
    (async () => {
      const stored = await safeGet("ll-time-blocks");
      if (stored) { setPlans(stored.plans||{}); setTripDays(stored.tripDays||7); }
      const trip = await safeGet("trip-plan");
      if (trip?.numDays) setTripDays(trip.numDays);
    })();
  }, []);

  const save = async () => {
    await safeSet("ll-time-blocks", {plans, tripDays});
    setSaved(true); setTimeout(()=>setSaved(false),2000);
  };

  const dayPlan = plans[selectedDay] || [];

  const addSlot = () => {
    const newSlot = {id:Date.now(), time:"09:00", ride:"", park:"mk", type:"LLMP"};
    setPlans({...plans, [selectedDay]: [...dayPlan, newSlot]});
  };
  const updateSlot = (id, key, val) => {
    setPlans({...plans, [selectedDay]: dayPlan.map(s=>s.id===id?{...s,[key]:val}:s)});
  };
  const removeSlot = (id) => {
    setPlans({...plans, [selectedDay]: dayPlan.filter(s=>s.id!==id)});
  };

  const sorted = [...dayPlan].sort((a,b)=>a.time.localeCompare(b.time));
  // Detect conflicts: same time or within 5 min of each other
  const conflicts = new Set();
  for(let i=0;i<sorted.length-1;i++){
    const t1 = sorted[i].time, t2 = sorted[i+1].time;
    if(t1===t2) { conflicts.add(sorted[i].id); conflicts.add(sorted[i+1].id); }
  }

  return (
    <div>
      <Callout icon="⚡">
        Build your Lightning Lane schedule day-by-day. Add each ride you plan to book, set a target time, and we'll flag any times that overlap.
      </Callout>

      <div style={{display:"flex",gap:6,flexWrap:"wrap",margin:"16px 0"}}>
        {Array.from({length:tripDays}).map((_,i)=>(
          <button key={i} onClick={()=>setSelectedDay(i)}
            style={{padding:"7px 14px",borderRadius:99,border:`2px solid ${P.pink}`,background:selectedDay===i?P.pink:"transparent",color:selectedDay===i?"#fff":P.pink,fontWeight:800,fontSize:13,cursor:"pointer"}}>
            Day {i+1}
          </button>
        ))}
      </div>

      <div style={{display:"grid",gap:10,marginBottom:16}}>
        {sorted.length===0 && (
          <div style={{textAlign:"center",padding:30,color:P.gray,fontSize:13}}>
            No Lightning Lane times planned yet for Day {selectedDay+1}.<br/>Tap "+ Add Time Slot" below to start.
          </div>
        )}
        {sorted.map(slot=>{
          const parkColor = PARKS[slot.park]?.color || P.pink;
          const hasConflict = conflicts.has(slot.id);
          return (
            <Card key={slot.id} style={{borderLeft:`5px solid ${hasConflict?"#E74C3C":parkColor}`,padding:"12px 16px"}}>
              <div style={{display:"flex",gap:10,flexWrap:"wrap",alignItems:"center"}}>
                <input type="time" value={slot.time} onChange={e=>updateSlot(slot.id,"time",e.target.value)}
                  style={{padding:"7px 10px",borderRadius:8,border:`1.5px solid ${P.border}`,fontSize:14,fontWeight:800,color:P.dark,width:110}}/>
                <select value={slot.park} onChange={e=>updateSlot(slot.id,"park",e.target.value)}
                  style={{padding:"7px 10px",borderRadius:8,border:`1.5px solid ${P.border}`,fontSize:12,fontWeight:700,color:P.dark,flexShrink:0}}>
                  {Object.entries(PARKS).map(([k,v])=><option key={k} value={k}>{v.emoji} {v.name}</option>)}
                </select>
                <select value={slot.type} onChange={e=>updateSlot(slot.id,"type",e.target.value)}
                  style={{padding:"7px 10px",borderRadius:8,border:`1.5px solid ${P.border}`,fontSize:12,fontWeight:700,color:"#fff",background:slot.type==="LLSP"?P.dark:P.mid,flexShrink:0}}>
                  <option value="LLMP">⚡ LLMP</option>
                  <option value="LLSP">⚡⚡ LLSP</option>
                </select>
                <button onClick={()=>removeSlot(slot.id)} style={{marginLeft:"auto",background:"none",border:"none",color:"#ccc",fontSize:18,cursor:"pointer",padding:4}}>✕</button>
              </div>
              <select value={slot.ride} onChange={e=>updateSlot(slot.id,"ride",e.target.value)}
                style={{width:"100%",marginTop:10,padding:"8px 10px",borderRadius:8,border:`1.5px solid ${P.border}`,fontSize:13,color:P.dark,boxSizing:"border-box"}}>
                <option value="">Select a ride...</option>
                {PARKS[slot.park]?.rides.map(r=><option key={r.name} value={r.name}>{r.name}</option>)}
              </select>
              {hasConflict && (
                <div style={{marginTop:8,fontSize:11,color:"#E74C3C",fontWeight:700}}>⚠️ Time conflict with another booking — adjust to avoid overlap</div>
              )}
            </Card>
          );
        })}
      </div>

      <button onClick={addSlot}
        style={{width:"100%",padding:"12px",borderRadius:12,border:`2px dashed ${P.pink}`,background:"transparent",color:P.pink,fontWeight:800,fontSize:14,cursor:"pointer",marginBottom:12}}>
        + Add Time Slot
      </button>

      <button onClick={save}
        style={{width:"100%",padding:"14px",borderRadius:99,border:"none",background:`linear-gradient(135deg,${P.pink},${P.lilac})`,color:"#fff",fontWeight:900,fontSize:15,cursor:"pointer",boxShadow:"0 4px 20px rgba(255,107,157,0.4)"}}>
        {saved ? "✅ Schedule Saved!" : "💾 Save Lightning Lane Schedule"}
      </button>

      {sorted.length>0 && (
        <Card style={{marginTop:20,background:P.cream}}>
          <div style={{fontWeight:800,fontSize:13,color:P.mid,marginBottom:10}}>📋 Day {selectedDay+1} Timeline</div>
          <div style={{display:"flex",flexDirection:"column",gap:6}}>
            {sorted.map((s,i)=>(
              <div key={s.id} style={{display:"flex",alignItems:"center",gap:8,fontSize:12}}>
                <span style={{fontWeight:800,color:P.dark,minWidth:55}}>{s.time}</span>
                <span style={{width:8,height:8,borderRadius:99,background:PARKS[s.park]?.color}}/>
                <span style={{color:P.dark}}>{s.ride || "(no ride selected)"}</span>
                <span style={{color:P.gray,marginLeft:"auto"}}>{s.type}</span>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// CHARACTER TRACKER (log + live timer)
// ═══════════════════════════════════════════════════════════════════════════
function CharacterTrackerTab() {
  const [met, setMet] = useState({});
  const [waitLog, setWaitLog] = useState({}); // {charName: [seconds,...]}
  const [filter, setFilter] = useState("All");
  const [activeTimer, setActiveTimer] = useState(null); // charName
  const [elapsed, setElapsed] = useState(0);
  const [timerStart, setTimerStart] = useState(null);

  useEffect(() => {
    safeGet("character-tracker").then(d=>{ if(d){ setMet(d.met||{}); setWaitLog(d.waitLog||{}); } });
  }, []);

  useEffect(() => {
    if(!activeTimer) return;
    const id = setInterval(()=>{ setElapsed(Math.floor((Date.now()-timerStart)/1000)); }, 1000);
    return ()=>clearInterval(id);
  }, [activeTimer, timerStart]);

  const persist = async (newMet, newLog) => {
    await safeSet("character-tracker", {met:newMet, waitLog:newLog});
  };

  const startTimer = (name) => { setActiveTimer(name); setTimerStart(Date.now()); setElapsed(0); };
  const stopTimer = async () => {
    const log = {...waitLog, [activeTimer]: [...(waitLog[activeTimer]||[]), elapsed]};
    setWaitLog(log);
    await persist(met, log);
    setActiveTimer(null); setElapsed(0);
  };
  const toggleMet = async (name) => {
    const m = {...met, [name]: !met[name]};
    setMet(m);
    await persist(m, waitLog);
  };

  const fmtTime = (s) => `${Math.floor(s/60)}:${String(s%60).padStart(2,"0")}`;

  const tiers = ["All","Must-Do","Princess","Rare","Classic"];
  const filtered = filter==="All" ? CHARACTERS : CHARACTERS.filter(c=>c.tier===filter);
  const metCount = Object.values(met).filter(Boolean).length;

  return (
    <div>
      <Card style={{marginBottom:18,display:"flex",gap:16,alignItems:"center",flexWrap:"wrap"}}>
        <div style={{textAlign:"center"}}>
          <div style={{fontSize:32,fontWeight:900,color:P.pink}}>{metCount}</div>
          <div style={{fontSize:11,color:P.gray,fontWeight:700}}>Met</div>
        </div>
        <div style={{flex:1,minWidth:150}}>
          <div style={{height:9,background:P.soft,borderRadius:99,overflow:"hidden"}}>
            <div style={{height:"100%",width:`${Math.round(metCount/CHARACTERS.length*100)}%`,background:`linear-gradient(90deg,${P.lilac},${P.pink})`,borderRadius:99,transition:"width .4s"}}/>
          </div>
          <div style={{fontSize:11,color:P.gray,marginTop:4}}>{CHARACTERS.length-metCount} characters left to find!</div>
        </div>
        <Mickey size={28} color={P.pink}/>
      </Card>

      {activeTimer && (
        <Card style={{marginBottom:18,background:`linear-gradient(135deg,${P.dark},${P.mid})`,textAlign:"center",padding:24}}>
          <div style={{color:"rgba(255,255,255,0.7)",fontSize:12,fontWeight:700,textTransform:"uppercase",letterSpacing:1}}>Timing wait for</div>
          <div style={{color:"#fff",fontSize:18,fontWeight:800,margin:"4px 0 12px"}}>{activeTimer}</div>
          <div style={{color:P.gold,fontSize:48,fontWeight:900,fontVariantNumeric:"tabular-nums",lineHeight:1}}>{fmtTime(elapsed)}</div>
          <button onClick={stopTimer}
            style={{marginTop:16,padding:"10px 28px",borderRadius:99,border:"none",background:P.pink,color:"#fff",fontWeight:800,fontSize:14,cursor:"pointer"}}>
            ⏹ Stop & Log Wait
          </button>
        </Card>
      )}

      <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:18}}>
        {tiers.map(t=>(
          <button key={t} onClick={()=>setFilter(t)}
            style={{padding:"5px 14px",borderRadius:8,border:`1.5px solid ${filter===t?P.pink:P.border}`,background:filter===t?P.pink:"transparent",color:filter===t?"#fff":P.dark,fontSize:12,fontWeight:600,cursor:"pointer"}}>
            {t}
          </button>
        ))}
      </div>

      <div style={{display:"grid",gap:10}}>
        {filtered.map(char=>{
          const isMet = met[char.name];
          const logs = waitLog[char.name] || [];
          const avgWait = logs.length ? Math.round(logs.reduce((a,b)=>a+b,0)/logs.length) : null;
          const tierColor = TIER_COLORS[char.tier] || P.mid;
          return (
            <Card key={char.name} style={{borderLeft:`4px solid ${tierColor}`,opacity:isMet?0.85:1}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:10}}>
                <div>
                  <div style={{fontWeight:800,fontSize:14,color:P.dark}}>{char.name}</div>
                  <div style={{fontSize:11,color:P.gray,marginTop:1}}>{PARKS[char.park]?.emoji} {char.location}</div>
                  {avgWait!==null && <div style={{fontSize:11,color:P.mid,marginTop:4,fontWeight:700}}>⏱ Avg wait: {fmtTime(avgWait)} ({logs.length} {logs.length===1?"visit":"visits"})</div>}
                </div>
                <div style={{display:"flex",gap:6,flexShrink:0}}>
                  <span style={{background:tierColor,color:"#fff",borderRadius:99,padding:"2px 9px",fontSize:10,fontWeight:700,height:"fit-content"}}>{char.tier}</span>
                </div>
              </div>
              <div style={{display:"flex",gap:8,marginTop:10}}>
                {!activeTimer && (
                  <button onClick={()=>startTimer(char.name)}
                    style={{flex:1,padding:"7px",borderRadius:8,border:`1.5px solid ${P.mid}`,background:"transparent",color:P.mid,fontWeight:700,fontSize:12,cursor:"pointer"}}>
                    ⏱ Time This Wait
                  </button>
                )}
                <button onClick={()=>toggleMet(char.name)}
                  style={{flex:1,padding:"7px",borderRadius:8,border:"none",background:isMet?P.mint:tierColor,color:"#fff",fontWeight:700,fontSize:12,cursor:"pointer"}}>
                  {isMet ? "✓ Met!" : "Mark as Met"}
                </button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

// ─── DINING TAB ───────────────────────────────────────────────────────────────
function DiningTab() {
  const restaurants = [
    {name:"Be Our Guest",park:"Magic Kingdom 🏰",type:"Table Service",price:"$$$$",book:"60 days",notes:"Inside the Beast's enchanted castle. Book at midnight 60 days out. Worth every effort!"},
    {name:"Cinderella's Royal Table",park:"Magic Kingdom 🏰",type:"Table Service",price:"$$$$",book:"60 days",notes:"Inside the castle! Character breakfast with princesses. Hardest ADR to get."},
    {name:"Space 220",park:"EPCOT 🌍",type:"Table Service",price:"$$$$",book:"60 days",notes:"Space elevator experience, star views. Prix-fixe ~$55 dinner. So worth it!"},
    {name:"'Ohana",park:"Polynesian Resort",type:"Table Service",price:"$$$",book:"60 days",notes:"All-you-care-to-eat skewers & noodles. Monorail access. Classic Disney dining."},
    {name:"Topolino's Terrace",park:"Riviera Resort",type:"Table Service",price:"$$$",book:"60 days",notes:"Rooftop character breakfast! Mickey, Minnie, Donald & Daisy in artist berets. Stunning views."},
    {name:"Sci-Fi Dine-In Theater",park:"Hollywood Studios 🎬",type:"Table Service",price:"$$",book:"30 days",notes:"Dine in classic cars watching 1950s sci-fi films. So fun and unique!"},
    {name:"Jungle Navigation Co.",park:"Magic Kingdom 🏰",type:"Table Service",price:"$$",book:"30 days",notes:"Skipper Canteen! The punny jokes from cast members make the meal."},
    {name:"Boma — Flavors of Africa",park:"Animal Kingdom Lodge",type:"Table Service",price:"$$$",book:"30 days",notes:"Incredible African buffet. Disney's most underrated dining experience."},
  ];
  const [open, setOpen] = useState(null);
  return (
    <div>
      <h3 style={{color:P.dark,fontWeight:900,marginBottom:16}}><MickeyTiny/> Dining Plans</h3>
      <div style={{display:"grid",gap:12,marginBottom:28}}>
        {DINING_PLANS.map(plan=>(
          <Card key={plan.name} style={{borderLeft:`5px solid ${plan.color}`}}>
            <div style={{fontWeight:800,fontSize:15,color:P.dark,marginBottom:4}}>{plan.name}</div>
            <div style={{fontWeight:700,color:plan.color,marginBottom:10,fontSize:14}}>{plan.price}</div>
            <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:8}}>
              {plan.includes.map(i=><span key={i} style={{background:plan.color+"22",borderRadius:99,padding:"3px 10px",fontSize:12,color:P.dark}}>✓ {i}</span>)}
            </div>
            <div style={{fontSize:12,color:"#777"}}>👍 Best for: <em>{plan.best}</em></div>
          </Card>
        ))}
      </div>
      <h3 style={{color:P.dark,fontWeight:900,marginBottom:14}}><MickeyTiny/> Must-Try Restaurants</h3>
      <div style={{display:"grid",gap:10}}>
        {restaurants.map(r=>(
          <div key={r.name} onClick={()=>setOpen(open===r.name?null:r.name)}
            style={{background:P.white,borderRadius:14,padding:"13px 16px",border:`1.5px solid ${open===r.name?P.pink:P.border}`,cursor:"pointer",boxShadow:"0 1px 8px rgba(255,107,157,0.08)"}}>
            <div style={{display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:6}}>
              <div style={{fontWeight:700,fontSize:14,color:P.dark}}>{r.name}</div>
              <div style={{display:"flex",gap:6,fontSize:11}}>
                <span style={{background:P.soft,color:P.mid,padding:"2px 8px",borderRadius:99,fontWeight:700}}>{r.type}</span>
                <span style={{background:P.cream,color:P.pink,padding:"2px 8px",borderRadius:99,fontWeight:700}}>{r.price}</span>
              </div>
            </div>
            <div style={{fontSize:12,color:"#888",marginTop:3}}>{r.park}</div>
            {open===r.name && (
              <div style={{marginTop:10,padding:"10px 12px",background:P.soft,borderRadius:10,fontSize:13,color:P.dark}}>
                <div><strong>📅 Book:</strong> {r.book} days in advance</div>
                <div style={{marginTop:6}}>💡 {r.notes}</div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── RESORTS TAB ──────────────────────────────────────────────────────────────
function ResortsTab() {
  const [tier, setTier] = useState("Value 💛");
  const current = RESORTS.find(r=>r.tier===tier);
  return (
    <div>
      <div style={{display:"flex",gap:8,marginBottom:20,flexWrap:"wrap"}}>
        {RESORTS.map(r=>(
          <button key={r.tier} onClick={()=>setTier(r.tier)}
            style={{padding:"7px 14px",borderRadius:99,border:`2px solid ${r.color}`,background:tier===r.tier?r.color:"transparent",color:tier===r.tier?"#fff":P.dark,fontWeight:700,cursor:"pointer",fontSize:13}}>
            {r.tier}
          </button>
        ))}
      </div>
      <Card style={{marginBottom:14,borderLeft:`5px solid ${current.color}`,background:P.cream}}>
        <div style={{fontWeight:800,color:P.dark}}>{current.tier}</div>
        <div style={{fontWeight:700,color:P.mid,fontSize:14}}>{current.price}</div>
      </Card>
      {current.list.map(r=>(
        <Card key={r.name} style={{marginBottom:12,borderLeft:`4px solid ${current.color}`}}>
          <div style={{fontWeight:800,fontSize:14,color:P.dark,marginBottom:6}}>{r.name}</div>
          <div style={{fontSize:13,marginBottom:6}}><span style={{color:"#999"}}>🚌</span> {r.transport}</div>
          <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
            {r.amenities.split(" · ").map(a=>(
              <span key={a} style={{background:current.color+"33",borderRadius:99,padding:"3px 9px",fontSize:12,color:P.dark}}>✓ {a}</span>
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
}

// ─── CROWD TAB ────────────────────────────────────────────────────────────────
function CrowdTab() {
  const months = [
    {m:"January",c:2,note:"Best month! Post-holiday bliss. Marathon weekend adds a bump."},
    {m:"February",c:3,note:"Excellent. Presidents' Day week gets busier. Otherwise magical."},
    {m:"March",c:8,note:"Spring break = packed. Avoid if possible. Flower & Garden starts."},
    {m:"April",c:7,note:"Easter is chaos. Early/late April much better. Gorgeous weather."},
    {m:"May",c:4,note:"Post-Easter drop. Great time! Memorial Day weekend spikes."},
    {m:"June",c:7,note:"Summer crowds build fast. Hot! Go early, nap midday."},
    {m:"July",c:9,note:"Peak of peaks. 4th of July = maximum crowds. Magical but intense."},
    {m:"August",c:8,note:"Still hot and busy. Eases late August as school starts."},
    {m:"September",c:3,note:"Hidden gem! EPCOT Food & Wine starts. Cooler, shorter waits."},
    {m:"October",c:5,note:"MNSSHP Halloween party! Fall break busy. Early Oct is lovely."},
    {m:"November",c:6,note:"Thanksgiving week is insane. First 3 weeks of November? Great!"},
    {m:"December",c:9,note:"Festive and beautiful but very busy. Dec 26–31 = max capacity."},
  ];
  const tips = [
    {icon:"🌅",title:"Rope Drop",tip:"Arrive 45–60 min before open. Waits are 50–80% shorter for top rides."},
    {icon:"☀️",title:"Midday Break",tip:"11 AM–3 PM = longest lines. Head back to resort, swim, and nap!"},
    {icon:"🌙",title:"Evening Magic",tip:"After 7 PM waits drop significantly. Hit your favorites again."},
    {icon:"📆",title:"Tue–Thu",tip:"Consistently the lightest crowd days. Avoid Saturday at all costs."},
    {icon:"🌧️",title:"Rain = Opportunity",tip:"Florida afternoon showers clear crowds from outdoor areas — ride time!"},
    {icon:"📱",title:"My Disney Experience",tip:"Check wait times live in the app. Refresh every 30 min for drops."},
  ];
  const crowdColor = (c) => c<=3?"#7FDBDA":c<=6?P.peach:"#FF6B9D";

  return (
    <div>
      <h3 style={{color:P.dark,fontWeight:900,marginBottom:14}}><MickeyTiny/> Crowd Calendar</h3>
      <div style={{display:"grid",gap:8,marginBottom:28}}>
        {months.map(({m,c,note})=>(
          <Card key={m} style={{padding:"10px 14px"}}>
            <div style={{display:"flex",gap:12,alignItems:"center"}}>
              <div style={{fontWeight:800,fontSize:13,minWidth:74,color:P.dark}}>{m}</div>
              <div style={{flex:1}}>
                <div style={{height:11,borderRadius:99,background:"#f0e6f0",overflow:"hidden",marginBottom:4}}>
                  <div style={{height:"100%",width:`${c*10}%`,borderRadius:99,background:crowdColor(c),transition:"width 0.3s"}}/>
                </div>
                <div style={{fontSize:11,color:"#777"}}>{note}</div>
              </div>
              <div style={{fontWeight:900,fontSize:15,color:crowdColor(c),minWidth:24,textAlign:"right"}}>{c}/10</div>
            </div>
          </Card>
        ))}
      </div>
      <h3 style={{color:P.dark,fontWeight:900,marginBottom:14}}><MickeyTiny/> Smart Strategies</h3>
      <div style={{display:"grid",gap:10}}>
        {tips.map(t=>(
          <Card key={t.title} style={{padding:"12px 16px",display:"flex",gap:12,alignItems:"flex-start"}}>
            <div style={{fontSize:26}}>{t.icon}</div>
            <div>
              <div style={{fontWeight:800,fontSize:14,color:P.dark,marginBottom:3}}>{t.title}</div>
              <div style={{fontSize:13,color:"#555",lineHeight:1.5}}>{t.tip}</div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ─── BUDGET TAB ───────────────────────────────────────────────────────────────
function BudgetTab() {
  const [adults,setAdults]   = useState(2);
  const [kids,setKids]       = useState(2);
  const [nights,setNights]   = useState(7);
  const [rTier,setRTier]     = useState("Moderate");
  const [tType,setTType]     = useState("4-Park");
  const [dPlan,setDPlan]     = useState("Quick-Service");
  const [llmpOn,setLlmpOn]   = useState(true);
  const [llspN,setLlspN]     = useState(2);
  const [monthly,setMonthly] = useState(500);
  const [banked,setBanked]   = useState(0);

  const resort  = {Value:150,Moderate:300,Deluxe:700,"DVC/Villa":1200}[rTier]*nights;
  const tix     = (adults+kids)*{"1-Park":109,"4-Park":135,"Park Hopper":170}[tType]*nights;
  const llmp    = llmpOn?(adults+kids)*25*nights:0;
  const llsp    = llspN*(adults+kids)*20;
  const dining  = (adults*{None:0,"Quick-Service":57,Standard:94,Deluxe:139}[dPlan] + kids*{None:0,"Quick-Service":23,Standard:34,Deluxe:49}[dPlan])*nights;
  const misc    = (adults+kids)*75*nights;
  const total   = resort+tix+llmp+llsp+dining+misc;
  const left    = Math.max(0,total-banked);
  const months  = monthly>0?Math.ceil(left/monthly):"∞";
  const pDate   = monthly>0?new Date(Date.now()+Math.ceil(left/monthly)*30*24*3600*1000).toLocaleDateString("en-US",{month:"long",year:"numeric"}):"N/A";

  const rows=[
    {l:"🏨 Resort",v:resort},{l:"🎟️ Tickets",v:tix},{l:"⚡ LLMP",v:llmp},
    {l:"⚡ LLSP",v:llsp},{l:"🍽️ Dining Plan",v:dining},{l:"🛍️ Misc",v:misc},
  ];

  const Slider = ({label,value,set,min,max,step=1,pre=""}) => (
    <Card style={{marginBottom:10}}>
      <div style={{fontWeight:700,fontSize:13,color:P.mid,marginBottom:6}}>{label}: <strong style={{color:P.dark}}>{pre}{value.toLocaleString()}</strong></div>
      <input type="range" min={min} max={max} step={step} value={value} onChange={e=>set(Number(e.target.value))} style={{width:"100%",accentColor:P.pink}}/>
    </Card>
  );

  const Select = ({label,value,set,options}) => (
    <Card style={{marginBottom:10}}>
      <label style={{fontWeight:700,fontSize:13,color:P.mid,display:"block",marginBottom:6}}>{label}</label>
      <select value={value} onChange={e=>set(e.target.value)} style={{width:"100%",padding:"7px 10px",borderRadius:10,border:`1.5px solid ${P.border}`,fontSize:13,color:P.dark,background:P.cream}}>
        {options.map(o=><option key={o}>{o}</option>)}
      </select>
    </Card>
  );

  return (
    <div>
      <Slider label="👤 Adults" value={adults} set={setAdults} min={1} max={10}/>
      <Slider label="🧒 Children" value={kids} set={setKids} min={0} max={10}/>
      <Slider label="🌙 Nights" value={nights} set={setNights} min={1} max={21}/>
      <Select label="🏨 Resort Tier" value={rTier} set={setRTier} options={["Value","Moderate","Deluxe","DVC/Villa"]}/>
      <Select label="🎟️ Ticket Type" value={tType} set={setTType} options={["1-Park","4-Park","Park Hopper"]}/>
      <Select label="🍽️ Dining Plan" value={dPlan} set={setDPlan} options={["None","Quick-Service","Standard","Deluxe"]}/>
      <Card style={{marginBottom:10,display:"flex",alignItems:"center",gap:12}}>
        <input type="checkbox" checked={llmpOn} onChange={e=>setLlmpOn(e.target.checked)} style={{width:18,height:18,accentColor:P.pink}}/>
        <span style={{fontWeight:700,fontSize:13,color:P.mid}}>⚡ Lightning Lane Multi Pass</span>
      </Card>
      <Slider label="⚡ LLSP Rides/day" value={llspN} set={setLlspN} min={0} max={6}/>

      <div style={{background:`linear-gradient(135deg,${P.dark},${P.mid})`,borderRadius:20,padding:20,color:"#fff",margin:"20px 0"}}>
        <div style={{fontSize:12,opacity:0.65,marginBottom:4}}>ESTIMATED TOTAL</div>
        <div style={{fontSize:40,fontWeight:900,color:P.gold,letterSpacing:-1}}>${total.toLocaleString()}</div>
        <div style={{fontSize:11,opacity:0.5,marginBottom:14}}>*2026 estimates, subject to change</div>
        {rows.map(r=>(
          <div key={r.l} style={{display:"flex",justifyContent:"space-between",fontSize:13,borderBottom:"1px solid rgba(255,255,255,0.12)",paddingBottom:6,marginBottom:6}}>
            <span style={{opacity:0.85}}>{r.l}</span>
            <span style={{fontWeight:700}}>${r.v.toLocaleString()}</span>
          </div>
        ))}
      </div>

      <h3 style={{color:P.dark,fontWeight:900,marginBottom:14}}>📅 Trip Payoff Schedule</h3>
      <Slider label="💵 Monthly savings" value={monthly} set={setMonthly} min={50} max={3000} step={50} pre="$"/>
      <Slider label="🏦 Already saved" value={banked} set={setBanked} min={0} max={total} step={100} pre="$"/>

      <div style={{background:`linear-gradient(135deg,${P.soft},${P.cream})`,borderRadius:16,padding:18,border:`2px solid ${P.border}`}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
          {[
            {l:"Trip Total",v:`$${total.toLocaleString()}`,hi:false},
            {l:"Already Saved",v:`$${banked.toLocaleString()}`,hi:false},
            {l:"Still Needed",v:`$${left.toLocaleString()}`,hi:true},
            {l:"Months to Save",v:months,hi:true},
            {l:"Monthly Savings",v:`$${monthly.toLocaleString()}`,hi:false},
            {l:"Paid Off By",v:pDate,hi:true},
          ].map(({l,v,hi})=>(
            <div key={l} style={{background:hi?"#fff":"rgba(255,255,255,0.6)",borderRadius:12,padding:"12px 14px",textAlign:"center",boxShadow:hi?"0 2px 12px rgba(255,107,157,0.15)":"none"}}>
              <div style={{fontSize:11,color:"#888",marginBottom:4,fontWeight:600}}>{l}</div>
              <div style={{fontSize:hi?22:17,fontWeight:900,color:hi?P.pink:P.dark}}>{v}</div>
            </div>
          ))}
        </div>
        {monthly>0&&left>0&&(
          <div style={{marginTop:14,background:"#fff",borderRadius:10,padding:"10px 14px",fontSize:12,color:P.mid,textAlign:"center"}}>
            💕 Save <strong>${monthly.toLocaleString()}/month</strong> and your Disney dream trip is paid off by <strong>{pDate}!</strong> You've got this! ✨
          </div>
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// TODAY'S ASSISTANT — pulls together trip plan + LL schedule + character goals
// ═══════════════════════════════════════════════════════════════════════════
// ─── Reusable "Next Event" countdown card ────────────────────────────────────
function NextEventCountdown({ icon, label, eventName, subLabel, targetDate, color, emptyText, emptyHint }) {
  const c = useCountdown(targetDate);

  if (!targetDate || !c) {
    return (
      <Card style={{marginBottom:14,textAlign:"center",padding:18,color:P.gray,fontSize:13}}>
        <div style={{fontSize:22,marginBottom:6}}>{icon}</div>
        {emptyText}
        {emptyHint && <div style={{fontSize:11,marginTop:4,color:P.gray}}>{emptyHint}</div>}
      </Card>
    );
  }

  if (c.isPast) {
    return (
      <Card style={{marginBottom:14,background:`linear-gradient(135deg,${color},${P.mid})`,color:"#fff"}}>
        <div style={{fontSize:11,opacity:0.8,fontWeight:700,textTransform:"uppercase",letterSpacing:0.8}}>{label}</div>
        <div style={{fontSize:16,fontWeight:800,margin:"4px 0 2px"}}>{icon} {eventName}</div>
        <div style={{fontSize:12,opacity:0.9}}>This time has passed — hope it was magical! ✨</div>
      </Card>
    );
  }

  const urgent = c.totalMs < 30*60000; // under 30 min

  return (
    <Card style={{marginBottom:14,background:`linear-gradient(135deg,${color},${P.mid})`,color:"#fff",position:"relative",overflow:"hidden"}}>
      <div style={{fontSize:11,opacity:0.8,fontWeight:700,textTransform:"uppercase",letterSpacing:0.8}}>{label}</div>
      <div style={{fontSize:16,fontWeight:800,margin:"4px 0 2px"}}>{icon} {eventName}</div>
      {subLabel && <div style={{fontSize:12,opacity:0.85,marginBottom:8}}>{subLabel}</div>}
      <div style={{display:"flex",alignItems:"baseline",gap:6,marginTop:6}}>
        {c.d>0 && (
          <>
            <span style={{fontSize:28,fontWeight:900,fontVariantNumeric:"tabular-nums"}}>{c.d}</span>
            <span style={{fontSize:11,opacity:0.8,marginRight:6}}>d</span>
          </>
        )}
        <span style={{fontSize:28,fontWeight:900,fontVariantNumeric:"tabular-nums"}}>{String(c.h).padStart(2,"0")}</span>
        <span style={{fontSize:11,opacity:0.8}}>h</span>
        <span style={{fontSize:28,fontWeight:900,fontVariantNumeric:"tabular-nums"}}>{String(c.m).padStart(2,"0")}</span>
        <span style={{fontSize:11,opacity:0.8}}>m</span>
        <span style={{fontSize:28,fontWeight:900,fontVariantNumeric:"tabular-nums"}}>{String(c.s).padStart(2,"0")}</span>
        <span style={{fontSize:11,opacity:0.8}}>s</span>
      </div>
      {urgent && <div style={{marginTop:8,background:"rgba(255,255,255,0.25)",borderRadius:8,padding:"4px 10px",fontSize:11,fontWeight:700,display:"inline-block"}}>⏰ Coming up soon — get moving!</div>}
    </Card>
  );
}

function TodayAssistantTab() {
  const [tripData, setTripData] = useState(null);
  const [llData, setLlData] = useState(null);
  const [charData, setCharData] = useState(null);
  const [selectedDay, setSelectedDay] = useState(0);

  useEffect(() => {
    (async () => {
      setTripData(await safeGet("trip-plan"));
      setLlData(await safeGet("ll-time-blocks"));
      setCharData(await safeGet("character-tracker"));
    })();
  }, []);

  const day = tripData?.days?.[selectedDay];
  const llSlots = (llData?.plans?.[selectedDay] || []).sort((a,b)=>a.time.localeCompare(b.time));
  const diningList = (day?.dining || []).slice().sort((a,b)=>a.time.localeCompare(b.time));
  const parkInfo = day ? PARKS[day.park] : null;
  const charsAtPark = parkInfo ? CHARACTERS.filter(c=>c.park===day.park) : [];
  const metHere = charsAtPark.filter(c=>charData?.met?.[c.name]);
  const travelDate = tripData?.travelDate;

  // Find the next upcoming Lightning Lane slot today (first one not yet past)
  const nextLL = (() => {
    if (!travelDate) return null;
    for (const s of llSlots) {
      const target = dateTimeForSlot(travelDate, selectedDay, s.time);
      if (target && target.getTime() > Date.now()) return { slot: s, target };
    }
    // fallback: show the first slot even if past, so the card isn't empty when day has slots
    if (llSlots[0]) return { slot: llSlots[0], target: dateTimeForSlot(travelDate, selectedDay, llSlots[0].time) };
    return null;
  })();

  // Find the next upcoming dining reservation today
  const nextDining = (() => {
    if (!travelDate) return null;
    for (const r of diningList) {
      if (!r.name) continue;
      const target = dateTimeForSlot(travelDate, selectedDay, r.time);
      if (target && target.getTime() > Date.now()) return { res: r, target };
    }
    const firstNamed = diningList.find(r=>r.name);
    if (firstNamed) return { res: firstNamed, target: dateTimeForSlot(travelDate, selectedDay, firstNamed.time) };
    return null;
  })();

  if (!tripData) {
    return (
      <Card style={{textAlign:"center",padding:30}}>
        <div style={{fontSize:32,marginBottom:10}}>📅</div>
        <div style={{fontWeight:800,color:P.dark,marginBottom:6}}>No trip planned yet!</div>
        <div style={{fontSize:13,color:P.gray}}>Visit "My Trip" first to set up your days, then come back here for your live daily assistant view.</div>
      </Card>
    );
  }

  return (
    <div>
      <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:18}}>
        {tripData.days.slice(0,tripData.numDays).map((_,i)=>(
          <button key={i} onClick={()=>setSelectedDay(i)}
            style={{padding:"7px 14px",borderRadius:99,border:`2px solid ${P.pink}`,background:selectedDay===i?P.pink:"transparent",color:selectedDay===i?"#fff":P.pink,fontWeight:800,fontSize:13,cursor:"pointer"}}>
            Day {i+1}
          </button>
        ))}
      </div>

      {!travelDate && (
        <Callout icon="📅">
          Set your <strong>Day 1 Travel Date</strong> in the Trip Planner to unlock live countdowns to your next Lightning Lane and dining reservation times.
        </Callout>
      )}

      {day && (
        <>
          <Card style={{marginBottom:16,background:`linear-gradient(135deg,${parkInfo?.color||P.pink},${P.mid})`,color:"#fff"}}>
            <div style={{fontSize:12,opacity:0.8,fontWeight:700,textTransform:"uppercase",letterSpacing:0.8}}>Today's Park</div>
            <div style={{fontSize:22,fontWeight:900,margin:"4px 0"}}>{PARK_NAMES[day.park]}</div>
            {travelDate && <div style={{fontSize:12,opacity:0.85}}>{dateForDay(travelDate,selectedDay)}</div>}
            {day.mustDo && <div style={{fontSize:13,opacity:0.95,marginTop:6}}>📝 {day.mustDo}</div>}
            {day.park!=="off" && DISNEY_WAIT_LINKS[day.park] && (
              <a href={DISNEY_WAIT_LINKS[day.park]} target="_blank" rel="noopener noreferrer" style={{textDecoration:"none"}}>
                <div style={{marginTop:12,display:"flex",alignItems:"center",gap:8,background:"rgba(255,255,255,0.18)",borderRadius:10,padding:"8px 12px"}}>
                  <span style={{fontSize:14}}>📡</span>
                  <span style={{fontSize:12,fontWeight:700,color:"#fff",flex:1}}>Check live wait times right now →</span>
                </div>
              </a>
            )}
          </Card>

          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:4}}>
            <NextEventCountdown
              icon="⚡"
              label="Next Lightning Lane"
              eventName={nextLL?.slot?.ride || "—"}
              subLabel={nextLL?.slot ? `${nextLL.slot.time} · ${nextLL.slot.type}` : null}
              targetDate={nextLL?.target}
              color={P.dark}
              emptyText="No Lightning Lane scheduled today"
              emptyHint="Add times in LL Scheduler"
            />
            <NextEventCountdown
              icon="🍽"
              label="Next Dining"
              eventName={nextDining?.res?.name || "—"}
              subLabel={nextDining?.res ? nextDining.res.time : null}
              targetDate={nextDining?.target}
              color={P.peach}
              emptyText="No dining reservation today"
              emptyHint="Add one in My Trip Planner"
            />
          </div>

          <h3 style={{color:P.dark,fontWeight:900,fontSize:15,marginBottom:10}}>⚡ Lightning Lane Schedule</h3>
          {llSlots.length === 0 ? (
            <Card style={{marginBottom:18,textAlign:"center",padding:20,color:P.gray,fontSize:13}}>
              No Lightning Lane times set for today. Visit the LL Scheduler tab to plan your booking times.
            </Card>
          ) : (
            <div style={{display:"grid",gap:8,marginBottom:18}}>
              {llSlots.map(s=>(
                <Card key={s.id} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 16px",borderLeft:`4px solid ${PARKS[s.park]?.color}`}}>
                  <div style={{fontWeight:900,fontSize:16,color:P.dark,minWidth:60}}>{s.time}</div>
                  <div style={{flex:1}}>
                    <div style={{fontWeight:700,fontSize:13,color:P.dark}}>{s.ride||"(no ride selected)"}</div>
                    <div style={{fontSize:11,color:P.gray}}>{s.type}</div>
                  </div>
                </Card>
              ))}
            </div>
          )}

          <h3 style={{color:P.dark,fontWeight:900,fontSize:15,marginBottom:10}}>🍽 Dining Reservations</h3>
          {diningList.filter(r=>r.name).length === 0 ? (
            <Card style={{marginBottom:18,textAlign:"center",padding:20,color:P.gray,fontSize:13}}>
              No dining reservations added for today. Add them in My Trip Planner.
            </Card>
          ) : (
            <div style={{display:"grid",gap:8,marginBottom:18}}>
              {diningList.filter(r=>r.name).map(r=>(
                <Card key={r.id} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 16px",borderLeft:`4px solid ${P.peach}`}}>
                  <div style={{fontWeight:900,fontSize:16,color:P.dark,minWidth:60}}>{r.time}</div>
                  <div style={{flex:1,fontWeight:700,fontSize:13,color:P.dark}}>{r.name}</div>
                </Card>
              ))}
            </div>
          )}

          <h3 style={{color:P.dark,fontWeight:900,fontSize:15,marginBottom:10}}>🎢 Planned Rides</h3>
          {(day.rides||[]).length === 0 ? (
            <Card style={{marginBottom:18,textAlign:"center",padding:20,color:P.gray,fontSize:13}}>No rides added for today yet.</Card>
          ) : (
            <Card style={{marginBottom:18}}>
              <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
                {day.rides.map((r,idx)=>(
                  <span key={r} style={{background:(parkInfo?.color||P.pink)+"22",color:P.dark,borderRadius:99,padding:"5px 12px",fontSize:12,fontWeight:700}}>{idx+1}. {r}</span>
                ))}
              </div>
            </Card>
          )}

          <h3 style={{color:P.dark,fontWeight:900,fontSize:15,marginBottom:10}}>🎭 Characters at This Park</h3>
          <Card style={{marginBottom:10}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
              <span style={{fontSize:13,fontWeight:700,color:P.dark}}>Progress here</span>
              <span style={{fontSize:13,fontWeight:800,color:P.pink}}>{metHere.length}/{charsAtPark.length}</span>
            </div>
            <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
              {charsAtPark.map(c=>{
                const isMet = charData?.met?.[c.name];
                return (
                  <span key={c.name} style={{background:isMet?P.mint:P.soft,color:isMet?"#fff":P.mid,borderRadius:99,padding:"5px 12px",fontSize:11,fontWeight:700}}>
                    {isMet?"✓ ":""}{c.name}
                  </span>
                );
              })}
            </div>
          </Card>
        </>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// PHOTO ALBUM — links out to a real shared album (Google Photos etc.)
// since this app can't store/upload actual image files
// ═══════════════════════════════════════════════════════════════════════════
const ALBUM_SERVICES = [
  {name:"Google Photos", icon:"🟢", best:"Best overall — free, easy, works on any phone", setupUrl:"https://photos.google.com/"},
  {name:"Apple iCloud Shared Album", icon:"🍎", best:"Best if your whole family has iPhones", setupUrl:"https://support.apple.com/en-us/HT202317"},
  {name:"Dropbox", icon:"📦", best:"Good if you already use Dropbox for files", setupUrl:"https://www.dropbox.com/"},
];

function PhotoAlbumTab() {
  const [albumUrl, setAlbumUrl] = useState("");
  const [albumService, setAlbumService] = useState("Google Photos");
  const [dayEntries, setDayEntries] = useState({}); // { dayIdx: {caption, albumUrl} }
  const [tripData, setTripData] = useState(null);
  const [saved, setSaved] = useState(false);
  const [showSetup, setShowSetup] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const stored = await safeGet("photo-album");
      const trip = await safeGet("trip-plan");
      setTripData(trip);
      if (stored) {
        setAlbumUrl(stored.albumUrl || "");
        setAlbumService(stored.albumService || "Google Photos");
        setDayEntries(stored.dayEntries || {});
      }
      setLoading(false);
    })();
  }, []);

  const save = async () => {
    await safeSet("photo-album", {albumUrl, albumService, dayEntries});
    setSaved(true);
    setTimeout(()=>setSaved(false),2500);
  };

  const updateDay = (i, key, val) => {
    setDayEntries(prev => ({...prev, [i]: {...(prev[i]||{}), [key]: val}}));
  };

  const numDays = tripData?.numDays || 7;
  const travelDate = tripData?.travelDate;

  if (loading) return <div style={{textAlign:"center",padding:40,color:P.mid}}>✨ Loading your album...</div>;

  return (
    <div>
      <Callout icon="📸">
        This app can't store photo files directly, but it can organize and link out to a <strong>real shared album</strong> where you and your family can all upload and view photos together. Set up your album below, then add a link per day.
      </Callout>

      {/* Main shared album link */}
      <Card style={{marginBottom:18,borderLeft:`5px solid ${P.gold}`}}>
        <div style={{fontWeight:800,fontSize:15,color:P.dark,marginBottom:4}}>🔗 Our Family Album</div>
        <div style={{fontSize:12,color:P.gray,marginBottom:12}}>Create one shared album before your trip, then paste the link here so everyone in the family can find it in one place.</div>

        <label style={{fontSize:12,fontWeight:700,color:P.mid,display:"block",marginBottom:6}}>Album Service</label>
        <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:14}}>
          {ALBUM_SERVICES.map(s=>(
            <button key={s.name} onClick={()=>setAlbumService(s.name)}
              style={{padding:"6px 12px",borderRadius:99,border:`2px solid ${albumService===s.name?P.gold:P.border}`,background:albumService===s.name?P.gold:"transparent",color:albumService===s.name?"#fff":P.dark,fontSize:12,fontWeight:700,cursor:"pointer"}}>
              {s.icon} {s.name}
            </button>
          ))}
        </div>

        <label style={{fontSize:12,fontWeight:700,color:P.mid,display:"block",marginBottom:6}}>Shared Album Link</label>
        <input value={albumUrl} onChange={e=>setAlbumUrl(e.target.value)} placeholder="Paste your Google Photos / iCloud / Dropbox link here..."
          style={{width:"100%",padding:"10px 14px",borderRadius:12,border:`2px solid ${P.border}`,fontSize:13,color:P.dark,background:P.cream,boxSizing:"border-box",marginBottom:10}}/>

        {albumUrl && (
          <a href={albumUrl} target="_blank" rel="noopener noreferrer" style={{textDecoration:"none"}}>
            <div style={{display:"flex",alignItems:"center",gap:8,background:P.dark,borderRadius:10,padding:"10px 14px"}}>
              <span style={{fontSize:16}}>📷</span>
              <span style={{fontSize:13,fontWeight:700,color:"#fff",flex:1}}>Open Our Family Album</span>
              <span style={{color:P.gold,fontSize:16}}>↗</span>
            </div>
          </a>
        )}

        <button onClick={()=>setShowSetup(v=>!v)}
          style={{marginTop:12,background:"none",border:"none",color:P.mid,fontSize:12,fontWeight:700,cursor:"pointer",textDecoration:"underline",padding:0}}>
          {showSetup ? "Hide setup guide ▲" : "How do I create a shared album? ▼"}
        </button>

        {showSetup && (
          <div style={{marginTop:14,display:"grid",gap:10}}>
            {ALBUM_SERVICES.map(s=>(
              <div key={s.name} style={{background:P.soft,borderRadius:10,padding:"10px 14px"}}>
                <div style={{fontWeight:700,fontSize:13,color:P.dark,marginBottom:2}}>{s.icon} {s.name}</div>
                <div style={{fontSize:12,color:P.gray,marginBottom:6}}>{s.best}</div>
                <a href={s.setupUrl} target="_blank" rel="noopener noreferrer" style={{fontSize:12,color:P.mid,fontWeight:700}}>Open {s.name} →</a>
              </div>
            ))}
            <div style={{fontSize:12,color:P.dark,lineHeight:1.6,background:P.cream,borderRadius:10,padding:"10px 14px"}}>
              <strong>Quick steps for Google Photos (recommended):</strong><br/>
              1. Open Google Photos → tap "Sharing" → "+ Shared Album"<br/>
              2. Name it (e.g. "Smith Family Disney Trip 2026")<br/>
              3. Tap "Invite people" → toggle "Let anyone with the link contribute"<br/>
              4. Copy the link and paste it above, then text it to your family before you leave!
            </div>
          </div>
        )}
      </Card>

      {/* Per-day photo log */}
      <h3 style={{color:P.dark,fontWeight:900,fontSize:15,marginBottom:10}}>📅 Daily Photo Log</h3>
      <div style={{display:"grid",gap:12}}>
        {Array.from({length:numDays}).map((_,i)=>{
          const entry = dayEntries[i] || {};
          const day = tripData?.days?.[i];
          const parkColor = day ? PARKS[day.park]?.color : P.pink;
          return (
            <Card key={i} style={{borderLeft:`5px solid ${parkColor||P.pink}`}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10,flexWrap:"wrap",gap:6}}>
                <div style={{fontWeight:900,fontSize:14,color:P.dark}}>
                  <MickeyTiny color={parkColor||P.pink}/> Day {i+1}
                  {travelDate && <span style={{fontSize:11,fontWeight:600,color:P.gray,marginLeft:8}}>{dateForDay(travelDate,i)}</span>}
                </div>
                {day && <span style={{fontSize:11,color:P.mid,fontWeight:700}}>{PARK_NAMES[day.park]}</span>}
              </div>

              <label style={{fontSize:11,fontWeight:700,color:P.mid,display:"block",marginBottom:5}}>📸 Photo Highlight / Caption</label>
              <input value={entry.caption||""} onChange={e=>updateDay(i,"caption",e.target.value)}
                placeholder="e.g. Everyone's faces on TRON, the castle at golden hour..."
                style={{width:"100%",padding:"8px 12px",borderRadius:10,border:`1.5px solid ${P.border}`,fontSize:12,color:P.dark,background:P.white,boxSizing:"border-box",marginBottom:8}}/>

              <label style={{fontSize:11,fontWeight:700,color:P.mid,display:"block",marginBottom:5}}>🔗 Specific Album/Folder Link (optional)</label>
              <input value={entry.albumUrl||""} onChange={e=>updateDay(i,"albumUrl",e.target.value)}
                placeholder="Leave blank to use the main family album above"
                style={{width:"100%",padding:"8px 12px",borderRadius:10,border:`1.5px solid ${P.border}`,fontSize:12,color:P.dark,background:P.white,boxSizing:"border-box"}}/>

              {(entry.albumUrl || albumUrl) && (
                <a href={entry.albumUrl || albumUrl} target="_blank" rel="noopener noreferrer" style={{textDecoration:"none"}}>
                  <div style={{marginTop:10,display:"flex",alignItems:"center",gap:6,color:P.mid,fontSize:12,fontWeight:700}}>
                    📷 View Day {i+1} Photos →
                  </div>
                </a>
              )}
            </Card>
          );
        })}
      </div>

      <button onClick={save}
        style={{width:"100%",padding:"14px",borderRadius:99,border:"none",background:`linear-gradient(135deg,${P.gold},${P.peach})`,color:P.dark,fontWeight:900,fontSize:15,cursor:"pointer",boxShadow:"0 4px 20px rgba(255,215,0,0.35)",marginTop:16}}>
        {saved ? "✅ Album Info Saved!" : "💾 Save Photo Album"}
      </button>

      <Card style={{marginTop:18,background:P.soft}}>
        <div style={{fontWeight:800,fontSize:13,color:P.dark,marginBottom:6}}>💡 Tip for the whole family</div>
        <div style={{fontSize:12,color:P.dark,lineHeight:1.6}}>
          Share the family album link with everyone <strong>before</strong> you leave for your trip. Most shared album apps let anyone with the link add their own photos in real time — so the moment someone takes a great shot, it shows up for everyone, no group text photo dumps required.
        </div>
      </Card>
    </div>
  );
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────
const TABS = [
  {id:"home",label:"🏰 Home"},
  {id:"today",label:"✨ Today"},
  {id:"plan",label:"📅 My Trip"},
  {id:"ll",label:"⚡ LL Scheduler"},
  {id:"characters",label:"🎭 Characters"},
  {id:"photos",label:"📸 Photo Album"},
  {id:"mk",label:"Magic Kingdom"},
  {id:"ep",label:"EPCOT"},
  {id:"hs",label:"Hollywood Studios"},
  {id:"ak",label:"Animal Kingdom"},
  {id:"dining",label:"🍽️ Dining"},
  {id:"resorts",label:"🏨 Resorts"},
  {id:"crowd",label:"📊 Wait Times"},
  {id:"budget",label:"💰 Budget"},
];

function ParkPage({ parkKey }) {
  const [sub, setSub] = useState("rides"); // "rides" | "map"
  const pk = PARKS[parkKey];
  return (
    <>
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}>
        <Mickey size={30} color={pk.color}/>
        <div>
          <h2 style={{margin:0,color:P.dark,fontWeight:900}}>{pk.name}</h2>
          <p style={{margin:0,fontSize:13,color:"#888"}}>Rides · Lightning Lane · Map · Pro Tips</p>
        </div>
      </div>
      <div style={{display:"flex",gap:8,marginBottom:18}}>
        <button onClick={()=>setSub("rides")}
          style={{flex:1,padding:"9px",borderRadius:10,border:`2px solid ${pk.color}`,background:sub==="rides"?pk.color:"transparent",color:sub==="rides"?"#fff":pk.color,fontWeight:800,fontSize:13,cursor:"pointer"}}>
          📋 Ride Guide
        </button>
        <button onClick={()=>setSub("map")}
          style={{flex:1,padding:"9px",borderRadius:10,border:`2px solid ${pk.color}`,background:sub==="map"?pk.color:"transparent",color:sub==="map"?"#fff":pk.color,fontWeight:800,fontSize:13,cursor:"pointer"}}>
          🗺️ Park Map
        </button>
      </div>
      {sub==="rides" ? <RidesTab parkKey={parkKey}/> : <ParkMapTab parkKey={parkKey}/>}
    </>
  );
}

// ─── Home screen trip countdown ──────────────────────────────────────────────
function HomeTripCountdown() {
  const [tripData, setTripData] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    safeGet("trip-plan").then(d => { setTripData(d); setLoaded(true); });
  }, []);

  const targetDate = tripData?.travelDate ? dateForDayObj(tripData.travelDate, 0) : null;
  const c = useCountdown(targetDate);

  if (!loaded || !tripData || !tripData.travelDate) return null;

  if (c && c.isPast && c.totalMs < -((tripData.numDays||1) * 86400000)) {
    // Trip fully over — don't keep showing a stale countdown
    return null;
  }

  const tripInProgress = c && c.isPast;

  return (
    <Card style={{marginBottom:20,background:`linear-gradient(135deg,${P.dark},${P.mid})`,color:"#fff",textAlign:"center",padding:24,position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",top:-10,right:-10,opacity:0.12}}><Mickey size={100} color="#fff"/></div>
      <div style={{position:"relative",zIndex:1}}>
        <div style={{fontSize:12,opacity:0.7,fontWeight:700,textTransform:"uppercase",letterSpacing:1}}>
          {tripInProgress ? "✨ You're at Disney World! ✨" : "Countdown to Magic"}
        </div>
        <div style={{fontSize:16,fontWeight:800,margin:"6px 0 14px",color:P.gold}}>{tripData.tripName}</div>
        {tripInProgress ? (
          <div style={{fontSize:14,opacity:0.95}}>Enjoy every moment — you planned this perfectly! 🏰</div>
        ) : c ? (
          <div style={{display:"flex",justifyContent:"center",gap:16,flexWrap:"wrap"}}>
            {[["Days",c.d],["Hours",c.h],["Min",c.m],["Sec",c.s]].map(([label,val])=>(
              <div key={label} style={{textAlign:"center"}}>
                <div style={{fontSize:34,fontWeight:900,fontVariantNumeric:"tabular-nums",lineHeight:1}}>{String(val).padStart(2,"0")}</div>
                <div style={{fontSize:10,opacity:0.7,fontWeight:700,textTransform:"uppercase",letterSpacing:0.6,marginTop:3}}>{label}</div>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </Card>
  );
}

export default function App() {
  const [tab, setTab] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div style={{fontFamily:"'Segoe UI',system-ui,sans-serif",background:`linear-gradient(180deg,${P.cream} 0%,#FFF5FB 100%)`,minHeight:"100vh"}}>
      {/* Header */}
      <div style={{background:`linear-gradient(135deg,${P.mid} 0%,${P.pink} 100%)`,padding:"20px 16px 16px",textAlign:"center",position:"relative"}}>
        <div style={{display:"flex",justifyContent:"center",gap:8,marginBottom:6}}>
          <Mickey size={22} color="rgba(255,255,255,0.5)"/>
          <Mickey size={28} color={P.gold}/>
          <Mickey size={22} color="rgba(255,255,255,0.5)"/>
        </div>
        <h1 style={{margin:0,color:"#fff",fontSize:22,fontWeight:900,letterSpacing:-0.5}}>
          Disney World <span style={{color:P.gold}}>Dream Planner</span>
        </h1>
        <p style={{margin:"4px 0 0",color:"rgba(255,255,255,0.7)",fontSize:12}}>✨ 2026 Edition · Your Personal Disney Assistant ✨</p>
      </div>

      {/* Tab bar */}
      <div style={{overflowX:"auto",background:"#fff",borderBottom:`2px solid ${P.border}`,display:"flex",padding:"0 8px"}}>
        {TABS.map(t=>(
          <button key={t.id} onClick={()=>{setTab(t.id);setMenuOpen(false);}}
            style={{padding:"11px 12px",border:"none",background:"none",cursor:"pointer",fontWeight:tab===t.id?800:500,fontSize:12,color:tab===t.id?P.pink:"#666",borderBottom:tab===t.id?`3px solid ${P.pink}`:"3px solid transparent",whiteSpace:"nowrap",transition:"all 0.15s"}}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{maxWidth:720,margin:"0 auto",padding:"20px 14px 60px"}}>

        {tab==="home" && (
          <div>
            <CastleSVG/>
            <div style={{textAlign:"center",margin:"18px 0 24px"}}>
              <h2 style={{color:P.dark,fontWeight:900,fontSize:20,margin:"0 0 8px"}}>Where will your magic begin? ✨</h2>
              <p style={{color:"#888",fontSize:14,margin:0}}>Your all-in-one Disney World planning companion — bring it to the parks!</p>
            </div>
            <HomeTripCountdown/>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
              {[
                {label:"✨ Today's Plan",desc:"Live assistant view for park day",tab:"today",color:P.gold},
                {label:"📅 Plan My Trip",desc:"Build your day-by-day itinerary",tab:"plan",color:P.pink},
                {label:"⚡ LL Scheduler",desc:"Time-block your Lightning Lanes",tab:"ll",color:P.dark},
                {label:"🎭 Characters",desc:"Track meets & time your waits",tab:"characters",color:P.rose},
                {label:"📸 Photo Album",desc:"Organize & share trip photos",tab:"photos",color:P.gold},
                {label:"🎢 Ride Guides",desc:"Tips, tiers, maps & Lightning Lane",tab:"mk",color:P.lilac},
                {label:"🍽️ Dining",desc:"Plans, restaurants & must-do's",tab:"dining",color:P.peach},
                {label:"🏨 Resorts",desc:"Hotels, transport & amenities",tab:"resorts",color:P.mint},
                {label:"📊 Wait Times",desc:"Crowd calendar & strategies",tab:"crowd",color:P.rose},
                {label:"💰 Trip Budget",desc:"Cost estimator & payoff plan",tab:"budget",color:P.mid},
              ].map(item=>(
                <button key={item.tab} onClick={()=>setTab(item.tab)}
                  style={{background:"#fff",border:`2px solid ${P.border}`,borderRadius:16,padding:"16px 14px",textAlign:"left",cursor:"pointer",boxShadow:"0 2px 12px rgba(255,107,157,0.08)",transition:"transform 0.15s"}}>
                  <div style={{fontWeight:800,fontSize:14,color:item.color,marginBottom:4}}>{item.label}</div>
                  <div style={{fontSize:12,color:"#888"}}>{item.desc}</div>
                  <div style={{marginTop:8}}><Mickey size={18} color={item.color}/></div>
                </button>
              ))}
            </div>
            <Card style={{marginTop:20,background:`linear-gradient(135deg,${P.soft},${P.cream})`,textAlign:"center"}}>
              <div style={{fontSize:20,marginBottom:6}}>💡</div>
              <div style={{fontWeight:800,color:P.dark,marginBottom:4}}>Pro Tip of the Day</div>
              <div style={{fontSize:13,color:"#666",lineHeight:1.6}}>Book your Disney dining reservations at exactly 12:00 AM ET, exactly 60 days before your arrival. The most coveted tables — like Cinderella's Royal Table — fill within seconds of midnight! ✨</div>
            </Card>
          </div>
        )}

        {tab==="today" && (
          <>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:18}}>
              <Mickey size={30} color={P.gold}/>
              <div>
                <h2 style={{margin:0,color:P.dark,fontWeight:900}}>Today's Assistant</h2>
                <p style={{margin:0,fontSize:13,color:"#888"}}>Everything for today's park day, in one view</p>
              </div>
            </div>
            <TodayAssistantTab/>
          </>
        )}

        {tab==="plan" && (
          <>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:18}}>
              <Mickey size={30} color={P.pink}/>
              <div>
                <h2 style={{margin:0,color:P.dark,fontWeight:900}}>My Trip Planner</h2>
                <p style={{margin:0,fontSize:13,color:"#888"}}>Plan each day — saved automatically 💾</p>
              </div>
            </div>
            <TripPlannerTab/>
          </>
        )}

        {tab==="ll" && (
          <>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:18}}>
              <Mickey size={30} color={P.dark}/>
              <div>
                <h2 style={{margin:0,color:P.dark,fontWeight:900}}>Lightning Lane Scheduler</h2>
                <p style={{margin:0,fontSize:13,color:"#888"}}>Time-block your LL bookings, day by day</p>
              </div>
            </div>
            <LightningLaneTab/>
          </>
        )}

        {tab==="characters" && (
          <>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:18}}>
              <Mickey size={30} color={P.rose}/>
              <div>
                <h2 style={{margin:0,color:P.dark,fontWeight:900}}>Character Tracker</h2>
                <p style={{margin:0,fontSize:13,color:"#888"}}>Log meets and time your waits live</p>
              </div>
            </div>
            <CharacterTrackerTab/>
          </>
        )}

        {tab==="photos" && (
          <>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:18}}>
              <Mickey size={30} color={P.gold}/>
              <div>
                <h2 style={{margin:0,color:P.dark,fontWeight:900}}>Photo Album</h2>
                <p style={{margin:0,fontSize:13,color:"#888"}}>Organize & share your trip photos with family</p>
              </div>
            </div>
            <PhotoAlbumTab/>
          </>
        )}

        {["mk","ep","hs","ak"].includes(tab) && <ParkPage parkKey={tab}/>}

        {tab==="dining"  && <DiningTab/>}
        {tab==="resorts" && <ResortsTab/>}
        {tab==="crowd"   && <CrowdTab/>}
        {tab==="budget"  && (
          <>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:18}}>
              <Mickey size={30} color={P.gold}/>
              <div>
                <h2 style={{margin:0,color:P.dark,fontWeight:900}}>Trip Budget Planner</h2>
                <p style={{margin:0,fontSize:13,color:"#888"}}>Estimate costs & build your savings plan</p>
              </div>
            </div>
            <BudgetTab/>
          </>
        )}
      </div>

      <div style={{textAlign:"center",padding:"14px",background:P.mid,color:"rgba(255,255,255,0.45)",fontSize:11}}>
        <Mickey size={14} color="rgba(255,255,255,0.3)"/> Disney World Dream Planner · 2026 · Prices are estimates
      </div>
    </div>
  );
}
