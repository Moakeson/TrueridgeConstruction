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
  const [pulseScale, setPulseScale] = useState(1.05);

  const autoplayRef = useRef(
    Autoplay({
      delay: AUTOPLAY_DELAY_MS,
      stopOnInteraction: false,
      stopOnMouseEnter: false,
    }),
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      align: "center",
      loop: reviews.length > 1,
      containScroll: false,
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

  useEffect(() => {
    if (reducedMotion) {
      setPulseScale(1.05);
      return;
    }

    setPulseScale(0.9);
    const growFrame = requestAnimationFrame(() => {
      setPulseScale(1.08);
    });
    const settleTimer = window.setTimeout(() => {
      setPulseScale(1.05);
    }, 550);

    return () => {
      cancelAnimationFrame(growFrame);
      window.clearTimeout(settleTimer);
    };
  }, [selectedIndex, reducedMotion]);

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
      className="group relative -mt-2"
      role="region"
      aria-roledescription="carousel"
      aria-label="Client reviews"
      onPointerDown={stopAutoplay}
    >
      <div
        ref={mounted ? emblaRef : undefined}
        className="overflow-hidden py-6"
      >
        <div className="flex">
          {reviews.map((review, index) => {
            const isSelected = index === selectedIndex;

            return (
              <div
                key={`${review.author}-${review.text.slice(0, 24)}`}
                className="min-w-0 flex-[0_0_88%] px-2 sm:flex-[0_0_72%] md:flex-[0_0_58%] lg:flex-[0_0_48%]"
              >
                <div
                  className={cn(
                    "h-full will-change-transform",
                    !reducedMotion && "transition-all duration-500 ease-out",
                    isSelected
                      ? "z-10 opacity-100"
                      : "scale-[0.85] opacity-40",
                  )}
                  style={
                    isSelected && !reducedMotion
                      ? { transform: `scale(${pulseScale})` }
                      : undefined
                  }
                >
                  <ReviewCard
                    review={review}
                    onInteract={stopAutoplay}
                    selected={isSelected}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {reviews.length > 1 ? (
        <>
          <button
            type="button"
            onClick={scrollPrev}
            disabled={!canScrollPrev}
            className="absolute left-0 top-1/2 z-20 -translate-y-1/2 rounded-full border border-brand-black/10 bg-white p-2 text-brand-black shadow-md transition-opacity hover:bg-brand-black/5 focus-visible:opacity-100 disabled:pointer-events-none disabled:opacity-30 sm:left-2"
            aria-label="Previous review"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={scrollNext}
            disabled={!canScrollNext}
            className="absolute right-0 top-1/2 z-20 -translate-y-1/2 rounded-full border border-brand-black/10 bg-white p-2 text-brand-black shadow-md transition-opacity hover:bg-brand-black/5 focus-visible:opacity-100 disabled:pointer-events-none disabled:opacity-30 sm:right-2"
            aria-label="Next review"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <div
            className="mt-2 flex justify-center gap-1"
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
                    "rounded-full transition-all duration-300",
                    index === selectedIndex
                      ? "h-2.5 w-2.5 scale-125 bg-brand-accent"
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
