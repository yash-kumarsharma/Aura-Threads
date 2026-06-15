// src/app/user/page.js
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function UserProfilePage() {
  const { currentUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (currentUser) {
      if (currentUser.role === "merchant") {
        router.replace("/user/merchant");
      } else {
        router.replace("/user/customer");
      }
    }
  }, [currentUser, router]);

  if (!currentUser) {
    return (
      <main className="max-w-7xl mx-auto px-6 py-24 text-center">
        <div className="text-stone mb-6 text-5xl">
          <i className="bi bi-lock-fill text-black/25"></i>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold mb-3 font-sans text-black uppercase tracking-wider">Access Restricted</h2>
        <p className="text-neutral-500 text-sm mb-6 max-w-sm mx-auto">Please log in with your credentials to access your user profile.</p>
        <a href="/login" className="inline-block bg-black hover:bg-neutral-800 text-white font-bold px-8 py-3 rounded-none text-xs transition-colors font-sans uppercase tracking-widest">
          Log In Now
        </a>
      </main>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-6 py-24 text-center">
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
        <p className="text-xs uppercase tracking-widest font-sans font-bold text-stone">Redirecting to profile...</p>
      </div>
    </main>
  );
}
