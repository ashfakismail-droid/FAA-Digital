import type { Demo, Project } from "@/types";

export const demos: Demo[] = [
  {
    slug: "external-website",
    title: "LUXORA — Luxury Fashion & Lifestyle",
    category: "New category",
    industry: "New industry",
    description: "LUXORA — curated luxury fashion and lifestyle essentials.",
    features: [],
    technologies: [
      "HTML",
      "CSS",
      "JavaScript"
    ],
    palette: [
      "#10131f",
      "#5f5ce6"
    ],
    icon: "Sparkles",
    status: "live",
    publishState: "published",
    visibility: "public",
    source: {
      type: "external",
      url: "https://e-commerce-me.netlify.app/",
      detectedType: "unknown"
    },
    tags: [],
    order: 1,
    thumbnail: "/demos/external-website/assets/studio-thumbnail.png?v=1785349168138",
    logo: "https://e-commerce-me.netlify.app/images/misc/favicon.svg",
    seoTitle: "LUXORA — Luxury Fashion & Lifestyle",
    seoDescription: "LUXORA — curated luxury fashion and lifestyle essentials.",
    popular: true,
    featured: true,
    featuredHero: true,
    showcase: true
  },
  {
    slug: "luxora",
    title: "Luxora",
    category: "E-Commerce",
    description: "Luxury Fashion & Lifestyle — curated luxury fashion and lifestyle essentials with a premium shopping experience.",
    features: [
      "Product catalogue",
      "Cart & checkout",
      "Wishlist",
      "Compare products",
      "Order tracking",
      "Admin dashboard"
    ],
    technologies: [
      "HTML",
      "CSS",
      "JavaScript",
      "Responsive Design"
    ],
    palette: [
      "#141414",
      "#C9A86A"
    ],
    icon: "ShoppingBag",
    popular: false,
    featured: true,
    status: "live",
    thumbnail: "/demos/luxora/images/misc/luxora-preview.jpg",
    createdAt: "2024-01-15",
    updatedAt: "2024-03-20",
    tags: [
      "ecommerce",
      "fashion",
      "luxury"
    ],
    visibility: "public",
    notes: "High-performing product showcase with advanced filtering",
    lastActivity: "2024-03-20",
    order: 2,
    industry: "E-Commerce",
    publishState: "published",
    source: {
      type: "local",
      folder: "luxora",
      detectedType: "html"
    },
    featuredHero: false,
    showcase: false
  },
  {
    slug: "wedding-wp",
    title: "Camille &amp; Julian — June 5, 2027 · Lake Como",
    category: "invitation",
    industry: "invitation",
    description: "Camille Moretti & Julian Hartwell are getting married at Villa Serenissima, Lake Como, on Saturday the fifth of June 2027. With love, we invite you. RSVP before the first of May.",
    features: [],
    technologies: [
      "HTML",
      "CSS",
      "JavaScript"
    ],
    palette: [
      "#10131f",
      "#5f5ce6"
    ],
    icon: "Sparkles",
    status: "live",
    publishState: "published",
    visibility: "public",
    source: {
      type: "local",
      folder: "wedding-wp",
      detectedType: "html"
    },
    tags: [],
    thumbnail: "/demos/wedding-wp/assets/studio-thumbnail.png?v=1788709693421",
    logo: "assets/img/monogram.svg",
    galleryImage: "assets/img/hero.jpg",
    seoTitle: "Camille & Julian — June 5, 2027",
    seoDescription: "The marriage of Camille Moretti & Julian Hartwell · Saturday the fifth of June, two thousand and twenty-seven · Villa Serenissima, Lake Como.",
    order: 3,
    popular: true,
    showcase: true
  },
  {
    slug: "dealership",
    title: "Prestige Motors",
    category: "Car Dealership",
    description: "Luxury & Performance Automobiles — the definitive destination for luxury and performance automobiles.",
    features: [
      "Vehicle inventory",
      "Test-drive booking",
      "Finance calculator",
      "Trade-in valuation"
    ],
    technologies: [
      "HTML",
      "CSS",
      "JavaScript",
      "Responsive Design"
    ],
    palette: [
      "#0F1418",
      "#C8B08A"
    ],
    icon: "Car",
    status: "live",
    thumbnail: "/demos/dealership/assets/studio-thumbnail.png?v=1785423057389",
    createdAt: "2024-01-30",
    updatedAt: "2024-03-10",
    tags: [
      "automotive",
      "luxury",
      "dealership"
    ],
    visibility: "public",
    lastActivity: "2024-03-10",
    order: 4,
    industry: "Car Dealership",
    publishState: "published",
    source: {
      type: "local",
      folder: "dealership",
      detectedType: "html"
    },
    featuredHero: false,
    popular: true,
    showcase: true
  },
  {
    slug: "grand-horizon-hotel",
    title: "Grand Horizon Hotel",
    category: "Hotel & Resort",
    description: "Luxury 5-star retreat with signature suites, fine dining, spa rituals, and breathtaking views.",
    features: [
      "Booking engine",
      "Room galleries",
      "Spa & dining",
      "Guest experiences"
    ],
    technologies: [
      "HTML",
      "CSS",
      "JavaScript",
      "Responsive Design"
    ],
    palette: [
      "#0E1C22",
      "#5FB3A8"
    ],
    icon: "Hotel",
    status: "live",
    thumbnail: "/demos/grand-horizon-hotel/images/hero/hero-suite.svg",
    createdAt: "2024-01-25",
    updatedAt: "2024-03-15",
    tags: [
      "hotel",
      "luxury",
      "resort"
    ],
    visibility: "public",
    lastActivity: "2024-03-15",
    order: 5,
    industry: "Hotel & Resort",
    publishState: "published",
    source: {
      type: "local",
      folder: "grand-horizon-hotel",
      detectedType: "html"
    },
    featuredHero: false,
    showcase: false
  },
  {
    slug: "bella-vista",
    title: "Bella Vista Ristorante",
    category: "Restaurant",
    description: "Authentic Italian Dining — warm, editorial restaurant template with immersive menus, table reservations, and private dining enquiries.",
    features: [
      "Online reservations",
      "Menu showcase",
      "Private dining",
      "Events calendar"
    ],
    technologies: [
      "HTML",
      "CSS",
      "JavaScript",
      "Responsive Design"
    ],
    palette: [
      "#0b0906",
      "#C98A4B"
    ],
    icon: "UtensilsCrossed",
    status: "live",
    createdAt: "2024-02-10",
    updatedAt: "2024-02-10",
    tags: [
      "restaurant",
      "italian",
      "hospitality"
    ],
    visibility: "public",
    notes: "First restaurant demo, featured in case studies",
    lastActivity: "2024-02-10",
    order: 6,
    industry: "Restaurant",
    publishState: "published",
    featuredHero: false,
    source: {
      type: "local",
      folder: "bella-vista",
      detectedType: "html"
    }
  },
  {
    slug: "gym",
    title: "Titan Fitness",
    category: "Gym & Fitness",
    description: "Premium gym & fitness center with world-class training, elite coaches, and memberships built for results.",
    features: [
      "Class timetables",
      "Membership plans",
      "Trainer profiles",
      "Trial booking"
    ],
    technologies: [
      "HTML",
      "CSS",
      "JavaScript",
      "Responsive Design"
    ],
    palette: [
      "#0a0a0a",
      "#E05538"
    ],
    icon: "Dumbbell",
    status: "live",
    createdAt: "2024-02-05",
    updatedAt: "2024-02-20",
    tags: [
      "fitness",
      "gym",
      "health"
    ],
    visibility: "public",
    lastActivity: "2024-02-20",
    order: 7,
    industry: "Gym & Fitness",
    publishState: "published",
    source: {
      type: "local",
      folder: "gym",
      detectedType: "html"
    },
    featuredHero: false
  },
  {
    slug: "hotel",
    title: "Aurora Grand Resort",
    category: "Hotel & Resort",
    description: "Where elegance meets the horizon — luxury rooms, world-class dining, and unforgettable experiences.",
    features: [
      "Room booking",
      "Restaurant menu",
      "Gallery showcase",
      "Contact & locations"
    ],
    technologies: [
      "HTML",
      "CSS",
      "JavaScript",
      "Responsive Design"
    ],
    palette: [
      "#121418",
      "#D4A05B"
    ],
    icon: "Hotel",
    status: "live",
    thumbnail: "/demos/hotel/images/hero.jpg",
    createdAt: "2024-01-20",
    updatedAt: "2024-03-05",
    tags: [
      "hotel",
      "resort",
      "luxury"
    ],
    visibility: "public",
    lastActivity: "2024-03-05",
    order: 8,
    industry: "Hotel & Resort",
    publishState: "published",
    source: {
      type: "local",
      folder: "hotel",
      detectedType: "html"
    },
    featuredHero: false,
    popular: true,
    showcase: true
  },
  {
    slug: "pub",
    title: "PUB SOCIAL CLUB",
    category: "Bar & Lounge",
    description: "Elite luxury sanctuary where high-end cinematic design meets immersive night culture.",
    features: [
      "Event calendar",
      "Menu showcase",
      "Photo gallery",
      "Reservation system"
    ],
    technologies: [
      "HTML",
      "CSS",
      "JavaScript",
      "Responsive Design"
    ],
    palette: [
      "#0d050a",
      "#D4AF37"
    ],
    icon: "Wine",
    status: "live",
    createdAt: "2024-02-12",
    updatedAt: "2024-02-12",
    tags: [
      "bar",
      "nightlife",
      "lounge"
    ],
    visibility: "public",
    lastActivity: "2024-02-12",
    order: 9,
    industry: "Bar & Lounge",
    publishState: "published",
    source: {
      type: "local",
      folder: "pub",
      detectedType: "html"
    },
    featuredHero: false,
    thumbnail: "/demos/pub/assets/studio-thumbnail.png?v=1785422939417",
    showcase: false
  },
  {
    slug: "real-estate",
    title: "PrimeNest Realty",
    category: "Real Estate",
    description: "Premium real estate agency with verified listings, trusted agents, and luxury properties.",
    features: [
      "Listing search",
      "Map discovery",
      "Property details",
      "Lead capture",
      "Mortgage calculator"
    ],
    technologies: [
      "HTML",
      "CSS",
      "JavaScript",
      "Responsive Design"
    ],
    palette: [
      "#101820",
      "#8FAADC"
    ],
    icon: "Building2",
    status: "live",
    createdAt: "2024-01-28",
    updatedAt: "2024-03-08",
    tags: [
      "real-estate",
      "property",
      "luxury"
    ],
    visibility: "public",
    lastActivity: "2024-03-08",
    order: 10,
    industry: "Real Estate",
    publishState: "published",
    source: {
      type: "local",
      folder: "real-estate",
      detectedType: "html"
    },
    featuredHero: false
  },
  {
    slug: "urban-brew",
    title: "Urban Brew Café",
    category: "Café & Bakery",
    description: "Craft coffee, fresh bakery and a cozy workspace — explore our menu, seasonal specials, and loyalty rewards.",
    features: [
      "Menu showcase",
      "Online ordering",
      "Locations map",
      "Loyalty program"
    ],
    technologies: [
      "HTML",
      "CSS",
      "JavaScript",
      "Responsive Design"
    ],
    palette: [
      "#17110b",
      "#D4A05B"
    ],
    icon: "Coffee",
    status: "live",
    createdAt: "2024-02-08",
    updatedAt: "2024-02-08",
    tags: [
      "cafe",
      "coffee",
      "bakery"
    ],
    visibility: "public",
    lastActivity: "2024-02-08",
    order: 11,
    industry: "Café & Bakery",
    publishState: "published",
    source: {
      type: "local",
      folder: "urban-brew",
      detectedType: "html"
    },
    featuredHero: false
  },
  {
    slug: "ai-saas",
    title: "NovaAI | Intelligent Automation Platform",
    category: "New category",
    industry: "New industry",
    description: "NovaAI - Next-generation AI platform that transforms how you work, create, and innovate with intelligent automation.",
    features: [],
    technologies: [
      "HTML",
      "CSS",
      "JavaScript"
    ],
    palette: [
      "#10131f",
      "#5f5ce6"
    ],
    icon: "Sparkles",
    status: "live",
    publishState: "published",
    visibility: "public",
    source: {
      type: "local",
      folder: "ai-saas",
      detectedType: "html"
    },
    tags: [],
    order: 12,
    featuredHero: false
  }
];

