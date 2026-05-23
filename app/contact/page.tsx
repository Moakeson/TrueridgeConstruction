import type { Metadata } from "next";
import { SITE } from "@/lib/constants";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactForm } from "@/components/forms/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us | Schedule a Free Consultation",
  description: `Contact ${SITE.name} for kitchen, bathroom, and basement remodels in ${SITE.serviceArea}. Call ${SITE.phone} or schedule a free consultation.`,
  alternates: { canonical: `${SITE.url}/contact` },
};

export const dynamic = "force-static";

export default function ContactPage() {
  return (
    <div className="pt-24">
      <Container className="py-16">
        <SectionHeading
          title="Schedule a Free Consultation"
          subtitle="Tell us about your remodel. We'll get back to you as soon as possible."
        />

        <div className="mx-auto max-w-xl">
          <ContactForm />
        </div>

        <div className="mx-auto mt-12 max-w-xl space-y-4 text-center">
          <p>
            <span className="text-brand-muted">Or call us at </span>
            <a
              href={SITE.phoneHref}
              className="font-heading text-xl font-semibold hover:text-brand-accent"
            >
              {SITE.phone}
            </a>
          </p>
          <p>
            <span className="text-brand-muted">Or email </span>
            <a
              href={SITE.emailHref}
              className="font-heading font-semibold hover:text-brand-accent"
            >
              {SITE.email}
            </a>
          </p>
        </div>
      </Container>
    </div>
  );
}
