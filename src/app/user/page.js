// src/app/user/page.js
"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function UserProfilePage() {
  const {
    currentUser,
    logout,
    customInventory,
    addMerchantProduct,
    deleteMerchantProduct
  } = useAuth();

  // New product form states
  const [productName, setProductName] = useState("");
  const [productBrand, setProductBrand] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productSize, setProductSize] = useState("M");
  const [productGender, setProductGender] = useState("men");
  const [productCategory, setProductCategory] = useState("Shirts");
  const [productDesc, setProductDesc] = useState("");
  
  const [previewUrl, setPreviewUrl] = useState("");
  const [showToast, setShowToast] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadSubmit = (e) => {
    e.preventDefault();
    if (!previewUrl) {
      alert("Please upload a product image.");
      return;
    }

    const newProduct = {
      id: "custom_" + Date.now(),
      name: productName.trim(),
      brand: productBrand.trim(),
      price: parseInt(productPrice),
      size: productSize,
      gender: productGender,
      category: productCategory,
      imageUrl: previewUrl, // Base64 encoding
      description: productDesc.trim()
    };

    addMerchantProduct(newProduct);
    setShowToast(true);

    // Clear form
    setProductName("");
    setProductBrand("");
    setProductPrice("");
    setProductSize("M");
    setProductGender("men");
    setProductCategory("Shirts");
    setProductDesc("");
    setPreviewUrl("");

    // Hide success alert after 3 seconds
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  if (!currentUser) {
    return (
      <main className="max-w-7xl mx-auto px-6 py-24 text-center">
        <div className="text-neutral-400 mb-6 text-5xl">
          <i className="bi bi-lock-fill text-charcoal/25"></i>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold mb-3 font-display text-charcoal uppercase tracking-wider">Access Restricted</h2>
        <p className="text-neutral-500 text-sm mb-6 max-w-sm mx-auto">Please log in with your credentials to access your user profile and merchant dashboard.</p>
        <a href="/login" className="inline-block bg-charcoal hover:bg-charcoal/80 text-white font-bold px-8 py-3 rounded-full text-xs transition-colors font-display uppercase tracking-widest">
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

  return (
    <main className="max-w-7xl mx-auto px-6 my-12">
      
      {showToast && (
        <div className="fixed bottom-8 right-8 bg-charcoal border border-sand text-neutral-100 px-6 py-4 rounded-full shadow-2xl z-[99999] flex items-center gap-3 animate-slide-in">
          <i className="bi bi-check-circle-fill text-white"></i>
          <span className="text-sm font-semibold font-display uppercase tracking-wider">Product uploaded successfully!</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Profile Details Sidebar */}
        <div className="md:col-span-1">
          <div className="bg-white border border-sand/40 rounded-3xl p-6 text-center shadow-sm">
            <div className="w-24 h-24 rounded-full bg-charcoal text-offwhite font-bold text-2xl flex items-center justify-center mx-auto mb-4 font-display">
              {initials}
            </div>
            <h3 className="font-bold text-charcoal text-base mb-1 font-display uppercase tracking-wider">{currentUser.name}</h3>
            <p className="text-neutral-500 text-xs mb-4">{currentUser.email}</p>
            
            <hr className="border-sand/20 my-4" />
            
            <div className="text-start space-y-4 mb-6">
              <div>
                <span className="text-[10px] uppercase font-bold text-neutral-400 block mb-0.5 font-display tracking-wider">Location</span>
                <span className="text-xs font-semibold text-charcoal">{currentUser.location || "India"}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-neutral-400 block mb-1 font-display tracking-wider">Privileges</span>
                <span className="inline-block bg-charcoal text-offwhite font-bold text-[9px] uppercase tracking-widest px-2.5 py-1 rounded-full">
                  Verified Merchant
                </span>
              </div>
            </div>

            <button onClick={logout} className="w-full border border-red-500 hover:bg-red-500 hover:text-white text-red-500 font-bold py-2.5 rounded-full text-xs transition-colors font-display tracking-wider">
              LOG OUT
            </button>
          </div>
        </div>

        {/* Upload portal */}
        <div className="md:col-span-3 space-y-8">
          <div className="bg-white border border-sand/40 rounded-3xl p-6 sm:p-8 shadow-sm">
            <h2 className="text-lg font-bold tracking-wider uppercase border-l-2 border-charcoal pl-3 mb-6 font-display text-charcoal">
              Add New Merchant Product
            </h2>

            <form onSubmit={handleUploadSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] uppercase font-bold text-neutral-500 block mb-1.5 font-display tracking-wider">Product Name</label>
                  <input
                    type="text"
                    required
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    placeholder="e.g. Oversized Denim Shirt"
                    className="w-full border border-sand rounded-full px-4 py-2.5 text-xs bg-white text-charcoal focus:border-charcoal focus:ring-0"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase font-bold text-neutral-500 block mb-1.5 font-display tracking-wider">Brand / Label</label>
                  <input
                    type="text"
                    required
                    value={productBrand}
                    onChange={(e) => setProductBrand(e.target.value)}
                    placeholder="e.g. Aura Select"
                    className="w-full border border-sand rounded-full px-4 py-2.5 text-xs bg-white text-charcoal focus:border-charcoal focus:ring-0"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-[10px] uppercase font-bold text-neutral-500 block mb-1.5 font-display tracking-wider">Price (₹)</label>
                  <input
                    type="number"
                    required
                    value={productPrice}
                    onChange={(e) => setProductPrice(e.target.value)}
                    placeholder="e.g. 799"
                    className="w-full border border-sand rounded-full px-4 py-2.5 text-xs bg-white text-charcoal focus:border-charcoal focus:ring-0"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase font-bold text-neutral-500 block mb-1.5 font-display tracking-wider">Size</label>
                  <select
                    value={productSize}
                    onChange={(e) => setProductSize(e.target.value)}
                    className="w-full border border-sand rounded-full px-4 py-2.5 text-xs bg-white text-charcoal focus:border-charcoal focus:ring-0"
                  >
                    <option value="S">Small (S)</option>
                    <option value="M">Medium (M)</option>
                    <option value="L">Large (L)</option>
                    <option value="XL">Extra Large (XL)</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] uppercase font-bold text-neutral-500 block mb-1.5 font-display tracking-wider">Target Catalog</label>
                  <select
                    value={productGender}
                    onChange={(e) => setProductGender(e.target.value)}
                    className="w-full border border-sand rounded-full px-4 py-2.5 text-xs bg-white text-charcoal focus:border-charcoal focus:ring-0"
                  >
                    <option value="men">Men's Apparel</option>
                    <option value="women">Women's Apparel</option>
                    <option value="unisex">Unisex / Sneakers</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] uppercase font-bold text-neutral-500 block mb-1.5 font-display tracking-wider">Category Type</label>
                  <select
                    value={productCategory}
                    onChange={(e) => setProductCategory(e.target.value)}
                    className="w-full border border-sand rounded-full px-4 py-2.5 text-xs bg-white text-charcoal focus:border-charcoal focus:ring-0"
                  >
                    <option value="Shirts">Shirts</option>
                    <option value="shorts">Shorts</option>
                    <option value="T-shirts">T-Shirts</option>
                    <option value="Trousers">Trousers</option>
                    <option value="Footwear">Footwear / Sneakers</option>
                    <option value="hood">Hoodies</option>
                    <option value="Jeans">Jeans</option>
                    <option value="sweater">Sweatshirts</option>
                    <option value="Covers">Mobile Covers</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] uppercase font-bold text-neutral-500 block mb-1.5 font-display tracking-wider">Product Image File</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full border border-sand rounded-full px-4 py-1.5 text-xs bg-white text-charcoal focus:border-charcoal focus:ring-0"
                  />
                  {previewUrl && (
                    <img
                      src={previewUrl}
                      id="imagePreview"
                      className="mt-2.5 border border-dashed border-sand p-1 rounded-2xl max-h-32 object-contain"
                      alt="Upload Preview"
                    />
                  )}
                </div>
              </div>

              <div>
                <label className="text-[10px] uppercase font-bold text-neutral-500 block mb-1.5 font-display tracking-wider">Product Description</label>
                <textarea
                  rows="3"
                  required
                  value={productDesc}
                  onChange={(e) => setProductDesc(e.target.value)}
                  placeholder="Describe your design, fibers type, fitting details..."
                  className="w-full border border-sand rounded-2xl px-4 py-2.5 text-xs bg-white text-charcoal focus:border-charcoal focus:ring-0"
                />
              </div>

              <button
                type="submit"
                className="bg-charcoal hover:bg-charcoal/80 text-white font-bold font-display px-6 py-3 rounded-full text-xs transition-colors uppercase tracking-widest"
              >
                Add Product to Catalog
              </button>
            </form>
          </div>

          {/* Registered inventory list */}
          <div>
            <h3 className="font-bold text-sm uppercase tracking-wider mb-4 border-l-2 border-charcoal pl-3 font-display text-charcoal">
              Your Registered Inventory
            </h3>
            
            {customInventory.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {customInventory.map((product) => (
                  <div key={product.id} className="bg-white border border-sand/40 rounded-3xl overflow-hidden flex flex-col hover:border-charcoal/20 hover:shadow-xl transition-all duration-300">
                    <div className="pt-[100%] bg-offwhite relative">
                      <img src={product.imageUrl} className="absolute inset-0 w-full h-full object-cover" alt={product.name} />
                    </div>
                    <div className="p-4 flex-grow flex flex-col justify-between">
                      <div>
                        <span className="text-[9px] text-neutral-400 uppercase tracking-widest font-bold block mb-1 font-display">{product.brand}</span>
                        <h5 className="font-bold text-charcoal text-xs line-clamp-1 mb-2 font-display uppercase tracking-wider">{product.name}</h5>
                      </div>
                      <div className="flex justify-between items-center border-t border-sand/20 pt-2 mt-2">
                        <span className="font-bold text-charcoal text-xs font-display">₹{product.price}</span>
                        <button
                          onClick={() => deleteMerchantProduct(product.id)}
                          className="text-neutral-400 hover:text-red-500 p-1"
                          title="Delete product"
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10 bg-white border border-sand/40 rounded-3xl text-neutral-400 text-xs shadow-sm">
                <i className="bi bi-inbox text-3xl mb-2 block"></i>
                <p className="font-display uppercase tracking-wider">No active custom listings uploaded under this merchant account.</p>
              </div>
            )}
          </div>

        </div>

      </div>
    </main>
  );
}
