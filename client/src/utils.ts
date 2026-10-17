export const formatPrice = (n: number) => "₹" + n.toLocaleString("en-IN");
export const discountPct = (price: number, mrp: number) => Math.round(((mrp - price) / mrp) * 100);
