"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { OurWorkImage } from "@/lib/our-work";
import { cn } from "@/lib/utils";
import { StaticImage } from "@/components/ui/StaticImage";
import { ImageLightbox } from "@/components/ui/ImageLightbox";

interface ProjectCarouselProps {
  projects: OurWorkImage[];
}

export function ProjectCarousel({ projects }: ProjectCarouselProps) {
  const [mounted, setMounted] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

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

  const autoplayRef = useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true, stopOnMouseEnter: true }),
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true },
    mounted && !reducedMotion ? [autoplayRef.current] : [],
  );

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi],
  );

  const openLightbox = useCallback(
    (index: number) => {
      setLightboxIndex(index);
      setLightboxOpen(true);
      scrollTo(index);
      autoplayRef.current.stop();
    },
    [scrollTo],
  );

  const handleLightboxIndexChange = useCallback(
    (index: number) => {
      setLightboxIndex(index);
      scrollTo(index);
    },
    [scrollTo],
  );

  useEffect(() => {
    if (!mounted || !emblaApi) return;

    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, mounted]);

  return (
    <>
      <div
        className="group bg-brand-black"
        role="region"
        aria-roledescription="carousel"
        aria-label="Our latest remodeling projects"
        onFocus={() => autoplayRef.current.stop()}
        onBlur={() => {
          if (!reducedMotion && !lightboxOpen) autoplayRef.current.play();
        }}
      >
        <div className="relative h-[50vh] min-h-[320px] md:h-[65vh]">
          <div
            ref={mounted ? emblaRef : undefined}
            className="h-full overflow-hidden"
          >
            <div className="flex h-full">
              {projects.map((project, index) => (
                <div
                  key={project.id}
                  className="relative flex min-w-0 flex-[0_0_100%] h-full items-center justify-center bg-brand-black"
                >
                  <button
                    type="button"
                    onClick={() => openLightbox(index)}
                    className="relative flex h-full w-full items-center justify-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent"
                    aria-label={`View photo ${index + 1}`}
                  >
                    <StaticImage
                      src={project.src}
                      alt=""
                      width={project.width}
                      height={project.height}
                      className="h-auto w-auto max-h-full max-w-full"
                      sizes="100vw"
                      priority={index === 0}
                      aria-hidden
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={scrollPrev}
            className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-brand-black/60 p-3 text-brand-white opacity-0 backdrop-blur transition-opacity hover:bg-brand-black/80 focus-visible:opacity-100 group-hover:opacity-100"
            aria-label="Previous project"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <button
            type="button"
            onClick={scrollNext}
            className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-brand-black/60 p-3 text-brand-white opacity-0 backdrop-blur transition-opacity hover:bg-brand-black/80 focus-visible:opacity-100 group-hover:opacity-100"
            aria-label="Next project"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>

        <div
          className="flex justify-center gap-0.5 py-4"
          role="tablist"
          aria-label="Project slides"
        >
          {projects.map((project, index) => (
            <button
              key={project.id}
              type="button"
              role="tab"
              aria-selected={index === selectedIndex}
              aria-label={`View photo ${index + 1}`}
              aria-current={index === selectedIndex ? "true" : undefined}
              onClick={() => openLightbox(index)}
              className="flex h-10 w-10 items-center justify-center"
            >
              <span
                className={cn(
                  "rounded-full transition-colors",
                  index === selectedIndex
                    ? "h-2 w-2 bg-brand-accent"
                    : "h-1.5 w-1.5 bg-brand-white/25 hover:bg-brand-white/45",
                )}
              />
            </button>
          ))}
        </div>
      </div>

      <ImageLightbox
        images={projects}
        index={lightboxIndex}
        open={lightboxOpen}
        onClose={() => {
          setLightboxOpen(false);
          if (!reducedMotion) autoplayRef.current.play();
        }}
        onIndexChange={handleLightboxIndexChange}
      />
    </>
  );
}
