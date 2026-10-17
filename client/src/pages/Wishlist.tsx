import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { useWishlist } from "../context/WishlistContext";

export default function Wishlist() {
  const { items } = useWishlist();
  if (items.length === 0) return <p className="card py-16 text-center">Your wishlist is empty. <Link to="/products" className="text-brand underline">Browse products</Link></p>;
  return (
    <section className="card">
      <h1 className="border-b px-4 py-3 font-semibold">My Wishlist ({items.length})</h1>
      <div className="grid grid-cols-2 gap-2 p-3 sm:grid-cols-3 lg:grid-cols-5">{items.map((p) => <ProductCard key={p.id} product={p} />)}</div>
    </section>
  );
}
