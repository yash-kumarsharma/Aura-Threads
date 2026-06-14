// src/app/men/page.js
"use client";

import { useState, useEffect } from "react";
import { getAllProducts } from "@/data/products";
import ProductCard from "@/components/ProductCard";

export default function MenPage() {
  const [products, setProducts] = useState([]);
  
  // Filter states
  const [maxPrice, setMaxPrice] = useState(5000);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  // Sync custom uploads
  useEffect(() => {
    setProducts(getAllProducts());
    
    const handleUpdate = () => {
      setProducts(getAllProducts());
    };
    window.addEventListener("productsUpdated", handleUpdate);
    return () => window.removeEventListener("productsUpdated", handleUpdate);
  }, []);

  const menProducts = products.filter(p => !p.gender || p.gender === "men" || p.gender === "unisex");

  const filtered = menProducts.filter(p => {
    const priceMatch = p.price <= maxPrice;
    const sizeMatch = selectedSize ? p.size === selectedSize : true;
    const brandMatch = selectedBrand ? p.brand === selectedBrand : true;
    const categoryMatch = selectedCategory ? p.category === selectedCategory : true;
    return priceMatch && sizeMatch && brandMatch && categoryMatch;
  });

  const resetFilters = () => {
    setMaxPrice(5000);
    setSelectedSize("");
    setSelectedBrand("");
    setSelectedCategory("");
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
                min="300"
                max="5000"
                step="100"
                value={maxPrice}
                onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                className="w-full accent-black cursor-pointer"
              />
              <div className="flex justify-between text-[11px] font-mono text-stone mt-2">
                <span>₹300</span>
                <span className="text-black font-bold">₹{maxPrice}</span>
              </div>
            </div>

            {/* Size Filter */}
            <div className="border-b border-black/5 pb-5 mb-5">
              <h5 className="font-bold text-[10px] uppercase tracking-widest mb-4 font-sans text-black">Size</h5>
              <select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                className="w-full border border-black/10 rounded-none px-4 py-2.5 text-xs bg-white text-black focus:border-black focus:ring-0"
              >
                <option value="">All Sizes</option>
                <option value="S">Small (S)</option>
                <option value="M">Medium (M)</option>
                <option value="L">Large (L)</option>
                <option value="XL">Extra Large (XL)</option>
              </select>
            </div>

            {/* Brand Filter */}
            <div className="border-b border-black/5 pb-5 mb-5">
              <h5 className="font-bold text-[10px] uppercase tracking-widest mb-4 font-sans text-black">Brand</h5>
              <div className="space-y-2.5">
                {[
                  { value: "", label: "All Brands" },
                  { value: "Bewakoof", label: "Bewakoof" },
                  { value: "FashionHub", label: "FashionHub" },
                  { value: "Trendsetter", label: "Trendsetter" },
                  { value: "ShoeKing", label: "ShoeKing" },
                  { value: "LeatherWorld", label: "LeatherWorld" }
                ].map((b) => (
                  <label key={b.value} className="flex items-center gap-2.5 text-xs text-black cursor-pointer select-none font-sans uppercase tracking-wider font-bold">
                    <input
                      type="radio"
                      name="brandFilter"
                      checked={selectedBrand === b.value}
                      onChange={() => setSelectedBrand(b.value)}
                      className="accent-black w-3.5 h-3.5"
                    />
                    <span>{b.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <h5 className="font-bold text-[10px] uppercase tracking-widest mb-4 font-sans text-black">Category</h5>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full border border-black/10 rounded-none px-4 py-2.5 text-xs bg-white text-black focus:border-black focus:ring-0"
              >
                <option value="">All Categories</option>
                <option value="Shirts">Shirts</option>
                <option value="shorts">Shorts</option>
                <option value="T-shirts">T-Shirts</option>
                <option value="Trousers">Trousers</option>
                <option value="Footwear">Footwear / Sneakers</option>
                <option value="hood">Hoodies</option>
                <option value="Jeans">Jeans</option>
                <option value="sweater">Sweatshirts</option>
                <option value="Covers">Mobile Covers</option>
              </select>
            </div>

          </div>
        </aside>

        {/* Product List Grid */}
        <section className="flex-grow">
          <div className="mb-6 border-b border-black/5 pb-4">
            <span className="text-[9px] font-bold text-stone uppercase tracking-[0.25em] font-sans">MENSWEAR COLLECTION</span>
            <h1 className="text-2xl font-black font-sans tracking-wider mb-1 uppercase text-black">MEN'S APPAREL</h1>
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
              <p className="text-stone text-sm">No items match your selected filters.</p>
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
