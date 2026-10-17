import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { api } from "../api/client";
import ProductCard from "../components/ProductCard";
import Spinner from "../components/Spinner";
import Stars from "../components/Stars";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { Product } from "../types";
import { discountPct, formatPrice } from "../utils";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const cart = useCart();
  const wishlist = useWishlist();
  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [active, setActive] = useState(0);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;
    setProduct(null); setActive(0); setQty(1); setError("");
    api.product(id).then((r) => { setProduct(r.product); setRelated(r.related); }).catch((e: Error) => setError(e.message));
    window.scrollTo({ top: 0 });
  }, [id]);

  if (error) return <p className="py-20 text-center text-red-600">{error}. <Link to="/products" className="text-brand underline">Browse products</Link></p>;
  if (!product) return <Spinner />;

  const addToCart = () => { cart.add(product, qty); setAdded(true); setTimeout(() => setAdded(false), 1800); };
  const buyNow = () => { cart.add(product, qty); navigate("/checkout"); };

  return (
    <div className="space-y-4">
      <div className="card grid gap-6 p-4 md:grid-cols-[110px_1fr_1fr] lg:p-6">
        <div className="order-2 flex gap-2 md:order-1 md:flex-col">
          {product.images.map((src, i) => (
            <button key={src} onClick={() => setActive(i)} className={`h-16 w-16 overflow-hidden border-2 ${i === active ? "border-brand" : "border-transparent"}`}>
              <img src={src} alt={`${product.title} view ${i + 1}`} className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
        <div className="order-1 md:order-2">
          <img src={product.images[active]} alt={product.title} className="aspect-square w-full object-cover" />
        </div>
        <div className="order-3 space-y-4">
          <div>
            <p className="text-sm text-slate-500">{product.brand} · {product.category}</p>
            <h1 className="text-xl font-semibold">{product.title}</h1>
            <div className="mt-2"><Stars rating={product.rating} reviews={product.reviews} /></div>
          </div>
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-semibold">{formatPrice(product.price)}</span>
            <span className="text-slate-500 line-through">{formatPrice(product.mrp)}</span>
            <span className="font-semibold text-green-600">{discountPct(product.price, product.mrp)}% off</span>
          </div>
          <p className="text-sm text-slate-600">{product.description}</p>
          <p className={`text-sm font-medium ${product.stock < 15 ? "text-red-600" : "text-green-700"}`}>
            {product.stock < 15 ? `Hurry, only ${product.stock} left!` : "In stock"}
          </p>
          <div className="flex items-center gap-3 text-sm">
            <span>Qty</span>
            <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="h-8 w-8 rounded-full border" aria-label="Decrease quantity">−</button>
            <span className="w-6 text-center">{qty}</span>
            <button onClick={() => setQty((q) => Math.min(10, q + 1))} className="h-8 w-8 rounded-full border" aria-label="Increase quantity">+</button>
          </div>
          <div className="flex flex-wrap gap-3">
            <button onClick={addToCart} className="btn-secondary">{added ? "Added ✓" : "Add to cart"}</button>
            <button onClick={buyNow} className="btn-primary">Buy now</button>
            <button onClick={() => wishlist.toggle(product)} className="rounded-sm border px-4 py-3 text-sm">{wishlist.has(product.id) ? "♥ Wishlisted" : "♡ Wishlist"}</button>
          </div>
          <table className="w-full text-sm">
            <tbody>
              {Object.entries(product.specs).map(([k, v]) => (
                <tr key={k} className="border-t"><td className="w-1/3 py-2 text-slate-500">{k}</td><td className="py-2">{v}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {related.length > 0 && (
        <section className="card p-4">
          <h2 className="mb-3 text-lg font-semibold">Similar products</h2>
          <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">{related.map((p) => <ProductCard key={p.id} product={p} />)}</div>
        </section>
      )}
    </div>
  );
}
