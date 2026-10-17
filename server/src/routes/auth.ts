import bcrypt from "bcryptjs";
import { Router } from "express";
import jwt from "jsonwebtoken";
import { db } from "../db";
import { AuthRequest, JWT_SECRET, requireAuth } from "../middleware/auth";

const router = Router();
const sign = (id: string) => jwt.sign({ id }, JWT_SECRET, { expiresIn: "7d" });
const publicUser = (u: { id: string; name: string; email: string }) => ({ id: u.id, name: u.name, email: u.email });

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body ?? {};
  if (!name || !email || !password) return res.status(400).json({ message: "Name, email and password are required" });
  if (String(password).length < 6) return res.status(400).json({ message: "Password must be at least 6 characters" });
  if (db.users.findByEmail(email)) return res.status(409).json({ message: "Email already registered" });

  const user = db.users.add({
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 7),
    name: String(name).trim(),
    email: String(email).toLowerCase(),
    passwordHash: await bcrypt.hash(password, 10),
  });
  res.status(201).json({ token: sign(user.id), user: publicUser(user) });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body ?? {};
  const user = email ? db.users.findByEmail(email) : undefined;
  if (!user || !(await bcrypt.compare(password ?? "", user.passwordHash))) {
    return res.status(401).json({ message: "Invalid email or password" });
  }
  res.json({ token: sign(user.id), user: publicUser(user) });
});

router.get("/me", requireAuth, (req: AuthRequest, res) => {
  const user = db.users.findById(req.userId!);
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(publicUser(user));
});

export default router;
