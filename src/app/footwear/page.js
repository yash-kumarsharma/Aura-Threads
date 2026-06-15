// src/app/footwear/page.js
"use client";

import { useState, useEffect } from "react";
import { getAllProducts } from "@/data/products";
import ProductCard from "@/components/ProductCard";

export default function FootwearPage() {
  const [products, setProducts] = useState([]);
  
  // Filter states
  const [maxPrice, setMaxPrice] = useState(6000);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");

  // Sync custom uploads
  useEffect(() => {
    setProducts(getAllProducts());
    
    const handleUpdate = () => {
      setProducts(getAllProducts());
    };
    window.addEventListener("productsUpdated", handleUpdate);
    return () => window.removeEventListener("productsUpdated", handleUpdate);
  }, []);

  const getSubcategory = (p) => {
    const id = p.id.toLowerCase();
    if (id.includes("sneaker") || id === "f2" || id === "f3") return "Sneakers";
    if (id.includes("loafer") || id === "f1") return "Loafers";
    if (id.includes("casual") || id === "f4") return "Casual";
    if (id.includes("formal") || id === "f5" || id.includes("chelsea")) return "Formal";
    return "Others";
  };

  const footwear = products.filter(p => p.category && p.category.toLowerCase() === "footwear");

  const filtered = footwear.filter(p => {
    const priceMatch = p.price <= maxPrice;
    const sizeMatch = selectedSize ? p.size === selectedSize : true;
    const subcat = getSubcategory(p);
    const subcatMatch = selectedSubcategory ? subcat === selectedSubcategory : true;
    return priceMatch && sizeMatch && subcatMatch;
  });

  const resetFilters = () => {
    setMaxPrice(6000);
    setSelectedSize("");
    setSelectedSubcategory("");
  };

  return (
    <main className="max-w-[1600px] mx-auto px-4 md:px-10 my-10">
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Sidebar Filters */}
        <aside className="w-full md:w-64 shrink-0">
          <div className="bg-white border border-black/10 rounded-none p-6 sticky top-28 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h4 className="font-bold text-xs uppercase tracking-widest font-sans text-black">Filters</h4>
              <button
                onClick={resetFilters}
                className="text-[10px] font-bold text-black hover:text-stone transition-colors uppercase tracking-widest font-sans p-0 cursor-pointer"
              >
                Reset All
              </button>
            </div>

            {/* Price Filter */}
            <div className="border-b border-black/5 pb-5 mb-5">
              <h5 className="font-bold text-[10px] uppercase tracking-widest mb-4 font-sans text-black">Max Price</h5>
              <input
                type="range"
                min="1000"
                max="8000"
                step="100"
                value={maxPrice}
                onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                className="w-full accent-black cursor-pointer"
              />
              <div className="flex justify-between text-[11px] font-mono text-stone mt-2">
                <span>₹1000</span>
                <span className="text-black font-bold">₹{maxPrice}</span>
              </div>
            </div>

            {/* Size Filter */}
            <div className="border-b border-black/5 pb-5 mb-5">
              <h5 className="font-bold text-[10px] uppercase tracking-widest mb-4 font-sans text-black">Shoe Size</h5>
              <select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                className="w-full border border-black/10 rounded-none px-4 py-2.5 text-xs bg-white text-black focus:border-black focus:ring-0"
              >
                <option value="">All Sizes</option>
                <option value="8">UK / US 8</option>
                <option value="9">UK / US 9</option>
                <option value="10">UK / US 10</option>
                <option value="11">UK / US 11</option>
              </select>
            </div>

            {/* Type Filter */}
            <div>
              <h5 className="font-bold text-[10px] uppercase tracking-widest mb-4 font-sans text-black">Footwear Type</h5>
              <select
                value={selectedSubcategory}
                onChange={(e) => setSelectedSubcategory(e.target.value)}
                className="w-full border border-black/10 rounded-none px-4 py-2.5 text-xs bg-white text-black focus:border-black focus:ring-0"
              >
                <option value="">All Footwear</option>
                <option value="Sneakers">Sneakers</option>
                <option value="Loafers">Loafers</option>
                <option value="Casual">Casual Shoes</option>
                <option value="Formal">Formal & Boots</option>
              </select>
            </div>

          </div>
        </aside>

        {/* Product List Grid */}
        <section className="flex-grow">
          <div className="mb-6 border-b border-black/5 pb-4">
            <span className="text-[9px] font-bold text-stone uppercase tracking-[0.25em] font-sans">THE FOOTWEAR CHAPTER</span>
            <h1 className="text-2xl font-black font-sans tracking-wider mb-1 uppercase text-black">FOOTWEAR CATALOG</h1>
            <p className="text-xs text-stone font-medium">{filtered.length} products matching catalog criteria</p>
          </div>

          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filtered.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white border border-black/10 rounded-none shadow-sm">
              <i className="bi bi-emoji-frown text-4xl text-stone block mb-3"></i>
              <p className="text-stone text-sm">No footwear match your selected filters.</p>
              <button 
                onClick={resetFilters} 
                className="bg-black hover:bg-neutral-800 text-white font-bold text-xs uppercase tracking-widest px-6 py-3 rounded-none mt-4 transition-colors font-sans cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </section>

      </div>
    </main>
  );
}
