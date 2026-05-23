export interface Project {
  id: string;
  src: string;
  alt: string;
  caption: string;
  service?: string;
}

export const projects: Project[] = [
  {
    id: "kitchen-1",
    src: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=1600&q=80",
    alt: "Modern kitchen remodel with white cabinets and marble countertops in Utah County",
    caption: "Kitchen remodel — custom cabinets and countertops",
    service: "kitchen-remodel",
  },
  {
    id: "bathroom-1",
    src: "https://images.unsplash.com/photo-1552324727-9db1584f01a2?w=1600&q=80",
    alt: "Bathroom remodel with walk-in shower and updated tile in Salt Lake City",
    caption: "Bathroom remodel — tile shower and vanity update",
    service: "bathroom-remodel",
  },
  {
    id: "kitchen-2",
    src: "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=1600&q=80",
    alt: "Kitchen renovation with new backsplash and window in Utah home",
    caption: "Installed new countertops, backsplash, and window",
    service: "kitchen-remodel",
  },
  {
    id: "basement-1",
    src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80",
    alt: "Finished basement living space with home office in Utah County",
    caption: "Basement finish-out — home office and sitting room",
    service: "basement-remodel",
  },
  {
    id: "fireplace-1",
    src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80",
    alt: "Built-in electric fireplace with custom surround in Salt Lake City home",
    caption: "Electric fireplace install — custom built-in surround",
    service: "fireplace-install",
  },
  {
    id: "kitchen-3",
    src: "https://images.unsplash.com/photo-1600489000022-c2086c72950a?w=1600&q=80",
    alt: "Open-concept kitchen remodel with island in Utah home",
    caption: "Kitchen remodel — open layout with island",
    service: "kitchen-remodel",
  },
  {
    id: "bathroom-2",
    src: "https://images.unsplash.com/photo-1620626011761-9963175983d5?w=1600&q=80",
    alt: "Spa-style bathroom remodel with freestanding tub in Utah County",
    caption: "Bathroom remodel — spa-style fixtures and tile",
    service: "bathroom-remodel",
  },
  {
    id: "basement-2",
    src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&q=80",
    alt: "Finished basement family room remodel in Salt Lake County",
    caption: "Basement remodel — family room finish-out",
    service: "basement-remodel",
  },
];
