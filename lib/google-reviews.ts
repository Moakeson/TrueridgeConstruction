import { TESTIMONIALS } from "@/lib/constants";

export interface ClientReview {
  author: string;
  text: string;
  rating: number;
  photoUri?: string;
  timeAgo?: string;
  publishedAt?: string;
}

export interface GoogleReviewsResult {
  reviews: ClientReview[];
  googleMapsUri: string | null;
  rating: number | null;
  userRatingCount: number | null;
  source: "google" | "fallback";
}

interface PlacesApiReview {
  rating?: number;
  text?: { text?: string };
  authorAttribution?: {
    displayName?: string;
    photoUri?: string;
  };
  publishTime?: string;
  relativePublishTimeDescription?: string;
}

interface PlacesApiResponse {
  reviews?: PlacesApiReview[];
  rating?: number;
  userRatingCount?: number;
  googleMapsUri?: string;
}

let cachedResult: GoogleReviewsResult | null = null;

/** Max reviews to show on the site (5-star only, most recent first). */
export const MAX_REVIEWS = 10;

function sortReviewsByRecency(reviews: ClientReview[]): ClientReview[] {
  return [...reviews].sort((a, b) => {
    const aTime = a.publishedAt ? Date.parse(a.publishedAt) : 0;
    const bTime = b.publishedAt ? Date.parse(b.publishedAt) : 0;
    return bTime - aTime;
  });
}

function getFallbackReviews(): GoogleReviewsResult {
  return {
    reviews: sortReviewsByRecency(
      TESTIMONIALS.map((testimonial) => ({
        author: testimonial.author,
        text: testimonial.quote,
        rating: 5,
      })),
    ).slice(0, MAX_REVIEWS),
    googleMapsUri: null,
    rating: null,
    userRatingCount: null,
    source: "fallback",
  };
}

function mapPlacesReviews(data: PlacesApiResponse): GoogleReviewsResult {
  const reviews = sortReviewsByRecency(
    (data.reviews ?? [])
      .filter((review) => review.rating === 5 && review.text?.text?.trim())
      .map((review) => ({
        author: review.authorAttribution?.displayName ?? "Google Review",
        text: review.text!.text!.trim(),
        rating: 5,
        photoUri: review.authorAttribution?.photoUri,
        timeAgo: review.relativePublishTimeDescription,
        publishedAt: review.publishTime,
      })),
  ).slice(0, MAX_REVIEWS);

  return {
    reviews,
    googleMapsUri: data.googleMapsUri ?? null,
    rating: data.rating ?? null,
    userRatingCount: data.userRatingCount ?? null,
    source: "google",
  };
}

export async function getGoogleReviews(): Promise<GoogleReviewsResult> {
  if (cachedResult) {
    return cachedResult;
  }

  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) {
    console.warn(
      "[google-reviews] GOOGLE_PLACES_API_KEY or GOOGLE_PLACE_ID missing — using fallback testimonials.",
    );
    cachedResult = getFallbackReviews();
    return cachedResult;
  }

  try {
    const response = await fetch(
      `https://places.googleapis.com/v1/places/${placeId}`,
      {
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": apiKey,
          "X-Goog-FieldMask":
            "reviews.authorAttribution,reviews.text,reviews.rating,reviews.publishTime,reviews.relativePublishTimeDescription,rating,userRatingCount,googleMapsUri",
        },
        next: { revalidate: false },
      },
    );

    if (!response.ok) {
      console.warn(
        `[google-reviews] Places API error ${response.status} — using fallback testimonials.`,
      );
      cachedResult = getFallbackReviews();
      return cachedResult;
    }

    const data = (await response.json()) as PlacesApiResponse;
    const result = mapPlacesReviews(data);

    if (result.reviews.length === 0) {
      console.warn(
        "[google-reviews] No 5-star reviews returned — using fallback testimonials.",
      );
      cachedResult = getFallbackReviews();
      return cachedResult;
    }

    cachedResult = result;
    return cachedResult;
  } catch (error) {
    console.warn(
      "[google-reviews] Failed to fetch reviews — using fallback testimonials.",
      error,
    );
    cachedResult = getFallbackReviews();
    return cachedResult;
  }
}
