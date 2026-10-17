export interface Product {
  id: number;
  title: string;
  brand: string;
  category: string;
  price: number;
  mrp: number;
  rating: number;
  reviews: number;
  stock: number;
  description: string;
  images: string[];
  specs: Record<string, string>;
}

export interface User {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
}

export interface OrderItem {
  productId: number;
  title: string;
  image: string;
  price: number;
  qty: number;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  total: number;
  address: { name: string; phone: string; line: string; city: string; pincode: string };
  payment: "COD" | "UPI" | "CARD";
  status: "PLACED" | "SHIPPED" | "DELIVERED";
  createdAt: string;
}
