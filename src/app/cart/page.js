// src/app/cart/page.js
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useAlert } from "@/context/AlertContext";

export default function CartPage() {
  const router = useRouter();
  const { currentUser } = useAuth();
  const { showAlert } = useAlert();
  const {
    cart,
    updateQuantity,
    removeFromCart,
    clearCart,
    cartCount,
    cartSubtotal,
    estGst,
    shippingFee,
    discountPct,
    setDiscountPct,
    discountAmount,
    cartTotal
  } = useCart();

  const [promoCode, setPromoCode] = useState("");
  const [promoFeedback, setPromoFeedback] = useState("");
  const [showCheckout, setShowCheckout] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  // Checkout Form States
  const [shipName, setShipName] = useState("");
  const [shipAddr, setShipAddr] = useState("");
  const [shipCity, setShipCity] = useState("");
  const [shipZip, setShipZip] = useState("");

  // Pre-fill user name if logged in
  useEffect(() => {
    if (currentUser) {
      setShipName(currentUser.name);
    }
  }, [currentUser]);

  const handleApplyPromo = (e) => {
    e.preventDefault();
    const code = promoCode.trim().toUpperCase();
    if (code === "AURA20") {
      setDiscountPct(20);
      setPromoFeedback({ success: true, text: "Promo code AURA20 (20%) applied successfully!" });
    } else if (code) {
      setDiscountPct(0);
      setPromoFeedback({ success: false, text: "Invalid promo code." });
    } else {
      setDiscountPct(0);
      setPromoFeedback("");
    }
  };

  const handleCheckoutClick = () => {
    if (!currentUser) {
      showAlert("Please log in to continue to checkout.", {
        title: "Authentication Required",
        confirmText: "Log In",
        showCancel: true,
        onConfirm: () => router.push("/login"),
        type: "error"
      });
      return;
    }
    setShowCheckout(true);
  };

  const handleConfirmOrder = (e) => {
    e.preventDefault();
    setShowCheckout(false);
    setShowSuccess(true);
  };

  const finishCheckout = () => {
    setShowSuccess(false);
    clearCart();
    router.push("/");
  };

  if (cart.length === 0) {
    return (
      <main className="max-w-7xl mx-auto px-6 py-24 text-center">
        <div className="text-neutral-400 mb-6" style={{ fontSize: "5rem" }}>
          <i className="bi bi-cart-x text-black/25"></i>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold mb-3 font-sans text-black uppercase tracking-wider">Your Shopping Bag is Empty</h2>
        <p className="text-neutral-500 text-sm mb-6 max-w-md mx-auto">Fill it with premium products from our collections and discover custom designer listings.</p>
        <Link href="/" className="inline-block bg-black hover:bg-neutral-800 text-white font-bold px-8 py-3 rounded-none text-xs transition-colors font-sans uppercase tracking-widest">
          Shop Collections
        </Link>
      </main>
    );
  }

  return (
    <main className="max-w-[1600px] mx-auto px-4 md:px-10 my-10">
      <h1 className="text-2xl font-black font-sans mb-6 tracking-wider uppercase text-black">YOUR SHOPPING BAG</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Side Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item, index) => (
            <div key={`${item.product.id}-${item.selectedSize}`} className="bg-white border border-black/5 rounded-none p-5 flex gap-4 sm:gap-6 items-center hover:border-black/20 hover:shadow-xl transition-all duration-300">
              <img
                src={item.product.imageUrl}
                alt={item.product.name}
                className="w-20 h-28 sm:w-24 sm:h-32 object-cover rounded-none bg-[#F4F4F5] shrink-0 border border-black/5"
              />
              <div className="flex-grow">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-stone font-bold text-[9px] uppercase tracking-widest block mb-1 font-sans">{item.product.brand}</span>
                    <h5 className="font-bold text-black text-sm sm:text-base mb-1 line-clamp-2 font-sans uppercase tracking-wider">{item.product.name}</h5>
                    <span className="inline-block bg-[#F4F4F5] text-black border border-black/5 text-[9px] font-bold px-2.5 py-1 rounded-none uppercase tracking-wider font-sans">
                      Size: {item.selectedSize}
                    </span>
                  </div>
                  <button
                    onClick={() => removeFromCart(index)}
                    className="text-neutral-400 hover:text-red-500 p-1.5 transition-colors cursor-pointer"
                    title="Remove item"
                  >
                    <i className="bi bi-trash text-lg"></i>
                  </button>
                </div>

                <div className="flex justify-between items-center mt-4 pt-2.5 border-t border-black/5">
                  {/* Qty selectors */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-neutral-400 font-medium font-sans uppercase tracking-wider">Qty:</span>
                    <button
                      onClick={() => updateQuantity(index, item.quantity - 1)}
                      className="border border-black/10 hover:border-black bg-white w-7 h-7 text-xs font-bold rounded-none flex items-center justify-center transition-colors cursor-pointer"
                    >
                      -
                    </button>
                    <span className="mx-1.5 font-bold font-mono text-xs text-black">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(index, item.quantity + 1)}
                      className="border border-black/10 hover:border-black bg-white w-7 h-7 text-xs font-bold rounded-none flex items-center justify-center transition-colors cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                  <span className="font-bold text-black text-sm font-sans">
                    ₹{item.product.price * item.quantity}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Side summary */}
        <div>
          <div className="bg-white border border-black/5 rounded-none p-6 sticky top-28 shadow-sm">
            <h4 className="font-bold text-sm uppercase tracking-wider mb-5 font-sans text-black">Order Summary</h4>

            {/* Promo code form */}
            <form onSubmit={handleApplyPromo} className="mb-6">
              <label className="text-[10px] uppercase font-bold text-neutral-500 block mb-2 font-sans tracking-widest">Apply Promo Code</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Try AURA20"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="w-full bg-[#F4F4F5] border border-black/10 rounded-none text-xs px-3.5 py-2.5 focus:outline-none focus:border-black text-black"
                />
                <button type="submit" className="bg-black hover:bg-neutral-800 text-white font-bold px-5 py-2.5 text-xs rounded-none transition-colors shrink-0 font-sans uppercase tracking-wider cursor-pointer">
                  Apply
                </button>
              </div>
              {promoFeedback && (
                <div className={`text-[10px] font-bold mt-2 flex items-center gap-1 ${promoFeedback.success ? "text-green-600" : "text-red-500"}`}>
                  <i className={`bi ${promoFeedback.success ? "bi-check-circle-fill" : "bi-x-circle-fill"}`}></i>
                  <span>{promoFeedback.text}</span>
                </div>
              )}
            </form>

            <div className="space-y-3.5 text-xs text-neutral-600 border-b border-black/5 pb-5 mb-5 font-sans">
              <div className="flex justify-between">
                <span>Bag Total</span>
                <span className="text-black font-medium font-mono">₹{cartSubtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated GST (5%)</span>
                <span className="text-black font-medium font-mono">₹{estGst}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span className="text-black font-medium font-mono">{shippingFee === 0 ? "FREE" : `₹${shippingFee}`}</span>
              </div>
              {discountPct > 0 && (
                <div className="flex justify-between text-green-600 font-bold">
                  <span>Discount (AURA20 - 20%)</span>
                  <span className="font-mono">-₹{discountAmount}</span>
                </div>
              )}
            </div>

            <div className="flex justify-between items-center mb-6">
              <span className="font-bold text-sm uppercase tracking-wider text-black font-sans">Grand Total</span>
              <span className="font-black text-xl text-black font-sans">₹{cartTotal}</span>
            </div>

            <button
              onClick={handleCheckoutClick}
              className="w-full bg-black hover:bg-neutral-800 text-white font-bold font-sans py-3.5 rounded-none transition-all duration-300 text-xs uppercase tracking-widest cursor-pointer"
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>

      </div>

      {/* Checkout Dialog Overlay Modal */}
      {showCheckout && (
        <div className="fixed inset-0 bg-neutral-950/60 backdrop-blur-sm z-[2000] flex items-center justify-center p-4">
          <div className="bg-white rounded-none overflow-hidden border border-black/5 max-w-md w-full shadow-2xl animate-[fadeIn_0.2s_ease-out]">
            <div className="bg-black text-white px-6 py-4 flex justify-between items-center border-b border-black/10">
              <h5 className="font-bold text-xs uppercase tracking-widest font-sans text-white">AURA THREADS Checkout</h5>
              <button onClick={() => setShowCheckout(false)} className="text-white hover:text-neutral-300 transition-colors cursor-pointer">
                <i className="bi bi-x-lg"></i>
              </button>
            </div>
            <form onSubmit={handleConfirmOrder} className="p-6">
              <h6 className="font-bold text-xs uppercase tracking-wider mb-4 border-b border-black/5 pb-1 text-black font-sans">Shipping Address</h6>
              <div className="mb-3">
                <label className="text-[10px] uppercase font-bold text-neutral-500 block mb-1.5 font-sans tracking-wider">Full Name</label>
                <input
                  type="text"
                  required
                  value={shipName}
                  onChange={(e) => setShipName(e.target.value)}
                  className="w-full border border-black/10 rounded-none px-4 py-2.5 text-xs bg-white text-black focus:border-black focus:ring-0"
                />
              </div>
              <div className="mb-3">
                <label className="text-[10px] uppercase font-bold text-neutral-500 block mb-1.5 font-sans tracking-wider">Street Address</label>
                <input
                  type="text"
                  required
                  value={shipAddr}
                  onChange={(e) => setShipAddr(e.target.value)}
                  className="w-full border border-black/10 rounded-none px-4 py-2.5 text-xs bg-white text-black focus:border-black focus:ring-0"
                />
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="text-[10px] uppercase font-bold text-neutral-500 block mb-1.5 font-sans tracking-wider">City</label>
                  <input
                    type="text"
                    required
                    value={shipCity}
                    onChange={(e) => setShipCity(e.target.value)}
                    className="w-full border border-black/10 rounded-none px-4 py-2.5 text-xs bg-white text-black focus:border-black focus:ring-0"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase font-bold text-neutral-500 block mb-1.5 font-sans tracking-wider">PIN / Zip Code</label>
                  <input
                    type="text"
                    required
                    value={shipZip}
                    onChange={(e) => setShipZip(e.target.value)}
                    className="w-full border border-black/10 rounded-none px-4 py-2.5 text-xs bg-white text-black focus:border-black focus:ring-0"
                  />
                </div>
              </div>

              <hr className="my-4 border-black/5" />

              <h6 className="font-bold text-xs uppercase tracking-wider mb-3 text-black font-sans">Simulated Payment</h6>
              <div className="flex items-center gap-2 mb-6">
                <input type="radio" id="codOpt" defaultChecked className="accent-black" />
                <label htmlFor="codOpt" className="text-xs text-black cursor-pointer font-sans">
                  Cash on Delivery (COD) / Pay on Delivery
                </label>
              </div>

              <button type="submit" className="w-full bg-black hover:bg-neutral-800 text-white font-bold font-sans py-3.5 rounded-none text-xs transition-colors uppercase tracking-widest cursor-pointer">
                CONFIRM ORDER
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 bg-neutral-950/60 backdrop-blur-sm z-[2000] flex items-center justify-center p-4">
          <div className="bg-white rounded-none p-8 max-w-sm w-full text-center shadow-2xl border border-black/5 animate-[fadeIn_0.2s_ease-out]">
            <div className="text-black text-5xl mb-4">
              <i className="bi bi-check2-circle"></i>
            </div>
            <h3 className="text-lg font-bold uppercase tracking-wider mb-2 font-sans text-black">Order Confirmed!</h3>
            <p className="text-neutral-500 text-xs leading-relaxed mb-6 font-sans">Your order has been placed successfully. A delivery concierge associate will contact you shortly.</p>
            <button
              onClick={finishCheckout}
              className="bg-black hover:bg-neutral-800 text-white font-bold font-sans px-8 py-3 rounded-none text-xs transition-colors uppercase tracking-widest cursor-pointer"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      )}

    </main>
  );
}
