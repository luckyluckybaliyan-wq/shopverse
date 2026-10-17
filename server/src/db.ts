import fs from "fs";
import path from "path";
import { Order, User } from "./types";

const file = path.join(__dirname, "..", "data", "db.json");

interface Schema {
  users: User[];
  orders: Order[];
}

function load(): Schema {
  try {
    return JSON.parse(fs.readFileSync(file, "utf-8"));
  } catch {
    return { users: [], orders: [] };
  }
}

function save(db: Schema) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, JSON.stringify(db, null, 2));
}

export const db = {
  users: {
    findByEmail: (email: string) => load().users.find((u) => u.email === email.toLowerCase()),
    findById: (id: string) => load().users.find((u) => u.id === id),
    add(user: User) {
      const d = load();
      d.users.push(user);
      save(d);
      return user;
    },
  },
  orders: {
    byUser: (userId: string) => load().orders.filter((o) => o.userId === userId).reverse(),
    add(order: Order) {
      const d = load();
      d.orders.push(order);
      save(d);
      return order;
    },
  },
};
