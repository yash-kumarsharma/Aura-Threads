// src/app/items/[id]/page.js
"use client";

import { use, useState, useEffect } from "react";
import Link from "next/link";
import { getProductById } from "@/data/products";
import { useCart } from "@/context/CartContext";

export default function ItemDetailsPage({ params }) {
  const resolvedParams = use(params);
  const { id } = resolvedParams;
  
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const p = getProductById(id);
    setProduct(p);
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-32 text-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-charcoal border-r-2 mx-auto"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-24 text-center">
        <i className="bi bi-search text-5xl text-neutral-300 block mb-4"></i>
        <h2 className="text-xl font-bold mb-2 font-display text-charcoal uppercase tracking-wider">Product Not Found</h2>
        <p className="text-neutral-500 text-sm mb-6">The product you are trying to view does not exist in our catalog.</p>
        <Link href="/" className="inline-block bg-charcoal hover:bg-charcoal/80 text-white font-bold px-6 py-2.5 rounded-full text-xs transition-colors font-display uppercase tracking-widest">
          Back to Store
        </Link>
      </div>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-6 my-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        
        {/* Left Side Product Image - Flat Square Aspect Ratio */}
        <div className="bg-[#F4F4F5] overflow-hidden flex items-center justify-center p-0 w-full aspect-[4/5] rounded-none">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out hover:scale-105"
          />
        </div>

        {/* Right Side Product Details */}
        <div className="flex flex-col justify-between py-2">
          <div>
            <span className="text-stone text-[10px] font-bold uppercase tracking-[0.25em] block mb-2 font-sans">{product.brand}</span>
            <h1 className="text-2xl sm:text-3xl font-black font-sans leading-tight mb-4 text-black uppercase tracking-wide">{product.name}</h1>
            
            {/* Reviews Mockup */}
            <div className="flex items-center gap-2 mb-4 text-xs font-sans text-stone">
              <div className="text-black flex gap-0.5">
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-half"></i>
              </div>
              <span className="text-[11px] font-medium">(4.5/5 rating based on 145 reviews)</span>
            </div>

            <div className="text-2xl font-black font-sans text-black mb-6">
              ₹{product.price}
            </div>

            <hr className="border-black/5 my-6" />

            {/* Size selection */}
            <div className="mb-6">
              <h5 className="font-bold text-xs uppercase tracking-wider text-black mb-3 font-sans">Select Size</h5>
              <div className="flex gap-2">
                {["S", "M", "L", "XL"].map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`w-12 h-12 rounded-none border font-bold text-xs flex items-center justify-center transition-all cursor-pointer ${
                      selectedSize === sz
                        ? "border-black bg-black text-white"
                        : "border-black/10 hover:border-black text-black bg-white"
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Color selection swatch mockup */}
            <div className="mb-6">
              <h5 className="font-bold text-xs uppercase tracking-wider text-black mb-3 font-sans">Color Swatch</h5>
              <div className="flex gap-3">
                {[
                  { id: 0, hex: "#111111" },
                  { id: 1, hex: "#7D84B2" },
                  { id: 2, hex: "#A9B2AC" }
                ].map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedColor(c.id)}
                    style={{ backgroundColor: c.hex }}
                    className={`w-8 h-8 rounded-full transition-transform hover:scale-110 focus:outline-none cursor-pointer border border-black/10 ${
                      selectedColor === c.id ? "ring-2 ring-black ring-offset-2 scale-115" : ""
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Add to Bag and View Bag */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <button
                onClick={() => addToCart(product, selectedSize)}
                className="flex-grow bg-black hover:bg-neutral-800 text-white font-bold font-sans px-8 py-4 rounded-none transition-all duration-300 text-center text-xs uppercase tracking-widest cursor-pointer"
              >
                ADD TO BAG
              </button>
              <Link 
                href="/cart" 
                className="inline-block bg-white hover:bg-neutral-50 text-black font-bold font-sans px-8 py-4 rounded-none text-center text-xs transition-colors border border-black/10 uppercase tracking-widest"
              >
                VIEW BAG
              </Link>
            </div>

            <hr className="border-sand/40 my-6" />

            {/* Product description */}
            <div>
              <h5 className="font-bold text-xs uppercase tracking-wider text-charcoal mb-3 font-display">Product Description</h5>
              <p className="text-neutral-500 text-xs sm:text-sm leading-relaxed font-sans">
                {product.description || "Elevate your seasonal wardrobe collections with this handpicked, ultra-premium attire. Designed with maximum emphasis on comfort, durable fiber weaves, and modern tailoring fit."}
              </p>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
