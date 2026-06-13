import { Hero } from "@/components/sections/Hero";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Testimonials } from "@/components/sections/Testimonials";
import { ContactSection } from "@/components/sections/ContactSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { getLocalBusinessSchema } from "@/lib/services";

export const dynamic = "force-static";

export default async function HomePage() {
  const localBusinessSchema = await getLocalBusinessSchema();

  return (
    <>
      <JsonLd data={localBusinessSchema} />
      <Hero />
      <ServicesGrid />
      <HowItWorks />
      <Testimonials />
      <ContactSection />
    </>
  );
}
