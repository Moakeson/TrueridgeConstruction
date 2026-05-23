import type { Metadata } from "next";
import Image from "next/image";
import { projects } from "@/lib/projects";
import { SITE } from "@/lib/constants";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Our Work | Remodel Portfolio",
  description: `Browse kitchen, bathroom, basement, and fireplace remodel projects by ${SITE.name}. Serving ${SITE.serviceArea}.`,
  alternates: { canonical: `${SITE.url}/our-work` },
};

export const dynamic = "force-static";

export default function OurWorkPage() {
  return (
    <div className="pt-24">
      <Container className="py-16">
        <SectionHeading
          title="Our Work"
          subtitle="Quality craftsmanship across kitchens, bathrooms, basements, and fireplace installs throughout Utah."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <figure
              key={project.id}
              className="group relative aspect-[4/3] overflow-hidden rounded-sm"
            >
              <Image
                src={project.src}
                alt={project.alt}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                loading="lazy"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-black/90 to-transparent p-4">
                <p className="text-sm font-medium text-brand-white">
                  {project.caption}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Button href="/contact" size="lg">
            Request an Estimate
          </Button>
        </div>
      </Container>
    </div>
  );
}
