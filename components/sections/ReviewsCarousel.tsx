"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { ClientReview } from "@/lib/google-reviews";
import { ReviewCard } from "@/components/sections/ReviewCard";
import { cn } from "@/lib/utils";

interface ReviewsCarouselProps {
  reviews: ClientReview[];
}

const AUTOPLAY_DELAY_MS = 6000;

export function ReviewsCarousel({ reviews }: ReviewsCarouselProps) {
  const [mounted, setMounted] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const autoplayRef = useRef(
    Autoplay({
      delay: AUTOPLAY_DELAY_MS,
      stopOnInteraction: false,
      stopOnMouseEnter: false,
    }),
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      align: "start",
      loop: reviews.length > 1,
      containScroll: "trimSnaps",
    },
    mounted && !reducedMotion && !userInteracted ? [autoplayRef.current] : [],
  );

  const stopAutoplay = useCallback(() => {
    setUserInteracted(true);
    autoplayRef.current.stop();
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [mounted]);

  useEffect(() => {
    if (userInteracted) {
      autoplayRef.current.stop();
    }
  }, [userInteracted]);

  const scrollPrev = useCallback(() => {
    stopAutoplay();
    emblaApi?.scrollPrev();
  }, [emblaApi, stopAutoplay]);

  const scrollNext = useCallback(() => {
    stopAutoplay();
    emblaApi?.scrollNext();
  }, [emblaApi, stopAutoplay]);

  const scrollTo = useCallback(
    (index: number) => {
      stopAutoplay();
      emblaApi?.scrollTo(index);
    },
    [emblaApi, stopAutoplay],
  );

  useEffect(() => {
    if (!mounted || !emblaApi) return;

    const update = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
      setCanScrollPrev(emblaApi.canScrollPrev());
      setCanScrollNext(emblaApi.canScrollNext());
    };

    emblaApi.on("select", update);
    emblaApi.on("reInit", update);
    update();

    return () => {
      emblaApi.off("select", update);
      emblaApi.off("reInit", update);
    };
  }, [emblaApi, mounted]);

  if (reviews.length === 0) {
    return null;
  }

  return (
    <div
      className="group relative"
      role="region"
      aria-roledescription="carousel"
      aria-label="Client reviews"
      onPointerDown={stopAutoplay}
    >
      <div ref={mounted ? emblaRef : undefined} className="overflow-hidden">
        <div className="-ml-4 flex">
          {reviews.map((review) => (
            <div
              key={`${review.author}-${review.text.slice(0, 24)}`}
              className="min-w-0 flex-[0_0_100%] pl-4 sm:flex-[0_0_85%] md:flex-[0_0_55%] lg:flex-[0_0_42%]"
            >
              <ReviewCard review={review} onInteract={stopAutoplay} />
            </div>
          ))}
        </div>
      </div>

      {reviews.length > 1 ? (
        <>
          <button
            type="button"
            onClick={scrollPrev}
            disabled={!canScrollPrev}
            className="absolute -left-3 top-1/2 z-10 hidden -translate-y-1/2 rounded-full border border-brand-black/10 bg-white p-2 text-brand-black shadow-sm transition-opacity hover:bg-brand-black/5 focus-visible:opacity-100 disabled:pointer-events-none disabled:opacity-30 sm:flex lg:-left-5"
            aria-label="Previous review"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={scrollNext}
            disabled={!canScrollNext}
            className="absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 rounded-full border border-brand-black/10 bg-white p-2 text-brand-black shadow-sm transition-opacity hover:bg-brand-black/5 focus-visible:opacity-100 disabled:pointer-events-none disabled:opacity-30 sm:flex lg:-right-5"
            aria-label="Next review"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <div
            className="mt-6 flex justify-center gap-1"
            role="tablist"
            aria-label="Review slides"
          >
            {reviews.map((review, index) => (
              <button
                key={`${review.author}-dot-${index}`}
                type="button"
                role="tab"
                aria-selected={index === selectedIndex}
                aria-label={`Go to review ${index + 1} by ${review.author}`}
                aria-current={index === selectedIndex ? "true" : undefined}
                onClick={() => scrollTo(index)}
                className="flex h-8 w-8 items-center justify-center"
              >
                <span
                  className={cn(
                    "rounded-full transition-colors",
                    index === selectedIndex
                      ? "h-2 w-2 bg-brand-accent"
                      : "h-1.5 w-1.5 bg-brand-black/20 hover:bg-brand-black/35",
                  )}
                />
              </button>
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}
