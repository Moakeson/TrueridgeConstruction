import { SITE } from "@/lib/constants";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

interface ServiceHeroProps {
  headline: string;
  description: string;
  features: string[];
}

export function ServiceHero({
  headline,
  description,
  features,
}: ServiceHeroProps) {
  return (
    <Container className="py-10 sm:py-12">
      <div className="flex flex-col">
        <p className="text-sm font-medium uppercase tracking-widest text-brand-accent-text">
          {SITE.name}
        </p>
        <h1 className="mt-4 min-h-22 max-w-4xl font-heading text-4xl font-semibold tracking-tight sm:min-h-26 sm:text-5xl">
          {headline}
        </h1>
        <p className="mt-5 min-h-24 max-w-4xl text-lg leading-relaxed text-brand-muted">
          {description}
        </p>

        <ul className="mt-4 flex min-h-22 max-w-4xl flex-wrap content-start gap-2 sm:min-h-19">
          {features.map((feature) => (
            <li
              key={feature}
              className="rounded-full border border-brand-black/10 bg-brand-surface px-3 py-1 text-sm text-brand-muted"
            >
              {feature}
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <Button href="/contact" size="lg">
            Schedule a Free Consultation
          </Button>
          <Button href="/our-work" variant="ghost" size="lg">
            View Our Work
          </Button>
        </div>
      </div>
    </Container>
  );
}
