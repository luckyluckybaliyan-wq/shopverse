import { Address, Category, Order, Product, ProductPage, User } from "../types";

const TOKEN_KEY = "shopverse_token";
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const setToken = (t: string | null) => (t ? localStorage.setItem(TOKEN_KEY, t) : localStorage.removeItem(TOKEN_KEY));

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getToken();
  const res = await fetch(`/api${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || "Something went wrong");
  return data as T;
}

export const api = {
  categories: () => request<Category[]>("/products/meta/categories"),
  products: (params: Record<string, string | number | undefined>) => {
    const qs = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => v !== undefined && v !== "" && qs.set(k, String(v)));
    return request<ProductPage>(`/products?${qs}`);
  },
  product: (id: string | number) => request<{ product: Product; related: Product[] }>(`/products/${id}`),
  register: (body: { name: string; email: string; password: string }) =>
    request<{ token: string; user: User }>("/auth/register", { method: "POST", body: JSON.stringify(body) }),
  login: (body: { email: string; password: string }) =>
    request<{ token: string; user: User }>("/auth/login", { method: "POST", body: JSON.stringify(body) }),
  me: () => request<User>("/auth/me"),
  orders: () => request<Order[]>("/orders"),
  placeOrder: (body: { items: { productId: number; qty: number }[]; address: Address; payment: string }) =>
    request<Order>("/orders", { method: "POST", body: JSON.stringify(body) }),
};
