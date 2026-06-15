// src/data/products.js

const categoryTemplates = {
  "T-Shirts": {
    folder: "tshirts",
    prefix: "m",
    suffix: "-tee",
    ids: ["m1", "m2", "m3", "m_tee_4", "m_tee_5", "m_tee_6", "m_tee_7", "m_tee_8", "m_tee_9", "m_tee_10"],
    names: [
      "Heavyweight Organic Tee",
      "Charcoal Boxy Tee",
      "Minimalist Sage Tee",
      "Loose Fit Cotton Tee",
      "Essential Studio Tee",
      "Heavy Jersey Mock Tee",
      "Raw Hem Cropped Tee",
      "Classic Ribbed Tee",
      "Vintage Wash Graphic Tee",
      "Oversized Silhouette Tee"
    ],
    descriptions: [
      "Premium weight tee spun from organic cotton. Classic streetwear boxy cut in sand-wash color.",
      "Relaxed streetwear tee in garment-dyed charcoal black. Double-stitched seams.",
      "Premium organic cotton tee in our signature Forest Sage tone.",
      "Relaxed loose fit tee in ultra-soft midweight cotton loopback.",
      "Everyday essential tee featuring a tailored crew neck and clean shoulder lines.",
      "Heavyweight dry-hand cotton jersey tee with a structured high mock neck collar.",
      "Urban style raw-edge hem tee in custom sand wash texture.",
      "Fine rib-knit cotton blend tee with stretch comfort and silhouette fit.",
      "Washed black jersey tee with subtle vintage fading and dropped shoulder cuts.",
      "Voluminous oversized street tee crafted from 300GSM organic cotton fibers."
    ],
    prices: [1299, 1199, 1299, 1399, 1099, 1499, 1299, 1199, 1599, 1699],
    sizes: ["M", "L", "S", "M", "L", "XL", "M", "S", "L", "XL"]
  },
  "Shirts": {
    folder: "shirts",
    prefix: "m",
    suffix: "-shirt",
    ids: ["m4", "m5", "m6", "m_shirt_4", "m_shirt_5", "m_shirt_6", "m_shirt_7", "m_shirt_8", "m_shirt_9", "m_shirt_10"],
    names: [
      "Linen Camp Collar Shirt",
      "Sage Corduroy Shirt",
      "Oxford Cotton Button-Down",
      "Washed Denim Workshirt",
      "Minimalist Zip Overshirt",
      "Relaxed Silk-Blend Shirt",
      "Boxy Utility Pocket Shirt",
      "Classic Chambray Shirt",
      "Raw Edge Flannel Shirt",
      "Contemporary Band Collar Shirt"
    ],
    descriptions: [
      "Breathable sand-wash linen weave shirt with relaxed camp collar.",
      "Soft mid-weight corduroy shirt in Sage Green. Quilted details and metal snaps.",
      "Classic white Oxford cotton shirt with structured collar and tailored cuffs.",
      "Durable raw denim utility shirt with double breast chest pockets and button down cuffs.",
      "Lightweight canvas zip-up overshirt ideal for mid-season layering outfits.",
      "Premium silk and viscose blend shirt with a flowing relaxed silhouette drape.",
      "Boxy cropped cut shirt featuring large cargo pockets and flat-fell seam lines.",
      "Lightweight indigo dyed chambray shirt featuring contrast white run-off stitching details.",
      "Soft brushed cotton flannel shirt in custom sand wash grid patterns.",
      "Collarless band neck shirt tailored from crisp organic cotton poplin."
    ],
    prices: [2299, 2499, 2199, 2699, 2899, 3299, 2499, 1999, 2399, 2199],
    sizes: ["M", "L", "M", "L", "XL", "M", "S", "M", "L", "M"]
  },
  "Polos": {
    folder: "polos",
    prefix: "m",
    suffix: "-polo",
    ids: ["m7", "m8", "m_polo_3", "m_polo_4", "m_polo_5", "m_polo_6", "m_polo_7", "m_polo_8", "m_polo_9", "m_polo_10"],
    names: [
      "Knit Collar Polo",
      "Sand Pique Polo",
      "Zip-Up Knit Polo",
      "Classic Tennis Polo",
      "Waffle-Texture Polo",
      "Minimalist Silk Polo",
      "Mercerised Cotton Polo",
      "Melange Ribbed Polo",
      "Relaxed Jersey Polo",
      "Athletic Block Polo"
    ],
    descriptions: [
      "Textured waffle-knit polo shirt in deep charcoal. Flat-knit collar.",
      "Minimalist pique weave polo shirt in soft sand color. Sleek buttonless placket.",
      "Premium fine-gauge knit polo featuring a modern silver zip collar closures.",
      "Traditional athletic pique polo with contrast tipping and embroidered emblem.",
      "Heavy waffle knit structure polo offering maximum silhouette volume.",
      "Luxury silk-cotton blend polo shirt with ribbed cuffs and hem border details.",
      "Lustrous mercerised cotton polo with a clean semi-formal appearance.",
      "Two-tone melange ribbed texture polo shirt in earth tones.",
      "Soft premium cotton jersey knit polo with a casual open spread collar.",
      "Colour-blocked design polo shirt optimized for vintage athletic aesthetics."
    ],
    prices: [1699, 1599, 1999, 1499, 1799, 2499, 1899, 1699, 1399, 1599],
    sizes: ["M", "L", "M", "S", "L", "M", "XL", "S", "L", "M"]
  },
  "Hoodies": {
    folder: "hoodies",
    prefix: "m",
    suffix: "-hoodie",
    ids: ["m10", "m11", "m_hoodie_3", "m_hoodie_4", "m_hoodie_5", "m_hoodie_6", "m_hoodie_7", "m_hoodie_8", "m_hoodie_9", "m_hoodie_10"],
    names: [
      "Sage Hooded Sweatshirt",
      "Charcoal Fleece Hoodie",
      "Heavyweight Boxy Hoodie",
      "Zip-Through Loungewear Hoodie",
      "Terry Loopback Hoodie",
      "Studio Panel Hoodie",
      "Raw Hem Cropped Hoodie",
      "Vintage Garment-Dyed Hoodie",
      "Thermal-Lined Field Hoodie",
      "Minimalist Soft Fleece Hoodie"
    ],
    descriptions: [
      "Oversized double-lined cotton hoodie in signature sage green. Dropped shoulders.",
      "Premium heavy-brushed cotton fleece hoodie in mineral washed charcoal.",
      "Ultra-dense 450GSM cotton fleece hoodie featuring a double-layered hood without drawcords.",
      "Full-zip relaxed hoodie in soft lounge fleece with split kangaroo front pockets.",
      "Midweight French terry loopback hoodie optimized for breathable comfort styling.",
      "Geometric paneled construction hoodie with hidden side seam hand slots.",
      "Cropped boxy length hoodie featuring raw roll-edge hem detailing.",
      "Garment-dyed finish hoodie showing high-contrast faded seam highlights.",
      "Heavy duty utility hoodie lined with waffle-knit cotton for cold weather insulation.",
      "Clean brushed fleece hoodie in minimal sand wash colourway."
    ],
    prices: [2899, 2999, 3499, 2799, 2599, 3199, 2699, 2899, 3899, 2499],
    sizes: ["M", "L", "XL", "M", "S", "L", "M", "L", "XL", "M"]
  },
  "Jackets": {
    folder: "jackets",
    prefix: "m",
    suffix: "-jacket",
    ids: ["m13", "m14", "m_jacket_3", "m_jacket_4", "m_jacket_5", "m_jacket_6", "m_jacket_7", "m_jacket_8", "m_jacket_9", "m_jacket_10"],
    names: [
      "Utility Gilet Vest",
      "Sand Puffer Jacket",
      "Canvas Work Jacket",
      "Raw Denim Trucker Jacket",
      "Technical Windbreaker",
      "Minimalist Bomber Jacket",
      "Fleece Sherpa Jacket",
      "Double-Breasted Trench Jacket",
      "Quilted Liner Jacket",
      "Leather Rider Jacket"
    ],
    descriptions: [
      "Technical canvas utility vest in forest green. Deep cargo utility pockets.",
      "Quilted insulated puffer jacket in clean warm sand. Double storm flap.",
      "Rugged heavy-duty cotton duck canvas work jacket with corduroy collar accents.",
      "14oz rigid raw denim trucker jacket featuring signature silver branded hardware.",
      "Waterproof lightweight nylon windbreaker shell with adjustable toggle hood.",
      "Classic flight bomber silhouette in matte finish with utility sleeve pocket.",
      "Plush high-pile sherpa fleece jacket lined with breathable athletic mesh.",
      "Modern cropped double-breasted trench outerwear coat in lightweight twill.",
      "Rippled onion-pattern quilted layering jacket with contrast piping borders.",
      "Premium soft calfskin leather rider jacket featuring silver asymmetrical zippers."
    ],
    prices: [3499, 4999, 4299, 3899, 2999, 3599, 3799, 4599, 3199, 8999],
    sizes: ["M", "L", "L", "M", "XL", "M", "S", "L", "M", "L"]
  },
  "Jeans": {
    folder: "jeans",
    prefix: "m",
    suffix: "-jeans",
    ids: ["m16", "m17", "m_jeans_3", "m_jeans_4", "m_jeans_5", "m_jeans_6", "m_jeans_7", "m_jeans_8", "m_jeans_9", "m_jeans_10"],
    names: [
      "Classic Denim Jeans",
      "Charcoal Slim Jeans",
      "Loose Fit Wide Jeans",
      "Vintage Indigo Straight Jeans",
      "Black Carpenter Jeans",
      "Distressed Painter Jeans",
      "Tapered Crop Jeans",
      "Raw Selvedge Denim",
      "Ecru Off-White Jeans",
      "Relaxed Drawstring Denim"
    ],
    descriptions: [
      "Straight-cut raw denim jeans in classic wash. Contrast tobacco stitching.",
      "Slim-fit comfort denim jeans in deep carbon wash. Custom metal trims.",
      "Voluminous wide-leg skate jeans in heavy stone-washed denim texture.",
      "Classic 90s style straight fit denim jeans showing natural thigh fades.",
      "Utility carpenter jeans featuring side hammer loops and reinforced patch pockets.",
      "Relaxed fit jeans featuring paint splatter detailing and light distress points.",
      "Modern tapered leg cropped cut denim jeans designed to sit above sneakers.",
      "Premium Japanese selvedge denim jeans featuring red-line cuff detailing.",
      "Natural unbleached cotton ecru jeans with visible seed fleck textures.",
      "Casual lightweight denim pants with an elastic comfort drawstring waistband."
    ],
    prices: [2999, 3199, 3599, 2899, 3499, 3699, 2799, 4599, 3299, 2499],
    sizes: ["32", "34", "32", "30", "34", "32", "30", "32", "34", "32"]
  },
  "Trousers": {
    folder: "trousers",
    prefix: "m",
    suffix: "-trousers",
    ids: ["m19", "m20", "m_trousers_3", "m_trousers_4", "m_trousers_5", "m_trousers_6", "m_trousers_7", "m_trousers_8", "m_trousers_9", "m_trousers_10"],
    names: [
      "Sand Utility Cargoes",
      "Sage Technical Trousers",
      "Minimalist Pleated Trousers",
      "Relaxed Linen Trousers",
      "Heavy Cotton Twill Chinos",
      "Drawstring Easy Trousers",
      "Wide Leg Corduroy Pants",
      "Technical Track Trousers",
      "Tailored Wool Chinos",
      "Cropped Wool-Blend Trousers"
    ],
    descriptions: [
      "Heavy canvas utility cargo trousers in warm sand. Adjustable waist toggles.",
      "Water-repellent technical trousers in sage green. Concealed zip pockets.",
      "Elegant single-pleat trousers with a modern relaxed straight leg silhouette.",
      "Breathable pure linen trousers featuring an elasticized comfort waistband.",
      "Structured heavy cotton twill chinos tailored for contemporary uniform looks.",
      "Casual daily trousers in textured cotton-blend weave with easy drawstrings.",
      "Wide-cut trousers crafted from rich 8-wale corduroy in earth brown.",
      "Sporty stretch technical fabric trousers with zip hems and clean seam lines.",
      "Premium tailored smart chinos spun from lightweight merino wool fibers.",
      "Cropped modern trousers designed for an architectural cropped look."
    ],
    prices: [2799, 2899, 3299, 2499, 2299, 1999, 3199, 2699, 3999, 3599],
    sizes: ["32", "32", "34", "32", "30", "32", "34", "32", "34", "32"]
  },
  "Shorts": {
    folder: "shorts",
    prefix: "m",
    suffix: "-shorts",
    ids: ["m22", "m23", "m_shorts_3", "m_shorts_4", "m_shorts_5", "m_shorts_6", "m_shorts_7", "m_shorts_8", "m_shorts_9", "m_shorts_10"],
    names: [
      "Linen Walk Shorts",
      "Utility Cargo Shorts",
      "French Terry Sweatshorts",
      "Nylon Swim Shorts",
      "Tailored Twill Shorts",
      "Sage Linen Shorts",
      "Charcoal Easy Shorts",
      "Heavy Canvas Work Shorts",
      "Pleated Lounge Shorts",
      "Relaxed Athletic Shorts"
    ],
    descriptions: [
      "Breathable sand linen-blend walk shorts. Elastic drawstring waist.",
      "Durable cotton canvas cargo shorts in washed charcoal. Reinforced seat.",
      "Soft and heavy French terry sweatshorts with side pockets and flat drawcords.",
      "Quick-dry lightweight packable nylon shorts with comfortable mesh briefs.",
      "Smart casual twill walk shorts with clean welted rear pockets.",
      "Lightweight breathable linen shorts in custom garment dyed sage green.",
      "Casual cotton jersey shorts in faded charcoal black colorway.",
      "Tough heavy canvas shorts featuring triple needle stitched side seams.",
      "Contemporary single-pleat loungewear shorts tailored from soft pique.",
      "Relaxed activewear shorts with split hem sides for freedom of movement."
    ],
    prices: [1499, 1699, 1399, 1599, 1499, 1599, 1299, 1899, 1699, 1199],
    sizes: ["32", "32", "32", "30", "34", "32", "32", "34", "32", "30"]
  }
};

