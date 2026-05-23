import { preload } from "react-dom";
import Image from "next/image";
import { SITE } from "@/lib/constants";
import { HERO_IMAGE } from "@/lib/projects";
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
        <Image
          src={withBasePath("/logo.svg")}
          alt={`${SITE.name} logo`}
          width={320}
          height={320}
          priority
          className="mx-auto h-48 w-48 sm:h-64 sm:w-64 md:h-80 md:w-80"
        />

        <h1 className="mt-8 font-heading text-4xl font-semibold tracking-tight text-brand-white sm:text-5xl md:text-6xl">
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
