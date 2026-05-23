import { TESTIMONIALS } from "@/lib/constants";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";

export function Testimonials() {
  return (
    <section aria-labelledby="testimonials-heading" className="py-20">
      <Container>
        <SectionHeading title="What Homeowners Say" />

        <div className="grid gap-8 md:grid-cols-2">
          {TESTIMONIALS.map((testimonial) => (
            <Card key={testimonial.author} as="article" className="flex h-full flex-col">
              <blockquote className="flex flex-1 flex-col">
                <p className="flex-1 text-lg leading-relaxed text-brand-black/90">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <footer className="mt-4 font-heading text-sm font-semibold text-brand-accent-text">
                  — {testimonial.author}
                </footer>
              </blockquote>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
