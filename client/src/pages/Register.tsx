import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true); setError("");
    try { await register(form.name, form.email, form.password); navigate("/"); }
    catch (err) { setError((err as Error).message); }
    finally { setBusy(false); }
  };

  return (
    <div className="card mx-auto grid max-w-3xl overflow-hidden md:grid-cols-[1fr_1.4fr]">
      <div className="hidden bg-brand p-8 text-white md:block">
        <h1 className="text-2xl font-semibold">Sign up</h1>
        <p className="mt-3 text-slate-200">Create an account to place orders and save your wishlist.</p>
      </div>
      <form onSubmit={submit} className="space-y-4 p-8">
        <input required placeholder="Full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input" />
        <input type="email" required placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="input" />
        <input type="password" required minLength={6} placeholder="Password (min 6 characters)" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="input" />
        {error && <p className="text-sm text-red-600" role="alert">{error}</p>}
        <button disabled={busy} className="btn-primary w-full">{busy ? "Creating account…" : "Sign up"}</button>
        <p className="text-center text-sm">Already registered? <Link to="/login" className="font-semibold text-brand">Login</Link></p>
      </form>
    </div>
  );
}
