import { Product } from "../types";

const img = (seed: string, w = 600, h = 600) => `https://picsum.photos/seed/${seed}/${w}/${h}`;

// [title, brand, category, price, mrp, rating, reviews, description]
type Row = [string, string, string, number, number, number, number, string];

const rows: Row[] = [
  // Mobiles
  ["Nova X5 5G (128GB)", "Novatech", "Mobiles", 15999, 21999, 4.4, 18234, "6.6-inch AMOLED display, 50MP triple camera and 5000mAh battery with 67W fast charging."],
  ["Pixelon Pro 12", "Pixelon", "Mobiles", 42999, 49999, 4.6, 9341, "Flagship performance with a 120Hz LTPO display, 108MP camera and wireless charging."],
  ["Lumo A3 Lite", "Lumo", "Mobiles", 8499, 10999, 4.1, 30211, "Budget smartphone with 90Hz display, 5000mAh battery and all-day performance."],
  ["Zenfold Flip 2", "Zenfold", "Mobiles", 74999, 89999, 4.5, 2210, "Foldable 7.6-inch inner display with a hinge rated for 200,000 folds."],
  // Laptops
  ["AeroBook 14 (i5, 16GB, 512GB)", "Aerotech", "Laptops", 58990, 72990, 4.3, 5621, "Thin and light 14-inch laptop with 12th-gen i5, 16GB RAM and 512GB NVMe SSD."],
  ["Titan G15 Gaming Laptop", "Titan", "Laptops", 89990, 109990, 4.5, 3120, "RTX 4050 graphics, 144Hz display and a vapor-chamber cooling system."],
  ["StudyMate 15 Notebook", "Novatech", "Laptops", 34990, 42990, 4.0, 11893, "Reliable everyday laptop for students with 8GB RAM and 256GB SSD."],
  // Audio
  ["BassPods Pro Earbuds", "Soundly", "Audio", 1799, 4999, 4.2, 66012, "Active noise cancellation, 36-hour battery life and IPX5 water resistance."],
  ["Studio 700 Wireless Headphones", "Soundly", "Audio", 6499, 12999, 4.5, 14320, "Over-ear headphones with hybrid ANC and 60mm drivers for deep bass."],
  ["Thunder Mini Bluetooth Speaker", "Boomr", "Audio", 1299, 2999, 4.3, 41230, "Portable speaker with 12-hour playtime and a rugged waterproof body."],
  // Wearables
  ["FitBand 7 Smartwatch", "Fitron", "Wearables", 2499, 6999, 4.2, 52002, "1.8-inch AMOLED display, SpO2, heart-rate tracking and 100+ sports modes."],
  ["Chrono Ultra Smartwatch", "Chrono", "Wearables", 11999, 17999, 4.4, 7120, "Titanium case, dual-frequency GPS and 14-day battery life."],
  // Fashion
  ["Men's Slim Fit Cotton Shirt", "UrbanThread", "Fashion", 799, 1999, 4.1, 21811, "Breathable pure-cotton shirt, wrinkle-resistant finish, available in 6 colours."],
  ["Women's Floral Kurta Set", "Ethnique", "Fashion", 1299, 3299, 4.3, 17432, "Rayon kurta with palazzo and dupatta, perfect for festive occasions."],
  ["Classic White Sneakers", "StrideCo", "Fashion", 1599, 3499, 4.2, 38201, "Minimal low-top sneakers with cushioned insole and anti-skid rubber sole."],
  ["Denim Jacket - Washed Blue", "UrbanThread", "Fashion", 1899, 3999, 4.0, 6120, "Regular fit denim jacket with metal buttons and two chest pockets."],
  // Home & Kitchen
  ["Air Fryer 4.2L Digital", "KitchenPro", "Home & Kitchen", 3999, 8995, 4.4, 28992, "Oil-free cooking with 8 preset menus and rapid air technology."],
  ["Ergo Office Chair - Mesh Back", "SitWell", "Home & Kitchen", 7999, 15999, 4.3, 9021, "Lumbar support, adjustable armrests and a breathable mesh back."],
  ["Non-stick Cookware Set (5 pcs)", "KitchenPro", "Home & Kitchen", 2199, 4999, 4.1, 15401, "Induction-friendly set with PFOA-free coating and stay-cool handles."],
  // Books
  ["Atomic Habits", "Penguin", "Books", 449, 799, 4.8, 120331, "An easy and proven way to build good habits and break bad ones."],
  ["Clean Code", "Pearson", "Books", 2399, 3299, 4.7, 8021, "A handbook of agile software craftsmanship by Robert C. Martin."],
  ["Data Structures Made Easy", "CareerMonk", "Books", 699, 1199, 4.5, 5302, "Problems and solutions for coding interviews and campus placements."],
  // Beauty, Toys, Sports
  ["Vitamin C Face Serum 30ml", "GlowLab", "Beauty", 399, 899, 4.2, 44010, "Brightening serum with 10% Vitamin C and hyaluronic acid."],
  ["Remote Control Stunt Car", "ToyZone", "Toys", 999, 2499, 4.0, 12031, "360-degree flip stunt car with rechargeable battery and 2.4GHz remote."],
  ["Yoga Mat 6mm Anti-skid", "FlexFit", "Sports", 549, 1299, 4.3, 31200, "Extra-thick eco-friendly mat with carrying strap."],
  ["Adjustable Dumbbell Set 20kg", "IronCore", "Sports", 2999, 5499, 4.4, 9801, "Chrome-plated dumbbells with a secure spin-lock mechanism."],
];

export const products: Product[] = rows.map(([title, brand, category, price, mrp, rating, reviews, description], i) => {
  const id = i + 1;
  const slug = `${brand}-${id}`.toLowerCase();
  return {
    id,
    title,
    brand,
    category,
    price,
    mrp,
    rating,
    reviews,
    stock: 10 + ((id * 7) % 40),
    description,
    images: [img(`${slug}-a`), img(`${slug}-b`), img(`${slug}-c`), img(`${slug}-d`)],
    specs: {
      Brand: brand,
      Category: category,
      Warranty: category === "Books" ? "N/A" : "1 Year Manufacturer Warranty",
      Delivery: "2-4 business days",
      Returns: "7-day replacement policy",
    },
  };
});

export const categories = Array.from(new Set(products.map((p) => p.category)));
export const categoryImage = (c: string) => img(`cat-${c.toLowerCase().replace(/\W+/g, "-")}`, 300, 300);
