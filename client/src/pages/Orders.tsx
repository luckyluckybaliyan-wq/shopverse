import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api/client";
import Spinner from "../components/Spinner";
import { Order } from "../types";
import { formatPrice } from "../utils";

export default function Orders() {
  const [orders, setOrders] = useState<Order[] | null>(null);
  useEffect(() => { api.orders().then(setOrders).catch(() => setOrders([])); }, []);

  if (!orders) return <Spinner />;
  if (orders.length === 0) return <p className="card py-16 text-center">No orders yet. <Link to="/" className="text-brand underline">Start shopping</Link></p>;

  return (
    <div className="space-y-4">
      <h1 className="text-lg font-semibold">My Orders</h1>
      {orders.map((o) => (
        <section key={o.id} className="card">
          <div className="flex flex-wrap justify-between gap-2 border-b px-4 py-3 text-sm">
            <span>Order <b>{o.id}</b> · {new Date(o.createdAt).toLocaleDateString("en-IN", { dateStyle: "medium" })}</span>
            <span className="rounded-sm bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-700">{o.status}</span>
          </div>
          {o.items.map((it) => (
            <div key={it.productId} className="flex gap-3 border-b p-4 text-sm last:border-0">
              <img src={it.image} alt={it.title} className="h-16 w-16 object-cover" />
              <div className="flex-1"><Link to={`/product/${it.productId}`} className="font-medium hover:text-brand">{it.title}</Link><p className="text-slate-500">Qty {it.qty}</p></div>
              <span>{formatPrice(it.price * it.qty)}</span>
            </div>
          ))}
          <p className="px-4 py-3 text-right text-sm font-semibold">Total {formatPrice(o.total)} · {o.payment}</p>
        </section>
      ))}
    </div>
  );
}
