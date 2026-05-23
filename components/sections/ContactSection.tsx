import dynamic from "next/dynamic";
import { SITE } from "@/lib/constants";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const ContactForm = dynamic(
  () =>
    import("@/components/forms/ContactForm").then((mod) => mod.ContactForm),
  {
    loading: () => (
      <div className="h-96 animate-pulse rounded-sm bg-brand-black/5" />
    ),
  },
);

export function ContactSection() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="bg-brand-surface py-20"
    >
      <Container>
        <SectionHeading
          title="Let's Talk About Your Project"
          subtitle="Ready to get started? Fill out the form, send us an email, or give us a call to schedule a free consultation."
        />

        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <ContactForm />
          </div>

          <div className="flex flex-col justify-center space-y-6">
            <div>
              <p className="text-sm font-medium uppercase tracking-wider text-brand-muted">
                Phone
              </p>
              <a
                href={SITE.phoneHref}
                className="mt-1 inline-flex min-h-11 items-center font-heading text-2xl font-semibold hover:text-brand-accent-text"
              >
                {SITE.phone}
              </a>
            </div>
            <div>
              <p className="text-sm font-medium uppercase tracking-wider text-brand-muted">
                Email
              </p>
              <a
                href={SITE.emailHref}
                className="mt-1 inline-flex min-h-11 items-center font-heading text-xl font-semibold hover:text-brand-accent-text"
              >
                {SITE.email}
              </a>
            </div>
            <div>
              <p className="text-sm font-medium uppercase tracking-wider text-brand-muted">
                Service Area
              </p>
              <p className="mt-1 text-lg">{SITE.serviceArea}</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
