import { Link } from "react-router-dom";

const cols = [
  { title: "About", links: ["About Us", "Careers", "Press", "ShopVerse Stories"] },
  { title: "Help", links: ["Payments", "Shipping", "Cancellation & Returns", "FAQ"] },
  { title: "Policy", links: ["Return Policy", "Terms of Use", "Security", "Privacy"] },
];

export default function Footer() {
  return (
    <footer className="mt-8 bg-slate-900 text-slate-300">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:grid-cols-2 lg:grid-cols-4">
        {cols.map((c) => (
          <div key={c.title}>
            <h4 className="mb-3 text-sm font-semibold text-white">{c.title}</h4>
            <ul className="space-y-2 text-sm">
              {c.links.map((l) => (<li key={l}><Link to="/" className="hover:text-white">{l}</Link></li>))}
            </ul>
          </div>
        ))}
        <div>
          <h4 className="mb-3 text-sm font-semibold text-white">Built by</h4>
          <p className="text-sm">Lucky Baliyan</p>
          <p className="mt-1 text-sm text-slate-400">React · TypeScript · Tailwind · Node.js · Express</p>
        </div>
      </div>
      <div className="border-t border-slate-700 py-4 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} ShopVerse. A portfolio project - not a real store.
      </div>
    </footer>
  );
}
