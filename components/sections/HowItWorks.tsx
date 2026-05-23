import { HOW_IT_WORKS } from "@/lib/constants";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function HowItWorks() {
  return (
    <section
      aria-labelledby="process-heading"
      className="bg-brand-surface py-20"
    >
      <Container>
        <SectionHeading
          title="How It Works"
          subtitle="A straightforward process — from first walkthrough to final walkthrough."
        />

        <ol className="grid gap-8 md:grid-cols-5">
          {HOW_IT_WORKS.map((step) => (
            <li key={step.step} className="relative">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-accent font-heading text-lg font-semibold text-brand-black">
                {step.step}
              </span>
              <h3 className="mt-4 font-heading text-lg font-semibold">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-brand-muted">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