const footwearTemplates = {
  "sneakers": {
    folder: "footwear/sneakers",
    prefix: "f",
    suffix: "-sneaker",
    ids: ["f2", "f3", "f_sneaker_3", "f_sneaker_4", "f_sneaker_5", "f_sneaker_6", "f_sneaker_7", "f_sneaker_8", "f_sneaker_9", "f_sneaker_10"],
    names: [
      "Modern Court Sneaker",
      "Technical Trail Sneaker",
      "Classic Canvas Sneaker",
      "Retro Runner Sneaker",
      "Minimalist Leather Low-Top",
      "Vanguard Knit Sneaker",
      "Urban Skate Sneaker",
      "Washed Canvas High-Top",
      "Tech-Mesh Runner",
      "Architect Leather Sneaker"
    ],
    descriptions: [
      "Retro-inspired court sneaker made from raw cotton canvas and calfskin overlays.",
      "All-weather technical mesh running sneaker. Shock-absorbing Vibram traction sole.",
      "Low-profile vulcanized canvas sneakers with clean rubber sole borders.",
      "Vintage athletic style mesh and suede runners featuring lightweight foam midsoles.",
      "Clean monochromatic premium leather sneakers with sleek blind eyelets.",
      "Breathable engineered knit sock sneakers offering comfort stretch fit.",
      "Heavy duty cupsole skate sneakers with padded tongue and collars.",
      "Garment washed high-top sneakers with raw edges and metal side zippers.",
      "High performance athletic shoe with reflective details and traction grip.",
      "Structured panel calfskin leather sneakers designed with geometric details."
    ],
    prices: [4199, 4999, 2999, 3899, 4599, 3999, 3499, 3699, 4299, 5299],
    sizes: ["9", "10", "9", "8", "10", "9", "10", "8", "9", "10"]
  },
  "loafers": {
    folder: "footwear/loafers",
    prefix: "f",
    suffix: "-loafer",
    ids: ["f1", "f_loafer_2", "f_loafer_3", "f_loafer_4", "f_loafer_5", "f_loafer_6", "f_loafer_7", "f_loafer_8", "f_loafer_9", "f_loafer_10"],
    names: [
      "Heritage Leather Loafers",
      "Suede Penny Loafers",
      "Classic Tassel Loafers",
      "Textured Pebble Grain Loafers",
      "Casual Canvas Espadrille Loafers",
      "Architect Split Toe Loafers",
      "Minimalist Slip-On Loafers",
      "Sand Wash Suede Loafers",
      "Contrast Stitch Leather Loafers",
      "Lug Sole Utility Loafers"
    ],
    descriptions: [
      "Italian handcrafted grain leather loafers. Breathable leather lining, low block heel, neutral styling.",
      "Soft calf suede penny loafers with a traditional moc-toe stitched seam.",
      "Polished leather tassel loafers featuring braided laces and leather outsoles.",
      "Robust pebble textured leather loafers with double-stitched storm welts.",
      "Summery canvas loafers with natural jute rope midsoles and rubber grips.",
      "Modern split-toe design loafers with raw-cut edges and brass branding.",
      "Low-key slip-on loafers in smooth matte finish calfskin leather.",
      "Desert tone washed suede loafers offering lightweight and casual aesthetics.",
      "Smooth dark leather loafers highlighted with bold contrast cream stitching.",
      "Chunky lug sole loafers providing rugged durability and urban silhouette."
    ],
    prices: [3899, 4199, 4399, 3999, 2499, 4599, 3699, 3899, 4299, 4799],
    sizes: ["10", "9", "10", "9", "8", "10", "9", "10", "8", "10"]
  },
  "casual": {
    folder: "footwear/casual",
    prefix: "f",
    suffix: "-casual",
    ids: ["f4", "f_casual_2", "f_casual_3", "f_casual_4", "f_casual_5", "f_casual_6", "f_casual_7", "f_casual_8", "f_casual_9", "f_casual_10"],
    names: [
      "Samba Casual Sneakers",
      "Retro Canvas Slip-On",
      "Linen Deck Shoes",
      "Suede Desert Boots",
      "Urban Leather Mules",
      "Minimalist Slide Sandals",
      "Raw Cotton Slip-On",
      "Vintage Waffle Trainer",
      "Woven Leather Sandals",
      "Contemporary Clog Slides"
    ],
    descriptions: [
      "Classic retro indoor-soccer silhouette in soft leather with contrast overlays and gum rubber sole.",
      "Easy-wear slip-on canvas shoes featuring elastic side panels.",
      "Breathable linen blend deck shoes with wrap-around utility laces.",
      "Unstructured desert boots in soft calf suede with natural crepe soles.",
      "Backless slip-on leather mules with a comfortable cork footbed layout.",
      "Molded EVA slides in sleek minimalist shape for poolside or indoor use.",
      "Unbleached raw cotton canvas shoes with custom stitched sole borders.",
      "Nostalgic waffle outsole trainers with thin canvas walls and gum details.",
      "Interlocking hand-woven leather sandals with buckled heel straps.",
      "Modern lightweight clogs with ventilated toe box and structured heel."
    ],
    prices: [3499, 1999, 2299, 3899, 3299, 1299, 1899, 2999, 2799, 2199],
    sizes: ["9", "8", "9", "10", "9", "10", "8", "9", "10", "9"]
  },
  "formal": {
    folder: "footwear/formal",
    prefix: "f",
    suffix: "-formal",
    ids: ["f5", "f_formal_2", "f_formal_3", "f_formal_4", "f_formal_5", "f_formal_6", "f_formal_7", "f_formal_8", "f_formal_9", "f_formal_10"],
    names: [
      "Classic Chelsea Boots",
      "Tailored Dress Oxford Shoes",
      "Leather Monk Strap Shoes",
      "Suede Chelsea Boots",
      "Polished Derby Shoes",
      "Waxed Canvas Dress Boots",
      "Wingtip Brogue Shoes",
      "Patent Tuxedo Derby",
      "Architect Zip Boots",
      "Premium Double Monk Strap"
    ],
    descriptions: [
      "Handcrafted Chelsea boots in premium suede leather with elastic side goring and durable pull tabs.",
      "Traditional cap-toe Oxford dress shoes constructed from high-shine calfskin.",
      "Sleek single monk strap shoes featuring silver buckle and polished finish.",
      "Slim silhouette Chelsea boots in sand-washed suede with leather sole details.",
      "Classic open-lacing Derby shoes in rich dark tan grain leather.",
      "Rugged yet refined dress boots combining waxed canvas and grain leather.",
      "Ornate perforated brogues with wingtip stitching and storm welts.",
      "Glossy patent leather dress shoes designed for formal black-tie events.",
      "Sleek side-zip formal boots with clean ankle collar lines and low heel.",
      "Classic double buckle monk strap shoes in deep mahogany leather."
    ],
    prices: [4999, 4599, 4299, 4899, 3999, 4199, 4499, 4999, 5299, 4799],
    sizes: ["10", "9", "10", "9", "8", "10", "9", "10", "8", "10"]
  }
};

