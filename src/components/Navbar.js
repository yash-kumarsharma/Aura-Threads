// src/components/Navbar.js
"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { getAllProducts } from "@/data/products";

export default function Navbar() {
  const router = useRouter();
  const { cartCount } = useCart();
  const { currentUser } = useAuth();
  
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSugg, setShowSugg] = useState(false);
  const [showSearchBox, setShowSearchBox] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const suggRef = useRef(null);

  // Close suggestions and search box on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (suggRef.current && !suggRef.current.contains(event.target)) {
        setShowSugg(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile menu when screen size increases
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setQuery(val);

    if (val.trim().length > 0) {
      const lowerVal = val.toLowerCase();
      const allProducts = getAllProducts();
      
      const matches = [];
      const seen = new Set();

      allProducts.forEach(p => {
        if (p.name.toLowerCase().includes(lowerVal) && !seen.has(p.name)) {
          matches.push({ text: p.name, type: "product", id: p.id });
          seen.add(p.name);
        }
        if (p.category.toLowerCase().includes(lowerVal) && !seen.has(p.category)) {
          matches.push({ text: p.category, type: "category" });
          seen.add(p.category);
        }
      });

      setSuggestions(matches.slice(0, 6));
      setShowSugg(true);
    } else {
      setSuggestions([]);
      setShowSugg(false);
    }
  };

  const executeSearch = (e) => {
    if (e) e.preventDefault();
    if (query.trim()) {
      setShowSugg(false);
      setShowSearchBox(false);
      setIsMobileMenuOpen(false);
      router.push(`/search?query=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleSuggestionClick = (item) => {
    setQuery(item.text);
    setShowSugg(false);
    setShowSearchBox(false);
    setIsMobileMenuOpen(false);
    if (item.type === "product") {
      router.push(`/items/${item.id}`);
    } else {
      router.push(`/search?query=${encodeURIComponent(item.text)}`);
    }
  };

  const categories = [
    { name: "New Arrivals", path: "/search?query=New Arrivals" },
    { name: "Clothing", path: "/men" },
    { name: "Footwear", path: "/search?query=Footwear" },
    { name: "Accessories", path: "/search?query=Accessories" },
    { name: "Sale", path: "/search?query=New Arrivals" }
  ];

  return (
    <header className="sticky top-0 z-50 bg-white">
      {/* Aura Threads Promo Bar */}
      <div className="w-full bg-[#111111] text-white text-[10px] sm:text-[11px] font-bold tracking-[0.18em] uppercase py-2 px-4 text-center select-none relative">
        Sale now on: 30-40% off sitewide. Shop iconic styles.
      </div>

      {/* Aura Threads Minimalist Solid White Navbar */}
      <nav className="w-full border-b border-black/5 text-black transition-all duration-300">
        <div className="max-w-[1600px] mx-auto px-4 md:px-10 h-16 flex items-center justify-between">
          
          {/* DESKTOP LAYOUT (3 Columns: Left-links, Center-logo, Right-icons) */}
          
          {/* Column 1: Left Categories Link Row (Desktop - Exclusively Men's Apparel) */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8 flex-1 justify-start">
            <Link
              href="/search?query=New Arrivals"
              className="text-black hover:text-stone text-[11px] font-bold tracking-[0.2em] transition-colors uppercase font-sans"
            >
              NEW ARRIVALS
            </Link>
            <Link
              href="/men"
              className="text-black hover:text-stone text-[11px] font-bold tracking-[0.2em] transition-colors uppercase font-sans"
            >
              CLOTHING
            </Link>
            <Link
              href="/search?query=Footwear"
              className="text-black hover:text-stone text-[11px] font-bold tracking-[0.2em] transition-colors uppercase font-sans"
            >
              FOOTWEAR
            </Link>
            <Link
              href="/search?query=Accessories"
              className="text-black hover:text-stone text-[11px] font-bold tracking-[0.2em] transition-colors uppercase font-sans"
            >
              ACCESSORIES
            </Link>
            <Link
              href="/search?query=New Arrivals"
              className="text-red-600 hover:text-red-700 text-[11px] font-bold tracking-[0.2em] transition-colors uppercase font-sans"
            >
              SALE
            </Link>
          </div>

          {/* Hamburger Menu Toggle (Mobile) */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-black hover:text-stone p-1 focus:outline-none transition-colors flex-1 justify-start flex"
            aria-label="Toggle Menu"
          >
            <i className={`bi ${isMobileMenuOpen ? "bi-x-lg text-lg" : "bi-list text-2xl"}`}></i>
          </button>

          {/* Column 2: Logo / Brand Name (Centered on Desktop) */}
          <div className="flex-shrink-0 text-center lg:flex-none">
            <Link 
              href="/" 
              className="text-black font-display font-black text-[16px] md:text-[20px] tracking-[0.3em] uppercase hover:opacity-85 transition-opacity"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              AURA THREADS
            </Link>
          </div>

          {/* Column 3: Action Icons (Right-aligned) */}
          <div className="hidden lg:flex items-center gap-5 flex-1 justify-end text-black">
            {/* Country flag selector */}
            <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-black select-none cursor-pointer">
              <span className="text-sm">🇺🇸</span>
            </div>
            
            {/* Search Icon */}
            <button
              onClick={() => {
                setShowSearchBox(!showSearchBox);
                setIsMobileMenuOpen(false);
              }}
              className="hover:text-stone p-1 transition-colors cursor-pointer text-black"
              aria-label="Search Catalog"
            >
              <i className="bi bi-search text-[14px]"></i>
            </button>

            {/* Profile Icon */}
            {currentUser ? (
              <Link 
                href="/user" 
                className="hover:text-stone p-1 transition-colors flex items-center gap-1 text-[11px] font-bold tracking-wider text-black"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <i className="bi bi-person text-[17px]"></i>
              </Link>
            ) : (
              <Link 
                href="/login" 
                className="hover:text-stone p-1 transition-colors flex items-center text-black"
                aria-label="Login"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <i className="bi bi-person text-[17px]"></i>
              </Link>
            )}

            {/* Cart Bag */}
            <Link 
              href="/cart" 
              className="hover:text-stone p-1 transition-colors relative flex items-center text-black"
              aria-label="Cart"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <i className="bi bi-bag text-[15px]"></i>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-black text-white text-[8px] font-bold rounded-full w-3.5 h-3.5 flex items-center justify-center font-sans">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Right-aligned Action Icons */}
          <div className="lg:hidden flex items-center gap-3 flex-1 justify-end text-black">
            <button
              onClick={() => {
                setShowSearchBox(!showSearchBox);
                setIsMobileMenuOpen(false);
              }}
              className="p-1 cursor-pointer"
              aria-label="Search Catalog"
            >
              <i className="bi bi-search text-[14px]"></i>
            </button>
            <Link 
              href="/cart" 
              className="p-1 relative flex items-center"
              aria-label="Cart"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <i className="bi bi-bag text-[15px]"></i>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-black text-white text-[8px] font-bold rounded-full w-3.5 h-3.5 flex items-center justify-center font-sans">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

        </div>

        {/* Slide-Down Search Overlay */}
        {showSearchBox && (
          <div className="absolute top-full left-0 right-0 bg-white border-b border-black/10 py-6 px-6 shadow-2xl z-50 flex justify-center animate-[slideDown_0.2s_ease-out]">
            <form onSubmit={executeSearch} className="max-w-3xl w-full relative" ref={suggRef}>
              <div className="flex items-center relative">
                <i className="bi bi-search text-stone text-base absolute left-4"></i>
                <input
                  type="search"
                  value={query}
                  onChange={handleSearchChange}
                  placeholder="Search aurathreads.com"
                  className="w-full bg-[#F4F4F5] border border-transparent focus:border-black rounded-lg text-black text-[13px] pl-11 pr-12 py-2.5 focus:outline-none transition-all font-sans"
                  autoFocus
                  autoComplete="off"
                />
                <button 
                  type="button" 
                  onClick={() => setShowSearchBox(false)} 
                  className="absolute right-4 text-stone hover:text-black transition-colors cursor-pointer"
                >
                  <i className="bi bi-x-lg text-sm"></i>
                </button>
              </div>

              {/* Suggestions dropdown */}
              {showSugg && suggestions.length > 0 && (
                <div className="absolute top-full left-0 w-full mt-2 bg-white border border-black/10 rounded-lg shadow-2xl overflow-hidden z-[100] py-2">
                  <div className="px-4 py-1 text-[10px] font-semibold text-stone uppercase tracking-wider">
                    Quick Suggestions
                  </div>
                  <ul>
                    {suggestions.map((item, idx) => (
                      <li
                        key={idx}
                        onClick={() => handleSuggestionClick(item)}
                        className="flex items-center gap-3 px-4 py-2.5 text-black hover:bg-[#F4F4F5] cursor-pointer transition-colors text-xs font-sans"
                      >
                        <i className={`bi ${item.type === "product" ? "bi-tag-fill text-stone" : "bi-folder2 text-stone"} text-xs`}></i>
                        <span>{item.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </form>
          </div>
        )}

        {/* Full-Page Mobile Menu Drawer */}
        {isMobileMenuOpen && (
          <div className="fixed top-[100px] inset-x-0 bottom-0 bg-white z-40 flex flex-col p-6 overflow-y-auto animate-[fadeIn_0.3s_ease-out] border-t border-black/5">
            <div className="flex flex-col space-y-4 pt-4">
              <span className="text-[10px] font-bold text-stone uppercase tracking-[0.2em] mb-2">Shop Categories</span>
              {categories.map((cat, idx) => (
                <Link
                  key={idx}
                  href={cat.path}
                  className="text-black hover:text-stone text-lg font-bold tracking-wide py-1.5 border-b border-black/5 transition-colors uppercase"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {cat.name}
                </Link>
              ))}
            </div>
            <div className="mt-8 pt-6 border-t border-black/5 flex flex-col gap-4">
              <span className="text-[10px] font-bold text-stone uppercase tracking-[0.2em]">Account & Support</span>
              <Link 
                href={currentUser ? "/user" : "/login"} 
                className="text-black hover:text-stone text-base py-1 transition-colors font-bold uppercase tracking-wider text-[12px]"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {currentUser ? `My Account (${currentUser.name})` : "Login / Register"}
              </Link>
              <Link 
                href="/help" 
                className="text-black hover:text-stone text-base py-1 transition-colors font-bold uppercase tracking-wider text-[12px]"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Customer Service & FAQ
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Global CSS animation helper for slideDown and fadeIn */}
      <style jsx global>{`
        @keyframes slideDown {
          from { transform: translateY(-10px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </header>
  );
}
