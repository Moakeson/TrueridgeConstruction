import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getServiceDetail, getServiceSchema, serviceDetails } from "@/lib/services";
import { getServiceGallery } from "@/lib/service-gallery";
import { SITE } from "@/lib/constants";
import { JsonLd } from "@/components/seo/JsonLd";
import { ServiceHero } from "@/components/sections/ServiceHero";
import { ServiceWorkGrid } from "@/components/sections/ServiceWorkGrid";

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
  const gallery = getServiceGallery(slug);

  return (
    <>
      {schema && <JsonLd data={schema} />}
      <div className="pt-24">
        <ServiceHero
          headline={service.headline}
          description={service.description}
          features={service.features}
        />

        {gallery && <ServiceWorkGrid gallery={gallery} />}
      </div>
    </>
  );
}
