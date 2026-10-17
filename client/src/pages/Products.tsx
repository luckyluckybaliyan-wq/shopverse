import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { api } from "../api/client";
import ProductCard from "../components/ProductCard";
import Spinner from "../components/Spinner";
import { Category, ProductPage } from "../types";

const PRICE_RANGES = [
  { label: "Any price", min: "", max: "" },
  { label: "Under ₹1,000", min: "", max: "1000" },
  { label: "₹1,000 - ₹5,000", min: "1000", max: "5000" },
  { label: "₹5,000 - ₹20,000", min: "5000", max: "20000" },
  { label: "Above ₹20,000", min: "20000", max: "" },
];

export default function Products() {
  const [params, setParams] = useSearchParams();
  const [categories, setCategories] = useState<Category[]>([]);
  const [result, setResult] = useState<ProductPage | null>(null);
  const [loading, setLoading] = useState(true);

  const search = params.get("search") ?? "";
  const category = params.get("category") ?? "";
  const sort = params.get("sort") ?? "relevance";
  const minPrice = params.get("minPrice") ?? "";
  const maxPrice = params.get("maxPrice") ?? "";
  const page = Number(params.get("page") ?? 1);

  useEffect(() => { api.categories().then(setCategories).catch(() => undefined); }, []);

  useEffect(() => {
    setLoading(true);
    api.products({ search, category, sort, minPrice, maxPrice, page, limit: 12 })
      .then(setResult)
      .finally(() => setLoading(false));
  }, [search, category, sort, minPrice, maxPrice, page]);

  const update = (changes: Record<string, string>) => {
    const next = new URLSearchParams(params);
    Object.entries(changes).forEach(([k, v]) => (v ? next.set(k, v) : next.delete(k)));
    if (!("page" in changes)) next.delete("page");
    setParams(next);
  };

  const activeRange = PRICE_RANGES.findIndex((r) => r.min === minPrice && r.max === maxPrice);

  return (
    <div className="grid gap-4 md:grid-cols-[240px_1fr]">
      <aside className="card h-fit space-y-6 p-4 text-sm">
        <div>
          <h3 className="mb-2 font-semibold">Category</h3>
          <ul className="space-y-1">
            <li><button onClick={() => update({ category: "" })} className={!category ? "font-semibold text-brand" : ""}>All</button></li>
            {categories.map((c) => (
              <li key={c.name}>
                <button onClick={() => update({ category: c.name })} className={category === c.name ? "font-semibold text-brand" : "hover:text-brand"}>
                  {c.name} <span className="text-slate-400">({c.count})</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="mb-2 font-semibold">Price</h3>
          {PRICE_RANGES.map((r, idx) => (
            <label key={r.label} className="flex items-center gap-2 py-0.5">
              <input type="radio" name="price" checked={activeRange === idx} onChange={() => update({ minPrice: r.min, maxPrice: r.max })} />
              {r.label}
            </label>
          ))}
        </div>
      </aside>

      <section className="card">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b px-4 py-3">
          <div>
            <h1 className="font-semibold">{search ? `Results for "${search}"` : category || "All Products"}</h1>
            {result && <p className="text-xs text-slate-500">{result.total} items</p>}
          </div>
          <select value={sort} onChange={(e) => update({ sort: e.target.value })} className="input w-auto" aria-label="Sort products">
            <option value="relevance">Relevance</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="rating">Customer Rating</option>
            <option value="discount">Biggest Discount</option>
          </select>
        </div>

        {loading ? <Spinner /> : !result || result.items.length === 0 ? (
          <p className="py-20 text-center text-slate-500">No products matched your filters.</p>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-2 p-3 lg:grid-cols-3 xl:grid-cols-4">
              {result.items.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
            {result.pages > 1 && (
              <div className="flex justify-center gap-2 border-t py-4">
                {Array.from({ length: result.pages }, (_, i) => i + 1).map((n) => (
                  <button key={n} onClick={() => update({ page: String(n) })} className={`h-9 w-9 rounded-full text-sm ${n === result.page ? "bg-brand text-white" : "hover:bg-slate-100"}`}>{n}</button>
                ))}
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}
