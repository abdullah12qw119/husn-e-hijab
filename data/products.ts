export interface Product {
  id: string;
  name: string;
  category: "Hijab" | "Niqab" | "Abaya" | "Khimar";
  price: number;
  image: string;
  secondaryImage?: string;
  description: string;
  colorTone: string;
  tag: string;
  featured: boolean;
  specifications: string[];
}

export const productsData: Product[] = [
  {
    id: "dusty-rose-ensemble",
    name: "Husn Flowing Rose Ensemble",
    category: "Abaya",
    price: 8900,
    image: "/images/home/Model_wearing_modest_outfit_bundle_202608071227.webp",
    secondaryImage: "/assets/hero-drape.webp",
    description:
      "A signature dusty rose fluid silhouette featuring dramatic sleeves, modest coverage, and lightweight fabric movement.",
    colorTone: "Dusty Rose",
    tag: "Signature Layer",
    featured: true,
    specifications: ["Fluid Silhouette", "Graceful Drape", "Full Coverage"],
  },
  {
    id: "emerald-velvet-abaya",
    name: "Royal Emerald Velvet Abaya",
    category: "Abaya",
    price: 12500,
    image: "/images/Model_wearing_emerald_green_abaya_202608071229.webp",
    secondaryImage: "/images/home/Model_wearing_embroidered_green_._202608071228.webp",
    description:
      "Deep emerald velvet abaya ornamented with traditional golden embroidery along the collar and cuffs.",
    colorTone: "Emerald Green & Gold",
    tag: "Luxury Edition",
    featured: true,
    specifications: ["Embroidered Cuffs", "Satin Collar Accent", "Warm Velvet Weight"],
  },
  {
    id: "black-lace-abaya",
    name: "Noir Lace Trim Abaya",
    category: "Abaya",
    price: 7800,
    image: "/images/Black_abaya_apparel_mockup_2K_202608071224.webp",
    secondaryImage: "/images/home/Butterfly_abaya_on_display_manne._202608071226.webp",
    description:
      "Classic dark open abaya adorned with intricate scalloped lace edging for elevated everyday wear.",
    colorTone: "Charcoal Black",
    tag: "Everyday Luxury",
    featured: true,
    specifications: ["Scalloped Lace Edge", "Breathable Fabric", "Flowing Cut"],
  },
  {
    id: "three-layer-niqab",
    name: "Vail 3-Tier Layered Niqab",
    category: "Niqab",
    price: 2900,
    image: "/images/Model_wearing_black_niqab_2K_202608071228.webp",
    secondaryImage: "/assets/hero-niqab.webp",
    description:
      "Premium triple-layer veil providing total opacity, breathability, and weightless comfort.",
    colorTone: "Deep Obsidian",
    tag: "Quiet Confidence",
    featured: true,
    specifications: ["Triple Layer Chiffon", "Eye-Slot Comfort", "Zero Static Build"],
  },
  {
    id: "brown-cocoa-niqab",
    name: "Cocoa Satin Trim Niqab",
    category: "Niqab",
    price: 2400,
    image: "/assets/cocoa-hero-new.webp",
    secondaryImage: "/images/Studio_portrait_of_black_niqab_202608071229.webp",
    description:
      "Rich deep cocoa veil tailored with soft binding edges for effortless framing and dignified comfort.",
    colorTone: "Deep Cocoa",
    tag: "Earth Tones",
    featured: false,
    specifications: ["Soft Elastic Tie", "Ultra Soft Drape", "Breathable Breath-Space"],
  },
  {
    id: "viscose-drape-hijab",
    name: "Imperial Viscose Drape Hijab",
    category: "Hijab",
    price: 1950,
    image: "/images/Viscose_hijab_on_display_bust_202608071226.webp",
    secondaryImage: "/images/Model_wearing_black_hijab_portrait_202608071227.webp",
    description:
      "Generously proportioned viscose hijab with non-slip texture and rich natural folds.",
    colorTone: "Warm Sand",
    tag: "Essential Core",
    featured: true,
    specifications: ["Generous Length", "Non-Slip Texture", "Breathable Viscose"],
  },
  {
    id: "satin-silk-hijab",
    name: "Satin Silk Shimmer Hijab",
    category: "Hijab",
    price: 2600,
    image: "/images/Satin_silk_hijab_mockup_render_202608071226.webp",
    secondaryImage: "/images/Viscose_hijab_on_display_bust_202608071226.webp",
    description:
      "Subtle glossy satin wrap that creates luminous reflections under editorial light.",
    colorTone: "Champagne Rose",
    tag: "Evening Elegance",
    featured: false,
    specifications: ["Luminous Sheen", "Soft Hand-Feel", "Crease-Resistant"],
  },
  {
    id: "classic-khimar-stand",
    name: "Grace Overhead Khimar",
    category: "Khimar",
    price: 4900,
    image: "/images/Khimar_on_display_stand_2K_202608071226.webp",
    secondaryImage: "/assets/hero-drape.webp",
    description:
      "Full overhead khimar silhouette extending gracefully over shoulders with curved hem detailing.",
    colorTone: "Charcoal Gray",
    tag: "Full Coverage",
    featured: true,
    specifications: ["Overhead Fit", "Shoulder Flared Cut", "Lightweight Crepe"],
  },
  {
    id: "sage-green-layered-abaya",
    name: "Sage Whisper Layered Abaya",
    category: "Abaya",
    price: 9400,
    image: "/images/Sage_green_abaya_3D_mockup_202608071226.webp",
    secondaryImage: "/images/Model_wearing_emerald_green_abaya_202608071229.webp",
    description:
      "Soft muted sage green ensemble designed with overlapping front panels and subtle sleeve folds.",
    colorTone: "Sage Green",
    tag: "Contemporary Pastels",
    featured: false,
    specifications: ["Overlapping Panels", "Minimalist Tailoring", "Soft Linen-Blend Feel"],
  },
];
