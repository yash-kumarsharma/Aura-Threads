// src/data/products.js

export const defaultProducts = [
  // T-Shirts
  {
    id: "m1",
    name: "AuraThreads Heavyweight Organic Tee",
    brand: "AuraSelect",
    price: 1299,
    size: "M",
    category: "T-Shirts",
    imageUrl: "/images/products/tshirts/m1-tee.jpeg",
    description: "Premium weight tee spun from organic cotton. Classic streetwear boxy cut in sand-wash color.",
    newArrival: true,
    bestSeller: false,
    summerCollection: true
  },
  {
    id: "m2",
    name: "AuraThreads Charcoal Boxy Tee",
    brand: "AuraSelect",
    price: 1199,
    size: "L",
    category: "T-Shirts",
    imageUrl: "/images/products/tshirts/m2-tee.jpeg",
    description: "Relaxed streetwear tee in garment-dyed charcoal black. Double-stitched seams.",
    newArrival: false,
    bestSeller: true,
    summerCollection: true
  },
  {
    id: "m3",
    name: "AuraThreads Minimalist Sage Tee",
    brand: "Trendsetter",
    price: 1299,
    size: "S",
    category: "T-Shirts",
    imageUrl: "/images/products/tshirts/m3-tee.jpeg",
    description: "Premium organic cotton tee in our signature Forest Sage tone.",
    newArrival: true,
    bestSeller: true,
    summerCollection: false
  },

  // Shirts
  {
    id: "m4",
    name: "AuraThreads Linen Camp Collar Shirt",
    brand: "Trendsetter",
    price: 2299,
    size: "M",
    category: "Shirts",
    imageUrl: "/images/products/shirts/m4-shirt.jpeg",
    description: "Breathable sand-wash linen weave shirt with relaxed camp collar.",
    newArrival: true,
    bestSeller: false,
    summerCollection: true
  },
  {
    id: "m5",
    name: "AuraThreads Sage Corduroy Shirt",
    brand: "AuraSelect",
    price: 2499,
    size: "L",
    category: "Shirts",
    imageUrl: "/images/products/shirts/m5-shirt.jpeg",
    description: "Soft mid-weight corduroy shirt in Sage Green. Quilted details and metal snaps.",
    newArrival: false,
    bestSeller: true,
    summerCollection: false
  },
  {
    id: "m6",
    name: "AuraThreads Oxford Cotton Button-Down",
    brand: "Trendsetter",
    price: 2199,
    size: "M",
    category: "Shirts",
    imageUrl: "/images/products/shirts/m6-shirt.jpeg",
    description: "Classic white Oxford cotton shirt with structured collar and tailored cuffs.",
    newArrival: true,
    bestSeller: false,
    summerCollection: true
  },

  // Polos
  {
    id: "m7",
    name: "AuraThreads Knit Collar Polo",
    brand: "AuraSelect",
    price: 1699,
    size: "M",
    category: "Polos",
    imageUrl: "/images/products/polos/m7-polo.jpeg",
    description: "Textured waffle-knit polo shirt in deep charcoal. Flat-knit collar.",
    newArrival: true,
    bestSeller: true,
    summerCollection: true
  },
  {
    id: "m8",
    name: "AuraThreads Sand Pique Polo",
    brand: "Trendsetter",
    price: 1599,
    size: "L",
    category: "Polos",
    imageUrl: "/images/products/polos/m8-polo.jpeg",
    description: "Minimalist pique weave polo shirt in soft sand color. Sleek buttonless placket.",
    newArrival: false,
    bestSeller: false,
    summerCollection: true
  },

  // Hoodies
  {
    id: "m10",
    name: "AuraThreads Sage Hooded Sweatshirt",
    brand: "AuraSelect",
    price: 2899,
    size: "M",
    category: "Hoodies",
    imageUrl: "/images/products/hoodies/m10-hoodie.jpeg",
    description: "Oversized double-lined cotton hoodie in signature sage green. Dropped shoulders.",
    newArrival: true,
    bestSeller: true,
    summerCollection: false
  },
  {
    id: "m11",
    name: "AuraThreads Charcoal Fleece Hoodie",
    brand: "AuraSelect",
    price: 2999,
    size: "L",
    category: "Hoodies",
    imageUrl: "/images/products/hoodies/m11-hoodie.jpeg",
    description: "Premium heavy-brushed cotton fleece hoodie in mineral washed charcoal.",
    newArrival: false,
    bestSeller: true,
    summerCollection: false
  },

  // Jackets
  {
    id: "m13",
    name: "AuraThreads Utility Gilet Vest",
    brand: "Trendsetter",
    price: 3499,
    size: "M",
    category: "Jackets",
    imageUrl: "/images/products/jackets/m13-jacket.jpeg",
    description: "Technical canvas utility vest in forest green. Deep cargo utility pockets.",
    newArrival: true,
    bestSeller: false,
    summerCollection: true
  },
  {
    id: "m14",
    name: "AuraThreads Sand Puffer Jacket",
    brand: "AuraSelect",
    price: 4999,
    size: "L",
    category: "Jackets",
    imageUrl: "/images/products/jackets/m14-jacket.jpeg",
    description: "Quilted insulated puffer jacket in clean warm sand. Double storm flap.",
    newArrival: false,
    bestSeller: true,
    summerCollection: false
  },

  // Jeans
  {
    id: "m16",
    name: "AuraThreads Classic Denim Jeans",
    brand: "Trendsetter",
    price: 2999,
    size: "32",
    category: "Jeans",
    imageUrl: "/images/products/jeans/m16-jeans.jpeg",
    description: "Straight-cut raw denim jeans in classic wash. Contrast tobacco stitching.",
    newArrival: true,
    bestSeller: true,
    summerCollection: false
  },
  {
    id: "m17",
    name: "AuraThreads Charcoal Slim Jeans",
    brand: "AuraSelect",
    price: 3199,
    size: "34",
    category: "Jeans",
    imageUrl: "/images/products/jeans/m17-jeans.jpeg",
    description: "Slim-fit comfort denim jeans in deep carbon wash. Custom metal trims.",
    newArrival: false,
    bestSeller: false,
    summerCollection: false
  },

  // Trousers
  {
    id: "m19",
    name: "AuraThreads Sand Utility Cargoes",
    brand: "AuraSelect",
    price: 2799,
    size: "32",
    category: "Trousers",
    imageUrl: "/images/products/trousers/m19-trousers.jpeg",
    description: "Heavy canvas utility cargo trousers in warm sand. Adjustable waist toggles.",
    newArrival: true,
    bestSeller: true,
    summerCollection: true
  },
  {
    id: "m20",
    name: "AuraThreads Sage Technical Trousers",
    brand: "Trendsetter",
    price: 2899,
    size: "32",
    category: "Trousers",
    imageUrl: "/images/products/trousers/m20-trousers.jpeg",
    description: "Water-repellent technical trousers in sage green. Concealed zip pockets.",
    newArrival: false,
    bestSeller: false,
    summerCollection: false
  },

  // Shorts
  {
    id: "m22",
    name: "AuraThreads Linen Walk Shorts",
    brand: "Trendsetter",
    price: 1499,
    size: "32",
    category: "Shorts",
    imageUrl: "/images/products/shorts/m22-shorts.jpeg",
    description: "Breathable sand linen-blend walk shorts. Elastic drawstring waist.",
    newArrival: true,
    bestSeller: false,
    summerCollection: true
  },
  {
    id: "m23",
    name: "AuraThreads Utility cargo Shorts",
    brand: "AuraSelect",
    price: 1699,
    size: "32",
    category: "Shorts",
    imageUrl: "/images/products/shorts/m23-shorts.jpeg",
    description: "Durable cotton canvas cargo shorts in washed charcoal. Reinforced seat.",
    newArrival: false,
    bestSeller: true,
    summerCollection: true
  },

  // Accessories
  {
    id: "m25",
    name: "AuraThreads Washed Sage Dad Cap",
    brand: "AuraSelect",
    price: 699,
    size: "M",
    category: "Accessories",
    imageUrl: "/images/products/accessories/caps/m25-cap.jpeg",
    description: "Twill cotton adjustable dad hat in washed sage green. Low-key branding.",
    newArrival: true,
    bestSeller: true,
    summerCollection: true
  },
  {
    id: "m26",
    name: "AuraThreads Sand Canvas Utility Cap",
    brand: "AuraSelect",
    price: 699,
    size: "M",
    category: "Accessories",
    imageUrl: "/images/products/accessories/caps/m26-cap.jpeg",
    description: "Structured utility cap constructed from sand-colored heavy cotton weave.",
    newArrival: false,
    bestSeller: false,
    summerCollection: true
  },
  {
    id: "m27",
    name: "AuraThreads Classic Studio Sunglasses",
    brand: "AuraSelect",
    price: 1499,
    size: "M",
    category: "Accessories",
    imageUrl: "/images/products/accessories/others/m27-sunglasses.jpeg",
    description: "Premium handcrafted sunglasses featuring custom acetate frames and UV protection.",
    newArrival: true,
    bestSeller: false,
    summerCollection: false
  },
  {
    id: "m30",
    name: "AuraThreads Rimless Editorial Sunglasses",
    brand: "AuraSelect",
    price: 1899,
    size: "M",
    category: "Accessories",
    imageUrl: "/images/products/accessories/others/m27-rimless-sunglasses.jpeg",
    description: "Avant-garde rimless sunglasses with metal hardware and minimal temple arms.",
    newArrival: true,
    bestSeller: true,
    summerCollection: true
  },
  {
    id: "m31",
    name: "AuraThreads Polarised Architect Sunglasses",
    brand: "AuraSelect",
    price: 2199,
    size: "M",
    category: "Accessories",
    imageUrl: "/images/products/accessories/others/m27-polarised-sunglasses.jpeg",
    description: "Sleek polarized sunglasses designed with geometric form and optimal glare reduction.",
    newArrival: false,
    bestSeller: false,
    summerCollection: true
  },
  {
    id: "m28",
    name: "AuraThreads Classic Crossbody Bag",
    brand: "AuraSelect",
    price: 1999,
    size: "M",
    category: "Accessories",
    imageUrl: "/images/products/accessories/bags/m28-crossbody.jpeg",
    description: "Sleek and functional utility crossbody bag constructed from weather-resistant heavy canvas with metal adjustments.",
    newArrival: true,
    bestSeller: true,
    summerCollection: false
  },
  {
    id: "m29",
    name: "AuraThreads Modular Roll-Top Backpack",
    brand: "AuraSelect",
    price: 3899,
    size: "M",
    category: "Accessories",
    imageUrl: "/images/products/accessories/bags/m29-bagpack.jpeg",
    description: "Water-repellent technical canvas roll-top backpack with secret compartments and matte hardware.",
    newArrival: true,
    bestSeller: false,
    summerCollection: true
  },

  // Footwear
  {
    id: "f1",
    name: "AuraThreads Heritage Leather Loafers",
    brand: "AuraSelect",
    price: 3899,
    size: "10",
    category: "Footwear",
    imageUrl: "/images/products/footwear/loafers/f1-loafer.jpeg",
    description: "Italian handcrafted grain leather loafers. Breathable leather lining, low block heel, neutral styling.",
    newArrival: true,
    bestSeller: true,
    summerCollection: true
  },
  {
    id: "f2",
    name: "AuraThreads Modern Court Sneaker",
    brand: "AuraSelect",
    price: 4199,
    size: "9",
    category: "Footwear",
    imageUrl: "/images/products/footwear/sneakers/f2-sneaker.jpeg",
    description: "Retro-inspired court sneaker made from raw cotton canvas and calfskin overlays.",
    newArrival: true,
    bestSeller: false,
    summerCollection: true
  },
  {
    id: "f3",
    name: "AuraThreads Technical Trail Sneaker",
    brand: "Trendsetter",
    price: 4999,
    size: "10",
    category: "Footwear",
    imageUrl: "/images/products/footwear/sneakers/f3-sneaker.jpeg",
    description: "All-weather technical mesh running sneaker. Shock-absorbing Vibram traction sole.",
    newArrival: false,
    bestSeller: true,
    summerCollection: false
  },
  {
    id: "f4",
    name: "AuraThreads Samba Casual Sneakers",
    brand: "Trendsetter",
    price: 3499,
    size: "9",
    category: "Footwear",
    imageUrl: "/images/products/footwear/casual/f4-sambha.jpeg",
    description: "Classic retro indoor-soccer silhouette in soft leather with contrast overlays and gum rubber sole.",
    newArrival: true,
    bestSeller: false,
    summerCollection: true
  },
  {
    id: "f5",
    name: "AuraThreads Classic Chelsea Boots",
    brand: "AuraSelect",
    price: 4999,
    size: "10",
    category: "Footwear",
    imageUrl: "/images/products/footwear/formal/f5-chelsea.jpeg",
    description: "Handcrafted Chelsea boots in premium suede leather with elastic side goring and durable pull tabs.",
    newArrival: true,
    bestSeller: true,
    summerCollection: false
  }
];

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
