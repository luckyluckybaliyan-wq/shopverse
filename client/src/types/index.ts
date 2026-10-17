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

export interface Category {
  name: string;
  image: string;
  count: number;
}

export interface CartLine {
  product: Product;
  qty: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Address {
  name: string;
  phone: string;
  line: string;
  city: string;
  pincode: string;
}

export interface Order {
  id: string;
  items: { productId: number; title: string; image: string; price: number; qty: number }[];
  total: number;
  address: Address;
  payment: "COD" | "UPI" | "CARD";
  status: "PLACED" | "SHIPPED" | "DELIVERED";
  createdAt: string;
}

export interface ProductPage {
  total: number;
  page: number;
  pages: number;
  items: Product[];
}
