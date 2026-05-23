"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Project } from "@/lib/projects";
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
      className="group relative h-[50vh] min-h-[320px] md:h-[65vh]"
      role="region"
      aria-roledescription="carousel"
      aria-label="Our latest remodeling projects"
      onFocus={() => autoplayRef.current.stop()}
      onBlur={() => {
        if (!reducedMotion) autoplayRef.current.play();
      }}
    >
      <div ref={emblaRef} className="h-full overflow-hidden">
        <div className="flex h-full">
          {projects.map((project) => (
            <div
              key={project.id}
              className="relative min-w-0 flex-[0_0_100%] h-full"
            >
              <Image
                src={project.src}
                alt={project.alt}
                fill
                className="object-cover"
                sizes="100vw"
                loading="lazy"
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

      <div
        className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2"
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
            className={cn(
              "h-2.5 w-2.5 rounded-full transition-colors",
              index === selectedIndex
                ? "bg-brand-accent"
                : "bg-brand-white/50 hover:bg-brand-white/80",
            )}
          />
        ))}
      </div>
    </div>
  );
}
