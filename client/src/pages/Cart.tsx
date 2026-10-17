import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { formatPrice } from "../utils";

export default function Cart() {
  const { lines, subtotal, mrpTotal, count, setQty, remove } = useCart();
  const navigate = useNavigate();

  if (lines.length === 0) {
    return (
      <div className="card py-16 text-center">
        <img src="https://picsum.photos/seed/empty-cart/240/160" alt="" className="mx-auto mb-4 rounded" />
        <h1 className="text-lg font-semibold">Your cart is empty</h1>
        <Link to="/" className="btn-primary mt-4 inline-block">Shop now</Link>
      </div>
    );
  }

  const savings = mrpTotal - subtotal;
  const delivery = subtotal > 500 ? 0 : 40;

  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_340px]">
      <section className="card">
        <h1 className="border-b px-4 py-3 font-semibold">My Cart ({count})</h1>
        {lines.map(({ product, qty }) => (
          <div key={product.id} className="flex gap-4 border-b p-4">
            <Link to={`/product/${product.id}`}><img src={product.images[0]} alt={product.title} className="h-24 w-24 object-cover" /></Link>
            <div className="flex-1">
              <Link to={`/product/${product.id}`} className="font-medium hover:text-brand">{product.title}</Link>
              <p className="text-xs text-slate-500">{product.brand}</p>
              <p className="mt-1 font-semibold">{formatPrice(product.price)} <span className="text-xs font-normal text-slate-500 line-through">{formatPrice(product.mrp)}</span></p>
              <div className="mt-2 flex items-center gap-3 text-sm">
                <button onClick={() => setQty(product.id, qty - 1)} className="h-7 w-7 rounded-full border" aria-label="Decrease">−</button>
                <span>{qty}</span>
                <button onClick={() => setQty(product.id, qty + 1)} className="h-7 w-7 rounded-full border" aria-label="Increase">+</button>
                <button onClick={() => remove(product.id)} className="ml-4 font-semibold uppercase text-slate-600 hover:text-red-600">Remove</button>
              </div>
            </div>
          </div>
        ))}
        <div className="flex justify-end p-4">
          <button onClick={() => navigate("/checkout")} className="btn-primary">Place order</button>
        </div>
      </section>

      <aside className="card h-fit p-4 text-sm">
        <h2 className="mb-3 border-b pb-2 font-semibold uppercase text-slate-500">Price details</h2>
        <div className="space-y-2">
          <div className="flex justify-between"><span>Price ({count} items)</span><span>{formatPrice(mrpTotal)}</span></div>
          <div className="flex justify-between"><span>Discount</span><span className="text-green-600">− {formatPrice(savings)}</span></div>
          <div className="flex justify-between"><span>Delivery</span><span>{delivery === 0 ? <span className="text-green-600">FREE</span> : formatPrice(delivery)}</span></div>
          <div className="flex justify-between border-t border-dashed pt-3 text-base font-semibold"><span>Total</span><span>{formatPrice(subtotal + delivery)}</span></div>
        </div>
        <p className="mt-3 font-medium text-green-600">You will save {formatPrice(savings)} on this order</p>
      </aside>
    </div>
  );
}
