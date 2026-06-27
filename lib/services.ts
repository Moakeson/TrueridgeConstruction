import { SITE } from "./constants";
import { getGoogleReviews } from "./google-reviews";

export interface ServiceDetail {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  headline: string;
  description: string;
  features: string[];
}

export const serviceDetails: Record<string, ServiceDetail> = {
  "kitchen-remodel": {
    slug: "kitchen-remodel",
    title: "Kitchen Remodels",
    metaTitle: "Kitchen Remodel Contractor | Salt Lake City & Utah County",
    metaDescription:
      "Kitchen remodels with quality craftsmanship and clear, itemized estimates. Serving Salt Lake City and Utah County. Schedule a free consultation.",
    headline: "Kitchen Remodels Built Around How You Live",
    description:
      "Whether you're updating cabinets and countertops or reworking the entire layout, we handle kitchen remodels with quality craftsmanship and clear communication. You'll get an itemized estimate — no surprises — and a timeline you can count on.",
    features: [
      "Custom cabinets and countertops",
      "Backsplash and tile work",
      "Open-concept layout updates",
      "Window and lighting updates",
      "Itemized estimates before work begins",
    ],
  },
  "bathroom-remodel": {
    slug: "bathroom-remodel",
    title: "Bathroom Remodels",
    metaTitle: "Bathroom Remodel Contractor | Salt Lake City & Utah County",
    metaDescription:
      "Bathroom remodels with quality tile work, fixtures, and clear estimates. Serving Salt Lake City and Utah County. Schedule a free consultation.",
    headline: "Bathroom Remodels That Feel Like an Upgrade",
    description:
      "From shower and tile updates to full vanity and fixture replacements, we transform bathrooms with quality craftsmanship you can see. We work in your home like it's our own — keeping you informed every step of the way.",
    features: [
      "Shower and tub updates",
      "Tile and flooring",
      "Vanity and fixture installs",
      "Lighting and ventilation updates",
      "On-time completion with clear communication",
    ],
  },
  "basement-remodel": {
    slug: "basement-remodel",
    title: "Basement Remodels",
    metaTitle: "Basement Finish & Remodel | Salt Lake City & Utah County",
    metaDescription:
      "Basement finish-outs and remodels for living space, home offices, and more. Serving Salt Lake City and Utah County. Schedule a free consultation.",
    headline: "Basement Finish-Outs That Add Real Living Space",
    description:
      "Turn unused basement space into a home office, sitting room, or family area. We've completed tight-deadline basement finish-outs with quality results — and we stick to the timeline we agree on.",
    features: [
      "Basement finish-outs and framing",
      "Home office and sitting room builds",
      "Drywall, flooring, and trim work",
      "Electrical and lighting coordination",
      "Professional, timely project management",
    ],
  },
  "fireplace-install": {
    slug: "fireplace-install",
    title: "Fireplace Installs",
    metaTitle: "Electric Fireplace Installation | Utah County & Salt Lake County",
    metaDescription:
      "Electric fireplace installs and custom built-ins in Utah County and Salt Lake County. Quality framing and finishes. Schedule a free consultation.",
    headline: "Electric Fireplace Installs Done Right",
    description:
      "From framing and construction to the finished built-in surround, we handle electric fireplace installs with solid craftsmanship. Jordan and the team care deeply about the work and about making the process smooth and stress-free.",
    features: [
      "Electric fireplace framing and install",
      "Custom built-in surrounds",
      "Clean, professional finishes",
      "Coordination with your design vision",
      "Quality work you can see and trust",
    ],
  },
};

export function getServiceDetail(slug: string): ServiceDetail | undefined {
  return serviceDetails[slug];
}

export async function getLocalBusinessSchema() {
  const { rating, userRatingCount } = await getGoogleReviews();

  return {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    name: SITE.name,
    description: SITE.description,
    url: SITE.url,
    telephone: SITE.phone,
    email: SITE.email,
    areaServed: [
      { "@type": "AdministrativeArea", name: "Salt Lake County, Utah" },
      { "@type": "AdministrativeArea", name: "Utah County, Utah" },
    ],
    address: {
      "@type": "PostalAddress",
      addressRegion: "UT",
      addressCountry: "US",
    },
    priceRange: "$$",
    sameAs: [SITE.social.instagram],
    ...(rating != null && userRatingCount != null
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: rating,
            reviewCount: userRatingCount,
            bestRating: 5,
            worstRating: 1,
          },
        }
      : {}),
  };
}

export function getServiceSchema(slug: string) {
  const service = serviceDetails[slug];
  if (!service) return null;

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    provider: {
      "@type": "GeneralContractor",
      name: SITE.name,
      telephone: SITE.phone,
      email: SITE.email,
    },
    areaServed: [
      { "@type": "AdministrativeArea", name: "Salt Lake County, Utah" },
      { "@type": "AdministrativeArea", name: "Utah County, Utah" },
    ],
  };
}
