import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SERVICES } from "@/lib/constants";
import { withBasePath } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";

export function ServicesGrid() {
  return (
    <section aria-labelledby="services-heading" className="py-20">
      <Container>
        <SectionHeading
          id="services-heading"
          title="Our Services"
          subtitle="From a single room update to a full basement finish-out, we handle remodels with clear communication and quality craftsmanship."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((service) => (
            <Card
              key={service.slug}
              as="article"
              className="flex h-full flex-col overflow-hidden p-0"
            >
              <div className="relative aspect-square w-full">
                <Image
                  src={withBasePath(service.image)}
                  alt={service.imageAlt}
                  fill
                  className="object-cover"
                  style={
                    "imagePosition" in service
                      ? { objectPosition: service.imagePosition }
                      : undefined
                  }
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-heading text-xl font-semibold">
                  {service.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-brand-muted">
                  {service.shortDescription}
                </p>
                <Link
                  href={service.href}
                  className="mt-4 inline-flex min-h-11 items-center gap-1 text-sm font-medium text-brand-accent-text hover:text-brand-accent-text/80"
                >
                  Explore {service.title}{" "}
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
