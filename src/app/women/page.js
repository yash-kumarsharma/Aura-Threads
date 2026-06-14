// src/app/women/page.js
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function WomenPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/men");
  }, [router]);

  return (
    <main className="max-w-7xl mx-auto px-6 py-32 text-center font-display text-charcoal">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-charcoal border-r-2 mx-auto mb-4"></div>
      <p className="text-xs uppercase tracking-widest font-bold">Redirecting to MONOLITH Menswear...</p>
    </main>
  );
}
