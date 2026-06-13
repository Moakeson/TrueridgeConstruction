import { Star } from "lucide-react";

export function StarRating() {
  return (
    <div
      className="flex gap-0.5 text-brand-accent"
      role="img"
      aria-label="5 out of 5 stars"
    >
      {Array.from({ length: 5 }).map((_, index) => (
        <Star key={index} className="h-4 w-4 fill-current" aria-hidden />
      ))}
    </div>
  );
}
