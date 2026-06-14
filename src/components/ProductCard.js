// src/components/ProductCard.js
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [activeImage, setActiveImage] = useState(product?.imageUrl || "");
  const [activeColor, setActiveColor] = useState(null);

  // Sync state if product changes
  useEffect(() => {
    if (product) {
      setActiveImage(product.imageUrl);
      setActiveColor(null);
    }
  }, [product]);

  if (!product) return null;

  // Swatches mapping in Aura Threads style
  const getSwatches = () => {
    if (product.category === "T-Shirts" || product.category === "Hoodies" || product.category === "Shirts" || product.category === "Polos") {
      return [
        { name: "Cobalt Blue", hex: "#0055CC", img: "/images/products/swatches/swatch-cobalt-blue.jpg" },
        { name: "Forest Sage", hex: "#2C3A2E", img: "/images/products/swatches/swatch-forest-sage.jpg" },
        { name: "Sand Weave", hex: "#E3DFD5", img: "/images/products/swatches/swatch-sand-weave.jpg" },
        { name: "Charcoal Black", hex: "#1C1C1E", img: "/images/products/swatches/swatch-charcoal-black.jpg" }
      ];
    } else if (product.category === "Accessories") {
      return [
        { name: "Matte Black", hex: "#1C1C1E", img: "/images/products/swatches/swatch-matte-black.jpg" },
        { name: "Botanical Green", hex: "#8EB69B", img: "/images/products/swatches/swatch-botanical-green.jpg" },
        { name: "Sand Canvas", hex: "#EADCC9", img: "/images/products/swatches/swatch-sand-canvas.jpg" }
      ];
    } else if (product.category === "Footwear") {
      return [
        { name: "Tan Grain", hex: "#A0522D", img: "/images/products/swatches/swatch-tan-grain.jpg" },
        { name: "Warm White", hex: "#EAE6DF", img: "/images/products/swatches/swatch-warm-white.jpg" },
        { name: "Classic Onyx", hex: "#111111", img: "/images/products/swatches/swatch-classic-onyx.jpg" }
      ];
    } else {
      return [
        { name: "Indigo Denim", hex: "#1B2A4A", img: "/images/products/swatches/swatch-indigo-denim.jpg" },
        { name: "Carbon Grey", hex: "#3A3B3C", img: "/images/products/swatches/swatch-carbon-grey.jpg" }
      ];
    }
  };

  const swatches = getSwatches();
  const colorCount = swatches.length;

  return (
    <div className="group flex flex-col h-full relative select-none">
      {/* Red Promo Tag (No background badge) */}
      <span className="absolute top-3 left-3 text-[#D9383A] font-sans font-black text-[9px] sm:text-[10px] uppercase tracking-[0.18em] z-10 drop-shadow-sm">
        {product.bestSeller ? "Up to 40% off" : product.summerCollection ? "Up to 30% off" : "New In"}
      </span>

      {/* Image container - full-bleed to card boundaries, square corners, borderless */}
      <div className="w-full aspect-[3/4] sm:aspect-[4/5] overflow-hidden bg-[#F4F4F5] relative select-none">
        <Link href={`/items/${product.id}`} className="absolute inset-0 z-10">
          <img
            src={activeImage}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
            loading="lazy"
          />
        </Link>
        
        {/* Aura Threads Slide-Up Quick Add Size Selector */}
        <div className="absolute bottom-0 inset-x-0 bg-white/95 py-3.5 px-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex items-center justify-between text-black z-20 border-t border-black/5">
          <span className="text-[9px] uppercase tracking-wider font-bold text-[#555555]">Select Size:</span>
          <div className="flex gap-1.5">
            {["S", "M", "L", "XL"].map((sz) => (
              <button
                key={sz}
                onClick={(e) => {
                  e.preventDefault();
                  addToCart(product, sz);
                }}
                className="text-[9px] font-bold font-sans w-6 h-6 flex items-center justify-center border border-black/10 hover:border-black hover:bg-black hover:text-white rounded-none bg-white transition-all cursor-pointer"
              >
                {sz}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Product Details Section - Aura Threads Clean Sidebar Style */}
      <div className="pt-3.5 flex flex-col justify-start">
        {/* Header line containing Title and Price */}
        <div className="flex justify-between items-start font-sans w-full">
          {/* Title Link */}
          <Link 
            href={`/items/${product.id}`} 
            className="text-black hover:text-stone font-sans font-bold text-[12px] md:text-[13px] leading-tight block transition-colors line-clamp-2 uppercase tracking-wide flex-1 pr-3"
            title={product.name}
          >
            {product.name}
          </Link>
          
          {/* Price column with markdown and original price indicator */}
          <div className="flex flex-col items-end flex-shrink-0 text-[12px] md:text-[13px] font-sans">
            {product.bestSeller || product.summerCollection ? (
              <>
                <span className="font-bold text-[#D9383A]">₹{product.price}</span>
                <span className="text-[10px] text-stone line-through font-medium">₹{Math.round(product.price * 1.5)}</span>
              </>
            ) : (
              <span className="font-bold text-black">₹{product.price}</span>
            )}
          </div>
        </div>
        
        {/* Sub-header line containing Color Count */}
        <div className="text-[11px] text-stone font-normal font-sans mt-0.5">
          <span>{colorCount} colors</span>
        </div>

        {/* Hidden Swatches - revealed on hover for custom interactivity */}
        <div className="flex gap-1.5 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {swatches.map((sw, sIdx) => (
            <button
              key={sIdx}
              onClick={(e) => {
                e.preventDefault();
                setActiveImage(sw.img);
                setActiveColor(sw.hex);
              }}
              style={{ backgroundColor: sw.hex }}
              className={`w-3 h-3 rounded-full border cursor-pointer transition-transform duration-200 hover:scale-110 ${activeColor === sw.hex ? 'border-black ring-1 ring-black/25 scale-110' : 'border-black/10'}`}
              title={sw.name}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
