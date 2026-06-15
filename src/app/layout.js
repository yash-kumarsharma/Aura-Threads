// src/app/layout.js
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import { AlertProvider } from "@/context/AlertContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata = {
  title: "AuraThreads | Premium Editorial Store",
  description: "Sophisticated editorial menswear, utility streetwear, and accessories.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <head>
        {/* Bootstrap Icons CDN */}
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.11.3/font/bootstrap-icons.min.css" />
        {/* Boxicons CDN */}
        <link rel="stylesheet" href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" />
        {/* Google Fonts (Inter & Fira Code) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Fira+Code:wght@400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-full flex flex-col bg-offwhite text-charcoal font-sans antialiased">
        <AuthProvider>
          <AlertProvider>
            <CartProvider>
              <Navbar />
              <div className="flex-grow">
                {children}
              </div>
              <Footer />
            </CartProvider>
          </AlertProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
