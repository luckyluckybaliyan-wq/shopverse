// ShopVerse Lite - vanilla JavaScript storefront (no build step, no dependencies).
"use strict";

const img = (seed, w = 500, h = 500) => `https://picsum.photos/seed/${seed}/${w}/${h}`;

const PRODUCTS = [
  { id: 1, title: "Nova X5 5G (128GB)", brand: "Novatech", category: "Mobiles", price: 15999, mrp: 21999, rating: 4.4 },
  { id: 2, title: "Pixelon Pro 12", brand: "Pixelon", category: "Mobiles", price: 42999, mrp: 49999, rating: 4.6 },
  { id: 3, title: "AeroBook 14 Laptop", brand: "Aerotech", category: "Laptops", price: 58990, mrp: 72990, rating: 4.3 },
  { id: 4, title: "Titan G15 Gaming Laptop", brand: "Titan", category: "Laptops", price: 89990, mrp: 109990, rating: 4.5 },
  { id: 5, title: "BassPods Pro Earbuds", brand: "Soundly", category: "Audio", price: 1799, mrp: 4999, rating: 4.2 },
  { id: 6, title: "Studio 700 Headphones", brand: "Soundly", category: "Audio", price: 6499, mrp: 12999, rating: 4.5 },
  { id: 7, title: "FitBand 7 Smartwatch", brand: "Fitron", category: "Wearables", price: 2499, mrp: 6999, rating: 4.2 },
  { id: 8, title: "Slim Fit Cotton Shirt", brand: "UrbanThread", category: "Fashion", price: 799, mrp: 1999, rating: 4.1 },
  { id: 9, title: "Floral Kurta Set", brand: "Ethnique", category: "Fashion", price: 1299, mrp: 3299, rating: 4.3 },
  { id: 10, title: "Classic White Sneakers", brand: "StrideCo", category: "Fashion", price: 1599, mrp: 3499, rating: 4.2 },
  { id: 11, title: "Air Fryer 4.2L", brand: "KitchenPro", category: "Home & Kitchen", price: 3999, mrp: 8995, rating: 4.4 },
  { id: 12, title: "Ergo Office Chair", brand: "SitWell", category: "Home & Kitchen", price: 7999, mrp: 15999, rating: 4.3 },
  { id: 13, title: "Atomic Habits", brand: "Penguin", category: "Books", price: 449, mrp: 799, rating: 4.8 },
  { id: 14, title: "Clean Code", brand: "Pearson", category: "Books", price: 2399, mrp: 3299, rating: 4.7 },
  { id: 15, title: "Yoga Mat 6mm", brand: "FlexFit", category: "Sports", price: 549, mrp: 1299, rating: 4.3 },
  { id: 16, title: "Adjustable Dumbbell 20kg", brand: "IronCore", category: "Sports", price: 2999, mrp: 5499, rating: 4.4 },
].map((p) => ({ ...p, image: img(`lite-${p.id}`) }));

const BANNERS = [
  { seed: "lite-b1", title: "Mega Electronics Sale", sub: "Up to 60% off on mobiles & laptops" },
  { seed: "lite-b2", title: "Fashion Fest", sub: "Trending styles from ₹799" },
  { seed: "lite-b3", title: "Home Makeover", sub: "Kitchen & furniture deals" },
];

const $ = (id) => document.getElementById(id);
const money = (n) => "₹" + n.toLocaleString("en-IN");
const state = { category: "All", query: "", sort: "", cart: JSON.parse(localStorage.getItem("lite_cart") || "{}"), slide: 0 };

function visibleProducts() {
  let list = PRODUCTS.filter(
    (p) =>
      (state.category === "All" || p.category === state.category) &&
      (p.title + p.brand + p.category).toLowerCase().includes(state.query.toLowerCase())
  );
  if (state.sort === "asc") list.sort((a, b) => a.price - b.price);
  if (state.sort === "desc") list.sort((a, b) => b.price - a.price);
  if (state.sort === "rating") list.sort((a, b) => b.rating - a.rating);
  return list;
}

function renderChips() {
  const cats = ["All", ...new Set(PRODUCTS.map((p) => p.category))];
  $("chips").innerHTML = cats
    .map((c) => `<button class="chip ${c === state.category ? "active" : ""}" data-cat="${c}">${c}</button>`)
    .join("");
}

