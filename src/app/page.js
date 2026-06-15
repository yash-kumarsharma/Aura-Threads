// src/app/page.js
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { getAllProducts } from "@/data/products";
import ProductCard from "@/components/ProductCard";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto load products and listen to custom product listings updates
  useEffect(() => {
    setProducts(getAllProducts());
    
    const handleUpdate = () => {
      setProducts(getAllProducts());
    };
    window.addEventListener("productsUpdated", handleUpdate);
    return () => window.removeEventListener("productsUpdated", handleUpdate);
  }, []);

  // Filter products for the showcase (8 items to show a wide scrollable list, excluding accessories/footwear)
  const bestSellers = products.filter(p => 
    p.bestSeller && 
    p.category &&
    p.category.toLowerCase() !== "accessories" && 
    p.category.toLowerCase() !== "footwear"
  ).slice(0, 8);
  
  const summerCollection = products.filter(p => 
    p.summerCollection && 
    p.category &&
    p.category.toLowerCase() !== "accessories" && 
    p.category.toLowerCase() !== "footwear"
  ).slice(0, 8);
  
  // Mix bags, caps, and sunglasses for the Essential Complements section
  const allAcc = products.filter(p => p.category === "Accessories");
  const accBags = allAcc.filter(p => p.id.includes("bag") || p.id === "m28" || p.id === "m29");
  const accCaps = allAcc.filter(p => p.id.includes("cap") || p.id === "m25" || p.id === "m26");
  const accGlasses = allAcc.filter(p => p.id.includes("sunglasses") || p.id === "m27" || p.id === "m30" || p.id === "m31");
  
  const accessoriesProducts = [
    ...accBags.slice(0, 3),
    ...accCaps.slice(0, 3),
    ...accGlasses.slice(0, 3)
  ];
  
  // Mix sneakers, loafers, casual, and formal boots for the Footwear Chapter section
  const allFoot = products.filter(p => p.category === "Footwear");
  const footSneakers = allFoot.filter(p => p.id.includes("sneaker") || p.id === "f2" || p.id === "f3");
  const footLoafers = allFoot.filter(p => p.id.includes("loafer") || p.id === "f1");
  const footCasual = allFoot.filter(p => p.id.includes("casual") || p.id === "f4");
  const footFormal = allFoot.filter(p => p.id.includes("formal") || p.id === "f5" || p.id.includes("chelsea"));
  
  const footwearProducts = [
    ...footSneakers.slice(0, 2),
    ...footLoafers.slice(0, 2),
    ...footCasual.slice(0, 2),
    ...footFormal.slice(0, 2)
  ];

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setSubscribed(true);
    }
  };

  const slides = [
    {
      img: "/images/hero/hero-slide-1.jpeg",
      position: "center 60%"
    },
    {
      img: "/images/hero/hero-slide-2.jpeg",
      position: "center center"
    },
    {
      img: "/images/hero/hero-slide-3.jpeg",
      position: "center 45%"
    }
  ];

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(slideInterval);
  }, [slides.length]);

  return (
    <main className="bg-white text-black min-h-screen w-full flex flex-col items-stretch overflow-x-hidden font-sans">
      
      {/* 1. AURA THREADS Hero Slideshow Carousel (Split layout on desktop, full-bleed on mobile) */}
      <section className="w-full h-[85vh] sm:h-[92vh] relative bg-white overflow-hidden z-10 select-none flex flex-col lg:flex-row">
        
        {/* Static Left/Text Side (Solid background on desktop, absolute centered overlay on mobile) */}
        <div className="w-full lg:w-1/2 h-full flex flex-col justify-center items-center lg:items-start text-center lg:text-left text-white lg:text-black p-8 md:p-16 lg:p-24 xl:p-32 z-20 absolute lg:relative inset-0 lg:inset-auto bg-black/35 lg:bg-[#F9F9FB]">
          <span className="text-white/80 lg:text-stone font-bold tracking-[0.25em] text-[10px] sm:text-[11px] uppercase font-sans mb-4">
            Aura Threads Studio
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-[56px] xl:text-[70px] font-black tracking-tighter uppercase mb-6 lg:mb-8 max-w-xl leading-[0.9] font-sans">
            THE ART OF EASE
          </h1>
          <p className="text-xs sm:text-sm text-white/85 lg:text-stone/90 uppercase tracking-[0.18em] font-medium mb-10 max-w-md leading-relaxed">
            Contemporary menswear designed for silhouette and atmosphere.
          </p>
          <div className="flex gap-4">
            <Link
              href="/men"
              className="border-2 border-white lg:border-black hover:bg-white lg:hover:bg-black hover:text-black lg:hover:text-white text-white lg:text-black px-8 py-3.5 text-xs font-bold tracking-widest uppercase transition-all duration-300 rounded-none"
            >
              SHOP COLLECTION
            </Link>
            <Link
              href="/search?query=New Arrivals"
              className="border-2 border-white lg:border-black hover:bg-white lg:hover:bg-black hover:text-black lg:hover:text-white text-white lg:text-black px-8 py-3.5 text-xs font-bold tracking-widest uppercase transition-all duration-300 rounded-none"
            >
              NEW ARRIVALS
            </Link>
          </div>
        </div>

        {/* Sliding Right/Image Side */}
        <div className="w-full lg:w-1/2 h-full relative overflow-hidden">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-[1200ms] ease-in-out ${index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"}`}
            >
              <img
                src={slide.img}
                alt="Aura Threads Collection"
                className="w-full h-full object-cover transition-transform duration-[6000ms] ease-out scale-103"
                style={{ objectPosition: slide.position || "center center" }}
              />
              <div className="absolute inset-0 bg-black/5 lg:bg-transparent"></div>
            </div>
          ))}
        </div>
        
        {/* Slideshow Dot indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-30">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2.5 h-2.5 rounded-full cursor-pointer transition-all duration-300 ${index === currentSlide ? "bg-white lg:bg-black scale-125" : "bg-white/45 lg:bg-black/30 hover:bg-white/85 lg:hover:bg-black/70"}`}
              aria-label={`Slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* 2. Shop by Category (Enlarged swiping tiles right after Hero) */}
      <section className="w-full bg-white py-24 px-4 md:px-10 border-b border-black/5 select-none">
        <div className="w-full">
          <div className="flex justify-between items-end mb-12">
            <h2 className="text-2xl md:text-[34px] font-black tracking-tight uppercase text-black font-sans leading-none">
              Shop by Category
            </h2>
            <Link 
              href="/men" 
              className="text-black hover:text-stone text-[11px] font-bold uppercase tracking-widest flex items-center gap-1.5 font-sans transition-colors pb-1 border-b border-black"
            >
              <span>Explore All</span>
              <i className="bi bi-arrow-right"></i>
            </Link>
          </div>

          {/* Horizontal scrollbar container - enlarged category tiles */}
          <div className="flex gap-6 overflow-x-auto pb-8 no-scrollbar scroll-smooth snap-x snap-mandatory">
            {[
              { name: "T-Shirts", img: "/images/categories/tshirt.jpeg", query: "T-Shirts" },
              { name: "Shirts", img: "/images/categories/shirt.jpeg", query: "Shirts" },
              { name: "Polos", img: "/images/categories/polo.jpeg", query: "Polos" },
              { name: "Hoodies", img: "/images/categories/hoodie.jpeg", query: "Hoodies" },
              { name: "Jeans & Pants", img: "/images/categories/pants.jpeg", query: "Trousers" },
              { name: "Accessories", img: "/images/categories/accessories.jpeg", query: "Accessories" },
              { name: "Footwear", img: "/images/categories/footwear.jpeg", query: "Footwear" }
            ].map((cat, index) => (
              <Link
                key={index}
                href={`/search?query=${cat.query}`}
                className="min-w-[280px] sm:min-w-[340px] max-w-[340px] aspect-[4/5] relative snap-start flex-shrink-0 group overflow-hidden block"
              >
                <img
                  src={cat.img}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/15 group-hover:bg-black/25 transition-colors"></div>
                <div className="absolute bottom-6 left-6 text-white text-left z-20">
                  <h3 className="text-xl md:text-2xl font-black uppercase tracking-wide leading-none">{cat.name}</h3>
                  <span className="text-[10px] uppercase font-bold tracking-widest mt-1 block opacity-85">Explore Collection &rarr;</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. NEW ARRIVALS: COLLECTION 2026 Full Screen Campaign Banner */}
      <section className="w-full h-screen relative bg-black overflow-hidden z-20 flex items-center justify-center select-none">
        <img
          src="/images/campaigns/new-arrivals-banner.jpeg"
          className="absolute inset-0 w-full h-full object-cover opacity-90 transition-transform duration-[6000ms] hover:scale-103 ease-out"
          style={{ objectPosition: "center 35%" }}
          alt="New Arrivals Campaign"
        />
        <div className="absolute inset-0 bg-black/20"></div>
        
        {/* Centered Typography Overlay (Super Big Text) */}
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white p-6 md:p-12 z-20">
          <h2 className="text-4xl md:text-6xl lg:text-[72px] font-black tracking-tighter uppercase mb-8 leading-[0.85] font-sans max-w-6xl">
            COASTAL TAILORING: DROP 03
          </h2>
          <div className="flex gap-4">
            <Link
              href="/search?query=New Arrivals"
              className="border-2 border-white hover:bg-white hover:text-black text-white px-10 py-4 text-xs font-bold tracking-widest uppercase transition-all duration-300 rounded-none"
            >
              SHOP NEW DROP
            </Link>
            <Link
              href="/help"
              className="border-2 border-white hover:bg-white hover:text-black text-white px-10 py-4 text-xs font-bold tracking-widest uppercase transition-all duration-300 rounded-none"
            >
              DISCOVER
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Massive Horizontal Products Row Slider (Best Sellers) */}
      <section className="w-full bg-white py-24 px-4 md:px-10 border-b border-black/5 select-none">
        <div className="w-full">
          <div className="flex justify-between items-end mb-12">
            <h2 className="text-2xl md:text-[34px] font-black tracking-tight uppercase text-black font-sans leading-none">
              ARCHIVE CORE: BEST SELLERS
            </h2>
            <Link 
              href="/search?query=New Arrivals" 
              className="text-black hover:text-stone text-[11px] font-bold uppercase tracking-widest flex items-center gap-1.5 font-sans transition-colors pb-1 border-b border-black"
            >
              <span>View All Best Sellers</span>
              <i className="bi bi-arrow-right"></i>
            </Link>
          </div>

          {/* Horizontal scrollbar container - enlarged cards */}
          <div className="flex gap-6 overflow-x-auto pb-8 no-scrollbar scroll-smooth snap-x snap-mandatory">
            {bestSellers.map((product) => (
              <div key={product.id} className="min-w-[320px] sm:min-w-[420px] max-w-[420px] snap-start flex-shrink-0">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. 2-Column Split Banners ("THE ART OF THE SHIFT", Full Screen) */}
      <section className="w-full h-screen grid grid-cols-1 md:grid-cols-2 gap-0 relative z-20 overflow-hidden bg-black select-none">
        
        {/* Left Column Image */}
        <div className="relative h-full w-full overflow-hidden">
          <img
            src="/images/campaigns/layers-left.jpeg"
            className="absolute inset-0 w-full h-full object-cover opacity-90 transition-transform duration-[6000ms] hover:scale-105 ease-out"
            style={{ objectPosition: "center 20%" }}
            alt="Layers Left Model"
          />
        </div>

        {/* Right Column Image */}
        <div className="relative h-full w-full overflow-hidden">
          <img
            src="/images/campaigns/layers-right.jpeg"
            className="absolute inset-0 w-full h-full object-cover opacity-90 transition-transform duration-[6000ms] hover:scale-105 ease-out"
            style={{ objectPosition: "center 25%" }}
            alt="Layers Right Model"
          />
        </div>

        {/* Centered Typography Overlay (Over the middle line) */}
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white p-6 md:p-12 z-30 bg-black/15">
          <h2 className="text-3xl md:text-5xl lg:text-[60px] font-black tracking-tighter uppercase mb-8 leading-[0.85] font-sans max-w-5xl">
            THE ART OF THE SHIFT
          </h2>
          <div className="flex gap-4">
            <Link
              href="/search?query=New Arrivals"
              className="border-2 border-white hover:bg-white hover:text-black text-white px-10 py-4 text-xs font-bold tracking-widest uppercase transition-all duration-300 rounded-none"
            >
              SHOP LAYERING
            </Link>
            <Link
              href="/help"
              className="border-2 border-white hover:bg-white hover:text-black text-white px-10 py-4 text-xs font-bold tracking-widest uppercase transition-all duration-300 rounded-none"
            >
              DISCOVER
            </Link>
          </div>
        </div>

      </section>

      {/* Summer Collection Horizontal Products Row Slider */}
      <section className="w-full bg-white py-24 px-4 md:px-10 border-b border-black/5 select-none">
        <div className="w-full">
          <div className="flex justify-between items-end mb-12">
            <h2 className="text-2xl md:text-[34px] font-black tracking-tight uppercase text-black font-sans leading-none">
              SEASONAL TRANSITION: SUMMER COLLECTION
            </h2>
            <Link 
              href="/men" 
              className="text-black hover:text-stone text-[11px] font-bold uppercase tracking-widest flex items-center gap-1.5 font-sans transition-colors pb-1 border-b border-black"
            >
              <span>View Summer Shop</span>
              <i className="bi bi-arrow-right"></i>
            </Link>
          </div>

          {/* Horizontal scrollbar container */}
          <div className="flex gap-6 overflow-x-auto pb-8 no-scrollbar scroll-smooth snap-x snap-mandatory">
            {summerCollection.map((product) => (
              <div key={product.id} className="min-w-[320px] sm:min-w-[420px] max-w-[420px] snap-start flex-shrink-0">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. 2-Column Split Banners ("STUDIO ACCENTS", Accessories) */}
      <section className="w-full h-screen grid grid-cols-1 md:grid-cols-2 gap-0 relative z-20 overflow-hidden bg-black select-none">
        
        {/* Left Column Image (Studio Eyewear) */}
        <div className="relative h-full w-full overflow-hidden">
          <img
            src="/images/campaigns/acc-left.jpeg"
            className="absolute inset-0 w-full h-full object-cover opacity-90 transition-transform duration-[6000ms] hover:scale-105 ease-out"
            style={{ objectPosition: "center center" }}
            alt="Aura Threads Studio Eyewear"
          />
        </div>

        {/* Right Column Image (Curated Cap) */}
        <div className="relative h-full w-full overflow-hidden">
          <img
            src="/images/campaigns/acc-right.jpeg"
            className="absolute inset-0 w-full h-full object-cover opacity-90 transition-transform duration-[6000ms] hover:scale-105 ease-out"
            style={{ objectPosition: "center center" }}
            alt="Aura Threads Curated Cap"
          />
        </div>

        {/* Centered Typography Overlay */}
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white p-6 md:p-12 z-30 bg-black/15">
          <h2 className="text-3xl md:text-5xl lg:text-[60px] font-black tracking-tighter uppercase mb-8 leading-[0.85] font-sans max-w-5xl">
            STUDIO ACCENTS: EYEWEAR & CAPS
          </h2>
          <div className="flex gap-4">
            <Link
              href="/search?query=Accessories"
              className="border-2 border-white hover:bg-white hover:text-black text-white px-10 py-4 text-xs font-bold tracking-widest uppercase transition-all duration-300 rounded-none"
            >
              SHOP ACCESSORIES
            </Link>
            <Link
              href="/help"
              className="border-2 border-white hover:bg-white hover:text-black text-white px-10 py-4 text-xs font-bold tracking-widest uppercase transition-all duration-300 rounded-none"
            >
              DISCOVER
            </Link>
          </div>
        </div>

      </section>

      {/* 7. Massive Horizontal Products Row Slider (Accessories Catalog) */}
      <section className="w-full bg-white py-24 px-4 md:px-10 border-b border-black/5 select-none">
        <div className="w-full">
          <div className="flex justify-between items-end mb-12">
            <h2 className="text-2xl md:text-[34px] font-black tracking-tight uppercase text-black font-sans leading-none">
              ESSENTIAL COMPLEMENTS
            </h2>
            <Link 
              href="/search?query=Accessories" 
              className="text-black hover:text-stone text-[11px] font-bold uppercase tracking-widest flex items-center gap-1.5 font-sans transition-colors pb-1 border-b border-black"
            >
              <span>View All</span>
              <i className="bi bi-arrow-right"></i>
            </Link>
          </div>

          {/* Horizontal scrollbar container - enlarged cards */}
          <div className="flex gap-6 overflow-x-auto pb-8 no-scrollbar scroll-smooth snap-x snap-mandatory">
            {accessoriesProducts.map((product) => (
              <div key={product.id} className="min-w-[320px] sm:min-w-[420px] max-w-[420px] snap-start flex-shrink-0">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Modern Footwear Full Screen Campaign Banner */}
      <section className="w-full h-screen relative bg-black overflow-hidden z-20 flex items-center justify-center select-none">
        <img
          src="/images/campaigns/footwear-banner.jpeg"
          className="absolute inset-0 w-full h-full object-cover opacity-90 transition-transform duration-[6000ms] hover:scale-103 ease-out"
          style={{ objectPosition: "center 85%" }}
          alt="Modern Minimalist Footwear Campaign"
        />
        <div className="absolute inset-0 bg-black/15"></div>
        
        {/* Centered Typography Overlay */}
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white p-6 md:p-12 z-20">
          <h2 className="text-4xl md:text-6xl lg:text-[72px] font-black tracking-tighter uppercase mb-8 leading-[0.85] font-sans max-w-6xl">
            HERITAGE COURT SERIES
          </h2>
          <div className="flex gap-4">
            <Link
              href="/search?query=Footwear"
              className="border-2 border-white hover:bg-white hover:text-black text-white px-10 py-4 text-xs font-bold tracking-widest uppercase transition-all duration-300 rounded-none"
            >
              SHOP FOOTWEAR
            </Link>
            <Link
              href="/help"
              className="border-2 border-white hover:bg-white hover:text-black text-white px-10 py-4 text-xs font-bold tracking-widest uppercase transition-all duration-300 rounded-none"
            >
              DISCOVER
            </Link>
          </div>
        </div>
      </section>

      {/* 9. Massive Horizontal Products Row Slider (Footwear Catalog) */}
      <section className="w-full bg-white py-24 px-4 md:px-10 border-b border-black/5 select-none">
        <div className="w-full">
          <div className="flex justify-between items-end mb-12">
            <h2 className="text-2xl md:text-[34px] font-black tracking-tight uppercase text-black font-sans leading-none">
              THE FOOTWEAR CHAPTER
            </h2>
            <Link 
              href="/search?query=Footwear" 
              className="text-black hover:text-stone text-[11px] font-bold uppercase tracking-widest flex items-center gap-1.5 font-sans transition-colors pb-1 border-b border-black"
            >
              <span>View All</span>
              <i className="bi bi-arrow-right"></i>
            </Link>
          </div>

          {/* Horizontal scrollbar container - enlarged cards */}
          <div className="flex gap-6 overflow-x-auto pb-8 no-scrollbar scroll-smooth snap-x snap-mandatory">
            {footwearProducts.map((product) => (
              <div key={product.id} className="min-w-[320px] sm:min-w-[420px] max-w-[420px] snap-start flex-shrink-0">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. Aura Threads Chronicles Newsletter */}
      <section className="w-full bg-[#F4F4F5] py-28 px-4 md:px-10 border-t border-black/5 flex flex-col items-center select-none">
        <div className="max-w-xl mx-auto text-center space-y-6 pt-4">
          <span className="text-stone font-bold tracking-[0.25em] text-[10px] uppercase font-sans">
            Studio Archives
          </span>
          <h2 className="text-4xl font-black tracking-tight text-black font-sans uppercase">
            SUBSCRIBE TO THE JOURNAL
          </h2>
          <p className="text-[13px] text-stone leading-relaxed max-w-sm mx-auto font-sans">
            Sign up for exclusive early access to drops, studio design diaries, fabric innovations, and private archive sales.
          </p>
          
          {!subscribed ? (
            <form onSubmit={handleSubscribe} className="flex items-center relative max-w-md mx-auto pt-4 select-none">
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Enter email address"
                className="w-full bg-white border border-black/10 focus:border-black rounded-none text-xs px-4 py-3.5 pr-24 focus:outline-none transition-colors text-black"
              />
              <button 
                type="submit" 
                className="absolute right-3.5 text-black hover:text-stone font-bold text-xs uppercase tracking-wider py-1.5 focus:outline-none transition-colors cursor-pointer"
              >
                Subscribe
              </button>
            </form>
          ) : (
            <div className="border border-black/15 text-black text-xs px-5 py-4 rounded-none flex items-center gap-2.5 bg-white max-w-md mx-auto justify-center font-bold">
              <i className="bi bi-patch-check-fill text-[#0055CC]"></i>
              <span>Subscribed. Welcome to the AuraThreads Studio.</span>
            </div>
          )}
        </div>
      </section>

    </main>
  );
}
