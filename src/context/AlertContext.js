// src/context/AlertContext.js
"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

const AlertContext = createContext();

export function AlertProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [options, setOptions] = useState({
    title: "Notification",
    confirmText: "OK",
    cancelText: "Cancel",
    showCancel: false,
    type: "info", // "info" | "success" | "error"
    onConfirm: null,
    onCancel: null
  });

  const showAlert = useCallback((msg, customOptions = {}) => {
    setMessage(msg);
    setOptions({
      title: customOptions.title || "Notification",
      confirmText: customOptions.confirmText || "OK",
      cancelText: customOptions.cancelText || "Cancel",
      showCancel: customOptions.showCancel || false,
      type: customOptions.type || "info",
      onConfirm: customOptions.onConfirm || null,
      onCancel: customOptions.onCancel || null
    });
    setIsOpen(true);
  }, []);

  const hideAlert = useCallback(() => {
    setIsOpen(false);
  }, []);

  // Intercept window.alert
  useEffect(() => {
    if (typeof window !== "undefined") {
      const originalAlert = window.alert;
      window.alert = (msg) => {
        let title = "Notification";
        let type = "info";
        let confirmText = "OK";
        
        const lowerMsg = (msg || "").toLowerCase();
        if (lowerMsg.includes("error") || lowerMsg.includes("invalid") || lowerMsg.includes("failed") || lowerMsg.includes("please upload") || lowerMsg.includes("please enter")) {
          type = "error";
          title = "Attention Required";
        } else if (lowerMsg.includes("success") || lowerMsg.includes("confirmed") || lowerMsg.includes("applied")) {
          type = "success";
          title = "Success";
        }
        
        showAlert(msg, { title, type, confirmText });
      };
      
      return () => {
        window.alert = originalAlert;
      };
    }
  }, [showAlert]);

  const handleConfirm = () => {
    setIsOpen(false);
    if (options.onConfirm) {
      options.onConfirm();
    }
  };

  const handleCancel = () => {
    setIsOpen(false);
    if (options.onCancel) {
      options.onCancel();
    }
  };

  return (
    <AlertContext.Provider value={{ showAlert, hideAlert }}>
      {children}
      {isOpen && (
        <div className="fixed inset-0 bg-neutral-950/60 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
          <div className="bg-white rounded-none border border-black/10 max-w-sm w-full shadow-2xl p-6 text-center animate-[fadeIn_0.2s_ease-out]">
            <div className="text-black text-4xl mb-4 flex justify-center">
              {options.type === "error" ? (
                <i className="bi bi-exclamation-octagon text-red-600"></i>
              ) : options.type === "success" ? (
                <i className="bi bi-check2-circle text-green-600"></i>
              ) : (
                <i className="bi bi-info-circle text-black"></i>
              )}
            </div>
            <h3 className="text-xs font-bold uppercase tracking-widest mb-3 font-sans text-black">
              {options.title}
            </h3>
            <p className="text-neutral-600 text-xs leading-relaxed mb-6 font-sans">
              {message}
            </p>
            <div className="flex gap-3 justify-center">
              {options.showCancel && (
                <button
                  onClick={handleCancel}
                  className="border border-black/10 hover:border-black hover:bg-neutral-50 text-black font-bold font-sans px-5 py-2.5 rounded-none text-[10px] uppercase tracking-wider transition-colors cursor-pointer"
                >
                  {options.cancelText}
                </button>
              )}
              <button
                onClick={handleConfirm}
                className="bg-black hover:bg-neutral-800 text-white font-bold font-sans px-6 py-2.5 rounded-none text-[10px] uppercase tracking-wider transition-colors cursor-pointer"
              >
                {options.confirmText}
              </button>
            </div>
          </div>
        </div>
      )}
    </AlertContext.Provider>
  );
}

export function useAlert() {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlert must be used within an AlertProvider");
  }
  return context;
}
