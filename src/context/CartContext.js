// src/context/CartContext.js
"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [discountPct, setDiscountPct] = useState(0);

  // Load cart on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("aura_cart");
      if (stored) {
        setCart(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to load cart", e);
    }
  }, []);

  // Sync cart to localStorage
  const saveCart = (newCart) => {
    setCart(newCart);
    try {
      localStorage.setItem("aura_cart", JSON.stringify(newCart));
    } catch (e) {
      console.error("Failed to save cart", e);
    }
  };

  const addToCart = (product, selectedSize = "M") => {
    if (!product) return;
    
    const newCart = [...cart];
    const existingIndex = newCart.findIndex(
      item => item.product.id === product.id && item.selectedSize === selectedSize
    );

    if (existingIndex > -1) {
      newCart[existingIndex].quantity += 1;
    } else {
      newCart.push({
        product: product,
        quantity: 1,
        selectedSize: selectedSize
      });
    }

    saveCart(newCart);
    showToastNotification(`${product.name} added to cart!`);
  };

  const removeFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    saveCart(newCart);
  };

  const updateQuantity = (index, qty) => {
    const newCart = [...cart];
    if (qty <= 0) {
      newCart.splice(index, 1);
    } else {
      newCart[index].quantity = qty;
    }
    saveCart(newCart);
  };

  const clearCart = () => {
    saveCart([]);
    setDiscountPct(0);
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartSubtotal = cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  const estGst = Math.round(cartSubtotal * 0.05);
  const shippingFee = (cartSubtotal > 999 || cartSubtotal === 0) ? 0 : 99;
  const discountAmount = Math.round(cartSubtotal * (discountPct / 100));
  const cartTotal = cartSubtotal + estGst + shippingFee - discountAmount;

  const showToastNotification = (message) => {
    if (typeof document === "undefined") return;
    
    let toast = document.getElementById("aura-toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "aura-toast";
      toast.className = "fixed bottom-8 right-8 bg-neutral-900 border-l-4 border-amber-500 text-neutral-100 px-6 py-4 rounded shadow-2xl z-[99999] flex items-center gap-3 font-sans transition-all duration-300 transform translate-y-20 opacity-0";
      document.body.appendChild(toast);
    }
    
    toast.innerHTML = `<i class="bi bi-bag-check-fill text-amber-500"></i> <span class="text-sm font-medium">${message}</span>`;
    
    // Animate in
    setTimeout(() => {
      toast.classList.remove("translate-y-20", "opacity-0");
    }, 50);

    // Animate out
    setTimeout(() => {
      toast.classList.add("translate-y-20", "opacity-0");
    }, 3000);
  };

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      cartCount,
      cartSubtotal,
      estGst,
      shippingFee,
      discountPct,
      setDiscountPct,
      discountAmount,
      cartTotal
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
