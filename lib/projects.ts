export interface Project {
  id: string;
  /** Path under public/, e.g. /images/projects/kitchen-1.webp */
  src: string;
  alt: string;
  caption: string;
  service?: string;
}

export const projects: Project[] = [
  {
    id: "kitchen-1",
    src: "/images/projects/kitchen-1.webp",
    alt: "Modern kitchen remodel with white cabinets and marble countertops in Utah County",
    caption: "Kitchen remodel — custom cabinets and countertops",
    service: "kitchen-remodel",
  },
  {
    id: "bathroom-1",
    src: "/images/projects/bathroom-1.webp",
    alt: "Bathroom remodel with walk-in shower and updated tile in Salt Lake City",
    caption: "Bathroom remodel — tile shower and vanity update",
    service: "bathroom-remodel",
  },
  {
    id: "kitchen-2",
    src: "/images/projects/kitchen-2.webp",
    alt: "Kitchen renovation with new backsplash and window in Utah home",
    caption: "Installed new countertops, backsplash, and window",
    service: "kitchen-remodel",
  },
  {
    id: "basement-1",
    src: "/images/projects/basement-1.webp",
    alt: "Finished basement living space with home office in Utah County",
    caption: "Basement finish-out — home office and sitting room",
    service: "basement-remodel",
  },
  {
    id: "fireplace-1",
    src: "/images/projects/fireplace-1.webp",
    alt: "Built-in electric fireplace with custom surround in Salt Lake City home",
    caption: "Electric fireplace install — custom built-in surround",
    service: "fireplace-install",
  },
  {
    id: "kitchen-3",
    src: "/images/projects/kitchen-3.webp",
    alt: "Open-concept kitchen remodel with island in Utah home",
    caption: "Kitchen remodel — open layout with island",
    service: "kitchen-remodel",
  },
  {
    id: "bathroom-2",
    src: "/images/projects/bathroom-2.webp",
    alt: "Spa-style bathroom remodel with freestanding tub in Utah County",
    caption: "Bathroom remodel — spa-style fixtures and tile",
    service: "bathroom-remodel",
  },
  {
    id: "basement-2",
    src: "/images/projects/basement-2.webp",
    alt: "Finished basement family room remodel in Salt Lake County",
    caption: "Basement remodel — family room finish-out",
    service: "basement-remodel",
  },
];

/** Homepage hero background — add as public/images/hero.webp */
export const HERO_IMAGE = "/images/hero.webp";
