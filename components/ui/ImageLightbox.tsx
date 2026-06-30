"use client";

import { useCallback, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { OurWorkImage } from "@/lib/our-work";
import { StaticImage } from "@/components/ui/StaticImage";

interface ImageLightboxProps {
  images: OurWorkImage[];
  index: number;
  open: boolean;
  onClose: () => void;
  onIndexChange: (index: number) => void;
}

export function ImageLightbox({
  images,
  index,
  open,
  onClose,
  onIndexChange,
}: ImageLightboxProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const hasMultiple = images.length > 1;
  const image = images[index];

  const goPrev = useCallback(() => {
    onIndexChange(index === 0 ? images.length - 1 : index - 1);
  }, [index, images.length, onIndexChange]);

  const goNext = useCallback(() => {
    onIndexChange(index === images.length - 1 ? 0 : index + 1);
  }, [index, images.length, onIndexChange]);

  useEffect(() => {
    if (!open) return;

    closeButtonRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      } else if (event.key === "ArrowLeft" && hasMultiple) {
        goPrev();
      } else if (event.key === "ArrowRight" && hasMultiple) {
        goNext();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, hasMultiple, goPrev, goNext, onClose]);

  if (!open || !image) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col bg-brand-black/95"
      role="dialog"
      aria-modal="true"
      aria-label="Project photo viewer"
    >
      <div className="flex shrink-0 items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <p className="text-sm text-brand-white/70">
          {hasMultiple ? `${index + 1} / ${images.length}` : null}
        </p>
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          className="rounded-full p-2 text-brand-white transition-colors hover:bg-brand-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent"
          aria-label="Close viewer"
        >
          <X className="h-6 w-6" />
        </button>
      </div>

      <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 pb-4 sm:px-16">
        {hasMultiple ? (
          <button
            type="button"
            onClick={goPrev}
            className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-brand-black/60 p-3 text-brand-white backdrop-blur transition-colors hover:bg-brand-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent sm:left-4"
            aria-label="Previous photo"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
        ) : null}

        <div className="relative flex h-full w-full max-h-[calc(100vh-8rem)] items-center justify-center">
          <StaticImage
            src={image.src}
            alt=""
            width={image.width}
            height={image.height}
            className="h-auto w-auto max-h-full max-w-full object-contain"
            sizes="100vw"
            priority
            aria-hidden
          />
        </div>

        {hasMultiple ? (
          <button
            type="button"
            onClick={goNext}
            className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-brand-black/60 p-3 text-brand-white backdrop-blur transition-colors hover:bg-brand-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent sm:right-4"
            aria-label="Next photo"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        ) : null}
      </div>
    </div>
  );
}
