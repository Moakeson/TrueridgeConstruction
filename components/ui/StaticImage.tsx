import type { ImgHTMLAttributes } from "react";
import imageVariants from "@/lib/image-variants.json";
import { cn, withBasePath } from "@/lib/utils";

interface StaticImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  fill?: boolean;
  fetchPriority?: "high" | "low" | "auto";
}

type ImageVariantEntry = {
  width: number;
  height: number;
  variants: { width: number; path: string }[];
};

function getVariantData(src: string): ImageVariantEntry | undefined {
  const normalized = src.startsWith("/") ? src : `/${src}`;
  return (imageVariants as Record<string, ImageVariantEntry>)[normalized];
}

function buildSrcSet(variants: { width: number; path: string }[]): string {
  return variants
    .map((variant) => `${withBasePath(variant.path)} ${variant.width}w`)
    .join(", ");
}

export function StaticImage({
  src,
  alt,
  sizes,
  priority = false,
  className,
  fill = false,
  width,
  height,
  fetchPriority,
  ...rest
}: StaticImageProps) {
  const normalized = src.startsWith("/") ? src : `/${src}`;
  const data = getVariantData(normalized);
  const fallbackWidth =
    typeof width === "number" ? width : (data?.width ?? 0);
  const variants =
    data?.variants ?? [{ width: fallbackWidth, path: normalized }];
  const defaultVariant = variants[variants.length - 1];
  const resolvedFetchPriority = fetchPriority ?? (priority ? "high" : undefined);

  const imgProps = {
    src: withBasePath(defaultVariant.path),
    srcSet: variants.length > 1 ? buildSrcSet(variants) : undefined,
    sizes,
    alt,
    decoding: "async" as const,
    loading: priority ? ("eager" as const) : ("lazy" as const),
    fetchPriority: resolvedFetchPriority,
    width: fill ? undefined : (width ?? data?.width),
    height: fill ? undefined : (height ?? data?.height),
    className: cn(
      fill && "absolute inset-0 h-full w-full object-cover",
      className,
    ),
  };

  return <img {...rest} {...imgProps} />; // eslint-disable-line @next/next/no-img-element -- srcset for static export
}
