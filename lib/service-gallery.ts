export interface ServiceGalleryItem {
  image: string;
  imageAlt: string;
  title: string;
  description: string;
}

export interface ServiceGallery {
  titleAccent: string;
  titleRest: string;
  subtitle: string;
  items: ServiceGalleryItem[];
}

export const serviceGalleries: Record<string, ServiceGallery> = {
  "kitchen-remodel": {
    titleAccent: "What We",
    titleRest: "Build in Your Kitchen",
    subtitle:
      "Custom cabinets, countertops, backsplash, and layouts — quality craftsmanship with clear estimates and a timeline you can count on.",
    items: [
      {
        image: "/kitchen/picket-tile-backsplash.webp",
        imageAlt:
          "White kitchen cabinets with black hardware, picket tile backsplash, and granite countertops",
        title: "White Cabinets with Picket Tile Backsplash",
        description:
          "This kitchen update features crisp white cabinetry with matte black hardware, a white picket tile backsplash, and speckled granite countertops. A professional-style faucet, undermount sink, and clean finishes bring the space together with a bright, polished look.",
      },
      {
        image: "/kitchen/white-shaker-kitchen.webp",
        imageAlt:
          "White shaker kitchen with stainless steel appliances, granite countertops, and wood-look flooring",
        title: "Modern White Shaker Kitchen",
        description:
          "This kitchen remodel delivers a clean, open layout with white shaker cabinets, stainless steel appliances, and granite countertops. Light wood-look flooring and recessed lighting keep the room bright and functional — ready for everyday cooking and gathering.",
      },
    ],
  },
  "fireplace-install": {
    titleAccent: "What We",
    titleRest: "Build Around Your Fireplace",
    subtitle:
      "Custom electric fireplace buildouts with clean finishes, built-in storage, and entertainment walls tailored to your room.",
    items: [
      {
        image: "/fireplace/custom-shiplap-fireplace.webp",
        imageAlt:
          "White shiplap fireplace feature wall with stained wood floating mantel and electric fireplace insert",
        title: "Custom Shiplap Fireplace Feature Wall",
        description:
          "This custom fireplace buildout creates a clean, modern focal point for the room, featuring white shiplap detail, a stained wood floating mantel, and a sleek electric fireplace insert. The finished design adds warmth, texture, and functionality while providing a polished entertainment wall for the mounted TV and surrounding décor.",
      },
      {
        image: "/fireplace/modern-electric-fireplace.webp",
        imageAlt:
          "Modern electric corner fireplace with floating wood mantel and wall-mounted TV",
        title: "Modern Electric Corner Fireplace Buildout",
        description:
          "This custom fireplace buildout adds warmth, style, and function to the living space. Featuring a sleek electric fireplace, floating wood mantel, and wall-mounted TV, the design creates a clean modern focal point while keeping the room comfortable and inviting.",
      },
      {
        image: "/fireplace/green-shiplap-fireplace.webp",
        imageAlt:
          "Green shiplap fireplace with built-in bench, wood mantel, and wall-mounted TV",
        title: "Shiplap Fireplace Buildout with Bench",
        description:
          "This custom fireplace buildout adds a bold, modern focal point to the room with painted green shiplap, warm wood accents, and a built-in bench detail. The floating mantel, electric fireplace, and mounted TV create a clean entertainment wall that brings together comfort, function, and custom craftsmanship.",
      },
    ],
  },
  "bathroom-remodel": {
    titleAccent: "What We",
    titleRest: "Build in Your Bathroom",
    subtitle:
      "From shower and tub updates to full vanity replacements — quality tile work, fixtures, and finishes you can see.",
    items: [
      {
        image: "/bathroom/white-bathroom-remodel.webp",
        imageAlt:
          "White bathroom remodel with grey vanity countertop, matte black fixtures, and tub surround",
        title: "Full Bathroom Remodel with Modern Fixtures",
        description:
          "This complete bathroom update features a bright white vanity with grey quartz countertop, matte black hardware, and a clean tub surround with built-in shelving. Wood-look flooring and crisp white walls give the space a fresh, contemporary feel you can enjoy every day.",
      },
      {
        image: "/bathroom/walk-in-shower.webp",
        imageAlt:
          "Walk-in shower with marble-look wall panels, handheld showerhead, and grab bar",
        title: "Walk-In Shower with Marble-Look Walls",
        description:
          "This bathroom remodel opens up the shower with seamless marble-look wall panels, a low-profile entry, and dark metal fixtures. A handheld showerhead, grab bar, and corner shelving combine accessibility with a sleek, easy-to-clean design.",
      },
      {
        image: "/bathroom/grey-marble-vanity.webp",
        imageAlt:
          "Custom grey shaker vanity with white marble countertop and brushed nickel fixtures",
        title: "Custom Grey Vanity with Marble Countertop",
        description:
          "This vanity upgrade centers on custom grey shaker cabinetry, a white marble countertop and backsplash, and brushed nickel fixtures. A three-panel mirrored medicine cabinet and four-light vanity fixture add storage and bright, even lighting.",
      },
      {
        image: "/bathroom/tub-shower-combo.webp",
        imageAlt:
          "White tub and shower combo with dual showerheads and chrome fixtures",
        title: "Sleek Tub and Shower Combo Update",
        description:
          "This tub and shower refresh features glossy white surround panels, dual showerheads, and chrome fixtures for a clean, low-maintenance finish. Recessed lighting and a bright window keep the space open and inviting.",
      },
    ],
  },
  "basement-remodel": {
    titleAccent: "What We",
    titleRest: "Build in Your Basement",
    subtitle:
      "Basement finish-outs for living space, bedrooms, storage, and more — built on time with clear communication.",
    items: [
      {
        image: "/basement/finished-basement-room.webp",
        imageAlt:
          "Finished basement room with grey wood-look flooring, recessed lighting, and wall cabinets",
        title: "Finished Basement Living Space",
        description:
          "This basement finish-out transforms unused square footage into a bright, move-in-ready room with grey wood-look flooring, recessed lighting, and clean white trim. Wall-mounted shaker cabinets add built-in storage without crowding the space.",
      },
      {
        image: "/basement/basement-closet.webp",
        imageAlt:
          "Finished basement bedroom with built-in closet, shaker doors, and neutral carpet",
        title: "Built-In Closet and Door Package",
        description:
          "This basement bedroom finish includes shaker-style doors with matte black hardware, a built-in closet with shelf and hanging rod, and plush neutral carpet. Recessed lighting keeps the room feeling open and comfortable.",
      },
      {
        image: "/basement/basement-hallway.webp",
        imageAlt:
          "Finished basement hallway with white shaker doors, black hardware, and carpet",
        title: "Basement Hallway and Room Transition",
        description:
          "This professionally finished basement hallway features crisp white walls, plush neutral carpet, and matching shaker doors with matte black hardware. Recessed lighting creates a warm, welcoming path into the main living area.",
      },
    ],
  },
};

export function getServiceGallery(slug: string): ServiceGallery | undefined {
  return serviceGalleries[slug];
}
