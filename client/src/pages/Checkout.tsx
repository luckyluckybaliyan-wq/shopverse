import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../api/client";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { Address, Order } from "../types";
import { formatPrice } from "../utils";

export default function Checkout() {
  const { user } = useAuth();
  const { lines, subtotal, clear } = useCart();
  const navigate = useNavigate();
  const [address, setAddress] = useState<Address>({ name: user?.name ?? "", phone: "", line: "", city: "", pincode: "" });
  const [payment, setPayment] = useState<Order["payment"]>("COD");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [placed, setPlaced] = useState<Order | null>(null);

  const delivery = subtotal > 500 ? 0 : 40;
  const field = (key: keyof Address) => ({
    value: address[key],
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => setAddress({ ...address, [key]: e.target.value }),
    className: "input",
    required: true,
  });

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    if (!/^\d{10}$/.test(address.phone)) return setError("Enter a valid 10-digit phone number");
    if (!/^\d{6}$/.test(address.pincode)) return setError("Enter a valid 6-digit pincode");
    setBusy(true);
    try {
      const order = await api.placeOrder({ items: lines.map((l) => ({ productId: l.product.id, qty: l.qty })), address, payment });
      clear();
      setPlaced(order);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setBusy(false);
    }
  };

  if (placed) {
    return (
      <div className="card mx-auto max-w-lg py-12 text-center">
        <div className="text-5xl">🎉</div>
        <h1 className="mt-3 text-xl font-semibold">Order placed successfully!</h1>
        <p className="mt-1 text-slate-600">Order ID <b>{placed.id}</b> · {formatPrice(placed.total)}</p>
        <div className="mt-6 flex justify-center gap-3">
          <button onClick={() => navigate("/orders")} className="btn-secondary">My orders</button>
          <Link to="/" className="btn-primary">Continue shopping</Link>
        </div>
      </div>
    );
  }

  if (lines.length === 0) return <p className="py-20 text-center">Your cart is empty. <Link to="/" className="text-brand underline">Go shopping</Link></p>;

  return (
    <form onSubmit={submit} className="grid gap-4 lg:grid-cols-[1fr_340px]">
      <div className="space-y-4">
        <section className="card p-4">
          <h2 className="mb-3 font-semibold">Delivery address</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <input placeholder="Full name" {...field("name")} />
            <input placeholder="10-digit phone" inputMode="numeric" maxLength={10} {...field("phone")} />
            <input placeholder="Address (house no, street, area)" {...field("line")} className="input sm:col-span-2" />
            <input placeholder="City" {...field("city")} />
            <input placeholder="Pincode" inputMode="numeric" maxLength={6} {...field("pincode")} />
          </div>
        </section>
        <section className="card p-4">
          <h2 className="mb-3 font-semibold">Payment method</h2>
          {(["COD", "UPI", "CARD"] as const).map((m) => (
            <label key={m} className="flex items-center gap-2 py-1 text-sm">
              <input type="radio" name="payment" checked={payment === m} onChange={() => setPayment(m)} />
              {m === "COD" ? "Cash on Delivery" : m === "UPI" ? "UPI (demo)" : "Credit / Debit card (demo)"}
            </label>
          ))}
          <p className="mt-2 text-xs text-slate-500">No real payment is processed - this is a portfolio project.</p>
        </section>
      </div>

      <aside className="card h-fit p-4 text-sm">
        <h2 className="mb-3 font-semibold uppercase text-slate-500">Order summary</h2>
        {lines.map((l) => (
          <div key={l.product.id} className="flex justify-between py-1"><span className="mr-2 line-clamp-1">{l.product.title} × {l.qty}</span><span>{formatPrice(l.product.price * l.qty)}</span></div>
        ))}
        <div className="mt-2 flex justify-between border-t pt-2"><span>Delivery</span><span>{delivery === 0 ? "FREE" : formatPrice(delivery)}</span></div>
        <div className="flex justify-between pt-2 text-base font-semibold"><span>Total</span><span>{formatPrice(subtotal + delivery)}</span></div>
        {error && <p className="mt-3 text-red-600" role="alert">{error}</p>}
        <button disabled={busy} className="btn-primary mt-4 w-full">{busy ? "Placing order…" : "Confirm order"}</button>
      </aside>
    </form>
  );
}
