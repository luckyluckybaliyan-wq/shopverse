import { FormEvent, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

export default function Navbar() {
  const [q, setQ] = useState("");
  const [menu, setMenu] = useState(false);
  const { user, logout } = useAuth();
  const { count } = useCart();
  const wishlist = useWishlist();
  const navigate = useNavigate();

  const submit = (e: FormEvent) => {
    e.preventDefault();
    navigate(`/products?search=${encodeURIComponent(q.trim())}`);
  };

  return (
    <header className="sticky top-0 z-40 bg-brand shadow">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-3 py-2 sm:gap-6">
        <Link to="/" className="shrink-0 text-xl font-bold italic text-white">
          Shop<span className="text-brand-accent">Verse</span>
        </Link>

        <form onSubmit={submit} className="flex flex-1">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search for products, brands and more"
            className="w-full rounded-l-sm px-4 py-2 text-sm outline-none"
            aria-label="Search products"
          />
          <button className="rounded-r-sm bg-white px-4 text-brand" aria-label="Search">🔍</button>
        </form>

        <nav className="flex items-center gap-4 text-sm font-medium text-white sm:gap-6">
          {user ? (
            <div className="relative">
              <button onClick={() => setMenu((m) => !m)} className="flex items-center gap-1">
                {user.name.split(" ")[0]} ▾
              </button>
              {menu && (
                <div className="absolute right-0 mt-2 w-44 rounded-sm bg-white py-1 text-slate-700 shadow-lg" onClick={() => setMenu(false)}>
                  <Link to="/orders" className="block px-4 py-2 hover:bg-slate-100">My Orders</Link>
                  <Link to="/wishlist" className="block px-4 py-2 hover:bg-slate-100">Wishlist</Link>
                  <button onClick={logout} className="block w-full px-4 py-2 text-left hover:bg-slate-100">Logout</button>
                </div>
              )}
            </div>
          ) : (
            <NavLink to="/login" className="rounded-sm bg-white px-5 py-1 font-semibold text-brand">Login</NavLink>
          )}
          <Link to="/wishlist" className="hidden sm:block">♡ {wishlist.items.length}</Link>
          <Link to="/cart" className="flex items-center gap-1">
            🛒 <span className="hidden sm:inline">Cart</span>
            {count > 0 && <span className="rounded-full bg-brand-orange px-1.5 text-xs">{count}</span>}
          </Link>
        </nav>
      </div>
    </header>
  );
}
