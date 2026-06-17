"use client";

import { useState } from "react";
import Image from "next/image";
import type { OurWorkImage } from "@/lib/our-work";
import { withBasePath } from "@/lib/utils";
import { ImageLightbox } from "@/components/ui/ImageLightbox";

interface OurWorkGalleryProps {
  images: OurWorkImage[];
}

export function OurWorkGallery({ images }: OurWorkGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-1 sm:gap-2 lg:grid-cols-4">
        {images.map((image, index) => (
          <button
            key={image.id}
            type="button"
            onClick={() => openLightbox(index)}
            className="group relative aspect-square overflow-hidden bg-brand-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent"
            aria-label={`View photo ${index + 1}`}
          >
            <Image
              src={withBasePath(image.src)}
              alt=""
              aria-hidden
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              loading="lazy"
            />
          </button>
        ))}
      </div>

      <ImageLightbox
        images={images}
        index={lightboxIndex}
        open={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onIndexChange={setLightboxIndex}
      />
    </>
  );
}
