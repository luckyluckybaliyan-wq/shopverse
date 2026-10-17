export default function Stars({ rating, reviews }: { rating: number; reviews?: number }) {
  const color = rating >= 4 ? "bg-green-600" : rating >= 3 ? "bg-yellow-500" : "bg-red-500";
  return (
    <div className="flex items-center gap-2 text-xs">
      <span className={`rounded-sm px-1.5 py-0.5 font-semibold text-white ${color}`}>{rating.toFixed(1)} ★</span>
      {reviews !== undefined && <span className="text-slate-500">({reviews.toLocaleString("en-IN")})</span>}
    </div>
  );
}