const accessoriesTemplates = {
  "bags": {
    folder: "accessories/bags",
    prefix: "a",
    suffix: "-bag",
    ids: ["m28", "m29", "a_bag_3", "a_bag_4", "a_bag_5", "a_bag_6", "a_bag_7", "a_bag_8", "a_bag_9", "a_bag_10"],
    names: [
      "Classic Crossbody Bag",
      "Modular Roll-Top Backpack",
      "Daily Canvas Tote Bag",
      "Technical Waist Pack",
      "Leather Weekender Duffel",
      "Utility Sling Pack",
      "Minimalist Messenger Bag",
      "Waterproof Duffle Bag",
      "Lightweight Drawstring Bag",
      "Urban Commuter Backpack"
    ],
    descriptions: [
      "Sleek and functional utility crossbody bag constructed from weather-resistant heavy canvas with metal adjustments.",
      "Water-repellent technical canvas roll-top backpack with secret compartments and matte hardware.",
      "Heavy duty unbleached canvas tote featuring long webbing straps and internal pocket organizer.",
      "Adjustable strap waist pack tailored from ripstop nylon with dual pocket enclosures.",
      "Spacious travel duffel bag handcrafted from textured pebble leather with detachable straps.",
      "Asymmetric sling pack designed to fit contours with a single diagonal buckle strap.",
      "Sleek rectangular messenger bag with magnetic flap closing and laptop sleeve divider.",
      "Heavy duty waterproof tarpaulin bag with welded seams for maximum protection.",
      "Premium nylon drawcord bag with zippered front phone storage pocket.",
      "Structured work backpack featuring tech organizer slots and padded breathable back pads."
    ],
    prices: [1999, 3899, 1299, 1499, 5999, 1799, 2799, 3499, 999, 4199],
    sizes: ["M", "M", "M", "S", "L", "M", "M", "L", "M", "M"]
  },
  "caps": {
    folder: "accessories/caps",
    prefix: "a",
    suffix: "-cap",
    ids: ["m25", "m26", "a_cap_3", "a_cap_4", "a_cap_5", "a_cap_6", "a_cap_7", "a_cap_8", "a_cap_9", "a_cap_10"],
    names: [
      "Washed Sage Dad Cap",
      "Sand Canvas Utility Cap",
      "Classic Twill Snapback",
      "Waffle Knit Beanie",
      "Breathable Sports Cap",
      "Vintage Corduroy Cap",
      "Minimalist Bucket Hat",
      "Heavy Ribbed Wool Cap",
      "Mesh Panel Trucker Hat",
      "Architect Flat Brim Cap"
    ],
    descriptions: [
      "Twill cotton adjustable dad hat in washed sage green. Low-key branding.",
      "Structured utility cap constructed from sand-colored heavy cotton weave.",
      "Traditional 6-panel snapback cap featuring an adjustable rear tab.",
      "Warm dual-layered waffle knit beanie cap in charcoal black wash.",
      "Lightweight laser-perforated sports cap offering maximum ventilation.",
      "Soft corduroy cap in rich mustard tone with custom brass buckle strap.",
      "Relaxed 360-degree brim bucket hat in heavyweight washed canvas.",
      "Chunky rib knit wool blend cap for cold season insulation.",
      "Classic trucker cap with foam front panel and breathable mesh rear walls.",
      "Structured flat brim cap designed with architectural clean shapes."
    ],
    prices: [699, 699, 899, 799, 999, 899, 1199, 999, 799, 1099],
    sizes: ["M", "M", "M", "M", "M", "M", "M", "M", "M", "M"]
  },
  "others": {
    folder: "accessories/others",
    prefix: "a",
    suffix: "-sunglasses",
    ids: ["m27", "m30", "m31", "a_sunglasses_4", "a_sunglasses_5", "a_sunglasses_6", "a_sunglasses_7", "a_sunglasses_8", "a_sunglasses_9", "a_sunglasses_10"],
    names: [
      "Classic Studio Sunglasses",
      "Rimless Editorial Sunglasses",
      "Polarised Architect Sunglasses",
      "Vintage Round Frame Glasses",
      "Acetate Square Sunglasses",
      "Minimalist Metal Frame Aviators",
      "Semi-Rimless Clubmaster Glasses",
      "Shield Wrap Editorial Glasses",
      "Hexagonal Wire Sunglasses",
      "Bold Flat Top Acetate Frame"
    ],
    descriptions: [
      "Premium handcrafted sunglasses featuring custom acetate frames and UV protection.",
      "Avant-garde rimless sunglasses with metal hardware and minimal temple arms.",
      "Sleek polarized sunglasses designed with geometric form and optimal glare reduction.",
      "Retro inspired round frame sunglasses with tinted lenses and thin wire temples.",
      "Thick acetate frame square sunglasses providing bold silhouettes and premium hinge layouts.",
      "Ultralight metal frame aviator sunglasses with gradient lenses.",
      "Classic semi-rimless frames in tortoiseshell finish and gold hardware.",
      "Futuristic wrap-around shield sunglasses designed for high-fashion statements.",
      "Geometrical wire sunglasses with amber lenses and comfortable nose pads.",
      "Contemporary flat-top brow line sunglasses crafted from heavy polished acetate."
    ],
    prices: [1499, 1899, 2199, 1699, 1799, 1999, 1599, 2499, 1899, 2299],
    sizes: ["M", "M", "M", "M", "M", "M", "M", "M", "M", "M"]
  }
};

