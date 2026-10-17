import { Router } from "express";
import { db } from "../db";
import { products } from "../data/products";
import { AuthRequest, requireAuth } from "../middleware/auth";
import { Order, OrderItem } from "../types";

const router = Router();
router.use(requireAuth);

router.get("/", (req: AuthRequest, res) => res.json(db.orders.byUser(req.userId!)));

router.post("/", (req: AuthRequest, res) => {
  const { items, address, payment } = req.body ?? {};
  if (!Array.isArray(items) || items.length === 0) return res.status(400).json({ message: "Cart is empty" });
  if (!address?.name || !address?.line || !address?.city || !address?.pincode || !address?.phone) {
    return res.status(400).json({ message: "Complete delivery address is required" });
  }

  // Prices are re-read from the server catalogue so clients cannot tamper with them.
  const orderItems: OrderItem[] = [];
  for (const it of items as { productId: number; qty: number }[]) {
    const p = products.find((x) => x.id === it.productId);
    if (!p) return res.status(400).json({ message: `Product ${it.productId} not found` });
    const qty = Math.max(1, Math.min(10, Number(it.qty) || 1));
    orderItems.push({ productId: p.id, title: p.title, image: p.images[0], price: p.price, qty });
  }

  const order: Order = {
    id: "SV" + Date.now().toString().slice(-8),
    userId: req.userId!,
    items: orderItems,
    total: orderItems.reduce((s, i) => s + i.price * i.qty, 0),
    address,
    payment: ["COD", "UPI", "CARD"].includes(payment) ? payment : "COD",
    status: "PLACED",
    createdAt: new Date().toISOString(),
  };
  res.status(201).json(db.orders.add(order));
});

export default router;
