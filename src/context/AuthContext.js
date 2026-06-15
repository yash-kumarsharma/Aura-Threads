// src/context/AuthContext.js
"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

const DEFAULT_USERS = [
  { email: "yash@gmail.com", password: "12345678", name: "Yash Sharma", location: "Chandigarh, India", role: "merchant" },
  { email: "prabh@gmail.com", password: "password", name: "Prabh Singh", location: "Delhi, India", role: "customer" },
  { email: "abc@gmail.com", password: "pass1234", name: "ABC Admin", location: "Mumbai, India", role: "customer" }
];

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [customInventory, setCustomInventory] = useState([]);

  // Load state on mount
  useEffect(() => {
    try {
      // Load registered users
      const storedUsers = localStorage.getItem("aura_users");
      if (storedUsers) {
        const parsed = JSON.parse(storedUsers);
        // Migrate legacy user list without role attribute
        const migrated = parsed.map(u => ({
          ...u,
          role: u.role || (u.email.toLowerCase() === "yash@gmail.com" ? "merchant" : "customer")
        }));
        setUsers(migrated);
        localStorage.setItem("aura_users", JSON.stringify(migrated));
      } else {
        setUsers(DEFAULT_USERS);
        localStorage.setItem("aura_users", JSON.stringify(DEFAULT_USERS));
      }

      // Load active session
      const activeSession = localStorage.getItem("aura_logged_in_user");
      if (activeSession) {
        setCurrentUser(JSON.parse(activeSession));
      }

      // Load custom inventory uploads
      const storedInventory = localStorage.getItem("uploadedProducts");
      if (storedInventory) {
        setCustomInventory(JSON.parse(storedInventory));
      }
    } catch (e) {
      console.error("Auth context load failure", e);
    }
  }, []);

  const login = (email, password) => {
    const foundUser = users.find(
      u => u.email.toLowerCase() === email.trim().toLowerCase() && u.password === password
    );

    if (foundUser) {
      setCurrentUser(foundUser);
      localStorage.setItem("aura_logged_in_user", JSON.stringify(foundUser));
      return { success: true };
    }
    return { success: false, message: "Invalid credentials. Try yash@gmail.com / 12345678" };
  };

  const register = (name, email, password, location, role = "customer") => {
    if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
      return { success: false, message: "Email is already registered." };
    }

    const newUser = { name, email, password, location: location || "India", role };
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem("aura_users", JSON.stringify(updatedUsers));
    return { success: true };
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("aura_logged_in_user");
  };

  const addMerchantProduct = (product) => {
    const updatedInventory = [...customInventory, product];
    setCustomInventory(updatedInventory);
    localStorage.setItem("uploadedProducts", JSON.stringify(updatedInventory));
    
    // Dispatch event to force other component listeners to update
    window.dispatchEvent(new Event("productsUpdated"));
  };

  const deleteMerchantProduct = (id) => {
    const updatedInventory = customInventory.filter(p => p.id !== id);
    setCustomInventory(updatedInventory);
    localStorage.setItem("uploadedProducts", JSON.stringify(updatedInventory));
    
    window.dispatchEvent(new Event("productsUpdated"));
  };

  const updateProfile = (updatedDetails) => {
    if (!currentUser) return;
    const updatedUser = { ...currentUser, ...updatedDetails };
    setCurrentUser(updatedUser);
    localStorage.setItem("aura_logged_in_user", JSON.stringify(updatedUser));
    
    const updatedUsers = users.map(u => 
      u.email.toLowerCase() === currentUser.email.toLowerCase() ? updatedUser : u
    );
    setUsers(updatedUsers);
    localStorage.setItem("aura_users", JSON.stringify(updatedUsers));
  };

  return (
    <AuthContext.Provider value={{
      currentUser,
      users,
      customInventory,
      login,
      register,
      logout,
      addMerchantProduct,
      deleteMerchantProduct,
      updateProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
