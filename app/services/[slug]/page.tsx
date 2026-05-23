import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getServiceDetail, getServiceSchema, serviceDetails } from "@/lib/services";
import { SITE } from "@/lib/constants";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/seo/JsonLd";

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return Object.keys(serviceDetails).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceDetail(slug);
  if (!service) return {};

  return {
    title: service.metaTitle,
    description: service.metaDescription,
    alternates: { canonical: `${SITE.url}/services/${slug}` },
  };
}

export const dynamic = "force-static";

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServiceDetail(slug);

  if (!service) notFound();

  const schema = getServiceSchema(slug);

  return (
    <>
      {schema && <JsonLd data={schema} />}
      <div className="pt-24">
        <Container className="py-16">
          <p className="text-sm font-medium uppercase tracking-widest text-brand-accent">
            {SITE.name}
          </p>
          <h1 className="mt-4 max-w-3xl font-heading text-4xl font-semibold tracking-tight sm:text-5xl">
            {service.headline}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-brand-muted">
            {service.description}
          </p>

          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {service.features.map((feature) => (
              <li
                key={feature}
                className="flex items-start gap-3 rounded-sm border border-brand-black/10 bg-brand-surface px-4 py-3"
              >
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-brand-accent" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          <div className="mt-12 flex flex-col gap-4 sm:flex-row">
            <Button href="/contact" size="lg">
              Schedule a Free Consultation
            </Button>
            <Button href="/our-work" variant="ghost" size="lg">
              View Our Work
            </Button>
          </div>
        </Container>
      </div>
    </>
  );
}
