// src/components/Footer.js
"use client";

import Link from "next/link";
import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
    } else {
      alert("Please enter a valid email address.");
    }
  };

  return (
    <footer className="bg-obsidian text-alabaster pt-16 pb-8 border-t border-white/5 font-sans mt-auto">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Apple/Forest Style Newsletter Row */}
        <div className="border-b border-white/10 pb-10 mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="max-w-xl">
            <h4 className="text-sm font-semibold tracking-wide uppercase mb-1 text-white">
              Stay in the Loop
            </h4>
            <p className="text-xs text-stone leading-relaxed">
              Subscribe to get exclusive first-access notifications on product drops, seasonal releases, and architectural lookbooks.
            </p>
          </div>
          <div className="w-full md:w-auto min-w-[280px]">
            {!subscribed ? (
              <form onSubmit={handleSubscribe} className="flex items-center relative pt-1">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email address"
                  className="w-full bg-white/5 border border-white/10 focus:border-stone rounded-lg text-xs px-4 py-2.5 pr-20 focus:outline-none transition-colors text-white"
                />
                <button 
                  type="submit" 
                  className="absolute right-3 text-stone hover:text-white font-semibold text-xs uppercase tracking-wider py-1 focus:outline-none transition-colors"
                >
                  Join
                </button>
              </form>
            ) : (
              <div className="bg-white/5 border border-stone/20 text-stone text-xs px-4 py-2.5 rounded-lg flex items-center gap-2 font-medium">
                <i className="bi bi-patch-check-fill"></i>
                <span>Subscribed successfully. Welcome to AuraThreads.</span>
              </div>
            )}
          </div>
        </div>

        {/* Directory Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Shop & Learn */}
          <div className="space-y-3">
            <h5 className="text-[11px] font-bold uppercase tracking-wider text-stone font-display">
              Shop & Learn
            </h5>
            <ul className="space-y-2 text-xs">
              <li><Link href="/search?query=New Arrivals" className="hover:underline text-alabaster/80 hover:text-white block">New Arrivals</Link></li>
              <li><Link href="/search?query=T-Shirts" className="hover:underline text-alabaster/80 hover:text-white block">T-Shirts</Link></li>
              <li><Link href="/search?query=Shirts" className="hover:underline text-alabaster/80 hover:text-white block">Shirts</Link></li>
              <li><Link href="/search?query=Hoodies" className="hover:underline text-alabaster/80 hover:text-white block">Hoodies & Jackets</Link></li>
              <li><Link href="/search?query=Accessories" className="hover:underline text-alabaster/80 hover:text-white block">Accessories</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-3">
            <h5 className="text-[11px] font-bold uppercase tracking-wider text-stone font-display">
              Support
            </h5>
            <ul className="space-y-2 text-xs">
              <li><Link href="/help" className="hover:underline text-alabaster/80 hover:text-white block">Contact Concierge</Link></li>
              <li><a href="https://www.ordertracker.com/" target="_blank" className="hover:underline text-alabaster/80 hover:text-white block">Track Your Order</a></li>
              <li><Link href="/help" className="hover:underline text-alabaster/80 hover:text-white block">Returns & Exchanges</Link></li>
              <li><Link href="/help" className="hover:underline text-alabaster/80 hover:text-white block">Shipping Information</Link></li>
              <li><Link href="/help" className="hover:underline text-alabaster/80 hover:text-white block">Cancel / Change Order</Link></li>
            </ul>
          </div>

          {/* The Brand */}
          <div className="space-y-3">
            <h5 className="text-[11px] font-bold uppercase tracking-wider text-stone font-display">
              AuraThreads
            </h5>
            <ul className="space-y-2 text-xs">
              <li><Link href="/help" className="hover:underline text-alabaster/80 hover:text-white block">Our Craft & Story</Link></li>
              <li><Link href="/help" className="hover:underline text-alabaster/80 hover:text-white block">Design Ethics</Link></li>
              <li><Link href="/help" className="hover:underline text-alabaster/80 hover:text-white block">Bespoke Materials</Link></li>
              <li><Link href="/help" className="hover:underline text-alabaster/80 hover:text-white block">Careers Archive</Link></li>
            </ul>
          </div>

          {/* Connect & Social */}
          <div className="space-y-3">
            <h5 className="text-[11px] font-bold uppercase tracking-wider text-stone font-display">
              Boutique Channels
            </h5>
            <div className="flex gap-4 mb-2">
              <a href="https://www.facebook.com" target="_blank" className="text-lg text-stone hover:text-white transition-colors" aria-label="Facebook"><i className="bi bi-facebook"></i></a>
              <a href="https://www.instagram.com" target="_blank" className="text-lg text-stone hover:text-white transition-colors" aria-label="Instagram"><i className="bi bi-instagram"></i></a>
              <a href="https://www.twitter.com" target="_blank" className="text-lg text-stone hover:text-white transition-colors" aria-label="Twitter"><i className="bi bi-twitter"></i></a>
            </div>
            <p className="text-[10px] text-stone/80 leading-relaxed max-w-[200px]">
              Follow for daily design journals, studio updates, and digital archives.
            </p>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-white/10 my-6" />

        {/* Legal & Copyright */}
        <div className="flex flex-col md:flex-row md:justify-between text-[11px] text-stone gap-4">
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
            <span>Copyright &copy; 2026 AuraThreads Inc. All rights reserved.</span>
          </div>
          <div className="flex flex-wrap gap-x-3 gap-y-1">
            <a href="https://policies.google.com/privacy" target="_blank" className="hover:underline hover:text-white">Privacy Policy</a>
            <span className="text-white/10">|</span>
            <a href="https://policies.google.com/terms" target="_blank" className="hover:underline hover:text-white">Terms of Use</a>
            <span className="text-white/10">|</span>
            <Link href="/help" className="hover:underline hover:text-white">Sales and Refunds</Link>
            <span className="text-white/10">|</span>
            <Link href="/help" className="hover:underline hover:text-white">Legal</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
