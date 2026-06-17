/** Homepage hero background — public/hero.webp */
export const HERO_IMAGE = "/hero.webp";

export const SITE = {
  name: "True Ridge Construction",
  tagline: "Quality Remodels for Your Utah Home",
  description:
    "Kitchen, bathroom, and basement remodels with clear estimates and craftsmanship you can see. Serving Salt Lake County and Utah County.",
  url: "https://www.trueridgeconstruct.com",
  phone: "(801) 694-5910",
  phoneHref: "tel:+18016945910",
  email: "Info@trueridgeconstruct.com",
  emailHref: "mailto:Info@trueridgeconstruct.com",
  serviceArea: "Salt Lake County and Utah County",
  social: {
    instagram: "https://www.instagram.com/true_ridge_construction_llc/",
  },
} as const;

export const NAV_LINKS = [
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "Kitchen Remodel", href: "/services/kitchen-remodel" },
      { label: "Bathroom Remodel", href: "/services/bathroom-remodel" },
      { label: "Basement Remodel", href: "/services/basement-remodel" },
      { label: "Fireplace Install", href: "/services/fireplace-install" },
    ],
  },
  { label: "Our Work", href: "/our-work" },
] as const;

export const SERVICES = [
  {
    slug: "kitchen-remodel",
    title: "Kitchen Remodels",
    shortDescription:
      "Custom cabinets, countertops, backsplash, and layouts — built with quality craftsmanship and clear communication.",
    href: "/services/kitchen-remodel",
    image: "/images/services/kitchen.webp",
    imageAlt:
      "Kitchen remodel with white cabinets, quartz countertops, island seating, and tiled backsplash in a Utah home",
  },
  {
    slug: "bathroom-remodel",
    title: "Bathroom Remodels",
    shortDescription:
      "Vanities, tile, showers, and fixtures updated with an itemized estimate and a timeline you can count on.",
    href: "/services/bathroom-remodel",
    image: "/images/services/bathroom.webp",
    imageAlt:
      "Bathroom remodel with marble tile shower, white vanity, and matte black fixtures in a Utah home",
  },
  {
    slug: "basement-remodel",
    title: "Basement Remodels",
    shortDescription:
      "Basement finish-outs for living space, home offices, and sitting rooms — from concept to completion.",
    href: "/services/basement-remodel",
    image: "/images/services/basement.webp",
    imageAlt:
      "Finished basement living space with sectional sofa, wall-mounted TV, and electric fireplace in a Utah home",
  },
  {
    slug: "fireplace-install",
    title: "Fireplace Installs",
    shortDescription:
      "Electric fireplace installs and built-ins — solid framing, clean finishes, and stress-free construction.",
    href: "/services/fireplace-install",
    image: "/images/services/fireplace.webp",
    imageAlt:
      "Built-in linear electric fireplace with wood mantel and vertical wood slat accent wall in a Utah home",
    imagePosition: "75% center",
  },
] as const;

export const HOW_IT_WORKS = [
  {
    step: 1,
    title: "Get in Touch",
    description:
      "Reach out through our contact form, phone, text, or email. Tell us about your remodel — we're here to listen.",
  },
  {
    step: 2,
    title: "On-Site Assessment",
    description:
      "We schedule a walkthrough to take accurate measurements and understand your space, needs, and vision.",
  },
  {
    step: 3,
    title: "Review & Approve",
    description:
      "You'll receive a clear, itemized estimate. No surprises — just a transparent budget for your approval.",
  },
  {
    step: 4,
    title: "Project Kickoff",
    description:
      "Once approved, we schedule your project and get to work with a professional, timely approach.",
  },
  {
    step: 5,
    title: "On-Time Completion",
    description:
      "We stick to the timeline and keep you updated along the way. Quality craftsmanship, delivered on schedule.",
  },
] as const;

export const TESTIMONIALS = [
  {
    quote:
      "We hired True Ridge to finish two basement rooms for an office and sitting room, and we had a very tight deadline. True Ridge bent over backwards to provide quality work within the time available. The results were excellent, and the deadline was met. True Ridge is the one we would recommend without hesitation.",
    author: "Warren B.",
  },
  {
    quote:
      "Jordan did solid, high-quality work framing and constructing our fireplace. He's extremely friendly, cares deeply about both his work and his customers, and made the whole process smooth and stress-free. Highly recommend him for any construction project!",
    author: "Brandon S.",
  },
] as const;
