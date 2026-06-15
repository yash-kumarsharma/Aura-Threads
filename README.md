# 🕶️ AURA THREADS

A premium, design-studio-inspired e-commerce platform for contemporary menswear, footwear, and accessories built with Next.js, featuring a clean editorial design system.

---

## 🌟 Features

* **Role-Based Onboarding & Routing**: Dynamic profile paths separating Customers and Verified Merchants.
* **Dynamic Search & Synonym Mapping**: Multi-term search with keyword boundaries, typos matching, and synonyms.
* **Deterministic Catalog Shuffle**: Custom Linear Congruential Generator (LCG) sorting to prevent SSR hydration mismatches.
* **Responsive Layouts & Editorial Style**: Adaptive grid-structures themed under modern design studio aesthetics.
* **Dynamic Cart & Checkout Flow**: Persistent shopping cart updates, interactive counters, and custom billing models.
* **On-the-Fly Catalog Uploads**: Interactive merchant upload form for real-time local inventory updates.
* **Dynamic SVG Favicon**: Code-based, resolution-independent vector icon integrated directly into compile targets.
* **Dedicated Navigation Routes**: Specific paths (`/men`, `/accessories`, `/footwear`) linked to separate filter sidebars.

---

## 📂 Folder Structure

```
├── public/
│   ├── images/
│   │   ├── hero/               # Hero slideshow assets
│   │   ├── campaigns/          # Onboarding and split-banner visuals
│   │   ├── categories/         # Category selection cards
│   │   └── products/           # Product listings and category assets
└── src/
    ├── app/                    # Next.js App Router pages and page logic
    │   ├── layout.js           # Core layout configuration
    │   ├── page.js             # Homepage / Landing page
    │   ├── globals.css         # Styling directives and custom overrides
    │   ├── men/                # Menswear Clothing catalog
    │   ├── footwear/           # Footwear catalog and sizing filters
    │   ├── accessories/        # Accessories catalog and type filters
    │   ├── search/             # Advanced query search outcome page
    │   ├── cart/               # Checkout and order summary bag
    │   ├── login/              # User account entry portal
    │   ├── signup/             # Customer / Merchant registration
    │   ├── user/               # Dedicated Customer & Merchant dispatchers
    │   └── help/               # Support and FAQ accordion lists
    ├── components/             # Reusable UI elements (Navbar, Footer, ProductCard)
    ├── context/                # Global contexts (AuthContext, CartContext)
    └── data/                   # Database simulation (products.js catalog generation)
```

---

## 🛠️ Tech Stack

![Next.js](https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

---

## 🚀 Getting Started

To run the development server locally:

```bash
# Install dependencies
npm install

# Run the project in development mode
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

To build the project for production:

```bash
npm run build
```

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨💻 Author

**Built with ❤️ and 💻 by:**

[![Yash Kumar Sharma](https://img.shields.io/badge/GitHub-Yash%20Kumar%20Sharma-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/yash-kumarsharma)

---
