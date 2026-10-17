import { FormEvent, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: string } | null)?.from ?? "/";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true); setError("");
    try { await login(email, password); navigate(from, { replace: true }); }
    catch (err) { setError((err as Error).message); }
    finally { setBusy(false); }
  };

  return (
    <div className="card mx-auto grid max-w-3xl overflow-hidden md:grid-cols-[1fr_1.4fr]">
      <div className="hidden bg-brand p-8 text-white md:block">
        <h1 className="text-2xl font-semibold">Login</h1>
        <p className="mt-3 text-slate-200">Get access to your orders, wishlist and recommendations.</p>
      </div>
      <form onSubmit={submit} className="space-y-4 p-8">
        <input type="email" required placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="input" />
        <input type="password" required placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="input" />
        {error && <p className="text-sm text-red-600" role="alert">{error}</p>}
        <button disabled={busy} className="btn-primary w-full">{busy ? "Logging in…" : "Login"}</button>
        <p className="text-center text-sm">New to ShopVerse? <Link to="/register" className="font-semibold text-brand">Create an account</Link></p>
      </form>
    </div>
  );
}
