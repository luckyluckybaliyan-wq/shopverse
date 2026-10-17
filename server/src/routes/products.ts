import { Router } from "express";
import { categories, categoryImage, products } from "../data/products";

const router = Router();

router.get("/meta/categories", (_req, res) => {
  res.json(categories.map((name) => ({ name, image: categoryImage(name), count: products.filter((p) => p.category === name).length })));
});

router.get("/", (req, res) => {
  const { search = "", category = "", minPrice = "0", maxPrice = "10000000", sort = "relevance", page = "1", limit = "12" } = req.query as Record<string, string>;
  const q = search.toLowerCase().trim();

  let list = products.filter(
    (p) =>
      (!q || p.title.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)) &&
      (!category || p.category === category) &&
      p.price >= Number(minPrice) &&
      p.price <= Number(maxPrice)
  );

  switch (sort) {
    case "price_asc": list = [...list].sort((a, b) => a.price - b.price); break;
    case "price_desc": list = [...list].sort((a, b) => b.price - a.price); break;
    case "rating": list = [...list].sort((a, b) => b.rating - a.rating); break;
    case "discount": list = [...list].sort((a, b) => (b.mrp - b.price) / b.mrp - (a.mrp - a.price) / a.mrp); break;
  }

  const p = Math.max(1, Number(page));
  const l = Math.min(48, Math.max(1, Number(limit)));
  res.json({ total: list.length, page: p, pages: Math.ceil(list.length / l), items: list.slice((p - 1) * l, p * l) });
});

router.get("/:id", (req, res) => {
  const product = products.find((p) => p.id === Number(req.params.id));
  if (!product) return res.status(404).json({ message: "Product not found" });
  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);
  res.json({ product, related });
});

export default router;
