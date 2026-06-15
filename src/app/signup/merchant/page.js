// src/app/signup/merchant/page.js
"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function MerchantSignupPage() {
  const router = useRouter();
  const { register } = useAuth();
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [password, setPassword] = useState("");
  
  const [errorMsg, setErrorMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg("");

    const result = register(name, email, password, location, "merchant");
    if (result.success) {
      setSuccess(true);
      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } else {
      setErrorMsg(result.message);
    }
  };

  return (
    <main className="min-h-[85vh] flex items-center justify-center p-6 bg-gradient-to-br from-[#FAF9F6] to-[#F0EFEA] py-12 sm:py-20">
      <div className="bg-white border border-black/5 rounded-none overflow-hidden shadow-2xl max-w-5xl w-full min-h-[600px] grid grid-cols-1 md:grid-cols-12 g-0">
        
        {/* Left Banner Column */}
        <div className="md:col-span-5 text-white p-8 sm:p-12 flex flex-col justify-center relative select-none overflow-hidden min-h-[300px] md:min-h-auto">
          {/* Background Image */}
          <img 
            src="/images/campaigns/auth-merchant.jpeg" 
            alt="Aura Threads lookbook" 
            className="absolute inset-0 w-full h-full object-cover z-0"
            style={{ objectPosition: "center 20%" }}
          />
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/45 z-10"></div>
          
          {/* Content */}
          <div className="relative z-20">
            <span className="text-white/80 font-bold uppercase tracking-[0.25em] text-[10px] mb-2 block font-sans">Verified Merchant</span>
            <h2 className="text-2xl font-black text-white mb-4 tracking-widest font-sans uppercase">AURA THREADS</h2>
            <p className="text-white/80 text-xs leading-relaxed mb-8 font-sans max-w-xs">Control your collection, showcase raw silhouette designs, and leverage Aura's premium customer base.</p>
            <div>
              <Link href="/" className="inline-block border border-white/30 hover:border-white text-white/95 hover:text-white font-bold text-[10px] uppercase tracking-wider px-5 py-2.5 rounded-none transition-all font-sans">
                <i className="bi bi-arrow-left me-1.5"></i> Back to Store
              </Link>
            </div>
          </div>
        </div>

        {/* Right Signup Form Column */}
        <div className="md:col-span-7 p-8 sm:p-12 flex flex-col justify-center">
          <div className="mb-6">
            <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-[0.25em] font-sans">MERCHANT PROGRAM</span>
            <h3 className="text-xl font-black font-sans uppercase mb-1 text-black tracking-wide mt-1">Register Brand</h3>
            <p className="text-neutral-500 text-xs mb-2">Register to upload designs and list custom products.</p>
            <Link href="/signup" className="text-[10px] text-stone hover:text-black font-bold uppercase tracking-widest transition-colors flex items-center gap-1.5 mt-1 pb-1 border-b border-black/10 w-fit">
              Looking to buy? Register as a Customer <i className="bi bi-arrow-right"></i>
            </Link>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-[10px] uppercase font-bold text-neutral-500 block mb-1.5 font-sans tracking-wider">Brand Name / Seller Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Aura Atelier"
                className="w-full border border-black/10 rounded-none px-4 py-2.5 text-xs bg-white text-black focus:border-black focus:ring-0"
              />
            </div>
            <div>
              <label className="text-[10px] uppercase font-bold text-neutral-500 block mb-1.5 font-sans tracking-wider">Business Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="business@aurathreads.com"
                className="w-full border border-black/10 rounded-none px-4 py-2.5 text-xs bg-white text-black focus:border-black focus:ring-0"
              />
            </div>
            <div>
              <label className="text-[10px] uppercase font-bold text-neutral-500 block mb-1.5 font-sans tracking-wider">Store / Business Location</label>
              <input
                type="text"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Chandigarh, India"
                className="w-full border border-black/10 rounded-none px-4 py-2.5 text-xs bg-white text-black focus:border-black focus:ring-0"
              />
            </div>
            <div>
              <label className="text-[10px] uppercase font-bold text-neutral-500 block mb-1.5 font-sans tracking-wider">Password (min 8 chars)</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                minLength={8}
                className="w-full border border-black/10 rounded-none px-4 py-2.5 text-xs bg-white text-black focus:border-black focus:ring-0"
              />
            </div>

            {errorMsg && (
              <div className="bg-neutral-50 border border-black/5 text-red-600 text-xs p-3 rounded-none flex items-center gap-2 font-medium justify-center">
                <i className="bi bi-exclamation-triangle"></i>
                <span>{errorMsg}</span>
              </div>
            )}

            {success && (
              <div className="bg-neutral-50 border border-black/5 text-green-600 text-xs p-3 rounded-none flex items-center gap-2 font-medium justify-center">
                <i className="bi bi-check-circle"></i>
                <span>Brand registered! Redirecting to sign in...</span>
              </div>
            )}

            <button type="submit" className="w-full bg-black hover:bg-neutral-800 text-white font-bold font-sans py-3 rounded-none text-xs transition-colors tracking-widest uppercase cursor-pointer">
              CREATE MERCHANT ACCOUNT
            </button>
            
            <p className="text-center text-xs text-neutral-500 pt-2 font-sans uppercase tracking-wider">
              Already have an account? <Link href="/login" className="text-black font-bold hover:underline transition-colors ml-1">Sign In</Link>
            </p>
          </form>

          <hr className="border-black/5 my-6" />

          <div className="text-center font-sans">
            <span className="text-[10px] uppercase font-bold text-neutral-400 block mb-3 tracking-widest">Or continue with social</span>
            <a href="https://accounts.google.com" target="_blank" className="btn inline-flex items-center justify-center gap-2 border border-black/10 hover:bg-[#F4F4F5] w-full py-2.5 rounded-none text-xs text-black font-bold uppercase tracking-wider">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" className="bi bi-google text-red-500" viewBox="0 0 16 16">
                <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0c2.204 0 4.09.811 5.56 2.215h-.002L12.01 3.79c-.838-.79-2.137-1.706-4.01-1.706-3.418 0-6.208 2.83-6.208 6.316s2.79 6.316 6.208 6.316c3.95 0 5.43-2.835 5.658-4.282H8.19V6.558h7.355z"/>
              </svg>
              Sign up with Google
            </a>
          </div>
        </div>

      </div>
    </main>
  );
}
