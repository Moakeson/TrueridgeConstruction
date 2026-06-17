import { preload } from "react-dom";
import Image from "next/image";
import { HERO_IMAGE, SITE } from "@/lib/constants";
import { withBasePath } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

const heroSrc = withBasePath(HERO_IMAGE);
preload(heroSrc, { as: "image", fetchPriority: "high" });

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden pt-20">
      <Image
        src={heroSrc}
        alt=""
        fill
        priority
        className="object-cover"
        sizes="100vw"
        aria-hidden
      />
      <div className="absolute inset-0 bg-brand-black/75" />
      <div className="blueprint-grid absolute inset-0" />

      <Container className="relative z-10 py-20 text-center">
        <h1 className="font-heading text-4xl font-semibold tracking-tight text-brand-white sm:text-5xl md:text-6xl">
          {SITE.tagline}
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-brand-white/85 sm:text-xl">
          Kitchen, bathroom, and basement remodels with clear estimates and
          craftsmanship you can see.
        </p>

        <p className="mt-4 text-sm font-medium uppercase tracking-widest text-brand-accent">
          Serving {SITE.serviceArea}
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button href="/contact" size="lg">
            Schedule a Free Consultation
          </Button>
          <Button href="/our-work" variant="outline" size="lg">
            View Our Work
          </Button>
        </div>
      </Container>
    </section>
  );
}
