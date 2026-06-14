// src/app/login/page.js
"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg("");
    
    const result = login(email, password);
    if (result.success) {
      setSuccess(true);
      setTimeout(() => {
        router.push("/");
      }, 1000);
    } else {
      setErrorMsg(result.message);
    }
  };

  return (
    <main className="min-h-[75vh] flex items-center justify-center p-6">
      <div className="bg-white border border-sand/40 rounded-3xl overflow-hidden shadow-xl max-w-4xl w-full grid grid-cols-1 md:grid-cols-12 g-0">
        
        {/* Left Banner Column */}
        <div className="md:col-span-5 bg-charcoal text-white p-8 sm:p-12 flex flex-col justify-center relative select-none">
          <div className="absolute inset-0 bg-gradient-to-b from-sand/10 to-transparent pointer-events-none" />
          <span className="text-sand/80 font-bold uppercase tracking-[0.2em] text-[10px] mb-2 block font-display">Welcome Back</span>
          <h2 className="text-2xl font-bold text-white mb-4 tracking-widest font-display uppercase">AURA THREADS</h2>
          <p className="text-neutral-400 text-xs leading-relaxed mb-6 font-sans">Unlock custom designer inventory listings, secure quick checkout, and elite TriBe membership access.</p>
          <div>
            <Link href="/" className="inline-block border border-neutral-800 hover:border-sand text-neutral-300 hover:text-sand font-bold text-[10px] uppercase tracking-wider px-4 py-2 rounded-full transition-all font-display">
              <i className="bi bi-arrow-left me-1.5"></i> Back to Store
            </Link>
          </div>
        </div>

        {/* Right Login Form Column */}
        <div className="md:col-span-7 p-8 sm:p-12">
          <div className="mb-6">
            <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-[0.25em] font-display">SECURE ACCESS</span>
            <h3 className="text-xl font-bold font-display uppercase mb-1 text-charcoal tracking-wide mt-1">Sign In</h3>
            <p className="text-neutral-500 text-xs">Enter your credentials to manage your store listings.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
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
              <div className="flex justify-between items-center mb-1.5 font-display">
                <label className="text-[10px] uppercase font-bold text-neutral-500 block tracking-wider">Password</label>
                <a href="#" className="text-[10px] text-charcoal/60 hover:text-charcoal font-bold uppercase tracking-widest">Forgot?</a>
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
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
                <span>Login successful! Redirecting...</span>
              </div>
            )}

            <button type="submit" className="w-full bg-charcoal hover:bg-charcoal/80 text-white font-bold font-display py-3 rounded-full text-xs transition-colors tracking-widest uppercase">
              SIGN IN
            </button>
            
            <p className="text-center text-xs text-neutral-500 pt-2 font-display uppercase tracking-wider">
              Don't have an account? <Link href="/signup" className="text-charcoal font-bold hover:underline transition-colors ml-1">Sign Up</Link>
            </p>
          </form>

          <hr className="border-sand/30 my-6" />

          <div className="text-center font-display">
            <span className="text-[10px] uppercase font-bold text-neutral-400 block mb-3 tracking-widest">Or continue with social</span>
            <a href="https://accounts.google.com" target="_blank" className="btn inline-flex items-center justify-center gap-2 border border-sand hover:bg-offwhite w-full py-2.5 rounded-full text-xs text-charcoal font-bold uppercase tracking-wider">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" className="bi bi-google text-red-500" viewBox="0 0 16 16">
                <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0c2.204 0 4.09.811 5.56 2.215h-.002L12.01 3.79c-.838-.79-2.137-1.706-4.01-1.706-3.418 0-6.208 2.83-6.208 6.316s2.79 6.316 6.208 6.316c3.95 0 5.43-2.835 5.658-4.282H8.19V6.558h7.355z"/>
              </svg>
              Sign in with Google
            </a>
          </div>
        </div>

      </div>
    </main>
  );
}
