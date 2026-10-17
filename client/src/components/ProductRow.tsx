import { Link } from "react-router-dom";
import { Product } from "../types";
import ProductCard from "./ProductCard";

interface Props { title: string; products: Product[]; to?: string }

export default function ProductRow({ title, products, to }: Props) {
  if (products.length === 0) return null;
  return (
    <section className="card">
      <div className="flex items-center justify-between border-b px-4 py-3">
        <h2 className="text-lg font-semibold">{title}</h2>
        {to && <Link to={to} className="rounded-sm bg-brand px-4 py-1.5 text-xs font-semibold text-white">VIEW ALL</Link>}
      </div>
      <div className="grid grid-cols-2 gap-2 p-3 sm:grid-cols-3 lg:grid-cols-5">
        {products.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
    </section>
  );
}
