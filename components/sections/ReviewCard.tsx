"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import type { ClientReview } from "@/lib/google-reviews";
import { Card } from "@/components/ui/Card";
import { StarRating } from "@/components/ui/StarRating";
import { GoogleGIcon } from "@/components/ui/GoogleGIcon";
import { cn } from "@/lib/utils";

interface ReviewCardProps {
  review: ClientReview;
  onInteract: () => void;
  selected?: boolean;
  expanded: boolean;
  onExpandedChange: (expanded: boolean) => void;
}

function AuthorAvatar({ name, photoUri }: { name: string; photoUri?: string }) {
  const initial = name.trim().charAt(0).toUpperCase() || "G";

  if (photoUri) {
    return (
      <Image
        src={photoUri}
        alt=""
        width={40}
        height={40}
        className="h-10 w-10 shrink-0 rounded-full object-cover"
        unoptimized
      />
    );
  }

  return (
    <div
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-black/8 font-heading text-sm font-semibold text-brand-accent-text"
      aria-hidden
    >
      {initial}
    </div>
  );
}

export function ReviewCard({
  review,
  onInteract,
  selected = false,
  expanded,
  onExpandedChange,
}: ReviewCardProps) {
  const textRef = useRef<HTMLParagraphElement>(null);
  const [hasOverflow, setHasOverflow] = useState(false);

  useLayoutEffect(() => {
    const el = textRef.current;
    if (!el || expanded) return;

    const checkOverflow = () => {
      setHasOverflow(el.scrollHeight > el.clientHeight + 1);
    };

    checkOverflow();

    const observer = new ResizeObserver(checkOverflow);
    observer.observe(el);
    return () => observer.disconnect();
  }, [review.text, expanded, selected]);

  const toggleExpanded = () => {
    onInteract();
    onExpandedChange(!expanded);
  };

  return (
    <Card
      as="article"
      className={cn(
        "relative flex flex-col",
        selected
          ? "border-brand-accent/50 shadow-lg ring-2 ring-brand-accent/40"
          : "border-brand-black/10 shadow-sm",
      )}
    >
      <GoogleGIcon className="absolute right-4 top-4" />

      <blockquote className="flex flex-col pr-8">
        <div className="flex items-center gap-3">
          <AuthorAvatar name={review.author} photoUri={review.photoUri} />
          <div className="min-w-0">
            <footer className="font-heading text-sm font-semibold text-brand-black">
              {review.author}
            </footer>
            {review.timeAgo ? (
              <p className="text-xs text-brand-muted">{review.timeAgo}</p>
            ) : null}
          </div>
        </div>

        <p
          ref={textRef}
          className={cn(
            "mt-4 text-base leading-relaxed text-brand-black/90",
            !expanded && "line-clamp-4 max-h-28",
          )}
        >
          {review.text}
        </p>

        {hasOverflow ? (
          <button
            type="button"
            onClick={toggleExpanded}
            className="mt-2 self-start text-sm font-medium text-brand-accent-text hover:text-brand-accent-text/80"
          >
            {expanded ? "Read less" : "Read more"}
          </button>
        ) : null}

        <div className="mt-4">
          <StarRating />
        </div>
      </blockquote>
    </Card>
  );
}