const rawProducts = [];

// 1. Generate Apparel Categories (T-Shirts, Shirts, Polos, Hoodies, Jackets, Jeans, Trousers, Shorts)
Object.keys(categoryTemplates).forEach((cat) => {
  const t = categoryTemplates[cat];
  for (let i = 0; i < 10; i++) {
    const num = i + 1;
    // Check if the user named shirts sequentially: m1-shirt.jpeg through m10-shirt.jpeg
    const imageFilename = `${t.prefix}${num}${t.suffix}.jpeg`;
    
    rawProducts.push({
      id: t.ids[i],
      name: `AuraThreads ${t.names[i]}`,
      brand: i % 2 === 0 ? "AuraSelect" : "Trendsetter",
      price: t.prices[i],
      size: t.sizes[i],
      category: cat,
      imageUrl: `/images/products/${t.folder}/${imageFilename}`,
      description: t.descriptions[i],
      newArrival: i % 3 === 0,
      bestSeller: i % 4 === 0,
      summerCollection: (cat !== "Hoodies" && cat !== "Jackets") && (i % 2 === 0)
    });
  }
});

// 2. Generate Footwear Categories (sneakers, loafers, casual, formal)
Object.keys(footwearTemplates).forEach((subcat) => {
  const t = footwearTemplates[subcat];
  for (let i = 0; i < 10; i++) {
    const num = i + 1;
    let imgPath = `/images/products/${t.folder}/${t.prefix}${num}${t.suffix}.jpeg`;
    
    if (subcat === "formal") {
      // Custom mapping for formal folder files (f1-formal/chelsea, f2-formal/chelsea, etc.)
      const fileIndex = Math.floor(i / 2) + 1;
      const isChelsea = i % 2 === 0;
      const fileSuffix = isChelsea ? "chelsea" : "formal";
      imgPath = `/images/products/footwear/formal/f${fileIndex}-${fileSuffix}.jpeg`;
    }
    
    rawProducts.push({
      id: t.ids[i],
      name: `AuraThreads ${t.names[i]}`,
      brand: i % 2 === 0 ? "AuraSelect" : "Trendsetter",
      price: t.prices[i],
      size: t.sizes[i],
      category: "Footwear",
      imageUrl: imgPath,
      description: t.descriptions[i],
      newArrival: i % 3 === 0,
      bestSeller: i % 4 === 0,
      summerCollection: i % 2 === 0
    });
  }
});

