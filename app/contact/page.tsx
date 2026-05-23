import type { Metadata } from "next";
import nextDynamic from "next/dynamic";
import { SITE } from "@/lib/constants";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const ContactForm = nextDynamic(
  () =>
    import("@/components/forms/ContactForm").then((mod) => mod.ContactForm),
  {
    loading: () => (
      <div className="h-96 animate-pulse rounded-sm bg-brand-black/5" />
    ),
  },
);

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
              className="inline-flex min-h-11 items-center font-heading text-xl font-semibold hover:text-brand-accent-text"
            >
              {SITE.phone}
            </a>
          </p>
          <p>
            <span className="text-brand-muted">Or email </span>
            <a
              href={SITE.emailHref}
              className="inline-flex min-h-11 items-center font-heading font-semibold hover:text-brand-accent-text"
            >
              {SITE.email}
            </a>
          </p>
        </div>
      </Container>
    </div>
  );
}
