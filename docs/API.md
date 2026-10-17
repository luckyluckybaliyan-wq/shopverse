# ShopVerse REST API

Base URL: `http://localhost:5000/api`  
Protected routes need the header `Authorization: Bearer <token>`.

## Health
| Method | Endpoint | Description |
|---|---|---|
| GET | `/health` | Server status |

## Products
| Method | Endpoint | Description |
|---|---|---|
| GET | `/products` | List products. Query: `search`, `category`, `minPrice`, `maxPrice`, `sort` (`price_asc`, `price_desc`, `rating`, `discount`), `page`, `limit` |
| GET | `/products/:id` | Product details + related products |
| GET | `/products/meta/categories` | Categories with image and product count |

## Auth
| Method | Endpoint | Body | Description |
|---|---|---|---|
| POST | `/auth/register` | `{ name, email, password }` | Create account, returns `{ token, user }` |
| POST | `/auth/login` | `{ email, password }` | Login, returns `{ token, user }` |
| GET | `/auth/me` | - | Current user (protected) |

## Orders (protected)
| Method | Endpoint | Body | Description |
|---|---|---|---|
| POST | `/orders` | `{ items: [{ productId, qty }], address, payment }` | Place order. Prices are re-calculated on the server |
| GET | `/orders` | - | Orders of the logged-in user |

### Example
```bash
curl "http://localhost:5000/api/products?category=Mobiles&sort=price_asc&limit=5"
```