function renderGrid() {
  const list = visibleProducts();
  $("heading").textContent = `${state.category === "All" ? "All Products" : state.category} (${list.length})`;
  $("grid").innerHTML = list.length
    ? list.map((p) => `
      <article class="card">
        <img src="${p.image}" alt="${p.title}" loading="lazy" />
        <span class="brand">${p.brand}</span>
        <h3>${p.title}</h3>
        <div><span class="rating">${p.rating} ★</span></div>
        <div class="price"><b>${money(p.price)}</b><s>${money(p.mrp)}</s><em>${Math.round(((p.mrp - p.price) / p.mrp) * 100)}% off</em></div>
        <button data-add="${p.id}">Add to cart</button>
      </article>`).join("")
    : `<p class="empty">No products found.</p>`;
}

function renderSlides() {
  $("slides").innerHTML = BANNERS.map((b) => `
    <div class="slide"><img src="${img(b.seed, 1280, 300)}" alt="${b.title}" /><div><h2>${b.title}</h2><p>${b.sub}</p></div></div>`).join("");
}
const moveSlide = (d) => {
  state.slide = (state.slide + d + BANNERS.length) % BANNERS.length;
  $("slides").style.transform = `translateX(-${state.slide * 100}%)`;
};

function saveCart() { localStorage.setItem("lite_cart", JSON.stringify(state.cart)); }

function renderCart() {
  const entries = Object.entries(state.cart);
  let total = 0, count = 0;
  $("cart-items").innerHTML = entries.length
    ? entries.map(([id, qty]) => {
        const p = PRODUCTS.find((x) => x.id === Number(id));
        total += p.price * qty; count += qty;
        return `<div class="line"><img src="${p.image}" alt="${p.title}" />
          <div class="info"><b>${p.title}</b><div>${money(p.price)}</div>
          <div class="qty"><button data-dec="${p.id}">−</button> ${qty} <button data-inc="${p.id}">+</button> <button data-del="${p.id}" style="width:auto;border-radius:3px;padding:0 6px">Remove</button></div></div></div>`;
      }).join("")
    : `<p class="empty">Your cart is empty.</p>`;
  $("cart-total").textContent = money(total);
  $("cart-count").textContent = count;
}

function toast(msg) {
  const t = $("toast");
  t.textContent = msg;
  t.classList.add("show");
  setTimeout(() => t.classList.remove("show"), 1800);
}

function toggleCart(open) {
  $("drawer").classList.toggle("open", open);
  $("overlay").classList.toggle("show", open);
}

document.addEventListener("click", (e) => {
  const t = e.target;
  if (t.dataset.cat) { state.category = t.dataset.cat; renderChips(); renderGrid(); }
  if (t.dataset.add) { state.cart[t.dataset.add] = (state.cart[t.dataset.add] || 0) + 1; saveCart(); renderCart(); toast("Added to cart"); }
  if (t.dataset.inc) { state.cart[t.dataset.inc]++; saveCart(); renderCart(); }
  if (t.dataset.dec) { if (--state.cart[t.dataset.dec] <= 0) delete state.cart[t.dataset.dec]; saveCart(); renderCart(); }
  if (t.dataset.del) { delete state.cart[t.dataset.del]; saveCart(); renderCart(); }
});

$("search").addEventListener("input", (e) => { state.query = e.target.value; renderGrid(); });
$("sort").addEventListener("change", (e) => { state.sort = e.target.value; renderGrid(); });
$("cart-btn").addEventListener("click", () => toggleCart(true));
$("close-cart").addEventListener("click", () => toggleCart(false));
$("overlay").addEventListener("click", () => toggleCart(false));
$("prev").addEventListener("click", () => moveSlide(-1));
$("next").addEventListener("click", () => moveSlide(1));
$("checkout").addEventListener("click", () => {
  if (!Object.keys(state.cart).length) return toast("Cart is empty");
  state.cart = {}; saveCart(); renderCart(); toggleCart(false); toast("Order placed (demo) 🎉");
});

renderSlides(); renderChips(); renderGrid(); renderCart();
setInterval(() => moveSlide(1), 4500);
