"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Project } from "@/lib/projects";
import { withBasePath } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface ProjectCarouselProps {
  projects: Project[];
}

export function ProjectCarousel({ projects }: ProjectCarouselProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const autoplayRef = useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true, stopOnMouseEnter: true }),
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true },
    reducedMotion ? [] : [autoplayRef.current],
  );

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi],
  );

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  return (
    <div
      className="group bg-brand-black"
      role="region"
      aria-roledescription="carousel"
      aria-label="Our latest remodeling projects"
      onFocus={() => autoplayRef.current.stop()}
      onBlur={() => {
        if (!reducedMotion) autoplayRef.current.play();
      }}
    >
      <div className="relative h-[50vh] min-h-[320px] md:h-[65vh]">
        <div ref={emblaRef} className="h-full overflow-hidden">
          <div className="flex h-full">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className="relative flex min-w-0 flex-[0_0_100%] h-full items-center justify-center bg-brand-black"
              >
                <Image
                  src={withBasePath(project.src)}
                  alt={project.alt}
                  width={project.width}
                  height={project.height}
                  className="h-auto w-auto max-h-full max-w-full"
                  sizes="100vw"
                  priority={index === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black/80 via-brand-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10">
                  <p className="font-heading text-xl text-brand-white sm:text-2xl md:text-3xl">
                    {project.caption}
                  </p>
                </div>
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
            aria-label={`Go to slide ${index + 1}: ${project.caption}`}
            aria-current={index === selectedIndex ? "true" : undefined}
            onClick={() => scrollTo(index)}
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
  );
}