export function getDemo(slug: string) {
  return demos.find((d) => d.slug === slug);
}

export function getDemosByCategory(category: string) {
  return demos.filter((d) => d.category === category);
}

export function getDemosByTag(tag: string) {
  return demos.filter((d) => d.tags?.includes(tag));
}

export function getPopularDemos() {
  return demos.filter((d) => d.popular);
}

export function getLiveDemos() {
  return demos.filter((d) => d.status === "live");
}

export function getActiveDemos(source: Demo[] = demos) {
  return source.filter((d) => d.status !== "archived" && d.visibility !== "private");
}

export function searchDemos(query: string) {
  const lower = query.toLowerCase();
  return demos.filter(
    (d) =>
      d.title.toLowerCase().includes(lower) ||
      d.description.toLowerCase().includes(lower) ||
      d.category.toLowerCase().includes(lower) ||
      d.tags?.some((t) => t.toLowerCase().includes(lower))
  );
}

export function getDemosByStatus(status: "live" | "coming-soon" | "in-progress" | "archived") {
  return demos.filter((d) => d.status === status);
}

export function getDemosByVisibility(visibility: "public" | "private") {
  return demos.filter((d) => d.visibility === visibility);
}

export function getAllCategories() {
  const categories = new Set(demos.map((d) => d.category));
  return Array.from(categories).sort();
}

