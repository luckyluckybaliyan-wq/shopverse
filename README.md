# 🛒 ShopVerse - Full-Stack E-Commerce Platform

A Flipkart/Amazon-style online shopping website built with **React, TypeScript, Tailwind CSS, Node.js and Express**. It has product browsing with many different product images, search, filters, a shopping cart, wishlist, JWT login, checkout and order history. A separate **pure HTML/CSS/JavaScript** version is included in `static-demo/`.

![Stack](https://img.shields.io/badge/React-18-61dafb) ![TS](https://img.shields.io/badge/TypeScript-5-3178c6) ![Tailwind](https://img.shields.io/badge/Tailwind-3-38bdf8) ![Node](https://img.shields.io/badge/Node-20-339933) ![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Features
- **Home page** with auto-sliding banner carousel, category strip and product rows (Best Deals, Top Rated, Mobiles, Fashion, Home & Kitchen, Books)
- **26 products across 10 categories**, each with 4 different gallery images
- **Search, category filter, price-range filter, sorting and pagination**
- **Product detail page** with image gallery, discount, stock status, specifications, quantity selector and similar products
- **Cart** with quantity update, remove, savings summary and free-delivery logic (persisted in localStorage)
- **Wishlist** (heart icon on every product)
- **Authentication** - register/login with JWT and bcrypt-hashed passwords; protected routes
- **Checkout** with address validation and payment options (COD / UPI / Card, demo only)
- **Order history** per user; totals are recalculated on the server to prevent price tampering
- Responsive layout (mobile, tablet, desktop)
- **GitHub Actions CI** that builds client and server on every push

## 🧰 Tech Stack
| Layer | Technology |
|---|---|
| Frontend | React 18, TypeScript, Vite, React Router, Tailwind CSS, Context API |
| Backend | Node.js, Express, TypeScript, JWT, bcryptjs |
| Storage | JSON file store (swappable for MongoDB/PostgreSQL) |
| Lite version | HTML5, CSS3, vanilla JavaScript |
| DevOps | GitHub Actions |

## 📁 Folder Structure
```
shopverse/
├── client/                 # React + TypeScript + Tailwind frontend
│   ├── src/
│   │   ├── api/            # typed fetch client
│   │   ├── components/     # Navbar, HeroCarousel, ProductCard, Footer...
│   │   ├── context/        # Auth, Cart, Wishlist providers
│   │   ├── pages/          # Home, Products, ProductDetail, Cart, Checkout...
│   │   ├── types/          # shared TypeScript interfaces
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── tailwind.config.js
│   └── vite.config.ts
├── server/                 # Express + TypeScript REST API
│   └── src/
│       ├── data/           # product catalogue
│       ├── middleware/     # JWT auth
│       ├── routes/         # products, auth, orders
│       ├── db.ts
│       └── index.ts
├── static-demo/            # Plain HTML + CSS + JavaScript storefront
├── docs/                   # API.md, ARCHITECTURE.md
├── .github/workflows/      # CI pipeline
└── package.json            # root scripts
```

## 🚀 Getting Started
**Prerequisites:** Node.js 18+ and npm.

```bash
# 1. Clone
git clone https://github.com/<your-username>/shopverse.git
cd shopverse

# 2. Install everything (root + client + server)
npm run install:all

# 3. Configure environment
cp server/.env.example server/.env

# 4. Start frontend (http://localhost:5173) and backend (http://localhost:5000)
npm run dev
```

Open **http://localhost:5173**, create an account and place an order.

To try the plain HTML/CSS/JS version, just open `static-demo/index.html` in a browser.

### Production build
```bash
npm run build
cd server && npm start
```

## 🔌 API Overview
| Endpoint | Description |
|---|---|
| `GET /api/products` | Search, filter, sort, paginate |
| `GET /api/products/:id` | Product + related items |
| `POST /api/auth/register`, `/login` | Authentication |
| `POST /api/orders`, `GET /api/orders` | Place and view orders |

Full documentation: [docs/API.md](docs/API.md) · Design notes: [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)

## 🖼️ Product Images
Demo images are loaded from [picsum.photos](https://picsum.photos) using fixed seeds, so every product shows a different image. They are random photos and do not match the product names. For a real look, replace the `images` arrays in `server/src/data/products.ts` with your own product photos (place files in `client/public/images/` and use paths like `/images/phone-1.jpg`).

## 🗺️ Roadmap
- [ ] MongoDB / PostgreSQL database
- [ ] Razorpay / Stripe payments
- [ ] Product reviews and ratings
- [ ] Admin dashboard for products and orders
- [ ] Unit and integration tests

## 👨‍💻 Author
**Lucky Baliyan** - B.Tech CSIT, AKGEC Ghaziabad

## 📄 License
MIT - see [LICENSE](LICENSE).
