import type { Metadata } from "next";
import { ourWorkImages } from "@/lib/our-work";
import { SITE } from "@/lib/constants";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { OurWorkGallery } from "@/components/sections/OurWorkGallery";

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

        {ourWorkImages.length > 0 ? (
          <OurWorkGallery images={ourWorkImages} />
        ) : (
          <p className="text-center text-brand-muted">
            Project photos are coming soon. Check back shortly.
          </p>
        )}

        <div className="mt-16 text-center">
          <Button href="/contact" size="lg">
            Request an Estimate
          </Button>
        </div>
      </Container>
    </div>
  );
}
