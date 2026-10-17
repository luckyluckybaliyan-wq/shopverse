import { Link } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";
import { Product } from "../types";
import { discountPct, formatPrice } from "../utils";
import Stars from "./Stars";

export default function ProductCard({ product }: { product: Product }) {
  const wishlist = useWishlist();
  const liked = wishlist.has(product.id);

  return (
    <article className="card group relative flex flex-col p-3 transition hover:shadow-lg">
      <button
        onClick={() => wishlist.toggle(product)}
        aria-label={liked ? "Remove from wishlist" : "Add to wishlist"}
        className={`absolute right-3 top-3 z-10 rounded-full bg-white p-1.5 text-lg shadow ${liked ? "text-red-500" : "text-slate-400"}`}
      >
        {liked ? "♥" : "♡"}
      </button>
      <Link to={`/product/${product.id}`} className="flex flex-1 flex-col">
        <div className="aspect-square overflow-hidden">
          <img src={product.images[0]} alt={product.title} loading="lazy" className="h-full w-full object-cover transition duration-300 group-hover:scale-105" />
        </div>
        <p className="mt-3 text-xs text-slate-500">{product.brand}</p>
        <h3 className="line-clamp-2 text-sm font-medium group-hover:text-brand">{product.title}</h3>
        <div className="mt-1"><Stars rating={product.rating} reviews={product.reviews} /></div>
        <div className="mt-2 flex flex-wrap items-baseline gap-2">
          <span className="text-base font-semibold">{formatPrice(product.price)}</span>
          <span className="text-xs text-slate-500 line-through">{formatPrice(product.mrp)}</span>
          <span className="text-xs font-semibold text-green-600">{discountPct(product.price, product.mrp)}% off</span>
        </div>
      </Link>
    </article>
  );
}
