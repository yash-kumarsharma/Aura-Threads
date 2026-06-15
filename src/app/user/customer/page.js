// src/app/user/customer/page.js
"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function CustomerProfilePage() {
  const { currentUser, logout, updateProfile } = useAuth();
  const router = useRouter();

  const [isEditing, setIsEditing] = useState(false);
  const [nameVal, setNameVal] = useState("");
  const [locationVal, setLocationVal] = useState("");
  const [phoneVal, setPhoneVal] = useState("");
  const [address1Val, setAddress1Val] = useState("");
  const [address2Val, setAddress2Val] = useState("");

  // Redirect to base user page if session drops or they are not a customer
  useEffect(() => {
    if (currentUser && currentUser.role !== "customer") {
      router.replace("/user");
    }
  }, [currentUser, router]);

  // Populate state values from currentUser
  useEffect(() => {
    if (currentUser) {
      setNameVal(currentUser.name || "");
      setLocationVal(currentUser.location || "");
      setPhoneVal(currentUser.phone || "+91 98765-43210");
      setAddress1Val(currentUser.address1 || "Apartment 4B, Elite Tower Block C");
      setAddress2Val(currentUser.address2 || "Sector 17, Chandigarh");
    }
  }, [currentUser]);

  const handleSave = (e) => {
    e.preventDefault();
    updateProfile({
      name: nameVal.trim(),
      location: locationVal.trim(),
      phone: phoneVal.trim(),
      address1: address1Val.trim(),
      address2: address2Val.trim()
    });
    setIsEditing(false);
  };

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

  // Generate initials
  const initials = currentUser.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  // Mock Orders Data using actual catalog product details
  const mockOrders = [
    {
      id: "AT-984310",
      date: "June 12, 2026",
      status: "In Transit",
      statusColor: "text-blue-600 bg-blue-50 border-blue-100",
      total: "₹7,298",
      items: [
        { name: "Heavyweight Organic Tee", price: "₹1,499", image: "/images/products/tshirts/m1-tee.jpeg" },
        { name: "Modern Court Sneaker", price: "₹5,799", image: "/images/products/footwear/sneakers/f2-sneaker.jpeg" }
      ]
    },
    {
      id: "AT-972105",
      date: "May 28, 2026",
      status: "Delivered",
      statusColor: "text-green-600 bg-green-50 border-green-100",
      total: "₹2,499",
      items: [
        { name: "Linen Camp Collar Shirt", price: "₹2,499", image: "/images/products/shirts/m4-shirt.jpeg" }
      ]
    }
  ];

  return (
    <main className="max-w-[1600px] mx-auto px-4 md:px-10 my-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Profile Sidebar */}
        <div className="md:col-span-1">
          <div className="bg-white border border-black/5 rounded-none p-6 text-center shadow-sm">
            <div className="w-24 h-24 bg-black text-white font-bold text-2xl flex items-center justify-center mx-auto mb-4 font-sans rounded-none">
              {initials}
            </div>
            <h3 className="font-bold text-black text-base mb-1 font-sans uppercase tracking-wider">{currentUser.name}</h3>
            <p className="text-neutral-500 text-xs mb-4">{currentUser.email}</p>
            
            <hr className="border-black/5 my-4" />
            
            <div className="text-start space-y-4 mb-6">
              <div>
                <span className="text-[10px] uppercase font-bold text-neutral-400 block mb-0.5 font-sans tracking-wider">Location</span>
                <span className="text-xs font-semibold text-black">{currentUser.location || "India"}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-neutral-400 block mb-1.5 font-sans tracking-wider">Membership Level</span>
                <span className="inline-block bg-[#111111] text-white font-bold text-[9px] uppercase tracking-widest px-2.5 py-1 rounded-none border border-black/10">
                  AuraSelect Member
                </span>
              </div>
            </div>

            <button onClick={() => { logout(); router.push("/"); }} className="w-full border border-red-500 hover:bg-red-500 hover:text-white text-red-500 font-bold py-2.5 rounded-none text-xs transition-colors font-sans tracking-wider cursor-pointer">
              LOG OUT
            </button>
          </div>
        </div>

        {/* Customer Dashboard Content */}
        <div className="md:col-span-3 space-y-8">
          
          {/* Order History */}
          <div className="bg-white border border-black/5 rounded-none p-6 sm:p-8 shadow-sm">
            <h2 className="text-lg font-bold tracking-wider uppercase border-l-2 border-black pl-3 mb-6 font-sans text-black">
              Order History
            </h2>

            {mockOrders.length > 0 ? (
              <div className="space-y-6">
                {mockOrders.map((order) => (
                  <div key={order.id} className="border border-black/5 rounded-none p-5 sm:p-6 bg-white hover:border-black/25 transition-all">
                    
                    {/* Order Meta Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-black/5 mb-4">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-neutral-400 block tracking-wider">Order Reference</span>
                        <span className="text-xs font-bold text-black font-sans">{order.id}</span>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-bold text-neutral-400 block tracking-wider">Order Date</span>
                        <span className="text-xs text-black font-sans font-medium">{order.date}</span>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-bold text-neutral-400 block tracking-wider">Total Charge</span>
                        <span className="text-xs font-bold text-black font-sans">{order.total}</span>
                      </div>
                      <div>
                        <span className={`inline-block border font-bold text-[9px] uppercase tracking-widest px-2 py-0.5 rounded-none font-sans ${order.statusColor}`}>
                          {order.status}
                        </span>
                      </div>
                    </div>

                    {/* Order Items list */}
                    <div className="space-y-4">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between gap-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-neutral-100 flex-shrink-0 relative overflow-hidden border border-black/5">
                              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                            </div>
                            <div>
                              <h5 className="font-bold text-black text-xs font-sans uppercase tracking-wider">{item.name}</h5>
                              <p className="text-neutral-400 text-[10px] font-sans">Qty: 1 • Standard Size</p>
                            </div>
                          </div>
                          <span className="text-xs font-semibold text-black font-sans">{item.price}</span>
                        </div>
                      ))}
                    </div>

                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10 text-neutral-400 text-xs uppercase tracking-wider font-sans">
                <i className="bi bi-bag-x text-3xl mb-2 block text-neutral-300"></i>
                You have not placed any orders yet.
              </div>
            )}
          </div>

          {/* AuraSelect Membership Status Info */}
          <div className="bg-[#111111] text-white rounded-none p-6 sm:p-8 shadow-sm relative overflow-hidden">
            <div className="absolute right-0 bottom-0 opacity-10 translate-x-1/4 translate-y-1/4 pointer-events-none select-none">
              <i className="bi bi-gem text-[220px]"></i>
            </div>
            
            <div className="relative z-10">
              <span className="text-[10px] uppercase font-bold text-neutral-400 block mb-1 tracking-[0.2em] font-sans">AuraSelect Status</span>
              <h3 className="text-xl font-black font-sans uppercase mb-4 tracking-wider">ELITE ACTIVE MEMBERSHIP</h3>
              <p className="text-neutral-400 text-xs leading-relaxed max-w-xl mb-6 font-sans">
                Welcome to AuraSelect, our premier client services tier. Your membership status unlocks private collection previews, free priority courier dispatches worldwide, and early access to designer release drops.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-white/10 pt-6">
                <div>
                  <span className="text-[9px] uppercase font-bold text-neutral-500 block mb-0.5 tracking-wider font-sans">Priority Dispatch</span>
                  <span className="text-xs font-bold text-white uppercase tracking-wider font-sans">Always Active</span>
                </div>
                <div>
                  <span className="text-[9px] uppercase font-bold text-neutral-500 block mb-0.5 tracking-wider font-sans">Pre-Release Invites</span>
                  <span className="text-xs font-bold text-white uppercase tracking-wider font-sans">Included</span>
                </div>
                <div>
                  <span className="text-[9px] uppercase font-bold text-neutral-500 block mb-0.5 tracking-wider font-sans">Personal Concierge</span>
                  <span className="text-xs font-bold text-white uppercase tracking-wider font-sans">24/7 Access</span>
                </div>
              </div>
            </div>
          </div>

          {/* Shipping Addresses panel */}
          <div className="bg-white border border-black/5 rounded-none p-6 sm:p-8 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold tracking-wider uppercase border-l-2 border-black pl-3 font-sans text-black">
                Shipping Address
              </h2>
              {!isEditing && (
                <button 
                  onClick={() => setIsEditing(true)} 
                  className="text-[10px] text-stone hover:text-black font-bold uppercase tracking-widest transition-colors border-b border-black pb-0.5 cursor-pointer"
                >
                  Edit Details
                </button>
              )}
            </div>

            {isEditing ? (
              <form onSubmit={handleSave} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] uppercase font-bold text-neutral-500 block mb-1.5 font-sans tracking-wider">Full Name</label>
                    <input
                      type="text"
                      required
                      value={nameVal}
                      onChange={(e) => setNameVal(e.target.value)}
                      className="w-full border border-black/10 rounded-none px-4 py-2.5 text-xs bg-white text-black focus:border-black focus:ring-0"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase font-bold text-neutral-500 block mb-1.5 font-sans tracking-wider">Location / City</label>
                    <input
                      type="text"
                      required
                      value={locationVal}
                      onChange={(e) => setLocationVal(e.target.value)}
                      className="w-full border border-black/10 rounded-none px-4 py-2.5 text-xs bg-white text-black focus:border-black focus:ring-0"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] uppercase font-bold text-neutral-500 block mb-1.5 font-sans tracking-wider">Phone Number</label>
                    <input
                      type="text"
                      required
                      value={phoneVal}
                      onChange={(e) => setPhoneVal(e.target.value)}
                      className="w-full border border-black/10 rounded-none px-4 py-2.5 text-xs bg-white text-black focus:border-black focus:ring-0"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase font-bold text-neutral-500 block mb-1.5 font-sans tracking-wider">Address Line 1</label>
                    <input
                      type="text"
                      required
                      value={address1Val}
                      onChange={(e) => setAddress1Val(e.target.value)}
                      className="w-full border border-black/10 rounded-none px-4 py-2.5 text-xs bg-white text-black focus:border-black focus:ring-0"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] uppercase font-bold text-neutral-500 block mb-1.5 font-sans tracking-wider">Address Line 2 (Region / Area)</label>
                  <input
                    type="text"
                    required
                    value={address2Val}
                    onChange={(e) => setAddress2Val(e.target.value)}
                    className="w-full border border-black/10 rounded-none px-4 py-2.5 text-xs bg-white text-black focus:border-black focus:ring-0"
                  />
                </div>
                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    className="bg-black hover:bg-neutral-800 text-white font-bold font-sans px-6 py-2.5 rounded-none text-xs transition-colors uppercase tracking-widest cursor-pointer"
                  >
                    Save Details
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setNameVal(currentUser.name || "");
                      setLocationVal(currentUser.location || "");
                      setPhoneVal(currentUser.phone || "+91 98765-43210");
                      setAddress1Val(currentUser.address1 || "Apartment 4B, Elite Tower Block C");
                      setAddress2Val(currentUser.address2 || "Sector 17, Chandigarh");
                      setIsEditing(false);
                    }}
                    className="border border-black/10 hover:bg-neutral-50 text-black font-bold font-sans px-6 py-2.5 rounded-none text-xs transition-colors uppercase tracking-widest cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="border border-black/10 p-5 rounded-none w-full">
                  <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block mb-2 font-sans">Default Shipping Destination</span>
                  <h4 className="font-bold text-xs uppercase tracking-wider text-black font-sans mb-1">{currentUser.name}</h4>
                  <p className="text-neutral-500 text-xs font-sans leading-relaxed">
                    {address1Val}<br />
                    {address2Val}, {locationVal || "India"}
                  </p>
                  <p className="text-neutral-400 text-[10px] mt-3 font-sans font-medium">Contact: {phoneVal}</p>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </main>
  );
}
