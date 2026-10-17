import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="card py-20 text-center">
      <h1 className="text-5xl font-bold text-brand">404</h1>
      <p className="mt-2 text-slate-600">We couldn't find that page.</p>
      <Link to="/" className="btn-primary mt-6 inline-block">Back to home</Link>
    </div>
  );
}
