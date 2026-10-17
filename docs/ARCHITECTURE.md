# Architecture

```
Browser (React + TS + Tailwind)  ──/api──►  Express + TS server  ──►  JSON file store (users, orders)
        │                                         │
 Context API: Auth, Cart, Wishlist         Static product catalogue (server/src/data/products.ts)
```

## Frontend (`client/`)
- **Vite + React 18 + TypeScript** with strict type-checking.
- **React Router v6** for routing; `ProtectedRoute` guards checkout and orders.
- **Context API** holds auth, cart and wishlist state; cart and wishlist persist in `localStorage`.
- **Tailwind CSS** for styling with a small set of reusable component classes in `index.css`.
- A thin typed `api/client.ts` wraps `fetch` and attaches the JWT.

## Backend (`server/`)
- **Express + TypeScript**, routes split into `products`, `auth`, `orders`.
- **JWT** authentication with **bcrypt** password hashing.
- Order totals are computed on the server from the catalogue, never trusted from the client.
- `db.ts` persists users and orders to `server/data/db.json`. It is isolated behind a tiny interface, so it can be swapped for MongoDB or PostgreSQL without touching the routes.

## Possible extensions
- Replace the JSON store with MongoDB (Mongoose) or PostgreSQL (Prisma).
- Add Razorpay/Stripe checkout, reviews and ratings, admin dashboard, product image uploads.
- Add unit tests (Vitest, Supertest) and deploy (Vercel + Render).