export function getFeaturedDemosAsProjects(): Project[] {
  return demos
    .filter((d) => d.featured === true)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    .map((d) => ({
      slug: d.slug,
      title: d.title,
      category: d.category,
      industry: d.industry ?? d.category,
      year: new Date().getFullYear().toString(),
      client: "FAA Digital",
      tagline: d.description,
      summary: d.description,
      services: d.features.length > 0 ? d.features.slice(0, 3) : [d.category],
      stack: d.technologies,
      highlights: d.features,
      metrics: [],
      overview: d.description,
      challenge: "",
      solution: "",
      features: d.features.map((f) => ({ title: f, description: "" })),
      process: [],
      palette: d.palette,
      icon: d.icon,
      featured: true,
      liveUrl: d.source?.type === "external" ? d.source.url : `/demos/${d.slug}`,
    }));
}

export function getFeaturedHeroDemos(source: Demo[] = demos) {
  return source
    .filter((d) => d.featuredHero === true)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

export function getDemosByIndustryAsProjects(industrySlug: string): Project[] {
  return demos
    .filter((d) => (d.industry ?? d.category).toLowerCase() === industrySlug.toLowerCase())
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    .map((d) => ({
      slug: d.slug,
      title: d.title,
      category: d.category,
      industry: d.industry ?? d.category,
      year: new Date().getFullYear().toString(),
      client: "FAA Digital",
      tagline: d.description,
      summary: d.description,
      services: d.features.length > 0 ? d.features.slice(0, 3) : [d.category],
      stack: d.technologies,
      highlights: d.features,
      metrics: [],
      overview: d.description,
      challenge: "",
      solution: "",
      features: d.features.map((f) => ({ title: f, description: "" })),
      process: [],
      palette: d.palette,
      icon: d.icon,
      liveUrl: d.source?.type === "external" ? d.source.url : `/demos/${d.slug}`,
    }));
}
export function getShowcaseDemosAsProjects(source: Demo[] = demos): Project[] {
  return source
    .filter((d) => d.showcase === true)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    .map((d) => ({
      slug: d.slug,
      title: d.title,
      category: d.category,
      industry: d.industry ?? d.category,
      year: new Date().getFullYear().toString(),
      client: "FAA Digital",
      tagline: d.description,
      summary: d.description,
      services: d.features.length > 0 ? d.features.slice(0, 3) : [d.category],
      stack: d.technologies,
      highlights: d.features,
      metrics: [],
      overview: d.description,
      challenge: "",
      solution: "",
      features: d.features.map((f) => ({ title: f, description: "" })),
      process: [],
      palette: d.palette,
      icon: d.icon,
      showcase: true,
      liveUrl: d.source?.type === "external" ? d.source.url : `/demos/${d.slug}`,
      thumbnail: d.thumbnail,
    }));
}
