# 🕶️ AURA THREADS

A premium, design-studio-inspired e-commerce platform for contemporary menswear, footwear, and accessories built with Next.js, featuring a clean editorial design system.

---

## ⚡ Core Technical Features

This project focuses on clean architecture, modern state management, and optimized user experience:

* **Role-Based Client Routing & Onboarding**: Complete separation of Customer and Merchant roles. Merchants access a dynamic design catalog form and custom inventory manager, while Customers view interactive order timelines and elite membership levels.
* **Deterministic LCG Catalog Sorting**: Custom seed-based Linear Congruential Generator (LCG) shuffle function implemented at the database level to ensure random product distribution across compiles, resolving Next.js client-to-server (SSR) rendering hydration mismatches.
* **Advanced Multi-term Search & Synonyms**: A keyword-splitting query engine featuring synonym expansion mapping (e.g., `"tshirt"` matching `"T-Shirts"`) and strict word-boundary checks to prevent false substring collisions.
* **SVG Vector Favicon Integration**: Optimized lightweight vector `icon.svg` served as a static dynamic asset, keeping the git repository binary-free and responsive at all resolutions.
* **Responsive Architecture**: Fully containerized custom grid designs built with React hooks, local storage sync listeners, and clean transition states.

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
