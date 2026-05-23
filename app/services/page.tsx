import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SERVICES, SITE } from "@/lib/constants";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Remodeling Services",
  description: `Kitchen, bathroom, basement remodels and fireplace installs in ${SITE.serviceArea}. Clear estimates and quality craftsmanship. Schedule a free consultation.`,
  alternates: { canonical: `${SITE.url}/services` },
};

export const dynamic = "force-static";

export default function ServicesPage() {
  return (
    <div className="pt-24">
      <Container className="py-16">
        <SectionHeading
          title="Remodeling Services"
          subtitle="Whether you're updating a single room or finishing an entire basement, we work closely with you from concept to completion."
        />

        <div className="grid gap-8 md:grid-cols-2">
          {SERVICES.map((service) => (
            <Card key={service.slug} as="article" className="p-8">
              <h2 className="font-heading text-2xl font-semibold">
                {service.title}
              </h2>
              <p className="mt-4 leading-relaxed text-brand-muted">
                {service.shortDescription}
              </p>
              <Link
                href={service.href}
                className="mt-6 inline-flex items-center gap-1 font-medium text-brand-accent hover:text-brand-accent/80"
              >
                View details <ArrowRight className="h-4 w-4" />
              </Link>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Button href="/contact" size="lg">
            Schedule a Free Consultation
          </Button>
        </div>
      </Container>
    </div>
  );
}
