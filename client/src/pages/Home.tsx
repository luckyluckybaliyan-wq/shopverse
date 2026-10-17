import { useEffect, useState } from "react";
import { api } from "../api/client";
import CategoryStrip from "../components/CategoryStrip";
import HeroCarousel from "../components/HeroCarousel";
import ProductRow from "../components/ProductRow";
import Spinner from "../components/Spinner";
import { Category, Product } from "../types";

interface Sections { deals: Product[]; topRated: Product[]; mobiles: Product[]; fashion: Product[]; home: Product[]; books: Product[] }

export default function Home() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [data, setData] = useState<Sections | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([
      api.categories(),
      api.products({ sort: "discount", limit: 5 }),
      api.products({ sort: "rating", limit: 5 }),
      api.products({ category: "Mobiles", limit: 5 }),
      api.products({ category: "Fashion", limit: 5 }),
      api.products({ category: "Home & Kitchen", limit: 5 }),
      api.products({ category: "Books", limit: 5 }),
    ])
      .then(([cats, deals, top, mobiles, fashion, home, books]) => {
        setCategories(cats);
        setData({ deals: deals.items, topRated: top.items, mobiles: mobiles.items, fashion: fashion.items, home: home.items, books: books.items });
      })
      .catch((e: Error) => setError(e.message));
  }, []);

  if (error) return <p className="py-20 text-center text-red-600">Could not load products: {error}. Is the server running on port 5000?</p>;
  if (!data) return <Spinner />;

  return (
    <div className="space-y-4">
      <CategoryStrip categories={categories} />
      <HeroCarousel />
      <ProductRow title="Best Deals of the Day" products={data.deals} to="/products?sort=discount" />
      <ProductRow title="Top Rated" products={data.topRated} to="/products?sort=rating" />
      <ProductRow title="Mobiles" products={data.mobiles} to="/products?category=Mobiles" />
      <ProductRow title="Fashion for You" products={data.fashion} to="/products?category=Fashion" />
      <ProductRow title="Home & Kitchen" products={data.home} to="/products?category=Home%20%26%20Kitchen" />
      <ProductRow title="Books" products={data.books} to="/products?category=Books" />
    </div>
  );
}
