// src/app/help/page.js
"use client";

import { useState } from "react";

export default function HelpFAQPage() {
  const [activeFaq, setActiveFaq] = useState(0);
  
  // Concierge Form States
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMsg, setContactMsg] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSupportSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    
    // Clear form
    setContactName("");
    setContactEmail("");
    setContactMsg("");
    
    setTimeout(() => {
      setSubmitted(false);
    }, 4000);
  };

  const faqs = [
    {
      q: "How do I track my Aura Threads shipment?",
      a: "Once an order is confirmed, you can use the track order link located in the utility topbar and the website footer which routes to our partner tracking portal. You will receive SMS alerts with a tracking link upon parcel dispatch."
    },
    {
      q: "What is the returns and exchange policy?",
      a: "We offer a hassle-free 15-day return and exchange policy on all unworn items with tags intact. You can initiate a return request from your order status panel. Pickups are generally arranged within 48 working hours."
    },
    {
      q: "How can I list products as a seller on Aura Threads?",
      a: "Once logged in, navigate to your Profile page. Under the 'Add New Merchant Product' card, you can fill in details, upload item photographs, and save. The product will immediately become searchable and browseable in the public menus!"
    },
    {
      q: "What is the AuraSelect loyalty membership?",
      a: "AuraSelect is our loyalty membership system. Members get access to lower exclusive pricing on all catalogue items, early product drops, and free delivery on all shipments without minimum cart value thresholds."
    }
  ];

  return (
    <main className="max-w-[1600px] mx-auto px-4 md:px-10 my-12 py-2">
      <div className="text-center mb-12">
        <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-[0.25em] font-sans">Aura Threads Support</span>
        <h1 className="text-2xl sm:text-3xl font-black font-sans mb-2 uppercase text-black tracking-wider mt-1">Help Center</h1>
        <p className="text-neutral-500 text-sm max-w-lg mx-auto leading-relaxed">Find answers to frequently asked questions or get in touch with our concierge team.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* FAQs Accordion */}
        <div className="md:col-span-7 space-y-4">
          <h3 className="font-bold text-sm uppercase tracking-wider mb-5 border-l-2 border-black pl-3 font-sans text-black">
            Frequently Asked Questions
          </h3>

          {faqs.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div key={idx} className="bg-white border border-black/5 rounded-none overflow-hidden transition-all duration-300">
                <button
                  onClick={() => setActiveFaq(isOpen ? null : idx)}
                  className="w-full text-start px-5 py-4.5 font-bold text-xs sm:text-sm text-black flex justify-between items-center transition-colors focus:outline-none select-none hover:bg-[#F4F4F5] cursor-pointer"
                >
                  <span className={isOpen ? "text-black font-bold font-sans uppercase tracking-wide" : "font-sans uppercase tracking-wide"}>{faq.q}</span>
                  <i className={`bi ${isOpen ? "bi-chevron-up text-black" : "bi-chevron-down text-neutral-400"}`}></i>
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-neutral-500 text-xs leading-relaxed animate-fade-in border-t border-black/5 pt-3.5 font-sans">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Contact Concierge Card */}
        <div className="md:col-span-5">
          <div className="bg-white border border-black/5 rounded-none p-6 sm:p-8 shadow-sm">
            <h3 className="font-bold text-sm uppercase tracking-wider mb-2 border-l-2 border-black pl-3 font-sans text-black">
              Contact Concierge
            </h3>
            <p className="text-neutral-500 text-xs mb-6 leading-relaxed">Send us a direct message and our support team will get back to you within 12 hours.</p>

            {submitted && (
              <div className="bg-neutral-50 border border-black/5 text-black text-xs p-3 rounded-none mb-4 flex items-center gap-2 font-medium justify-center">
                <i className="bi bi-patch-check-fill text-black"></i>
                <span>Thank you! Message received successfully.</span>
              </div>
            )}

            <form onSubmit={handleSupportSubmit} className="space-y-4">
              <div>
                <label className="text-[10px] uppercase font-bold text-neutral-500 block mb-1.5 font-sans tracking-wider">Your Name</label>
                <input
                  type="text"
                  required
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  placeholder="e.g. Yash Sharma"
                  className="w-full border border-black/10 rounded-none px-4 py-2.5 text-xs bg-white text-black focus:border-black focus:ring-0"
                />
              </div>
              <div>
                <label className="text-[10px] uppercase font-bold text-neutral-500 block mb-1.5 font-sans tracking-wider">Email Address</label>
                <input
                  type="email"
                  required
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  placeholder="yash@gmail.com"
                  className="w-full border border-black/10 rounded-none px-4 py-2.5 text-xs bg-white text-black focus:border-black focus:ring-0"
                />
              </div>
              <div>
                <label className="text-[10px] uppercase font-bold text-neutral-500 block mb-1.5 font-sans tracking-wider">Message</label>
                <textarea
                  rows="4"
                  required
                  value={contactMsg}
                  onChange={(e) => setContactMsg(e.target.value)}
                  placeholder="Describe your question or transaction issues in detail..."
                  className="w-full border border-black/10 rounded-none px-4 py-2.5 text-xs bg-white text-black focus:border-black focus:ring-0"
                />
              </div>
              <button type="submit" className="w-full bg-black hover:bg-neutral-800 text-white font-bold font-sans py-3 rounded-none text-xs transition-colors uppercase tracking-widest cursor-pointer">
                SEND MESSAGE
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
