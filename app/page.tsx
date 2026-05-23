import nextDynamic from "next/dynamic";
import { Hero } from "@/components/sections/Hero";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Testimonials } from "@/components/sections/Testimonials";
import { ContactSection } from "@/components/sections/ContactSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { getLocalBusinessSchema } from "@/lib/services";

const ProjectGallery = nextDynamic(
  () =>
    import("@/components/sections/ProjectGallery").then(
      (mod) => mod.ProjectGallery,
    ),
  { loading: () => <div className="h-[50vh] bg-brand-black md:h-[65vh]" /> },
);

export const dynamic = "force-static";

export default function HomePage() {
  return (
    <>
      <JsonLd data={getLocalBusinessSchema()} />
      <Hero />
      <ProjectGallery />
      <ServicesGrid />
      <HowItWorks />
      <Testimonials />
      <ContactSection />
    </>
  );
}
