import { Link } from "react-router-dom";
import { Category } from "../types";

export default function CategoryStrip({ categories }: { categories: Category[] }) {
  return (
    <section className="card flex gap-4 overflow-x-auto p-4">
      {categories.map((c) => (
        <Link key={c.name} to={`/products?category=${encodeURIComponent(c.name)}`} className="group flex w-24 shrink-0 flex-col items-center gap-2 text-center">
          <img src={c.image} alt={c.name} loading="lazy" className="h-16 w-16 rounded-full object-cover ring-2 ring-transparent transition group-hover:ring-brand" />
          <span className="text-xs font-medium group-hover:text-brand">{c.name}</span>
        </Link>
      ))}
    </section>
  );
}
