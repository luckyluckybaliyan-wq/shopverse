import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const slides = [
  { seed: "banner-electronics", title: "Big Savings on Electronics", sub: "Mobiles, laptops and audio - up to 60% off", to: "/products?category=Mobiles" },
  { seed: "banner-fashion", title: "Fresh Fashion Drops", sub: "Shirts, kurtas, sneakers and more", to: "/products?category=Fashion" },
  { seed: "banner-home", title: "Upgrade Your Home", sub: "Kitchen and furniture essentials", to: "/products?category=Home%20%26%20Kitchen" },
  { seed: "banner-books", title: "Read More. Learn More.", sub: "Bestselling books from 449", to: "/products?category=Books" },
];

export default function HeroCarousel() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % slides.length), 4500);
    return () => clearInterval(t);
  }, []);

  const go = (d: number) => setI((n) => (n + d + slides.length) % slides.length);

  return (
    <section className="relative overflow-hidden rounded-sm shadow-sm" aria-roledescription="carousel">
      <div className="flex transition-transform duration-500" style={{ transform: `translateX(-${i * 100}%)` }}>
        {slides.map((s) => (
          <Link key={s.seed} to={s.to} className="relative block h-44 w-full shrink-0 sm:h-64 lg:h-80">
            <img src={`https://picsum.photos/seed/${s.seed}/1400/420`} alt={s.title} className="h-full w-full object-cover" />
            <div className="absolute inset-0 flex flex-col justify-center bg-gradient-to-r from-black/70 to-transparent px-6 text-white sm:px-14">
              <h2 className="text-xl font-bold sm:text-4xl">{s.title}</h2>
              <p className="mt-1 text-sm sm:text-lg">{s.sub}</p>
              <span className="mt-3 w-fit rounded-sm bg-brand-orange px-4 py-2 text-xs font-semibold sm:text-sm">Shop now</span>
            </div>
          </Link>
        ))}
      </div>
      <button onClick={() => go(-1)} className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 px-2 py-6 text-xl" aria-label="Previous slide">‹</button>
      <button onClick={() => go(1)} className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 px-2 py-6 text-xl" aria-label="Next slide">›</button>
      <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-2">
        {slides.map((s, idx) => (
          <button key={s.seed} onClick={() => setI(idx)} aria-label={`Go to slide ${idx + 1}`} className={`h-2 w-2 rounded-full ${idx === i ? "bg-white" : "bg-white/50"}`} />
        ))}
      </div>
    </section>
  );
}