// 3. Generate Accessories Categories (bags, caps, others)
Object.keys(accessoriesTemplates).forEach((subcat) => {
  const t = accessoriesTemplates[subcat];
  for (let i = 0; i < 10; i++) {
    const num = i + 1;
    rawProducts.push({
      id: t.ids[i],
      name: `AuraThreads ${t.names[i]}`,
      brand: i % 2 === 0 ? "AuraSelect" : "Trendsetter",
      price: t.prices[i],
      size: t.sizes[i],
      category: "Accessories",
      imageUrl: `/images/products/${t.folder}/${t.prefix}${num}${t.suffix}.jpeg`,
      description: t.descriptions[i],
      newArrival: i % 3 === 0,
      bestSeller: i % 4 === 0,
      summerCollection: i % 2 === 0
    });
  }
});

// Deterministic shuffle helper using fixed LCG to avoid Next.js hydration mismatches
function deterministicShuffle(array) {
  let seed = 4321098; // Fixed seed
  const random = () => {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  };
  
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export const defaultProducts = deterministicShuffle(rawProducts);

export function getAllProducts() {
  if (typeof window === "undefined") {
    return defaultProducts;
  }
  
  let customProducts = [];
  try {
    const stored = localStorage.getItem("uploadedProducts");
    if (stored) {
      customProducts = JSON.parse(stored);
    }
  } catch (e) {
    console.error("Error loading custom products", e);
  }
  
  return [...defaultProducts, ...customProducts];
}

export function getProductById(id) {
  const products = getAllProducts();
  return products.find(p => p.id === id);
}
