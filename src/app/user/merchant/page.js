// src/app/user/merchant/page.js
"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function MerchantProfilePage() {
  const {
    currentUser,
    logout,
    customInventory,
    addMerchantProduct,
    deleteMerchantProduct
  } = useAuth();
  
  const router = useRouter();

  // Redirect to base user page if session drops or they are not a merchant
  useEffect(() => {
    if (currentUser && currentUser.role !== "merchant") {
      router.replace("/user");
    }
  }, [currentUser, router]);

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
        <div className="text-stone mb-6 text-5xl">
          <i className="bi bi-lock-fill text-black/25"></i>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold mb-3 font-sans text-black uppercase tracking-wider">Access Restricted</h2>
        <p className="text-neutral-500 text-sm mb-6 max-w-sm mx-auto">Please log in with your credentials to access your user profile and merchant dashboard.</p>
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

  return (
    <main className="max-w-[1600px] mx-auto px-4 md:px-10 my-12">
      
      {showToast && (
        <div className="fixed bottom-8 right-8 bg-black border border-black/10 text-white px-6 py-4 rounded-none shadow-2xl z-[99999] flex items-center gap-3 animate-[slideIn_0.2s_ease-out]">
          <i className="bi bi-check-circle-fill text-white"></i>
          <span className="text-sm font-semibold font-sans uppercase tracking-wider">Product uploaded successfully!</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Profile Details Sidebar */}
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
                <span className="text-[10px] uppercase font-bold text-neutral-400 block mb-1.5 font-sans tracking-wider">Privileges</span>
                <span className="inline-block bg-black text-white font-bold text-[9px] uppercase tracking-widest px-2.5 py-1 rounded-none">
                  Verified Merchant
                </span>
              </div>
            </div>

            <button onClick={() => { logout(); router.push("/"); }} className="w-full border border-red-500 hover:bg-red-500 hover:text-white text-red-500 font-bold py-2.5 rounded-none text-xs transition-colors font-sans tracking-wider cursor-pointer">
              LOG OUT
            </button>
          </div>
        </div>

        {/* Upload portal */}
        <div className="md:col-span-3 space-y-8">
          <div className="bg-white border border-black/5 rounded-none p-6 sm:p-8 shadow-sm">
            <h2 className="text-lg font-bold tracking-wider uppercase border-l-2 border-black pl-3 mb-6 font-sans text-black">
              Add New Merchant Product
            </h2>

            <form onSubmit={handleUploadSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] uppercase font-bold text-neutral-500 block mb-1.5 font-sans tracking-wider">Product Name</label>
                  <input
                    type="text"
                    required
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    placeholder="e.g. Oversized Denim Shirt"
                    className="w-full border border-black/10 rounded-none px-4 py-2.5 text-xs bg-white text-black focus:border-black focus:ring-0"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase font-bold text-neutral-500 block mb-1.5 font-sans tracking-wider">Brand / Label</label>
                  <input
                    type="text"
                    required
                    value={productBrand}
                    onChange={(e) => setProductBrand(e.target.value)}
                    placeholder="e.g. Aura Select"
                    className="w-full border border-black/10 rounded-none px-4 py-2.5 text-xs bg-white text-black focus:border-black focus:ring-0"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-[10px] uppercase font-bold text-neutral-500 block mb-1.5 font-sans tracking-wider">Price (₹)</label>
                  <input
                    type="number"
                    required
                    value={productPrice}
                    onChange={(e) => setProductPrice(e.target.value)}
                    placeholder="e.g. 799"
                    className="w-full border border-black/10 rounded-none px-4 py-2.5 text-xs bg-white text-black focus:border-black focus:ring-0"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase font-bold text-neutral-500 block mb-1.5 font-sans tracking-wider">Size</label>
                  <select
                    value={productSize}
                    onChange={(e) => setProductSize(e.target.value)}
                    className="w-full border border-black/10 rounded-none px-4 py-2.5 text-xs bg-white text-black focus:border-black focus:ring-0"
                  >
                    <option value="S">Small (S)</option>
                    <option value="M">Medium (M)</option>
                    <option value="L">Large (L)</option>
                    <option value="XL">Extra Large (XL)</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] uppercase font-bold text-neutral-500 block mb-1.5 font-sans tracking-wider">Target Catalog</label>
                  <select
                    value={productGender}
                    onChange={(e) => setProductGender(e.target.value)}
                    className="w-full border border-black/10 rounded-none px-4 py-2.5 text-xs bg-white text-black focus:border-black focus:ring-0"
                  >
                    <option value="men">Men's Apparel</option>
                    <option value="women">Women's Apparel</option>
                    <option value="unisex">Unisex / Sneakers</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] uppercase font-bold text-neutral-500 block mb-1.5 font-sans tracking-wider">Category Type</label>
                  <select
                    value={productCategory}
                    onChange={(e) => setProductCategory(e.target.value)}
                    className="w-full border border-black/10 rounded-none px-4 py-2.5 text-xs bg-white text-black focus:border-black focus:ring-0"
                  >
                    <option value="T-Shirts">T-Shirts</option>
                    <option value="Shirts">Shirts</option>
                    <option value="Polos">Polos</option>
                    <option value="Hoodies">Hoodies</option>
                    <option value="Jackets">Jackets</option>
                    <option value="Jeans">Jeans</option>
                    <option value="Trousers">Trousers</option>
                    <option value="Shorts">Shorts</option>
                    <option value="Footwear">Footwear / Sneakers</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] uppercase font-bold text-neutral-500 block mb-1.5 font-sans tracking-wider">Product Image File</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full border border-black/10 rounded-none px-4 py-1.5 text-xs bg-white text-black focus:border-black focus:ring-0"
                  />
                  {previewUrl && (
                    <img
                      src={previewUrl}
                      id="imagePreview"
                      className="mt-2.5 border border-dashed border-black/10 p-1 rounded-none max-h-32 object-contain"
                      alt="Upload Preview"
                    />
                  )}
                </div>
              </div>

              <div>
                <label className="text-[10px] uppercase font-bold text-neutral-500 block mb-1.5 font-sans tracking-wider">Product Description</label>
                <textarea
                  rows="3"
                  required
                  value={productDesc}
                  onChange={(e) => setProductDesc(e.target.value)}
                  placeholder="Describe your design, fibers type, fitting details..."
                  className="w-full border border-black/10 rounded-none px-4 py-2.5 text-xs bg-white text-black focus:border-black focus:ring-0"
                />
              </div>

              <button
                type="submit"
                className="bg-black hover:bg-neutral-800 text-white font-bold font-sans px-6 py-3 rounded-none text-xs transition-colors uppercase tracking-widest cursor-pointer"
              >
                Add Product to Catalog
              </button>
            </form>
          </div>

          {/* Registered inventory list */}
          <div>
            <h3 className="font-bold text-sm uppercase tracking-wider mb-4 border-l-2 border-black pl-3 font-sans text-black">
              Your Registered Inventory
            </h3>
            
            {customInventory.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {customInventory.map((product) => (
                  <div key={product.id} className="bg-white border border-black/5 rounded-none overflow-hidden flex flex-col hover:border-black/20 hover:shadow-xl transition-all duration-300">
                    <div className="pt-[100%] bg-offwhite relative">
                      <img src={product.imageUrl} className="absolute inset-0 w-full h-full object-cover" alt={product.name} />
                    </div>
                    <div className="p-4 flex-grow flex flex-col justify-between">
                      <div>
                        <span className="text-[9px] text-neutral-400 uppercase tracking-widest font-bold block mb-1 font-sans">{product.brand}</span>
                        <h5 className="font-bold text-black text-xs line-clamp-1 mb-2 font-sans uppercase tracking-wider">{product.name}</h5>
                      </div>
                      <div className="flex justify-between items-center border-t border-black/5 pt-2 mt-2">
                        <span className="font-bold text-black text-xs font-sans">₹{product.price}</span>
                        <button
                          onClick={() => deleteMerchantProduct(product.id)}
                          className="text-neutral-400 hover:text-red-500 p-1 cursor-pointer"
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
              <div className="text-center py-10 bg-white border border-black/5 rounded-none text-neutral-400 text-xs shadow-sm">
                <i className="bi bi-inbox text-3xl mb-2 block"></i>
                <p className="font-sans uppercase tracking-wider">No active custom listings uploaded under this merchant account.</p>
              </div>
            )}
          </div>

        </div>

      </div>
    </main>
  );
}
