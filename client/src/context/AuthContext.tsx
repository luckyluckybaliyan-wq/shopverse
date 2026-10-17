import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { api, getToken, setToken } from "../api/client";
import { User } from "../types";

interface AuthState {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const Ctx = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(!!getToken());

  useEffect(() => {
    if (!getToken()) return;
    api.me().then(setUser).catch(() => setToken(null)).finally(() => setLoading(false));
  }, []);

  const value: AuthState = {
    user,
    loading,
    async login(email, password) {
      const res = await api.login({ email, password });
      setToken(res.token);
      setUser(res.user);
    },
    async register(name, email, password) {
      const res = await api.register({ name, email, password });
      setToken(res.token);
      setUser(res.user);
    },
    logout() {
      setToken(null);
      setUser(null);
    },
  };
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useAuth = () => {
  const c = useContext(Ctx);
  if (!c) throw new Error("useAuth must be used inside AuthProvider");
  return c;
};
