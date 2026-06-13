import { getGoogleReviews } from "@/lib/google-reviews";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ReviewsCarousel } from "@/components/sections/ReviewsCarousel";

export async function Testimonials() {
  const { reviews, googleMapsUri } = await getGoogleReviews();

  return (
    <section aria-labelledby="testimonials-heading" className="py-20">
      <Container>
        <SectionHeading title="Client Reviews" className="mb-6" />

        <ReviewsCarousel reviews={reviews} />

        {googleMapsUri ? (
          <p className="mt-10 text-center">
            <a
              href={googleMapsUri}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-brand-accent-text hover:text-brand-accent-text/80"
            >
              See all reviews on Google
            </a>
          </p>
        ) : null}
      </Container>
    </section>
  );
}
