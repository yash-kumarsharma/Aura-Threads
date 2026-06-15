// src/app/search/page.js
"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import { getAllProducts } from "@/data/products";
import ProductCard from "@/components/ProductCard";

function SearchResultsContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setProducts(getAllProducts());
    
    const handleUpdate = () => {
      setProducts(getAllProducts());
    };
    window.addEventListener("productsUpdated", handleUpdate);
    return () => window.removeEventListener("productsUpdated", handleUpdate);
  }, []);

  useEffect(() => {
    setLoading(true);
    const cleanQuery = query.toLowerCase().trim();

    let matches = [];
    if (cleanQuery === "new arrivals" || cleanQuery === "new-arrivals" || cleanQuery === "new arrival") {
      matches = products.filter(p => p.newArrival);
    } else if (cleanQuery === "sale" || cleanQuery === "sales" || cleanQuery === "discount" || cleanQuery === "discounts") {
      matches = products.filter(p => p.bestSeller || p.summerCollection);
    } else if (cleanQuery) {
      const queryWords = cleanQuery.split(/\s+/).filter(Boolean);
      
      matches = products.filter(p => {
        // Collect all text from the product to search against
        const searchTarget = [
          p.name || "",
          p.brand || "",
          p.category || "",
          p.description || "",
          p.gender || "",
          // Custom mapping to cover synonyms and typos
          (p.category || "").toLowerCase() === "t-shirts" ? "tee t-shirts tshirt tshirts t shirt shirts" : "",
          (p.category || "").toLowerCase() === "hoodies" ? "hoodie hoodies sweat sweatshirt sweatshirts hood" : "",
          (p.category || "").toLowerCase() === "trousers" ? "pants trousers cargo cargoes pants trouser pant" : "",
          (p.category || "").toLowerCase() === "shorts" ? "short shorts walk-shorts" : "",
          (p.category || "").toLowerCase() === "footwear" ? "shoes footwear shoe sneaker sneakers loafer loafers boots chelsea casual formal" : "",
          (p.category || "").toLowerCase() === "accessories" ? "accessories accessory bag bags cap caps sunglasses glasses eyewear" : ""
        ].join(" ").toLowerCase();

        // Check if every query word matches the searchTarget or clean representation
        return queryWords.every(word => {
          const cleanWord = word.replace(/[^a-z0-9]/g, "");
          if (!cleanWord) return false;

          // Special case for short word matching (like "t")
          if (cleanWord.length <= 2) {
            if (cleanWord === "t") {
              return /\bt-size\b/.test(searchTarget) || /\bt-shirts?\b/.test(searchTarget) || /\bt shirts?\b/.test(searchTarget) || /\bt\b/.test(searchTarget);
            }
            const regex = new RegExp(`\\b${cleanWord}\\b`);
            return regex.test(searchTarget);
          }

          // Special case for "tshirt" to prevent matching "sweatshirt"
          if (cleanWord === "tshirt" || cleanWord === "tshirts") {
            return /\bt-shirts?\b/.test(searchTarget) || /\bt shirts?\b/.test(searchTarget) || /\btshirts?\b/.test(searchTarget);
          }

          return searchTarget.includes(word) || searchTarget.includes(cleanWord);
        });
      });
    } else {
      matches = products;
    }

    setFiltered(matches);
    setLoading(false);
  }, [query, products]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-32 text-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-charcoal border-r-2 mx-auto"></div>
      </div>
    );
  }

  return (
    <main className="max-w-[1600px] mx-auto px-4 md:px-10 my-10">
      <div className="mb-6 border-b border-black/5 pb-4">
        <span className="text-[9px] font-bold text-stone uppercase tracking-[0.25em] font-sans">SEARCH EXPLORATION</span>
        <h1 className="text-2xl font-black font-sans tracking-wider mb-1 uppercase text-black">Search Outcomes</h1>
        <p className="text-xs text-stone font-medium">
          Showing results for query: <span className="font-bold text-black">"{query}"</span>
        </p>
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
          <h4 className="font-bold text-black text-sm mb-2 font-sans uppercase tracking-widest">No Outcomes Found</h4>
          <p className="text-stone text-xs max-w-sm mx-auto leading-relaxed font-sans">
            We couldn't find any matches for "{query}". Try checking details or search for "hood", "Jeans", or "T-shirts".
          </p>
          <a href="/" className="bg-black hover:bg-neutral-800 text-white rounded-none inline-block mt-4 py-3 px-8 text-xs font-bold uppercase tracking-widest font-sans transition-colors">Back to Store</a>
        </div>
      )}
    </main>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="max-w-7xl mx-auto px-6 py-32 text-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-charcoal border-r-2 mx-auto"></div>
      </div>
    }>
      <SearchResultsContent />
    </Suspense>
  );
}
