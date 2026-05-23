import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SERVICES } from "@/lib/constants";
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
            <Card key={service.slug} as="article" className="flex h-full flex-col">
              <h3 className="font-heading text-xl font-semibold">
                {service.title}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-brand-muted">
                {service.shortDescription}
              </p>
              <Link
                href={service.href}
                className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand-accent hover:text-brand-accent/80"
              >
                Learn more <ArrowRight className="h-4 w-4" />
              </Link>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
