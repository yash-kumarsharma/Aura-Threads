// src/app/signup/page.js
"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function SignupPage() {
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

    const result = register(name, email, password, location);
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
    <main className="min-h-[80vh] flex items-center justify-center p-6">
      <div className="bg-white border border-sand/40 rounded-3xl overflow-hidden shadow-xl max-w-4xl w-full grid grid-cols-1 md:grid-cols-12 g-0">
        
        {/* Left Banner Column */}
        <div className="md:col-span-5 bg-charcoal text-white p-8 sm:p-12 flex flex-col justify-center relative select-none">
          <div className="absolute inset-0 bg-gradient-to-b from-sand/10 to-transparent pointer-events-none" />
          <span className="text-sand/80 font-bold uppercase tracking-[0.2em] text-[10px] mb-2 block font-display">Join Today</span>
          <h2 className="text-2xl font-bold text-white mb-4 tracking-widest font-display uppercase">AURA THREADS</h2>
          <p className="text-neutral-400 text-xs leading-relaxed mb-6 font-sans">Create an account to track shipments, rate collections, and list custom designs as a verified merchant.</p>
          <div>
            <Link href="/" className="inline-block border border-neutral-800 hover:border-sand text-neutral-300 hover:text-sand font-bold text-[10px] uppercase tracking-wider px-4 py-2 rounded-full transition-all font-display">
              <i className="bi bi-arrow-left me-1.5"></i> Back to Store
            </Link>
          </div>
        </div>

        {/* Right Signup Form Column */}
        <div className="md:col-span-7 p-8 sm:p-12">
          <div className="mb-6">
            <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-[0.25em] font-display">NEW CUSTOMER</span>
            <h3 className="text-xl font-bold font-display uppercase mb-1 text-charcoal tracking-wide mt-1">Create Account</h3>
            <p className="text-neutral-500 text-xs">Register to unlock exclusive brand benefits.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-[10px] uppercase font-bold text-neutral-500 block mb-1.5 font-display tracking-wider">Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Yash Sharma"
                className="w-full border border-sand rounded-full px-4 py-2.5 text-xs bg-white text-charcoal focus:border-charcoal focus:ring-0"
              />
            </div>
            <div>
              <label className="text-[10px] uppercase font-bold text-neutral-500 block mb-1.5 font-display tracking-wider">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="yash@gmail.com"
                className="w-full border border-sand rounded-full px-4 py-2.5 text-xs bg-white text-charcoal focus:border-charcoal focus:ring-0"
              />
            </div>
            <div>
              <label className="text-[10px] uppercase font-bold text-neutral-500 block mb-1.5 font-display tracking-wider">Location / Region</label>
              <input
                type="text"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Chandigarh, India"
                className="w-full border border-sand rounded-full px-4 py-2.5 text-xs bg-white text-charcoal focus:border-charcoal focus:ring-0"
              />
            </div>
            <div>
              <label className="text-[10px] uppercase font-bold text-neutral-500 block mb-1.5 font-display tracking-wider">Password (min 8 chars)</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                minLength={8}
                className="w-full border border-sand rounded-full px-4 py-2.5 text-xs bg-white text-charcoal focus:border-charcoal focus:ring-0"
              />
            </div>

            {errorMsg && (
              <div className="bg-neutral-50 border border-sand text-red-600 text-xs p-3 rounded-full flex items-center gap-2 font-medium justify-center">
                <i className="bi bi-exclamation-triangle"></i>
                <span>{errorMsg}</span>
              </div>
            )}

            {success && (
              <div className="bg-neutral-50 border border-sand text-green-600 text-xs p-3 rounded-full flex items-center gap-2 font-medium justify-center">
                <i className="bi bi-check-circle"></i>
                <span>Account created! Redirecting to sign in...</span>
              </div>
            )}

            <button type="submit" className="w-full bg-charcoal hover:bg-charcoal/80 text-white font-bold font-display py-3 rounded-full text-xs transition-colors tracking-widest uppercase">
              CREATE ACCOUNT
            </button>
            
            <p className="text-center text-xs text-neutral-500 pt-2 font-display uppercase tracking-wider">
              Already have an account? <Link href="/login" className="text-charcoal font-bold hover:underline transition-colors ml-1">Sign In</Link>
            </p>
          </form>
        </div>

      </div>
    </main>
  );
}
