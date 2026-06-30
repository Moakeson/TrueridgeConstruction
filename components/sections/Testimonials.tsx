import dynamic from "next/dynamic";
import { getGoogleReviews } from "@/lib/google-reviews";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const ReviewsCarousel = dynamic(
  () =>
    import("@/components/sections/ReviewsCarousel").then(
      (mod) => mod.ReviewsCarousel,
    ),
  {
    loading: () => (
      <div
        className="mx-auto h-64 max-w-lg animate-pulse rounded-sm bg-brand-black/5"
        aria-hidden
      />
    ),
  },
);

export async function Testimonials() {
  const { reviews, googleMapsUri } = await getGoogleReviews();

  return (
    <section aria-labelledby="testimonials-heading" className="py-20">
      <Container>
        <SectionHeading title="Client Reviews" className="mb-6" />

        <ReviewsCarousel reviews={reviews} />

        {googleMapsUri ? (
          <div className="mt-10 text-center">
            <a
              href={googleMapsUri}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center justify-center rounded-sm bg-brand-accent px-6 py-3 text-base font-medium text-brand-black transition-colors hover:bg-brand-accent/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2"
            >
              See all reviews on Google
            </a>
          </div>
        ) : null}
      </Container>
    </section>
  );
}
